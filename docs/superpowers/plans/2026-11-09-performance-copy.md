# Website performance and copy cleanup

> Implementation: execute the authorized maintenance inline, starting with JETOUR, then Sain Motors, then CHERY. Follow systematic debugging, focused regression checks, and verification before completion.

**Goal:** Reduce unnecessary startup work, repair reproduced errors, and replace inflated public copy with clear Mongolian without inventing specifications.

**Architecture:** Keep each existing Next.js application and content source. Defer optional third-party downloads while retaining queued events, use existing responsive assets and fonts, and preserve working forms, navigation, and vehicle viewers.

**Global constraints:** No new runtime dependencies; preserve pre-existing contact.tsx and CHERY tsconfig.json edits; do not read customer records; do not import/reset production databases; no deployment or push. User has authorized changes in these existing Desktop folders. Missing human-writer/mongolian-spellcheck skills are recorded; manually review Mongolian copy.

## Review focus
- Initial route changes or lead events before delayed analytics loads must remain queued.
- Mobile and desktop must request their own hero image, with visible first-slide text before hydration.
- Reduced motion, keyboard entry, and mobile menus must continue working.
- Text changes must retain prices, technical values, legal information, and contact details.
- Static hosting must deliver root redirects and cache rules without relying on Apache-only configuration on Vercel.

## Tasks
- [x] Establish a complete working JETOUR test baseline with the available installed dependencies. Regenerate Prisma Client, initialize local SQLite from public content, and record the download limitation.
- [x] JETOUR: regression-check analytics queue and CSP behavior; defer external scripts, fix narrowly scoped CSP sources, optimize font and responsive hero delivery, and simplify public copy/content. Remove only proven unused code.
- [x] JETOUR: run the full unit suite, type checking, lint, production build, and desktop/mobile browser checks. Verify responsive image requests, navigation, mocked lead submission, and the real vehicle viewer.
- [x] Sain Motors: inspect export/hosting routes and font/image loading; fix root redirect for the configured hosting, simplify public copy and remove irrelevant AI references; run its required checks.
- [x] CHERY: inspect hero rendering and startup work, simplify public copy and remove irrelevant AI references; run its required checks while preserving the existing tsconfig edit.
- [x] Review changes and record verified results and limits in docs/2026-11-10-local-preview-verification.md. Leave the requested local previews running.

## Progress
- Initial baseline: JETOUR had 87 passing unit tests and six suites blocked by dependencies. Later startup failed because Prisma Client and the local database were absent.
- Completed 2026-11-10: JETOUR 121/121 tests; Sain Motors 68/68 unit tests and 7/7 browser tests; CHERY 10/10 quality tests, 12/12 loading tests and 15/15 browser assertions. All three production builds, lint checks and type checks passed.
- Local public content imported into a newly created SQLite database only: 8 models, 4 promotions, 2 news articles. Production data was not imported or reset.
- Local previews verified over HTTP: JETOUR :3000, CHERY :3018, Sain Motors :3300. Browser pane access host was unavailable; automated local browsers verified the pages.
- No post-deployment speed comparison is claimed. These results validate local production builds and behavior; the live websites have not been deployed from this task.
