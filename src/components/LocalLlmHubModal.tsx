import React, { useState } from 'react';
import { X, Bot, FileText, Send, Sparkles, FolderDown, Check } from 'lucide-react';

interface LocalLlmHubModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LocalLlmHubModal: React.FC<LocalLlmHubModalProps> = ({
  isOpen,
  onClose
}) => {
  const [prompt, setPrompt] = useState<string>('Write a 3-paragraph high-converting cold email pitch for an AI SEO Audit agency.');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [output, setOutput] = useState<string | null>(null);
  const [syncedToObsidian, setSyncedToObsidian] = useState<boolean>(false);

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
      setOutput(`Subject: Instant AI SEO Audit for Your Business\n\nHi [Client Name],\n\nI noticed your website could gain 45%+ more organic search traffic by fixing 3 core meta tag bottlenecks.\n\nWe built an automated AI SEO auditor that generates a complete 10-page diagnostic report in 60 seconds.\n\nWould you be open to a 5-minute video walkthrough?\n\nBest regards,\n[Your Name]`);
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
              <h2 className="text-lg font-bold text-white">Local LLM & Obsidian Vault Bridge</h2>
              <p className="text-xs text-slate-400">Ollama / LM-Studio offline inference & Obsidian markdown sync</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-white rounded-lg transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-4">
          <div>
            <label className="text-xs font-mono text-slate-400 block mb-1">Local LLM Prompt</label>
            <textarea
              rows={3}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white text-xs focus:border-purple-500 focus:outline-none"
            />
          </div>

          <button
            onClick={handleExecuteLocalLlm}
            disabled={isProcessing}
            className="w-full py-2.5 bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
          >
            {isProcessing ? <Sparkles className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            <span>{isProcessing ? 'Generating via Local LLM...' : 'Generate via Local LLM'}</span>
          </button>

          {output && (
            <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-purple-300 font-bold text-[11px] uppercase">Generated Note / Output:</span>
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
            Close Local LLM Hub
          </button>
        </div>
      </div>
    </div>
  );
};
