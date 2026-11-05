# Jetour colour viewer performance

## Changes

- The 360° queue loads the current angle first, then neighbouring angles, with six concurrent requests (two on Save-Data/2G). A colour change cancels obsolete requests and their callbacks.
- The centered 72×40px percentage badge uses 16px white text and reflects successfully decoded frames. Failed frames never count as loaded. The previous vehicle stays visible and Retry fills only missing frames. Individual requests time out after 20 seconds; an overall 45-second deadline prevents stalled queues from hiding Retry for several minutes.
- Already decoded paints can be reused without new requests. The component retains at most two paints, targeting 96 MiB on mobile and 192 MiB on desktop. The displayed/requested paint remains protected while switching; these are estimates of decoded pixels, not a hard limit on browser RAM.
- All 360 T2/T1 PHEV frames have versioned 640px WebP mobile variants with transparency. The preloader and renderer use identical URLs. Existing desktop assets remain in use at widths ≥700px. The initial resolution tier stays stable through resizing to avoid redownloading a rotation.
- Mobile source files total **5,661,528 bytes**, compared with **12,814,196 bytes** for the originals: **56% smaller**. Versioned mobile URLs receive immutable cache headers; future replacements must use a new version directory.
- Both static colour selector layouts now request only the selected responsive Next image near the viewport. Byte progress is shown when the response supplies a length; otherwise it stays at 1% until the image is decoded. A two-image/48 MiB estimated decoded cache supports instant return. Previous images remain visible during transfer, failure and retry; stale responses cannot replace the current selection.
- Paint transitions take 240ms and respect reduced-motion preferences. Existing specifications, forms, database content, authentication and analytics were not changed.

## Reference

The public [Jetour Global T2 viewer](https://jetourglobal.com/T2/) was inspected during the preceding CHERY work using the reverse-engineer-anything skill. The selected-angle priority, selected-only colour requests, cached return and compact percentage mask inform these changes. This implementation counts successful decodes and exposes errors rather than copying the reference's error-counting behaviour. No backend behaviour was inferred.

## Verification

- 360 generated assets verified for 640px width, WebP format and transparency (`node scripts/prepare-spin-mobile.mjs --verify`).
- Clean GitHub CI now passes all **113 tests across 19 suites**, including the previously unavailable authentication/database tests, plus whole-project TypeScript and lint ([verified run](https://github.com/enkhireedui4-cpu/jetour-sain/actions/runs/41988111637)).
- Ten browser scenarios exercised the actual production React components in an isolated local fixture: T2 at 390px and 1280px, selected-only initial requests, mobile/desktop URL selection, angle preservation, cached return without requests, rapid changes, frame failure/retry, T1 PHEV mobile assets, static selected-only requests, real progress, failure/retry and stale-response handling. These component checks do not constitute a full-site production browser test.
- Local installation is still restricted by shell EACCES. Clean GitHub CI used this repository's unchanged lockfile, compiled production successfully and generated all **49 pages**. GitHub's Vercel status also confirms successful deployments for the viewer visibility fixes. Local component fixtures use available tools from the neighbouring Sain project; their limits do not apply to the clean CI build.

The unrelated pre-existing edit to `src/components/jetour/contact.tsx` is excluded from this change.

## Live visibility follow-up

The live T2 page reproduced the reported bare percentage at the top-left. Its published stylesheet contained the old spinner and 700ms paint transition, but no new loader/selected-paint rules, while its JavaScript rendered the new loader. GitHub reports a successful Vercel deployment for ea2f1af; the exact build-cache cause has not been established.

Loader and static-image styles now live in a shared CSS module directly imported by their components. Paint duration is also explicitly matched to the 240ms old-layer lifetime. This keeps the new UI's styles coupled to its component chunk. A browser regression using the actual published stylesheet failed vertical-center alignment before this fix, then passed center, minimum size, cached switch, cancellation and retry checks at 390px/1280px after it. No raw production content is committed as a fixture.

`.github/workflows/quality.yml` now runs a clean lockfile install, Prisma generation, Next type generation, full TypeScript, lint, all unit tests, asset verification and a production build. The build uses a disposable runner SQLite database populated only from public content; no production database or secrets are used.

The first full CI run passed typechecking/lint and 109 tests; four SQLite concurrency tests stalled on the small runner. Their two independent clients now each use one SQLite connection, avoiding the Prisma engine worker-starvation condition documented in [prisma/prisma#29870](https://github.com/prisma/prisma/issues/29870). The tests still submit eight/twelve requests concurrently and keep all duplicate-prevention and quota assertions. No production database configuration was changed.

## Compact footer and transparent paints

- The footer retains five desktop columns. Its first column is wider; contact details use aligned label/value rows, and links/section padding use tighter spacing. All addresses, opening hours, social links and eight model links remain available. A CSS module keeps the new layout coupled to the component.
- Component browser measurements at 1280px: footer height 647.5px → 363.8px; first-column width 285.6px → 402.6px. At 390px: height 1125.5px → 806.6px. Six widths from 360 to 1440px passed overflow and content-retention checks. Fixture social icons were mocked; live verification uses the actual production icons.
- Live network inspection found that the default XHR Accept header made Vercel return opaque JPEG for transparent paint WebP files. Requests now explicitly accept AVIF/WebP. A fixture reproducing this negotiation verifies zero alpha at transparent corners, alongside the existing selected-only/cache/retry checks.
