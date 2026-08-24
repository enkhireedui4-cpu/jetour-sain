# Phase 5 — Design System: Jetour Mongolia

Builds on [Phase 1 research](phase-1-research.md), [Phase 2 UX strategy](phase-2-ux-strategy.md), [Phase 3 sitemap](phase-3-sitemap.md), and [Phase 4 wireframes](phase-4-wireframes.md). This document formalizes the visual language every wireframed component and page will be built with — the single source of truth Phase 6 (build) implements against.

It documents and extends what already exists in [globals.css](../../src/app/globals.css) and [tailwind.config.ts](../../tailwind.config.ts) rather than inventing a parallel system — where a token or pattern is already implemented, this doc names it as canon; where Phase 4's new components (chip pickers, comparison tables, skeleton loading) need something that doesn't exist yet, this doc specifies it as an addition for Phase 6 to add.

**Governing principle (from Phase 1 §5 and Phase 2):** color is a scarce resource. The entire palette is near-monochrome (white, off-white, near-black, mid-gray) plus exactly **one accent** used only for meaning — primary actions, active states, small highlights. Hierarchy comes from type size and spacing, not decoration. No gradients, no heavy shadows, no italics, one typeface.

---

## 1. Typography

### 1.1 Typeface
**Inter** (variable, self-hosted via `next/font/google`), subsets `latin` + `cyrillic` (Mongolian Cyrillic — ө, ү, ё — must render cleanly), weights 300–800, `display: swap`. One family for everything: headings, body, buttons, labels, numerals. No serif, no monospace, no second display face — a deliberate rejection of the "AI-generated site" tell of mixing decorative fonts, and consistent with Phase 1's finding that restraint (not decoration) reads as premium.

**No italics, anywhere.** Enforced at the CSS layer (`.font-display.italic`, `h1.italic` etc. are forced back to `normal`) because italicized Cyrillic headings were identified early in this project as reading as low-quality/AI-generated rather than premium.

### 1.2 Type scale
Fluid (`clamp()`-based) so headings scale smoothly between mobile and desktop rather than jumping at breakpoints.

| Token | Class | Size (mobile → desktop) | Weight | Line-height | Tracking | Use |
|---|---|---|---|---|---|---|
| Display | `.type-display` | 44px → 72px | 800 | 1.02 | -0.03em | Hero titles only (one per page, max) |
| H1 | `.type-h1` | 36px → 56px | 800 | 1.05 | -0.025em | Page titles (non-hero pages: `/models`, `/financing`, `/brand`, etc.) |
| H2 | `.type-h2` | 32px → 48px | 800 | 1.08 | -0.02em | Section titles within a page |
| H3 | `.type-h3` | 22px → 28px | 700 | 1.25 | -0.01em | Card titles, sub-section headings |
| Lead | `.type-lead` | 17px → 18px | 400 | 1.7 | normal | Intro paragraphs directly under a heading |
| Body | (base, no class) | 16px | 400 | 1.6 | normal | Default paragraph text |
| Small | `.type-small` *(new)* | 14px | 400–500 | 1.5 | normal | Captions, meta text (dates, labels), form helper text |
| Eyebrow | `.eyebrow` | 11px (0.7rem) | 600 | 1 | 0.22em, uppercase | Section kickers ("Загварууд", "Мэдээ") above every H1/H2 |

`text-wrap: balance` is applied globally to all headings so multi-line titles break evenly rather than leaving a single orphan word.

### 1.3 Weight usage
- **800 (Extrabold):** Display, H1, H2 — the only weight used for anything the eye should land on first.
- **700 (Bold):** H3, button labels, active nav state, emphasized inline text.
- **600 (Semibold):** Eyebrow labels, form field labels, secondary button labels.
- **500 (Medium):** Default nav links, tab labels.
- **400 (Regular):** Body copy, Lead paragraphs.
- **300 (Light):** Reserved, not currently used — available for a Volvo-style large/light display treatment if a future section wants size-contrast without weight-contrast; not used by default.

### 1.4 Color of text
Body text is never pure black — `#17181B` (near-black, "ink") for headings and primary text, `#54585F` ("body") for paragraph copy, `#8A8F98` ("muted") for tertiary/meta text. Pure `#000000` and pure `#FFFFFF` are reserved for specific high-contrast needs (e.g., text directly over a photograph), not default copy.

---

## 2. Spacing

### 2.1 Base scale
An 8px-rooted scale (with a 4px half-step for icon-tight contexts), used consistently for padding, gaps, and margins:

| Token | Value | Typical use |
|---|---|---|
| `space-1` | 4px | Icon-to-label gap, tight inline spacing |
| `space-2` | 8px | Chip/tag internal padding, small gaps |
| `space-3` | 12px | Form field internal gaps |
| `space-4` | 16px | Base unit — default gap between related elements |
| `space-5` | 24px | Card internal padding (minimum), grid gaps (mobile) |
| `space-6` | 32px | Card internal padding (generous), grid gaps (desktop) |
| `space-7` | 40px | Card internal padding (maximum), sub-section gaps |
| `space-8` | 48px | Gap between a heading block and its content |
| `space-9` | 64px | Small section vertical padding (mobile) |
| `space-10` | 80px | Small section vertical padding (desktop) / large section (mobile) |
| `space-11` | 96px | Large section vertical padding (desktop) |
| `space-12` | 128px | Maximum section vertical padding (large desktop only) |

### 2.2 Section rhythm (already implemented)
```
.section-pad     → padding-block: clamp(4rem, 9vw, 7rem)   /* 64px → 112px */
.section-pad-sm  → padding-block: clamp(3rem, 6vw, 5rem)   /* 48px → 80px */
```
Every full-width section on every page uses one of these two tokens for its vertical padding — never a bespoke value. `.section-pad` is the default; `.section-pad-sm` is for secondary/dense sections (e.g., a trust-stat band) that shouldn't claim as much vertical real estate as a primary content section.

### 2.3 Card padding
24px minimum, 40px maximum, chosen by card density: a 3–4-column grid card uses 24px; a large feature/spotlight card (e.g., the Compare page's model header, a financing bank-partner card) uses 32–40px. Never below 24px — cramped padding is the single fastest way to make a card feel cheap.

### 2.4 Component gaps
Grid gaps: 16px on mobile, 20–24px on tablet, 24–32px on desktop — increasing gap size on larger viewports rather than holding it constant, since larger canvases need more visual separation to avoid a cluttered feel.

---

## 3. Grid

### 3.1 Container
```
.container-page → margin-inline: auto; width: min(1280px, 94vw);
```
The single container used everywhere — no page defines its own width. 1280px caps the content column on large monitors; `94vw` keeps a consistent ~3% breathing margin on any viewport narrower than 1280px, so content never touches the viewport edge.

### 3.2 Column grids
Conceptually a 12-column grid, but implemented directly via CSS Grid utilities (`grid-cols-2/3/4`) per component rather than a rigid 12-col system — the site has no need for asymmetric spans beyond the handful of two-column "text | media" layouts already used (Brand Story, Compare's sticky header, Financing's calculator).

| Content type | Desktop | Tablet (landscape) | Tablet (portrait) | Mobile |
|---|---|---|---|---|
| Model/offer/news cards | 3–4 col | 2–3 col | 2 col | 1 col (or swipe carousel — see Phase 4 §1) |
| Feature/advantage cards | 3 col | 2–3 col | 2 col | 1 col |
| Two-column text+media | 2 col (asymmetric, e.g. 1fr / 1.1fr) | 2 col | 1 col (stacked) | 1 col (stacked) |
| Spec/comparison tables | full width, multi-col | full width | horizontal scroll, frozen label col | horizontal scroll, frozen label col |

### 3.3 Breakpoints
See §13 (Responsive Rules) for the authoritative breakpoint table — defined once there and referenced by every other section rather than repeated.

---

## 4. Color

### 4.1 Palette (canonical — already implemented as CSS custom properties)

| Token | Hex | Role |
|---|---|---|
| `--color-jetour-red` | `#E20A17` | The one accent. Primary CTAs, active states, focus ring, small highlights only. |
| `--color-jetour-red-dark` | `#C00813` | Accent hover/pressed state. |
| `--color-jetour-ink` | `#17181B` | Primary text, headings, primary button fill (the "secondary/ink" button). |
| `--color-jetour-body` | `#54585F` | Body paragraph text. |
| `--color-jetour-muted` | `#8A8F98` | Tertiary text, meta info, placeholder text, disabled text. |
| `--color-jetour-white` | `#FFFFFF` | Canvas, card surfaces, primary button text. |
| `--color-jetour-paper` | `#F5F5F6` | Secondary/alternate section background, input fill. |
| `--color-jetour-line` | `#E7E7EA` | All borders and dividers, everywhere, no exceptions. |
| `--color-jetour-dark` | `#121316` | Dark sections (footer, trust-stat band, hero scrims). |

### 4.2 Semantic additions *(new — needed for form/system feedback, not currently defined)*
| Token | Hex | Role |
|---|---|---|
| `--color-success` | `#16A34A` | Form success confirmations, positive status only. |
| `--color-success-bg` | `#F0FDF4` | Success state background (pale, never saturated). |
| `--color-destructive` | `#DC2626` *(existing)* | Form validation errors, destructive actions. |
| `--color-destructive-bg` | `#FEF2F2` | Error state background. |
| `--color-warning` | `#B45309` | Reserved for "coming soon" / low-stock style notices if ever needed — not currently used anywhere; do not introduce a warning-colored badge without a real functional reason. |

These are **functional-only** — never decorative. A success/error color appears only attached to an actual form state, never as a section accent.

### 4.3 Usage rules
1. **The accent never fills a large surface.** No accent-colored hero backgrounds, no accent section backgrounds — this was explicitly identified in Phase 1 as a mistake weaker competitor sites make. Accent is for small, meaningful marks: a button, an active tab underline, a focus ring, a price highlight.
2. **Monochrome does the structural work.** Ink/body/muted/paper/line handle 95% of the UI. If a design decision reaches for the accent color to solve a hierarchy problem, that's a sign type size or spacing should solve it instead.
3. **Never pure black on pure white for body copy.** Ink (`#17181B`) on white, not `#000` on `#FFF` — softer, easier on the eye at length.
4. **Dark sections use `--color-jetour-dark` (#121316), not `#000000`.** Footer, trust-stat band, and any hero scrim over photography use this near-black, keeping the whole palette in the same warm-neutral register rather than mixing a cooler pure black in.
5. **Vehicle color swatches (the color configurator) are the one place true, saturated color appears freely** — those are photographed vehicle colors, not UI decoration, and are exempt from the monochrome rule by definition.

---

## 5. Cards

### 5.1 Anatomy
```
┌─────────────────────────────┐
│                               │
│      media (image/video)      │  ← aspect-ratio locked (16:10, 4:3, or 1:1
│                               │     depending on content type — never
│                               │     unconstrained/variable per card)
├─────────────────────────────┤
│  Title (H3)                   │
│  Supporting line (Small/Body) │
│  [CTA — text link or button]  │  ← 24-40px padding
└─────────────────────────────┘
```

### 5.2 Chrome
- **Border:** `1px solid var(--color-jetour-line)` (#E7E7EA) — the default separation method for text-bearing cards (feature cards, spec cards, FAQ containers).
- **Image-led cards** (model cards, news cards, offer cards) may omit the border entirely, relying on the image's own edge plus surrounding whitespace for separation — border is optional there, never both border AND heavy shadow.
- **No shadow at rest.** Every card starts flat. Shadow, if any, is a hover-only signal (see §11 Elevation) — never a static drop-shadow sitting under a resting card.
- **Radius:** `rounded-lg` (12px) default, `rounded-xl` (16px) for larger feature/media-forward cards (see §12 for the full radius scale).

### 5.3 Hover behavior
`.card-lift` (existing utility): `translateY(-6px)` + a soft, low-opacity shadow fading in over 300ms with a premium ease-out curve. This is the *only* card interaction — no border-color shifts, no scale, no color inversion. One consistent hover language across every card type on the site.

### 5.4 Card variants in use
| Variant | Aspect ratio | Border | Notes |
|---|---|---|---|
| Model card (`/models`, mega menu) | 5:3 or 16:10 | none | Price always visible, per Phase 2 §4 |
| Offer card | 16:10 or 1:1 | none | Poster-led |
| News card | 4:3 (mobile) / 16:11 (desktop) | none | Category chip overlay on image |
| Feature/advantage card | — (icon, not image) | 1px line | Icon + H3 + body, no media |
| FAQ accordion item | — | bottom-border only, no box | Not a "card" in the boxed sense — a list item |
| Comparison spec row | — | zebra background alternation, no per-row border | See §9 Tables |

---

## 6. Buttons

### 6.1 The four variants (already implemented as utility classes)
| Class | Fill | Text | Use |
|---|---|---|---|
| `.btn-electric-jetour` / `.btn-primary-jetour` | Accent red | White | The single highest-emphasis action per view — "Тест драйв захиалах" |
| `.btn-ink-jetour` | Ink (near-black) | White | Secondary solid action where a second strong CTA is genuinely needed (rare — most secondary actions use outline instead) |
| `.btn-outline-jetour` | Transparent → ink on hover | Ink → white on hover | Default secondary action — "Дэлгэрэнгүй үзэх" |
| `.btn-outline-light` | Translucent white → white on hover | White → ink on hover | Secondary action placed over photography/dark hero imagery |

### 6.2 Shape and sizing
- **Radius:** pill (`rounded-full`) for all primary/secondary/outline CTA buttons — the established convention across every implemented CTA on this site (hero, models, navbar). Compact/icon-only utility buttons (mega-menu close, form field clear) use `rounded-lg` (12px) instead of a full pill, since a pill reads oddly on a near-square icon button.
- **Sizing:** two sizes only — **default** (`py-3.5 px-7`, used for all primary CTAs) and **compact** (`py-2.5 px-5`, used inside cards/dense contexts, e.g. the Models showcase overlay CTAs). No third size — resist adding a "large" hero-only variant; the default size scales fine at any placement.
- **Icon + label:** icon precedes the label with a `gap-2` (8px) separation, icon size 16px (`w-4 h-4`) at default button size.

### 6.3 States
| State | Behavior |
|---|---|
| Hover | Color shift (accent → red-dark, ink → black, outline fills) + `translateY(-1px)` for filled variants |
| Active/pressed | `scale(0.98)` — a tactile press, no color change beyond hover's |
| Focus-visible | 2px accent outline, 2px offset (see §14 Accessibility) — identical across all four variants |
| Loading | Label replaced by a small spinner + "Илгээж байна..." text (already implemented in the lead form); button remains its resting color, not grayed out, so it doesn't read as broken |
| Disabled | `opacity: 0.55`, `cursor: not-allowed`, hover/active transforms suppressed |

### 6.4 Tertiary — text links
A fourth, non-button pattern for the lowest-emphasis action: an underlined-on-hover text link with a trailing arrow, used for "see all" links ("Бүх загвар →", "Бүх санал →") and in-card secondary actions. Never boxed, never bordered — pure text weight (600, ink or accent color) is what signals it's interactive.

---

## 7. Inputs

### 7.1 Text input / textarea
```
┌───────────────────────────────────┐
│ НЭР *                                │  ← label: 11px, uppercase, 600 weight,
│ ┌─────────────────────────────────┐ │     tracked, muted color, always visible
│ │ 👤  [placeholder text........]  │ │  ← 12px radius, paper-fill background,
│ └─────────────────────────────────┘ │     line-color border, icon prefix optional
└───────────────────────────────────┘
```
- **Container:** `rounded-xl` (12px), `bg-[#F5F5F6]` (paper) at rest, `1px solid` line-color border.
- **Focus:** border shifts to accent color + a soft accent-tinted ring (`focus-within:ring-2 ring-accent/15`) — the same focus language as buttons, applied to the container, not the bare `<input>`, so the whole field glows, not just a thin outline.
- **Label:** always visible above the field (never placeholder-only labeling — a placeholder disappearing on focus/typing is an accessibility and usability regression this system explicitly avoids).
- **Icon prefix:** optional, 14px icon, muted color, left-aligned inside the field container.
- **Error state:** border shifts to `--color-destructive`, a small error message appears directly below the field in destructive color at Small type size.

### 7.2 Select / dropdown
Same container styling as text input; a chevron-down icon right-aligned indicates it's a native `<select>`. Used sparingly per Phase 4's decision to prefer visual chip-pickers over dropdowns wherever the option set is small and visual (models, time-of-day) — select remains appropriate for genuinely long lists (e.g., if a branch list ever grows beyond a handful).

### 7.3 Chip / tile picker *(new — formalizing the Phase 4 pattern)*
Two sizes of the same interaction pattern:

**Model tile** (mega menu, `/models`, `/compare`, `/test-drive`):
```
┌──────────┐
│  [image]  │
│  Name      │
│  Price     │
└──────────┘
```
Selected state: `1px solid ink` border + subtle background tint (paper). Unselected: transparent border, background on hover only. Never uses the accent color for the selected state border — accent is reserved for CTAs, not selection indication (selection uses ink, keeping the accent's meaning singular).

**Text/time chip** (time-of-day, contact method):
```
[ Өглөө ]  [ Өдөр ]  [ Орой ]  [ Хэзээ ч болно ]
```
Pill-shaped (`rounded-full`), single-line label, selected state = ink fill + white text, unselected = paper fill + body-color text. Multiple chips in a row wrap or scroll horizontally on narrow viewports (never truncate a chip's label).

### 7.4 Range slider (financing calculator)
`.range-jetour` (existing): a 4px track, accent-colored fill up to the current value, line-colored remainder, a white thumb with an accent border. Thumb enlarges 15% on hover — the only slider interaction beyond drag.

### 7.5 Checkbox / radio
Radix primitives (already in the component library — `checkbox.tsx`, `radio-group.tsx`) restyled to match: square checkbox with 6px radius (not full-round), radio fully round, both using ink for the checked state and accent only for the focus ring — consistent with the "accent = focus/action, ink = selection" split established above.

---

## 8. Icons

### 8.1 Library
**Lucide React**, exclusively — no second icon set, no icon font, no custom SVG one-offs mixed in unless a icon genuinely doesn't exist in Lucide (e.g., the custom WhatsApp glyph already hand-drawn in `floating-cta.tsx`, which is the one justified exception since WhatsApp's brand mark isn't in a generic icon set).

### 8.2 Stroke and sizing
- **Stroke width:** Lucide's default (2px) — not overridden. Consistency across every icon matters more than a marginal stylistic preference for thinner strokes.
- **Sizing scale:** 14px (inline with Small text, e.g. a calendar icon next to a date), 16px (default — nav icons, button icons, form field icons), 20–24px (section iconography — feature card icons, stat band icons).

### 8.3 Color
Icons inherit the surrounding text color by default (`currentColor`). They take on the accent color only when they represent an active/interactive state that specifically warrants it (e.g., an active filled star, a selected chip's check) — not by default just because an icon sits near a heading.

### 8.4 Containers
Icons that need a distinct visual container (feature-card icon badges, stat-band icons) sit inside a square/rounded-square container (`rounded-xl`, 48–56px) with a paper or ink/5%-opacity tint background — never a solid accent-filled icon badge (that would violate the "accent never fills a large surface" rule at even small scale; badges use a muted tint, with the icon itself in ink or accent as appropriate).

---

## 9. Tables

### 9.1 Standard spec table (model detail "Техник үзүүлэлт")
```
┌─────────────────────────────────────┐
│ Хөдөлгүүрийн хэмжээ         2.0T     │  ← divide-y rows, no per-row border box,
│ Хамгийн их чадал            186 ᴴᴾ   │     label (body/muted) left, value
│ Биеийн урт                  4,720мм  │     (ink, bold, right-aligned) right
└─────────────────────────────────────┘
```
Grouped under collapsible category headers (Хөдөлгүүр / Хэмжээс / Аюулгүй байдал / ...) per Phase 4's accordion decision — a visitor sees category labels immediately and expands only what they care about, rather than scrolling a single 40-row flat list.

### 9.2 Comparison table (`/compare`) *(new)*
```
┌──────────────┬──────────────┬──────────────┐
│  (frozen)     │  X70 Plus     │  X50          │  ← header row: model image+name+price,
│  Spec label   │               │               │     sticky/pinned while scrolling vertically
├──────────────┼──────────────┼──────────────┤
│ Хөдөлгүүр     │  2.0T          │  1.5T          │
│ Чадал          │  186 ᴴᴾ        │  156 ᴴᴾ        │
└──────────────┴──────────────┴──────────────┘
```
- The label column is frozen (`position: sticky; left: 0`) on any viewport where the table must scroll horizontally (tablet/mobile, per Phase 4 §4) — a spec label must never scroll out of view while comparing values.
- Zebra row background alternation (paper / white) aids row-scanning across wide tables — no per-cell borders, which would visually compete with the frozen-column shadow needed to indicate scrollability.
- A value that differs meaningfully between compared models may carry a small ink-colored bold treatment to draw the eye — never accent-colored (accent stays reserved for actions).

### 9.3 Financing bank-partner comparison
A card-grid, not a literal `<table>` (per the existing `/financing` implementation) — four bank cards side by side, each with the same three labeled rows (Хүү / Хугацаа / Урьдчилгаа). This is intentionally a card pattern, not a table, because there are only 3–4 rows and 4 columns — a real table would add structural overhead a simple card grid handles just as clearly.

---

## 10. Animations

Concrete, reusable motion primitives — see §16 (Motion) for the principles governing *when* and *why* these are used.

### 10.1 Existing keyframes
```css
@keyframes reveal-up {
  from { opacity: 0; transform: translateY(24px); }
  to   { opacity: 1; transform: translateY(0); }
}
.reveal { animation: reveal-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) both; }
```
Used for scroll-triggered section entrances, one-shot (never replays once triggered).

### 10.2 New additions needed for Phase 4 components
| Name | Behavior | Use |
|---|---|---|
| `.crossfade` | `opacity` transition, 400–500ms ease-in-out, two absolutely-positioned layers swapping visibility | Color configurator's image swap, hero slide transitions |
| `.skeleton` | A slow (1.5s), looping, low-contrast gradient sweep (paper ↔ line color) | Placeholder for CMS-sourced images/content while loading — currently no loading-state treatment exists anywhere on the site; needed since model/news/offer content is fetched, not static |
| `.accordion-expand` | Height auto-transition (via a measured max-height or the native `<details>`/Radix Accordion primitive, already in the component library) | FAQ, spec-table category groups, mobile "Бидний тухай" nav accordion |
| `.stagger` | `animation-delay: calc(var(--index) * 80ms)` applied per grid item | Card grids (models, offers, news, feature cards) — items cascade in rather than all appearing at once |

### 10.3 Timing and easing tokens
| Token | Value | Use |
|---|---|---|
| `--ease-premium` | `cubic-bezier(0.16, 1, 0.3, 1)` | The one easing curve for every deliberate UI motion (card lift, reveal, accordion) — a soft decelerate that reads as considered, not mechanical |
| `--duration-fast` | 150ms | Button/input state changes (hover, focus) |
| `--duration-base` | 200–300ms | Card lift, color/border transitions |
| `--duration-slow` | 400–500ms | Crossfades, tab content swaps |
| `--duration-slower` | 600–900ms | Scroll-reveal entrances, hero slide transitions |

---

## 11. Elevation

Shadows are used sparingly and are always low-opacity/diffuse — never a hard, dark drop-shadow. Four levels only:

| Level | box-shadow | Use |
|---|---|---|
| 0 — Flat (default) | none | Every card, input, and surface at rest |
| 1 — Hover lift | `0 22px 50px -28px rgba(23,24,27,0.30)` (existing `.card-lift` value) | Card hover only, fading in over `--duration-base` |
| 2 — Floating panel | `0 20px 50px -20px rgba(23,24,27,0.25)` | Mega menu, dropdown panels, popovers |
| 3 — Overlay / topmost | `0 30px 60px -30px rgba(23,24,27,0.35)` | Full mega-menu panel, modal-equivalent surfaces, the floating CTA's expanded state |

**Rule:** nothing on the site should ever combine a heavy shadow with a visible border — pick one separation method per surface, matching Phase 1's finding that the calmest premium sites (Volvo, Genesis) use *either* whitespace/border *or* a very soft elevation cue, never both at once.

---

## 12. Border Radius

Full token scale (extending the existing `--radius` calc chain):

| Token | Value | Use |
|---|---|---|
| `--radius-xs` | 6px | Checkboxes, small tags |
| `--radius-sm` | 8px | Compact icon buttons, small chips |
| `--radius-md` | 10px | (reserved — currently unused, available for a future component needing a size between sm and lg) |
| `--radius-lg` | 12px | **Default** — cards, inputs, form containers |
| `--radius-xl` | 16px | Large feature cards, media containers, large image panels |
| `--radius-2xl` *(new)* | 20px | Hero-adjacent large containers, showcase panels — the top of the "12–20px" range established as the site's ceiling for rectangular content |
| `--radius-full` | 9999px (`rounded-full`) | All CTA buttons, chips/tags, badges, avatars, circular icon containers (floating CTA) |

**Rule:** every rounded corner on the site maps to one of these tokens — no arbitrary one-off radius values (`rounded-[13px]` etc.) anywhere in the codebase.

---

## 13. Responsive Rules

### 13.1 Breakpoint table (authoritative — referenced by every page in Phase 4)
| Name | Width | Tailwind mapping | Nav | Grid |
|---|---|---|---|---|
| Mobile | <768px | (default, no prefix) | Hamburger drawer | 1 column, sticky bottom CTA bar appears |
| Tablet (portrait) | 768–1023px | `md:` | Hamburger drawer | 2 columns |
| Tablet (landscape) | 1024–1279px | `lg:` | Full horizontal nav, hover mega menu | 2–3 columns |
| Desktop | ≥1280px | `xl:` | Full horizontal nav, hover mega menu | 3–4 columns |

### 13.2 Fluid vs. stepped
Typography and section padding are **fluid** (`clamp()`), scaling continuously with viewport width rather than jumping at a breakpoint — this avoids the "suddenly huge" jump premium sites avoid. Grid column counts are **stepped** (they must be — a grid can't have 2.5 columns) and change exactly at the breakpoints in §13.1.

### 13.3 Touch targets
Every tappable element (buttons, chips, nav links, form controls, card tap-areas) maintains a **minimum 44×44px** hit area on touch-capable viewports (tablet-portrait and mobile), even where the visible label/icon is smaller — achieved via padding, not by inflating the visible element itself.

### 13.4 Container behavior
`.container-page` (`min(1280px, 94vw)`) applies at every breakpoint without a separate mobile override — the `94vw` term already guarantees an appropriate side margin on any narrow viewport (roughly 3% each side), while the `1280px` cap prevents line lengths and grids from over-stretching on ultra-wide desktop monitors.

### 13.5 Images
`object-fit: cover` for all decorative/showcase imagery (heroes, model showcases, cards) so aspect ratios stay locked regardless of source image proportions; `object-fit: contain` only for images that must never crop (transparent-background studio color-configurator shots, logos). Every image has an explicit `loading="lazy"` except the single largest above-the-fold image per page (`loading="eager"`, `fetchPriority="high"`).

---

## 14. Accessibility

### 14.1 Focus
Every interactive element uses one consistent focus treatment (already implemented globally):
```css
:focus-visible {
  outline: 2px solid #E20A17;
  outline-offset: 2px;
  border-radius: 4px;
}
```
`:focus-visible` (not `:focus`) so mouse/touch interaction never shows a focus ring — only keyboard navigation does, which is the correct behavior for not visually cluttering pointer users while fully serving keyboard users.

### 14.2 Color contrast
- Body text (`#54585F` on `#FFFFFF`) meets WCAG AA for normal text (≥4.5:1).
- Muted text (`#8A8F98` on white) is reserved for non-essential meta text only (dates, captions) — never used for anything that must be read (form labels, critical instructions use ink or body color, not muted).
- The accent (`#E20A17`) on white meets AA for large text/UI components but is used for button *fills* (white text on accent background, which comfortably passes) rather than as small accent-colored body text on white, sidestepping any contrast risk entirely.

### 14.3 Keyboard navigation
- Every interactive element reachable via Tab in a logical order matching visual layout.
- `Escape` closes any open overlay (mega menu, dropdown, mobile drawer) — already implemented in `navbar.tsx` and extended to every new overlay Phase 4 introduces (compare page's model picker, if implemented as an overlay; test-drive's model tiles, since those are inline, not overlay, need no Escape handling).
- A **skip-to-content link** *(new — currently missing)* is added as the very first focusable element on every page, visually hidden until focused, jumping past the header/nav straight to `<main>`.

### 14.4 ARIA
- `aria-expanded` on every disclosure trigger (nav dropdowns, accordions, mobile drawer toggle) — already the pattern in `navbar.tsx`, extended to FAQ accordions and the spec-table category groups.
- `aria-current="page"` on the active nav item (already implemented).
- `aria-label` on every icon-only button (floating CTA's collapsed state, gallery arrows, close buttons) — an icon alone is never the only accessible name for a control.
- Form fields always have a programmatically associated `<label>` (already the pattern via the `Field` wrapper in `enhanced-lead-form.tsx`) — never label-by-placeholder-alone.

### 14.5 Semantic structure
`<header>`, `<nav>`, `<main>`, `<footer>`, and `<section>` landmarks used throughout (already largely the case) so screen-reader users can navigate by region, not just linearly through every element.

### 14.6 Images
Every informative image has descriptive `alt` text (model name + context, e.g. `"JETOUR X70 Plus — Далайн цэнхэр өнгө"`, not just `"X70 Plus"` repeated identically across every color variant). Purely decorative images (background textures, pattern overlays) use `alt=""` so screen readers skip them.

### 14.7 Reduced motion
Already implemented globally:
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```
No animation on this site is ever load-bearing for understanding content — everything communicated via motion (a reveal, a crossfade) is also fully present and comprehensible with motion instantly disabled.

---

## 15. Glass

Used deliberately sparingly — glassmorphism is a garnish here, not a structural material, consistent with Phase 1's finding that the calmest premium sites use at most a subtle navbar blur, never large glass panels as primary UI.

### 15.1 Existing utilities
```css
.glass-premium {
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(14px);
  border: 1px solid rgba(231, 231, 234, 0.9);
  box-shadow: 0 10px 30px -18px rgba(23, 24, 27, 0.18);
}
.glass-dark {
  background: rgba(18, 19, 22, 0.8);
  backdrop-filter: blur(14px);
  border: 1px solid rgba(255, 255, 255, 0.08);
}
```

### 15.2 Where glass is allowed
- **Header over hero imagery** (state A, §0.2 of Phase 4) — a translucent scrim, not full glass-blur, since the header at this state has no dense content needing the blur's legibility boost; a simple gradient/tint suffices there and is what's currently implemented.
- **Floating CTA's expanded action stack**, if placed over photographic content — `.glass-premium`/`.glass-dark` (chosen by what's beneath it) gives the three action buttons a readable surface without a hard box.
- **Outline buttons placed directly over a photograph** (`.btn-outline-light`) — uses a light blur (`backdrop-filter: blur(8px)`) so the button remains legible regardless of what's in the photo behind it.

### 15.3 Where glass is NOT allowed
Cards, forms, tables, the sticky sub-nav bar, and any content-bearing surface over a plain white/paper background never use glass/blur — there's nothing beneath them worth blurring, and applying the effect anyway would just be decoration for its own sake, which this system explicitly avoids.

---

## 16. Motion (principles)

Where §10 (Animations) is the catalog of concrete effects, this section is the governing philosophy for when and how much motion is appropriate.

### 16.1 Motion hierarchy by content weight
- **Hero-level content** (page heroes, hero carousels): the slowest, most cinematic motion on the site — 600–900ms crossfades and reveals. This is the one place motion is allowed to be felt, not just functional.
- **Section entrances:** a single, one-shot reveal (`.reveal`) per section as it enters the viewport — never replays on re-scroll, never staggers beyond a card grid's `.stagger` cascade.
- **Micro-interactions** (button hover/press, input focus, chip selection): fast (150ms), functional, felt more than seen.
- **Nothing in between these tiers.** A mid-page feature module doesn't get its own bespoke slow animation — it gets the standard section-entrance reveal, keeping motion vocabulary small and predictable across the whole site.

### 16.2 What animates
**Only `transform` and `opacity`.** No animation on this site ever touches `width`, `height`, `top`, `left`, or other layout-triggering properties directly (the one semi-exception, accordion height, uses a measured-height technique or a native primitive designed not to jank, not a naive `height: auto` transition). This keeps every animation compositor-driven and smooth even on modest hardware.

### 16.3 What never animates
- Page-load entrances of below-the-fold content — nothing animates until it's actually about to enter the viewport (`IntersectionObserver`-driven, never a blanket "animate everything on mount").
- Text reflow — no animated line-height/font-size changes.
- Anything the user has explicitly slowed via `prefers-reduced-motion` (see §14.7) — motion is the first thing stripped, content and function are never contingent on it.

### 16.4 Restraint as the rule
Per Phase 1's cross-brand finding: the calmer a brand wants to feel, the less it animates. This system defaults every new component to **no animation** unless one of the concrete cases in §10 applies — motion is opt-in per component, not a blanket "everything fades in" default that risks feeling busy rather than premium.

---

## Summary — what carries forward to Phase 6

1. **Formalized, not reinvented:** most of this system already exists in [globals.css](../../src/app/globals.css) — Phase 6 is largely an implementation/consistency pass (auditing every component against these tokens) rather than a rebuild.
2. **New tokens to add to `globals.css`:** semantic colors (§4.2), `--radius-2xl` (§12), the four new animation utilities — `.crossfade`, `.skeleton`, `.accordion-expand`, `.stagger` (§10.2), and the named easing/duration custom properties (§10.3).
3. **New components to build:** the chip/tile picker (§7.3 — used in four places per Phase 4), the comparison table with frozen label column (§9.2), a skeleton loading state (currently absent anywhere on the site), and a skip-to-content link (§14.3).
4. **One outstanding accessibility gap to close:** no skip-link exists today — first priority in Phase 6's accessibility pass.
5. **Discipline rules Phase 6 must enforce during build, not just at design time:** no arbitrary one-off radius/shadow/color values outside the tokens defined here; every card obeys the flat-at-rest/lift-on-hover elevation rule; the accent color never fills a large surface; glass/blur only in the three permitted contexts in §15.2.

**This concludes Phase 5.** Every token, component spec, and behavioral rule needed to build Phase 4's wireframes now exists in writing. Ready for Phase 6 (implementation) on your go-ahead.
