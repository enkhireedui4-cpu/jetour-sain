# Phase 1 — Research: World-Class Automotive Websites

Synthesis of 12 brands: Mercedes-Benz, BMW, Audi, Volvo, Genesis, Lexus, Toyota, Tesla, Xiaomi EV, Zeekr, BYD, Hyundai/Kia — plus Jetour's own global and regional distributor sites (UAE, Russia, Egypt, Kazakhstan, Malaysia).

Full raw notes per brand group are in this folder:
- [research-raw-german-premium.md](research-raw-german-premium.md) — Mercedes-Benz, BMW, Audi
- [research-raw-refined-premium.md](research-raw-refined-premium.md) — Volvo, Genesis, Lexus, Toyota
- [research-raw-ev-disruptors.md](research-raw-ev-disruptors.md) — Tesla, Xiaomi EV, Zeekr, BYD
- [research-raw-jetour-mainstream.md](research-raw-jetour-mainstream.md) — Hyundai, Kia, Jetour Global + 5 regional distributor sites

This document is the synthesis: patterns that recur across brands, **why** they work, and what to actually adopt for Jetour Mongolia given our real constraints (single distributor, dealer-handoff conversion model, no e-commerce checkout, existing red/black/white brand system, Mongolian-language audience).

---

## 1. The one skeleton, everywhere

Every brand studied — luxury or mass-market, EV-disruptor or century-old — converges on the same vehicle detail page (VDP) skeleton:

**Hero (name + tagline + price + 2 CTAs) → Gallery/Design → Interior → Technology → Performance → Safety → Specifications → Trim/pricing comparison → Offers/Financing → FAQ → Cross-sell to sibling models → Closing conversion block**

Why it works: car buying is a research-heavy, high-consideration purchase. Buyers arrive with the same mental checklist (what does it look like → what's it like inside → what can it do → is it safe → what does it cost → what else should I consider) regardless of brand. Fighting that checklist with a nonstandard structure creates friction; matching it lets buyers self-serve at their own pace.

**Our current [model-detail-client.tsx](../../src/app/models/%5Bid%5D/model-detail-client.tsx)** already follows most of this order (Exterior → Interior → Technology → Features → Colors → Specs → Loan terms → Request form → Related models). What's missing: a **persistent sticky sub-nav with anchor links + a pinned CTA** (every single brand studied has this), an **FAQ block** (BMW 13 items, Audi 9 items — cheap SEO + objection handling), and a proper **trim/price comparison module** (we show one price, not a trim ladder — reasonable for now since Jetour Mongolia sells by configuration, not trim tiers, but worth revisiting per-model).

---

## 2. The two-verb CTA grammar

Every single brand reduces its entire CTA vocabulary to **one "learn" verb + one "transact" verb**, repeated identically everywhere:

| Brand | Learn | Transact |
|---|---|---|
| Volvo | Explore | Build |
| Genesis | EXPLORE | BUILD / REQUEST A QUOTE |
| Lexus | Explore | Build |
| BMW | (implicit) | Build Your Own / Shop Inventory |
| Audi | Discover | Build & Price |
| Tesla | Learn More | Order Now |
| Jetour Russia | Model details | Test drive |

Why it works: buyers arrive at wildly different points in their journey. A rigid two-verb system lets a fast scanner instantly sort every button into "tell me more" or "I'm ready" without reading each one — cognitive load drops to near zero. Mixing in "Contact Us," "Discover More," "Get Started," "Explore Now" (five synonyms for the same action, which is roughly what our site does today across pages) makes users re-evaluate every button they see.

**Adopt for Jetour Mongolia:** collapse our CTA vocabulary to two verbs used everywhere:
- Learn → **"Дэлгэрэнгүй үзэх"** (already our most common phrase — keep it, standardize it)
- Transact → **"Тест драйв захиалах"** (already dominant — standardize it as *the* primary button color/style everywhere, never split attention with "Хүсэлт илгээх" as an equally-weighted alternative)

---

## 3. Sticky conversion furniture

Every brand pins something to the viewport as the user scrolls a model page:
- **Audi**: model name + "Build & price" bar, persists the entire page, mobile and desktop
- **BMW**: anchor nav (Test drive / Offers / Design / Technology)
- **Mercedes**: anchor nav (Models / Exterior / Interior / Safety / Tech) + persistent offers link
- **Volvo**: sub-nav appears on scroll carrying anchors + "Book a test drive"
- **Kia, Jetour Russia**: sticky anchor nav **with the Test Drive button pinned inside the bar itself**

Why it works: on a page that's 10+ screens of scrolling, the CTA that converts is rarely the one in the hero — it's the one available at the *moment* a buyer decides. If that action requires scrolling back to the top, most won't bother. A pinned bar keeps the door open at every scroll position.

**Our current model detail page has a sticky sub-nav** ([model-detail-client.tsx:83](../../src/app/models/%5Bid%5D/model-detail-client.tsx#L83)) with anchor links and a CTA button — this is already correct and matches the pattern well. Gap: on mobile, this bar is cramped (model name + 3-4 nav links + CTA all in one row) — the research suggests collapsing the mobile version to icon-only anchors or a horizontally-scrollable chip row (BMW/Audi mobile pattern), with the CTA always fully visible, never truncated.

---

## 4. Vehicle cards are spec-light; money is not

Across German/refined-premium/EV brands, listing cards are deliberately thin: image + name + one line + starting price + two CTAs. Detail is deferred to the model page. But **price (or a price proxy) appears almost everywhere**:

- Volvo, Genesis, Lexus, Toyota, Audi, BMW: **starting MSRP directly on the card**
- Zeekr: three spec figures (range, 0-100, charge time) + price on every card
- Jetour Russia: price **and monthly payment** + three buttons (Test drive / In stock / Details) on every card — the strongest card pattern found in the entire Jetour distributor network
- Jetour UAE, Egypt, Malaysia: **no price on homepage cards** — flagged explicitly as a weakness in our research; forces an extra click and loses comparison shoppers
- Tesla/Xiaomi: price anchored directly in the hero as the first thing seen

Why it works: in a high-consideration purchase, buyers comparison-shop before they ever reach a dealer. A card that omits price either loses that comparison entirely (buyer bounces to a competitor's site that shows it) or forces a click-through purely to find a number that could have been one line of text.

**Our current [models.tsx](../../src/components/jetour/models.tsx) home showcase and the mega menu** show price ("...-с эхлэн") — good, keep this. **Adopt from Jetour Russia**: where we have a starting price, consider adding it as a secondary "sarын..." (monthly-payment-style) line pulled from existing loan term data in [enhanced-lead-form.tsx](../../src/components/jetour/enhanced-lead-form.tsx), since Mongolian buyers already think in monthly installments (per our existing financing calculator on [financing/page.tsx](../../src/app/financing/page.tsx)).

---

## 5. Typography carries the luxury signal, not decoration

The calmest, most premium-feeling sites (Volvo, Genesis, Lexus) share one trait: **one custom typeface, large sizes at light-to-regular weight, extreme size contrast between a huge headline and tiny quiet body/label text.** Hierarchy comes from *size*, never from italics, gradients, or multiple competing display fonts. Genesis literally brands whitespace as a design material ("Beauty of White Space"); Volvo tokenizes spacing so the calm rhythm is systemic, not accidental.

**This directly validates decisions already made in this codebase** — the CLAUDE.md memory record shows the italic-heavy, gradient-text aesthetic was already identified and stripped out in favor of one font (Inter), no italics, solid accent color. Phase-1 research confirms this was the right call, and the [globals.css](../../src/app/globals.css) fluid type scale (`.type-display`, `.type-h1`, `.type-h2`) added this session is directionally aligned — it should be pushed further: increase the size gap between `.type-h2` and body copy, and audit remaining pages (news, financing, brand, owners) for leftover italic/gradient classes from the pre-cleanup era.

---

## 6. The mega menu is a mini lineup page, not a text list

Volvo, Genesis, Lexus, Toyota, Kia, and Tesla all treat the "Models" nav item as a visual index: every vehicle shown as a thumbnail with name (+ starting price on Genesis/Lexus/Toyota), grouped by body style and/or powertrain — never a plain text dropdown.

**Our navbar already does this** ([navbar.tsx](../../src/components/jetour/navbar.tsx)) — the mega menu shows model thumbnails with price. This matches best practice; no change needed beyond what was already implemented this session (active-state highlighting, hover-to-open, escape-to-close).

---

## 7. Feature storytelling over spec bullets; specs quarantined to the bottom

Every VDP presents features as **benefit-titled modules** ("GO KEYLESS," "SINK INTO NAPPA LEATHER," "Advanced. Athletic. Adventurous.") — image + short headline + one line — not bullet lists of spec sheet items. Raw numeric specs get pushed into a collapsible table or accordion near the bottom, after the emotional case has been made.

**Our current page mixes these well already** (feature groups with icons + checklists, then a dedicated specs table later) — the main gap is that our "Автомашин сонгох шалтгаан" feature-group section ([model-detail-client.tsx:271-308](../../src/app/models/%5Bid%5D/model-detail-client.tsx#L271-L308)) uses checkmark bullet lists rather than the benefit-headline-plus-image pattern every researched brand favors. Converting bullet items into short titled image modules (where photography exists) would read as more premium.

---

## 8. FAQ accordions as the closing move

BMW (13 items) and Audi (9 items) end every model page with an FAQ accordion answering practical objections (financing, reliability, range/economy) with deep-links back into the funnel (inventory, payment calculator). This is nearly free to build and doubles as SEO content in a language (Mongolian) where structured, answer-focused content ranks well.

**We have none of this today.** Straightforward to add per-model using existing CMS content plus a handful of universal questions (warranty, financing, delivery timeline, service).

---

## 9. Warranty/trust-anchor repetition (Jetour-specific)

The single most important finding from the Jetour distributor research: **Jetour UAE repeats its 10-year/1,000,000 km warranty on the homepage, every VDP, and even inside the test-drive form.** This is Jetour's strongest differentiator against 100+-year-old brands with no comparable warranty story, and weaker distributor sites (Egypt, Kazakhstan, Malaysia) under-use it.

**Action:** confirm Jetour Mongolia's actual warranty terms (our current data shows "4 жил / 150,000 км" in [global-stats.tsx](../../src/components/jetour/global-stats.tsx) — different from UAE's 10yr/1M km, so this is a market-specific term, not a copy-paste). Whatever the real number is, it should be repeated at the same three touchpoints UAE uses: homepage stats band (already present), every VDP (currently absent), and the lead form trust copy (currently generic, see [enhanced-lead-form.tsx:463-468](../../src/components/jetour/enhanced-lead-form.tsx#L463-L468)).

---

## 10. Test-drive form: model-first, short, human follow-up

Tesla, Zeekr, and Xiaomi all order their test-drive forms **model (visual tiles) → person (minimal fields) → time (deferred to human follow-up when possible)**. Xiaomi's flow is the most radical: phone number + SMS code only, one tap, store calls back — no date picker at all. Genesis auto-suggests the nearest dealership by ZIP/location rather than a dropdown; Jetour UAE's one flaw (per our own research) is using a model **dropdown** instead of visual tiles.

**Our [enhanced-lead-form.tsx](../../src/components/jetour/enhanced-lead-form.tsx)** already does model-as-select (not dropdown vs tiles distinction really matters much at our single-branch scale) and reasonably short fields. The clearest opportunity: since Jetour Mongolia has effectively one branch/showroom (per [branches.ts](../../src/lib/branches.ts)), the branch selector is often redundant friction — Genesis/Xiaomi's lesson is to auto-fill or hide fields that have only one real answer, which our form partially does already (`disabled={BRANCHES.length === 1}`) — good, keep.

---

## 11. What NOT to import

A few patterns are common across researched brands but are **wrong for Jetour Mongolia specifically** and should be deliberately skipped:

- **Full e-commerce checkout / online ordering** (Tesla, Volvo direct order, Toyota SmartPath): requires a completely different commercial/legal/payments backend than a single-distributor dealer-handoff market has. Our conversion event is and should remain "lead → dealer follow-up," matching Mercedes/BMW/Audi's dealer-handoff model, not Tesla's checkout model.
- **Live 3D configurators / rotatable models**: high production cost (needs real 3D assets, not photography) for a catalog of 4 models; our existing 360°-drag viewer for X70 Plus and color-swap crossfades already deliver ~80% of this feeling at a fraction of the cost — extend that pattern to other models rather than building true 3D.
- **ZIP-code personalization**: irrelevant at single-city/single-branch scale; skip.
- **Concierge/white-glove service layer** (Genesis): lovely idea, but it's a business/staffing decision, not a design one — out of scope for this redesign.
- **Aggressive countdown-timer urgency** (Mercedes campaign heroes): can read as pushy/low-trust in a market where Jetour is still building brand credibility as a newer entrant; use real offer expiration dates if/when we add urgency, never a generic ticking countdown.

---

## Prioritized recommendations for Jetour Mongolia

In rough order of impact vs. effort:

1. **Standardize the two-verb CTA grammar** site-wide (learn vs transact) — zero new components, pure copy/consistency pass.
2. **Add a warranty/trust-anchor repetition** at VDP + lead form (currently only on homepage).
3. **Add an FAQ accordion** to each model detail page (financing, warranty, delivery, service — reuse CMS).
4. **Tighten the sticky VDP sub-nav for mobile** (collapse to fit, never truncate the CTA).
5. **Convert bullet feature lists to benefit-titled image modules** where photography assets exist.
6. **Add monthly-payment framing to model cards** where we already have a starting price, reusing existing loan-term data.
7. **Audit remaining pages for leftover italic/gradient artifacts** (news, financing, brand, owners still contain `.font-display.italic`-era classes per earlier code read) and finish applying the new type scale everywhere.
8. Leave e-commerce, 3D configurators, ZIP-personalization, and concierge flows out of scope — noted for awareness, not action.

---

**This concludes Phase 1.** Per your instructions, no further redesign or coding proceeds until this research is reviewed. Ready for Phase 2 (synthesis into a concrete information architecture / page-by-page spec) on your go-ahead.
