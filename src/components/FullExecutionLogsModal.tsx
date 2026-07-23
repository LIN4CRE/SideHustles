import React, { useState } from 'react';
import { 
  X, 
  Terminal, 
  Search, 
  Download, 
  Trash2, 
  CheckCircle2, 
  Clock, 
  RefreshCw, 
  Filter, 
  Bot, 
  Zap, 
  Activity,
  Layers,
  Copy,
  Check
} from 'lucide-react';
import { SideHustle, ExecutionLogItem } from '../types';

interface FullExecutionLogsModalProps {
  isOpen: boolean;
  onClose: () => void;
  logs: ExecutionLogItem[];
  savedHustles: SideHustle[];
  onClearLogs?: () => void;
}

export const FullExecutionLogsModal: React.FC<FullExecutionLogsModalProps> = ({
  isOpen,
  onClose,
  logs,
  savedHustles,
  onClearLogs
}) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedHustleId, setSelectedHustleId] = useState<string>('all');
  const [copiedLogId, setCopiedLogId] = useState<string | null>(null);

  if (!isOpen) return null;

  const filteredLogs = logs.filter((log) => {
    const matchesSearch = 
      log.taskName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.agentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.hustleTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.details.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || log.status === statusFilter;
    const matchesHustle = selectedHustleId === 'all' || log.hustleId === selectedHustleId;
    return matchesSearch && matchesStatus && matchesHustle;
  });

  const handleExportLogs = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(logs, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `side_hustle_execution_logs_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleCopyLogSnippet = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedLogId(id);
    setTimeout(() => setCopiedLogId(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-4xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Modal Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-gradient-to-r from-slate-900 via-indigo-950/80 to-slate-900">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-400">
              <Terminal className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                Full AI Agent Execution Log Console
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-mono border border-emerald-500/30">
                  {logs.length} Total Events
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Detailed timeline, agent stdout/stderr streams, and history across all your side hustles.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleExportLogs}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono flex items-center gap-1.5 border border-slate-700 transition-all"
              title="Export JSON Logs"
            >
              <Download className="w-3.5 h-3.5 text-emerald-400" />
              <span>Export JSON</span>
            </button>

            {onClearLogs && (
              <button
                onClick={onClearLogs}
                className="px-3 py-1.5 rounded-lg bg-rose-950/50 hover:bg-rose-900/60 text-rose-300 text-xs font-mono flex items-center gap-1.5 border border-rose-800/50 transition-all"
                title="Clear Logs"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear</span>
              </button>
            )}

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-all ml-2"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Filters Bar */}
        <div className="p-4 bg-slate-950 border-b border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          {/* Search Input */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search logs, agents, or tasks..."
              className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-1.5 bg-slate-900 border border-slate-800 rounded-xl px-2.5 py-1">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-transparent text-slate-200 text-xs w-full focus:outline-none font-mono"
            >
              <option value="all" className="bg-slate-900">All Statuses</option>
              <option value="completed" className="bg-slate-900">Completed Only</option>
              <option value="running" className="bg-slate-900">Running / Active</option>
              <option value="scheduled" className="bg-slate-900">Scheduled</option>
            </select>
          </div>

          {/* Hustle Filter */}
          <div className="flex items-center gap-1.5 bg-slate-900 border border-slate-800 rounded-xl px-2.5 py-1">
            <Layers className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={selectedHustleId}
              onChange={(e) => setSelectedHustleId(e.target.value)}
              className="bg-transparent text-slate-200 text-xs w-full focus:outline-none font-mono truncate"
            >
              <option value="all" className="bg-slate-900">All Hustles ({savedHustles.length})</option>
              {savedHustles.map((h) => (
                <option key={h.id} value={h.id} className="bg-slate-900">
                  {h.title}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Scrollable Logs Body */}
        <div className="p-6 overflow-y-auto space-y-4 flex-1">
          {filteredLogs.length > 0 ? (
            <div className="space-y-3">
              {filteredLogs.map((log) => (
                <div 
                  key={log.id} 
                  className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-3 hover:border-slate-700 transition-all font-sans"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-900 pb-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase font-bold border ${
                        log.status === 'completed'
                          ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                          : log.status === 'running'
                          ? 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                          : 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30'
                      }`}>
                        {log.status}
                      </span>
                      <h4 className="text-sm font-bold text-white">{log.taskName}</h4>
                    </div>

                    <div className="flex items-center gap-2 text-[11px] font-mono text-slate-400">
                      <span className="text-indigo-400 font-bold">{log.agentName}</span>
                      <span>•</span>
                      <span>{log.timestamp}</span>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="text-xs text-slate-300 font-mono flex items-center gap-1.5">
                      <span className="text-slate-500">Target Hustle:</span>
                      <span className="text-emerald-400 font-bold">{log.hustleTitle}</span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {log.details}
                    </p>
                  </div>

                  {log.outputSnippet && (
                    <div className="bg-slate-900/90 rounded-lg p-3 border border-slate-800/80 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono text-slate-400 uppercase font-bold flex items-center gap-1">
                          <Terminal className="w-3 h-3 text-indigo-400" />
                          Stdout Output Stream
                        </span>
                        <button
                          onClick={() => handleCopyLogSnippet(log.id, log.outputSnippet || '')}
                          className="text-[10px] text-slate-400 hover:text-white flex items-center gap-1 font-mono"
                        >
                          {copiedLogId === log.id ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                          <span>{copiedLogId === log.id ? 'Copied' : 'Copy Log'}</span>
                        </button>
                      </div>
                      <pre className="text-[11px] font-mono text-emerald-300 whitespace-pre-wrap leading-relaxed overflow-x-auto">
                        {log.outputSnippet}
                      </pre>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="py-16 text-center space-y-3 bg-slate-950 rounded-2xl border border-slate-800">
              <Bot className="w-10 h-10 text-slate-600 mx-auto" />
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-white">No Execution Logs Found</h3>
                <p className="text-xs text-slate-400">Try adjusting your search keywords or status filters above.</p>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
