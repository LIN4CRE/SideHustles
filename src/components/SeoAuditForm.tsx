import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle, Loader2, Sparkles, Copy, Check, ExternalLink } from 'lucide-react';

export const SeoAuditForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [postcode, setPostcode] = useState('');
  const [url, setUrl] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [auditResult, setAuditResult] = useState<any>(null);
  const [copiedTitle, setCopiedTitle] = useState(false);
  const [copiedDesc, setCopiedDesc] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setAuditResult(null);

    try {
      // 1. Call AI Grounded SEO Audit API
      const res = await fetch('/api/seo-audit/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          businessName,
          locationOrPostcode: postcode,
          targetUrl: url,
          userEmail: email
        })
      });

      if (!res.ok) throw new Error('Failed to generate audit');
      const data = await res.json();
      
      if (data.success && data.audit) {
        setAuditResult(data.audit);
        setStatus('success');
      } else {
        throw new Error(data.error || 'Audit generation failed');
      }

      // 2. Optionally sync lead to Airtable in background if configured
      if ((import.meta as any).env.VITE_AIRTABLE_BASE_ID) {
        fetch(`https://api.airtable.com/v0/${(import.meta as any).env.VITE_AIRTABLE_BASE_ID}/Submissions`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${(import.meta as any).env.VITE_AIRTABLE_PAT}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            records: [{
              fields: {
                "User Email": email,
                "Business Name": businessName,
                "Postcode": postcode,
                "Target URL": url,
                "Status": "Pending",
                "Submission ID": `SUB-${Math.floor(Math.random() * 100000)}`
              }
            }]
          })
        }).catch(err => console.error('Airtable background sync error:', err));
      }

    } catch (error) {
      console.error(error);
      setStatus('error');
    }
  };

  const copyToClipboard = (text: string, isDesc: boolean) => {
    navigator.clipboard.writeText(text);
    if (isDesc) {
      setCopiedDesc(true);
      setTimeout(() => setCopiedDesc(false), 2000);
    } else {
      setCopiedTitle(true);
      setTimeout(() => setCopiedTitle(false), 2000);
    }
  };

  return (
    <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800 p-6 md:p-8 rounded-3xl relative overflow-hidden shadow-2xl">
      <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      
      <div className="relative z-10 flex flex-col gap-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/30 text-xs font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              <span>Grounded AI Business Audit Engine</span>
            </div>
            <h2 className="text-2xl font-bold text-white">Free Instant AI Business & Local SEO Audit</h2>
            <p className="text-xs md:text-sm text-slate-400">
              Enter any company name, postcode, or website. Our AI verifies your exact industry ground truth and generates high-converting Meta Tags.
            </p>
          </div>
        </div>

        {status === 'success' && auditResult ? (
          <div className="space-y-6 bg-slate-950/80 border border-slate-800 p-6 rounded-2xl animate-fade-in">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
              <div>
                <div className="inline-block bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold px-3 py-1 rounded-full mb-1">
                  Verified Industry: {auditResult.detectedIndustry}
                </div>
                <h3 className="text-xl font-bold text-white">{businessName || 'Business Audit Result'}</h3>
                {auditResult.verifiedAddress && (
                  <p className="text-xs text-slate-400">Location: {auditResult.verifiedAddress}</p>
                )}
              </div>
              <div className="flex items-center gap-3 bg-slate-900 px-4 py-2 rounded-xl border border-slate-800">
                <span className="text-xs text-slate-400 font-semibold uppercase">Health Score</span>
                <span className="text-2xl font-black text-emerald-400">{auditResult.overallHealthScore}/100</span>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-slate-400 uppercase">Recommended Title Tag</span>
                  <button 
                    onClick={() => copyToClipboard(auditResult.recommendedTitleTag, false)}
                    className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1 font-semibold"
                  >
                    {copiedTitle ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedTitle ? 'Copied!' : 'Copy'}</span>
                  </button>
                </div>
                <p className="text-sm font-semibold text-emerald-300 bg-slate-950 p-2.5 rounded-lg border border-slate-800 font-mono">
                  {auditResult.recommendedTitleTag}
                </p>
              </div>

              <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-slate-400 uppercase">Recommended Meta Description</span>
                  <button 
                    onClick={() => copyToClipboard(auditResult.recommendedMetaDescription, true)}
                    className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1 font-semibold"
                  >
                    {copiedDesc ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedDesc ? 'Copied!' : 'Copy'}</span>
                  </button>
                </div>
                <p className="text-xs text-slate-300 bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                  {auditResult.recommendedMetaDescription}
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase text-slate-400 tracking-wider">3 Local SEO Quick Wins</h4>
              <div className="grid md:grid-cols-3 gap-3">
                {auditResult.threeQuickWins?.map((win: string, idx: number) => (
                  <div key={idx} className="bg-slate-900/60 p-3 rounded-xl border border-slate-800 text-xs text-slate-300 flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{win}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-between items-center pt-2">
              <button 
                onClick={() => setStatus('idle')} 
                className="text-xs font-bold text-slate-400 hover:text-white underline"
              >
                ← Audit Another Business
              </button>
              <a 
                href="https://payhip.com/products" 
                target="_blank" 
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-xs font-bold text-indigo-300 hover:text-indigo-200 bg-indigo-600/20 border border-indigo-500/30 px-4 py-2 rounded-xl"
              >
                <span>Get Full Pro Automation Kit on Payhip</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Company / Business Name</label>
              <input 
                type="text" 
                required
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                placeholder="e.g. Bramblewood Garden Centre"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Postcode or City</label>
              <input 
                type="text" 
                required
                value={postcode}
                onChange={(e) => setPostcode(e.target.value)}
                placeholder="e.g. YO1 6AA or York"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Website URL (Optional)</label>
              <input 
                type="url" 
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://example.com"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Your Email Address</label>
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
              />
            </div>

            {status === 'error' && (
              <div className="md:col-span-2 flex items-center gap-2 text-rose-400 text-xs bg-rose-500/10 p-3 rounded-xl border border-rose-500/20">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>Failed to generate audit. Please verify inputs and try again.</span>
              </div>
            )}

            <div className="md:col-span-2 pt-2">
              <button 
                type="submit"
                disabled={status === 'loading'}
                className="w-full py-3.5 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl text-sm font-bold flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/25 transition-all"
              >
                {status === 'loading' ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-white" />
                    <span>Searching Web & Verifying Business Ground Truth...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-amber-300" />
                    <span>Generate Instant Ground-Truth AI Audit</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
