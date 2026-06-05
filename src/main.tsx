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

const assetPath = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\/+/, "")}`;

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

const richScorecards = [
  {
    id: "SC-23621",
    title: "Elite Sales Architect",
    event: "Site Visit (Plaud)",
    human: "Myles",
    agent: "Agent B",
    stage: "Prepare Quote",
    score: 90,
    confidence: "high",
    summary: "Elite site assessment with strong technical authority, transparent quoting and clear close control. The only meaningful gap is deeper emotional pain discovery early in the visit.",
    weaknesses: ["Personal/lifestyle impact was not explored deeply enough before the technical solution was presented."],
    nextImprovement: "Ask one stronger opening discovery question: why is fixing this area a priority now, and what changes for the household if it is solved?",
    dealIntelligence: {
      intent: "High. Customer wants the work done quickly and is actively comparing professional options.",
      sentiment: "Positive and engaged. Customer accepted the logic of artificial turf and liked the transparent quote.",
      urgency: "Strong. Customer said they were trying to get it done fast and responded well to the 7-day discount window.",
      objections: "Comparison quotes, durability questions, product choice and installation timing.",
      missingInfo: "Wife's final preference and whether the operations gap is still available.",
      nextAction: "Send the quote with the improved discount position, confirm the install gap, and follow up after the wife reviews the samples.",
      humanRequired: "Yes. Human follow-up should confirm timing and protect the close while intent is warm.",
    },
    why: "Myles combined technical authority, transparent live quoting, strong sample framing and a clear follow-up path.",
    coaching: "Masterclass site assessment. To reach 100, push deeper on emotional pain early: why fixing this area matters now.",
    criteria: [
      ["Trust Rapport Opening", "10/10", "00:00:00 Myles: 'Good morning. Nice to meet you. New build, new purchase?' Immediate professional greeting and project-context identification established authority early."],
      ["Emotional Pain Discovery", "10/20", "00:00:29 Myles identified the functional pain: weeds, lack of sun and natural lawn failure. He did not push as deeply into personal frustration or lifestyle impact."],
      ["Solution Positioning Sample Framing", "15/15", "00:07:21 Myles gave excellent guidance on sample evaluation: outdoors, natural light, grain direction, label upright and sand infill context."],
      ["Measurement Live Quote Transparency", "15/15", "Speaker 1 showed the quote, GST, line items, interactive product swaps and the full total clearly."],
      ["Product Swap Navigation Education", "10/10", "00:05:08 Myles explained polyethylene versus nylon, price differences and how the customer can change products in the quote."],
      ["Offer Seed Planting", "10/10", "Speaker 1 used a genuine schedule gap to frame a 7-day acceptance incentive and lift the discount from 15% to 20%."],
      ["Objection Handling Reassurance", "10/10", "00:09:12 Myles handled comparison quotes by framing professional turf companies versus gardeners or builders."],
      ["Handover To Human Closer", "5/5", "Speaker 1 named follow-up from himself or Rachel and set a near-term follow-up window."],
      ["Closing Discipline", "5/5", "00:11:47 Myles confirmed decision structure and contact details before leaving."],
    ],
    strengths: ["Expert sample framing", "Transparent pricing", "Strategic urgency", "Clear handover to Rachel"],
    improvements: ["Ask more open-ended questions about personal frustration and desired lifestyle outcome."],
    eventNote: "00:00:00 Myles: Good morning. Nice to meet you. New build, new purchase?\n\n00:00:29 Myles: An area like this is never going to thrive as a natural lawn. It is always going to turn back into weed, given how little sunlight it will get.\n\n00:03:09 Myles: Our guys are professional installers, so we have to charge their hourly rate. Can I show you some samples?\n\n00:05:08 Myles: This one is made of polyethylene. Whereas this one is made of nylon. The nylon is extremely robust, very durable, very strong.\n\n00:07:21 Myles: Always look at the samples outdoors in natural light. Blade pointing towards you with the label upright.\n\n00:09:12 Myles: If you are getting another quote, make sure you are getting it from another professional turf company, not a gardener or a builder.\n\n00:11:13 Myles: It is usually four to six weeks, but I think we have a gap opened up in about two weeks. Are you trying to get something done quickly?\n\n00:11:47 Myles: Is there anybody else involved in the decision?\n\nSpeaker 1: The quote is transparent, includes GST, and if accepted within seven days we can bump the discount to twenty percent.",
  },
  {
    id: "SC-1048",
    title: "Strong Closer",
    event: "Outbound phone call",
    human: "Rachel",
    agent: "Agent C",
    stage: "Quote Sent",
    score: 91,
    confidence: "high",
    summary: "Strong closing call with clear blocker identification and good margin discipline. The follow-up should be turned into a board-ready summary immediately.",
    weaknesses: ["Decision call was not fully locked before ending the interaction."],
    nextImprovement: "Book the decision call before sending the board pack so the written summary has a clear commercial landing point.",
    dealIntelligence: {
      intent: "High. Customer is engaged and close if board concerns are answered.",
      sentiment: "Very positive, but dependent on confidence and documentation.",
      urgency: "Today. The follow-up window is active and should not drift.",
      objections: "Safety compliance, installation timing, board approval.",
      missingInfo: "Exact board approval process and final sign-off date.",
      nextAction: "Send board-ready response, then book a decision call.",
      humanRequired: "Yes. Human judgement needed on safety wording and close timing.",
    },
    why: "Rachel identified the real blocker: board-ready safety and timing language, not price.",
    coaching: "Excellent close-control. Next step is to send the board-ready summary and secure a decision call.",
    criteria: [
      ["Intent Confirmation", "18/20", "Customer remained engaged and positive."],
      ["Objection Clarity", "20/20", "Safety, timing and board approval were clearly isolated."],
      ["Next Step Control", "17/20", "Follow-up path was strong but decision call should be locked immediately."],
      ["Commercial Discipline", "20/20", "No premature discounting."],
    ],
    strengths: ["Found the real blocker", "Protected margin", "Kept next action focused"],
    improvements: ["Book the decision call before sending the written pack."],
    eventNote: "Call summary: Helen liked the quote and needed board-safe wording around compliance and timing. The call should convert into a concise board pack plus booked decision follow-up.",
  },
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

function getScoreTone(score: number | string) {
  const value = String(score);
  const [rawEarned, rawPossible] = value.split("/");
  const earned = Number(rawEarned);
  const possible = rawPossible ? Number(rawPossible) : 100;
  const numeric = typeof score === "number" ? score : possible > 0 ? (earned / possible) * 100 : earned;
  if (Number.isNaN(numeric)) return "unknown";
  if (numeric >= 85) return "green";
  if (numeric >= 50) return "yellow";
  if (numeric >= 25) return "orange";
  return "red";
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
  if (text.includes("call") || text.includes("phone")) return "Call";
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
  const isPrototypeOne = window.location.pathname.startsWith("/prototype-one") || window.location.pathname.startsWith("/p1");
  const isV1 = window.location.pathname.startsWith("/v1");
  const isV4 = window.location.pathname.startsWith("/v4");
  const isEcolawn = window.location.pathname.startsWith("/ecolawn");
  const isV3 = isEcolawn || window.location.pathname.startsWith("/v3");
  const isV2 = !isV1 && !isV3 && !isV4;
  const useV4Experience = isV3 || isV4;
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

  if (isPrototypeOne) {
    return <PrototypeOneApp />;
  }

  return (
    <main className={`shell ${sidebarCollapsed ? "sidebar-collapsed" : ""}`}>
      <aside className="sidebar">
        <div className="brand-block">
          <div className="brand-logo-wrap">
            <img className="brand-logo" src={assetPath("/brand/ecolawn-logo-official.png")} alt="Eco Lawn" />
            <img className="brand-icon" src={assetPath("/brand/ecolawn-mark.jpg")} alt="Eco Lawn" />
          </div>
          <span className="brand-pill">ECO LAWN</span>
        </div>

        <nav className="nav-list" aria-label="DIWA navigation">
          <a className="nav-item active" href="#cockpit" title="Cockpit"><Gauge size={17} /> <span>Cockpit</span></a>
          <a className="nav-item" href="#deals" title="Deals"><BriefcaseBusiness size={17} /> <span>Deals</span></a>
          <a className="nav-item" href="#activities" title="Activities"><ClipboardList size={17} /> <span>Activities</span></a>
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

      <section className={`content ${isV2 || isV3 || isV4 ? "content-v2" : ""} ${isV3 || isV4 ? "content-v3" : ""} ${useV4Experience ? "content-v4" : ""}`}>
        <header className={`topbar ${isV2 || isV3 || isV4 ? "topbar-v2" : ""}`}>
          <div>
            {useV4Experience ? (
              <>
                <p className="eyebrow">Eco Lawn DIWA Cockpit</p>
                <h1>{isEcolawn ? "Sales pipeline stages drive the workspace." : "Pipeline stages drive the workspace."}</h1>
              </>
            ) : isV3 ? (
              <>
                <p className="eyebrow">Eco Lawn DIWA Cockpit</p>
                <h1>Sales command centre.</h1>
              </>
            ) : isV2 ? (
              <>
                <p className="eyebrow">DIWA Cockpit v2</p>
                <h1>Context is operational intelligence.</h1>
              </>
            ) : (
              <>
                <p className="eyebrow">Deals Workspace Application</p>
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
              <img src={assetPath("/brand/customer-avatar.jpg")} alt="" />
            </button>
            {askOpen && <AskDiwaPanel />}
            {profileOpen && <ProfileMenu />}
          </div>
        </header>

        <div className="workspace" id="cockpit">
          {useV4Experience ? (
            <CockpitV4 summaryTrial={isV3} />
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

function CockpitV4({ summaryTrial = false }: { summaryTrial?: boolean }) {
  const [workspaceColumns, setWorkspaceColumns] = React.useState([0.92, 1, 0.72]);
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
  const startResize = (divider: 0 | 1, startEvent: React.PointerEvent<HTMLButtonElement>) => {
    startEvent.preventDefault();
    const startX = startEvent.clientX;
    const startColumns = [...workspaceColumns];
    const total = startColumns[divider] + startColumns[divider + 1];

    const move = (event: PointerEvent) => {
      const delta = (event.clientX - startX) / 420;
      const nextLeft = Math.max(0.58, Math.min(total - 0.58, startColumns[divider] + delta));
      const next = [...startColumns];
      next[divider] = nextLeft;
      next[divider + 1] = total - nextLeft;
      setWorkspaceColumns(next);
    };

    const stop = () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", stop);
    };

    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", stop);
  };

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

      <div
        className="v4-workspace"
        style={{ gridTemplateColumns: `minmax(300px, ${workspaceColumns[0]}fr) 10px minmax(360px, ${workspaceColumns[1]}fr) 10px minmax(300px, ${workspaceColumns[2]}fr)` }}
      >
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
          <div className="v3-command-list expanded v4-command-list">
            {queueDeals.map((deal, index) => (
              <button className={deal.id === selectedDeal.id ? "selected" : ""} type="button" onClick={() => setSelectedId(deal.id)} key={deal.id}>
                <span className="v3-rank">{index + 1}</span>
                <div className="v4-queue-deal">
                  <strong>{deal.id} · {deal.customer}</strong>
                  <small>
                    <span>{deal.company !== "Residential" ? deal.company : deal.name}</span>
                    <span>Owner: {deal.owner}</span>
                  </small>
                  <em>{getQueueSummary(deal.nextAction)}</em>
                </div>
                <strong>{money(deal.value)}</strong>
                <HeatScore deal={deal} />
                <span className="v4-due-cell"><b>{deal.due}</b><small>{getDueBucketLabel(deal)}</small></span>
              </button>
            ))}
          </div>
        </section>

        <button className="v4-resize-handle" type="button" aria-label="Resize Command Queue and Deal Detail" onPointerDown={(event) => startResize(0, event)} />

        <V3DealDetailShell deal={selectedDeal} activeTab={activeTab} setActiveTab={setActiveTab} summaryTrial={summaryTrial} />

        <button className="v4-resize-handle" type="button" aria-label="Resize Deal Detail and Next Best Action" onPointerDown={(event) => startResize(1, event)} />

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
  const [composerText, setComposerText] = React.useState(channelCopy[recommendedChannel]);
  const [sendState, setSendState] = React.useState("Ready to send. Open tracking is always on.");
  const [scheduleOpen, setScheduleOpen] = React.useState(false);
  const [diwaAdjustOpen, setDiwaAdjustOpen] = React.useState(false);
  const [diwaInstruction, setDiwaInstruction] = React.useState("");
  const [fromPersona, setFromPersona] = React.useState(deal.owner);
  const [signatureEnabled, setSignatureEnabled] = React.useState(true);
  const [callWindowOpen, setCallWindowOpen] = React.useState(false);
  const isCallChannel = activeChannel === "Call";

  React.useEffect(() => {
    setActiveChannel(recommendedChannel);
    setComposerText(channelCopy[recommendedChannel]);
    setFromPersona(deal.owner);
    setSendState("Ready to send. Open tracking is always on.");
    setScheduleOpen(false);
    setDiwaAdjustOpen(false);
    setDiwaInstruction("");
    setCallWindowOpen(false);
  }, [deal.id, recommendedChannel]);

  React.useEffect(() => {
    setComposerText(channelCopy[activeChannel]);
    setSendState(activeChannel === "Call" ? "Ready to call. Script and DIWA coaching are available." : `Ready to send via ${activeChannel}. Open tracking is always on.`);
    setScheduleOpen(false);
    setCallWindowOpen(false);
  }, [activeChannel]);

  const personas = [deal.owner, "Gareth", "Rachel", "Miles", "Kent", "ZECZI Agent"]
    .filter((persona, index, list) => persona && list.indexOf(persona) === index);

  const applyDiwaAdjustment = () => {
    const instruction = diwaInstruction.trim() || (isCallChannel ? "Sharpen the call structure and coaching prompts." : "Tighten tone and make the next step clearer.");
    setComposerText(`${composerText}\n\n[DIWA adjustment staged: ${instruction}]`);
    setSendState("Draft adjusted. New context will be attached to the next deal snapshot.");
    setDiwaAdjustOpen(false);
    setDiwaInstruction("");
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
        <pre>{composerText}</pre>

        {isCallChannel ? (
          <div className="v4-call-actions">
            <button
              className="primary-button"
              type="button"
              onClick={() => setSendState(`Quick call staged to ${deal.phone}. Dialpad handoff will log the actual caller.`)}
            >
              <PhoneCall size={15} /> Quick call
            </button>
            <button type="button" onClick={() => setCallWindowOpen(true)}>
              <PanelLeftOpen size={15} /> Open call window
            </button>
          </div>
        ) : (
          <>
            <div className="v4-composer-options" aria-label="Composer options">
              <label>
                <span>Send as</span>
                <select value={fromPersona} onChange={(event) => setFromPersona(event.target.value)}>
                  {personas.map((persona) => <option key={persona}>{persona}</option>)}
                </select>
              </label>
              <label className="v4-toggle-line">
                <input type="checkbox" checked readOnly />
                <span>Open tracking always on</span>
              </label>
              <label className="v4-toggle-line">
                <input type="checkbox" checked={signatureEnabled} onChange={(event) => setSignatureEnabled(event.target.checked)} />
                <span>Signature</span>
              </label>
            </div>

            <div className="v4-send-row">
              <button
                className="primary-button"
                type="button"
                onClick={() => {
                  setSendState(`${activeChannel} ready to send as ${fromPersona}. Activity will log the real sender.`);
                  setScheduleOpen(false);
                }}
              >
                <Send size={15} /> Send
              </button>
              <button
                className="v4-schedule-button"
                type="button"
                aria-label="Open send options"
                onClick={() => setScheduleOpen((open) => !open)}
              >
                <Clock3 size={15} />
              </button>
              {scheduleOpen && (
                <div className="v4-send-menu">
                  <button
                    type="button"
                    onClick={() => {
                      setSendState(`${activeChannel} scheduled as ${fromPersona}. Activity will log the real sender.`);
                      setScheduleOpen(false);
                    }}
                  >
                    Schedule send
                  </button>
                </div>
              )}
            </div>
          </>
        )}
        <button className="v4-diwa-adjust" type="button" onClick={() => setDiwaAdjustOpen(true)}>
          <Sparkles size={15} /> DIWA input
        </button>
        <span>{sendState}</span>
        <small className="v4-send-note">
          {isCallChannel
            ? "Dialpad call activity should log the actual caller and attach call notes, recording, transcript and coaching signals back to the deal."
            : "Pipedrive activity is logged after send with the actual operator, even when the message is sent from another Eco Lawn persona."}
        </small>
      </div>

      {callWindowOpen && (
        <div className="v3-modal-backdrop" role="dialog" aria-modal="true" aria-label="DIWA call window">
          <div className="v3-modal v4-call-modal">
            <div className="v3-panel-head">
              <div>
                <p className="eyebrow">Call Window</p>
                <h3>{deal.customer}</h3>
              </div>
              <button type="button" onClick={() => setCallWindowOpen(false)}>Close</button>
            </div>
            <div className="v4-call-window-grid">
              <article>
                <span>Recommended call script</span>
                <pre>{composerText}</pre>
                <button
                  className="primary-button"
                  type="button"
                  onClick={() => setSendState(`Dialpad call staged for ${deal.phone}. Live coaching ready.`)}
                >
                  <PhoneCall size={15} /> Call {deal.phone}
                </button>
              </article>
              <article>
                <span>Live coaching</span>
                <ul>
                  <li>Confirm safety and timing first.</li>
                  <li>Clarify the real blocker before offering options.</li>
                  <li>Capture board-pack requirements as snapshot context.</li>
                </ul>
                <button type="button" onClick={() => setDiwaAdjustOpen(true)}>
                  <Sparkles size={15} /> DIWA input
                </button>
              </article>
            </div>
          </div>
        </div>
      )}

      {diwaAdjustOpen && (
        <div className="v3-modal-backdrop" role="dialog" aria-modal="true" aria-label="DIWA message input">
          <div className="v3-modal v4-diwa-modal">
            <div className="v3-panel-head">
              <div>
                <p className="eyebrow">DIWA Message Input</p>
                <h3>{isCallChannel ? "Adjust this call" : "Adjust this action"}</h3>
              </div>
              <button type="button" onClick={() => setDiwaAdjustOpen(false)}>Close</button>
            </div>
            <div className="v4-diwa-modal-grid">
              <div>
                <span>Current draft</span>
                <pre>{composerText}</pre>
              </div>
              <label>
                <span>Voice or typed instruction</span>
                <textarea
                  value={diwaInstruction}
                  onChange={(event) => setDiwaInstruction(event.target.value)}
                  placeholder={isCallChannel ? "Example: focus the call on safety certification first, then ask what the board needs before Friday." : "Example: make this warmer, mention install timing, and ask for board approval by Friday."}
                />
              </label>
            </div>
            <div className="v4-modal-actions">
              <button type="button" onClick={() => setDiwaAdjustOpen(false)}>Cancel</button>
              <button className="primary-button" type="button" onClick={applyDiwaAdjustment}>
                <Sparkles size={15} /> Generate new version
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

function V4SidePanel({ view }: { view: string }) {
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

function V3DealDetailShell({ deal, activeTab, setActiveTab, summaryTrial = false }: { deal: (typeof v3Deals)[number]; activeTab: string; setActiveTab: React.Dispatch<React.SetStateAction<string>>; summaryTrial?: boolean }) {
  return (
    <section className="panel v3-deal-detail">
      <div className="v3-panel-head">
        <div><p className="eyebrow">Deal Detail</p><h3>{deal.name}</h3></div>
        <span className="pill warn">{deal.aiStatus}</span>
      </div>
      <div className="v3-tabs" role="tablist" aria-label="Deal views">
        {dealTabs.map((tab) => <button className={activeTab === tab ? "active" : ""} type="button" onClick={() => setActiveTab(tab)} key={tab}>{tab}</button>)}
      </div>
      <V3DealTab activeTab={activeTab} deal={deal} summaryTrial={summaryTrial} />
    </section>
  );
}

function V3DealTab({ activeTab, deal, summaryTrial = false }: { activeTab: string; deal: (typeof v3Deals)[number]; summaryTrial?: boolean }) {
  const [snapshotAgent, setSnapshotAgent] = React.useState("All");
  const [snapshotHuman, setSnapshotHuman] = React.useState("All");
  const [snapshotType, setSnapshotType] = React.useState("All");
  const [snapshotModal, setSnapshotModal] = React.useState<{ kind: "summary" | "note"; snapshot: (typeof v3Snapshots)[number] } | null>(null);
  const [scorecardModal, setScorecardModal] = React.useState<(typeof richScorecards)[number] | null>(null);
  const [eventNoteOpen, setEventNoteOpen] = React.useState(false);
  const copyScorecardMarkdown = async (card: (typeof richScorecards)[number]) => {
    const markdown = [
      "# Meeting Scorecard - " + card.id + " - " + card.title,
      "",
      "**Score:** " + card.score + "/100",
      "**Event:** " + card.event,
      "**Human:** " + card.human,
      "**Agent:** " + card.agent,
      "**Stage:** " + card.stage,
      "**Confidence:** " + card.confidence,
      "",
      "## Summary",
      card.summary ?? card.why,
      "",
      "## Criteria",
      ...(card.criteria ?? []).map(([criterion, score, evidence]) => "- **" + criterion + " (" + score + ")** " + evidence),
      "",
      "## Strengths",
      ...(card.strengths ?? []).map((item) => "- " + item),
      "",
      "## Improvements",
      ...(card.improvements ?? []).map((item) => "- " + item),
      "",
      "## Coaching Summary",
      card.coaching,
      "",
      "## Event Note",
      card.eventNote,
    ].join("\n");
    await navigator.clipboard?.writeText(markdown);
  };
  const shareScorecard = async (card: (typeof richScorecards)[number]) => {
    const shareText = `${card.title} scorecard: ${card.score}/100 · ${card.event} · ${card.human}`;
    if (navigator.share) {
      await navigator.share({ title: `DIWA Scorecard - ${card.title}`, text: shareText });
      return;
    }
    await navigator.clipboard?.writeText(shareText);
  };
  const openSnapshotScorecard = (snapshot: (typeof v3Snapshots)[number]) => {
    const matchingCard =
      richScorecards.find((card) => card.agent === snapshot.agent && card.human === snapshot.owner) ??
      richScorecards.find((card) => card.agent === snapshot.agent) ??
      richScorecards[0];
    setSnapshotModal(null);
    setScorecardModal(matchingCard);
    setEventNoteOpen(true);
  };
  const getScorecardOccurredAt = (card: (typeof richScorecards)[number]) =>
    v3Snapshots.find((snapshot) => snapshot.agent === card.agent && snapshot.owner === card.human)?.time ??
    card.event;
  const summarySite = [
    ["Surface", "Existing play area needing compliant synthetic turf system."],
    ["Ground", "Assessment complete; scope needs board-safe wording before final send."],
    ["Drainage", "Shock-pad and playground safety details need to be clearly documented."],
    ["Access", "Childcare site access and install timing must be confirmed before commitment."],
    ["Hazards", "Compliance language and board approval are the main execution risks."],
    ["Complexity", "Medium"],
  ];
  const summaryCustomer = [
    ["Use case", deal.product],
    ["Decision maker", deal.decisionMaker],
    ["Timeline", deal.expectedTiming],
    ["Budget", deal.budgetSignal],
    ["Sentiment", "Positive, but depends on confidence, safety evidence and board-ready wording."],
  ];
  const buyingSignals = ["Quote viewed twice", "Timing pressure confirmed", "Compliance questions raised", "Install window discussed", "Board pack needed"];
  const summaryObjectionDetails = [
    ["Safety compliance", "high", "Board needs written confidence around certification and playground suitability."],
    ["Install timing", "high", "Customer wants completion before school holidays; availability must be confirmed."],
    ["Board approval", "medium", "Helen is engaged, but final approval needs a clean internal summary."],
  ];
  const summaryComms = [
    ["Today, 9:14 am", "Phone", "Rachel call captured compliance and timing blocker.", "View call note"],
    ["Today, 9:22 am", "AI draft", "Board-ready response drafted but held for human review.", "View AI note"],
    ["Yesterday, 4:18 pm", "Quote", "Revision added safety/timing assumptions.", "View quote note"],
  ];

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
                <span className={`v3-heat ${getScoreTone(snapshot.heat)}`}><b>{snapshot.heat}%</b><small>Heat</small></span>
                <span className="v4-due-cell"><b>{snapshot.due}</b><small>Due</small></span>
              </div>
              <p>{snapshot.summary}</p>
              <div className="v3-snapshot-actions">
                <button type="button" onClick={() => setSnapshotModal({ kind: "summary", snapshot })}>Summary</button>
                <button type="button" onClick={() => openSnapshotScorecard(snapshot)}>Open scorecard {snapshot.scorecard.score}%</button>
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
                  <h3>{snapshotModal.kind === "summary" ? "Snapshot Summary" : "Source Note"}</h3>
                </div>
                <button type="button" onClick={() => setSnapshotModal(null)}>Close</button>
              </div>
              {snapshotModal.kind === "summary" ? (
                <>
                  <p>{snapshotModal.snapshot.summary}</p>
                  <pre>{snapshotModal.snapshot.markdown}</pre>
                  <button className="primary-button" type="button" onClick={() => copyMarkdown(snapshotModal.snapshot.markdown)}><Copy size={15} /> Copy markdown</button>
                </>
              ) : (
                <>
                  <p>{snapshotModal.snapshot.note}</p>
                  <div className="v3-note-meta">
                    <span>From: {snapshotModal.snapshot.owner}</span>
                    <span>Type: {snapshotModal.snapshot.type}</span>
                    <span>Time: {snapshotModal.snapshot.time}</span>
                  </div>
                </>
              )}
            </section>
          </div>
        )}
        {scorecardModal && (
          <div className="v3-modal-backdrop" role="presentation" onClick={() => setScorecardModal(null)}>
            <section className="v3-modal v3-scorecard-modal" role="dialog" aria-modal="true" aria-label="Full scorecard" onClick={(event) => event.stopPropagation()}>
              <div className="v3-panel-head">
                <div>
                  <p className="eyebrow">Meeting Scorecard · {scorecardModal.agent} · {getScorecardOccurredAt(scorecardModal)}</p>
                  <h3>{deal.id} · {deal.customer} · {deal.company}</h3>
                </div>
                <div className="v3-scorecard-tools">
                  <button type="button" onClick={() => copyScorecardMarkdown(scorecardModal)}><Copy size={15} /> Copy markdown</button>
                  <button type="button" onClick={() => window.print()}><FileText size={15} /> Print</button>
                  <button type="button" onClick={() => shareScorecard(scorecardModal)}><ArrowUpRight size={15} /> Share</button>
                  <button type="button" onClick={() => setScorecardModal(null)}>Close</button>
                </div>
              </div>
              <div className="v3-scorecard-review">
                <section className={`v3-scorecard-hero ${getScoreTone(scorecardModal.score)}`}>
                  <div className="v3-overall-score">
                    <span>Overall</span>
                    <strong><b>{scorecardModal.score ?? "N/A"}</b><small>/100</small></strong>
                    <em>Score</em>
                  </div>
                  <div>
                    <span>Status</span>
                    <h4>{scorecardModal.title ?? "Scorecard unavailable"}</h4>
                    <p>{scorecardModal.summary ?? scorecardModal.why ?? "No scorecard summary is available yet."}</p>
                  </div>
                  <div className="v3-scorecard-meta">
                    <span>Occurred: {getScorecardOccurredAt(scorecardModal)}</span>
                    <span>Human: {scorecardModal.human ?? "Unknown"}</span>
                    <span>Stage: {scorecardModal.stage ?? "Unknown"}</span>
                    <span>Confidence: {scorecardModal.confidence ?? "Unknown"}</span>
                  </div>
                </section>
                <section className="v3-scorecard-summary-grid" aria-label="Scorecard summary">
                  <article><strong>Key strengths</strong>{(scorecardModal.strengths?.length ? scorecardModal.strengths : ["No strengths captured yet."]).map((item) => <span key={item}>{item}</span>)}</article>
                  <article><strong>Key weaknesses</strong>{(scorecardModal.weaknesses?.length ? scorecardModal.weaknesses : scorecardModal.improvements ?? ["No weaknesses captured yet."]).map((item) => <span key={item}>{item}</span>)}</article>
                  <article><strong>Recommended next improvement</strong><p>{(scorecardModal as { nextImprovement?: string }).nextImprovement ?? scorecardModal.coaching ?? "No recommendation captured yet."}</p></article>
                </section>
                <section className="v3-scorecard-section">
                  <div className="v3-scorecard-section-head">
                    <p className="eyebrow">Detailed Score Breakdown</p>
                    <h4>Criteria, scoring and evidence</h4>
                  </div>
                  <div className="v3-criteria-table expanded">
                    {scorecardModal.criteria?.length ? scorecardModal.criteria.map(([criterion, score, evidence]) => (
                      <div key={criterion}>
                        <strong>{criterion}</strong>
                        <span className={`v3-score-pill ${getScoreTone(score)}`}>{score}</span>
                        <p>{evidence || "No evidence captured for this criterion."}</p>
                      </div>
                    )) : (
                      <div><strong>No criteria yet</strong><span>N/A</span><p>This scorecard has no detailed criteria payload.</p></div>
                    )}
                  </div>
                </section>
                <section className="v3-scorecard-section">
                  <div className="v3-scorecard-section-head">
                    <p className="eyebrow">Sales Coaching</p>
                    <h4>What to repeat and what to improve</h4>
                  </div>
                  <div className="v3-scorecard-columns">
                    <article><strong>Did well</strong>{(scorecardModal.strengths?.length ? scorecardModal.strengths : ["No positive coaching captured yet."]).map((item) => <span key={item}>{item}</span>)}</article>
                    <article><strong>Missed / next time</strong>{(scorecardModal.improvements?.length ? scorecardModal.improvements : ["No improvement notes captured yet."]).map((item) => <span key={item}>{item}</span>)}</article>
                  </div>
                  <article className="v3-scorecard-coaching"><strong>Coaching Summary</strong><p>{scorecardModal.coaching ?? "No coaching summary captured yet."}</p></article>
                </section>
                <section className="v3-scorecard-section">
                  <div className="v3-scorecard-section-head">
                    <p className="eyebrow">Deals</p>
                    <h4>Signals and recommended action</h4>
                  </div>
                  <div className="v3-deal-intel-grid">
                    {Object.entries((scorecardModal as { dealIntelligence?: Record<string, string> }).dealIntelligence ?? {
                      intent: "No buyer intent signal captured.",
                      sentiment: "No sentiment signal captured.",
                      urgency: "No urgency signal captured.",
                      objections: "No objections captured.",
                      missingInfo: "No missing information captured.",
                      nextAction: "No recommended next action captured.",
                      humanRequired: "Unknown.",
                    }).map(([label, value]) => (
                      <article key={label}>
                        <span>{label.replace(/([A-Z])/g, " $1")}</span>
                        <p>{value}</p>
                      </article>
                    ))}
                  </div>
                </section>
                <section className="v3-scorecard-section">
                  <div className="v3-scorecard-section-head">
                    <p className="eyebrow">Event Note</p>
                    <h4>Transcript and source context</h4>
                  </div>
                  <div className="v3-event-note-actions">
                    <button type="button" onClick={() => setEventNoteOpen((open) => !open)}>{eventNoteOpen ? "Hide event note" : "View event note"}</button>
                    <button type="button" onClick={() => setEventNoteOpen(true)}><PhoneCall size={15} /> Listen if available</button>
                  </div>
                  {eventNoteOpen && (
                    <pre className="v3-scorecard-event-note">{scorecardModal.eventNote || "No event note or transcript has been attached to this scorecard yet."}</pre>
                  )}
                </section>
              </div>
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
      <div className="v3-scorecard-list rich">
        {richScorecards.map((card) => (
          <article className="v3-scorecard-row" key={card.id}>
            <div className="v3-scorecard-row-main">
              <span className="v3-rank">{card.agent}</span>
              <div>
                <strong>{card.event}<em>{card.human}</em><em>{card.stage}</em><em>confidence {card.confidence}</em></strong>
                <small>{card.id} · {card.title}</small>
              </div>
              <span className={`v3-score-badge ${getScoreTone(card.score)}`}><b>{card.score}</b><small>/100</small></span>
            </div>
            <p><b>Why this scorecard:</b> {card.why}</p>
            <p><b>Coaching:</b> {card.coaching}</p>
            <div className="v3-snapshot-actions">
              <button type="button" onClick={() => { setScorecardModal(card); setEventNoteOpen(false); }}>Open scorecard</button>
            </div>
          </article>
        ))}
        {scorecardModal && (
          <div className="v3-modal-backdrop" role="presentation" onClick={() => setScorecardModal(null)}>
            <section className="v3-modal v3-scorecard-modal" role="dialog" aria-modal="true" aria-label="Full scorecard" onClick={(event) => event.stopPropagation()}>
              <div className="v3-panel-head">
                <div>
                  <p className="eyebrow">Meeting Scorecard · {scorecardModal.agent} · {getScorecardOccurredAt(scorecardModal)}</p>
                  <h3>{deal.id} · {deal.customer} · {deal.company}</h3>
                </div>
                <div className="v3-scorecard-tools">
                  <button type="button" onClick={() => copyScorecardMarkdown(scorecardModal)}><Copy size={15} /> Copy markdown</button>
                  <button type="button" onClick={() => window.print()}><FileText size={15} /> Print</button>
                  <button type="button" onClick={() => shareScorecard(scorecardModal)}><ArrowUpRight size={15} /> Share</button>
                  <button type="button" onClick={() => setScorecardModal(null)}>Close</button>
                </div>
              </div>
              <div className="v3-scorecard-review">
                <section className={`v3-scorecard-hero ${getScoreTone(scorecardModal.score)}`}>
                  <div className="v3-overall-score">
                    <span>Overall</span>
                    <strong><b>{scorecardModal.score ?? "N/A"}</b><small>/100</small></strong>
                    <em>Score</em>
                  </div>
                  <div>
                    <span>Status</span>
                    <h4>{scorecardModal.title ?? "Scorecard unavailable"}</h4>
                    <p>{scorecardModal.summary ?? scorecardModal.why ?? "No scorecard summary is available yet."}</p>
                  </div>
                  <div className="v3-scorecard-meta">
                    <span>Occurred: {getScorecardOccurredAt(scorecardModal)}</span>
                    <span>Human: {scorecardModal.human ?? "Unknown"}</span>
                    <span>Stage: {scorecardModal.stage ?? "Unknown"}</span>
                    <span>Confidence: {scorecardModal.confidence ?? "Unknown"}</span>
                  </div>
                </section>

                <section className="v3-scorecard-summary-grid" aria-label="Scorecard summary">
                  <article>
                    <strong>Key strengths</strong>
                    {(scorecardModal.strengths?.length ? scorecardModal.strengths : ["No strengths captured yet."]).map((item) => <span key={item}>{item}</span>)}
                  </article>
                  <article>
                    <strong>Key weaknesses</strong>
                    {(scorecardModal.weaknesses?.length ? scorecardModal.weaknesses : scorecardModal.improvements ?? ["No weaknesses captured yet."]).map((item) => <span key={item}>{item}</span>)}
                  </article>
                  <article>
                    <strong>Recommended next improvement</strong>
                    <p>{(scorecardModal as { nextImprovement?: string }).nextImprovement ?? scorecardModal.coaching ?? "No recommendation captured yet."}</p>
                  </article>
                </section>

                <section className="v3-scorecard-section">
                  <div className="v3-scorecard-section-head">
                    <p className="eyebrow">Detailed Score Breakdown</p>
                    <h4>Criteria, scoring and evidence</h4>
                  </div>
                  <div className="v3-criteria-table expanded">
                    {scorecardModal.criteria?.length ? scorecardModal.criteria.map(([criterion, score, evidence]) => (
                      <div key={criterion}>
                        <strong>{criterion}</strong>
                        <span className={`v3-score-pill ${getScoreTone(score)}`}>{score}</span>
                        <p>{evidence || "No evidence captured for this criterion."}</p>
                      </div>
                    )) : (
                      <div><strong>No criteria yet</strong><span>N/A</span><p>This scorecard has no detailed criteria payload.</p></div>
                    )}
                  </div>
                </section>

                <section className="v3-scorecard-section">
                  <div className="v3-scorecard-section-head">
                    <p className="eyebrow">Sales Coaching</p>
                    <h4>What to repeat and what to improve</h4>
                  </div>
                  <div className="v3-scorecard-columns">
                    <article><strong>Did well</strong>{(scorecardModal.strengths?.length ? scorecardModal.strengths : ["No positive coaching captured yet."]).map((item) => <span key={item}>{item}</span>)}</article>
                    <article><strong>Missed / next time</strong>{(scorecardModal.improvements?.length ? scorecardModal.improvements : ["No improvement notes captured yet."]).map((item) => <span key={item}>{item}</span>)}</article>
                  </div>
                  <article className="v3-scorecard-coaching"><strong>Coaching Summary</strong><p>{scorecardModal.coaching ?? "No coaching summary captured yet."}</p></article>
                </section>

                <section className="v3-scorecard-section">
                  <div className="v3-scorecard-section-head">
                    <p className="eyebrow">Deals</p>
                    <h4>Signals and recommended action</h4>
                  </div>
                  <div className="v3-deal-intel-grid">
                    {Object.entries((scorecardModal as { dealIntelligence?: Record<string, string> }).dealIntelligence ?? {
                      intent: "No buyer intent signal captured.",
                      sentiment: "No sentiment signal captured.",
                      urgency: "No urgency signal captured.",
                      objections: "No objections captured.",
                      missingInfo: "No missing information captured.",
                      nextAction: "No recommended next action captured.",
                      humanRequired: "Unknown.",
                    }).map(([label, value]) => (
                      <article key={label}>
                        <span>{label.replace(/([A-Z])/g, " $1")}</span>
                        <p>{value}</p>
                      </article>
                    ))}
                  </div>
                </section>

                <section className="v3-scorecard-section">
                  <div className="v3-scorecard-section-head">
                    <p className="eyebrow">Event Note</p>
                    <h4>Transcript and source context</h4>
                  </div>
                  <div className="v3-event-note-actions">
                    <button type="button" onClick={() => setEventNoteOpen((open) => !open)}>{eventNoteOpen ? "Hide event note" : "View event note"}</button>
                    <button type="button" onClick={() => setEventNoteOpen(true)}><PhoneCall size={15} /> Listen if available</button>
                  </div>
                  {eventNoteOpen && (
                    <pre className="v3-scorecard-event-note">{scorecardModal.eventNote || "No event note or transcript has been attached to this scorecard yet."}</pre>
                  )}
                </section>
              </div>
            </section>
          </div>
        )}
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
    <div className={`v3-detail-body rich-summary ${summaryTrial ? "summary-trial-v3" : ""}`}>
      <section className="v3-summary-hero">
        <div>
          <p className="eyebrow">Current Snapshot · {deal.id}</p>
          <h3>{deal.name}</h3>
          <p>{deal.snapshot}</p>
        </div>
        <aside>
          <span>{deal.stage}</span>
          <strong>{deal.priority}/100</strong>
          <small>Priority · updated {deal.lastMeaningful}</small>
        </aside>
      </section>

      <div className="v3-score-grid">
        <span><strong>{deal.intent}%</strong><small>Intent</small></span>
        <span><strong>{deal.sentiment}%</strong><small>Sentiment</small></span>
        <span><strong>{deal.urgency}%</strong><small>Urgency</small></span>
        <span><strong>{deal.closeLikelihood}%</strong><small>Close</small></span>
      </div>

      <section className="v3-human-review">
        <strong>Human review required</strong>
        <ul>
          <li>Safety/compliance wording needs human approval before customer send.</li>
          <li>Installation timing before school holidays must be confirmed before over-promising.</li>
          <li>Board approval means the next response needs to be clear enough to forward internally.</li>
        </ul>
      </section>

      <section className="v3-summary-persona-grid">
        <article>
          <span>MacroPersona</span>
          <strong>Commercial</strong>
          <p>Institutional buyer balancing safety, timing, board confidence and operational disruption.</p>
        </article>
        <article>
          <span>MicroPersona</span>
          <strong>Early Childcare Centre</strong>
          <p>Helen needs a tidy written pack she can trust and pass to the board without rework.</p>
        </article>
      </section>

      <section className="v3-summary-section">
        <div className="v3-scorecard-section-head">
          <p className="eyebrow">Deal Heat</p>
          <h4>{deal.category}</h4>
        </div>
        <p>{deal.why}</p>
        <div className="v3-context-grid">
          <span><strong>{money(deal.value)}</strong><small>Deal value</small></span>
          <span><strong>{deal.owner}</strong><small>Owner</small></span>
          <span><strong>{deal.due}</strong><small>Due</small></span>
          <span><strong>Views 2</strong><small>Quote engagement</small></span>
        </div>
      </section>

      <section className="v3-summary-two-col">
        <article>
          <div className="v3-scorecard-section-head"><p className="eyebrow">Site</p><h4>Physical and install context</h4></div>
          {summarySite.map(([label, value]) => <p key={label}><b>{label}</b><span>{value}</span></p>)}
        </article>
        <article>
          <div className="v3-scorecard-section-head"><p className="eyebrow">Customer</p><h4>Decision context</h4></div>
          {summaryCustomer.map(([label, value]) => <p key={label}><b>{label}</b><span>{value}</span></p>)}
          <div className="v3-buying-signals">
            <b>Buying signals</b>
            <div>{buyingSignals.map((signal) => <span key={signal}>{signal}</span>)}</div>
          </div>
        </article>
      </section>

      <section className="v3-summary-section">
        <div className="v3-scorecard-section-head">
          <p className="eyebrow">Revised Scope</p>
          <h4>{deal.product}</h4>
        </div>
        <p>Prepare a board-ready playground turf and shock-pad proposal covering safety compliance, install timing, quote revision detail and acceptance path. The output should be clean enough for Helen to forward internally.</p>
      </section>

      <section className="v3-summary-section">
        <div className="v3-scorecard-section-head">
          <p className="eyebrow">Objections and Hesitations</p>
          <h4>What could slow the close</h4>
        </div>
        <div className="v3-objection-grid">
          {summaryObjectionDetails.map(([label, severity, detail]) => (
            <article key={label}>
              <strong>{label}<em>{severity}</em></strong>
              <p>{detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="v3-summary-section">
        <div className="v3-scorecard-section-head">
          <p className="eyebrow">Quote Snapshot</p>
          <h4>{deal.quote}</h4>
        </div>
        <div className="v3-quote-snapshot-grid">
          <span><strong>{money(deal.quoteValue)}</strong><small>Total value</small></span>
          <span><strong>{deal.quoteStatus}</strong><small>Status</small></span>
          <span><strong>2</strong><small>Views</small></span>
          <span><strong>Board pack</strong><small>Required format</small></span>
        </div>
        <div className="v3-quote-detail-list">
          <p><b>Current quote state</b><span>Revision requested. The next send should be board-ready rather than a loose follow-up.</span></p>
          <p><b>Commercial hook</b><span>Safety compliance, install timing and clear acceptance path matter more than discounting.</span></p>
          <p><b>Risk</b><span>If timing or certification language is vague, the board approval loop will drag.</span></p>
          <p><b>Confidence note</b><span>High source confidence from recent call, quote views and clear customer timing pressure.</span></p>
        </div>
      </section>

      <section className="v3-summary-section">
        <div className="v3-scorecard-section-head">
          <p className="eyebrow">Recent Communication History</p>
          <h4>Latest meaningful artefacts</h4>
        </div>
        <div className="v3-summary-comms">
          {summaryComms.map(([date, type, detail, noteLabel]) => (
            <p key={date + type}>
              <b>{date}</b>
              <span>{type}</span>
              <em>{detail}</em>
              {summaryTrial && <button type="button">{noteLabel}</button>}
            </p>
          ))}
        </div>
      </section>
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

type PrototypeDeal = {
  id: string;
  title: string;
  contact: string;
  organisation: string;
  stage: string;
  value: number;
  owner: string;
  due: string;
  heat: number;
  staleRisk: "Low" | "Medium" | "High";
  closeLikelihood: number;
  nextAction: string;
  missingContext: string[];
  evidence: string[];
};

const prototypeDeals: PrototypeDeal[] = [
  { id: "P1-D-001", title: "Evergreen Childcare Play Area", contact: "Helen Marsh", organisation: "Evergreen Childcare", stage: "Quote Sent", value: 42800, owner: "Rachel", due: "Today", heat: 91, staleRisk: "High", closeLikelihood: 84, nextAction: "Call Helen, confirm safety wording, then send board-ready summary.", missingContext: ["Board approval date", "Final install window"], evidence: ["Call summary", "Quote Q-2048 v2", "Site assessment notes"] },
  { id: "P1-D-002", title: "Westfield Pool Surround", contact: "James Patel", organisation: "Westfield Homes", stage: "Prepare Quote", value: 36500, owner: "Myles", due: "Tomorrow", heat: 74, staleRisk: "Medium", closeLikelihood: 69, nextAction: "Complete drainage and product notes before quote production.", missingContext: ["Drainage note", "Preferred turf product"], evidence: ["Site visit", "Measure notes", "Customer SMS"] },
  { id: "P1-D-003", title: "North Shore Sports Facility", contact: "Mike Rawiri", organisation: "North Shore Sports Trust", stage: "Closing", value: 118500, owner: "Gareth", due: "Overdue", heat: 88, staleRisk: "High", closeLikelihood: 78, nextAction: "Approve follow-up draft and book a committee decision call.", missingContext: ["Committee meeting date"], evidence: ["Quote viewed three times", "Referral source", "Funding approved in principle"] },
  { id: "P1-D-004", title: "Barker Residence Backyard Upgrade", contact: "Anna Barker", organisation: "Residential", stage: "AI Follow-Up", value: 17600, owner: "DIWA", due: "14 Jun", heat: 62, staleRisk: "Low", closeLikelihood: 61, nextAction: "Hold until finance timing, then send soft WhatsApp check-in.", missingContext: ["Finance confirmation"], evidence: ["DND date", "Quote viewed once", "WhatsApp preference"] },
];

const prototypeContacts = [
  { name: "Helen Marsh", organisation: "Evergreen Childcare", channel: "Phone then email", context: "Needs board-safe compliance and timing evidence." },
  { name: "James Patel", organisation: "Westfield Homes", channel: "SMS", context: "Visual buyer, price sensitive on extras." },
  { name: "Mike Rawiri", organisation: "North Shore Sports Trust", channel: "Email", context: "Needs documentation and a clear meeting path." },
  { name: "Anna Barker", organisation: "Residential", channel: "WhatsApp", context: "Finance dependent; avoid noisy chasing." },
];

const prototypeOrganisations = [
  { name: "Evergreen Childcare", type: "Childcare operator", health: "Human Required", note: "Board approval depends on safety and install timing." },
  { name: "Westfield Homes", type: "Residential", health: "Quote Blocked", note: "Internal quote context is incomplete." },
  { name: "North Shore Sports Trust", type: "Sports facility", health: "Closing Risk", note: "High-value quote follow-up is overdue." },
  { name: "Residential", type: "Homeowners", health: "Long Tail", note: "Park until finance timing is active." },
];

const prototypeActivities = [
  { label: "Call Helen Marsh", owner: "Rachel", due: "Today", state: "Overdue", ai: "Use board-pack frame; do not discount." },
  { label: "Complete drainage notes", owner: "Myles", due: "Tomorrow", state: "Open", ai: "Quote cannot move until source context is complete." },
  { label: "Approve follow-up draft", owner: "Gareth", due: "Today", state: "Open", ai: "Book decision call before urgency cools." },
  { label: "Finance timing check-in", owner: "DIWA", due: "14 Jun", state: "Scheduled", ai: "Soft WhatsApp only after DND date." },
];

const prototypeComms = [
  { channel: "Call", deal: "Evergreen Childcare Play Area", status: "Live-coaching placeholder", detail: "Call notes, objection prompts, and post-call summary will live here." },
  { channel: "Email", deal: "North Shore Sports Facility", status: "Draft locked", detail: "External sends disabled in Prototype One." },
  { channel: "WhatsApp", deal: "Barker Residence Backyard Upgrade", status: "Scheduled placeholder", detail: "Future approval queue for low-risk follow-ups." },
];

const prototypeStages = ["New Lead", "Awaiting Info", "Prepare Quote", "Quote Sent", "AI Follow-Up", "Closing"];

function PrototypeOneApp() {
  const [selectedDealId, setSelectedDealId] = React.useState(prototypeDeals[0].id);
  const selectedDeal = prototypeDeals.find((deal) => deal.id === selectedDealId) ?? prototypeDeals[0];
  const totalValue = prototypeDeals.reduce((sum, deal) => sum + deal.value, 0);

  return (
    <main className="p1-shell">
      <aside className="p1-sidebar">
        <div>
          <p className="eyebrow">Prototype One</p>
          <h1>Eco Lawn CRM</h1>
          <span>Off-production mock workspace</span>
        </div>
        <nav aria-label="Prototype One navigation">
          {[
            ["Dashboard", Gauge],
            ["Deals", BriefcaseBusiness],
            ["Contacts", UserRoundCheck],
            ["Organisations", Layers3],
            ["Activities", ClipboardList],
            ["Communications", Mail],
            ["Intelligence", Brain],
            ["Settings", PlugZap],
          ].map(([label, Icon]) => {
            const NavIcon = Icon as typeof Gauge;
            return (
              <a href={"#p1-" + String(label).toLowerCase()} key={String(label)}>
                <NavIcon size={16} />
                <span>{String(label)}</span>
              </a>
            );
          })}
        </nav>
        <div className="p1-boundary">
          <strong>Boundary</strong>
          <span>Mock data only. No Pipedrive writes. No customer sends. No deployment action.</span>
        </div>
      </aside>

      <section className="p1-content">
        <header className="p1-topbar" id="p1-dashboard">
          <div>
            <p className="eyebrow">The Art of Context</p>
            <h2>Native CRM cockpit for Eco Lawn sales execution.</h2>
          </div>
          <button type="button"><Sparkles size={16} /> Ask DIWA</button>
        </header>

        <section className="p1-metrics" aria-label="Prototype One metrics">
          <Metric icon={BriefcaseBusiness} label="Open mock pipeline" value={money(totalValue)} detail={prototypeDeals.length + " Eco Lawn-shaped deals"} tone="gold" />
          <Metric icon={AlertTriangle} label="Human required" value="2" detail="Commercial judgement before action" tone="red" />
          <Metric icon={ClipboardList} label="Activities" value="4" detail="Due, scheduled, and blocked work" tone="orange" />
          <Metric icon={Brain} label="Intelligence" value="Mock" detail="Heat, stale risk, evidence, next action" tone="green" />
        </section>

        <section className="p1-grid" id="p1-deals">
          <div className="panel p1-panel p1-kanban">
            <div className="section-head">
              <div>
                <p className="eyebrow">Deals</p>
                <h3>Stage board</h3>
              </div>
              <span className="pill">Kanban prototype</span>
            </div>
            <div className="p1-stage-board">
              {prototypeStages.map((stage) => (
                <div className="p1-stage" key={stage}>
                  <strong>{stage}</strong>
                  {prototypeDeals.filter((deal) => deal.stage === stage).map((deal) => (
                    <button className={deal.id === selectedDeal.id ? "active" : ""} type="button" onClick={() => setSelectedDealId(deal.id)} key={deal.id}>
                      <span>{deal.title}</span>
                      <small>{deal.contact} · {money(deal.value)}</small>
                      <em>{deal.heat}% heat</em>
                    </button>
                  ))}
                </div>
              ))}
            </div>
          </div>

          <aside className="panel p1-panel p1-detail">
            <div className="section-head compact">
              <div>
                <p className="eyebrow">Deal Detail</p>
                <h3>{selectedDeal.title}</h3>
              </div>
              <span className={"pill " + selectedDeal.staleRisk.toLowerCase()}>{selectedDeal.staleRisk} risk</span>
            </div>
            <dl>
              <div><dt>Contact</dt><dd>{selectedDeal.contact}</dd></div>
              <div><dt>Organisation</dt><dd>{selectedDeal.organisation}</dd></div>
              <div><dt>Owner</dt><dd>{selectedDeal.owner}</dd></div>
              <div><dt>Close likelihood</dt><dd>{selectedDeal.closeLikelihood}%</dd></div>
            </dl>
            <section>
              <h4>Next best action</h4>
              <p>{selectedDeal.nextAction}</p>
            </section>
            <section>
              <h4>Missing context</h4>
              <div className="p1-chip-row">{selectedDeal.missingContext.map((item) => <span key={item}>{item}</span>)}</div>
            </section>
            <section>
              <h4>Evidence</h4>
              <div className="p1-chip-row evidence">{selectedDeal.evidence.map((item) => <span key={item}>{item}</span>)}</div>
            </section>
          </aside>
        </section>

        <section className="p1-grid thirds">
          <PrototypeList title="Contacts" id="p1-contacts" rows={prototypeContacts.map((contact) => [contact.name, contact.organisation, contact.channel + " · " + contact.context])} />
          <PrototypeList title="Organisations" id="p1-organisations" rows={prototypeOrganisations.map((org) => [org.name, org.type, org.health + " · " + org.note])} />
          <PrototypeList title="Activities" id="p1-activities" rows={prototypeActivities.map((item) => [item.label, item.owner + " · " + item.due + " · " + item.state, item.ai])} />
        </section>

        <section className="p1-grid">
          <div className="panel p1-panel" id="p1-communications">
            <div className="section-head compact">
              <div>
                <p className="eyebrow">Communications</p>
                <h3>Draft and ledger placeholders</h3>
              </div>
              <span className="pill warn">Sends disabled</span>
            </div>
            <div className="p1-table">
              {prototypeComms.map((item) => (
                <div key={item.channel + item.deal}>
                  <strong>{item.channel}</strong>
                  <span>{item.deal}</span>
                  <small>{item.status} · {item.detail}</small>
                </div>
              ))}
            </div>
          </div>
          <div className="panel p1-panel" id="p1-intelligence">
            <div className="section-head compact">
              <div>
                <p className="eyebrow">Intelligence</p>
                <h3>Decision support model</h3>
              </div>
            </div>
            <div className="p1-intel">
              <span><Gauge size={16} /> Deal heat ranks work by urgency, intent, stale risk, and value.</span>
              <span><AlertTriangle size={16} /> Human Required is an exception state for unclear commercial judgement.</span>
              <span><FileText size={16} /> Every recommendation needs evidence and source provenance.</span>
              <span><PhoneCall size={16} /> Field/mobile capture will add quick note, call, photo, and document placeholders.</span>
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}

function PrototypeList({ title, id, rows }: { title: string; id: string; rows: string[][] }) {
  return (
    <div className="panel p1-panel" id={id}>
      <div className="section-head compact">
        <div>
          <p className="eyebrow">CRM</p>
          <h3>{title}</h3>
        </div>
      </div>
      <div className="p1-table">
        {rows.map(([primary, secondary, detail]) => (
          <div key={primary}>
            <strong>{primary}</strong>
            <span>{secondary}</span>
            <small>{detail}</small>
          </div>
        ))}
      </div>
    </div>
  );
}

createRoot(document.getElementById("root")!).render(<App />);
