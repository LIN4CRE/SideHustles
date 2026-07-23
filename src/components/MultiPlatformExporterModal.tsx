import React, { useState } from 'react';
import { X, Copy, Check, Sparkles, ShoppingBag, Briefcase, Share2, FileText, Download } from 'lucide-react';

interface MultiPlatformExporterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MultiPlatformExporterModal: React.FC<MultiPlatformExporterModalProps> = ({
  isOpen,
  onClose
}) => {
  const [activeTab, setActiveTab] = useState<'etsy' | 'fiverr' | 'social' | 'substack'>('etsy');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const SUBSTACK_TEMPLATE = {
    title: "Issue #42: The 5-Minute Solopreneur AI Stack (Zero-Cost Setup Guide)",
    subtitle: "How to automate client proposals, SEO audits, and direct bank payouts without writing a single line of code.",
    content: `# Issue #42: The 5-Minute Solopreneur AI Stack

Welcome back to another edition! Today we're breaking down how to launch high-margin digital products using 100% automated workflows.

## 💡 The Problem
Most creators waste 15+ hours a week manually answering client emails, formatting proposals, and chasing invoices.

## 🚀 The 3-Step Solution

### Step 1: Automated Proposal Engine
Use standard prompt structures to generate tailored client pitches in under 30 seconds.

### Step 2: Instant Payout Routing
Inject direct settlement endpoints (PayPal / UK Bank Routing) into every invoice so funds land in your account immediately.

### Step 3: Distribution & SEO
Cross-post your top-performing digital blueprints to Etsy and Substack for passive organic traffic.

---

### 📦 Tools Mentioned This Week:
- **SideHustles Studio**: Autonomous monetization & blueprint launcher
- **Resend**: Transactional email dispatch
- **Airtable**: No-code CRM database`
  };

  const ETSY_TEMPLATE = {
    title: "4K OLED Wallpapers & AI Prompt Pack - Minimalist Cyberpunk & Luxury Watchfaces (Digital Download)",
    price: "£1.99 - £3.99",
    category: "Digital > Art & Collectibles > Prints > Digital Prints",
    tags: [
      "OLED Wallpaper", "4K Phone Wallpaper", "Watch Face Design", "Midjourney Prompts",
      "Cyberpunk Art", "AMOLED Background", "Digital Download", "ChatGPT Prompts",
      "AI Art Generator", "iPhone Wallpaper", "Android Theme", "WearOS Watchface", "Aesthetic Wallpapers"
    ].join(", "),
    description: `Transform your smartphone or smartwatch screen with this exclusive 4K OLED Wallpaper & AI Prompt Pack!

✨ WHAT YOU RECEIVE:
- 12 High-Resolution 4K OLED PNG Wallpapers (Black Pixel Optimized)
- 10 Midjourney v6 & Flux.1 Master Prompts for custom wallpaper generation
- Complete Commercial Usage License

📱 PERFECT FOR:
- iPhone iOS 18 Depth Effect Lock Screens
- Samsung Galaxy AMOLED display power-saving wallpapers
- WearOS & Apple Watch custom watch face backgrounds

🚀 INSTANT DIGITAL DOWNLOAD:
Access your files immediately upon purchase.`
  };

  const FIVERR_TEMPLATE = {
    title: "I will optimize your local business SEO meta tags and audit Google My Business",
    category: "Digital Marketing > Search Engine Optimization (SEO) > On-Page SEO",
    basic: {
      title: "Basic 5-Meta Optimization",
      price: "£15.00",
      description: "5 custom title tags & meta descriptions + 1-page GMB quick audit report. 24h delivery."
    },
    standard: {
      title: "Standard Full Page Audit",
      price: "£45.00",
      description: "15 page meta optimization + complete local keyword research & schema markup recommendations."
    },
    premium: {
      title: "Premium Local Takeover",
      price: "£95.00",
      description: "Complete website SEO audit + 30 meta tags + GMB optimization + cold outreach pitch template."
    }
  };

  const SOCIAL_TEMPLATE = {
    twitterThread: `1/ 🚨 Stop spending hours writing prompts from scratch!

Here are 5 battle-tested AI prompts that turn ChatGPT into your personal solopreneur team:

👇 THREAD:

2/ 1. The High-Converting Landing Page Framework:
"Act as a direct-response copywriter. Write a headline, 3 benefit bullets, and CTA for [PRODUCT]..."

3/ 2. The Local SEO Pitch Audit:
"Write 5 optimized meta descriptions for a local plumber in London targeting emergency call-outs..."

4/ 3. The Short-Form Viral Hook:
"Generate 10 pattern-interrupting hooks for a 30-second TikTok video about [TOPIC]..."

5/ 💾 Save this thread for later & download the full 50-Prompt Vault on Gumroad for 99p!`,
    linkedinPost: `Are you leveraging AI to automate repetitive workflows in 2026?

Here are 3 micro-side hustles you can deploy in under 2 hours with 0 upfront capital:

1️⃣ OLED Wallpaper Packs (£1.99) — AI art generated for AMOLED battery-saving lock screens.
2️⃣ Local SEO Meta Audits (£25.00) — Offer quick 5-page meta description fixes to local businesses.
3️⃣ Notion Second Brain Templates (£2.99) — Reusable productivity dashboards.

Which execution model fits your strategy best? Let's discuss in the comments 👇`
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-3xl w-full max-h-[85vh] flex flex-col shadow-2xl text-slate-100 overflow-hidden">
        
        {/* Header */}
        <div className="px-6 py-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Multi-Platform Listing & Export Suite</h2>
              <p className="text-xs text-slate-400">
                Auto-generate optimized listing copy for Etsy, Fiverr, and Viral Social Media threads.
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

        {/* Tab Switcher */}
        <div className="px-6 py-3 bg-slate-950/60 border-b border-slate-800 flex items-center gap-2 overflow-x-auto">
          <button
            onClick={() => setActiveTab('etsy')}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
              activeTab === 'etsy'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <ShoppingBag className="w-4 h-4 text-amber-400" />
            <span>Etsy Listing Generator</span>
          </button>

          <button
            onClick={() => setActiveTab('fiverr')}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
              activeTab === 'fiverr'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Briefcase className="w-4 h-4 text-emerald-400" />
            <span>Fiverr 3-Tier Gig Packages</span>
          </button>

          <button
            onClick={() => setActiveTab('social')}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
              activeTab === 'social'
                ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/40'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Share2 className="w-4 h-4 text-indigo-400" />
            <span>Social Thread Exporter</span>
          </button>

          <button
            onClick={() => setActiveTab('substack')}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
              activeTab === 'substack'
                ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <FileText className="w-4 h-4 text-rose-400" />
            <span>Substack & Beehiiv Newsletter</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-4 flex-1 text-xs">
          
          {/* TAB 1: ETSY LISTING */}
          {activeTab === 'etsy' && (
            <div className="space-y-4">
              <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-slate-400 uppercase font-bold text-[10px]">Etsy Listing Title:</span>
                  <button
                    onClick={() => handleCopy(ETSY_TEMPLATE.title, 'etsy-title')}
                    className="text-emerald-400 hover:text-emerald-300 flex items-center gap-1 font-mono text-[11px]"
                  >
                    {copiedKey === 'etsy-title' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedKey === 'etsy-title' ? 'Copied' : 'Copy Title'}</span>
                  </button>
                </div>
                <div className="text-white font-bold">{ETSY_TEMPLATE.title}</div>
              </div>

              <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-slate-400 uppercase font-bold text-[10px]">SEO Tags (13 Max):</span>
                  <button
                    onClick={() => handleCopy(ETSY_TEMPLATE.tags, 'etsy-tags')}
                    className="text-emerald-400 hover:text-emerald-300 flex items-center gap-1 font-mono text-[11px]"
                  >
                    {copiedKey === 'etsy-tags' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedKey === 'etsy-tags' ? 'Copied' : 'Copy Tags'}</span>
                  </button>
                </div>
                <div className="text-amber-300 font-mono leading-relaxed">{ETSY_TEMPLATE.tags}</div>
              </div>

              <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-slate-400 uppercase font-bold text-[10px]">Description Template:</span>
                  <button
                    onClick={() => handleCopy(ETSY_TEMPLATE.description, 'etsy-desc')}
                    className="text-emerald-400 hover:text-emerald-300 flex items-center gap-1 font-mono text-[11px]"
                  >
                    {copiedKey === 'etsy-desc' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedKey === 'etsy-desc' ? 'Copied' : 'Copy Description'}</span>
                  </button>
                </div>
                <pre className="text-slate-300 whitespace-pre-wrap font-sans leading-relaxed">{ETSY_TEMPLATE.description}</pre>
              </div>
            </div>
          )}

          {/* TAB 2: FIVERR GIG PACKAGES */}
          {activeTab === 'fiverr' && (
            <div className="space-y-4">
              <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl">
                <span className="font-mono text-slate-400 uppercase font-bold text-[10px] block mb-1">Gig Title:</span>
                <div className="text-white font-bold">{FIVERR_TEMPLATE.title}</div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-300">Basic</span>
                      <span className="font-mono font-bold text-emerald-400">{FIVERR_TEMPLATE.basic.price}</span>
                    </div>
                    <div className="text-xs font-bold text-white mt-1">{FIVERR_TEMPLATE.basic.title}</div>
                    <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">{FIVERR_TEMPLATE.basic.description}</p>
                  </div>
                  <button
                    onClick={() => handleCopy(`${FIVERR_TEMPLATE.basic.title}: ${FIVERR_TEMPLATE.basic.description}`, 'fv-basic')}
                    className="w-full py-1.5 bg-slate-900 hover:bg-slate-800 text-slate-200 rounded-lg font-mono text-[11px] flex items-center justify-center gap-1 transition-colors"
                  >
                    {copiedKey === 'fv-basic' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>Copy Basic</span>
                  </button>
                </div>

                <div className="p-4 bg-slate-950 border border-emerald-500/40 rounded-xl space-y-2 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-emerald-300">Standard</span>
                      <span className="font-mono font-bold text-emerald-400">{FIVERR_TEMPLATE.standard.price}</span>
                    </div>
                    <div className="text-xs font-bold text-white mt-1">{FIVERR_TEMPLATE.standard.title}</div>
                    <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">{FIVERR_TEMPLATE.standard.description}</p>
                  </div>
                  <button
                    onClick={() => handleCopy(`${FIVERR_TEMPLATE.standard.title}: ${FIVERR_TEMPLATE.standard.description}`, 'fv-std')}
                    className="w-full py-1.5 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 rounded-lg font-mono text-[11px] flex items-center justify-center gap-1 transition-colors border border-emerald-500/40"
                  >
                    {copiedKey === 'fv-std' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>Copy Standard</span>
                  </button>
                </div>

                <div className="p-4 bg-slate-950 border border-indigo-500/40 rounded-xl space-y-2 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-indigo-300">Premium</span>
                      <span className="font-mono font-bold text-indigo-400">{FIVERR_TEMPLATE.premium.price}</span>
                    </div>
                    <div className="text-xs font-bold text-white mt-1">{FIVERR_TEMPLATE.premium.title}</div>
                    <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">{FIVERR_TEMPLATE.premium.description}</p>
                  </div>
                  <button
                    onClick={() => handleCopy(`${FIVERR_TEMPLATE.premium.title}: ${FIVERR_TEMPLATE.premium.description}`, 'fv-prem')}
                    className="w-full py-1.5 bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-300 rounded-lg font-mono text-[11px] flex items-center justify-center gap-1 transition-colors border border-indigo-500/40"
                  >
                    {copiedKey === 'fv-prem' ? <Check className="w-3 h-3 text-indigo-400" /> : <Copy className="w-3 h-3" />}
                    <span>Copy Premium</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: SOCIAL THREADS */}
          {activeTab === 'social' && (
            <div className="space-y-4">
              <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-indigo-300 font-bold uppercase text-[10px]">X / Twitter 5-Tweet Viral Thread:</span>
                  <button
                    onClick={() => handleCopy(SOCIAL_TEMPLATE.twitterThread, 'soc-tw')}
                    className="text-emerald-400 hover:text-emerald-300 flex items-center gap-1 font-mono text-[11px]"
                  >
                    {copiedKey === 'soc-tw' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedKey === 'soc-tw' ? 'Copied' : 'Copy Thread'}</span>
                  </button>
                </div>
                <pre className="text-slate-300 whitespace-pre-wrap font-sans leading-relaxed">{SOCIAL_TEMPLATE.twitterThread}</pre>
              </div>

              <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-purple-300 font-bold uppercase text-[10px]">LinkedIn Post Framework:</span>
                  <button
                    onClick={() => handleCopy(SOCIAL_TEMPLATE.linkedinPost, 'soc-li')}
                    className="text-emerald-400 hover:text-emerald-300 flex items-center gap-1 font-mono text-[11px]"
                  >
                    {copiedKey === 'soc-li' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedKey === 'soc-li' ? 'Copied' : 'Copy LinkedIn Post'}</span>
                  </button>
                </div>
                <pre className="text-slate-300 whitespace-pre-wrap font-sans leading-relaxed">{SOCIAL_TEMPLATE.linkedinPost}</pre>
              </div>
            </div>
          )}

          {activeTab === 'substack' && (
            <div className="space-y-4">
              <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-rose-300 font-bold uppercase text-[10px]">Substack Issue Title:</span>
                  <button
                    onClick={() => handleCopy(SUBSTACK_TEMPLATE.title, 'sub-title')}
                    className="text-emerald-400 hover:text-emerald-300 flex items-center gap-1 font-mono text-[11px]"
                  >
                    {copiedKey === 'sub-title' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedKey === 'sub-title' ? 'Copied' : 'Copy Title'}</span>
                  </button>
                </div>
                <div className="text-slate-200 font-bold">{SUBSTACK_TEMPLATE.title}</div>
              </div>

              <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-rose-300 font-bold uppercase text-[10px]">Markdown Newsletter Body:</span>
                  <button
                    onClick={() => handleCopy(SUBSTACK_TEMPLATE.content, 'sub-body')}
                    className="text-emerald-400 hover:text-emerald-300 flex items-center gap-1 font-mono text-[11px]"
                  >
                    {copiedKey === 'sub-body' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedKey === 'sub-body' ? 'Copied' : 'Copy Full Issue Markdown'}</span>
                  </button>
                </div>
                <pre className="text-slate-300 whitespace-pre-wrap font-sans leading-relaxed">{SUBSTACK_TEMPLATE.content}</pre>
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-slate-950 border-t border-slate-800 flex items-center justify-between">
          <span className="text-[11px] text-slate-500 font-mono">3 Exporters Active</span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-xl transition-colors"
          >
            Close Exporter Suite
          </button>
        </div>

      </div>
    </div>
  );
};
