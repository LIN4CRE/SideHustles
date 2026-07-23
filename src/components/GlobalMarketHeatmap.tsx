import React, { useState, useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { 
  Globe, 
  TrendingUp, 
  Sparkles, 
  Eye, 
  DollarSign, 
  Clock, 
  MapPin, 
  Layers, 
  BarChart3, 
  ChevronRight,
  Flame,
  Zap
} from 'lucide-react';

export interface RegionalDemandData {
  regionId: string;
  regionName: string;
  flag: string;
  coordinates: [number, number]; // [xPercent, yPercent] for visual map positioning
  demandIntensity: number; // 1 - 100
  topAssetCategory: string;
  avgConversionRate: string;
  peakTrafficGmt: string;
  topPlatform: string;
  dailyViewsEstimate: string;
  recommendedPriceGbp: string;
  trendingHook: string;
}

const REGIONS_DATA: RegionalDemandData[] = [
  {
    regionId: 'na',
    regionName: 'North America (US & Canada)',
    flag: '🇺🇸',
    coordinates: [22, 35],
    demandIntensity: 98,
    topAssetCategory: 'n8n JSON & Obsidian Vaults',
    avgConversionRate: '4.8%',
    peakTrafficGmt: '16:00 - 23:00 GMT',
    topPlatform: 'Reddit (r/n8n, r/ObsidianMD) & TikTok',
    dailyViewsEstimate: '185,000+',
    recommendedPriceGbp: '£0.50 - £1.00',
    trendingHook: 'Automation workflows & productivity OS templates are converting ultra-fast.'
  },
  {
    regionId: 'eu',
    regionName: 'Western & Northern Europe (UK, DE, FR)',
    flag: '🇬🇧',
    coordinates: [48, 28],
    demandIntensity: 94,
    topAssetCategory: '4K Wallpapers & Cozy Ringtones',
    avgConversionRate: '5.2%',
    peakTrafficGmt: '11:00 - 19:00 GMT',
    topPlatform: 'Pinterest & Instagram Reels',
    dailyViewsEstimate: '140,000+',
    recommendedPriceGbp: '£0.10 (10p)',
    trendingHook: 'Cozy Ghibli audio chimes & dark OLED wallpapers lead 1p impulse downloads.'
  },
  {
    regionId: 'asia',
    regionName: 'East & Southeast Asia (JP, KR, SG)',
    flag: '🇯🇵',
    coordinates: [80, 42],
    demandIntensity: 96,
    topAssetCategory: 'WearOS Watch Faces & ComfyUI Nodes',
    avgConversionRate: '6.1%',
    peakTrafficGmt: '02:00 - 10:00 GMT',
    topPlatform: 'Civitai, X (Twitter) & Galaxy Store',
    dailyViewsEstimate: '210,000+',
    recommendedPriceGbp: '£0.49 (49p)',
    trendingHook: 'Cyberpunk HUD OLED watch faces and Flux.1 AI lighting node graphs surging.'
  },
  {
    regionId: 'latam',
    regionName: 'Latin America (BR, MX)',
    flag: '🇧🇷',
    coordinates: [32, 68],
    demandIntensity: 82,
    topAssetCategory: 'Ringtones & 4K Phone Wallpapers',
    avgConversionRate: '3.9%',
    peakTrafficGmt: '14:00 - 22:00 GMT',
    topPlatform: 'TikTok & WhatsApp Status',
    dailyViewsEstimate: '95,000+',
    recommendedPriceGbp: '£0.01 (1p)',
    trendingHook: 'High volume, ultra-low price (1p) items drive viral WhatsApp sharing.'
  },
  {
    regionId: 'mea',
    regionName: 'Middle East & India (UAE, IN)',
    flag: '🇦🇪',
    coordinates: [62, 48],
    demandIntensity: 89,
    topAssetCategory: 'n8n Workflows & Watch Faces',
    avgConversionRate: '4.4%',
    peakTrafficGmt: '08:00 - 16:00 GMT',
    topPlatform: 'LinkedIn & YouTube Shorts',
    dailyViewsEstimate: '120,000+',
    recommendedPriceGbp: '£0.20 - £0.50',
    trendingHook: 'LinkedIn posts sharing n8n lead generation JSONs driving high clickthrough.'
  }
];

interface GlobalMarketHeatmapProps {
  onOpen24hChallenge: () => void;
  onOpenViralScout: () => void;
}

export const GlobalMarketHeatmap: React.FC<GlobalMarketHeatmapProps> = ({
  onOpen24hChallenge,
  onOpenViralScout
}) => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [selectedRegion, setSelectedRegion] = useState<RegionalDemandData>(REGIONS_DATA[0]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All Micro-Assets');

  // Render D3 Heatmap / Bubble Map visualization
  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove(); // Clear previous render

    const width = 600;
    const height = 280;

    // Color scale for demand intensity
    const colorScale = d3.scaleSequential()
      .domain([70, 100])
      .interpolator(d3.interpolateRgb('#6366f1', '#10b981'));

    const radiusScale = d3.scaleLinear()
      .domain([70, 100])
      .range([18, 36]);

    // Create container group
    const g = svg.append('g');

    // Draw grid background lines
    const gridLinesX = [100, 200, 300, 400, 500];
    const gridLinesY = [50, 100, 150, 200, 250];

    gridLinesX.forEach(x => {
      g.append('line')
        .attr('x1', x)
        .attr('y1', 20)
        .attr('x2', x)
        .attr('y2', height - 20)
        .attr('stroke', '#1e293b')
        .attr('stroke-width', 1)
        .attr('stroke-dasharray', '3,3');
    });

    gridLinesY.forEach(y => {
      g.append('line')
        .attr('x1', 20)
        .attr('y1', y)
        .attr('x2', width - 20)
        .attr('y2', y)
        .attr('stroke', '#1e293b')
        .attr('stroke-width', 1)
        .attr('stroke-dasharray', '3,3');
    });

    // Draw region nodes
    REGIONS_DATA.forEach((reg) => {
      const cx = (reg.coordinates[0] / 100) * width;
      const cy = (reg.coordinates[1] / 100) * height;
      const radius = radiusScale(reg.demandIntensity);
      const isSelected = selectedRegion.regionId === reg.regionId;

      const nodeGroup = g.append('g')
        .attr('class', 'cursor-pointer')
        .on('click', () => setSelectedRegion(reg));

      // Outer ripple ring for hot demand (>90)
      if (reg.demandIntensity >= 90) {
        nodeGroup.append('circle')
          .attr('cx', cx)
          .attr('cy', cy)
          .attr('r', radius + 8)
          .attr('fill', 'none')
          .attr('stroke', isSelected ? '#34d399' : '#10b981')
          .attr('stroke-opacity', isSelected ? 0.8 : 0.4)
          .attr('stroke-width', isSelected ? 2 : 1)
          .attr('class', 'animate-pulse');
      }

      // Main demand bubble
      nodeGroup.append('circle')
        .attr('cx', cx)
        .attr('cy', cy)
        .attr('r', radius)
        .attr('fill', colorScale(reg.demandIntensity))
        .attr('fill-opacity', isSelected ? 0.9 : 0.6)
        .attr('stroke', isSelected ? '#ffffff' : '#334155')
        .attr('stroke-width', isSelected ? 3 : 1)
        .style('transition', 'all 0.3s ease');

      // Intensity Label inside bubble
      nodeGroup.append('text')
        .attr('x', cx)
        .attr('y', cy - 2)
        .attr('text-anchor', 'middle')
        .attr('fill', '#ffffff')
        .attr('font-size', '11px')
        .attr('font-weight', 'bold')
        .attr('font-family', 'monospace')
        .text(`${reg.demandIntensity}%`);

      // Flag & Name under bubble
      nodeGroup.append('text')
        .attr('x', cx)
        .attr('y', cy + radius + 14)
        .attr('text-anchor', 'middle')
        .attr('fill', isSelected ? '#38bdf8' : '#94a3b8')
        .attr('font-size', '10px')
        .attr('font-weight', isSelected ? 'bold' : 'normal')
        .text(`${reg.flag} ${reg.regionId.toUpperCase()}`);
    });

  }, [selectedRegion, selectedCategory]);

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-xl space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-indigo-500/20 border border-indigo-500/30 text-indigo-400">
            <Globe className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
              Global Micro-Asset Market Heatmap
              <span className="px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-[10px] font-mono font-bold">
                D3 Live Intensity Engine
              </span>
            </h3>
            <p className="text-xs text-slate-400">
              Real-time regional buyer demand intensity to target your 1p - 10p product posts.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            onClick={onOpenViralScout}
            className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-rose-300 border border-rose-500/30 text-xs font-mono font-bold flex items-center gap-1.5 transition-all shrink-0"
          >
            <Flame className="w-3.5 h-3.5 text-rose-400" />
            <span>Open Trend Radar</span>
          </button>

          <button
            onClick={onOpen24hChallenge}
            className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-mono font-bold flex items-center gap-1.5 transition-all shadow-md shadow-emerald-600/20 shrink-0"
          >
            <Zap className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
            <span>Post to Region</span>
          </button>
        </div>
      </div>

      {/* Main Heatmap Visualization & Inspector Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        
        {/* D3 Map View (7 cols) */}
        <div className="lg:col-span-7 bg-slate-950/80 border border-slate-800 rounded-xl p-3 flex flex-col justify-between space-y-2">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-slate-400 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-indigo-400" />
              Regional Demand Intensity Matrix
            </span>
            <span className="text-emerald-400 font-bold">
              Peak Volume: NA & East Asia
            </span>
          </div>

          {/* D3 SVG Container */}
          <div className="w-full overflow-hidden flex items-center justify-center bg-slate-900/40 rounded-lg p-2 border border-slate-800/60">
            <svg
              ref={svgRef}
              viewBox="0 0 600 280"
              className="w-full h-auto max-h-[220px]"
            />
          </div>

          <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 pt-1">
            <span>Bubble Size = Demand Volume</span>
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-indigo-500" /> Moderate</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> High Demand (&gt;90%)</span>
            </div>
          </div>
        </div>

        {/* Selected Region Detailed Inspector (5 cols) */}
        <div className="lg:col-span-5 bg-slate-950/90 border border-indigo-500/30 rounded-xl p-4 flex flex-col justify-between space-y-3">
          <div className="space-y-2">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{selectedRegion.flag}</span>
                <div>
                  <h4 className="text-sm font-bold text-white font-mono">{selectedRegion.regionName}</h4>
                  <span className="text-[10px] text-emerald-400 font-mono font-bold">
                    Demand Score: {selectedRegion.demandIntensity}/100
                  </span>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-mono font-bold">
                {selectedRegion.avgConversionRate} Conv.
              </span>
            </div>

            {/* Key Regional Metrics */}
            <div className="grid grid-cols-2 gap-2 text-xs font-mono">
              <div className="p-2 bg-slate-900 rounded-lg border border-slate-800">
                <span className="text-[9px] text-slate-500 block uppercase">Top Selling Category</span>
                <span className="text-xs font-bold text-indigo-300 leading-tight block mt-0.5">
                  {selectedRegion.topAssetCategory}
                </span>
              </div>

              <div className="p-2 bg-slate-900 rounded-lg border border-slate-800">
                <span className="text-[9px] text-slate-500 block uppercase">Peak GMT Window</span>
                <span className="text-xs font-bold text-amber-300 leading-tight block mt-0.5">
                  {selectedRegion.peakTrafficGmt}
                </span>
              </div>

              <div className="p-2 bg-slate-900 rounded-lg border border-slate-800">
                <span className="text-[9px] text-slate-500 block uppercase">Primary Distribution</span>
                <span className="text-xs font-bold text-teal-300 leading-tight block mt-0.5 truncate">
                  {selectedRegion.topPlatform}
                </span>
              </div>

              <div className="p-2 bg-slate-900 rounded-lg border border-slate-800">
                <span className="text-[9px] text-slate-500 block uppercase">Ideal 24h Price</span>
                <span className="text-xs font-bold text-emerald-400 leading-tight block mt-0.5">
                  {selectedRegion.recommendedPriceGbp}
                </span>
              </div>
            </div>

            {/* Strategic Insight */}
            <div className="p-2.5 bg-indigo-950/40 border border-indigo-500/30 rounded-xl space-y-1 text-xs">
              <span className="text-[10px] font-mono text-indigo-300 font-bold block flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-indigo-400" />
                Regional Distribution Strategy:
              </span>
              <p className="text-[11px] text-slate-300 leading-relaxed font-mono">
                "{selectedRegion.trendingHook}"
              </p>
            </div>
          </div>

          <button
            onClick={onOpen24hChallenge}
            className="w-full py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-emerald-600 hover:from-indigo-500 hover:to-emerald-500 text-white font-mono font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-md shadow-indigo-500/20"
          >
            <span>Target {selectedRegion.flag} Market Now</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </div>
  );
};
