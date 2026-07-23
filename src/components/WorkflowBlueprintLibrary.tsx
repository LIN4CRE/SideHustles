import React, { useState } from 'react';
import { SideHustle, ZapierBlueprintNode } from '../types';
import { SetupStepToolTooltip } from './SetupStepToolTooltip';
import { 
  Zap, 
  Webhook, 
  Bot, 
  Database, 
  Send, 
  CreditCard, 
  Clock, 
  Copy, 
  Check, 
  ArrowRight, 
  HelpCircle,
  Code,
  Layers,
  Sparkles,
  ExternalLink
} from 'lucide-react';

interface WorkflowBlueprintLibraryProps {
  hustle: SideHustle;
}

export const WorkflowBlueprintLibrary: React.FC<WorkflowBlueprintLibraryProps> = ({ hustle }) => {
  const blueprint = hustle.zapierBlueprint;
  const [selectedNodeId, setSelectedNodeId] = useState<string>(blueprint?.nodes[0]?.id || '');
  const [copiedNodeId, setCopiedNodeId] = useState<string | null>(null);

  if (!blueprint) {
    return (
      <div className="p-8 text-center bg-slate-950 rounded-xl border border-slate-800 space-y-2">
        <Zap className="w-8 h-8 text-amber-400 mx-auto" />
        <h4 className="text-sm font-bold text-white">Standard Automation Blueprint</h4>
        <p className="text-xs text-slate-400">Refer to the execution kit or standard workflow steps for tool integration details.</p>
      </div>
    );
  }

  const selectedNode = blueprint.nodes.find((n) => n.id === selectedNodeId) || blueprint.nodes[0];

  const getNodeIcon = (iconName: string) => {
    switch (iconName) {
      case 'Webhook': return <Webhook className="w-4 h-4 text-emerald-400" />;
      case 'Bot': return <Bot className="w-4 h-4 text-amber-400" />;
      case 'Database': return <Database className="w-4 h-4 text-indigo-400" />;
      case 'Send': return <Send className="w-4 h-4 text-cyan-400" />;
      case 'CreditCard': return <CreditCard className="w-4 h-4 text-purple-400" />;
      case 'Clock': return <Clock className="w-4 h-4 text-amber-300" />;
      default: return <Zap className="w-4 h-4 text-amber-400" />;
    }
  };

  const handleCopyPayload = (payload?: string, nodeId?: string) => {
    if (!payload || !nodeId) return;
    navigator.clipboard.writeText(payload);
    setCopiedNodeId(nodeId);
    setTimeout(() => setCopiedNodeId(null), 2000);
  };

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20">
              {blueprint.platform} Blueprint
            </span>
            <span className="text-xs font-bold text-white">{blueprint.blueprintName}</span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">{blueprint.description}</p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className="text-[11px] font-mono text-slate-400">
            {blueprint.nodes.length} Connected Modules
          </span>
        </div>
      </div>

      {/* Visual Node Chain Architecture */}
      <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-4">
        <span className="text-xs font-bold text-slate-300 uppercase tracking-wider font-mono block">
          Visual Integration Pipeline (Click Node to Inspect)
        </span>

        {/* Node Connection Flow */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 pt-1">
          {blueprint.nodes.map((node, idx) => {
            const isSelected = node.id === selectedNode?.id;
            const isTrigger = node.type === 'trigger';

            return (
              <React.Fragment key={node.id}>
                <button
                  onClick={() => setSelectedNodeId(node.id)}
                  className={`group relative p-3 rounded-xl border text-left shrink-0 w-48 transition-all ${
                    isSelected
                      ? 'bg-indigo-950/40 border-indigo-500 shadow-lg shadow-indigo-500/10 ring-1 ring-indigo-500/50'
                      : 'bg-slate-900/80 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-1.5">
                      {getNodeIcon(node.iconName)}
                      <span className="text-[10px] font-bold uppercase font-mono text-slate-400">
                        Step {idx + 1}
                      </span>
                    </div>

                    <span className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded ${
                      isTrigger 
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' 
                        : 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                    }`}>
                      {node.type.toUpperCase()}
                    </span>
                  </div>

                  <h5 className="text-xs font-bold text-white truncate">{node.toolName}</h5>
                  <p className="text-[10px] text-slate-400 truncate mt-0.5">{node.actionTitle}</p>
                </button>

                {idx < blueprint.nodes.length - 1 && (
                  <div className="flex items-center justify-center shrink-0 text-slate-600 px-1">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Selected Node Details Panel */}
      {selectedNode && (
        <div className="bg-slate-950 rounded-xl border border-slate-800 p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                {getNodeIcon(selectedNode.iconName)}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-bold text-white">{selectedNode.toolName} — {selectedNode.actionTitle}</h4>
                  <SetupStepToolTooltip stepText={`${selectedNode.toolName} ${selectedNode.actionTitle} ${selectedNode.description}`} hustleTitle={hustle.title} hustleCategory={hustle.category} />
                </div>
                <p className="text-xs text-slate-400 mt-0.5">{selectedNode.description}</p>
              </div>
            </div>

            {selectedNode.samplePayload && (
              <button
                onClick={() => handleCopyPayload(selectedNode.samplePayload, selectedNode.id)}
                className="px-2.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs flex items-center gap-1.5 transition-all"
              >
                {copiedNodeId === selectedNode.id ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedNodeId === selectedNode.id ? 'Copied Payload' : 'Copy Sample Payload'}</span>
              </button>
            )}
          </div>

          {/* Setup Tip & Code Payload */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Setup Tip */}
            {selectedNode.setupTip && (
              <div className="bg-slate-900 border border-slate-800 p-3.5 rounded-xl space-y-1.5">
                <span className="text-[11px] font-bold text-amber-400 flex items-center gap-1.5">
                  <HelpCircle className="w-3.5 h-3.5" />
                  Pro Integration Tip
                </span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {selectedNode.setupTip}
                </p>
              </div>
            )}

            {/* Platform instructions */}
            <div className="bg-slate-900 border border-slate-800 p-3.5 rounded-xl space-y-1.5">
              <span className="text-[11px] font-bold text-indigo-400 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5" />
                Connection Spec
              </span>
              <p className="text-xs text-slate-300 leading-relaxed">
                Connect via <strong className="text-white">{blueprint.platform}</strong> webhook triggers or native API apps. Ensures sub-2 second response latency.
              </p>
            </div>

          </div>

          {/* Sample JSON Payload View */}
          {selectedNode.samplePayload && (
            <div className="space-y-1.5">
              <span className="text-[10px] uppercase font-mono font-bold text-slate-400 flex items-center gap-1">
                <Code className="w-3 h-3 text-emerald-400" />
                Sample Webhook JSON Payload
              </span>
              <pre className="text-xs text-emerald-300 font-mono bg-slate-900 border border-slate-800/80 p-3.5 rounded-xl overflow-x-auto">
                {selectedNode.samplePayload}
              </pre>
            </div>
          )}

        </div>
      )}

    </div>
  );
};
