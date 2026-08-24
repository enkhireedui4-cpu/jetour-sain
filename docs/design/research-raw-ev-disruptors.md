# Raw research — Tesla, Xiaomi EV, Zeekr, BYD (Phase 1)

Method note: tesla.com blocks direct fetching, so Tesla findings combine multiple published teardowns (Plerdy, marketer-UX, KIJO, Medium deep-dives) plus tesla.com/drive flow documentation. Xiaomi (xiaomiev.com), Zeekr (zeekrlife.com global + zeekr.eu), and BYD (byd.com global/UK + bydautomotive.com.au) were fetched live (July 2026).

---

## 1. Tesla (tesla.com)

**Navigation**
- Tiny header: wordmark left, ~5 text items — **Vehicles, Energy, Charging, Discover, Shop** — plus 3 utility icons. No phone number, no clutter (Hick's Law: fewer choices → faster action).
- Hover opens a mega menu where every model appears as **image + name + two text links** ("Learn" / "Order") — the mega menu itself is a conversion surface.
- Header is transparent over the hero, sticky on scroll.

**Homepage**
- One full-viewport hero per section; page is a stack of full-bleed "micro landing pages." Hero = latest model, headline, a **finance hook line above the fold**, and exactly two CTAs: **"Order Now" + "View Inventory"** — two buttons for two mindsets (ready-to-buy vs. still-researching).
- Subsequent full-screen tiles: other vehicles, Powerwall/Solar, Experiences, Accessories. Each tile: big image, 1 short headline, small sub-line, 2 small CTAs. In-car driving **video** replaces paragraphs of copy.

**Vehicle browsing**
- No traditional "listing page" — the mega menu and the homepage tile stack *are* the listing.

**Vehicle detail page anatomy**
- Behaves "more as a slideshow than a long web page" — full-screen scroll sections, copy/buttons/diagram labels animating in on scroll entry.
- Hero: car on minimal background, model name, and beneath it the signature **stat trio in big numbers with tiny labels: Range / 0–60 / Top Speed** — absorbed at a glance. CTAs "Order Now" / "Schedule a Drive" sit right with the stats.
- Section order (typical): hero+stats → safety → performance/AWD → range + charging (Supercharger network with hard counts, e.g. "33,435 Superchargers" — a range-anxiety CRO weapon) → interior/tech → autopilot video → **specs section that inverts to dark mode** (a deliberate visual break) → final order CTA band.
- **Configurator**: image left (~2/3), sticky right rail with options; live price updates; **Cash / Lease / Finance toggle** with monthly payment recalculated inline; savings-framing price anchoring; config saveable/shareable.

**CTAs**: plain verbs ("Order Now," "Demo Drive," "Learn More"), neutral monochrome buttons (white/ghost pairs on imagery), never more than two per section, no urgency language.

**Typography**: Tesla Slab / Gotham-style geometric sans; strict black-and-white palette; huge numeric display type for stats vs. tiny uppercase labels — extreme scale contrast is the brand signature.

**Whitespace**: radical subtraction; one message per viewport; footer dense with legal/trust links as counterweight.

**Motion**: ambient video heroes, scroll-triggered fade/rise of copy and callout labels, restrained otherwise (speed prioritized).

**Mobile**: same stacked full-screen tiles; CTAs become full-width stacked buttons under the hero image; configurator collapses to image-top/options-bottom with a **sticky price + "Continue" footer bar**.

**Test drive (Demo Drive) flow**: select model → location (auto-suggested) → date/time slot → contact details → confirm. Single page, ~4 steps, no payment. Location is asked *after* interest is committed.

**Conversion notables**: finance-rate anchoring in the hero, monthly-payment-first pricing toggle, savings framing, inventory as an alternate faster path, hard network numbers to kill range anxiety.

---

## 2. Xiaomi EV (xiaomiev.com)

**Navigation**
- Top-level: Homepage / All Models / Core Technologies / Factory / Store Locator / Services. "All Models" dropdown lists models plus **Customization** and **Model Comparison** as first-class nav items.
- Persistent hotline in footer; app-download QR codes top, middle, and bottom — the **Xiaomi Auto app is the primary order channel**; the website constantly funnels to it.

**Homepage**
- Modular vertical scroll: hero carousel → per-model spotlight sections → **4-card core-tech grid** (800V platform, super motor, smart cabin, autonomous driving) → factory story → footer.
- Each model spotlight uses a poetic tagline plus three buttons: **Details / Book test drive / Configure**. A "Coming soon" teaser builds launch hype (Apple-style).

**Vehicle detail page (SU7)**
- Order: hero with **starting price "from ¥219,900" + 3D interactive car viewer** → four-word promise (beautiful / great to drive / comfortable / safe) → exterior design → interior (4 colorways) → performance & chassis → range & charging ("up to 902 km" CLTC) → intelligence/ecosystem → safety architecture → **trim comparison table** → gallery → footer.
- Contrast with Tesla: hero leads with **price + 3D viewer**; performance numbers woven into narrative sections.
- CTAs "Book test drive" and "Configure" repeat at hero and mid-page.

**Spec presentation**: dedicated car-config page with full parameter tables per trim; model-comparison tool in the nav.

**Typography/visual**: MiSans clean geometric sans, Apple-keynote layout: huge centered headline, one-line subhead, full-bleed image/video below; feature names as bold 4-character labels.

**Motion**: embedded feature videos, 3D drag-to-rotate viewer as the hero interaction.

**Test drive flow**: single compact form — model (pre-selected) → store dropdown with **automatic geolocation of nearest store** → mobile number → **SMS verification code** → consents → **one-tap booking**. Extremely low friction: no date picker on web — the store follows up.

**Conversion notables**: price anchored in hero, comparison table on-page keeps upsell in-funnel, ecosystem lock-in story, hotline + app + web triple channel.

---

## 3. Zeekr (zeekrlife.com global + zeekr.eu)

**Navigation**
- Global brand site: ultra-minimal — logo, region/language switcher; content itself carries navigation via "Learn More" links.
- EU commerce site: minimal header with model links; selling pressure lives in page content, not chrome.

**Homepage**
- zeekrlife global: vertical scroll of **7 sequential full-width model cards**, each = large image + model name + positioning label ("Luxury Shooting Brake") + "Learn More."
- zeekr.eu: hero = newest model with dual CTAs **"Discover more" + "Book your test drive"**; then model cards; then icon-card row for services (Care / Finance / Power / Connected); then brand values.

**Vehicle listing / cards**
- zeekr.eu model cards are the most stat-complete of the four: image + name + tagline + **three spec figures per card: WLTP range, 0–100 km/h, 10–80% charging time** + price ("From 45 990 EUR") + both CTAs. Card = mini spec sheet + funnel entry.

**Vehicle detail page (001, global)**
- Order: hero image + name + positioning tagline → **in-page anchor tab bar: Exterior / Interior / Performance / Intelligence / Safety** → color picker + exterior/interior tabbed gallery → 5 exterior feature modules (icon + headline + paragraph + image) → 5 interior modules → **performance stat wall** ("0-100 in 3.3 s", "580 kW", "240 km/h", "750 km") as headline figures → battery pack options (2 cards) → intelligence modules → safety modules → footer.
- Consistent module rhythm (icon + headline + body + image) repeated across all feature sections — very systematized.

**Typography**: clean grotesque sans, Scandinavian-minimal; bold weight for model names, generous line-height; stat figures set large with small unit labels.

**Test drive flow** (zeekr.eu/test-drive): one page, three zones — (1) **model picker as selectable tiles**, (2) contact block, (3) location (country + postal code). Date/time handled after submission. Model-first: commitment builds before personal data is asked.

---

## 4. BYD (byd.com global/UK + bydautomotive.com.au)

**Navigation**
- Market retail sites (UK): 5 top-level groups — **Models (13 vehicles) / About BYD / Technology (Super DM, Blade Battery, e-Platform 3.0) / Purchasing (finance, test drive, store locator) / Ownership**. Technology gets its own nav pillar — BYD sells the battery/platform story as hard as the cars.
- Sticky top nav on model pages; expandable accordion nav on mobile.

**Homepage**
- Split value proposition: one hero block for BEV, one for PHEV ("up to 1,505 km (WLTP)" combined range — a shock-number as hero content).
- Model list is name + drivetrain-type only (no price on homepage cards in UK); the depth is on model pages.

**Vehicle detail page (Seal, AU — BYD's most conversion-tuned template)**
1. Sticky nav → 2. full-bleed hero, tagline, powertrain badge, dual CTAs **"Test Drive" + "Build & Price"** → 3. **stat callout row in display type: "3.8 s" / "390 kW" / "520 km"** with icons → 4. design narrative → 5. three feature blocks → 6. four highlight cards → 7. color & styling gallery (circular color swatches; exterior/interior tabs) → 8. interior with progressive-disclosure "Show more" subsections → 9. **variant comparison: Premium vs Performance cards side-by-side, each with its own stats and "Order Now" button** → 10. full spec table per variant → 11. test-drive booking band → 12. footer.
- Pricing withheld on page; "Build & Price" carries it — classic lead-gen pattern for dealer markets.

**Typography**: bold sans headlines, large display numerals for the stat row, conservative body sizes; denser than Tesla or Zeekr.

**Test drive**: "Book a test drive" lives under Purchasing in nav, mid-page band, and footer of every model page; flow = model → dealer selection → contact form (dealer follows up).

**Conversion notables**: technology trust-building as a nav pillar, variant cards with per-variant "Order Now", WLTP shock numbers, dealer locator prominence.

---

## Patterns common to these brands

1. **Stat trio as hero furniture**: 3-4 big numbers set in huge display type with tiny unit labels, in or directly under the hero. Number huge, label small: scale contrast *is* the design.
2. **Full-viewport scroll storytelling**: model pages are slideshows, not documents — one idea per screen, full-bleed image or video, copy fading/rising in on scroll.
3. **Minimal sticky header, 4–6 top-level items max**, transparent over hero; mega menu doubles as the vehicle listing with image + Learn/Order links per model.
4. **Twin CTAs for two mindsets everywhere**: a hot path ("Order Now" / "Build & Price") always paired with a warm path ("Demo Drive" / "Book your test drive" / "Discover more") — hero, mid-page, and page end.
5. **Test-drive form = model first, person second, time last**: pick the car (visual tiles), then minimal contact fields (phone-centric), location auto-detected; exact scheduling often deferred to a human follow-up to keep the form short.
6. **Price is a strategic lever, not a constant**: Xiaomi anchors price in the hero; Tesla anchors monthly payment/finance rate; Zeekr shows "From €X" on cards; BYD hides price behind "Build & Price" for dealer markets. All deliberate.
7. **Variant/trim comparison lives on the page** — upsell happens without leaving the funnel.
8. **Monochrome-plus-photography visual system**: black/white/grey UI, neutral or ghost buttons, all color budget spent on car photography; clean geometric sans with extreme size contrast between display numbers and micro-labels.
9. **Video sells motion**: ambient driving-footage heroes and feature videos replace paragraphs; copy shrinks to a headline + one line.
10. **Sticky conversion furniture**: sticky top nav always; sticky price/CTA rail in configurators; mobile full-width stacked CTAs and persistent bottom bars in order flows.
11. **Anxiety-killers as content**: objections answered with numbers, in the main narrative (charger counts, charge times, battery safety, platform tech).
12. **In-page anchor tabs on long model pages** so a 10+ section page stays navigable, especially on mobile.
13. **App/ecosystem funneling in dealer-light markets**: the website's job is to start a relationship, not just capture a lead.
