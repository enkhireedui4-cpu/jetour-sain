# Raw research — Volvo, Genesis, Lexus, Toyota (Phase 1)

Method note: Genesis (genesis.com/us/en) was fully fetchable and is documented from live content. Volvo, Lexus, and Toyota block server-side fetching or render client-side, so those sections combine partial live fetches, published design-system documentation, design reviews (DesignRush, Fonts In Use, Monotype case study), and documented knowledge current through early 2026.

---

## 1. Volvo (volvocars.com)

### Navigation
- Extremely reduced top bar: wordmark left, roughly four items — **Our Cars / Shop / Owners / About**, plus search, account, market-selector icons. No promotional clutter in the header.
- "Our Cars" opens a full-width panel that is effectively a visual model index: side-profile car cutouts on neutral background, grouped by powertrain (**Fully electric / Plug-in hybrid / Mild hybrid**) and body type, each with model name and one-line descriptor. The menu *is* the lineup page in miniature.
- Header white/transparent over heroes, becomes solid and stays sticky — quiet, never competing with content.
- Mobile: hamburger opens full-screen overlay, flat accordion list; model entries keep thumbnail images.

### Homepage
- Single full-bleed hero (photo or muted video) of one lead car, short headline, one primary CTA. No carousel of competing offers.
- Order: hero → model explorer strip (filter by electric/hybrid, horizontal cards) → "Shop online" / Care by Volvo pitch → safety/sustainability brand story blocks → offers → footer. Long, calm, one-idea-per-viewport scroll.

### Vehicle listing
- Filter chips by powertrain and body style; grid of cards, each = **studio side-profile cutout on flat light-grey**, model name in large type, sub-label ("Fully electric small SUV"), starting price, two text CTAs — **Explore** and **Build**. Uniform photography angle across all cars makes the grid read as a system.

### Vehicle detail page
- Full-screen hero with model name + price + CTAs; **sticky sub-nav appears on scroll carrying model name, anchor links, and a persistent "Design & order"/"Book a test drive" CTA**.
- Order: highlights (large image + short claim, alternating) → interior/design → safety → range/charging (EVs) → **Specifications** (collapsed accordion tables) → offers → related models.
- Galleries restrained: full-width stills and short loops rather than busy carousels.

### CTAs
Two verbs dominate: **"Explore"** (learn) and **"Build"/"Design your own"** (configure), plus **"Book a test drive"** and **"Shop online"**. Often text links with arrow, or slim rectangular buttons — never loud.

### Typography
- Custom **Volvo Novum** (humanist grotesque; heavier display cut **Volvo Broad**). Headlines large but light-to-regular weight, sentence case, generous line-height; body small and quiet. Contrast from *size*, not weight or color.
- Public design system (`@volvo-cars/css`) is token-driven — colors, grid, spacing, typography all tokens.

### Whitespace / grid
Near-monochrome UI (white, off-white surfaces, charcoal text), one accent used sparingly, 12-col grid with wide margins, very tall vertical rhythm (120–160px+ gaps). Photography: Scandinavian light, desaturated landscapes, cars small in frame as often as large.

### Cards
Minimal: no borders, no shadows, square or barely-rounded corners; flat background swatch behind car cutouts; text below image, left-aligned. Hover = subtle image scale or link underline.

### Motion
Slow fades, gentle scroll-reveals, muted autoplaying video, no parallax theatrics — "editorial" motion matching the safety-and-calm story.

### Test drive / dealer / finance
Dedicated form flow pre-filled with model from PDP CTA; retailer auto-suggested by ZIP. Notable for **direct online ordering** and **Care by Volvo** subscription — "Shop online" is a first-class nav concept.

### Conversion notes
Fewest choices per screen of any brand studied; every PDP scroll position keeps one configure/test-drive action reachable; campaign-coded CTAs show disciplined funnel measurement.

---

## 2. Genesis (genesis.com/us/en) — fully verified live

### Navigation
- Top-level: **MODELS / ELECTRIC / SHOP / Discover**, plus **Build Your Own** and **Find A Retailer**. Sticky on scroll.
- MODELS mega menu: **SUVs** (GV60, GV70, Electrified GV70, GV80, GV80 Coupe), **Sedans** (G70, G80, G90) — each with image, model year, "Starting MSRP"; concept cars listed separately.

### Homepage (live section order)
1. Video hero: 2027 GV70 "FEEL THE THRILL" → "EXPLORE THE GV70" + view offers.
2. 2026 GV80 "MAGNETIC COMFORT & DESIGN" → explore/offers.
3. G70 Prestige Graphite "THE G70, INTENSIFIED".
4. 2027 G80 "ADVANCED ELEGANCE".
5. **"Our Lineup"** — horizontal carousel with filter tabs **All / SUV / Sedan / Electric**; each card: image, year, name + Starting MSRP, two actions (explore + build).
6. **"The Latest"** — editorial cards (concepts, motorsport, Genesis House).
- Pattern: homepage is 3–4 full-bleed model billboards, one per model, same two-CTA formula, all-caps short headlines.

### Vehicle listing
"Our Lineup" carousel + mega menu double as the listing; filterable by body/powertrain; every card carries price transparency (Starting MSRP) and a build shortcut.

### Vehicle detail page (verified: GV70)
Hero (Starting MSRP, full-width video, CTAs "CUSTOMIZE THIS BUILD" / "REQUEST A QUOTE") → GALLERY (tabbed: Overview / Exterior / Interior / Technology) → trim spotlight → **CHOOSE YOUR TRIM** comparator → DESIGN → TECHNOLOGY → PERFORMANCE → SAFETY (each a tabbed feature module with benefit-titled tabs) → Specifications → AWARDS (IIHS/NHTSA) → THE GENESIS EXPERIENCE (Concierge, maintenance, coverage) → **SHOPPING TOOLS** (BUILD YOUR GV70 / SEARCH INVENTORY / REQUEST A QUOTE / SPECIAL OFFERS) → email capture.
Sticky top nav persists; floating gas/EV toggle cross-links to Electrified variant.

### CTAs
Rigid verb system, always uppercase: **EXPLORE** (learn), **BUILD/CUSTOMIZE THIS BUILD** (configure), **REQUEST A QUOTE**, **CONTACT CONCIERGE**. Every model section pairs one explore + one transactional CTA.

### Typography
Custom **Genesis Sans** (derived from Hyundai Sans; "Quietly Iconic," Roman-capital-inspired). **All-caps display headlines with wide tracking**, thin-to-regular weights, tiny uppercase labels — classic luxury "engraved" look. Big contrast between hero display type and small body copy.

### Whitespace / layout
Stated design language: **"Beauty of White Space"** — emptiness treated as material. Dark full-bleed cinematography alternating with white spec/utility sections, copy blocks capped at 1–2 lines, single-column centered text, no sidebars, ruthless editing.
Palette: black/white plus **copper** accent, used only for fine lines and highlights.

### Cards
Sharp corners (0 radius), no visible borders/shadows; image-led with caption-style text; uppercase micro-labels.

### Test drive / dealer / finance (verified)
`/us/en/schedule-test-drive`: 5-step single-page form — model → powertrain → package → personal info → auto-suggested dealership by ZIP → preferred date/time → consent → "CONTACT CONCIERGE". **Genesis Concierge** is the differentiator: white-glove human layer wrapping the digital funnel (at-home test drives, paperwork delivery).

### Conversion notes
MSRP shown at every touchpoint (menu, cards, hero); every PDP ends in a 4-tile shopping-tools block + email capture; quote requests routed through concierge rather than raw dealer handoff.

---

## 3. Lexus (lexus.com)

### Navigation
Dark (near-black) header: "L" mark left; top-level ~**Vehicles / Shopping / Discover Lexus / Owners**, plus search and ZIP/dealer utilities. Vehicles mega menu = category tabs (Sedans, SUVs, Performance, Electrified) with model thumbnails, name, "starting at" MSRP, key stat.

### Homepage
Tagline "Experience Amazing." Dark, clean aesthetic; full-bleed high-res photography primary content. Signature interaction: **images enlarge and reveal text on hover** — imagery itself is navigation.
Order: cinematic hero → model discovery band → current offers → electrified story → craftsmanship editorial → dealer locator with map → footer.

### Vehicle listing
Category pages list models as large image cards: name, starting MSRP, MPG/range estimate, paired CTAs (**Explore / Build**).

### Vehicle detail page
Hero with model name + starting price → anchored sub-nav (Gallery, Features/Design, Performance, Technology, Safety, Specs, Offers) → trim/packages comparison with pricing → gallery (exterior/interior tabs, driver's-POV interior shots a house signature) → Lexus Safety System+ block → specifications tables → offers → dealer/inventory CTAs.

### CTAs
**"Build Your Lexus"** flagship CTA brand-wide; supported by Search Inventory, Payment Estimator, Find a Dealer, View Special Offers. Dark layouts use white-outline "ghost" buttons; primary actions occasionally filled.

### Typography
**Nobel** (geometric sans, Frere-Jones revival) historically the brand face — understated short titles, all-caps small labels, limited body text.

### Whitespace / grid
Premium feel via **dark negative space** rather than white: charcoal/black canvases, restrained copy, large imagery. Wide full-bleed bands rather than boxed grids.

### Test drive / dealer / finance
Dealer-centric: interactive dealer-locator map surfacing local offers; test drives requested through dealer pages; Lexus Financial Services integrated for payment estimation.

---

## 4. Toyota (toyota.com)

### Navigation
White header. Top-level: **Vehicles / Shopping Tools / Owners / Search Inventory**. Vehicles mega menu: left-rail categories (Cars & Minivan, Trucks, Crossovers & SUVs, Electrified), right side dense grid of model thumbnails with base MSRP and EPA-est. MPG — the densest menu of the four brands, a catalog not a mood board.
Shopping Tools menu: Special Offers, Payment Estimator, Search Inventory, KBB Trade-In Value, "What Fits My Budget," Brochures, Compare, Certified Used.

### Homepage
Rotating hero carousel (launches + regional offers) — unlike the luxury brands, Toyota accepts a multi-message hero. Then vehicle category browser (tabbed) → Special Offers module (ZIP-localized) → SmartPath online-buying promo → electrified/hybrid story → Toyota Safety Sense content → footer.

### Vehicle listing
Filter chips (category, seating, price, MPG, powertrain); uniform cards with front-3/4 studio shot, model name, base MSRP + est. MPG, links to Explore / Build & Price.

### Vehicle detail page
Model hub + child pages: overview, features/specs, photo gallery. Overview: hero with headline + MSRP/MPG stat bar → sticky model sub-nav with persistent "Build" CTA → trim selector with pricing cards → design/tech feature blocks (interactive color pickers, rotatable 3D models on halo vehicles) → Toyota Safety Sense section → offers → tools row (Payment Estimator, Inventory, Compare).
Toyota's UX writing confirms deliberate IA work: tree-tested navigation, single consolidated flow serving both shoppers and owners.

### CTAs
Transaction-forward, red-filled buttons: **"Build & Price"** dominant, plus Search Inventory, View Offers, Estimate Payment, Find a Dealer. Red reserved almost exclusively for CTAs against white/grey UI.

### Typography
**Toyota Type** (custom, Monotype) — geometric-humanist sans; Black weight for headlines, Light for refined messaging; designed to stay legible in small details (numbers, buttons) — built for spec-dense UI.

### Whitespace / grid
Practical, denser than the luxury three: 12-col grid, boxed content bands alternating white/light-grey, more items per viewport. Whitespace functional, not expressive.

### Test drive / dealer / finance
**SmartPath**: real-time dealer inventory + transparent pricing, payment customization, KBB instant trade-in valuation, financing application — fully online purchase path (1M+ vehicles sold through it as of Sept 2025). Test drives booked via dealer detail pages.

### Conversion notes
MPG + MSRP on every card and menu item; payment-first framing; trade-in valuation injected mid-funnel; entire IA funnels toward Build & Price / Inventory within one click.

---

## What makes Volvo & Genesis feel calm and premium

1. **One message per viewport.** Full-bleed billboards — hero image/video + short headline + max two CTAs — never two competing offers in one scroll position.
2. **A two-verb CTA grammar.** Volvo: Explore/Build. Genesis: EXPLORE/BUILD. Same pair everywhere → users trust buttons instead of reading them.
3. **Type does the luxury work.** Custom single typeface, huge display sizes at light/regular weight (Volvo, sentence case) or all-caps wide tracking (Genesis), tiny quiet body text. Hierarchy via size contrast, not bolding/coloring/badges.
4. **Chromeless components.** No card borders, no drop shadows, 0 or near-0 corner radius. Content separated by whitespace alone.
5. **Disciplined color.** Effectively monochrome UIs + one restrained accent, used only for signal, never decoration.
6. **Systemized photography.** Identical angles/ratios across every model card — a grid that reads as a curated system, not an assembly.
7. **Whitespace as declared philosophy, tokenized.** Genesis brands it "Beauty of White Space"; Volvo encodes spacing/typography/color as design tokens so the rhythm is enforced, not aspirational.
8. **Human service woven into the funnel.** Genesis Concierge, Volvo's Care by Volvo — premium feel is partly *funnel* design, not just visual.

---

## Patterns common to these brands

1. **Sticky header + a second sticky layer on model pages** (anchored sub-nav or floating Build/Test-drive CTA).
2. **Mega menu = mini lineup page**: model thumbnails grouped by body style/powertrain with starting price shown directly in the menu.
3. **Homepage formula**: full-bleed hero for one lead model → filterable model carousel/grid → offers → brand story → footer.
4. **Uniform vehicle cards**: consistent studio angle, model name, starting MSRP (+ MPG/range), exactly two CTAs — one learn, one transact.
5. **PDP canonical order**: hero → gallery (tabbed) → trim selector with pricing → Design → Technology → Performance → Safety modules → specs (accordion/table) → awards/safety ratings → offers → closing shopping-tools block → email capture.
6. **The Explore/Build verb pair** is industry-standard; "Build & Price" always the highest-emphasis button.
7. **ZIP-code personalization** gates offers/inventory and auto-suggests nearest dealer/retailer on every test-drive form.
8. **Feature storytelling via benefit-titled tabs/cards** instead of spec bullets; raw specs quarantined in collapsible tables near the bottom.
9. **Electrification as a first-class nav facet**, often with gas↔EV cross-links on PDPs.
10. **Motion restraint scales with price point**: luxury = slow video/fades; mass-market = more carousels/interactive 3D — none use aggressive parallax.
11. **Mobile pattern**: full-screen drawer nav with accordions, swipe galleries, sticky bottom CTA bar on model pages.
12. **Every PDP ends with a conversion ladder** — build → inventory → quote/test drive → email signup — capturing users at a lower commitment level.
