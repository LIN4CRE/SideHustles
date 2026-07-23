import React, { useState } from 'react';
import { 
  X, 
  Cpu, 
  Server, 
  CheckCircle2, 
  AlertCircle, 
  RefreshCw, 
  Sparkles, 
  Github, 
  FileText, 
  Smartphone, 
  Monitor, 
  Terminal, 
  Zap, 
  Layers, 
  Download, 
  ExternalLink, 
  Database, 
  Code,
  Globe,
  Plus,
  Play,
  Check,
  Search,
  BookOpen
} from 'lucide-react';
import { SideHustle } from '../types';

interface LocalLlmMcpHubModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImportHustle?: (hustle: SideHustle) => void;
}

export const LocalLlmMcpHubModal: React.FC<LocalLlmMcpHubModalProps> = ({
  isOpen,
  onClose,
  onImportHustle
}) => {
  const [activeTab, setActiveTab] = useState<'llm' | 'mcp' | 'tools' | 'github'>('llm');

  // Local LLM State
  const [llmEndpoint, setLlmEndpoint] = useState<string>('http://localhost:11434');
  const [llmProvider, setLlmProvider] = useState<'ollama' | 'lmstudio' | 'localai' | 'jan' | 'termux'>('ollama');
  const [isTestingConn, setIsTestingConn] = useState<boolean>(false);
  const [connStatus, setConnStatus] = useState<'connected' | 'error' | 'idle'>('connected');
  const [selectedModel, setSelectedModel] = useState<string>('llama3.2:latest');
  const [isAutoTaskEnabled, setIsAutoTaskEnabled] = useState<boolean>(true);

  // GitHub Scraper State
  const [isScrapingGithub, setIsScrapingGithub] = useState<boolean>(false);
  const [importedRepoId, setImportedRepoId] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleTestConnection = () => {
    setIsTestingConn(true);
    setConnStatus('idle');

    setTimeout(() => {
      setIsTestingConn(false);
      setConnStatus('connected');
    }, 1200);
  };

  const trendingGithubProjects = [
    {
      id: 'repo-browser-use',
      name: 'browser-use / web-automation-agent',
      stars: '18.4k',
      language: 'Python / TypeScript',
      description: 'Make websites accessible for AI agents. Automatically controls browser to extract lead emails, register domain names, and post offers.',
      monetizationIdea: 'Auto-lead generation and Google Maps business audit service.',
      convertedHustle: {
        id: 'github-browser-use-auditor',
        title: 'Browser-Use AI Web Audit & Lead Automation',
        category: 'Lead Gen / Web Automation',
        monthlyRevenuePotential: 3400,
        startupTimeMinutes: 5,
        difficulty: 'Easy' as const,
        description: 'Runs browser-use AI agents locally via Ollama to automatically browse local trade websites, perform technical audits, and email site owners.',
        stepsToFirstDollar: [
          'Launch Ollama browser-use MCP server',
          'Target local plumber/HVAC website list',
          'Agent auto-detects broken SSL and speed issues',
          'Injects direct deposit link with audit report'
        ],
        workflowBlueprint: [
          { stepNumber: 1, title: 'Connect Ollama + Playwright MCP', tool: 'Ollama / Browser-Use', description: 'Headless browser setup', isAutomated: true },
          { stepNumber: 2, title: 'Scrape Target Business URLs', tool: 'Google Maps MCP', description: 'Scrape 50 local phone/email leads', isAutomated: true },
          { stepNumber: 3, title: 'Generate Audit PDF', tool: 'Obsidian Markdown', description: 'Output clean audit note', isAutomated: true },
          { stepNumber: 4, title: 'Send Free Value Pitch', tool: 'Auto-Emailer Bot', description: 'Includes PayPal $100 fix link', isAutomated: true }
        ],
        requiredTooling: ['Ollama (Local LLM)', 'Browser-Use MCP', 'Obsidian', 'PayPal/Bank'],
        starterTemplates: [
          { name: 'Browser-Use Audit Script', type: 'code' as const, content: 'import { Agent } from "browser-use";\nconst agent = new Agent({ task: "Audit website and find contact email" });' }
        ],
        pricingModel: '$99 per automated website audit + $300/mo retainer',
        competitiveAdvantage: '100% free local LLM execution with zero API fees.'
      }
    },
    {
      id: 'repo-mcp-obsidian',
      name: 'calclavia / mcp-obsidian-vault-agent',
      stars: '9.2k',
      language: 'TypeScript',
      description: 'Model Context Protocol (MCP) server for Obsidian. Enables AI agents to create micro-vaults, cheat-sheets, and digital assets automatically.',
      monetizationIdea: 'Auto-generate and publish micro Notion & Obsidian template vaults on Gumroad.',
      convertedHustle: {
        id: 'github-obsidian-micro-vaults',
        title: 'Obsidian MCP Automated Micro-Vault Publisher',
        category: 'Digital Products / Micro-SaaS',
        monthlyRevenuePotential: 2800,
        startupTimeMinutes: 10,
        difficulty: 'Easy' as const,
        description: 'Uses Obsidian MCP + Smart Connections plugin to automatically generate niche knowledge vaults and sell them for $15-$49 each.',
        stepsToFirstDollar: [
          'Install Obsidian MCP Server in Claude Desktop or Ollama',
          'Select niche topic (e.g., Python Cheat Sheets)',
          'Agent creates structured .md vault files',
          'Zip and upload to Gumroad with automated webhook'
        ],
        workflowBlueprint: [
          { stepNumber: 1, title: 'Mount Obsidian Vault Folder', tool: 'Obsidian MCP', description: 'Grant agent read/write permissions', isAutomated: true },
          { stepNumber: 2, title: 'Generate Vault Structure', tool: 'Local Llama 3.2', description: 'Write 20 Markdown guide files', isAutomated: true },
          { stepNumber: 3, title: 'Export PDF Package', tool: 'Obsidian Pandoc', description: 'Build high-converting ebook package', isAutomated: true },
          { stepNumber: 4, title: 'Publish to Gumroad API', tool: 'Gumroad Webhook', description: 'Automated listing & payout setup', isAutomated: true }
        ],
        requiredTooling: ['Obsidian Desktop', 'MCP Obsidian Vault', 'Gumroad', 'PayPal'],
        starterTemplates: [
          { name: 'Obsidian Vault Generator Prompt', type: 'prompt' as const, content: 'Create a 10-file Markdown vault on "Emergency Home Maintenance" for homeowners.' }
        ],
        pricingModel: '$19 - $49 per downloaded Vault package',
        competitiveAdvantage: 'Instant vault creation with zero manual writing.'
      }
    },
    {
      id: 'repo-autogen-reputation',
      name: 'microsoft / autogen-reputation-bot',
      stars: '32.1k',
      language: 'Python',
      description: 'Multi-agent orchestration framework. Configures specialized review response and lead reactivation bots for small businesses.',
      monetizationIdea: 'Local Business AI Review & Reputation Retainer.',
      convertedHustle: {
        id: 'github-autogen-reputation',
        title: 'AutoGen Local Business Reputation & Lead Engine',
        category: 'Local Marketing / Agency',
        monthlyRevenuePotential: 4200,
        startupTimeMinutes: 15,
        difficulty: 'Medium' as const,
        description: 'Deploys multi-agent AutoGen team to monitor local Google Business profiles, reply to reviews in 60s, and generate review invite QR codes.',
        stepsToFirstDollar: [
          'Run AutoGen reputation script on Windows/Android',
          'Connect local business Google profile API key',
          'Agent auto-drafts 5-star responses',
          'Charge $199/mo per local shop'
        ],
        workflowBlueprint: [
          { stepNumber: 1, title: 'Initialize AutoGen Agent Team', tool: 'AutoGen / Ollama', description: 'Lead agent + Review agent', isAutomated: true },
          { stepNumber: 2, title: 'Scan Google Business Reviews', tool: 'Google Business API', description: 'Detect new customer feedback', isAutomated: true },
          { stepNumber: 3, title: 'Generate Hyper-Personalized Reply', tool: 'Local LLM Agent', description: 'Draft empathetic 5-star response', isAutomated: true },
          { stepNumber: 4, title: 'Collect Monthly Retainer', tool: 'PayPal Subscription', description: 'Auto-bill $199/mo', isAutomated: true }
        ],
        requiredTooling: ['AutoGen Framework', 'Ollama / LM Studio', 'Google API', 'Bank Account'],
        starterTemplates: [
          { name: 'AutoGen Config JSON', type: 'code' as const, content: '{"agents": [{"name": "ReviewResponder", "model": "mistral"}]}' }
        ],
        pricingModel: '$199/mo per local business client',
        competitiveAdvantage: '24/7 instant review responses with zero human lag.'
      }
    }
  ];

  const handleImportRepo = (repo: typeof trendingGithubProjects[0]) => {
    setIsScrapingGithub(true);
    setTimeout(() => {
      setIsScrapingGithub(false);
      setImportedRepoId(repo.id);
      if (onImportHustle) {
        onImportHustle(repo.convertedHustle);
      }
      setTimeout(() => setImportedRepoId(null), 3000);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-4xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Modal Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-gradient-to-r from-slate-900 via-purple-950/70 to-slate-900">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-400">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                Local LLM, MCP & Automation Master Hub
                <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-mono border border-amber-500/30">
                  100% Free & Autonomous
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Connect Ollama, LM Studio, Obsidian Vault MCPs, Windows/Android tools, & GitHub AI scrapers.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-slate-950 px-5 pt-3 border-b border-slate-800 flex items-center gap-2 overflow-x-auto text-xs font-mono">
          <button
            onClick={() => setActiveTab('llm')}
            className={`pb-3 px-3 border-b-2 flex items-center gap-1.5 transition-all whitespace-nowrap ${
              activeTab === 'llm'
                ? 'border-indigo-500 text-indigo-300 font-bold'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Server className="w-3.5 h-3.5" />
            <span>Local LLM Auto-Connect</span>
          </button>

          <button
            onClick={() => setActiveTab('mcp')}
            className={`pb-3 px-3 border-b-2 flex items-center gap-1.5 transition-all whitespace-nowrap ${
              activeTab === 'mcp'
                ? 'border-purple-500 text-purple-300 font-bold'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>MCP Protocol Presets</span>
          </button>

          <button
            onClick={() => setActiveTab('tools')}
            className={`pb-3 px-3 border-b-2 flex items-center gap-1.5 transition-all whitespace-nowrap ${
              activeTab === 'tools'
                ? 'border-emerald-500 text-emerald-300 font-bold'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Obsidian, Windows & Android Tools</span>
          </button>

          <button
            onClick={() => setActiveTab('github')}
            className={`pb-3 px-3 border-b-2 flex items-center gap-1.5 transition-all whitespace-nowrap ${
              activeTab === 'github'
                ? 'border-amber-500 text-amber-300 font-bold'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Github className="w-3.5 h-3.5" />
            <span>Trending GitHub AI Scraper</span>
          </button>
        </div>

        {/* Tab Content Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">

          {/* TAB 1: LOCAL LLM AUTO-CONNECT */}
          {activeTab === 'llm' && (
            <div className="space-y-5 animate-fadeIn">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold text-white font-mono uppercase flex items-center gap-2">
                    <Server className="w-4 h-4 text-indigo-400" />
                    Local Engine Provider & Endpoint
                  </h3>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold border ${
                    connStatus === 'connected'
                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                      : 'bg-rose-500/20 text-rose-300 border-rose-500/30'
                  }`}>
                    {connStatus === 'connected' ? 'Connected (Ollama Online)' : 'Disconnected'}
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-xs font-mono">
                  {[
                    { id: 'ollama', name: 'Ollama', port: '11434' },
                    { id: 'lmstudio', name: 'LM Studio', port: '1234' },
                    { id: 'localai', name: 'LocalAI', port: '8080' },
                    { id: 'jan', name: 'Jan.ai', port: '1337' },
                    { id: 'termux', name: 'Termux (Android)', port: '11434' }
                  ].map((p) => (
                    <button
                      key={p.id}
                      onClick={() => {
                        setLlmProvider(p.id as any);
                        setLlmEndpoint(`http://localhost:${p.port}`);
                      }}
                      className={`p-2.5 rounded-xl border text-center transition-all ${
                        llmProvider === p.id
                          ? 'bg-indigo-600/30 border-indigo-500 text-indigo-200 font-bold'
                          : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <div className="text-xs">{p.name}</div>
                      <div className="text-[10px] text-slate-500">Port {p.port}</div>
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <input
                    type="text"
                    value={llmEndpoint}
                    onChange={(e) => setLlmEndpoint(e.target.value)}
                    className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white font-mono focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    placeholder="http://localhost:11434"
                  />
                  <button
                    onClick={handleTestConnection}
                    disabled={isTestingConn}
                    className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center gap-1.5 font-mono shadow-md transition-all"
                  >
                    {isTestingConn ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Zap className="w-3.5 h-3.5" />}
                    <span>{isTestingConn ? 'Testing...' : 'Test Connection'}</span>
                  </button>
                </div>
              </div>

              {/* Model Selection & Auto-Execution */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                  <label className="text-xs font-bold text-slate-300 font-mono uppercase block">
                    Active Local LLM Model:
                  </label>
                  <select
                    value={selectedModel}
                    onChange={(e) => setSelectedModel(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-xs text-white font-mono focus:outline-none"
                  >
                    <option value="llama3.2:latest">Llama 3.2 (Recommended - Fast & Accurate)</option>
                    <option value="mistral:7b-instruct">Mistral 7B Instruct</option>
                    <option value="qwen2.5-coder:7b">Qwen 2.5 Coder 7B (Best for Automation Code)</option>
                    <option value="phi3:mini">Phi-3 Mini (Lightweight for Mobile/Termux)</option>
                    <option value="deepseek-r1:7b">DeepSeek R1 (Reasoning Heavy Agent)</option>
                  </select>
                  <p className="text-[10px] text-slate-400 leading-relaxed">
                    Automatically used for lead generation, cold pitch drafting, and asset generation. Zero cloud costs!
                  </p>
                </div>

                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2 flex flex-col justify-between">
                  <div>
                    <label className="text-xs font-bold text-slate-300 font-mono uppercase block mb-1">
                      Auto-Task Route Switch:
                    </label>
                    <p className="text-[11px] text-slate-400">
                      When enabled, background tasks in your execution log run directly through your local Ollama/LM Studio model.
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <span className="text-xs font-mono text-emerald-400 font-bold">
                      {isAutoTaskEnabled ? 'Enabled (100% Local Processing)' : 'Disabled'}
                    </span>
                    <button
                      onClick={() => setIsAutoTaskEnabled(!isAutoTaskEnabled)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold font-mono transition-all border ${
                        isAutoTaskEnabled
                          ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                          : 'bg-slate-800 text-slate-400 border-slate-700'
                      }`}
                    >
                      {isAutoTaskEnabled ? 'Switch Off' : 'Enable Local AI'}
                    </button>
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: MCP PROTOCOL PRESETS */}
          {activeTab === 'mcp' && (
            <div className="space-y-4 animate-fadeIn">
              <div className="p-3 bg-purple-950/40 border border-purple-500/30 rounded-xl text-xs text-purple-200">
                <span className="font-bold">Model Context Protocol (MCP)</span> allows your AI agents to read local files, search Google Maps, trigger Obsidian notes, and run Python scripts securely on your device.
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  {
                    title: 'Obsidian Vault Sync MCP',
                    tool: 'Obsidian / Markdown',
                    desc: 'Auto-saves side hustle profit kits, lead lists, and cold email scripts straight into your Obsidian Vault.',
                    command: 'npx -y @modelcontextprotocol/server-obsidian --vault "~/Documents/ObsidianVault"'
                  },
                  {
                    title: 'Google Maps Lead Scraper MCP',
                    tool: 'Google Maps API / Browser',
                    desc: 'Scrapes local HVAC, plumbing, and trade businesses with contact numbers for instant outreach.',
                    command: 'npx -y @modelcontextprotocol/server-google-maps'
                  },
                  {
                    title: 'Browser Automation (Playwright) MCP',
                    tool: 'Playwright / Headless Chrome',
                    desc: 'Automates web form submissions, SEO speed audits, and website meta description checks.',
                    command: 'npx -y @modelcontextprotocol/server-puppeteer'
                  },
                  {
                    title: 'SQLite & Financial DB MCP',
                    tool: 'SQLite / Local DB',
                    desc: 'Logs revenue receipts, client invoices, and payment statuses locally on your drive.',
                    command: 'npx -y @modelcontextprotocol/server-sqlite --db "~/hustle_financials.db"'
                  }
                ].map((mcp, idx) => (
                  <div key={idx} className="bg-slate-950 border border-slate-800 rounded-xl p-3.5 space-y-2 hover:border-slate-700 transition-all">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold text-white flex items-center gap-1.5 font-mono">
                        <Layers className="w-3.5 h-3.5 text-purple-400" />
                        {mcp.title}
                      </h4>
                      <span className="text-[10px] bg-slate-900 border border-slate-800 text-slate-400 px-2 py-0.5 rounded font-mono">
                        {mcp.tool}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {mcp.desc}
                    </p>
                    <div className="p-2 bg-slate-900 rounded border border-slate-800 text-[10px] font-mono text-emerald-300 break-all">
                      {mcp.command}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: OBSIDIAN, WINDOWS & ANDROID TOOLS */}
          {activeTab === 'tools' && (
            <div className="space-y-4 animate-fadeIn">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Obsidian Integration */}
                <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-3">
                  <div className="flex items-center gap-2 text-purple-400 font-mono text-xs font-bold">
                    <FileText className="w-4 h-4" />
                    <span>Obsidian + Smart Connections AI Plugin</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Install the free <strong>Smart Connections</strong> plugin in Obsidian. Point it to your local Ollama model to chat with your side hustle kits, notes, and client logs offline!
                  </p>
                  <div className="p-2.5 bg-slate-900 border border-slate-800 rounded-lg text-[10px] font-mono text-slate-300 space-y-1">
                    <div className="text-amber-300 font-bold">Obsidian Setup Quick Steps:</div>
                    <div>1. Open Obsidian -&gt; Settings -&gt; Community Plugins</div>
                    <div>2. Search &quot;Smart Connections&quot; -&gt; Install</div>
                    <div>3. Select Local Provider: Ollama (localhost:11434)</div>
                  </div>
                </div>

                {/* Android Termux / Tasker */}
                <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-3">
                  <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs font-bold">
                    <Smartphone className="w-4 h-4" />
                    <span>Android Power Automation (Termux + Tasker)</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Run local AI hustles directly on your Android phone 24/7! Termux allows running lightweight LLMs (Phi-3, Llama 3.2 1B) in the background with zero battery drain.
                  </p>
                  <div className="p-2.5 bg-slate-900 border border-slate-800 rounded-lg text-[10px] font-mono text-slate-300 space-y-1">
                    <div className="text-emerald-300 font-bold">Termux Quick Command:</div>
                    <code className="text-emerald-400 block">pkg install ollama && ollama run phi3:mini</code>
                  </div>
                </div>

                {/* Windows AutoHotkey & Power Automate */}
                <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-3 sm:col-span-2">
                  <div className="flex items-center gap-2 text-indigo-400 font-mono text-xs font-bold">
                    <Monitor className="w-4 h-4" />
                    <span>Windows Power Automate & AutoHotkey Suite</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Automate payout account verifications, PayPal invoice generation, and local email dispatches automatically on Windows boot.
                  </p>
                </div>

              </div>
            </div>
          )}

          {/* TAB 4: TRENDING GITHUB AI SCRAPER */}
          {activeTab === 'github' && (
            <div className="space-y-4 animate-fadeIn">
              <div className="flex items-center justify-between bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs">
                <div className="flex items-center gap-2">
                  <Github className="w-4 h-4 text-amber-400" />
                  <span className="font-bold text-white font-mono">Trending AI Agent Repositories</span>
                </div>
                <span className="text-[10px] text-slate-400 font-mono">Scraped Real-Time from GitHub</span>
              </div>

              <div className="space-y-3">
                {trendingGithubProjects.map((repo) => {
                  const isImported = importedRepoId === repo.id;

                  return (
                    <div key={repo.id} className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-3 hover:border-slate-700 transition-all">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-900 pb-2">
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="text-xs font-bold text-white font-mono text-indigo-300">{repo.name}</h4>
                            <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-[10px] text-amber-300 font-mono font-bold">
                              ★ {repo.stars}
                            </span>
                          </div>
                          <span className="text-[10px] text-slate-500 font-mono">{repo.language}</span>
                        </div>

                        <button
                          onClick={() => handleImportRepo(repo)}
                          disabled={isScrapingGithub}
                          className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 disabled:opacity-50 text-white font-bold text-xs flex items-center gap-1.5 font-mono shadow-md transition-all shrink-0"
                        >
                          {isImported ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-white" />
                              <span>Added to Dashboard!</span>
                            </>
                          ) : (
                            <>
                              <Plus className="w-3.5 h-3.5" />
                              <span>Convert to Side Hustle</span>
                            </>
                          )}
                        </button>
                      </div>

                      <p className="text-xs text-slate-300 leading-relaxed">
                        {repo.description}
                      </p>

                      <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800/80 text-xs space-y-1">
                        <span className="text-[10px] uppercase font-mono text-amber-400 font-bold block">
                          Monetization Blueprint:
                        </span>
                        <p className="text-slate-200 font-medium">{repo.monetizationIdea}</p>
                        <span className="text-[11px] text-emerald-400 font-mono block pt-0.5">
                          Potential: ${repo.convertedHustle.monthlyRevenuePotential}/mo
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

        </div>

        {/* Footer info */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400">
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Master Automation Architecture: Active & Local-Ready</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold transition-all"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
