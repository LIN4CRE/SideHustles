import React from 'react';
import { SideHustle } from '../types';
import { calculateDynamicViabilityScore, ViabilityOverrides } from '../utils/viability';
import { getCompletedStepsForHustle, calculateHustleHealth } from '../utils/hustleHealth';
import { RealityCheckService } from '../services/realityCheckService';
import { 
  Zap, 
  PoundSterling, 
  TrendingUp, 
  Clock, 
  Bot, 
  Bookmark, 
  BookmarkCheck, 
  ArrowUpRight,
  ShieldCheck,
  Sparkles,
  Activity,
  Gift,
  CheckCircle2,
  Building2
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
  const completedSteps = getCompletedStepsForHustle(hustle.id);
  const health = calculateHustleHealth(hustle, completedSteps);
  const realityCheck = RealityCheckService.evaluateHustle(hustle);

  return (
    <div 
      onClick={() => onSelectHustle(hustle)}
      className="bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 hover:border-emerald-500/40 rounded-2xl p-5 shadow-xl hover:shadow-emerald-500/10 hover:-translate-y-1 transition-all duration-300 group flex flex-col justify-between relative overflow-hidden cursor-pointer"
    >
      {/* Background Subtle Ambient Glow */}
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-emerald-500/5 rounded-full blur-3xl group-hover:bg-emerald-500/10 transition-all pointer-events-none" />

      <div>
        {/* Top Header Row */}
        <div className="flex items-start justify-between gap-2 mb-3">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="px-2.5 py-0.5 rounded-full bg-slate-800/90 text-slate-300 border border-slate-700/60 text-[11px] font-medium">
              {hustle.category}
            </span>
            {hustle.isFreeStarterSet && (
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold flex items-center gap-1">
                <Gift className="w-3 h-3 text-emerald-400" />
                $0 Starter
              </span>
            )}
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

        {/* Hustle Title & Tagline */}
        <h3 className="text-base font-bold text-white group-hover:text-emerald-300 transition-colors line-clamp-1">
          {hustle.title}
        </h3>
        <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
          {hustle.tagline}
        </p>

        {/* Revenue Potential & Metrics Bar */}
        <div className="mt-4 grid grid-cols-3 gap-2 p-3 bg-slate-950/70 border border-slate-800/80 rounded-xl font-mono text-center">
          <div>
            <span className="text-[10px] text-slate-500 uppercase block">Monthly</span>
            <span className="text-xs font-bold text-emerald-400">£{hustle.monthlyRevenuePotential}</span>
          </div>
          <div className="border-x border-slate-800/80 px-1">
            <span className="text-[10px] text-slate-500 uppercase block">Automation</span>
            <span className="text-xs font-bold text-indigo-300">{hustle.automationScore}%</span>
          </div>
          <div>
            <span className="text-[10px] text-slate-500 uppercase block">Weekly</span>
            <span className="text-xs font-bold text-slate-300">{hustle.weeklyHoursNeeded}h</span>
          </div>
        </div>
      </div>

      {/* Footer Action Bar */}
      <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2">
        <div className="text-[11px] text-slate-400 font-mono">
          Day 1: <strong className="text-emerald-400">{hustle.freeStarterSet?.expectedDay1Earnings || '£15-£50'}</strong>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onOpenModeler(hustle);
            }}
            className="p-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-800 text-slate-300 border border-slate-700/60 text-xs transition-colors"
            title="Open Financial Calculator"
          >
            <TrendingUp className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onSelectHustle(hustle);
            }}
            className="px-3 py-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold flex items-center gap-1 transition-all group-hover:border-emerald-500/50"
          >
            <span>Execute</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

    </div>
  );
};
