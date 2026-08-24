# Phase 6A — Environment & Config Audit: Verified Findings

**Status: documentation only.** No code changed as part of this write-up. Fixes below are
recommendations for a future approval-gated task, not yet implemented, per instruction.

Produced by a 5-dimension audit (inventory, `.env.example` completeness, secret hygiene,
boot-time validation, client-bundle exposure), each independently adversarially
re-verified by re-reading the cited files. All findings below carry a `CONFIRMED` verdict
from the verification pass (no finding was refuted or only partially confirmed).

---

## Headline risks

### 1. No boot-time environment validation (Warning)
There is no central env schema anywhere in the codebase — no `zod` env schema (despite
`zod` already being a dependency), no `@t3-oss/env`, no `validateEnv()`, no
`src/instrumentation.ts`. Every variable is read ad-hoc via bare `process.env.X` at its
point of use, with no guard.

**Impact:** a misconfigured production deploy **boots successfully** and only fails
lazily, at the first request that touches the missing variable:
- `DATABASE_URL` missing → Prisma throws on the **first DB query** (e.g. the first lead
  submission or the first CMS page render), not at startup. `src/lib/db.ts:14-18`.
- `NEXTAUTH_SECRET` missing → NextAuth v4 logs `[next-auth][error][NO_SECRET]` and
  **500s on auth routes**, discovered only when someone hits `/admin/login`.
  `src/lib/auth.ts:52`.
- `ADMIN_USERNAME`/`ADMIN_PASSWORD` missing at seed time → seed silently skips admin
  creation (`scripts/seed-cms.ts:53-59`, console.warn only) → **no way to log into the
  admin panel**, discovered only when someone tries.
- `TELEGRAM_BOT_TOKEN`/`TELEGRAM_CHAT_ID` missing → lead notifications silently stop
  (lead is still saved; `delivered:false` returned but not surfaced to the end user) —
  an operator would not know without checking server logs.

**Important correction to the initial framing:** verification confirmed these are
**lazy-failure / silent-degradation gaps, not insecure defaults.** Specifically:
- `NEXTAUTH_SECRET` missing does **not** cause NextAuth to run with an insecure static
  secret in production — v4 throws/500s instead of falling back. This *is* still a
  problem (see below), just not the "insecure default" framing.
- `ADMIN_USERNAME`/`ADMIN_PASSWORD` missing is **fail-safe** — no backdoor account is
  ever created; the failure mode is operator lockout, not unauthorized access.

**Recommended fix (not yet implemented):** a small `zod`-based env schema validated once
at startup (e.g. via `src/instrumentation.ts` `register()`) that throws immediately if
`DATABASE_URL`/`NEXTAUTH_SECRET`/`NEXTAUTH_URL` are missing in production, and logs a
clear warning (not a hard failure) if `ADMIN_*`/`TELEGRAM_*` are missing. This converts
"silent failure discovered by a user" into "deploy fails fast with a clear message."

### 2. `NEXTAUTH_URL` required in production, no safe fallback (Warning)
Because `next.config.ts` sets `output: "standalone"` and the app is self-hosted
(`bun .next/standalone/server.js` behind a reverse proxy), NextAuth v4 **cannot
auto-infer the host**. `NEXTAUTH_URL` is an implicit requirement (documented in
`.env.example:25`, not read directly in app code — it's a NextAuth v4 convention).

**Impact:** if unset or wrong, admin login callback/redirect URLs resolve to the wrong
origin (often `localhost`) behind the proxy, breaking admin sign-in. No crash — a
confusing, hard-to-diagnose redirect failure instead.

**Recommended fix:** include `NEXTAUTH_URL` in the same boot-time validation as above.

### 3. `.env.example` ships two dangerous "working" placeholder defaults (Warning)
- `ADMIN_PASSWORD="change-me-strong-password"` (`.env.example:22`) — this is a **literal
  value that will actually work** if a deploy copies `.env.example` → `.env` and forgets
  to change it. `scripts/seed-cms.ts:55-65` bcrypt-hashes it verbatim into the `AdminUser`
  row, creating a real, publicly-guessable admin login.
- `NEXTAUTH_SECRET=""` (`.env.example:24`) — empty by default; if left empty, production
  auth breaks (see #1). The `openssl rand -base64 32` comment above it is good guidance
  but not enforced.

**Recommended fix:** change `ADMIN_PASSWORD`'s example value to something that visibly
**cannot** work by accident (e.g. leave empty — the seed already no-ops safely on empty
per `seed-cms.ts:56-58`), so a copy-paste-and-forget deploy fails safe instead of
succeeding insecurely.

---

## Full verified findings by dimension

### A. Environment variable inventory — CONFIRMED (11 vars, all correctly consumed)
| Variable | Scope | Required? | Notes |
|---|---|---|---|
| `DATABASE_URL` | server | **Required** | Prisma datasource; `schema.prisma` pins `provider="sqlite"` — a Postgres URL only takes effect via the `*:pg` build scripts, not the default `build` |
| `NEXTAUTH_SECRET` | server | **Required (prod)** | JWT signing; no insecure fallback; v4 errors if unset in prod |
| `NEXTAUTH_URL` | server | **Required (prod)** | Implicit NextAuth v4 convention; needed because the app is self-hosted standalone behind a proxy |
| `ADMIN_USERNAME` / `ADMIN_PASSWORD` | server | Required at **seed time** only | Not read by the running server; skip-safe if unset |
| `DIRECT_URL` | server | Optional | Only used for pooled Postgres (PgBouncer/serverless); correctly conditional |
| `NEXT_PUBLIC_SITE_URL` | client+build | Optional | Falls back to `https://jetour.mn`; must be set **before `next build`** (inlined) |
| `NEXT_PUBLIC_META_PIXEL_ID` | client | Optional | Pixel simply doesn't load if empty |
| `TELEGRAM_BOT_TOKEN` / `TELEGRAM_CHAT_ID` | server | Optional | Graceful degradation — lead still saved, notification skipped |
| `NODE_ENV` | server | Framework-managed | Correctly suppresses Prisma query logging (and lead PII) in production |

### B. `.env.example` completeness — CONFIRMED
- ✅ No required variable is missing; no obsolete/unused variable present.
- ✅ Dev (SQLite) vs. production (PostgreSQL) is clearly documented, naming the exact
  matching npm scripts (`db:generate:pg`, `db:push:pg`, `build:pg`).
- ⚠️ `ADMIN_PASSWORD` insecure working placeholder (see Headline #3).
- ⚠️ `NEXTAUTH_SECRET` empty-by-default (see Headline #1/#3).
- 🔵 *Future improvement:* no commented localhost variant for `NEXTAUTH_URL` /
  `NEXT_PUBLIC_SITE_URL` (both hardcoded to the production domain).
- 🔵 *Future improvement:* default `ADMIN_USERNAME="admin"` is guessable (low risk — seed
  default only).
- 🔵 *Future improvement:* no explicit staging-tier guidance (acceptable for a
  single-domain site).

### C. Secret hygiene — CONFIRMED clean, with one historical note
- ✅ No `.env*` file (other than `.env.example`) is currently tracked in git.
- ✅ `.gitignore` correctly ignores `.env*` and re-includes `!.env.example`.
- ✅ No secret literal (bot token, connection string, PEM key, bcrypt hash) exists
  anywhere in the last 50 revisions of git history or in current source.
- ⚠️ **Historical note:** a `.env` file **was tracked** from the initial commit through
  commit `60fe9c9`, and removed in `143e6d8` ("chore: .env-г git мөрдөлтөөс хасав").
  Verified its full historical content: only `DATABASE_URL=file:/home/z/my-project/db/custom.db`
  and an empty `NEXT_PUBLIC_META_PIXEL_ID=`. **No credential was ever exposed** — this is
  benign, and no history rewrite is needed. Flagged only so the pattern (never track real
  `.env`) stays reinforced going forward.

### D. Boot-time validation — CONFIRMED gap (see Headline #1)
No validation exists; every critical variable fails lazily rather than at startup. None
of the failure modes are "insecure defaults" — `NEXTAUTH_SECRET` errors rather than
falling back, and missing admin credentials fail safe (lockout, not a backdoor). The gap
is purely about **when** a misconfiguration is discovered (first request vs. deploy time).

### E. Client-bundle exposure — CONFIRMED clean
- ✅ Only two `NEXT_PUBLIC_*` variables exist (`NEXT_PUBLIC_SITE_URL`,
  `NEXT_PUBLIC_META_PIXEL_ID`), both non-secret by nature.
- ✅ Every server-only secret (`NEXTAUTH_SECRET`, `TELEGRAM_BOT_TOKEN`,
  `TELEGRAM_CHAT_ID`) is referenced only in server files with no `"use client"` directive,
  and is not imported (directly or transitively) into any client component.
- ✅ `ADMIN_PASSWORD` is never read by the running server at all — only by the seed
  script, and only to produce a bcrypt hash stored in the DB. `DATABASE_URL`/`DIRECT_URL`
  are consumed only by Prisma.

---

## Summary table

| Area | Verdict |
|---|---|
| Required vars documented in `.env.example` | ✅ Complete |
| Secrets never committed (current + history) | ✅ Complete (one benign historical note) |
| Client bundle never exposes a secret | ✅ Complete |
| Boot-time validation of required vars | ⚠️ **Warning — does not exist** |
| `NEXTAUTH_URL` required-in-prod, no fallback | ⚠️ **Warning — documented but unenforced** |
| `.env.example` placeholder safety | ⚠️ **Warning — `ADMIN_PASSWORD` example is a working weak password** |

**No Critical findings.** The three Warnings above are the candidate follow-up work; per
instruction, none have been implemented — this document is audit output only, for you to
decide whether/when to act on.
