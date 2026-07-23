import React, { useState } from 'react';
import { SideHustle } from '../types';
import { X, TrendingUp, DollarSign, Bot, Clock, ArrowRight, ShieldCheck, BarChart3, LineChart, Sparkles } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend, AreaChart, Area } from 'recharts';

interface FinancialCalculatorProps {
  isOpen: boolean;
  onClose: () => void;
  hustles: SideHustle[];
  onSelectHustle: (hustle: SideHustle) => void;
}

export const FinancialCalculator: React.FC<FinancialCalculatorProps> = ({
  isOpen,
  onClose,
  hustles,
  onSelectHustle
}) => {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState<'matrix' | 'predictive'>('matrix');
  const [targetIncomeGoal, setTargetIncomeGoal] = useState<number>(10000);

  // Predictive P&L State
  const [selectedPnlHustleId, setSelectedPnlHustleId] = useState<string>(hustles[0]?.id || '');
  const selectedPnlHustle = hustles.find(h => h.id === selectedPnlHustleId) || hustles[0];

  const [unitPrice, setUnitPrice] = useState<number>(selectedPnlHustle?.defaultEconomics.pricePerUnit || 150);
  const [variableCostPerUnit, setVariableCostPerUnit] = useState<number>(selectedPnlHustle?.defaultEconomics.fulfillmentCostPerUnit || 15);
  const [monthlyAdSpend, setMonthlyAdSpend] = useState<number>(250);
  const [fixedSoftwareCosts, setFixedSoftwareCosts] = useState<number>(selectedPnlHustle?.defaultEconomics.monthlyOperatingCost || 45);
  const [initialMonthlySales, setInitialMonthlySales] = useState<number>(8);
  const [monthlyGrowthRate, setMonthlyGrowthRate] = useState<number>(15); // %

  // Update defaults when hustle selection changes in P&L tab
  const handlePnlHustleChange = (id: string) => {
    setSelectedPnlHustleId(id);
    const h = hustles.find(item => item.id === id);
    if (h) {
      setUnitPrice(h.defaultEconomics.pricePerUnit);
      setVariableCostPerUnit(h.defaultEconomics.fulfillmentCostPerUnit);
      setFixedSoftwareCosts(h.defaultEconomics.monthlyOperatingCost);
    }
  };

  // Generate 12-Month Predictive P&L Projection Data
  const pnlProjections = Array.from({ length: 12 }, (_, idx) => {
    const month = idx + 1;
    const unitsSold = Math.round(initialMonthlySales * Math.pow(1 + monthlyGrowthRate / 100, idx));
    const grossRevenue = unitsSold * unitPrice;
    const totalVariableCosts = unitsSold * variableCostPerUnit;
    const totalMonthlyCosts = totalVariableCosts + monthlyAdSpend + fixedSoftwareCosts;
    const netProfit = grossRevenue - totalMonthlyCosts;

    return {
      month: `M${month}`,
      Units: unitsSold,
      Revenue: grossRevenue,
      Expenses: totalMonthlyCosts,
      'Net Profit': netProfit
    };
  });

  const netProfit6Months = pnlProjections.slice(0, 6).reduce((acc, curr) => acc + curr['Net Profit'], 0);
  const netProfit12Months = pnlProjections.reduce((acc, curr) => acc + curr['Net Profit'], 0);
  const totalRevenue12Months = pnlProjections.reduce((acc, curr) => acc + curr.Revenue, 0);

  const chartData = hustles.map((h) => ({
    name: h.title.split(' ')[0] + ' ' + (h.title.split(' ')[1] || ''),
    'Monthly Profit ($)': h.monthlyRevenuePotential,
    'Automation Score (%)': h.automationScore,
    'Weekly Effort (hrs)': h.weeklyHoursNeeded * 10
  }));

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-4xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden my-auto">
        
        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-950/60">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-emerald-400" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Financial & Predictive P&L Engine</h3>
              <p className="text-xs text-slate-400">Analyze profit margins, variable ad spend, and 6–12 month net projections</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Tab Switches */}
            <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
              <button
                onClick={() => setActiveTab('matrix')}
                className={`px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 transition-all ${
                  activeTab === 'matrix' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <BarChart3 className="w-3.5 h-3.5" />
                <span>Matrix & Comparison</span>
              </button>

              <button
                onClick={() => setActiveTab('predictive')}
                className={`px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 transition-all ${
                  activeTab === 'predictive' ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <LineChart className="w-3.5 h-3.5 text-emerald-300" />
                <span>Predictive P&L (6-12 Mo)</span>
              </button>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          
          {/* Ground Truth Banner */}
          <div className="bg-gradient-to-r from-emerald-950/80 via-slate-950 to-indigo-950/80 p-3.5 rounded-xl border border-emerald-500/30 flex items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span className="text-slate-300">
                <strong className="text-emerald-300">Ground Truth Principle:</strong> Monthly profits are scaled goals reached after 30-90 days. Week 1 realistic income starts at <strong className="text-white">0p to £25</strong> while warming domains, listing services, and sending direct pitches.
              </span>
            </div>
          </div>

          {activeTab === 'matrix' ? (
            <>
              {/* Target Slider */}
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-xs font-bold text-white block">Monthly Income Target</span>
                  <span className="text-xs text-slate-400">Filter required client counts across concepts</span>
                </div>
                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min={2000}
                    max={30000}
                    step={1000}
                    value={targetIncomeGoal}
                    onChange={(e) => setTargetIncomeGoal(Number(e.target.value))}
                    className="w-48 accent-indigo-500 bg-slate-800 h-2 rounded-lg cursor-pointer"
                  />
                  <span className="text-sm font-bold text-emerald-400 font-mono w-20 text-right">
                    ${targetIncomeGoal.toLocaleString()}/mo
                  </span>
                </div>
              </div>

              {/* Chart Comparison */}
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData} margin={{ top: 10, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                    <XAxis dataKey="name" stroke="#64748b" tick={{ fontSize: 10 }} />
                    <YAxis stroke="#64748b" />
                    <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#f8fafc' }} />
                    <Legend />
                    <Bar dataKey="Monthly Profit ($)" fill="#10b981" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="Automation Score (%)" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Comparison Table */}
              <div className="bg-slate-950 rounded-xl border border-slate-800 overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-300">
                  <thead className="bg-slate-900 border-b border-slate-800 text-[10px] uppercase font-mono text-slate-400">
                    <tr>
                      <th className="p-3">Side Hustle</th>
                      <th className="p-3">Startup Cost</th>
                      <th className="p-3">Week 1 Ground Truth</th>
                      <th className="p-3">Target Margin</th>
                      <th className="p-3">Monthly Profit</th>
                      <th className="p-3">Automation</th>
                      <th className="p-3">Clients Needed for Goal</th>
                      <th className="p-3 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {hustles.map((hustle) => {
                      const clientsNeeded = Math.ceil(targetIncomeGoal / hustle.defaultEconomics.pricePerUnit);
                      return (
                        <tr key={hustle.id} className="hover:bg-slate-900/50">
                          <td className="p-3 font-bold text-white">
                            {hustle.title}
                          </td>
                          <td className="p-3 text-slate-300 font-mono">
                            ${hustle.startupCost}
                          </td>
                          <td className="p-3 text-emerald-300 font-mono font-bold">
                            {hustle.realisticWeek1Earnings || '£0.00 - £25.00'}
                          </td>
                          <td className="p-3 text-emerald-400 font-bold">
                            {hustle.marginPercentage}%
                          </td>
                          <td className="p-3 text-indigo-300 font-bold font-mono">
                            ${hustle.monthlyRevenuePotential.toLocaleString()}
                          </td>
                          <td className="p-3 text-amber-400 font-mono">
                            {hustle.automationScore}%
                          </td>
                          <td className="p-3 font-mono text-slate-300">
                            {clientsNeeded} @ ${hustle.defaultEconomics.pricePerUnit}
                          </td>
                          <td className="p-3 text-right">
                            <button
                              onClick={() => {
                                onClose();
                                onSelectHustle(hustle);
                              }}
                              className="px-2.5 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-[11px] inline-flex items-center gap-1"
                            >
                              <span>Open Kit</span>
                              <ArrowRight className="w-3 h-3" />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </>
          ) : (
            /* PREDICTIVE P&L TAB */
            <div className="space-y-6">
              
              {/* Hustle Selection & Variable Inputs */}
              <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-3">
                  <div>
                    <h4 className="text-sm font-bold text-white flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-emerald-400" />
                      Predictive Cash Flow & Net Profit Forecaster
                    </h4>
                    <p className="text-xs text-slate-400">Customize unit price, variable ad spend, and growth rates</p>
                  </div>

                  <select
                    value={selectedPnlHustleId}
                    onChange={(e) => handlePnlHustleChange(e.target.value)}
                    className="bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white font-bold focus:outline-none"
                  >
                    {hustles.map(h => (
                      <option key={h.id} value={h.id}>{h.title}</option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
                  <div>
                    <label className="text-[10px] font-mono uppercase text-slate-400 block mb-1">Unit Price ($)</label>
                    <input
                      type="number"
                      value={unitPrice}
                      onChange={(e) => setUnitPrice(Number(e.target.value))}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1 text-xs text-emerald-400 font-bold font-mono"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-mono uppercase text-slate-400 block mb-1">Fulfillment Cost ($)</label>
                    <input
                      type="number"
                      value={variableCostPerUnit}
                      onChange={(e) => setVariableCostPerUnit(Number(e.target.value))}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1 text-xs text-rose-400 font-bold font-mono"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-mono uppercase text-slate-400 block mb-1">Monthly Ad Spend ($)</label>
                    <input
                      type="number"
                      value={monthlyAdSpend}
                      onChange={(e) => setMonthlyAdSpend(Number(e.target.value))}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1 text-xs text-amber-400 font-bold font-mono"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-mono uppercase text-slate-400 block mb-1">Software / Fixed ($)</label>
                    <input
                      type="number"
                      value={fixedSoftwareCosts}
                      onChange={(e) => setFixedSoftwareCosts(Number(e.target.value))}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1 text-xs text-slate-300 font-bold font-mono"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-mono uppercase text-slate-400 block mb-1">Month 1 Sales (Units)</label>
                    <input
                      type="number"
                      value={initialMonthlySales}
                      onChange={(e) => setInitialMonthlySales(Number(e.target.value))}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1 text-xs text-indigo-300 font-bold font-mono"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-mono uppercase text-slate-400 block mb-1">MoM Growth Rate (%)</label>
                    <input
                      type="number"
                      value={monthlyGrowthRate}
                      onChange={(e) => setMonthlyGrowthRate(Number(e.target.value))}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1 text-xs text-cyan-300 font-bold font-mono"
                    />
                  </div>
                </div>
              </div>

              {/* 6-Month vs 12-Month Summary Badges */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
                  <span className="text-[10px] font-mono uppercase text-slate-400">Projected 6-Month Cumulative Net Profit</span>
                  <span className={`text-xl font-extrabold font-mono block ${netProfit6Months >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                    ${netProfit6Months.toLocaleString()}
                  </span>
                  <span className="text-[11px] text-slate-400 block">First half net cashflow</span>
                </div>

                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
                  <span className="text-[10px] font-mono uppercase text-slate-400">Projected 12-Month Cumulative Net Profit</span>
                  <span className={`text-xl font-extrabold font-mono block ${netProfit12Months >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                    ${netProfit12Months.toLocaleString()}
                  </span>
                  <span className="text-[11px] text-slate-400 block">Full year net cashflow</span>
                </div>

                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
                  <span className="text-[10px] font-mono uppercase text-slate-400">12-Month Gross Revenue</span>
                  <span className="text-xl font-extrabold font-mono text-indigo-300 block">
                    ${totalRevenue12Months.toLocaleString()}
                  </span>
                  <span className="text-[11px] text-slate-400 block">Top-line cumulative sales</span>
                </div>
              </div>

              {/* Area Chart Visualization */}
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={pnlProjections} margin={{ top: 10, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                    <XAxis dataKey="month" stroke="#64748b" tick={{ fontSize: 10 }} />
                    <YAxis stroke="#64748b" />
                    <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#f8fafc' }} />
                    <Legend />
                    <Area type="monotone" dataKey="Revenue" stroke="#6366f1" fill="#6366f1" fillOpacity={0.15} />
                    <Area type="monotone" dataKey="Expenses" stroke="#f43f5e" fill="#f43f5e" fillOpacity={0.1} />
                    <Area type="monotone" dataKey="Net Profit" stroke="#10b981" fill="#10b981" fillOpacity={0.25} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              {/* Monthly Breakdown Table */}
              <div className="bg-slate-950 rounded-xl border border-slate-800 overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-300">
                  <thead className="bg-slate-900 border-b border-slate-800 text-[10px] uppercase font-mono text-slate-400">
                    <tr>
                      <th className="p-3">Month</th>
                      <th className="p-3">Units Sold</th>
                      <th className="p-3">Gross Revenue</th>
                      <th className="p-3">Total Expenses</th>
                      <th className="p-3">Net Profit</th>
                      <th className="p-3 text-right">Margin</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 font-mono">
                    {pnlProjections.map((row) => {
                      const marginPct = row.Revenue > 0 ? Math.round((row['Net Profit'] / row.Revenue) * 100) : 0;
                      return (
                        <tr key={row.month} className="hover:bg-slate-900/50">
                          <td className="p-3 font-bold text-white">{row.month}</td>
                          <td className="p-3 text-slate-300">{row.Units}</td>
                          <td className="p-3 text-indigo-300 font-bold">${row.Revenue.toLocaleString()}</td>
                          <td className="p-3 text-rose-400">-${row.Expenses.toLocaleString()}</td>
                          <td className={`p-3 font-bold ${row['Net Profit'] >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                            ${row['Net Profit'].toLocaleString()}
                          </td>
                          <td className="p-3 text-right font-bold text-slate-300">{marginPct}%</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
};
