import React, { useState } from 'react';
import { SideHustle } from '../types';
import { X, Sparkles, Copy, Check, Loader2, Layers, Send } from 'lucide-react';

interface AssetGeneratorModalProps {
  isOpen: boolean;
  onClose: () => void;
  hustles: SideHustle[];
}

export const AssetGeneratorModal: React.FC<AssetGeneratorModalProps> = ({
  isOpen,
  onClose,
  hustles
}) => {
  if (!isOpen) return null;

  const [selectedHustleId, setSelectedHustleId] = useState<string>(hustles[0]?.id || '');
  const [assetType, setAssetType] = useState<string>('Cold Email Pitch Sequence');
  const [customPrompt, setCustomPrompt] = useState<string>('');

  const [generatedContent, setGeneratedContent] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const ASSET_TYPES = [
    'Cold Email Pitch Sequence',
    'LinkedIn/X Viral Content Thread Batch',
    'Landing Page Hero & Benefits Copy',
    'Zapier/Make Automation Workflow Spec',
    'High-Converting Meta/Google Ad Copy',
    'Sales Objection Handling Matrix'
  ];

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    const hustle = hustles.find((h) => h.id === selectedHustleId);
    if (!hustle) return;

    setIsGenerating(true);
    setError(null);
    setGeneratedContent(null);

    try {
      const response = await fetch('/api/generate-asset', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          hustleTitle: hustle.title,
          assetType,
          customPrompt
        })
      });

      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to generate asset');
      }

      setGeneratedContent(data.content);
    } catch (err: any) {
      console.error('Error generating asset:', err);
      setError(err.message || 'Error generating copy asset');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = () => {
    if (!generatedContent) return;
    navigator.clipboard.writeText(generatedContent);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden my-auto">
        
        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center">
              <Sparkles className="w-4 h-4 fill-amber-400" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">On-Demand AI Copy & Automation Writer</h3>
              <p className="text-xs text-slate-400">Generate high-converting marketing & outreach assets for any hustle</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          <form onSubmit={handleGenerate} className="space-y-4">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Select Side Hustle</label>
                <select
                  value={selectedHustleId}
                  onChange={(e) => setSelectedHustleId(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                >
                  {hustles.map((h) => (
                    <option key={h.id} value={h.id}>
                      {h.title} (${h.monthlyRevenuePotential}/mo)
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Asset Type</label>
                <select
                  value={assetType}
                  onChange={(e) => setAssetType(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                >
                  {ASSET_TYPES.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Optional Custom Angle or Target Niche</label>
              <input
                type="text"
                value={customPrompt}
                onChange={(e) => setCustomPrompt(e.target.value)}
                placeholder="e.g. Target real estate brokers in Florida, focus on zero upfront cost..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
              />
            </div>

            <button
              type="submit"
              disabled={isGenerating}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-indigo-600 hover:from-amber-400 hover:to-indigo-500 text-slate-950 font-bold text-xs shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Drafting Custom Asset...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 fill-slate-950" />
                  <span>Generate AI Asset</span>
                </>
              )}
            </button>
          </form>

          {/* Error display */}
          {error && (
            <div className="p-3 bg-rose-950/40 border border-rose-800/50 rounded-xl text-xs text-rose-300">
              {error}
            </div>
          )}

          {/* Output Display */}
          {generatedContent && (
            <div className="space-y-3 pt-3 border-t border-slate-800">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-amber-400" />
                  Generated {assetType}
                </span>

                <button
                  onClick={handleCopy}
                  className="px-2.5 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs flex items-center gap-1 transition-all"
                >
                  {isCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{isCopied ? 'Copied' : 'Copy Code/Text'}</span>
                </button>
              </div>

              <pre className="text-xs text-slate-300 bg-slate-950 border border-slate-800 p-4 rounded-xl max-h-72 overflow-y-auto whitespace-pre-wrap font-sans leading-relaxed">
                {generatedContent}
              </pre>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
