# Jetour Mongolia — Testing Strategy & Coverage Plan

**Phase 5, Task A deliverable.** Audit + plan produced *before* any test is written.
Scope rule: no redesign, no UI change, no business-logic change (except verified bug fixes).

---

## 1. Current state

| Aspect | Finding |
|---|---|
| Test runner | **None** (`vitest`/`jest` not installed, no `test` script) |
| Component testing | **None** (`@testing-library/*` absent) |
| E2E | **None** (`playwright` absent) |
| Existing tests | **0 files** (`*.test.*`, `*.spec.*`, `__tests__/`, `e2e/` — none) |
| Current line coverage | **0%** |

Clean slate — no legacy test debt to migrate.

## 2. Recommended stack

| Layer | Tool | Rationale |
|---|---|---|
| Unit / integration | **Vitest** + `vite-tsconfig-paths` | ESM-native, zero-config TS, resolves the `@/` alias, fast watch. Lowest friction with Next 16 / React 19 (Jest needs extra ESM/RSC config). |
| DOM env | **happy-dom** (or jsdom) | Component rendering without a browser. |
| Component | **@testing-library/react** + `@testing-library/user-event` + `@testing-library/jest-dom` | Behaviour-focused rendering & interaction. |
| API route mocking | Vitest `vi.mock` on `@/lib/db`, `next-auth` | Test route handlers as plain functions; no live DB. |
| E2E | **Playwright** | Cross-browser, mobile viewport, admin login, network stubbing. |
| A11y | **@axe-core/playwright** | WCAG AA automated checks inside E2E. |
| Perf regression | **@lhci/cli** (Lighthouse CI) + a bundle-size guard + an image-dimension guard | Budgets fail the build on regression. |

All dev-dependencies; nothing ships to the production bundle.

## 3. Surface audit → coverage assignment

Legend: **Risk** = business impact if it breaks. **Task** = which Phase-5 sub-task covers it.

### Business logic / utilities (→ Task B, unit)
| Target | What to cover | Risk | Task |
|---|---|---|---|
| `lib/leads.ts` `leadSchema` | phone 7–12 digits, email optional-or-empty, enum default `general`, coercion of finance numbers | 🔴 Critical (lead capture) | B |
| `lib/leads.ts` `formatTelegramLead` | markdown escaping of `_*[]\``, conditional lines, number `toLocaleString` | 🔴 | B |
| `lib/leads.ts` `getLeadValidationMessage` | first-issue message, fallback | 🟡 | B |
| `lib/cms.ts` transformers `parseDetailsJson` / `shapeCarModel` / `shapeNews` / `shapePromotion` | malformed-JSON fallback, defaults, published filter mapping | 🔴 (CMS integrity) | B\* |
| `hooks/use-toast.ts` `reducer` | ADD/UPDATE/DISMISS/REMOVE, `TOAST_LIMIT` | 🟡 | B |
| `hooks/use-garage.ts` `useGarage` | add/remove, `COMPARE_MAX=3` cap, localStorage persistence | 🟡 (compare) | B/C |
| `lib/utils.ts` `cn` | class merge/dedupe | 🟢 | B |
| `lib/jetour-data.ts` `ALL_MODELS_FOR_GRID` | available-only + order sort invariant | 🟢 | B |

\* `cms.ts` transformers are currently **not exported** (only the `cache()` getters are). Testing them cleanly needs a **one-line-per-function `export`** (pure functions, zero behaviour change) — flagged as a decision in §6.

### API routes (→ Task D)
| Route | Cases | Risk | Task |
|---|---|---|---|
| `POST /api/lead` | valid→`{ok,saved,delivered}`; invalid→400 w/ message; **429 after 5/min**; Telegram failure must not block DB save; DB failure isolated | 🔴 | D |
| `GET /api/lead` | metadata shape | 🟢 | D |
| `GET /api/public/models` | available-only, lightweight shape, **`Cache-Control` header present** (P3/A5) | 🟡 | D |
| `GET/POST /api/admin/models` | 401 without session; list ordered; create validates id/JSON, 409 duplicate | 🔴 (auth) | D |
| `GET/PUT/DELETE /api/admin/models/[id]` | 401; 404 missing; update/delete happy + error | 🔴 | D |
| `/api/admin/news`, `/api/admin/offers`, `/api/admin/leads(+[id])` | same auth + validation matrix | 🔴 | D |
| `lib/auth.ts` `authorize` | null on missing creds / unknown user / bad bcrypt; success shape | 🔴 | D |

### Components (→ Task C)
| Component | What to verify | Risk |
|---|---|---|
| `enhanced-lead-form.tsx` | renders fields; client validation; submit → `fetch('/api/lead')` (mocked); success/error toast; model list fetch on mount | 🔴 |
| `vehicle-card.tsx` | renders name/price/image, correct detail link | 🔴 |
| `navbar.tsx` | mega-menu open/close, mobile drawer, model fetch | 🟡 |
| `models.tsx` | grid renders N cards, CTA | 🟡 |
| `compare-tray.tsx` (+`use-garage`) | add/remove/limit, compare link | 🟡 |
| `news.tsx`, `home-highlights.tsx` | list rendering, empty state | 🟢 |
| `components/ui/*` (shadcn) | **Excluded** — vendored primitives, upstream-tested | — |

### Pages / E2E (→ Task E, Playwright)
Homepage `/` · `/models` browsing · `/models/[id]` detail (color/gallery) · lead submission flow (fill → submit → confirmation) · `/news` + `/news/[slug]` · `/special-offers` + `/[id]` · desktop mega-nav · **mobile navigation drawer** · `/admin/login` (form + failed/successful auth).

### Cross-cutting
- **Perf regression (Task F):** bundle-size budget; Lighthouse budgets (Perf ≥95, A11y 100, BP 100, SEO 100); **image-dimension guard** (assert `public/**` images ≤1920px longest edge — locks in P3-1); API p95 smoke.
- **A11y (Task G):** axe on `/`, `/models`, `/models/[id]`, lead form, `/admin/login`; keyboard nav + focus order + aria + WCAG AA.
- **CI (Task H):** GitHub Actions — install → lint → typecheck → **prisma validate** → build → unit/component/api (Vitest) → (E2E/a11y/LHCI as separate jobs). Pipeline fails on any red.

## 4. Coverage targets

| Category | Target |
|---|---|
| `lib/leads.ts`, `lib/cms.ts` transformers | **≥ 95%** lines |
| Other `lib/*` pure utils + hooks reducers | **≥ 80%** |
| API route handlers | **100% of routes**, ≥ 85% branches |
| Critical components (lead form, vehicle card, navbar) | rendering + key interactions |
| E2E | all flows in §Pages green in Chromium + one mobile project |
| Overall statements (excluding `components/ui/*`, static data) | **≥ 70%** |

## 5. Execution order (one task per approval, per Phase-5 rules)
**B** unit → **C** component → **D** API → **E** E2E → **F** perf → **G** a11y → **H** CI wiring.
Each lands in its own commit; no task combines with another.

## 6. Decisions required before Task B
1. **Confirm stack:** Vitest + Testing Library + Playwright (recommended) vs Jest.
2. **`cms.ts` transformers:** allow adding `export` to the 4 pure transformer functions (no behaviour change) so they're unit-testable in isolation? Alternative: test them only indirectly through Prisma-mocked getters (lower fidelity).
3. **E2E DB:** run Playwright against the SQLite dev DB with a seed (`scripts/seed-cms.ts`) — confirm acceptable, or provision a disposable Postgres.

## 7. Risks (of the testing effort itself)
- **React 19 / Next 16 + Testing Library** peer-dependency alignment — pin known-good versions.
- **Server Components** can't mount in jsdom; RSC pages are covered by **E2E**, not component tests (by design here).
- **Playwright** needs a running server + seeded data → slower CI; isolated into its own job.
- Zero risk to production runtime: all additions are devDependencies + new files under `tests/`.
