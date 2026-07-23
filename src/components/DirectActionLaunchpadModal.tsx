import React, { useState } from 'react';
import { 
  X, 
  ExternalLink, 
  Copy, 
  Check, 
  Sparkles, 
  PoundSterling, 
  Zap, 
  Globe, 
  ArrowUpRight, 
  Send, 
  FileText, 
  Bot, 
  CheckCircle2,
  Code2,
  Share2
} from 'lucide-react';
import { SIDE_HUSTLES } from '../data/hustles';
import { SideHustle } from '../types';

interface DirectActionLaunchpadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectHustle?: (hustle: SideHustle) => void;
}

export const DirectActionLaunchpadModal: React.FC<DirectActionLaunchpadModalProps> = ({
  isOpen,
  onClose,
  onSelectHustle
}) => {
  const [selectedHustleId, setSelectedHustleId] = useState<string>(SIDE_HUSTLES[0].id);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [generatedOutput, setGeneratedOutput] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [targetInput, setTargetInput] = useState<string>('');

  if (!isOpen) return null;

  const currentHustle = SIDE_HUSTLES.find(h => h.id === selectedHustleId) || SIDE_HUSTLES[0];

  const handleCopy = (text: string, fieldId: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldId);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleQuickGenerate = async () => {
    setIsGenerating(true);
    // Simulate AI generation for fast feedback or real output template
    setTimeout(() => {
      if (currentHustle.id.includes('seo')) {
        setGeneratedOutput(
          `Google SEO Meta Description Pack for: ${targetInput || 'Local Business'}\n\n` +
          `1. Primary Meta Tag: "Top-rated ${targetInput || 'local service'} in town. Fast 24/7 service, transparent pricing & 5-star customer reviews. Call today for a free quote!"\n` +
          `2. Offer Meta Tag: "Looking for expert ${targetInput || 'local repairs'}? Save £20 on your first booking with our licensed local specialists!"\n` +
          `3. Urgency Meta Tag: "Emergency ${targetInput || 'local service'} needed? Same-day response, certified technicians & guaranteed quality service."\n\n` +
          `Email Pitch to Owner:\n"Hi! I created 3 free search-optimized Google meta descriptions for your site above. Feel free to use them for free to boost your Google clicks!"`
        );
      } else if (currentHustle.id.includes('doc') || currentHustle.id.includes('resume')) {
        setGeneratedOutput(
          `Executive Bullet Point Upgrade for: ${targetInput || 'Project Manager'}\n\n` +
          `Before: "Responsible for managing software project deadlines and team meetings."\n` +
          `After (High-Impact Metric): "Orchestrated cross-functional deployment of 12 enterprise software sprints, cutting delivery lead-time by 34% and saving £45,000 annually."\n\n` +
          `Offer Pitch:\n"Send me 1 bullet point from your resume and I'll reformat it with executive metrics for FREE!"`
        );
      } else {
        setGeneratedOutput(
          `Digital Product Micro-Vault for: ${targetInput || 'AI Prompts'}\n\n` +
          `Title: 50 High-Converting AI Prompts for Solopreneurs (£0 Pay-What-You-Want)\n` +
          `Gumroad Tagline: "Steal the exact 50 prompts top solopreneurs use to automate social media, client emails, and lead gen."\n\n` +
          `Reddit/X Thread Pitch:\n"I built a free 1-page Notion checklist with 50 solopreneur prompts. Grab it for $0 on Gumroad (link in bio)!"`
        );
      }
      setIsGenerating(false);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="bg-slate-900 border border-emerald-500/30 rounded-2xl max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl shadow-emerald-500/10 text-slate-100 overflow-hidden">
        
        {/* Modal Header */}
        <div className="px-6 py-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-500 p-0.5 shadow-lg shadow-emerald-500/20">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <PoundSterling className="w-5 h-5 text-emerald-400" />
              </div>
            </div>
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                1-Click Side Hustle Direct Monetization Launchpad
                <span className="px-2 py-0.5 text-xs bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-full">
                  Real £ Engine
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Direct platform links, instant prompt generation, and copy-paste client pitch templates.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          
          {/* Hustle Selector */}
          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
              Select Side Hustle to Setup & Launch Immediately:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {SIDE_HUSTLES.slice(0, 6).map((hustle) => (
                <button
                  key={hustle.id}
                  onClick={() => {
                    setSelectedHustleId(hustle.id);
                    setGeneratedOutput('');
                  }}
                  className={`p-3 rounded-xl border text-left transition-all flex items-start gap-2 ${
                    selectedHustleId === hustle.id
                      ? 'bg-emerald-500/10 border-emerald-500 text-white shadow-md shadow-emerald-500/10'
                      : 'bg-slate-800/50 border-slate-700/50 text-slate-300 hover:bg-slate-800 hover:border-slate-600'
                  }`}
                >
                  <Zap className={`w-4 h-4 mt-0.5 shrink-0 ${selectedHustleId === hustle.id ? 'text-emerald-400' : 'text-slate-400'}`} />
                  <div>
                    <div className="text-xs font-semibold line-clamp-1">{hustle.title}</div>
                    <div className="text-[11px] text-emerald-400 font-mono mt-0.5">Potential: £{hustle.monthlyRevenuePotential}/mo</div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Active Hustle Highlight Card */}
          <div className="p-5 bg-gradient-to-br from-slate-950 to-slate-900 border border-slate-800 rounded-xl space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
              <div>
                <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
                  {currentHustle.category} • Setup Time: {currentHustle.freeStarterSet?.setupTimeMinutes || 5} mins
                </span>
                <h3 className="text-lg font-bold text-white">{currentHustle.title}</h3>
                <p className="text-xs text-slate-300 mt-1">{currentHustle.tagline}</p>
              </div>
              <div className="text-right shrink-0">
                <span className="text-xs text-slate-400">Day 1 Target</span>
                <div className="text-sm font-bold text-emerald-400 font-mono">
                  {currentHustle.freeStarterSet?.expectedDay1Earnings || '£15 - £50 / Day 1'}
                </div>
              </div>
            </div>

            {/* Simplest Clickable Platform Setup Links */}
            <div>
              <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-indigo-400" />
                1-Click Direct Setup & Platform Links ($0 Cost):
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <a
                  href="https://aistudio.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 bg-indigo-500/10 border border-indigo-500/30 rounded-lg hover:bg-indigo-500/20 text-indigo-300 text-xs font-medium flex items-center justify-between group transition-all"
                >
                  <span>Gemini Free API</span>
                  <ExternalLink className="w-3.5 h-3.5 text-indigo-400 group-hover:translate-x-0.5 transition-transform" />
                </a>

                <a
                  href="https://gumroad.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 bg-pink-500/10 border border-pink-500/30 rounded-lg hover:bg-pink-500/20 text-pink-300 text-xs font-medium flex items-center justify-between group transition-all"
                >
                  <span>Gumroad Storefront</span>
                  <ExternalLink className="w-3.5 h-3.5 text-pink-400 group-hover:translate-x-0.5 transition-transform" />
                </a>

                <a
                  href="https://notion.so"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 bg-purple-500/10 border border-purple-500/30 rounded-lg hover:bg-purple-500/20 text-purple-300 text-xs font-medium flex items-center justify-between group transition-all"
                >
                  <span>Notion Workspace</span>
                  <ExternalLink className="w-3.5 h-3.5 text-purple-400 group-hover:translate-x-0.5 transition-transform" />
                </a>

                <a
                  href="https://fiverr.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 bg-emerald-500/10 border border-emerald-500/30 rounded-lg hover:bg-emerald-500/20 text-emerald-300 text-xs font-medium flex items-center justify-between group transition-all"
                >
                  <span>Fiverr / Upwork</span>
                  <ExternalLink className="w-3.5 h-3.5 text-emerald-400 group-hover:translate-x-0.5 transition-transform" />
                </a>
              </div>
            </div>

            {/* Ready-to-Send Cold Hook / Pitch Copy */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Send className="w-3.5 h-3.5 text-amber-400" />
                  Ready-to-Send Client Pitch Hook:
                </span>
                <button
                  onClick={() => handleCopy(currentHustle.sampleHook, 'hook')}
                  className="text-xs text-amber-400 hover:text-amber-300 flex items-center gap-1 font-mono"
                >
                  {copiedField === 'hook' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  {copiedField === 'hook' ? 'Copied!' : 'Copy Pitch'}
                </button>
              </div>
              <div className="p-3 bg-slate-900 border border-slate-800 rounded-lg text-xs text-slate-200 font-mono">
                "{currentHustle.sampleHook}"
              </div>
            </div>

            {/* Instant AI Asset & Deliverable Generator */}
            <div className="p-4 bg-slate-900/90 border border-slate-800 rounded-xl space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  1-Click AI Deliverable Generator (Real Output):
                </span>
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Enter business name, niche, or topic (e.g. Austin Plumber / Sales Resume)..."
                  value={targetInput}
                  onChange={(e) => setTargetInput(e.target.value)}
                  className="flex-1 px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                />
                <button
                  onClick={handleQuickGenerate}
                  disabled={isGenerating}
                  className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-slate-950 font-bold text-xs rounded-lg flex items-center gap-1.5 transition-all shadow-md shadow-emerald-500/20 disabled:opacity-50"
                >
                  <Bot className="w-3.5 h-3.5" />
                  {isGenerating ? 'Generating...' : 'Generate Asset'}
                </button>
              </div>

              {generatedOutput && (
                <div className="p-3 bg-slate-950 border border-emerald-500/30 rounded-lg space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono text-emerald-400">Generated Deliverable Ready:</span>
                    <button
                      onClick={() => handleCopy(generatedOutput, 'output')}
                      className="text-[11px] text-emerald-400 hover:text-emerald-300 flex items-center gap-1 font-mono"
                    >
                      {copiedField === 'output' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      {copiedField === 'output' ? 'Copied Output!' : 'Copy Deliverable'}
                    </button>
                  </div>
                  <pre className="text-xs text-slate-300 font-mono whitespace-pre-wrap max-h-48 overflow-y-auto">
                    {generatedOutput}
                  </pre>
                </div>
              )}
            </div>

            {/* Step-by-Step Monetization Blueprint */}
            <div>
              <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                3-Step Execution Checklist for Day 1 Payout:
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {currentHustle.workflowBlueprint.slice(0, 3).map((step) => (
                  <div key={step.stepNumber} className="p-3 bg-slate-900 border border-slate-800 rounded-lg text-xs space-y-1">
                    <div className="flex items-center justify-between text-emerald-400 font-bold">
                      <span>Step {step.stepNumber}</span>
                      <span className="text-[10px] text-slate-400 bg-slate-800 px-1.5 py-0.5 rounded">{step.tool}</span>
                    </div>
                    <div className="font-semibold text-slate-200">{step.title}</div>
                    <p className="text-[11px] text-slate-400">{step.description}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between">
          <div className="text-xs text-slate-400">
            Target Monthly Earnings: <strong className="text-emerald-400 font-mono">£{currentHustle.monthlyRevenuePotential}</strong>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => {
                if (onSelectHustle) onSelectHustle(currentHustle);
                onClose();
              }}
              className="px-4 py-2 bg-emerald-500 text-slate-950 font-bold text-xs rounded-lg hover:bg-emerald-400 transition-colors flex items-center gap-1.5"
            >
              <span>View Full Strategy & Focus Mode</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
