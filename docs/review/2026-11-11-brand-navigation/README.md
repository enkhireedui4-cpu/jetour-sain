# SAIN Motors cross-brand navigation — 2026-11-11

Implemented in the existing Desktop `jetour-sain` and `chery` source checkouts. The user subsequently requested committing and pushing both repositories on2026-11-11. No direct live deployment was performed. The sibling `sainmotors.mn` repository was inspected as the authority for brand names, order, assets and directory routing; it was not changed.

## Jetour changes

- `src/lib/brand-navigation.ts`: eleven brands, explicit destinations, official wordmark paths and current-brand state; shared company/directory URLs.
- `src/components/jetour/brand-navigation.tsx` and `.module.css`: semantic desktop disclosure, hover/focus tooltip, two-column list, non-link current-brand badge, mobile accordion, 160ms transitions and reduced motion.
- `src/components/jetour/navbar.tsx`: separate JETOUR home and SAIN company links, independent chevron, shared open-menu state for mutual exclusion, Escape focus return, breakpoint cleanup. Original logo order and 28px/26px heights retained. Desktop breakpoint1280px; smaller widths use the existing hamburger. Transparent and solid states have equal heights.
- `src/components/jetour/contact.tsx` and `footer.module.css`: compact official-distributor statement and company/other-brands links before copyright.
- `public/logos/brands/brand-*.png`: eleven byte-for-byte copies of the official curated wordmarks from `sainmotors.mn/public/media/`. That existing site's image pipeline selects and trims the original supplied logos; no new logo drawing, recoloring or distortion.
- `tests/e2e/brand-navigation.mjs`: real-browser regression; no dependency added. Pass an existing Playwright installation through `PLAYWRIGHT_MODULE`.
- This report, screenshots and the implementation plan.

The mobile drawer hides the existing floating contact/back-to-top controls while open, so they cannot cover brand links or its sales button.

## Verification

- Unit suite: `npm.cmd test` —21 files,121 tests passed. Expected admin-not-configured diagnostics appear in the tests that exercise that condition.
- ESLint: `npm.cmd run lint` — passed, no warnings after cleanup.
- TypeScript: `node node_modules/typescript/bin/tsc --noEmit` — passed.
- Production: `node node_modules/next/dist/bin/next build` — passed,49 static pages generated. Build ran in isolated `.next/brand-navigation-verify` with the existing Vercel output mode, because the default `.next/standalone` directory is held by an existing process. Temporary `next.config.ts` and generated `tsconfig.json` changes were restored; there is no final configuration diff.
- The initial unmodified `npm.cmd run build` attempt stopped with EBUSY on the existing standalone directory. The standalone copy wrapper was not rerun against a running deployment's files.
- The existing development CSP prevents React's development hydration; tests therefore used an actual production server at port3213. The CSP was not weakened.
- Real Chrome, headless: `/` and `/models/t2` at360,390,768,1024,1280,1440px. Header bounds and adjacent item geometry, independent logo hrefs, all eleven brands, current-brand non-link, directory destination, Enter/Space, Escape/focus return, outside click, Tab dismissal, inert closed links, model-menu exclusion, mobile accordion/44px+ rows, drawer scroll and footer links all pass.
- Existing home hero slide selection and sales dialog opening/closing pass. No lead was submitted. Short desktop viewport1280×320 and reduced-motion mode pass.
- Browser regression first failed for the missing independent company link. A subsequent header-height regression caught64→65px on opening; stable border geometry fixed it. Screenshots caught the mobile floating-contact overlap; the drawer now suppresses it.
- Independent read-only review of both implementations found no critical or important issue. It additionally verified focus across breakpoint changes, last-link reachability in short panels, Tab out, reduced motion, and Chery's two languages.

Reproduce browser checks from this repository with a running production preview:

```powershell
$env:PLAYWRIGHT_MODULE='C:\Users\user\OneDrive\Desktop\chery\node_modules\playwright'
$env:BASE_URL='http://127.0.0.1:3213'
node tests/e2e/brand-navigation.mjs
```

## Destination evidence and limits

The live [Mongolian directory](https://sainmotors.mn/mn/brands/) and [English directory](https://sainmotors.mn/en/brands/) both expose this order: JETOUR, SOUEAST, CHERY, BYD, RIDDARA, AITO,212, FAW BESTUNE, CHERY RELY, MAXUS, FAW HONGQI. Both company homepages and directories were read successfully. Jetour's public homepage and the Mongolian BYD, RIDDARA, BESTUNE, MAXUS and HONGQI detail pages returned real content matching the brand.

The remaining Mongolian detail URLs are present in the real directory, but direct content reads for SOUEAST, AITO,212 and RELY returned reader cache errors. All English brand-detail links exist in the English directory, but their destination bodies could not be read. Chery's live homepage/English homepage could not be fetched by the reader. These failures do not establish404s. Direct HTTP status probing was blocked by the environment (`EACCES`), and Firecrawl is unavailable.

Accordingly, Jetour uses the supplied Mongolian destinations. Chery uses the verified English company home/directory for English UI while retaining the supplied Mongolian URLs for the other brands. No English brand-detail URLs were invented.

Scope: the requested home/model pages, English Chery equivalents and documented interaction states were checked. All other pages, physical iOS/Android devices, screen-reader audio, real lead submission, production analytics and live deployment were not tested.

## Screenshots

- [Jetour desktop disclosure](jetour-desktop.png)
- [Jetour mobile accordion](jetour-mobile.png)
- [T2 desktop disclosure](jetour-open-t2.png)

Chery's implementation and evidence are in the sibling repository's `docs/review/2026-11-11-brand-navigation/` directory.
