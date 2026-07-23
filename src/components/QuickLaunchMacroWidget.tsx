import React, { useState, useEffect } from 'react';
import { Play, Plus, Square, Trash2, Zap, Sparkles, Check, RefreshCw, Layers, Radio } from 'lucide-react';

export interface MacroAction {
  id: string;
  name: string;
  type: 'open_genai' | 'open_recipes' | 'open_challenge' | 'open_scout' | 'export_csv' | 'open_hub';
  description: string;
}

export interface MacroSequence {
  id: string;
  title: string;
  actions: MacroAction[];
  isCustom?: boolean;
  timesExecuted: number;
}

interface QuickLaunchMacroWidgetProps {
  onExecuteAction: (actionType: MacroAction['type']) => void;
}

const DEFAULT_MACROS: MacroSequence[] = [
  {
    id: 'macro-1',
    title: '🚀 1p Micro-Asset Blitz',
    timesExecuted: 42,
    actions: [
      { id: 'a1', name: 'Open GenAI Batch Studio', type: 'open_genai', description: 'Batch generate 4K OLED Wallpapers & Watch Faces' },
      { id: 'a2', name: 'View 24h Sales Challenge', type: 'open_challenge', description: 'Map sales telemetry against goal' }
    ]
  },
  {
    id: 'macro-2',
    title: '⚡ Full Automation Health Audit',
    timesExecuted: 19,
    actions: [
      { id: 'a3', name: 'Open Recipe Marketplace', type: 'open_recipes', description: 'Check n8n & Make JSON workflow blueprints' },
      { id: 'a4', name: 'Open Local LLM Hub', type: 'open_hub', description: 'Verify Ollama & LM Studio endpoint status' }
    ]
  },
  {
    id: 'macro-3',
    title: '📊 Export Portfolio & Scout Trends',
    timesExecuted: 31,
    actions: [
      { id: 'a5', name: 'Download CSV Execution Log', type: 'export_csv', description: 'Download offline inventory & execution history' },
      { id: 'a6', name: 'Launch Viral Asset Scout', type: 'open_scout', description: 'Check TikTok & Reddit demand scores' }
    ]
  }
];

export const QuickLaunchMacroWidget: React.FC<QuickLaunchMacroWidgetProps> = ({ onExecuteAction }) => {
  const [macros, setMacros] = useState<MacroSequence[]>(() => {
    try {
      const saved = localStorage.getItem('sh_quick_launch_macros');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return DEFAULT_MACROS;
  });

  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [recordingTitle, setRecordingTitle] = useState<string>('');
  const [recordedActions, setRecordedActions] = useState<MacroAction[]>([]);
  const [activeRunningId, setActiveRunningId] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem('sh_quick_launch_macros', JSON.stringify(macros));
    } catch (e) {
      console.error(e);
    }
  }, [macros]);

  const handleRunMacro = (macro: MacroSequence) => {
    setActiveRunningId(macro.id);
    
    // Increment count
    setMacros((prev) =>
      prev.map((m) => (m.id === macro.id ? { ...m, timesExecuted: m.timesExecuted + 1 } : m))
    );

    // Execute actions sequentially
    macro.actions.forEach((act, idx) => {
      setTimeout(() => {
        onExecuteAction(act.type);
        if (idx === macro.actions.length - 1) {
          setActiveRunningId(null);
        }
      }, idx * 600);
    });
  };

  const handleStartRecording = () => {
    if (!recordingTitle.trim()) return;
    setIsRecording(true);
    setRecordedActions([]);
  };

  const handleAddActionToRecording = (actionType: MacroAction['type'], actionName: string, description: string) => {
    if (!isRecording) return;
    const newAction: MacroAction = {
      id: `act-${Date.now()}-${Math.random()}`,
      name: actionName,
      type: actionType,
      description
    };
    setRecordedActions((prev) => [...prev, newAction]);
  };

  const handleSaveRecording = () => {
    if (recordedActions.length === 0) {
      setIsRecording(false);
      return;
    }

    const newMacro: MacroSequence = {
      id: `macro-custom-${Date.now()}`,
      title: `⚡ ${recordingTitle}`,
      actions: recordedActions,
      isCustom: true,
      timesExecuted: 0
    };

    setMacros((prev) => [newMacro, ...prev]);
    setIsRecording(false);
    setRecordingTitle('');
    setRecordedActions([]);
  };

  const handleDeleteMacro = (id: string) => {
    setMacros((prev) => prev.filter((m) => m.id !== id));
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shadow-xl space-y-3 font-mono">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-xl bg-amber-500/20 border border-amber-500/30 text-amber-400">
            <Zap className="w-4 h-4 fill-amber-400" />
          </div>
          <div>
            <h4 className="text-xs sm:text-sm font-bold text-white flex items-center gap-2">
              Quick Launch Macro Engine
              <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[9px] font-mono font-bold">
                1-Click Macros
              </span>
            </h4>
            <p className="text-[10px] text-slate-400 font-sans">
              Automate multi-step platform workflows with reusable recorded sequences.
            </p>
          </div>
        </div>

        {/* Record New Macro Button */}
        {!isRecording ? (
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={recordingTitle}
              onChange={(e) => setRecordingTitle(e.target.value)}
              placeholder="New Macro Name..."
              className="px-2.5 py-1 bg-slate-950 border border-slate-800 rounded-lg text-[11px] text-slate-200 focus:outline-none focus:ring-1 focus:ring-amber-500 hidden sm:block"
            />
            <button
              onClick={handleStartRecording}
              disabled={!recordingTitle.trim()}
              className="px-3 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-xs font-bold flex items-center gap-1.5 transition-all disabled:opacity-40"
            >
              <Radio className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
              <span>Record Macro</span>
            </button>
          </div>
        ) : (
          <button
            onClick={handleSaveRecording}
            className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-md shadow-emerald-600/30"
          >
            <Square className="w-3.5 h-3.5 fill-white" />
            <span>Save Macro ({recordedActions.length} Actions)</span>
          </button>
        )}
      </div>

      {/* Recording Steps Builder Banner if active */}
      {isRecording && (
        <div className="bg-amber-950/40 border border-amber-500/40 p-3 rounded-xl space-y-2 animate-pulse-subtle">
          <div className="flex items-center justify-between text-xs">
            <span className="text-amber-300 font-bold flex items-center gap-1.5">
              <Radio className="w-4 h-4 text-rose-500 animate-ping" />
              Recording: "{recordingTitle}"
            </span>
            <span className="text-[10px] text-slate-400">Click actions below to add to chain</span>
          </div>

          <div className="flex flex-wrap gap-1.5">
            <button
              onClick={() => handleAddActionToRecording('open_genai', 'GenAI Batch Studio', 'Generate AI Wallpapers')}
              className="px-2 py-1 rounded bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 text-[10px]"
            >
              + Add GenAI Studio
            </button>
            <button
              onClick={() => handleAddActionToRecording('open_recipes', 'Recipe Marketplace', 'Check n8n blueprints')}
              className="px-2 py-1 rounded bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 text-[10px]"
            >
              + Add Recipes
            </button>
            <button
              onClick={() => handleAddActionToRecording('open_challenge', '24h Sale Challenge', 'View revenue telemetry')}
              className="px-2 py-1 rounded bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 text-[10px]"
            >
              + Add 24h Challenge
            </button>
            <button
              onClick={() => handleAddActionToRecording('export_csv', 'CSV Log Export', 'Download execution inventory')}
              className="px-2 py-1 rounded bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 text-[10px]"
            >
              + Add CSV Export
            </button>
          </div>

          {recordedActions.length > 0 && (
            <div className="text-[10px] text-emerald-400 pt-1 border-t border-amber-500/20">
              Sequence: {recordedActions.map((a) => a.name).join(' ➔ ')}
            </div>
          )}
        </div>
      )}

      {/* Macro Sequence Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {macros.map((macro) => {
          const isRunning = activeRunningId === macro.id;

          return (
            <div
              key={macro.id}
              className="bg-slate-950 border border-slate-800 hover:border-amber-500/40 rounded-xl p-3 flex flex-col justify-between space-y-2 transition-all group"
            >
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <h5 className="text-xs font-bold text-white line-clamp-1">
                    {macro.title}
                  </h5>
                  {macro.isCustom && (
                    <button
                      onClick={() => handleDeleteMacro(macro.id)}
                      className="text-slate-600 hover:text-rose-400 p-0.5 rounded"
                      title="Delete macro"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  )}
                </div>

                <div className="space-y-1 pt-1">
                  {macro.actions.map((act, idx) => (
                    <div key={act.id} className="text-[10px] text-slate-400 flex items-center gap-1">
                      <span className="text-amber-400 font-bold">{idx + 1}.</span>
                      <span className="truncate">{act.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-2 border-t border-slate-900 flex items-center justify-between text-[10px] text-slate-500">
                <span>Runs: <strong className="text-slate-300">{macro.timesExecuted}</strong></span>

                <button
                  onClick={() => handleRunMacro(macro)}
                  disabled={isRunning}
                  className="px-2.5 py-1 rounded-lg bg-gradient-to-r from-amber-500 to-emerald-600 hover:from-amber-400 hover:to-emerald-500 text-slate-950 font-bold flex items-center gap-1 transition-all shadow-sm"
                >
                  {isRunning ? (
                    <RefreshCw className="w-3 h-3 animate-spin text-slate-950" />
                  ) : (
                    <Play className="w-3 h-3 fill-slate-950" />
                  )}
                  <span>{isRunning ? 'Running...' : 'Execute Macro'}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
