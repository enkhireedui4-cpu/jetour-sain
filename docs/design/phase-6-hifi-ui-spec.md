# Phase 6 — High-Fidelity UI Specification: Jetour Mongolia

The authoritative "how it actually looks" document. It fuses the three upstream specs into concrete, buildable visual direction for every page:

- [Phase 2 — UX Strategy](phase-2-ux-strategy.md) → *why* each element exists (personas, funnel, CTA hierarchy, trust).
- [Phase 3 — Sitemap](phase-3-sitemap.md) → *which* pages exist.
- [Phase 4 — Wireframes](phase-4-wireframes.md) → *structure & behavior* (layout, sections, interaction).
- [Phase 5 — Design System](phase-5-design-system.md) → *the tokens* (type, color, spacing, components).

Where Phase 4 said "a card here" and Phase 5 said "cards use `rounded-2xl`, 1px line border, flat-at-rest," **this document says exactly what that card looks like on each specific page** — background, spacing token, type class, image ratio, CTA weight, hover, motion, and the mobile/tablet/desktop variants.

**Design intent, one sentence:** a calm, white, editorial automotive site where photography carries the emotion, a single red accent carries the action, generous whitespace carries the premium feel, and type hierarchy — never decoration — carries the structure. The benchmark is Volvo/Genesis restraint executed with Jetour's Travel+ warmth.

Token names below refer to [globals.css](../../src/app/globals.css) and [phase-5-design-system.md](phase-5-design-system.md). This is a specification, not code — no implementation here.

---

## 0. Global visual language (the "house style")

Applied on every page. If a page section doesn't override one of these, it inherits it.

| Aspect | Specification |
|---|---|
| Canvas | `#FFFFFF`. Alternate sections use paper `#F5F5F6`. Dark sections use `#121316` (never pure black). |
| Container | `.container-page` = `min(1280px, 94vw)`, centered. Nothing touches the viewport edge. |
| Section rhythm | Primary sections `.section-pad` (64→112px vertical, fluid). Secondary/dense `.section-pad-sm` (48→80px). |
| Type | One family (Inter). Hero `.type-display` (44→72px/800). Page title `.type-h1` (36→56px/800). Section `.type-h2` (32→48px/800). Card `.type-h3` (22→28px/700). Lead `.type-lead` (17–18px/1.7 line-height, body-gray). Meta `.type-small` (14px). Eyebrow `.eyebrow` (11px/600/0.22em uppercase, muted; `.eyebrow-electric` = red). **No italics anywhere. No gradient text.** |
| Text color | Ink `#17181B` (headings), body `#54585F` (paragraphs), muted `#8A8F98` (meta). Never pure black on white. |
| Accent | Red `#E20A17` — **only** primary CTAs, active states, focus ring, small marks. Never a large fill. |
| Radius | Cards `rounded-2xl` (16px), inputs/small `rounded-lg` (12px), all CTAs & chips `rounded-full`. |
| Elevation | Flat at rest. Hover lift only (`.card-lift`: translateY(-6px) + soft diffuse shadow). No static drop shadows; never shadow + border together. |
| Borders/dividers | Always `#E7E7EA`, 1px. |
| Imagery | `next/image`, AVIF/WebP, locked aspect ratios, `object-cover` (studio/transparent art = `object-contain`). Hero/LCP = `priority`; everything else lazy. |
| Motion | One easing `cubic-bezier(0.16,1,0.3,1)`. Micro (hover/focus) 150ms; cards 250ms; crossfades 450ms; scroll reveals & hero 600–900ms. Scroll-reveal = fade + translateY(24px), once. Fully disabled under `prefers-reduced-motion`. |
| Focus | Keyboard `:focus-visible` = 2px red outline, 2px offset. |

---

## 1. Global components (hi-fi)

### 1.1 Header
- **Height** 64px. **Container** `.container-page`.
- **State A (home hero only, unscrolled):** transparent over photography. Logos in white variant. Nav links `white/90`, hover `white`. A translucent-outline "Тест драйв" pill (white 10% fill, 1.5px white/50 border, blur) sits right.
- **State B (scrolled / all other pages):** `white/95` + `backdrop-blur-xl`, 1px bottom border `#E7E7EA`, ultra-soft shadow. Logos black variant. Nav links body-gray → ink on hover; active link ink with a 2px red underline pinned at the base.
- **Nav order:** Загварууд (mega trigger) · Тусгай саналууд · Санхүүжилт · Эзэмшигчдэд · Бидний тухай (dropdown). Right cluster: phone + WhatsApp icon links, then the primary "Тест драйв" pill (ink fill in state B, hover red).
- **Mega menu:** full-width white panel, level-3 elevation, opens on hover/click. Top row: "Загварууд" eyebrow left; "Бүх загвар" + "⚖ Харьцуулах" links right. Below: 6-col (→4 →3) grid of model tiles — uniform 5:3 image (contain), bold ink name (hover red), price in muted small. "Шинэ" red micro-badge on coming-soon.
- **Mobile drawer:** full-screen white, close-X top. Models as a 2-col thumbnail grid first, then nav items with a trailing chevron, then a "Бидний тухай" accordion, then a red phone line, then a full-width red "Тест драйв захиалах" pill pinned so it needs no scroll.

### 1.2 Footer
- Background `#17181B`, white text. `.container-page`, generous vertical padding.
- **Top:** 5-column grid (2-col on mobile as accordions). Col 1 = white Jetour logo + call-center number (bold, hover red) + hours + email. Cols 2–5 = Загварууд / Эзэмшигчдэд / Худалдан авахад туслах / Компани link lists (white/60 → white).
- **Bottom bar:** thin white/10 divider. Left = social icon row (Instagram/WhatsApp/YouTube/Facebook, white/60 → white). Right = legal links (Нууцлалын бодлого · Үйлчилгээний нөхцөл) + copyright in white/40.

### 1.3 Floating CTA
- Fixed bottom-right. Collapsed = single 56px red circular button (phone icon). Tap expands a vertical stack upward: red Call, ink Test-drive, green WhatsApp — each 48px circle, shadow level 3. Rotates to an ink X when open. Clears any sticky bottom bar by vertical offset.

### 1.4 Buttons (applied consistently)
- **Primary** `.btn-electric-jetour`: red fill, white text, `rounded-full`, `py-3.5 px-7`, soft red-tinted shadow; hover → darker red + translateY(-1px); active scale(0.98). **Exactly one primary per viewport.**
- **Ink** `.btn-ink-jetour`: near-black fill, white text — secondary solid where a second strong action is truly needed.
- **Outline** `.btn-outline-jetour`: transparent, 1.5px `#D9DADE`, ink text; hover fills ink/white. The default secondary.
- **Outline-light** `.btn-outline-light`: for placement over photography — translucent white fill, white border/text, blur; hover fills white.
- **Text link (tertiary):** weight-600, ink or red, trailing arrow that nudges +8px on hover; underline optional. Used for "see all →".

### 1.5 Vehicle card (the workhorse — /models, home, related, mega menu variants)
- Shell: white, `rounded-2xl`, 1px `#E7E7EA`, overflow hidden, `.card-lift` hover.
- **Image:** 16:10, `object-cover`, subtle zoom (scale-105) on hover over 700ms. Favorite heart top-right: 40px white/90 blurred circle, 1px border, muted heart → filled red when saved. "Тун удахгүй" red micro-pill top-left for coming-soon.
- **Body** (24→28px padding): H3 model name (JETOUR prefix dropped), starting price line (bold ink inside body-gray "…-с эхлэн"). A 1px divider, then a 2-col quick-spec grid — each cell = 11px uppercase muted label + bold ink value (Engine, Power, Torque, Drive, Transmission, Fuel; up to 6, only populated ones).
- **Actions row (mt-auto):** primary ink "Дэлгэрэнгүй →" (fills remaining width) + a compare pill (outline → ink-filled with check when active; disabled/muted when 3 already chosen). Label hides under 640px, icon stays.

### 1.6 Lead form (5 variants)
- Card: white, `rounded-2xl`, 1px border, comfortable padding, ample field spacing.
- Header: red 6px accent bar + bold title; subtitle in muted; then a **paper info chip** with a red shield icon — "Манай баг **24 цагийн дотор** тантай холбогдоно" (trust, shown *before* submit).
- Fields: label above (11px uppercase muted), input in a paper-fill `rounded-xl` container with a muted leading icon; focus → red border + soft red ring on the whole field. Model = visual thumbnail chips (not a dropdown) when arriving from a model/compare context. Time = 4 pill chips (Өглөө / Өдөр / Орой / Хэзээ ч болно), selected = ink fill. Branch selector hidden when only one showroom.
- Submit: full-width primary red; loading = spinner + "Илгээж байна…". Fine print links to `/privacy`.
- Success: replaces the form in place — spring-animated check medallion, "Баярлалаа!", 24-hour promise restated, "Шинээр хүсэлт илгээх" outline reset.

### 1.7 Sticky sub-nav / summary (long pages: model detail, financing, owners hub)
- **Desktop/tablet:** pinned bar under the header, white/95 + blur, 64px. Left = model name + starting price (muted small). Center = anchor links (scroll-spy, hover red). Right = favorite circle + compare circle + red "Тест драйв" pill.
- **Mobile:** splits — a top horizontally-scrollable anchor-chip row + a bottom-pinned full-width red CTA bar that's always reachable by thumb.

---

## 2. Home — `/`

**Visual intent:** one cinematic promise, then a calm, confident descent through lineup → trust → offers → story → contact. Every band breathes; photography does the talking.

- **Hero** — full-viewport (`h-screen`, min 560px), `#0E0E10` base. Full-bleed model photograph with a slow Ken-Burns scale (1.045 over the slide) and 1100ms opacity crossfade between 4 models. Bottom-anchored gradient scrim (black/75 → transparent) for legibility. Content in `.container-page`, bottom-left: red-tracked eyebrow tagline, `.type-display` model name in white with soft text-shadow, then two CTAs — white "Дэлгэрэнгүй үзэх" (hover red) + `.btn-outline-light` "Тест драйв захиалах". Slide indicators = thin bars, active one fills red over the 6s dwell. Ghost prev/next circles on desktop only; a bouncing scroll-cue bottom-right. Header in State A.
- **Model showcase** — white. Eyebrow + `.type-h2` header. A tab strip (active = ink pill, rest = ghost) over a full-width `clamp(480–780px)` image that crossfades on tab change. Bottom overlay: model name (`3xl→5xl` white), price, and a right-aligned divided quick-spec row (values bold white, labels white/55) — the premium "stat row." CTAs: white "Дэлгэрэнгүй үзэх" + outline-light "Тест драйв".
- **Trust band** — `#121316`, `.section-pad-sm`. 4 columns (2×2 mobile), `lg:divide-x` white/10. Each: red icon, bold white value (Албан ёсны / 4 жил / 4S / 7 хоног), muted label. Reveals stagger in once.
- **Offers strip** — paper `#F5F5F6`, `.section-pad-sm`. Header + "Бүх санал →" text link. 4-col (→2 mobile) grid of poster cards (square image, `.card-lift`, title + price line).
- **Brand story** — white, `.section-pad`. Two columns: a single clean 4:3→4:5 photograph (no floating badges) and a text column — eyebrow, `.type-h2`, lead + body, a 3-stat inline row above a top divider (2018 / 1сая+ / 40+), and an outline "Брэндийн тухай →".
- **Advantages** — white, `.section-pad`. Eyebrow + `.type-h2`, then a 3-col (→2 →1) grid of bordered cards (28–32px padding): paper-tint icon badge (red icon), bold title, small body. Hover = border darkens to ink/20 only.
- **Explore nav** — white, `.section-pad`. Left = a stacked list of large ink links with divider rules and a trailing arrow that slides right on hover; right = a rounded 16:11 model image.
- **News** — white, `.section-pad`. Desktop = 3-col borderless image-led cards (16:11, category chip overlay, H3 title hover-red, excerpt, date + "Дэлгэрэнгүй →"), centered ink "Бүх мэдээ" pill below. Mobile = swipe carousel with dot indicators.
- **Contact** — paper `#F5F5F6`, `.section-pad`, top border. Header + lead. Two columns: an info card (white, rounded, with phone tiles, address + map link, hours, socials) and a stacked showroom photo (16:10) + interactive Google-map embed.
- **Footer** (§1.2).

**Responsive:** grids collapse per §0/Phase 4; offers/advantages/news become swipe carousels on mobile; hero and showcase stay full-bleed.

---

## 3. Model listing — `/models`

**Visual intent:** a clean, gallery-like lineup where every model reads as part of one curated system — identical card rhythm, price on every card.

- **Header:** `PageHeader` — white, eyebrow "Загварууд", `.type-h1` "JETOUR лайнап", lead. Top padding clears the fixed nav.
- **Grid:** white `.section-pad`, 3-col (→2 →1) of the §1.5 vehicle card, `gap-6/7`, staggered reveal (80ms cascade). Available models first, coming-soon after (badged).
- **Compare prompt band:** paper card, 28–40px padding — bold prompt + small subline + outline "Загвар харьцуулах →".
- **Compare tray (fixed bottom):** appears once ≥1 model is selected. White bar, top shadow. Left = "⚖ Харьцуулах N/3". Center = horizontally-scrollable selected chips (mini 5:3 thumb + short name + remove-X). Right = "Цэвэрлэх" text + red "Харьцуулах →" pill (disabled look until ≥2 chosen). Content reserves bottom space so nothing hides under it.
- **Footer.**

---

## 4. Model detail — `/models/[id]`

The centerpiece. Editorial, sectioned, sticky-summary-guided, ends in a conversion ladder.

- **Hero:** full-bleed model photograph (`priority`), `#17181B` base, bottom scrim. `.container-page` bottom-left: `.type-display`-scale white name, then white "Хүсэлт илгээх" + outline-light "Үнийн жагсаалт ↓".
- **Sticky summary** (§1.7) appears on scroll: name + price · anchors (Гадна/Салон/Өнгө/Үзүүлэлт/Санхүүжилт) · favorite + compare + red Тест драйв.
- **Quick-stats strip:** white, bottom border. 4-col (2-col mobile) `divide-x` — big ink value + muted label (Engine/Power/Transmission/Drive), the premium stat row directly under hero.
- **Statement:** centered `max-w-880`, eyebrow "JETOUR {series}", `.type-h2`/display tagline, lead paragraph. Optional 21:9 statement image with a rounded top. T-series uses a `#0E0E10` dark statement; X-series stays white.
- **Exterior / Interior:** full-bleed showcase sliders (`clamp` height, translateX transitions, caption bottom-left, counter top-right, dot rail, ghost arrows) OR a 3-col media-highlight grid (4:3 image + bold title + small caption) where showcase data is absent. Interior band on paper.
- **Technology / Safety / Quality:** `Section` pattern (eyebrow + `.type-h2`), 3-col media-highlight grids. Safety on paper, Tech/Quality on white — only render when data exists.
- **Feature groups** (optional): `#17181B` band, 3-col white/4% cards with red-outlined icon badges and red-check bullet lists.
- **Color configurator:** white (transparent-PNG models get a soft top-to-white gradient). Centered header. A row of swatch buttons (color dot + name; selected = ink-outlined paper chip). One image stage where selecting a color crossfades (450ms) the vehicle at a fixed angle — `object-contain` with a soft floor shadow for transparent art, `object-cover rounded-2xl` otherwise.
- **Specifications:** white. Two columns — a sticky model image + a dimensions mini-grid (Урт/Өргөн/Өндөр cards) on the left; on the right, category-grouped spec rows (`divide-y`, muted label left / bold ink value right) and a price + red "Тест драйв захиалах" footer. (Accordion grouping per Phase 5 §9.1.)
- **Winter mode** (optional, T/off-road): `#17181B` with a faint cool radial glow, snowflake badge, red-check feature list.
- **Financing:** paper. Eyebrow + `.type-h2`, then a clean bordered bank-terms table (zebra header, red rates).
- **Warranty band:** white, `.section-pad-sm`. A paper card, whole card links to `/owners/warranty` — white icon tile (red shield), "4 жил / 150,000 км баталгаа", small subline, "Дэлгэрэнгүй →".
- **Downloads + Dealer contact:** white, 2 bordered cards — brochure request (routes to lead form) and dealer contact (phone + map link).
- **Request form:** paper, top border, two columns — copy + phone on the left, the §1.6 test-drive lead form (model preselected) on the right.
- **FAQ:** white, `max-w-820`, eyebrow + `.type-h2`, clean accordion (bottom-border items, chevron rotate, one open at a time; 4 Q&A — price, financing, warranty, test drive).
- **Related models:** 3-col vehicle-card-style grid (cross-sell within the lineup).
- **Closing mosaic** (optional): full-bleed 3-image asymmetric grid, gentle hover zoom.
- **Footer.**

**Mobile:** sticky summary splits into top anchor-chips + bottom red CTA bar; galleries swipe; spec two-column stacks; financing table scrolls horizontally.

---

## 5. Compare — `/compare`

**Visual intent:** a calm spec worksheet — pick up to 3, read differences at a glance, act without scrolling up.

- **Header:** `PageHeader` — eyebrow "Харьцуулах", `.type-h1`, lead ("Хамгийн ихдээ 3 загвар…").
- **Picker:** a wrap of model chips (mini 5:3 thumb + name; selected = ink-outlined paper + red check; disabled/dimmed when 3 chosen).
- **Empty state:** paper card, centered muted scale icon + prompt + outline "Бүх загвар үзэх".
- **Comparison table:** bordered `rounded-2xl`, horizontal-scroll on small widths. **Sticky header row** (pinned under the nav) = per-model image card (16:10) + name + price + ink "Дэлгэрэнгүй" + remove-X. **Frozen first column** = spec labels (sticky left, solid bg). Rows grouped by red eyebrow band (Үндсэн / Хүч чадал / Хөтлөх анги / Хэмжээс), zebra alternation, values centered bold ink, "—" for missing. Differing values may carry a subtle ink emphasis — never accent.
- **Footer.**

**Mobile:** cap at 2 columns for legibility; label column frozen; table scrolls.

---

## 6. Special offers — `/special-offers`

- **Featured:** white, top area — two columns (text + poster). Left: eyebrow, `.type-h2` title, lead, ink "Дэлгэрэнгүй мэдээлэл" + outline prev/next controls + dot rail. Right: poster carousel (contain, auto-advancing, pauses on hover).
- **All offers:** paper, top border. `.type-h2` "Бүх санал", 3-col (→2 →1) poster cards (`.card-lift`, title hover-red, excerpt, "Дэлгэрэнгүй →"). Below: a phone primary + ink "Зээлийн тооцоолуур →".
- **Footer.**

### 6.1 Offer detail — `/special-offers/[id]`
- Back link. Full poster centered (`max-w-1100`, flat, rounded). Two columns: title + date + red price + body paragraphs + red "Хүсэлт үлдээх ↓"; tagline aside. Optional standard spec table (Phase 5 §9.1 style). Paper lead-form band (info-request, model preattached). Footer.

---

## 7. Financing — `/financing`

**Visual intent:** demystify affordability instantly — calculator first, banks second, apply third.

- **Header:** `PageHeader` — eyebrow "Зээл · Санхүүжилт", `.type-h1`, lead.
- **Calculator:** paper `.section-pad`. Two columns — left card (white, 4 red `.range-jetour` sliders: price / down% / term / rate, each with live value + min–max); right result card (`#121316`, white): "Сарын төлөлт" label + a large white monthly figure (not gradient), then a divided list (loan amount / total interest / total / term) and a fine-print disclaimer.
- **Bank partners:** white `.section-pad`. 4-col (→2 →1) bordered cards, `.card-lift`; paper-tint initial badge (ink letter), bank name, and Хүү / Хугацаа / Урьдчилгаа rows.
- **Application:** paper. Two columns — benefits checklist (red checks) + phone/outline CTAs on the left; the §1.6 financing lead form (calculator output attached silently) on the right.
- **FAQ** accordion. **Footer.**
- Sticky sub-nav variant here pins "Өргөдөл" as the persistent CTA (not Тест драйв).

---

## 8. Owners hub — `/owners`

- **Header:** `PageHeader` with a back-to-home link, eyebrow "Эзэмшигчдэд зориулсан булан", `.type-h1`, lead. **Zero sales messaging** — Persona D's calm space.
- **Router:** 3 large tap-anywhere cards (→ /owners/service, /owners/parts, /owners/warranty): paper-tint icon tile, bold title, one-line desc.
- **Hours + contact** two-column block. **FAQ** accordion. **Footer.**

### 8.1 Service — `/owners/service`
- Back link, `.type-h1`/h2 title. Two columns — service scope (red-check list) + hours card on the left; §1.6 lead form (service variant: date + time chips) on the right.

### 8.2 Parts — `/owners/parts`
- Same layout; original-parts trust copy + categories left; lead form (parts variant: no date/time, adds a free-text "which part" field) right.

### 8.3 Warranty — `/owners/warranty`
- Reference page. Headline "4 жил / 150,000 км баталгаа" plain and large; two-column "covered / not covered" accordion; numbered claim steps; FAQ; a low-key "Холбоо барих" CTA (not a hard sell).

---

## 9. Test drive — `/test-drive`

- **Header:** `PageHeader` — eyebrow, `.type-h1` "Тест драйв захиалах", reassuring lead.
- **Model picker** (skipped if `?model=` preset): visual model tiles; selecting one smooth-scrolls the form into view.
- **Body:** two columns — the §1.6 test-drive lead form + a trust aside (warranty badge, 24-hour promise, showroom hours/map). Single primary CTA "Тест драйв баталгаажуулах."
- **Footer.**

---

## 10. Brand — `/brand`

- **Hero:** kept photographic — full-bleed lifestyle image, `#121316` base, calm scrim, `.type-display` white title ("JETOUR — Аяллын соёл", no red word), red primary "Загварууд үзэх" + outline-light "Дилер олох".
- **Timeline:** white→paper, 4 milestone cards (2×2 mobile, swipe strip on small); year in ink, title, desc; paper+line cards (de-reddened).
- **Story:** two text blocks (global + Mongolia distributor).
- **Global stats:** `#121316`, 3 cards with subtle white-tint badges + red icons.
- **Travel+ philosophy** 3-col + **Why Jetour** 4-col card grids (flat, `.card-lift`).
- **CTA band:** one red primary + ink secondary. **Footer.**

---

## 11. Dealer — `/dealer`

**Visual intent:** de-risk a first visit — orientation, not routing (single showroom).

- **Header:** `PageHeader`, eyebrow "Дилер", `.type-h1` "Бидний showroom", lead.
- **Info + map:** two columns — info card (white/paper, distributor credential, address + map link, phone tiles with paper-tint red-icon badges, email, hours) + a large interactive Google-map embed (`rounded-2xl`, min 420–560px).
- **Showroom gallery:** `#121316` framed main image (16:9) with ghost arrows + counter, and a 6-up thumbnail strip (active = red border). **Footer.**

---

## 12. News — `/news` & `/news/[slug]`

- **Listing:** `PageHeader` (eyebrow "Мэдээ · Сурталчилгаа", `.type-h1` "Шинэ мэдээлэл", **non-italic**). 3-col (→2 →1) borderless image-led cards (16:10, category chip, tag/date overlay, H3 title hover-red, excerpt, "Цааш унших →"). Shared footer.
- **Detail:** image hero (`priority`) with a single clean scrim, back-link, tag chip + date, non-italic `.type-h1` title. Body constrained to `max-w-720` centered, `.type-lead` standfirst, `leading-[1.8]` paragraphs. A paper contact CTA card (phone primary + outline test-drive). Related-articles grid (2-col). Shared footer.

---

## 13. Legal — `/privacy` & `/terms`

- `PageHeader` (eyebrow "Хууль ёсны", `.type-h1`, lead). Single `max-w-720` reading column, `.type-h3` subheadings, `leading-[1.8]` body, `space-y-12` between blocks. A closing "Холбоо барих" line with phone + email. Shared footer. No conversion CTA.

---

## 14. States, empties, errors (global)

- **Loading:** CMS-fed images use the `.skeleton` shimmer placeholder inside their aspect box (no layout shift).
- **Empty:** offers/compare/news empties = paper card, muted icon, plain sentence, one outline CTA out. Never a dead end.
- **Form errors:** field border → destructive red, message below in small destructive text; toast for submit-level failures. Success = in-place confirmation panel (§1.6).
- **404 / notFound:** inherits header/footer, centered message + "Нүүр хуудас" primary + "Загварууд" outline.
- **Disabled:** 55% opacity, `not-allowed` cursor, no hover transform.

---

## 15. Accessibility & performance (visible in the UI)

- Keyboard focus ring (2px red) on every interactive element; skip-to-content link appears on focus.
- Every image has meaningful alt; icon-only buttons have `aria-label`; active nav = `aria-current`; disclosures = `aria-expanded`.
- Contrast: body/ink on white and white-on-red all meet AA; muted reserved for non-essential meta only.
- All motion respects `prefers-reduced-motion`.
- Images ship AVIF/WebP at responsive sizes; one hero LCP image per page is `priority`, the rest lazy; tap targets ≥44px on touch.

---

## Handoff notes

- This spec is **already substantially implemented** in the codebase (globals.css tokens, the components, and every page above). It doubles as the "as-designed" reference and the acceptance checklist.
- Anything a builder would otherwise guess — exact background per section, which CTA is primary, image ratio, hover behavior, mobile collapse — is pinned above. Where a value isn't stated, inherit §0.
- Open, intentionally-deferred item (from Phase 9): wrapping sub-page content in a semantic `<main>` landmark. Cosmetically invisible; noted for a future a11y pass.

**No code produced in this phase.** Ready to build any not-yet-implemented surface (e.g., `/test-drive`, `/owners/service|parts|warranty`, legal pages) against this spec on your go-ahead — or to render this as an interactive HTML style-guide artifact if you'd like a visual reference.
