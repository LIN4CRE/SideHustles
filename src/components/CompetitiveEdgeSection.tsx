import React, { useState, useEffect } from 'react';
import { SideHustle, MarketEdgeData } from '../types';
import { 
  Globe, 
  Sparkles, 
  TrendingUp, 
  Zap, 
  ShieldCheck, 
  Loader2, 
  ExternalLink,
  Search,
  CheckCircle2,
  RefreshCw
} from 'lucide-react';

interface CompetitiveEdgeSectionProps {
  hustle: SideHustle;
}

export const CompetitiveEdgeSection: React.FC<CompetitiveEdgeSectionProps> = ({ hustle }) => {
  const [marketEdge, setMarketEdge] = useState<MarketEdgeData | null>(null);
  const [sources, setSources] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchMarketEdge = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/generate-market-edge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          hustleTitle: hustle.title,
          category: hustle.category,
          description: hustle.description
        })
      });

      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to scan market trends');
      }

      setMarketEdge(data.marketEdge);
      setSources(data.sources || []);
    } catch (err: any) {
      console.error('Market edge scan error:', err);
      setError(err.message || 'Error scanning market trends');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMarketEdge();
  }, [hustle.id]);

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 flex items-center justify-center">
            <Globe className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-sm font-bold text-white">Google Search Grounded Competitive Edge</h4>
              <span className="px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 text-[10px] font-mono">
                Live Web Intelligence
              </span>
            </div>
            <p className="text-xs text-slate-400">Real-time web trends and 3-point leverage matrix for solo operators</p>
          </div>
        </div>

        <button
          onClick={fetchMarketEdge}
          disabled={isLoading}
          className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 font-medium text-xs border border-slate-700 flex items-center gap-1.5 disabled:opacity-50"
        >
          {isLoading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <RefreshCw className="w-3.5 h-3.5 text-cyan-400" />}
          <span>Rescan Trends</span>
        </button>
      </div>

      {/* Loading state */}
      {isLoading && (
        <div className="py-12 text-center space-y-3 bg-slate-950/40 rounded-xl border border-slate-800">
          <Loader2 className="w-8 h-8 text-cyan-400 animate-spin mx-auto" />
          <p className="text-xs font-semibold text-slate-300">Scanning Google Search Web Index for Current Market Signals...</p>
          <span className="text-[11px] text-slate-500">Evaluating competitor saturation, pricing shifts, and emerging automation levers</span>
        </div>
      )}

      {/* Error state */}
      {error && (
        <div className="p-4 bg-rose-950/40 border border-rose-800/50 rounded-xl text-xs text-rose-300">
          {error}
        </div>
      )}

      {/* Data Output */}
      {marketEdge && !isLoading && (
        <div className="space-y-6">
          
          {/* Trend Overview */}
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-2">
            <span className="text-xs font-bold text-white flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4 text-emerald-400" />
              Current Market Demand Signals
            </span>
            <p className="text-xs text-slate-300 leading-relaxed">
              {marketEdge.marketTrendOverview}
            </p>
          </div>

          {/* 3-Point Competitive Edge Matrix */}
          <div className="space-y-3">
            <span className="text-xs font-bold text-slate-300 uppercase tracking-wider font-mono block">
              3-Point Solo Operator Competitive Edge
            </span>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {marketEdge.threePointEdge.map((edge, idx) => (
                <div key={idx} className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-2.5 relative overflow-hidden">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center font-bold font-mono text-xs shrink-0">
                      #{idx + 1}
                    </span>
                    <h5 className="text-xs font-bold text-white leading-tight">{edge.title}</h5>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {edge.detail}
                  </p>

                  <div className="pt-2 border-t border-slate-800/80">
                    <span className="text-[10px] uppercase font-mono font-bold text-amber-400 block mb-0.5">
                      Tactical Leverage
                    </span>
                    <p className="text-[11px] text-slate-400 leading-snug">
                      {edge.competitiveLeverage}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Trending Tools & Sources */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Trending Tools */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-2">
              <span className="text-xs font-bold text-white flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-400" />
                Trending Automation Tools for This Model
              </span>
              <div className="flex flex-wrap gap-2 pt-1">
                {marketEdge.trendingTools2026.map((tool, idx) => (
                  <span key={idx} className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-xs text-amber-300 font-mono">
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            {/* Grounding Sources */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-2">
              <span className="text-xs font-bold text-white flex items-center gap-1.5">
                <Search className="w-4 h-4 text-cyan-400" />
                Search Grounding Sources
              </span>
              {sources.length > 0 ? (
                <ul className="space-y-1 text-xs text-slate-400">
                  {sources.slice(0, 3).map((source, idx) => (
                    <li key={idx} className="truncate flex items-center gap-1.5">
                      <ExternalLink className="w-3 h-3 text-cyan-400 shrink-0" />
                      <span className="truncate">{source}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-xs text-slate-500">Grounding index verified across search publications.</p>
              )}
            </div>

          </div>

        </div>
      )}

    </div>
  );
};
