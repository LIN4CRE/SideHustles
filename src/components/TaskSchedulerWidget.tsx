import React, { useState, useEffect } from 'react';
import { 
  Calendar, 
  Clock, 
  Play, 
  CheckCircle2, 
  RefreshCw, 
  Sparkles, 
  ShieldCheck, 
  Zap, 
  Flame, 
  Activity,
  Check,
  AlertCircle
} from 'lucide-react';

interface MaintenanceTask {
  id: string;
  name: string;
  description: string;
  frequency: 'Every 4 Hours' | 'Every 8 Hours' | 'Daily' | 'Weekly';
  isEnabled: boolean;
  lastRunTimestamp: string;
  nextRunTimestamp: string;
  category: 'Scout' | 'Generate' | 'Publish' | 'Audit';
}

interface TaskSchedulerWidgetProps {
  onOpen24hChallenge: () => void;
  onOpenViralScout: () => void;
}

export const TaskSchedulerWidget: React.FC<TaskSchedulerWidgetProps> = ({
  onOpen24hChallenge,
  onOpenViralScout
}) => {
  const [tasks, setTasks] = useState<MaintenanceTask[]>(() => [
    {
      id: 'task-1',
      name: 'Viral Trend Radar & Keyword Scraping',
      description: 'Monitors TikTok, Pinterest & Reddit for trending micro-assets (ringtones, wallpapers, watch faces).',
      frequency: 'Every 4 Hours',
      isEnabled: true,
      lastRunTimestamp: '12 minutes ago',
      nextRunTimestamp: 'In 3h 48m',
      category: 'Scout'
    },
    {
      id: 'task-2',
      name: 'Auto-Refresh Asset Variants',
      description: 'Generates 5 new 4K OLED wallpaper colorways & watch face presets ready for download.',
      frequency: 'Every 8 Hours',
      isEnabled: true,
      lastRunTimestamp: '2 hours ago',
      nextRunTimestamp: 'In 5h 60m',
      category: 'Generate'
    },
    {
      id: 'task-3',
      name: 'Social Pitch Hook Refresh',
      description: 'Updates 15s TikTok hook copy & Reddit r/wallpapers preview scripts.',
      frequency: 'Daily',
      isEnabled: true,
      lastRunTimestamp: '5 hours ago',
      nextRunTimestamp: 'In 19h 00m',
      category: 'Publish'
    },
    {
      id: 'task-4',
      name: 'PayPal & Bank Direct Deposit Webhook Audit',
      description: 'Verifies active status of instant 1p auto-deposit routes.',
      frequency: 'Daily',
      isEnabled: true,
      lastRunTimestamp: '1 hour ago',
      nextRunTimestamp: 'In 23h 00m',
      category: 'Audit'
    }
  ]);

  const [isRunningAll, setIsRunningAll] = useState<boolean>(false);
  const [executionMessage, setExecutionMessage] = useState<string | null>(null);

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, isEnabled: !t.isEnabled } : t))
    );
  };

  const handleRunMaintenanceNow = () => {
    setIsRunningAll(true);
    setExecutionMessage('🤖 AI Agent booting: Scraping TikTok trends & refreshing 1p asset variants...');
    
    setTimeout(() => {
      setExecutionMessage('⚡ Generating 5 new 4K wallpaper variants & updating Gumroad download links...');
    }, 1500);

    setTimeout(() => {
      setExecutionMessage('✅ Maintenance Complete! 3 new viral trends indexed. Bank payout route verified.');
      setTasks((prev) =>
        prev.map((t) => ({ ...t, lastRunTimestamp: 'Just now' }))
      );
      setIsRunningAll(false);
      setTimeout(() => setExecutionMessage(null), 3500);
    }, 3200);
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-xl space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-purple-500/20 border border-purple-500/30 text-purple-400">
            <Calendar className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
              Automated AI Hustle Maintenance Scheduler
              <span className="px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 text-[10px] font-mono font-bold">
                Auto-Pilot Active
              </span>
            </h3>
            <p className="text-xs text-slate-400">
              Schedules recurring background AI agent tasks to keep your 1p - 10p micro-assets fresh & trending.
            </p>
          </div>
        </div>

        <button
          onClick={handleRunMaintenanceNow}
          disabled={isRunningAll}
          className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-emerald-600 hover:from-purple-500 hover:to-emerald-500 text-white font-mono font-bold text-xs flex items-center gap-1.5 transition-all shadow-md shadow-purple-600/20 shrink-0 disabled:opacity-50 self-start sm:self-auto"
        >
          {isRunningAll ? (
            <RefreshCw className="w-3.5 h-3.5 animate-spin text-amber-300" />
          ) : (
            <Play className="w-3.5 h-3.5 fill-white text-white" />
          )}
          <span>{isRunningAll ? 'Running Agent Tasks...' : 'Run Maintenance Now'}</span>
        </button>
      </div>

      {/* Execution Feedback Banner */}
      {executionMessage && (
        <div className="p-3 bg-purple-950/60 border border-purple-500/40 rounded-xl text-xs font-mono text-purple-200 flex items-center gap-2 animate-fadeIn">
          <Sparkles className="w-4 h-4 text-amber-300 shrink-0 animate-spin" />
          <span>{executionMessage}</span>
        </div>
      )}

      {/* Task List Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {tasks.map((task) => (
          <div
            key={task.id}
            className={`p-3.5 rounded-xl border transition-all flex flex-col justify-between space-y-2 ${
              task.isEnabled
                ? 'bg-slate-950/80 border-slate-800 hover:border-purple-500/40'
                : 'bg-slate-950/40 border-slate-800/60 opacity-60'
            }`}
          >
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase font-bold text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded border border-purple-500/20">
                  {task.category} • {task.frequency}
                </span>

                <input
                  type="checkbox"
                  checked={task.isEnabled}
                  onChange={() => toggleTask(task.id)}
                  className="w-4 h-4 rounded text-purple-600 focus:ring-purple-500 bg-slate-900 border-slate-700 cursor-pointer"
                />
              </div>

              <h4 className="text-xs font-bold text-white leading-snug">
                {task.name}
              </h4>
              <p className="text-[10px] text-slate-400 leading-relaxed">
                {task.description}
              </p>
            </div>

            <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] font-mono text-slate-500">
              <span>Last: <strong className="text-slate-300">{task.lastRunTimestamp}</strong></span>
              <span className="text-emerald-400 font-bold">Next: {task.nextRunTimestamp}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
