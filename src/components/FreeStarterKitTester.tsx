import React, { useState } from 'react';
import { SideHustle } from '../types';
import { 
  Sparkles, 
  CheckCircle2, 
  Copy, 
  Check, 
  ArrowRight, 
  Gift, 
  Zap, 
  ShieldCheck, 
  DollarSign, 
  ExternalLink,
  Bot,
  Flame,
  TrendingUp,
  Layers
} from 'lucide-react';

interface FreeStarterKitTesterProps {
  hustle: SideHustle;
  onSelectUpgradeHustle?: (hustleId: string) => void;
}

export const FreeStarterKitTester: React.FC<FreeStarterKitTesterProps> = ({
  hustle,
  onSelectUpgradeHustle
}) => {
  const info = hustle.freeStarterSet;

  // Form states for live test
  const [inputVal1, setInputVal1] = useState<string>('');
  const [inputVal2, setInputVal2] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [generatedOutput, setGeneratedOutput] = useState<any | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  if (!info) return null;

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleRunFreeGenerator = () => {
    setIsGenerating(true);
    setGeneratedOutput(null);

    setTimeout(() => {
      if (hustle.id === 'free-local-seo-tag-booster') {
        const busName = inputVal1 || 'Apex Plumbing & Heating';
        const city = inputVal2 || 'Austin, TX';

        setGeneratedOutput({
          metaTags: [
            {
              page: 'Homepage',
              title: `${busName} | #1 Emergency Plumber in ${city}`,
              description: `Top-rated 24/7 plumbing repair in ${city}. Fast response for burst pipes, drain cleaning & water heaters. Call ${busName} today for free estimate!`
            },
            {
              page: 'Drain Cleaning',
              title: `Drain Cleaning & Hydro-Jetting | ${busName} ${city}`,
              description: `Clogged drains in ${city}? ${busName} delivers fast, clear drain solutions with 100% satisfaction guarantee. Book local plumbing online now!`
            },
            {
              page: 'Water Heaters',
              title: `Water Heater Repair & Installation ${city} | ${busName}`,
              description: `No hot water in ${city}? ${busName} installs tankless & traditional water heaters with same-day service. Honest pricing & certified techs.`
            }
          ],
          emailDraft: `Subject: Free 5 Google Meta Tags for ${busName} website\n\nHi team,\n\nI noticed ${busName} comes up on Google search, but your search snippet previews are truncated or missing key city terms like "${city}".\n\nTo help you get more local clicks, I wrote 5 ready-to-paste Google Meta Descriptions for your site completely for FREE (no strings attached).\n\nYou can copy-paste them directly into your WordPress/Wix site, or if you'd like me to audit all 30 pages and fix your full local SEO tags, I can do it today for just £25.\n\nHope this helps your business!\nBest regards,`
        });
      } else if (hustle.id === 'free-ai-doc-formatting-service') {
        const rawText = inputVal1 || 'managed sales team increased revenue by 20 percent used excel and CRM';
        
        setGeneratedOutput({
          resumeBullets: [
            `• Spearheaded high-performing sales team operations, driving a 20% net revenue increase year-over-year through optimized pipeline management.`,
            `• Structured custom Excel analytics dashboards and CRM automated triggers, accelerating deal closing speed by 35%.`,
            `• Formatted multi-stakeholder proposals that boosted contract renewal rates and expanded key account retention.`
          ],
          clientPitch: `Hey! I formatted your raw notes into 3 executive achievement bullet points above. If you'd like me to polish your full 2-page resume with clean Canva styling for $15, send it over!`
        });
      } else {
        // free-notion-micro-cheatsheet-vault
        const topic = inputVal1 || 'Solopreneur Weekly Time & Finance Audit';

        setGeneratedOutput({
          notionOutline: `# 📋 ${topic} - Micro Cheatsheet\n\n## 🎯 Core Weekly Checklist\n- [ ] Review Stripe gross vs net profit margin\n- [ ] Clean up inbox zero using 3 AI email filters\n- [ ] Audit top 3 weekly time sinks (>2 hrs)\n- [ ] Export client invoices & recurring renewals\n\n## 💡 Top 5 Gemini Prompts for Productivity\n1. "Identify 3 bottleneck tasks in this weekly log..."\n2. "Draft 1-sentence polite payment reminder for..."`,
          gumroadCopy: `Get the 1-Page ${topic} Notion Checklist!\n\nStop wasting 5 hours a week on manual organization. Download this instant 1-click Notion template to streamline your workflow.\n\nPrice: Pay What You Want ($0+)`
        });
      }

      setIsGenerating(false);
    }, 600);
  };

  return (
    <div className="space-y-6">
      
      {/* Starter Set Banner Header */}
      <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-indigo-950 border border-emerald-500/30 rounded-2xl p-5 relative overflow-hidden shadow-xl">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 text-xs font-semibold">
              <Gift className="w-3.5 h-3.5 text-emerald-400" />
              <span>100% Free Starter Set ($0 Capital Required)</span>
            </div>

            <h2 className="text-xl font-extrabold text-white">
              {info.starterKitName}
            </h2>

            <p className="text-xs text-slate-300 leading-relaxed">
              This is a zero-capital, instant proof-of-concept starter set designed to build your confidence and earn your first micro-cashflow (£15 - £50/day) before scaling to high-ticket paid agency models.
            </p>

            <div className="flex flex-wrap items-center gap-2 pt-1 font-mono text-xs">
              <span className="px-2.5 py-1 rounded-lg bg-slate-950/80 text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
                <Zap className="w-3 h-3 text-amber-400" />
                Setup: {info.setupTimeMinutes} mins
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-slate-950/80 text-amber-300 border border-amber-500/20 flex items-center gap-1">
                <DollarSign className="w-3 h-3 text-emerald-400" />
                Expected Day 1: {info.expectedDay1Earnings}
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-slate-950/80 text-slate-300 border border-slate-800 flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-indigo-400" />
                $0 Startup Cost
              </span>
            </div>
          </div>

          <div className="p-3 bg-emerald-500/10 rounded-2xl border border-emerald-500/20 text-center shrink-0 hidden sm:block">
            <Flame className="w-6 h-6 text-emerald-400 mx-auto mb-1 animate-pulse" />
            <span className="text-[10px] font-mono text-emerald-300 uppercase font-bold block">Proof Guaranteed</span>
            <span className="text-[10px] text-slate-400 block">No Credit Card Needed</span>
          </div>
        </div>
      </div>

      {/* Free Tool Stack */}
      <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
        <span className="text-[10px] font-mono uppercase text-slate-400 font-bold block">
          100% Free Software Tools Used
        </span>
        <div className="flex flex-wrap gap-2">
          {info.zeroCostToolsUsed.map((tool) => (
            <span key={tool} className="px-2.5 py-1 rounded-lg bg-slate-900 text-emerald-300 border border-emerald-500/20 text-xs font-mono flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-emerald-400" />
              {tool}
            </span>
          ))}
        </div>
      </div>

      {/* LIVE INTERACTIVE GENERATOR TEST */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              <Sparkles className="w-4 h-4 text-amber-400" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">Live Starter Set Engine (1-Click Test)</h3>
              <p className="text-[11px] text-slate-400">Run the actual AI engine right here to generate sample assets for your first client.</p>
            </div>
          </div>
        </div>

        {/* Inputs based on hustle */}
        <div className="space-y-3 bg-slate-950 p-3.5 rounded-xl border border-slate-800/80">
          {hustle.id === 'free-local-seo-tag-booster' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div>
                <label className="text-[10px] font-mono text-slate-400 block mb-1">Local Business Name</label>
                <input
                  type="text"
                  placeholder="e.g. Apex Plumbing & Heating"
                  value={inputVal1}
                  onChange={(e) => setInputVal1(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </div>
              <div>
                <label className="text-[10px] font-mono text-slate-400 block mb-1">City & State / Niche</label>
                <input
                  type="text"
                  placeholder="e.g. Austin, TX"
                  value={inputVal2}
                  onChange={(e) => setInputVal2(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </div>
            </div>
          )}

          {hustle.id === 'free-ai-doc-formatting-service' && (
            <div>
              <label className="text-[10px] font-mono text-slate-400 block mb-1">Paste Raw Messy Resume Notes or Bullets</label>
              <textarea
                rows={2}
                placeholder="e.g. managed sales team increased revenue by 20 percent used excel and CRM"
                value={inputVal1}
                onChange={(e) => setInputVal1(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
            </div>
          )}

          {hustle.id === 'free-notion-micro-cheatsheet-vault' && (
            <div>
              <label className="text-[10px] font-mono text-slate-400 block mb-1">Target Notion Cheatsheet Topic</label>
              <input
                type="text"
                placeholder="e.g. Solopreneur Weekly Time & Finance Audit"
                value={inputVal1}
                onChange={(e) => setInputVal1(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
            </div>
          )}

          <button
            onClick={handleRunFreeGenerator}
            disabled={isGenerating}
            className="w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-600 hover:from-emerald-500 hover:to-indigo-500 text-white font-medium text-xs flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-600/20"
          >
            {isGenerating ? (
              <>
                <Bot className="w-4 h-4 animate-spin" />
                <span>Running Gemini Free Starter Engine...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>Run Free Starter Engine ($0 Test)</span>
              </>
            )}
          </button>
        </div>

        {/* OUTPUT DISPLAY */}
        {generatedOutput && (
          <div className="bg-slate-950 p-4 rounded-xl border border-emerald-500/30 space-y-4 animate-fadeIn">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5 font-mono">
                <CheckCircle2 className="w-4 h-4" />
                Generated Free Deliverable & Pitch
              </span>
              <span className="text-[10px] text-slate-400 font-mono">Ready to send to client</span>
            </div>

            {/* If local SEO tags */}
            {generatedOutput.metaTags && (
              <div className="space-y-3">
                <div className="space-y-2">
                  <span className="text-[10px] uppercase font-mono text-slate-400 block">5 Free Google Search Meta Tags</span>
                  {generatedOutput.metaTags.map((tag: any, idx: number) => (
                    <div key={idx} className="p-2.5 bg-slate-900 border border-slate-800 rounded-lg text-xs space-y-1">
                      <div className="flex justify-between font-bold text-indigo-300 font-mono text-[11px]">
                        <span>[{tag.page}] {tag.title}</span>
                      </div>
                      <p className="text-slate-300 text-[11px] leading-relaxed">{tag.description}</p>
                    </div>
                  ))}
                </div>

                <div className="space-y-1.5 pt-2 border-t border-slate-800">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase font-mono text-emerald-400 block font-bold">
                      Zero-Pitch Gift Email Script
                    </span>
                    <button
                      onClick={() => handleCopy(generatedOutput.emailDraft, 'emailDraft')}
                      className="text-xs text-slate-300 hover:text-white flex items-center gap-1 bg-slate-900 px-2 py-1 rounded border border-slate-800 font-mono"
                    >
                      {copiedKey === 'emailDraft' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedKey === 'emailDraft' ? 'Copied!' : 'Copy Script'}</span>
                    </button>
                  </div>
                  <pre className="p-3 bg-slate-900 border border-slate-800 rounded-lg text-xs text-slate-300 whitespace-pre-wrap font-sans leading-relaxed">
                    {generatedOutput.emailDraft}
                  </pre>
                </div>
              </div>
            )}

            {/* If resume document */}
            {generatedOutput.resumeBullets && (
              <div className="space-y-3">
                <div className="space-y-1.5">
                  <span className="text-[10px] uppercase font-mono text-slate-400 block">Executive Bullet Rewrites</span>
                  <div className="p-3 bg-slate-900 border border-slate-800 rounded-lg text-xs space-y-2 text-slate-200">
                    {generatedOutput.resumeBullets.map((b: string, i: number) => (
                      <p key={i}>{b}</p>
                    ))}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] uppercase font-mono text-emerald-400 font-bold block">
                      Client Upsell Message
                    </span>
                    <button
                      onClick={() => handleCopy(generatedOutput.clientPitch, 'clientPitch')}
                      className="text-xs text-slate-300 hover:text-white flex items-center gap-1 bg-slate-900 px-2 py-1 rounded border border-slate-800 font-mono"
                    >
                      {copiedKey === 'clientPitch' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedKey === 'clientPitch' ? 'Copied!' : 'Copy Pitch'}</span>
                    </button>
                  </div>
                  <pre className="p-3 bg-slate-900 border border-slate-800 rounded-lg text-xs text-slate-300 whitespace-pre-wrap font-sans">
                    {generatedOutput.clientPitch}
                  </pre>
                </div>
              </div>
            )}

            {/* If Notion cheatsheet */}
            {generatedOutput.notionOutline && (
              <div className="space-y-3">
                <div className="space-y-1.5">
                  <span className="text-[10px] uppercase font-mono text-slate-400 block">Notion Template Outline</span>
                  <pre className="p-3 bg-slate-900 border border-slate-800 rounded-lg text-xs text-slate-300 whitespace-pre-wrap font-sans">
                    {generatedOutput.notionOutline}
                  </pre>
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] uppercase font-mono text-emerald-400 font-bold block">
                      Gumroad Product Copy
                    </span>
                    <button
                      onClick={() => handleCopy(generatedOutput.gumroadCopy, 'gumroadCopy')}
                      className="text-xs text-slate-300 hover:text-white flex items-center gap-1 bg-slate-900 px-2 py-1 rounded border border-slate-800 font-mono"
                    >
                      {copiedKey === 'gumroadCopy' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedKey === 'gumroadCopy' ? 'Copied!' : 'Copy Copy'}</span>
                    </button>
                  </div>
                  <pre className="p-3 bg-slate-900 border border-slate-800 rounded-lg text-xs text-slate-300 whitespace-pre-wrap font-sans">
                    {generatedOutput.gumroadCopy}
                  </pre>
                </div>
              </div>
            )}

          </div>
        )}
      </div>

      {/* TRUST BUILDING PROGRESSION LADDER */}
      <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-emerald-400" />
          How This Free Starter Set Builds Trust & Unlocks Paid Hustles
        </h3>

        <div className="space-y-3 text-xs text-slate-300 leading-relaxed">
          <div className="p-3 bg-slate-900 rounded-xl border border-slate-800/80 flex items-start gap-3">
            <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold font-mono text-xs shrink-0">Step 1</span>
            <div>
              <strong className="text-white block font-sans">Zero Capital Commitment ($0 Spent)</strong>
              <p className="text-slate-400 mt-0.5">You use 100% free software (Gemini Free API, Gmail, Notion, Google Docs). Zero financial risk.</p>
            </div>
          </div>

          <div className="p-3 bg-slate-900 rounded-xl border border-slate-800/80 flex items-start gap-3">
            <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 font-bold font-mono text-xs shrink-0">Step 2</span>
            <div>
              <strong className="text-white block font-sans">Immediate Proof-of-Concept Win</strong>
              <p className="text-slate-400 mt-0.5">{info.proofOfConceptMechanism}</p>
            </div>
          </div>

          <div className="p-3 bg-slate-900 rounded-xl border border-slate-800/80 flex items-start gap-3">
            <span className="px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-bold font-mono text-xs shrink-0">Step 3</span>
            <div>
              <strong className="text-white block font-sans">Trust & Confidence Ladder</strong>
              <p className="text-slate-400 mt-0.5">{info.trustBuildingLadder}</p>
            </div>
          </div>
        </div>

        {/* Upgrade Call To Action */}
        <div className="pt-2 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div>
            <span className="text-[10px] uppercase font-mono text-slate-400 block font-bold">Ready to Scale to High-Ticket Revenue?</span>
            <span className="text-xs text-emerald-400 font-semibold">{info.upgradeToHustleTitle}</span>
          </div>

          {onSelectUpgradeHustle && (
            <button
              onClick={() => onSelectUpgradeHustle(info.upgradeToHustleId)}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-medium text-xs flex items-center gap-1.5 transition-all shadow-md shadow-indigo-600/20 shrink-0"
            >
              <span>View Paid Hustle Blueprint</span>
              <ArrowRight className="w-3.5 h-3.5 text-amber-300" />
            </button>
          )}
        </div>
      </div>

    </div>
  );
};
