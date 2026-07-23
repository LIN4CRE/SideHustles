import React, { useEffect } from 'react';
import { SideHustle } from '../types';
import { Sparkles, X, ArrowRight, Zap, Workflow, Flame, Bot, ShieldCheck } from 'lucide-react';

interface AutomationProTipToastProps {
  hustle: SideHustle | null;
  isOpen: boolean;
  onClose: () => void;
  onExecuteAction: (actionType: 'recipes' | '24h' | 'scout' | 'genai' | 'hub' | 'payout') => void;
}

export const AutomationProTipToast: React.FC<AutomationProTipToastProps> = ({
  hustle,
  isOpen,
  onClose,
  onExecuteAction
}) => {
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose();
      }, 7000); // Auto-dismiss after 7s
      return () => clearTimeout(timer);
    }
  }, [isOpen, hustle]);

  if (!isOpen || !hustle) return null;

  // Derive Pro-Tip content based on hustle properties
  const getProTipData = () => {
    if (hustle.category.includes('Digital') || hustle.title.toLowerCase().includes('wallpaper') || hustle.title.toLowerCase().includes('ringtone')) {
      return {
        icon: Workflow,
        title: '1-Click Automation Pro-Tip',
        tip: `Pair ${hustle.title} with our n8n Telegram/TikTok Auto-Poster JSON blueprint to auto-fulfill 1p orders within 3 seconds.`,
        actionLabel: 'Open Recipe Marketplace',
        actionType: 'recipes' as const,
        badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
      };
    }

    if (hustle.title.toLowerCase().includes('llm') || hustle.title.toLowerCase().includes('mcp') || hustle.automationScore >= 85) {
      return {
        icon: Bot,
        title: 'Local LLM & MCP Optimization Pro-Tip',
        tip: `Connect your local Ollama / LM Studio instance to let AI run trend scraping background tasks without API key fees!`,
        actionLabel: 'Open Local LLM Hub',
        actionType: 'hub' as const,
        badgeColor: 'bg-purple-500/20 text-purple-300 border-purple-500/30'
      };
    }

    if (hustle.title.toLowerCase().includes('viral') || hustle.title.toLowerCase().includes('trend') || hustle.category.includes('Content')) {
      return {
        icon: Flame,
        title: 'Viral Scout Trend Pro-Tip',
        tip: `Check current TikTok & Reddit demand scores for ${hustle.category} micro-assets before posting your 1p link.`,
        actionLabel: 'Open Trend Radar',
        actionType: 'scout' as const,
        badgeColor: 'bg-rose-500/20 text-rose-300 border-rose-500/30'
      };
    }

    return {
      icon: Zap,
      title: '24h Challenge Pro-Tip',
      tip: `Verify your direct bank deposit credentials now so funds from your first 1p sale land directly in your account!`,
      actionLabel: 'Verify Payout Status',
      actionType: 'payout' as const,
      badgeColor: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30'
    };
  };

  const tipData = getProTipData();
  const IconComponent = tipData.icon;

  return (
    <div className="fixed bottom-5 right-5 z-50 max-w-md w-full p-4 bg-slate-900/95 border border-amber-500/40 rounded-2xl shadow-2xl backdrop-blur-md animate-bounce-short space-y-2.5">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-xl bg-amber-500/20 border border-amber-500/30 text-amber-400">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h5 className="text-xs font-bold text-white font-mono flex items-center gap-1.5">
              {tipData.title}
            </h5>
            <span className="text-[9px] text-slate-400 font-mono">
              Tailored for: {hustle.title}
            </span>
          </div>
        </div>

        <button
          onClick={onClose}
          className="p-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-all"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Tip Message Body */}
      <p className="text-xs text-slate-200 leading-relaxed font-sans bg-slate-950/80 p-2.5 rounded-xl border border-slate-800">
        💡 "{tipData.tip}"
      </p>

      {/* Action Button */}
      <div className="flex items-center justify-between pt-1">
        <span className="text-[10px] font-mono text-emerald-400 font-bold">
          ⚡ 1-Click Execution Ready
        </span>

        <button
          onClick={() => {
            onClose();
            onExecuteAction(tipData.actionType);
          }}
          className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 via-emerald-600 to-teal-600 hover:from-amber-400 hover:to-teal-500 text-slate-950 font-bold text-xs flex items-center gap-1 transition-all shadow-md shadow-emerald-500/20 font-mono"
        >
          <span>{tipData.actionLabel}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

    </div>
  );
};
