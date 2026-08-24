# Phase 8 — Vehicle Information Architecture: Model → Variants

## The problem, stated plainly

Today every powertrain is its own `CarModel` row. So **"JETOUR T2"** and **"JETOUR T2 PHEV"** are two separate products in the listing, the mega menu, and compare — a duplicate that reads as amateur and does not scale (add a hybrid of X70 Plus tomorrow and you get a third X70 card). No premium brand does this. Volvo, Genesis, BMW, Mercedes, Tesla, and Zeekr all use **one product page per model, with powertrain/trim as a selection inside it.**

Confirmed in the real data (8 models): the only true sibling pair is **T2 (petrol)** and **T2 PHEV** — and T2's own price note already says *"Luxury AWD / PHEV AWD хувилбартай."* The author already thinks in variants; the data model doesn't yet.

## The fix, in one sentence

**One `CarModel` = one product page. Powertrains/trims become `variants` inside that model's data. The user picks the model, then picks the powertrain on the page — never two cards for one car.**

---

## 1. Data model (no database migration needed)

The schema already stores a flexible `detailsJson` blob. Variants live there — zero Prisma migration, fully backward-compatible.

```ts
// inside detailsJson
variants?: VehicleVariant[]

type VehicleVariant = {
  id: string;              // "petrol" | "phev" | "hybrid" | trim slug
  name: string;            // "2.0T Luxury AWD"
  powertrain: "Бензин" | "Хайбрид" | "PHEV" | "Цахилгаан";
  status?: "available" | "coming-soon";
  startingPrice?: string;  // overrides model price when selected
  priceNote?: string;
  tagline?: string;
  // spec overrides — only what differs per powertrain
  specs?: Partial<{ engine; power; torque; fuel; drivetrain; transmission; range; topSpeed; battery; charging }>;
  loanTerms?: LoanTerms;   // optional per-variant finance
  highlights?: { label: string; value: string }[];  // stat trio per variant
}
```

**Rules:**
- **Shared at model level** (never duplicated per variant): gallery, colors, exterior/interior showcase, technology, safety, design language, brochure.
- **Per variant** (swaps on selection): powertrain label, price, headline specs (power/torque/fuel/range), the spec table rows that differ, finance terms if different.
- **No `variants` field → single-powertrain model** → the selector simply doesn't render (graceful; X1, X50, X70 Plus stay exactly as they are today).

**Merge action:** T2 gains `variants: [Petrol "Luxury AWD", PHEV "PHEV AWD"]`; the `t2-phev` row is **unpublished** (data preserved, hidden from the site). Because listing/mega/compare already only show `published` models, unpublishing auto-removes the duplicate everywhere — no code needed for the dedup itself.

---

## 2. The model page — restructured (matches your section list + best practice)

Section order on `/models/[id]`, with the **variant selector** as the pivot:

```
1.  Hero            — model name, selected variant's price, 2 CTAs (Test Drive / Request Quote)
2.  ▸ VARIANT SELECTOR (sticky-aware) — Бензин · PHEV segmented chips   ← the new heart of the page
3.  Overview        — positioning statement (shared)
4.  Variants        — a card per powertrain: name, badge, price, 3 headline stats, "Сонгох"
5.  Compare Variants— this model's powertrains side by side (petrol vs PHEV: power, range, price…)
6.  Gallery         — shared (exterior/interior showcase, sliders)
7.  Technology      — shared, benefit-titled modules
8.  Safety          — shared
9.  Colors          — shared configurator
10. Specifications  — reflects the SELECTED variant (grouped, accordion)
11. Pricing         — selected variant's price, prominent
12. Finance         — calculator/terms for the selected variant
13. Downloads       — brochure / price list (request if no PDF)
14. Warranty band   — 4 жил / 150,000 км (trust)
15. Book Test Drive — lead form, model + selected variant pre-filled
16. Request Quote   — secondary lead intent (info-request), variant attached
17. Related models  — cross-sell (other models, not other variants)
```

**How selection behaves:**
- Changing the powertrain chip updates: hero price, headline stat trio, Specifications, Pricing, Finance, and the pre-filled variant on the lead forms. Everything else (gallery, colors, tech, safety) is shared and stays put — no reload, a 250ms crossfade on the numbers.
- Deep-linkable: `/models/t2?variant=phev` opens with PHEV selected (for ads/campaigns).
- Default selected variant = first `available` one (petrol for T2, since PHEV is coming-soon → petrol default, PHEV shown with a "Тун удахгүй" badge but still selectable to preview specs).

**Best-practice mapping (why each choice):**
| Pattern | Borrowed from |
|---|---|
| Powertrain as segmented chips near the hero | Volvo ("Mild hybrid / Plug-in hybrid"), BMW |
| "Compare Variants" module with per-variant Build/stat cards | Genesis "Choose your trim", BMW Core vs M |
| Headline stat trio that swaps with selection | Tesla, Zeekr |
| Two CTAs — transact (Test Drive) + warm (Request Quote) | all six |
| Specs quarantined in an accordion below the emotional case | Volvo, Genesis |

---

## 3. Two kinds of "compare" — kept distinct

- **Compare Variants** (new, on the model page): petrol vs PHEV of the *same* model. Answers "which powertrain."
- **Compare Models** (existing `/compare`): different models side by side. Answers "which car." This one now shows **one row per model** (T2 once), and can optionally let the user pick which variant of each model to compare — but v1 just uses each model's default variant to keep it simple.

---

## 4. Navigation & scalability

- Nav stays exactly as simple as now: `/models` grid → `/models/[id]`. **No new routes, no nav change.** Variant is page state, not a URL segment.
- **Scalable:** to add "T1 i-DM" (hybrid) or an X70 Plus hybrid in future, the author just adds a `variants` entry to that model's data. The selector appears automatically. No duplicate card, ever.
- Listing/mega/compare cards: one per model. Cards for multi-powertrain models get a small "Бензин · PHEV" powertrain line so users know options exist before clicking.

---

## 5. What this costs — the honest part

- **Public site (low risk):** data-model parse (`cms.ts`), the model-page selector + variant-aware sections, the small powertrain line on cards. Additive; single-powertrain models are unaffected.
- **Data merge (one-time, needs care):** a script adds T2's two variants and unpublishes `t2-phev`. Reversible (unpublish, not delete).
- **Admin CMS (the real follow-up):** the admin currently edits one model at a time and has no variants editor. Until that's built, variants are authored in the seed/`detailsJson` (I can do T2 now by hand). **A proper admin variants editor is a separate task** — flagging it, not silently skipping it. Without it, the client can't add variants themselves yet.

---

## Implementation plan (phased, verifiable)

1. **Types + parsing** — add `variants` to `CarModelDetails`/`CmsCarModel` and parse in `cms.ts`. (safe, additive)
2. **Data merge** — script: give T2 its Petrol + PHEV variants; unpublish `t2-phev`. Auto-dedups listing/mega/compare.
3. **Model page** — variant selector + variant-aware Overview/Variants/Compare-Variants/Specs/Pricing/Finance + variant on lead forms.
4. **Cards** — add the "Бензин · PHEV" powertrain line where a model has variants.
5. **Admin variants editor** — deferred; separate task.

**Decision I need from you before writing code:** proceed with steps 1–4 now (T2 authored by hand, admin editor deferred to step 5)? Or do you want the admin editor in scope from the start (much larger)? Everything else above I'm confident on — this is the one branch that changes the size of the job.
