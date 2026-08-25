# JETOUR Mongolia — Redesign Master Plan

> **For agentic workers:** Энэ нь МАСТЕР замын зураг. Шат тус бүр гүйцэтгэхийн
> өмнө өөрийн дэлгэрэнгүй төлөвлөгөөг `2026-08-25-jetour-phase-N-*.md` гэж
> үүсгэнэ. Тэр төлөвлөгөөг `superpowers:executing-plans` эсвэл
> `superpowers:subagent-driven-development`-ээр гүйцэтгэнэ.

**Goal:** Одоо байгаа бүх өгөгдөл, загварын мэдээлэл, зохиомжийг ХАДГАЛЖ,
харагдац · motion · typography · гүйцэтгэл · SEO · analytics-ийг албан ёсны
luxury automotive түвшинд дэвшүүлэх.

**Architecture:** Одоо байгаа Next.js 16 App Router бүтцийг хэвээр. Дизайныг
дахин бичихгүй — **token-д нэгтгэж, зэрэглэл (elevation), контраст, зай,
эрэмбийг хянана**. Motion-ыг байгаа CSS + WAAPI + framer-motion дээр л
өргөтгөнө. Гүйцэтгэлийг зураг + CSS-ийн хэмжээгээр олно.

**Tech Stack:** Next.js 16 (App Router, Turbopack) · React 19 · TypeScript ·
Tailwind v4 · Prisma/SQLite → Postgres · framer-motion 12 · sharp

**Spec:** Хэрэглэгчийн 9-шатт pipeline (энэ файлын `## Pipeline` хэсэгт
хуулагдсан) + [CLAUDE.md](../../../CLAUDE.md)

---

## Global Constraints

Эдгээр нь БҮХ шатны шаардлагад дуугүй хамаарна.

- **Өнгө:** цагаан premium суурь ХЭВЭЭР. `#E20A17` нэг accent. Inter, italic-гүй.
  Dark theme, glassmorphism, metallic gradient **хийхгүй** *(2026-08-25 шийдвэр)*.
- **Dependency:** шинэ animation/carousel/scroll library **нэмэхгүй**. GSAP,
  ScrollTrigger, Lenis, Locomotive **хийхгүй** *(2026-08-25 шийдвэр)*. Зөвхөн
  CSS + WAAPI + framer-motion 12 (аль хэдийн орсон).
- **Өгөгдөл:** 8 загвар, үзүүлэлт, форм, локализаци, route — БҮГД хэвээр.
  Үзүүлэлт **зохиохгүй** (DB/брошюрт байхгүй тоо бичихгүй).
- **Эх сурвалж:** `db/custom.db` → `detailsJson`. `src/lib/jetour-data.ts` нь
  seed-ийн эх. Аль нэгийг сольвол хоёуланг тааруул.
- **Motion token:** `--ease-out: cubic-bezier(0.22,1,0.36,1)` ·
  `--ease-cinema: cubic-bezier(0.5,0.02,0.32,1)` ·
  `--mo-fast/base/slow/cinema = 200/260/420/900ms`. Шинэ утга зохиохгүй.
- **Reduced motion:** мэдээлэл дамжуулдаг хөдөлгөөнийг **богиносго**, хасахгүй.
  Гоо сайхны давхаргыг (parallax) **бүрэн хас**.
- **Хэл:** хэрэглэгч харах бүх монгол текст `mongolian-spellcheck` дамжина.
- **Хувийн мэдээлэл:** analytics/pixel-д нэр · утас · и-мэйл · формын утга
  **дамжуулахгүй**.
- **Дуусгах гэйт:** `npx tsc --noEmit` · `npx eslint` · `npx next build` —
  гурав цэвэр байхгүйгээр «дууслаа» гэхгүй.

---

## PHASE 0 — Baseline LOCK  ✅ 2026-08-25

Эдгээр тоо нь **бэхлэгдсэн**. Шат бүр дуусахад
**Before → After → Delta → Acceptance** гэж тайлагнана. Delta-г
зөвтгөж чадахгүй бол шат дуусаагүй.

| # | Хэмжүүр | Before (locked) | Acceptance |
|---|---|---|---|
| M1 | Compiled CSS | **144 KB** | ≤ 60 KB |
| M2 | `globals.css` эх | **5 500 мөр / 179 KB** | ≤ 3 200 мөр |
| M3 | Client JS chunks | **2 027 KB / 39** | ≤ 1 400 KB |
| M4 | `public/` зураг нийт | **80.2 MB / 708 файл** | ≤ 12 MB |
| M5 | — үүнээс АШИГЛАСАН | **67.7 MB / 656 файл** | ≤ 11 MB |
| M6 | — үүнээс АШИГЛААГҮЙ | **12.5 MB / 52 файл** | 0 MB (архивлана) |
| M7 | Хамгийн хүнд ашигласан | **4 734 KB** `models-ext/x70-plus-2.png` | ≤ 400 KB |
| M8 | `"use client"` файл | **38 / 70 (54%)** | ≤ 26 / 70 |
| M9 | GA4 event | **0** | 6 (funnel бүтэн) |
| M10 | `BreadcrumbList` | **0 route** | бүх дотоод route |
| M11 | `Car` schema талбар | **6** | ≥ 12 |
| M12 | Route × breakpoint скриншот | **0** | 16 × 3 = 48 |

Хэмжих script: `scripts/_img-audit.mjs` (M4–M7). Бусдыг Phase 1-д
`scripts/_baseline.mjs` болгож нэгтгэнэ.

### ⚠ Зургийн ашгийн ЗӨВ хүлээлт

`next/image` бүх зурагт хэрэглэгдэж байна (кодод цорын нэг raw `<img>` —
footer-ийн лого). `next.config.ts`-д `formats: ["image/avif","image/webp"]`
тохируулагдсан. Тэгэхээр **хэрэглэгч рүү аль хэдийн AVIF/WebP хүрч байна** —
80 MB нь диск/repo-ийн жин, хүргэгдэж буй payload БИШ.

Тиймээс зураг оптимизацийн жинхэнэ ашиг:

- ✅ repo / deploy хэмжээ 80 MB → ~12 MB
- ✅ `next build` хугацаа ба Vercel image-optimization зардал (4.7 MB PNG
  хөрвүүлэх нь хэд дахин үнэтэй)
- ✅ **cache-гүй эхний хүсэлт** — optimizer 4.7 MB PNG-г decode хийж
  байх хугацаа хэрэглэгчийг хүлээлгэдэг → LCP-д бодит нөлөө
- ❌ Cache халуун үед LCP-д мэдэгдэхүйц нөлөө **байхгүй**

«80 MB → 12 MB болбол LCP гурав дахин сайжирна» гэж хүлээхгүй.

---

## Pipeline — 9 шат

Дараалал нь хэрэглэгчийн зааврын дагуу. Шат тус бүр **бие даан ажиллах
програм** гаргана — дараагийнх нь эвдэрсэн зүйл дээр босохгүй.

### Phase 1 — Design system нэгтгэл  ⟨Step 2⟩
**Skills:** `design-system` · `ui-styling` · `ui-ux-pro-max`

5 500 мөр CSS нь хэсэг тус бүрийн урт сүүл (741 spread/band · 485 загвар
сонгогч · 449 premium features · 320 гадна үзэмж · 291 утас · 259 showcase …).
Дахин бичихгүй — **давхардсан pattern-ыг token/utility болгож татна**.

- Token давхарга: `surface` (0–3 зэрэглэл, сүүдэр биш дэвсгэрийн нарийн зөрүү),
  `spacing` scale, `type` scale, `radius`, `border`.
- Давхардсан `clamp()` typography-г `type-*` класс болгож нэгтгэх.
- Контраст: бүх текст/дэвсгэр хосыг AA → **AAA** (≥7:1 бие, ≥4.5:1 том).
- Ашиглагдахгүй селектор устгах (`grep`-ээр батлаад).

**Гэйт:** compiled CSS ≤ 60 KB · 16 route-ын скриншот өмнө/дараа **ижил**
зохиомж · контраст тайлан AAA · `tsc`/`eslint`/`build` цэвэр.

### Phase 2 — Монгол copy  ⟨Step 3⟩
**Skills:** `mongolian-spellcheck` → `copy-editing` → `copywriting`

Хэрэглэгч харах бүх текст: гарчиг, дэд гарчиг, товч, CTA, форм label,
validation/error, `alt`, meta title/description, spec label.

**Гэйт:** spellcheck 0 алдаа · бизнесийн агуулга **өөрчлөгдөөгүй** ·
үзүүлэлтийн тоо **хөндөгдөөгүй**.

### Phase 3 — Motion & micro-interaction  ⟨Step 4⟩
**Skills:** `premium-motion`

- Scroll reveal — `IntersectionObserver` (above-the-fold-д тавихгүй).
- Sticky spec showcase (interior / safety / powertrain) — `position: sticky`.
- Cinematic image reveal — `clip-path`.
- Parallax 6–10% гүн, reduced-motion-д бүрэн хас.
- Magnetic/hover — 1.5%-аас хэтрэхгүй, `@media (hover: hover)`.
- **Lenis-гүй** — scroll инерц хийхгүй *(шийдвэр)*.

**Гэйт:** DevTools Performance-д 60fps · CLS хувь нэмэр 0 ·
reduced-motion салаа зам бүр тест · `document.getAnimations()`-оор чиглэл батлах.

### Phase 4 — Frontend refactor  ⟨Step 5⟩
**Skills:** `simplify` · `frontend-design`

- `"use client"` 38 → ≤ 26. Client хилийг interactive навчинд буулгах.
- `models.tsx` (26 KB) · `navbar.tsx` (22.5 KB) · `model-sections.tsx` (16.8 KB)
  — үүрэг тус бүрээр хуваах.
- `next/image` `sizes` бүрд зөв, `priority` зөвхөн hero-д.

**Гэйт:** client файлын тоо буурсан · bundle ≤ 1 400 KB · харагдац хэвээр.

### Phase 5 — Гүйцэтгэл  ⟨Step 6⟩
**Skills:** `systematic-debugging` · `verification-before-completion`

- **80.2 MB → ≤ 12 MB.** Дөрвөн `models-ext/x70-plus-*.png` (18 MB) → WebP/AVIF.
  `sharp`-аар script, эх файлыг `.image-originals/`-д хадгална.
- Font: Inter subset (`latin` + `cyrillic`) аль хэдийн зөв — `display: swap` батлах.
- Below-the-fold медиа lazy · dynamic import-ыг хэмжсэний дараа л.

**Гэйт:** LCP < 2.5s · CLS < 0.1 · INP < 200ms (mobile throttled) ·
`public/` ≤ 12 MB.

### Phase 6 — Security  ⟨Step 7⟩
**Skills:** `security-review` · `code-review`

Admin route · `/api/*` · форм input validation/rate-limit · `.env` алдагдал ·
error fallback · `dangerouslySetInnerHTML` (JSON-LD) escape.

**Гэйт:** security-review-ийн бүх finding шийдэгдсэн эсвэл зөвтгөгдсөн.

### Phase 7 — SEO & Schema  ⟨Step 8⟩
**Skills:** `seo-audit` · `schema`

- `Car` schema 6 → ≥12 талбар (`manufacturer`, `bodyType`, `vehicleEngine`,
  `numberOfDoors`, `fuelConsumption`, `offers`…) — **зөвхөн DB-д байгаа утгаар**.
- `BreadcrumbList` бүх дотоод route-д (одоо 0).
- `/models`-д `ItemList`.
- `AutoDealer` (layout) — `openingHours`, `geo`, `areaServed` нэмэх.
- canonical · OG зураг route тус бүрд.

**Гэйт:** Rich Results Test бүх төрөлд ногоон · `seo-audit` finding 0 critical.

### Phase 8 — Analytics funnel  ⟨Step 9⟩
**Skills:** `analytics` · `cro`

GA4-д event **6 нь бүгд байхгүй**. Нэмэх: `form_view` · `model_selected` ·
`phone_input` · `form_started` · `test_drive_request` · `cta_clicked`.
Meta Pixel-ийн байгаа `Lead`/`Contact`-той **давхардуулахгүй**.

**Гэйт:** event бүр DebugView-д харагдсан · **хувийн мэдээлэл 0** ·
funnel тайлан гарсан.

### Phase 9 — Final verification
**Skills:** `verification-before-completion` → `code-review` → `simplify`

16 route × 6 breakpoint (1440/1280/1024/768/390/375) · JS алдаа 0 ·
spellcheck 0 · hydration warning 0 · `tsc`/`eslint`/`build` цэвэр.

---

## Гүйцэтгэлийн дараалал ба эрсдэл

Phase 1 нь хамгийн эрсдэлтэй (5 500 мөр CSS хөндөнө) БОЛОВЧ дараагийн бүх
шатны суурь. Тиймээс:

1. **Phase 1-ийг өмнө нь скриншот baseline авалгүй эхлэхгүй.** 16 route × 3
   breakpoint = 48 скриншот. Browser pane нээлттэй байх ёстой.
2. Phase 5 (зураг) нь **бие даасан** — Phase 1-тэй зэрэгцүүлж хийж болно,
   зөрчилдөхгүй.
3. Phase 6–8 нь харагдацыг хөндөхгүй — Phase 1–4-ийн дараа ямар ч үед.

## Явцын хяналт

| Phase | Төлөв | Дэлгэрэнгүй төлөвлөгөө |
|---|---|---|
| 1 Design system | ⬜ хүлээгдэж байна | — |
| 2 Монгол copy | ⬜ | — |
| 3 Motion | ⬜ | — |
| 4 Frontend refactor | ⬜ | — |
| 5 Гүйцэтгэл | ⬜ | — |
| 6 Security | ⬜ | — |
| 7 SEO & Schema | ⬜ | — |
| 8 Analytics | ⬜ | — |
| 9 Final | ⬜ | — |
