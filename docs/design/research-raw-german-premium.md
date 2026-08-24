# Raw research — Mercedes-Benz, BMW, Audi (Phase 1)

Method note: Mercedes-Benz and BMW findings come primarily from live fetches of mbusa.com and bmwusa.com (US sites share the same global design system). Audi findings from live inspection of audiusa.com plus audi.com and published design-system documentation. July 2026.

---

## Mercedes-Benz (mbusa.com)

### Navigation
- Top-level: **Vehicles, Electric, Shopping, Owners** + My Account + Find a Dealer. "Electric" elevated to top-level — an EV-strategy statement in the IA itself.
- Vehicles mega menu organizes by body style with model thumbnails.
- Sticky header. Mobile nav is a **slide-panel drill-down** (panels slide in from the right with chevron-back header per level).

### Homepage layout
(1) campaign hero with countdown timer and dual CTAs, (2) brand-experience feature, (3) single-model spotlight, (4) **Shopping Tools grid**, (5) powertrain chooser (Electric / Plug-In Hybrid / Gas), (6) discovery, (7) **Future Vehicles carousel**, (8) offers & benefits, (9) social, (10) footer. Models showcased via campaign heroes + carousels, not a lineup dump.

### Vehicle listing
- Grouped by body style, then class. No dynamic filters — structured browsing only.
- Card contents: model name, **starting price (or "Price Coming Soon")**, one-line tagline, product image, **expandable trim list with per-trim prices**, and a "Build" button per card.

### Vehicle detail page (GLC)
1. Hero: full-width image, alliterative headline ("Advanced. Athletic. Adventurous."), **"Build Yours"** CTA.
2. **Sticky in-page anchor nav: Models / Exterior / Interior / Safety / Tech / AMG**, plus persistent "Special Offers" link.
3. Models section: trim carousel — each trim shows price, 0-60, HP, torque, own "Build" + "View Model" buttons.
4. Feature sections as **carousel galleries with expandable detail text under each image**.
5. AMG performance spotlight with own CTA.
6. "View Inventory" repeated top and bottom; "Request a quote" available.

### CTA strategy
"Build Yours" / "Build" is the primary verb everywhere. Secondary: "View Inventory", "View Offers", "Contact Dealer", "Request a quote". Every "Contact Dealer" click routes to a centralized lead form.

### Typography
- Headings: **MB Corpo A Title Cond** — a condensed serif title face. Body: MB Corpo S Text (sans). The **serif-display-on-sans-body split is the Mercedes editorial signature**.
- Strong scale contrast: very large serif headlines, small quiet body text.

### Whitespace/grid
Generous full-bleed imagery alternating with contained text blocks; consistent column grid; disclaimers in tiny footnote text.

### Cards
Soft rounded corners (4 corner-radius tokens), minimal borders, elevation via image contrast rather than heavy shadows; studio-shot cars on light neutral backgrounds; ~16:9 imagery.

### Motion
Carousel-driven feature storytelling, subtle fade/slide scroll reveals, campaign hero video loops, countdown timer for urgency.

### Test drive / dealer / finance
Dealer handoff model: "Contact Dealer" lead form is the universal conversion. Offer cards show lease payment, term, due-at-signing, expiration date. On mercedes-benz.de: "Probefahrt vereinbaren" via dealer search.

### Conversion details
Countdown timers; per-trim "Build" buttons; centralized lead-intercept form; "Price Coming Soon" cards capture interest for unreleased models.

---

## BMW (bmwusa.com)

### Navigation
- Top-level: **Models, Build Your Own, Shopping, Electric, Owners, About Us**. **"Build Your Own" is a top-level nav item** — configurator one click from anywhere.
- Models menu groups by body-style tabs with series thumbnails.
- Sticky header; mobile is a full-screen hamburger drawer.

### Homepage layout
(1) offer-led hero, all-caps headline **"FIND YOUR DRIVE"**, financing message with deadline, (2) localized dealer discovery, (3) sequential **lease offer cards with monthly pricing**, (4) Consumer Reports trust badge, (5) lease promo, (6) entertainment partnership, (7) loyalty program, (8) CTA hub ("Ready to find your next BMW?"), (9) financial services, (10) footer. Most overtly **offer/price-forward** of the three.

### Vehicle listing
- Body-style tabs; models sequenced by series, segmented Core vs **M variants** vs Electrified.
- Each entry: model name + descriptor, engine spec line small, **starting MSRP**, two CTAs: **"Build Your Own"** and **"Shop Inventory"**.

### Vehicle detail page (3 Series — the deepest page of the three)
1. Hero: "THE 3 / Precision at play" + **"Build yours" / "Shop inventory"** dual CTA.
2. Lease-from price block directly under hero.
3. **Sticky anchor nav: Test drive / Offers / Technical Highlights / Design / Technology / Driving Dynamics.**
4. Positioning copy.
5. Models section with **Core vs M tabs**; side-by-side **specs comparison table** (0-60, HP, MSRP) with per-model Build buttons.
6. Test-drive event registration embedded mid-page.
7. Exterior design cards; **interactive exterior color swatch selector** with thumbnail carousel.
8. Interior design cards + upholstery selector.
9. Technology cards; Driving Dynamics cards.
10. **13-item FAQ accordion** (SEO + objection handling).
11. Cross-links to other series, footer.

### CTA strategy
"Build yours" hero primary; "Shop inventory" constant secondary. FAQ answers deep-link to inventory, payment calculator, financial services.

### Typography
- **BMW Type Next**. Headlines bold 700, often ALL CAPS for campaign lines; body Light 300 — deliberate heavy/light weight contrast rather than serif/sans contrast.

### Whitespace/grid
Tighter, denser than Mercedes; 12-col grid with three-up feature card rows recurring.

### Cards
Squared/sharp corners (flat, technical look), thin hairline dividers, spec text in small caps labels; lifestyle photography more than studio white.

### Motion
Hero video loops, scroll-triggered fade-ups on card rows, tabbed transitions, color-swatch selector swaps vehicle image live.

### Mobile
Anchor nav collapses to horizontally scrollable chip row; comparison table becomes swipeable columns; offer cards full-width with monthly price as the largest element.

### Test drive / dealer / finance
- **A "Test drive" anchor is built into every model page** plus a national booking portal: pick model → pick dealer/time → form → dealer confirms.
- Finance: payment calculator, lease/APR offer cards, financial-services value-prop on homepage.

### Conversion details
Monthly lease price above the fold; deadline-driven offer copy; dual persistent CTAs (configure vs in-stock); FAQ accordion capturing purchase-intent search; test-drive registration embedded mid-page.

---

## Audi (audiusa.com)

### Navigation
- Top-level: **Models, Find & Buy, Owners** (+ myAudi, dealer selector with "Use my current location").
- "Find & Buy" mega menu: New inventory, Pre-owned, Certified pre-owned, Locate dealer, Offers, Financial Services, Trade-in estimate, **Compare Vehicles**, Accessories, exclusive program.
- Mobile: hamburger → full-screen drawer with accordion groups.

### Homepage layout
(1) campaign hero → "View offers" / "View inventory", (2) **interactive model finder directly on the homepage** — filter chips (All / New / Electric / Hybrid / Gasoline / S & RS / Coupe / SUV / Sportback / Sedan / Avant), each family with a **model count badge**, (3) featured lease offer with full disclosure link, (4) model spotlight cards, (5) category tiles, (6) new-launch feature with "Build the all-new Q7", (7) inventory search block, (8) Digital Services. Notably **dark-themed (near-black) sections** — the most cinematic of the three.

### Vehicle listing
The homepage model finder IS the lineup browser: chip filters by powertrain and body style. Underlined text links with trailing arrow ("Discover Audi A5 →") instead of boxed buttons — an Audi signature.

### Vehicle detail page (2026 A5)
1. Hero: model name + **"Starting at $50,200"** + "View key MSRP info" + dual CTA **"Build & price" / "Search inventory"** (+ IIHS safety badge).
2. **Sticky sub-page bar pinning model name + "Build & price"** as you scroll — the configurator CTA never leaves the screen.
3. **Embedded mini-configurator** on the model page: key specs, 4-angle image slider, "Continue build."
4. "Highlights" feature carousel.
5. Design section (numbered 1-2-3-4 hotspot carousel).
6. **Performance stat block: 268 HP / 295 lb-ft / 0-60 in 5.6 sec as oversized numerals.**
7. Technology carousel; Maintenance & Warranty; **"Shopping tools" block: Build & price / Search inventory / Contact dealer**.
8. 9-item FAQ accordion; **"Similar models" cross-sell cards** each with starting price, passenger count, engine, HP + "Discover" and "Build & price".

### CTA strategy
Primary verb pair: **"Build & price"** + "Search inventory". Discovery: "Discover [model]", "Explore [model]". The sticky Build & price bar is the most aggressive configurator push of the three.

### Typography
- **Audi Type** (variable, 56 weights across Extended/Normal/Condensed); headlines set in normal weight at large sizes (contrast via size, not boldness). All-sans, geometric, left-aligned.

### Whitespace/grid
Design system prescribes generous page margins (up to 96px desktop) and a reduced palette: 9 grayscale tiers + 3 accent hues. Site alternates black and white full-bleed bands.

### Cards
**Zero border radius — hard rectangular cards**; no visible borders or shadows, separation purely via background contrast; large 16:9 lifestyle imagery; underlined arrow links as card CTAs.

### Motion
Numbered hotspot/step carousels; 4-angle image sliders; fade transitions between filter states; hero video on campaign banners.

### Mobile
**Sticky model-name + "Build & price" bar persists through the whole model page**; filter chips scroll horizontally; swipe-first carousels with pagination dots.

### Test drive / dealer / finance
Dealer-centric: "Locate dealer" with map/list toggle and geolocation; "Contact dealer" in every Shopping tools block. Finance: lease offers with "View key offer info" disclosure pattern. Test drives via dealer contact flow (US).

### Conversion details
Sticky always-on Build & price; configurator embedded in the model page; per-offer legal disclosure one tap away; Similar-models cross-sell with prices at page bottom; Compare Vehicles tool in the buy menu.

---

## Patterns common to all three

1. **Dual persistent CTA pair on every model page: "Build/Configure" + "Search/Shop inventory"** — configure-it-yourself for dreamers, in-stock for in-market buyers.
2. **Sticky in-page anchor navigation on vehicle detail pages.**
3. **Model detail pages follow the same skeleton**: hero (name + tagline + price + CTAs) → trims/pricing near the top → design → interior → technology → performance/safety → offers/warranty → FAQ accordion → cross-sell to sibling models.
4. **Trim/variant presentation as comparison modules with per-trim Build buttons** and 3 headline stats (0-60, horsepower, price) as oversized numerals.
5. **Lineup browsing is by body style first**, powertrain as second axis; electric elevated everywhere.
6. **Vehicle cards are spec-light**: image + name + one line + starting price + 1-2 CTAs; details deferred to the model page.
7. **Custom brand typeface with high scale contrast** (MB Corpo serif titles, BMW bold/light split, Audi Type variable) — hierarchy from size/weight, minimal decoration, no italics.
8. **Offer cards follow one formula**: monthly payment as the biggest number + term + due-at-signing + expiration date + "Offer details" + dealer-contact CTA; urgency via explicit end dates.
9. **Dealer handoff is the true conversion event**: centralized lead forms rather than e-commerce checkout; dealer locator as persistent header utility.
10. **FAQ accordions at the bottom of model pages** doing double duty as SEO capture and objection handling.
11. **Feature storytelling via horizontal carousels/swipe galleries** with expandable captions, and interactive color/angle selectors that swap the vehicle image live.
12. **Mobile pattern set**: full-screen or slide-panel drawer nav, horizontally scrollable filter chips, sticky CTA bar carrying the configurator entry, swipe-first galleries with pagination dots.
