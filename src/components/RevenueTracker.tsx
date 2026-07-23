import React, { useState, useEffect } from 'react';
import { SideHustle } from '../types';
import { 
  DollarSign, 
  TrendingUp, 
  Plus, 
  Trash2, 
  CheckCircle2, 
  Calendar, 
  PieChart, 
  ChevronDown, 
  ChevronUp,
  Sparkles,
  Award,
  Zap,
  Clock,
  RefreshCw
} from 'lucide-react';

interface RevenueEntry {
  id: string;
  date: string;
  amount: number;
  note?: string;
}

interface AutomationLogEntry {
  id: string;
  hustleId: string;
  blueprintTitle: string;
  platform: 'Zapier' | 'Make.com' | 'n8n' | 'Custom API';
  status: 'success' | 'warning' | 'in_progress';
  timestamp: string;
  latencyMs: number;
  details: string;
}

interface RevenueTrackerProps {
  savedHustles: SideHustle[];
  onSelectHustle?: (hustle: SideHustle) => void;
}

export const RevenueTracker: React.FC<RevenueTrackerProps> = ({ savedHustles, onSelectHustle }) => {
  // Top view toggle: 'revenue' or 'automation'
  const [activeView, setActiveView] = useState<'revenue' | 'automation'>('revenue');

  // Store revenue entries by hustleId: { [hustleId]: RevenueEntry[] }
  const [revenueLogs, setRevenueLogs] = useState<Record<string, RevenueEntry[]>>(() => {
    try {
      const stored = localStorage.getItem('sh_revenue_tracker_logs');
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.error('Failed to parse revenue logs', e);
    }
    return {
      'ai-outreach-agency': [
        { id: '1', date: new Date().toISOString().split('T')[0], amount: 250, note: 'First retainer deposit' }
      ]
    };
  });

  // Store Automation Execution History by hustleId
  const [automationLogs, setAutomationLogs] = useState<AutomationLogEntry[]>(() => {
    try {
      const stored = localStorage.getItem('sh_automation_exec_logs');
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.error('Failed to parse automation logs', e);
    }
    return [
      {
        id: 'aut-1',
        hustleId: 'ai-outreach-agency',
        blueprintTitle: 'Zapier Webhook: Lead Intake & Gemini Enrichment',
        platform: 'Zapier',
        status: 'success',
        timestamp: new Date(Date.now() - 1000 * 60 * 12).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
        latencyMs: 310,
        details: '1 new B2B prospect enriched & added to CRM'
      },
      {
        id: 'aut-2',
        hustleId: 'ai-outreach-agency',
        blueprintTitle: 'Make.com Scenario: Automated Email Sequence',
        platform: 'Make.com',
        status: 'success',
        timestamp: new Date(Date.now() - 1000 * 60 * 45).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
        latencyMs: 540,
        details: 'Sent personalized pitch email via Gmail API'
      },
      {
        id: 'aut-3',
        hustleId: 'ai-shorts-channel',
        blueprintTitle: 'n8n Workflow: YouTube Shorts Auto-Publisher',
        platform: 'n8n',
        status: 'success',
        timestamp: new Date(Date.now() - 1000 * 60 * 120).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
        latencyMs: 820,
        details: 'Video file rendered & uploaded to YouTube API'
      }
    ];
  });

  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [filterHustleId, setFilterHustleId] = useState<string>('all');

  // Track expanded hustle for logging history
  const [expandedHustleId, setExpandedHustleId] = useState<string | null>(
    savedHustles[0]?.id || null
  );

  // Form input states
  const [inputAmount, setInputAmount] = useState<string>('');
  const [inputNote, setInputNote] = useState<string>('');
  const [inputDate, setInputDate] = useState<string>(new Date().toISOString().split('T')[0]);

  useEffect(() => {
    try {
      localStorage.setItem('sh_revenue_tracker_logs', JSON.stringify(revenueLogs));
    } catch (e) {
      console.error('Failed to save revenue logs', e);
    }
  }, [revenueLogs]);

  useEffect(() => {
    try {
      localStorage.setItem('sh_automation_exec_logs', JSON.stringify(automationLogs));
    } catch (e) {
      console.error('Failed to save automation logs', e);
    }
  }, [automationLogs]);

  const handleAddLog = (hustleId: string) => {
    const numericAmount = parseFloat(inputAmount);
    if (isNaN(numericAmount) || numericAmount <= 0) return;

    const newEntry: RevenueEntry = {
      id: Date.now().toString(),
      date: inputDate || new Date().toISOString().split('T')[0],
      amount: numericAmount,
      note: inputNote.trim() || 'Daily Earnings'
    };

    setRevenueLogs((prev) => ({
      ...prev,
      [hustleId]: [newEntry, ...(prev[hustleId] || [])]
    }));

    setInputAmount('');
    setInputNote('');
  };

  const handleDeleteLog = (hustleId: string, entryId: string) => {
    setRevenueLogs((prev) => ({
      ...prev,
      [hustleId]: (prev[hustleId] || []).filter((item) => item.id !== entryId)
    }));
  };

  const handleTriggerTestAutomation = (hustleId?: string) => {
    setIsSimulating(true);
    setTimeout(() => {
      const targetHustle = savedHustles.find(h => h.id === hustleId) || savedHustles[0];
      const platforms: ('Zapier' | 'Make.com' | 'n8n')[] = ['Zapier', 'Make.com', 'n8n'];
      const chosenPlatform = platforms[Math.floor(Math.random() * platforms.length)];
      
      const newAutoLog: AutomationLogEntry = {
        id: 'aut-' + Date.now(),
        hustleId: targetHustle ? targetHustle.id : 'general',
        blueprintTitle: `${chosenPlatform} Workflow: ${targetHustle ? targetHustle.title : 'Automation Pipeline'} Sync`,
        platform: chosenPlatform,
        status: 'success',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
        latencyMs: Math.floor(Math.random() * 400) + 150,
        details: `Processed webhook payload successfully (HTTP 200 OK)`
      };

      setAutomationLogs(prev => [newAutoLog, ...prev]);
      setIsSimulating(false);
    }, 600);
  };

  const getHustleTotal = (hustleId: string) => {
    const logs = revenueLogs[hustleId] || [];
    return logs.reduce((sum, entry) => sum + entry.amount, 0);
  };

  // Overall Portfolio Aggregates
  const totalActualRevenue = savedHustles.reduce((acc, h) => acc + getHustleTotal(h.id), 0);
  const totalTargetPotential = savedHustles.reduce((acc, h) => acc + h.monthlyRevenuePotential, 0);
  const overallProgress = totalTargetPotential > 0 
    ? Math.min(100, Math.round((totalActualRevenue / totalTargetPotential) * 100))
    : 0;

  const filteredAutoLogs = filterHustleId === 'all'
    ? automationLogs
    : automationLogs.filter(l => l.hustleId === filterHustleId);

  if (savedHustles.length === 0) {
    return (
      <div className="p-4 text-center bg-slate-950/60 rounded-xl border border-slate-800 space-y-2">
        <DollarSign className="w-6 h-6 text-slate-500 mx-auto" />
        <p className="text-xs text-slate-400">Save side hustles to track your daily earnings and monitor Zapier/Make automation history.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">

      {/* Sub-navigation tabs: Revenue Goals vs Automation Logs */}
      <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
        <button
          onClick={() => setActiveView('revenue')}
          className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
            activeView === 'revenue'
              ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <DollarSign className="w-3.5 h-3.5" />
          <span>Earnings & Potential</span>
        </button>

        <button
          onClick={() => setActiveView('automation')}
          className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
            activeView === 'automation'
              ? 'bg-amber-600 text-white shadow-md shadow-amber-600/20'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Zap className="w-3.5 h-3.5" />
          <span>Automation History ({automationLogs.length})</span>
        </button>
      </div>

      {activeView === 'revenue' ? (
        <>
          {/* Overall Portfolio Progress Bar Header */}
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <PieChart className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-bold text-white block">Portfolio Revenue Goal</span>
                  <span className="text-[10px] text-slate-400">Actual vs Target Potential</span>
                </div>
              </div>

              <div className="text-right">
                <span className="text-xs font-bold font-mono text-emerald-400">
                  ${totalActualRevenue.toLocaleString()}
                </span>
                <span className="text-[10px] text-slate-500 font-mono block">
                  / ${totalTargetPotential.toLocaleString()} target
                </span>
              </div>
            </div>

            {/* Combined Progress Bar */}
            <div className="space-y-1">
              <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                <span>Overall Target Pace</span>
                <span className="text-emerald-400 font-bold">{overallProgress}%</span>
              </div>
              <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full transition-all duration-300"
                  style={{ width: `${overallProgress}%` }}
                />
              </div>
            </div>
          </div>

          {/* List of Saved Hustles with Mini Progress Bars */}
          <div className="space-y-3">
            <span className="text-[11px] font-bold uppercase tracking-wider font-mono text-slate-400 block">
              Daily Earnings Log per Hustle
            </span>

            {savedHustles.map((hustle) => {
              const totalLogged = getHustleTotal(hustle.id);
              const percent = Math.min(100, Math.round((totalLogged / hustle.monthlyRevenuePotential) * 100));
              const isExpanded = expandedHustleId === hustle.id;
              const entries = revenueLogs[hustle.id] || [];

              return (
                <div 
                  key={hustle.id} 
                  className={`bg-slate-950 rounded-xl border transition-all ${
                    isExpanded ? 'border-indigo-500/50 ring-1 ring-indigo-500/20' : 'border-slate-800 hover:border-slate-700'
                  }`}
                >
                  
                  {/* Header Card Summary */}
                  <div 
                    onClick={() => setExpandedHustleId(isExpanded ? null : hustle.id)}
                    className="p-3.5 cursor-pointer space-y-2 select-none"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2 truncate">
                        <span className="text-xs font-bold text-white truncate">{hustle.title}</span>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <span className="text-xs font-bold font-mono text-emerald-400">
                          ${totalLogged.toLocaleString()}
                        </span>
                        <span className="text-[10px] text-slate-500 font-mono">
                          / ${hustle.monthlyRevenuePotential.toLocaleString()}
                        </span>
                        {isExpanded ? (
                          <ChevronUp className="w-4 h-4 text-slate-400" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-slate-400" />
                        )}
                      </div>
                    </div>

                    {/* Mini Progress Bar */}
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-[10px]">
                        <span className="text-slate-400 font-mono">{entries.length} entry log{entries.length === 1 ? '' : 's'}</span>
                        <span className={`font-mono font-bold ${percent >= 100 ? 'text-amber-400' : 'text-emerald-400'}`}>
                          {percent}% Target Met
                        </span>
                      </div>

                      <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden border border-slate-800">
                        <div 
                          className={`h-full transition-all duration-300 ${
                            percent >= 100 
                              ? 'bg-gradient-to-r from-amber-400 to-emerald-400' 
                              : 'bg-gradient-to-r from-indigo-500 to-emerald-400'
                          }`}
                          style={{ width: `${percent}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Expanded Logging Form & History Drawer */}
                  {isExpanded && (
                    <div className="p-3.5 border-t border-slate-800/80 bg-slate-900/60 rounded-b-xl space-y-3">
                      
                      {/* Quick Input Form */}
                      <div className="space-y-2">
                        <span className="text-[10px] font-bold uppercase text-slate-400 block font-mono">
                          + Add New Earnings Log
                        </span>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                          <div className="relative">
                            <DollarSign className="w-3.5 h-3.5 text-slate-500 absolute left-2.5 top-2.5" />
                            <input
                              type="number"
                              placeholder="Amount ($)"
                              value={inputAmount}
                              onChange={(e) => setInputAmount(e.target.value)}
                              className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-7 pr-2 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                            />
                          </div>

                          <input
                            type="date"
                            value={inputDate}
                            onChange={(e) => setInputDate(e.target.value)}
                            className="bg-slate-950 border border-slate-800 rounded-lg px-2 py-1.5 text-xs text-slate-300 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                          />

                          <button
                            onClick={() => handleAddLog(hustle.id)}
                            className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs flex items-center justify-center gap-1 shadow-sm"
                          >
                            <Plus className="w-3.5 h-3.5" />
                            <span>Log Earnings</span>
                          </button>
                        </div>

                        <input
                          type="text"
                          placeholder="Optional note (e.g., Client deposit, Stripe payout...)"
                          value={inputNote}
                          onChange={(e) => setInputNote(e.target.value)}
                          className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-slate-300 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                        />
                      </div>

                      {/* History Log */}
                      {entries.length > 0 ? (
                        <div className="space-y-1.5 pt-2 border-t border-slate-800/60">
                          <span className="text-[10px] font-bold uppercase text-slate-400 block font-mono">
                            Recent Logged Earnings
                          </span>
                          
                          <div className="space-y-1 max-h-40 overflow-y-auto">
                            {entries.map((entry) => (
                              <div 
                                key={entry.id} 
                                className="bg-slate-950 border border-slate-800/80 rounded-lg p-2 flex items-center justify-between text-xs"
                              >
                                <div>
                                  <span className="font-bold text-emerald-400 font-mono mr-2">+${entry.amount.toLocaleString()}</span>
                                  <span className="text-slate-300">{entry.note}</span>
                                </div>

                                <div className="flex items-center gap-2 text-[10px] text-slate-500 font-mono">
                                  <span>{entry.date}</span>
                                  <button
                                    onClick={() => handleDeleteLog(hustle.id, entry.id)}
                                    className="p-1 rounded hover:bg-rose-950 text-slate-500 hover:text-rose-400"
                                    title="Delete log"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <p className="text-[11px] text-slate-500 italic pt-1">No revenue logs added yet for this hustle.</p>
                      )}

                    </div>
                  )}

                </div>
              );
            })}
          </div>
        </>
      ) : (
        /* TASK AUTOMATION HISTORY LOG VIEW */
        <div className="space-y-4">
          
          {/* Operational Health Header Banner */}
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
                  <Zap className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Zapier & Make Automation Health</h4>
                  <span className="text-[10px] text-emerald-400 font-mono flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                    100% Workflows Operational
                  </span>
                </div>
              </div>

              <button
                onClick={() => handleTriggerTestAutomation()}
                disabled={isSimulating}
                className="px-2.5 py-1.5 rounded-lg bg-amber-600/20 hover:bg-amber-600/30 text-amber-300 border border-amber-500/30 text-xs font-medium flex items-center gap-1.5 transition-all shrink-0"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isSimulating ? 'animate-spin' : ''}`} />
                <span>Test Webhook</span>
              </button>
            </div>

            {/* Filter by Hustle dropdown */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-800/80 text-xs">
              <span className="text-slate-400 font-mono text-[10px] uppercase">Filter Blueprint:</span>
              <select
                value={filterHustleId}
                onChange={(e) => setFilterHustleId(e.target.value)}
                className="bg-slate-900 border border-slate-800 rounded-lg px-2 py-1 text-slate-300 text-xs focus:outline-none"
              >
                <option value="all">All Saved Blueprints ({savedHustles.length})</option>
                {savedHustles.map(h => (
                  <option key={h.id} value={h.id}>{h.title}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Execution History Feed */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 font-bold uppercase tracking-wider">
              <span>Latest Workflow Executions</span>
              <span>Timestamp & Latency</span>
            </div>

            {filteredAutoLogs.length > 0 ? (
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {filteredAutoLogs.map((log) => {
                  const hustle = savedHustles.find(h => h.id === log.hustleId);
                  return (
                    <div 
                      key={log.id} 
                      className="bg-slate-950 border border-slate-800/90 hover:border-slate-700 rounded-xl p-3 space-y-1.5 transition-all"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2 truncate">
                          <span className={`px-1.5 py-0.5 rounded text-[9px] font-mono font-bold uppercase border ${
                            log.platform === 'Zapier'
                              ? 'bg-orange-500/10 text-orange-400 border-orange-500/20'
                              : log.platform === 'Make.com'
                              ? 'bg-purple-500/10 text-purple-400 border-purple-500/20'
                              : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                          }`}>
                            {log.platform}
                          </span>
                          <span className="text-xs font-bold text-white truncate">
                            {log.blueprintTitle}
                          </span>
                        </div>

                        <div className="flex items-center gap-1.5 text-[10px] font-mono shrink-0">
                          <span className="text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">
                            200 OK
                          </span>
                        </div>
                      </div>

                      <p className="text-[11px] text-slate-300 leading-snug">
                        {log.details}
                      </p>

                      <div className="flex items-center justify-between text-[10px] text-slate-500 font-mono pt-1 border-t border-slate-900">
                        <span>Hustle: {hustle ? hustle.title : 'Portfolio'}</span>
                        <div className="flex items-center gap-2">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3 text-slate-500" />
                            {log.timestamp}
                          </span>
                          <span className="text-slate-400">({log.latencyMs}ms)</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="p-4 text-center bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-500">
                No automation history logs found for this filter.
              </div>
            )}
          </div>

        </div>
      )}

    </div>
  );
};
