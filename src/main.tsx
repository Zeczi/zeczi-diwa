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
  Clock3,
  FileText,
  Gauge,
  Inbox,
  Layers3,
  MessageSquareText,
  PanelLeftClose,
  PanelLeftOpen,
  PhoneCall,
  Search,
  ShieldCheck,
  Sparkles,
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

function App() {
  const [sidebarCollapsed, setSidebarCollapsed] = React.useState(() => {
    return window.localStorage.getItem("diwa-sidebar-collapsed") === "true";
  });

  React.useEffect(() => {
    window.localStorage.setItem("diwa-sidebar-collapsed", String(sidebarCollapsed));
  }, [sidebarCollapsed]);

  return (
    <main className={`shell ${sidebarCollapsed ? "sidebar-collapsed" : ""}`}>
      <aside className="sidebar">
        <div className="brand-block">
          <div className="brand-row">
            <img className="brand-logo" src="/brand/zeczi-logo.png" alt="ZECZI" />
            <button
              className="sidebar-toggle"
              type="button"
              aria-label={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
              aria-pressed={sidebarCollapsed}
              onClick={() => setSidebarCollapsed((current) => !current)}
              title={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              {sidebarCollapsed ? <PanelLeftOpen size={18} /> : <PanelLeftClose size={18} />}
            </button>
          </div>
          <span className="brand-pill">DIWA</span>
        </div>

        <nav className="nav-list" aria-label="DIWA navigation">
          <a className="nav-item active" href="#cockpit" title="Cockpit"><Gauge size={17} /> <span>Cockpit</span></a>
          <a className="nav-item" href="#deals" title="Deal Intelligence"><BriefcaseBusiness size={17} /> <span>Deal Intelligence</span></a>
          <a className="nav-item" href="#context" title="Context Timeline"><Layers3 size={17} /> <span>Context Timeline</span></a>
          <a className="nav-item" href="#human" title="Human Required"><UserRoundCheck size={17} /> <span>Human Required</span></a>
          <a className="nav-item" href="#agents" title="Agent Work"><Bot size={17} /> <span>Agent Work</span></a>
          <a className="nav-item" href="#sources" title="Source Links"><ShieldCheck size={17} /> <span>Source Links</span></a>
        </nav>

        <div className="sidebar-panel">
          <p className="eyebrow">Workspace</p>
          <strong>Eco Lawn</strong>
          <span>Prototype tenant</span>
        </div>
      </aside>

      <section className="content">
        <header className="topbar">
          <div>
            <p className="eyebrow">Deal Intelligence Workspace Application</p>
            <h1>Today&apos;s commercial control surface</h1>
          </div>
          <div className="topbar-actions">
            <button className="icon-button" aria-label="Search"><Search size={18} /></button>
            <button className="primary-button"><Sparkles size={16} /> Ask DIWA</button>
          </div>
        </header>

        <div className="workspace" id="cockpit">
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
        </div>
      </section>
    </main>
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
