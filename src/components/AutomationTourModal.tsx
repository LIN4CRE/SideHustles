import React, { useState } from 'react';
import { 
  X, 
  ChevronRight, 
  ChevronLeft, 
  Sparkles, 
  Server, 
  FileText, 
  CreditCard, 
  Terminal, 
  CheckCircle2, 
  Play, 
  Zap, 
  Copy, 
  Check, 
  HelpCircle,
  ExternalLink,
  Layers,
  ArrowRight
} from 'lucide-react';

interface AutomationTourModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenLocalLlmHub?: () => void;
  onOpenPayoutModal?: () => void;
  onOpenExecutionLogs?: () => void;
}

export const AutomationTourModal: React.FC<AutomationTourModalProps> = ({
  isOpen,
  onClose,
  onOpenLocalLlmHub,
  onOpenPayoutModal,
  onOpenExecutionLogs
}) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [isTestSuccess, setIsTestSuccess] = useState<boolean>(false);

  if (!isOpen) return null;

  const totalSteps = 4;

  const handleCopyCommand = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const steps = [
    {
      stepNumber: 1,
      title: 'Connect Local LLM Engine (Ollama / LM Studio)',
      icon: Server,
      color: 'text-indigo-400 border-indigo-500/30 bg-indigo-500/10',
      badge: 'Zero API Fees',
      description: 'Your side hustle AI agents run 100% locally on your computer or phone. Connect Ollama on port 11434 or LM Studio on port 1234 to run Llama 3.2, Mistral, and DeepSeek for free.',
      interactiveTip: 'Default localhost endpoint detected: http://localhost:11434 (Ollama)',
      codeSnippet: 'ollama run llama3.2:latest',
      actionText: 'Configure Local LLM Engine',
      action: () => {
        if (onOpenLocalLlmHub) onOpenLocalLlmHub();
      }
    },
    {
      stepNumber: 2,
      title: 'Set Up Obsidian Vault & MCP Server',
      icon: FileText,
      color: 'text-purple-400 border-purple-500/30 bg-purple-500/10',
      badge: 'Local Markdown Sync',
      description: 'Automatically save generated client proposals, lead spreadsheets, and digital products directly into your local Obsidian markdown vault.',
      interactiveTip: 'Use Smart Connections plugin in Obsidian to let Ollama query your notes.',
      codeSnippet: 'npx -y @modelcontextprotocol/server-obsidian --vault "~/Documents/ObsidianVault"',
      actionText: 'Open MCP Protocol Presets',
      action: () => {
        if (onOpenLocalLlmHub) onOpenLocalLlmHub();
      }
    },
    {
      stepNumber: 3,
      title: 'Configure Direct Bank & PayPal Payouts',
      icon: CreditCard,
      color: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10',
      badge: 'Instant Deposit Ready',
      description: 'Automate invoice links with verified UK sort code (05-02-30 / 49193968) and PayPal checkout endpoints so buyers deposit funds directly to you.',
      interactiveTip: 'Verified account: MR DAVID CHRISTOPHER LINACRE - 05-02-30 (Yorkshire Bank / Virgin Money)',
      codeSnippet: 'PayPal.me/dlinacre16 | Bank Sort: 05-02-30 Acc: 49193968',
      actionText: 'Verify Payout Account Details',
      action: () => {
        if (onOpenPayoutModal) onOpenPayoutModal();
      }
    },
    {
      stepNumber: 4,
      title: 'Monitor Live Execution Logs & Automation Health',
      icon: Terminal,
      color: 'text-amber-400 border-amber-500/30 bg-amber-500/10',
      badge: 'Real-time Autonomous Agent',
      description: 'Trigger autonomous background AI tasks anytime and inspect real-time execution logs, stdout responses, and daily lead status updates.',
      interactiveTip: 'Click "Trigger AI Task Now" on any hustle to simulate full workflow execution.',
      codeSnippet: 'Agent Task #AI-882: Lead Scraped -> Proposal Written -> Invoice Sent ($99)',
      actionText: 'View Execution Terminal Logs',
      action: () => {
        if (onOpenExecutionLogs) onOpenExecutionLogs();
      }
    }
  ];

  const activeStepObj = steps[currentStep - 1];
  const StepIcon = activeStepObj.icon;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden flex flex-col">
        
        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-gradient-to-r from-slate-900 via-indigo-950/60 to-slate-900">
          <div className="flex items-center gap-3">
            <div className={`p-2.5 rounded-xl border ${activeStepObj.color}`}>
              <StepIcon className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-indigo-400 uppercase">Guided Setup Tour</span>
                <span className="px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-[10px] font-mono">
                  Step {currentStep} of {totalSteps}
                </span>
              </div>
              <h2 className="text-base font-bold text-white font-sans">
                {activeStepObj.title}
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Progress Indicator Bar */}
        <div className="bg-slate-950 px-5 py-3 border-b border-slate-800 flex items-center gap-2">
          {steps.map((s) => (
            <button
              key={s.stepNumber}
              onClick={() => setCurrentStep(s.stepNumber)}
              className={`flex-1 h-2 rounded-full transition-all ${
                s.stepNumber === currentStep
                  ? 'bg-gradient-to-r from-indigo-500 to-emerald-500 shadow-sm shadow-indigo-500/50'
                  : s.stepNumber < currentStep
                  ? 'bg-emerald-500/60'
                  : 'bg-slate-800'
              }`}
              title={`Jump to Step ${s.stepNumber}: ${s.title}`}
            />
          ))}
        </div>

        {/* Step Content */}
        <div className="p-6 space-y-5 font-sans">
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className={`px-2.5 py-1 rounded-lg border text-xs font-mono font-bold ${activeStepObj.color}`}>
                {activeStepObj.badge}
              </span>
              <span className="text-xs text-slate-400 font-mono">
                {Math.round((currentStep / totalSteps) * 100)}% Setup Complete
              </span>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed font-sans">
              {activeStepObj.description}
            </p>
          </div>

          {/* Interactive Tooltip Box */}
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono text-amber-300 font-bold">
              <HelpCircle className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Interactive Step Guidance & Tip:</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed font-mono bg-slate-900/80 p-2.5 rounded-lg border border-slate-800">
              {activeStepObj.interactiveTip}
            </p>

            <div className="flex items-center justify-between bg-slate-900 p-2.5 rounded-lg border border-slate-800 text-xs font-mono">
              <code className="text-emerald-400 text-[11px] truncate mr-2">
                {activeStepObj.codeSnippet}
              </code>
              <button
                onClick={() => handleCopyCommand(activeStepObj.codeSnippet, currentStep)}
                className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded text-[10px] font-bold flex items-center gap-1 shrink-0 transition-all"
              >
                {copiedIndex === currentStep ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copiedIndex === currentStep ? 'Copied!' : 'Copy'}</span>
              </button>
            </div>
          </div>

          {/* Direct Action Trigger */}
          <div className="flex items-center justify-between pt-2">
            <button
              onClick={activeStepObj.action}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-indigo-300 font-bold text-xs flex items-center gap-2 border border-slate-700 transition-all font-mono"
            >
              <Zap className="w-4 h-4 text-amber-400" />
              <span>{activeStepObj.actionText}</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-70" />
            </button>

            <button
              onClick={() => setIsTestSuccess(true)}
              className="text-xs font-mono text-emerald-400 hover:underline flex items-center gap-1"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{isTestSuccess ? 'Step Verified ✓' : 'Mark Step Verified'}</span>
            </button>
          </div>

        </div>

        {/* Footer Navigation Buttons */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between font-mono text-xs">
          <button
            onClick={() => setCurrentStep((prev) => Math.max(prev - 1, 1))}
            disabled={currentStep === 1}
            className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 disabled:opacity-40 text-slate-300 font-bold flex items-center gap-1.5 transition-all"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous Step</span>
          </button>

          {currentStep < totalSteps ? (
            <button
              onClick={() => setCurrentStep((prev) => Math.min(prev + 1, totalSteps))}
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-emerald-600 hover:from-indigo-500 hover:to-emerald-500 text-white font-bold flex items-center gap-1.5 shadow-md shadow-indigo-500/20 transition-all"
            >
              <span>Next Step</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={onClose}
              className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold flex items-center gap-1.5 shadow-md shadow-emerald-500/20 transition-all"
            >
              <CheckCircle2 className="w-4 h-4 text-white" />
              <span>Complete Tour & Start Automating</span>
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
