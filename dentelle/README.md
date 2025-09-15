# Dentelle — ESPP Assist with Investor Pool (Monorepo)

This repo contains a pnpm monorepo with three apps:
- apps/contracts — Hardhat + Solidity contracts
- apps/backend — NestJS + Prisma + BullMQ backend APIs and jobs
- apps/frontend — Next.js 14 frontend with three role portals

## Prereqs
- Node.js 20+
- pnpm 9+
- Docker (for Postgres/Redis)

## Bootstrap
- Copy `.env.example` to `.env` at repo root and fill values as needed.
- Start infra: `docker compose up -d`
- Install deps: `pnpm install`
- Generate Prisma client: `pnpm -C apps/backend prisma:generate`
- Run DB migrations: `pnpm -C apps/backend prisma:migrate`
- Seed sample data: `pnpm -C apps/backend prisma:seed`

## Development
- Run everything concurrently:
  - `pnpm dev`
  - Frontend: http://localhost:3000
  - Backend: http://localhost:3001
  - Contracts: Hardhat local node on http://localhost:8545

Useful one-offs:
- Compile/test contracts: `pnpm -C apps/contracts build && pnpm -C apps/contracts test`
- Deploy contracts (local): `pnpm -C apps/contracts deploy:local`

## Structure
- Root tooling: ESLint, Prettier, EditorConfig, pnpm workspaces
- Infra: Postgres 15, Redis 7, Adminer at http://localhost:8080
- Contracts: EspRulebook, InvestorCommitmentRegistry, DistributionAnchor; Base Sepolia config
- Backend: NestJS modules for auth, plans, roster, enrollment, funding, broker, purchase, investors, contracts
- Frontend: Next.js App Router portals (Employer, Employee, Investor) + Audit panel

## Notes on Business Logic
- Sell-to-cover formula, allocation engine, and anchoring are stubbed with placeholders; implement math and validations next.
- No PII goes on-chain; use salted/opaque IDs in events and manifests.

## Acceptance Tests (to add next)
- Employee enrollment flows and cap checks (unit)
- Per-pay job creates Advance rows and emits on-chain ContributionRecorded (integration with mock chain)
- Purchase-day flow from instruction creation to anchoring (integration with mock broker)
- Investor commit → pro-rata allocation and statement generation after settlement

## Security & Non-functional
- Role-based guards (JWT dev-only) and input validation (Zod planned)
- Idempotent jobs (design for re-runs) and audit event persistence (table included)

---
This is an MVP scaffold to enable iterative build-out of logic and UIs.
