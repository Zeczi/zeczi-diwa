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
  const isV2 = !window.location.pathname.startsWith("/v1");
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
          <div className="brand-logo-wrap">
            <img className="brand-logo" src="/brand/zeczi-logo.png" alt="ZECZI" />
            <img className="brand-icon" src="/brand/zeczi-favicon.png" alt="ZECZI" />
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

        <div className="sidebar-foot">
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

      <section className={`content ${isV2 ? "content-v2" : ""}`}>
        <header className={`topbar ${isV2 ? "topbar-v2" : ""}`}>
          <div>
            {isV2 ? (
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
          <div className="topbar-actions">
            <button className="icon-button" aria-label="Search"><Search size={18} /></button>
            <button className="primary-button"><Sparkles size={16} /> Ask DIWA</button>
            {isV2 && (
              <button className="customer-avatar" aria-label="Focused customer: Keegan Shillock" title="Keegan Shillock">
                KS
              </button>
            )}
          </div>
        </header>

        <div className="workspace" id="cockpit">
          {isV2 ? (
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
