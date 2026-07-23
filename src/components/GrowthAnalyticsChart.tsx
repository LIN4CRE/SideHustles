import React, { useState } from 'react';
import { 
  ResponsiveContainer, 
  ComposedChart, 
  Area, 
  Bar, 
  Line, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Legend, 
  CartesianGrid 
} from 'recharts';
import { 
  TrendingUp, 
  Zap, 
  DollarSign, 
  BarChart3, 
  Layers, 
  Sparkles, 
  Clock, 
  Target,
  ArrowUpRight,
  Flame
} from 'lucide-react';

interface GrowthAnalyticsChartProps {
  onOpen24hChallenge?: () => void;
  onOpenAssetGen?: () => void;
}

interface AnalyticsDataPoint {
  timeLabel: string;
  salesCount: number;
  conversionRate: number; // percentage e.g. 4.2
  projectedRevenueGbp: number; // £
  assetsInMarket: number;
}

const HOURLY_24H_DATA: AnalyticsDataPoint[] = [
  { timeLabel: '00:00', salesCount: 12, conversionRate: 2.1, projectedRevenueGbp: 1.20, assetsInMarket: 5 },
  { timeLabel: '02:00', salesCount: 18, conversionRate: 2.8, projectedRevenueGbp: 2.40, assetsInMarket: 5 },
  { timeLabel: '04:00', salesCount: 25, conversionRate: 3.5, projectedRevenueGbp: 4.50, assetsInMarket: 8 },
  { timeLabel: '06:00', salesCount: 42, conversionRate: 4.2, projectedRevenueGbp: 8.90, assetsInMarket: 10 },
  { timeLabel: '08:00', salesCount: 89, conversionRate: 5.6, projectedRevenueGbp: 18.50, assetsInMarket: 12 },
  { timeLabel: '10:00', salesCount: 135, conversionRate: 6.4, projectedRevenueGbp: 32.00, assetsInMarket: 15 },
  { timeLabel: '12:00', salesCount: 198, conversionRate: 7.1, projectedRevenueGbp: 58.40, assetsInMarket: 18 },
  { timeLabel: '14:00', salesCount: 245, conversionRate: 6.8, projectedRevenueGbp: 84.10, assetsInMarket: 22 },
  { timeLabel: '16:00', salesCount: 310, conversionRate: 8.2, projectedRevenueGbp: 124.50, assetsInMarket: 25 },
  { timeLabel: '18:00', salesCount: 280, conversionRate: 7.5, projectedRevenueGbp: 152.00, assetsInMarket: 25 },
  { timeLabel: '20:00', salesCount: 220, conversionRate: 6.1, projectedRevenueGbp: 178.20, assetsInMarket: 25 },
  { timeLabel: '22:00', salesCount: 160, conversionRate: 4.8, projectedRevenueGbp: 195.00, assetsInMarket: 25 },
];

export const GrowthAnalyticsChart: React.FC<GrowthAnalyticsChartProps> = ({
  onOpen24hChallenge,
  onOpenAssetGen
}) => {
  const [timeframe, setTimeframe] = useState<'24h' | '7d' | '30d'>('24h');
  const [assetVolumeMultiplier, setAssetVolumeMultiplier] = useState<number>(1);

  // Dynamic multiplier effect for projected revenue
  const chartData = HOURLY_24H_DATA.map((dp) => ({
    ...dp,
    salesCount: Math.round(dp.salesCount * assetVolumeMultiplier),
    projectedRevenueGbp: Number((dp.projectedRevenueGbp * assetVolumeMultiplier).toFixed(2)),
    assetsInMarket: Math.round(dp.assetsInMarket * assetVolumeMultiplier)
  }));

  const totalSales = chartData.reduce((acc, dp) => acc + dp.salesCount, 0);
  const peakConversion = Math.max(...chartData.map((dp) => dp.conversionRate));
  const totalProjectedRevenue = chartData[chartData.length - 1].projectedRevenueGbp;

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-xl space-y-4">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-400">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
              24-Hour Sale Challenge & Growth Analytics
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-mono font-bold">
                Recharts Engine
              </span>
            </h3>
            <p className="text-xs text-slate-400">
              Track 24h sale counts, social conversion rates, and revenue projections as asset volume scales.
            </p>
          </div>
        </div>

        {/* Timeframe Controls */}
        <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 self-start sm:self-auto text-xs font-mono">
          <button
            onClick={() => setTimeframe('24h')}
            className={`px-3 py-1 rounded-lg font-bold transition-all ${
              timeframe === '24h' ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            24h Challenge
          </button>
          <button
            onClick={() => setTimeframe('7d')}
            className={`px-3 py-1 rounded-lg font-bold transition-all ${
              timeframe === '7d' ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            7-Day Scale
          </button>
        </div>
      </div>

      {/* Metric Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800 space-y-0.5">
          <span className="text-[10px] font-mono uppercase text-slate-500 block">24h Sales Count</span>
          <span className="text-base sm:text-lg font-bold text-white font-mono flex items-center gap-1">
            {totalSales.toLocaleString()}
            <span className="text-[10px] text-emerald-400 font-normal">items</span>
          </span>
        </div>

        <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800 space-y-0.5">
          <span className="text-[10px] font-mono uppercase text-slate-500 block">Peak Conv. Rate</span>
          <span className="text-base sm:text-lg font-bold text-emerald-400 font-mono">
            {peakConversion}%
          </span>
        </div>

        <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800 space-y-0.5">
          <span className="text-[10px] font-mono uppercase text-slate-500 block">Projected Revenue</span>
          <span className="text-base sm:text-lg font-bold text-amber-300 font-mono">
            £{totalProjectedRevenue.toFixed(2)}
          </span>
        </div>

        <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800 space-y-0.5">
          <span className="text-[10px] font-mono uppercase text-slate-500 block">Active Micro-Assets</span>
          <span className="text-base sm:text-lg font-bold text-indigo-300 font-mono">
            {Math.round(25 * assetVolumeMultiplier)} assets
          </span>
        </div>
      </div>

      {/* Volume Scaling Simulator Slider */}
      <div className="bg-slate-950/90 p-3 rounded-xl border border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono">
        <div className="flex items-center gap-2 text-slate-300">
          <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
          <span>Simulate Asset Volume Scaling:</span>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          {[1, 2.5, 5, 10].map((mult) => (
            <button
              key={mult}
              onClick={() => setAssetVolumeMultiplier(mult)}
              className={`px-3 py-1 rounded-lg text-[11px] font-bold border transition-all ${
                assetVolumeMultiplier === mult
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white border-emerald-500/40 shadow-sm'
                  : 'bg-slate-900 text-slate-400 hover:text-slate-200 border-slate-800'
              }`}
            >
              {mult === 1 ? '1x (25 Assets)' : mult === 2.5 ? '2.5x (60 Assets)' : mult === 5 ? '5x (125 Assets)' : '10x (250 Assets)'}
            </button>
          ))}
        </div>
      </div>

      {/* Recharts Composed Chart */}
      <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-3 sm:p-4 space-y-2">
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="timeLabel" stroke="#64748b" fontSize={11} tickLine={false} />
              <YAxis yAxisId="left" stroke="#10b981" fontSize={11} tickLine={false} />
              <YAxis yAxisId="right" orientation="right" stroke="#6366f1" fontSize={11} tickLine={false} />
              
              <Tooltip
                contentStyle={{
                  backgroundColor: '#020617',
                  borderColor: '#334155',
                  borderRadius: '12px',
                  fontSize: '12px',
                  fontFamily: 'monospace'
                }}
              />
              <Legend wrapperStyle={{ fontSize: '11px', fontFamily: 'monospace', paddingTop: '8px' }} />

              {/* Area for Sales Volume */}
              <Area
                yAxisId="left"
                type="monotone"
                dataKey="salesCount"
                name="Daily Sales Count"
                fill="#10b981"
                stroke="#10b981"
                fillOpacity={0.2}
              />

              {/* Bar for Projected Revenue */}
              <Bar
                yAxisId="right"
                dataKey="projectedRevenueGbp"
                name="Projected Revenue (£)"
                fill="#6366f1"
                radius={[4, 4, 0, 0]}
                opacity={0.8}
              />

              {/* Line for Conversion Trend */}
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="conversionRate"
                name="Social Conv. Rate (%)"
                stroke="#f59e0b"
                strokeWidth={2}
                dot={{ r: 3, fill: '#f59e0b' }}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 pt-1 border-t border-slate-800">
          <span>⚡ Real-Time Recharts telemetry mapping 1p - 10p conversion loops</span>
          {onOpen24hChallenge && (
            <button
              onClick={onOpen24hChallenge}
              className="text-emerald-400 hover:underline flex items-center gap-1 font-bold"
            >
              <span>Launch 24h Challenge Post</span>
              <ArrowUpRight className="w-3 h-3" />
            </button>
          )}
        </div>
      </div>

    </div>
  );
};
