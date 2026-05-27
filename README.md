# ZECZI DIWA

DIWA is the Deal Intelligence Workspace Application for the ZECZI platform.

This repo starts as a product shell and first cockpit slice. It intentionally borrows the ZECZI/MCP portal visual language while keeping DIWA as its own application boundary.

## Current Scope

- ZECZI-branded DIWA app shell
- First static deal intelligence cockpit
- Workspace, deal context, human required, automation, and source-link surfaces
- Local-first prototype before Docker or production deployment work

## Commands

```bash
npm install
npm run dev
npm run build
```

## Docker

```bash
docker compose build
docker compose up -d
curl http://127.0.0.1:5180/healthz
```

The container serves the built React app through nginx. It is intended to sit behind the ZECZI host reverse proxy for staging/live access.

## Product Direction

DIWA sits above and alongside CRM, communication tools, quoting systems, and operational knowledge bases.

The CRM remains the system of record. DIWA becomes the system of context, prioritisation, action, and AI-assisted decision-making.
