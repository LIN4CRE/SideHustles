export type CategoryType =
  | 'All'
  | 'Free Starter Sets'
  | 'AI & Automation'
  | 'Micro-SaaS'
  | 'Digital Products'
  | 'Content & Media'
  | 'E-Commerce'
  | 'High-Ticket Agency'
  | 'Local Lead Gen';

export interface FreeStarterSetInfo {
  starterKitName: string;
  setupTimeMinutes: number;
  expectedDay1Earnings: string; // e.g. "£15.00 - £50.00 / 24 hrs"
  zeroCostToolsUsed: string[];
  proofOfConceptMechanism: string;
  trustBuildingLadder: string; // How completing this free set builds confidence & skills to upgrade to paid $10k+ agency hustles
  upgradeToHustleId: string; // The paid hustle to transition to
  upgradeToHustleTitle: string;
}

export interface ZapierBlueprintNode {
  id: string;
  type: 'trigger' | 'action' | 'filter' | 'router';
  toolName: string;
  iconName: string; // e.g. 'Webhook', 'Bot', 'Airtable', 'Send', 'CreditCard'
  actionTitle: string;
  description: string;
  samplePayload?: string;
  setupTip?: string;
}

export interface WorkflowBlueprintDetail {
  blueprintName: string;
  description: string;
  platform: 'Zapier' | 'Make.com' | 'n8n';
  nodes: ZapierBlueprintNode[];
  exportJsonSnippet?: string;
}

export interface GrowthRoadmapData {
  day30Milestones: string[];
  day60Milestones: string[];
  day90Milestones: string[];
  keyMetricsToTrack: string[];
  scalingBottleneckWarning: string;
}

export interface MarketEdgeData {
  marketTrendOverview: string;
  threePointEdge: {
    title: string;
    detail: string;
    competitiveLeverage: string;
  }[];
  trendingTools2026: string[];
  sources?: string[];
}

export interface WorkflowStep {
  stepNumber: number;
  title: string;
  tool: string;
  description: string;
  isAutomated: boolean;
}

export interface UnitEconomics {
  pricePerUnit: number;
  monthlyCustomers: number;
  monthlyOperatingCost: number;
  conversionRate: number; // percentage e.g. 2.5
  estimatedMonthlyLeads: number;
  fulfillmentCostPerUnit: number;
}

export interface ExecutionKit {
  headline: string;
  subheadline: string;
  targetCustomerAvatar: string;
  automatedWorkflowSteps: string[];
  coldOutreachScript: string;
  landingPageCopy: {
    heroHeading: string;
    heroSubheading: string;
    keyBenefits: string[];
    ctaButtonText: string;
    faqs: { question: string; answer: string }[];
  };
  marketingCampaign30Days: {
    week: string;
    theme: string;
    tactics: string[];
  }[];
  techStackRecommended: string[];
  pricingStrategy: {
    tier1Name: string;
    tier1Price: string;
    tier1Features: string[];
    tier2Name: string;
    tier2Price: string;
    tier2Features: string[];
    tier3Name?: string;
    tier3Price?: string;
    tier3Features?: string[];
  };
  upsideProfitHacks: string[];
}

export interface SideHustle {
  id: string;
  title: string;
  category: CategoryType;
  tagline: string;
  description: string;
  startupCost: number; // $
  marginPercentage: number; // % e.g. 85
  monthlyRevenuePotential: number; // $ e.g. 8500
  automationScore: number; // 1-100
  weeklyHoursNeeded: number; // e.g. 4
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  
  // Traditional vs Automated comparison
  traditionalModel: string;
  automatedUpgrade: string;
  
  // Key Features & Scalability
  scalabilityPillars: string[];
  recommendedTools: string[];
  
  // Workflows
  workflowBlueprint: WorkflowStep[];
  zapierBlueprint?: WorkflowBlueprintDetail;
  
  // Unit Economics Defaults
  defaultEconomics: UnitEconomics;
  
  // Sample Copy & Hooks
  sampleHook: string;
  sampleAudience: string;

  // Free Starter Set extensions
  isFreeStarterSet?: boolean;
  freeStarterSet?: FreeStarterSetInfo;

  // Ground Truth & Same-Week Realism
  realisticWeek1Earnings: string; // e.g. "£0.00 - £25.00 (Requires sending 10-15 pitches)"
  honestRealityCheck: string; // Ground truth explanation of week 1 expectations

  // Initial Viability Score (base)
  baseViabilityScore: number;
}

export interface ExecutionLogItem {
  id: string;
  hustleId: string;
  hustleTitle: string;
  taskName: string;
  status: 'completed' | 'running' | 'scheduled' | 'failed';
  timestamp: string;
  agentName: string;
  details: string;
  outputSnippet?: string;
  durationMs?: number;
}

export interface HustleHealthState {
  hustleId: string;
  completedSteps: number[]; // e.g. [1, 2]
  healthScore: number; // 0-100%
  lastAuditTimestamp?: string;
}

export interface ViabilityAnalysis {
  overallScore: number;
  profitabilityScore: number;
  automationScore: number;
  timeToFirstDollarDays: number;
  monthlyRequiredClients: number;
  strengths: string[];
  potentialBottlenecks: string[];
  keyAutomationLever: string;
  growthHacks: string[];
}
