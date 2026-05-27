import React from "react";
import { createRoot } from "react-dom/client";
import {
  Activity,
  AlertTriangle,
  ArrowUpRight,
  Bot,
  Brain,
  BriefcaseBusiness,
  CheckCircle2,
  ClipboardList,
  Copy,
  Clock3,
  FileText,
  Gauge,
  Inbox,
  Layers3,
  Mail,
  MessageSquareText,
  PanelLeftClose,
  PanelLeftOpen,
  PhoneCall,
  PlugZap,
  Send,
  Search,
  Sparkles,
  Star,
  Target,
  UserRoundCheck,
  Zap,
} from "lucide-react";
import "./styles.css";

type Deal = {
  name: string;
  customer: string;
  value: string;
  stage: string;
  owner: string;
  intent: number;
  risk: "Low" | "Medium" | "High";
  next: string;
  source: string;
};

const deals: Deal[] = [
  {
    name: "Stack Construction school surfacing",
    customer: "Keegan Shillock",
    value: "$48.6k",
    stage: "Quote coordination",
    owner: "Miles + Sean",
    intent: 88,
    risk: "High",
    next: "Confirm quote position and assign one owner before close of day.",
    source: "Pipedrive, Gmail, quote notes",
  },
  {
    name: "Board meeting turf proposal",
    customer: "Commercial facilities lead",
    value: "$112k",
    stage: "Long-tail decision",
    owner: "ZECZI Agent",
    intent: 64,
    risk: "Medium",
    next: "Hold until board pack window, then send context-aware reminder.",
    source: "CRM notes, call transcript",
  },
  {
    name: "Residential premium lawn",
    customer: "Homeowner quote sent",
    value: "$18.9k",
    stage: "Quote sent",
    owner: "Rachel",
    intent: 77,
    risk: "Medium",
    next: "Draft warm follow-up with finance and install timing options.",
    source: "Pipedrive, email thread",
  },
];

const activity = [
  { icon: MessageSquareText, label: "RFQ classified", detail: "New inbound request mapped to deal context", time: "8m" },
  { icon: Brain, label: "Deal snapshot refreshed", detail: "Intent score increased after customer reply", time: "24m" },
  { icon: UserRoundCheck, label: "Human Required", detail: "Pricing judgement needed before customer response", time: "42m" },
  { icon: Bot, label: "Agent follow-up drafted", detail: "Low-risk long-tail reminder prepared for review", time: "1h" },
];

const sources = [
  { name: "Pipedrive", status: "System of record", health: "Live" },
  { name: "Gmail / RFQ", status: "Intake and customer context", health: "Live" },
  { name: "Quotes", status: "Pricing and proposal state", health: "Planned" },
  { name: "n8n", status: "Workflow execution layer", health: "Live" },
];

const cockpitHealth = [
  { label: "Open pipeline", value: "$3.69m", detail: "392 deals", tone: "gold" },
  { label: "Human required", value: "4", detail: "$74k exposed", tone: "red" },
  { label: "Today actions", value: "27", detail: "9 time-sensitive", tone: "orange" },
  { label: "Agent lane", value: "31", detail: "safe to progress", tone: "green" },
  { label: "Data freshness", value: "Live", detail: "4 sources synced", tone: "blue" },
];

const stageSignals = [
  { stage: "New", count: 41, value: "$228k", alert: "watch" },
  { stage: "Awaiting info", count: 81, value: "$378k", alert: "drift" },
  { stage: "Prepare quote", count: 28, value: "$92k", alert: "active" },
  { stage: "Quote sent", count: 17, value: "$200k", alert: "hot" },
  { stage: "AI follow-up", count: 68, value: "$697k", alert: "agent" },
  { stage: "Long-tail", count: 101, value: "$1.67m", alert: "hold" },
];

const pipelineStages = [
  { id: "All", label: "All", count: 392, value: "$3.62m" },
  { id: "New Lead", label: "New Lead", count: 65, value: "$389k" },
  { id: "Attempting", label: "Attempting", count: 39, value: "$242k" },
  { id: "Awaiting Info", label: "Awaiting", count: 81, value: "$378k" },
  { id: "Early Human Required", label: "Human Required", count: 4, value: "$58k", tone: "critical" },
  { id: "Prepare Quote", label: "Prepare Quote", count: 28, value: "$92k" },
  { id: "Quote Sent", label: "Quote Sent", count: 17, value: "$200k" },
  { id: "BD Expired", label: "BD Expired", count: 11, value: "$146k" },
  { id: "AI Long-Tail", label: "AI Long-Tail", count: 101, value: "$1.67m", tone: "quiet" },
  { id: "AI Follow-Up", label: "AI Follow-Up", count: 68, value: "$697k", tone: "quiet" },
  { id: "Closing", label: "Closing", count: 9, value: "$318k" },
  { id: "Late Human Required", label: "Human Required", count: 3, value: "$74k", tone: "critical" },
  { id: "Finance", label: "Finance", count: 7, value: "$121k" },
  { id: "AAD", label: "AAD", count: 14, value: "$227k" },
];

const cockpitStatusRow = [
  { id: "All", label: "All", count: 392, value: "$3.62m", tone: "all" },
  { label: "Critical", count: 7, value: "$132k", tone: "critical" },
  { label: "Ready To Close", count: 9, value: "$318k", tone: "ready" },
  { label: "Hot", count: 17, value: "$200k", tone: "hot" },
  { label: "Drifting", count: 81, value: "$378k", tone: "drifting" },
  { label: "Stale", count: 112, value: "$1.81m", tone: "stale" },
];

const v3PipelineStages = [
  "New Lead",
  "Attempting",
  "Awaiting",
  "Human Required",
  "Prepare Quote",
  "Quote Sent",
  "AI Follow-Up",
  "Closing",
  "Finance",
  "AAD",
  "Variation",
];

const navItems = [
  "Command Centre",
  "Deals",
  "Human Required",
  "Hot Deals",
  "Follow-Up",
  "Quote Bottlenecks",
  "Long-Tail",
  "AI Activity",
  "Reports",
  "Knowledge",
  "Settings",
];

const dealTabs = ["Summary", "Snapshots", "Quotes", "Scorecards", "Actions"];

const v3Deals = [
  {
    id: "D-1048",
    name: "Evergreen Childcare Play Area",
    customer: "Helen Marsh",
    company: "Evergreen Childcare",
    phone: "+64 21 555 0148",
    email: "helen@evergreen.example",
    preferredChannel: "Phone then email",
    location: "Auckland",
    owner: "Rachel",
    stage: "Human Required",
    value: 42800,
    leadSource: "Google Ads",
    product: "Playground turf and shock pad",
    customerType: "Childcare operator",
    quoteStatus: "Revision requested",
    assessmentStatus: "Completed",
    expectedTiming: "Before school holidays",
    decisionMaker: "Centre owner and board",
    budgetSignal: "Budget acceptable if compliance is clear",
    category: "Human Required",
    priority: 96,
    intent: 94,
    sentiment: 82,
    urgency: 91,
    readiness: 86,
    closeLikelihood: 84,
    followUpPriority: 93,
    lastMeaningful: "Today, 9:14 am",
    timeSinceAction: "2 hours",
    aiStatus: "Escalated to human",
    due: "Today",
    why: "Strong intent, positive sentiment, compliance question, short timing window and quote revision pending human judgement.",
    snapshot: "Helen likes the proposal but needs a board-ready response covering safety certification, lead time and whether installation can be completed before school holidays.",
    nextAction: "Call Helen today, confirm safety and timing, then send a concise board pack summary.",
    objections: ["Safety compliance", "Install timing", "Board approval"],
    persona: "Operational decision-maker. Wants confidence, evidence and clean written summaries for board approval.",
    quote: "Q-2048 v2",
    quoteValue: 42800,
    quoteViewed: "Viewed twice",
  },
  {
    id: "D-1035",
    name: "North Shore Sports Facility",
    customer: "Mike Rawiri",
    company: "North Shore Sports Trust",
    phone: "+64 21 555 0135",
    email: "mike@nsst.example",
    preferredChannel: "Email",
    location: "North Shore",
    owner: "Gareth",
    stage: "Quote Sent",
    value: 118500,
    leadSource: "Referral",
    product: "Multi-sport turf system",
    customerType: "Sports facility committee",
    quoteStatus: "Sent and viewed",
    assessmentStatus: "Completed",
    expectedTiming: "Board decision this month",
    decisionMaker: "Committee",
    budgetSignal: "Funding approved in principle",
    category: "Ready to Close",
    priority: 92,
    intent: 88,
    sentiment: 74,
    urgency: 79,
    readiness: 91,
    closeLikelihood: 78,
    followUpPriority: 90,
    lastMeaningful: "5 days ago",
    timeSinceAction: "5 days",
    aiStatus: "Draft awaiting approval",
    due: "Overdue",
    why: "Quote viewed, high value, strong intent and no human follow-up for five days.",
    snapshot: "The Trust is engaged and has funding momentum, but the post-quote follow-up window is being wasted.",
    nextAction: "Approve the follow-up draft and book a decision call before Friday.",
    objections: ["Board timing", "Comparison quote", "Installation window"],
    persona: "Committee buyer. Needs confidence, documentation and a clear next meeting path.",
    quote: "Q-2035 v1",
    quoteValue: 118500,
    quoteViewed: "Viewed three times",
  },
  {
    id: "D-1017",
    name: "Westfield Pool Surround",
    customer: "James Patel",
    company: "Westfield Homes",
    phone: "+64 21 555 0117",
    email: "james@westfield.example",
    preferredChannel: "SMS",
    location: "Hamilton",
    owner: "Myles",
    stage: "Prepare Quote",
    value: 36500,
    leadSource: "Website",
    product: "Landscape turf and pool edging",
    customerType: "Residential homeowner",
    quoteStatus: "Not ready",
    assessmentStatus: "Completed",
    expectedTiming: "Next 3 to 4 weeks",
    decisionMaker: "Homeowner",
    budgetSignal: "Wants premium look, price sensitive on extras",
    category: "Quote Bottleneck",
    priority: 84,
    intent: 81,
    sentiment: 77,
    urgency: 67,
    readiness: 52,
    closeLikelihood: 69,
    followUpPriority: 76,
    lastMeaningful: "Yesterday",
    timeSinceAction: "28 hours",
    aiStatus: "Needs missing data",
    due: "Tomorrow",
    why: "Assessment happened more than 24 hours ago and quote-ready fields are still incomplete.",
    snapshot: "The customer is interested, but the quote is blocked because product preference and drainage notes are missing after assessment.",
    nextAction: "Ask Myles to complete product selection and drainage notes, then move the deal to quote production.",
    objections: ["Drainage", "Product uncertainty", "Price sensitivity"],
    persona: "Homeowner. Visual buyer who needs confidence that the finished look will be premium and practical.",
    quote: "Not created",
    quoteValue: 36500,
    quoteViewed: "N/A",
  },
  {
    id: "D-1029",
    name: "Barker Residence Backyard Upgrade",
    customer: "Anna Barker",
    company: "Residential",
    phone: "+64 21 555 0129",
    email: "anna@example.test",
    preferredChannel: "WhatsApp",
    location: "Auckland",
    owner: "Rachel",
    stage: "AI Follow-Up",
    value: 17600,
    leadSource: "Organic search",
    product: "Natural-look lawn turf",
    customerType: "Residential homeowner",
    quoteStatus: "Sent",
    assessmentStatus: "Not required",
    expectedTiming: "Waiting on finance",
    decisionMaker: "Homeowner and spouse",
    budgetSignal: "Finance dependent",
    category: "Long-Tail",
    priority: 53,
    intent: 73,
    sentiment: 69,
    urgency: 58,
    readiness: 84,
    closeLikelihood: 61,
    followUpPriority: 42,
    lastMeaningful: "2 weeks ago",
    timeSinceAction: "14 days",
    aiStatus: "Scheduled follow-up",
    due: "14 Jun",
    why: "Parked because the customer is waiting on finance and has a do-not-disturb date.",
    snapshot: "Anna is interested but timing depends on finance. The correct move is to preserve context and re-engage on the agreed date.",
    nextAction: "Hold until the DND date, then send a soft check-in through WhatsApp.",
    objections: ["Finance timing", "Spouse approval"],
    persona: "Practical homeowner. Needs reassurance and gentle timing control, not pushy sales noise.",
    quote: "Q-2029 v1",
    quoteValue: 17600,
    quoteViewed: "Viewed once",
  },
];

const v3TimelineEvents = [
  { type: "Call connected", time: "Today, 9:14 am", source: "Rachel", stage: "Quote Sent", summary: "Customer liked the quote but asked whether installation could happen before school holidays. Budget sounded acceptable. Board approval is required.", tags: ["Positive intent", "Timing concern", "Decision-maker shared"] },
  { type: "AI draft generated", time: "Today, 9:22 am", source: "Closing Review", stage: "Human Required", summary: "DIWA prepared a board-ready response but escalated because compliance wording needs human approval.", tags: ["Draft awaiting approval", "Human Required"] },
  { type: "Quote revised", time: "Yesterday, 4:18 pm", source: "Gareth", stage: "Quote Sent", summary: "Revision added compliance note, premium shock pad option and updated installation timing assumptions.", tags: ["Quote v2", "Scope changed"] },
  { type: "Site assessment completed", time: "8 May 2026, 10:30 am", source: "Myles", stage: "Prepare Quote", summary: "Measurements, photos and access notes were attached. Site appears straightforward with normal access.", tags: ["Assessment complete", "Quote-ready"] },
];

const v3QuoteSnapshots = [
  { version: "Q-2048 v2", value: 42800, created: "8 May 2026", sent: "8 May 2026", status: "Viewed twice", reason: "Added compliance wording and optional shock pad line item.", risk: "Board approval depends on clear safety and timing explanation." },
  { version: "Q-2048 v1", value: 39750, created: "7 May 2026", sent: "7 May 2026", status: "Superseded", reason: "Initial quote after site assessment.", risk: "Did not address compliance requirements deeply enough." },
];

const v3Scorecards = [
  { type: "Discovery Review", interaction: "Inbound phone call", human: "Rachel", stage: "New Lead", score: 86, sentiment: "Positive", finding: "Customer needed installation before school holidays, but board process was not fully mapped.", next: "Confirm board approval steps and documentation requirements.", coaching: "Strong discovery. Next time, lock down who signs off and what evidence they need." },
  { type: "Quote Readiness Review", interaction: "Site visit", human: "Myles", stage: "Prepare Quote", score: 78, sentiment: "Positive", finding: "Site context was strong, but compliance wording needed sharper documentation.", next: "Add safety evidence and install timing assumptions to the proposal.", coaching: "Good technical capture. Missing written decision evidence creates drag later." },
  { type: "Closing Review", interaction: "Outbound phone call", human: "Rachel", stage: "Quote Sent", score: 91, sentiment: "Very positive", finding: "Customer is close if board pack answers safety and timing concerns.", next: "Send board-ready response and book follow-up decision call.", coaching: "Excellent. You identified the real blocker and avoided premature discounting." },
];

const snapshotAgents = ["All", "Agent A", "Agent B", "Agent C"];
const snapshotTypes = ["All", "Phone Call", "Message", "Meeting", "Assessment", "Lead Form"];

const v3Snapshots = [
  {
    id: "S-1048-04",
    agent: "Agent C",
    event: "Outbound phone call",
    type: "Phone Call",
    owner: "Rachel",
    stage: "Quote Sent",
    heat: 89,
    time: "Today, 9:14 am",
    due: "Today",
    summary: "Helen is close to approval but needs a board-ready explanation of safety compliance, install timing and quote revision details.",
    note: "Outbound call transcript: Helen confirmed the board likes the proposal, but they need safety certification, install timing and the revised quote written in a format they can forward internally. Rachel kept the conversation focused and did not discount.",
    markdown: "## Snapshot S-1048-04\n\n**Agent:** Agent C\n**Event:** Outbound phone call\n**Responsible:** Rachel\n**Stage:** Quote Sent\n**Due:** Today\n\nHelen is close to approval but needs a board-ready explanation of safety compliance, install timing and quote revision details.",
    scorecard: { score: 91, title: "Closing Review", finding: "Rachel identified the real blocker and avoided premature discounting.", coaching: "Send the board-ready pack and book the decision call before the urgency cools." },
  },
  {
    id: "S-1048-03",
    agent: "Agent B",
    event: "Site assessment booked",
    type: "Assessment",
    owner: "Myles",
    stage: "Prepare Quote",
    heat: 74,
    time: "8 May, 10:30 am",
    due: "8 May",
    summary: "Site meeting was booked and then completed. Until the assessment was done, the right state was waiting rather than chasing.",
    note: "Assessment note: Myles attended site, captured access notes and confirmed the surface assumptions. PLOD notes were still needed before quote production could move cleanly.",
    markdown: "## Snapshot S-1048-03\n\n**Agent:** Agent B\n**Event:** Site assessment booked\n**Responsible:** Myles\n**Stage:** Prepare Quote\n\nSite meeting booked and assessment dependency recorded.",
    scorecard: { score: 78, title: "Quote Readiness Review", finding: "Good technical capture, but compliance wording needed sharper documentation.", coaching: "Attach evidence while the site context is fresh." },
  },
  {
    id: "S-1048-02",
    agent: "Agent A",
    event: "Inbound phone call",
    type: "Phone Call",
    owner: "Kent",
    stage: "Awaiting Info",
    heat: 67,
    time: "7 May, 3:42 pm",
    due: "7 May",
    summary: "Initial discovery captured timing pressure and board approval, but decision evidence requirements were not fully mapped.",
    note: "Inbound call note: Kent confirmed the customer had timing pressure before school holidays and board approval was required. The missing detail was exactly what evidence the board needed.",
    markdown: "## Snapshot S-1048-02\n\n**Agent:** Agent A\n**Event:** Inbound phone call\n**Responsible:** Kent\n**Stage:** Awaiting Info\n\nInitial discovery captured timing pressure and board approval.",
    scorecard: { score: 86, title: "Discovery Review", finding: "Customer needed installation before school holidays, but board process was not fully mapped.", coaching: "Confirm who signs off and what evidence they need." },
  },
  {
    id: "S-1048-01",
    agent: "Agent A",
    event: "Lead form completed",
    type: "Lead Form",
    owner: "Kent",
    stage: "New Lead",
    heat: 58,
    time: "7 May, 9:08 am",
    due: "7 May",
    summary: "New childcare lead entered the pipeline with playground turf and shock-pad context.",
    note: "Lead form note: Customer submitted a playground turf enquiry with shock-pad context. Source was Google Ads. Early routing belonged in Agent A.",
    markdown: "## Snapshot S-1048-01\n\n**Agent:** Agent A\n**Event:** Lead form completed\n**Responsible:** Kent\n**Stage:** New Lead\n\nNew childcare lead entered the pipeline with playground turf and shock-pad context.",
    scorecard: { score: 82, title: "Lead Intake Review", finding: "Source and product intent were captured cleanly.", coaching: "Push site/use-case context into the first follow-up faster." },
  },
];

const v3AiActivity = [
  ["Draft generated", "North Shore Sports Facility", "$118,500", "Awaiting approval", "92% confidence"],
  ["Escalation created", "Evergreen Childcare Play Area", "$42,800", "Human Required", "Compliance question"],
  ["Summary created", "Westfield Pool Surround", "$36,500", "Quote bottleneck", "Missing PLOD notes"],
  ["Follow-up scheduled", "Barker Residence", "$17,600", "Long-tail", "DND active"],
];

function money(value: number) {
  return `$${value.toLocaleString("en-NZ")}`;
}

function normaliseStatusLabel(label: string) {
  return label.toLowerCase().replace(/\s+/g, "-");
}

function getHeatBand(deal: (typeof v3Deals)[number]) {
  if (deal.closeLikelihood > 85) return "Ready to Close";
  if (deal.closeLikelihood >= 70) return "Hot";
  if (deal.closeLikelihood >= 50) return "Drifting";
  return "Stale";
}

function isCriticalDeal(deal: (typeof v3Deals)[number]) {
  return (
    deal.category === "Human Required" ||
    deal.aiStatus.toLowerCase().includes("human") ||
    deal.urgency >= 90 ||
    (deal.stage === "Prepare Quote" && deal.assessmentStatus === "Completed" && deal.readiness <= 55)
  );
}

function getQueueSignal(deal: (typeof v3Deals)[number]) {
  if (isCriticalDeal(deal)) return "Critical";
  return getHeatBand(deal);
}

function getRecommendedChannel(deal: (typeof v3Deals)[number]) {
  const text = `${deal.nextAction} ${deal.preferredChannel}`.toLowerCase();
  if (text.includes("whatsapp")) return "WhatsApp";
  if (text.includes("sms")) return "SMS";
  if (text.includes("email") || text.includes("draft") || text.includes("send")) return "Email";
  return "Call";
}

function HeatScore({ deal }: { deal: (typeof v3Deals)[number] }) {
  const signal = getQueueSignal(deal);
  return (
    <span className={`v3-heat ${normaliseStatusLabel(signal)}`}>
      <b>{deal.closeLikelihood}%</b>
      <small>{signal}</small>
    </span>
  );
}

type QueueSort = "heat-desc" | "heat-asc" | "value-desc" | "value-asc" | "due-asc" | "due-desc";
type DueFilter = "All" | "Overdue" | "Today" | "Tomorrow" | "Next 7" | "Next 14" | "Next 28" | "Custom";

const queueSortOptions: { id: QueueSort; label: string }[] = [
  { id: "heat-desc", label: "Heat high-low" },
  { id: "heat-asc", label: "Heat low-high" },
  { id: "value-desc", label: "Value high-low" },
  { id: "value-asc", label: "Value low-high" },
  { id: "due-asc", label: "Due soonest" },
  { id: "due-desc", label: "Due latest" },
];

const dueFilterOptions: DueFilter[] = ["All", "Overdue", "Today", "Tomorrow", "Next 7", "Next 14", "Next 28", "Custom"];

function getDealHeatScore(deal: (typeof v3Deals)[number]) {
  return Math.round((deal.intent + deal.readiness + deal.closeLikelihood + deal.urgency) / 4);
}

function getDealDueDays(deal: (typeof v3Deals)[number]) {
  if (deal.due === "Overdue") return -1;
  if (deal.due === "Today") return 0;
  if (deal.due === "Tomorrow") return 1;
  const parsed = Date.parse(`${deal.due} 2026`);
  if (Number.isNaN(parsed)) return 999;
  const today = Date.parse("28 May 2026");
  return Math.round((parsed - today) / 86400000);
}

function getDueBucketLabel(deal: (typeof v3Deals)[number]) {
  const days = getDealDueDays(deal);
  if (days < 0) return "Overdue";
  if (days === 0) return "Today";
  if (days === 1) return "Tomorrow";
  if (days <= 7) return "Next 7";
  if (days <= 14) return "Next 14";
  if (days <= 28) return "Next 28";
  return "Later";
}

function getDealDueDate(deal: (typeof v3Deals)[number]) {
  if (deal.due === "Overdue" || deal.due === "Today") return "2026-05-28";
  if (deal.due === "Tomorrow") return "2026-05-29";
  const parsed = Date.parse(`${deal.due} 2026`);
  if (Number.isNaN(parsed)) return "";
  return new Date(parsed).toISOString().slice(0, 10);
}

function matchesDueFilter(deal: (typeof v3Deals)[number], filter: DueFilter, customDueDate: string) {
  if (filter === "Custom") return customDueDate ? getDealDueDate(deal) === customDueDate : true;
  if (filter === "All") return true;
  return getDueBucketLabel(deal) === filter;
}

function getQueueSummary(action: string) {
  return action.length > 78 ? `${action.slice(0, 75)}...` : action;
}

const cockpitQueue = [
  {
    rank: 1,
    customer: "Toby Mills",
    org: "Toby Mills - 5 Oaia Road, Muriwai",
    value: "$8,640.20",
    state: "Quote Sent",
    next: "Putting green opened email? Try call again",
    owner: "Rachel",
    risk: "High",
    age: "2026-05-28"
  },
  {
    rank: 2,
    customer: "Krystal Xu",
    org: "129-131 Coronation Road, Mangere Bridge",
    value: "$0",
    state: "Prepare Quote",
    next: "Online quote",
    owner: "Kent",
    risk: "High",
    age: "2026-05-28"
  },
  {
    rank: 3,
    customer: "Matt Bonham",
    org: "11 Glenreagh Place, Torbay",
    value: "$3,716.45",
    state: "Quote Sent",
    next: "AR to EOM?",
    owner: "Rachel",
    risk: "High",
    age: "2026-05-29"
  },
  {
    rank: 4,
    customer: "Matt Bonham",
    org: "MABON LTD",
    value: "$3,112.95",
    state: "Quote Sent",
    next: "Decision? Reviewing other quote?",
    owner: "Rachel",
    risk: "High",
    age: "2026-05-27"
  },
  {
    rank: 5,
    customer: "Damon Brown",
    org: "RCC Construction Services Ltd",
    value: "$10,305.72",
    state: "Quote Sent",
    next: "20K tender?",
    owner: "Rachel",
    risk: "High",
    age: "2026-06-30"
  },
  {
    rank: 6,
    customer: "Tarun Lalwani",
    org: "23A Brabham Place, Avondale",
    value: "$3,412.71",
    state: "Prepare Quote",
    next: "Avondale site visit",
    owner: "Kent",
    risk: "High",
    age: "2026-05-27"
  },
  {
    rank: 7,
    customer: "Sam Greenwood",
    org: "41 Palmerston Road, Birkenhead",
    value: "$5,263.82",
    state: "Open",
    next: "GW - 39.63 m2 - Birkenhead",
    owner: "Gareth",
    risk: "High",
    age: "2026-05-29"
  },
  {
    rank: 8,
    customer: "Cameron Johnson",
    org: "14B Patterson Street, Sandringham",
    value: "$4,072.83",
    state: "Open",
    next: "GW - 21.43 m2 - Sandringham",
    owner: "Gareth",
    risk: "Medium",
    age: "2026-05-26"
  },
  {
    rank: 9,
    customer: "Tim Neville",
    org: "New Shoots Childrens Centre",
    value: "$3,200",
    state: "Prepare Quote",
    next: "Set next activity",
    owner: "Sean",
    risk: "High",
    age: "2026-05-28"
  },
  {
    rank: 10,
    customer: "Tim Neville",
    org: "New Shoots Childrens Centre",
    value: "$3,200",
    state: "Prepare Quote",
    next: "Set next activity",
    owner: "Sean",
    risk: "High",
    age: "2026-05-28"
  },
  {
    rank: 11,
    customer: "Tim Neville",
    org: "New Shoots Childrens Centre",
    value: "$3,200",
    state: "Prepare Quote",
    next: "Set next activity",
    owner: "Sean",
    risk: "High",
    age: "2026-05-28"
  },
  {
    rank: 12,
    customer: "Tim Neville",
    org: "New Shoots Childrens Centre",
    value: "$0",
    state: "Prepare Quote",
    next: "Set next activity",
    owner: "Sean",
    risk: "High",
    age: "2026-05-28"
  },
  {
    rank: 13,
    customer: "Mike Cooper",
    org: "Simik RPM NZ Limited",
    value: "$7,391.53",
    state: "Open",
    next: "Touch base on drainage",
    owner: "Gareth",
    risk: "Medium",
    age: "2026-05-28"
  },
  {
    rank: 14,
    customer: "Caitlin Riedstra",
    org: "2 Commins Road, Onerahi",
    value: "$909.53",
    state: "AAD",
    next: "Product choice / timing",
    owner: "Rachel",
    risk: "High",
    age: "2026-05-27"
  },
  {
    rank: 15,
    customer: "Richard Reynolds",
    org: "Body Corporate 13105",
    value: "$41,466.87",
    state: "Open",
    next: "TI - 612.69 m2 - Saint Heliers",
    owner: "Gareth",
    risk: "Medium",
    age: "2026-06-08"
  },
  {
    rank: 16,
    customer: "Joe O'Sullivan",
    org: "115 St Heliers Bay Rd",
    value: "$4,879.82",
    state: "Open",
    next: "Review latest context and set next action",
    owner: "Gareth",
    risk: "Low",
    age: "2026-05-22"
  },
  {
    rank: 17,
    customer: "Nick White",
    org: "44 Bartlett Drive, Silverdale",
    value: "$3,852.29",
    state: "Open",
    next: "2nd - GW - 15.93 m2 - Silverdale",
    owner: "Gareth",
    risk: "Medium",
    age: "2026-05-27"
  },
  {
    rank: 18,
    customer: "Eric Wang",
    org: "32D Vermeer Place, West Harbour",
    value: "$1,891.37",
    state: "Open",
    next: "Check details and send invoice",
    owner: "Gareth",
    risk: "High",
    age: "2026-05-27"
  },
  {
    rank: 19,
    customer: "Emily Hunt",
    org: "11D Sloane Street, Glen Innes",
    value: "$2,135.01",
    state: "Open",
    next: "Check details and send invoice",
    owner: "Gareth",
    risk: "High",
    age: "2026-05-27"
  },
  {
    rank: 20,
    customer: "Roy Kumar",
    org: "25 Quattro Avenue, Flat Bush",
    value: "$7,205.30",
    state: "AI Follow-up",
    next: "Ready to revisit in spring/summer",
    owner: "Rachel",
    risk: "Medium",
    age: "2026-09-01"
  }
];

function App() {
  const isV1 = window.location.pathname.startsWith("/v1");
  const isV4 = window.location.pathname.startsWith("/v4");
  const isV3 = window.location.pathname.startsWith("/v3");
  const isV2 = !isV1 && !isV3 && !isV4;
  const [askOpen, setAskOpen] = React.useState(false);
  const [profileOpen, setProfileOpen] = React.useState(false);
  const askPanelRef = React.useRef<HTMLDivElement | null>(null);
  const [sidebarCollapsed, setSidebarCollapsed] = React.useState(() => {
    return window.localStorage.getItem("diwa-sidebar-collapsed") === "true";
  });

  React.useEffect(() => {
    window.localStorage.setItem("diwa-sidebar-collapsed", String(sidebarCollapsed));
  }, [sidebarCollapsed]);

  React.useEffect(() => {
    if (!askOpen && !profileOpen) return;

    const closeOnOutsideClick = (event: PointerEvent) => {
      if (askPanelRef.current?.contains(event.target as Node)) return;
      setAskOpen(false);
      setProfileOpen(false);
    };

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setAskOpen(false);
        setProfileOpen(false);
      }
    };

    window.addEventListener("pointerdown", closeOnOutsideClick);
    window.addEventListener("keydown", closeOnEscape);

    return () => {
      window.removeEventListener("pointerdown", closeOnOutsideClick);
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [askOpen, profileOpen]);

  return (
    <main className={`shell ${sidebarCollapsed ? "sidebar-collapsed" : ""}`}>
      <aside className="sidebar">
        <div className="brand-block">
          <div className="brand-logo-wrap">
            <img className="brand-logo" src="/brand/zeczi-logo.png" alt="ZECZI" />
            <img className="brand-icon" src="/brand/zeczi-favicon.png" alt="ZECZI" />
          </div>
          <span className="brand-pill">DIWA</span>
        </div>

        <nav className="nav-list" aria-label="DIWA navigation">
          <a className="nav-item active" href="#cockpit" title="Cockpit"><Gauge size={17} /> <span>Cockpit</span></a>
          <a className="nav-item" href="#deals" title="Deal Intelligence"><BriefcaseBusiness size={17} /> <span>Deal Intelligence</span></a>
          <a className="nav-item" href="#activities" title="Activities"><ClipboardList size={17} /> <span>Activities</span></a>
          <a className="nav-item" href="#context" title="Context Timeline"><Layers3 size={17} /> <span>Context Timeline</span></a>
          <a className="nav-item" href="#reports" title="Reports"><FileText size={17} /> <span>Reports</span></a>
          <a className="nav-item" href="#scorecards" title="Scorecards"><CheckCircle2 size={17} /> <span>Scorecards</span></a>
          <a className="nav-item" href="#agents" title="Agents"><Bot size={17} /> <span>Agents</span></a>
          <a className="nav-item" href="#integrations" title="Integrations"><PlugZap size={17} /> <span>Integrations</span></a>
          <a className="nav-item" href="#knowledge" title="Knowledge"><Brain size={17} /> <span>Knowledge</span></a>
        </nav>

        <div className="sidebar-foot">
          <div className="sidebar-panel today-actions">
            <p className="eyebrow">Today&apos;s Actions</p>
            <div><span>To Do</span><strong>150</strong></div>
            <div><span>Completed</span><strong>25</strong></div>
          </div>
          <div className="sidebar-panel">
            <p className="eyebrow">Workspace</p>
            <strong>Eco Lawn</strong>
            <span>Prototype tenant</span>
          </div>
          <button
            className="sidebar-toggle"
            type="button"
            aria-label={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            aria-pressed={sidebarCollapsed}
            onClick={() => setSidebarCollapsed((current) => !current)}
            title={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {sidebarCollapsed ? <PanelLeftOpen size={18} /> : <PanelLeftClose size={18} />}
            <span className="toggle-label">{sidebarCollapsed ? "Expand" : "Collapse"}</span>
          </button>
        </div>
      </aside>

      <section className={`content ${isV2 || isV3 || isV4 ? "content-v2" : ""} ${isV3 || isV4 ? "content-v3" : ""} ${isV4 ? "content-v4" : ""}`}>
        <header className={`topbar ${isV2 || isV3 || isV4 ? "topbar-v2" : ""}`}>
          <div>
            {isV4 ? (
              <>
                <p className="eyebrow">DIWA Cockpit v4</p>
                <h1>Pipeline stages drive the workspace.</h1>
              </>
            ) : isV3 ? (
              <>
                <p className="eyebrow">DIWA Cockpit v3</p>
                <h1>Command centre for deal context.</h1>
              </>
            ) : isV2 ? (
              <>
                <p className="eyebrow">DIWA Cockpit v2</p>
                <h1>Context is operational intelligence.</h1>
              </>
            ) : (
              <>
                <p className="eyebrow">Deal Intelligence Workspace Application</p>
                <h1>Today&apos;s commercial control surface</h1>
              </>
            )}
          </div>
          <div className="topbar-actions" ref={askPanelRef}>
            <button className="icon-button" aria-label="Search"><Search size={18} /></button>
            <button className="primary-button" onClick={() => setAskOpen((current) => !current)} aria-expanded={askOpen}>
              <Sparkles size={16} /> Ask DIWA
            </button>
            <button className="customer-avatar" aria-label="Customer profile" title="Customer profile" onClick={() => setProfileOpen((current) => !current)} aria-expanded={profileOpen}>
              <img src="/brand/customer-avatar.jpg" alt="" />
            </button>
            {askOpen && <AskDiwaPanel />}
            {profileOpen && <ProfileMenu />}
          </div>
        </header>

        <div className="workspace" id="cockpit">
          {isV4 ? (
            <CockpitV4 />
          ) : isV3 ? (
            <CockpitV3 />
          ) : isV2 ? (
            <CockpitV2 />
          ) : (
            <>
          <section className="hero-band">
            <div>
              <p className="eyebrow">The Art of Context</p>
              <h2>Turn fragmented sales activity into ranked action.</h2>
              <p>
                DIWA sits above CRM, email, RFQs, quotes, calls, and staff memory so the team can see what matters, why it matters, and what should happen next.
              </p>
            </div>
            <div className="hero-command">
              <span><Zap size={16} /> Recommended first action</span>
              <strong>Clear the high-risk quote coordination lane.</strong>
              <p>One owner, one next step, one source of truth before the deal loses heat.</p>
            </div>
          </section>

          <section className="metric-grid" aria-label="Pipeline intelligence metrics">
            <Metric icon={Target} label="Hot pipeline" value="$286k" detail="12 deals above 70 intent" tone="gold" />
            <Metric icon={AlertTriangle} label="At risk" value="$74k" detail="4 quotes need human judgement" tone="red" />
            <Metric icon={Clock3} label="Follow-up window" value="9" detail="short-window actions due today" tone="orange" />
            <Metric icon={CheckCircle2} label="Agent safe work" value="31" detail="low-risk actions ready or done" tone="green" />
          </section>

          <section className="main-grid">
            <div className="panel wide" id="deals">
              <div className="section-head">
                <div>
                  <p className="eyebrow">Ranked Deals</p>
                  <h3>Priority queue</h3>
                </div>
                <button><ArrowUpRight size={16} /> Open pipeline</button>
              </div>
              <div className="deal-list">
                {deals.map((deal) => <DealRow deal={deal} key={deal.name} />)}
              </div>
            </div>

            <div className="panel" id="human">
              <div className="section-head compact">
                <div>
                  <p className="eyebrow">Exceptions</p>
                  <h3>Human Required</h3>
                </div>
                <span className="pill warn">4 active</span>
              </div>
              <div className="exception-card">
                <AlertTriangle size={20} />
                <strong>Pricing judgement needed</strong>
                <p>Customer has timing pressure and incomplete quote assumptions. DIWA should not send until a human confirms the commercial position.</p>
              </div>
              <div className="exception-card soft">
                <PhoneCall size={20} />
                <strong>Call framework ready</strong>
                <p>Use the latest site notes, quote delta, and buyer intent signals. Keep the call tight.</p>
              </div>
            </div>
          </section>

          <section className="main-grid">
            <div className="panel" id="context">
              <div className="section-head compact">
                <div>
                  <p className="eyebrow">Context Stream</p>
                  <h3>Latest intelligence</h3>
                </div>
              </div>
              <div className="activity-list">
                {activity.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div className="activity-item" key={item.label}>
                      <Icon size={18} />
                      <div>
                        <strong>{item.label}</strong>
                        <span>{item.detail}</span>
                      </div>
                      <time>{item.time}</time>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="panel" id="sources">
              <div className="section-head compact">
                <div>
                  <p className="eyebrow">Data Layer</p>
                  <h3>Source links</h3>
                </div>
              </div>
              <div className="source-list">
                {sources.map((source) => (
                  <div className="source-item" key={source.name}>
                    <FileText size={17} />
                    <div>
                      <strong>{source.name}</strong>
                      <span>{source.status}</span>
                    </div>
                    <span className={`pill ${source.health === "Live" ? "ok" : ""}`}>{source.health}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="panel command-panel" id="agents">
            <div>
              <p className="eyebrow">Conversational Layer</p>
              <h3>Ask commercially useful questions.</h3>
              <p>DIWA should answer from the full deal context, then recommend or execute the next approved action.</p>
            </div>
            <div className="prompt-grid">
              <button><Inbox size={16} /> What needs attention today?</button>
              <button><Activity size={16} /> Which quotes are going stale?</button>
              <button><MessageSquareText size={16} /> Draft the follow-up.</button>
              <button><Brain size={16} /> Summarise this customer.</button>
            </div>
          </section>
            </>
          )}
        </div>
      </section>
    </main>
  );
}

function CockpitV4() {
  const [activeStage, setActiveStage] = React.useState<string | null>(null);
  const [activeStatus, setActiveStatus] = React.useState<string | null>(null);
  const [queueSort, setQueueSort] = React.useState<QueueSort>("heat-desc");
  const [dueFilter, setDueFilter] = React.useState<DueFilter>("All");
  const [customDueDate, setCustomDueDate] = React.useState("");
  const [activeTab, setActiveTab] = React.useState(dealTabs[0]);
  const [selectedId, setSelectedId] = React.useState(v3Deals[0].id);
  const selectedDeal = v3Deals.find((deal) => deal.id === selectedId) ?? v3Deals[0];
  const stageDeals = React.useMemo(() => {
    if (!activeStage || activeStage === "All") return v3Deals;
    if (activeStage.includes("Human Required")) {
      return v3Deals.filter((deal) => deal.category === "Human Required" || deal.aiStatus.includes("human"));
    }
    if (activeStage === "AI Long-Tail") return v3Deals.filter((deal) => deal.category === "Long-Tail");
    if (activeStage === "AI Follow-Up") return v3Deals.filter((deal) => deal.stage === "AI Follow-Up");
    if (activeStage === "Quote Sent") return v3Deals.filter((deal) => deal.stage === "Quote Sent");
    if (activeStage === "Prepare Quote") return v3Deals.filter((deal) => deal.stage === "Prepare Quote");
    return v3Deals.filter((deal) => deal.stage === activeStage);
  }, [activeStage]);
  const statusDeals = React.useMemo(() => {
    if (!activeStatus || activeStatus === "All") return stageDeals;
    if (activeStatus === "Critical") return stageDeals.filter(isCriticalDeal);
    return stageDeals.filter((deal) => getHeatBand(deal) === activeStatus);
  }, [activeStatus, stageDeals]);
  const dueDeals = React.useMemo(() => statusDeals.filter((deal) => matchesDueFilter(deal, dueFilter, customDueDate)), [customDueDate, dueFilter, statusDeals]);
  const queueDeals = React.useMemo(() => {
    const filtered = dueDeals.length > 0 ? dueDeals : statusDeals;
    return [...filtered].sort((a, b) => {
      if (queueSort === "heat-desc") return getDealHeatScore(b) - getDealHeatScore(a);
      if (queueSort === "heat-asc") return getDealHeatScore(a) - getDealHeatScore(b);
      if (queueSort === "value-desc") return b.value - a.value;
      if (queueSort === "value-asc") return a.value - b.value;
      if (queueSort === "due-desc") return getDealDueDays(b) - getDealDueDays(a);
      return getDealDueDays(a) - getDealDueDays(b);
    });
  }, [dueDeals, queueSort, statusDeals]);

  return (
    <section className="cockpit-v4" aria-label="DIWA cockpit v4">
      <div className="v4-stage-strip" aria-label="Pipeline stage filters">
        {pipelineStages.map((stage) => (
          <button
            className={`${activeStage === stage.id ? "active" : ""} ${stage.tone ?? ""}`}
            type="button"
            onClick={() => setActiveStage((current) => current === stage.id ? null : stage.id)}
            key={stage.id}
          >
            <span>{stage.label}</span>
            <strong>{stage.count}</strong>
            <em>{stage.value}</em>
          </button>
        ))}
      </div>

      <div className="v4-status-row" aria-label="Cockpit status filters">
        {cockpitStatusRow.map((status) => (
          <button
            className={`${status.tone} ${activeStatus === status.label ? "active" : ""}`}
            type="button"
            onClick={() => setActiveStatus((current) => current === status.label ? null : status.label)}
            key={status.label}
          >
            <span>{status.label}</span>
            <strong>{status.count}</strong>
            <em>{status.value}</em>
          </button>
        ))}
      </div>

      <div className="v4-workspace">
        <section className="panel v4-queue">
          <div className="v3-panel-head">
            <div>
              <p className="eyebrow">{activeStage && activeStage !== "All" ? activeStage : "Command Queue"}</p>
              <h3>{activeStage || activeStatus ? "Filtered deal queue" : "Command Queue"}</h3>
            </div>
            <span className="v2-live">{queueDeals.length} shown</span>
          </div>
          <div className="v4-queue-controls compact" aria-label="Command queue controls">
            <label>
              <span>Sort</span>
              <select value={queueSort} onChange={(event) => setQueueSort(event.target.value as QueueSort)}>
                {queueSortOptions.map((option) => <option value={option.id} key={option.id}>{option.label}</option>)}
              </select>
            </label>
            <label>
              <span>Due</span>
              <select value={dueFilter} onChange={(event) => setDueFilter(event.target.value as DueFilter)}>
                {dueFilterOptions.map((option) => <option value={option} key={option}>{option}</option>)}
              </select>
            </label>
            {dueFilter === "Custom" && (
              <label className="v4-date-control">
                <span>Date</span>
                <input type="date" value={customDueDate} onChange={(event) => setCustomDueDate(event.target.value)} />
              </label>
            )}
          </div>
          <div className="v4-queue-head">
            <span>Deal</span>
            <span>Value</span>
            <span>Heat</span>
            <span>Due</span>
          </div>
          <div className="v3-command-list expanded">
            {queueDeals.map((deal, index) => (
              <button className={deal.id === selectedDeal.id ? "selected" : ""} type="button" onClick={() => setSelectedId(deal.id)} key={deal.id}>
                <span className="v3-rank">{index + 1}</span>
                <div className="v4-queue-deal">
                  <strong>{deal.id} · {deal.customer}</strong>
                  <small>{deal.company !== "Residential" ? deal.company : deal.name} · Owner: {deal.owner}</small>
                  <em>{getQueueSummary(deal.nextAction)}</em>
                </div>
                <strong>{money(deal.value)}</strong>
                <HeatScore deal={deal} />
                <span className="v4-due-cell"><b>{deal.due}</b><small>{getDueBucketLabel(deal)}</small></span>
              </button>
            ))}
          </div>
        </section>

        <V3DealDetailShell deal={selectedDeal} activeTab={activeTab} setActiveTab={setActiveTab} />

        <aside className="v4-side">
          <V4ActionPanel deal={selectedDeal} />
        </aside>
      </div>
    </section>
  );
}

function ProfileMenu() {
  return (
    <section className="profile-menu" aria-label="Profile menu">
      <button type="button">Profile</button>
      <button type="button">Settings</button>
      <button type="button">Logout</button>
    </section>
  );
}

function V4ActionPanel({ deal }: { deal: (typeof v3Deals)[number] }) {
  const recommendedChannel = getRecommendedChannel(deal);
  const [activeChannel, setActiveChannel] = React.useState(recommendedChannel);
  const [activityState, setActivityState] = React.useState("Ready to create");

  React.useEffect(() => {
    setActiveChannel(recommendedChannel);
    setActivityState("Ready to create");
  }, [deal.id, recommendedChannel]);

  const channels = [
    { label: "SMS", icon: MessageSquareText },
    { label: "WhatsApp", icon: MessageSquareText },
    { label: "Email", icon: Mail },
    { label: "Call", icon: PhoneCall },
  ];

  const channelCopy: Record<string, string> = {
    SMS: `Hi ${deal.customer.split(" ")[0]}, quick check-in from Eco Lawn. Is now still a good time to move this forward, or should we adjust timing?`,
    WhatsApp: `Hi ${deal.customer.split(" ")[0]}, just keeping this tidy: ${deal.nextAction}`,
    Email: `Hi ${deal.customer.split(" ")[0]},\n\nThanks again. The clean next step from here is: ${deal.nextAction}\n\nI can keep this moving once you confirm.`,
    Call: `Objective: ${deal.nextAction}\n\nOpen by confirming timing, then clarify the real blocker. Avoid discounting unless price is explicitly the decision issue.`,
  };

  return (
    <section className="panel v4-action-panel" aria-label="Next best action">
      <div className="v3-panel-head">
        <div>
          <p className="eyebrow">Next Best Action</p>
          <h3>{deal.customer}</h3>
        </div>
        <span className="v2-live">{recommendedChannel}</span>
      </div>

      <article className="v4-next-step">
        <strong>{deal.nextAction}</strong>
        <p>{deal.why}</p>
        <div>
          <span>{deal.stage}</span>
          <span>{deal.owner}</span>
          <span>{deal.due}</span>
        </div>
      </article>

      <div className="v4-channel-tabs" role="tablist" aria-label="Communication channels">
        {channels.map((channel) => {
          const Icon = channel.icon;
          const recommended = channel.label === recommendedChannel;
          return (
            <button
              className={activeChannel === channel.label ? "active" : ""}
              type="button"
              onClick={() => setActiveChannel(channel.label)}
              key={channel.label}
            >
              <Icon size={15} />
              <span>{channel.label}</span>
              {recommended && <Star size={13} aria-label="Recommended" />}
            </button>
          );
        })}
      </div>

      <div className="v4-composer">
        <div>
          <span>{activeChannel === recommendedChannel ? "Recommended channel" : "Alternate channel"}</span>
          <strong>{activeChannel}</strong>
        </div>
        <pre>{channelCopy[activeChannel]}</pre>
        <div className="v4-activity-actions">
          <button
            className="primary-button"
            type="button"
            onClick={() => setActivityState(`Activity staged for ${deal.owner} via ${activeChannel}`)}
          >
            <Send size={15} /> Create Pipedrive activity
          </button>
          <span>{activityState}</span>
        </div>
      </div>
    </section>
  );
}

function V4SidePanel({ view }: { view: string }) {
  if (view === "Context Timeline") {
    return (
      <section className="panel v4-side-panel">
        <div className="v3-panel-head"><div><p className="eyebrow">Context Timeline</p><h3>Historic and upcoming context</h3></div></div>
        <div className="v3-timeline-list">
          {v3TimelineEvents.map((event) => (
            <article key={event.type + event.time}>
              <div><strong>{event.type}</strong><time>{event.time}</time></div>
              <small>{event.source} · {event.stage}</small>
              <p>{event.summary}</p>
              <div>{event.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
            </article>
          ))}
        </div>
      </section>
    );
  }

  if (view === "AI Activity") {
    return (
      <section className="panel v4-side-panel">
        <div className="v3-panel-head"><div><p className="eyebrow">AI Activity</p><h3>Scheduled and recent actions</h3></div><span className="v2-live">Live</span></div>
        <div className="v3-ai-list expanded">
          {v3AiActivity.map(([activityName, dealName, value, status, reason]) => (
            <span key={activityName + dealName}><Bot size={15} /><strong>{activityName}</strong><small>{dealName} · {value} · {status} · {reason}</small></span>
          ))}
        </div>
      </section>
    );
  }

  if (view === "Reports") {
    return (
      <section className="panel v4-side-panel">
        <div className="v3-panel-head"><div><p className="eyebrow">Reports</p><h3>Manager briefing</h3></div></div>
        <p className="v4-brief">North Shore is the biggest cash risk because follow-up is overdue. Evergreen needs a human response today. Westfield is an internal blockage, not a customer problem.</p>
        <div className="v3-report-grid">
          <span><strong>18%</strong><small>Human edit rate</small></span>
          <span><strong>74%</strong><small>Approval rate</small></span>
          <span><strong>31%</strong><small>Response rate</small></span>
        </div>
      </section>
    );
  }

  if (view === "Knowledge") {
    return (
      <section className="panel v4-side-panel">
        <div className="v3-panel-head">
          <div><p className="eyebrow">Knowledge</p><h3>Context asset builder</h3></div>
          <button className="primary-button" type="button"><Sparkles size={15} /> Create</button>
        </div>
        <div className="v3-knowledge-brief">
          <strong>Separate page, not cockpit clutter.</strong>
          <p>DIWA should ask targeted questions, then build macro personas, micro personas, pain points, objections, quote rules, tone guidance and scorecard frameworks.</p>
        </div>
        <div className="v3-asset-grid expanded">
          {["Personas", "Pain points", "Objections", "Product details", "Service details", "Quote rules", "Escalation logic", "Tone guidance", "Sales scripts"].map((asset) => <span key={asset}>{asset}</span>)}
        </div>
      </section>
    );
  }

  if (view === "Integrations") {
    return (
      <section className="panel v4-side-panel">
        <div className="v3-panel-head"><div><p className="eyebrow">Integrations</p><h3>Source connections</h3></div></div>
        <div className="v3-settings-table">
          {[["CRM", "Pipedrive", "Live"], ["Email/RFQ", "Gmail via n8n", "Live"], ["Automation", "n8n", "Live"], ["Quoting", "Quote workflow", "Planned"]].map(([layer, system, status]) => (
            <div key={layer}><strong>{layer}</strong><span>{system}</span><em>{status}</em></div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="panel v4-side-panel">
      <div className="v3-panel-head"><div><p className="eyebrow">Settings</p><h3>Implementation admin</h3></div><span className="pill">MVP</span></div>
      <div className="v3-settings-table">
        {[["Permissions", "Roles and approval rules", "Designing"], ["Human Required", "Escalation thresholds", "Designing"], ["Stage mapping", "Pipedrive pipeline stages", "Mapped"], ["Workspace", "Eco Lawn tenant", "Prototype"]].map(([layer, system, status]) => (
          <div key={layer}><strong>{layer}</strong><span>{system}</span><em>{status}</em></div>
        ))}
      </div>
    </section>
  );
}

function AskDiwaPanel() {
  const commands = [
    {
      icon: Target,
      title: "Create campaign",
      detail: "Build a focused SMS, WhatsApp, or email offer from selected deal segments.",
    },
    {
      icon: BriefcaseBusiness,
      title: "Brief this deal",
      detail: "Summarise buyer context, last touch, risk, value, owner, and best next action.",
    },
    {
      icon: Search,
      title: "Find hidden risk",
      detail: "Search CRM, email, notes, RFQs, and quote state for stale or exposed work.",
    },
    {
      icon: Bot,
      title: "Create agent project",
      detail: "Spin up a workspace with source context, objective, constraints, and approval lane.",
    },
  ];

  return (
    <section className="ask-panel" aria-label="Ask DIWA command surface">
      <div className="ask-panel-head">
        <div>
          <p className="eyebrow">Ask DIWA</p>
          <h3>Command the context layer</h3>
        </div>
        <span>Prototype</span>
      </div>
      <div className="ask-input">
        <Sparkles size={16} />
        <span>Create a campaign for warm quote-sent deals over $3k with no activity this week...</span>
      </div>
      <div className="ask-command-grid">
        {commands.map((command) => {
          const Icon = command.icon;
          return (
            <button type="button" key={command.title}>
              <Icon size={17} />
              <span>
                <strong>{command.title}</strong>
                <small>{command.detail}</small>
              </span>
            </button>
          );
        })}
      </div>
      <div className="ask-context-strip">
        <span>Pipedrive</span>
        <span>DIWA context</span>
        <span>Gmail/RFQ</span>
        <span>n8n actions</span>
      </div>
    </section>
  );
}

function CockpitV3() {
  const [view, setView] = React.useState("Command Centre");
  const [activeTab, setActiveTab] = React.useState(dealTabs[0]);
  const [selectedId, setSelectedId] = React.useState(v3Deals[0].id);
  const commandDeals = React.useMemo(() => [...v3Deals].sort((a, b) => b.priority - a.priority), []);
  const selectedDeal = commandDeals.find((deal) => deal.id === selectedId) ?? commandDeals[0];
  const totalValue = commandDeals.reduce((sum, deal) => sum + deal.value, 0);
  const metrics = [
    { label: "Ready to Close", count: 2, value: money(161300), detail: "Avg readiness 88%. Oldest untouched: North Shore, 5 days.", tone: "green" },
    { label: "Human Required", count: 3, value: money(197800), detail: "Top reason: judgement or approval required.", tone: "red" },
    { label: "Follow-Up Due", count: 2, value: money(161300), detail: "One overdue, one human-call-required.", tone: "orange" },
    { label: "Pipeline Sentiment", count: "74%", value: money(totalValue), detail: "Top negative driver: slow internal action.", tone: "blue" },
  ];

  return (
    <section className="cockpit-v3" aria-label="DIWA cockpit v3">
      <aside className="v3-nav-panel">
        <div className="v3-nav-head">
          <strong>Command Centre</strong>
          <span>Eco Lawn</span>
        </div>
        <nav aria-label="DIWA v3 sections">
          {navItems.map((item) => (
            <button className={view === item ? "active" : ""} type="button" onClick={() => setView(item)} key={item}>
              {item}
            </button>
          ))}
        </nav>
      </aside>

      <section className="v3-main">
        <div className="v3-pipeline-strip" aria-label="Pipeline stages">
          {v3PipelineStages.map((stage, index) => (
            <button className={stage === "Human Required" ? "critical" : index > 5 ? "quiet" : ""} type="button" key={stage}>
              <span>{stage}</span>
              <strong>{stage === "Human Required" ? 4 : stage === "Quote Sent" ? 17 : stage === "AI Follow-Up" ? 68 : index * 7 + 12}</strong>
            </button>
          ))}
        </div>

        <div className="v3-metrics">
          {metrics.map((metric) => (
            <button className={`v3-metric ${metric.tone}`} type="button" onClick={() => setView(metric.label === "Ready to Close" ? "Hot Deals" : metric.label === "Follow-Up Due" ? "Follow-Up" : metric.label === "Human Required" ? "Human Required" : "Reports")} key={metric.label}>
              <span>{metric.label}</span>
              <strong>{metric.value}</strong>
              <small>{metric.count} · {metric.detail}</small>
            </button>
          ))}
        </div>

        {view === "Command Centre" ? (
        <div className="v3-grid">
          <section className="panel v3-command" id="v3-command-centre">
            <div className="v3-panel-head">
              <div>
                <p className="eyebrow">Command Queue</p>
                <h3>Highest leverage moves</h3>
              </div>
              <span className="v2-live">{commandDeals.length} model deals</span>
            </div>
            <div className="v3-command-list">
              {commandDeals.map((deal, index) => (
                <button className={deal.id === selectedDeal.id ? "selected" : ""} type="button" onClick={() => setSelectedId(deal.id)} key={deal.id}>
                  <span className="v3-rank">{index + 1}</span>
                  <div>
                    <strong>{deal.customer}</strong>
                    <small>{deal.name}</small>
                  </div>
                  <span className={`v3-risk ${deal.category === "Human Required" ? "high" : deal.category === "Quote Bottleneck" ? "medium" : ""}`}>{deal.category}</span>
                  <strong>{money(deal.value)}</strong>
                  <small>{deal.nextAction}</small>
                </button>
              ))}
            </div>
          </section>

          <section className="panel v3-deal-detail" id="v3-deals">
            <div className="v3-panel-head">
              <div>
                <p className="eyebrow">Selected Deal</p>
                <h3>{selectedDeal.customer}</h3>
              </div>
              <span className="pill warn">{selectedDeal.aiStatus}</span>
            </div>
            <div className="v3-tabs" role="tablist" aria-label="Deal views">
              {dealTabs.map((tab) => (
                <button className={activeTab === tab ? "active" : ""} type="button" onClick={() => setActiveTab(tab)} key={tab}>
                  {tab}
                </button>
              ))}
            </div>
            <V3DealTab activeTab={activeTab} deal={selectedDeal} />
          </section>

          <section className="panel v3-human" id="v3-human-required">
            <div className="v3-panel-head tight">
              <p className="eyebrow">Human Required</p>
              <span className="pill warn">4</span>
            </div>
            <div className="v3-human-card">
              <AlertTriangle size={17} />
              <div>
                <strong>Commercial judgement required</strong>
                <span>Automation should pause where quote assumptions or margin risk are unclear.</span>
              </div>
            </div>
            <div className="v3-human-card">
              <PhoneCall size={17} />
              <div>
                <strong>Call before message</strong>
                <span>High-value quote-sent deals need human tone before DIWA drafts follow-up.</span>
              </div>
            </div>
          </section>

          <section className="panel v3-ai" id="v3-ai-activity">
            <div className="v3-panel-head tight">
              <p className="eyebrow">AI Activity</p>
              <span className="v2-live">Live</span>
            </div>
            <div className="v3-ai-list">
              {v3AiActivity.map(([activityName, dealName, value, status, reason]) => (
                <span key={activityName + dealName}>
                  <Bot size={15} />
                  <strong>{activityName}</strong>
                  <small>{dealName} · {value} · {status} · {reason}</small>
                </span>
              ))}
            </div>
          </section>

          <section className="panel v3-manager" id="v3-reports">
            <div className="v3-panel-head tight">
              <p className="eyebrow">Manager Briefing</p>
              <span className="pill">Generated</span>
            </div>
            <p>North Shore is the biggest cash risk because follow-up is overdue. Evergreen needs a human response today. Westfield is an internal blockage, not a customer problem. Barker should stay parked until finance timing becomes relevant.</p>
            <div className="v3-report-grid">
              <span><strong>18%</strong><small>Human edit rate</small></span>
              <span><strong>74%</strong><small>Approval rate</small></span>
              <span><strong>31%</strong><small>Response rate</small></span>
            </div>
          </section>

          <section className="panel v3-settings" id="v3-settings">
            <div className="v3-panel-head tight">
              <p className="eyebrow">Implementation Admin</p>
              <span className="pill">MVP map</span>
            </div>
            <div className="v3-settings-table">
              {[
                ["CRM", "Pipedrive", "Connected"],
                ["Communication", "Gmail, VoIP, WhatsApp", "Partial"],
                ["Quoting", "Measure or custom workflow", "Planned"],
                ["Permissions", "Roles and approval rules", "Designing"],
              ].map(([layer, system, status]) => (
                <div key={layer}>
                  <strong>{layer}</strong>
                  <span>{system}</span>
                  <em>{status}</em>
                </div>
              ))}
            </div>
          </section>
        </div>
        ) : (
          <V3SelectedView
            view={view}
            selectedDeal={selectedDeal}
            setSelectedId={setSelectedId}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        )}
      </section>
    </section>
  );
}

function V3SelectedView({
  view,
  selectedDeal,
  setSelectedId,
  activeTab,
  setActiveTab,
}: {
  view: string;
  selectedDeal: (typeof v3Deals)[number];
  setSelectedId: React.Dispatch<React.SetStateAction<string>>;
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
}) {
  const queueDeals = React.useMemo(() => {
    if (view === "Human Required") return v3Deals.filter((deal) => deal.category === "Human Required" || deal.aiStatus.includes("human"));
    if (view === "Hot Deals") return v3Deals.filter((deal) => deal.intent >= 80 || deal.category === "Ready to Close");
    if (view === "Follow-Up") return v3Deals.filter((deal) => deal.due === "Today" || deal.due === "Overdue" || deal.category === "Ready to Close");
    if (view === "Quote Bottlenecks") return v3Deals.filter((deal) => deal.category === "Quote Bottleneck");
    if (view === "Long-Tail") return v3Deals.filter((deal) => deal.category === "Long-Tail");
    return v3Deals;
  }, [view]);

  if (view === "Deals") {
    return (
      <section className="v3-single-view">
        <V3DealDetailShell deal={selectedDeal} activeTab={activeTab} setActiveTab={setActiveTab} />
      </section>
    );
  }

  if (view === "AI Activity") {
    return (
      <section className="panel v3-single-view v3-view-panel">
        <div className="v3-panel-head"><div><p className="eyebrow">AI Activity</p><h3>Agent execution log</h3></div><span className="v2-live">Visible</span></div>
        <div className="v3-ai-list expanded">
          {v3AiActivity.map(([activityName, dealName, value, status, reason]) => (
            <span key={activityName + dealName}><Bot size={15} /><strong>{activityName}</strong><small>{dealName} · {value} · {status} · {reason}</small></span>
          ))}
        </div>
      </section>
    );
  }

  if (view === "Reports") {
    return (
      <section className="v3-single-view v3-report-page">
        {[
          ["Human edit rate", "18%", "Low", "AI drafts are generally close enough for approval."],
          ["Approval rate", "74%", "Good", "Good enough to keep testing controlled automation."],
          ["Response rate", "31%", "Watch", "Segment by channel before drawing big conclusions."],
        ].map(([label, count, value, detail]) => (
          <button className="v3-metric green" type="button" key={label}><span>{label}</span><strong>{value}</strong><small>{count} · {detail}</small></button>
        ))}
      </section>
    );
  }

  if (view === "Knowledge") {
    return (
      <section className="panel v3-single-view v3-view-panel">
        <div className="v3-panel-head">
          <div>
            <p className="eyebrow">Knowledge</p>
            <h3>Context asset builder</h3>
          </div>
          <button className="primary-button" type="button"><Sparkles size={15} /> Create knowledge page</button>
        </div>
        <div className="v3-knowledge-brief">
          <strong>DIWA should ask the right questions, then structure the answers.</strong>
          <p>Use this page for macro personas, micro personas, pain points, objections, product/service details, quote rules, tone guidance, sales scripts and scorecard frameworks.</p>
        </div>
        <div className="v3-asset-grid expanded">
          {["Personas", "Pain points", "Objections", "Product details", "Service details", "Quote rules", "Escalation logic", "Tone guidance", "Sales scripts", "Scorecard frameworks", "Discovery framework", "Closing framework"].map((asset) => <span key={asset}>{asset}</span>)}
        </div>
      </section>
    );
  }

  if (view === "Settings") {
    return (
      <section className="panel v3-single-view v3-view-panel">
        <div className="v3-panel-head"><div><p className="eyebrow">Settings</p><h3>Implementation admin</h3></div><span className="pill">MVP map</span></div>
        <div className="v3-settings-table">
          {[["CRM", "Pipedrive", "Connected"], ["Communication", "Gmail, VoIP, WhatsApp", "Partial"], ["Quoting", "Measure or custom workflow", "Planned"], ["Permissions", "Roles and approval rules", "Designing"]].map(([layer, system, status]) => (
            <div key={layer}><strong>{layer}</strong><span>{system}</span><em>{status}</em></div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="v3-single-view v3-queue-page">
      <div className="panel v3-view-panel">
        <div className="v3-panel-head">
          <div><p className="eyebrow">{view}</p><h3>{queueDeals.length} deals in this queue</h3></div>
          <span className="v2-live">{money(queueDeals.reduce((sum, deal) => sum + deal.value, 0))}</span>
        </div>
        <div className="v3-command-list expanded">
          {queueDeals.map((deal, index) => (
            <button type="button" onClick={() => setSelectedId(deal.id)} key={deal.id}>
              <span className="v3-rank">{index + 1}</span>
              <div><strong>{deal.name}</strong><small>{deal.customer} · {deal.owner} · {deal.lastMeaningful}</small></div>
              <span className={"v3-risk " + (deal.category === "Human Required" ? "high" : deal.category === "Quote Bottleneck" ? "medium" : "")}>{deal.category}</span>
              <strong>{money(deal.value)}</strong>
              <small>{deal.nextAction}</small>
            </button>
          ))}
        </div>
      </div>
      <V3DealDetailShell deal={selectedDeal} activeTab={activeTab} setActiveTab={setActiveTab} />
    </section>
  );
}

function V3DealDetailShell({ deal, activeTab, setActiveTab }: { deal: (typeof v3Deals)[number]; activeTab: string; setActiveTab: React.Dispatch<React.SetStateAction<string>> }) {
  return (
    <section className="panel v3-deal-detail">
      <div className="v3-panel-head">
        <div><p className="eyebrow">Deal Detail</p><h3>{deal.name}</h3></div>
        <span className="pill warn">{deal.aiStatus}</span>
      </div>
      <div className="v3-tabs" role="tablist" aria-label="Deal views">
        {dealTabs.map((tab) => <button className={activeTab === tab ? "active" : ""} type="button" onClick={() => setActiveTab(tab)} key={tab}>{tab}</button>)}
      </div>
      <V3DealTab activeTab={activeTab} deal={deal} />
    </section>
  );
}

function V3DealTab({ activeTab, deal }: { activeTab: string; deal: (typeof v3Deals)[number] }) {
  const [snapshotAgent, setSnapshotAgent] = React.useState("All");
  const [snapshotHuman, setSnapshotHuman] = React.useState("All");
  const [snapshotType, setSnapshotType] = React.useState("All");
  const [snapshotModal, setSnapshotModal] = React.useState<{ kind: "summary" | "scorecard" | "note"; snapshot: (typeof v3Snapshots)[number] } | null>(null);

  if (activeTab === "Snapshots") {
    const humans = ["All", ...Array.from(new Set(v3Snapshots.map((snapshot) => snapshot.owner)))];
    const snapshots = v3Snapshots.filter((snapshot) => {
      if (snapshotAgent !== "All" && snapshot.agent !== snapshotAgent) return false;
      if (snapshotHuman !== "All" && snapshot.owner !== snapshotHuman) return false;
      if (snapshotType !== "All" && snapshot.type !== snapshotType) return false;
      return true;
    });
    const copyMarkdown = async (markdown: string) => {
      await navigator.clipboard?.writeText(markdown);
    };

    return (
      <div className="v3-snapshots-panel">
        <div className="v3-snapshot-filter">
          <label>
            <span>Agent</span>
            <select value={snapshotAgent} onChange={(event) => setSnapshotAgent(event.target.value)}>
              {snapshotAgents.map((agent) => <option value={agent} key={agent}>{agent}</option>)}
            </select>
          </label>
          <label>
            <span>Human</span>
            <select value={snapshotHuman} onChange={(event) => setSnapshotHuman(event.target.value)}>
              {humans.map((human) => <option value={human} key={human}>{human}</option>)}
            </select>
          </label>
          <label>
            <span>Type</span>
            <select value={snapshotType} onChange={(event) => setSnapshotType(event.target.value)}>
              {snapshotTypes.map((type) => <option value={type} key={type}>{type}</option>)}
            </select>
          </label>
        </div>
        <div className="v3-snapshot-list">
          {snapshots.map((snapshot) => (
            <article key={snapshot.id}>
              <div className="v3-snapshot-main">
                <span className="v3-rank">{snapshot.agent}</span>
                <div>
                  <strong>{snapshot.event}<em>{snapshot.stage}</em><em>{snapshot.owner}</em><em>{snapshot.time}</em></strong>
                  <small>{snapshot.type}</small>
                </div>
                <span className="v3-heat"><b>{snapshot.heat}%</b><small>Heat</small></span>
                <span className="v4-due-cell"><b>{snapshot.due}</b><small>Due</small></span>
              </div>
              <p>{snapshot.summary}</p>
              <div className="v3-snapshot-actions">
                <button type="button" onClick={() => setSnapshotModal({ kind: "summary", snapshot })}>Summary</button>
                <button type="button" onClick={() => setSnapshotModal({ kind: "scorecard", snapshot })}>Scorecard {snapshot.scorecard.score}%</button>
                <button type="button" onClick={() => setSnapshotModal({ kind: "note", snapshot })}>View note</button>
              </div>
            </article>
          ))}
        </div>
        {snapshotModal && (
          <div className="v3-modal-backdrop" role="presentation" onClick={() => setSnapshotModal(null)}>
            <section className="v3-modal" role="dialog" aria-modal="true" aria-label="Snapshot detail" onClick={(event) => event.stopPropagation()}>
              <div className="v3-panel-head">
                <div>
                  <p className="eyebrow">{snapshotModal.snapshot.agent} · {snapshotModal.snapshot.event}</p>
                  <h3>{snapshotModal.kind === "summary" ? "Snapshot Summary" : snapshotModal.kind === "note" ? "Source Note" : snapshotModal.snapshot.scorecard.title}</h3>
                </div>
                <button type="button" onClick={() => setSnapshotModal(null)}>Close</button>
              </div>
              {snapshotModal.kind === "summary" ? (
                <>
                  <p>{snapshotModal.snapshot.summary}</p>
                  <pre>{snapshotModal.snapshot.markdown}</pre>
                  <button className="primary-button" type="button" onClick={() => copyMarkdown(snapshotModal.snapshot.markdown)}><Copy size={15} /> Copy markdown</button>
                </>
              ) : snapshotModal.kind === "note" ? (
                <>
                  <p>{snapshotModal.snapshot.note}</p>
                  <div className="v3-note-meta">
                    <span>From: {snapshotModal.snapshot.owner}</span>
                    <span>Type: {snapshotModal.snapshot.type}</span>
                    <span>Time: {snapshotModal.snapshot.time}</span>
                  </div>
                </>
              ) : (
                <div className="v3-scorecard-popup">
                  <strong>{snapshotModal.snapshot.scorecard.score}%</strong>
                  <p>{snapshotModal.snapshot.scorecard.finding}</p>
                  <p><b>Coaching:</b> {snapshotModal.snapshot.scorecard.coaching}</p>
                </div>
              )}
            </section>
          </div>
        )}
      </div>
    );
  }

  if (activeTab === "Timeline") {
    return (
      <div className="v3-timeline-list">
        {v3TimelineEvents.map((event) => (
          <article key={event.type + event.time}>
            <div><strong>{event.type}</strong><time>{event.time}</time></div>
            <small>{event.source} · {event.stage}</small>
            <p>{event.summary}</p>
            <div>{event.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
          </article>
        ))}
      </div>
    );
  }

  if (activeTab === "Quotes") {
    return (
      <div className="v3-quote-grid">
        {v3QuoteSnapshots.map((quote) => (
          <article key={quote.version}>
            <div><strong>{quote.version}</strong><span>{quote.status}</span></div>
            <h4>{money(quote.value)}</h4>
            <small>Created {quote.created} · Sent {quote.sent}</small>
            <p><b>Revision:</b> {quote.reason}</p>
            <p><b>Risk:</b> {quote.risk}</p>
          </article>
        ))}
      </div>
    );
  }

  if (activeTab === "Scorecards") {
    return (
      <div className="v3-scorecard-list">
        {v3Scorecards.map((card) => (
          <article key={card.type}>
            <div><strong>{card.type}</strong><span>{card.score}%</span></div>
            <small>{card.interaction} · {card.human} · {card.stage} · {card.sentiment}</small>
            <p>{card.finding}</p>
            <p><b>Next:</b> {card.next}</p>
            <p><b>Coaching:</b> {card.coaching}</p>
          </article>
        ))}
      </div>
    );
  }

  if (activeTab === "Actions") {
    return (
      <div className="v3-actions-panel">
        <article>
          <strong>Draft approval panel</strong>
          <small>Channel: Email · Recipient: {deal.customer} · Confidence: 91% · Approval required</small>
          <p>Hi {deal.customer.split(" ")[0]}, thanks again for your time. Based on what you raised, I have pulled together the key points around timing, scope and next steps so you have a clear summary for review.</p>
          <div><button type="button">Approve</button><button type="button">Edit</button><button type="button">Regenerate</button></div>
        </article>
        <article>
          <strong>Call script panel</strong>
          <small>{deal.customer} · {deal.stage} · {deal.preferredChannel}</small>
          <p><b>Objective:</b> {deal.nextAction}</p>
          <p><b>Quiet prompts:</b> Confirm decision-maker. Clarify timing. Do not discount yet. Secure the next commitment.</p>
        </article>
      </div>
    );
  }

  return (
    <div className="v3-detail-body">
      <div>
        <span>Current snapshot</span>
        <strong>{deal.id}</strong>
      </div>
      <p>{deal.snapshot}</p>
      <div className="v3-context-grid">
        <span><strong>{money(deal.value)}</strong><small>Deal value</small></span>
        <span><strong>{deal.stage}</strong><small>Stage</small></span>
        <span><strong>{deal.owner}</strong><small>Owner</small></span>
        <span><strong>{deal.due}</strong><small>Due</small></span>
      </div>
      <div className="v3-score-grid">
        <span><strong>{deal.intent}%</strong><small>Intent</small></span>
        <span><strong>{deal.sentiment}%</strong><small>Sentiment</small></span>
        <span><strong>{deal.urgency}%</strong><small>Urgency</small></span>
        <span><strong>{deal.closeLikelihood}%</strong><small>Close</small></span>
      </div>
      <article className="v3-persona-card">
        <strong>Recommended next action</strong>
        <p>{deal.nextAction}</p>
        <strong>Persona</strong>
        <p>{deal.persona}</p>
        <div>{deal.objections.map((item) => <span key={item}>{item}</span>)}</div>
      </article>
    </div>
  );
}

function Metric({ icon: Icon, label, value, detail, tone }: { icon: typeof Gauge; label: string; value: string; detail: string; tone: string }) {
  return (
    <div className={`metric-card ${tone}`}>
      <Icon size={20} />
      <span>{label}</span>
      <strong>{value}</strong>
      <p>{detail}</p>
    </div>
  );
}

function CockpitV2() {
  return (
    <section className="cockpit-v2" aria-label="DIWA cockpit v2">
      <div className="v2-status-grid">
        {cockpitHealth.map((item) => (
          <div className={`v2-stat ${item.tone}`} key={item.label}>
            <span>{item.label}</span>
            <strong>{item.value}</strong>
            <small>{item.detail}</small>
          </div>
        ))}
      </div>

      <div className="v2-layout">
        <section className="panel v2-panel v2-queue">
          <div className="v2-panel-head">
            <div>
              <p className="eyebrow">Command Queue</p>
              <h3>What needs attention now</h3>
            </div>
            <span className="v2-live">Live context</span>
          </div>
          <div className="v2-table">
            <div className="v2-row v2-row-head">
              <span>#</span><span>Customer</span><span>State</span><span>Value</span><span>Owner</span><span>Next action</span>
            </div>
            {cockpitQueue.map((deal) => (
              <div className="v2-row" key={deal.rank}>
                <span className="v2-rank">{deal.rank}</span>
                <span><strong>{deal.customer}</strong><small>{deal.org}</small></span>
                <span><em className={`risk-dot ${deal.risk.toLowerCase()}`} />{deal.state}<small>{deal.age}</small></span>
                <span>{deal.value}</span>
                <span>{deal.owner}</span>
                <span>{deal.next}</span>
              </div>
            ))}
          </div>
        </section>

        <aside className="v2-side-stack">
          <section className="panel v2-panel">
            <div className="v2-panel-head tight">
              <p className="eyebrow">Exceptions</p>
              <span className="pill warn">Human Required</span>
            </div>
            <div className="v2-exception">
              <strong>Pricing judgement before send</strong>
              <span>Stack Construction has live coordination risk. DIWA should hold automation until one commercial owner is clear.</span>
            </div>
            <div className="v2-exception muted">
              <strong>Quote assumptions incomplete</strong>
              <span>Surface system / shock-pad details need source confidence before handoff.</span>
            </div>
          </section>

          <section className="panel v2-panel">
            <div className="v2-panel-head tight">
              <p className="eyebrow">Source Health</p>
              <span className="v2-live">4/4</span>
            </div>
            <div className="v2-source-bars">
              {sources.map((source) => (
                <div className="v2-source" key={source.name}>
                  <span>{source.name}</span>
                  <strong>{source.health}</strong>
                </div>
              ))}
            </div>
          </section>
        </aside>

        <section className="panel v2-panel v2-stage-panel">
          <div className="v2-panel-head">
            <div>
              <p className="eyebrow">Pipeline State</p>
              <h3>Stage pressure map</h3>
            </div>
          </div>
          <div className="stage-grid">
            {stageSignals.map((stage) => (
              <div className={`stage-tile ${stage.alert}`} key={stage.stage}>
                <span>{stage.stage}</span>
                <strong>{stage.count}</strong>
                <small>{stage.value}</small>
              </div>
            ))}
          </div>
        </section>

        <section className="panel v2-panel">
          <div className="v2-panel-head">
            <div>
              <p className="eyebrow">Agent Work</p>
              <h3>Autonomy lanes</h3>
            </div>
          </div>
          <div className="lane-list">
            <div><span>Safe to act</span><strong>31</strong><small>Follow-ups, summaries, routing</small></div>
            <div><span>Needs approval</span><strong>7</strong><small>Customer sends / CRM writes</small></div>
            <div><span>Blocked</span><strong>3</strong><small>Missing source confidence</small></div>
          </div>
        </section>

        <section className="panel v2-panel">
          <div className="v2-panel-head">
            <div>
              <p className="eyebrow">Context Stream</p>
              <h3>Latest changes</h3>
            </div>
          </div>
          <div className="v2-feed">
            {activity.map((item) => (
              <div key={item.label}>
                <time>{item.time}</time>
                <strong>{item.label}</strong>
                <span>{item.detail}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </section>
  );
}

function DealRow({ deal }: { deal: Deal }) {
  return (
    <article className="deal-row">
      <div className="deal-main">
        <div>
          <h4>{deal.name}</h4>
          <span>{deal.customer} · {deal.stage}</span>
        </div>
        <strong>{deal.value}</strong>
      </div>
      <div className="deal-meta">
        <span className="intent"><span style={{ width: `${deal.intent}%` }} />Intent {deal.intent}</span>
        <span className={`pill ${deal.risk.toLowerCase()}`}>{deal.risk} risk</span>
        <span>{deal.owner}</span>
      </div>
      <p>{deal.next}</p>
      <small>{deal.source}</small>
    </article>
  );
}

createRoot(document.getElementById("root")!).render(<App />);
