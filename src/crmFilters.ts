export type CrmDeal = {
  id: string;
  name: string;
  customer: string;
  company: string;
  owner: string;
  stage: string;
  value: number;
  category: string;
  priority: number;
  intent: number;
  urgency: number;
  readiness: number;
  closeLikelihood: number;
  followUpPriority: number;
  lastMeaningful: string;
  timeSinceAction: string;
  aiStatus: string;
  due: string;
  nextAction: string;
  why: string;
  budgetSignal: string;
  decisionMaker: string;
  quoteStatus: string;
  assessmentStatus: string;
  quoteValue: number;
};

export type ActivityFilter = "any" | "no-next-activity" | "stale-5-days" | "overdue" | "due-today";
export type CustomFieldFilter = "any" | "complete" | "missing";

export type DealFilterState = {
  stage: string;
  owner: string;
  minValue: number | "";
  maxValue: number | "";
  minHeat: number | "";
  activity: ActivityFilter;
  customFields: CustomFieldFilter;
  limit: number | "";
  sort: "heat-desc" | "value-desc" | "activity-risk";
};

export type ParsedFilter = {
  summary: string;
  confidence: number;
  filters: DealFilterState;
  extracted: string[];
};

export type SavedDealFilter = {
  id: string;
  name: string;
  description: string;
  filters: DealFilterState;
};

export const emptyDealFilter: DealFilterState = {
  stage: "All",
  owner: "All",
  minValue: "",
  maxValue: "",
  minHeat: "",
  activity: "any",
  customFields: "any",
  limit: "",
  sort: "heat-desc",
};

export const savedDealFilters: SavedDealFilter[] = [
  {
    id: "quote-sent-10k-stale",
    name: "Quote Sent over $10k with no activity in 5 days",
    description: "High-value sent quotes where the follow-up window is drifting.",
    filters: { ...emptyDealFilter, stage: "Quote Sent", minValue: 10000, activity: "stale-5-days", sort: "value-desc" },
  },
  {
    id: "human-required-rachel",
    name: "Human Required assigned to Rachel",
    description: "Escalated deals Rachel needs to judge or progress.",
    filters: { ...emptyDealFilter, stage: "Human Required", owner: "Rachel", sort: "activity-risk" },
  },
  {
    id: "high-value-no-next",
    name: "High-value deals with no next activity",
    description: "Commercially meaningful deals missing a clean next action.",
    filters: { ...emptyDealFilter, minValue: 10000, activity: "no-next-activity", sort: "value-desc" },
  },
  {
    id: "hottest-50",
    name: "50 hottest deals by heat score",
    description: "Top heat-ranked deals for fast morning review.",
    filters: { ...emptyDealFilter, limit: 50, sort: "heat-desc" },
  },
  {
    id: "missing-custom-fields",
    name: "Missing custom field data",
    description: "Deals blocked by incomplete quote, assessment, buyer, or activity fields.",
    filters: { ...emptyDealFilter, customFields: "missing", sort: "activity-risk" },
  },
];

export function getCrmHeatScore(deal: CrmDeal) {
  return Math.round((deal.intent + deal.readiness + deal.closeLikelihood + deal.urgency + deal.followUpPriority) / 5);
}

export function getActivityAgeDays(deal: CrmDeal) {
  const text = deal.timeSinceAction.toLowerCase();
  if (text.includes("today") || text.includes("hour") || text.includes("2 hours")) return 0;
  if (text.includes("yesterday")) return 1;
  const number = Number(text.match(/\d+/)?.[0] ?? 0);
  if (text.includes("week")) return number * 7;
  if (text.includes("day")) return number;
  if (deal.lastMeaningful.toLowerCase().includes("5 days")) return 5;
  return 0;
}

export function hasNoNextActivity(deal: CrmDeal) {
  const next = deal.nextAction.toLowerCase();
  return (
    next.includes("set next activity") ||
    next.includes("review latest context") ||
    next.includes("no next") ||
    next.trim().length < 12
  );
}

export function hasMissingCustomFields(deal: CrmDeal) {
  const text = [
    deal.quoteStatus,
    deal.assessmentStatus,
    deal.nextAction,
    deal.aiStatus,
    deal.why,
    deal.budgetSignal,
    deal.decisionMaker,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  return (
    text.includes("missing") ||
    text.includes("not ready") ||
    text.includes("incomplete") ||
    text.includes("needs missing data") ||
    text.includes("not created") ||
    deal.quoteValue <= 0
  );
}

export function describeFilter(filters: DealFilterState) {
  const parts: string[] = [];
  if (filters.stage !== "All") parts.push(`stage is ${filters.stage}`);
  if (filters.owner !== "All") parts.push(`owner is ${filters.owner}`);
  if (filters.minValue !== "") parts.push(`value over $${filters.minValue.toLocaleString("en-NZ")}`);
  if (filters.maxValue !== "") parts.push(`value under $${filters.maxValue.toLocaleString("en-NZ")}`);
  if (filters.minHeat !== "") parts.push(`heat at least ${filters.minHeat}`);
  if (filters.activity === "no-next-activity") parts.push("no next activity");
  if (filters.activity === "stale-5-days") parts.push("no meaningful activity in 5+ days");
  if (filters.activity === "overdue") parts.push("overdue");
  if (filters.activity === "due-today") parts.push("due today");
  if (filters.customFields === "missing") parts.push("missing custom field data");
  if (filters.customFields === "complete") parts.push("custom fields complete");
  if (filters.limit !== "") parts.push(`limited to ${filters.limit}`);
  return parts.length > 0 ? parts.join(", ") : "all deals";
}

export function applyDealFilters(deals: CrmDeal[], filters: DealFilterState) {
  const filtered = deals.filter((deal) => {
    if (filters.stage !== "All") {
      const isHumanRequired = deal.category === "Human Required" || deal.aiStatus.toLowerCase().includes("human");
      if (filters.stage === "Human Required" && !isHumanRequired) return false;
      if (filters.stage !== "Human Required" && deal.stage !== filters.stage) return false;
    }
    if (filters.owner !== "All" && deal.owner !== filters.owner) return false;
    if (filters.minValue !== "" && deal.value < filters.minValue) return false;
    if (filters.maxValue !== "" && deal.value > filters.maxValue) return false;
    if (filters.minHeat !== "" && getCrmHeatScore(deal) < filters.minHeat) return false;
    if (filters.activity === "no-next-activity" && !hasNoNextActivity(deal)) return false;
    if (filters.activity === "stale-5-days" && getActivityAgeDays(deal) < 5) return false;
    if (filters.activity === "overdue" && deal.due !== "Overdue") return false;
    if (filters.activity === "due-today" && deal.due !== "Today") return false;
    if (filters.customFields === "missing" && !hasMissingCustomFields(deal)) return false;
    if (filters.customFields === "complete" && hasMissingCustomFields(deal)) return false;
    return true;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (filters.sort === "value-desc") return b.value - a.value;
    if (filters.sort === "activity-risk") return getActivityAgeDays(b) - getActivityAgeDays(a) || getCrmHeatScore(b) - getCrmHeatScore(a);
    return getCrmHeatScore(b) - getCrmHeatScore(a);
  });

  return filters.limit === "" ? sorted : sorted.slice(0, filters.limit);
}

export function parseNaturalLanguageFilter(input: string, stages: string[], owners: string[]): ParsedFilter {
  const text = input.trim();
  const normalised = text.toLowerCase();
  const filters: DealFilterState = { ...emptyDealFilter };
  const extracted: string[] = [];

  const stage = stages.find((candidate) => normalised.includes(candidate.toLowerCase()));
  if (stage) {
    filters.stage = stage;
    extracted.push(`stage:${stage}`);
  } else if (normalised.includes("human required")) {
    filters.stage = "Human Required";
    extracted.push("stage:Human Required");
  }

  const owner = owners.find((candidate) => normalised.includes(candidate.toLowerCase()));
  if (owner) {
    filters.owner = owner;
    extracted.push(`owner:${owner}`);
  }

  const valueMatch = normalised.match(/(?:over|above|more than|greater than|>\s*)\$?(\d+(?:\.\d+)?)\s*(k|m)?/);
  if (valueMatch) {
    const amount = Number(valueMatch[1]) * (valueMatch[2] === "m" ? 1000000 : valueMatch[2] === "k" ? 1000 : 1);
    filters.minValue = Math.round(amount);
    extracted.push(`minValue:${filters.minValue}`);
  }

  const heatMatch = normalised.match(/(?:heat|hottest|score)\D+(\d{2,3})/);
  if (heatMatch) {
    filters.minHeat = Number(heatMatch[1]);
    extracted.push(`minHeat:${filters.minHeat}`);
  }

  const limitMatch = normalised.match(/(?:top|first|limit|show)\s+(\d+)/);
  if (limitMatch) {
    filters.limit = Number(limitMatch[1]);
    extracted.push(`limit:${filters.limit}`);
  }

  if (normalised.includes("hottest") || normalised.includes("heat score")) {
    filters.sort = "heat-desc";
    if (filters.limit === "") filters.limit = normalised.includes("50") ? 50 : "";
    extracted.push("sort:heat-desc");
  }

  if (normalised.includes("no next") || normalised.includes("missing next") || normalised.includes("without next")) {
    filters.activity = "no-next-activity";
    extracted.push("activity:no-next-activity");
  } else if (normalised.includes("no activity") || normalised.includes("stale") || normalised.includes("untouched")) {
    filters.activity = "stale-5-days";
    extracted.push("activity:stale-5-days");
  } else if (normalised.includes("overdue")) {
    filters.activity = "overdue";
    extracted.push("activity:overdue");
  } else if (normalised.includes("today")) {
    filters.activity = "due-today";
    extracted.push("activity:due-today");
  }

  if (normalised.includes("missing custom") || normalised.includes("custom field") || normalised.includes("incomplete data")) {
    filters.customFields = "missing";
    extracted.push("customFields:missing");
  }

  if (normalised.includes("high-value") && filters.minValue === "") {
    filters.minValue = 10000;
    extracted.push("minValue:10000");
  }

  const confidence = Math.min(0.96, 0.38 + extracted.length * 0.11);
  return {
    summary: text ? describeFilter(filters) : "Type a filter request to preview DIWA's interpretation.",
    confidence,
    filters,
    extracted,
  };
}
