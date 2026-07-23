import React, { useState } from 'react';
import { 
  X, 
  Flame, 
  Sparkles, 
  TrendingUp, 
  Share2, 
  Download, 
  Search, 
  ExternalLink,
  Volume2,
  Smartphone,
  ImageIcon,
  Cpu,
  BookOpen,
  Code,
  ArrowRight,
  Zap,
  Check
} from 'lucide-react';

interface ViralAssetScoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpen24hChallenge: () => void;
}

interface ViralTrendItem {
  id: string;
  topicTitle: string;
  platform: 'TikTok' | 'Pinterest' | 'Reddit' | 'Civitai' | 'X (Twitter)';
  category: 'Ringtones' | 'Watch Face' | 'Wallpapers' | 'n8n JSON' | 'ComfyUI' | 'Obsidian';
  searchVolumeGrowth: string;
  tagline?: string;
  estimatedDemandScore: number; // 1 - 100
  lowEffortScore: number; // 1 - 100
  suggestedPrice: string;
  icon: React.ReactNode;
  summary: string;
  viralHookScript: string;
  recommendedAction: string;
}

export const ViralAssetScoutModal: React.FC<ViralAssetScoutModalProps> = ({
  isOpen,
  onClose,
  onOpen24hChallenge
}) => {
  if (!isOpen) return null;

  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>('All');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const VIRAL_TRENDS: ViralTrendItem[] = [
    {
      id: 'trend-1',
      topicTitle: 'Cozy Studio Ghibli & Rain Notification Chimes',
      platform: 'TikTok',
      category: 'Ringtones',
      searchVolumeGrowth: '+380% this week',
      estimatedDemandScore: 98,
      lowEffortScore: 95,
      suggestedPrice: '£0.10 (10p)',
      icon: <Volume2 className="w-5 h-5 text-rose-400" />,
      summary: 'Users are replacing harsh iPhone alert sounds with 1-second calm woodblock & raindrop chimes.',
      viralHookScript: 'POV: You finally replaced your stressful iPhone notification ringtone with cozy rain chimes (10p ZIP download in bio)',
      recommendedAction: 'Export 20 short .m4r/.mp3 files & post 15s audio clip on TikTok.'
    },
    {
      id: 'trend-2',
      topicTitle: 'Cyberpunk Neon HUD OLED Watch Face Preset',
      platform: 'Reddit',
      category: 'Watch Face',
      searchVolumeGrowth: '+290% engagement on r/GalaxyWatch',
      estimatedDemandScore: 94,
      lowEffortScore: 90,
      suggestedPrice: '£0.49 (49p)',
      icon: <Smartphone className="w-5 h-5 text-teal-400" />,
      summary: 'High demand for dark OLED battery-saving watch faces featuring step counters and military UTC time.',
      viralHookScript: 'Turn your Galaxy Watch or Apple Watch into a Cyberpunk HUD for 49p!',
      recommendedAction: 'Publish .watch file on Facer / Gumroad and post wrist photo on r/GalaxyWatch.'
    },
    {
      id: 'trend-3',
      topicTitle: 'Minimalist Matte Black Geometric 4K Wallpapers',
      platform: 'Pinterest',
      category: 'Wallpapers',
      searchVolumeGrowth: '+520% monthly pins',
      estimatedDemandScore: 99,
      lowEffortScore: 98,
      suggestedPrice: '£0.10 (10p)',
      icon: <ImageIcon className="w-5 h-5 text-purple-400" />,
      summary: 'Ultra-deep OLED black wallpapers with subtle gold or emerald geometric ribbon art.',
      viralHookScript: '50 Ultra-HD 4K OLED wallpapers for dark mode lovers (10p bundle link)',
      recommendedAction: 'Batch render 50 images in Midjourney/SDXL and link Gumroad ZIP.'
    },
    {
      id: 'trend-4',
      topicTitle: 'Automated Telegram Lead Scraper & Gemini AI JSON',
      platform: 'Reddit',
      category: 'n8n JSON',
      searchVolumeGrowth: '+340% upvotes on r/n8n',
      estimatedDemandScore: 96,
      lowEffortScore: 88,
      suggestedPrice: '£1.00 ($1.30)',
      icon: <Cpu className="w-5 h-5 text-emerald-400" />,
      tagline: 'Instant lead qualification workflow JSON file for n8n.',
      summary: 'Agencies and freelancers want pre-built n8n workflows that fetch websites and score leads via AI.',
      viralHookScript: 'Stop building n8n workflows from scratch. Import this Gemini lead scraper JSON for £1.00.',
      recommendedAction: 'Copy n8n JSON file and share a 30s Loom video on r/n8n or LinkedIn.'
    },
    {
      id: 'trend-5',
      topicTitle: 'ComfyUI Flux.1 Studio Lighting Node Graph',
      platform: 'Civitai',
      category: 'ComfyUI',
      searchVolumeGrowth: '+410% downloads on Civitai',
      estimatedDemandScore: 95,
      lowEffortScore: 86,
      suggestedPrice: '£0.99 (99p)',
      icon: <Code className="w-5 h-5 text-indigo-400" />,
      summary: 'AI creators are seeking 1-click photorealistic portrait node graphs with background removal.',
      viralHookScript: '1-Click ComfyUI Flux.1 Studio Lighting Pipeline (Drag and drop the JSON for 99p)',
      recommendedAction: 'Upload JSON node graph to Civitai & Gumroad with before/after render sample.'
    },
    {
      id: 'trend-6',
      topicTitle: 'Minimalist Dataview Daily Journal Obsidian Vault',
      platform: 'Reddit',
      category: 'Obsidian',
      searchVolumeGrowth: '+210% searches on r/ObsidianMD',
      estimatedDemandScore: 92,
      lowEffortScore: 92,
      suggestedPrice: '£0.50 (50p)',
      icon: <BookOpen className="w-5 h-5 text-amber-400" />,
      summary: 'Obsidian note-takers want clean pre-configured vaults with Templater habit trackers.',
      viralHookScript: 'Pre-configured Obsidian Life OS vault with Dataview & Kanban (50p ZIP download)',
      recommendedAction: 'Zip vault folder and post 3 dark-mode screenshots on r/ObsidianMD.'
    }
  ];

  const filteredTrends = activeCategoryFilter === 'All'
    ? VIRAL_TRENDS
    : VIRAL_TRENDS.filter((t) => t.category === activeCategoryFilter);

  const handleCopyScript = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-4xl shadow-2xl overflow-hidden my-auto flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 bg-gradient-to-r from-rose-950/60 via-slate-900 to-indigo-950/60 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-rose-500 to-amber-500 p-0.5 shadow-lg shadow-rose-500/20">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center text-rose-400">
                <Flame className="w-5 h-5 fill-rose-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                  Viral Asset Scout (24-Hour Trend Radar)
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30 text-[10px] font-mono font-bold animate-pulse">
                  Live TikTok / Pinterest Signals
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Identifies low-effort, high-volume micro-items currently trending for rapid 1p - 99p sales.
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

        {/* Filter Bar */}
        <div className="p-3 bg-slate-950/80 border-b border-slate-800/80 flex flex-wrap items-center gap-1.5 text-xs">
          <span className="text-[10px] font-mono uppercase font-bold text-slate-400 mr-1">Filter Trend:</span>
          {['All', 'Ringtones', 'Watch Face', 'Wallpapers', 'n8n JSON', 'ComfyUI', 'Obsidian'].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategoryFilter(cat)}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-mono font-bold transition-all ${
                activeCategoryFilter === cat
                  ? 'bg-rose-600 text-white shadow-md shadow-rose-600/30'
                  : 'bg-slate-900 text-slate-400 hover:bg-slate-800 hover:text-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Scrollable Trend List */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4 flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {filteredTrends.map((trend) => (
              <div
                key={trend.id}
                className="bg-slate-950/80 border border-slate-800 hover:border-slate-700 rounded-2xl p-4 transition-all space-y-3 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="p-2 rounded-xl bg-slate-900 border border-slate-800">
                        {trend.icon}
                      </div>
                      <div>
                        <span className="text-[10px] font-mono font-bold text-rose-400 uppercase block">
                          {trend.platform} Trend • {trend.searchVolumeGrowth}
                        </span>
                        <h4 className="text-sm font-bold text-white leading-tight">{trend.topicTitle}</h4>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-mono font-bold">
                      {trend.suggestedPrice}
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed mt-2">
                    {trend.summary}
                  </p>

                  <div className="mt-3 bg-slate-900 border border-slate-800 rounded-xl p-2.5 space-y-1">
                    <span className="text-[9px] font-mono uppercase text-amber-400 font-bold block">
                      Viral Post Hook Copy:
                    </span>
                    <p className="text-[11px] font-mono text-slate-300 italic">
                      "{trend.viralHookScript}"
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2">
                  <button
                    onClick={() => handleCopyScript(trend.viralHookScript, trend.id)}
                    className="px-2.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 text-[10px] font-mono font-bold border border-slate-800 flex items-center gap-1 transition-all"
                  >
                    {copiedId === trend.id ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-400" />
                        <span className="text-emerald-400">Hook Copied!</span>
                      </>
                    ) : (
                      <>
                        <Share2 className="w-3 h-3 text-amber-400" />
                        <span>Copy Hook Copy</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => {
                      onClose();
                      onOpen24hChallenge();
                    }}
                    className="px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-[10px] font-mono font-bold flex items-center gap-1 shadow-md shadow-rose-600/20 transition-all"
                  >
                    <Zap className="w-3 h-3 text-amber-300 fill-amber-300" />
                    <span>Auto-Deploy Item</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/80 flex items-center justify-between shrink-0 text-xs font-mono">
          <span className="text-slate-400">
            🔥 High-volume products priced at 10p generate immediate Day 1 transactions.
          </span>
          <button
            onClick={() => {
              onClose();
              onOpen24hChallenge();
            }}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-rose-600 to-indigo-600 hover:from-rose-500 hover:to-indigo-500 text-white font-bold text-xs flex items-center gap-1.5 transition-all"
          >
            <span>Open 24-Hour Micro-Sale Launcher</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </div>
  );
};
