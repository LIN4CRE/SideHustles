import React, { useState, useEffect } from 'react';
import { 
  Zap, 
  Activity, 
  AlertTriangle, 
  CheckCircle2, 
  TrendingUp, 
  ArrowUpRight, 
  ChevronRight, 
  Sparkles, 
  X,
  Workflow,
  DollarSign
} from 'lucide-react';

interface SmartHudOverlayProps {
  onOpen24hChallenge: () => void;
  onOpenRecipes: () => void;
  onOpenGenAI: () => void;
  onOpenLocalLlmHub: () => void;
}

export const SmartHudOverlay: React.FC<SmartHudOverlayProps> = ({
  onOpen24hChallenge,
  onOpenRecipes,
  onOpenGenAI,
  onOpenLocalLlmHub
}) => {
  const [isMinimized, setIsMinimized] = useState<boolean>(false);
  const [hudState, setHudState] = useState<{
    status: 'optimal' | 'warning' | 'alert';
    title: string;
    message: string;
    actionLabel: string;
    actionType: 'challenge' | 'recipes' | 'genai' | 'hub';
  }>({
    status: 'optimal',
    title: 'Hustle Engine Nominal',
    message: '24h conversion rate at 7.2%. n8n automation pipelines active.',
    actionLabel: 'Batch Generate 1p Wallpapers',
    actionType: 'genai'
  });

  // Cycle HUD notifications periodically to simulate live telemetry
  useEffect(() => {
    const states = [
      {
        status: 'optimal' as const,
        title: 'Hustle Engine Nominal',
        message: '24h conversion rate at 7.2%. n8n automation pipelines active.',
        actionLabel: 'Batch Generate 1p Wallpapers',
        actionType: 'genai' as const
      },
      {
        status: 'warning' as const,
        title: 'Sales Traffic Velocity Low',
        message: 'Only 3 sales in last hour. Trigger 24h viral social post challenge.',
        actionLabel: 'Launch 24h Sale Challenge',
        actionType: 'challenge' as const
      },
      {
        status: 'alert' as const,
        title: 'Automation Recipe Check',
        message: 'Verify n8n webhook keys before launching high-volume TikTok posts.',
        actionLabel: 'Open Recipe Marketplace',
        actionType: 'recipes' as const
      }
    ];

    let idx = 0;
    const interval = setInterval(() => {
      idx = (idx + 1) % states.length;
      setHudState(states[idx]);
    }, 12000);

    return () => clearInterval(interval);
  }, []);

  const handleExecuteHudAction = () => {
    if (hudState.actionType === 'challenge') onOpen24hChallenge();
    else if (hudState.actionType === 'recipes') onOpenRecipes();
    else if (hudState.actionType === 'genai') onOpenGenAI();
    else if (hudState.actionType === 'hub') onOpenLocalLlmHub();
  };

  if (isMinimized) {
    return (
      <button
        onClick={() => setIsMinimized(false)}
        className="fixed bottom-5 left-5 z-40 p-3 rounded-2xl bg-slate-900/95 border border-emerald-500/40 text-emerald-400 shadow-2xl backdrop-blur-md hover:scale-105 transition-all font-mono text-xs flex items-center gap-2"
        title="Open Smart HUD Telemetry"
      >
        <Activity className="w-4 h-4 animate-pulse text-emerald-400" />
        <span className="font-bold hidden sm:inline">Smart HUD</span>
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
      </button>
    );
  }

  return (
    <div className="fixed bottom-5 left-5 z-40 max-w-sm w-full p-3.5 bg-slate-950/90 border border-slate-800 rounded-2xl shadow-2xl backdrop-blur-md space-y-2.5 font-mono animate-fadeIn">
      
      {/* HUD Header */}
      <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
        <div className="flex items-center gap-2">
          <div className={`p-1.5 rounded-lg border ${
            hudState.status === 'optimal' 
              ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' 
              : hudState.status === 'warning'
              ? 'bg-amber-500/20 text-amber-400 border-amber-500/30'
              : 'bg-rose-500/20 text-rose-400 border-rose-500/30'
          }`}>
            {hudState.status === 'optimal' ? (
              <CheckCircle2 className="w-4 h-4" />
            ) : hudState.status === 'warning' ? (
              <AlertTriangle className="w-4 h-4" />
            ) : (
              <Zap className="w-4 h-4" />
            )}
          </div>
          <div>
            <h5 className="text-xs font-bold text-white flex items-center gap-1.5">
              Smart HUD
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            </h5>
            <span className="text-[9px] text-slate-400 uppercase font-bold">
              Status: {hudState.status.toUpperCase()}
            </span>
          </div>
        </div>

        <button
          onClick={() => setIsMinimized(true)}
          className="p-1 rounded-md bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
          title="Minimize HUD"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Message Body */}
      <div className="bg-slate-900/80 p-2.5 rounded-xl border border-slate-800 space-y-1">
        <h6 className="text-[11px] font-bold text-slate-200">{hudState.title}</h6>
        <p className="text-[10px] text-slate-400 font-sans leading-relaxed">
          {hudState.message}
        </p>
      </div>

      {/* Recommended Shortcut Action */}
      <button
        onClick={handleExecuteHudAction}
        className="w-full py-1.5 px-3 rounded-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-600 hover:from-emerald-500 hover:to-indigo-500 text-white font-bold text-[11px] flex items-center justify-between transition-all shadow-md shadow-emerald-600/20"
      >
        <span className="flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
          <span>{hudState.actionLabel}</span>
        </span>
        <ArrowUpRight className="w-3.5 h-3.5 text-slate-200" />
      </button>

    </div>
  );
};
