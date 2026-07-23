import { SideHustle } from '../types';

export interface ViabilityOverrides {
  targetMonthlyGoal?: number;
  customPrice?: number;
  customWeeklyHours?: number;
}

export function calculateDynamicViabilityScore(
  hustle: SideHustle,
  overrides?: ViabilityOverrides
): { score: number; label: string; color: string; factors: { name: string; impact: string }[] } {
  let score = hustle.baseViabilityScore || 88;
  const targetGoal = overrides?.targetMonthlyGoal || 10000;
  const price = overrides?.customPrice || hustle.defaultEconomics.pricePerUnit;
  const hours = overrides?.customWeeklyHours || hustle.weeklyHoursNeeded;

  const factors: { name: string; impact: string }[] = [];

  // 1. Margin Factor
  if (hustle.marginPercentage >= 88) {
    score += 3;
    factors.push({ name: 'High Net Margin', impact: `+3 (${hustle.marginPercentage}% margin)` });
  } else if (hustle.marginPercentage < 75) {
    score -= 4;
    factors.push({ name: 'Lower Net Margin', impact: `-4 (${hustle.marginPercentage}% margin)` });
  }

  // 2. Automation Factor
  if (hustle.automationScore >= 90) {
    score += 3;
    factors.push({ name: 'High Automation Index', impact: `+3 (${hustle.automationScore}% automated)` });
  }

  // 3. Client Acquisition Feasibility
  const clientsNeeded = Math.ceil(targetGoal / price);
  if (clientsNeeded <= 10) {
    score += 4;
    factors.push({ name: 'Low Client Threshold', impact: `+4 (Only ${clientsNeeded} clients for $${targetGoal.toLocaleString()}/mo)` });
  } else if (clientsNeeded > 100) {
    score -= 5;
    factors.push({ name: 'High Volume Requirement', impact: `-5 (${clientsNeeded} clients needed)` });
  }

  // 4. Hours commitment
  if (hours <= 4) {
    score += 2;
    factors.push({ name: 'Low Weekly Effort', impact: `+2 (${hours} hrs/wk)` });
  } else if (hours > 10) {
    score -= 3;
    factors.push({ name: 'High Weekly Time', impact: `-3 (${hours} hrs/wk)` });
  }

  // Clamp 50 to 99
  const finalScore = Math.min(99, Math.max(50, score));

  let label = 'Strong Viability';
  let color = 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30';

  if (finalScore >= 92) {
    label = 'Prime Cashflow Tier';
    color = 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30';
  } else if (finalScore >= 85) {
    label = 'High Viability';
    color = 'text-amber-400 bg-amber-500/10 border-amber-500/30';
  } else {
    label = 'Moderate Viability';
    color = 'text-indigo-400 bg-indigo-500/10 border-indigo-500/30';
  }

  return {
    score: finalScore,
    label,
    color,
    factors
  };
}
