import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SIDE_HUSTLES } from './data/hustles';
import { SideHustle, CategoryType } from './types';
import { Navbar } from './components/Navbar';
import { HustleCard } from './components/HustleCard';
import { HustleDetailModal } from './components/HustleDetailModal';
import { CustomIdeaValidator } from './components/CustomIdeaValidator';
import { FinancialCalculator } from './components/FinancialCalculator';
import { AssetGeneratorModal } from './components/AssetGeneratorModal';
import { RevenueTracker } from './components/RevenueTracker';
import { PayoutDestinationModal } from './components/PayoutDestinationModal';
import { FoolproofAutoLauncherModal } from './components/FoolproofAutoLauncherModal';
import { ExecutionLog } from './components/ExecutionLog';
import { SavedHustleHealthCard } from './components/SavedHustleHealthCard';
import { LocalLlmMcpHubModal } from './components/LocalLlmMcpHubModal';
import { AutomationTourModal } from './components/AutomationTourModal';
import { Day1SaleChallengeModal } from './components/Day1SaleChallengeModal';
import { 
  Sparkles, 
  Bot, 
  TrendingUp, 
  Zap, 
  Bookmark, 
  X, 
  Trash2, 
  ArrowRight,
  ShieldCheck,
  Search,
  DollarSign,
  Clock,
  ChevronRight,
  Activity
} from 'lucide-react';

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Saved Hustles in localStorage
  const [savedHustleIds, setSavedHustleIds] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('sh_saved_ids');
      return stored ? JSON.parse(stored) : ['ai-outreach-agency', 'niche-micro-saas'];
    } catch (e) {
      return ['ai-outreach-agency', 'niche-micro-saas'];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('sh_saved_ids', JSON.stringify(savedHustleIds));
    } catch (e) {
      console.error('Failed to save to localStorage', e);
    }
  }, [savedHustleIds]);

  // Modal States
  const [selectedHustle, setSelectedHustle] = useState<SideHustle | null>(null);
  const [isSavedDrawerOpen, setIsSavedDrawerOpen] = useState<boolean>(false);
  const [isValidatorOpen, setIsValidatorOpen] = useState<boolean>(false);
  const [isCalculatorOpen, setIsCalculatorOpen] = useState<boolean>(false);
  const [isAssetGenOpen, setIsAssetGenOpen] = useState<boolean>(false);
  const [isPayoutModalOpen, setIsPayoutModalOpen] = useState<boolean>(false);
  const [isFoolproofWizardOpen, setIsFoolproofWizardOpen] = useState<boolean>(false);
  const [isLocalLlmHubOpen, setIsLocalLlmHubOpen] = useState<boolean>(false);
  const [isAutomationTourOpen, setIsAutomationTourOpen] = useState<boolean>(false);
  const [is24hChallengeOpen, setIs24hChallengeOpen] = useState<boolean>(false);
  const [hasSeenTour, setHasSeenTour] = useState<boolean>(() => {
    return localStorage.getItem('sh_has_seen_tour') === 'true';
  });
  const [drawerTab, setDrawerTab] = useState<'tracker' | 'items' | 'execution'>('tracker');

  const toggleSaveHustle = (id: string) => {
    setSavedHustleIds((prev) => {
      const isSavingNew = !prev.includes(id);
      if (isSavingNew && !hasSeenTour) {
        setIsAutomationTourOpen(true);
        setHasSeenTour(true);
        try {
          localStorage.setItem('sh_has_seen_tour', 'true');
        } catch (e) {
          console.error(e);
        }
      }
      return isSavingNew ? [...prev, id] : prev.filter((item) => item !== id);
    });
  };

  // Filtered Hustles
  const filteredHustles = SIDE_HUSTLES.filter((hustle) => {
    const matchesCategory = selectedCategory === 'All' || hustle.category === selectedCategory;
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      !q ||
      hustle.title.toLowerCase().includes(q) ||
      hustle.tagline.toLowerCase().includes(q) ||
      hustle.category.toLowerCase().includes(q) ||
      hustle.recommendedTools.some((t) => t.toLowerCase().includes(q));

    return matchesCategory && matchesSearch;
  });

  const savedHustles = SIDE_HUSTLES.filter((h) => savedHustleIds.includes(h.id));

  // Portfolio Totals
  const totalMonthlyPotential = savedHustles.reduce((acc, h) => acc + h.monthlyRevenuePotential, 0);
  const avgAutomationScore = savedHustles.length > 0
    ? Math.round(savedHustles.reduce((acc, h) => acc + h.automationScore, 0) / savedHustles.length)
    : 0;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      
      {/* Top Navbar */}
      <Navbar
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        savedCount={savedHustleIds.length}
        onOpenSaved={() => setIsSavedDrawerOpen(true)}
        onOpenValidator={() => setIsValidatorOpen(true)}
        onOpenCalculator={() => setIsCalculatorOpen(true)}
        onOpenAssetGen={() => setIsAssetGenOpen(true)}
        onOpenPayoutModal={() => setIsPayoutModalOpen(true)}
        onOpenFoolproofWizard={() => setIsFoolproofWizardOpen(true)}
        onOpenLocalLlmHub={() => setIsLocalLlmHubOpen(true)}
        onOpenAutomationTour={() => setIsAutomationTourOpen(true)}
        onOpen24hChallenge={() => setIs24hChallengeOpen(true)}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Compact Hero Banner */}
        <div className="relative rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-slate-800 p-6 sm:p-8 overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="max-w-2xl space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>AI-Powered Micro-Business Studio</span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
                Turn Curated Side Hustles into <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-300 to-amber-300">Automated Cashflow Engines</span>
              </h2>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Discover high-margin side hustle concepts upgraded with 80%+ automated workflows, interactive unit economics calculators, and 1-click Gemini AI launch execution kits.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => setIs24hChallengeOpen(true)}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 via-amber-500 to-emerald-500 hover:from-rose-500 hover:to-emerald-400 text-slate-950 font-extrabold text-xs shadow-lg shadow-rose-500/20 flex items-center gap-2 transition-all border border-amber-300/40 animate-pulse"
                >
                  <Sparkles className="w-4 h-4 text-slate-950 fill-slate-950" />
                  <span>🔥 24-Hour 1p Micro-Sale Challenge</span>
                </button>

                <button
                  onClick={() => setIsFoolproofWizardOpen(true)}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-600 hover:from-emerald-500 hover:to-indigo-500 text-white font-bold text-xs shadow-lg shadow-emerald-600/30 flex items-center gap-2 transition-all border border-emerald-400/30"
                >
                  <Zap className="w-4 h-4 text-amber-300" />
                  <span>⚡ 1-Click Foolproof Auto-Launcher</span>
                </button>

                <button
                  onClick={() => setIsValidatorOpen(true)}
                  className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-medium text-xs shadow-lg shadow-indigo-600/25 flex items-center gap-2 transition-all"
                >
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>Test Custom Idea with AI</span>
                </button>

                <button
                  onClick={() => setIsCalculatorOpen(true)}
                  className="px-4 py-2.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-200 font-medium text-xs border border-slate-700 flex items-center gap-2 transition-all"
                >
                  <TrendingUp className="w-4 h-4 text-emerald-400" />
                  <span>Compare Profit Matrix</span>
                </button>
              </div>
            </div>

            {/* Quick Stats Panel */}
            <div className="grid grid-cols-2 gap-3 bg-slate-950/80 border border-slate-800 p-4 rounded-2xl shrink-0 w-full lg:w-72">
              <div>
                <span className="text-[10px] font-mono text-slate-500 uppercase block">Curated Concepts</span>
                <span className="text-2xl font-bold text-white">{SIDE_HUSTLES.length}</span>
                <span className="text-[11px] text-slate-400 block mt-0.5">High-Margin Models</span>
              </div>

              <div>
                <span className="text-[10px] font-mono text-slate-500 uppercase block">Avg. Automation</span>
                <span className="text-2xl font-bold text-amber-400 flex items-center gap-1">
                  <Bot className="w-4 h-4" />
                  91%
                </span>
                <span className="text-[11px] text-slate-400 block mt-0.5">Hands-off Ops</span>
              </div>

              <div>
                <span className="text-[10px] font-mono text-slate-500 uppercase block">Avg. Net Margin</span>
                <span className="text-2xl font-bold text-emerald-400">89%</span>
                <span className="text-[11px] text-slate-400 block mt-0.5">Low Overhead</span>
              </div>

              <div>
                <span className="text-[10px] font-mono text-slate-500 uppercase block">Weekly Time</span>
                <span className="text-2xl font-bold text-indigo-300">3-5 hrs</span>
                <span className="text-[11px] text-slate-400 block mt-0.5">Flexible Execution</span>
              </div>
            </div>
          </div>
        </div>

        {/* Search Results Summary */}
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-200 flex items-center gap-2">
            <span>Exploratory Blueprints ({filteredHustles.length})</span>
            {selectedCategory !== 'All' && (
              <span className="text-xs font-normal text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded-full border border-indigo-500/20">
                Category: {selectedCategory}
              </span>
            )}
          </h3>

          {(searchQuery || selectedCategory !== 'All') && (
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
              }}
              className="text-xs text-indigo-400 hover:text-indigo-300"
            >
              Reset Filters
            </button>
          )}
        </div>

        {/* Cards Grid */}
        {filteredHustles.length > 0 ? (
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredHustles.map((hustle, index) => (
                <motion.div
                  key={hustle.id}
                  layout
                  initial={{ opacity: 0, y: 20, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ 
                    duration: 0.35, 
                    delay: Math.min(index * 0.05, 0.3),
                    ease: [0.21, 0.47, 0.32, 0.98] 
                  }}
                  whileHover={{ y: -4 }}
                  className="h-full"
                >
                  <HustleCard
                    hustle={hustle}
                    isSaved={savedHustleIds.includes(hustle.id)}
                    onToggleSave={toggleSaveHustle}
                    onSelectHustle={(h) => setSelectedHustle(h)}
                    onOpenModeler={(h) => {
                      setSelectedHustle(h);
                    }}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <div className="py-16 text-center bg-slate-900/50 border border-slate-800 rounded-2xl space-y-3">
            <Search className="w-10 h-10 text-slate-600 mx-auto" />
            <h4 className="text-base font-bold text-white">No side hustles matched your query</h4>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              Try searching for "AI", "Micro-SaaS", "Local", "E-Commerce", or reset filters.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
              }}
              className="px-4 py-2 rounded-xl bg-indigo-600 text-white font-medium text-xs"
            >
              Show All Hustles
            </button>
          </div>
        )}

      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-8 mt-12 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-amber-400" />
            <span className="font-bold text-slate-300">SideHustleForge Pro</span>
            <span>— Powered by Gemini 3.6 Flash & Automated Blueprints</span>
          </div>
          <p className="text-slate-600">Built for high-yield solopreneurs and automation developers.</p>
        </div>
      </footer>

      {/* SAVED PORTFOLIO DRAWER */}
      {isSavedDrawerOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex justify-end">
          <div className="bg-slate-900 border-l border-slate-800 w-full max-w-md h-full flex flex-col shadow-2xl p-6 overflow-y-auto">
            
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-2">
                <Bookmark className="w-5 h-5 text-amber-400 fill-amber-400" />
                <h3 className="text-base font-bold text-white">My Hustle Portfolio ({savedHustles.length})</h3>
              </div>
              <button
                onClick={() => setIsSavedDrawerOpen(false)}
                className="p-1 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Sub-Tabs: Revenue Tracker vs Saved Items vs Execution Log */}
            <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 my-4 text-xs">
              <button
                onClick={() => setDrawerTab('tracker')}
                className={`flex-1 py-1.5 px-2 rounded-lg font-semibold flex items-center justify-center gap-1 transition-all ${
                  drawerTab === 'tracker'
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Activity className="w-3.5 h-3.5" />
                <span>Tracker</span>
              </button>

              <button
                onClick={() => setDrawerTab('items')}
                className={`flex-1 py-1.5 px-2 rounded-lg font-semibold flex items-center justify-center gap-1 transition-all ${
                  drawerTab === 'items'
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Bookmark className="w-3.5 h-3.5" />
                <span>Health ({savedHustles.length})</span>
              </button>

              <button
                onClick={() => setDrawerTab('execution')}
                className={`flex-1 py-1.5 px-2 rounded-lg font-semibold flex items-center justify-center gap-1 transition-all ${
                  drawerTab === 'execution'
                    ? 'bg-purple-600 text-white shadow-md shadow-purple-600/20'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Bot className="w-3.5 h-3.5 text-amber-300" />
                <span>AI Logs</span>
              </button>
            </div>

            {/* Portfolio Summary / Content */}
            {savedHustles.length > 0 ? (
              <div className="space-y-6 flex-1 flex flex-col justify-between">
                <div>
                  {drawerTab === 'tracker' ? (
                    <RevenueTracker 
                      savedHustles={savedHustles} 
                      onSelectHustle={(hustle) => {
                        setIsSavedDrawerOpen(false);
                        setSelectedHustle(hustle);
                      }} 
                    />
                  ) : drawerTab === 'execution' ? (
                    <ExecutionLog 
                      savedHustles={savedHustles}
                      onSelectHustle={(hustle) => {
                        setIsSavedDrawerOpen(false);
                        setSelectedHustle(hustle);
                      }}
                    />
                  ) : (
                    <div>
                      <div className="grid grid-cols-2 gap-3 bg-slate-950 p-4 rounded-xl border border-slate-800 mb-4">
                        <div>
                          <span className="text-[10px] uppercase font-mono text-slate-500 block">Combined Potential</span>
                          <span className="text-lg font-bold text-emerald-400">${totalMonthlyPotential.toLocaleString()}/mo</span>
                        </div>

                        <div>
                          <span className="text-[10px] uppercase font-mono text-slate-500 block">Avg. Automation</span>
                          <span className="text-lg font-bold text-amber-400">{avgAutomationScore}%</span>
                        </div>
                      </div>

                      <div className="space-y-3">
                        {savedHustles.map((hustle) => (
                          <SavedHustleHealthCard
                            key={hustle.id}
                            hustle={hustle}
                            onOpenDetail={() => {
                              setIsSavedDrawerOpen(false);
                              setSelectedHustle(hustle);
                            }}
                            onRemove={() => toggleSaveHustle(hustle.id)}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t border-slate-800 space-y-2">
                  <button
                    onClick={() => {
                      setIsSavedDrawerOpen(false);
                      setIsCalculatorOpen(true);
                    }}
                    className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs flex items-center justify-center gap-2"
                  >
                    <TrendingUp className="w-4 h-4" />
                    <span>Run Portfolio ROI Comparison</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="py-16 text-center space-y-3 my-auto">
                <Bookmark className="w-8 h-8 text-slate-600 mx-auto" />
                <p className="text-xs text-slate-400">No side hustles saved yet. Click the bookmark icon on any card to build your custom portfolio.</p>
              </div>
            )}

          </div>
        </div>
      )}

      {/* DETAIL MODAL */}
      <HustleDetailModal
        hustle={selectedHustle}
        onClose={() => setSelectedHustle(null)}
        isSaved={selectedHustle ? savedHustleIds.includes(selectedHustle.id) : false}
        onToggleSave={toggleSaveHustle}
        onSelectUpgradeHustle={(id) => {
          const found = SIDE_HUSTLES.find((h) => h.id === id);
          if (found) setSelectedHustle(found);
        }}
      />

      {/* AI CUSTOM IDEA VALIDATOR MODAL */}
      <CustomIdeaValidator
        isOpen={isValidatorOpen}
        onClose={() => setIsValidatorOpen(false)}
      />

      {/* FINANCIAL CALCULATOR / ROI MATRIX MODAL */}
      <FinancialCalculator
        isOpen={isCalculatorOpen}
        onClose={() => setIsCalculatorOpen(false)}
        hustles={SIDE_HUSTLES}
        onSelectHustle={(hustle) => setSelectedHustle(hustle)}
      />

      {/* ASSET GENERATOR MODAL */}
      <AssetGeneratorModal
        isOpen={isAssetGenOpen}
        onClose={() => setIsAssetGenOpen(false)}
        hustles={SIDE_HUSTLES}
      />

      {/* BANK & PAYPAL PAYOUT DESTINATION MODAL */}
      <PayoutDestinationModal
        isOpen={isPayoutModalOpen}
        onClose={() => setIsPayoutModalOpen(false)}
      />

      {/* FOOLPROOF 1-CLICK AUTO-LAUNCHER WIZARD */}
      <FoolproofAutoLauncherModal
        isOpen={isFoolproofWizardOpen}
        onClose={() => setIsFoolproofWizardOpen(false)}
        onSelectHustle={(hustle) => setSelectedHustle(hustle)}
      />

      {/* LOCAL LLM, MCP, OBSIDIAN & GITHUB SCRAPER HUB */}
      <LocalLlmMcpHubModal
        isOpen={isLocalLlmHubOpen}
        onClose={() => setIsLocalLlmHubOpen(false)}
        savedHustleIds={savedHustleIds}
        onImportHustle={(importedHustle) => {
          if (!savedHustleIds.includes(importedHustle.id)) {
            toggleSaveHustle(importedHustle.id);
          }
          setSelectedHustle(importedHustle);
        }}
      />

      {/* GUIDED AUTOMATION SETUP TOUR */}
      <AutomationTourModal
        isOpen={isAutomationTourOpen}
        onClose={() => setIsAutomationTourOpen(false)}
        onOpenLocalLlmHub={() => {
          setIsAutomationTourOpen(false);
          setIsLocalLlmHubOpen(true);
        }}
        onOpenPayoutModal={() => {
          setIsAutomationTourOpen(false);
          setIsPayoutModalOpen(true);
        }}
        onOpenExecutionLogs={() => {
          setIsAutomationTourOpen(false);
          setIsSavedDrawerOpen(true);
          setDrawerTab('execution');
        }}
      />

      {/* 24-HOUR 1P MICRO-SALE CHALLENGE MODAL */}
      <Day1SaleChallengeModal
        isOpen={is24hChallengeOpen}
        onClose={() => setIs24hChallengeOpen(false)}
        onOpenPayoutModal={() => {
          setIs24hChallengeOpen(false);
          setIsPayoutModalOpen(true);
        }}
      />

    </div>
  );
}
