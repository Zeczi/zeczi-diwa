import React from "react";
import {
  ArrowRight,
  CalendarClock,
  CheckCircle2,
  ClipboardList,
  Edit3,
  Filter,
  Mail,
  Megaphone,
  PhoneCall,
  Plus,
  Search,
  UserRoundCheck,
  UsersRound,
  Video,
} from "lucide-react";

type ActivityType = "call" | "email" | "meeting" | "task" | "follow-up";
type ActivityStatus = "open" | "complete";
type LeadStatus = "new" | "qualified" | "nurture" | "converted";
type CampaignStatus = "draft" | "scheduled" | "active" | "paused" | "complete";

type ActivityRecord = {
  id: string;
  title: string;
  type: ActivityType;
  owner: string;
  dueDate: string;
  status: ActivityStatus;
  contact: string;
  deal: string;
  priority: "Low" | "Medium" | "High";
  notes: string;
};

type LeadRecord = {
  id: string;
  name: string;
  company: string;
  status: LeadStatus;
  source: string;
  owner: string;
  createdDate: string;
  email: string;
  phone: string;
  value: string;
  need: string;
  converted: boolean;
};

type CampaignRecord = {
  id: string;
  name: string;
  status: CampaignStatus;
  audience: string;
  owner: string;
  createdDate: string;
  goal: string;
  sent: number;
  openRate: string;
  replyRate: string;
  pipeline: string;
};

type ActivityForm = Omit<ActivityRecord, "id" | "status"> & { status?: ActivityStatus };

const owners = ["All", "Gareth", "Rachel", "Myles", "Sean", "DIWA Agent"];
const activityTypes: ("All" | ActivityType)[] = ["All", "call", "email", "meeting", "task", "follow-up"];
const activityStatuses: ("All" | ActivityStatus)[] = ["All", "open", "complete"];
const dueFilters = ["All", "Overdue", "Today", "Upcoming"] as const;
const leadStatuses: ("All" | LeadStatus)[] = ["All", "new", "qualified", "nurture", "converted"];
const campaignStatuses: ("All" | CampaignStatus)[] = ["All", "draft", "scheduled", "active", "paused", "complete"];

const today = "2026-06-03";

const seedActivities: ActivityRecord[] = [
  {
    id: "ACT-1001",
    title: "Call Helen about board approval pack",
    type: "call",
    owner: "Rachel",
    dueDate: "2026-06-03",
    status: "open",
    contact: "Helen Marsh",
    deal: "Evergreen Childcare Play Area",
    priority: "High",
    notes: "Confirm safety wording and decision meeting time before sending the board pack.",
  },
  {
    id: "ACT-1002",
    title: "Send quote follow-up to North Shore Sports Trust",
    type: "email",
    owner: "Gareth",
    dueDate: "2026-06-02",
    status: "open",
    contact: "Mike Rawiri",
    deal: "North Shore Sports Facility",
    priority: "High",
    notes: "Use warm close copy and ask for the committee decision date.",
  },
  {
    id: "ACT-1003",
    title: "Complete product notes for pool surround quote",
    type: "task",
    owner: "Myles",
    dueDate: "2026-06-04",
    status: "open",
    contact: "James Patel",
    deal: "Westfield Pool Surround",
    priority: "Medium",
    notes: "Add product preference, drainage note, and access photo summary.",
  },
  {
    id: "ACT-1004",
    title: "Finance timing check-in",
    type: "follow-up",
    owner: "DIWA Agent",
    dueDate: "2026-06-14",
    status: "open",
    contact: "Anna Barker",
    deal: "Barker Residence Backyard Upgrade",
    priority: "Low",
    notes: "Soft WhatsApp reactivation after do-not-disturb window.",
  },
  {
    id: "ACT-1005",
    title: "Weekly commercial review",
    type: "meeting",
    owner: "Sean",
    dueDate: "2026-06-03",
    status: "complete",
    contact: "Sales team",
    deal: "Pipeline review",
    priority: "Medium",
    notes: "Reviewed quote bottlenecks, long-tail queue, and human-required handoffs.",
  },
];

const seedLeads: LeadRecord[] = [
  {
    id: "LEAD-2041",
    name: "Nadia Ellis",
    company: "Kauri Kids Centre",
    status: "qualified",
    source: "Google Ads",
    owner: "Rachel",
    createdDate: "2026-06-03",
    email: "nadia@kaurikids.example",
    phone: "+64 21 555 2041",
    value: "$38k",
    need: "Childcare play area turf before winter.",
    converted: false,
  },
  {
    id: "LEAD-2038",
    name: "Daniel King",
    company: "Residential",
    status: "new",
    source: "Website form",
    owner: "Myles",
    createdDate: "2026-06-02",
    email: "daniel@example.test",
    phone: "+64 21 555 2038",
    value: "$14k",
    need: "Backyard lawn replacement, wants low-maintenance option.",
    converted: false,
  },
  {
    id: "LEAD-2029",
    name: "Talia Morris",
    company: "Morris Property Group",
    status: "nurture",
    source: "Referral",
    owner: "Gareth",
    createdDate: "2026-05-30",
    email: "talia@morris.example",
    phone: "+64 21 555 2029",
    value: "$82k",
    need: "Multi-property landscape refresh, budget timing not confirmed.",
    converted: false,
  },
  {
    id: "LEAD-2016",
    name: "Mark Fenton",
    company: "Pure Padel",
    status: "converted",
    source: "Campaign",
    owner: "Sean",
    createdDate: "2026-05-27",
    email: "mark@purepadel.example",
    phone: "+64 21 555 2016",
    value: "$120k",
    need: "Sports surface project discovery.",
    converted: true,
  },
];

const seedCampaigns: CampaignRecord[] = [
  {
    id: "CMP-301",
    name: "Winter quote reactivation",
    status: "active",
    audience: "Quote sent, no decision in 14 days",
    owner: "DIWA Agent",
    createdDate: "2026-06-01",
    goal: "Recover warm quote momentum without discounting first.",
    sent: 86,
    openRate: "61%",
    replyRate: "14%",
    pipeline: "$246k",
  },
  {
    id: "CMP-302",
    name: "Childcare compliance pack",
    status: "scheduled",
    audience: "Childcare and education leads",
    owner: "Rachel",
    createdDate: "2026-06-02",
    goal: "Lead with safety, compliance, and board-ready evidence.",
    sent: 0,
    openRate: "-",
    replyRate: "-",
    pipeline: "$118k",
  },
  {
    id: "CMP-303",
    name: "Long-tail spring reminder",
    status: "draft",
    audience: "Finance-dependent residential prospects",
    owner: "Gareth",
    createdDate: "2026-05-28",
    goal: "Preserve context until the buyer's timing window reopens.",
    sent: 0,
    openRate: "-",
    replyRate: "-",
    pipeline: "$697k",
  },
  {
    id: "CMP-304",
    name: "Post-install survey nurture",
    status: "complete",
    audience: "Completed jobs, last 90 days",
    owner: "Sean",
    createdDate: "2026-05-12",
    goal: "Capture testimonials and identify referral opportunities.",
    sent: 52,
    openRate: "74%",
    replyRate: "21%",
    pipeline: "$32k",
  },
];

const emptyActivityForm: ActivityForm = {
  title: "",
  type: "call",
  owner: "Rachel",
  dueDate: today,
  contact: "",
  deal: "",
  priority: "Medium",
  notes: "",
};

function titleCase(value: string) {
  return value.replace(/-/g, " ").replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function getDueState(dueDate: string, status: ActivityStatus) {
  if (status === "complete") return "Complete";
  if (dueDate < today) return "Overdue";
  if (dueDate === today) return "Today";
  return "Upcoming";
}

function activityIcon(type: ActivityType) {
  if (type === "call") return PhoneCall;
  if (type === "email") return Mail;
  if (type === "meeting") return Video;
  if (type === "follow-up") return CalendarClock;
  return ClipboardList;
}

export function ActivitiesLeadsCampaigns() {
  const [activities, setActivities] = React.useState(seedActivities);
  const [activityQuery, setActivityQuery] = React.useState("");
  const [activityOwner, setActivityOwner] = React.useState("All");
  const [activityType, setActivityType] = React.useState<"All" | ActivityType>("All");
  const [activityStatus, setActivityStatus] = React.useState<"All" | ActivityStatus>("All");
  const [activityDue, setActivityDue] = React.useState<(typeof dueFilters)[number]>("All");
  const [editingActivityId, setEditingActivityId] = React.useState<string | null>(null);
  const [activityForm, setActivityForm] = React.useState<ActivityForm>(emptyActivityForm);

  const [leadQuery, setLeadQuery] = React.useState("");
  const [leadStatus, setLeadStatus] = React.useState<"All" | LeadStatus>("All");
  const [leadOwner, setLeadOwner] = React.useState("All");
  const [leadSource, setLeadSource] = React.useState("All");
  const [leads, setLeads] = React.useState(seedLeads);
  const [selectedCampaignId, setSelectedCampaignId] = React.useState(seedCampaigns[0].id);
  const [campaignStatus, setCampaignStatus] = React.useState<"All" | CampaignStatus>("All");
  const [campaignQuery, setCampaignQuery] = React.useState("");

  const filteredActivities = React.useMemo(() => {
    const query = activityQuery.toLowerCase();
    return activities.filter((activity) => {
      const dueState = getDueState(activity.dueDate, activity.status);
      const text = `${activity.title} ${activity.contact} ${activity.deal} ${activity.notes}`.toLowerCase();
      return (
        (!query || text.includes(query)) &&
        (activityOwner === "All" || activity.owner === activityOwner) &&
        (activityType === "All" || activity.type === activityType) &&
        (activityStatus === "All" || activity.status === activityStatus) &&
        (activityDue === "All" || dueState === activityDue)
      );
    });
  }, [activities, activityDue, activityOwner, activityQuery, activityStatus, activityType]);

  const leadSources = React.useMemo(() => ["All", ...Array.from(new Set(leads.map((lead) => lead.source)))], [leads]);
  const filteredLeads = React.useMemo(() => {
    const query = leadQuery.toLowerCase();
    return leads.filter((lead) => {
      const text = `${lead.name} ${lead.company} ${lead.email} ${lead.phone} ${lead.need}`.toLowerCase();
      return (
        (!query || text.includes(query)) &&
        (leadStatus === "All" || lead.status === leadStatus) &&
        (leadOwner === "All" || lead.owner === leadOwner) &&
        (leadSource === "All" || lead.source === leadSource)
      );
    });
  }, [leadOwner, leadQuery, leadSource, leadStatus, leads]);

  const filteredCampaigns = React.useMemo(() => {
    const query = campaignQuery.toLowerCase();
    return seedCampaigns.filter((campaign) => {
      const text = `${campaign.name} ${campaign.audience} ${campaign.goal} ${campaign.owner}`.toLowerCase();
      return (!query || text.includes(query)) && (campaignStatus === "All" || campaign.status === campaignStatus);
    });
  }, [campaignQuery, campaignStatus]);

  const selectedCampaign = seedCampaigns.find((campaign) => campaign.id === selectedCampaignId) ?? seedCampaigns[0];
  const openActivities = activities.filter((activity) => activity.status === "open").length;
  const overdueActivities = activities.filter((activity) => getDueState(activity.dueDate, activity.status) === "Overdue").length;
  const convertedLeads = leads.filter((lead) => lead.converted).length;
  const activeCampaigns = seedCampaigns.filter((campaign) => campaign.status === "active").length;

  const startCreateActivity = () => {
    setEditingActivityId(null);
    setActivityForm(emptyActivityForm);
  };

  const startEditActivity = (activity: ActivityRecord) => {
    setEditingActivityId(activity.id);
    setActivityForm({
      title: activity.title,
      type: activity.type,
      owner: activity.owner,
      dueDate: activity.dueDate,
      contact: activity.contact,
      deal: activity.deal,
      priority: activity.priority,
      notes: activity.notes,
      status: activity.status,
    });
  };

  const saveActivity = (event: React.FormEvent) => {
    event.preventDefault();
    const trimmedTitle = activityForm.title.trim();
    if (!trimmedTitle) return;

    if (editingActivityId) {
      setActivities((current) =>
        current.map((activity) =>
          activity.id === editingActivityId
            ? { ...activity, ...activityForm, title: trimmedTitle, status: activityForm.status ?? activity.status }
            : activity,
        ),
      );
    } else {
      const nextNumber = activities.length + 1001;
      setActivities((current) => [
        {
          id: `ACT-${nextNumber}`,
          ...activityForm,
          title: trimmedTitle,
          status: "open",
        },
        ...current,
      ]);
    }

    setEditingActivityId(null);
    setActivityForm(emptyActivityForm);
  };

  const markComplete = (id: string) => {
    setActivities((current) =>
      current.map((activity) => (activity.id === id ? { ...activity, status: "complete" } : activity)),
    );
  };

  const convertLead = (id: string) => {
    setLeads((current) =>
      current.map((lead) => (lead.id === id ? { ...lead, status: "converted", converted: true } : lead)),
    );
  };

  return (
    <section className="crm-workspace" aria-label="DIWA CRM activities, leads, and campaigns">
      <div className="crm-hero">
        <div>
          <p className="eyebrow">CRM Layer</p>
          <h2>Activities, leads, and campaigns connected to the commercial queue.</h2>
          <p>Prototype CRM controls for turning DIWA recommendations into owned work, qualified pipeline, and targeted nurture.</p>
        </div>
        <div className="crm-kpis" aria-label="CRM summary">
          <span><strong>{openActivities}</strong> open activities</span>
          <span><strong>{overdueActivities}</strong> overdue</span>
          <span><strong>{convertedLeads}</strong> converted leads</span>
          <span><strong>{activeCampaigns}</strong> active campaign</span>
        </div>
      </div>

      <section className="crm-grid crm-activities" id="activities">
        <div className="panel crm-panel">
          <div className="section-head">
            <div>
              <p className="eyebrow">Activities</p>
              <h3>Owned work queue</h3>
            </div>
            <button type="button" className="primary-button" onClick={startCreateActivity}>
              <Plus size={16} /> New activity
            </button>
          </div>

          <div className="crm-filter-bar" aria-label="Activity filters">
            <label className="crm-search">
              <Search size={15} />
              <input value={activityQuery} onChange={(event) => setActivityQuery(event.target.value)} placeholder="Search activities" />
            </label>
            <Select label="Owner" value={activityOwner} onChange={setActivityOwner} options={owners} />
            <Select label="Type" value={activityType} onChange={(value) => setActivityType(value as "All" | ActivityType)} options={activityTypes} />
            <Select label="Status" value={activityStatus} onChange={(value) => setActivityStatus(value as "All" | ActivityStatus)} options={activityStatuses} />
            <Select label="Due" value={activityDue} onChange={(value) => setActivityDue(value as (typeof dueFilters)[number])} options={[...dueFilters]} />
          </div>

          <div className="crm-activity-list">
            {filteredActivities.map((activity) => {
              const Icon = activityIcon(activity.type);
              const dueState = getDueState(activity.dueDate, activity.status);
              return (
                <article className={`crm-activity-card ${activity.status}`} key={activity.id}>
                  <div className="crm-type-icon"><Icon size={17} /></div>
                  <div className="crm-card-main">
                    <div className="crm-card-title">
                      <strong>{activity.title}</strong>
                      <span className={`crm-state ${dueState.toLowerCase()}`}>{dueState}</span>
                    </div>
                    <p>{activity.notes}</p>
                    <div className="crm-meta-row">
                      <span>{titleCase(activity.type)}</span>
                      <span>Owner: {activity.owner}</span>
                      <span>Due: {activity.dueDate}</span>
                      <span>Contact: {activity.contact}</span>
                      <span>Deal: {activity.deal}</span>
                    </div>
                  </div>
                  <div className="crm-card-actions">
                    <button type="button" onClick={() => startEditActivity(activity)}><Edit3 size={15} /> Edit</button>
                    <button type="button" disabled={activity.status === "complete"} onClick={() => markComplete(activity.id)}>
                      <CheckCircle2 size={15} /> Complete
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        <form className="panel crm-panel crm-form-panel" onSubmit={saveActivity}>
          <div className="section-head compact">
            <div>
              <p className="eyebrow">{editingActivityId ? "Edit Activity" : "Create Activity"}</p>
              <h3>{editingActivityId ? editingActivityId : "New CRM activity"}</h3>
            </div>
          </div>
          <Field label="Title">
            <input value={activityForm.title} onChange={(event) => setActivityForm({ ...activityForm, title: event.target.value })} placeholder="Call customer about quote" />
          </Field>
          <div className="crm-form-grid">
            <Field label="Type">
              <select value={activityForm.type} onChange={(event) => setActivityForm({ ...activityForm, type: event.target.value as ActivityType })}>
                {activityTypes.filter((type) => type !== "All").map((type) => <option value={type} key={type}>{titleCase(type)}</option>)}
              </select>
            </Field>
            <Field label="Owner">
              <select value={activityForm.owner} onChange={(event) => setActivityForm({ ...activityForm, owner: event.target.value })}>
                {owners.filter((owner) => owner !== "All").map((owner) => <option value={owner} key={owner}>{owner}</option>)}
              </select>
            </Field>
            <Field label="Due date">
              <input type="date" value={activityForm.dueDate} onChange={(event) => setActivityForm({ ...activityForm, dueDate: event.target.value })} />
            </Field>
            <Field label="Priority">
              <select value={activityForm.priority} onChange={(event) => setActivityForm({ ...activityForm, priority: event.target.value as ActivityRecord["priority"] })}>
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
            </Field>
          </div>
          <Field label="Contact">
            <input value={activityForm.contact} onChange={(event) => setActivityForm({ ...activityForm, contact: event.target.value })} placeholder="Customer or contact" />
          </Field>
          <Field label="Linked deal">
            <input value={activityForm.deal} onChange={(event) => setActivityForm({ ...activityForm, deal: event.target.value })} placeholder="Deal or pipeline item" />
          </Field>
          <Field label="Notes">
            <textarea value={activityForm.notes} onChange={(event) => setActivityForm({ ...activityForm, notes: event.target.value })} placeholder="What should the owner know before acting?" />
          </Field>
          <div className="crm-form-actions">
            <button type="button" onClick={startCreateActivity}>Reset</button>
            <button className="primary-button" type="submit">{editingActivityId ? "Save changes" : "Create activity"}</button>
          </div>
        </form>
      </section>

      <section className="crm-grid" id="leads">
        <div className="panel crm-panel">
          <div className="section-head">
            <div>
              <p className="eyebrow">Leads</p>
              <h3>Qualification lane</h3>
            </div>
            <span className="pill ok">{filteredLeads.length} shown</span>
          </div>
          <div className="crm-filter-bar" aria-label="Lead filters">
            <label className="crm-search">
              <Search size={15} />
              <input value={leadQuery} onChange={(event) => setLeadQuery(event.target.value)} placeholder="Search leads" />
            </label>
            <Select label="Status" value={leadStatus} onChange={(value) => setLeadStatus(value as "All" | LeadStatus)} options={leadStatuses} />
            <Select label="Owner" value={leadOwner} onChange={setLeadOwner} options={owners} />
            <Select label="Source" value={leadSource} onChange={setLeadSource} options={leadSources} />
          </div>
          <div className="crm-table">
            <div className="crm-table-head">
              <span>Lead</span>
              <span>Status</span>
              <span>Owner</span>
              <span>Source</span>
              <span>Contact</span>
              <span>Action</span>
            </div>
            {filteredLeads.map((lead) => (
              <div className="crm-table-row" key={lead.id}>
                <div>
                  <strong>{lead.name}</strong>
                  <small>{lead.company} · {lead.value}</small>
                  <p>{lead.need}</p>
                </div>
                <span className={`crm-state ${lead.status}`}>{titleCase(lead.status)}</span>
                <span>{lead.owner}</span>
                <span>{lead.source}<small>Created {lead.createdDate}</small></span>
                <span><b>{lead.email}</b><small>{lead.phone}</small></span>
                <button type="button" disabled={lead.converted} onClick={() => convertLead(lead.id)}>
                  <ArrowRight size={15} /> {lead.converted ? "Converted" : "Convert"}
                </button>
              </div>
            ))}
          </div>
        </div>

        <aside className="panel crm-panel crm-side-panel">
          <div className="section-head compact">
            <div>
              <p className="eyebrow">Lead Signals</p>
              <h3>Prototype routing</h3>
            </div>
          </div>
          <div className="crm-signal-list">
            <span><UserRoundCheck size={16} /> Qualified leads should create a deal, first activity, and source note.</span>
            <span><CalendarClock size={16} /> Nurture leads stay visible by timing window, not just last activity.</span>
            <span><Filter size={16} /> Filters are local prototype state ready for API-backed fields.</span>
          </div>
        </aside>
      </section>

      <section className="crm-grid" id="campaigns">
        <div className="panel crm-panel">
          <div className="section-head">
            <div>
              <p className="eyebrow">Campaigns</p>
              <h3>Audience and nurture control</h3>
            </div>
            <span className="pill">{filteredCampaigns.length} campaigns</span>
          </div>
          <div className="crm-filter-bar" aria-label="Campaign filters">
            <label className="crm-search">
              <Search size={15} />
              <input value={campaignQuery} onChange={(event) => setCampaignQuery(event.target.value)} placeholder="Search campaigns" />
            </label>
            <Select label="Status" value={campaignStatus} onChange={(value) => setCampaignStatus(value as "All" | CampaignStatus)} options={campaignStatuses} />
          </div>
          <div className="crm-campaign-list">
            {filteredCampaigns.map((campaign) => (
              <button
                className={campaign.id === selectedCampaign.id ? "selected" : ""}
                type="button"
                onClick={() => setSelectedCampaignId(campaign.id)}
                key={campaign.id}
              >
                <Megaphone size={17} />
                <span>
                  <strong>{campaign.name}</strong>
                  <small>{campaign.audience}</small>
                </span>
                <em className={`crm-state ${campaign.status}`}>{titleCase(campaign.status)}</em>
              </button>
            ))}
          </div>
        </div>

        <aside className="panel crm-panel crm-campaign-detail">
          <div className="section-head compact">
            <div>
              <p className="eyebrow">Campaign Detail</p>
              <h3>{selectedCampaign.name}</h3>
            </div>
            <span className={`crm-state ${selectedCampaign.status}`}>{titleCase(selectedCampaign.status)}</span>
          </div>
          <p>{selectedCampaign.goal}</p>
          <div className="crm-detail-grid">
            <span><strong>{selectedCampaign.audience}</strong><small>Audience / segment</small></span>
            <span><strong>{selectedCampaign.owner}</strong><small>Owner</small></span>
            <span><strong>{selectedCampaign.createdDate}</strong><small>Created</small></span>
            <span><strong>{selectedCampaign.pipeline}</strong><small>Pipeline influenced</small></span>
          </div>
          <div className="crm-performance">
            <span><strong>{selectedCampaign.sent}</strong><small>Sent</small></span>
            <span><strong>{selectedCampaign.openRate}</strong><small>Open rate</small></span>
            <span><strong>{selectedCampaign.replyRate}</strong><small>Reply rate</small></span>
          </div>
          <div className="crm-placeholder">
            <UsersRound size={17} />
            <span>Detail view placeholder for audience preview, message variants, suppression rules, and attribution once campaign data is connected.</span>
          </div>
        </aside>
      </section>
    </section>
  );
}

function Select({ label, value, onChange, options }: { label: string; value: string; onChange: (value: string) => void; options: readonly string[] }) {
  return (
    <label className="crm-select">
      <span>{label}</span>
      <select value={value} onChange={(event) => onChange(event.target.value)}>
        {options.map((option) => <option value={option} key={option}>{titleCase(option)}</option>)}
      </select>
    </label>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="crm-field">
      <span>{label}</span>
      {children}
    </label>
  );
}
