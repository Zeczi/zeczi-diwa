import React from "react";
import {
  BarChart3,
  Bot,
  BriefcaseBusiness,
  CircleDollarSign,
  FileText,
  Filter,
  Inbox,
  Layers3,
  Link2,
  Mail,
  Package,
  Search,
  Send,
  Sparkles,
  UserRoundCheck,
} from "lucide-react";

const reportCards = [
  { title: "Quote Sent value by owner", value: "$412k", detail: "Rachel leads close-ready quote value with $164k open.", tone: "green" },
  { title: "Stale deals by stage", value: "112", detail: "Long-tail and Awaiting Info account for 74% of stale value.", tone: "orange" },
  { title: "Activities completed this week", value: "287", detail: "Calls 41, emails 156, notes 90. Completion rate is 82%.", tone: "blue" },
  { title: "Pipeline value by stage", value: "$3.62m", detail: "AI Long-Tail carries $1.67m and needs strict reactivation rules.", tone: "green" },
  { title: "Hottest 50 deals by heat score", value: "$781k", detail: "Median heat 84. Top blockers are board approval and quote timing.", tone: "red" },
  { title: "Custom field completeness", value: "68%", detail: "Missing product, timing, and decision-maker fields reduce AI confidence.", tone: "orange" },
];

const reportSuggestions = [
  "Quote Sent value by owner",
  "stale deals by stage",
  "activities completed this week",
  "pipeline value by stage",
  "hottest 50 deals by heat score",
  "custom field completeness",
];

const moduleTargets: Record<string, string> = {
  Reports: "reports",
  "Sales Inbox": "sales-inbox",
  Products: "products",
};

const reportOutputs: Record<string, { title: string; summary: string; rows: string[][] }> = {
  quote: {
    title: "Quote Sent value by owner",
    summary: "Rachel and Gareth carry the highest active quote value. Rachel has the most time-sensitive follow-up exposure.",
    rows: [["Rachel", "$164k", "7 quotes"], ["Gareth", "$141k", "4 quotes"], ["Myles", "$62k", "3 quotes"], ["Sean", "$45k", "5 quotes"]],
  },
  stale: {
    title: "Stale deals by stage",
    summary: "Stale value clusters in AI Long-Tail and Awaiting Info. Human Required stale deals should be treated as exceptions.",
    rows: [["AI Long-Tail", "61", "$1.12m"], ["Awaiting Info", "28", "$244k"], ["Quote Sent", "9", "$138k"], ["Human Required", "4", "$74k"]],
  },
  activities: {
    title: "Activities completed this week",
    summary: "Email work is healthy, but call completion is still below the close-control target for Quote Sent deals.",
    rows: [["Emails", "156", "74% AI assisted"], ["Calls", "41", "18 connected"], ["Notes", "90", "31 from assessments"], ["Tasks closed", "287", "82% completion"]],
  },
  pipeline: {
    title: "Pipeline value by stage",
    summary: "Pipeline value is broad, but the action focus should stay on Quote Sent, Prepare Quote, and Human Required.",
    rows: [["AI Long-Tail", "$1.67m", "101 deals"], ["AI Follow-Up", "$697k", "68 deals"], ["Awaiting Info", "$378k", "81 deals"], ["Quote Sent", "$200k", "17 deals"]],
  },
  hottest: {
    title: "Hottest 50 deals by heat score",
    summary: "The hottest deal set is worth $781k. The top commercial risk is delayed human response after quote view events.",
    rows: [["Evergreen Childcare", "94 heat", "$42.8k"], ["North Shore Sports", "88 heat", "$118.5k"], ["Westfield Pool", "81 heat", "$36.5k"], ["Barker Residence", "73 heat", "$17.6k"]],
  },
  fields: {
    title: "Custom field completeness",
    summary: "Completeness is strong for owner and stage, weaker for product category, timing, and decision-maker fields.",
    rows: [["Owner", "98%", "Healthy"], ["Product category", "72%", "Needs cleanup"], ["Decision maker", "61%", "Weak"], ["Expected timing", "55%", "Weak"]],
  },
};

const inboxMessages = [
  {
    id: "M-2048",
    from: "Helen Marsh",
    subject: "Board pack wording for playground quote",
    preview: "Can you send the safety certification and timing notes in a format I can forward to the board?",
    deal: "Evergreen Childcare Play Area",
    contact: "Helen Marsh",
    status: "Linked",
    owner: "Rachel",
    urgency: "High",
    channel: "Email",
    summary: "Positive buyer intent. Needs board-safe wording around safety, timing, and revised quote details.",
  },
  {
    id: "M-2035",
    from: "Mike Rawiri",
    subject: "Committee meeting next week",
    preview: "We are comparing one other option. Can you confirm install timing and maintenance assumptions?",
    deal: "North Shore Sports Facility",
    contact: "Mike Rawiri",
    status: "Linked",
    owner: "Gareth",
    urgency: "High",
    channel: "Email",
    summary: "High-value quote viewed multiple times. Needs a decision call and concise timing answer.",
  },
  {
    id: "M-1017",
    from: "James Patel",
    subject: "Pool surround drainage question",
    preview: "Before the quote comes through, can you confirm what happens around drainage near the coping?",
    deal: "Westfield Pool Surround",
    contact: "James Patel",
    status: "Linked",
    owner: "Myles",
    urgency: "Medium",
    channel: "Email",
    summary: "Quote is blocked by missing internal notes. Customer question should feed directly into quote readiness.",
  },
  {
    id: "M-0891",
    from: "RFQ Intake",
    subject: "New website enquiry: putting green",
    preview: "Customer asked for putting green pricing and install timing in Sandringham.",
    deal: "Unlinked inbound",
    contact: "New contact",
    status: "Unlinked",
    owner: "Kent",
    urgency: "Medium",
    channel: "RFQ",
    summary: "Likely new deal. DIWA should match by email/phone first, then create a link-to-deal suggestion.",
  },
];

const products = [
  { name: "Natural 35 Lawn Turf", category: "Residential turf", price: "$79 / m2", status: "Active", detail: "Default natural-look lawn option for premium residential installs." },
  { name: "Nylon Pro Putting Green", category: "Putting green", price: "$112 / m2", status: "Active", detail: "Durable putting surface with premium fringe pairing." },
  { name: "Playground Shock Pad System", category: "Playground", price: "$146 / m2", status: "Active", detail: "Compliance-led option for childcare, school, and public play areas." },
  { name: "Multi-Sport Turf System", category: "Commercial sport", price: "$128 / m2", status: "Active", detail: "Committee and facility buyer option with maintenance assumptions." },
  { name: "Budget Landscape Turf", category: "Residential turf", price: "$59 / m2", status: "Draft", detail: "Draft product for price-sensitive comparisons. Needs margin review." },
];

function getReportOutput(prompt: string) {
  const text = prompt.toLowerCase();
  if (text.includes("stale")) return reportOutputs.stale;
  if (text.includes("activit")) return reportOutputs.activities;
  if (text.includes("pipeline") || text.includes("stage")) return reportOutputs.pipeline;
  if (text.includes("hot") || text.includes("heat")) return reportOutputs.hottest;
  if (text.includes("field") || text.includes("complete")) return reportOutputs.fields;
  return reportOutputs.quote;
}

export function ReportsInboxProducts() {
  const [activeModule, setActiveModule] = React.useState("Reports");
  const [reportPrompt, setReportPrompt] = React.useState("Quote Sent value by owner");
  const [reportResult, setReportResult] = React.useState(getReportOutput("Quote Sent value by owner"));
  const [inboxQuery, setInboxQuery] = React.useState("");
  const [inboxFilter, setInboxFilter] = React.useState("All");
  const [selectedMessageId, setSelectedMessageId] = React.useState(inboxMessages[0].id);
  const [productQuery, setProductQuery] = React.useState("");
  const [productFilter, setProductFilter] = React.useState("All");
  const [selectedProductName, setSelectedProductName] = React.useState(products[0].name);

  const visibleMessages = inboxMessages.filter((message) => {
    const matchesQuery = `${message.from} ${message.subject} ${message.deal} ${message.preview}`.toLowerCase().includes(inboxQuery.toLowerCase());
    const matchesFilter = inboxFilter === "All" || message.urgency === inboxFilter || message.status === inboxFilter || message.channel === inboxFilter;
    return matchesQuery && matchesFilter;
  });
  const selectedMessage = visibleMessages.find((message) => message.id === selectedMessageId) ?? visibleMessages[0] ?? inboxMessages[0];

  const visibleProducts = products.filter((product) => {
    const matchesQuery = `${product.name} ${product.category} ${product.detail}`.toLowerCase().includes(productQuery.toLowerCase());
    const matchesFilter = productFilter === "All" || product.category === productFilter || product.status === productFilter;
    return matchesQuery && matchesFilter;
  });
  const selectedProduct = visibleProducts.find((product) => product.name === selectedProductName) ?? visibleProducts[0] ?? products[0];

  const runReport = () => {
    setReportResult(getReportOutput(reportPrompt));
  };

  const selectModule = (label: string) => {
    setActiveModule(label);
    document.getElementById(moduleTargets[label])?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="crm-modules" aria-label="DIWA CRM modules">
      <div className="crm-module-tabs" aria-label="CRM module shortcuts">
        {[
          ["Reports", FileText],
          ["Sales Inbox", Inbox],
          ["Products", Package],
        ].map(([label, Icon]) => (
          <button className={activeModule === label ? "active" : ""} type="button" onClick={() => selectModule(String(label))} key={String(label)}>
            <Icon size={16} /> {String(label)}
          </button>
        ))}
      </div>

      <section className="panel crm-panel" id="reports">
        <div className="v3-panel-head">
          <div>
            <p className="eyebrow">Reports</p>
            <h3>Commercial reporting workspace</h3>
          </div>
          <span className="v2-live">Mock builder</span>
        </div>
        <div className="report-card-grid">
          {reportCards.map((card) => (
            <button className={`report-card ${card.tone}`} type="button" onClick={() => { setReportPrompt(card.title); setReportResult(getReportOutput(card.title)); }} key={card.title}>
              <BarChart3 size={17} />
              <span>{card.title}</span>
              <strong>{card.value}</strong>
              <small>{card.detail}</small>
            </button>
          ))}
        </div>
        <div className="report-builder">
          <div className="report-builder-input">
            <Sparkles size={17} />
            <input value={reportPrompt} onChange={(event) => setReportPrompt(event.target.value)} aria-label="Conversational report input" />
            <button className="primary-button" type="button" onClick={runReport}><Send size={15} /> Run</button>
          </div>
          <div className="report-suggestion-row">
            {reportSuggestions.map((suggestion) => (
              <button type="button" onClick={() => { setReportPrompt(suggestion); setReportResult(getReportOutput(suggestion)); }} key={suggestion}>
                {suggestion}
              </button>
            ))}
          </div>
          <div className="report-output">
            <div>
              <p className="eyebrow">Mock Output</p>
              <h4>{reportResult.title}</h4>
              <p>{reportResult.summary}</p>
            </div>
            <div className="report-output-table">
              {reportResult.rows.map((row) => (
                <span key={row.join("-")}>{row.map((cell) => <strong key={cell}>{cell}</strong>)}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="panel crm-panel" id="sales-inbox">
        <div className="v3-panel-head">
          <div>
            <p className="eyebrow">Sales Inbox</p>
            <h3>Inbox, context, and draft control</h3>
          </div>
          <span className="pill warn">Sends disabled</span>
        </div>
        <div className="crm-toolbar">
          <label><Search size={15} /><input value={inboxQuery} onChange={(event) => setInboxQuery(event.target.value)} placeholder="Search inbox" /></label>
          <label><Filter size={15} /><select value={inboxFilter} onChange={(event) => setInboxFilter(event.target.value)}>
            {["All", "High", "Medium", "Linked", "Unlinked", "Email", "RFQ"].map((option) => <option key={option}>{option}</option>)}
          </select></label>
        </div>
        <div className="inbox-layout">
          <div className="inbox-list">
            {visibleMessages.map((message) => (
              <button className={selectedMessage.id === message.id ? "selected" : ""} type="button" onClick={() => setSelectedMessageId(message.id)} key={message.id}>
                <span className={`link-state ${message.status.toLowerCase()}`}>{message.status === "Linked" ? <Link2 size={13} /> : <Layers3 size={13} />}{message.status}</span>
                <strong>{message.from}</strong>
                <small>{message.subject}</small>
                <em>{message.preview}</em>
              </button>
            ))}
          </div>
          <article className="inbox-preview">
            <div className="inbox-preview-head">
              <Mail size={18} />
              <div>
                <strong>{selectedMessage.subject}</strong>
                <span>{selectedMessage.from} · Owner {selectedMessage.owner}</span>
              </div>
              <span className={`pill ${selectedMessage.urgency === "High" ? "warn" : ""}`}>{selectedMessage.urgency}</span>
            </div>
            <p>{selectedMessage.preview}</p>
            <div className="inbox-context">
              <span><BriefcaseBusiness size={14} /> {selectedMessage.deal}</span>
              <span><UserRoundCheck size={14} /> {selectedMessage.contact}</span>
              <span><Bot size={14} /> {selectedMessage.summary}</span>
            </div>
            <div className="draft-box">
              <strong>Reply draft placeholder</strong>
              <p>Hi {selectedMessage.from.split(" ")[0]}, thanks for the note. I will confirm the clean next step and send the relevant quote context through shortly.</p>
              <div>
                <button type="button"><Sparkles size={15} /> AI summary</button>
                <button type="button"><Link2 size={15} /> Link to deal</button>
                <button className="primary-button" type="button"><Send size={15} /> Stage reply</button>
              </div>
            </div>
          </article>
        </div>
      </section>

      <section className="panel crm-panel" id="products">
        <div className="v3-panel-head">
          <div>
            <p className="eyebrow">Products</p>
            <h3>Quote-ready product catalogue</h3>
          </div>
          <span className="v2-live">{visibleProducts.length} shown</span>
        </div>
        <div className="crm-toolbar">
          <label><Search size={15} /><input value={productQuery} onChange={(event) => setProductQuery(event.target.value)} placeholder="Search products" /></label>
          <label><Filter size={15} /><select value={productFilter} onChange={(event) => setProductFilter(event.target.value)}>
            {["All", "Residential turf", "Putting green", "Playground", "Commercial sport", "Active", "Draft"].map((option) => <option key={option}>{option}</option>)}
          </select></label>
        </div>
        <div className="product-layout">
          <div className="product-list">
            <div className="product-row head"><span>Name</span><span>Category</span><span>Price</span><span>Status</span></div>
            {visibleProducts.map((product) => (
              <button className={selectedProduct.name === product.name ? "selected" : ""} type="button" onClick={() => setSelectedProductName(product.name)} key={product.name}>
                <strong>{product.name}</strong>
                <span>{product.category}</span>
                <span>{product.price}</span>
                <em>{product.status}</em>
              </button>
            ))}
          </div>
          <article className="product-detail">
            <Package size={20} />
            <div>
              <p className="eyebrow">Product Detail</p>
              <h4>{selectedProduct.name}</h4>
              <p>{selectedProduct.detail}</p>
            </div>
            <div className="product-detail-grid">
              <span><small>Category</small><strong>{selectedProduct.category}</strong></span>
              <span><small>Price</small><strong>{selectedProduct.price}</strong></span>
              <span><small>Status</small><strong>{selectedProduct.status}</strong></span>
              <span><small>CRM use</small><strong>Quote line placeholder</strong></span>
            </div>
            <button type="button"><CircleDollarSign size={15} /> Open pricing rules</button>
          </article>
        </div>
      </section>
    </section>
  );
}
