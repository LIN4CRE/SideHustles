import React, { useState, useEffect } from 'react';
import { 
  X, 
  Sparkles, 
  Download, 
  Copy, 
  Check, 
  Image as ImageIcon, 
  Music, 
  Watch, 
  Workflow, 
  Trash2, 
  Plus, 
  Flame, 
  Zap, 
  ExternalLink,
  Share2,
  RefreshCw,
  Search,
  Filter,
  CheckCircle2
} from 'lucide-react';

interface GenAIAssetLibraryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenRecipes?: () => void;
  onOpen24hChallenge?: () => void;
}

export interface GenAIAssetItem {
  id: string;
  title: string;
  category: 'Wallpaper' | 'Watch Face' | 'Ringtone' | 'Automation Blueprint';
  promptUsed: string;
  previewUrl?: string;
  audioSample?: string;
  fileFormat: string;
  fileSize: string;
  suggestedPrice: string;
  createdAt: string;
  downloadsCount: number;
  tags: string[];
}

const INITIAL_GALLERY_ITEMS: GenAIAssetItem[] = [
  {
    id: 'asset-1',
    title: 'Cyberpunk Neon Alley OLED 4K',
    category: 'Wallpaper',
    promptUsed: 'Ultra HD 4K cyberpunk neon alley, deep true black #000000 OLED background, subtle rain reflections, octane render',
    previewUrl: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=800&q=80',
    fileFormat: 'PNG (3840x2160)',
    fileSize: '4.2 MB',
    suggestedPrice: '£0.10 (10p)',
    createdAt: 'Today',
    downloadsCount: 142,
    tags: ['OLED', 'Cyberpunk', '4K Wallpaper', 'TikTok Viral']
  },
  {
    id: 'asset-2',
    title: 'Matrix HUD Cyberpunk Chrono',
    category: 'Watch Face',
    promptUsed: 'WearOS 4 watch face design, neon green digital glow HUD, battery percentage ring, heart rate pulse wave, dark minimal background',
    previewUrl: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=800&q=80',
    fileFormat: 'APK / WatchFace Studio',
    fileSize: '8.1 MB',
    suggestedPrice: '£0.49 (49p)',
    createdAt: 'Yesterday',
    downloadsCount: 89,
    tags: ['Galaxy Watch', 'Apple Watch', 'WearOS', 'OLED']
  },
  {
    id: 'asset-3',
    title: 'Ghibli Lofi Afternoon Chime',
    category: 'Ringtone',
    promptUsed: 'Warm analog marimba & soft synth chime ringtone, high fidelity 24-bit 48kHz, calming notification sound',
    fileFormat: 'MP3 / M4R (iPhone)',
    fileSize: '1.1 MB',
    suggestedPrice: '£0.01 (1p)',
    createdAt: '2 days ago',
    downloadsCount: 310,
    tags: ['Ringtone', 'Lofi', 'Notification', 'iOS & Android']
  },
  {
    id: 'asset-4',
    title: 'Flux.1 Lighting Upscaler Node Graph',
    category: 'Automation Blueprint',
    promptUsed: 'ComfyUI JSON pipeline for automatic Flux.1 relighting and 4K tile upscaling with custom ControlNet bindings',
    fileFormat: 'JSON Blueprint',
    fileSize: '42 KB',
    suggestedPrice: '£0.99',
    createdAt: '3 days ago',
    downloadsCount: 205,
    tags: ['ComfyUI', 'n8n', 'Flux.1', 'AI Pipeline']
  }
];

export const GenAIAssetLibraryModal: React.FC<GenAIAssetLibraryModalProps> = ({
  isOpen,
  onClose,
  onOpenRecipes,
  onOpen24hChallenge
}) => {
  if (!isOpen) return null;

  const [gallery, setGallery] = useState<GenAIAssetItem[]>(() => {
    try {
      const saved = localStorage.getItem('sh_genai_asset_library');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return INITIAL_GALLERY_ITEMS;
  });

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [generationProgress, setGenerationProgress] = useState<number>(0);
  const [promptInput, setPromptInput] = useState<string>('Minimalist Ghibli Lofi Rain OLED Wallpaper');
  const [batchCategory, setBatchCategory] = useState<'Wallpaper' | 'Watch Face' | 'Ringtone' | 'Automation Blueprint'>('Wallpaper');
  const [batchSize, setBatchSize] = useState<number>(4);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem('sh_genai_asset_library', JSON.stringify(gallery));
    } catch (e) {
      console.error(e);
    }
  }, [gallery]);

  const handleGenerateBatch = () => {
    if (!promptInput.trim()) return;
    setIsGenerating(true);
    setGenerationProgress(10);

    const interval = setInterval(() => {
      setGenerationProgress((prev) => {
        if (prev >= 90) {
          clearInterval(interval);
          return 90;
        }
        return prev + 20;
      });
    }, 400);

    setTimeout(() => {
      clearInterval(interval);
      setGenerationProgress(100);

      // Create new generated batch items
      const newItems: GenAIAssetItem[] = Array.from({ length: batchSize }).map((_, idx) => ({
        id: `gen-${Date.now()}-${idx}`,
        title: `${promptInput} #${idx + 1}`,
        category: batchCategory,
        promptUsed: promptInput,
        previewUrl: batchCategory === 'Wallpaper' 
          ? `https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&w=800&q=80`
          : batchCategory === 'Watch Face'
          ? `https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80`
          : undefined,
        fileFormat: batchCategory === 'Wallpaper' 
          ? 'PNG (3840x2160)' 
          : batchCategory === 'Watch Face' 
          ? 'WearOS / WatchFace Studio' 
          : batchCategory === 'Ringtone' 
          ? 'MP3 / M4R' 
          : 'JSON Blueprint',
        fileSize: batchCategory === 'Automation Blueprint' ? '38 KB' : '3.8 MB',
        suggestedPrice: batchCategory === 'Ringtone' ? '£0.01 (1p)' : batchCategory === 'Wallpaper' ? '£0.10 (10p)' : '£0.49 (49p)',
        createdAt: 'Just now',
        downloadsCount: 0,
        tags: [batchCategory, 'AI Generated', '1p Micro-Asset', 'Batch Export']
      }));

      setGallery((prev) => [...newItems, ...prev]);
      setIsGenerating(false);
      setGenerationProgress(0);
    }, 2200);
  };

  const handleDeleteItem = (id: string) => {
    setGallery((prev) => prev.filter((item) => item.id !== id));
  };

  const handleCopyLink = (item: GenAIAssetItem) => {
    const link = `https://gumroad.com/l/${item.id}`;
    navigator.clipboard.writeText(link);
    setCopiedId(item.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredItems = gallery.filter((item) => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const q = searchQuery.toLowerCase();
    const matchesSearch = item.title.toLowerCase().includes(q) || item.promptUsed.toLowerCase().includes(q) || item.tags.some(t => t.toLowerCase().includes(q));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-5xl shadow-2xl overflow-hidden my-auto flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 bg-gradient-to-r from-purple-950/60 via-slate-900 to-indigo-950/60 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-500 to-indigo-400 p-0.5 shadow-lg shadow-purple-500/20">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center text-purple-400">
                <Sparkles className="w-5 h-5" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                  GenAI Batch Asset Library & Studio
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 text-[10px] font-mono font-bold">
                  {gallery.length} Assets Stored
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Generate high-converting 1p - 10p wallpapers, watch faces, ringtones & JSON blueprinted assets in batches.
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

        {/* Batch Generator Studio Box */}
        <div className="p-4 bg-slate-950/90 border-b border-slate-800 space-y-3">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-purple-300 font-bold flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-amber-300 fill-amber-300" />
              Batch Generation Controls
            </span>
            <span className="text-slate-400">
              Output: True 0.5s - 2s Instant Export
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
            {/* Prompt Input */}
            <div className="md:col-span-6">
              <input
                type="text"
                value={promptInput}
                onChange={(e) => setPromptInput(e.target.value)}
                placeholder="e.g. Minimalist Cyberpunk Neon OLED Watch Face with Heart Rate Ring..."
                className="w-full px-3.5 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-100 focus:outline-none focus:ring-1 focus:ring-purple-500 font-mono"
              />
            </div>

            {/* Category Switch */}
            <div className="md:col-span-3">
              <select
                value={batchCategory}
                onChange={(e) => setBatchCategory(e.target.value as any)}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-purple-500 font-mono"
              >
                <option value="Wallpaper">4K OLED Wallpaper</option>
                <option value="Watch Face">WearOS / Apple Watch Face</option>
                <option value="Ringtone">Audio Ringtone / Chime</option>
                <option value="Automation Blueprint">n8n / ComfyUI JSON</option>
              </select>
            </div>

            {/* Batch Size & Action Button */}
            <div className="md:col-span-3 flex items-center gap-2">
              <select
                value={batchSize}
                onChange={(e) => setBatchSize(Number(e.target.value))}
                className="px-2.5 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-200 focus:outline-none font-mono"
              >
                <option value={4}>4x Batch</option>
                <option value={8}>8x Batch</option>
                <option value={12}>12x Batch</option>
              </select>

              <button
                onClick={handleGenerateBatch}
                disabled={isGenerating || !promptInput.trim()}
                className="flex-1 py-2 px-3 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-emerald-600 hover:from-purple-500 hover:to-emerald-500 text-white font-mono font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-purple-600/20 transition-all disabled:opacity-50"
              >
                {isGenerating ? (
                  <RefreshCw className="w-3.5 h-3.5 animate-spin text-amber-300" />
                ) : (
                  <Sparkles className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
                )}
                <span>{isGenerating ? `${generationProgress}% Generating...` : 'Generate Batch'}</span>
              </button>
            </div>
          </div>

          {/* Progress Bar during generation */}
          {isGenerating && (
            <div className="w-full bg-slate-900 rounded-full h-1.5 overflow-hidden border border-slate-800">
              <div 
                className="h-full bg-gradient-to-r from-purple-500 via-indigo-500 to-emerald-400 transition-all duration-300"
                style={{ width: `${generationProgress}%` }}
              />
            </div>
          )}
        </div>

        {/* Gallery Filtering Controls */}
        <div className="p-3 bg-slate-900 border-b border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search library prompts or tags..."
              className="w-full pl-9 pr-3 py-1.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-purple-500 font-mono"
            />
          </div>

          <div className="flex flex-wrap items-center gap-1.5 text-xs w-full sm:w-auto">
            {['All', 'Wallpaper', 'Watch Face', 'Ringtone', 'Automation Blueprint'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-xl text-[11px] font-mono font-bold transition-all ${
                  selectedCategory === cat
                    ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
                    : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Items Grid */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4 flex-1">
          {filteredItems.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-slate-950 border border-slate-800 hover:border-purple-500/40 rounded-2xl overflow-hidden transition-all flex flex-col justify-between group shadow-lg"
                >
                  {/* Media Visual Preview */}
                  <div className="relative h-36 bg-slate-900 overflow-hidden flex items-center justify-center">
                    {item.previewUrl ? (
                      <img
                        src={item.previewUrl}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                    ) : item.category === 'Ringtone' ? (
                      <div className="flex flex-col items-center justify-center p-4 text-center space-y-2">
                        <div className="w-12 h-12 rounded-full bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400 animate-pulse">
                          <Music className="w-6 h-6" />
                        </div>
                        <span className="text-[10px] font-mono text-indigo-300">🎵 Audio Chime 24-bit 48kHz</span>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center p-4 text-center space-y-2">
                        <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                          <Workflow className="w-6 h-6" />
                        </div>
                        <span className="text-[10px] font-mono text-emerald-300">⚡ JSON Pipeline Blueprint</span>
                      </div>
                    )}

                    <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-slate-950/80 backdrop-blur-md text-purple-300 border border-purple-500/30 text-[9px] font-mono font-bold">
                      {item.category}
                    </span>

                    <span className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-emerald-500/20 backdrop-blur-md text-emerald-300 border border-emerald-500/30 text-[9px] font-mono font-bold">
                      {item.suggestedPrice}
                    </span>
                  </div>

                  {/* Asset Info */}
                  <div className="p-3.5 space-y-2 flex-1 flex flex-col justify-between">
                    <div className="space-y-1">
                      <h4 className="text-xs font-bold text-white leading-snug line-clamp-1">
                        {item.title}
                      </h4>
                      <p className="text-[10px] text-slate-400 font-mono line-clamp-2 italic">
                        "{item.promptUsed}"
                      </p>
                    </div>

                    <div className="space-y-2 pt-2 border-t border-slate-800/80">
                      <div className="flex items-center justify-between text-[10px] font-mono text-slate-500">
                        <span>Format: <strong className="text-slate-300">{item.fileFormat}</strong></span>
                        <span>Downloads: <strong className="text-amber-400">{item.downloadsCount}</strong></span>
                      </div>

                      {/* Tag badges */}
                      <div className="flex flex-wrap gap-1">
                        {item.tags.map((tag) => (
                          <span key={tag} className="px-1.5 py-0.5 bg-slate-900 text-slate-400 rounded text-[8px] font-mono border border-slate-800">
                            #{tag}
                          </span>
                        ))}
                      </div>

                      {/* Card Action Buttons */}
                      <div className="pt-2 flex items-center justify-between gap-1.5">
                        <button
                          onClick={() => handleCopyLink(item)}
                          className="px-2.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 text-[10px] font-mono font-bold border border-slate-800 flex items-center gap-1 transition-all"
                          title="Copy 1p Gumroad Direct Buy Link"
                        >
                          {copiedId === item.id ? (
                            <>
                              <Check className="w-3 h-3 text-emerald-400" />
                              <span className="text-emerald-400">Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3 text-amber-400" />
                              <span>1p Link</span>
                            </>
                          )}
                        </button>

                        <button
                          onClick={() => handleDeleteItem(item.id)}
                          className="p-1.5 rounded-xl bg-slate-900 hover:bg-rose-950/80 text-slate-500 hover:text-rose-400 border border-slate-800 transition-all"
                          title="Delete from local gallery"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-16 text-center space-y-3">
              <Sparkles className="w-8 h-8 text-slate-600 mx-auto" />
              <p className="text-xs text-slate-400 font-mono">No assets found in gallery matching filter. Click 'Generate Batch' above to create new ones!</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0 text-xs font-mono">
          <div className="flex items-center gap-2 text-slate-400">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Local gallery auto-persists in browser storage. Ready for 1-click 1p post distribution.</span>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            {onOpenRecipes && (
              <button
                onClick={onOpenRecipes}
                className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-teal-300 border border-teal-500/30 font-bold transition-all"
              >
                Recipes
              </button>
            )}

            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold transition-all w-full sm:w-auto"
            >
              Close Studio
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
