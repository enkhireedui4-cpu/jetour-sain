# Local preview completion — 2026-11-10

The remaining local startup and verification work from the three-site performance/copy cleanup is complete. Changes remain in the existing Desktop projects.

| Project | Preview | Verification |
| --- | --- | --- |
| JETOUR | http://localhost:3000/ | Production build, ESLint, TypeScript, 121/121 Vitest tests; 8 public routes at 390px and 1440px |
| CHERY | http://localhost:3018/ | Production build, ESLint, TypeScript, 10/10 quality tests, 12/12 loading browser tests, 15/15 browser assertions |
| Sain Motors | http://localhost:3300/mn/ | Production build, ESLint, TypeScript, 68/68 Vitest tests, 7/7 browser tests |

## JETOUR startup repair

Reproduced `@prisma/client did not initialize yet`. The repository had no local SQLite database. Standard `prisma generate` failed while trying to download Linux engine files. The installed Windows engine was available, so the client was generated with a temporary native-only copy of the same schema. The committed schema and its cross-platform targets were preserved.

Created an ignored `.env.local` with an absolute local SQLite URL and a generated local session secret. Initialized `db/custom.db` without a reset or destructive schema options. Imported only the public content from `db/content.json`: 8 models, 4 promotions and 2 news articles. Verified the database against that file before building. No production database or customer records were accessed.

The production server runs from `.next/standalone/server.js`, with `PORT=3000` and `HOSTNAME=127.0.0.1`. The generated client uses the Windows engine for this local preview. Generating fresh deployment engines remains a separate step in the deployment environment.

Browser verification used the complete built application. It checked home, models, T2, T1 PHEV, promotions, news, information request and dealer pages at mobile and desktop widths. Both art-directed hero images requested the correct mobile/desktop asset without the alternative breakpoint asset. The mobile menu opened and closed with Escape. The quick-lead dialog submitted successfully with the API intercepted. The T2 viewer loaded real frames, responded to keyboard rotation and changed paint. There were no JavaScript runtime errors or failed local resource responses in these checks.

Screenshots and machine-readable results are in the ignored `local-preview-qa/` directory. Optional outside trackers were intercepted during that browser test; no real lead or CRM request was sent.

## Other site verification

CHERY's production build generated all 42 pages. The loading suite checked data-saving behavior, hero visibility and stale requests, lazy 3D startup, selected paint loading, real progress, failure/retry behavior, mobile frame variants and cached paint return. Its quality suite checked API behavior and 572 responsive assets. Browser checks exercised Mongolian and English modal submissions with writes intercepted, analytics payloads, mobile responsive images and tracking opt-out. Trailing whitespace in the modified HomeHero component was cleaned.

Sain Motors rebuilt its responsive assets and exported all 51 build entries. The browser suite checked Mongolian and English routes, canonical/language metadata, layouts at 360, 390, 768, 1440 and 1920px, working assets, mobile menu keyboard/focus behavior, language switching, brand contact/gallery links, 404 handling and the corporate home journeys.

## Running previews again

Run these commands in each project's own PowerShell window, after a successful build:

JETOUR (`Desktop/jetour-sain`):

```powershell
$env:PORT = '3000'
$env:HOSTNAME = '127.0.0.1'
node --env-file=.env.local .next/standalone/server.js
```

CHERY (`Desktop/chery`):

```powershell
npm.cmd run start -- -p 3018
```

Sain Motors (`Desktop/sainmotors.mn`):

```powershell
npm.cmd run preview
```

All three preview URLs returned HTTP 200 at final verification; JETOUR's public models endpoint returned 8 published models. The browser pane access host was unavailable, so visible tabs could not be opened through it. The local servers and automated browser checks worked.

These checks establish local build and behavior results. They do not establish new live-site performance numbers. No deployment, push, production import or real customer submission was performed. Admin sign-in and real outside CRM delivery were not exercised.
