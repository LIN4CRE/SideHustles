import { SideHustle } from '../types';

export const SIDE_HUSTLES: SideHustle[] = [
  {
    id: 'free-local-seo-tag-booster',
    title: 'Free AI SEO Meta & Tag Repair Service',
    category: 'Free Starter Sets',
    isFreeStarterSet: true,
    tagline: '$0 Free Starter Set: Generate 5 free SEO meta tags for local businesses, prove instant search ranking value, then convert to a paid £25-£100 audit.',
    description: 'A 100% free-tier proof-of-concept starter set. Scan local business websites with Gemini Free API, generate 5 ready-to-paste optimized meta tags & title tags, and email them to the owner for free. Once they see Google search snippet improvements, they pay you £25 to fix their entire site.',
    startupCost: 0,
    marginPercentage: 100,
    monthlyRevenuePotential: 1800,
    automationScore: 95,
    weeklyHoursNeeded: 2,
    difficulty: 'Beginner',
    traditionalModel: 'Cold pitching $1,000/mo SEO retainers with zero proof to skeptical local owners who hang up immediately.',
    automatedUpgrade: 'Give away 5 optimized meta descriptions for FREE upfront using Gemini 3.6 Flash. When local owners copy-paste them and see their Google search preview improve within 24 hours, they gladly pay £25-£100 for a full site audit.',
    scalabilityPillars: [
      '100% Free Software Stack: $0 startup risk using Gemini Free API & Gmail',
      'Zero-friction pitch: "Here are 5 free meta tags for your site, no strings attached"',
      'Instant trust foundation: Converts 1 in 8 local owners into paying clients'
    ],
    recommendedTools: ['Gemini 3.6 Flash (Free)', 'Google Search Console', 'Gmail (Free)'],
    freeStarterSet: {
      starterKitName: '1-Click Local SEO Tag Repair Kit',
      setupTimeMinutes: 5,
      expectedDay1Earnings: '£15.00 - £50.00 / 24 hrs',
      zeroCostToolsUsed: ['Gemini 3.6 Flash (Free)', 'Google Chrome', 'Free Gmail'],
      proofOfConceptMechanism: 'Send 5 free generated meta descriptions to a local plumber/bakery. They paste them in WordPress, see instant Google snippet improvements, and pay £25 to fix the remaining 30 pages.',
      trustBuildingLadder: 'Proves cold business owners buy when value is delivered upfront with $0 capital. Builds confidence to upgrade to the $11,000/mo Local AI Review & Lead Engine.',
      upgradeToHustleId: 'local-ai-reputation-agent',
      upgradeToHustleTitle: 'Local Business AI Review & Lead Engine ($11,000/mo)'
    },
    workflowBlueprint: [
      {
        stepNumber: 1,
        title: 'Free Local Website Quick Scan',
        tool: 'Gemini Free Search',
        description: 'Find a local service site missing meta descriptions or title tags.',
        isAutomated: true
      },
      {
        stepNumber: 2,
        title: 'Generate 5 Free Meta Tags',
        tool: 'Gemini 3.6 Flash',
        description: 'AI crafts 5 high-CTR meta descriptions with target city keywords in 3 seconds.',
        isAutomated: true
      },
      {
        stepNumber: 3,
        title: 'Send Zero-Pitch Gift Email',
        tool: 'Gmail',
        description: 'Email owner: "Hi! Made 5 free meta tags for your site to boost Google clicks. Paste them in for free!"',
        isAutomated: false
      },
      {
        stepNumber: 4,
        title: 'Convert Trust to £25 Site Audit',
        tool: 'Stripe / PayPal ($0)',
        description: 'Owner thanks you and asks to audit remaining pages for £25-£50.',
        isAutomated: true
      }
    ],
    defaultEconomics: {
      pricePerUnit: 25,
      monthlyCustomers: 20,
      monthlyOperatingCost: 0,
      conversionRate: 12.0,
      estimatedMonthlyLeads: 160,
      fulfillmentCostPerUnit: 0
    },
    sampleHook: 'I analyzed your website and wrote 5 free Google meta tags for your business. Here they are—no cost or sign-up needed!',
    sampleAudience: 'Local plumbers, roofers, dentists, bakeries, auto repair shops',
    baseViabilityScore: 98,
    zapierBlueprint: {
      blueprintName: 'Free Local SEO Tag Repair & Pitch Generator',
      description: 'Generates 5 free SEO meta tags using Gemini, drafts zero-pressure email offer, and logs response in free Google Sheet.',
      platform: 'Make.com',
      nodes: [
        {
          id: 'seo-1',
          type: 'trigger',
          toolName: 'Google Sheets / Form',
          iconName: 'Database',
          actionTitle: 'New Local Business URL Input',
          description: 'Paste local business name and website URL.',
          samplePayload: '{\n  "business": "Apex Plumbing",\n  "city": "Austin TX",\n  "url": "apexplumbingaustin.com"\n}'
        },
        {
          id: 'seo-2',
          type: 'action',
          toolName: 'Gemini 3.6 Flash (Free)',
          iconName: 'Bot',
          actionTitle: 'Generate 5 High-CTR Meta Descriptions',
          description: 'Outputs 5 search-optimized meta tags and 1 zero-pitch email draft in 2 seconds.',
          samplePayload: '{\n  "prompt": "Write 5 meta descriptions for Apex Plumbing in Austin TX..."\n}'
        }
      ]
    }
  },
  {
    id: 'free-ai-doc-formatting-service',
    title: 'Free AI Document & Resume Polisher',
    category: 'Free Starter Sets',
    isFreeStarterSet: true,
    tagline: '$0 Free Starter Set: Format messy resumes and client proposals in 10 seconds using free AI templates on Fiverr/Reddit for quick $10-$25 payouts.',
    description: 'A zero-cost starter set for instant freelance earnings. Offer free 1-bullet resume polishing or doc reformatting on Reddit, LinkedIn, or Fiverr. Use Gemini 3.6 Flash ($0) to transform messy text into clean, high-impact Markdown or Canva PDF layouts in seconds.',
    startupCost: 0,
    marginPercentage: 100,
    monthlyRevenuePotential: 1500,
    automationScore: 96,
    weeklyHoursNeeded: 2,
    difficulty: 'Beginner',
    traditionalModel: 'Manually spending 2 hours re-typing Word docs and re-aligning bullet points for low pay.',
    automatedUpgrade: 'Paste raw client notes into Gemini free prompt kit. AI formats executive summary, re-writes bullet points with metric achievements, and outputs clean format in 5 seconds. Earn $10-$25 per document.',
    scalabilityPillars: [
      'Zero Software COGS: Uses 100% free Gemini API & Google Docs',
      'Instant gratification: Takes 10 seconds per order fulfillment',
      'High repeat business: Job seekers and students order multiple docs'
    ],
    recommendedTools: ['Gemini 3.6 Flash (Free)', 'Google Docs (Free)', 'Canva Free'],
    freeStarterSet: {
      starterKitName: 'Instant AI Resume & Proposal Formatter',
      setupTimeMinutes: 5,
      expectedDay1Earnings: '£10.00 - £30.00 / 24 hrs',
      zeroCostToolsUsed: ['Gemini 3.6 Flash', 'Google Docs', 'Fiverr Free Account'],
      proofOfConceptMechanism: 'Post "I will reformat 1 resume bullet point with metric achievements for free" in Reddit r/Resumes. Users test it, love the output, and pay $15 for the full document.',
      trustBuildingLadder: 'Proves clients pay real money for fast aesthetic polish. Prepares you to scale into the $15,000/mo AI Pitch Deck & Proposal Studio.',
      upgradeToHustleId: 'ai-pitchdeck-agency',
      upgradeToHustleTitle: 'AI Pitch Deck & Proposal Studio ($15,000/mo)'
    },
    workflowBlueprint: [
      {
        stepNumber: 1,
        title: 'Receive Raw Notes / Resume',
        tool: 'Fiverr / Reddit / Gmail',
        description: 'Client sends messy Word document or bullet points.',
        isAutomated: false
      },
      {
        stepNumber: 2,
        title: 'AI Executive Polish',
        tool: 'Gemini 3.6 Flash',
        description: 'Gemini rewrites bullets with action verbs, metrics, and structured sections.',
        isAutomated: true
      },
      {
        stepNumber: 3,
        title: 'Export Clean Layout',
        tool: 'Google Docs / Canva Free',
        description: 'Paste into clean template layout and export PDF in 1 minute.',
        isAutomated: true
      }
    ],
    defaultEconomics: {
      pricePerUnit: 15,
      monthlyCustomers: 30,
      monthlyOperatingCost: 0,
      conversionRate: 15.0,
      estimatedMonthlyLeads: 200,
      fulfillmentCostPerUnit: 0
    },
    sampleHook: 'Send me your messy resume bullet point and I will rewrite it with executive-level metrics in 10 seconds for FREE.',
    sampleAudience: 'Job seekers, college graduates, freelancers, sales representatives',
    baseViabilityScore: 97
  },
  {
    id: 'free-notion-micro-cheatsheet-vault',
    title: 'Free Notion Micro-Cheatsheet Monetizer',
    category: 'Free Starter Sets',
    isFreeStarterSet: true,
    tagline: '$0 Free Starter Set: Build 1-page Notion checklists & prompt guides, host on Gumroad ($0 upfront), and collect 20p-£5 organic downloads.',
    description: 'Build single-page Notion micro-templates (e.g. 50 ChatGPT Prompts for Marketers, Solopreneur Weekly Audit) for free. Host on Gumroad with "pay what you want" pricing starting at £0 or £1. Post threads on Reddit/X to generate instant hands-off downloads.',
    startupCost: 0,
    marginPercentage: 100,
    monthlyRevenuePotential: 2100,
    automationScore: 97,
    weeklyHoursNeeded: 1,
    difficulty: 'Beginner',
    traditionalModel: 'Spending $300 on website building, ad traffic, and complex ecommerce setups.',
    automatedUpgrade: 'Create 1 Notion page in 10 minutes using Gemini to research top prompts/checklists. Publish to Gumroad ($0 cost). Share link on social media and collect instant pay-what-you-warned earnings on autopilot.',
    scalabilityPillars: [
      '100% Net Profit: Zero hosting costs on Notion & Gumroad',
      'Evergreen digital asset: Earns passive micro-payouts indefinitely',
      'Builds email subscriber list for future paid bundle launches'
    ],
    recommendedTools: ['Notion (Free)', 'Gumroad ($0 Upfront)', 'Gemini 3.6 Flash', 'Reddit / X'],
    freeStarterSet: {
      starterKitName: 'Notion Micro-Guide & Gumroad Kit',
      setupTimeMinutes: 10,
      expectedDay1Earnings: '20p - £10.00 / day 1 downloads',
      zeroCostToolsUsed: ['Notion Free Tier', 'Gumroad $0 Account', 'Reddit / X'],
      proofOfConceptMechanism: 'Distribute a 1-page "Solopreneur AI Prompt Sheet" on Reddit. 50 people download it for free, and 8 people pay £1-£3 voluntary donation.',
      trustBuildingLadder: 'Proves users download digital products automatically without human intervention. Prepares you to launch the full AI Digital Product & Notion System Vault ($6,000/mo).',
      upgradeToHustleId: 'digital-asset-vault',
      upgradeToHustleTitle: 'AI Digital Product & Notion System Vault ($6,000/mo)'
    },
    workflowBlueprint: [
      {
        stepNumber: 1,
        title: 'Generate Cheatsheet Content',
        tool: 'Gemini 3.6 Flash',
        description: 'Ask AI for 20 high-value workflow rules or prompts in target niche.',
        isAutomated: true
      },
      {
        stepNumber: 2,
        title: 'Paste into Free Notion Template',
        tool: 'Notion Free',
        description: 'Structure clean Notion page with checkboxes and toggle headers.',
        isAutomated: false
      },
      {
        stepNumber: 3,
        title: 'Publish to Gumroad ($0)',
        tool: 'Gumroad API',
        description: 'Set up "Pay what you want" ($0+) digital product listing in 2 minutes.',
        isAutomated: true
      }
    ],
    defaultEconomics: {
      pricePerUnit: 3,
      monthlyCustomers: 120,
      monthlyOperatingCost: 0,
      conversionRate: 8.0,
      estimatedMonthlyLeads: 1500,
      fulfillmentCostPerUnit: 0
    },
    sampleHook: 'I built a 1-page Notion Cheatsheet with 50 AI prompts for agency growth. Free download link below!',
    sampleAudience: 'Solopreneurs, agency owners, digital creators, students',
    baseViabilityScore: 96
  },
  {
    id: 'ai-outreach-agency',
    title: 'AI Automated Lead Gen & Outreach Agency',
    category: 'AI & Automation',
    tagline: 'Hyper-personalized cold email and LinkedIn lead generation powered by AI agents.',
    description: 'Provide B2B businesses with qualified sales meetings on autopilot using web-scraping, AI contact enrichment, and automated campaign sequencing.',
    startupCost: 150,
    marginPercentage: 90,
    monthlyRevenuePotential: 12500,
    automationScore: 92,
    weeklyHoursNeeded: 4,
    difficulty: 'Intermediate',
    traditionalModel: 'Manually scraping leads, writing custom emails one by one, manually tracking responses, and scheduling meetings.',
    automatedUpgrade: 'AI scrapers automatically pull ideal prospects, Gemini enriches prospect bios, auto-generates custom icebreakers, sequences emails, and AI booking bots directly schedule calls on Calendly.',
    scalabilityPillars: [
      'Zero incremental marginal cost per lead enriched',
      'Plug-and-play client onboarding templates via Airtable/Make',
      'Performance billing: Charging $250-$500 per qualified meeting booked'
    ],
    recommendedTools: ['Apollo.io', 'Make.com', 'Gemini API', 'Instantly.ai', 'Calendly'],
    workflowBlueprint: [
      {
        stepNumber: 1,
        title: 'Programmatic Scraping',
        tool: 'Apollo / Clay',
        description: 'Automatically pull 1,000 verified decision-maker emails weekly based on buyer criteria.',
        isAutomated: true
      },
      {
        stepNumber: 2,
        title: 'AI Profile Enrichment',
        tool: 'Gemini API + Make.com',
        description: 'Analyze company website & LinkedIn to generate personalized 2-sentence opening lines.',
        isAutomated: true
      },
      {
        stepNumber: 3,
        title: 'Automated Cold Sequencing',
        tool: 'Instantly.ai / Smartlead',
        description: 'Send 4-step email sequence across warm secondary domains with auto-rotated senders.',
        isAutomated: true
      },
      {
        stepNumber: 4,
        title: 'AI Reply Intent Classification',
        tool: 'Gemini AI Bot',
        description: 'Classify replies into "Interested", "Objection", "Not Now" and automatically send booking link.',
        isAutomated: true
      }
    ],
    defaultEconomics: {
      pricePerUnit: 2500, // $2,500 monthly retainer or pay-per-meeting equivalent
      monthlyCustomers: 5,
      monthlyOperatingCost: 350,
      conversionRate: 3.5,
      estimatedMonthlyLeads: 200,
      fulfillmentCostPerUnit: 120
    },
    sampleHook: 'We guarantee 10+ B2B sales meetings per month for marketing agencies using AI prospect enrichment or you pay $0.',
    sampleAudience: 'B2B SaaS companies, digital marketing agencies, high-ticket consultants',
    baseViabilityScore: 92,
    zapierBlueprint: {
      blueprintName: 'Apollo to Gemini AI Enriched B2B Lead Generator',
      description: 'Captures fresh prospects from Apollo/Clay, runs AI background enrichment in Gemini to craft bespoke icebreakers, logs to Airtable CRM, and syncs to Instantly cold email sequencing.',
      platform: 'Zapier',
      nodes: [
        {
          id: 'node-1',
          type: 'trigger',
          toolName: 'Apollo.io / Clay Webhook',
          iconName: 'Webhook',
          actionTitle: 'New B2B Prospect Webhook',
          description: 'Fires instantly when a verified decision maker matches target ICP criteria.',
          samplePayload: '{\n  "email": "alex.m@saasify.io",\n  "name": "Alex Mercer",\n  "company": "SaaSify Inc",\n  "title": "Head of Growth",\n  "industry": "B2B SaaS"\n}',
          setupTip: 'Set webhook trigger on "Saved Prospect View" with auto-verification enabled.'
        },
        {
          id: 'node-2',
          type: 'action',
          toolName: 'Gemini 3.6 Flash',
          iconName: 'Bot',
          actionTitle: 'Generate Hyper-Personalized Icebreaker',
          description: 'Analyzes prospect company profile and outputs 2 bespoke intro sentences focusing on revenue bottlenecks.',
          samplePayload: '{\n  "prompt": "Write a 2-sentence icebreaker for Alex Mercer at SaaSify Inc...",\n  "temperature": 0.4\n}',
          setupTip: 'Include system prompt specifying concise, non-pushy tone without fluff.'
        },
        {
          id: 'node-3',
          type: 'action',
          toolName: 'Airtable CRM',
          iconName: 'Database',
          actionTitle: 'Upsert Prospect Record',
          description: 'Saves full profile, custom icebreaker, lead score, and campaign assignment.',
          samplePayload: '{\n  "Email": "alex.m@saasify.io",\n  "Status": "Enriched",\n  "Icebreaker": "Noticed SaaSify\'s recent Series A..."\n}',
          setupTip: 'Set Email as primary lookup field to avoid duplicate entries.'
        },
        {
          id: 'node-4',
          type: 'action',
          toolName: 'Instantly.ai / Smartlead',
          iconName: 'Send',
          actionTitle: 'Push to Cold Outreach Sequence',
          description: 'Adds lead to 4-step automated email sequence with custom variables.',
          samplePayload: '{\n  "campaign_id": "cmp_b2b_growth",\n  "variables": { "icebreaker": "{{node2.icebreaker}}" }\n}',
          setupTip: 'Cap daily sending volume to 25 emails per domain.'
        },
        {
          id: 'node-5',
          type: 'action',
          toolName: 'Calendly + Stripe',
          iconName: 'CreditCard',
          actionTitle: 'Auto-Confirm Meeting & Retainer',
          description: 'Schedules meeting directly on founder calendar and triggers performance invoice upon meeting completion.',
          setupTip: 'Use Calendly Webhook "Invitee Created" to update Airtable lead stage to "Meeting Scheduled".'
        }
      ]
    }
  },
  {
    id: 'niche-micro-saas',
    title: 'Niche Workflow Micro-SaaS',
    category: 'Micro-SaaS',
    tagline: 'Single-purpose web tool or Chrome extension solving a high-friction business pain point.',
    description: 'Build a lightweight, hyper-focused utility tool (e.g., automated invoice parser, LinkedIn formatting optimizer, PDF dataset extractor) with recurring subscription pricing.',
    startupCost: 50,
    marginPercentage: 95,
    monthlyRevenuePotential: 8500,
    automationScore: 96,
    weeklyHoursNeeded: 2,
    difficulty: 'Intermediate',
    traditionalModel: 'Offering custom development or manual data formatting as a hourly freelancer.',
    automatedUpgrade: '100% cloud-hosted self-serve tool where users sign up, pay via Stripe, use automated Gemini AI transformations, and self-manage accounts with zero human intervention.',
    scalabilityPillars: [
      'Zero manual fulfillment per customer transaction',
      'SEO-driven viral utility pages for programmatic organic traffic',
      'High retention through workflow integration'
    ],
    recommendedTools: ['Vite + Express', 'Stripe Billing', 'Gemini API', 'Supabase', 'Vercel/Cloud Run'],
    workflowBlueprint: [
      {
        stepNumber: 1,
        title: 'Free Tool Traffic Magnet',
        tool: 'Programmatic Web App',
        description: 'User enters input on free trial tool ranking for long-tail SEO keywords.',
        isAutomated: true
      },
      {
        stepNumber: 2,
        title: 'Self-Serve Stripe Checkout',
        tool: 'Stripe Elements',
        description: 'User unlocks unlimited usage or export features for $19/mo subscription.',
        isAutomated: true
      },
      {
        stepNumber: 3,
        title: 'Serverless AI API Processing',
        tool: 'Express + Gemini API',
        description: 'Fast backend execution handles file conversion, formatting, or AI insights in <2 seconds.',
        isAutomated: true
      },
      {
        stepNumber: 4,
        title: 'Automated Lifecycle Email Retention',
        tool: 'Resend / Loops.so',
        description: 'Drip campaign encourages usage, showcases new features, and reduces churn.',
        isAutomated: true
      }
    ],
    defaultEconomics: {
      pricePerUnit: 29, // $29/mo subscription
      monthlyCustomers: 280,
      monthlyOperatingCost: 180,
      conversionRate: 2.8,
      estimatedMonthlyLeads: 10000,
      fulfillmentCostPerUnit: 1.5
    },
    sampleHook: 'Stop spending 4 hours a week manually reformatting client reports. Transform raw PDFs into clean CSVs in 3 seconds.',
    sampleAudience: 'Freelancers, accountants, HR recruiters, real estate brokers',
    baseViabilityScore: 95,
    zapierBlueprint: {
      blueprintName: 'Stripe Webhook to Gemini Cloud API & Resend License Sync',
      description: 'Handles self-serve Micro-SaaS signups, creates API tokens in Supabase, triggers serverless Gemini transformation pipeline, and sends welcome onboarding sequences.',
      platform: 'Make.com',
      nodes: [
        {
          id: 'ms-1',
          type: 'trigger',
          toolName: 'Stripe Checkout',
          iconName: 'CreditCard',
          actionTitle: 'Customer Payment Succeeded',
          description: 'Triggers when user completes $29/mo checkout on landing page.',
          samplePayload: '{\n  "customer_email": "dev@builds.com",\n  "plan": "pro_monthly_29",\n  "stripe_customer_id": "cus_98123"\n}',
          setupTip: 'Listen to event checkout.session.completed in Stripe Webhooks.'
        },
        {
          id: 'ms-2',
          type: 'action',
          toolName: 'Supabase Database',
          iconName: 'Database',
          actionTitle: 'Create User & Generate API Key',
          description: 'Provision user record with active subscription status and monthly credit quota (500 runs).',
          samplePayload: '{\n  "id": "usr_9012",\n  "credits_remaining": 500,\n  "status": "active"\n}',
          setupTip: 'Row Level Security enabled on Supabase user records.'
        },
        {
          id: 'ms-3',
          type: 'action',
          toolName: 'Gemini 3.6 Flash API',
          iconName: 'Bot',
          actionTitle: 'Process Document / Payload Transformation',
          description: 'Extracts structured JSON payload or converts messy user input in under 1.5 seconds.',
          samplePayload: '{\n  "model": "gemini-3.6-flash",\n  "responseMimeType": "application/json"\n}',
          setupTip: 'Use structured JSON schema output for zero parsing errors.'
        },
        {
          id: 'ms-4',
          type: 'action',
          toolName: 'Resend / Loops.so',
          iconName: 'Send',
          actionTitle: 'Send Instant API Access Email',
          description: 'Delivers secret access token, documentation link, and 3-step setup walkthrough.',
          samplePayload: '{\n  "to": "dev@builds.com",\n  "subject": "Your Micro-SaaS API Key is Live!"\n}',
          setupTip: 'Send within 5 seconds of payment for maximum activation conversion.'
        }
      ]
    }
  },
  {
    id: 'digital-asset-vault',
    title: 'AI Digital Product & Notion System Vault',
    category: 'Digital Products',
    tagline: 'Automated digital storefront selling high-value Notion OS, AI prompt libraries, and business toolkits.',
    description: 'Create premium digital templates, SOP systems, and specialized industry playbooks distributed automatically via Lemon Squeezy or Gumroad.',
    startupCost: 20,
    marginPercentage: 98,
    monthlyRevenuePotential: 6000,
    automationScore: 98,
    weeklyHoursNeeded: 1,
    difficulty: 'Beginner',
    traditionalModel: 'Building custom Notion workspaces or writing guides manually for individual clients.',
    automatedUpgrade: 'Create the product once, deploy a automated sales funnel with AI video demos, Pinterest/X automated posting, and instant automated download links.',
    scalabilityPillars: [
      '100% net profit margin after minor payment processing fees',
      'Evergreen content library generates sales while you sleep',
      'Instant bundle upsells at checkout to boost average order value by 40%'
    ],
    recommendedTools: ['Lemon Squeezy', 'Notion', 'Gemini API', 'Framer', 'Buffer/Make'],
    workflowBlueprint: [
      {
        stepNumber: 1,
        title: 'Social Automation Distribution',
        tool: 'Make.com + X/Pinterest API',
        description: 'Automatically post preview snippets, carousel infographics, and thread tips daily.',
        isAutomated: true
      },
      {
        stepNumber: 2,
        title: 'High-Converting Landing Page',
        tool: 'Framer / Lemon Squeezy',
        description: 'Interactive preview showcase with embedded reviews and timer discounts.',
        isAutomated: true
      },
      {
        stepNumber: 3,
        title: 'Instant Fulfillment & License Delivery',
        tool: 'Lemon Squeezy API',
        description: 'Automated email delivers access link, video walkthrough, and bonus prompts.',
        isAutomated: true
      },
      {
        stepNumber: 4,
        title: 'Automated Upsell & Affiliate Engine',
        tool: 'Automated Post-Purchase Sequence',
        description: 'Offer 30% discount on Master Bundle 15 minutes after purchase + invite to affiliate program.',
        isAutomated: true
      }
    ],
    defaultEconomics: {
      pricePerUnit: 49,
      monthlyCustomers: 120,
      monthlyOperatingCost: 30,
      conversionRate: 4.2,
      estimatedMonthlyLeads: 3000,
      fulfillmentCostPerUnit: 0
    },
    sampleHook: 'The Complete Creator Operating System: 50+ AI Prompts, CRM, Content Calendar, and Finance Tracker in 1 click.',
    sampleAudience: 'Solopreneurs, content creators, agency owners, project managers',
    baseViabilityScore: 94,
    zapierBlueprint: {
      blueprintName: 'Lemon Squeezy to Notion Auto-Duplicate & Upsell Loop',
      description: 'Automates digital asset vault delivery via Lemon Squeezy API, grants instant read-write Notion permissions, and triggers 30-day email nurture funnel.',
      platform: 'Zapier',
      nodes: [
        {
          id: 'dv-1',
          type: 'trigger',
          toolName: 'Lemon Squeezy',
          iconName: 'CreditCard',
          actionTitle: 'Order Created',
          description: 'Triggers immediately upon successful payment for Notion Vault or Prompt Pack.',
          samplePayload: '{\n  "order_id": "ls_9821",\n  "product_name": "Solopreneur OS",\n  "user_email": "buyer@growth.co"\n}',
          setupTip: 'Use test mode webhook to verify payload structure before launching.'
        },
        {
          id: 'dv-2',
          type: 'action',
          toolName: 'Notion API',
          iconName: 'Database',
          actionTitle: 'Grant Workspace Template Access',
          description: 'Generates single-use duplicate link and adds buyer email to customer directory.',
          samplePayload: '{\n  "parent_page_id": "notion_page_3901",\n  "grant_access": "duplicate_only"\n}',
          setupTip: 'Keep master template locked so customers copy clean workspace.'
        },
        {
          id: 'dv-3',
          type: 'action',
          toolName: 'ConvertKit / Beehiiv',
          iconName: 'Send',
          actionTitle: 'Trigger Digital Product Welcome Sequence',
          description: 'Sends email with access link, 5-minute Loom onboarding video, and discount code for Master Bundle.',
          samplePayload: '{\n  "tag": "Customer - Solopreneur OS",\n  "upsell_discount": "BUNDLE30"\n}',
          setupTip: 'Add 15-minute delay before upsell email for highest conversion.'
        }
      ]
    }
  },
  {
    id: 'ai-curated-newsletter',
    title: 'AI-Curated Niche Newsletter Hub',
    category: 'Content & Media',
    tagline: 'Monetized weekly industry intelligence newsletter curated by automated AI search & synthesis agents.',
    description: 'Launch a focused newsletter covering high-growth niches (e.g., AI in Healthcare, Green Tech, PropTech, Crypto Regulations) monetized via sponsorships, affiliate links, and premium subscriptions.',
    startupCost: 30,
    marginPercentage: 92,
    monthlyRevenuePotential: 9500,
    automationScore: 88,
    weeklyHoursNeeded: 3,
    difficulty: 'Beginner',
    traditionalModel: 'Spending 15 hours every week searching news sites, drafting summaries, formatting emails, and cold emailing potential sponsors.',
    automatedUpgrade: 'AI scrapers aggregate top stories, Gemini categorizes and drafts concise 3-minute summaries, and Beehiiv auto-sponsors marketplace fills ad slots effortlessly.',
    scalabilityPillars: [
      'Beehiiv Ad Network automatically places $20-$50 CPM sponsors into your emails',
      'Cross-promotion loops with complementary newsletters for zero-CAC subscriber growth',
      'Recurring paid tier ($10/mo) for deep-dive industry research reports'
    ],
    recommendedTools: ['Beehiiv', 'Gemini API + Search Grounding', 'Make.com', 'SparkLoop'],
    workflowBlueprint: [
      {
        stepNumber: 1,
        title: 'Automated RSS & News Aggregation',
        tool: 'Make.com + RSS Feeds',
        description: 'Collect top 20 viral articles and papers in your target vertical every 24 hours.',
        isAutomated: true
      },
      {
        stepNumber: 2,
        title: 'Gemini AI Summarization',
        tool: 'Gemini 3.6 Flash',
        description: 'Synthesize news into 3 key takeaways, 2 chart breakdowns, and 1 actionable insight.',
        isAutomated: true
      },
      {
        stepNumber: 3,
        title: 'Newsletter Auto-Drafting',
        tool: 'Beehiiv API',
        description: 'Push pre-formatted HTML draft into Beehiiv ready for 5-minute human approval review.',
        isAutomated: false
      },
      {
        stepNumber: 4,
        title: 'Programmatic Ad Placement',
        tool: 'Beehiiv Ad Network',
        description: 'Automated sponsor matching inserts high-paying sponsor banners into sent broadcasts.',
        isAutomated: true
      }
    ],
    defaultEconomics: {
      pricePerUnit: 30, // Effective CPM / value per 1k subscribers
      monthlyCustomers: 15000, // Subscribers
      monthlyOperatingCost: 120,
      conversionRate: 15.0,
      estimatedMonthlyLeads: 1000,
      fulfillmentCostPerUnit: 0.05
    },
    sampleHook: 'Join 12,000+ AI tech leaders receiving the 3-minute Monday rundown of breakthrough automation trends.',
    sampleAudience: 'Software engineers, CTOs, venture capitalists, startup founders',
    baseViabilityScore: 88,
    zapierBlueprint: {
      blueprintName: 'RSS Aggregator to Gemini AI Summarizer & Beehiiv Draft',
      description: 'Collects trending industry RSS feeds, synthesizes bullet summaries using Gemini AI Grounding, pushes auto-formatted newsletter draft into Beehiiv, and matches sponsor banners.',
      platform: 'Make.com',
      nodes: [
        {
          id: 'nl-1',
          type: 'trigger',
          toolName: 'Feedly / RSS Webhook',
          iconName: 'Webhook',
          actionTitle: 'New Top Trending Article Detected',
          description: 'Triggers every 24 hours when articles hit viral engagement threshold.',
          samplePayload: '{\n  "title": "New Multimodal Breakthrough in Robotics",\n  "url": "https://techcrunch.com/article/...",\n  "shares": 4500\n}',
          setupTip: 'Filter for articles with >100 social shares to maintain quality.'
        },
        {
          id: 'nl-2',
          type: 'action',
          toolName: 'Gemini 3.6 Flash + Grounding',
          iconName: 'Bot',
          actionTitle: 'Synthesize 3-Bullet Executive Digest',
          description: 'Summarizes key takeaway, financial impact, and strategic takeaway for readers.',
          samplePayload: '{\n  "prompt": "Summarize this article for C-suite readers in 3 bullet points...",\n  "grounding": true\n}',
          setupTip: 'Use system instructions asking for punchy, objective voice.'
        },
        {
          id: 'nl-3',
          type: 'action',
          toolName: 'Beehiiv API',
          iconName: 'Send',
          actionTitle: 'Create Post Draft',
          description: 'Pushes complete formatted HTML post draft into Beehiiv ready for 1-click human send.',
          samplePayload: '{\n  "title": "The Weekly AI Briefing #104",\n  "status": "draft"\n}',
          setupTip: 'Verify Beehiiv API key permissions include post creation.'
        }
      ]
    }
  },
  {
    id: 'local-ai-reputation-agent',
    title: 'Local Business AI Review & Lead Engine',
    category: 'Local Lead Gen',
    tagline: 'Automated SMS review generation and AI missed-call text-back system for local service providers.',
    description: 'Help dentists, plumbers, HVAC technicians, and roofers convert missed phone calls into instant text bookings and build 5-star Google reviews on autopilot.',
    startupCost: 199,
    marginPercentage: 85,
    monthlyRevenuePotential: 11000,
    automationScore: 94,
    weeklyHoursNeeded: 3,
    difficulty: 'Intermediate',
    traditionalModel: 'Local business owners missing 40% of incoming calls when on job sites and manually begging clients for reviews.',
    automatedUpgrade: 'Turn-key AI Twilio bot that instantly texts callers who couldn\'t reach the desk, asks 3 questions, books the appointment into Google Calendar, and sends SMS review links post-job.',
    scalabilityPillars: [
      'High client retention: Local contractors rely on this system for 20%+ revenue retention',
      '$299-$499/mo per client subscription with under $20 in software COGS',
      'Zero ongoing manual service fulfillment after initial 20-minute account setup'
    ],
    recommendedTools: ['GoHighLevel / Twilio', 'Gemini API', 'Zapier', 'Google Business API'],
    workflowBlueprint: [
      {
        stepNumber: 1,
        title: 'Missed Call Trigger',
        tool: 'Twilio / GoHighLevel',
        description: 'System detects unanswered phone call from a potential customer.',
        isAutomated: true
      },
      {
        stepNumber: 2,
        title: 'Instant AI SMS Assistant',
        tool: 'Gemini AI Assistant',
        description: 'Texts back within 15 seconds: "Hi! Sorry we missed your call. What job can we help with?"',
        isAutomated: true
      },
      {
        stepNumber: 3,
        title: 'Automated Calendar Dispatch',
        tool: 'Google Calendar API',
        description: 'Gathers client details, quote address, and schedules service slot automatically.',
        isAutomated: true
      },
      {
        stepNumber: 4,
        title: 'Post-Job Review Booster',
        tool: 'Automated SMS Drip',
        description: '2 hours after job completion, sends 1-click link requesting a Google Review.',
        isAutomated: true
      }
    ],
    defaultEconomics: {
      pricePerUnit: 399, // $399 monthly retainer per contractor
      monthlyCustomers: 25,
      monthlyOperatingCost: 450,
      conversionRate: 8.0,
      estimatedMonthlyLeads: 150,
      fulfillmentCostPerUnit: 25
    },
    sampleHook: 'Never lose another $500 plumbing job to voicemail. Convert missed calls to confirmed bookings automatically.',
    sampleAudience: 'Plumbers, HVAC repair, residential cleaners, dentists, auto mechanics',
    baseViabilityScore: 91,
    zapierBlueprint: {
      blueprintName: 'Twilio Missed Call to Gemini AI SMS Conversational Booking Bot',
      description: 'Detects missed calls on contractor phone lines, immediately sends AI text conversation, books appointment into Google Calendar, and schedules follow-up review link.',
      platform: 'Zapier',
      nodes: [
        {
          id: 'loc-1',
          type: 'trigger',
          toolName: 'Twilio Voice Webhook',
          iconName: 'Webhook',
          actionTitle: 'Missed Call Detected',
          description: 'Fires when call status returns "no-answer" or "busy".',
          samplePayload: '{\n  "From": "+15550192834",\n  "To": "+18005550199",\n  "CallStatus": "no-answer"\n}',
          setupTip: 'Ensure Twilio phone number is configured to POST to Zapier catch hook URL.'
        },
        {
          id: 'loc-2',
          type: 'action',
          toolName: 'Gemini SMS Bot',
          iconName: 'Bot',
          actionTitle: 'Send Instant Conversational SMS Reply',
          description: 'Texts customer within 10 seconds: "Hi! Sorry we missed your call. What project can we help with today?"',
          samplePayload: '{\n  "to": "+15550192834",\n  "body": "Hi from Apex Plumbing! Sorry we missed you..."\n}',
          setupTip: 'Keep initial SMS under 160 characters for single segment delivery.'
        },
        {
          id: 'loc-3',
          type: 'action',
          toolName: 'Google Calendar API',
          iconName: 'Database',
          actionTitle: 'Schedule On-Site Quote Slot',
          description: 'Creates 30-minute estimate appointment slot and notifies contractor via push notification.',
          samplePayload: '{\n  "summary": "Quote: Plumbing Repair for +15550192834",\n  "start": "2026-07-24T10:00:00"\n}',
          setupTip: 'Sync contractor Google Calendar ID with 15-minute buffer between slots.'
        }
      ]
    }
  },
  {
    id: 'ai-content-factory',
    title: 'Automated Shorts & Reels Content Factory',
    category: 'Content & Media',
    tagline: 'Faceless video automation channel network driving affiliate sales and brand deals on YouTube & TikTok.',
    description: 'Run multiple niche viral short-form video channels (e.g. Stoic Quotes, Financial Tips, Tech Hacks, Mystery Stories) using automated scriptwriters, text-to-speech, and auto-generated stock visuals.',
    startupCost: 40,
    marginPercentage: 90,
    monthlyRevenuePotential: 7500,
    automationScore: 90,
    weeklyHoursNeeded: 3,
    difficulty: 'Beginner',
    traditionalModel: 'Spending hours filming yourself, editing videos manually on Premiere, adding captions, and uploading daily.',
    automatedUpgrade: 'Python/Make script generates viral topic concepts with Gemini, generates realistic AI voiceover, overlays automated dynamic captions and stock clips, and posts 3x daily via YouTube API.',
    scalabilityPillars: [
      'Multi-channel leverage: Single automation pipeline posts across YouTube, TikTok, and Instagram Reels',
      'Multiple revenue streams: AdSense payout, digital product links in bio, and sponsor integrations',
      'Compounding library of evergreen views'
    ],
    recommendedTools: ['Gemini API', 'CapCut / InVideo API', 'ElevenLabs / Gemini TTS', 'Make.com', 'YouTube Data API'],
    workflowBlueprint: [
      {
        stepNumber: 1,
        title: 'Viral Script Generator',
        tool: 'Gemini 3.6 Flash',
        description: 'Generates 30-second high-retention script with psychological opening hook.',
        isAutomated: true
      },
      {
        stepNumber: 2,
        title: 'Voiceover & Caption Rendering',
        tool: 'Gemini TTS / ElevenLabs',
        description: 'Synthesizes cinematic voice track and builds animated word-by-word subtitles.',
        isAutomated: true
      },
      {
        stepNumber: 3,
        title: 'Video Assembly',
        tool: 'FFmpeg / Make.com / InVideo',
        description: 'Pairs voiceover with dynamic stock footage, background soundscape, and SFX.',
        isAutomated: true
      },
      {
        stepNumber: 4,
        title: 'Multi-Platform Auto-Scheduler',
        tool: 'Buffer / YouTube API',
        description: 'Schedules post for peak audience engagement times with targeted hashtags.',
        isAutomated: true
      }
    ],
    defaultEconomics: {
      pricePerUnit: 1500, // Average monthly revenue across 3 channels (AdSense + Affiliate)
      monthlyCustomers: 5,
      monthlyOperatingCost: 150,
      conversionRate: 1.2,
      estimatedMonthlyLeads: 50000, // Views converted to bio link clicks
      fulfillmentCostPerUnit: 20
    },
    sampleHook: 'Build a $5k/mo faceless video portfolio uploading 3 videos a day with zero camera time.',
    sampleAudience: 'Content creators, digital marketers, affiliate marketers',
    baseViabilityScore: 89,
    zapierBlueprint: {
      blueprintName: 'Gemini Scripting to TTS Audio Engine & YouTube API Publishing',
      description: 'Generates viral short-form script, renders natural voiceover, stitches stock B-roll visual clips, and publishes automatically to YouTube Shorts and TikTok.',
      platform: 'Make.com',
      nodes: [
        {
          id: 'cf-1',
          type: 'trigger',
          toolName: 'Scheduled Timer',
          iconName: 'Clock',
          actionTitle: 'Daily Scheduled Video Batch',
          description: 'Triggers 3 times daily at 08:00, 14:00, and 19:00 UTC.',
          samplePayload: '{\n  "timestamp": "2026-07-23T08:00:00Z",\n  "channel": "StoicMindsetShorts"\n}',
          setupTip: 'Space out triggers by at least 5 hours for optimal algorithm distribution.'
        },
        {
          id: 'cf-2',
          type: 'action',
          toolName: 'Gemini 3.6 Flash',
          iconName: 'Bot',
          actionTitle: 'Generate Viral Script & Scene Breakdown',
          description: 'Writes 30-second script with strong hook, visual scene descriptions, and voiceover text.',
          samplePayload: '{\n  "prompt": "Write a 30s Stoic quote script...",\n  "scene_breakdown": ["Roman Statue", "Stormy Sky"]\n}',
          setupTip: 'Keep hook within first 2.5 seconds.'
        },
        {
          id: 'cf-3',
          type: 'action',
          toolName: 'YouTube Shorts API',
          iconName: 'Send',
          actionTitle: 'Upload & Auto-Publish Video',
          description: 'Publishes 1080x1920 MP4 file with optimized tags and affiliate link in pinned comment.',
          samplePayload: '{\n  "snippet": { "title": "3 Stoic Secrets for Focus #shorts" },\n  "status": { "privacyStatus": "public" }\n}',
          setupTip: 'Ensure YouTube OAuth credentials have youtube.upload scope enabled.'
        }
      ]
    }
  },
  {
    id: 'automated-pod-store',
    title: 'Automated Trend Print-On-Demand Store',
    category: 'E-Commerce',
    tagline: 'AI image-driven apparel & home decor store targeting viral micro-trending niches on Etsy & Shopify.',
    description: 'Design and list high-demand custom graphic apparel, mugs, and wall art targeting passionate hobbies (e.g. Pickleball moms, Coder quotes, Pet breeds) with zero physical inventory.',
    startupCost: 50,
    marginPercentage: 70,
    monthlyRevenuePotential: 7000,
    automationScore: 91,
    weeklyHoursNeeded: 3,
    difficulty: 'Beginner',
    traditionalModel: 'Manually designing graphics in Photoshop, ordering inventory, storing boxes in garage, and packing shipping bags.',
    automatedUpgrade: 'Gemini generates high-resolution vector artwork, auto-creates mockup images, posts listings to Etsy/Shopify, and Printify automatically manufactures and ships orders directly to customers.',
    scalabilityPillars: [
      'Zero upfront inventory risk — print only when customer pays',
      'Automated SEO keyword listing generator for viral marketplace traffic',
      'Automated order sync from storefront to global print supplier'
    ],
    recommendedTools: ['Gemini 3.1 Flash Image', 'Printify', 'Etsy API / Shopify', 'Placeit'],
    workflowBlueprint: [
      {
        stepNumber: 1,
        title: 'Trend Spotting & Concept Scraper',
        tool: 'Make.com + Etsy Keyword API',
        description: 'Identifies fast-rising search keywords with low competitor saturation.',
        isAutomated: true
      },
      {
        stepNumber: 2,
        title: 'AI High-Res Vector Design',
        tool: 'Gemini Image Generation',
        description: 'Generates crisp 4K transparent PNG graphics tailored to target micro-niche.',
        isAutomated: true
      },
      {
        stepNumber: 3,
        title: 'Mockup & Listing Auto-Publish',
        tool: 'Printify API',
        description: 'Creates 3D realistic product mockups and generates optimized SEO title and tags.',
        isAutomated: true
      },
      {
        stepNumber: 4,
        title: 'Hands-Off Order Fulfillment',
        tool: 'Printify Direct Integration',
        description: 'Customer buys -> Printify prints, packages, and attaches tracking number automatically.',
        isAutomated: true
      }
    ],
    defaultEconomics: {
      pricePerUnit: 34, // Average order value (e.g., Hoodie or Mug combo)
      monthlyCustomers: 210,
      monthlyOperatingCost: 80,
      conversionRate: 3.2,
      estimatedMonthlyLeads: 6500,
      fulfillmentCostPerUnit: 14 // Base printify item + shipping
    },
    sampleHook: 'Turn viral internet culture and micro-hobbies into a automated apparel brand with $0 upfront stock.',
    sampleAudience: 'E-commerce entrepreneurs, hobbyists, graphic designers, side-hustlers',
    baseViabilityScore: 86,
    zapierBlueprint: {
      blueprintName: 'Shopify / Etsy Order Sync to Printify Auto-Manufacturing',
      description: 'Automatically detects marketplace order, routes artwork to Printify global print provider, sends automated customer tracking updates.',
      platform: 'Zapier',
      nodes: [
        {
          id: 'pod-1',
          type: 'trigger',
          toolName: 'Shopify / Etsy Webhook',
          iconName: 'CreditCard',
          actionTitle: 'New Customer Order Placed',
          description: 'Triggers when a customer purchases apparel or mug listing.',
          samplePayload: '{\n  "order_number": "#1029",\n  "item": "Pickleball Mom Hoodie - Large",\n  "shipping_address": "123 Main St"\n}',
          setupTip: 'Connect Etsy API or Shopify webhook listener.'
        },
        {
          id: 'pod-2',
          type: 'action',
          toolName: 'Printify API',
          iconName: 'Send',
          actionTitle: 'Submit Order for Automated Printing & Shipping',
          description: 'Sends order details and high-res print asset directly to Printify fulfillment node.',
          samplePayload: '{\n  "blueprint_id": 12,\n  "print_provider_id": 3,\n  "address_to": { "first_name": "Jane" }\n}',
          setupTip: 'Enable auto-fulfillment delay of 1 hour to allow address edits.'
        }
      ]
    }
  },
  {
    id: 'ai-pitchdeck-agency',
    title: 'AI Pitch Deck & Proposal Studio',
    category: 'High-Ticket Agency',
    tagline: 'Turn startup founder notes into investor-ready pitch decks and high-converting enterprise proposals in 48 hours.',
    description: 'Provide venture-backed founders and agency owners with high-converting pitch deck narrative restructuring, financial slide designs, and valuation models enhanced with AI speed.',
    startupCost: 100,
    marginPercentage: 88,
    monthlyRevenuePotential: 15000,
    automationScore: 82,
    weeklyHoursNeeded: 5,
    difficulty: 'Advanced',
    traditionalModel: 'Design agencies charging $10,000 and taking 6 weeks of back-and-forth slide iterations.',
    automatedUpgrade: 'Founders complete an structured intake form, Gemini auto-formats the 10-slide startup narrative, financial projections populate automatically, and AI slide themes format in minutes.',
    scalabilityPillars: [
      'High price point ($1,500 - $3,500 per completed deck)',
      'High-value target market with urgent deadline pressure',
      'Lucrative success-fee bonus option (0.5% equity or raise fee)'
    ],
    recommendedTools: ['Gamma.app API / Beautiful.ai', 'Gemini API', 'Tally.so', 'Stripe'],
    workflowBlueprint: [
      {
        stepNumber: 1,
        title: 'Structured Founder Intake',
        tool: 'Tally.so + Stripe',
        description: 'Founder completes 12 core questions about traction, TAM, team, and funding ask.',
        isAutomated: true
      },
      {
        stepNumber: 2,
        title: 'AI Narrative Architecture',
        tool: 'Gemini 3.1 Pro',
        description: 'Transforms raw answers into 10 classic Sequoia pitch deck slide storylines.',
        isAutomated: true
      },
      {
        stepNumber: 3,
        title: 'Automated Slide Deck Formatting',
        tool: 'Gamma / Slide AI',
        description: 'Generates styled visual presentation draft with modern typography and charts.',
        isAutomated: true
      },
      {
        stepNumber: 4,
        title: 'Client Review & Delivery',
        tool: 'Loom + Google Slides API',
        description: 'Automated Loom video review walk-through sent with live editable presentation link.',
        isAutomated: true
      }
    ],
    defaultEconomics: {
      pricePerUnit: 2500,
      monthlyCustomers: 6,
      monthlyOperatingCost: 200,
      conversionRate: 5.0,
      estimatedMonthlyLeads: 120,
      fulfillmentCostPerUnit: 150
    },
    sampleHook: 'Get an investor-ready 10-slide pitch deck that raised $2M+ built in 48 hours for a fraction of agency costs.',
    sampleAudience: 'Startup founders, pre-seed CEOs, real estate syndicators, agency founders',
    baseViabilityScore: 90,
    zapierBlueprint: {
      blueprintName: 'Tally Form Intake to Gemini Deck Structure & Gamma Presentation',
      description: 'Captures founder answers on Tally, structures 10-slide Sequoia narrative with Gemini AI, generates Gamma presentation deck, and notifies founder on Slack.',
      platform: 'Zapier',
      nodes: [
        {
          id: 'pd-1',
          type: 'trigger',
          toolName: 'Tally.so Form',
          iconName: 'Webhook',
          actionTitle: 'New Founder Pitch Intake Submitted',
          description: 'Fires when founder submits answers and pays initial deposit.',
          samplePayload: '{\n  "startup_name": "Nexus AI",\n  "problem": "Manual customer support",\n  "raise_amount": "$1.5M"\n}',
          setupTip: 'Use required fields on Tally to ensure full slide input.'
        },
        {
          id: 'pd-2',
          type: 'action',
          toolName: 'Gemini 3.6 Flash',
          iconName: 'Bot',
          actionTitle: 'Structure Sequoia 10-Slide Pitch Storyboard',
          description: 'Generates title, problem, solution, TAM, business model, traction, and team slide outlines.',
          samplePayload: '{\n  "prompt": "Convert Nexus AI intake into 10 Sequoia slides...",\n  "temperature": 0.3\n}',
          setupTip: 'Enforce concise bullet points per slide (max 3 bullets).'
        },
        {
          id: 'pd-3',
          type: 'action',
          toolName: 'Gamma / Google Slides',
          iconName: 'Send',
          actionTitle: 'Generate Slide Deck Draft Link',
          description: 'Creates editable slide deck with modern dark design theme.',
          samplePayload: '{\n  "presentation_title": "Nexus AI Seed Pitch",\n  "theme": "Dark Modern Tech"\n}',
          setupTip: 'Share editable link with founder automatically via email.'
        }
      ]
    }
  }
];
