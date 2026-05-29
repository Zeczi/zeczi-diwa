# DIWA Prototype One Plan

## Boundary

Prototype One is an off-production Eco Lawn-native CRM and operating workspace. It must not write to Pipedrive, send customer communications, deploy, store secrets, or change existing `/v3` and `/v4` behaviour.

The initial route is local/staging only:

- `/prototype-one`
- `/p1`

All data in this lane is mock Eco Lawn-shaped data for product review.

## Current App Inventory

The `zeczi-diwa` repo is a Vite React single page app:

- `src/main.tsx` contains the current static DIWA cockpit implementations and route selection for `/v1`, default v2, `/v3`, and `/v4`.
- `src/styles.css` contains the shared dark ZECZI/DIWA visual system and responsive cockpit styles.
- `vite.config.ts` uses Vite with a configurable base path and local dev port `5174`.
- `npm run build` runs TypeScript then Vite production build.

## Prototype One Architecture

Prototype One should become a separate app lane inside the same frontend until the product direction is validated.

Recommended frontend structure after this first pass:

- `PrototypeOneApp`: route-level app shell for Eco Lawn-native CRM.
- Mock data layer: deals, contacts, organisations, activities, and communications represented as typed local objects first.
- Navigation sections: Dashboard, Deals, Contacts, Organisations, Activities, Communications, Intelligence, Settings.
- Detail surfaces: start with one selected deal and linked customer/org/activity/comms context.
- Future extraction: move P1 data/components out of `main.tsx` into `src/prototype-one/` once the interaction model stabilises.

## Backlog

1. Replace static nav anchors with route/view state and add mobile-friendly section switching.
2. Add deal kanban/list toggle, stage filtering, sortable columns, and mock drag/reorder interaction.
3. Expand deal detail into summary, timeline, scorecards, snapshots, tasks, docs, and comms tabs.
4. Add contact and organisation detail views with linked deals, custom fields, notes, and timeline.
5. Add activities due buckets: overdue, today, upcoming, owner, complete state, suggested next action.
6. Add communications ledger placeholders for Gmail, calls, SMS, WhatsApp, and DIWA drafts with send disabled.
7. Add intelligence model fields: deal heat, stale risk, close likelihood, missing context, evidence/provenance, human-required exception.
8. Add field/mobile placeholders for quick note, call, photo, document capture, and project handoff.
9. Split Prototype One into dedicated modules and add focused component tests once behaviour becomes interactive.
10. Design source-of-record boundaries for later Pipedrive read sync without production writes.

## Data Boundary

Prototype One currently uses static mock data only. Future live integration should start with read-only views or APIs and a clear provenance model before any controlled write-back is considered.
