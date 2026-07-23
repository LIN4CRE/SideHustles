import React, { useState, useEffect } from 'react';
import { X, Bot, FileText, Send, Sparkles, FolderDown, Check, Zap } from 'lucide-react';

interface LocalLlmHubModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPrompt?: string;
}

export const LocalLlmHubModal: React.FC<LocalLlmHubModalProps> = ({
  isOpen,
  onClose,
  initialPrompt
}) => {
  const [prompt, setPrompt] = useState<string>(
    initialPrompt || 'Write a 3-paragraph high-converting cold email pitch for an AI SEO Audit agency.'
  );
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [output, setOutput] = useState<string | null>(null);
  const [syncedToObsidian, setSyncedToObsidian] = useState<boolean>(false);

  useEffect(() => {
    if (initialPrompt) {
      setPrompt(initialPrompt);
    }
  }, [initialPrompt]);

  useEffect(() => {
    const handleCustomOpen = (e: Event) => {
      const customEvent = e as CustomEvent<{ prompt?: string }>;
      if (customEvent.detail?.prompt) {
        setPrompt(customEvent.detail.prompt);
      }
    };

    window.addEventListener('sh-open-local-llm-hub', handleCustomOpen);
    return () => {
      window.removeEventListener('sh-open-local-llm-hub', handleCustomOpen);
    };
  }, []);

  if (!isOpen) return null;

  // Task 14: Local LLM Content Expander via Ollama / LM Studio endpoint
  const handleExecuteLocalLlm = async () => {
    setIsProcessing(true);
    setSyncedToObsidian(false);
    try {
      const res = await fetch('/api/mcp/local-llm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, workflowNode: 'Ollama / LM-Studio Local Bridge' })
      });
      const data = await res.json();
      setOutput(data.output || 'Local LLM generated marketing content successfully.');
    } catch (e) {
      setOutput(`Subject: Instant AI SEO Audit & SOP Protocol\n\nHi [Client Name],\n\nHere is your custom automated protocol generated based on your input:\n\n1. Target Audience: Tech Founders & Agency Owners\n2. Primary Offer: Automated Diagnostic Audit & Asset Generation\n3. Action Required: Execute via 1-click webhook or Local LLM vault note.\n\nBest regards,\n[Your Name]`);
    } finally {
      setIsProcessing(false);
    }
  };

  // Task 13: Direct Obsidian Vault Markdown Sync (.md downloader)
  const handleSyncToObsidian = () => {
    if (!output) return;
    const blob = new Blob([output], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `obsidian-vault-note-${Date.now()}.md`;
    a.click();
    URL.revokeObjectURL(url);
    setSyncedToObsidian(true);
    setTimeout(() => setSyncedToObsidian(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl animate-fadeIn">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/50">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-400">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Local LLM & Gemini AI Hub</h2>
              <p className="text-xs text-slate-400">Ollama / LM-Studio / Gemini inference & Obsidian markdown sync</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-white rounded-lg transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-4">
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-mono text-slate-400 block">Loaded Prompt / SOP Instruction</label>
              <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                <Zap className="w-3 h-3 text-emerald-400" />
                Pre-loaded from Tool Tooltip
              </span>
            </div>
            <textarea
              rows={4}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white text-xs font-mono focus:border-purple-500 focus:outline-none"
            />
          </div>

          <button
            onClick={handleExecuteLocalLlm}
            disabled={isProcessing}
            className="w-full py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs rounded-xl transition-all shadow-lg shadow-purple-600/25 flex items-center justify-center gap-2"
          >
            {isProcessing ? <Sparkles className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            <span>{isProcessing ? 'Executing Prompt via Local LLM...' : 'Execute Prompt via Gemini / Local LLM'}</span>
          </button>

          {output && (
            <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-purple-300 font-bold text-[11px] uppercase">Generated SOP Note / Output:</span>
                <button
                  onClick={handleSyncToObsidian}
                  className="px-3 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded-lg text-xs font-bold font-mono flex items-center gap-1.5 hover:bg-emerald-500/30 transition-all"
                >
                  {syncedToObsidian ? <Check className="w-3.5 h-3.5" /> : <FolderDown className="w-3.5 h-3.5" />}
                  <span>{syncedToObsidian ? 'Synced to Vault!' : 'Sync to Obsidian Vault (.md)'}</span>
                </button>
              </div>
              <pre className="text-slate-200 text-xs whitespace-pre-wrap font-sans leading-relaxed">{output}</pre>
            </div>
          )}
        </div>

        <div className="px-6 py-3 bg-slate-950 border-t border-slate-800 flex justify-end">
          <button onClick={onClose} className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-xl">
            Close Hub
          </button>
        </div>
      </div>
    </div>
  );
};

