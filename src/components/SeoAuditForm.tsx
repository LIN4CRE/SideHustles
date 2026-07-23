import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

export const SeoAuditForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [url, setUrl] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch(`https://api.airtable.com/v0/${import.meta.env.VITE_AIRTABLE_BASE_ID}/Submissions`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_AIRTABLE_PAT}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          records: [
            {
              fields: {
                "User Email": email,
                "Target URL": url,
                "Status": "Pending",
                "Submission ID": `SUB-${Math.floor(Math.random() * 100000)}`
              }
            }
          ]
        })
      });

      if (!response.ok) throw new Error('Failed to submit');
      setStatus('success');
      setEmail('');
      setUrl('');
    } catch (error) {
      console.error(error);
      setStatus('error');
    }
  };

  return (
    <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 p-6 rounded-3xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
      
      <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center">
        <div className="flex-1 space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/30 text-xs font-semibold mb-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
            </span>
            <span>Airtable Connected</span>
          </div>
          <h2 className="text-2xl font-bold text-white">Get a Free SEO Meta Audit</h2>
          <p className="text-sm text-slate-400">
            Submit your website URL. Our team will review and optimize your Title Tags and Meta Descriptions for higher click-through rates.
          </p>
        </div>

        <div className="w-full md:w-[400px]">
          {status === 'success' ? (
            <div className="bg-emerald-500/10 border border-emerald-500/30 p-6 rounded-2xl text-center space-y-3">
              <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
              <h3 className="text-emerald-300 font-bold">Submission Received!</h3>
              <p className="text-xs text-emerald-400/80">Check your Airtable Kanban board to see it in the 'Pending' column.</p>
              <button onClick={() => setStatus('idle')} className="text-xs font-bold text-emerald-300 hover:text-white mt-2 underline">Submit another</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Email Address</label>
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Website URL</label>
                <input 
                  type="url" 
                  required
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://yourwebsite.com"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                />
              </div>
              
              {status === 'error' && (
                <div className="flex items-center gap-2 text-rose-400 text-xs bg-rose-500/10 p-2 rounded-lg border border-rose-500/20">
                  <AlertCircle className="w-4 h-4" />
                  <span>Failed to connect to Airtable. Please try again.</span>
                </div>
              )}

              <button 
                type="submit"
                disabled={status === 'loading'}
                className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl text-sm font-bold flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/20 transition-all"
              >
                {status === 'loading' ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Submit for Free Audit</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
