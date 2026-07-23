import React, { useState } from 'react';
import { motion } from 'motion/react';
import { SideHustle } from '../types';
import { getCompletedStepsForHustle, saveCompletedStepsForHustle, calculateHustleHealth } from '../utils/hustleHealth';
import { 
  Activity, 
  ChevronRight, 
  Trash2, 
  CheckCircle2, 
  Circle, 
  ChevronDown, 
  ChevronUp, 
  Zap, 
  Bot, 
  Sparkles 
} from 'lucide-react';

interface SavedHustleHealthCardProps {
  hustle: SideHustle;
  onOpenDetail: () => void;
  onRemove: () => void;
  onStepToggled?: () => void;
}

export const SavedHustleHealthCard: React.FC<SavedHustleHealthCardProps> = ({
  hustle,
  onOpenDetail,
  onRemove,
  onStepToggled
}) => {
  const [completedSteps, setCompletedSteps] = useState<number[]>(() => 
    getCompletedStepsForHustle(hustle.id)
  );
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const health = calculateHustleHealth(hustle, completedSteps);
  const workflowSteps = hustle.workflowBlueprint.length > 0 
    ? hustle.workflowBlueprint 
    : [
        { stepNumber: 1, title: 'Configure Payout & Bank Routing', tool: 'PayPal / Bank', description: 'Set up direct deposit info.', isAutomated: true },
        { stepNumber: 2, title: 'Generate AI Offer Assets', tool: 'Gemini Flash', description: 'Build zero-pitch gift scripts.', isAutomated: true },
        { stepNumber: 3, title: 'Deploy Cold Outreach Email', tool: 'Gmail / Outreach', description: 'Send initial value gift to local leads.', isAutomated: true },
        { stepNumber: 4, title: 'Collect Instant $25-$500 Payment', tool: 'PayPal / Stripe', description: 'Convert free value into recurring retainer.', isAutomated: true }
      ];

  const handleToggleStep = (stepNumber: number) => {
    const updated = completedSteps.includes(stepNumber)
      ? completedSteps.filter((s) => s !== stepNumber)
      : [...completedSteps, stepNumber];
    
    setCompletedSteps(updated);
    saveCompletedStepsForHustle(hustle.id, updated);
    if (onStepToggled) onStepToggled();
  };

  const handleAutoCompleteNextStep = () => {
    const nextUncompleted = workflowSteps.find((s) => !completedSteps.includes(s.stepNumber));
    if (nextUncompleted) {
      handleToggleStep(nextUncompleted.stepNumber);
    }
  };

  return (
    <div className="bg-slate-950 border border-slate-800 hover:border-slate-700 rounded-xl p-3.5 space-y-3 transition-all">
      
      {/* Header Row */}
      <div className="flex items-start justify-between gap-2">
        <div>
          <h4 className="text-xs font-bold text-white flex items-center gap-2">
            {hustle.title}
            <span className="text-[10px] text-emerald-400 font-mono font-normal">
              ${hustle.monthlyRevenuePotential.toLocaleString()}/mo
            </span>
          </h4>
          <span className="text-[10px] text-slate-400 font-mono">
            Category: {hustle.category}
          </span>
        </div>

        <div className="flex items-center gap-1 shrink-0">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="px-2 py-1 rounded bg-slate-900 border border-slate-800 hover:bg-slate-800 text-[10px] text-slate-300 font-mono flex items-center gap-1"
            title="Toggle Setup Checklist"
          >
            <span>Checklist</span>
            {isExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
          </button>

          <button
            onClick={onOpenDetail}
            className="p-1.5 rounded bg-indigo-600/30 text-indigo-300 hover:bg-indigo-600/50 text-xs"
            title="Open Profit Kit"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={onRemove}
            className="p-1.5 rounded bg-slate-900 text-rose-400 hover:bg-rose-950/50 hover:text-rose-300 border border-slate-800"
            title="Remove from Saved"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Progress Bar & Health Status */}
      <div className="space-y-1.5 pt-1">
        <div className="flex items-center justify-between text-[10px] font-mono">
          <span className="text-slate-400 flex items-center gap-1">
            <Activity className="w-3 h-3 text-emerald-400" />
            Hustle Health Score
          </span>
          <span className={`px-2 py-0.5 rounded-full font-bold border ${health.badgeClass}`}>
            {health.score}% • {health.label}
          </span>
        </div>

        <div className="w-full bg-slate-900 rounded-full h-2 overflow-hidden border border-slate-800">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${health.score}%` }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className={`h-full bg-gradient-to-r ${health.barColor}`}
          />
        </div>

        <div className="flex justify-between items-center text-[10px] text-slate-500 font-mono">
          <span>{completedSteps.length}/{workflowSteps.length} Steps Completed</span>
          {completedSteps.length < workflowSteps.length && (
            <button
              onClick={handleAutoCompleteNextStep}
              className="text-amber-400 hover:text-amber-300 font-bold flex items-center gap-1"
            >
              <Zap className="w-3 h-3" />
              <span>Auto-Complete Next Step</span>
            </button>
          )}
        </div>
      </div>

      {/* Expandable Step Checklist */}
      {isExpanded && (
        <div className="pt-2 border-t border-slate-900 space-y-2 animate-fadeIn">
          <span className="text-[10px] uppercase font-mono text-slate-400 font-bold block">
            Setup Checklist & Workflow Progress:
          </span>

          <div className="space-y-1.5">
            {workflowSteps.map((step) => {
              const isDone = completedSteps.includes(step.stepNumber);

              return (
                <div
                  key={step.stepNumber}
                  onClick={() => handleToggleStep(step.stepNumber)}
                  className={`p-2 rounded-lg border text-xs cursor-pointer transition-all flex items-start gap-2 ${
                    isDone
                      ? 'bg-emerald-950/30 border-emerald-500/30 text-emerald-200'
                      : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <div className="mt-0.5 shrink-0">
                    {isDone ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Circle className="w-3.5 h-3.5 text-slate-600" />
                    )}
                  </div>
                  <div className="space-y-0.5 flex-1">
                    <div className="flex items-center justify-between">
                      <span className={`font-medium ${isDone ? 'line-through text-emerald-400/80' : 'text-white'}`}>
                        {step.stepNumber}. {step.title}
                      </span>
                      <span className="text-[9px] font-mono px-1.5 py-0.5 bg-slate-950 rounded text-slate-400 border border-slate-800">
                        {step.tool}
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-400 leading-tight">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

    </div>
  );
};
