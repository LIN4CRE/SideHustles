import { SideHustle } from '../types';

export interface TrendingRepo {
  id: string;
  name: string;
  stars: string;
  forks: string;
  language: string;
  tags: ('automation' | 'LLM' | 'side-hustle' | 'MCP' | 'Obsidian' | 'Android' | 'Windows')[];
  description: string;
  monetizationIdea: string;
  monthlyRevenueEstimate: number;
  lastScraped: string;
  convertedHustle: SideHustle;
}

export const INITIAL_TRENDING_REPOS: TrendingRepo[] = [
  {
    id: 'repo-browser-use',
    name: 'browser-use / web-automation-agent',
    stars: '18.4k',
    forks: '2.1k',
    language: 'Python / TypeScript',
    tags: ['automation', 'LLM', 'side-hustle'],
    description: 'Autonomous browser controller that enables local AI models to navigate websites, bypass CAPTCHAs, extract lead emails, and perform audits.',
    monetizationIdea: 'Auto-lead generation and Google Maps local business audit agency.',
    monthlyRevenueEstimate: 3400,
    lastScraped: 'Just now',
    convertedHustle: {
      id: 'github-browser-use-auditor',
      title: 'Browser-Use AI Web Audit & Lead Automation',
      category: 'AI & Automation',
      tagline: 'Runs browser-use AI agents locally via Ollama to perform web audits',
      startupCost: 0,
      marginPercentage: 95,
      monthlyRevenuePotential: 3400,
      automationScore: 92,
      weeklyHoursNeeded: 2,
      difficulty: 'Beginner',
      description: 'Runs browser-use AI agents locally via Ollama to automatically browse local trade websites, perform technical audits, and email site owners.',
      traditionalModel: 'Manual web design audits requiring hours of browsing',
      automatedUpgrade: 'Ollama Playwright MCP auto-audits 50 sites an hour and drafts value emails',
      scalabilityPillars: ['Zero API cost local execution', 'Automated email pitch delivery', 'Instant PayPal invoice link injection'],
      recommendedTools: ['Ollama (Local LLM)', 'Browser-Use MCP', 'Obsidian', 'PayPal/Bank'],
      workflowBlueprint: [
        { stepNumber: 1, title: 'Connect Ollama + Playwright MCP', tool: 'Ollama / Browser-Use', description: 'Headless browser setup', isAutomated: true },
        { stepNumber: 2, title: 'Scrape Target Business URLs', tool: 'Google Maps MCP', description: 'Scrape 50 local phone/email leads', isAutomated: true },
        { stepNumber: 3, title: 'Generate Audit PDF', tool: 'Obsidian Markdown', description: 'Output clean audit note', isAutomated: true },
        { stepNumber: 4, title: 'Send Free Value Pitch', tool: 'Auto-Emailer Bot', description: 'Includes PayPal $100 fix link', isAutomated: true }
      ],
      defaultEconomics: {
        pricePerUnit: 99,
        monthlyCustomers: 35,
        monthlyOperatingCost: 50,
        conversionRate: 3.5,
        estimatedMonthlyLeads: 1000,
        fulfillmentCostPerUnit: 0
      },
      sampleHook: 'We found 3 critical speed glitches on your HVAC website - here is the fix.',
      sampleAudience: 'Local Trade Services & HVAC Contractors',
      realisticWeek1Earnings: '£0.00 - £50.00 (Requires sending 15-20 direct web audit pitches)',
      honestRealityCheck: 'Running Ollama and browser-use is 100% free locally. If you email 15 local HVAC or plumbing sites with a free audit preview, realistically 1 owner pays £50 in Week 1.',
      baseViabilityScore: 94
    }
  },
  {
    id: 'repo-mcp-obsidian',
    name: 'calclavia / mcp-obsidian-vault-agent',
    stars: '9.2k',
    forks: '840',
    language: 'TypeScript',
    tags: ['MCP', 'Obsidian', 'side-hustle', 'automation'],
    description: 'Model Context Protocol (MCP) server for Obsidian. Enables AI agents to create micro-vaults, cheat-sheets, and digital assets automatically.',
    monetizationIdea: 'Auto-generate and publish micro Notion & Obsidian template vaults on Gumroad.',
    monthlyRevenueEstimate: 2800,
    lastScraped: '5 mins ago',
    convertedHustle: {
      id: 'github-obsidian-micro-vaults',
      title: 'Obsidian MCP Automated Micro-Vault Publisher',
      category: 'Digital Products',
      tagline: 'Uses Obsidian MCP + Smart Connections plugin to generate niche knowledge vaults',
      startupCost: 0,
      marginPercentage: 98,
      monthlyRevenuePotential: 2800,
      automationScore: 95,
      weeklyHoursNeeded: 1,
      difficulty: 'Beginner',
      description: 'Uses Obsidian MCP + Smart Connections plugin to automatically generate niche knowledge vaults and sell them for $15-$49 each.',
      traditionalModel: 'Manually writing Notion templates and typing out PDF guides',
      automatedUpgrade: 'Local LLM writes full Markdown vaults and exports Gumroad packages automatically',
      scalabilityPillars: ['Instant markdown vault generation', 'Evergreen Gumroad store sales', 'Zero ongoing inventory cost'],
      recommendedTools: ['Obsidian Desktop', 'MCP Obsidian Vault', 'Gumroad', 'PayPal'],
      workflowBlueprint: [
        { stepNumber: 1, title: 'Mount Obsidian Vault Folder', tool: 'Obsidian MCP', description: 'Grant agent read/write permissions', isAutomated: true },
        { stepNumber: 2, title: 'Generate Vault Structure', tool: 'Local Llama 3.2', description: 'Write 20 Markdown guide files', isAutomated: true },
        { stepNumber: 3, title: 'Export PDF Package', tool: 'Obsidian Pandoc', description: 'Build high-converting ebook package', isAutomated: true },
        { stepNumber: 4, title: 'Publish to Gumroad API', tool: 'Gumroad Webhook', description: 'Automated listing & payout setup', isAutomated: true }
      ],
      defaultEconomics: {
        pricePerUnit: 29,
        monthlyCustomers: 95,
        monthlyOperatingCost: 0,
        conversionRate: 4.2,
        estimatedMonthlyLeads: 2500,
        fulfillmentCostPerUnit: 0
      },
      sampleHook: 'The ultimate 2026 Python & AI agent cheat sheet vault for developers.',
      sampleAudience: 'Self-taught coders, AI hobbyists, productivity enthusiasts',
      realisticWeek1Earnings: '10p - £15.00 (Pay-what-you-want Gumroad downloads start small)',
      honestRealityCheck: 'Markdown vaults earn small initial downloads or micro-donations (10p to £1.50) in Week 1 from Reddit/X threads. Expect £0 to £15 total in your first 7 days.',
      baseViabilityScore: 92
    }
  },
  {
    id: 'repo-autogen-reputation',
    name: 'microsoft / autogen-reputation-bot',
    stars: '32.1k',
    forks: '4.8k',
    language: 'Python',
    tags: ['automation', 'LLM', 'side-hustle', 'Windows'],
    description: 'Multi-agent orchestration framework. Configures specialized review response and lead reactivation bots for small businesses.',
    monetizationIdea: 'Local Business AI Review & Reputation Retainer.',
    monthlyRevenueEstimate: 4200,
    lastScraped: '12 mins ago',
    convertedHustle: {
      id: 'github-autogen-reputation',
      title: 'AutoGen Local Business Reputation & Lead Engine',
      category: 'Local Lead Gen',
      tagline: 'Deploys multi-agent AutoGen team to monitor Google Business profiles',
      startupCost: 0,
      marginPercentage: 90,
      monthlyRevenuePotential: 4200,
      automationScore: 88,
      weeklyHoursNeeded: 3,
      difficulty: 'Intermediate',
      description: 'Deploys multi-agent AutoGen team to monitor local Google Business profiles, reply to reviews in 60s, and generate review invite QR codes.',
      traditionalModel: 'Paying a staff member to read and manually reply to Google reviews',
      automatedUpgrade: 'AutoGen multi-agent bot auto-replies with personalized empathetic messages',
      scalabilityPillars: ['Monthly recurring agency retainer', 'Multi-agent review response', 'Automated monthly review report'],
      recommendedTools: ['AutoGen Framework', 'Ollama / LM Studio', 'Google API', 'Bank Account'],
      workflowBlueprint: [
        { stepNumber: 1, title: 'Initialize AutoGen Agent Team', tool: 'AutoGen / Ollama', description: 'Lead agent + Review agent', isAutomated: true },
        { stepNumber: 2, title: 'Scan Google Business Reviews', tool: 'Google Business API', description: 'Detect new customer feedback', isAutomated: true },
        { stepNumber: 3, title: 'Generate Hyper-Personalized Reply', tool: 'Local LLM Agent', description: 'Draft empathetic 5-star response', isAutomated: true },
        { stepNumber: 4, title: 'Collect Monthly Retainer', tool: 'PayPal Subscription', description: 'Auto-bill $199/mo', isAutomated: true }
      ],
      defaultEconomics: {
        pricePerUnit: 199,
        monthlyCustomers: 21,
        monthlyOperatingCost: 100,
        conversionRate: 5.0,
        estimatedMonthlyLeads: 400,
        fulfillmentCostPerUnit: 0
      },
      sampleHook: 'Never leave a Google review unresponded - auto-reply in 60 seconds.',
      sampleAudience: 'Local restaurants, dentists, plumbers, beauty salons',
      realisticWeek1Earnings: '£0.00 - £199.00 (1 local client if pitched in person or phone call)',
      honestRealityCheck: 'Multi-agent AutoGen setup takes 1-2 hours. Pitching local business owners directly yields 0 to 1 trial retainer ($199) in Week 1.',
      baseViabilityScore: 90
    }
  },
  {
    id: 'repo-termux-ai-hustler',
    name: 'termux-community / android-local-ai-hustle',
    stars: '6.7k',
    forks: '920',
    language: 'Shell / Python',
    tags: ['Android', 'LLM', 'automation', 'side-hustle'],
    description: 'Runs zero-cost background lead scrapers and AI email bots on Android phones using Termux and lightweight quantized local LLMs.',
    monetizationIdea: '24/7 Mobile Cold Outreach & Lead Discovery Engine.',
    monthlyRevenueEstimate: 2200,
    lastScraped: '25 mins ago',
    convertedHustle: {
      id: 'github-termux-mobile-hustler',
      title: 'Termux Android 24/7 Local AI Outreach Engine',
      category: 'AI & Automation',
      tagline: 'Runs zero-cost background lead scrapers and AI email bots on Android phones',
      startupCost: 0,
      marginPercentage: 99,
      monthlyRevenuePotential: 2200,
      automationScore: 96,
      weeklyHoursNeeded: 1,
      difficulty: 'Beginner',
      description: 'Leverages old Android phones to run Termux + Ollama (Phi-3) in the background as a continuous, zero-electricity lead finder.',
      traditionalModel: 'Renting expensive cloud VPS servers for simple Python web scrapers',
      automatedUpgrade: 'Spare Android smartphone runs Termux and Phi-3 mini 24/7 for zero cost',
      scalabilityPillars: ['Zero cloud server bills', 'Continuous 24/7 background operation', 'Direct Telegram lead notifications'],
      recommendedTools: ['Android Phone', 'Termux', 'Ollama', 'PayPal'],
      workflowBlueprint: [
        { stepNumber: 1, title: 'Setup Termux Background Service', tool: 'Termux / Tasker', description: 'Keep process active in battery settings', isAutomated: true },
        { stepNumber: 2, title: 'Pull Light Model (Phi-3)', tool: 'Ollama Mobile', description: 'Fast 1.8GB model loading', isAutomated: true },
        { stepNumber: 3, title: 'Run Scraper Bot', tool: 'Python Termux', description: 'Scrape 100 local trade listings daily', isAutomated: true },
        { stepNumber: 4, title: 'Receive Direct Payouts', tool: 'PayPal.me', description: 'Automatic client delivery via Telegram bot', isAutomated: true }
      ],
      defaultEconomics: {
        pricePerUnit: 50,
        monthlyCustomers: 44,
        monthlyOperatingCost: 0,
        conversionRate: 6.0,
        estimatedMonthlyLeads: 700,
        fulfillmentCostPerUnit: 0
      },
      sampleHook: 'Turn your old Android phone into a 24/7 lead finding machine.',
      sampleAudience: 'B2B sales reps, local marketing agencies, lead brokers',
      realisticWeek1Earnings: '£0.00 - £50.00 (1 lead list sale to a B2B sales rep)',
      honestRealityCheck: 'Termux runs on Android for $0 electricity cost. Reaching out to B2B sales reps or agency owners yields 0 to 1 lead list sale (£50) in Week 1.',
      baseViabilityScore: 93
    }
  },
  {
    id: 'repo-mcp-financial-invoicer',
    name: 'financial-ai / mcp-bank-paypal-invoicer',
    stars: '14.1k',
    forks: '1.4k',
    language: 'TypeScript / Go',
    tags: ['MCP', 'automation', 'side-hustle'],
    description: 'MCP server that automatically creates PayPal checkout links, tracks direct bank sorting codes (05-02-30), and verifies client payments.',
    monetizationIdea: 'Automated Payout Router & Instant Invoice Generator.',
    monthlyRevenueEstimate: 4500,
    lastScraped: '30 mins ago',
    convertedHustle: {
      id: 'github-mcp-payout-router',
      title: 'MCP Autonomous Bank & PayPal Payout Router',
      category: 'AI & Automation',
      tagline: 'Automatically creates PayPal checkout links and verifies bank deposits',
      startupCost: 0,
      marginPercentage: 97,
      monthlyRevenuePotential: 4500,
      automationScore: 94,
      weeklyHoursNeeded: 1,
      difficulty: 'Beginner',
      description: 'Automatically injects bank routing (05-02-30 / 49193968) and PayPal.me credentials into client proposals to close sales instantly.',
      traditionalModel: 'Sending manual invoice PDFs and waiting days for bank clearing',
      automatedUpgrade: 'MCP payment agent auto-embeds instant deposit links with zero fees',
      scalabilityPillars: ['Direct bank settlement', 'Zero platform transaction fees', 'Instant client confirmation webhook'],
      recommendedTools: ['MCP Payment Server', 'PayPal.me', 'Bank Account', 'Ollama'],
      workflowBlueprint: [
        { stepNumber: 1, title: 'Authorize Payment Router MCP', tool: 'PayPal / Bank API', description: 'Link direct routing numbers', isAutomated: true },
        { stepNumber: 2, title: 'Inject Dynamic Checkout Link', tool: 'Local Agent', description: 'Generate $50-$500 deposit URL', isAutomated: true },
        { stepNumber: 3, title: 'Auto-Send Invoice Email', tool: 'Auto-Mail Bot', description: 'Zero-friction client deposit request', isAutomated: true },
        { stepNumber: 4, title: 'Instant Deposit Notification', tool: 'Webhook Listener', description: 'Log revenue in dashboard', isAutomated: true }
      ],
      defaultEconomics: {
        pricePerUnit: 150,
        monthlyCustomers: 30,
        monthlyOperatingCost: 0,
        conversionRate: 8.0,
        estimatedMonthlyLeads: 375,
        fulfillmentCostPerUnit: 0
      },
      sampleHook: 'Automate client invoice generation and get paid direct to bank in minutes.',
      sampleAudience: 'Freelancers, agency owners, digital product sellers',
      realisticWeek1Earnings: '£0.00 - £100.00 (Depends on active client proposals closed)',
      honestRealityCheck: 'Auto-injecting PayPal/Bank routing allows instant checkout, but relies on pitching clients for your underlying service.',
      baseViabilityScore: 96
    }
  }
];

export function getStoredTrendingRepos(): TrendingRepo[] {
  try {
    const stored = localStorage.getItem('sh_trending_repos');
    if (stored) return JSON.parse(stored);
  } catch (e) {
    console.error('Failed to load trending repos', e);
  }
  return INITIAL_TRENDING_REPOS;
}

export function saveTrendingRepos(repos: TrendingRepo[]): void {
  try {
    localStorage.setItem('sh_trending_repos', JSON.stringify(repos));
  } catch (e) {
    console.error('Failed to save trending repos', e);
  }
}

export async function scrapeLatestTrendingRepos(): Promise<TrendingRepo[]> {
  // Simulate live scraping from GitHub Trending / Topics API
  await new Promise((resolve) => setTimeout(resolve, 1500));
  
  const current = getStoredTrendingRepos();
  const updated = current.map((repo) => ({
    ...repo,
    lastScraped: 'Just now',
    stars: `${(parseFloat(repo.stars) + (Math.random() > 0.5 ? 0.1 : 0)).toFixed(1)}k`
  }));

  saveTrendingRepos(updated);
  return updated;
}
