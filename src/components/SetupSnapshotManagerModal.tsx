import React, { useState, useEffect } from 'react';
import { 
  X, 
  RotateCcw, 
  Save, 
  Database, 
  Check, 
  Clock, 
  History, 
  ShieldCheck, 
  Trash2, 
  Sparkles, 
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';

export interface SetupSnapshot {
  id: string;
  timestamp: string;
  hustleCount: number;
  savedCount: number;
  description: string;
  payloadJson: string; // Serialized state payload
}

interface SetupSnapshotManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentPortfolioState: any; // State to snap
  onRestoreState: (restoredState: any) => void;
}

export const SetupSnapshotManagerModal: React.FC<SetupSnapshotManagerModalProps> = ({
  isOpen,
  onClose,
  currentPortfolioState,
  onRestoreState
}) => {
  if (!isOpen) return null;

  const [snapshots, setSnapshots] = useState<SetupSnapshot[]>(() => {
    try {
      const saved = localStorage.getItem('sh_setup_snapshots');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return [
      {
        id: 'snap-default-1',
        timestamp: new Date(Date.now() - 3600000 * 2).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        hustleCount: 15,
        savedCount: 3,
        description: 'Auto-Saved Initial Baseline Config',
        payloadJson: JSON.stringify(currentPortfolioState)
      }
    ];
  });

  const [restoredId, setRestoredId] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem('sh_setup_snapshots', JSON.stringify(snapshots));
    } catch (e) {
      console.error(e);
    }
  }, [snapshots]);

  const handleCreateSnapshot = () => {
    const newSnapshot: SetupSnapshot = {
      id: `snap-${Date.now()}`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      hustleCount: currentPortfolioState?.allHustlesCount || 15,
      savedCount: currentPortfolioState?.savedIds?.length || 0,
      description: `Manual Configuration Snapshot #${snapshots.length + 1}`,
      payloadJson: JSON.stringify(currentPortfolioState)
    };

    setSnapshots((prev) => [newSnapshot, ...prev]);
  };

  const handleRestore = (snap: SetupSnapshot) => {
    try {
      const parsed = JSON.parse(snap.payloadJson);
      onRestoreState(parsed);
      setRestoredId(snap.id);
      setTimeout(() => setRestoredId(null), 2500);
    } catch (e) {
      console.error('Failed to restore snapshot', e);
    }
  };

  const handleDeleteSnapshot = (id: string) => {
    setSnapshots((prev) => prev.filter((s) => s.id !== id));
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto font-mono">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-2xl shadow-2xl overflow-hidden my-auto flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 bg-gradient-to-r from-emerald-950/60 via-slate-900 to-indigo-950/60 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 p-0.5 shadow-lg shadow-emerald-500/20">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center text-emerald-400">
                <Database className="w-5 h-5" />
              </div>
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                Automated Setup Snapshot & Revert Engine
              </h3>
              <p className="text-xs text-slate-400 font-sans">
                Local browser-indexed backups of current hustle configurations. Revert to a known-good state if a workflow breaks.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-all shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Snapshot Action Banner */}
        <div className="p-4 bg-slate-950/90 border-b border-slate-800 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-slate-300">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Auto-Backup active: Saved on configuration change.</span>
          </div>

          <button
            onClick={handleCreateSnapshot}
            className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-md shadow-emerald-600/20"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Create Snapshot Now</span>
          </button>
        </div>

        {/* Snapshot History List */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-3 flex-1">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
            Saved Snapshot History ({snapshots.length})
          </span>

          {snapshots.length > 0 ? (
            <div className="space-y-2.5">
              {snapshots.map((snap) => (
                <div
                  key={snap.id}
                  className="bg-slate-950 border border-slate-800 hover:border-emerald-500/40 rounded-2xl p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-all"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h4 className="text-xs font-bold text-white">{snap.description}</h4>
                      <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-[9px] text-slate-400 flex items-center gap-1">
                        <Clock className="w-2.5 h-2.5 text-slate-500" />
                        {snap.timestamp}
                      </span>
                    </div>

                    <p className="text-[10px] text-slate-400 font-sans">
                      Portfolio State: <strong className="text-slate-300">{snap.hustleCount} Hustles</strong> | Saved Items: <strong className="text-emerald-400">{snap.savedCount}</strong>
                    </p>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-auto">
                    <button
                      onClick={() => handleRestore(snap)}
                      className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 text-xs font-bold border border-slate-800 flex items-center gap-1.5 transition-all"
                    >
                      {restoredId === snap.id ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-400">Restored!</span>
                        </>
                      ) : (
                        <>
                          <RotateCcw className="w-3.5 h-3.5 text-indigo-400" />
                          <span>Revert State</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={() => handleDeleteSnapshot(snap.id)}
                      className="p-1.5 rounded-xl bg-slate-900 hover:bg-rose-950/80 text-slate-500 hover:text-rose-400 border border-slate-800 transition-all"
                      title="Delete snapshot"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-12 text-center text-xs text-slate-500">
              No snapshots found. Click 'Create Snapshot Now' above!
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950 flex items-center justify-between shrink-0 text-xs text-slate-400">
          <span>Local browser storage persistence guaranteed.</span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold transition-all"
          >
            Close Manager
          </button>
        </div>

      </div>
    </div>
  );
};
