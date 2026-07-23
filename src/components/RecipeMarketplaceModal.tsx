import React, { useState } from 'react';
import { 
  X, 
  Download, 
  Copy, 
  Check, 
  Sparkles, 
  Zap, 
  Workflow, 
  Cpu, 
  Code, 
  Search, 
  FileText, 
  CheckCircle2, 
  ExternalLink,
  ArrowRight,
  Share2
} from 'lucide-react';

interface RecipeMarketplaceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectRecipe?: (recipeName: string, jsonContent: string) => void;
}

export interface WorkflowRecipe {
  id: string;
  title: string;
  platform: 'n8n' | 'Make.com' | 'Zapier' | 'Custom Node.js';
  category: 'Lead Gen' | 'E-commerce' | 'Social Auto-Poster' | 'Asset Sync' | 'Obsidian & Notes';
  version: string;
  nodeCount: number;
  rating: number;
  downloadsCount: number;
  description: string;
  triggerEvent: string;
  outputTarget: string;
  jsonBlueprint: object;
  tags: string[];
}

export const WORKFLOW_RECIPES: WorkflowRecipe[] = [
  {
    id: 'recipe-n8n-telegram-leads',
    title: 'n8n Telegram Lead Scraper & Gemini AI Qualification',
    platform: 'n8n',
    category: 'Lead Gen',
    version: 'v2.4',
    nodeCount: 7,
    rating: 4.9,
    downloadsCount: 1420,
    description: 'Scrapes targeted Telegram & Discord tech communities, passes post text to Gemini 1.5 Flash for lead scoring, and forwards high-intent buyers straight to your phone.',
    triggerEvent: 'Telegram Channel Webhook',
    outputTarget: 'Gemini AI -> Telegram Bot DM',
    tags: ['n8n', 'Gemini AI', 'Telegram', 'Lead Scoring'],
    jsonBlueprint: {
      name: "n8n_Telegram_Gemini_Lead_Scraper",
      nodes: [
        { name: "Telegram Trigger", type: "n8n-nodes-base.telegramTrigger", position: [100, 300] },
        { name: "Filter Keywords", type: "n8n-nodes-base.filter", position: [300, 300] },
        { name: "Gemini AI Scorer", type: "n8n-nodes-base.httpRequest", position: [500, 300], parameters: { url: "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent" } },
        { name: "Send Verified Lead DM", type: "n8n-nodes-base.telegram", position: [700, 300] }
      ],
      connections: { "Telegram Trigger": { main: [[{ node: "Filter Keywords", type: "main", index: 0 }]] } }
    }
  },
  {
    id: 'recipe-gumroad-paypal-fulfillment',
    title: 'Make.com Gumroad 1p Purchase & Instant Delivery Webhook',
    platform: 'Make.com',
    category: 'E-commerce',
    version: 'v1.8',
    nodeCount: 5,
    rating: 5.0,
    downloadsCount: 2150,
    description: 'Automatically listens for Gumroad or PayPal 1p - 10p micro-sale webhooks and delivers digital download ZIPs (Wallpapers, WearOS, Ringtones) within 3 seconds.',
    triggerEvent: 'Gumroad Sale Webhook',
    outputTarget: 'Email Dispatch + Bank Log',
    tags: ['Make.com', 'Gumroad', 'PayPal', '1p Sale'],
    jsonBlueprint: {
      name: "Make_Gumroad_1p_Auto_Fulfill",
      blueprint: {
        flow: [
          { id: 1, module: "gateway:CustomWebhook", name: "Gumroad 1p Sale Event" },
          { id: 2, module: "json:ParseJSON", name: "Extract Buyer Email & Item" },
          { id: 3, module: "email:SendMail", name: "Dispatch Digital ZIP Download" },
          { id: 4, module: "http:MakeRequest", name: "Log Sale to Side Hustle Dashboard" }
        ]
      }
    }
  },
  {
    id: 'recipe-n8n-tiktok-pinterest-autoposter',
    title: 'n8n TikTok & Pinterest 4K Wallpaper Auto-Scheduler',
    platform: 'n8n',
    category: 'Social Auto-Poster',
    version: 'v3.1',
    nodeCount: 8,
    rating: 4.8,
    downloadsCount: 1890,
    description: 'Pulls newly generated 4K wallpapers from your local folder, generates high-converting TikTok/Pinterest caption hooks with hashtag sets, and posts on schedule.',
    triggerEvent: 'Cron Schedule (Every 8 Hours)',
    outputTarget: 'Pinterest API + TikTok Business API',
    tags: ['n8n', 'TikTok', 'Pinterest', 'Wallpapers'],
    jsonBlueprint: {
      name: "n8n_TikTok_Pinterest_Auto_Poster",
      nodes: [
        { name: "Schedule Trigger", type: "n8n-nodes-base.cron", parameters: { triggerTimes: { item: [{ mode: "everyX", value: 8, unit: "hours" }] } } },
        { name: "Fetch New Asset", type: "n8n-nodes-base.readBinaryFile" },
        { name: "Gemini Caption Hook", type: "n8n-nodes-base.httpRequest" },
        { name: "Publish Pinterest Pin", type: "n8n-nodes-base.pinterest" }
      ]
    }
  },
  {
    id: 'recipe-obsidian-dataview-lifeos-sync',
    title: 'Make.com Obsidian Vault Daily Journal & Dataview Auto-Gen',
    platform: 'Make.com',
    category: 'Obsidian & Notes',
    version: 'v1.2',
    nodeCount: 4,
    rating: 4.9,
    downloadsCount: 870,
    description: 'Generates structured Dataview markdown templates with daily habit trackers, weather, and project progress widgets ready for instant Obsidian import.',
    triggerEvent: 'Daily Cron at 06:00 AM',
    outputTarget: 'Dropbox / Local Vault Folder',
    tags: ['Make.com', 'Obsidian', 'Dataview', 'Markdown'],
    jsonBlueprint: {
      name: "Obsidian_Daily_Dataview_Blueprint",
      version: 1,
      template: "# {{date}}\n## Tasks\n- [ ] Deep Work 2h\n- [ ] Post 1p Wallpaper to Reddit\n```dataview\nTABLE status FROM \"02 - Projects\"\n```"
    }
  },
  {
    id: 'recipe-discord-sales-confetti-bot',
    title: 'Custom Node.js Discord Sale Alert & Confetti Webhook',
    platform: 'Custom Node.js',
    category: 'E-commerce',
    version: 'v2.0',
    nodeCount: 3,
    rating: 5.0,
    downloadsCount: 1340,
    description: 'Lightweight Express/Node.js micro-server that catches 1p - £100 sales from Stripe, PayPal or Gumroad and posts celebratory rich Discord embeds with sound triggers.',
    triggerEvent: 'HTTP POST /api/webhook/sale',
    outputTarget: 'Discord Webhook Embed',
    tags: ['Node.js', 'Express', 'Discord Bot', 'Webhooks'],
    jsonBlueprint: {
      server: "express",
      endpoint: "/api/webhook/sale",
      handler: "async (req, res) => { const { amount, product } = req.body; await sendDiscordEmbed({ amount, product }); res.json({ status: 'ok' }); }"
    }
  }
];

export const RecipeMarketplaceModal: React.FC<RecipeMarketplaceModalProps> = ({
  isOpen,
  onClose,
  onSelectRecipe
}) => {
  if (!isOpen) return null;

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedPlatform, setSelectedPlatform] = useState<string>('All');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredRecipes = WORKFLOW_RECIPES.filter((recipe) => {
    const matchesPlatform = selectedPlatform === 'All' || recipe.platform === selectedPlatform;
    const matchesSearch = recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          recipe.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          recipe.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesPlatform && matchesSearch;
  });

  const handleCopyJson = (recipe: WorkflowRecipe) => {
    const jsonStr = JSON.stringify(recipe.jsonBlueprint, null, 2);
    navigator.clipboard.writeText(jsonStr);
    setCopiedId(recipe.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDownloadJson = (recipe: WorkflowRecipe) => {
    const jsonStr = JSON.stringify(recipe.jsonBlueprint, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${recipe.id}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-5xl shadow-2xl overflow-hidden my-auto flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 bg-gradient-to-r from-emerald-950/60 via-slate-900 to-indigo-950/60 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 p-0.5 shadow-lg shadow-emerald-500/20">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center text-emerald-400">
                <Workflow className="w-5 h-5" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                  Automation Recipe Marketplace
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-mono font-bold">
                  1-Click JSON Blueprints
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Download pre-configured JSON workflow blueprints for n8n, Make.com, Zapier & Node.js micro-servers.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-all shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Controls Bar */}
        <div className="p-3.5 bg-slate-950/80 border-b border-slate-800 flex flex-col sm:flex-row gap-3 items-center justify-between">
          {/* Search Input */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search n8n, Make.com or Telegram..."
              className="w-full pl-9 pr-3 py-1.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-emerald-500 font-mono"
            />
          </div>

          {/* Platform Filters */}
          <div className="flex flex-wrap items-center gap-1.5 text-xs w-full sm:w-auto">
            {['All', 'n8n', 'Make.com', 'Zapier', 'Custom Node.js'].map((platform) => (
              <button
                key={platform}
                onClick={() => setSelectedPlatform(platform)}
                className={`px-3 py-1.5 rounded-xl font-mono text-[11px] font-bold transition-all ${
                  selectedPlatform === platform
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                    : 'bg-slate-900 text-slate-400 hover:bg-slate-800 hover:text-slate-200 border border-slate-800'
                }`}
              >
                {platform}
              </button>
            ))}
          </div>
        </div>

        {/* Recipes Grid */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4 flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredRecipes.map((recipe) => (
              <div
                key={recipe.id}
                className="bg-slate-950/80 border border-slate-800 hover:border-emerald-500/40 rounded-2xl p-4 transition-all space-y-3.5 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold border ${
                      recipe.platform === 'n8n' 
                        ? 'bg-rose-500/10 text-rose-300 border-rose-500/30' 
                        : recipe.platform === 'Make.com' 
                        ? 'bg-purple-500/10 text-purple-300 border-purple-500/30' 
                        : 'bg-indigo-500/10 text-indigo-300 border-indigo-500/30'
                    }`}>
                      {recipe.platform} ({recipe.version})
                    </span>

                    <span className="text-[10px] font-mono text-slate-500">
                      ⚡ {recipe.nodeCount} Nodes • {recipe.downloadsCount.toLocaleString()} Downloads
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-white leading-snug">
                    {recipe.title}
                  </h4>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {recipe.description}
                  </p>

                  {/* Flow Diagram Summary */}
                  <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800/80 text-[10px] font-mono text-slate-400 space-y-1">
                    <div className="flex items-center justify-between text-slate-300">
                      <span>Trigger: <strong className="text-emerald-400">{recipe.triggerEvent}</strong></span>
                    </div>
                    <div className="flex items-center justify-between text-slate-300">
                      <span>Output: <strong className="text-indigo-400">{recipe.outputTarget}</strong></span>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1">
                    {recipe.tags.map((tag) => (
                      <span key={tag} className="px-2 py-0.5 bg-slate-900 text-slate-400 rounded text-[9px] font-mono border border-slate-800">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2">
                  <button
                    onClick={() => handleCopyJson(recipe)}
                    className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 text-xs font-mono font-bold border border-slate-800 flex items-center gap-1.5 transition-all"
                  >
                    {copiedId === recipe.id ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">JSON Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-amber-400" />
                        <span>Copy JSON</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => handleDownloadJson(recipe)}
                    className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-mono font-bold flex items-center gap-1.5 shadow-md shadow-emerald-600/20 transition-all"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download Blueprint .json</span>
                  </button>
                </div>

              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950 flex items-center justify-between shrink-0 text-xs font-mono">
          <span className="text-slate-400">
            💡 All blueprints feature 100% anonymized credentials and standard OAuth placeholders.
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold transition-all"
          >
            Close Marketplace
          </button>
        </div>

      </div>
    </div>
  );
};
