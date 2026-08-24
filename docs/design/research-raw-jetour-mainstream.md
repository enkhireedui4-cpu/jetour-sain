# Raw research — Hyundai, Kia, Jetour regional sites (Phase 1)

Research conducted via live fetches (July 2026) of hyundai.com/worldwide, kia.com/uk, worldwide.kia.com, jetourglobal.com, jetouruae.com, jetouregypt.com, jetour-ru.com, jetour.com.my, and allur.kz, plus search-based writeups where sites blocked fetching (hyundaiusa.com and kia.com/us render client-side; jetour.kz has a broken SSL cert — the actual KZ presence is jetour-auto.kz / allur.kz).

---

## 1. Hyundai (hyundai.com/worldwide + hyundaiusa.com)

**Navigation:** The global site is deliberately thin: Brand Journal, Vehicles, Company, Newsroom + search + language switcher. The US retail site uses a hybrid menu — exposed top-level links plus overflow — with shopping tools surfaced *inside* the nav: "Search Inventory," "Build & Price," "Request a Quote," "Find a Dealer." Dealer data (name, distance, "Schedule test drive") is injected directly into the header experience.

**Homepage:** Global homepage leads with a campaign hero, then editorial story cards tagged by theme. It is a *brand* site, not a sales site — no test-drive CTA anywhere on the global homepage. The sales funnel lives entirely on country sites.

**Vehicle listing:** The worldwide `/vehicles` page is a spec-driven filter machine: fuel type, drivetrain, seats, displacement, power, fuel consumption — with "Reset Search." The US site instead groups by body type with intent-based filters and contextual model comparison (validated by JD Power).

**VDP:** US model pages: price + EPA MPG in hero, sticky trim/CTA bar, then Design → Tech → Safety → Specs, trim comparison table, and persistent "Build & Price" / "Request a Quote."

**Key takeaway:** Hyundai splits brand storytelling and retail into separate properties, and puts *shopping tools in the nav itself* on the retail property.

## 2. Kia (kia.com/uk + worldwide.kia.com)

**Navigation:** Kia UK has the best mega menu of the set: models browsable **"By Family"** (compact / mid-size / 5-seater / 7-seater) and **"By Category"** (hatchback, saloon, estate, SUV, crossover, hybrid/electric), each category showing **thumbnail images of every model**. Nav hierarchy spans New cars / Used / Electric / Business / Owners.

**Homepage:** Carousel hero, then grid-based card blocks per model/range.

**VDP (Sportage, fetched live) — the strongest VDP pattern found in this group:**
- Hero: full-bleed image + emotional tagline ("Behind every sport, there is a Sportage")
- **Sticky anchor sub-nav**: Design / Connectivity & Convenience / Safety / Powertrains & Trims, **with a persistent sticky CTA bar: "Test Drive" / "Build" / "Calculate (finance)"**
- Interactive **360° visualizer**: pick trim → pick color via thumbnail swatches → 3D view refreshes
- Trim grid with transparent pricing: Pure £31,395 → GT-Line S £40,795, each card = thumbnail + key features list + action buttons
- Progressive disclosure ("Learn more / Show less") instead of heavy animation
- Footer repeats all 7 CTAs as an icon row: Build, Test Drive, Appointment, Finance Calculator, Keep in Touch, Brochure, Find Dealer

**Visual tone:** Post-2021 rebrand — bold sans-serif, dark/light editorial photography, generous whitespace.

## 3. Jetour Global (jetourglobal.com)

**Navigation:** Vehicles (G700, T1, T1 i-DM, T2, T2 i-DM — global site now leads with the *new-generation* off-road lineup, not the X-series), About JETOUR (Introduction, G Series, JMK Series, Technology, JETOUR Life), Explore (News, Owners, History, Global Network), Contact Us. Models get thumbnail navigation into dedicated landing pages.

**Homepage:** Two stacked full-bleed hero blocks with "Explore" buttons → a six-card **adventure narrative carousel** (cheetah-conservation campaign, Pan-American Highway traverse, etc.) → contact/engagement close. Conversion CTAs are only "Contact Us" and "Global Network" — brand-halo site; selling is delegated to distributors.

**Brand identity rules (from site + published brand material):**
- Positioning: **"Travel+"** — vehicles matched to *life scenarios* (family travel, outdoor recreation, light off-road) rather than market segments; lifestyle side = accessories, travel stations, owner community ("JETOUR Life")
- Tagline used by distributors: **"Enjoy Life, Enjoy Travel"** / newer "Just Explore"
- Logo: wordmark-only, inspired by the Chinese character 行 ("move forward"); primary palette is **black/white for stability, with red reserved as an energy accent** — not flooded everywhere
- Photography: vehicles in dramatic natural landscapes (desert, steppe, lakeshore, mountains), roof-tent/camping scenes, drone-height wide shots — adventure documentary, not studio-only

## 4. Jetour UAE (jetouruae.com) — the strongest distributor site for premium feel

**Navigation:** Sticky header: Home / **Models** (expands to all 9 vehicles) / Pre Owned / Offers / More (service booking, showrooms, fleet, blog, careers). EN/AR toggle + phone + **WhatsApp** top right.

**Homepage:** ~9-slide hero carousel (model spotlights + offers) → "Jetour SUV Models" horizontal-scroll card carousel (**no prices on cards** — a weakness) → warranty block ("**10-year / 1-million-km warranty**" — used as the #1 trust weapon) → financing → offers → service booking → blog carousel → deep footer (9 model links + useful links + socials).

**VDP (T2, fetched live):**
- Hero: full banner + "Your Ultimate 4x4 SUV Experience" + **"EMI starting from 1,799 AED"** (monthly payment instead of sticker price)
- **Sticky anchor sub-nav:** Design / Exterior / Interior / Technology & Safety / **Next Steps**
- Exterior carousel with concrete feature slides *plus real numbers inline*: approach/breakover/departure angles 39°/25°/30°
- Interior carousel: 15.6" screen, Sony audio, Snapdragon chip, ventilated seats
- Tech & Safety carousel: 540° parking view, AEB, ACC
- Closing "Next Steps": "Enquire," "Book a Test Drive," "Download the Specs Brochure"

**Test drive page:** fields: title/name/phone/email, model dropdown, branch dropdown, preferred date + time-of-day (Anytime/Morning/Afternoon/Evening), optional message, consents. Weakness: model chosen via dropdown, not thumbnails.

## 5. Jetour Russia (jetour-ru.com) — best conversion mechanics

**Navigation:** Models / Buyers / Owners / About Brand dropdowns + prominent "Find Dealer."

**Homepage:** Hero slider **with price and financing on the slide itself** → model lineup → offers carousel → buyer/owner service cards → news → brand block.

**Model cards are the best in the Jetour network:** large hero image + name + category descriptor + **starting price + monthly payment + three buttons: Test drive / In stock / Model details.** Every card is a mini funnel.

**VDP (T2, fetched live):**
- Hero carousel with **award badges** + positioning line + price + monthly rate
- **Sticky sub-nav with 6 anchors** (Offers / Overview / Exterior / Interior / Technologies / Specs) **plus two persistent CTAs pinned in the bar: "Тест-драйв" and "Прайс-лист"**
- Special offers block first (trade-in + credit bonuses)
- **Color configurator: 6 swatches dynamically swapping the car image**, premium colors marked +50,000 ₽
- Full **3-trim comparison table with 100+ rows**
- Downloadable price-list PDFs per model year

**Visual identity:** white background, dark text, **red used only on buttons**, lifestyle landscape photography, messaging built around journeys.

## 6. Jetour Egypt (jetouregypt.com)

Header: logo + hotline + distributor logo; nav = Vehicle Models / Requests / After-Sales Services / About JETOUR. Six models in a carousel. CTAs: "Book Your Car," "Book a Test Drive," "Download Brochure," "Intention Form" (pre-order). Competent but shallower than UAE — fewer trust blocks, no finance calculator, no price on cards.

## 7. Jetour Kazakhstan (allur.kz) and Malaysia (jetour.com.my)

**Kazakhstan:** trilingual, three service cards, model carousel **with year + starting price** but **no specs on cards**; generic CTAs + WhatsApp/phone. Functional, price-transparent, but visually grey/flat — the weakest premium feel.

**Malaysia:** clean; model cards use **category descriptors + one signature dimension** ("T1 — Stylish Light Offroad SUV, 4,706mm") — a nice pattern — and every card carries "Book a Test Drive." But no pricing, minimal lifestyle photography; feels like a brochure.

**Verdict:** **Jetour UAE for premium feel** (coherent sticky nav, EMI framing, warranty-led trust, WhatsApp integration, bilingual polish), **Jetour Russia for conversion architecture** (price + monthly + 3 CTAs on every card, sticky VDP sub-nav with pinned Test Drive button, live color configurator, trim tables, award badges). The ideal distributor site is UAE's polish with Russia's mechanics.

---

## Lessons for Jetour Mongolia

1. **Put price AND monthly payment on every model card** (Russia pattern: image + name + category descriptor + "from ₮X" + "₮Y/month" + Test drive / Details buttons).
2. **Sticky VDP sub-nav with anchors + a pinned Test Drive CTA in the bar itself** (Russia/Kia pattern). Section order that works: Offers → Overview → Exterior → Interior → Technology & Safety → Specs → Next Steps.
3. **Color configurator with real image swaps** on every VDP — 6 swatches swapping the car photo is enough (existing 360° drag for X70 Plus already exceeds most distributors).
4. **Lead trust with the warranty** — UAE repeats it on the homepage, VDPs, and even the test-drive form. It's Jetour's single strongest differentiator vs. established brands.
5. **Use monthly-payment framing ("EMI from…") near the hero**; pair with a finance calculator block.
6. **End every VDP with a "Next Steps" block**: Enquire / Book a Test Drive / Download Brochure (PDF).
7. **Mega menu with model thumbnails**, ideally dual-axis like Kia UK — at minimum a Models dropdown showing all vehicles as images.
8. **Follow Jetour's identity rules**: white/black base, red **only** on primary buttons and small accents; adventure-landscape lifestyle photography (steppe/mountain shots are literally on-brand for Mongolia); give each model a category descriptor line.
9. **Trim comparison table with transparent per-trim pricing.**
10. **Test-drive form best practice**: short (name, phone, model, location, date + time-of-day chips), model pre-filled from VDP, trust copy beside the form, model thumbnails over a dropdown, WhatsApp/Messenger as parallel channel.
11. **Homepage order that converts**: hero carousel (model + offer + price/EMI) → model lineup cards with prices → warranty/trust block → finance block → offers → service booking → news → deep footer with every model linked.
12. **Repeat CTAs as an icon row in the footer** (Kia: Build / Test Drive / Finance / Brochure / Find Dealer).
