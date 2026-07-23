import React, { useState } from 'react';
import { Rocket, CheckCircle2, ChevronRight, Copy, Loader2, Globe, Server, Code2, Play } from 'lucide-react';

export const DeploymentWizard: React.FC = () => {
  const [step, setStep] = useState<number>(1);
  const [isDeploying, setIsDeploying] = useState(false);
  const [deployResult, setDeployResult] = useState<{ status: 'success' | 'error', message: string, logs?: string } | null>(null);
  
  const webhookUrl = "https://linacre.site/api/webhooks/sale";

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  const handleDeploy = async () => {
    setIsDeploying(true);
    setDeployResult(null);
    try {
      const response = await fetch('/api/firebase/deploy', { method: 'POST' });
      const data = await response.json();
      if (response.ok && data.status === 'success') {
        setDeployResult({ status: 'success', message: data.message, logs: data.logs });
        setStep(4);
      } else {
        setDeployResult({ status: 'error', message: data.message || 'Deployment failed', logs: data.logs });
      }
    } catch (e: any) {
      setDeployResult({ status: 'error', message: 'Failed to connect to deployment server.', logs: e.message });
    } finally {
      setIsDeploying(false);
    }
  };

  return (
    <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 md:p-10 max-w-4xl mx-auto shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
      
      <div className="relative z-10 flex flex-col md:flex-row items-center gap-4 mb-8 border-b border-slate-800 pb-6">
        <div className="p-4 bg-emerald-500/10 rounded-2xl border border-emerald-500/20">
          <Rocket className="w-8 h-8 text-emerald-400" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Deploy & Go Live Wizard</h2>
          <p className="text-sm text-slate-400">Connect your Payhip store and launch linacre.site directly from this panel.</p>
        </div>
      </div>

      <div className="flex gap-4 md:gap-8 relative z-10 flex-col md:flex-row">
        {/* Steps Sidebar */}
        <div className="md:w-64 space-y-2">
          <StepIndicator current={step} target={1} title="1. Payhip Products" desc="Add checkout links" />
          <StepIndicator current={step} target={2} title="2. Webhooks" desc="Link your sales data" />
          <StepIndicator current={step} target={3} title="3. Deploy" desc="Push to linacre.site" />
          <StepIndicator current={step} target={4} title="4. Live!" desc="Start receiving traffic" />
        </div>

        {/* Content Area */}
        <div className="flex-1 bg-slate-950/50 rounded-2xl border border-slate-800 p-6 min-h-[400px]">
          {step === 1 && (
            <div className="space-y-6 animate-fadeIn">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Globe className="w-5 h-5 text-indigo-400" />
                Prepare Payhip Products
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Before deploying, ensure your 8 products from the Mega Bundle are listed on Payhip. 
                Go to Payhip, click "Add new product", upload your PDF, and copy the Checkout Link for each.
              </p>
              
              <div className="p-4 bg-indigo-500/10 border border-indigo-500/20 rounded-xl space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-bold text-indigo-300">Update `src/data/hustles.ts` (Optional)</h4>
                    <p className="text-xs text-indigo-400/80">If you want your "Buy Now" buttons in the app to go straight to Payhip, paste your Payhip product URLs into the code data files before deploying.</p>
                  </div>
                </div>
              </div>
              
              <button onClick={() => setStep(2)} className="mt-8 bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all">
                I've added my products <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6 animate-fadeIn">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Server className="w-5 h-5 text-purple-400" />
                Connect Sales Webhooks
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Your API key is successfully integrated. Now tell Payhip to send live sales events to your new backend so your Revenue Tracker updates instantly.
              </p>
              
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase">Your Endpoint URL</label>
                  <div className="flex items-center gap-2 mt-1">
                    <code className="flex-1 bg-slate-900 border border-slate-700 p-3 rounded-xl text-emerald-400 font-mono text-sm">
                      {webhookUrl}
                    </code>
                    <button onClick={() => handleCopy(webhookUrl)} className="p-3 bg-slate-800 hover:bg-slate-700 rounded-xl border border-slate-700 transition-colors">
                      <Copy className="w-5 h-5 text-slate-300" />
                    </button>
                  </div>
                </div>
                
                <ul className="text-sm text-slate-400 space-y-2 list-decimal list-inside pl-2">
                  <li>Go to <strong>Settings  Developer</strong> in Payhip.</li>
                  <li>Paste this URL under <strong>Webhook Endpoint</strong>.</li>
                  <li>Select the <strong>paid</strong> event.</li>
                  <li>Click Save.</li>
                </ul>
              </div>
              
              <div className="flex gap-3 pt-4">
                <button onClick={() => setStep(1)} className="px-4 py-3 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 text-sm font-bold">Back</button>
                <button onClick={() => setStep(3)} className="bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all">
                  Webhook Configured <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6 animate-fadeIn">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Code2 className="w-5 h-5 text-amber-400" />
                Build & Deploy to linacre.site
              </h3>
              <p className="text-sm text-slate-400">
                You are ready. Clicking this button will bundle your React app and deploy it instantly.
              </p>
              
              <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl flex flex-col items-center justify-center text-center space-y-4">
                <button 
                  onClick={handleDeploy}
                  disabled={isDeploying}
                  className="w-full max-w-sm py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl font-bold text-lg flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-indigo-600/30 transition-all"
                >
                  {isDeploying ? (
                    <><Loader2 className="w-6 h-6 animate-spin" /> Deploying...</>
                  ) : (
                    <><Play className="w-6 h-6 fill-white" /> 1-Click Launch</>
                  )}
                </button>
                <p className="text-xs text-slate-500 font-mono">Runs `npm run build` and `firebase deploy`</p>
              </div>

              {deployResult?.status === 'error' && (
                <div className="p-4 bg-rose-500/10 border border-rose-500/20 rounded-xl">
                  <h4 className="text-sm font-bold text-rose-400 mb-2">Deployment Failed</h4>
                  <p className="text-xs text-rose-300">{deployResult.message}</p>
                  {deployResult.logs && (
                    <pre className="mt-2 p-3 bg-slate-950 rounded-lg text-[10px] text-rose-200/70 overflow-x-auto">
                      {deployResult.logs}
                    </pre>
                  )}
                </div>
              )}
              
              <div className="flex gap-3 pt-4">
                <button onClick={() => setStep(2)} disabled={isDeploying} className="px-4 py-3 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 text-sm font-bold">Back</button>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-6 animate-fadeIn text-center py-8">
              <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-10 h-10 text-emerald-400" />
              </div>
              <h3 className="text-2xl font-bold text-white">You're Live!</h3>
              <p className="text-slate-400 max-w-md mx-auto">
                SideHustle Studio is successfully deployed. Your store is now active and ready to accept real payments via Payhip.
              </p>

              <div className="flex justify-center gap-4 pt-6">
                <a href="https://linacre.site" target="_blank" rel="noreferrer" className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold flex items-center gap-2">
                  Visit linacre.site <Globe className="w-4 h-4" />
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const StepIndicator = ({ current, target, title, desc }: { current: number, target: number, title: string, desc: string }) => {
  const isPast = current > target;
  const isCurrent = current === target;
  return (
    <div className={`p-4 rounded-xl border transition-all ${isCurrent ? 'bg-slate-800 border-indigo-500/50' : isPast ? 'bg-slate-900 border-emerald-500/30' : 'bg-transparent border-slate-800/50 opacity-50'}`}>
      <div className="flex items-center gap-3">
        {isPast ? <CheckCircle2 className="w-5 h-5 text-emerald-400" /> : <div className={`w-5 h-5 rounded-full border-2 ${isCurrent ? 'border-indigo-400' : 'border-slate-600'}`} />}
        <div>
          <h4 className={`text-sm font-bold ${isCurrent ? 'text-indigo-300' : isPast ? 'text-slate-300' : 'text-slate-500'}`}>{title}</h4>
          <p className="text-[11px] text-slate-500">{desc}</p>
        </div>
      </div>
    </div>
  );
};
