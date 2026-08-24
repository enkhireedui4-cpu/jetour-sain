# Phase 2 — UX Strategy: Jetour Mongolia

Builds directly on [Phase 1 research](phase-1-research.md). No UI decisions here — this document defines *why* the site exists, *who* it serves, and *how* it should be structured to convert. Phase 3 will translate this into information architecture / page-by-page wireframes; Phase 4 into the visual design system; Phase 5 into build.

Grounded in the actual business, not a generic template:
- **Single distributor, single showroom** — Sain Motors LLC, Chингэлтэй district, Holiday Inn (per [branches.ts](../../src/lib/branches.ts)). Not a multi-dealer network.
- **Leads route to Telegram**, not a CRM dashboard ([leads.ts](../../src/lib/leads.ts)) — the sales team works from a phone, not a pipeline tool.
- **Warranty: 4 years / 150,000 km** (per [global-stats.tsx](../../src/components/jetour/global-stats.tsx)) — this is *our* number, not the 10yr/1M km UAE figure from Phase 1; the *strategy* of repeating it is what transfers, not the number itself.
- **4 bank financing partners** (Хаан, ХасБанк, Голомт, +1), rates 1.3%–2.7%/month, 20-25% down — financing is central to this market, not a footnote.
- **Current lineup**: X70 Plus, X1, X50, T1 available; S06/S07 present in color-image data (likely upcoming/newer additions to track).
- **Contact channels already wired**: phone (2 lines), WhatsApp, Messenger, email — omnichannel already exists, the strategy needs to formalize which channel serves which intent.

---

## 1. Business Goals

Ranked by priority — every later section should trace back to one of these.

### Primary goal: qualified test-drive and showroom-visit leads
Jetour Mongolia does not sell online (no e-commerce, per Phase 1's explicit "what not to import"). The website's entire job is to move a visitor from *awareness* to *a phone call, WhatsApp message, or Telegram lead landing in the sales team's hands* — ideally with enough context (model, budget range, financing interest) that the first human touch is a warm close, not a cold discovery call.

**Success metric:** lead volume × lead quality (has model + phone + intent signal), not raw traffic or session duration.

### Secondary goal: brand credibility for a newer entrant
Jetour is a young brand (Mongolia market since 2023) competing for attention against 100+-year-old brands with deep local trust. The site must do active trust-building work that an established brand's site doesn't have to (see §7 Trust Strategy) — this is a *goal*, not just a section, because every design decision downstream (warranty repetition, financing transparency, real showroom photography) exists to serve it.

### Tertiary goal: reduce pre-sale friction and support-load
Financing questions, service booking, and parts requests currently generate phone volume that a well-structured site (loan calculator, FAQ, service booking form) can deflect into self-service or at least pre-qualify before a human is needed.

### Quaternary goal: owner retention and word-of-mouth
Existing owners (service, parts, warranty claims) are a second audience the site must serve without competing for attention with the prospecting funnel — handled as a clearly separated "Owners" path, not folded into the main sales journey.

### Explicitly NOT goals (per Phase 1's "what not to import")
- Online purchase/checkout
- Real-time inventory management
- Multi-dealer comparison (we are the only dealer)
- International/multi-market localization

---

## 2. User Personas

Four personas cover the realistic traffic mix. Each maps to a distinct entry point and a distinct primary CTA.

### Persona A — "The Comparison Shopper" (largest segment)
- **Who:** 28–45, urban Ulaanbaatar or aimag center, cross-shopping Jetour against Hyundai/Toyota/Chinese brands (Chery, Changan, Haval) already sold in Mongolia. Price- and financing-sensitive; SUV body style is a given, the brand isn't decided yet.
- **Arrives via:** Facebook/Instagram ad, Google search ("SUV машин зээлээр"), word of mouth.
- **Needs from the site:** fast price + monthly-payment answer, real photos (not renders), what makes Jetour different from other Chinese-brand entrants, low-commitment way to learn more before talking to sales.
- **Primary CTA:** "Дэлгэрэнгүй үзэх" (learn) first, "Тест драйв" only after comparison is resolved.
- **Risk if unserved:** bounces to a competitor's site that shows price faster.

### Persona B — "The Ready Buyer"
- **Who:** Has already decided on Jetour (word of mouth, saw one on the road, existing Sain Motors customer for another brand). Knows roughly which model, wants to move fast.
- **Arrives via:** direct navigation, branded search, referral link.
- **Needs from the site:** model page with real specs, immediate path to test drive or a call, confidence that the distributor is legitimate and will follow through (see Trust Strategy).
- **Primary CTA:** "Тест драйв захиалах" directly from hero or nav — should never be more than one click away.
- **Risk if unserved:** calls the phone number without ever using the site (fine, but a lost opportunity to pre-qualify and capture data) or, worse, can't find a phone number fast and gives up.

### Persona C — "The Financing-First Buyer" (distinct from A because financing *is* the decision, not a filter)
- **Who:** Has a monthly budget in mind, not a sticker price. Wants to know "what can I afford" before "which model."
- **Arrives via:** search for "машины зээл", "автомашин зээлээр", bank partnership pages.
- **Needs from the site:** the loan calculator ([financing/page.tsx](../../src/app/financing/page.tsx)) surfaced early, not buried; clear bank partner comparison; a financing-specific lead form that doesn't force a model choice first.
- **Primary CTA:** "Зээлийн тооцоолуур" → "Зээлийн өргөдөл илгээх".
- **Risk if unserved:** assumes Jetour is unaffordable and never returns.

### Persona D — "The Existing Owner"
- **Who:** Already owns a Jetour. Needs service booking, parts, warranty information — has zero interest in the sales funnel.
- **Arrives via:** direct navigation to `/owners`, a service reminder, warranty question.
- **Needs from the site:** fast path to book service or order parts, warranty terms in plain language, showroom hours/contact — with none of the "buy a car" messaging that would feel irrelevant or even annoying.
- **Primary CTA:** "Засвар захиалах" / "Сэлбэг захиалах" — completely separate from any vehicle CTA.
- **Risk if unserved:** calls the phone directly (works, but the site earns no credit and the owner has a worse experience than a competitor's dedicated owner portal).

**Design implication:** the site's IA must branch clearly for Persona D at the top level (nav item, not buried under "About"), and must front-load price/financing signals for Personas A and C rather than assuming everyone arrives ready to buy like Persona B.

---

## 3. Customer Journey

Mapped as a single funnel with persona-specific entry points, following the "conversion ladder" pattern validated in Phase 1 (every step down the ladder is a smaller ask than the one before it, so no visitor is lost to an all-or-nothing choice).

```
AWARENESS          → Facebook/Instagram ad, Google search, word of mouth, seeing a car on the road
       ↓
ARRIVAL             → Homepage (Persona A/C) or direct to Model page (Persona B) or /owners (Persona D)
       ↓
ORIENTATION         → "What is Jetour, is this legitimate, what does it cost" — brand trust signals,
                       warranty, distributor credentials, price/financing visible without digging
       ↓
EXPLORATION         → Model comparison (across our 4-5 models), spec review, color/gallery browsing,
                       financing calculator, reading owner-relevant content if Persona D
       ↓
CONSIDERATION       → FAQ resolution (financing terms, warranty specifics, delivery timeline),
                       reading news/offers for current promotions, cross-referencing bank partners
       ↓
INTENT SIGNAL       → One of: request info (low commitment) → book test drive (medium) →
                       financing application (medium-high, model+budget both signaled) →
                       call/WhatsApp directly (high, bypasses form entirely — must stay easy)
       ↓
LEAD CAPTURED       → Telegram notification to sales team with full context (model, contact method,
                       date, financing numbers if applicable)
       ↓
HUMAN HANDOFF       → Phone call/WhatsApp within a committed response window (see §9)
       ↓
SHOWROOM VISIT      → Test drive, in-person financing discussion, purchase decision
       ↓
OWNERSHIP           → Re-enters via /owners for service/parts/warranty — a separate, parallel journey
                       that should never feel like round-two of the sales funnel
```

**Key journey principle from Phase 1:** every stage must leave a lower-commitment exit open. A visitor not ready to book a test drive should still be able to leave contact info for "info-request" (already supported by our lead schema's `type` field) rather than bouncing entirely.

---

## 4. Information Hierarchy

Top-level IA, ordered by frequency of use and persona coverage — not alphabetically or by internal org chart:

```
1. Загварууд (Models)              — primary; mega menu with all models as visual tiles + price
2. Тусгай саналууд (Offers)        — time-sensitive, deserves top-level billing (already does)
3. Зээл / Санхүүжилт (Financing)   — elevated for Persona C; currently one click deep, keep it there
                                       but ensure it's discoverable from every model page too
4. Эзэмшигчдэд (Owners)            — Persona D's entire world; must be a clean top-level branch,
                                       not nested under a "Buyers" dropdown as it partly is today
5. Бидний тухай (Brand + Dealer)   — trust-building; secondary nav, not hidden
6. Мэдээ (News)                    — lowest-frequency, stays last
```

**Within each Model page**, the hierarchy (validated against all 12 researched brands in Phase 1) is:

```
Hero (name + price/monthly payment + 2 CTAs)
  → Sticky sub-nav (anchors + pinned Test Drive CTA)
  → Overview/Statement (positioning, one strong image)
  → Exterior gallery
  → Interior gallery
  → Technology highlights (benefit-titled, not bullet specs)
  → Color configurator
  → Full specifications (accordion/table — detail-seekers only, not forced on everyone)
  → Financing terms specific to this model
  → Warranty reminder (repetition, not a one-off)
  → FAQ (model-specific + universal)
  → Related models (cross-sell within our own lineup, not competitors)
  → Lead form (test drive / info request)
```

This ordering matches the "feature storytelling first, specs quarantined to the bottom" principle from Phase 1 §7 — emotional case before spec sheet.

---

## 5. Conversion Funnel

Three funnel entry tiers, matched to commitment level, all converging on the same lead pipeline:

### Tier 1 — Zero-commitment (browse)
- Homepage hero, model showcase, mega menu browsing, gallery viewing, spec reading.
- No form, no data capture — pure information consumption. This tier must never gate content behind a form (no "enter your email to see specs" patterns — that's a trust violation for a brand still building credibility).

### Tier 2 — Low-commitment (signal interest)
- "Info request" lead type — name + phone only, optional model, no date/time required.
- Newsletter/offer awareness (viewing `/special-offers` without acting).
- This tier is the safety net for Persona A (comparison shopper not ready to commit to a date) — losing this tier loses the largest persona.

### Tier 3 — High-commitment (ready to act)
- "Test drive" booking (name, phone, model, date required).
- "Financing" application (budget numbers + model + contact).
- "Service"/"Parts" request (Persona D's equivalent high-commitment action).
- Direct call/WhatsApp/Messenger click — the *highest* commitment, bypasses the form entirely; the site's job here is just to make the phone number/WhatsApp link unmissable, not to intercept it with a form.

**Funnel leakage points to actively design against** (informed by Phase 1's dealer-handoff research):
1. **Price opacity** — if a visitor can't find a price or a monthly-payment estimate within the first screen or two of a model page, they leave to a competitor. Mitigate: price/financing hint visible in hero, not just in a buried specs table.
2. **Form friction** — every optional field that looks required is a drop-off point. Mitigate: keep only name + phone truly required across all lead types (already correctly enforced in [leads.ts](../../src/lib/leads.ts) validation).
3. **Dead-end pages** — any page ending without a next-step CTA (a Phase 1 pattern: "every PDP ends with a conversion ladder"). Every page in the sitemap should end in at least one CTA, never just a footer.
4. **Single-channel dependency** — a visitor who doesn't want to fill a form or make a call needs WhatsApp/Messenger as an equally-visible third option, especially for younger buyers (Persona A skews toward chat-first communication).

---

## 6. CTA Hierarchy

Directly applying Phase 1 §2's two-verb grammar, adapted to Mongolian and to our actual lead types.

### The two universal verbs
| Tier | Verb (MN) | English gloss | Use |
|---|---|---|---|
| Learn | **Дэлгэрэнгүй үзэх** | "View details" | Every model card, every offer card, every news card — the default low-commitment action |
| Transact | **Тест драйв захиалах** | "Book a test drive" | The single highest-emphasis button on every model page, repeated in hero + sticky bar + closing block |

### Secondary CTA vocabulary (used sparingly, never competing with the two above for visual weight)
- **Хүсэлт илгээх** ("Send a request") — used only where "test drive" doesn't fit contextually (financing, service, parts, general contact) — this is Tier 3's variant for non-test-drive intents, not a synonym for the primary CTA.
- **Зээлийн тооцоолуур** ("Financing calculator") — a distinct third verb reserved exclusively for the financing persona's entry point, since forcing Persona C through "book a test drive" language would feel mismatched to their actual need.
- **Залгах** ("Call") / **WhatsApp** / **Messenger** — always icon + label, never disguised as a form-adjacent button; these are direct-channel escapes, not part of the two-verb system.

### Hierarchy rule (visual weight, not defined here but binding for Phase 4 design)
1. **Primary (filled, red accent):** Тест драйв захиалах — exactly one per viewport, never two competing primaries visible at once (a direct fix for the current site's occasional "Хүсэлт илгээх" and "Дэлгэрэнгүй үзэх" appearing with equal visual weight side by side).
2. **Secondary (outline/ghost):** Дэлгэрэнгүй үзэх, Зээлийн тооцоолуур — supporting actions, always visually subordinate to the primary.
3. **Tertiary (text link or icon-only):** Call/WhatsApp/Messenger — present everywhere (nav, floating CTA, footer) but never competing for primary visual weight.

### What this fixes from the current implementation
Auditing the current codebase against this hierarchy: [hero.tsx](../../src/components/jetour/hero.tsx) currently pairs "Дэлгэрэнгүй үзэх" and "Тест драйв захиалах" as visually equal buttons — under this strategy, test-drive should read as clearly primary (filled) with details as secondary (outline), consistent with every brand studied in Phase 1.

---

## 7. Trust Strategy

The single most important strategic layer for a newer-entrant brand, per Phase 1's Jetour UAE finding (10yr/1M km warranty repeated at 3+ touchpoints as the #1 differentiator against established brands).

### Trust pillars, in priority order
1. **Warranty terms** (4 years / 150,000 km) — repeated at: homepage stats band (exists), every model page (currently absent — add), the lead form itself (currently generic copy — replace with the specific number), and the FAQ.
2. **Official distributor credentials** — "Sain Motors ХХК, JETOUR-ийн албан ёсны дистрибьютер, 2023 оноос хойш" is already present in Contact/Footer; this should also appear on the Brand page and Dealer page as a repeated, not one-time, statement — legitimacy claims work by repetition, not a single "About" paragraph.
3. **Real showroom photography, not stock/render imagery** — the existing showroom photo carousel on `/dealer` is a trust asset; it should be referenced (thumbnail + link) from the homepage contact section too, not siloed to one page.
4. **Financing transparency** — showing actual bank partner names, rates, and terms (not "contact us for financing details") builds more trust than it costs in complexity; this is already mostly done in [financing/page.tsx](../../src/app/financing/page.tsx) and should be treated as a trust asset, not just a utility page.
5. **Service infrastructure proof** — "4S standard service center," parts availability, service hours — these de-risk the *ownership* decision, not just the purchase decision, and matter to Persona A/C who are evaluating "what happens after I buy" as part of the brand decision.
6. **Social proof channels** — Facebook/Instagram/YouTube links are present; over time, embedding real customer testimonials or delivery photos (when available) would strengthen this further, but is not a blocker for this redesign.
7. **No fake urgency** — per Phase 1 §11 ("what not to import"), avoid countdown timers or generic scarcity messaging; if an offer has a real expiration date, state it plainly. Manufactured urgency reads as low-trust for a brand that needs to build trust, not spend it.

### Trust-strategy rule for Phase 3/4
Every page template must have a designated slot for at least one trust element (warranty line, distributor credential, or financing transparency) — trust should not be confined to a single "About" or "Brand" page.

---

## 8. Dealer Strategy

Unlike every researched brand except Jetour's own regional sites, **Jetour Mongolia has exactly one dealer** (Sain Motors, one showroom). This fundamentally simplifies the dealer strategy relative to Phase 1's multi-dealer patterns (locator maps, "find a dealer near you" flows) — those patterns don't apply here and should not be imported.

### What the single-dealer model means for the site
- **No dealer locator needed.** The `/dealer` page is not "find a dealer," it's "learn about and get directions to *the* dealer" — its job is orientation and trust (showroom photos, map, hours), not choice.
- **Branch selector in lead forms should be minimized, not featured.** The current lead form already handles this correctly (`disabled={BRANCHES.length === 1}` in [enhanced-lead-form.tsx](../../src/components/jetour/enhanced-lead-form.tsx)) — keep this pattern; do not add UI complexity for a choice that doesn't exist.
- **Contact information should be omnipresent, not just on a Dealer page.** Since there's no "which dealer" decision to make, phone/WhatsApp/address should appear in the footer of every page, the floating CTA, and the nav — removing friction between "I'm interested" and "I can reach them" everywhere, not funneling everyone through one Contact page.
- **The Dealer page's real job is de-risking the visit**, not routing: showroom photos, exact hours (including weekend hours, which differ from weekdays per [branches.ts](../../src/lib/branches.ts)), parking/access notes if relevant, and a map — everything needed to make walking in for the first time feel low-friction.
- **Future-proofing:** the codebase already anticipates multiple branches (`BRANCHES` is an array, `branches.ts` comment explicitly says adding a branch should only require editing that file) — the IA and lead form should degrade gracefully to a real locator/selector *if* a second showroom opens, but should not be over-engineered for that case today.

---

## 9. Test Drive Strategy

Directly informed by Phase 1's cross-brand test-drive research (Tesla/Zeekr/Xiaomi's model-first-person-second-time-last pattern; Genesis's auto-suggested location; Jetour UAE's one identified flaw being a model dropdown instead of visual selection).

### Flow design principles
1. **Model pre-fills when arriving from a model page.** Already supported (`modelName` prop threading into `EnhancedLeadForm`) — ensure every "Тест драйв захиалах" CTA on a model page carries this context forward; a visitor should never have to re-select the model they were just looking at.
2. **Branch is invisible** (per §8 — only one real answer, don't ask).
3. **Required fields stay to name + phone + date** — everything else (time, message, contact method preference) is optional, matching the existing Zod schema's actual requirements ([leads.ts](../../src/lib/leads.ts): only `name`, `phone` are strictly required at the schema level; `date` is enforced client-side only for the test-drive type).
4. **Time-of-day chips over precise time slots where reasonable** — Jetour UAE's "Anytime / Morning / Afternoon / Evening" pattern reduces decision fatigue versus our current 21-slot dropdown ([enhanced-lead-form.tsx](../../src/components/jetour/enhanced-lead-form.tsx) `TIME_SLOTS`); worth simplifying in Phase 3/4, since a single-showroom operation confirms exact time by phone anyway.
5. **A committed response-time promise should be visible near the form** — e.g., "Манай баг 24 цагийн дотор холбогдоно" (already present in the success state) should also appear *before* submission, not only after, to reduce the anxiety of "will anyone actually call me back."
6. **WhatsApp as a parallel booking channel**, not just a floating icon — for Persona A (chat-first, younger), being able to message "test drive X70 Plus Saturday" directly via WhatsApp instead of filling a form is a real conversion path and should be treated as equally valid, not a fallback.

### What test-drive booking should NOT do
- Should not require an account/login (no e-commerce infrastructure exists or is planned).
- Should not require a deposit or payment (matches every dealer-handoff brand studied, none of which charge for test drives).
- Should not gate the date picker behind inventory-availability logic we don't have — the current simple "pick a date, sales confirms by phone" model is appropriate at our scale and should not be over-engineered into a fake real-time booking system.

---

## 10. Lead Generation Strategy

### Channel strategy — matching intent to channel
| Intent signal | Best channel | Why |
|---|---|---|
| "Just looking, maybe interested" | Info-request form | Lowest friction, no date commitment |
| "Ready to see the car in person" | Test-drive form | Structured enough for sales to prep |
| "Need to know if I can afford this" | Financing form (with calculator numbers attached) | Sales rep receives pre-computed numbers, can respond with real terms immediately |
| "I own one, need service" | Service/parts form | Fully separate queue from sales — should never be mixed with sales leads in review |
| "I have a quick question" | WhatsApp/Messenger/call | Bypasses forms entirely — must stay one tap away everywhere |

### Lead quality over lead volume
Since every lead currently lands in Telegram for a small team to action by hand (not a CRM with automated routing), **lead quality matters more than raw volume** — a form that captures "name, phone, model, and a monthly-payment number already calculated" is worth more to the sales team than ten bare "call me" leads with no context. This argues for:
- Keeping the financing calculator's output attached to financing-type leads (already implemented — preserve this).
- Encouraging (not requiring) the model field on info-request leads, since it's the single most useful piece of context for a fast, informed callback.
- Never removing the `message` field — free-text context is disproportionately useful when the receiving end is a human reading Telegram messages, not a database query.

### Lead source tagging (a gap to note, not fix in this phase)
The current lead schema has no `source` or `utm` field — as the site grows to serve Facebook/Instagram ad traffic explicitly, knowing which page/campaign generated a lead becomes valuable for the business (not urgent for this redesign, flagged for a future technical phase).

### Deflection strategy (reduce unnecessary human load)
Per Phase 1's FAQ-accordion pattern: a well-built FAQ per model (financing terms, warranty specifics, delivery timeline, service intervals) answers the questions that currently generate low-value phone calls, freeing the sales team's time for actual qualified leads. This is a lead-generation strategy as much as a content strategy — every question answered on-page is a call the team doesn't have to spend time on before the *real* conversation (test drive, price negotiation) can start.

---

## 11. Mobile-First Strategy

Given Mongolia's mobile-majority internet usage pattern (consistent with most emerging-market automotive traffic), mobile is not a secondary breakpoint — it is the primary design target, with desktop as the expanded canvas.

### Non-negotiables carried from Phase 1's mobile pattern research
1. **Sticky bottom/top CTA bar on every model page**, carrying the primary "Тест драйв захиалах" action at all times — never require scrolling back up to convert (already partially implemented via the sticky sub-nav; needs the mobile-specific tightening noted in Phase 1 §3).
2. **Full-screen or slide-panel drawer navigation** rather than a cramped inline mobile menu — the current mobile drawer implementation in [navbar.tsx](../../src/components/jetour/navbar.tsx) already follows this; preserve and refine, don't replace.
3. **Swipe-first galleries with visible progress indication** (dots or counters) — already implemented in [gallery.tsx](../../src/components/jetour/gallery.tsx); this pattern should extend consistently to every image collection on the site, including news and offers.
4. **Tap targets sized for thumbs, not cursors** — all primary CTAs, nav items, and form fields need a minimum comfortable tap area; this becomes a binding constraint for Phase 4's component sizing, not just a nice-to-have.
5. **Forms that don't require zooming or horizontal scrolling** — every lead form field must render at full width on mobile with no pinch-zoom needed to read labels or tap fields correctly.
6. **Click-to-call and click-to-WhatsApp as literal `tel:`/`wa.me` links everywhere a phone number appears** — already correctly implemented (`CONTACT.phone1Href`, `CONTACT.whatsapp`); this is a mobile-specific win (desktop visitors get no benefit from `tel:` links) and should never regress.
7. **Reduced motion and payload discipline** — mobile connections in Mongolia outside the capital can be slower; hero imagery, video backgrounds, and animation should degrade gracefully (respecting `prefers-reduced-motion`, which the design-system CSS added this session already supports) and never block interaction while loading.
8. **Time-of-day chips over long dropdowns** (per §9) — dropdowns with 20+ options are meaningfully harder to use on a touchscreen than a row of 4 tappable chips.

### What "mobile-first" means for Phase 3/4 process
Every page template and component in the next phases should be designed and reviewed at mobile width *first*, with desktop treated as an enhancement (more columns, larger imagery, hover states) rather than mobile being a cramped-down version of a desktop-first design. This reverses how some of the current codebase appears to have been built (several components show desktop-first class ordering with mobile as an afterthought override) and should be treated as a working principle for all new/refactored components going forward.

---

## Summary — what carries forward to Phase 3

This strategy resolves to a short list of binding decisions Phase 3 (information architecture / page-by-page spec) must honor:

1. Two-verb CTA grammar, with test-drive always visually primary and never sharing equal weight with a secondary action.
2. Warranty and distributor-credential trust signals repeated across homepage, every model page, and the lead form — not confined to one About page.
3. Single-dealer model simplifies the Dealer page to "orientation and de-risking," removes any need for a locator, and keeps branch selection invisible in forms.
4. Test-drive flow: model pre-filled, branch invisible, name+phone+date required only, time-of-day chips over slot dropdowns, response-time promise shown before submission.
5. Lead forms optimize for quality-of-context (model, message, financing numbers) over minimizing fields further than they already are.
6. FAQ per model page as both a trust/conversion tool and a support-deflection tool.
7. Financing surfaced early and often for Persona C, not buried one click deep with no cross-links from model pages.
8. Owners journey (Persona D) kept structurally separate from the sales funnel at the top-level IA.
9. Mobile-first as the working default for every component going forward, with the sticky CTA bar, swipe galleries, and tap-target sizing treated as non-negotiable baseline behavior, not enhancements.

**This concludes Phase 2.** No UI or code changes have been made. Ready for Phase 3 (information architecture and page-by-page structural specs) on your go-ahead.
