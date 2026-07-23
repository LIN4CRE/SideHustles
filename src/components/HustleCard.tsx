import React from 'react';
import { SideHustle } from '../types';
import { calculateDynamicViabilityScore, ViabilityOverrides } from '../utils/viability';
import { 
  Zap, 
  DollarSign, 
  TrendingUp, 
  Clock, 
  Bot, 
  Bookmark, 
  BookmarkCheck, 
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Layers,
  Activity
} from 'lucide-react';

interface HustleCardProps {
  hustle: SideHustle;
  isSaved: boolean;
  onToggleSave: (id: string) => void;
  onSelectHustle: (hustle: SideHustle) => void;
  onOpenModeler: (hustle: SideHustle) => void;
  viabilityOverrides?: ViabilityOverrides;
}

export const HustleCard: React.FC<HustleCardProps> = ({
  hustle,
  isSaved,
  onToggleSave,
  onSelectHustle,
  onOpenModeler,
  viabilityOverrides
}) => {
  const viability = calculateDynamicViabilityScore(hustle, viabilityOverrides);

  return (
    <div className="bg-slate-900/90 border border-slate-800 hover:border-slate-700 rounded-2xl p-5 shadow-lg hover:shadow-indigo-500/10 transition-all group flex flex-col justify-between relative overflow-hidden">
      
      {/* Background Subtle Gradient Glow */}
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-indigo-500/5 rounded-full blur-2xl group-hover:bg-indigo-500/10 transition-all pointer-events-none" />

      <div>
        {/* Top Header Row */}
        <div className="flex items-start justify-between gap-2 mb-3">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 text-[11px] font-medium">
              {hustle.category}
            </span>
            <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold border ${
              hustle.difficulty === 'Beginner' 
                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                : hustle.difficulty === 'Intermediate'
                ? 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                : 'bg-rose-500/10 text-rose-400 border-rose-500/20'
            }`}>
              {hustle.difficulty}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Dynamic Market Viability Score Badge */}
            <div 
              className={`px-2.5 py-1 rounded-full border text-xs font-bold font-mono flex items-center gap-1 ${viability.color}`}
              title={`Market Viability Score: ${viability.score}/100 (${viability.label})`}
            >
              <Activity className="w-3 h-3" />
              <span>{viability.score}/100</span>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleSave(hustle.id);
              }}
              className={`p-2 rounded-xl border transition-all ${
                isSaved
                  ? 'bg-amber-500/20 text-amber-400 border-amber-500/40'
                  : 'bg-slate-950/60 text-slate-400 border-slate-800 hover:text-white hover:border-slate-700'
              }`}
              title={isSaved ? 'Remove from Saved' : 'Save Hustle'}
            >
              {isSaved ? <BookmarkCheck className="w-4 h-4 fill-amber-400" /> : <Bookmark className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Title & Tagline */}
        <h3 className="text-lg font-bold text-white group-hover:text-indigo-300 transition-colors mb-1">
          {hustle.title}
        </h3>
        <p className="text-xs text-slate-400 line-clamp-2 mb-4 leading-relaxed">
          {hustle.tagline}
        </p>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-slate-950/80 rounded-xl p-3 border border-slate-800/80 mb-4">
          <div>
            <span className="text-[10px] uppercase font-mono text-slate-500 block">Monthly Goal</span>
            <span className="text-sm font-bold text-emerald-400 flex items-center gap-0.5">
              ${hustle.monthlyRevenuePotential.toLocaleString()}
            </span>
          </div>

          <div>
            <span className="text-[10px] uppercase font-mono text-slate-500 block">Net Margin</span>
            <span className="text-sm font-bold text-indigo-300">
              {hustle.marginPercentage}%
            </span>
          </div>

          <div>
            <span className="text-[10px] uppercase font-mono text-slate-500 block">Automation</span>
            <span className="text-sm font-bold text-amber-400 flex items-center gap-1">
              <Bot className="w-3 h-3" />
              {hustle.automationScore}%
            </span>
          </div>

          <div>
            <span className="text-[10px] uppercase font-mono text-slate-500 block">Weekly Effort</span>
            <span className="text-sm font-bold text-slate-300 flex items-center gap-1">
              <Clock className="w-3 h-3 text-slate-400" />
              {hustle.weeklyHoursNeeded}h
            </span>
          </div>
        </div>

        {/* Automated Upgrade Box */}
        <div className="bg-gradient-to-r from-indigo-950/50 to-slate-950/80 rounded-xl p-3 border border-indigo-500/20 mb-4">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-indigo-300 mb-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Automated Scalable Upgrade</span>
          </div>
          <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
            {hustle.automatedUpgrade}
          </p>
        </div>

        {/* Scalability Tags */}
        <div className="flex items-center gap-1.5 flex-wrap mb-5">
          {hustle.recommendedTools.slice(0, 3).map((tool) => (
            <span key={tool} className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-950 text-slate-400 border border-slate-800">
              {tool}
            </span>
          ))}
          {hustle.recommendedTools.length > 3 && (
            <span className="text-[10px] font-mono text-slate-500">
              +{hustle.recommendedTools.length - 3} tools
            </span>
          )}
        </div>
      </div>

      {/* Action Footer */}
      <div className="flex items-center gap-2 pt-3 border-t border-slate-800/80">
        <button
          onClick={() => onSelectHustle(hustle)}
          className="flex-1 bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs py-2.5 px-3 rounded-xl flex items-center justify-center gap-1.5 transition-all shadow-md shadow-indigo-600/20"
        >
          <span>Open Profit Kit</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>

        <button
          onClick={() => onOpenModeler(hustle)}
          className="bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium text-xs py-2.5 px-3 rounded-xl border border-slate-700 flex items-center justify-center gap-1 transition-all"
          title="Interactive Unit Economics Calculator"
        >
          <TrendingUp className="w-3.5 h-3.5 text-indigo-400" />
          <span className="hidden sm:inline">ROI Calculator</span>
        </button>
      </div>
    </div>
  );
};
