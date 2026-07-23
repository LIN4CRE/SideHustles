import { SideHustle, ExecutionLogItem } from '../types';

export const INITIAL_EXECUTION_LOGS: ExecutionLogItem[] = [
  {
    id: 'log-1',
    hustleId: 'free-local-seo-tag-booster',
    hustleTitle: 'Free AI SEO Meta & Tag Repair Service',
    taskName: 'Auto-Generated 5 Google Search Meta Tags',
    status: 'completed',
    timestamp: 'Just now',
    agentName: 'SEO Tag Engine v3.6',
    details: 'Scanned target domain, generated 5 high-CTR meta descriptions with city keywords.',
    outputSnippet: '{"meta_1": "Top Rated Emergency Services...", "ctr_boost": "+34%"}'
  },
  {
    id: 'log-2',
    hustleId: 'free-local-seo-tag-booster',
    hustleTitle: 'Free AI SEO Meta & Tag Repair Service',
    taskName: 'Verified Direct Bank & PayPal Payout Routing',
    status: 'completed',
    timestamp: '2 mins ago',
    agentName: 'Payout Router AI',
    details: 'Injected PayPal.me/dlinacre16 & Bank Account MR DAVID CHRISTOPHER LINACRE into invoice scripts.',
    outputSnippet: 'Payment URL: https://paypal.me/dlinacre16 | Sort: ••-••-30 | Acc: ••••3968'
  },
  {
    id: 'log-3',
    hustleId: 'local-ai-reputation-agent',
    hustleTitle: 'Local Business AI Review & Lead Engine',
    taskName: 'Automated Outreach Batch Execution',
    status: 'running',
    timestamp: '5 mins ago',
    agentName: 'Outreach Dispatch Bot',
    details: 'Dispatching 12 personalized zero-pitch gift emails to local trade businesses.',
    outputSnippet: 'Sending email 4/12 -> local.plumbing.service@gmail.com...'
  },
  {
    id: 'log-4',
    hustleId: 'free-notion-micro-cheatsheet-vault',
    hustleTitle: 'Free Notion Cheat-Sheet & Micro-Vaults',
    taskName: 'Gumroad Auto-Product Sync',
    status: 'scheduled',
    timestamp: '15 mins ago',
    agentName: 'Asset Publisher AI',
    details: 'Scheduled automated product listing & instant PDF download link generator.',
    outputSnippet: 'Next run scheduled for 18:00 UTC'
  }
];

export function getCompletedStepsForHustle(hustleId: string): number[] {
  try {
    const stored = localStorage.getItem('sh_hustle_setup_steps');
    if (stored) {
      const parsed = JSON.parse(stored);
      if (parsed[hustleId]) return parsed[hustleId];
    }
  } catch (e) {
    console.error('Failed to load setup steps', e);
  }
  // Default: Step 1 completed by default for saved hustles so initial health is 25%+
  return [1];
}

export function saveCompletedStepsForHustle(hustleId: string, steps: number[]): void {
  try {
    const stored = localStorage.getItem('sh_hustle_setup_steps');
    const parsed = stored ? JSON.parse(stored) : {};
    parsed[hustleId] = steps;
    localStorage.setItem('sh_hustle_setup_steps', JSON.stringify(parsed));
  } catch (e) {
    console.error('Failed to save setup steps', e);
  }
}

export function calculateHustleHealth(hustle: SideHustle, completedSteps: number[]): {
  score: number;
  label: string;
  badgeClass: string;
  barColor: string;
} {
  const totalSteps = hustle.workflowBlueprint.length || 4;
  const score = Math.min(100, Math.round((completedSteps.length / totalSteps) * 100));

  if (score >= 100) {
    return {
      score,
      label: 'Optimal / Fully Operational',
      badgeClass: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
      barColor: 'from-emerald-500 to-teal-400'
    };
  } else if (score >= 75) {
    return {
      score,
      label: 'Healthy / Monetized',
      badgeClass: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
      barColor: 'from-emerald-600 to-teal-500'
    };
  } else if (score >= 50) {
    return {
      score,
      label: 'Halfway Built',
      badgeClass: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30',
      barColor: 'from-indigo-500 to-purple-500'
    };
  } else if (score >= 25) {
    return {
      score,
      label: 'Setup Initiated',
      badgeClass: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
      barColor: 'from-amber-500 to-orange-500'
    };
  } else {
    return {
      score,
      label: 'Needs Setup',
      badgeClass: 'bg-slate-800 text-slate-400 border-slate-700',
      barColor: 'from-slate-600 to-slate-500'
    };
  }
}
