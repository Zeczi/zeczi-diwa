import React from "react";
import { Filter, Mic, Save, Search, SlidersHorizontal, Sparkles } from "lucide-react";
import {
  applyDealFilters,
  CrmDeal,
  DealFilterState,
  describeFilter,
  emptyDealFilter,
  getActivityAgeDays,
  getCrmHeatScore,
  parseNaturalLanguageFilter,
  savedDealFilters,
} from "./crmFilters";

type FilterConsoleProps = {
  deals: CrmDeal[];
  onSelectDeal: (dealId: string) => void;
};

const mockVoicePrompt = "Quote Sent over $10k with no activity in 5 days";

function uniqueValues(deals: CrmDeal[], key: "stage" | "owner") {
  return ["All", ...Array.from(new Set(deals.map((deal) => deal[key]))).sort()];
}

export function FilterConsole({ deals, onSelectDeal }: FilterConsoleProps) {
  const stages = React.useMemo(() => uniqueValues(deals, "stage"), [deals]);
  const owners = React.useMemo(() => uniqueValues(deals, "owner"), [deals]);
  const [filters, setFilters] = React.useState<DealFilterState>(emptyDealFilter);
  const [typedQuery, setTypedQuery] = React.useState("High-value deals with no next activity");
  const [parserResult, setParserResult] = React.useState(() => parseNaturalLanguageFilter("High-value deals with no next activity", stages, owners));
  const [activeSavedId, setActiveSavedId] = React.useState<string | null>(null);
  const [voiceState, setVoiceState] = React.useState("Mock voice idle");

  React.useEffect(() => {
    setParserResult(parseNaturalLanguageFilter(typedQuery, stages, owners));
  }, [owners, stages, typedQuery]);

  const filteredDeals = React.useMemo(() => applyDealFilters(deals, filters), [deals, filters]);

  const updateFilter = <Key extends keyof DealFilterState>(key: Key, value: DealFilterState[Key]) => {
    setFilters((current) => ({ ...current, [key]: value }));
    setActiveSavedId(null);
  };

  const applyParsedFilter = () => {
    setFilters(parserResult.filters);
    setActiveSavedId(null);
  };

  const applySavedFilter = (filterId: string) => {
    const saved = savedDealFilters.find((item) => item.id === filterId);
    if (!saved) return;
    setFilters(saved.filters);
    setTypedQuery(saved.name);
    setActiveSavedId(filterId);
  };

  const runMockVoice = () => {
    setTypedQuery(mockVoicePrompt);
    setVoiceState("Mock voice captured");
  };

  return (
    <section className="panel crm-filter-console" id="crm-filters" aria-label="CRM filters">
      <div className="v3-panel-head">
        <div>
          <p className="eyebrow">CRM Filters</p>
          <h3>Manual and conversational deal segmentation</h3>
        </div>
        <span className="v2-live">{filteredDeals.length} matched</span>
      </div>

      <div className="crm-filter-grid">
        <section className="crm-filter-builder" aria-label="Manual filter builder">
          <div className="crm-filter-title">
            <SlidersHorizontal size={16} />
            <strong>Manual builder</strong>
          </div>
          <div className="crm-control-grid">
            <label>
              <span>Stage</span>
              <select value={filters.stage} onChange={(event) => updateFilter("stage", event.target.value)}>
                {stages.map((stage) => <option value={stage} key={stage}>{stage}</option>)}
                <option value="Human Required">Human Required</option>
              </select>
            </label>
            <label>
              <span>Owner</span>
              <select value={filters.owner} onChange={(event) => updateFilter("owner", event.target.value)}>
                {owners.map((owner) => <option value={owner} key={owner}>{owner}</option>)}
              </select>
            </label>
            <label>
              <span>Min value</span>
              <input
                type="number"
                min="0"
                value={filters.minValue}
                onChange={(event) => updateFilter("minValue", event.target.value === "" ? "" : Number(event.target.value))}
                placeholder="10000"
              />
            </label>
            <label>
              <span>Max value</span>
              <input
                type="number"
                min="0"
                value={filters.maxValue}
                onChange={(event) => updateFilter("maxValue", event.target.value === "" ? "" : Number(event.target.value))}
                placeholder="150000"
              />
            </label>
            <label>
              <span>Min heat</span>
              <input
                type="number"
                min="0"
                max="100"
                value={filters.minHeat}
                onChange={(event) => updateFilter("minHeat", event.target.value === "" ? "" : Number(event.target.value))}
                placeholder="80"
              />
            </label>
            <label>
              <span>Activity</span>
              <select value={filters.activity} onChange={(event) => updateFilter("activity", event.target.value as DealFilterState["activity"])}>
                <option value="any">Any</option>
                <option value="no-next-activity">No next activity</option>
                <option value="stale-5-days">No activity in 5+ days</option>
                <option value="overdue">Overdue</option>
                <option value="due-today">Due today</option>
              </select>
            </label>
            <label>
              <span>Custom fields</span>
              <select value={filters.customFields} onChange={(event) => updateFilter("customFields", event.target.value as DealFilterState["customFields"])}>
                <option value="any">Any</option>
                <option value="complete">Complete</option>
                <option value="missing">Missing</option>
              </select>
            </label>
            <label>
              <span>Sort</span>
              <select value={filters.sort} onChange={(event) => updateFilter("sort", event.target.value as DealFilterState["sort"])}>
                <option value="heat-desc">Heat score</option>
                <option value="value-desc">Deal value</option>
                <option value="activity-risk">Activity risk</option>
              </select>
            </label>
            <label>
              <span>Limit</span>
              <input
                type="number"
                min="1"
                value={filters.limit}
                onChange={(event) => updateFilter("limit", event.target.value === "" ? "" : Number(event.target.value))}
                placeholder="50"
              />
            </label>
          </div>
          <div className="crm-filter-actions">
            <button type="button" onClick={() => setFilters(emptyDealFilter)}>
              <Filter size={15} /> Clear
            </button>
            <span>{describeFilter(filters)}</span>
          </div>
        </section>

        <section className="crm-conversation" aria-label="Conversational filter parser">
          <div className="crm-filter-title">
            <Sparkles size={16} />
            <strong>Conversational filter</strong>
          </div>
          <div className="crm-query-row">
            <label>
              <span>Typed filter</span>
              <input value={typedQuery} onChange={(event) => setTypedQuery(event.target.value)} />
            </label>
            <button className="primary-button" type="button" onClick={applyParsedFilter}>
              <Search size={15} /> Apply
            </button>
            <button type="button" onClick={runMockVoice} title="Mock voice capture">
              <Mic size={15} /> Voice
            </button>
          </div>
          <article className="crm-parser-card">
            <div>
              <span>Interpretation</span>
              <strong>{parserResult.summary}</strong>
            </div>
            <div className="crm-parser-meta">
              <span>Confidence {(parserResult.confidence * 100).toFixed(0)}%</span>
              <span>{voiceState}</span>
            </div>
            <div className="crm-token-row">
              {parserResult.extracted.length > 0 ? parserResult.extracted.map((item) => <span key={item}>{item}</span>) : <span>No structured tokens yet</span>}
            </div>
          </article>
          <div className="crm-saved-filters">
            <div className="crm-filter-title">
              <Save size={16} />
              <strong>Saved filters</strong>
            </div>
            {savedDealFilters.map((saved) => (
              <button className={activeSavedId === saved.id ? "active" : ""} type="button" onClick={() => applySavedFilter(saved.id)} key={saved.id}>
                <strong>{saved.name}</strong>
                <span>{saved.description}</span>
              </button>
            ))}
          </div>
        </section>
      </div>

      <div className="crm-results" aria-label="Filtered deal results">
        <div className="crm-results-head">
          <span>Deal</span>
          <span>Owner</span>
          <span>Stage</span>
          <span>Value</span>
          <span>Heat</span>
          <span>Activity</span>
        </div>
        {filteredDeals.length > 0 ? (
          filteredDeals.map((deal) => (
            <button type="button" onClick={() => onSelectDeal(deal.id)} key={deal.id}>
              <strong>{deal.customer}<small>{deal.company !== "Residential" ? deal.company : deal.name}</small></strong>
              <span>{deal.owner}</span>
              <span>{deal.stage}</span>
              <span>${deal.value.toLocaleString("en-NZ")}</span>
              <span>{getCrmHeatScore(deal)}%</span>
              <span>{getActivityAgeDays(deal)}d</span>
            </button>
          ))
        ) : (
          <div className="crm-empty-state">
            <strong>No deals match this filter.</strong>
            <span>Clear one condition or apply a saved filter to return to a populated segment.</span>
          </div>
        )}
      </div>
    </section>
  );
}
