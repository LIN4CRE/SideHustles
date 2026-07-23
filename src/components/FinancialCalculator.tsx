import React, { useState } from 'react';
import { SideHustle } from '../types';
import { X, TrendingUp, DollarSign, Bot, Clock, ArrowRight, ShieldCheck } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts';

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

  const [targetIncomeGoal, setTargetIncomeGoal] = useState<number>(10000);

  const chartData = hustles.map((h) => ({
    name: h.title.split(' ')[0] + ' ' + (h.title.split(' ')[1] || ''),
    'Monthly Profit ($)': h.monthlyRevenuePotential,
    'Automation Score (%)': h.automationScore,
    'Weekly Effort (hrs)': h.weeklyHoursNeeded * 10 // scaled for visibility
  }));

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-4xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden my-auto">
        
        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-emerald-400" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Side Hustle Profitability & Automation Matrix</h3>
              <p className="text-xs text-slate-400">Compare startup capital, net margins, and automation potential</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
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

        </div>

      </div>
    </div>
  );
};
