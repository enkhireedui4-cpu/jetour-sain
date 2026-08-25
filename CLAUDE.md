# JETOUR Mongolia — production website

Албан ёсны автомашины сайт. Sain Motors ХХК. Монгол хэлээр, монгол
хэрэглэгчдэд. Production — туршилтын талбар биш.

## Stack (баталгаажсан)

- **Next.js 16** (App Router, Turbopack) · **React 19** · **TypeScript**
- **Tailwind v4** (`@theme inline` + `globals.css` дахь BEM-төст класс)
- **Prisma** + SQLite (`db/custom.db`) — production-д Postgres (`*:pg` script)
- **framer-motion ^12.23** орсон · **sharp** орсон
- **GSAP / Lenis / Locomotive ОРООГҮЙ** — нэмэхгүй (доороос үзнэ үү)

### Командууд

`bun` энэ машинд **байхгүй**. Дараахыг ашиглана:

```bash
npx tsc --noEmit          # typecheck
npx eslint <файлууд>      # lint
npx next build            # production build
node scripts/<script>.mjs # нэг удаагийн script
```

Dev server-ыг **Bash-аар биш**, Browser pane-ийн `preview_start`-аар
(`.claude/launch.json` → `jetour-qa`, port 3140) ажиллуулна.

---

## Skill pipeline — ямар ажилд ямар дараалал

Skill олон байх нь сайн гэсэн үг биш. **Дараалал** нь чухал.

```
Design → Монгол copy → Motion → Frontend → Performance
       → Security → SEO → Analytics → Final review
```

### 1. Design (эхэлж)
`frontend-design` · `ui-ux-pro-max` · `ui-styling` · `design-system`
· `higgsfield-websites` (premium taste / wow / review rubric)
· `higgsfield-brandkit` (JETOUR brand consistency)

Шинэ UI хэсэг эсвэл дахин зохиомж хийхээсээ **өмнө** дуудна. Одоо байгаа
token/класс системийг уншаад дараа нь л шинэ юм бичнэ.

### 2. Монгол copy
`mongolian-spellcheck` — **хэрэглэгч харах БҮХ монгол текстэд заавал**:
гарчиг, товч, CTA, форм, validation, error, alt, meta title/description.
Дараа нь шаардлагатай бол `copywriting` (шинээр зохиох) /
`copy-editing` (байгааг сайжруулах) / `humanizer` (AI маягийг арилгах).

### 3. Motion
`premium-motion` — анимаци, transition, карусель, scroll эффект, hover.
Бичихээсээ **өмнө** `references/landmines.md`-ыг уншина (энэ кодын баазад
бодитоор гарсан урхинууд).

### 4. Frontend implementation
Server Component-ыг анхдагчаар. `"use client"`-ыг зөвхөн интерактив хэсэгт.
Бүтэн хуудсыг client болгохгүй.

### 5. Performance
Тусдаа skill байхгүй тул `systematic-debugging` + `simplify` +
`verification-before-completion`-ыг performance requirement-тэй хамт
хэрэглэнэ. Шалгах: LCP, CLS, INP · `next/image` (AVIF/WebP, `sizes`)
· lazy/eager хуваалт · шаардлагагүй JS · animation нь 60fps.

### 6. Security
`security-review` — deploy-оос өмнө. Мөн admin route, API route, форм,
`.env` алдагдал.

### 7. SEO
`seo-audit` (техникийн + on-page) · `schema` (загварын хуудсуудад
**заавал** — Vehicle/Product/AutoDealer) · `site-architecture` (routing,
дотоод холбоос) · `ai-seo` (AI хайлтад citation).

### 8. Analytics
`analytics` — Meta Pixel аль хэдийн суусан (`src/components/jetour/meta-pixel.tsx`,
site-даяар, PageView + route change). Шинэ event нэмэхэд **хувийн
мэдээлэл дамжуулахгүй** (нэр/утас/и-мэйл/формын утга). `cro` — хөрвөлт
сайжруулах.

### 9. Final review (deploy-ын өмнө)
`code-review` → `simplify` → `security-review` → `verification-before-completion`

Том feature бол `writing-plans` → `executing-plans`. Bug бол
`systematic-debugging` (таамаглахгүй, оношил).

---

## Хатуу дүрмүүд

**Үзүүлэлт зохиохгүй.** Инч, кВт, л/100км, баталгааны хугацаа, хэмжээс —
зөвхөн DB/брошюрт байгаа бол бич. Байхгүй бол бичихгүй, өөр орны сайтаас
хуулахгүй. Албан ёсны сайт тул худал үзүүлэлт нь бодит хариуцлага.

**Өгөгдлийн эх сурвалж нь DB.** `db/custom.db` → `detailsJson`. Хуудсууд
`src/lib/cms.ts`-ээр уншина. `src/lib/jetour-data.ts` нь seed-ийн эх.
Аль нэгийг сольвол **хоёуланг** нь тааруул.

**Загварын хуудас = нэг шаблон.** `src/app/models/[id]` + `detailsJson`.
Загвар тус бүрт тусдаа хуудас хийхгүй.

**Дизайны хүрээ.** Цагаан суурь · нэг accent `#E20A17` · Inter · italic-гүй
· карт/сүүдэр/градиент багатай · машин нь гол баатар.

**Dependency нэмэхгүй.** Ялангуяа animation/carousel library. CSS + WAAPI +
framer-motion гурав хүрэлцэхгүй болохыг **баталсны** дараа, зөвшөөрөл авч нэм.

**UTF-8.** Монгол коммент/текстийг PowerShell-ийн `-replace`-аар бичихгүй
(кирилл эвдэрдэг) — Write/Edit tool хэрэглэ.

---

## Шалгах соёл

Browser pane нуугдсан үед: `rAF` ажиллахгүй, `setTimeout` throttle болно,
`vw`/`svh` layout **хуучин** утгаараа үлдэнэ, screenshot гарахгүй.
Тиймээс **«харлаа» гэж хэлэхгүй** — геометр/DOM/анимацийг хэмжиж бат
ла, эсвэл кадруудыг script-ээр зурж харуул.

Ажил дуусахад: `npx tsc --noEmit` · `npx eslint` · `npx next build` —
гурвыг ажиллуулаад л «дууслаа» гэнэ.
