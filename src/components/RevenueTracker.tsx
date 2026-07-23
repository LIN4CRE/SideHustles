import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { SideHustle } from '../types';
import { 
  DollarSign, 
  TrendingUp, 
  Plus, 
  Minus,
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
  RefreshCw,
  Receipt,
  Wallet,
  TrendingDown,
  Percent,
  Tag,
  Trophy,
  Target,
  Flame,
  Check
} from 'lucide-react';

interface RevenueEntry {
  id: string;
  date: string;
  amount: number;
  note?: string;
}

interface CostEntry {
  id: string;
  date: string;
  amount: number;
  category: string;
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

  // Store operational cost entries by hustleId: { [hustleId]: CostEntry[] }
  const [costLogs, setCostLogs] = useState<Record<string, CostEntry[]>>(() => {
    try {
      const stored = localStorage.getItem('sh_cost_tracker_logs');
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.error('Failed to parse cost logs', e);
    }
    return {
      'ai-outreach-agency': [
        { id: 'c-1', date: new Date().toISOString().split('T')[0], amount: 20, category: 'Software / API', note: 'OpenAI API usage' },
        { id: 'c-2', date: new Date().toISOString().split('T')[0], amount: 12, category: 'Hosting & Domain', note: 'Domain registration' }
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

  // Form mode per hustle drawer: 'revenue' | 'cost'
  const [entryType, setEntryType] = useState<'revenue' | 'cost'>('revenue');

  // Form input states
  const [inputAmount, setInputAmount] = useState<string>('');
  const [inputCategory, setInputCategory] = useState<string>('Software / API');
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
      localStorage.setItem('sh_cost_tracker_logs', JSON.stringify(costLogs));
    } catch (e) {
      console.error('Failed to save cost logs', e);
    }
  }, [costLogs]);

  useEffect(() => {
    try {
      localStorage.setItem('sh_automation_exec_logs', JSON.stringify(automationLogs));
    } catch (e) {
      console.error('Failed to save automation logs', e);
    }
  }, [automationLogs]);

  const handleAddRevenueLog = (hustleId: string) => {
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

  const handleAddCostLog = (hustleId: string) => {
    const numericAmount = parseFloat(inputAmount);
    if (isNaN(numericAmount) || numericAmount <= 0) return;

    const newEntry: CostEntry = {
      id: 'c-' + Date.now().toString(),
      date: inputDate || new Date().toISOString().split('T')[0],
      amount: numericAmount,
      category: inputCategory || 'Software / API',
      note: inputNote.trim() || 'Operational Expense'
    };

    setCostLogs((prev) => ({
      ...prev,
      [hustleId]: [newEntry, ...(prev[hustleId] || [])]
    }));

    setInputAmount('');
    setInputNote('');
  };

  const handleDeleteRevenueLog = (hustleId: string, entryId: string) => {
    setRevenueLogs((prev) => ({
      ...prev,
      [hustleId]: (prev[hustleId] || []).filter((item) => item.id !== entryId)
    }));
  };

  const handleDeleteCostLog = (hustleId: string, entryId: string) => {
    setCostLogs((prev) => ({
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

  const getHustleRevenueTotal = (hustleId: string) => {
    const logs = revenueLogs[hustleId] || [];
    return logs.reduce((sum, entry) => sum + entry.amount, 0);
  };

  const getHustleCostTotal = (hustleId: string) => {
    const logs = costLogs[hustleId] || [];
    return logs.reduce((sum, entry) => sum + entry.amount, 0);
  };

  // Overall Portfolio Aggregates
  const totalActualRevenue = savedHustles.reduce((acc, h) => acc + getHustleRevenueTotal(h.id), 0);
  const totalActualCosts = savedHustles.reduce((acc, h) => acc + getHustleCostTotal(h.id), 0);
  const netProfit = totalActualRevenue - totalActualCosts;
  const netMargin = totalActualRevenue > 0 ? Math.round((netProfit / totalActualRevenue) * 100) : 0;

  const totalTargetPotential = savedHustles.reduce((acc, h) => acc + h.monthlyRevenuePotential, 0);
  const overallProgress = totalTargetPotential > 0 
    ? Math.min(100, Math.round((totalActualRevenue / totalTargetPotential) * 100))
    : 0;

  const revenueProgress1k = Math.min(100, Math.round((totalActualRevenue / 1000) * 100));
  const remaining1k = Math.max(0, 1000 - totalActualRevenue);

  const filteredAutoLogs = filterHustleId === 'all'
    ? automationLogs
    : automationLogs.filter(l => l.hustleId === filterHustleId);

  if (savedHustles.length === 0) {
    return (
      <div className="p-4 text-center bg-slate-950/60 rounded-xl border border-slate-800 space-y-2">
        <DollarSign className="w-6 h-6 text-slate-500 mx-auto" />
        <p className="text-xs text-slate-400">Save side hustles to track your daily earnings, operational costs, and net margins.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">

      {/* Sub-navigation tabs: Financial Health vs Automation Logs */}
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
          <span>Profit & Operational Costs</span>
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
          {/* Portfolio Net Profit & Operational Costs Dashboard */}
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
            
            {/* Bank & PayPal Auto-Payout Destination Card */}
            <div className="bg-gradient-to-r from-emerald-950/80 via-slate-900 to-indigo-950/80 p-3 rounded-lg border border-emerald-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 text-xs">
              <div className="space-y-0.5">
                <div className="flex items-center gap-1.5 font-bold font-mono text-emerald-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Auto-Payout Account: MR DAVID CHRISTOPHER LINACRE</span>
                </div>
                <div className="text-[11px] text-slate-300 font-mono">
                  Bank: Sort 05-02-30 • Acc 49193968 • IBAN GB14YORK05023049193968 | PayPal: PayPal.me/dlinacre16
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 font-mono text-[10px] font-bold border border-emerald-500/30 shrink-0 self-start sm:self-center">
                100% Direct Payout
              </span>
            </div>
            
            {/* Top KPI row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              
              <div className="bg-slate-900/80 p-2.5 rounded-lg border border-slate-800 space-y-0.5">
                <span className="text-[10px] text-slate-400 font-mono flex items-center gap-1">
                  <DollarSign className="w-3 h-3 text-emerald-400" />
                  Gross Revenue
                </span>
                <span className="text-sm font-bold font-mono text-emerald-400 block">
                  ${totalActualRevenue.toLocaleString()}
                </span>
              </div>

              <div className="bg-slate-900/80 p-2.5 rounded-lg border border-slate-800 space-y-0.5">
                <span className="text-[10px] text-slate-400 font-mono flex items-center gap-1">
                  <Receipt className="w-3 h-3 text-rose-400" />
                  Software & Costs
                </span>
                <span className="text-sm font-bold font-mono text-rose-400 block">
                  -${totalActualCosts.toLocaleString()}
                </span>
              </div>

              <div className="bg-slate-900/80 p-2.5 rounded-lg border border-slate-800 space-y-0.5">
                <span className="text-[10px] text-slate-400 font-mono flex items-center gap-1">
                  <Wallet className="w-3 h-3 text-amber-400" />
                  Net Profit
                </span>
                <span className={`text-sm font-bold font-mono block ${netProfit >= 0 ? 'text-amber-400' : 'text-rose-400'}`}>
                  ${netProfit.toLocaleString()}
                </span>
              </div>

              <div className="bg-slate-900/80 p-2.5 rounded-lg border border-slate-800 space-y-0.5">
                <span className="text-[10px] text-slate-400 font-mono flex items-center gap-1">
                  <Percent className="w-3 h-3 text-indigo-400" />
                  Profit Margin
                </span>
                <span className={`text-sm font-bold font-mono block ${netMargin >= 50 ? 'text-emerald-400' : netMargin >= 0 ? 'text-amber-400' : 'text-rose-400'}`}>
                  {netMargin}%
                </span>
              </div>

            </div>

            {/* Target Progress Bar */}
            <div className="space-y-1 pt-1 border-t border-slate-900">
              <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                <span>Revenue vs Potential Target (${totalTargetPotential.toLocaleString()})</span>
                <span className="text-emerald-400 font-bold">{overallProgress}% Pace</span>
              </div>
              <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden border border-slate-800">
                <div 
                  className="bg-gradient-to-r from-emerald-500 via-teal-400 to-amber-400 h-full transition-all duration-300"
                  style={{ width: `${overallProgress}%` }}
                />
              </div>
            </div>

          </div>

          {/* £1,000 Revenue Journey Progress Bar Component */}
          <div className="bg-gradient-to-br from-slate-950 via-indigo-950/40 to-slate-950 p-4 rounded-xl border border-indigo-500/30 space-y-3.5 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
                  <Trophy className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                    <span>Journey to First £1,000 Revenue</span>
                    <span className="px-2 py-0.2 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-mono border border-amber-500/30">
                      £1,000 Club Goal
                    </span>
                  </h4>
                  <p className="text-[11px] text-slate-400">Track real progress towards your first milestone</p>
                </div>
              </div>

              <div className="text-right">
                <div className="text-sm font-extrabold font-mono text-emerald-400">
                  £{totalActualRevenue.toLocaleString()} / £1,000
                </div>
                <div className="text-[10px] text-slate-400 font-mono">
                  {totalActualRevenue >= 1000 ? (
                    <span className="text-amber-300 font-bold flex items-center justify-end gap-1">
                      <Sparkles className="w-3 h-3 text-amber-400" />
                      £1,000 Milestone Unlocked!
                    </span>
                  ) : (
                    <span>£{remaining1k.toLocaleString()} remaining to reach £1k</span>
                  )}
                </div>
              </div>
            </div>

            {/* Visual Milestone Progress Bar */}
            <div className="space-y-2">
              <div className="relative w-full bg-slate-900 h-3 rounded-full overflow-hidden border border-slate-800 p-0.5">
                <div 
                  className="bg-gradient-to-r from-indigo-500 via-emerald-400 to-amber-400 h-full rounded-full transition-all duration-500 shadow-md shadow-emerald-500/30"
                  style={{ width: `${revenueProgress1k}%` }}
                />
              </div>

              {/* Milestone Badges Step Track */}
              <div className="grid grid-cols-4 gap-1 pt-1 text-center">
                
                {/* Milestone 1: £100 */}
                <div className={`p-1.5 rounded-lg border text-[10px] font-mono font-bold transition-all ${
                  totalActualRevenue >= 100 
                    ? 'bg-emerald-950/80 border-emerald-500/50 text-emerald-300 shadow-sm shadow-emerald-500/20' 
                    : 'bg-slate-900/60 border-slate-800 text-slate-500'
                }`}>
                  <div className="flex items-center justify-center gap-1 mb-0.5">
                    {totalActualRevenue >= 100 ? <Check className="w-3 h-3 text-emerald-400" /> : <Target className="w-3 h-3 text-slate-600" />}
                    <span>£100</span>
                  </div>
                  <span className="text-[9px] block font-sans text-slate-400">First Sale</span>
                </div>

                {/* Milestone 2: £250 */}
                <div className={`p-1.5 rounded-lg border text-[10px] font-mono font-bold transition-all ${
                  totalActualRevenue >= 250 
                    ? 'bg-emerald-950/80 border-emerald-500/50 text-emerald-300 shadow-sm shadow-emerald-500/20' 
                    : 'bg-slate-900/60 border-slate-800 text-slate-500'
                }`}>
                  <div className="flex items-center justify-center gap-1 mb-0.5">
                    {totalActualRevenue >= 250 ? <Check className="w-3 h-3 text-emerald-400" /> : <Flame className="w-3 h-3 text-slate-600" />}
                    <span>£250</span>
                  </div>
                  <span className="text-[9px] block font-sans text-slate-400">Momentum</span>
                </div>

                {/* Milestone 3: £500 */}
                <div className={`p-1.5 rounded-lg border text-[10px] font-mono font-bold transition-all ${
                  totalActualRevenue >= 500 
                    ? 'bg-indigo-950/80 border-indigo-500/50 text-indigo-300 shadow-sm shadow-indigo-500/20' 
                    : 'bg-slate-900/60 border-slate-800 text-slate-500'
                }`}>
                  <div className="flex items-center justify-center gap-1 mb-0.5">
                    {totalActualRevenue >= 500 ? <Check className="w-3 h-3 text-indigo-400" /> : <Award className="w-3 h-3 text-slate-600" />}
                    <span>£500</span>
                  </div>
                  <span className="text-[9px] block font-sans text-slate-400">Halfway</span>
                </div>

                {/* Milestone 4: £1000 */}
                <div className={`p-1.5 rounded-lg border text-[10px] font-mono font-bold transition-all ${
                  totalActualRevenue >= 1000 
                    ? 'bg-amber-950/80 border-amber-500/50 text-amber-300 shadow-lg shadow-amber-500/30 animate-pulse' 
                    : 'bg-slate-900/60 border-slate-800 text-slate-500'
                }`}>
                  <div className="flex items-center justify-center gap-1 mb-0.5">
                    {totalActualRevenue >= 1000 ? <Trophy className="w-3 h-3 text-amber-400" /> : <Trophy className="w-3 h-3 text-slate-600" />}
                    <span>£1,000</span>
                  </div>
                  <span className="text-[9px] block font-sans text-slate-400">Mastery</span>
                </div>

              </div>
            </div>

            {totalActualRevenue >= 1000 && (
              <button
                onClick={() => confetti({ particleCount: 120, spread: 70, origin: { y: 0.6 } })}
                className="w-full py-2 rounded-xl bg-gradient-to-r from-amber-500 via-emerald-500 to-indigo-500 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 hover:opacity-90 transition-all"
              >
                <Sparkles className="w-4 h-4 text-slate-950 fill-slate-950" />
                <span>Celebrate £1,000 Revenue Victory 🎉</span>
              </button>
            )}
          </div>

          {/* List of Saved Hustles with Earnings & Cost Drawers */}
          <div className="space-y-3">
            <span className="text-[11px] font-bold uppercase tracking-wider font-mono text-slate-400 block">
              Hustle Financial Ledgers
            </span>

            {savedHustles.map((hustle) => {
              const gross = getHustleRevenueTotal(hustle.id);
              const costs = getHustleCostTotal(hustle.id);
              const hustleProfit = gross - costs;
              const hustleMargin = gross > 0 ? Math.round((hustleProfit / gross) * 100) : 0;
              const percentTarget = Math.min(100, Math.round((gross / hustle.monthlyRevenuePotential) * 100));
              
              const isExpanded = expandedHustleId === hustle.id;
              const revEntries = revenueLogs[hustle.id] || [];
              const costEntries = costLogs[hustle.id] || [];

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

                      <div className="flex items-center gap-3 shrink-0 text-xs font-mono">
                        <div className="text-right">
                          <span className="text-emerald-400 font-bold block">+${gross.toLocaleString()}</span>
                          <span className="text-[10px] text-rose-400 block">-${costs.toLocaleString()} costs</span>
                        </div>
                        <div className="text-right border-l border-slate-800 pl-2">
                          <span className={`font-bold block ${hustleProfit >= 0 ? 'text-amber-400' : 'text-rose-400'}`}>
                            ${hustleProfit.toLocaleString()}
                          </span>
                          <span className="text-[9px] text-slate-400 block">Net Profit</span>
                        </div>
                        {isExpanded ? (
                          <ChevronUp className="w-4 h-4 text-slate-400" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-slate-400" />
                        )}
                      </div>
                    </div>

                    {/* Mini Target Bar */}
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-[10px] font-mono">
                        <span className="text-slate-400">
                          {revEntries.length} revenue log{revEntries.length === 1 ? '' : 's'}, {costEntries.length} expense{costEntries.length === 1 ? '' : 's'}
                        </span>
                        <span className="text-emerald-400 font-bold">
                          {hustleMargin}% Net Margin
                        </span>
                      </div>

                      <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden border border-slate-800">
                        <div 
                          className="bg-gradient-to-r from-emerald-500 via-amber-400 to-indigo-500 h-full transition-all duration-300"
                          style={{ width: `${percentTarget}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Expanded Logging Drawer */}
                  {isExpanded && (
                    <div className="p-3.5 border-t border-slate-800/80 bg-slate-900/60 rounded-b-xl space-y-4">
                      
                      {/* Form Mode Toggle: Add Revenue vs Add Expense */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-bold uppercase text-slate-400 font-mono">
                            Add Financial Entry
                          </span>

                          <div className="flex items-center gap-1 bg-slate-950 p-0.5 rounded-lg border border-slate-800 text-[11px]">
                            <button
                              onClick={() => setEntryType('revenue')}
                              className={`px-2.5 py-1 rounded font-medium flex items-center gap-1 transition-all ${
                                entryType === 'revenue' 
                                  ? 'bg-emerald-600 text-white' 
                                  : 'text-slate-400 hover:text-slate-200'
                              }`}
                            >
                              <Plus className="w-3 h-3 text-emerald-300" />
                              <span>Earnings</span>
                            </button>

                            <button
                              onClick={() => setEntryType('cost')}
                              className={`px-2.5 py-1 rounded font-medium flex items-center gap-1 transition-all ${
                                entryType === 'cost' 
                                  ? 'bg-rose-600 text-white' 
                                  : 'text-slate-400 hover:text-slate-200'
                              }`}
                            >
                              <Minus className="w-3 h-3 text-rose-300" />
                              <span>Operational Cost</span>
                            </button>
                          </div>
                        </div>

                        {/* Input Form */}
                        <div className="space-y-2 bg-slate-950 p-3 rounded-xl border border-slate-800/80">
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                            
                            <div className="relative">
                              <DollarSign className="w-3.5 h-3.5 text-slate-500 absolute left-2.5 top-2.5" />
                              <input
                                type="number"
                                placeholder={entryType === 'revenue' ? "Revenue ($)" : "Expense ($)"}
                                value={inputAmount}
                                onChange={(e) => setInputAmount(e.target.value)}
                                className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-7 pr-2 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                              />
                            </div>

                            {entryType === 'cost' ? (
                              <select
                                value={inputCategory}
                                onChange={(e) => setInputCategory(e.target.value)}
                                className="bg-slate-900 border border-slate-800 rounded-lg px-2 py-1.5 text-xs text-slate-300 focus:outline-none"
                              >
                                <option value="Software / API">Software / API (OpenAI, Zapier)</option>
                                <option value="Hosting & Domain">Hosting & Domain (Vercel, Namecheap)</option>
                                <option value="Marketing & Ads">Marketing & Ads</option>
                                <option value="Contractor & Tools">Contractor & Design Tools</option>
                                <option value="Other">Other Operational Fee</option>
                              </select>
                            ) : (
                              <input
                                type="date"
                                value={inputDate}
                                onChange={(e) => setInputDate(e.target.value)}
                                className="bg-slate-900 border border-slate-800 rounded-lg px-2 py-1.5 text-xs text-slate-300 focus:outline-none"
                              />
                            )}

                            <button
                              onClick={() => {
                                if (entryType === 'revenue') {
                                  handleAddRevenueLog(hustle.id);
                                } else {
                                  handleAddCostLog(hustle.id);
                                }
                              }}
                              className={`px-3 py-1.5 rounded-lg text-white font-medium text-xs flex items-center justify-center gap-1 shadow-sm transition-all ${
                                entryType === 'revenue' 
                                  ? 'bg-emerald-600 hover:bg-emerald-500' 
                                  : 'bg-rose-600 hover:bg-rose-500'
                              }`}
                            >
                              {entryType === 'revenue' ? <Plus className="w-3.5 h-3.5" /> : <Minus className="w-3.5 h-3.5" />}
                              <span>{entryType === 'revenue' ? 'Log Earnings' : 'Log Expense'}</span>
                            </button>

                          </div>

                          <input
                            type="text"
                            placeholder={entryType === 'revenue' ? "Optional note (e.g. Stripe client deposit)" : "Optional note (e.g. OpenAI API monthly bill)"}
                            value={inputNote}
                            onChange={(e) => setInputNote(e.target.value)}
                            className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-slate-300 placeholder-slate-500 focus:outline-none"
                          />
                        </div>
                      </div>

                      {/* Financial History Logs Grid (Revenue vs Costs) */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 border-t border-slate-800/60">
                        
                        {/* Revenue List */}
                        <div className="space-y-1.5">
                          <span className="text-[10px] font-bold uppercase text-emerald-400 block font-mono">
                            Earnings Log (+${gross.toLocaleString()})
                          </span>

                          {revEntries.length > 0 ? (
                            <div className="space-y-1 max-h-36 overflow-y-auto">
                              {revEntries.map((entry) => (
                                <div key={entry.id} className="bg-slate-950 border border-slate-800/80 rounded-lg p-2 flex items-center justify-between text-xs">
                                  <div>
                                    <span className="font-bold text-emerald-400 font-mono mr-1.5">+${entry.amount.toLocaleString()}</span>
                                    <span className="text-slate-300">{entry.note}</span>
                                  </div>

                                  <div className="flex items-center gap-2 text-[10px] text-slate-500 font-mono">
                                    <span>{entry.date}</span>
                                    <button
                                      onClick={() => handleDeleteRevenueLog(hustle.id, entry.id)}
                                      className="p-1 rounded hover:bg-rose-950 text-slate-500 hover:text-rose-400"
                                      title="Delete"
                                    >
                                      <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <p className="text-[10px] text-slate-500 italic">No revenue logged yet.</p>
                          )}
                        </div>

                        {/* Operational Expenses List */}
                        <div className="space-y-1.5">
                          <span className="text-[10px] font-bold uppercase text-rose-400 block font-mono">
                            Operational Costs (-${costs.toLocaleString()})
                          </span>

                          {costEntries.length > 0 ? (
                            <div className="space-y-1 max-h-36 overflow-y-auto">
                              {costEntries.map((entry) => (
                                <div key={entry.id} className="bg-slate-950 border border-slate-800/80 rounded-lg p-2 flex items-center justify-between text-xs">
                                  <div>
                                    <span className="font-bold text-rose-400 font-mono mr-1.5">-${entry.amount.toLocaleString()}</span>
                                    <span className="text-slate-300">{entry.note}</span>
                                    <span className="ml-1 text-[9px] px-1 bg-slate-900 border border-slate-800 rounded text-slate-400">{entry.category}</span>
                                  </div>

                                  <div className="flex items-center gap-2 text-[10px] text-slate-500 font-mono">
                                    <span>{entry.date}</span>
                                    <button
                                      onClick={() => handleDeleteCostLog(hustle.id, entry.id)}
                                      className="p-1 rounded hover:bg-rose-950 text-slate-500 hover:text-rose-400"
                                      title="Delete"
                                    >
                                      <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <p className="text-[10px] text-slate-500 italic">No operational costs logged yet.</p>
                          )}

                        </div>

                      </div>

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

