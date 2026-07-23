import React, { useState } from 'react';
import { SideHustle, ExecutionKit, UnitEconomics } from '../types';
import { GrowthRoadmap } from './GrowthRoadmap';
import { WorkflowBlueprintLibrary } from './WorkflowBlueprintLibrary';
import { CompetitiveEdgeSection } from './CompetitiveEdgeSection';
import { RecommendedToolingStack } from './RecommendedToolingStack';
import { FreeStarterKitTester } from './FreeStarterKitTester';
import { RealityCheckService } from '../services/realityCheckService';
import { 
  X, 
  Sparkles, 
  Bot, 
  CheckCircle2, 
  TrendingUp, 
  Zap, 
  Copy, 
  Check, 
  ArrowRight, 
  DollarSign, 
  Layers, 
  Calendar, 
  ShieldAlert,
  ShieldCheck,
  AlertTriangle,
  Gauge,
  Info,
  Loader2,
  Share2,
  Wrench,
  Target,
  Globe,
  Flag,
  Activity,
  Gift
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts';

interface HustleDetailModalProps {
  hustle: SideHustle | null;
  onClose: () => void;
  isSaved: boolean;
  onToggleSave: (id: string) => void;
  onSelectUpgradeHustle?: (hustleId: string) => void;
}

export const HustleDetailModal: React.FC<HustleDetailModalProps> = ({
  hustle,
  onClose,
  isSaved,
  onToggleSave,
  onSelectUpgradeHustle
}) => {
  if (!hustle) return null;

  const [activeTab, setActiveTab] = useState<'overview' | 'starterKit' | 'tooling' | 'roadmap' | 'workflow' | 'competitive' | 'economics' | 'kit'>(
    hustle.isFreeStarterSet ? 'starterKit' : 'overview'
  );
  
  const realityCheck = RealityCheckService.evaluateHustle(hustle);

  // Economics state with defaults from hustle
  const [economics, setEconomics] = useState<UnitEconomics>(hustle.defaultEconomics);

  // AI Kit State
  const [executionKit, setExecutionKit] = useState<ExecutionKit | null>(null);
  const [isGeneratingKit, setIsGeneratingKit] = useState<boolean>(false);
  const [kitError, setKitError] = useState<string | null>(null);
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  // Calculated economics metrics
  const grossMonthlyRevenue = economics.pricePerUnit * economics.monthlyCustomers;
  const variableCosts = economics.fulfillmentCostPerUnit * economics.monthlyCustomers;
  const netMonthlyProfit = grossMonthlyRevenue - (economics.monthlyOperatingCost + variableCosts);
  const netMargin = grossMonthlyRevenue > 0 ? Math.round((netMonthlyProfit / grossMonthlyRevenue) * 100) : 0;
  const annualProfit = netMonthlyProfit * 12;

  const chartData = [
    {
      name: 'Monthly Breakdown',
      'Gross Revenue': Math.max(0, grossMonthlyRevenue),
      'Net Profit': Math.max(0, netMonthlyProfit),
      'Operating Costs': economics.monthlyOperatingCost + variableCosts
    }
  ];

  const handleCopyText = (text: string, sectionKey: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(sectionKey);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  const handleGenerateKit = async () => {
    setIsGeneratingKit(true);
    setKitError(null);
    try {
      const response = await fetch('/api/generate-hustle-kit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: hustle.title,
          category: hustle.category,
          description: hustle.description,
          targetAudience: hustle.sampleAudience,
          pricingModel: `$${economics.pricePerUnit} / unit`
        })
      });

      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to generate kit');
      }

      setExecutionKit(data.kit);
    } catch (err: any) {
      console.error('Error generating kit:', err);
      setKitError(err.message || 'An error occurred while generating the kit.');
    } finally {
      setIsGeneratingKit(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-5xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden my-auto">
        
        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex items-start justify-between gap-4 bg-slate-950/80">
          <div>
            <div className="flex items-center gap-2 mb-1.5 flex-wrap">
              <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 text-xs font-medium">
                {hustle.category}
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/20 text-xs font-medium flex items-center gap-1">
                <Bot className="w-3 h-3" />
                {hustle.automationScore}% Automated
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 text-xs font-medium">
                {hustle.marginPercentage}% Target Margin
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              {hustle.title}
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              {hustle.tagline}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onToggleSave(hustle.id)}
              className={`px-3 py-1.5 rounded-xl border text-xs font-medium flex items-center gap-1.5 transition-all ${
                isSaved
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                  : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
              }`}
            >
              <Check className="w-3.5 h-3.5" />
              <span>{isSaved ? 'Saved' : 'Save'}</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center border-b border-slate-800 px-5 bg-slate-950/40 overflow-x-auto scrollbar-none">
          {hustle.isFreeStarterSet && (
            <button
              onClick={() => setActiveTab('starterKit')}
              className={`py-3 px-3.5 text-xs font-medium border-b-2 transition-all whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === 'starterKit'
                  ? 'border-emerald-500 text-emerald-300 font-bold bg-emerald-500/10'
                  : 'border-transparent text-emerald-400 hover:text-emerald-300'
              }`}
            >
              <Gift className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
              <span>🎁 Free $0 Starter Kit Engine</span>
            </button>
          )}

          <button
            onClick={() => setActiveTab('overview')}
            className={`py-3 px-3.5 text-xs font-medium border-b-2 transition-all whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'overview'
                ? 'border-indigo-500 text-indigo-300 font-bold'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Overview & Upgrade</span>
          </button>

          <button
            onClick={() => setActiveTab('tooling')}
            className={`py-3 px-3.5 text-xs font-medium border-b-2 transition-all whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'tooling'
                ? 'border-indigo-500 text-amber-300 font-bold'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Wrench className="w-3.5 h-3.5 text-amber-400" />
            <span>AI Tooling Stack</span>
          </button>

          <button
            onClick={() => setActiveTab('roadmap')}
            className={`py-3 px-3.5 text-xs font-medium border-b-2 transition-all whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'roadmap'
                ? 'border-indigo-500 text-amber-300 font-bold'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Flag className="w-3.5 h-3.5 text-amber-400" />
            <span>Growth Roadmap (30-60-90 Day)</span>
          </button>

          <button
            onClick={() => setActiveTab('workflow')}
            className={`py-3 px-3.5 text-xs font-medium border-b-2 transition-all whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'workflow'
                ? 'border-indigo-500 text-indigo-300 font-bold'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Bot className="w-3.5 h-3.5" />
            <span>Workflow Blueprints</span>
          </button>

          <button
            onClick={() => setActiveTab('competitive')}
            className={`py-3 px-3.5 text-xs font-medium border-b-2 transition-all whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'competitive'
                ? 'border-indigo-500 text-cyan-300 font-bold'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Globe className="w-3.5 h-3.5 text-cyan-400" />
            <span>Competitive Advantage</span>
          </button>

          <button
            onClick={() => setActiveTab('economics')}
            className={`py-3 px-3.5 text-xs font-medium border-b-2 transition-all whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'economics'
                ? 'border-indigo-500 text-emerald-300 font-bold'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Unit Economics</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('kit');
              if (!executionKit && !isGeneratingKit) {
                handleGenerateKit();
              }
            }}
            className={`py-3 px-3.5 text-xs font-medium border-b-2 transition-all whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'kit'
                ? 'border-indigo-500 text-indigo-300 font-bold'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>AI Execution Kit</span>
          </button>
        </div>

        {/* Tab Content Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          
          {/* TAB: FREE STARTER KIT ENGINE */}
          {activeTab === 'starterKit' && (
            <FreeStarterKitTester hustle={hustle} onSelectUpgradeHustle={onSelectUpgradeHustle} />
          )}

          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              
              {/* Ground Truth & Same-Week Realism Banner */}
              <div className="bg-gradient-to-r from-emerald-950/80 via-slate-900 to-indigo-950/80 border border-emerald-500/30 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-lg">
                <div className="space-y-1 max-w-xl">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono text-[10px] uppercase font-bold border border-emerald-500/30">
                      Truth In Earnings
                    </span>
                    <span className="text-xs font-bold text-white">Realistic Same-Week Cashflow Projection</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {hustle.honestRealityCheck}
                  </p>
                </div>
                <div className="px-3 py-2 rounded-xl bg-slate-950 border border-emerald-500/30 text-center shrink-0 w-full sm:w-auto">
                  <span className="text-[10px] uppercase font-mono text-slate-400 block font-bold">Week 1 Ground Truth</span>
                  <span className="text-sm font-extrabold text-emerald-400 font-mono block">
                    {hustle.realisticWeek1Earnings || '£0.00 - £25.00'}
                  </span>
                </div>
              </div>

              {/* RISK SCORE & VOLATILITY ANALYZER */}
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-4 shadow-md">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-900 pb-3">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
                      <Gauge className={`w-4 h-4 ${realityCheck.riskScore.riskColor}`} />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white font-mono flex items-center gap-2">
                        <span>RiskScore & Market Volatility</span>
                        <span className={`px-2 py-0.5 rounded-full text-[10px] uppercase font-mono font-bold ${realityCheck.riskScore.riskBgClass} ${realityCheck.riskScore.riskColor} border ${realityCheck.riskScore.riskBorderClass}`}>
                          {realityCheck.riskScore.volatilityLabel}
                        </span>
                      </h4>
                      <p className="text-[11px] text-slate-400 font-mono">
                        Evaluated across saturation, setup complexity & cashflow speed
                      </p>
                    </div>
                  </div>

                  {/* Verification Badge */}
                  <div className={`px-3 py-1.5 rounded-xl border ${realityCheck.verificationBadge.badgeClass} flex items-center gap-2 font-mono text-xs font-bold shrink-0`}>
                    {realityCheck.verificationBadge.isTheoretical ? (
                      <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                    ) : (
                      <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                    )}
                    <span>{realityCheck.verificationBadge.badgeText}</span>
                  </div>
                </div>

                {/* Volatility Meter */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-[11px] font-mono">
                    <span className="text-slate-400">Volatility Score Meter</span>
                    <span className={`font-bold ${realityCheck.riskScore.riskColor}`}>
                      {realityCheck.riskScore.volatilityScore} / 10.0
                    </span>
                  </div>
                  <div className="w-full bg-slate-900 rounded-full h-2.5 overflow-hidden border border-slate-800 relative">
                    <div 
                      className={`h-full transition-all duration-700 ${
                        realityCheck.riskScore.overallRisk === 'High'
                          ? 'bg-gradient-to-r from-amber-500 to-rose-500'
                          : realityCheck.riskScore.overallRisk === 'Medium'
                          ? 'bg-gradient-to-r from-emerald-500 to-amber-500'
                          : 'bg-emerald-500'
                      }`}
                      style={{ width: `${(realityCheck.riskScore.volatilityScore / 10) * 100}%` }}
                    />
                  </div>
                  <p className="text-[10px] text-slate-400 font-mono">
                    {realityCheck.verificationBadge.truthWarning}
                  </p>
                </div>

                {/* 3 Pillars Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                  <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-800 space-y-1">
                    <span className="text-[10px] font-mono uppercase text-slate-500 block">Market Saturation</span>
                    <span className="text-xs font-bold text-white block">{realityCheck.riskScore.marketSaturation}</span>
                    <div className="w-full bg-slate-950 rounded-full h-1.5 overflow-hidden border border-slate-800 mt-1">
                      <div 
                        className={`h-full ${realityCheck.riskScore.saturationScore > 70 ? 'bg-rose-500' : realityCheck.riskScore.saturationScore > 40 ? 'bg-amber-500' : 'bg-emerald-500'}`}
                        style={{ width: `${realityCheck.riskScore.saturationScore}%` }}
                      />
                    </div>
                  </div>

                  <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-800 space-y-1">
                    <span className="text-[10px] font-mono uppercase text-slate-500 block">Cashflow Speed</span>
                    <span className="text-xs font-bold text-emerald-400 block">{realityCheck.riskScore.cashflowSpeed}</span>
                    <span className="text-[10px] text-slate-400 font-mono block">First cash in {realityCheck.riskScore.cashflowSpeedDays}</span>
                  </div>

                  <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-800 space-y-1">
                    <span className="text-[10px] font-mono uppercase text-slate-500 block">Setup Complexity</span>
                    <span className="text-xs font-bold text-indigo-300 block">{realityCheck.riskScore.setupDifficulty}</span>
                    <span className="text-[10px] text-slate-400 font-mono block">Requires ~{hustle.weeklyHoursNeeded} hrs/wk</span>
                  </div>
                </div>

                {/* Risks & Mitigation */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                  <div className="p-3 bg-rose-950/20 border border-rose-500/20 rounded-lg space-y-1.5">
                    <span className="text-[10px] font-mono uppercase font-bold text-rose-400 flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3 text-rose-400" />
                      Key Challenge & Risk Factors
                    </span>
                    <ul className="space-y-1">
                      {realityCheck.riskScore.keyRisks.map((risk, idx) => (
                        <li key={idx} className="text-[11px] text-slate-300 flex items-start gap-1.5 leading-tight">
                          <span className="text-rose-400 font-bold">•</span>
                          <span>{risk}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-3 bg-emerald-950/20 border border-emerald-500/20 rounded-lg space-y-1.5">
                    <span className="text-[10px] font-mono uppercase font-bold text-emerald-400 flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3 text-emerald-400" />
                      Recommended Mitigation Plan
                    </span>
                    <p className="text-[11px] text-slate-300 leading-relaxed font-mono">
                      {realityCheck.riskScore.mitigationPlan}
                    </p>
                  </div>
                </div>

                {/* Fail-Proof Contingency Protocols */}
                <div className="p-3.5 bg-indigo-950/30 border border-indigo-500/30 rounded-lg space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase font-bold text-indigo-300 flex items-center gap-1.5">
                      <Wrench className="w-3.5 h-3.5 text-indigo-400" />
                      Fail-Proof Execution Contingencies (Zero Hope Dashed)
                    </span>
                    <span className="text-[10px] font-mono font-bold text-emerald-400">
                      Grounded Baseline: {realityCheck.conservativeMonthlyBaseline}
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {realityCheck.failProofSteps.map((step, idx) => (
                      <div key={idx} className="bg-slate-900/90 p-2.5 rounded border border-slate-800 text-[10px] text-slate-300 leading-tight space-y-1">
                        <span className="font-bold text-indigo-400 block font-mono">Contingency #{idx + 1}</span>
                        <p>{step}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Traditional vs Automated Comparison */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4">
                  <div className="flex items-center gap-2 text-rose-400 text-xs font-semibold uppercase tracking-wider mb-2">
                    <ShieldAlert className="w-4 h-4" />
                    <span>Traditional Unscalable Model</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {hustle.traditionalModel}
                  </p>
                </div>

                <div className="bg-gradient-to-br from-indigo-950/70 to-slate-950 border border-indigo-500/30 rounded-xl p-4 shadow-lg shadow-indigo-500/5">
                  <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-2">
                    <Sparkles className="w-4 h-4" />
                    <span>10x Automated Scalable Upgrade</span>
                  </div>
                  <p className="text-xs text-indigo-100 leading-relaxed font-medium">
                    {hustle.automatedUpgrade}
                  </p>
                </div>
              </div>

              {/* Scalability Pillars */}
              <div>
                <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-indigo-400" />
                  Scalability & Profitability Pillars
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {hustle.scalabilityPillars.map((pillar, idx) => (
                    <div key={idx} className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-3 flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span className="text-xs text-slate-300 leading-relaxed">{pillar}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Hook & Target Audience */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-4">
                  <span className="text-[10px] uppercase font-mono text-slate-500 block mb-1">Target Buyer Avatar</span>
                  <p className="text-xs text-slate-200 font-medium">{hustle.sampleAudience}</p>
                </div>

                <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-4">
                  <span className="text-[10px] uppercase font-mono text-slate-500 block mb-1">High-Converting Offer Hook</span>
                  <p className="text-xs text-amber-300 italic font-medium">"{hustle.sampleHook}"</p>
                </div>
              </div>

              {/* Recommended Stack */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <Wrench className="w-4 h-4 text-indigo-400" />
                    Recommended Automation Stack
                  </h3>
                  <button
                    onClick={() => setActiveTab('tooling')}
                    className="text-xs text-amber-400 hover:text-amber-300 font-medium flex items-center gap-1 font-mono"
                  >
                    <span>View Setup Prompts & Prompts</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="flex flex-wrap gap-2">
                  {hustle.recommendedTools.map((tool) => (
                    <button 
                      key={tool} 
                      onClick={() => setActiveTab('tooling')}
                      className="px-3 py-1 rounded-lg bg-slate-950 hover:bg-slate-900 text-indigo-200 border border-indigo-500/20 hover:border-indigo-500/40 text-xs font-mono transition-all flex items-center gap-1.5"
                    >
                      <span>{tool}</span>
                      <Sparkles className="w-3 h-3 text-amber-400" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB: RECOMMENDED TOOLING STACK */}
          {activeTab === 'tooling' && (
            <RecommendedToolingStack hustle={hustle} />
          )}

          {/* TAB 2: GROWTH ROADMAP */}
          {activeTab === 'roadmap' && (
            <GrowthRoadmap hustle={hustle} />
          )}

          {/* TAB 3: WORKFLOW BLUEPRINT LIBRARY */}
          {activeTab === 'workflow' && (
            <WorkflowBlueprintLibrary hustle={hustle} />
          )}

          {/* TAB 4: COMPETITIVE ADVANTAGE */}
          {activeTab === 'competitive' && (
            <CompetitiveEdgeSection hustle={hustle} />
          )}

          {/* TAB 5: UNIT ECONOMICS MODELER */}
          {activeTab === 'economics' && (
            <div className="space-y-6">
              <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-5">
                <h3 className="text-sm font-bold text-white mb-1">
                  Interactive Unit Economics & ROI Simulator
                </h3>
                <p className="text-xs text-slate-400 mb-6">
                  Adjust price, customer volume, and software overhead to simulate net profit margins and yearly recurring income.
                </p>

                {/* Controls Sliders */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                  
                  {/* Price per unit */}
                  <div>
                    <div className="flex justify-between text-xs font-medium mb-1.5">
                      <span className="text-slate-300">Price / Retainer per Client</span>
                      <span className="text-emerald-400 font-bold">${economics.pricePerUnit}</span>
                    </div>
                    <input
                      type="range"
                      min={10}
                      max={5000}
                      step={10}
                      value={economics.pricePerUnit}
                      onChange={(e) => setEconomics({ ...economics, pricePerUnit: Number(e.target.value) })}
                      className="w-full accent-indigo-500 bg-slate-800 h-2 rounded-lg cursor-pointer"
                    />
                  </div>

                  {/* Monthly Customers */}
                  <div>
                    <div className="flex justify-between text-xs font-medium mb-1.5">
                      <span className="text-slate-300">Active Monthly Clients / Customers</span>
                      <span className="text-indigo-400 font-bold">{economics.monthlyCustomers}</span>
                    </div>
                    <input
                      type="range"
                      min={1}
                      max={1000}
                      step={1}
                      value={economics.monthlyCustomers}
                      onChange={(e) => setEconomics({ ...economics, monthlyCustomers: Number(e.target.value) })}
                      className="w-full accent-indigo-500 bg-slate-800 h-2 rounded-lg cursor-pointer"
                    />
                  </div>

                  {/* Monthly Software Cost */}
                  <div>
                    <div className="flex justify-between text-xs font-medium mb-1.5">
                      <span className="text-slate-300">Software & Automation Overhead ($/mo)</span>
                      <span className="text-rose-400 font-bold">${economics.monthlyOperatingCost}</span>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={1000}
                      step={10}
                      value={economics.monthlyOperatingCost}
                      onChange={(e) => setEconomics({ ...economics, monthlyOperatingCost: Number(e.target.value) })}
                      className="w-full accent-indigo-500 bg-slate-800 h-2 rounded-lg cursor-pointer"
                    />
                  </div>

                  {/* Unit Fulfillment Cost */}
                  <div>
                    <div className="flex justify-between text-xs font-medium mb-1.5">
                      <span className="text-slate-300">Fulfillment Cost per Unit ($)</span>
                      <span className="text-amber-400 font-bold">${economics.fulfillmentCostPerUnit}</span>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={500}
                      step={5}
                      value={economics.fulfillmentCostPerUnit}
                      onChange={(e) => setEconomics({ ...economics, fulfillmentCostPerUnit: Number(e.target.value) })}
                      className="w-full accent-indigo-500 bg-slate-800 h-2 rounded-lg cursor-pointer"
                    />
                  </div>
                </div>

                {/* Key Readouts */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-900 rounded-xl p-4 border border-slate-800">
                  <div>
                    <span className="text-[10px] uppercase font-mono text-slate-500 block">Gross Revenue</span>
                    <span className="text-base font-bold text-white">${grossMonthlyRevenue.toLocaleString()}/mo</span>
                  </div>

                  <div>
                    <span className="text-[10px] uppercase font-mono text-slate-500 block">Net Monthly Profit</span>
                    <span className={`text-base font-bold ${netMonthlyProfit >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                      ${netMonthlyProfit.toLocaleString()}/mo
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] uppercase font-mono text-slate-500 block">Net Margin</span>
                    <span className="text-base font-bold text-indigo-300">{netMargin}%</span>
                  </div>

                  <div>
                    <span className="text-[10px] uppercase font-mono text-slate-500 block">Annualized Run-Rate</span>
                    <span className="text-base font-bold text-amber-400">${annualProfit.toLocaleString()}/yr</span>
                  </div>
                </div>
              </div>

              {/* Chart Visualizer */}
              <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-5 h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData} margin={{ top: 10, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                    <XAxis dataKey="name" stroke="#64748b" />
                    <YAxis stroke="#64748b" />
                    <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#f8fafc' }} />
                    <Legend />
                    <Bar dataKey="Gross Revenue" fill="#6366f1" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="Net Profit" fill="#10b981" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="Operating Costs" fill="#f43f5e" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {/* TAB 6: AI LAUNCH EXECUTION KIT */}
          {activeTab === 'kit' && (
            <div>
              {isGeneratingKit ? (
                <div className="py-16 text-center space-y-4">
                  <Loader2 className="w-10 h-10 text-indigo-400 animate-spin mx-auto" />
                  <div>
                    <h3 className="text-base font-bold text-white">Architecting AI Execution Kit...</h3>
                    <p className="text-xs text-slate-400 max-w-sm mx-auto mt-1">
                      Generating high-converting landing page copy, cold email outreach sequences, and 30-day growth campaigns with Gemini.
                    </p>
                  </div>
                </div>
              ) : kitError ? (
                <div className="p-6 bg-rose-950/30 border border-rose-800/50 rounded-xl text-center space-y-3">
                  <p className="text-xs text-rose-300">{kitError}</p>
                  <button
                    onClick={handleGenerateKit}
                    className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-medium text-xs"
                  >
                    Retry Kit Generation
                  </button>
                </div>
              ) : executionKit ? (
                <div className="space-y-6">
                  
                  {/* Generated Kit Header Banner */}
                  <div className="bg-gradient-to-r from-indigo-900/60 via-purple-900/40 to-slate-900 border border-indigo-500/30 rounded-xl p-4 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase font-mono tracking-widest text-amber-400 block mb-1">
                        Gemini AI Generated Package
                      </span>
                      <h3 className="text-base font-bold text-white">
                        {executionKit.headline}
                      </h3>
                      <p className="text-xs text-slate-300 mt-0.5">
                        {executionKit.subheadline}
                      </p>
                    </div>

                    <button
                      onClick={handleGenerateKit}
                      className="px-3 py-1.5 rounded-lg bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 hover:bg-indigo-600/50 text-xs font-medium shrink-0 flex items-center gap-1.5"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                      <span>Regenerate</span>
                    </button>
                  </div>

                  {/* Landing Page Copy */}
                  <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-5 space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                      <h4 className="text-sm font-bold text-white flex items-center gap-2">
                        <Layers className="w-4 h-4 text-indigo-400" />
                        Landing Page Copy Kit
                      </h4>
                      <button
                        onClick={() => handleCopyText(`
Hero: ${executionKit.landingPageCopy.heroHeading}
Subheading: ${executionKit.landingPageCopy.heroSubheading}
Benefits: ${executionKit.landingPageCopy.keyBenefits.join(', ')}
CTA: ${executionKit.landingPageCopy.ctaButtonText}
`, 'landingCopy')}
                        className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1 font-mono"
                      >
                        {copiedSection === 'landingCopy' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedSection === 'landingCopy' ? 'Copied' : 'Copy All Copy'}</span>
                      </button>
                    </div>

                    <div>
                      <span className="text-[10px] uppercase font-mono text-slate-500 block mb-1">Hero Heading</span>
                      <p className="text-sm font-bold text-amber-300">{executionKit.landingPageCopy.heroHeading}</p>
                    </div>

                    <div>
                      <span className="text-[10px] uppercase font-mono text-slate-500 block mb-1">Subheading</span>
                      <p className="text-xs text-slate-300">{executionKit.landingPageCopy.heroSubheading}</p>
                    </div>

                    <div>
                      <span className="text-[10px] uppercase font-mono text-slate-500 block mb-1.5">Key Value Benefits</span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {executionKit.landingPageCopy.keyBenefits.map((b, i) => (
                          <div key={i} className="text-xs text-slate-200 bg-slate-900 border border-slate-800 p-2.5 rounded-lg flex items-start gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                            <span>{b}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Cold Outreach Email Script */}
                  <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-5 space-y-3">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                      <h4 className="text-sm font-bold text-white flex items-center gap-2">
                        <Target className="w-4 h-4 text-indigo-400" />
                        Cold Outreach Email Script
                      </h4>
                      <button
                        onClick={() => handleCopyText(executionKit.coldOutreachScript, 'coldScript')}
                        className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1 font-mono"
                      >
                        {copiedSection === 'coldScript' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedSection === 'coldScript' ? 'Copied' : 'Copy Email'}</span>
                      </button>
                    </div>

                    <pre className="text-xs text-slate-300 bg-slate-900 border border-slate-800/80 p-4 rounded-xl whitespace-pre-wrap font-sans leading-relaxed">
                      {executionKit.coldOutreachScript}
                    </pre>
                  </div>

                  {/* Pricing Tiers Strategy */}
                  <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-5">
                    <h4 className="text-sm font-bold text-white mb-3">High-Yield Tier Pricing Model</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      
                      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
                        <span className="text-xs font-bold text-slate-300 block">{executionKit.pricingStrategy.tier1Name}</span>
                        <span className="text-lg font-bold text-emerald-400 block my-1">{executionKit.pricingStrategy.tier1Price}</span>
                        <ul className="text-[11px] text-slate-400 space-y-1">
                          {executionKit.pricingStrategy.tier1Features.map((f, i) => (
                            <li key={i}>• {f}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="bg-indigo-950/40 border border-indigo-500/40 rounded-xl p-4 relative">
                        <span className="absolute -top-2.5 right-3 px-2 py-0.5 rounded-full bg-amber-500 text-slate-950 font-bold text-[9px] uppercase">
                          Most Popular
                        </span>
                        <span className="text-xs font-bold text-indigo-200 block">{executionKit.pricingStrategy.tier2Name}</span>
                        <span className="text-lg font-bold text-amber-300 block my-1">{executionKit.pricingStrategy.tier2Price}</span>
                        <ul className="text-[11px] text-slate-300 space-y-1">
                          {executionKit.pricingStrategy.tier2Features.map((f, i) => (
                            <li key={i}>• {f}</li>
                          ))}
                        </ul>
                      </div>

                      {executionKit.pricingStrategy.tier3Name && (
                        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
                          <span className="text-xs font-bold text-slate-300 block">{executionKit.pricingStrategy.tier3Name}</span>
                          <span className="text-lg font-bold text-white block my-1">{executionKit.pricingStrategy.tier3Price}</span>
                          <ul className="text-[11px] text-slate-400 space-y-1">
                            {executionKit.pricingStrategy.tier3Features?.map((f, i) => (
                              <li key={i}>• {f}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* 30-Day Launch Campaign */}
                  <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-5">
                    <h4 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-indigo-400" />
                      30-Day Marketing & Launch Schedule
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {executionKit.marketingCampaign30Days.map((camp, i) => (
                        <div key={i} className="bg-slate-900 border border-slate-800 rounded-xl p-3.5">
                          <span className="text-[10px] uppercase font-mono text-indigo-400 block font-bold">{camp.week}</span>
                          <span className="text-xs font-bold text-white block mb-1.5">{camp.theme}</span>
                          <ul className="text-[11px] text-slate-300 space-y-1">
                            {camp.tactics.map((t, idx) => (
                              <li key={idx}>• {t}</li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              ) : (
                <div className="py-12 text-center space-y-3">
                  <Sparkles className="w-8 h-8 text-indigo-400 mx-auto" />
                  <p className="text-xs text-slate-300 max-w-md mx-auto">
                    Click below to generate a custom launch execution kit containing landing page headlines, cold outreach copy, and 30-day growth plans.
                  </p>
                  <button
                    onClick={handleGenerateKit}
                    className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-medium text-xs shadow-lg shadow-indigo-600/20 flex items-center gap-2 mx-auto"
                  >
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    <span>Generate AI Execution Kit</span>
                  </button>
                </div>
              )}
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
