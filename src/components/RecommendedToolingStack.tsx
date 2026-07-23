import React, { useState, useEffect } from 'react';
import { SideHustle } from '../types';
import { 
  Wrench, 
  Sparkles, 
  Copy, 
  Check, 
  Loader2, 
  Layers, 
  Zap, 
  Database, 
  Mail, 
  CreditCard, 
  ExternalLink,
  ChevronRight,
  Code2,
  Terminal,
  ShieldCheck,
  Cpu
} from 'lucide-react';

interface RecommendedTool {
  toolName: string;
  category: string;
  roleInHustle: string;
  estimatedMonthlyCost: string;
  difficulty: string;
  setupPrompt: string;
  quickStartBlueprint: string[];
}

interface ToolStackData {
  masterSetupPrompt: string;
  tools: RecommendedTool[];
}

interface RecommendedToolingStackProps {
  hustle: SideHustle;
}

export const RecommendedToolingStack: React.FC<RecommendedToolingStackProps> = ({ hustle }) => {
  const [toolStack, setToolStack] = useState<ToolStackData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [expandedToolIndex, setExpandedToolIndex] = useState<number | null>(0);

  const fetchToolStack = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/generate-tool-stack', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: hustle.title,
          category: hustle.category,
          description: hustle.description,
          recommendedTools: hustle.recommendedTools
        })
      });

      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to generate recommended tools');
      }

      setToolStack(data.toolStack);
    } catch (err: any) {
      console.error('Error loading tool stack:', err);
      // Fallback fallback stack if network fails
      setToolStack({
        masterSetupPrompt: `Act as a senior no-code architect. Set up an end-to-end automated workflow for ${hustle.title}: 1) Create lead capture form in Tally/Framer mapping to Airtable base with fields (Lead Name, Email, Status, Date). 2) Configure Zapier trigger on new Airtable record -> send API prompt to Gemini API -> save AI result. 3) Trigger Resend email API to deliver result to lead. 4) Send Stripe invoice link on completion.`,
        tools: [
          {
            toolName: 'Airtable',
            category: 'Database',
            roleInHustle: 'Central data store for client leads, pipeline status, and asset logs.',
            estimatedMonthlyCost: 'Free Tier ($0/mo)',
            difficulty: 'Easy',
            setupPrompt: `Create an Airtable Base titled "${hustle.title} DB" with columns: [Client ID: Autonumber], [Client Name: Single line text], [Contact Email: Email], [Status: Single select (Lead, Active, Completed)], [Project Deliverable: Long text], [Amount Paid: Currency ($)], [Date Created: Created time].`,
            quickStartBlueprint: [
              'Sign up at Airtable.com and create a new base.',
              'Add field columns for Email, Status, Deliverable Notes, and Payment Status.',
              'Connect Airtable API key to Zapier / Make.'
            ]
          },
          {
            toolName: 'Zapier / Make.com',
            category: 'Automation',
            roleInHustle: 'Connects webhook triggers to AI generation and instant customer fulfillment.',
            estimatedMonthlyCost: 'Free Tier (100 tasks/mo)',
            difficulty: 'Intermediate',
            setupPrompt: `Create a Zapier Zap: Trigger = New Record in Airtable -> Action 1 = Webhook to Gemini API to process lead prompt -> Action 2 = Update Airtable record with AI Output -> Action 3 = Send email via Resend/Gmail.`,
            quickStartBlueprint: [
              'Create new scenario in Make.com or Zap in Zapier.',
              'Set trigger module as "Airtable - Watch Records".',
              'Set action module as "HTTP Request" to call Gemini API endpoint.'
            ]
          },
          {
            toolName: 'Resend / Email API',
            category: 'Email & Outreach',
            roleInHustle: 'Delivers transactional fulfillment emails and automated cold lead outreach.',
            estimatedMonthlyCost: 'Free (3,000 emails/mo)',
            difficulty: 'Easy',
            setupPrompt: `Configure Resend API key and domain DNS records (SPF, DKIM). Create HTML email template: "Subject: Your ${hustle.title} Order is Ready! Body: Hi {{name}}, Here is your custom report: {{ai_output}}..."`,
            quickStartBlueprint: [
              'Get free API key at Resend.com.',
              'Add Resend API node in Zapier/Make.',
              'Pass customer email and generated output variables.'
            ]
          },
          {
            toolName: 'Stripe',
            category: 'Payments',
            roleInHustle: 'Processes instant customer checkout and monthly retainer billing.',
            estimatedMonthlyCost: '2.9% + 30¢ per transaction',
            difficulty: 'Easy',
            setupPrompt: `Create Stripe Payment Link for $${hustle.defaultEconomics.pricePerUnit} titled "${hustle.title} Retainer". Enable Webhook trigger on event "checkout.session.completed" to automatically mark client status as Active in Airtable.`,
            quickStartBlueprint: [
              'Create a Stripe account and generate a Payment Link.',
              'Paste link into landing page CTA button.',
              'Enable webhook to notify Zapier on completed payment.'
            ]
          }
        ]
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchToolStack();
  }, [hustle.id]);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'database':
        return <Database className="w-4 h-4 text-cyan-400" />;
      case 'automation':
        return <Zap className="w-4 h-4 text-amber-400" />;
      case 'email & outreach':
      case 'email':
        return <Mail className="w-4 h-4 text-indigo-400" />;
      case 'payments':
        return <CreditCard className="w-4 h-4 text-emerald-400" />;
      case 'ai engine':
        return <Cpu className="w-4 h-4 text-purple-400" />;
      default:
        return <Wrench className="w-4 h-4 text-slate-400" />;
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-indigo-950 via-slate-900 to-slate-950 border border-indigo-500/30 rounded-xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span className="text-[10px] uppercase font-mono font-bold tracking-widest text-amber-400">
              Gemini AI Stack Architecture
            </span>
          </div>
          <h3 className="text-base sm:text-lg font-bold text-white">
            Recommended No-Code & Software Stack for {hustle.title}
          </h3>
          <p className="text-xs text-slate-300 mt-1">
            Tailored 5-tool infrastructure designed to run this hustle on 80%+ autopilot with zero initial dev cost.
          </p>
        </div>

        <button
          onClick={fetchToolStack}
          disabled={isLoading}
          className="px-3.5 py-2 rounded-xl bg-indigo-600/30 hover:bg-indigo-600/50 text-indigo-200 border border-indigo-500/30 text-xs font-semibold flex items-center gap-2 shrink-0 transition-all self-start sm:self-center"
        >
          {isLoading ? <Loader2 className="w-4 h-4 animate-spin text-amber-400" /> : <Sparkles className="w-4 h-4 text-amber-400" />}
          <span>{isLoading ? 'Re-analyzing...' : 'Refresh Stack'}</span>
        </button>
      </div>

      {isLoading ? (
        <div className="py-16 text-center space-y-3 bg-slate-950/60 rounded-xl border border-slate-800">
          <Loader2 className="w-8 h-8 text-indigo-400 animate-spin mx-auto" />
          <p className="text-xs text-slate-400 font-mono">Analyzing ideal no-code tools and building setup prompts with Gemini...</p>
        </div>
      ) : toolStack ? (
        <div className="space-y-6">
          
          {/* Master Integration Prompt Box */}
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-amber-400" />
                <span className="text-xs font-bold text-white">Master Stack Architecture Setup Prompt</span>
              </div>
              <button
                onClick={() => handleCopy(toolStack.masterSetupPrompt, 'master')}
                className="px-2.5 py-1 rounded-lg bg-indigo-600/20 hover:bg-indigo-600/40 text-indigo-300 border border-indigo-500/30 text-xs font-mono flex items-center gap-1.5 transition-all"
              >
                {copiedKey === 'master' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedKey === 'master' ? 'Copied Master Prompt!' : 'Copy Master Prompt'}</span>
              </button>
            </div>

            <p className="text-[11px] text-slate-400">
              Paste this comprehensive prompt into AI coding agents or no-code builder assistants to auto-configure the full ecosystem in one turn.
            </p>

            <div className="bg-slate-900 border border-slate-800/80 rounded-lg p-3 text-xs text-slate-300 font-mono leading-relaxed whitespace-pre-wrap max-h-28 overflow-y-auto">
              {toolStack.masterSetupPrompt}
            </div>
          </div>

          {/* Recommended Tools Cards Grid */}
          <div className="space-y-3">
            <span className="text-[11px] font-bold uppercase tracking-wider font-mono text-slate-400 block">
              Individual Tool Setup Prompts & Integration Blueprints
            </span>

            {toolStack.tools.map((tool, idx) => {
              const isExpanded = expandedToolIndex === idx;

              return (
                <div 
                  key={idx}
                  className={`bg-slate-950 border rounded-xl transition-all ${
                    isExpanded ? 'border-indigo-500/50 ring-1 ring-indigo-500/20' : 'border-slate-800 hover:border-slate-700'
                  }`}
                >
                  
                  {/* Tool Card Header */}
                  <div 
                    onClick={() => setExpandedToolIndex(isExpanded ? null : idx)}
                    className="p-4 cursor-pointer flex items-center justify-between gap-3 select-none"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 shrink-0">
                        {getCategoryIcon(tool.category)}
                      </div>

                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className="text-sm font-bold text-white">{tool.toolName}</h4>
                          <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-900 border border-slate-800 text-slate-300">
                            {tool.category}
                          </span>
                          <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-semibold">
                            {tool.estimatedMonthlyCost}
                          </span>
                        </div>
                        <p className="text-xs text-slate-300 mt-0.5">{tool.roleInHustle}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCopy(tool.setupPrompt, `tool-${idx}`);
                        }}
                        className="px-2.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-indigo-300 border border-slate-800 text-xs font-mono flex items-center gap-1 transition-all"
                        title="Copy Setup Prompt"
                      >
                        {copiedKey === `tool-${idx}` ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-indigo-400" />}
                        <span className="hidden sm:inline">{copiedKey === `tool-${idx}` ? 'Copied' : 'Setup Prompt'}</span>
                      </button>

                      <ChevronRight className={`w-4 h-4 text-slate-500 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                    </div>
                  </div>

                  {/* Expanded Prompt & Quickstart Details */}
                  {isExpanded && (
                    <div className="p-4 border-t border-slate-800/80 bg-slate-900/50 rounded-b-xl space-y-4">
                      
                      {/* One-Click Setup Template Prompt */}
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] uppercase font-mono font-bold text-amber-400 flex items-center gap-1">
                            <Code2 className="w-3.5 h-3.5" />
                            One-Click AI Setup Template Prompt
                          </span>
                          <button
                            onClick={() => handleCopy(tool.setupPrompt, `tool-${idx}-inner`)}
                            className="text-[11px] text-indigo-400 hover:text-indigo-300 flex items-center gap-1 font-mono"
                          >
                            {copiedKey === `tool-${idx}-inner` ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                            <span>{copiedKey === `tool-${idx}-inner` ? 'Copied!' : 'Copy Prompt'}</span>
                          </button>
                        </div>

                        <div className="bg-slate-950 border border-slate-800 p-3 rounded-lg text-xs font-mono text-slate-200 leading-relaxed whitespace-pre-wrap">
                          {tool.setupPrompt}
                        </div>
                      </div>

                      {/* 5-Minute Quickstart Blueprint */}
                      <div className="space-y-1.5">
                        <span className="text-[10px] uppercase font-mono font-bold text-slate-400 block">
                          5-Minute Implementation Checklist
                        </span>
                        <div className="space-y-1">
                          {tool.quickStartBlueprint.map((step, sIdx) => (
                            <div key={sIdx} className="flex items-start gap-2 text-xs text-slate-300 bg-slate-950 p-2 rounded-lg border border-slate-800/60">
                              <span className="w-4 h-4 rounded-full bg-indigo-500/10 text-indigo-400 font-mono font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                                {sIdx + 1}
                              </span>
                              <span>{step}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                    </div>
                  )}

                </div>
              );
            })}
          </div>

        </div>
      ) : null}

    </div>
  );
};
