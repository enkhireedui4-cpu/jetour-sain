# Phase 1 — Performance Audit (Server Performance & Image Optimization)

Lead-engineer audit of the **actual codebase** (inspected, not assumed). No optimizations applied in this pass — audit only, per instruction.

**Already in place** (do not re-recommend): `next/image` across all content images with AVIF/WebP + responsive `sizes`; Meta Pixel deferred to `lazyOnload`; `dns-prefetch` hints; complete sitemap/robots. **In-flight from the previous session** (applied, needs verification under `next build`): `export const revalidate` on 9 data pages; `placeholder="blur"` on hero/showcase/card/gallery/parallax/model-hero images.

**Cannot measure Lighthouse from this environment** — every "Estimated gain" below is an engineering estimate tied to the metric it moves, not a measured number. First real action in the optimize phase must be to *measure* (Lighthouse CI + bundle analyzer) to get a baseline.

Priority: **P0** = production-blocking, **P1** = high, **P2** = medium, **P3** = low.

---

## Findings (ranked)

### P0-1 — Database is SQLite; `db.ts` singleton not applied in production
- **Current problem:** `datasource db { provider = "sqlite" }`, `DATABASE_URL=file:../db/custom.db`. Your stated stack is **PostgreSQL + Vercel/VPS**. Also [db.ts](../../src/lib/db.ts) only caches the Prisma client in **dev** (`if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db`) — in serverless production every invocation makes a new client.
- **Impact:** On Vercel serverless, a file-SQLite DB is read-only/ephemeral → **all writes (leads, admin) fail**, and ISR/SSG can't regenerate. On any serverless target, a new `PrismaClient` per request **exhausts DB connections** on Postgres. This is a hard production blocker, not a perf nicety.
- **Priority:** P0.
- **Estimated gain:** Prevents production outage / connection storms; enables ISR at all. (Correctness before speed.)
- **Recommended solution:** Move to Postgres (Neon/Supabase) or the already-half-wired **Turso/libSQL** (deps `@libsql/client`, `@prisma/adapter-libsql` are present). Cache the Prisma singleton on `globalThis` in **all** environments; for Postgres serverless use pooling (Prisma Accelerate / PgBouncer / Neon pooled URL).

### P0-2 — Prisma query logging enabled in production
- **Current problem:** [db.ts:10](../../src/lib/db.ts) `log: ['query']` — logs every SQL query, always.
- **Impact:** On DB-heavy ISR/SSR pages this adds latency + massive log volume + risk of leaking lead PII (phones) into logs. Directly hurts **TTFB / Server Load**.
- **Priority:** P0 (trivial fix, high consequence).
- **Estimated gain:** Lower TTFB on every server render; clean prod logs.
- **Recommended solution:** `log: process.env.NODE_ENV === 'development' ? ['query','error','warn'] : ['error']`.

### P1-1 — Monolithic 1,217-line client component on the highest-value page
- **Current problem:** [model-detail-client.tsx](../../src/app/models/%5Bid%5D/model-detail-client.tsx) is **1,217 lines, entirely `"use client"`** — the whole vehicle detail page (hero, statement, galleries, variant selector, color configurator, specs, FAQ, forms, footer) hydrates as one giant island. Its parent `page.tsx` is a server component that just renders this monolith.
- **Impact:** The most important, most-visited page ships and hydrates ~1.2k lines of JS before it's interactive → hits **TTI / INP / TBT / Bundle Size** hardest exactly where conversions happen.
- **Priority:** P1.
- **Estimated gain:** Large TBT/TTI reduction on model pages; most of the page becomes static server HTML.
- **Recommended solution:** Convert the page to a **server component shell** (hero, statement, specs table, warranty, related — all static) and extract only the genuinely interactive parts into small client islands: `VariantSelector`, `ColorConfigurator`, `Gallery/ShowcaseSlider`, `StickySummary`, the lead form. This is the single biggest client-JS win available.

### P1-2 — "Content" sections are client components only to animate
- **Current problem:** 16 public components import `framer-motion`; sections like [brand-story](../../src/components/jetour/brand-story.tsx), [global-stats](../../src/components/jetour/global-stats.tsx), [news](../../src/components/jetour/news.tsx), [contact](../../src/components/jetour/contact.tsx), [explore-nav](../../src/components/jetour/explore-nav.tsx) are `"use client"` **purely for scroll reveals**. 63 public files are client-side total.
- **Impact:** framer-motion (~40KB gz) + hydration cost is paid on the homepage for largely static content → **Bundle Size / TBT / INP / TTI**.
- **Priority:** P1.
- **Estimated gain:** Meaningful homepage JS reduction; less main-thread work.
- **Recommended solution:** Replace scroll-reveal-only usage with a tiny CSS/IntersectionObserver reveal (the `.reveal` utility already exists) so these become **server components**. Reserve framer-motion for genuinely interactive/gesture components (hero carousel, parallax). Consider `optimizePackageImports: ['framer-motion','lucide-react']` in `next.config`.

### P1-3 — Redundant client-side fetch of `/api/public/models`, uncached
- **Current problem:** [navbar.tsx](../../src/components/jetour/navbar.tsx) and [enhanced-lead-form.tsx](../../src/components/jetour/enhanced-lead-form.tsx) both `fetch("/api/public/models")` on mount; the route ([route.ts](../../src/app/api/public/models/route.ts)) returns JSON with **no `Cache-Control`**.
- **Impact:** Every page load fires a client→server→DB round-trip for data already available server-side → a request waterfall after hydration, extra **server load**, and a late-populating mega menu. Hurts **INP / server load**.
- **Priority:** P1.
- **Estimated gain:** Removes 1–2 DB-hitting client requests per page; instant mega menu.
- **Recommended solution:** Pass the model list from a server layout/component (props or React `cache()`), or at minimum add `Cache-Control: s-maxage=600, stale-while-revalidate` and `export const revalidate` to the route. Best: hydrate the navbar list from server data, drop the client fetch.

### P1-4 — No `loading.tsx` / Suspense boundaries anywhere (no streaming)
- **Current problem:** Zero `loading.tsx`, `error.tsx`, or Suspense boundaries on the public app (only admin login uses Suspense). The `.skeleton` utility built earlier is **unused**.
- **Impact:** DB-fetch pages block the entire response until data resolves → worse **FCP / LCP / perceived load**; no graceful skeleton; a slow query stalls the whole page.
- **Priority:** P1.
- **Estimated gain:** Faster FCP + instant skeleton on navigation; isolates slow data.
- **Recommended solution:** Add `loading.tsx` (route-level skeletons using the existing `.skeleton` class) for `/`, `/models`, `/models/[id]`, `/news`, `/special-offers`; wrap below-fold data reads in `<Suspense>` where useful.

### P1-5 — Font payload: 6 Inter weights × (Latin + Cyrillic)
- **Current problem:** [layout.tsx:12](../../src/app/layout.tsx) loads weights `300,400,500,600,700,800` for subsets `latin,cyrillic`.
- **Impact:** ~6 weight files across two subsets is a large font transfer competing with LCP; 300 and 500 are barely used.
- **Priority:** P2 (borders P1 on slow MN mobile networks).
- **Estimated gain:** Smaller critical transfer; faster text paint (FCP/LCP).
- **Recommended solution:** Trim to the weights actually in the design system — 400 / 600 / 700 / 800 (drop 300, 500). `next/font` already self-hosts + `display: swap` (good). Verify `preload` on the primary subset.

### P2-1 — Two offer posters still raw `<img>` without dimensions (CLS)
- **Current problem:** The featured-slider poster ([offers-client.tsx](../../src/app/special-offers/offers-client.tsx)) and the full poster ([offer-detail-client.tsx](../../src/app/special-offers/%5Bid%5D/offer-detail-client.tsx)) are intentionally still `<img>` (unknown aspect ratio) with no width/height.
- **Impact:** Layout shift as posters load → **CLS** on the offers pages; no AVIF/WebP for those images.
- **Priority:** P2.
- **Estimated gain:** Removes CLS on offer pages; smaller poster transfer.
- **Recommended solution:** Give them a fixed aspect container + `next/image` with `fill` (or capture real intrinsic dimensions and use `width/height`). Reserve space to prevent shift.

### P2-2 — Big static-content pages shipped as full client bundles
- **Current problem:** `brand-client.tsx` (368), `owners-client.tsx` (215), `dealer-client.tsx` (238), `financing-client.tsx` (325) are `"use client"`; brand/owners/dealer are ~static content that's client only for framer-motion.
- **Impact:** Unnecessary JS + hydration for near-static pages → **Bundle / TTI**.
- **Priority:** P2.
- **Estimated gain:** Converts several pages to mostly-static server HTML.
- **Recommended solution:** Same pattern as P1-2 — server page + CSS reveals, keep only truly interactive bits (financing calculator, owners tab switch) as small islands.

### P2-3 — No production build verification; `ignoreBuildErrors` masks failures
- **Current problem:** `typescript.ignoreBuildErrors: true` and `reactStrictMode: false` in [next.config.ts](../../next.config.ts); `next build` has never been run/verified this cycle.
- **Impact:** Type-broken or dynamic-rendering regressions can ship silently; can't confirm which routes are static/ISR/dynamic without a build.
- **Priority:** P2.
- **Estimated gain:** Reveals the real rendering strategy per route + catches regressions.
- **Recommended solution:** Run `next build`, read the route table (○ Static / ● SSG / ƒ Dynamic), fix what it surfaces, then set `ignoreBuildErrors: false` and `reactStrictMode: true`.

### P2-4 — No `optimizePackageImports` for heavy icon/animation libs
- **Current problem:** `lucide-react` and `framer-motion` used broadly; `next.config` has no `experimental.optimizePackageImports`.
- **Impact:** Risk of pulling larger barrels into client bundles → **Bundle Size**.
- **Priority:** P2.
- **Estimated gain:** Smaller per-route JS via better tree-shaking.
- **Recommended solution:** `experimental: { optimizePackageImports: ['lucide-react','framer-motion','date-fns'] }`.

### P3-1 — Deploy target ambiguity (`output: "standalone"` vs Vercel)
- **Current problem:** `output: "standalone"` + a `copy-standalone-assets.mjs` build step (VPS/Docker pattern), while the stated target includes Vercel.
- **Impact:** On Vercel `standalone` is ignored (harmless) but signals an undecided target; the copy step is dead weight there.
- **Priority:** P3.
- **Recommended solution:** Pick one. Vercel → drop `standalone` + the copy step. VPS/Docker → keep it and document the Node runtime + reverse proxy.

### P3-2 — Root layout ships FloatingCTA + Toaster on every route
- **Current problem:** [layout.tsx](../../src/app/layout.tsx) mounts `<FloatingCTA/>` and `<Toaster/>` globally (both client).
- **Impact:** Small always-on JS; negligible but non-zero.
- **Priority:** P3.
- **Recommended solution:** `next/dynamic` (ssr:false) for FloatingCTA (below-fold, non-critical) and Toaster.

---

## Summary table

| # | Problem | Metric(s) | Priority | Est. gain |
|---|---|---|---|---|
| P0-1 | SQLite + no prod Prisma singleton | Correctness, Server Load | **P0** | Unblocks prod / prevents connection storms |
| P0-2 | Prisma `log:['query']` in prod | TTFB, Server Load | **P0** | Lower TTFB, clean logs |
| P1-1 | 1,217-line client model page | TTI, INP, TBT, Bundle | **P1** | Large — most of page → static |
| P1-2 | Content sections client-only for animation | Bundle, TBT, INP | **P1** | Meaningful homepage JS ↓ |
| P1-3 | Redundant uncached `/api/public/models` fetch | INP, Server Load | **P1** | −1–2 DB requests/page |
| P1-4 | No loading.tsx / Suspense / streaming | FCP, LCP | **P1** | Faster FCP, skeletons |
| P1-5 | 6 font weights × 2 subsets | FCP, LCP | **P2/P1** | Smaller critical transfer |
| P2-1 | 2 offer posters raw `<img>` | CLS | **P2** | Removes CLS on offers |
| P2-2 | Static pages as full client bundles | Bundle, TTI | **P2** | Several pages → static |
| P2-3 | `ignoreBuildErrors` / no build verify | Correctness | **P2** | Reveals rendering strategy |
| P2-4 | No `optimizePackageImports` | Bundle | **P2** | Smaller per-route JS |
| P3-1 | standalone vs Vercel ambiguity | Build | **P3** | Cleaner deploy |
| P3-2 | Global FloatingCTA/Toaster | Bundle | **P3** | Minor JS ↓ |

---

## Recommended execution order (for the optimize phase — awaiting your go-ahead)

1. **P0-2** Prisma log flag (1 line) and **P0-1** DB/singleton decision (Postgres vs Turso) — correctness + server load first.
2. **P1-3** kill the redundant client `/api/public/models` fetch (server-provide the list).
3. **P1-1** decompose the model page into a server shell + client islands.
4. **P1-4** add `loading.tsx` skeletons + Suspense.
5. **P1-2 / P2-2** move animation-only sections/pages to server + CSS reveal.
6. **P1-5** trim font weights; **P2-4** optimizePackageImports; **P2-1** posters → next/image.
7. **P2-3** run `next build`, read route table, flip `ignoreBuildErrors`/`reactStrictMode`.
8. **P3** deploy-target + dynamic-import cleanup.

**No code changed in this task.** Ready to start the optimize phase in the order above — say go, and I'll begin at P0 and verify each before moving on.
