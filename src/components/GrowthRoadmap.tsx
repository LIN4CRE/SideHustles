import React, { useState, useEffect } from 'react';
import { SideHustle, GrowthRoadmapData } from '../types';
import { 
  Sparkles, 
  Calendar, 
  CheckSquare, 
  Square, 
  TrendingUp, 
  AlertTriangle, 
  Loader2, 
  Target, 
  Flag,
  ArrowRight,
  ShieldCheck,
  RefreshCw
} from 'lucide-react';

interface GrowthRoadmapProps {
  hustle: SideHustle;
}

export const GrowthRoadmap: React.FC<GrowthRoadmapProps> = ({ hustle }) => {
  const [targetRevenue, setTargetRevenue] = useState<number>(hustle.monthlyRevenuePotential);
  const [customGoals, setCustomGoals] = useState<string>('');
  const [roadmap, setRoadmap] = useState<GrowthRoadmapData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Completed milestone checklist state
  const [completedItems, setCompletedItems] = useState<Record<string, boolean>>({});

  const fetchRoadmap = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/generate-roadmap', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          hustleTitle: hustle.title,
          category: hustle.category,
          targetRevenue,
          customGoals
        })
      });

      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to generate growth roadmap');
      }

      setRoadmap(data.roadmap);
    } catch (err: any) {
      console.error('Roadmap generation error:', err);
      setError(err.message || 'Error generating roadmap');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRoadmap();
  }, [hustle.id]);

  const toggleCheck = (itemKey: string) => {
    setCompletedItems((prev) => ({
      ...prev,
      [itemKey]: !prev[itemKey]
    }));
  };

  // Calculate progress %
  const allMilestonesCount = roadmap
    ? roadmap.day30Milestones.length + roadmap.day60Milestones.length + roadmap.day90Milestones.length
    : 0;

  const completedCount = Object.values(completedItems).filter(Boolean).length;
  const progressPercent = allMilestonesCount > 0 ? Math.round((completedCount / allMilestonesCount) * 100) : 0;

  return (
    <div className="space-y-6">
      
      {/* Target Customizer Bar */}
      <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="text-xs font-bold text-white flex items-center gap-1.5">
              <Target className="w-4 h-4 text-amber-400" />
              Tailor Your 30-60-90 Day Execution Milestone Plan
            </span>
            <p className="text-[11px] text-slate-400">
              Gemini AI generates customized weekly targets based on your revenue goal.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400">Target Goal:</span>
              <span className="text-xs font-bold text-emerald-400 font-mono">${targetRevenue.toLocaleString()}/mo</span>
            </div>
            <button
              onClick={fetchRoadmap}
              disabled={isLoading}
              className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs flex items-center gap-1.5 disabled:opacity-50"
            >
              {isLoading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <RefreshCw className="w-3.5 h-3.5" />}
              <span>Recalculate Plan</span>
            </button>
          </div>
        </div>

        {/* Input sliders & options */}
        <div className="pt-2 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-[11px] font-medium text-slate-400 mb-1">Monthly Income Goal ($)</label>
            <input
              type="range"
              min={1000}
              max={25000}
              step={500}
              value={targetRevenue}
              onChange={(e) => setTargetRevenue(Number(e.target.value))}
              className="w-full accent-amber-500 bg-slate-800 h-1.5 rounded-lg cursor-pointer"
            />
          </div>

          <div>
            <label className="block text-[11px] font-medium text-slate-400 mb-1">Focus Strategy or Constraint</label>
            <input
              type="text"
              value={customGoals}
              onChange={(e) => setCustomGoals(e.target.value)}
              placeholder="e.g., 5 hrs/wk max, no phone calls, organic traffic..."
              className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
            />
          </div>
        </div>
      </div>

      {/* Loading state */}
      {isLoading && (
        <div className="py-12 text-center space-y-3 bg-slate-950/40 rounded-xl border border-slate-800">
          <Loader2 className="w-8 h-8 text-amber-400 animate-spin mx-auto" />
          <p className="text-xs font-semibold text-slate-300">Architecting 30-60-90 Day Milestone Roadmap with Gemini AI...</p>
          <span className="text-[11px] text-slate-500">Evaluating cold outreach, automation triggers, and client acquisition bottlenecks</span>
        </div>
      )}

      {/* Error state */}
      {error && (
        <div className="p-4 bg-rose-950/40 border border-rose-800/50 rounded-xl text-xs text-rose-300">
          {error}
        </div>
      )}

      {/* Roadmap Output */}
      {roadmap && !isLoading && (
        <div className="space-y-6">
          
          {/* Progress Tracker */}
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-white block">Execution Completion Tracker</span>
              <span className="text-[11px] text-slate-400">{completedCount} of {allMilestonesCount} milestones checked off</span>
            </div>
            
            <div className="flex items-center gap-3 w-48">
              <div className="flex-1 bg-slate-800 h-2 rounded-full overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-amber-500 to-emerald-400 h-full transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <span className="text-xs font-bold text-amber-400 font-mono">{progressPercent}%</span>
            </div>
          </div>

          {/* 30-60-90 Day Timeline Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            {/* Days 1-30 */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded bg-indigo-500/20 text-indigo-400 flex items-center justify-center text-xs font-bold font-mono">
                    30
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">Days 1–30</h4>
                    <span className="text-[10px] text-indigo-400">Launch & First Sale</span>
                  </div>
                </div>
                <Flag className="w-3.5 h-3.5 text-indigo-400" />
              </div>

              <div className="space-y-2">
                {roadmap.day30Milestones.map((m, idx) => {
                  const key = `d30-${idx}`;
                  const isDone = !!completedItems[key];
                  return (
                    <button
                      key={key}
                      onClick={() => toggleCheck(key)}
                      className={`w-full text-left p-2.5 rounded-lg border transition-all text-xs flex items-start gap-2.5 ${
                        isDone 
                          ? 'bg-indigo-950/20 border-indigo-500/30 text-slate-400 line-through' 
                          : 'bg-slate-900 border-slate-800 text-slate-200 hover:border-slate-700'
                      }`}
                    >
                      {isDone ? (
                        <CheckSquare className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                      ) : (
                        <Square className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                      )}
                      <span className="leading-relaxed">{m}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Days 31-60 */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded bg-amber-500/20 text-amber-400 flex items-center justify-center text-xs font-bold font-mono">
                    60
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">Days 31–60</h4>
                    <span className="text-[10px] text-amber-400">Automation & Scale</span>
                  </div>
                </div>
                <TrendingUp className="w-3.5 h-3.5 text-amber-400" />
              </div>

              <div className="space-y-2">
                {roadmap.day60Milestones.map((m, idx) => {
                  const key = `d60-${idx}`;
                  const isDone = !!completedItems[key];
                  return (
                    <button
                      key={key}
                      onClick={() => toggleCheck(key)}
                      className={`w-full text-left p-2.5 rounded-lg border transition-all text-xs flex items-start gap-2.5 ${
                        isDone 
                          ? 'bg-amber-950/20 border-amber-500/30 text-slate-400 line-through' 
                          : 'bg-slate-900 border-slate-800 text-slate-200 hover:border-slate-700'
                      }`}
                    >
                      {isDone ? (
                        <CheckSquare className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      ) : (
                        <Square className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                      )}
                      <span className="leading-relaxed">{m}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Days 61-90 */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs font-bold font-mono">
                    90
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">Days 61–90</h4>
                    <span className="text-[10px] text-emerald-400">Expansion & Retainers</span>
                  </div>
                </div>
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              </div>

              <div className="space-y-2">
                {roadmap.day90Milestones.map((m, idx) => {
                  const key = `d90-${idx}`;
                  const isDone = !!completedItems[key];
                  return (
                    <button
                      key={key}
                      onClick={() => toggleCheck(key)}
                      className={`w-full text-left p-2.5 rounded-lg border transition-all text-xs flex items-start gap-2.5 ${
                        isDone 
                          ? 'bg-emerald-950/20 border-emerald-500/30 text-slate-400 line-through' 
                          : 'bg-slate-900 border-slate-800 text-slate-200 hover:border-slate-700'
                      }`}
                    >
                      {isDone ? (
                        <CheckSquare className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      ) : (
                        <Square className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                      )}
                      <span className="leading-relaxed">{m}</span>
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Key Metrics & Warning */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* KPIs */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-2">
              <span className="text-xs font-bold text-white flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4 text-indigo-400" />
                Critical KPIs to Monitor
              </span>
              <ul className="space-y-1.5 pt-1">
                {roadmap.keyMetricsToTrack.map((kpi, idx) => (
                  <li key={idx} className="text-xs text-slate-300 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                    <span>{kpi}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Scaling Bottleneck Warning */}
            <div className="bg-amber-950/20 border border-amber-800/40 rounded-xl p-4 space-y-2">
              <span className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4" />
                #1 Scaling Bottleneck Warning
              </span>
              <p className="text-xs text-amber-200/80 leading-relaxed">
                {roadmap.scalingBottleneckWarning}
              </p>
            </div>

          </div>

        </div>
      )}

    </div>
  );
};
