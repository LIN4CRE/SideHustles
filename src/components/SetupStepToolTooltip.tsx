import React, { useState } from 'react';
import { 
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
  X,
  Play,
  Download,
  Rocket
} from 'lucide-react';

interface ToolConfig {
  toolName: string;
  category: string;
  badgeColor: string;
  icon: any;
  explanation: string;
  quickPrompt: string;
  /** The exact deep-link URL to the creation/setup page — NOT a homepage or registration page */
  deepLinkUrl: string;
  /** Short label for the deep link button */
  deepLinkLabel: string;
  /** Whether this tool's prompt can be executed in-app via the LLM Hub */
  canRunInApp: boolean;
  /** Whether this tool has a JSON blueprint that can be auto-downloaded */
  canDownloadBlueprint: boolean;
  /** Optional JSON blueprint content for 1-click download */
  blueprintJson?: object;
}

interface SetupStepToolTooltipProps {
  stepText: string;
  hustleTitle?: string;
  hustleCategory?: string;
  stepNumber?: number;
  inlineBadge?: boolean;
}

const TOOL_KNOWLEDGE_BASE: Record<string, ToolConfig> = {
  gemini: {
    toolName: 'Google Gemini',
    category: 'AI Engine',
    badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
    icon: Sparkles,
    explanation: 'Gemini generates outreach copy, SOPs, and marketing assets instantly. Click below to execute this prompt in-app or open Gemini directly.',
    quickPrompt: 'Act as a principal AI growth engineer. Create a step-by-step launch protocol and client outreach sequence for this side hustle step.',
    deepLinkUrl: 'https://aistudio.google.com/prompts/new_chat',
    deepLinkLabel: 'Open AI Studio → New Chat',
    canRunInApp: true,
    canDownloadBlueprint: false
  },
  obsidian: {
    toolName: 'Obsidian',
    category: 'Vault & SOPs',
    badgeColor: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
    icon: FileText,
    explanation: 'Obsidian stores your prompt templates and SOPs. Use "Download .md" to save directly to your vault folder.',
    quickPrompt: 'Create a new vault folder titled "Prompt Library" and add markdown templates for automated lead generation and client response protocols.',
    deepLinkUrl: 'obsidian://new?vault=Prompt%20Library&name=New%20SOP&content=',
    deepLinkLabel: 'Open Vault → New Note',
    canRunInApp: true,
    canDownloadBlueprint: false
  },
  n8n: {
    toolName: 'n8n',
    category: 'Workflow Engine',
    badgeColor: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
    icon: Workflow,
    explanation: 'n8n runs webhook automations for free. Download the JSON blueprint below, then import it directly into n8n.',
    quickPrompt: 'Set up an n8n webhook trigger on POST /api/webhook, connected to a Gemini AI node and HTTP email dispatch.',
    deepLinkUrl: 'https://app.n8n.cloud/workflows/new',
    deepLinkLabel: 'Open n8n → New Workflow',
    canRunInApp: true,
    canDownloadBlueprint: true,
    blueprintJson: {
      name: "SideHustle_Webhook_AI_Pipeline",
      nodes: [
        { name: "Webhook Trigger", type: "n8n-nodes-base.webhook", position: [100, 300], parameters: { path: "/api/webhook", httpMethod: "POST" } },
        { name: "Gemini AI Generate", type: "n8n-nodes-base.httpRequest", position: [350, 300], parameters: { url: "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent", method: "POST" } },
        { name: "Send Email", type: "n8n-nodes-base.emailSend", position: [600, 300] }
      ],
      connections: { "Webhook Trigger": { main: [[{ node: "Gemini AI Generate", type: "main", index: 0 }]] }, "Gemini AI Generate": { main: [[{ node: "Send Email", type: "main", index: 0 }]] } }
    }
  },
  make: {
    toolName: 'Make.com',
    category: 'Scenario Builder',
    badgeColor: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30',
    icon: Zap,
    explanation: 'Make.com maps multi-step integrations visually. Download the scenario JSON below, then import it with one click.',
    quickPrompt: 'Make scenario: Watch Airtable Records → Parse Webhook → HTTP POST to Gemini → Send Resend Email.',
    deepLinkUrl: 'https://www.make.com/en/scenarios/create',
    deepLinkLabel: 'Open Make → Create Scenario',
    canRunInApp: true,
    canDownloadBlueprint: true,
    blueprintJson: {
      name: "SideHustle_Airtable_Gemini_Email",
      blueprint: {
        flow: [
          { id: 1, module: "airtable:ListRecords", name: "Watch Airtable New Leads" },
          { id: 2, module: "http:MakeRequest", name: "POST to Gemini AI", parameters: { url: "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent" } },
          { id: 3, module: "email:SendMail", name: "Dispatch Client Email via Resend" },
          { id: 4, module: "http:MakeRequest", name: "Log to Dashboard Webhook" }
        ]
      }
    }
  },
  zapier: {
    toolName: 'Zapier',
    category: 'No-Code Zap',
    badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
    icon: Zap,
    explanation: 'Zapier connects 5,000+ apps without code. Click below to open the Zap editor directly.',
    quickPrompt: 'Create a Zap: Trigger on New Form Submission in Tally → AI Prompt step → Update Google Sheet row.',
    deepLinkUrl: 'https://zapier.com/webintent/create-zap',
    deepLinkLabel: 'Open Zapier → Create Zap',
    canRunInApp: true,
    canDownloadBlueprint: false
  },
  airtable: {
    toolName: 'Airtable',
    category: 'CRM & Database',
    badgeColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
    icon: Database,
    explanation: 'Airtable acts as your lightweight CRM. Click below to create a new base with the right fields pre-configured.',
    quickPrompt: 'Configure base fields: [Lead Name], [Email], [Pipeline Status: Lead / Active / Done], [Output Link], [Date Created].',
    deepLinkUrl: 'https://airtable.com/shrMkIVUBzwBGMZTM',
    deepLinkLabel: 'Open Airtable → New Base',
    canRunInApp: false,
    canDownloadBlueprint: false
  },
  gumroad: {
    toolName: 'Gumroad',
    category: 'Storefront',
    badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
    icon: CreditCard,
    explanation: 'Gumroad hosts micro-assets (1p–10p) with instant digital delivery. Click below to go directly to the new product creation page.',
    quickPrompt: 'Create Gumroad digital product at £0.10, upload PNG/ZIP deliverable, and copy 1-click checkout embed link.',
    deepLinkUrl: 'https://app.gumroad.com/products/new',
    deepLinkLabel: 'Open Gumroad → New Product',
    canRunInApp: false,
    canDownloadBlueprint: false
  },
  stripe: {
    toolName: 'Stripe',
    category: 'Payments',
    badgeColor: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
    icon: CreditCard,
    explanation: 'Stripe handles invoices and recurring subscriptions. Click below to create a payment link instantly.',
    quickPrompt: 'Generate a Stripe Payment Link with webhook listening for checkout.session.completed events.',
    deepLinkUrl: 'https://dashboard.stripe.com/payment-links/create',
    deepLinkLabel: 'Open Stripe → Create Payment Link',
    canRunInApp: false,
    canDownloadBlueprint: false
  },
  resend: {
    toolName: 'Resend',
    category: 'Email API',
    badgeColor: 'bg-slate-700 text-slate-200 border-slate-600',
    icon: Mail,
    explanation: 'Resend dispatches transactional emails. Click below to go directly to your API keys page.',
    quickPrompt: 'Initialize Resend API key and send HTML template payload containing custom client report download variables.',
    deepLinkUrl: 'https://resend.com/api-keys',
    deepLinkLabel: 'Open Resend → API Keys',
    canRunInApp: false,
    canDownloadBlueprint: false
  },
  midjourney: {
    toolName: 'Midjourney / Flux',
    category: 'AI Image Gen',
    badgeColor: 'bg-fuchsia-500/20 text-fuchsia-300 border-fuchsia-500/30',
    icon: ImageIcon,
    explanation: 'Generates 4K wallpapers and stock visuals. Copy the prompt below and paste it straight into /imagine.',
    quickPrompt: '4K OLED cyberpunk wallpaper, deep black #000000, neon glow, octane render --v 6.0 --ar 16:9',
    deepLinkUrl: 'https://www.midjourney.com/imagine',
    deepLinkLabel: 'Open Midjourney → Imagine',
    canRunInApp: false,
    canDownloadBlueprint: false
  },
  tally: {
    toolName: 'Tally.so',
    category: 'Form Builder',
    badgeColor: 'bg-teal-500/20 text-teal-300 border-teal-500/30',
    icon: FileText,
    explanation: 'Tally.so creates lead capture forms connected to webhooks. Click below to start building a new form immediately.',
    quickPrompt: 'Build Tally intake form: fields [Name], [Email], [Business Details], set POST redirect webhook URL.',
    deepLinkUrl: 'https://tally.so/r/new',
    deepLinkLabel: 'Open Tally → New Form',
    canRunInApp: false,
    canDownloadBlueprint: false
  },
  facer: {
    toolName: 'Facer / WFS',
    category: 'Watch Face',
    badgeColor: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30',
    icon: Watch,
    explanation: 'Facer compiles WearOS and Apple Watch faces. Click below to open the creator directly.',
    quickPrompt: 'Import 450x450 OLED PNG art layer, attach digital clock HUD elements, and export WearOS APK.',
    deepLinkUrl: 'https://www.facer.io/creator',
    deepLinkLabel: 'Open Facer → Creator',
    canRunInApp: false,
    canDownloadBlueprint: false
  },
  ollama: {
    toolName: 'Ollama / LLM',
    category: 'Local AI Engine',
    badgeColor: 'bg-orange-500/20 text-orange-300 border-orange-500/30',
    icon: Cpu,
    explanation: 'Ollama runs local LLM models at $0 cost. Click "Run in App" to execute this prompt instantly without leaving.',
    quickPrompt: 'Run "ollama run llama3" on localhost:11434 and bind endpoint to your n8n or Python scraper.',
    deepLinkUrl: 'https://ollama.com/download',
    deepLinkLabel: 'Download Ollama',
    canRunInApp: true,
    canDownloadBlueprint: false
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
  const [blueprintDownloaded, setBlueprintDownloaded] = useState<boolean>(false);

  const getMatchedTool = (): ToolConfig => {
    const t = stepText.toLowerCase();

    if (t.includes('obsidian') || t.includes('vault') || t.includes('sop') || t.includes('markdown')) return TOOL_KNOWLEDGE_BASE.obsidian;
    if (t.includes('n8n') || t.includes('node graph') || t.includes('self-host') || t.includes('docker')) return TOOL_KNOWLEDGE_BASE.n8n;
    if (t.includes('make.com') || t.includes('make scenario')) return TOOL_KNOWLEDGE_BASE.make;
    if (t.includes('zapier') || t.includes('zap')) return TOOL_KNOWLEDGE_BASE.zapier;
    if (t.includes('airtable') || t.includes('crm') || t.includes('database')) return TOOL_KNOWLEDGE_BASE.airtable;
    if (t.includes('gumroad') || t.includes('storefront') || t.includes('micro-asset') || t.includes('buy button')) return TOOL_KNOWLEDGE_BASE.gumroad;
    if (t.includes('stripe') || t.includes('payment link') || t.includes('checkout') || t.includes('invoice') || t.includes('retainer')) return TOOL_KNOWLEDGE_BASE.stripe;
    if (t.includes('resend') || t.includes('email api') || t.includes('transactional')) return TOOL_KNOWLEDGE_BASE.resend;
    if (t.includes('wallpaper') || t.includes('graphic') || t.includes('midjourney') || t.includes('flux')) return TOOL_KNOWLEDGE_BASE.midjourney;
    if (t.includes('tally') || t.includes('form builder') || t.includes('intake form')) return TOOL_KNOWLEDGE_BASE.tally;
    if (t.includes('watch') || t.includes('facer') || t.includes('wearos')) return TOOL_KNOWLEDGE_BASE.facer;
    if (t.includes('local llm') || t.includes('ollama')) return TOOL_KNOWLEDGE_BASE.ollama;
    return TOOL_KNOWLEDGE_BASE.gemini;
  };

  const tool = getMatchedTool();
  const ToolIcon = tool.icon;

  const handleCopyPrompt = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(tool.quickPrompt);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleRunInApp = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen(false);
    window.dispatchEvent(
      new CustomEvent('sh-open-local-llm-hub', {
        detail: { prompt: tool.quickPrompt, toolName: tool.toolName }
      })
    );
  };

  const handleDownloadBlueprint = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!tool.blueprintJson) return;
    const json = JSON.stringify(tool.blueprintJson, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${tool.toolName.toLowerCase().replace(/[^a-z0-9]/g, '_')}_blueprint.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setBlueprintDownloaded(true);
    setTimeout(() => setBlueprintDownloaded(false), 3000);
  };

  return (
    <div className="relative inline-block text-left">
      
      {/* Badge trigger */}
      <div className="flex items-center gap-1.5 flex-wrap">
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); setIsOpen(!isOpen); }}
          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-lg border text-[10px] font-mono font-bold transition-all hover:scale-105 cursor-pointer ${tool.badgeColor}`}
        >
          <ToolIcon className="w-3 h-3 shrink-0" />
          <span>{tool.toolName}</span>
          <Info className="w-2.5 h-2.5 opacity-70" />
        </button>
      </div>

      {/* Popup card */}
      {isOpen && (
        <div 
          className="absolute z-50 left-0 mt-2 w-72 sm:w-80 p-3.5 bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl backdrop-blur-md space-y-2.5 text-xs animate-fadeIn"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-start justify-between pb-2 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-slate-800 border border-slate-700 text-amber-400">
                <ToolIcon className="w-4 h-4" />
              </div>
              <div>
                <h5 className="font-bold text-white font-mono text-xs">{tool.toolName}</h5>
                <span className="text-[10px] text-amber-400 font-mono font-bold">
                  Step {stepNumber ? `#${stepNumber}` : ''} • {tool.category}
                </span>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="p-1 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Short explanation */}
          <p className="text-slate-300 text-[11px] leading-relaxed">
            {tool.explanation}
          </p>

          {/* Prompt with copy */}
          <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800/80 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono font-bold text-emerald-400 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-300" />
                Prompt
              </span>
              <button
                onClick={handleCopyPrompt}
                className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-[10px] font-mono flex items-center gap-1 transition-all border border-slate-700"
              >
                {isCopied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3 text-amber-400" />}
                <span>{isCopied ? 'Copied!' : 'Copy'}</span>
              </button>
            </div>
            <p className="text-[10px] text-slate-300 font-mono italic leading-snug line-clamp-3">
              {tool.quickPrompt}
            </p>
          </div>

          {/* === ACTION BUTTONS — THE ACTUAL AUTOMATION === */}
          <div className="space-y-1.5 pt-1">

            {/* PRIMARY: Deep link to the exact creation page */}
            <a
              href={tool.deepLinkUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="w-full py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-[11px] font-mono flex items-center justify-center gap-2 transition-all shadow-md shadow-indigo-600/30 hover:scale-[1.02]"
            >
              <Rocket className="w-3.5 h-3.5" />
              <span>{tool.deepLinkLabel}</span>
              <ExternalLink className="w-3 h-3 opacity-60" />
            </a>

            {/* SECONDARY ROW: In-app execution + Blueprint download */}
            <div className={`grid gap-1.5 ${tool.canRunInApp && tool.canDownloadBlueprint ? 'grid-cols-2' : 'grid-cols-1'}`}>
              
              {/* Run prompt in-app via LLM Hub */}
              {tool.canRunInApp && (
                <button
                  onClick={handleRunInApp}
                  className="w-full py-1.5 rounded-xl bg-purple-600/80 hover:bg-purple-500 text-white font-bold text-[10px] font-mono flex items-center justify-center gap-1.5 transition-all"
                >
                  <Play className="w-3 h-3 fill-current" />
                  <span>Run in App</span>
                </button>
              )}

              {/* Download ready-to-import JSON blueprint */}
              {tool.canDownloadBlueprint && tool.blueprintJson && (
                <button
                  onClick={handleDownloadBlueprint}
                  className={`w-full py-1.5 rounded-xl font-bold text-[10px] font-mono flex items-center justify-center gap-1.5 transition-all ${
                    blueprintDownloaded
                      ? 'bg-emerald-600/80 text-white'
                      : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
                  }`}
                >
                  {blueprintDownloaded ? <Check className="w-3 h-3" /> : <Download className="w-3 h-3 text-emerald-400" />}
                  <span>{blueprintDownloaded ? 'Downloaded!' : 'Download Blueprint .json'}</span>
                </button>
              )}
            </div>

          </div>
        </div>
      )}
    </div>
  );
};
