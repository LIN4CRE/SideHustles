import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Circle, 
  Sparkles, 
  CreditCard, 
  Download, 
  Share2, 
  Flame, 
  ArrowRight,
  ShieldCheck,
  Zap
} from 'lucide-react';

interface QuickSetupChecklistProps {
  payoutDestination: string;
  onOpenPayoutModal: () => void;
  onOpen24hChallenge: () => void;
  onLogFirstSale: () => void;
}

export const QuickSetupChecklist: React.FC<QuickSetupChecklistProps> = ({
  payoutDestination,
  onOpenPayoutModal,
  onOpen24hChallenge,
  onLogFirstSale
}) => {
  const [completedSteps, setCompletedSteps] = useState<{ [key: string]: boolean }>({
    step1Payout: true, // Auto true if paypal link exists
    step2Asset: true,  // Wallpapers / WearOS / n8n / Ringtones
    step3StarterKit: false,
    step4LinkCreated: true,
    step5Posted: false
  });

  const toggleStep = (stepKey: string) => {
    setCompletedSteps((prev) => ({ ...prev, [stepKey]: !prev[stepKey] }));
  };

  const stepsList = [
    {
      id: 'step1Payout',
      title: '1. Payout Destination Configured',
      description: `Routed to: ${payoutDestination}`,
      actionLabel: 'Change Payout',
      onAction: onOpenPayoutModal,
      isAutoCompleted: true
    },
    {
      id: 'step2Asset',
      title: '2. Select 1p - 10p Digital Micro-Asset',
      description: 'Choose Wallpapers, WearOS Face, Ringtones, n8n JSON or Obsidian Vault.',
      actionLabel: 'Pick Asset',
      onAction: onOpen24hChallenge,
      isAutoCompleted: false
    },
    {
      id: 'step3StarterKit',
      title: '3. Download & Export Ready Starter File',
      description: 'Grab pre-formatted 4K image, n8n JSON, watch preset, or chime ZIP.',
      actionLabel: 'Download File',
      onAction: onOpen24hChallenge,
      isAutoCompleted: false
    },
    {
      id: 'step4LinkCreated',
      title: '4. Set Up Gumroad or PayPal Purchase Link',
      description: `Set price to 1p - 10p. (Active link: ${payoutDestination})`,
      actionLabel: 'Copy Link',
      onAction: () => {
        navigator.clipboard.writeText(payoutDestination);
        toggleStep('step4LinkCreated');
      },
      isAutoCompleted: false
    },
    {
      id: 'step5Posted',
      title: '5. Publish Pitch Post to 1 Target Community',
      description: 'Share on r/wallpapers, r/n8n, TikTok, or Pinterest.',
      actionLabel: 'Open 24h Challenge',
      onAction: onOpen24hChallenge,
      isAutoCompleted: false
    }
  ];

  const totalCompleted = Object.values(completedSteps).filter(Boolean).length;
  const progressPercent = Math.round((totalCompleted / stepsList.length) * 100);

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-xl space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-amber-500/20 border border-amber-500/30 text-amber-400">
            <Zap className="w-5 h-5 fill-amber-400" />
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
              Quick Setup to First 1p Sale
              <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[10px] font-mono font-bold">
                {progressPercent}% Ready
              </span>
            </h3>
            <p className="text-xs text-slate-400">
              Minimum required actions to transition your hustle from 0 to live Day 1 cashflow.
            </p>
          </div>
        </div>

        <button
          onClick={onLogFirstSale}
          className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white font-extrabold text-xs flex items-center gap-1.5 transition-all shadow-md shadow-emerald-500/20 shrink-0 self-start sm:self-auto"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span>🎉 Log 1p Sale Milestone</span>
        </button>
      </div>

      {/* Progress Bar */}
      <div className="space-y-1.5">
        <div className="flex justify-between text-xs font-mono">
          <span className="text-slate-400">Milestone Progress ({totalCompleted}/{stepsList.length} completed)</span>
          <span className="text-emerald-400 font-bold">{progressPercent}%</span>
        </div>
        <div className="w-full bg-slate-950 rounded-full h-2 border border-slate-800 overflow-hidden">
          <div 
            className="bg-gradient-to-r from-amber-500 via-emerald-500 to-teal-400 h-full transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Steps List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5 pt-1">
        {stepsList.map((step) => {
          const isDone = completedSteps[step.id];
          return (
            <div
              key={step.id}
              className={`p-3 rounded-xl border transition-all flex flex-col justify-between ${
                isDone 
                  ? 'bg-slate-950/80 border-emerald-500/40' 
                  : 'bg-slate-950/40 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => toggleStep(step.id)}
                    className="flex items-center gap-1.5 text-left"
                  >
                    {isDone ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    ) : (
                      <Circle className="w-4 h-4 text-slate-500 shrink-0" />
                    )}
                  </button>
                  <span className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded ${
                    isDone ? 'bg-emerald-500/10 text-emerald-400' : 'bg-slate-900 text-slate-500'
                  }`}>
                    {isDone ? 'READY' : 'PENDING'}
                  </span>
                </div>

                <h4 className={`text-xs font-bold leading-tight ${isDone ? 'text-white' : 'text-slate-300'}`}>
                  {step.title}
                </h4>
                <p className="text-[10px] text-slate-400 line-clamp-2 leading-relaxed">
                  {step.description}
                </p>
              </div>

              <div className="pt-2 mt-2 border-t border-slate-800/80 flex items-center justify-between">
                <button
                  onClick={step.onAction}
                  className="text-[10px] font-mono text-indigo-400 hover:text-indigo-300 font-bold flex items-center gap-1"
                >
                  <span>{step.actionLabel}</span>
                  <ArrowRight className="w-2.5 h-2.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
