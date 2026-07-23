import React, { useState } from 'react';
import { ViabilityAnalysis } from '../types';
import { 
  X, 
  Sparkles, 
  TrendingUp, 
  Bot, 
  Clock, 
  ShieldCheck, 
  AlertTriangle, 
  Zap, 
  Loader2,
  DollarSign,
  Lightbulb
} from 'lucide-react';

interface CustomIdeaValidatorProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CustomIdeaValidator: React.FC<CustomIdeaValidatorProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const [ideaPrompt, setIdeaPrompt] = useState<string>('');
  const [pricePoint, setPricePoint] = useState<number>(100);
  const [hoursPerWeek, setHoursPerWeek] = useState<number>(5);
  const [targetMonthlyRevenue, setTargetMonthlyRevenue] = useState<number>(3000);

  const [analysis, setAnalysis] = useState<ViabilityAnalysis | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleRunAnalysis = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!ideaPrompt.trim()) return;

    setIsAnalyzing(true);
    setError(null);

    try {
      const response = await fetch('/api/analyze-viability', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          idea: ideaPrompt,
          pricePoint,
          hoursPerWeek,
          targetMonthlyRevenue
        })
      });

      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to analyze viability');
      }

      setAnalysis(data.analysis);
    } catch (err: any) {
      console.error('Error analyzing viability:', err);
      setError(err.message || 'Error conducting AI analysis');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const PRESET_IDEAS = [
    'Automated SEO blog generation service for local chiropractors',
    'Micro-SaaS that auto-transcribes Zoom calls and extracts Notion action items',
    'AI voice bot that calls abandoned Shopify checkouts with personalized discounts',
    'Curated newsletter summarizing weekly AI research papers for VC investors'
  ];

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden my-auto">
        
        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-amber-400" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">AI Side Hustle Viability Evaluator</h3>
              <p className="text-xs text-slate-400">Validate any custom business concept for profitability & automation</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          <form onSubmit={handleRunAnalysis} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Describe Your Side Hustle Concept
              </label>
              <textarea
                rows={3}
                value={ideaPrompt}
                onChange={(e) => setIdeaPrompt(e.target.value)}
                placeholder="e.g. A service that uses AI to scan Airbnb listings and automatically write optimized titles and descriptions for $99/mo..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
              />
            </div>

            {/* Quick Presets */}
            <div>
              <span className="text-[10px] uppercase font-mono text-slate-500 block mb-1.5">Or test a high-yield concept:</span>
              <div className="flex flex-wrap gap-1.5">
                {PRESET_IDEAS.map((preset, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setIdeaPrompt(preset)}
                    className="text-[11px] text-slate-300 bg-slate-950 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 rounded-lg px-2.5 py-1 text-left transition-all"
                  >
                    {preset.slice(0, 45)}...
                  </button>
                ))}
              </div>
            </div>

            {/* Sliders Input */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-slate-950/60 p-3 rounded-xl border border-slate-800">
              <div>
                <label className="block text-[11px] text-slate-400 mb-1">Target Price ($)</label>
                <input
                  type="number"
                  value={pricePoint}
                  onChange={(e) => setPricePoint(Number(e.target.value))}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-[11px] text-slate-400 mb-1">Weekly Effort (hrs)</label>
                <input
                  type="number"
                  value={hoursPerWeek}
                  onChange={(e) => setHoursPerWeek(Number(e.target.value))}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-[11px] text-slate-400 mb-1">Monthly Goal ($)</label>
                <input
                  type="number"
                  value={targetMonthlyRevenue}
                  onChange={(e) => setTargetMonthlyRevenue(Number(e.target.value))}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-white"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isAnalyzing || !ideaPrompt.trim()}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-medium text-xs shadow-lg shadow-indigo-600/20 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Evaluating Viability & Automation Potential...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>Run AI Viability Audit</span>
                </>
              )}
            </button>
          </form>

          {/* Error Message */}
          {error && (
            <div className="p-3 bg-rose-950/40 border border-rose-800/50 rounded-xl text-xs text-rose-300">
              {error}
            </div>
          )}

          {/* Analysis Results Display */}
          {analysis && (
            <div className="space-y-4 pt-2 border-t border-slate-800">
              
              {/* Score Badges */}
              <div className="grid grid-cols-3 gap-2">
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-center">
                  <span className="text-[10px] uppercase font-mono text-slate-500 block">Overall Score</span>
                  <span className="text-xl font-bold text-emerald-400">{analysis.overallScore}/100</span>
                </div>

                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-center">
                  <span className="text-[10px] uppercase font-mono text-slate-500 block">Automation Index</span>
                  <span className="text-xl font-bold text-amber-400">{analysis.automationScore}%</span>
                </div>

                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-center">
                  <span className="text-[10px] uppercase font-mono text-slate-500 block">Time To $1k</span>
                  <span className="text-xl font-bold text-indigo-300">~{analysis.timeToFirstDollarDays} days</span>
                </div>
              </div>

              {/* Key Automation Lever */}
              <div className="bg-indigo-950/40 border border-indigo-500/30 rounded-xl p-3.5">
                <span className="text-[10px] uppercase font-mono text-amber-400 block font-bold mb-1">
                  ⚡ Key Automation Growth Lever
                </span>
                <p className="text-xs text-indigo-100">{analysis.keyAutomationLever}</p>
              </div>

              {/* Strengths & Growth Hacks */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <span className="text-[10px] uppercase font-mono text-emerald-400 block mb-1">Key Strengths</span>
                  <ul className="text-xs text-slate-300 space-y-1">
                    {analysis.strengths.map((s, idx) => (
                      <li key={idx}>• {s}</li>
                    ))}
                  </ul>
                </div>

                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <span className="text-[10px] uppercase font-mono text-indigo-400 block mb-1">AI Growth Hacks</span>
                  <ul className="text-xs text-slate-300 space-y-1">
                    {analysis.growthHacks.map((g, idx) => (
                      <li key={idx}>• {g}</li>
                    ))}
                  </ul>
                </div>
              </div>

            </div>
          )}
        </div>

      </div>
    </div>
  );
};
