import React, { useState, useMemo } from 'react';
import { 
  TrendingUp, 
  Sparkles, 
  Flame, 
  Target, 
  Clock, 
  DollarSign, 
  Eye, 
  Share2, 
  CheckCircle2, 
  AlertCircle,
  Sliders,
  Award
} from 'lucide-react';

interface DailySalesPredictorProps {
  activeHustleCount: number;
  onOpen24hChallenge: () => void;
}

export const DailySalesPredictor: React.FC<DailySalesPredictorProps> = ({
  activeHustleCount,
  onOpen24hChallenge
}) => {
  const [estimatedDailyViews, setEstimatedDailyViews] = useState<number>(500);
  const [selectedChannels, setSelectedChannels] = useState<string[]>(['reddit', 'tiktok']);
  const [pricePointGbp, setPricePointGbp] = useState<number>(0.10); // 10p default

  const CHANNELS = [
    { id: 'reddit', name: 'Reddit (r/wallpapers, r/n8n, r/ObsidianMD)', boost: 1.8, icon: '👾' },
    { id: 'tiktok', name: 'TikTok / Instagram Reels (15s Clips)', boost: 2.2, icon: '🎵' },
    { id: 'pinterest', name: 'Pinterest Pins & Aesthetic Boards', boost: 1.5, icon: '📌' },
    { id: 'discord', name: 'Discord Niche Servers', boost: 1.4, icon: '💬' },
    { id: 'civitai', name: 'Civitai / OpenArt (AI Workflows)', boost: 1.9, icon: '🎨' }
  ];

  const toggleChannel = (id: string) => {
    setSelectedChannels((prev) => 
      prev.includes(id) 
        ? prev.length > 1 ? prev.filter((c) => c !== id) : prev 
        : [...prev, id]
    );
  };

  // Math calculation for 24h probability of at least 1 sale
  const calculation = useMemo(() => {
    // Channel multiplier
    const channelMultiplier = selectedChannels.reduce((acc, channelId) => {
      const channel = CHANNELS.find((c) => c.id === channelId);
      return acc * (channel ? channel.boost : 1.0);
    }, 1.0);

    // Conversion rate increases as price decreases (1p - 10p has highest impulse rate)
    let baseConversionRate = 0.03; // 3%
    if (pricePointGbp <= 0.01) baseConversionRate = 0.08; // 8% impulse at 1p
    else if (pricePointGbp <= 0.10) baseConversionRate = 0.05; // 5% at 10p
    else if (pricePointGbp <= 0.50) baseConversionRate = 0.03; // 3% at 50p
    else if (pricePointGbp <= 1.00) baseConversionRate = 0.02; // 2% at £1
    else baseConversionRate = 0.01; // 1% at £2+

    // Effective clicks (1.5% CTR from views)
    const totalClicks = Math.max(5, estimatedDailyViews * 0.02 * channelMultiplier);
    
    // Portfolio scale factor
    const portfolioFactor = Math.min(2.5, 1 + (activeHustleCount * 0.25));

    // Expected total sales in 24h
    const expectedSalesCount = Math.max(0.2, totalClicks * baseConversionRate * portfolioFactor);
    
    // Poisson probability of at least 1 sale: P(k >= 1) = 1 - e^(-lambda)
    const probNoSales = Math.exp(-expectedSalesCount);
    const probAtLeastOneSale = Math.min(0.999, Math.max(0.15, 1 - probNoSales));
    const probabilityPercentage = Math.round(probAtLeastOneSale * 100);

    const projectedMinRevenue = Math.max(pricePointGbp, expectedSalesCount * pricePointGbp);

    return {
      clicks: Math.round(totalClicks),
      expectedSalesCount: Math.max(1, Math.round(expectedSalesCount)),
      probabilityPercentage,
      projectedMinRevenue: projectedMinRevenue.toFixed(2),
      confidenceLevel: probabilityPercentage >= 90 ? 'Ultra-High Confidence' : probabilityPercentage >= 75 ? 'High Confidence' : 'Moderate'
    };
  }, [estimatedDailyViews, selectedChannels, pricePointGbp, activeHustleCount]);

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-xl relative overflow-hidden space-y-4">
      {/* Background Glow */}
      <div className="absolute -top-12 -right-12 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800/80">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-gradient-to-tr from-emerald-500/20 to-indigo-500/20 border border-emerald-500/30 text-emerald-400">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
              Daily 1p Sale Probability Predictor
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-mono font-bold">
                Live AI Engine
              </span>
            </h3>
            <p className="text-xs text-slate-400">
              Calculates your mathematical likelihood of securing a 1p - 10p sale in 24 hours.
            </p>
          </div>
        </div>

        <button
          onClick={onOpen24hChallenge}
          className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 via-rose-500 to-emerald-500 hover:from-amber-400 hover:to-emerald-400 text-slate-950 font-extrabold text-xs flex items-center gap-1.5 transition-all shadow-md shadow-rose-500/20 self-start sm:self-auto shrink-0"
        >
          <Flame className="w-3.5 h-3.5 text-slate-950 fill-slate-950" />
          <span>Launch 24h Challenge</span>
        </button>
      </div>

      {/* Primary Probability Gauge Card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {/* Probability Meter */}
        <div className="p-4 bg-slate-950/80 border border-slate-800 rounded-xl flex flex-col justify-between space-y-3">
          <span className="text-[10px] uppercase font-mono font-bold text-slate-400 block">
            24-Hour 1p Sale Probability
          </span>

          <div className="flex items-baseline gap-2">
            <span className={`text-3xl sm:text-4xl font-extrabold font-mono tracking-tight ${
              calculation.probabilityPercentage >= 90 ? 'text-emerald-400' : calculation.probabilityPercentage >= 75 ? 'text-amber-400' : 'text-indigo-400'
            }`}>
              {calculation.probabilityPercentage}%
            </span>
            <span className="text-xs font-mono text-emerald-300 font-bold">
              ({calculation.confidenceLevel})
            </span>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-slate-900 rounded-full h-2 overflow-hidden border border-slate-800">
            <div 
              className={`h-full transition-all duration-700 ${
                calculation.probabilityPercentage >= 90 ? 'bg-gradient-to-r from-emerald-500 to-teal-400' : 'bg-gradient-to-r from-amber-500 to-emerald-400'
              }`}
              style={{ width: `${calculation.probabilityPercentage}%` }}
            />
          </div>

          <p className="text-[10px] text-slate-400 font-mono">
            Target: ≥ 1 Sale in 24h (£{calculation.projectedMinRevenue} est. yield)
          </p>
        </div>

        {/* Projected Daily Metrics */}
        <div className="p-4 bg-slate-950/80 border border-slate-800 rounded-xl grid grid-cols-2 gap-2 text-xs">
          <div>
            <span className="text-[10px] uppercase font-mono text-slate-500 block">Est. Daily Views</span>
            <span className="text-sm font-bold font-mono text-indigo-300">{estimatedDailyViews.toLocaleString()}</span>
          </div>
          <div>
            <span className="text-[10px] uppercase font-mono text-slate-500 block">Expected Clicks</span>
            <span className="text-sm font-bold font-mono text-teal-300">{calculation.clicks}</span>
          </div>
          <div>
            <span className="text-[10px] uppercase font-mono text-slate-500 block">Expected 24h Sales</span>
            <span className="text-sm font-bold font-mono text-emerald-400">{calculation.expectedSalesCount} sales</span>
          </div>
          <div>
            <span className="text-[10px] uppercase font-mono text-slate-500 block">Active Assets</span>
            <span className="text-sm font-bold font-mono text-amber-300">{activeHustleCount} products</span>
          </div>
        </div>

        {/* Dynamic Probability Booster Advice */}
        <div className="p-4 bg-indigo-950/30 border border-indigo-500/30 rounded-xl flex flex-col justify-between space-y-2 text-xs">
          <div className="flex items-center gap-1.5 text-indigo-300 font-bold font-mono text-[11px]">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>Probability Booster Tip:</span>
          </div>
          <p className="text-slate-300 text-[11px] leading-snug">
            {pricePointGbp > 0.50 ? (
              <>Lower price to <strong>10p (£0.10)</strong> or <strong>1p</strong> on Gumroad. Micro-prices under 50p reduce buyer resistance to zero on Day 1.</>
            ) : selectedChannels.length < 2 ? (
              <>Cross-post your link to at least <strong>2 communities</strong> (e.g. TikTok 15s wrist shot + r/wallpapers preview thread).</>
            ) : (
              <>Your parameters are optimized! Post your pitch script on 1 target Reddit/TikTok thread to secure your 24h sale.</>
            )}
          </p>
          <button
            onClick={onOpen24hChallenge}
            className="text-[10px] font-mono text-emerald-400 font-bold hover:underline self-start flex items-center gap-1"
          >
            <span>Deploy 10p Asset Now</span> →
          </button>
        </div>
      </div>

      {/* Interactive Sliders & Distribution Channel Toggles */}
      <div className="pt-2 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        {/* Sliders */}
        <div className="space-y-3 bg-slate-950/50 p-3 rounded-xl border border-slate-800/80">
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="font-mono text-slate-300 text-[11px]">Target Asset Price:</span>
              <span className="font-mono font-bold text-emerald-400">
                {pricePointGbp <= 0.01 ? '£0.01 (1p)' : pricePointGbp <= 0.10 ? '£0.10 (10p)' : `£${pricePointGbp.toFixed(2)}`}
              </span>
            </div>
            <input
              type="range"
              min={0.01}
              max={1.99}
              step={0.09}
              value={pricePointGbp}
              onChange={(e) => setPricePointGbp(parseFloat(e.target.value))}
              className="w-full accent-emerald-500 bg-slate-800 h-1.5 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[9px] font-mono text-slate-500 mt-0.5">
              <span>1p (Max Impulse)</span>
              <span>10p</span>
              <span>49p</span>
              <span>99p</span>
              <span>£1.99</span>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="font-mono text-slate-300 text-[11px]">Estimated Daily Impressions/Views:</span>
              <span className="font-mono font-bold text-indigo-300">{estimatedDailyViews.toLocaleString()} views</span>
            </div>
            <input
              type="range"
              min={100}
              max={5000}
              step={100}
              value={estimatedDailyViews}
              onChange={(e) => setEstimatedDailyViews(parseInt(e.target.value))}
              className="w-full accent-indigo-500 bg-slate-800 h-1.5 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[9px] font-mono text-slate-500 mt-0.5">
              <span>100 (Single Post)</span>
              <span>1,000 (Reddit Thread)</span>
              <span>5,000 (TikTok Reel)</span>
            </div>
          </div>
        </div>

        {/* Channels */}
        <div className="space-y-2 bg-slate-950/50 p-3 rounded-xl border border-slate-800/80">
          <span className="font-mono text-slate-300 text-[11px] block font-bold">
            Select Active Distribution Channels:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {CHANNELS.map((ch) => {
              const isActive = selectedChannels.includes(ch.id);
              return (
                <button
                  key={ch.id}
                  onClick={() => toggleChannel(ch.id)}
                  className={`px-2.5 py-1.5 rounded-lg text-[10px] font-mono font-bold flex items-center gap-1.5 border transition-all ${
                    isActive
                      ? 'bg-indigo-600/30 text-indigo-200 border-indigo-500/50'
                      : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-300'
                  }`}
                >
                  <span>{ch.icon}</span>
                  <span>{ch.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
