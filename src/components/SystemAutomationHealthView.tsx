import React, { useState } from 'react';
import { Cpu, Server, Github, CheckCircle2, Wrench, RefreshCw, Flame, Terminal, Database, ShieldCheck } from 'lucide-react';

interface SystemAutomationHealthViewProps {
  onOpenAutomatedFixModal: () => void;
  onOpenLocalLlmHub: () => void;
}

export const SystemAutomationHealthView: React.FC<SystemAutomationHealthViewProps> = ({
  onOpenAutomatedFixModal,
  onOpenLocalLlmHub
}) => {
  const [syncStatus, setSyncStatus] = useState<string>('Active (Scheduled Task every 5 mins)');
  const [isSyncing, setIsSyncing] = useState<boolean>(false);

  const handleManualSync = async () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      setSyncStatus('Successfully synced with origin/main');
    }, 2000);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header Banner */}
      <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800 p-6 rounded-3xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/30 text-xs font-semibold mb-2">
            <Cpu className="w-3.5 h-3.5 text-indigo-400" />
            <span>Autonomous Operating Environment</span>
          </div>
          <h2 className="text-2xl font-bold text-white">System Health & Automation Controller</h2>
          <p className="text-xs text-slate-400 mt-1">
            Continuous GitHub auto-sync, Firebase Hosting & Firestore, and Local LLM/Obsidian bridge telemetry.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onOpenAutomatedFixModal}
            className="px-4 py-2.5 bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/40 rounded-xl text-xs font-bold flex items-center gap-2 transition-all"
          >
            <Wrench className="w-4 h-4 text-amber-400" />
            <span>1-Click Self-Healing Fix</span>
          </button>
        </div>
      </div>

      {/* Grid of System Modules */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Module 1: Continuous GitHub Auto-Sync */}
        <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 p-5 rounded-2xl space-y-4 shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-slate-950 border border-slate-800 text-white">
                <Github className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">GitHub Auto-Sync</h3>
                <span className="text-[11px] text-emerald-400 font-mono">origin/main</span>
              </div>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold">
              ACTIVE
            </span>
          </div>

          <div className="p-3 bg-slate-950 border border-slate-800/80 rounded-xl text-xs space-y-1 font-mono">
            <div className="text-slate-400">Scheduled Task Name:</div>
            <div className="text-indigo-300 font-bold">SideHustles_GitHub_AutoSync</div>
            <div className="text-[11px] text-slate-500">Frequency: Every 5 minutes</div>
          </div>

          <button
            onClick={handleManualSync}
            disabled={isSyncing}
            className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-colors"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
            <span>{isSyncing ? 'Syncing...' : 'Sync GitHub Now'}</span>
          </button>
        </div>

        {/* Module 2: Firebase Hosting & Firestore */}
        <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 p-5 rounded-2xl space-y-4 shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-slate-950 border border-slate-800 text-amber-400">
                <Flame className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">Firebase Suite</h3>
                <span className="text-[11px] text-slate-400 font-mono">Hosting & Rules</span>
              </div>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold">
              READY
            </span>
          </div>

          <div className="p-3 bg-slate-950 border border-slate-800/80 rounded-xl text-xs space-y-1 font-mono">
            <div className="text-slate-400">Config: <span className="text-slate-200">firebase.json</span></div>
            <div className="text-slate-400">Blueprint: <span className="text-slate-200">firebase-blueprint.json</span></div>
            <div className="text-[11px] text-emerald-400">Public Root: dist/</div>
          </div>

          <div className="text-xs text-slate-400 flex items-center gap-1.5 pt-1">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Firestore rules configured</span>
          </div>
        </div>

        {/* Module 3: Local LLM & Obsidian Bridge */}
        <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 p-5 rounded-2xl space-y-4 shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-slate-950 border border-slate-800 text-indigo-400">
                <Server className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">Obsidian NA10 Bridge</h3>
                <span className="text-[11px] text-slate-400 font-mono">Local LLM MCP</span>
              </div>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/30 text-[10px] font-bold">
              LISTENING
            </span>
          </div>

          <div className="p-3 bg-slate-950 border border-slate-800/80 rounded-xl text-xs space-y-1 font-mono">
            <div className="text-slate-400">MCP Endpoint:</div>
            <div className="text-indigo-300">/api/mcp/local-llm</div>
            <div className="text-[11px] text-slate-500">Vault: Obsidian AI Second Brain</div>
          </div>

          <button
            onClick={onOpenLocalLlmHub}
            className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-colors"
          >
            <Terminal className="w-3.5 h-3.5 text-indigo-400" />
            <span>Open LLM Hub Console</span>
          </button>
        </div>

      </div>
    </div>
  );
};
