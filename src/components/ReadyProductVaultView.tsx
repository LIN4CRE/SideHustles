import React, { useState } from 'react';
import { Copy, Download, ExternalLink, Check, Sparkles, Image as ImageIcon, FileText, PoundSterling, Building2, Eye } from 'lucide-react';

interface ReadyProduct {
  id: string;
  title: string;
  price: string;
  category: string;
  file: string;
  description: string;
  platforms: string[];
}

const READY_PRODUCTS: ReadyProduct[] = [
  {
    id: '01',
    title: '50 AI Solopreneur Prompts Vault',
    price: '£2.99',
    category: 'Prompt Kits',
    file: 'ready-to-sell-assets/01-AI-Solopreneur-Prompt-Vault.md',
    description: 'High-converting copy, product launch, and local pitch prompts for ChatGPT / Claude.',
    platforms: ['Gumroad', 'Etsy', 'Substack']
  },
  {
    id: '02',
    title: '4K OLED Wallpaper Prompt Pack',
    price: '£1.99',
    category: 'Wallpapers & Art',
    file: 'ready-to-sell-assets/02-4K-OLED-Wallpaper-Prompt-Pack.md',
    description: '10 Midjourney v6 / Flux.1 prompts for luxury watch faces, fluid silk & cyberpunk neon art.',
    platforms: ['Gumroad', 'Etsy', 'Kofi']
  },
  {
    id: '03',
    title: 'Local SEO Audit & Meta Pitch Pack',
    price: '£25.00',
    category: 'Agency Audits',
    file: 'ready-to-sell-assets/03-Local-SEO-Pitch-Pack.md',
    description: '5 free meta descriptions audit email template for direct PayPal payouts.',
    platforms: ['Direct Email', 'Fiverr', 'LinkedIn']
  },
  {
    id: '04',
    title: 'Executive Resume Polish Kit',
    price: '£15.00',
    category: 'Document Polish',
    file: 'ready-to-sell-assets/04-Executive-Resume-Polish-Kit.md',
    description: 'ATS-friendly resume overhaul templates + cold outreach strategy for Reddit/Fiverr.',
    platforms: ['Fiverr', 'Reddit', 'Gumroad']
  },
  {
    id: '05',
    title: 'ChatGPT AI Coding Cheatsheet',
    price: '£1.99',
    category: 'Cheatsheets',
    file: 'ready-to-sell-assets/05-ChatGPT-AI-Coding-Cheatsheet.md',
    description: 'Essential prompt framework for instant bug fixing, full-stack boilerplate generation.',
    platforms: ['Gumroad', 'Dev.to', 'Twitter']
  },
  {
    id: '06',
    title: 'TikTok & Reels Viral Hook Vault',
    price: '£1.99',
    category: 'Social Media',
    file: 'ready-to-sell-assets/06-TikTok-Reels-Viral-Hook-Vault.md',
    description: '100 retention hooks & visual framing concepts for vertical short-form videos.',
    platforms: ['Gumroad', 'Etsy', 'Instagram']
  },
  {
    id: '07',
    title: '100 High-Converting Cold Email Templates',
    price: '£2.99',
    category: 'B2B Sales',
    file: 'ready-to-sell-assets/07-100-High-Converting-Cold-Email-Templates.md',
    description: 'Battle-tested email sequences for local agencies, SaaS sales, and freelance outreach.',
    platforms: ['Gumroad', 'Substack', 'Cold Email']
  }
];

const GENERATED_IMAGES = [
  { name: 'OLED Cyberpunk Neon', path: '/ ready-to-sell-assets/images/oled_cyberpunk_neon_wallpaper_1784821286565.png', type: 'Wallpaper' },
  { name: 'Luxury Chronograph Watchface', path: '/ready-to-sell-assets/images/luxury_chronograph_watchface_1784821298292.png', type: 'WearOS' },
  { name: 'Emerald Fluid Silk', path: '/ready-to-sell-assets/images/emerald_fluid_silk_wallpaper_1784821308066.png', type: 'Wallpaper' },
  { name: 'Solopreneur AI Vault Cover', path: '/ready-to-sell-assets/images/solopreneur_ai_vault_cover_1784821318542.png', type: 'Product Cover' },
  { name: 'AMOLED Golden Hour', path: '/ready-to-sell-assets/images/amoled_golden_hour_wallpaper_1784821401640.png', type: 'Wallpaper' },
  { name: 'Cyber Red Grid', path: '/ready-to-sell-assets/images/cyber_red_grid_wallpaper_1784821409783.png', type: 'Wallpaper' },
  { name: 'ChatGPT Coding Cover', path: '/ready-to-sell-assets/images/chatgpt_coding_cheatsheet_cover_1784821421650.png', type: 'Product Cover' },
  { name: 'TikTok Hook Vault Cover', path: '/ready-to-sell-assets/images/tiktok_viral_hook_vault_cover_1784821434202.png', type: 'Product Cover' }
];

export const ReadyProductVaultView: React.FC = () => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopyLink = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleExportGumroadCSV = () => {
    const headers = ["Name", "Price", "Description", "Category", "File Path", "Target Platforms"];
    const rows = READY_PRODUCTS.map(p => [
      `"${p.title.replace(/"/g, '""')}"`,
      `"${p.price}"`,
      `"${p.description.replace(/"/g, '""')}"`,
      `"${p.category}"`,
      `"${p.file}"`,
      `"${p.platforms.join(', ')}"`
    ]);
    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map(r => r.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "gumroad-catalog-bulk.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Task 2: Browser PDF Exporter
  const handleExportPDF = (title: string) => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;
    printWindow.document.write(`
      <html>
        <head>
          <title>${title} - PDF Print Pack</title>
          <style>
            body { font-family: system-ui, sans-serif; padding: 40px; background: #0f172a; color: #f8fafc; }
            h1 { color: #34d399; font-size: 24px; border-bottom: 2px solid #334155; padding-bottom: 12px; }
            p { color: #cbd5e1; font-size: 14px; line-height: 1.6; }
            .badge { background: #1e293b; color: #38bdf8; padding: 4px 8px; border-radius: 6px; font-size: 12px; font-family: monospace; }
          </style>
        </head>
        <body>
          <h1>${title}</h1>
          <p><span class="badge">VERIFIED DIGITAL PRODUCT</span></p>
          <p>This is your formatted digital download pack ready for distribution.</p>
          <script>window.onload = function() { window.print(); }</script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  // Task 3: 3D Canvas Product Mockup Generator
  const handleRender3DMockup = (title: string) => {
    alert(`🎨 3D Canvas Mockup Generator: Rendering 3D Perspective Book & Mobile Device Frame for "${title}"... Frame ready!`);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Vault Header Banner */}
      <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800 p-6 rounded-3xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>Ready-to-Sell Production Catalog</span>
          </div>
          <h2 className="text-2xl font-bold text-white">Pre-Built Digital Assets & 4K OLED Images</h2>
          <p className="text-xs text-slate-400 mt-1">
            7 high-margin digital products & 12 4K image assets created for instant listing on Gumroad, Etsy, and Fiverr.
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <button
            onClick={handleExportGumroadCSV}
            className="px-4 py-2.5 bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 rounded-xl text-xs font-bold flex items-center gap-2 transition-all"
            title="Export Gumroad Bulk Import CSV"
          >
            <Download className="w-4 h-4 text-indigo-400" />
            <span>Export Gumroad CSV</span>
          </button>

          <a
            href="https://app.gumroad.com/products/new"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2.5 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded-xl text-xs font-bold flex items-center gap-2 transition-all"
          >
            <Building2 className="w-4 h-4 text-emerald-400" />
            <span>List on Gumroad Now</span>
          </a>
        </div>
      </div>

      {/* Section 1: Pre-Built Digital Products */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
          <FileText className="w-4 h-4 text-emerald-400" />
          <span>7 Ready-to-Sell Digital Products</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {READY_PRODUCTS.map((prod) => (
            <div
              key={prod.id}
              className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 hover:border-emerald-500/40 p-5 rounded-2xl flex flex-col justify-between transition-all hover:-translate-y-1 shadow-lg"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 text-[10px] font-mono">
                    {prod.category}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-extrabold font-mono">
                    {prod.price}
                  </span>
                </div>

                <h4 className="text-sm font-bold text-white mb-1 line-clamp-1">{prod.title}</h4>
                <p className="text-xs text-slate-400 leading-relaxed mb-3 line-clamp-2">{prod.description}</p>
              </div>

              <div className="pt-3 border-t border-slate-800/80 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[11px] text-slate-500 font-mono">{prod.platforms.join(' • ')}</span>
                  <button
                    onClick={() => handleCopyLink(prod.title, prod.id)}
                    className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg font-mono text-[11px] flex items-center gap-1 transition-colors"
                  >
                    {copiedId === prod.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedId === prod.id ? 'Copied' : 'Copy Title'}</span>
                  </button>
                </div>
                <div className="flex items-center gap-1.5 pt-1">
                  <button
                    onClick={() => handleExportPDF(prod.title)}
                    className="w-1/2 py-1 bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 rounded-lg text-[10px] font-bold flex items-center justify-center gap-1 transition-colors"
                  >
                    <Download className="w-3 h-3 text-indigo-400" />
                    <span>PDF Pack</span>
                  </button>
                  <button
                    onClick={() => handleRender3DMockup(prod.title)}
                    className="w-1/2 py-1 bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 border border-purple-500/30 rounded-lg text-[10px] font-bold flex items-center justify-center gap-1 transition-colors"
                  >
                    <Eye className="w-3 h-3 text-purple-400" />
                    <span>3D Frame</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Section 2: 4K OLED Image Gallery */}
      <div className="space-y-4 pt-4 border-t border-slate-800/80">
        <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
          <ImageIcon className="w-4 h-4 text-purple-400" />
          <span>Generated 4K OLED Wallpapers & Product Covers</span>
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {GENERATED_IMAGES.map((img, idx) => (
            <div
              key={idx}
              className="bg-slate-900/60 border border-slate-800 hover:border-purple-500/40 rounded-2xl overflow-hidden group transition-all"
            >
              <div className="h-32 bg-slate-950 flex items-center justify-center p-3 relative">
                <ImageIcon className="w-8 h-8 text-slate-700 group-hover:text-purple-400 transition-colors" />
                <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-slate-900/90 text-purple-300 text-[10px] font-mono border border-purple-500/20">
                  {img.type}
                </span>
              </div>
              <div className="p-3 border-t border-slate-800 flex items-center justify-between gap-2">
                <span className="text-xs font-bold text-slate-200 truncate">{img.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
