import React, { useState } from 'react';
import { 
  Wrench, 
  Sparkles, 
  Info, 
  Check, 
  Copy, 
  ExternalLink, 
  Zap, 
  Database, 
  Workflow, 
  FileText, 
  CreditCard, 
  Mail, 
  Cpu, 
  Watch, 
  Image as ImageIcon,
  HelpCircle,
  X,
  MapPin,
  Play
} from 'lucide-react';

interface ToolExplanation {
  toolName: string;
  category: string;
  badgeColor: string;
  icon: any;
  explanation: string;
  quickPrompt: string;
  destinationLocation: string;
  proTip: string;
  directUrl: string;
}

interface SetupStepToolTooltipProps {
  stepText: string;
  hustleTitle?: string;
  hustleCategory?: string;
  stepNumber?: number;
  inlineBadge?: boolean;
}

const TOOL_KNOWLEDGE_BASE: Record<string, ToolExplanation> = {
  gemini: {
    toolName: 'Google Gemini AI Studio',
    category: 'AI Assistant & SOP Engine',
    badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
    icon: Sparkles,
    explanation: 'Google Gemini AI Studio is optimal for this step to draft high-converting outreach hooks, SOP execution documents, or marketing copy with sub-second speed.',
    quickPrompt: 'Act as a principal AI growth engineer. Create a step-by-step launch protocol and client outreach sequence for this step.',
    destinationLocation: 'Click "Run in Local LLM & Gemini Hub" below for instant in-app execution, OR open gemini.google.com -> Paste prompt into chat box.',
    proTip: 'Use Gemini 1.5 Flash for rapid iteration and zero token limits.',
    directUrl: 'https://gemini.google.com/'
  },
  obsidian: {
    toolName: 'Obsidian Vault',
    category: 'Knowledge Vault & Prompt SOPs',
    badgeColor: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
    icon: FileText,
    explanation: 'Obsidian is recommended for this step to organize markdown prompt templates, client SOPs, and prompt chains in a local vault.',
    quickPrompt: 'Create a new vault folder titled "Prompt Library" and add markdown templates for automated lead generation and client response protocols.',
    destinationLocation: 'Open Obsidian app -> Create a file in your "Prompt Library" folder -> Paste prompt or export directly via the Local LLM Hub.',
    proTip: 'Use community plugins like Dataview to tag and query client deliverables instantly.',
    directUrl: 'https://obsidian.md/download'
  },
  n8n: {
    toolName: 'n8n',
    category: 'Workflow Automation Engine',
    badgeColor: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
    icon: Workflow,
    explanation: 'n8n is recommended for this step because its self-hosted node graph executes sub-second webhooks and LLM pipelines with zero task limit fees.',
    quickPrompt: 'Set up an n8n webhook trigger listening on POST /api/webhook, connected to a Gemini AI node and HTTP email dispatch.',
    destinationLocation: 'Log into n8n dashboard -> Workflows -> Create Workflow -> Add Webhook / AI Node -> Paste prompt into Prompt input parameter.',
    proTip: 'Run n8n in Docker or Railway for 100% free unlimited execution tasks.',
    directUrl: 'https://n8n.io/cloud/'
  },
  make: {
    toolName: 'Make.com',
    category: 'Visual Integration Scenario',
    badgeColor: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30',
    icon: Zap,
    explanation: 'Make.com is ideal for this step to visually map complex multi-branch integrations between forms, databases, and AI endpoints.',
    quickPrompt: 'Add a Make scenario: Watch Airtable Records -> Parse Webhook -> HTTP POST to Gemini -> Send Resend Email.',
    destinationLocation: 'Log into Make.com -> Scenarios -> Create Scenario -> Add HTTP/Gemini module -> Paste prompt into Module parameters box.',
    proTip: 'Set execution error handlers to retry failed webhook calls automatically.',
    directUrl: 'https://www.make.com/en/register'
  },
  zapier: {
    toolName: 'Zapier',
    category: 'No-Code Automation Zap',
    badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
    icon: Zap,
    explanation: 'Zapier is recommended for quick 1-click connections between 5,000+ app integrations without writing code.',
    quickPrompt: 'Create a Zap: Trigger on New Form Submission in Tally -> AI Prompt step -> Update Google Sheet row.',
    destinationLocation: 'Log into Zapier -> Create Zap -> Select Trigger App -> Add Action Step -> Paste prompt into Action prompt box.',
    proTip: 'Use Zapier Paths to branch logic based on high-value client tags.',
    directUrl: 'https://zapier.com/app/dashboard'
  },
  airtable: {
    toolName: 'Airtable',
    category: 'Relational CRM & Base',
    badgeColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
    icon: Database,
    explanation: 'Airtable is recommended for this step to act as your lightweight CRM base, tracking client status, deal pipeline, and delivery links.',
    quickPrompt: 'Configure base fields: [Lead Name], [Email], [Pipeline Status: Lead / Active / Done], [Output Link], [Date Created].',
    destinationLocation: 'Log into Airtable -> Create Base -> Add custom fields as listed -> Share base URL with automation webhook.',
    proTip: 'Enable Airtable Automations to send Slack notifications when new high-value leads arrive.',
    directUrl: 'https://airtable.com/signup'
  },
  gumroad: {
    toolName: 'Gumroad',
    category: '1p Micro-Asset Storefront',
    badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
    icon: CreditCard,
    explanation: 'Gumroad is optimal for this step to host 1p - 10p micro-assets, wallpapers, or templates with instant digital fulfillment.',
    quickPrompt: 'Create Gumroad digital product at £0.10, upload PNG/ZIP deliverable, and copy 1-click checkout embed link.',
    destinationLocation: 'Log into Gumroad -> Products -> New Product -> Paste description & upload product deliverable file.',
    proTip: 'Set "Pay What You Want" starting at £0.10 to capture higher tips from enthusiastic buyers.',
    directUrl: 'https://gumroad.com/products/new'
  },
  stripe: {
    toolName: 'Stripe',
    category: 'Payment Processor & Retainers',
    badgeColor: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
    icon: CreditCard,
    explanation: 'Stripe is recommended for this step to handle client invoices, recurring retainer subscriptions, and direct bank payouts.',
    quickPrompt: 'Generate a Stripe Payment Link with webhook listening for checkout.session.completed events.',
    destinationLocation: 'Log into Stripe Dashboard -> Payment Links -> Create Payment Link -> Paste URL into buy button.',
    proTip: 'Attach customer email to Stripe metadata to automatically unlock client portal access.',
    directUrl: 'https://dashboard.stripe.com/register'
  },
  resend: {
    toolName: 'Resend',
    category: 'Transactional Email API',
    badgeColor: 'bg-slate-700 text-slate-200 border-slate-600',
    icon: Mail,
    explanation: 'Resend is recommended for this step to reliably dispatch HTML reports, download links, and onboarding emails.',
    quickPrompt: 'Initialize Resend API key and send HTML template payload containing custom client report download variables.',
    destinationLocation: 'Log into Resend -> API Keys -> Copy API Key -> Paste into your environment config `RESEND_API_KEY`.',
    proTip: 'Verify domain DKIM/SPF records for maximum email inbox placement.',
    directUrl: 'https://resend.com/overview'
  },
  midjourney: {
    toolName: 'Midjourney / Flux.1',
    category: 'AI Image Generation',
    badgeColor: 'bg-fuchsia-500/20 text-fuchsia-300 border-fuchsia-500/30',
    icon: ImageIcon,
    explanation: 'Midjourney or Flux.1 is recommended for this step to batch generate photorealistic 4K wallpapers, stock visuals, or UI graphics.',
    quickPrompt: 'Run prompt: "4K OLED cyberpunk wallpaper, deep black #000000, neon glow, octane render --v 6.0 --ar 16:9"',
    destinationLocation: 'Open Midjourney Discord or Flux Web UI -> Type /imagine -> Paste prompt -> Download 4K result.',
    proTip: 'Use --tile parameter for seamless repeating background patterns.',
    directUrl: 'https://www.midjourney.com/'
  },
  tally: {
    toolName: 'Tally.so / Framer',
    category: 'Form & Lead Intake Builder',
    badgeColor: 'bg-teal-500/20 text-teal-300 border-teal-500/30',
    icon: FileText,
    explanation: 'Tally.so is recommended for this step to create sleek, high-converting lead capture forms connected to webhooks.',
    quickPrompt: 'Build Tally intake form with input fields: [Name], [Email], [Business Details], set POST redirect webhook URL.',
    destinationLocation: 'Log into Tally.so -> Create Form -> Add field blocks -> Copy Form URL or embed code.',
    proTip: 'Embed Tally forms into Framer or Notion for a seamless native landing page experience.',
    directUrl: 'https://tally.so/dashboard'
  },
  facer: {
    toolName: 'WatchFace Studio / Facer',
    category: 'Smartwatch Face Compiler',
    badgeColor: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30',
    icon: Watch,
    explanation: 'WatchFace Studio or Facer is recommended for this step to compile WearOS and Apple Watch digital faces.',
    quickPrompt: 'Import 450x450 OLED PNG art layer, attach digital clock HUD elements, and export WearOS APK / WatchFace file.',
    destinationLocation: 'Open WatchFace Studio desktop app -> Import graphics -> Position clock elements -> Build APK.',
    proTip: 'Keep active background pixels under 15% to maintain Always-On Display battery efficiency.',
    directUrl: 'https://facer.io/creator'
  },
  ollama: {
    toolName: 'Ollama / Local LLM Engine',
    category: 'Local Offline LLM Engine',
    badgeColor: 'bg-orange-500/20 text-orange-300 border-orange-500/30',
    icon: Cpu,
    explanation: 'Ollama is recommended for this step to run local LLM models (e.g. Llama 3) for trend analysis and data processing with $0 API fees.',
    quickPrompt: 'Run "ollama run llama3" on localhost port 11434 and bind endpoint to your n8n or Python scraper.',
    destinationLocation: 'Click "Run in Local LLM Hub" below to run in browser, or open Terminal -> run `ollama run llama3`.',
    proTip: 'Use quantized Q4_K_M models for high execution speed on standard GPUs.',
    directUrl: 'https://ollama.com/download'
  }
};

export const SetupStepToolTooltip: React.FC<SetupStepToolTooltipProps> = ({
  stepText,
  hustleTitle = '',
  hustleCategory = '',
  stepNumber,
  inlineBadge = true
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isCopied, setIsCopied] = useState<boolean>(false);

  // Intelligent dynamic tool matcher with Google Gemini as smart AI default
  const getMatchedTool = (): ToolExplanation => {
    const textLower = stepText.toLowerCase();

    if (textLower.includes('obsidian') || textLower.includes('vault') || textLower.includes('notes') || textLower.includes('sop') || textLower.includes('markdown')) {
      return TOOL_KNOWLEDGE_BASE.obsidian;
    }
    if (textLower.includes('n8n') || textLower.includes('node graph') || textLower.includes('self-host') || textLower.includes('docker')) {
      return TOOL_KNOWLEDGE_BASE.n8n;
    }
    if (textLower.includes('make.com') || textLower.includes('make scenario')) {
      return TOOL_KNOWLEDGE_BASE.make;
    }
    if (textLower.includes('zapier') || textLower.includes('zap')) {
      return TOOL_KNOWLEDGE_BASE.zapier;
    }
    if (textLower.includes('airtable') || textLower.includes('base') || textLower.includes('crm') || textLower.includes('database')) {
      return TOOL_KNOWLEDGE_BASE.airtable;
    }
    if (textLower.includes('gumroad') || textLower.includes('storefront') || textLower.includes('micro-asset') || textLower.includes('buy button')) {
      return TOOL_KNOWLEDGE_BASE.gumroad;
    }
    if (textLower.includes('stripe') || textLower.includes('payment link') || textLower.includes('checkout') || textLower.includes('invoice') || textLower.includes('retainer')) {
      return TOOL_KNOWLEDGE_BASE.stripe;
    }
    if (textLower.includes('resend') || textLower.includes('email api') || textLower.includes('outreach email') || textLower.includes('transactional')) {
      return TOOL_KNOWLEDGE_BASE.resend;
    }
    if (textLower.includes('wallpaper') || textLower.includes('graphic') || textLower.includes('midjourney') || textLower.includes('flux')) {
      return TOOL_KNOWLEDGE_BASE.midjourney;
    }
    if (textLower.includes('tally') || textLower.includes('form builder') || textLower.includes('intake form')) {
      return TOOL_KNOWLEDGE_BASE.tally;
    }
    if (textLower.includes('watch') || textLower.includes('facer') || textLower.includes('wearos')) {
      return TOOL_KNOWLEDGE_BASE.facer;
    }
    if (textLower.includes('local llm') || textLower.includes('ollama')) {
      return TOOL_KNOWLEDGE_BASE.ollama;
    }

    // Default to Google Gemini AI Studio for general prompts, content, copywriting, & strategy
    return TOOL_KNOWLEDGE_BASE.gemini;
  };

  const tool = getMatchedTool();
  const ToolIcon = tool.icon;

  const handleCopyPrompt = (e: React.MouseEvent) => {
    e.stopPropagation();
    const fullTextToCopy = `=== ${tool.toolName} Quick Setup Prompt ===\nPrompt:\n${tool.quickPrompt}\n\n=== Where to put this prompt ===\n${tool.destinationLocation}`;
    navigator.clipboard.writeText(fullTextToCopy);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleRunInLocalLlmHub = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen(false);
    // Dispatch event to open Local LLM & Gemini Hub pre-filled with this prompt
    window.dispatchEvent(
      new CustomEvent('sh-open-local-llm-hub', {
        detail: { prompt: tool.quickPrompt, toolName: tool.toolName }
      })
    );
  };

  return (
    <div className="relative inline-block text-left">
      
      {/* Trigger Button / Badge */}
      <div className="flex items-center gap-1.5 flex-wrap">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setIsOpen(!isOpen);
          }}
          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-lg border text-[10px] font-mono font-bold transition-all hover:scale-105 cursor-pointer ${tool.badgeColor}`}
          title={`Click for tool setup & destination guidance for ${tool.toolName}`}
        >
          <ToolIcon className="w-3 h-3 shrink-0" />
          <span>Tool: {tool.toolName}</span>
          <Info className="w-2.5 h-2.5 opacity-70" />
        </button>
      </div>

      {/* Popover Tooltip Dialog Modal/Card */}
      {isOpen && (
        <div 
          className="absolute z-50 left-0 mt-2 w-72 sm:w-96 p-4 bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl backdrop-blur-md space-y-3 text-xs animate-fadeIn"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-start justify-between border-b border-slate-800 pb-2.5">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-slate-800 border border-slate-700 text-amber-400">
                <ToolIcon className="w-4 h-4" />
              </div>
              <div>
                <h5 className="font-bold text-white font-mono flex items-center gap-1.5">
                  {tool.toolName}
                  <span className="text-[9px] px-1.5 py-0.2 rounded bg-slate-800 text-slate-300 font-normal">
                    {tool.category}
                  </span>
                </h5>
                <span className="text-[10px] text-amber-400 font-mono font-bold">
                  Recommended for Step {stepNumber ? `#${stepNumber}` : ''}
                </span>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Explanation Body */}
          <div className="space-y-1">
            <span className="text-[10px] font-mono uppercase font-bold text-slate-400 block">
              Why {tool.toolName} for this step?
            </span>
            <p className="text-slate-200 text-xs leading-relaxed font-sans bg-slate-950 p-2.5 rounded-xl border border-slate-800/80">
              "{tool.explanation}"
            </p>
          </div>

          {/* EXACT DESTINATION INSTRUCTIONS: "WHERE DO I PUT THIS?" */}
          <div className="space-y-1.5 bg-indigo-950/40 p-2.5 rounded-xl border border-indigo-500/30">
            <span className="text-[10px] font-mono font-bold text-indigo-300 flex items-center gap-1 uppercase">
              <MapPin className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
              Where to put this prompt / tool:
            </span>
            <p className="text-xs text-indigo-200 font-sans leading-relaxed font-semibold">
              {tool.destinationLocation}
            </p>
          </div>

          {/* Quick Setup Prompt */}
          <div className="space-y-1.5 bg-slate-950/90 p-2.5 rounded-xl border border-slate-800/80">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono font-bold text-emerald-400 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-300" />
                Quick Tool Prompt
              </span>
              <button
                onClick={handleCopyPrompt}
                className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-[10px] font-mono flex items-center gap-1 transition-all border border-slate-700"
                title="Copy prompt and destination instructions to clipboard"
              >
                {isCopied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3 text-amber-400" />}
                <span>{isCopied ? 'Copied' : 'Copy Prompt + SOP'}</span>
              </button>
            </div>
            <p className="text-[10px] text-slate-300 font-mono italic leading-snug">
              "{tool.quickPrompt}"
            </p>
          </div>

          {/* Pro Tip */}
          <div className="flex items-center gap-1.5 text-[10px] text-amber-300 font-mono bg-amber-500/10 p-2 rounded-lg border border-amber-500/20">
            <HelpCircle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span>Pro Tip: {tool.proTip}</span>
          </div>

          {/* 1-Click In-App Execution Action */}
          <div className="grid grid-cols-2 gap-2 pt-1">
            <button
              onClick={handleRunInLocalLlmHub}
              className="w-full py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-[11px] font-mono flex items-center justify-center gap-1.5 transition-all shadow-md shadow-purple-600/30 hover:scale-[1.02]"
            >
              <Play className="w-3 h-3 fill-current" />
              <span>Run in LLM Hub</span>
            </button>

            <a
              href={tool.directUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="w-full py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white font-bold text-[11px] font-mono flex items-center justify-center gap-1.5 transition-all border border-slate-700"
            >
              <ExternalLink className="w-3 h-3 text-indigo-400" />
              <span>Official Page</span>
            </a>
          </div>

        </div>
      )}

    </div>
  );
};
