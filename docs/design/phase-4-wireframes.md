# Phase 4 — Wireframes: Jetour Mongolia

Builds on [Phase 1 research](phase-1-research.md), [Phase 2 UX strategy](phase-2-ux-strategy.md), and [Phase 3 sitemap](phase-3-sitemap.md). This document defines structure and behavior only — **no color, typography styling, imagery treatment, or visual design decisions appear anywhere below.** Every box, label, and emphasis level describes layout and hierarchy, not appearance. Visual design is Phase 5.

Every page in the [Phase 3 sitemap](phase-3-sitemap.md) is covered. Global chrome (header, footer, floating CTA, lead form, sticky sub-nav) is specified once in §0 and referenced by every page thereafter, rather than redrawn in full each time.

---

## 0. Conventions

### 0.1 Breakpoints
| Name | Width | Nav behavior | Grid behavior |
|---|---|---|---|
| Desktop | ≥1280px | Full horizontal nav, mega menu opens on hover | 3–4 column grids |
| Tablet (landscape) | 1024–1279px | Full horizontal nav, mega menu opens on hover | 2–3 column grids |
| Tablet (portrait) | 768–1023px | Hamburger drawer, tap-to-open menus | 2 column grids |
| Mobile | <768px | Hamburger drawer | 1 column, sticky bottom CTA bar appears |

"Tablet" wireframes below show the **portrait** case (the more common tablet browsing orientation and the one that diverges most from desktop); landscape is noted inline as "behaves like Desktop with N columns" wherever it differs only in column count.

### 0.2 Global header
Two states, every page:

```
STATE A — top of Home only, hero underneath (transparent, overlays hero imagery)
┌────────────────────────────────────────────────────────────────────┐
│ [Logo]   Загварууд▾  Тусгай санал  Санхүүжилт  Эзэмшигчдэд  Тухай▾  │
│                                            ☎  WhatsApp  [Тест драйв]│
└────────────────────────────────────────────────────────────────────┘

STATE B — scrolled, or any non-home page (opaque, sits above content)
┌────────────────────────────────────────────────────────────────────┐
│ [Logo]   Загварууд▾  Тусгай санал  Санхүүжилт  Эзэмшигчдэд  Тухай▾  │  ← identical layout, opaque background
│                                            ☎  WhatsApp  [Тест драйв]│
└────────────────────────────────────────────────────────────────────┘
```
- **Interaction:** "Загварууд▾" opens a mega panel on hover (desktop/tablet-landscape) or tap (tablet-portrait/mobile): grid of model thumbnails + name + starting price, each linking to `/models/[id]`. "Тухай▾" opens a small dropdown (Брэндийн тухай / Дилер / Мэдээ). Header state transitions from A→B on scroll past hero height; transition is instant to state B on any non-home page (no state A elsewhere).
- **Tablet portrait / Mobile:** collapses to `[Logo] ··· [☰]`. Tapping ☰ opens a full-screen drawer (see §0.2.1). The "Тест драйв" high-emphasis button is dropped from the header itself on the smallest widths (it lives in the drawer and in the floating CTA instead) to avoid crowding.

**0.2.1 Mobile/tablet-portrait drawer**
```
┌──────────────────────────┐
│ [X Close]                │
├──────────────────────────┤
│ ЗАГВАРУУД                │
│ ┌────┐ ┌────┐            │
│ │IMG │ │IMG │  (2-col    │
│ │name│ │name│   thumbnail│
│ │price│ │price│  grid)   │
│ └────┘ └────┘            │
├──────────────────────────┤
│ Тусгай саналууд        › │
│ Санхүүжилт             › │
│ Эзэмшигчдэд            › │
│ Бидний тухай           ⌄ │ (expands accordion: Брэнд / Дилер / Мэдээ)
├──────────────────────────┤
│ ☎ 7277-8855              │
│ [ Тест драйв захиалах ]  │ ← full-width, always visible without scrolling drawer
└──────────────────────────┘
```

### 0.3 Global footer
```
┌──────────────────────────────────────────────────────────────────┐
│ [Logo]         Загварууд        Эзэмшигчдэд      Компани          │
│ ☎ 7277-8855    X70 Plus         Засвар захиалах  Брэндийн тухай   │
│ Цаг: ...       X50               Сэлбэг захиалах  Дилер / Шоурум  │
│ И-мэйл: ...    X1                Баталгаа         Мэдээ           │
│                T1                                                 │
│                Бүх загвар →      Худалдан авахад   Хууль ёсны     │
│                                   Санхүүжилт        Нууцлалын бодлого│
│                                   Тусгай саналууд   Үйлчилгээний нөхцөл│
│                                   Тест драйв захиалах               │
│                                   Загвар харьцуулах                │
├──────────────────────────────────────────────────────────────────┤
│ [Instagram][WhatsApp][YouTube][Facebook]        © JETOUR Mongolia │
└──────────────────────────────────────────────────────────────────┘
```
- **Tablet:** 5 columns → 3 columns (Logo/contact spans full width above, remaining 3 groups side by side).
- **Mobile:** single column, each group as a collapsed accordion (`Загварууд ⌄`, `Эзэмшигчдэд ⌄`, `Компани ⌄`) to avoid a very long scroll of link text; social icons + copyright always visible, uncollapsed, at the very bottom.

### 0.4 Floating CTA (persistent, all pages, all breakpoints)
```
Desktop/Tablet:                  Mobile:
        ┌───┐                     (same stack, positioned to
        │ ☎ │                      clear the bottom sticky bar
        ├───┤                      when one is present — see 0.6)
        │WA │
        ├───┤
        │TD │  ← expands from a single FAB on tap/click
        └───┘
   (bottom-right, fixed)
```
- **Interaction:** collapsed to one circular trigger by default; tapping/clicking expands three stacked actions (Call, WhatsApp, Test Drive) upward; tapping again or tapping outside collapses it. Never obscures the sticky bottom CTA bar on pages that have one (§0.6) — the two coexist by vertical offset.

### 0.5 Lead form (shared component, five variants)
One component, fields conditionally shown per variant, per the existing [enhanced-lead-form.tsx](../../src/components/jetour/enhanced-lead-form.tsx) logic — carried forward structurally, with two behavior changes from Phase 2 §9:

```
┌────────────────────────────────────┐
│ [Form title]                       │
│ [subtitle / response-time promise] │  ← NEW: "Манай баг 24 цагийн дотор
│                                     │     холбогдоно" shown BEFORE submit,
│ Нэр *          Утас *               │     not only in the success state
│ [__________]   [__________]        │
│                                     │
│ Сонирхсон загвар (if applicable)    │
│ [ model thumbnail chips, not a    ] │  ← CHANGED: visual chips replace
│ [ dropdown — tap to select        ] │     the current <select> where the
│                                     │     variant is test-drive/compare-origin
│ Огноо *        Цаг (chips, not    │  ← CHANGED: "Өглөө / Өдөр / Орой /
│ [__________]    a 21-item dropdown)│     Хэзээ ч болно" chip row
│  [Өглөө][Өдөр][Орой][Хэзээ ч болно]│
│                                     │
│ Харилцах хэрэгсэл: [Утас][Msngr][WA]│
│                                     │
│ Нэмэлт мэдээлэл                    │
│ [___________________________]      │
│                                     │
│ [   Илгээх — primary emphasis   ]  │
│ Таны мэдээлэл зөвхөн JETOUR-тай     │
│ холбоотой зорилгоор ашиглагдана.   │
│ Нууцлалын бодлого →                │  ← NEW: links to /privacy
└────────────────────────────────────┘
```
- **Variants:** `test-drive` (date+time chips required, model preselected if arriving from a model/compare page), `info-request` (name+phone only, everything else optional), `financing` (attaches calculator output silently, no date/time), `service` / `parts` (date+time for service only, adds a free-text field for parts requested).
- **Interaction:** inline validation on blur (not on every keystroke); submit button shows a loading state; on success the form is replaced in place by a confirmation panel with a "submit another request" reset — this is unchanged from current behavior and is correct.

### 0.6 Sticky sub-nav + CTA bar (long pages only: Model detail, Financing, Owners hub)
```
Desktop/Tablet — appears pinned directly under the global header once the page
scrolls past the hero:
┌────────────────────────────────────────────────────────────┐
│ [Model name]   Тойм  Гадна  Дотор  Технологи  Үзүүлэлт  ... │[Тест драйв]│
└────────────────────────────────────────────────────────────┘

Mobile — becomes a bottom-pinned bar instead (thumb reach), anchors collapse
to a horizontally-scrollable chip row, CTA is always the full-width element:
┌──────────────────────────────┐
│ ‹ Тойм › Гадна › Дотор › ... │  (scrollable chip row, top-pinned)
└──────────────────────────────┘
              ⋮ page content ⋮
┌──────────────────────────────┐
│    [ Тест драйв захиалах ]   │  ← bottom-pinned, full width, always visible
└──────────────────────────────┘
```

---

## 1. Home — `/`

**Purpose:** Orient every persona in the first two screens and route each to their fastest path — model exploration (A/B), financing (C), or ownership (D) — while establishing brand trust early enough that it colors everything below.

**Content hierarchy:** 1. What Jetour offers right now (hero/model) 2. Full lineup at a glance with price 3. Trust/credibility signal 4. Current offers 5. Why-us differentiation 6. Path to financing/ownership 7. Brand story depth 8. News (lowest priority, last).

**Sections:** Header (state A) → Hero carousel → Model showcase strip → Trust/warranty stat band → Offers strip → Why-us grid → Brand story teaser → Showroom/contact preview → News teaser → Footer.

**CTA:** Primary — Тест драйв захиалах (hero + model showcase). Secondary — Дэлгэрэнгүй үзэх (every card). Tertiary — Бүх загвар/Бүх санал/Бүх мэдээ "see all" links, call/WhatsApp icons.

**User flow:** Arrival → hero communicates "this is a real, current lineup" within one screen → scroll reveals full model set with price (resolves Persona A's #1 question fast) → trust band answers "is this legitimate" → offers/why-us build the case → contact/showroom section de-risks visiting → footer/news are exit ramps for the already-convinced or the not-yet-ready.

**Interaction:** Hero is an auto-advancing carousel (pauses on hover/touch, resumes after), draggable/swipeable on touch. Model showcase is a tab strip — selecting a tab crossfades the showcase image and swaps copy without a page load. Trust stat cards animate into view once on first scroll-into-viewport (no repeat replay). All "see all" links are plain navigational links, not modal triggers.

**Desktop:**
```
┌──────────────────────────────────────────────────────────────┐
│ HEADER (state A, transparent over hero)                       │
├──────────────────────────────────────────────────────────────┤
│                    HERO — full-bleed, carousel                │
│                    Model name / tagline                        │
│         [Тест драйв захиалах]   [Дэлгэрэнгүй үзэх]              │
│                    ● ● ● ●  ‹ ›                                │
├──────────────────────────────────────────────────────────────┤
│ Танд тохирох JETOUR загвар                                     │
│ [X70 Plus] [X50] [X1] [T1]  ← tab strip                        │
│ ┌────────────────────────────────────────────────────────┐   │
│ │            full-width showcase image                     │   │
│ │  Model name · Price       [spec][spec][spec]              │   │
│ │  [Дэлгэрэнгүй үзэх]  [Тест драйв]                          │   │
│ └────────────────────────────────────────────────────────┘   │
├──────────────────────────────────────────────────────────────┤
│ [4 жил/150,000км баталгаа] [Албан ёсны дистрибьютер] [4S төв] [7 хоног] │
├──────────────────────────────────────────────────────────────┤
│ Тусгай саналууд                                  [Бүх санал →]│
│ [card] [card] [card] [card]  ← 4-col grid                      │
├──────────────────────────────────────────────────────────────┤
│ Яагаад бид?                                                    │
│ [card] [card] [card]                                            │
│ [card] [card] [card]  ← 3-col grid                              │
├──────────────────────────────────────────────────────────────┤
│  image collage      │  JETOUR — Аялал бүрийг                   │
│  + floating stat     │  илүү сайхан болгоно                     │
│  card                │  paragraph · mini stats                  │
│                       │  [Дэлгэрэнгүй үзэх]                       │
├──────────────────────────────────────────────────────────────┤
│  contact card         │  showroom photo + map embed              │
│  (phone/address/hours)│                                          │
├──────────────────────────────────────────────────────────────┤
│ Сүүлийн үеийн мэдээ                                             │
│ [card] [card] [card]              [Бүх мэдээ →]                 │
├──────────────────────────────────────────────────────────────┤
│ FOOTER (§0.3)                                                   │
└──────────────────────────────────────────────────────────────┘
                                          [Floating CTA §0.4]
```

**Tablet (portrait):** Hero unchanged (still full-bleed, single message). Model tab strip becomes horizontally scrollable if 4+ tabs don't fit. Trust stat band: 4 → 2×2 grid. Offers: 4 → 2 columns. Why-us: 3 → 2 columns (one card wraps to a second row). Brand story and contact sections stack to single column (image above text, map above card) instead of side-by-side. News: 3 → 2 columns.

**Mobile:** Every multi-column grid becomes a single column or a horizontally-swipeable carousel (offers, why-us, news each become swipe carousels with dot indicators rather than stacked cards, to avoid an extremely long scroll). Model showcase tabs become a horizontally-scrollable chip row. Trust stat band: 2×2 grid retained (small enough to stay a grid rather than needing a carousel). Floating CTA and no separate bottom bar on Home (Home has no sticky sub-nav — that pattern is reserved for long single-topic pages per §0.6).

---

## 2. Model listing — `/models`

**Purpose:** Let Persona A/B see the entire lineup in one place and jump straight to the model (or comparison) that fits, without relying on the mega menu (this page is the non-hover, fully-indexable equivalent).

**Content hierarchy:** 1. Full lineup visible without filtering (only 4–6 models — filtering would be over-engineering) 2. Price per model 3. One differentiating line per model (body style / positioning) 4. Path to compare 5. Path to individual model.

**Sections:** Header → Page intro (short headline, one line) → Model grid → Compare prompt band → Footer.

**CTA:** Primary — Дэлгэрэнгүй үзэх (per card, since this page's job is routing, not converting directly). Secondary — Загвар харьцуулах (compare prompt). Tertiary — Тест драйв захиалах available per card as a smaller secondary action for Persona B who already knows which model they want.

**User flow:** Arrival (nav click, direct link, or search) → scan all models at once → either click through to one model (decided) or click "Загвар харьцуулах" (undecided, wants to see specs side by side) → both paths lead deeper into the funnel, neither is a dead end.

**Interaction:** No filtering/sorting controls (catalog is small enough that they'd add complexity without value — an explicit Phase 3 decision). Cards are static, no carousel — this page's value is seeing everything at once, not browsing sequentially.

**Desktop:**
```
┌──────────────────────────────────────────────────────────────┐
│ HEADER (state B)                                               │
├──────────────────────────────────────────────────────────────┤
│ Загварууд                                                       │
│ Танд тохирох JETOUR-г эндээс сонгоно уу.                        │
├──────────────────────────────────────────────────────────────┤
│ [card: img/name/price/  [card]              [card]              │
│  one-line positioning/                                          │
│  Дэлгэрэнгүй / Тест драйв]                                      │
│ [card]                  [card]                                  │
│  ← 3-column grid, uniform card ratio across all models           │
├──────────────────────────────────────────────────────────────┤
│ Аль загвар тохирохоо мэдэхгүй байна уу?                          │
│ [ Загвар харьцуулах → ]                                          │
├──────────────────────────────────────────────────────────────┤
│ FOOTER (§0.3)                                                    │
└──────────────────────────────────────────────────────────────┘
```

**Tablet:** 3-column grid → 2-column grid; everything else unchanged in order.

**Mobile:** 2-column grid → single column, full-width cards stacked; compare prompt band becomes a full-width banner card rather than a slim strip (needs enough tap area on a small screen).

---

## 3. Model detail — `/models/[id]`

**Purpose:** Make the complete case for one model and convert into a test drive or an info-request lead — the highest-stakes page on the site (Persona B's primary destination, Persona A's deep-dive destination).

**Content hierarchy (per Phase 2 §4, restated as this page's structure):** 1. Name + price/financing hint + immediate CTA 2. Emotional positioning statement 3. Exterior 4. Interior 5. Technology (benefit-framed, not spec bullets) 6. Color options 7. Full specifications (detail-seekers only) 8. Model-specific financing terms 9. Warranty reminder 10. FAQ 11. Related models 12. Lead form.

**Sections:** Header → Hero → Sticky sub-nav appears on scroll (§0.6) → Statement → Exterior gallery → Interior gallery → Technology highlights → Color configurator → Full specifications → Financing terms → Warranty band → FAQ accordion → Related models → Lead form → Footer.

**CTA:** Primary — Тест драйв захиалах, present in hero, in the sticky bar (persists through the entire scroll), and again at the closing lead form. Secondary — Үнийн жагсаалт / Дэлгэрэнгүй specs jump-link in hero. Tertiary — Хүсэлт илгээх as the lead form's alternate submit intent for visitors not ready to commit to a date.

**User flow:** Arrival (nav, mega menu, `/models`, `/compare`, or ad) → hero establishes the model + price immediately → visitor either jumps via sticky sub-nav to the section they care about (spec-focused visitor) or scrolls linearly (narrative visitor) → color configurator lets them personalize before committing → FAQ resolves remaining objections → lead form captures intent with the model already attached → related models catch anyone who came to the "wrong" model for their needs.

**Interaction:** Sticky sub-nav anchors scroll-spy to the currently-visible section (highlighting updates as you scroll, not just on click). Exterior/Interior galleries are swipe/arrow-navigable image sliders with a counter ("2/6"), not simultaneous grids. Color configurator: tapping a color swatch crossfades the vehicle image to that color at the same camera angle (no page reload, no layout shift). Specifications render as a collapsed-by-default accordion grouped by category (Powertrain, Dimensions, Safety, etc.) rather than one long flat table. FAQ is an accordion, one item open at a time.

**Desktop:**
```
┌──────────────────────────────────────────────────────────────┐
│ HEADER (state B)                                                │
├──────────────────────────────────────────────────────────────┤
│                 HERO — full-bleed model image                   │
│                 Model name                                       │
│          [Хүсэлт илгээх]   [Үнийн жагсаалт ↓]                    │
├──────────────────────────────────────────────────────────────┤
│ STICKY: [Model name]  Тойм Гадна Дотор Технологи Өнгө Үзүүлэлт   [Тест драйв]│
├──────────────────────────────────────────────────────────────┤
│           Statement — large heading + one paragraph              │
│                    [ wide feature image ]                        │
├──────────────────────────────────────────────────────────────┤
│ Гадна үзэмж                                                      │
│ ┌──────────────────────────────────────────────────────────┐   │
│ │        full-bleed slider, ‹ › arrows, caption, counter      │   │
│ └──────────────────────────────────────────────────────────┘   │
├──────────────────────────────────────────────────────────────┤
│ Дотор салон  — same slider pattern                               │
├──────────────────────────────────────────────────────────────┤
│ Технологи                                                        │
│ [img+title+caption] [img+title+caption] [img+title+caption]      │
├──────────────────────────────────────────────────────────────┤
│ Өнгөний сонголт                                                  │
│ [●Цагаан] [●Хар] [●Саарал] [●Цэнхэр]  ← swatch chips              │
│              [ large vehicle image, crossfades on selection ]    │
├──────────────────────────────────────────────────────────────┤
│ Техник үзүүлэлт                                                  │
│ image (sticky) │ Хөдөлгүүр ⌄  Хэмжээ ⌄  Аюулгүй байдал ⌄  ...     │
│                 │  (accordion groups, collapsed by default)       │
│                 │  Үндсэн үнэ: XX,XXX,XXX₮   [Тест драйв захиалах] │
├──────────────────────────────────────────────────────────────┤
│ Санхүүжилтийн нөхцөл — bank comparison table for this model      │
├──────────────────────────────────────────────────────────────┤
│ [4 жил/150,000км баталгаа] — banner linking to /owners/warranty  │
├──────────────────────────────────────────────────────────────┤
│ Түгээмэл асуулт (FAQ accordion, model-specific + universal)      │
├──────────────────────────────────────────────────────────────┤
│ Төстэй загварууд — [card][card][card]                            │
├──────────────────────────────────────────────────────────────┤
│ Lead form (§0.5, test-drive variant, model preselected)  │ text  │
│                                                            │ column│
├──────────────────────────────────────────────────────────────┤
│ FOOTER (§0.3)                                                    │
└──────────────────────────────────────────────────────────────┘
```

**Tablet:** Sticky sub-nav anchors compress to icon+short-label or a horizontally scrollable row if all anchor labels don't fit at once. Technology grid: 3 → 2 columns. Specifications: two-column (image+accordion) layout stacks to single column (image above, accordion below) below ~1024px. Related models: 3 → 2 columns. Everything else retains desktop's linear order.

**Mobile:** Sticky sub-nav moves to the bottom-pinned pattern from §0.6 (top chip row for anchors, bottom full-width bar for the CTA — splitting what desktop combines into one bar, since both can't fit in a thumb-reachable single row on a small screen). Galleries remain swipeable, full-width. Color swatch chips scroll horizontally if they overflow. Specifications accordion: single column throughout. Financing table becomes horizontally scrollable within its own container rather than shrinking illegibly. Lead form: single column, full width.

---

## 4. Compare — `/compare`

**Purpose:** Resolve Persona A's core question ("which Jetour model, if any, fits me") without requiring them to open multiple tabs — the single highest-priority new page from Phase 3.

**Content hierarchy:** 1. Which models are being compared (always visible) 2. Price/financing side by side 3. Headline specs side by side 4. Full spec table 5. Path to either model's full page or directly to a lead form.

**Sections:** Header → Model picker (select 2–3 from the full lineup) → Sticky comparison header (selected models' names/images/price) → Spec comparison table, grouped by category → Closing CTA band.

**CTA:** Primary — Тест драйв захиалах, available per-model in the sticky comparison header (so a decision can be acted on the instant it's made, without scrolling back up). Secondary — Дэлгэрэнгүй үзэх per model (routes to that model's full detail page for anyone who narrows to one). Tertiary — "add/remove a model" controls within the picker.

**User flow:** Arrival (nav, `/models` prompt band, or a direct link with `?models=` preselected from an ad) → if no models are preselected, a picker prompts selection first (2 minimum, 3 maximum to keep the table legible) → table renders side by side → visitor either commits to one model's CTA directly from the comparison, or clicks through to that model's full detail page for the complete narrative experience before deciding.

**Interaction:** Model picker is a multi-select of thumbnail chips (not checkboxes in a form sense) — tapping toggles selection, live-updating the table below without a page reload. The comparison header stays pinned while scrolling the spec table (so model identity and price are never scrolled out of view while reading specs). Differing values between models can be visually distinguished (Phase 5 concern — structurally, the layout just needs a column per model plus a "difference" affordance, not specified further here since that crosses into visual design).

**Desktop:**
```
┌──────────────────────────────────────────────────────────────┐
│ HEADER (state B)                                                │
├──────────────────────────────────────────────────────────────┤
│ Загвар харьцуулах                                                │
│ Хамгийн ихдээ 3 загвар зэрэг харьцуулна уу.                      │
│ [X70 Plus ✓] [X50 ✓] [X1  ] [T1  ]  ← tap to add/remove          │
├──────────────────────────────────────────────────────────────┤
│ STICKY:        [img/name/price]   [img/name/price]  [+ нэмэх]   │
│                [Тест драйв]        [Тест драйв]                  │
├──────────────────────────────────────────────────────────────┤
│ Хөдөлгүүр ⌄                                                      │
│    Хөдөлгүүрийн хэмжээ    |  value A   |  value B                │
│    Хамгийн их чадал        |  value A   |  value B                │
│ Хэмжээс ⌄                                                        │
│    Урт / Өргөн / Өндөр     |  values     |  values                │
│ Аюулгүй байдал ⌄                                                 │
│    ...                                                            │
│  (grouped accordion rows, same categories as the spec page)      │
├──────────────────────────────────────────────────────────────┤
│ Аль нь тохирсноо мэдэж байна уу?                                 │
│ [Дэлгэрэнгүй X70 Plus →]   [Дэлгэрэнгүй X50 →]                    │
├──────────────────────────────────────────────────────────────┤
│ FOOTER (§0.3)                                                    │
└──────────────────────────────────────────────────────────────┘
```

**Tablet:** With 3 models selected, columns compress; if illegible at 2-model-minimum width, the table becomes horizontally scrollable within its container (first column — spec labels — stays pinned/frozen while scrolling right through model columns, so labels are never lost). Model picker chips wrap to two rows if needed.

**Mobile:** Comparison is fundamentally a side-by-side format, which is the hardest pattern to compress to a phone width. Resolution: cap selection at **2 models** on mobile (not 3), and render the sticky header as two half-width columns; the spec table becomes horizontally scrollable with the label column frozen on the left (same technique as tablet, just more necessary here). This is one of the few places on the site where a mobile-specific constraint (2 vs 3 models) is justified by legibility, not laziness.

---

## 5. Offers listing — `/special-offers`

**Purpose:** Merchandise current promotions for both Persona A (price-motivated) and returning visitors checking "what's new," with a fast path into any offer's detail.

**Content hierarchy:** 1. Featured/newest offer given prominence 2. Full grid of all current offers 3. Path to financing (offers and financing are closely related decisions for this persona).

**Sections:** Header → Featured offer spotlight (carousel if multiple are equally current) → All-offers grid → Financing cross-link band → Footer.

**CTA:** Primary — Дэлгэрэнгүй мэдээлэл (per offer). Secondary — Зээлийн тооцоолуур (cross-link band). Tertiary — direct call/WhatsApp for anyone ready to act on an offer immediately without reading details.

**User flow:** Arrival (nav, homepage strip's "see all") → featured offer sets context → grid lets visitor scan everything current → click-through to one offer's full terms → from there, either a lead form submission or a jump to `/financing` if the offer is finance-structured (e.g., a rate promotion).

**Interaction:** Featured spotlight auto-advances if more than one offer is "featured-worthy" (pauses on interaction, matches Hero's carousel behavior for consistency). Grid cards are static (no carousel) — this page's job, like Models listing, is showing everything at once.

**Desktop:**
```
┌──────────────────────────────────────────────────────────────┐
│ HEADER (state B)                                                │
├──────────────────────────────────────────────────────────────┤
│ Тусгай саналууд                                                  │
│  text: title/desc/CTA        │        poster image (carousel)   │
│  ‹ ›  ● ● ●                   │                                  │
├──────────────────────────────────────────────────────────────┤
│ Бүх санал                                                        │
│ [card][card][card]                                               │
│ [card][card][card]  ← 3-col grid                                 │
├──────────────────────────────────────────────────────────────┤
│ Зээлээр авах уу?  [Зээлийн тооцоолуур →]                          │
├──────────────────────────────────────────────────────────────┤
│ FOOTER (§0.3)                                                    │
└──────────────────────────────────────────────────────────────┘
```

**Tablet:** Featured spotlight's two-column layout (text | image) stacks to single column (text above, image below). Grid: 3 → 2 columns.

**Mobile:** Featured spotlight: single column, image above text (image-first, since the poster itself is often the marketing asset). Grid: single column, full-width cards.

---

## 6. Offer detail — `/special-offers/[id]`

**Purpose:** Give one offer's complete terms and convert directly, without requiring a detour through a model's full detail page.

**Content hierarchy:** 1. Offer terms/price 2. Full poster/creative 3. Any offer-specific specs 4. Lead form.

**Sections:** Header → Back-link → Poster + terms (two-column) → Offer-specific spec table (if applicable) → Lead form → Footer.

**CTA:** Primary — Хүсэлт үлдээх (jumps to the lead form on the same page). Secondary — none competing; this is a focused, single-purpose page.

**User flow:** Arrival (from listing, direct share link, or an ad) → full terms read in one screen → either scroll to the lead form directly or use the jump-CTA → submit.

**Interaction:** "Хүсэлт үлдээх" is an in-page scroll-to-form action, not a route change — keeps the visitor in context rather than navigating away and losing the offer's terms from view.

**Desktop:**
```
┌──────────────────────────────────────────────────────────────┐
│ HEADER (state B)                                                │
├──────────────────────────────────────────────────────────────┤
│ ‹ Тусгай саналууд                                                │
├──────────────────────────────────────────────────────────────┤
│                     [ full poster image ]                        │
├──────────────────────────────────────────────────────────────┤
│ Offer title              │  tagline / positioning statement       │
│ date · price              │                                       │
│ body paragraphs           │                                       │
│ [Хүсэлт үлдээх ↓]         │                                       │
├──────────────────────────────────────────────────────────────┤
│ Техникийн үзүүлэлт (if the offer includes specs)                 │
│ label | value  (2-col rows, zebra)                                │
├──────────────────────────────────────────────────────────────┤
│ Lead form (§0.5, info-request variant, model preattached)        │
├──────────────────────────────────────────────────────────────┤
│ FOOTER (§0.3)                                                    │
└──────────────────────────────────────────────────────────────┘
```

**Tablet:** Two-column (title/terms | tagline) stacks to single column.

**Mobile:** Poster image full-width, everything below stacks single column; back-link becomes a persistent small element near the top rather than requiring a scroll-up to leave.

---

## 7. Financing — `/financing`

**Purpose:** Serve Persona C's entire need in one page — understand affordability, compare bank terms, apply — without requiring a specific model decision first.

**Content hierarchy:** 1. The calculator (immediate, interactive, no scrolling needed to start) 2. Bank partner comparison 3. Application form 4. FAQ.

**Sections:** Header → Intro + calculator (two-column: inputs | live result) → Bank partner grid → Application lead form → FAQ → Footer.

**CTA:** Primary — Зээлийн өргөдөл илгээх (the application form). Secondary — none of the calculator's own controls are "CTAs" in the conversion sense — they're exploratory tools that feed the primary action. Tertiary — direct call for anyone who wants to discuss terms verbally before applying.

**User flow:** Arrival (nav, homepage cross-link, offer detail cross-link, or a model page's financing section "see full calculator") → adjusts sliders, sees a live monthly payment → compares banks → applies, with the calculator's output silently attached to the submission (Phase 2 §10 lead-quality principle) → FAQ available for anyone who wants answers before committing to apply.

**Interaction:** Four sliders (vehicle price, down payment %, term, rate) update the result panel live, with no submit/recalculate button — every input change immediately reflows the output. Bank cards are static comparison, no interaction beyond reading. Applying the calculator's current state to the form below happens automatically (no "copy my numbers" button needed — it's implicit).

**Desktop:**
```
┌──────────────────────────────────────────────────────────────┐
│ HEADER (state B)                                                │
├──────────────────────────────────────────────────────────────┤
│ Санхүүжилт — Өөрийн болгох боломж                                │
├──────────────────────────────────────────────────────────────┤
│ STICKY (appears on scroll): Санхүүжилт  Тооцоолуур Банкууд Өргөдөл│
├──────────────────────────────────────────────────────────────┤
│ Машины үнэ  [═══●══════]      │  Сарын төлөлт: X,XXX,XXX₮          │
│ Урьдчилгаа  [═●══════════]    │  Зээлийн дүн: ...                  │
│ Хугацаа     [══●═════════]    │  Нийт хүү: ...                     │
│ Хүү         [═══●════════]    │  Нийт төлөх дүн: ...                │
├──────────────────────────────────────────────────────────────┤
│ Хамтрагч банкууд                                                 │
│ [Хаан банк card] [ХасБанк card] [Голомт card] [+1 card]           │
│  rate/term/downpayment per card, 4-col grid                       │
├──────────────────────────────────────────────────────────────┤
│ text: benefits list       │  Lead form (§0.5, financing variant,   │
│                             │  calculator output attached silently) │
├──────────────────────────────────────────────────────────────┤
│ Түгээмэл асуулт (FAQ accordion)                                  │
├──────────────────────────────────────────────────────────────┤
│ FOOTER (§0.3)                                                    │
└──────────────────────────────────────────────────────────────┘
```

**Tablet:** Calculator's two-column (sliders | result) stacks to single column, result panel directly below sliders (not off to the side, so the live update is still visually adjacent). Bank grid: 4 → 2 columns.

**Mobile:** Calculator: single column throughout; sliders use full-width touch-friendly tracks. Result panel sits directly below all four sliders, not interleaved (avoids the result jumping around visually as each slider is touched). Bank grid: single column, cards stacked. Sticky sub-nav uses the bottom-bar mobile pattern from §0.6, with "Өргөдөл" (Apply) as the persistent CTA rather than "Тест драйв" (this page's conversion goal differs from a model page's, so the pinned CTA label changes to match).

---

## 8. Owners hub — `/owners`

**Purpose:** Give Persona D a single, calm landing point that is structurally separate from the sales funnel — routes to service, parts, or warranty without any vehicle-purchase messaging competing for attention.

**Content hierarchy:** 1. Confirmation this is the right place ("for existing owners") 2. Three clear paths: Service / Parts / Warranty 3. Showroom hours/contact (owners need this as much as buyers do) 4. FAQ.

**Sections:** Header → Intro (brief, owner-addressed) → Three-card router (Service / Parts / Warranty) → Service hours/contact reminder → FAQ → Footer.

**CTA:** Primary — the three router cards themselves are the primary action (each leads to its own focused page). No single "highest" CTA dominates this page — it's intentionally a fork, not a funnel toward one action.

**User flow:** Arrival (nav, direct link, post-purchase communication) → immediately see the three options → pick one → land on a focused sub-page with its own form.

**Interaction:** Router cards are large, tap/click-anywhere targets (not just a small button inside each card) — this page has few decisions, so each one should be easy to hit.

**Desktop:**
```
┌──────────────────────────────────────────────────────────────┐
│ HEADER (state B)                                                │
├──────────────────────────────────────────────────────────────┤
│ Эзэмшигчдэд зориулсан булан                                      │
│ Засвар, сэлбэг, баталгааны мэдээлэл — бүгд нэг дор.               │
├──────────────────────────────────────────────────────────────┤
│ [ Засвар захиалах  ]  [ Сэлбэг захиалах  ]  [ Баталгаа  ]         │
│  card: icon+title+     card: icon+title+     card: icon+title+   │
│  one-line desc         one-line desc         one-line desc       │
├──────────────────────────────────────────────────────────────┤
│ Ажлын цаг                  │  Холбоо барих                       │
│ Даваа-Баасан: ...            ☎ ✉ 📍                                │
│ Бямба: ...                                                        │
│ Ням: ...                                                          │
├──────────────────────────────────────────────────────────────┤
│ Түгээмэл асуулт (FAQ accordion)                                  │
├──────────────────────────────────────────────────────────────┤
│ FOOTER (§0.3)                                                    │
└──────────────────────────────────────────────────────────────┘
```

**Tablet:** Three-card router: stays 3 across if width allows (≥768px comfortably fits 3 cards at reduced width), else wraps to 2+1. Hours/contact: stacks to single column.

**Mobile:** Three-card router stacks to single column, full width — each card tall enough to remain an easy tap target.

---

## 9. Owners — Service — `/owners/service`

**Purpose:** Book a service appointment with minimum friction; secondary job is informing what service actually covers (so the request that arrives is well-specified).

**Content hierarchy:** 1. What service covers (brief, scannable) 2. Booking form 3. Hours/contact for anyone who'd rather call.

**Sections:** Header → Back-to-hub link → Service scope (short list, not a wall of text) → Booking form → Hours reminder → Footer.

**CTA:** Primary — Засвар захиалах (the form's submit). Secondary — direct call for anyone who prefers to book by phone.

**User flow:** Arrival (from `/owners` hub, direct link) → scan what's covered → fill form (model, branch — auto-filled since there's one branch, date, time chip) → submit → confirmation with response-time promise.

**Interaction:** Identical lead-form interaction pattern to §0.5 (service variant): date + time-of-day chips, no branch selector shown (single branch, auto-attached silently).

**Desktop:**
```
┌──────────────────────────────────────────────────────────────┐
│ HEADER (state B)                                                │
├──────────────────────────────────────────────────────────────┤
│ ‹ Эзэмшигчдэд                                                    │
├──────────────────────────────────────────────────────────────┤
│ Засвар үйлчилгээ захиалах                                        │
├──────────────────────────────────────────────────────────────┤
│ text: service scope list   │  Lead form (§0.5, service variant)   │
│  (standard service,         │                                     │
│   engine, brakes, etc.)     │                                     │
│  ажлын цаг card              │                                    │
├──────────────────────────────────────────────────────────────┤
│ FOOTER (§0.3)                                                    │
└──────────────────────────────────────────────────────────────┘
```

**Tablet:** Two-column stacks to single column, form below the scope/hours text.

**Mobile:** Single column throughout; identical stacking order to tablet.

---

## 10. Owners — Parts — `/owners/parts`

**Purpose:** Capture a parts request with enough specificity (what part, for which model) that the team can source it without a back-and-forth.

**Content hierarchy:** 1. Original-parts trust messaging (no counterfeit parts) 2. Request form with a free-text "what part" field 3. Hours/contact.

**Sections:** Header → Back-to-hub link → Original-parts messaging → Request form → Hours reminder → Footer.

**CTA:** Primary — Сэлбэг захиалах (form submit). Secondary — direct call.

**User flow:** Arrival → brief trust message ("100% original parts") → fill form including a description of the part needed → submit → confirmation.

**Interaction:** No date/time fields (parts requests aren't scheduled appointments) — the form variant drops those fields entirely rather than showing them disabled, keeping the form visibly shorter than the service variant.

**Desktop:**
```
┌──────────────────────────────────────────────────────────────┐
│ HEADER (state B)                                                │
├──────────────────────────────────────────────────────────────┤
│ ‹ Эзэмшигчдэд                                                    │
├──────────────────────────────────────────────────────────────┤
│ Оригинал сэлбэг захиалах                                         │
├──────────────────────────────────────────────────────────────┤
│ text: trust messaging       │  Lead form (§0.5, parts variant —    │
│  + parts categories list     │  no date/time, has "сэлбэгийн        │
│                               │  тайлбар" free-text field)          │
├──────────────────────────────────────────────────────────────┤
│ FOOTER (§0.3)                                                    │
└──────────────────────────────────────────────────────────────┘
```

**Tablet / Mobile:** Same stacking pattern as `/owners/service` (§9) — single column below tablet width.

---

## 11. Owners — Warranty — `/owners/warranty`

**Purpose:** Be the single stable, linkable address for Jetour Mongolia's warranty terms — referenced from the homepage, every model page, and the lead form (Phase 2 §7 trust strategy), not just a passing mention.

**Content hierarchy:** 1. The headline terms (years/km) stated plainly and immediately 2. What's covered / not covered 3. Claim process 4. FAQ 5. Path to contact for an actual claim.

**Sections:** Header → Back-to-hub link → Headline warranty statement → Coverage detail → Claim process (numbered steps) → FAQ → Contact CTA → Footer.

**CTA:** Primary — Холбоо барих (for anyone ready to actually file a claim). This page is reference-oriented, not lead-generation-oriented — its CTA is deliberately lower-key than a sales page's.

**User flow:** Arrival (mostly via inbound links from other pages' warranty badges, not direct navigation) → confirms the terms → if they have an actual claim, contacts the showroom directly.

**Interaction:** Coverage detail may be presented as an accordion (covered items vs. exclusions) rather than a dense paragraph; claim process as a simple numbered list, not interactive.

**Desktop:**
```
┌──────────────────────────────────────────────────────────────┐
│ HEADER (state B)                                                │
├──────────────────────────────────────────────────────────────┤
│ ‹ Эзэмшигчдэд                                                    │
├──────────────────────────────────────────────────────────────┤
│           4 жил / 150,000 км баталгаа                            │
│           one-line plain-language summary                        │
├──────────────────────────────────────────────────────────────┤
│ Юу хамрагдах вэ ⌄        │  Юу хамрагдахгүй вэ ⌄                  │
├──────────────────────────────────────────────────────────────┤
│ Баталгаат засвар авах алхмууд                                    │
│ 1. ... 2. ... 3. ...  (numbered list)                             │
├──────────────────────────────────────────────────────────────┤
│ Түгээмэл асуулт (FAQ accordion)                                  │
├──────────────────────────────────────────────────────────────┤
│ Асуулт байвал:  [Холбоо барих]                                    │
├──────────────────────────────────────────────────────────────┤
│ FOOTER (§0.3)                                                    │
└──────────────────────────────────────────────────────────────┘
```

**Tablet:** Two-column "covered/not covered" stacks to single column.

**Mobile:** Single column throughout; identical order.

---

## 12. Test drive — `/test-drive`

**Purpose:** Standalone booking surface for campaign traffic and model-undecided visitors — the model choice happens *on* this page rather than being a prerequisite to reach it (Phase 3 §3 rationale).

**Content hierarchy:** 1. Confirm this is quick/easy (reduce anxiety before the form even loads) 2. Model selection (if not already provided via query param from an ad or a model-page CTA) 3. The booking form itself 4. Trust reinforcement (warranty, response-time promise) alongside the form.

**Sections:** Header → Intro (short, reassuring) → Model picker (skipped/preselected if arriving with model context) → Booking form → Trust sidebar → Footer.

**CTA:** Primary — Тест драйв баталгаажуулах (form submit). This page has no meaningful secondary CTA — it exists to convert, singularly.

**User flow:** Arrival with model context (from a model page's CTA or a compare page) → model pre-selected, form shown immediately. Arrival without context (ad, direct nav, word of mouth) → model picker shown first as visual tiles → selecting one reveals the rest of the form below it, in place (no page reload).

**Interaction:** Model picker (when shown) is the same visual-tile pattern as the mega menu and `/models` grid — consistency across every place a model must be chosen. Selecting a tile smooth-scrolls the remaining form into view rather than requiring a manual scroll.

**Desktop:**
```
┌──────────────────────────────────────────────────────────────┐
│ HEADER (state B)                                                │
├──────────────────────────────────────────────────────────────┤
│ Тест драйв захиалах                                              │
│ Хэдхэн мэдээлэл бөглөөд, манай баг тантай холбогдоно.             │
├──────────────────────────────────────────────────────────────┤
│ Загвараа сонгоно уу (skipped if preselected via ?model=)         │
│ [X70 Plus][X50][X1][T1]  ← visual tiles, tap to select           │
├──────────────────────────────────────────────────────────────┤
│  Lead form (§0.5, test-drive variant)   │  text: warranty badge   │
│                                           │  + response-time promise│
│                                           │  + showroom hours/map   │
├──────────────────────────────────────────────────────────────┤
│ FOOTER (§0.3)                                                    │
└──────────────────────────────────────────────────────────────┘
```

**Tablet:** Two-column (form | trust sidebar) stacks to single column, trust sidebar moves below the form (form is the priority action, shown first).

**Mobile:** Single column throughout; model tiles scroll horizontally if they don't fit two-per-row comfortably.

---

## 13. Brand — `/brand`

**Purpose:** Build category-level trust for a newer entrant — JETOUR's global story, "Travel+" positioning, and Sain Motors' Mongolia distributor credentials — read primarily by Persona A doing due diligence, not by anyone ready to transact.

**Content hierarchy:** 1. Global brand story/positioning 2. Timeline/credibility markers 3. Global scale stats 4. Travel+ philosophy in practice 5. Mongolia-specific distributor story 6. Path back to models.

**Sections:** Header → Hero (brand statement, not a vehicle) → Timeline → Story (global + Mongolia, two blocks) → Global stats band → Travel+ philosophy cards → Why-Jetour grid → Closing CTA → Footer.

**CTA:** Primary — Загварууд үзэх (closing band) — this page's job is to earn enough trust that the visitor is willing to go look at product next. Secondary — direct call for anyone who wants to verify legitimacy by talking to a person.

**User flow:** Arrival (nav dropdown, homepage brand-story teaser "see more") → reads the story at whatever depth they want (timeline for skimmers, full paragraphs for the thorough) → closing CTA routes back into the product funnel.

**Interaction:** Timeline items reveal on scroll (each becomes visible as it enters the viewport) — otherwise this page is static reading content, no complex interaction needed.

**Desktop:**
```
┌──────────────────────────────────────────────────────────────┐
│ HEADER (state B)                                                │
├──────────────────────────────────────────────────────────────┤
│                 HERO — brand statement, full-bleed image          │
│                 "JETOUR — Аяллын соёл"                            │
│         [Загварууд үзэх]   [Дилер олох]                           │
├──────────────────────────────────────────────────────────────┤
│ JETOUR-ийн аялал (timeline)                                      │
│ [2018] → [2019] → [2021] → [2023]  (4-col milestone cards)       │
├──────────────────────────────────────────────────────────────┤
│ Chery Group-ын дотор       │  Монголд — Sain Motors-оор            │
│ төрсөн дэлхийн брэнд         │  дамжин                              │
│ paragraph                    │  paragraph                          │
├──────────────────────────────────────────────────────────────┤
│ Дэлхийн JETOUR — 3 stat cards (countries/customers/founded)      │
├──────────────────────────────────────────────────────────────┤
│ Travel+ философи — 3 cards (heart/compass/cpu themed)             │
├──────────────────────────────────────────────────────────────┤
│ Яагаад JETOUR? — 4-col cards                                      │
├──────────────────────────────────────────────────────────────┤
│ JETOUR-ийг өөрийн биеэр мэдрээрэй    [Загварууд] [☎ Дуудлага]     │
├──────────────────────────────────────────────────────────────┤
│ FOOTER (§0.3)                                                    │
└──────────────────────────────────────────────────────────────┘
```

**Tablet:** Timeline: 4 → 2×2 grid. Story two-column stacks to single column. Stats: 3 → keeps 3 if it fits, else wraps. Travel+/Why-Jetour: 3–4 → 2 columns.

**Mobile:** Timeline becomes a horizontally-swipeable strip (4 milestone cards in sequence, not stacked — this content is inherently sequential/chronological, so swipe fits its meaning better than vertical stacking). Everything else: single column.

---

## 14. Dealer — `/dealer`

**Purpose:** De-risk the decision to physically visit — this is orientation, not choice (there is exactly one showroom). Serves Persona B (about to visit) and Persona D (needs the address/hours for service).

**Content hierarchy:** 1. Confirmation of legitimacy (distributor credential) 2. Exact address + map 3. Contact channels 4. Hours (including the fact that weekend hours differ) 5. Real showroom photography (proof it's a real, professional place).

**Sections:** Header → Intro (brief) → Info card + embedded map (two-column) → Showroom photo gallery → Footer.

**CTA:** Primary — none dominant; this page's job is informational de-risking, with call/WhatsApp/map-link as equally-weighted tertiary actions rather than one pushed CTA (matches Phase 2 §8's framing of this page as orientation, not routing).

**User flow:** Arrival (nav dropdown, model page's "book a test drive → here's where" context, direct search for the address) → confirms legitimacy and exact location → either gets directions (map link) or calls ahead → photo gallery reduces any remaining uncertainty about what showing up will actually look like.

**Interaction:** Map is a real embedded, interactive Google Map (pan/zoom), not a static image. Photo gallery is swipe/arrow-navigable with thumbnail strip for direct jumping, matching the model-detail gallery's interaction pattern for consistency across the site.

**Desktop:**
```
┌──────────────────────────────────────────────────────────────┐
│ HEADER (state B)                                                │
├──────────────────────────────────────────────────────────────┤
│ Бидний showroom                                                  │
│ [Branch name] · [City] — one-line description                    │
├──────────────────────────────────────────────────────────────┤
│ info card:                  │        embedded Google Map          │
│  ☎ ☎ ✉ 📍                    │        (interactive, pan/zoom)      │
│  ажлын цаг                   │                                     │
│  [Google Map-аар үзэх →]     │                                     │
├──────────────────────────────────────────────────────────────┤
│ Манай танхимаар зочлоорой                                        │
│ [ large gallery image, ‹ › arrows, counter ]                      │
│ [thumb][thumb][thumb][thumb][thumb][thumb]  ← thumbnail strip     │
├──────────────────────────────────────────────────────────────┤
│ FOOTER (§0.3)                                                    │
└──────────────────────────────────────────────────────────────┘
```

**Tablet:** Info card + map: two-column → stacks to single column (info card above map). Thumbnail strip: reduces visible count, remainder reachable via arrows/scroll.

**Mobile:** Single column throughout. Map height reduced but still interactive (not replaced with a static image). Thumbnail strip becomes horizontally scrollable.

---

## 15. News listing — `/news`

**Purpose:** Lowest-frequency page on the site — light-touch credibility content and light SEO value, browsed by an already-engaged visitor, never a primary entry point for any persona.

**Content hierarchy:** 1. Most recent article first 2. Full archive grid 3. Path back to the product funnel (every page ends in a next step, per Phase 3 §1 rule 6).

**Sections:** Header → Page intro → Article grid → Footer.

**CTA:** Primary — Унших (per article, i.e., simply click-through — no separate button needed beyond the card itself being a link). No product CTA is forced onto this listing page (that lives at the article level, see §16).

**User flow:** Arrival (nav dropdown, homepage news teaser "see all") → scans headlines/dates → clicks into whichever is relevant.

**Interaction:** Static grid, no carousel (same reasoning as Models/Offers listings — this page's job is showing everything at once, not sequencing).

**Desktop:**
```
┌──────────────────────────────────────────────────────────────┐
│ HEADER (state B)                                                │
├──────────────────────────────────────────────────────────────┤
│ Мэдээ                                                            │
├──────────────────────────────────────────────────────────────┤
│ [card: img+tag+date+     [card]                    [card]        │
│  title+excerpt+"Унших"]                                          │
│ [card]                    [card]                    [card]       │
│  ← 3-col grid                                                     │
├──────────────────────────────────────────────────────────────┤
│ FOOTER (§0.3)                                                    │
└──────────────────────────────────────────────────────────────┘
```

**Tablet:** 3 → 2 columns.

**Mobile:** Single column, full-width cards.

---

## 16. News detail — `/news/[slug]`

**Purpose:** Deliver one article's content and route the (already-engaged) reader back toward the product funnel or contact, rather than letting them leave with nowhere to go next.

**Content hierarchy:** 1. Article content itself 2. Contact CTA (this article-reading visitor is warm, worth a soft ask) 3. Related articles (keep them on-site if not ready to convert).

**Sections:** Header → Back-link → Hero image + metadata → Article body → Contact CTA band → Related articles → Footer.

**CTA:** Primary — Холбоо барих (contact CTA band, placed after the article body — soft, not pushy, matching this page's low-commitment context). Secondary — related article click-throughs.

**User flow:** Arrival (from listing, direct share link, search) → reads → either engages the contact CTA (rare but real) or clicks a related article (keeps them in the site) or leaves (acceptable — this is the lowest-stakes page on the site).

**Interaction:** Purely a reading page — no interactive elements beyond standard link navigation.

**Desktop:**
```
┌──────────────────────────────────────────────────────────────┐
│ HEADER (state B)                                                │
├──────────────────────────────────────────────────────────────┤
│ ‹ Мэдээ                                                          │
├──────────────────────────────────────────────────────────────┤
│                 [ hero image, full-bleed ]                        │
│                 tag · date · title                                │
├──────────────────────────────────────────────────────────────┤
│                 article body (single centered column,             │
│                 constrained reading width)                         │
├──────────────────────────────────────────────────────────────┤
│ Холбоо барих   [☎ Дуудлага]  [Тест драйв →]                       │
├──────────────────────────────────────────────────────────────┤
│ Холбоотой мэдээ                                                   │
│ [card] [card]  ← 2-col                                            │
├──────────────────────────────────────────────────────────────┤
│ FOOTER (§0.3)                                                    │
└──────────────────────────────────────────────────────────────┘
```

**Tablet / Mobile:** Reading column narrows to fit but stays single-column at every breakpoint (this page was never multi-column). Related articles: 2 columns → single column on mobile.

---

## 17. Privacy — `/privacy`

**Purpose:** State plainly what data the site's lead forms collect and why — a compliance baseline, not a marketing page, but still needs to be findable and readable, not an afterthought wall of text.

**Content hierarchy:** 1. What's collected 2. Why/how it's used 3. Who it's shared with (if anyone) 4. Contact for privacy questions.

**Sections:** Header → Title → Body content (structured with real subheadings, not one undifferentiated block) → Contact line → Footer.

**CTA:** None — this is a reference page; its only "action" is the footer's normal links.

**User flow:** Arrival (footer link, form's "Нууцлалын бодлого →" link) → reads the relevant section → leaves (no conversion expectation on this page).

**Interaction:** None beyond standard in-page anchor jumps if the content is long enough to warrant a short table of contents.

**Desktop:**
```
┌──────────────────────────────────────────────────────────────┐
│ HEADER (state B)                                                │
├──────────────────────────────────────────────────────────────┤
│ Нууцлалын бодлого                                                │
│ Сүүлд шинэчлэгдсэн: [date]                                        │
├──────────────────────────────────────────────────────────────┤
│ single constrained-width reading column, subheadings:            │
│  Ямар мэдээлэл цуглуулдаг вэ                                      │
│  Хэрхэн ашигладаг вэ                                              │
│  Хэнтэй хуваалцдаг вэ                                             │
│  Таны эрх                                                         │
│  Холбоо барих                                                     │
├──────────────────────────────────────────────────────────────┤
│ FOOTER (§0.3)                                                    │
└──────────────────────────────────────────────────────────────┘
```

**Tablet / Mobile:** Reading column narrows; content and order unchanged (this page has no layout complexity to adapt).

---

## 18. Terms — `/terms`

**Purpose:** Standard terms-of-use reference, same treatment as Privacy.

**Content hierarchy / Sections / CTA / User flow / Interaction:** Identical pattern to §17 — single reading column, structured subheadings, no interaction beyond anchor jumps, no conversion CTA.

**Desktop:**
```
┌──────────────────────────────────────────────────────────────┐
│ HEADER (state B)                                                │
├──────────────────────────────────────────────────────────────┤
│ Үйлчилгээний нөхцөл                                              │
│ Сүүлд шинэчлэгдсэн: [date]                                        │
├──────────────────────────────────────────────────────────────┤
│ single constrained-width reading column, subheadings per          │
│ standard terms-of-use structure                                   │
├──────────────────────────────────────────────────────────────┤
│ FOOTER (§0.3)                                                    │
└──────────────────────────────────────────────────────────────┘
```

**Tablet / Mobile:** Same as §17 — reading column narrows, no structural change.

---

## Summary — what carries forward to Phase 5

1. Five shared/global components fully specified in §0 (Header with two states + mega menu + drawer, Footer, Floating CTA, Lead form with five variants, Sticky sub-nav/CTA bar with its mobile top-chip/bottom-bar split) — Phase 5 designs these once, not per page.
2. Two entirely new page structures to design: `/compare` (with its mobile-specific 2-model cap) and `/test-drive` (with its conditional model-picker step).
3. `/owners` restructured as a 3-way router page, with `/owners/service`, `/owners/parts`, and `/owners/warranty` each as focused single-purpose pages.
4. Every long page (Model detail, Financing, Owners hub) carries the sticky sub-nav pattern; every page overall ends in a next-step CTA, per Phase 3's structural rule.
5. Consistent interaction vocabulary established across the whole site: swipeable image sliders with counters (galleries), visual tile pickers for model selection (mega menu, `/models`, `/compare`, `/test-drive` — the same pattern everywhere a model must be chosen), accordions for FAQ and grouped specifications, and scroll-spy behavior on every sticky sub-nav.
6. Explicit mobile adaptations noted per page where the pattern isn't simply "fewer grid columns" — notably the Compare page's 2-vs-3-model cap, the Home page's carousel-instead-of-grid treatment for offers/why-us/news, and the split of the sticky bar into a top anchor-chip row + separate bottom CTA bar on long pages.

**This concludes Phase 4.** No color, typography, or visual styling decisions have been made — every specification above is structural and behavioral only. Ready for Phase 5 (visual design system) on your go-ahead.
