import React, { useState, useEffect } from 'react';
import { 
  X, 
  Zap, 
  Sparkles, 
  Copy, 
  Check, 
  Download, 
  Flame, 
  Clock, 
  DollarSign, 
  Send, 
  Share2, 
  Code, 
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  FileText,
  Volume2,
  Image as ImageIcon,
  Smartphone,
  Cpu,
  BookOpen
} from 'lucide-react';

interface Day1SaleChallengeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenPayoutModal: () => void;
}

interface MicroAssetOption {
  id: string;
  name: string;
  category: string;
  suggestedPrice: string;
  targetPlatform: string;
  icon: React.ReactNode;
  tagline: string;
  redditCommunity: string;
  pitchScript: string;
  starterContent: string;
  fileFormat: string;
}

export const Day1SaleChallengeModal: React.FC<Day1SaleChallengeModalProps> = ({
  isOpen,
  onClose,
  onOpenPayoutModal
}) => {
  if (!isOpen) return null;

  const [selectedAssetId, setSelectedAssetId] = useState<string>('n8n-json');
  const [payoutLink, setPayoutLink] = useState<string>('https://paypal.me/dlinacre16');
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  // 24-Hour Timer State
  const [timeLeft, setTimeLeft] = useState<{ hours: number; minutes: number; seconds: number }>({
    hours: 23,
    minutes: 59,
    seconds: 45
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Checklist state
  const [checklist, setChecklist] = useState({
    step1AssetPicked: true,
    step2LinkReady: true,
    step3ScriptCopied: false,
    step4PostedCommunity: false,
    step5FirstSaleLogged: false
  });

  const MICRO_ASSETS: MicroAssetOption[] = [
    {
      id: 'n8n-json',
      name: 'n8n Lead Scraper & Telegram Bot Workflow',
      category: 'Automation JSON',
      suggestedPrice: '£1.00 ($1.30)',
      targetPlatform: 'r/n8n, LinkedIn, Twitter/X',
      icon: <Cpu className="w-5 h-5 text-emerald-400" />,
      tagline: 'Ready-to-import n8n JSON nodes for lead qualification & instant Telegram alerts.',
      redditCommunity: 'r/n8n & Reddit Automation Groups',
      fileFormat: '.json workflow file',
      pitchScript: `Hey automation builders! 👋

I built a production-tested n8n workflow that scrapes lead websites, runs Gemini 3.6 Flash AI qualification, and sends instant Telegram alerts with 1-tap reply links.

Save yourself 3 hours of wiring nodes. You can import the exact JSON in 10 seconds.

⚡ Grab the JSON workflow for £1.00: ${payoutLink}
(Instant email delivery, fully editable)`,
      starterContent: `{
  "name": "Gemini AI Lead Scraper & Telegram Alert Workflow",
  "nodes": [
    {
      "parameters": { "path": "lead-intake", "responseMode": "onReceived" },
      "name": "Webhook Trigger",
      "type": "n8n-nodes-base.webhook",
      "typeVersion": 1
    },
    {
      "parameters": {
        "model": "gemini-3.6-flash",
        "prompt": "Analyze website text and score lead fit 1-100"
      },
      "name": "Gemini AI Scorer",
      "type": "n8n-nodes-base.googleGemini",
      "typeVersion": 1
    },
    {
      "parameters": {
        "chatId": "YOUR_TELEGRAM_CHAT_ID",
        "text": "=⚡ New High-Value Lead!\\nCompany: {{ $json.company }}\\nScore: {{ $json.score }}/100"
      },
      "name": "Telegram Alert Bot",
      "type": "n8n-nodes-base.telegram",
      "typeVersion": 1
    }
  ]
}`
    },
    {
      id: '4k-wallpapers',
      name: '4K OLED Cyberpunk & Minimalist Wallpaper Pack',
      category: 'Digital Art ZIP',
      suggestedPrice: '£0.10 (10p)',
      targetPlatform: 'r/wallpapers, r/MobileWallpapers, Pinterest',
      icon: <ImageIcon className="w-5 h-5 text-purple-400" />,
      tagline: '50 Ultra-HD 4K OLED mobile wallpapers rendered for dark mode battery savings.',
      redditCommunity: 'r/wallpapers, r/MobileWallpapers, Discord',
      fileFormat: '.zip archive (50 x 4K images)',
      pitchScript: `Hey everyone! 📱✨

I batch-rendered 50 Ultra-HD 4K OLED mobile wallpapers using custom SDXL workflows (Cyberpunk cities, matte black abstract, lo-fi pixel art).

I put the complete 4K ZIP pack on Gumroad for 10p (0.10 GBP) or pay what you want:
👉 Download ZIP (10p): ${payoutLink}

Hope you enjoy the dark mode aesthetic!`,
      starterContent: `PROMPT 1 (Cyberpunk OLED): Cyberpunk Tokyo alleyway at rainy midnight, ultra-detailed OLED black background, neon violet and cyan reflections, 4k 8k resolution, 9:16 aspect ratio --ar 9:16
PROMPT 2 (Matte Black Abstract): Minimalist abstract 3D dark geometric fluid ribbon, deep charcoal and emerald gold highlights, clean vector aesthetic, 4k wallpaper --ar 9:16
PROMPT 3 (Lo-Fi Rainy Pixel): Cozy lo-fi bedroom rainy window view, warm ambient desk lamp, pixel art style, high contrast dark theme, phone wallpaper --ar 9:16`
    },
    {
      id: 'obsidian-pkm',
      name: 'Obsidian Minimalist Life OS Vault Starter',
      category: 'Markdown Vault ZIP',
      suggestedPrice: '£0.50 (50p)',
      targetPlatform: 'r/ObsidianMD, Twitter/X',
      icon: <BookOpen className="w-5 h-5 text-amber-400" />,
      tagline: 'Pre-configured Obsidian vault with Dataview, Templater daily notes & Kanban boards.',
      redditCommunity: 'r/ObsidianMD, Medium, Discord',
      fileFormat: '.zip Obsidian Vault folder',
      pitchScript: `Hey Obsidian power users! 📓

I spent the weekend building a pre-configured, zero-bloat Obsidian Life OS vault. It comes with pre-wired Dataview queries, Templater daily journals, and Kanban task boards.

Just unzip and open as vault!

📦 Grab the vault ZIP for 50p: ${payoutLink}
(100% offline, privacy-first, futureproof Markdown)`,
      starterContent: `# 01 - Daily Notes Template
Date: {{date:YYYY-MM-DD}}

## 🎯 Top 3 Priorities
- [ ] Priority 1
- [ ] Priority 2
- [ ] Priority 3

## 📊 Habit Tracker
- [ ] Workout 30m
- [ ] Deep Work 2h
- [ ] Read 15m

\`\`\`dataview
TABLE status, priority FROM "02 - Projects" WHERE status != "Completed"
\`\`\`
`
    },
    {
      id: 'comfyui-pipeline',
      name: 'ComfyUI Flux.1 Studio Portrait Node Workflow',
      category: 'ComfyUI JSON',
      suggestedPrice: '£0.99 (99p)',
      targetPlatform: 'r/ComfyUI, Civitai, Discord',
      icon: <Code className="w-5 h-5 text-indigo-400" />,
      tagline: 'Drag-and-drop ComfyUI JSON graph for photorealistic 8K studio lighting & face detailer.',
      redditCommunity: 'r/ComfyUI, Civitai, OpenArt',
      fileFormat: '.json node graph',
      pitchScript: `Hey ComfyUI creators! 🎨

I optimized a 1-click Flux.1 studio portrait workflow in ComfyUI that handles background removal, lighting matching, and 8K face detailing seamlessly.

Drag and drop the JSON straight into ComfyUI!

⚡ Download the JSON node graph for 99p: ${payoutLink}`,
      starterContent: `{
  "last_node_id": 12,
  "nodes": [
    { "id": 1, "type": "UNETLoader", "widgets_values": ["flux1-dev.safetensors"] },
    { "id": 2, "type": "KSampler", "widgets_values": [15, 3.5, "euler", "normal"] },
    { "id": 3, "type": "FaceDetailer", "widgets_values": [0.5, true] }
  ]
}`
    },
    {
      id: 'wearos-watchface',
      name: 'WearOS CyberOLED Smartwatch Preset',
      category: 'Smartwatch Preset',
      suggestedPrice: '£0.49 (49p)',
      targetPlatform: 'r/GalaxyWatch, r/AppleWatch, TikTok',
      icon: <Smartphone className="w-5 h-5 text-teal-400" />,
      tagline: 'Cyberpunk HUD OLED watch face preset for Galaxy Watch & Apple Watch.',
      redditCommunity: 'r/GalaxyWatch, r/WearOS',
      fileFormat: '.watch / .face preset',
      pitchScript: `Hey Galaxy Watch / WearOS owners! ⌚

Turn your watch into a Cyberpunk OLED HUD with live step gauge, heart rate pulse, and military UTC time display. High contrast for battery efficiency.

⚡ Download the 49p watch face preset: ${payoutLink}`,
      starterContent: `CyberOLED Watch Face Preset (WearOS / Galaxy Watch / Clockology)
- Background: #050508 pure OLED black
- Color Accents: Cyber cyan (#00f3ff), Neon green (#00ff66)
- Widgets: Step counter ring, UTC clock, heart rate, weather radar`
    },
    {
      id: 'audio-chimes',
      name: '20 Aesthetic Notification Chimes & Ringtone Pack',
      category: 'Audio MP3/M4R Pack',
      suggestedPrice: '£0.10 (10p)',
      targetPlatform: 'TikTok, Instagram Reels, r/iPhone',
      icon: <Volume2 className="w-5 h-5 text-rose-400" />,
      tagline: 'Clean, soothing 1-2 second notification sounds for iPhone & Android.',
      redditCommunity: 'TikTok, Instagram Reels, r/iPhone',
      fileFormat: '.zip (20 x .mp3 & .m4r files)',
      pitchScript: `Replace harsh notification ringtones with 20 calm, aesthetic chimes! 🔔

Zen woodblock chimes, lo-fi raindrop bells, and retro 8-bit coin sounds for iPhone (.m4r) and Android (.mp3).

🎧 Grab the 10p ZIP bundle: ${payoutLink}`,
      starterContent: `AUDIO CHIMES INCLUDED:
1. Zen Japanese Woodblock (1.2s .m4r / .mp3)
2. Cyberpunk Cyber-Beep (0.8s)
3. Lo-Fi Raindrop Bell (2.0s)
4. 8-Bit Retro Coin Pickup (0.5s)
5. Crystal Water Drop Chime (1.0s)`
    }
  ];

  const currentAsset = MICRO_ASSETS.find((a) => a.id === selectedAssetId) || MICRO_ASSETS[0];

  const handleCopy = (text: string, sectionName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(sectionName);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  const handleDownloadFile = () => {
    const element = document.createElement('a');
    const file = new Blob([currentAsset.starterContent], { type: 'text/plain;charset=utf-8' });
    element.href = URL.createObjectURL(file);
    element.download = `${currentAsset.id}-starter-kit.${currentAsset.id.includes('json') ? 'json' : 'txt'}`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-4xl shadow-2xl overflow-hidden my-auto flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 bg-gradient-to-r from-amber-950/60 via-slate-900 to-indigo-950/60 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-rose-500 p-0.5 shadow-lg shadow-amber-500/20">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center text-amber-400">
                <Flame className="w-5 h-5 fill-amber-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                  24-Hour Micro-Sale Fast-Track Challenge
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-mono font-bold animate-pulse">
                  Target: 1 Sale in 24 Hours
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Deploy ultra-low-friction digital micro-assets (1p - 99p) to land your first real sale today.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-all shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Challenge Countdown Banner */}
        <div className="bg-slate-950/90 border-b border-slate-800/80 px-4 py-2.5 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-amber-300 font-mono font-semibold">
            <Clock className="w-4 h-4 text-amber-400 animate-spin" />
            <span>
              Challenge Timer: {String(timeLeft.hours).padStart(2, '0')}:
              {String(timeLeft.minutes).padStart(2, '0')}:
              {String(timeLeft.seconds).padStart(2, '0')}
            </span>
          </div>

          <div className="flex items-center gap-3 text-slate-300 font-mono">
            <span>Payout Routed To: <strong className="text-emerald-400">{payoutLink}</strong></span>
            <button
              onClick={onOpenPayoutModal}
              className="text-[10px] underline text-indigo-400 hover:text-indigo-300 font-bold"
            >
              Change Payout Destination
            </button>
          </div>
        </div>

        {/* Main Body Content - Scrollable */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6 flex-1">
          
          {/* Step 1: Asset Selector */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-mono uppercase font-bold text-indigo-300 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center text-[10px]">1</span>
                Select High-Volume Digital Micro-Asset to Deploy
              </h4>
              <span className="text-[10px] text-slate-400">Priced at 10p - £1.00 for 0% friction</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {MICRO_ASSETS.map((asset) => {
                const isSelected = asset.id === selectedAssetId;
                return (
                  <button
                    key={asset.id}
                    onClick={() => {
                      setSelectedAssetId(asset.id);
                      setChecklist((prev) => ({ ...prev, step1AssetPicked: true }));
                    }}
                    className={`p-3 rounded-2xl border text-left transition-all relative overflow-hidden flex flex-col justify-between ${
                      isSelected
                        ? 'bg-slate-800/90 border-indigo-500 ring-2 ring-indigo-500/30 shadow-lg shadow-indigo-500/10'
                        : 'bg-slate-950/60 border-slate-800/80 hover:bg-slate-800/50 hover:border-slate-700'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <div className="p-1.5 rounded-lg bg-slate-900 border border-slate-800">
                          {asset.icon}
                        </div>
                        <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                          {asset.suggestedPrice}
                        </span>
                      </div>
                      <h5 className="text-xs font-bold text-white leading-snug line-clamp-2">{asset.name}</h5>
                      <p className="text-[10px] text-slate-400 mt-1 line-clamp-2">{asset.tagline}</p>
                    </div>

                    <div className="mt-3 pt-2 border-t border-slate-800/60 flex items-center justify-between text-[9px] font-mono text-slate-500">
                      <span>{asset.category}</span>
                      <span className="text-indigo-400">{asset.fileFormat}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Selected Asset Details & Action Hub */}
          <div className="bg-slate-950/80 rounded-2xl border border-slate-800 p-4 sm:p-5 space-y-4">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-400">
                  {currentAsset.icon}
                </div>
                <div>
                  <h4 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                    {currentAsset.name}
                    <span className="text-xs font-mono text-emerald-400 px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
                      {currentAsset.suggestedPrice}
                    </span>
                  </h4>
                  <p className="text-xs text-slate-400">Target Distribution: {currentAsset.targetPlatform}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleDownloadFile}
                  className="px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-md shadow-indigo-500/20"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Starter File</span>
                </button>

                <button
                  onClick={() => handleCopy(currentAsset.starterContent, 'starterFile')}
                  className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 flex items-center gap-1.5 transition-all"
                >
                  {copiedSection === 'starterFile' ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Code</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Step 2: Copy-Paste Pitch Post Script */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-mono uppercase font-bold text-amber-300 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center text-[10px]">2</span>
                  24-Hour High-Converting Pitch Copy (Ready to Post)
                </label>
                <button
                  onClick={() => {
                    handleCopy(currentAsset.pitchScript, 'pitchScript');
                    setChecklist((prev) => ({ ...prev, step3ScriptCopied: true }));
                  }}
                  className="px-2.5 py-1 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[10px] font-bold font-mono flex items-center gap-1 transition-all"
                >
                  {copiedSection === 'pitchScript' ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-400" />
                      <span>Script Copied to Clipboard!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>Copy Post Script</span>
                    </>
                  )}
                </button>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs font-mono text-slate-300 whitespace-pre-wrap relative group">
                {currentAsset.pitchScript}
              </div>
            </div>

            {/* Target Posting Locations */}
            <div className="p-3 bg-indigo-950/30 border border-indigo-500/30 rounded-xl flex items-center justify-between text-xs">
              <div className="space-y-0.5">
                <span className="font-bold text-indigo-300 block font-mono">Recommended Distribution Hub:</span>
                <span className="text-slate-300">{currentAsset.redditCommunity}</span>
              </div>
              <a
                href={`https://www.reddit.com/search/?q=${encodeURIComponent(currentAsset.category)}`}
                target="_blank"
                rel="noreferrer"
                onClick={() => setChecklist((prev) => ({ ...prev, step4PostedCommunity: true }))}
                className="px-3 py-1.5 rounded-lg bg-indigo-600/30 hover:bg-indigo-600/50 text-indigo-200 border border-indigo-500/30 font-bold text-[11px] flex items-center gap-1 transition-all"
              >
                <span>Open Target Community</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            {/* Interactive File Preview Box */}
            <div className="space-y-1.5">
              <span className="text-[11px] font-mono uppercase text-slate-400 font-bold block">
                Preview Starter File Content ({currentAsset.fileFormat}):
              </span>
              <pre className="bg-slate-950 border border-slate-800 rounded-xl p-3 text-[11px] font-mono text-emerald-400 overflow-x-auto max-h-40 leading-relaxed">
                {currentAsset.starterContent}
              </pre>
            </div>
          </div>

          {/* Step 3: Interactive 24-Hour Checklist */}
          <div className="p-4 bg-slate-900/90 border border-slate-800 rounded-2xl space-y-3">
            <h4 className="text-xs font-mono uppercase font-bold text-emerald-400 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              24-Hour 1p Sale Completion Checklist
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <label className="flex items-center gap-2 p-2 bg-slate-950/60 rounded-lg border border-slate-800/80 cursor-pointer hover:bg-slate-800/40">
                <input
                  type="checkbox"
                  checked={checklist.step1AssetPicked}
                  onChange={(e) => setChecklist({ ...checklist, step1AssetPicked: e.target.checked })}
                  className="rounded bg-slate-900 border-slate-700 text-indigo-500 focus:ring-0"
                />
                <span className={checklist.step1AssetPicked ? 'text-slate-200 line-through' : 'text-slate-300'}>
                  1. Picked Micro-Asset ({currentAsset.name})
                </span>
              </label>

              <label className="flex items-center gap-2 p-2 bg-slate-950/60 rounded-lg border border-slate-800/80 cursor-pointer hover:bg-slate-800/40">
                <input
                  type="checkbox"
                  checked={checklist.step2LinkReady}
                  onChange={(e) => setChecklist({ ...checklist, step2LinkReady: e.target.checked })}
                  className="rounded bg-slate-900 border-slate-700 text-indigo-500 focus:ring-0"
                />
                <span className={checklist.step2LinkReady ? 'text-slate-200 line-through' : 'text-slate-300'}>
                  2. Configured PayPal/Bank Link ({payoutLink})
                </span>
              </label>

              <label className="flex items-center gap-2 p-2 bg-slate-950/60 rounded-lg border border-slate-800/80 cursor-pointer hover:bg-slate-800/40">
                <input
                  type="checkbox"
                  checked={checklist.step3ScriptCopied}
                  onChange={(e) => setChecklist({ ...checklist, step3ScriptCopied: e.target.checked })}
                  className="rounded bg-slate-900 border-slate-700 text-indigo-500 focus:ring-0"
                />
                <span className={checklist.step3ScriptCopied ? 'text-slate-200 line-through' : 'text-slate-300'}>
                  3. Copied Pitch Script & Downloaded File
                </span>
              </label>

              <label className="flex items-center gap-2 p-2 bg-slate-950/60 rounded-lg border border-slate-800/80 cursor-pointer hover:bg-slate-800/40">
                <input
                  type="checkbox"
                  checked={checklist.step4PostedCommunity}
                  onChange={(e) => setChecklist({ ...checklist, step4PostedCommunity: e.target.checked })}
                  className="rounded bg-slate-900 border-slate-700 text-indigo-500 focus:ring-0"
                />
                <span className={checklist.step4PostedCommunity ? 'text-slate-200 line-through' : 'text-slate-300'}>
                  4. Posted to 1 target community/forum
                </span>
              </label>
            </div>

            <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs font-mono">
              <span className="text-slate-400">Status:</span>
              <span className="text-emerald-400 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                Ready to Publish & Land First Sale in 24 Hours!
              </span>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/80 flex items-center justify-between shrink-0">
          <div className="text-[11px] text-slate-400 font-mono">
            💡 Micro-assets priced under £1 have near-zero buyer resistance.
          </div>

          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-indigo-600 hover:from-emerald-500 hover:to-indigo-500 text-white font-bold text-xs shadow-lg shadow-emerald-500/20 transition-all"
          >
            Done - Launching Distribution Now 🚀
          </button>
        </div>

      </div>
    </div>
  );
};
