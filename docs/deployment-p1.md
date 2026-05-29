# Prototype One Deployment Lane

## Purpose

`p1.diwa.zeczi.ai` is the off-production lane for DIWA Prototype One.

Use it for fast iteration on the Eco Lawn-native CRM/workspace direction without disturbing the existing `diwa.zeczi.ai` app or the current `/v3` and `/v4` surfaces.

## Current Boundary

- Mock data only.
- No Pipedrive writes.
- No customer sends.
- No accounting writes.
- No destructive production operations.
- Public deployment and DNS changes require Gareth approval.

## Intended Routing

- Main DIWA app: `https://diwa.zeczi.ai`
- Prototype One: `https://p1.diwa.zeczi.ai`
- Local prototype routes inside this app: `/prototype-one` and `/p1`

## Docker Lane

The compose file supports a second container by overriding environment variables:

- `ZECZI_DIWA_IMAGE=zeczi-diwa-p1:local`
- `ZECZI_DIWA_CONTAINER_NAME=zeczi-diwa-p1`
- `ZECZI_DIWA_HOST_PORT=5181`

Build and run with those variables against `docker-compose.yml`. This keeps the existing `zeczi-diwa` container default intact while allowing a parallel P1 service.

## Caddy Target

Once DNS points at the host, Caddy can route `p1.diwa.zeczi.ai` to `127.0.0.1:5181` with the same security headers used by the main DIWA route.

## DNS

Create a Cloudflare DNS record for `p1.diwa.zeczi.ai` pointing at the same public host as `diwa.zeczi.ai`, after confirming the live host target.

Do not guess the record. Confirm the host target first, then apply the record.

## Promotion Rule

Prototype One should not replace the main DIWA app automatically.

Promotion path:

1. Build and review in `p1`.
2. Capture Gareth feedback.
3. Convert feedback into the next prototype plan.
4. Promote only selected stable surfaces into `diwa.zeczi.ai`.
