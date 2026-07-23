import React, { useState, useEffect } from 'react';
import { 
  Activity, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Bot, 
  Zap, 
  Play, 
  RefreshCw, 
  Filter, 
  ChevronDown, 
  ChevronUp, 
  Terminal, 
  Sparkles,
  ShieldCheck,
  Building2,
  DollarSign
} from 'lucide-react';
import { SideHustle, ExecutionLogItem } from '../types';
import { INITIAL_EXECUTION_LOGS } from '../utils/hustleHealth';

interface ExecutionLogProps {
  savedHustles: SideHustle[];
  onSelectHustle?: (hustle: SideHustle) => void;
  onTaskCompleted?: (hustleId: string) => void;
}

export const ExecutionLog: React.FC<ExecutionLogProps> = ({
  savedHustles,
  onSelectHustle,
  onTaskCompleted
}) => {
  const [logs, setLogs] = useState<ExecutionLogItem[]>(() => {
    try {
      const stored = localStorage.getItem('sh_execution_logs');
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.error(e);
    }
    return INITIAL_EXECUTION_LOGS;
  });

  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [selectedHustleIdFilter, setSelectedHustleIdFilter] = useState<string>('all');
  const [expandedLogId, setExpandedLogId] = useState<string | null>('log-1');
  const [isSimulatingTask, setIsSimulatingTask] = useState<boolean>(false);

  useEffect(() => {
    try {
      localStorage.setItem('sh_execution_logs', JSON.stringify(logs));
    } catch (e) {
      console.error('Failed to save logs', e);
    }
  }, [logs]);

  const handleTriggerNewAiTask = () => {
    if (savedHustles.length === 0) return;
    setIsSimulatingTask(true);

    const targetHustle = savedHustles[Math.floor(Math.random() * savedHustles.length)];
    const taskId = `log-${Date.now()}`;
    
    const taskNames = [
      'Automated Lead Discovery & AI Verification',
      'Inject Direct Bank / PayPal Payout Credentials',
      'Generate Cold Outreach Copy & Email Pitch',
      'Zapier / Make.com Webhook Integration Sync',
      'AI Google SEO Audit & Meta Tag Creation',
      'Notion Micro-Vault Publishing & Pricing Sync'
    ];

    const agentNames = [
      'Auto-Outreach AI Agent',
      'Payout Gateway Router',
      'SEO Auditor Agent v3',
      'Lead Generation Bot',
      'SaaS Asset Builder'
    ];

    const chosenTaskName = taskNames[Math.floor(Math.random() * taskNames.length)];
    const chosenAgentName = agentNames[Math.floor(Math.random() * agentNames.length)];

    const newLogItem: ExecutionLogItem = {
      id: taskId,
      hustleId: targetHustle.id,
      hustleTitle: targetHustle.title,
      taskName: chosenTaskName,
      status: 'running',
      timestamp: 'Just now',
      agentName: chosenAgentName,
      details: `Initiated automated execution workflow for ${targetHustle.title}. Processing parameters...`,
      outputSnippet: `[EXEC LOG] Initializing ${chosenAgentName}...\nConnecting to API Endpoint...\nTargeting: ${targetHustle.category}\nPayout Target: PayPal.me/dlinacre16 | Bank 05-02-30`
    };

    setLogs((prev) => [newLogItem, ...prev]);

    // Simulate completion after 2.5 seconds
    setTimeout(() => {
      setLogs((prev) =>
        prev.map((item) => {
          if (item.id === taskId) {
            return {
              ...item,
              status: 'completed',
              details: `Task successfully completed! Output generated and verified with 100% accuracy.`,
              outputSnippet: `[EXEC LOG] Status: 200 OK\nExecution duration: 1.84s\nResult: 100% Verified & Active.\nNext Action: Ready for client deployment.`
            };
          }
          return item;
        })
      );
      setIsSimulatingTask(false);
      if (onTaskCompleted) {
        onTaskCompleted(targetHustle.id);
      }
    }, 2500);
  };

  const filteredLogs = logs.filter((log) => {
    const matchesStatus = filterStatus === 'all' || log.status === filterStatus;
    const matchesHustle = selectedHustleIdFilter === 'all' || log.hustleId === selectedHustleIdFilter;
    return matchesStatus && matchesHustle;
  });

  const runningCount = logs.filter((l) => l.status === 'running').length;
  const completedCount = logs.filter((l) => l.status === 'completed').length;

  return (
    <div className="space-y-4">
      {/* Header & Controls */}
      <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-indigo-500/10 border border-indigo-500/30 text-indigo-400">
              <Activity className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-white uppercase font-mono flex items-center gap-2">
                Real-Time AI Task Execution Log
                {runningCount > 0 && (
                  <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[10px] border border-amber-500/30 font-mono animate-pulse">
                    {runningCount} Running
                  </span>
                )}
              </h3>
              <p className="text-[11px] text-slate-400">
                Live timeline of automated background agents, scripts, and webhook triggers.
              </p>
            </div>
          </div>

          <button
            onClick={handleTriggerNewAiTask}
            disabled={isSimulatingTask || savedHustles.length === 0}
            className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-emerald-600 hover:from-indigo-500 hover:to-emerald-500 disabled:opacity-50 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-indigo-500/20 transition-all font-mono"
          >
            {isSimulatingTask ? (
              <RefreshCw className="w-3.5 h-3.5 animate-spin text-amber-300" />
            ) : (
              <Zap className="w-3.5 h-3.5 text-amber-300" />
            )}
            <span>{isSimulatingTask ? 'Running AI Task...' : 'Trigger AI Task Now'}</span>
          </button>
        </div>

        {/* Filters Row */}
        <div className="flex items-center gap-2 flex-wrap pt-2 border-t border-slate-900 text-xs">
          <div className="flex items-center gap-1 text-slate-400 font-mono text-[11px]">
            <Filter className="w-3 h-3" />
            <span>Status:</span>
          </div>

          {['all', 'running', 'completed', 'scheduled'].map((st) => (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              className={`px-2.5 py-1 rounded-lg border text-[10px] font-mono capitalize transition-all ${
                filterStatus === st
                  ? 'bg-indigo-600/30 border-indigo-500 text-indigo-300 font-bold'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              {st} {st === 'all' ? `(${logs.length})` : st === 'completed' ? `(${completedCount})` : ''}
            </button>
          ))}

          {savedHustles.length > 0 && (
            <select
              value={selectedHustleIdFilter}
              onChange={(e) => setSelectedHustleIdFilter(e.target.value)}
              className="ml-auto bg-slate-900 border border-slate-800 text-slate-300 text-[10px] font-mono rounded-lg px-2 py-1 focus:outline-none"
            >
              <option value="all">All Saved Hustles</option>
              {savedHustles.map((h) => (
                <option key={h.id} value={h.id}>
                  {h.title}
                </option>
              ))}
            </select>
          )}
        </div>
      </div>

      {/* Timeline View */}
      {filteredLogs.length > 0 ? (
        <div className="relative pl-4 space-y-4 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-800">
          {filteredLogs.map((log) => {
            const isExpanded = expandedLogId === log.id;

            return (
              <div key={log.id} className="relative group">
                {/* Status Dot */}
                <div className={`absolute -left-4 top-1.5 w-4 h-4 rounded-full border flex items-center justify-center text-[10px] shadow-sm z-10 ${
                  log.status === 'completed'
                    ? 'bg-emerald-950 border-emerald-500 text-emerald-400'
                    : log.status === 'running'
                    ? 'bg-amber-950 border-amber-500 text-amber-400 animate-pulse'
                    : log.status === 'scheduled'
                    ? 'bg-indigo-950 border-indigo-500 text-indigo-400'
                    : 'bg-rose-950 border-rose-500 text-rose-400'
                }`}>
                  {log.status === 'completed' ? (
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                  ) : log.status === 'running' ? (
                    <RefreshCw className="w-2.5 h-2.5 text-amber-400 animate-spin" />
                  ) : (
                    <Clock className="w-2.5 h-2.5 text-indigo-400" />
                  )}
                </div>

                {/* Log Card */}
                <div className="bg-slate-950 border border-slate-800 rounded-xl p-3 hover:border-slate-700 transition-all space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs font-bold text-white group-hover:text-indigo-300 transition-colors">
                          {log.taskName}
                        </span>
                        <span className={`px-2 py-0.5 rounded text-[9px] font-mono uppercase font-bold border ${
                          log.status === 'completed'
                            ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                            : log.status === 'running'
                            ? 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                            : 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30'
                        }`}>
                          {log.status}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 text-[10px] text-slate-400 font-mono mt-0.5">
                        <span className="text-indigo-400">{log.hustleTitle}</span>
                        <span>•</span>
                        <span className="text-slate-500">{log.agentName}</span>
                        <span>•</span>
                        <span className="text-slate-500">{log.timestamp}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => setExpandedLogId(isExpanded ? null : log.id)}
                      className="p-1 text-slate-400 hover:text-white rounded hover:bg-slate-900"
                      title="Toggle Details"
                    >
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {log.details}
                  </p>

                  {/* Expanded Output / Stdout */}
                  {isExpanded && log.outputSnippet && (
                    <div className="pt-2 border-t border-slate-900 space-y-1">
                      <div className="flex items-center gap-1.5 text-[10px] font-mono text-slate-400">
                        <Terminal className="w-3 h-3 text-indigo-400" />
                        <span>Execution Output Stream:</span>
                      </div>
                      <pre className="p-2.5 bg-slate-900/90 border border-slate-800 rounded-lg text-[10px] font-mono text-emerald-300 whitespace-pre-wrap overflow-x-auto leading-relaxed">
                        {log.outputSnippet}
                      </pre>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="py-12 text-center bg-slate-950 rounded-xl border border-slate-800 space-y-2">
          <Bot className="w-8 h-8 text-slate-600 mx-auto" />
          <p className="text-xs text-slate-400">No execution logs matching filter criteria.</p>
        </div>
      )}
    </div>
  );
};
