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
  ArrowRight
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
  onOpenFoolproofWizard
}) => {
  return (
    <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 text-white">
      {/* Top Banner */}
      <div 
        onClick={onOpenFoolproofWizard}
        className="bg-gradient-to-r from-emerald-950 via-indigo-950 to-purple-950 px-4 py-1.5 text-xs text-center border-b border-emerald-500/30 text-emerald-200 flex items-center justify-center gap-2 cursor-pointer hover:opacity-90 transition-all font-mono"
      >
        <Zap className="w-3.5 h-3.5 text-amber-300 animate-pulse shrink-0" />
        <span>
          <strong>Zero Code & No Settings Required:</strong> Click here to launch a 1-click foolproof side hustle with auto-injected Bank/PayPal payout!
        </span>
        <ArrowRight className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          
          {/* Logo & Brand */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => onSelectCategory('All')}>
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-amber-500 p-0.5 shadow-lg shadow-indigo-500/20">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                  <Zap className="w-5 h-5 text-amber-400 fill-amber-400" />
                </div>
              </div>
              <div>
                <h1 className="text-xl font-bold tracking-tight text-white flex items-center gap-1.5">
                  SideHustle<span className="text-indigo-400">Forge</span>
                  <span className="text-[10px] uppercase font-mono tracking-widest px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/30">
                    Pro 2.0
                  </span>
                </h1>
                <p className="text-xs text-slate-400 hidden sm:block">
                  Automated, high-margin micro-business blueprints & AI tools
                </p>
              </div>
            </div>

            {/* Mobile Actions */}
            <div className="flex items-center gap-2 md:hidden">
              <button
                onClick={onOpenValidator}
                className="p-2 rounded-lg bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 hover:bg-indigo-600/50"
                title="Validate Custom Idea"
              >
                <Sparkles className="w-4 h-4" />
              </button>
              <button
                onClick={onOpenSaved}
                className="relative p-2 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700"
              >
                <Bookmark className="w-4 h-4" />
                {savedCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-amber-500 text-slate-950 text-[10px] font-bold rounded-full flex items-center justify-center">
                    {savedCount}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Search & Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3 flex-1 max-w-2xl">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search side hustles (e.g. AI agency, SaaS, Notion, YouTube)..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all"
              />
            </div>

            {/* Desktop Action Buttons */}
            <div className="hidden md:flex items-center gap-2">
              <button
                onClick={onOpenFoolproofWizard}
                className="px-3 py-2 rounded-xl bg-gradient-to-r from-amber-500 via-emerald-600 to-teal-600 hover:from-amber-400 hover:to-teal-500 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-all shadow-md shadow-emerald-500/20 animate-pulse"
                title="Foolproof 1-Click Zero-Code Side Hustle Wizard"
              >
                <Zap className="w-3.5 h-3.5 text-slate-950 fill-slate-950" />
                <span>⚡ 1-Click Launch Wizard</span>
              </button>

              <button
                onClick={onOpenPayoutModal}
                className="px-3 py-2 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 font-medium text-xs border border-emerald-500/30 flex items-center gap-1.5 transition-all shadow-sm shadow-emerald-500/10"
                title="Configure Bank & PayPal Payout Destination"
              >
                <Building2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Payout Bank / PayPal</span>
              </button>

              <button
                onClick={onOpenValidator}
                className="px-3 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium text-xs flex items-center gap-1.5 shadow-md shadow-indigo-500/20 hover:from-indigo-500 hover:to-purple-500 transition-all"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>AI Idea Validator</span>
              </button>

              <button
                onClick={onOpenCalculator}
                className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium text-xs border border-slate-700 flex items-center gap-1.5 transition-all"
              >
                <Calculator className="w-3.5 h-3.5 text-indigo-400" />
                <span>ROI Matrix</span>
              </button>

              <button
                onClick={onOpenAssetGen}
                className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium text-xs border border-slate-700 flex items-center gap-1.5 transition-all"
              >
                <Layers className="w-3.5 h-3.5 text-amber-400" />
                <span>AI Copy Writer</span>
              </button>

              <button
                onClick={onOpenSaved}
                className="relative px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium text-xs border border-slate-700 flex items-center gap-1.5 transition-all"
              >
                <Bookmark className="w-3.5 h-3.5 text-amber-400" />
                <span>Saved</span>
                {savedCount > 0 && (
                  <span className="px-1.5 py-0.2 bg-amber-500 text-slate-950 text-[10px] font-bold rounded-full">
                    {savedCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pt-3 pb-1 scrollbar-none">
          {CATEGORIES.map((category) => {
            const isSelected = selectedCategory === category;
            const isFreeStarter = category === 'Free Starter Sets';

            return (
              <button
                key={category}
                onClick={() => onSelectCategory(category)}
                className={`whitespace-nowrap px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  isFreeStarter
                    ? isSelected
                      ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md shadow-emerald-500/30 font-bold'
                      : 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-500/20'
                    : isSelected
                    ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-500/30'
                    : 'bg-slate-950/60 text-slate-400 border border-slate-800 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                {isFreeStarter ? '🎁 Free Starter Sets ($0)' : category}
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
