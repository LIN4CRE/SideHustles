import React, { useState } from 'react';
import { X, TrendingUp, Calculator, BarChart3, Sparkles, DollarSign } from 'lucide-react';

interface FinancialCalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FinancialCalculatorModal: React.FC<FinancialCalculatorModalProps> = ({
  isOpen,
  onClose
}) => {
  const [trafficPerDay, setTrafficPerDay] = useState<number>(500);
  const [conversionRate, setConversionRate] = useState<number>(2.5); // %
  const [productPrice, setProductPrice] = useState<number>(29);
  const [simulatedDays, setSimulatedDays] = useState<number>(30);
  const [simulationResults, setSimulationResults] = useState<{
    worstCase: number;
    expectedCase: number;
    bestCase: number;
    p90Confidence: number;
  } | null>(null);

  if (!isOpen) return null;

  // Task 16: Monte Carlo Statistical Simulator
  const runMonteCarloSimulation = () => {
    const iterations = 1000;
    const totals: number[] = [];

    for (let i = 0; i < iterations; i++) {
      let totalRevenue = 0;
      for (let day = 0; day < simulatedDays; day++) {
        // Apply random variance (+/- 25% traffic variance & conversion rate jitter)
        const dailyTraffic = Math.max(0, trafficPerDay * (0.75 + Math.random() * 0.5));
        const dailyConv = Math.max(0.1, (conversionRate / 100) * (0.8 + Math.random() * 0.4));
        const sales = Math.round(dailyTraffic * dailyConv);
        totalRevenue += sales * productPrice;
      }
      totals.push(totalRevenue);
    }

    totals.sort((a, b) => a - b);
    setSimulationResults({
      worstCase: Math.round(totals[Math.floor(iterations * 0.1)]),
      expectedCase: Math.round(totals[Math.floor(iterations * 0.5)]),
      bestCase: Math.round(totals[Math.floor(iterations * 0.9)]),
      p90Confidence: Math.round(totals[Math.floor(iterations * 0.85)])
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl animate-fadeIn">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/50">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Monte Carlo Sales Forecasting Simulator</h2>
              <p className="text-xs text-slate-400">Statistical 1,000-run simulation model for revenue projections</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-white rounded-lg transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-mono text-slate-400 block mb-1">Daily Traffic (Visitors)</label>
              <input
                type="number"
                value={trafficPerDay}
                onChange={(e) => setTrafficPerDay(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white text-sm focus:border-emerald-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-xs font-mono text-slate-400 block mb-1">Conversion Rate (%)</label>
              <input
                type="number"
                step="0.1"
                value={conversionRate}
                onChange={(e) => setConversionRate(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white text-sm focus:border-emerald-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-xs font-mono text-slate-400 block mb-1">Product Price (£/$)</label>
              <input
                type="number"
                value={productPrice}
                onChange={(e) => setProductPrice(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white text-sm focus:border-emerald-500 focus:outline-none"
              />
            </div>
          </div>

          <button
            onClick={runMonteCarloSimulation}
            className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm rounded-xl transition-all shadow-lg flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            <span>Run 1,000-Iteration Monte Carlo Simulation</span>
          </button>

          {simulationResults && (
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
                <span className="text-xs font-bold text-white uppercase font-mono">30-Day Simulation Projection</span>
                <span className="text-[11px] text-emerald-400 font-mono font-bold">1,000 Iterations Complete</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                <div className="p-3 bg-slate-900/80 border border-slate-800 rounded-xl">
                  <span className="text-[10px] text-slate-500 block uppercase font-mono">10th Percentile (Low)</span>
                  <span className="text-base font-bold text-rose-400">£{simulationResults.worstCase.toLocaleString()}</span>
                </div>
                <div className="p-3 bg-slate-900/80 border border-emerald-500/30 rounded-xl">
                  <span className="text-[10px] text-slate-400 block uppercase font-mono">Median (Expected)</span>
                  <span className="text-base font-bold text-emerald-300">£{simulationResults.expectedCase.toLocaleString()}</span>
                </div>
                <div className="p-3 bg-slate-900/80 border border-slate-800 rounded-xl">
                  <span className="text-[10px] text-slate-500 block uppercase font-mono">85% Confidence</span>
                  <span className="text-base font-bold text-indigo-300">£{simulationResults.p90Confidence.toLocaleString()}</span>
                </div>
                <div className="p-3 bg-slate-900/80 border border-slate-800 rounded-xl">
                  <span className="text-[10px] text-slate-500 block uppercase font-mono">90th Percentile (High)</span>
                  <span className="text-base font-bold text-amber-300">£{simulationResults.bestCase.toLocaleString()}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="px-6 py-3 bg-slate-950 border-t border-slate-800 flex justify-end">
          <button onClick={onClose} className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-xl">
            Close Simulator
          </button>
        </div>
      </div>
    </div>
  );
};
