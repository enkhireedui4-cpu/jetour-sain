# Phase 3 — Sitemap: Jetour Mongolia

Builds on [Phase 1 research](phase-1-research.md) and [Phase 2 UX strategy](phase-2-ux-strategy.md). This is a structural document — URLs, hierarchy, page purpose, navigation grouping. No visual design or component layout decisions are made here; those belong to Phase 4.

Per instruction, **the existing sitemap is not preserved as a baseline** — this is designed from the personas, journey, and IA principles established in Phase 2, then checked against the current site only to decide what to keep, merge, split, or remove, with the reasoning made explicit in §6.

---

## 1. Design principles behind this sitemap

Carried forward as binding constraints, not suggestions:

1. **Minimal top-level nav (4–6 items max)** — every premium brand studied in Phase 1 (Volvo, Genesis, Tesla, Zeekr) keeps the primary nav to a handful of items; secondary content nests one level deeper rather than crowding the header.
2. **The largest persona gets the most direct path.** Phase 2 ranked "Comparison Shopper" as the largest segment — the sitemap must give this persona a fast way to compare models, not just browse them one at a time.
3. **Owners is a fully separate branch**, not a nested link under a sales-oriented dropdown (Phase 2 §2, Persona D).
4. **Financing is elevated**, not buried, for the same reason (Phase 2, Persona C).
5. **Single-dealer reality shapes the IA** — no locator, no multi-store selector; the Dealer page's job is orientation and trust, not choice (Phase 2 §8).
6. **Every page ends in a next step.** No dead-end nodes — this rule applies to the sitemap itself: every leaf page must have an outbound path to a conversion action or a related page.
7. **Trust is structural, not a single page.** Warranty and distributor-credential content needs its own addressable, linkable location (so it can be referenced from everywhere else), in addition to being repeated inline elsewhere.
8. **URLs stay in Latin script** (existing convention: `/models`, `/financing`, `/owners`) — labels in the UI are Mongolian, but slugs stay short, stable, and Latin for shareability and SEO consistency with the existing site.

---

## 2. Full sitemap tree

```
/ (Home)
│
├── /models                              Загварууд — lineup listing (mega-menu doubles as this)
│   ├── /models/x70-plus                 Model detail (single page, anchor sections — see §5)
│   ├── /models/x50                      Model detail
│   ├── /models/x1                       Model detail
│   ├── /models/t1                       Model detail
│   └── /models/[future-model]           Same template, CMS-driven — no sitemap change needed to add a model
│
├── /compare                             ★ NEW — side-by-side spec comparison (2–3 models)
│
├── /special-offers                      Тусгай саналууд — offers listing
│   └── /special-offers/[id]             Offer detail
│
├── /financing                           Санхүүжилт — calculator + bank partners + application (single page)
│
├── /owners                              Эзэмшигчдэд — owner hub (landing + overview cards)
│   ├── /owners/service                  ★ SPLIT OUT — service booking + service info
│   ├── /owners/parts                    ★ SPLIT OUT — parts order + original-parts messaging
│   └── /owners/warranty                 ★ NEW — full warranty terms, coverage, claim FAQ
│
├── /test-drive                          ★ NEW — standalone booking page (campaign landing + universal CTA target)
│
├── (dropdown) Бидний тухай / Company
│   ├── /brand                           Брэндийн тухай — JETOUR global story, Travel+, timeline, MN distributor story
│   ├── /dealer                          Дилер / Шоурум — the one showroom: photos, map, hours, directions
│   └── /news                            Мэдээ — news listing
│       └── /news/[slug]                 Article detail
│
├── /privacy                             ★ NEW — Нууцлалын бодлого (data privacy — forms collect phone/financial data)
├── /terms                               ★ NEW — Үйлчилгээний нөхцөл
│
└── /admin/*                             Out of scope — internal CMS, not part of the public IA (unchanged, unlinked from public nav)
```

**Legend:** ★ NEW = does not exist today. ★ SPLIT OUT = exists today as a tab/section, promoted to its own URL. Everything else already exists as a route and is being kept, in most cases relocated in the navigation (see §6).

---

## 3. Primary navigation (desktop)

Five clickable top-level items, one dropdown, one persistent CTA — matching the "4–6 items" ceiling from Phase 1/Phase 2:

| Position | Label (MN) | Target | Type |
|---|---|---|---|
| 1 | **Загварууд** | `/models` (mega menu shows all models as image tiles + price; clicking the label itself goes to `/models`) | Primary nav item + mega menu |
| 2 | **Тусгай саналууд** | `/special-offers` | Primary nav item |
| 3 | **Санхүүжилт** | `/financing` | Primary nav item |
| 4 | **Эзэмшигчдэд** | `/owners` | Primary nav item |
| 5 | **Бидний тухай** | dropdown | Dropdown: Брэндийн тухай (`/brand`) · Дилер / Шоурум (`/dealer`) · Мэдээ (`/news`) |
| — | **Тест драйв захиалах** | `/test-drive` (or in-context model form) | Persistent CTA button, not a nav link — always visually distinct from the 5 items above |
| — | Phone / WhatsApp icons | `tel:`, `wa.me` | Utility icons, header-right, always visible |

### Why this differs from Phase 2's draft ordering
Phase 2 listed six top-level items with Brand, Dealer, and News as three separate entries. Phase 3 folds Brand + Dealer + News into one "Бидний тухай" dropdown. Rationale: all three are *discovery/trust* content rather than *transactional* content — none of them carry a persona-critical CTA the way Models, Offers, Financing, and Owners do. Grouping them:
- Keeps the primary nav at 5 clickable items (within the Phase 1 "4–6 item" ceiling with room to spare)
- Matches the exact pattern Hyundai, Kia, and Genesis use (brand storytelling and newsroom content nested one level under a discovery umbrella, never competing with transactional items for top billing)
- Does not bury any of the three — a dropdown one hover/tap away is still one interaction, not a lost destination

### Why Compare is new
Phase 2 identified the "Comparison Shopper" as the **largest** persona segment, yet the current site has zero tooling for comparing models against each other — a visitor must open each model page in a separate tab and manually cross-reference specs. Given only 4–6 models, a lightweight compare tool (pick 2–3 models, see specs/price/financing side by side) is cheap to build from data that already exists in the CMS ([cms.ts](../../src/lib/cms.ts) `CmsCarModel.specs`) and directly serves the single largest audience. This is treated as a **core addition**, not optional — it's the most consequential new page in this sitemap.

### Why Test Drive is a standalone page, not just a form embedded per-model
Every model page's lead form already supports test-drive booking with the model pre-filled — that flow stays and remains the primary path for Persona B (Ready Buyer) arriving via a model page. A **standalone `/test-drive`** additionally serves:
- Facebook/Instagram ad campaigns that want a direct, focused landing page rather than routing through a full model page (matches the Genesis `/schedule-test-drive` and Zeekr `/test-drive` pattern from Phase 1)
- Visitors who know they want a test drive but haven't picked a model yet — the page can offer model selection as the first step (visual tiles, per Phase 2 §9) rather than forcing a detour through `/models` first
- A single, memorable URL for word-of-mouth ("aвдаа jetour.mn/test-drive гэж бичээд явна уу")

---

## 4. Mobile navigation

Mobile nav is a full-screen drawer (already the pattern in [navbar.tsx](../../src/components/jetour/navbar.tsx) — preserved), with this content order, flattened from the desktop hierarchy:

```
[Загварууд — model thumbnail grid, 2 columns, tap any model → /models/[id]]
[Тусгай саналууд]
[Санхүүжилт]
[Эзэмшигчдэд]
[Бидний тухай — expandable accordion: Брэндийн тухай / Дилер / Мэдээ]
─────────────
[Утас: 7277-8855]  ← tap-to-call, always visible without scrolling the drawer
[Тест драйв захиалах] ← full-width primary button, bottom of drawer, never requires scrolling to find
```

The model mega-menu's image-grid pattern is preserved on mobile (already implemented) rather than collapsed to a plain text list — per Phase 1, model thumbnails in the mobile drawer meaningfully outperform text-only links for a visual-purchase category like vehicles.

---

## 5. Page-by-page purpose

One row per node. "Primary CTA" is the single highest-priority action on that page per the Phase 2 CTA hierarchy (§6 of that document).

| Page | Primary persona(s) | Purpose | Primary CTA |
|---|---|---|---|
| `/` Home | A, B, C | Orientation + trust + fast routing to the right persona path | Тест драйв захиалах (hero) |
| `/models` | A, B | Browse full lineup, compare at a glance, pick a model to go deep | Дэлгэрэнгүй үзэх (per card) |
| `/models/[id]` | B (primary), A | Full case for one model — anchors: Overview → Exterior → Interior → Technology → Colors → Specs → Financing → Warranty → FAQ → Related models → Lead form (per Phase 2 §4, unchanged here) | Тест драйв захиалах (sticky bar) |
| `/compare` | A | Resolve "which Jetour model" without opening 3 tabs | Дэлгэрэнгүй үзэх → specific model, or Тест драйв захиалах directly |
| `/special-offers` | A, B | Current promotions, price anchoring | Дэлгэрэнгүй мэдээлэл (per offer) |
| `/special-offers/[id]` | A, B | One offer's full terms | Хүсэлт илгээх |
| `/financing` | C (primary), A | Calculator, bank comparison, demystify affordability | Зээлийн өргөдөл илгээх |
| `/owners` | D | Hub: warranty summary + two action cards (Service, Parts) + link to full warranty page | Засвар захиалах / Сэлбэг захиалах |
| `/owners/service` | D | Book a service appointment, see service scope/intervals | Засвар захиалах |
| `/owners/parts` | D | Order original parts | Сэлбэг захиалах |
| `/owners/warranty` | D, A, C (trust reference) | Full warranty terms — also link-target from badges elsewhere on the site | Холбоо барих (for claims) |
| `/test-drive` | A, B | Dedicated booking flow, model-optional at entry | Тест драйв баталгаажуулах |
| `/brand` | A (trust-building), general | JETOUR global story + Travel+ positioning + MN distributor credentials | Загварууд үзэх |
| `/dealer` | B, D | De-risk the first visit: real photos, map, hours, directions, contact | Залгах / Google Map харах |
| `/news` | A (light), SEO | Brand credibility content, low-frequency browsing | (per article) Унших |
| `/news/[slug]` | — | One article; ends in contact CTA + related articles | Холбоо барих |
| `/privacy` | — (compliance) | Legal — what data is collected via lead forms and why | — |
| `/terms` | — (compliance) | Legal — terms of use | — |

---

## 6. What changed vs. the current site, and why

Explicit accounting, since the instruction was not to default to preserving the current structure.

### Kept as-is (already correct)
- `/`, `/models/[id]`, `/special-offers` + `/special-offers/[id]`, `/financing`, `/brand`, `/dealer`, `/news` + `/news/[slug]` — all structurally sound; only their **navigation grouping** changes (see below), not their URLs or core purpose.
- Single-page-with-anchors pattern for model detail pages — Phase 1 shows this is how BMW, Genesis, and Volvo structure model pages at this scale (only Toyota, with 30+ models, fragments into child routes like `/camry/features/`). At 4–6 models, fragmenting into `/models/x70-plus/gallery`, `/models/x70-plus/specs`, etc. would add navigation overhead with no corresponding benefit — **explicitly rejected**.
- Mobile drawer nav with model-thumbnail grid — already matches best practice, no structural change needed.

### Relocated
- **News, Brand, Dealer** move from being scattered across two separate top-level dropdowns ("Бидний тухай" and "Худалдан авагчдад") into one consolidated "Бидний тухай" dropdown. Current site's "Худалдан авагчдад зориулсан" dropdown mixed an anchor-scroll action (`/#dealer`, meant to jump to a test-drive-adjacent contact block) with a real page (`/financing`) — conflating a CTA with a navigational destination. This sitemap separates the two entirely: Financing is now its own top-level nav item, and the test-drive action lives at the persistent CTA button / `/test-drive`, never inside a content dropdown.
- **Owners** moves from a nested position (previously reachable only via a secondary dropdown or footer link) to a full top-level nav item — direct implementation of Phase 2 Persona D requirement.

### Split out (new URLs, existing content)
- `/owners/service` and `/owners/parts` — currently implemented as a tab-switcher on one `/owners` page. Splitting into real URLs:
  - Lets each rank independently for distinct search intent ("jetour сэлбэг захиалах" vs. "jetour засвар үйлчилгээ")
  - Gives each a clean, focused lead form without a tab click required first
  - `/owners` becomes a true hub (overview + two cards routing to the above) rather than doing double duty as both hub and form

### New
- `/compare` — highest-priority addition; see §3 rationale (largest persona, zero current tooling).
- `/test-drive` — standalone booking surface for campaign traffic and model-undecided visitors; see §3 rationale.
- `/owners/warranty` — warranty terms need a stable, linkable address so the "4 жил / 150,000 км" trust signal (Phase 2 §7) can be hyperlinked from the homepage, every model page, and the lead form, rather than only existing as inline text with no detail page behind it.
- `/privacy`, `/terms` — currently absent entirely. The site collects name, phone, email, and in the financing flow, income-adjacent financial figures (loan amount, down payment) through multiple forms — a legal privacy/terms pair is a baseline requirement for a lead-generation site handling this class of data, not an optional nicety.

### Removed / not carried forward
- The overloaded `/#dealer` anchor as a dual-purpose "contact section" and "test drive scroll target" is retired as a navigation destination. The homepage still has a contact/showroom-preview section (that's a Phase 4 layout decision, not a sitemap one), but it's no longer the thing every "test drive" link points to — those now point to `/test-drive` or the in-context model lead form.
- Nothing else is removed. Every current top-level destination survives; only grouping and depth change.

### Explicitly considered and rejected
- **Dealer locator / multi-store selector** — irrelevant at one showroom (Phase 2 §8); would add UI complexity solving a problem we don't have.
- **Fragmenting model pages into sub-routes** — rejected at this catalog size (see "Kept as-is" above).
- **Global site search** — with ~20 total content pages and 4–6 models, a search feature would be solving a discovery problem the nav and mega menu already solve; not worth the added surface area.
- **Language switcher** — site is Mongolian-only by design; no multi-market requirement exists.

---

## 7. Footer sitemap (secondary navigation)

The footer carries the full site map in miniature, plus utility links not important enough for primary nav but which every page should still surface once, at the bottom:

```
JETOUR                    Загварууд           Эзэмшигчдэд         Компани
[logo]                    X70 Plus            Засвар захиалах     Брэндийн тухай
Дуудлагын төв: 7277-8855  X50                 Сэлбэг захиалах     Дилер / Шоурум
Ажиллах цаг: ...          X1                  Баталгаа            Мэдээ
И-мэйл: ...                T1                                     
                          Бүх загвар харах →                     
                                                                   
                          Худалдан авахад     Хууль ёсны
                          Санхүүжилт          Нууцлалын бодлого
                          Тусгай саналууд     Үйлчилгээний нөхцөл
                          Тест драйв захиалах
                          Загвар харьцуулах
─────────────────────────────────────────────────────────────
[Instagram] [WhatsApp] [YouTube] [Facebook]        © JETOUR Mongolia
```

This matches Phase 1's "repeat CTAs as an icon row in the footer" finding (Kia's Build/Test Drive/Finance/Brochure/Find Dealer footer pattern) — the footer is a real conversion surface for anyone who scrolled to the bottom without converting, not just a legal-links dumping ground.

---

## 8. URL/slug conventions

| Rule | Example |
|---|---|
| Latin slugs, lowercase, hyphen-separated | `/models/x70-plus`, `/owners/service` |
| Model IDs match existing CMS IDs — no renaming | `x70-plus`, `x50`, `x1`, `t1` (per [cms.ts](../../src/lib/cms.ts)) |
| No trailing content-type suffixes | `/news/[slug]` not `/news/articles/[slug]` |
| New sub-sections nest one level under their parent, never two | `/owners/service`, not `/owners/service/booking` |
| No query-string-driven pages for primary content | `/compare` may accept `?models=x70-plus,x50` to preselect, but the page itself is a real route, not solely a query-param view |

---

## 9. Out of scope (unchanged, not part of this sitemap)

- `/admin/*` and all protected CMS routes — internal tooling, not public IA, no changes proposed.
- API routes (`/api/*`) — implementation detail, not a navigable sitemap concern.

---

## Summary — what carries forward to Phase 4

1. Five top-level nav items (Models, Offers, Financing, Owners, Company-dropdown) + persistent Test Drive CTA + phone/WhatsApp utility icons.
2. Two new core pages to design: `/compare` and `/test-drive` — both need full page designs in Phase 4, not just a content slot.
3. `/owners` restructures from single-page-with-tabs into a hub + two action pages (`/owners/service`, `/owners/parts`) + one reference page (`/owners/warranty`).
4. Legal pages (`/privacy`, `/terms`) need at minimum a simple, on-brand template — not elaborate, but present.
5. Footer is a full secondary sitemap + CTA row, not just legal links — Phase 4 needs a footer layout that reflects the complete tree in §7.
6. Model detail pages keep their single-page-with-anchors structure (Phase 2 §4's anchor order stands unchanged).
7. Mobile nav keeps its current drawer + model-thumbnail-grid pattern, now including the Owners and Company-dropdown restructuring reflected in flattened form.

**This concludes Phase 3.** No visual design or component layout has been produced. Ready for Phase 4 (visual design system / page-by-page layout) on your go-ahead.
