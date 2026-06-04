import React from "react";
import {
  ArrowDownUp,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  CircleDollarSign,
  Clock3,
  Filter,
  Flame,
  Layers3,
  ListFilter,
  MoveRight,
  Search,
  UserRoundCheck,
} from "lucide-react";
import { type CrmDeal, type DealStage, ecoLawnDealStages, initialCrmDeals } from "./crmData";

type ViewMode = "kanban" | "list";
type SortKey = "heatScore" | "value" | "ageDays" | "lastActivityDays" | "customer" | "stage";
type SortDirection = "asc" | "desc";

const owners = ["All", ...Array.from(new Set(initialCrmDeals.map((deal) => deal.owner)))];
const statuses = ["All", "Hot", "On Track", "At Risk", "Stale", "Blocked"];

function money(value: number) {
  return `$${value.toLocaleString("en-NZ")}`;
}

function compactMoney(value: number) {
  if (value >= 1000000) return `$${(value / 1000000).toFixed(1)}m`;
  if (value >= 1000) return `$${Math.round(value / 1000)}k`;
  return money(value);
}

function statusClass(value: string) {
  return value.toLowerCase().replace(/\s+/g, "-");
}

function getStageIndex(stage: DealStage) {
  return ecoLawnDealStages.indexOf(stage);
}

function moveDealStage(deals: CrmDeal[], dealId: string, direction: -1 | 1) {
  return deals.map((deal) => {
    if (deal.id !== dealId) return deal;
    const nextIndex = Math.min(ecoLawnDealStages.length - 1, Math.max(0, getStageIndex(deal.stage) + direction));
    return {
      ...deal,
      stage: ecoLawnDealStages[nextIndex],
      lastActivity: `Moved to ${ecoLawnDealStages[nextIndex]}`,
      lastActivityDays: 0,
    };
  });
}

function sortDeals(deals: CrmDeal[], sortKey: SortKey, sortDirection: SortDirection) {
  const direction = sortDirection === "asc" ? 1 : -1;
  return [...deals].sort((a, b) => {
    if (sortKey === "customer" || sortKey === "stage") {
      return a[sortKey].localeCompare(b[sortKey]) * direction;
    }
    return (a[sortKey] - b[sortKey]) * direction;
  });
}

function DealCard({
  deal,
  isSelected,
  onSelect,
  onMove,
}: {
  deal: CrmDeal;
  isSelected: boolean;
  onSelect: (dealId: string) => void;
  onMove: (dealId: string, direction: -1 | 1) => void;
}) {
  return (
    <article className={`crm-deal-card ${isSelected ? "selected" : ""}`}>
      <button className="crm-deal-card-main" type="button" onClick={() => onSelect(deal.id)}>
        <span className={`crm-status-dot ${statusClass(deal.status)}`} aria-hidden="true" />
        <span>
          <strong>{deal.title}</strong>
          <small>{deal.customer} · {deal.company}</small>
        </span>
        <b>{compactMoney(deal.value)}</b>
      </button>
      <div className="crm-card-meta">
        <span><UserRoundCheck size={13} /> {deal.owner}</span>
        <span><Flame size={13} /> {deal.heatScore}</span>
        <span><Clock3 size={13} /> {deal.ageDays}d old</span>
      </div>
      <p>{deal.nextActivity}</p>
      <div className="crm-card-foot">
        <span className={`crm-pill ${statusClass(deal.status)}`}>{deal.status}</span>
        <span>{deal.lastActivityDays === 0 ? "Active today" : `${deal.lastActivityDays}d since activity`}</span>
      </div>
      <div className="crm-card-move" aria-label={`Move ${deal.title} between stages`}>
        <button type="button" onClick={() => onMove(deal.id, -1)} disabled={getStageIndex(deal.stage) === 0}>
          <ArrowLeft size={14} /> Back
        </button>
        <button type="button" onClick={() => onMove(deal.id, 1)} disabled={getStageIndex(deal.stage) === ecoLawnDealStages.length - 1}>
          Forward <ArrowRight size={14} />
        </button>
      </div>
    </article>
  );
}

function DealDetail({
  deal,
  onStageChange,
}: {
  deal: CrmDeal;
  onStageChange: (dealId: string, stage: DealStage) => void;
}) {
  return (
    <aside className="crm-detail-panel" aria-label="Deal detail panel">
      <div className="crm-detail-head">
        <div>
          <p className="eyebrow">Deal detail</p>
          <h3>{deal.title}</h3>
          <span>{deal.id} · {deal.location} · {deal.source}</span>
        </div>
        <strong>{money(deal.value)}</strong>
      </div>

      <div className="crm-detail-score">
        <span>
          <b>{deal.heatScore}</b>
          <small>Heat score</small>
        </span>
        <span>
          <b>{deal.status}</b>
          <small>Status</small>
        </span>
        <span>
          <b>{deal.nextActivityDue}</b>
          <small>Next due</small>
        </span>
      </div>

      <label className="crm-stage-select">
        <span>Pipeline stage</span>
        <select value={deal.stage} onChange={(event) => onStageChange(deal.id, event.target.value as DealStage)}>
          {ecoLawnDealStages.map((stage) => <option key={stage} value={stage}>{stage}</option>)}
        </select>
      </label>

      <section>
        <h4>Customer context</h4>
        <p>{deal.detail}</p>
      </section>

      <section>
        <h4>Next activity</h4>
        <p>{deal.nextActivity}</p>
      </section>

      <section className="crm-signal-grid">
        <article>
          <strong>AI signal</strong>
          <p>{deal.aiSignal}</p>
        </article>
        <article>
          <strong>Human signal</strong>
          <p>{deal.humanSignal}</p>
        </article>
      </section>

      <section>
        <h4>Blockers and tags</h4>
        <div className="crm-tag-row">
          {[...deal.blockers, ...deal.tags].map((tag) => <span key={tag}>{tag}</span>)}
        </div>
      </section>
    </aside>
  );
}

export function DealsModule() {
  const [deals, setDeals] = React.useState(initialCrmDeals);
  const [viewMode, setViewMode] = React.useState<ViewMode>("kanban");
  const [query, setQuery] = React.useState("");
  const [stageFilter, setStageFilter] = React.useState<DealStage | "All">("All");
  const [ownerFilter, setOwnerFilter] = React.useState("All");
  const [statusFilter, setStatusFilter] = React.useState("All");
  const [sortKey, setSortKey] = React.useState<SortKey>("heatScore");
  const [sortDirection, setSortDirection] = React.useState<SortDirection>("desc");
  const [selectedId, setSelectedId] = React.useState(deals[0]?.id ?? "");

  const filteredDeals = React.useMemo(() => {
    const text = query.trim().toLowerCase();
    const filtered = deals.filter((deal) => {
      const matchesText = !text || [
        deal.title,
        deal.customer,
        deal.company,
        deal.owner,
        deal.service,
        deal.location,
        deal.nextActivity,
        deal.tags.join(" "),
      ].join(" ").toLowerCase().includes(text);
      const matchesStage = stageFilter === "All" || deal.stage === stageFilter;
      const matchesOwner = ownerFilter === "All" || deal.owner === ownerFilter;
      const matchesStatus = statusFilter === "All" || deal.status === statusFilter;
      return matchesText && matchesStage && matchesOwner && matchesStatus;
    });
    return sortDeals(filtered, sortKey, sortDirection);
  }, [deals, ownerFilter, query, sortDirection, sortKey, stageFilter, statusFilter]);

  const selectedDeal = deals.find((deal) => deal.id === selectedId) ?? filteredDeals[0] ?? deals[0];
  const totalValue = filteredDeals.reduce((sum, deal) => sum + deal.value, 0);
  const hotCount = filteredDeals.filter((deal) => deal.heatScore >= 80).length;
  const humanCount = filteredDeals.filter((deal) => deal.stage === "Human Required" || deal.status === "Blocked").length;
  const staleCount = filteredDeals.filter((deal) => deal.lastActivityDays >= 5 || deal.status === "Stale").length;

  React.useEffect(() => {
    if (selectedDeal) setSelectedId(selectedDeal.id);
  }, [selectedDeal?.id]);

  const updateDealStage = (dealId: string, stage: DealStage) => {
    setDeals((current) => current.map((deal) => deal.id === dealId ? {
      ...deal,
      stage,
      lastActivity: `Moved to ${stage}`,
      lastActivityDays: 0,
    } : deal));
  };

  const moveStage = (dealId: string, direction: -1 | 1) => {
    setDeals((current) => moveDealStage(current, dealId, direction));
    setSelectedId(dealId);
  };

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDirection((current) => current === "asc" ? "desc" : "asc");
      return;
    }
    setSortKey(key);
    setSortDirection(key === "customer" || key === "stage" ? "asc" : "desc");
  };

  return (
    <section className="crm-module" id="deals" aria-label="DIWA CRM Deals module">
      <div className="crm-module-head">
        <div>
          <p className="eyebrow">CRM Deals Module</p>
          <h2>Eco Lawn deal pipeline</h2>
          <p>Move deals through the operating stages, inspect next actions, and switch between Kanban and list control surfaces.</p>
        </div>
        <div className="crm-view-toggle" aria-label="Deals view mode">
          <button className={viewMode === "kanban" ? "active" : ""} type="button" onClick={() => setViewMode("kanban")}>
            <Layers3 size={15} /> Kanban
          </button>
          <button className={viewMode === "list" ? "active" : ""} type="button" onClick={() => setViewMode("list")}>
            <ListFilter size={15} /> List
          </button>
        </div>
      </div>

      <div className="crm-metrics" aria-label="Filtered deal metrics">
        <article><CircleDollarSign size={17} /><span>Filtered value</span><strong>{compactMoney(totalValue)}</strong></article>
        <article><Flame size={17} /><span>Hot deals</span><strong>{hotCount}</strong></article>
        <article><UserRoundCheck size={17} /><span>Human required</span><strong>{humanCount}</strong></article>
        <article><Clock3 size={17} /><span>Stale or aging</span><strong>{staleCount}</strong></article>
      </div>

      <div className="crm-controls">
        <label className="crm-search">
          <Search size={16} />
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search deal, customer, owner, service, tag..." />
        </label>
        <label>
          <Filter size={15} />
          <span>Stage</span>
          <select value={stageFilter} onChange={(event) => setStageFilter(event.target.value as DealStage | "All")}>
            <option value="All">All stages</option>
            {ecoLawnDealStages.map((stage) => <option value={stage} key={stage}>{stage}</option>)}
          </select>
        </label>
        <label>
          <span>Owner</span>
          <select value={ownerFilter} onChange={(event) => setOwnerFilter(event.target.value)}>
            {owners.map((owner) => <option value={owner} key={owner}>{owner}</option>)}
          </select>
        </label>
        <label>
          <span>Status</span>
          <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)}>
            {statuses.map((status) => <option value={status} key={status}>{status}</option>)}
          </select>
        </label>
        <label>
          <ArrowDownUp size={15} />
          <span>Sort</span>
          <select value={`${sortKey}:${sortDirection}`} onChange={(event) => {
            const [key, direction] = event.target.value.split(":");
            setSortKey(key as SortKey);
            setSortDirection(direction as SortDirection);
          }}>
            <option value="heatScore:desc">Heat high-low</option>
            <option value="heatScore:asc">Heat low-high</option>
            <option value="value:desc">Value high-low</option>
            <option value="value:asc">Value low-high</option>
            <option value="lastActivityDays:desc">Least recent activity</option>
            <option value="ageDays:desc">Oldest deal</option>
            <option value="customer:asc">Customer A-Z</option>
            <option value="stage:asc">Stage A-Z</option>
          </select>
        </label>
      </div>

      <div className="crm-workspace">
        <div className="crm-primary">
          {viewMode === "kanban" ? (
            <div className="crm-kanban" aria-label="Eco Lawn stages Kanban board">
              {ecoLawnDealStages.map((stage) => {
                const stageDeals = filteredDeals.filter((deal) => deal.stage === stage);
                return (
                  <section className="crm-stage-column" key={stage}>
                    <header>
                      <span>{stage}</span>
                      <strong>{stageDeals.length}</strong>
                    </header>
                    <div>
                      {stageDeals.length > 0 ? stageDeals.map((deal) => (
                        <DealCard
                          deal={deal}
                          isSelected={selectedDeal?.id === deal.id}
                          onMove={moveStage}
                          onSelect={setSelectedId}
                          key={deal.id}
                        />
                      )) : <p className="crm-empty-stage">No matching deals</p>}
                    </div>
                  </section>
                );
              })}
            </div>
          ) : (
            <div className="crm-table-wrap">
              <table className="crm-deal-table">
                <thead>
                  <tr>
                    <th><button type="button" onClick={() => toggleSort("customer")}>Deal {sortKey === "customer" && (sortDirection === "asc" ? <ChevronUp size={12} /> : <ChevronDown size={12} />)}</button></th>
                    <th><button type="button" onClick={() => toggleSort("stage")}>Stage {sortKey === "stage" && (sortDirection === "asc" ? <ChevronUp size={12} /> : <ChevronDown size={12} />)}</button></th>
                    <th><button type="button" onClick={() => toggleSort("value")}>Value {sortKey === "value" && (sortDirection === "asc" ? <ChevronUp size={12} /> : <ChevronDown size={12} />)}</button></th>
                    <th>Owner</th>
                    <th><button type="button" onClick={() => toggleSort("heatScore")}>Heat {sortKey === "heatScore" && (sortDirection === "asc" ? <ChevronUp size={12} /> : <ChevronDown size={12} />)}</button></th>
                    <th>Next activity</th>
                    <th><button type="button" onClick={() => toggleSort("lastActivityDays")}>Last activity {sortKey === "lastActivityDays" && (sortDirection === "asc" ? <ChevronUp size={12} /> : <ChevronDown size={12} />)}</button></th>
                    <th>Move</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredDeals.map((deal) => (
                    <tr className={selectedDeal?.id === deal.id ? "selected" : ""} key={deal.id} onClick={() => setSelectedId(deal.id)}>
                      <td><strong>{deal.title}</strong><span>{deal.customer} · {deal.company}</span></td>
                      <td><span className="crm-stage-chip">{deal.stage}</span></td>
                      <td>{money(deal.value)}</td>
                      <td>{deal.owner}</td>
                      <td><span className={`crm-heat ${deal.heatScore >= 80 ? "hot" : deal.heatScore >= 60 ? "warm" : "cool"}`}>{deal.heatScore}</span></td>
                      <td>{deal.nextActivity}</td>
                      <td>{deal.lastActivityDays === 0 ? "Today" : `${deal.lastActivityDays} days ago`}</td>
                      <td>
                        <button type="button" onClick={(event) => {
                          event.stopPropagation();
                          moveStage(deal.id, 1);
                        }}>
                          <MoveRight size={14} /> Move
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {selectedDeal && <DealDetail deal={selectedDeal} onStageChange={updateDealStage} />}
      </div>

      <div className="crm-footer-note">
        <CheckCircle2 size={15} />
        <span>Prototype uses anonymised staging-style data. No live customer PII is displayed.</span>
      </div>
    </section>
  );
}

