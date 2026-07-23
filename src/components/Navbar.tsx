import React from 'react';
import { CategoryType } from '../types';
import { 
  Zap, 
  Search, 
  Bookmark, 
  Calculator, 
  Sparkles,
  Layers,
  Building2,
  ArrowRight,
  Cpu,
  Server,
  Flame,
  Workflow,
  Database,
  Wrench,
  Bell
} from 'lucide-react';

interface NavbarProps {
  selectedCategory: CategoryType;
  onSelectCategory: (category: CategoryType) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  savedCount: number;
  onOpenSaved: () => void;
  onOpenValidator: () => void;
  onOpenCalculator: () => void;
  onOpenAssetGen: () => void;
  onOpenPayoutModal: () => void;
  onOpenFoolproofWizard: () => void;
  onOpenLocalLlmHub?: () => void;
  onOpenAutomationTour?: () => void;
  onOpen24hChallenge?: () => void;
  onOpenViralScout?: () => void;
  onOpenRecipes?: () => void;
  onOpenGenAIGallery?: () => void;
  onOpenSnapshotModal?: () => void;
  onOpenAutomatedFixModal?: () => void;
  onOpenDirectLaunchpad?: () => void;
  onOpenSaleNotifications?: () => void;
  voiceControlBar?: React.ReactNode;
}

const CATEGORIES: CategoryType[] = [
  'All',
  'Free Starter Sets',
  'AI & Automation',
  'Micro-SaaS',
  'Digital Products',
  'Content & Media',
  'E-Commerce',
  'High-Ticket Agency',
  'Local Lead Gen'
];

export const Navbar: React.FC<NavbarProps> = ({
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  savedCount,
  onOpenSaved,
  onOpenValidator,
  onOpenCalculator,
  onOpenAssetGen,
  onOpenPayoutModal,
  onOpenFoolproofWizard,
  onOpenLocalLlmHub,
  onOpenAutomationTour,
  onOpen24hChallenge,
  onOpenViralScout,
  onOpenRecipes,
  onOpenGenAIGallery,
  onOpenSnapshotModal,
  onOpenAutomatedFixModal,
  onOpenDirectLaunchpad,
  onOpenSaleNotifications,
  voiceControlBar
}) => {
  return (
    <header className="sticky top-0 z-40 w-full max-w-full overflow-x-hidden bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/80 text-white">
      {/* Top Glass Announcement Banner */}
      <div 
        onClick={onOpen24hChallenge || onOpenFoolproofWizard}
        className="bg-slate-900/60 backdrop-blur-md px-4 py-1.5 text-xs text-center border-b border-slate-800 text-slate-300 flex items-center justify-center gap-2 cursor-pointer hover:bg-slate-900/80 transition-all font-mono"
      >
        <Zap className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
        <span>
          <strong>24-Hour 1p Sale Challenge:</strong> Deploy Wallpapers, WearOS Watch Faces, Ringtones & Notion Vaults for Day 1 sales!
        </span>
        <ArrowRight className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
      </div>

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
          
          {/* Logo & Brand */}
          <div className="flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => onSelectCategory('All')}>
              <div className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-700/60 p-0.5 shadow-md flex items-center justify-center">
                <Zap className="w-4 h-4 text-emerald-400 fill-emerald-400" />
              </div>
              <div>
                <h1 className="text-base font-bold tracking-tight text-white flex items-center gap-1.5">
                  SideHustle<span className="text-emerald-400">Forge</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-900 text-emerald-300 border border-slate-700/60">
                    Glass Pro
                  </span>
                </h1>
              </div>
            </div>

            {/* Mobile Actions */}
            <div className="flex items-center gap-2 lg:hidden">
              {onOpenDirectLaunchpad && (
                <button
                  onClick={onOpenDirectLaunchpad}
                  className="px-2.5 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-bold"
                >
                  💰 Direct £
                </button>
              )}
              <button
                onClick={onOpenSaved}
                className="relative p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300"
              >
                <Bookmark className="w-4 h-4" />
                {savedCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 text-slate-950 text-[10px] font-bold rounded-full flex items-center justify-center">
                    {savedCount}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search side hustles (AI, SaaS, Notion)..."
              className="w-full bg-slate-900/90 border border-slate-800 rounded-xl pl-9 pr-4 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500/50 transition-all"
            />
          </div>

          {/* Clean Dark Mode Glass Action Toolbar */}
          <div className="hidden lg:flex items-center gap-2 overflow-x-auto scrollbar-none py-1">
            
            {onOpenDirectLaunchpad && (
              <button
                onClick={onOpenDirectLaunchpad}
                className="px-3 py-1.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-bold text-xs flex items-center gap-1.5 transition-all shadow-sm shadow-emerald-500/10 shrink-0"
                title="Direct Action & Monetization Launchpad"
              >
                <Building2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>💰 Direct £ Launchpad</span>
              </button>
            )}

            {onOpenSaleNotifications && (
              <button
                onClick={onOpenSaleNotifications}
                className="px-3 py-1.5 rounded-xl bg-slate-900/80 hover:bg-slate-800/90 border border-slate-700/60 text-slate-200 font-medium text-xs flex items-center gap-1.5 transition-all shrink-0"
                title="Live Payout & Sales Feed"
              >
                <Bell className="w-3.5 h-3.5 text-emerald-400" />
                <span>🔔 Sales Feed</span>
              </button>
            )}

            <button
              onClick={onOpenFoolproofWizard}
              className="px-3 py-1.5 rounded-xl bg-slate-900/80 hover:bg-slate-800/90 border border-slate-700/60 text-slate-200 font-medium text-xs flex items-center gap-1.5 transition-all shrink-0"
              title="1-Click Launch Wizard"
            >
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <span>⚡ 1-Click Launch</span>
            </button>

            {onOpenRecipes && (
              <button
                onClick={onOpenRecipes}
                className="px-3 py-1.5 rounded-xl bg-slate-900/80 hover:bg-slate-800/90 border border-slate-700/60 text-slate-200 font-medium text-xs flex items-center gap-1.5 transition-all shrink-0"
                title="Automation Recipe Marketplace"
              >
                <Workflow className="w-3.5 h-3.5 text-teal-400" />
                <span>Recipes</span>
              </button>
            )}

            {onOpenGenAIGallery && (
              <button
                onClick={onOpenGenAIGallery}
                className="px-3 py-1.5 rounded-xl bg-slate-900/80 hover:bg-slate-800/90 border border-slate-700/60 text-slate-200 font-medium text-xs flex items-center gap-1.5 transition-all shrink-0"
                title="GenAI Studio"
              >
                <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                <span>GenAI Studio</span>
              </button>
            )}

            {onOpenAutomatedFixModal && (
              <button
                onClick={onOpenAutomatedFixModal}
                className="px-3 py-1.5 rounded-xl bg-slate-900/80 hover:bg-slate-800/90 border border-slate-700/60 text-slate-200 font-medium text-xs flex items-center gap-1.5 transition-all shrink-0"
                title="Auto-Fix Diagnostics"
              >
                <Wrench className="w-3.5 h-3.5 text-amber-400" />
                <span>Auto-Fix</span>
              </button>
            )}

          </div>

        </div>

        {/* Category Pills Bar */}
        <div className="mt-2.5 pt-2 border-t border-slate-800/60 flex items-center gap-1.5 overflow-x-auto scrollbar-none">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => onSelectCategory(cat)}
              className={`px-3 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-slate-800 border border-emerald-500/40 text-emerald-300'
                  : 'bg-slate-900/40 border border-slate-800/60 text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

      </div>
    </header>
  );
};
