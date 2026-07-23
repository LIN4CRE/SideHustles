import { initializeApp, getApps, getApp } from 'firebase/app';
import { 
  getFirestore, 
  doc, 
  setDoc, 
  getDoc, 
  onSnapshot, 
  serverTimestamp 
} from 'firebase/firestore';
import { 
  getAuth, 
  signInAnonymously, 
  onAuthStateChanged, 
  User 
} from 'firebase/auth';
import config from '../../firebase-applet-config.json';

const firebaseConfig = {
  apiKey: config.apiKey,
  authDomain: config.authDomain,
  projectId: config.projectId,
  storageBucket: config.storageBucket,
  messagingSenderId: config.messagingSenderId,
  appId: config.appId
};

// Initialize Firebase App
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const db = getFirestore(app, config.firestoreDatabaseId || undefined);
export const auth = getAuth(app);

export interface UserPortfolioCloudData {
  savedHustleIds: string[];
  salesTracked: Array<{
    id: string;
    hustleTitle: string;
    amount: number;
    timestamp: string;
    channel?: string;
  }>;
  customMacros?: any[];
  payoutDestination?: string;
  updatedAt?: any;
}

// Auto sign in anonymously or monitor auth state
export const initAuth = (onUserReady: (user: User) => void) => {
  return onAuthStateChanged(auth, async (user) => {
    if (user) {
      onUserReady(user);
    } else {
      try {
        const cred = await signInAnonymously(auth);
        onUserReady(cred.user);
      } catch (err) {
        console.error('Firebase anonymous auth failed:', err);
      }
    }
  });
};

// Sync user portfolio to Firestore
export const savePortfolioToCloud = async (userId: string, data: UserPortfolioCloudData) => {
  if (!userId) return;
  try {
    const userDocRef = doc(db, 'portfolios', userId);
    await setDoc(userDocRef, {
      ...data,
      updatedAt: serverTimestamp()
    }, { merge: true });
    return true;
  } catch (err) {
    console.error('Error saving portfolio to Firestore:', err);
    return false;
  }
};

// Load user portfolio from Firestore
export const loadPortfolioFromCloud = async (userId: string): Promise<UserPortfolioCloudData | null> => {
  if (!userId) return null;
  try {
    const userDocRef = doc(db, 'portfolios', userId);
    const snap = await getDoc(userDocRef);
    if (snap.exists()) {
      return snap.data() as UserPortfolioCloudData;
    }
  } catch (err) {
    console.error('Error loading portfolio from Firestore:', err);
  }
  return null;
};

// Real-time listener for cloud sync
export const subscribeToPortfolio = (userId: string, onChange: (data: UserPortfolioCloudData) => void) => {
  if (!userId) return () => {};
  const userDocRef = doc(db, 'portfolios', userId);
  return onSnapshot(userDocRef, (docSnap) => {
    if (docSnap.exists()) {
      onChange(docSnap.data() as UserPortfolioCloudData);
    }
  }, (err) => {
    console.error('Firestore subscription error:', err);
  });
};
