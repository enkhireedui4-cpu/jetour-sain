# Lead reliability changes

The local SQLite schema has been updated additively. The original database is preserved at `db/pre-lead-fixes.backup.db` (ignored by Git and containing private data).

Submissions succeed only after a database transaction commits. All submitted scheduling, contact and finance fields are stored in `Lead.payloadJson` and shown in the admin message. A ten minute deduplication window compares the entire normalized submission, including model, appointment and request type. Mongolian `+976` and local phone formatting share an identity. Another model or another appointment is a new request. Duplicate submissions do not emit another conversion event.

Database counters enforce five lead attempts per minute per IP, twenty login attempts per fifteen minutes per IP, and ten login attempts per fifteen minutes per account. These use fixed windows. PostgreSQL servers must share the same database and HMAC secret. SQLite is appropriate for a single host, not independent serverless instances. Set `TRUSTED_IP_HEADER` to the header your proxy overwrites; prevent direct access around that proxy. Identities are HMAC hashes, not raw IPs or usernames. Old counter buckets are removed after one day. If the database or secret is unavailable, requests fail closed.

CRM delivery runs after the database commit. Failures remain `pending` with exponential retry and a thirty second worker lease. Configure `HUB_LEAD_URL` (HTTPS), `HUB_LEAD_TOKEN` and `CRON_SECRET` in the deployment environment. Schedule authenticated `GET /api/cron/hub-delivery` every five minutes with `Authorization: Bearer <CRON_SECRET>`. Each invocation processes up to twenty due records. Without a scheduler, pending delivery is attempted again only when the same submission is retried. Delivery is at least once: the CRM must honor the stable `Idempotency-Key` lead ID to prevent duplicate CRM records after timeouts. Historical leads are not sent automatically.

`NEXT_PUBLIC_GA_MEASUREMENT_ID` requires the owner's actual GA4 property ID. It is currently absent; no property has been invented. CRM credentials are also absent. Local storage works without those integrations. Do not commit credentials or database backups.

**Status 2026-10-05: applied to production.** Neon project `red-sound-63872831` (jetour-sain), branch `production`, database `neondb`, PostgreSQL 17.11. Tested first on branch `lead-reliability-test`; a restore point `pre-lead-reliability-backup` was taken immediately before applying. Before → after: `Lead` gained `payloadJson`, `hubStatus`, `hubAttempts`, `hubNextAttemptAt`, `hubLockedUntil`; `LeadReceipt` and `RequestLimit` were created; row counts of all existing tables are unchanged (Lead 5, CarModel 8, NewsArticle 2, Promotion 4, AdminUser 0). `prisma migrate diff` against `prisma/schema.postgres.prisma` reports an empty migration. Still required in the deployment environment: `TRUSTED_IP_HEADER`, the HMAC secret, `HUB_LEAD_URL`/`HUB_LEAD_TOKEN`/`CRON_SECRET` with a 5-minute cron, and `NEXT_PUBLIC_GA_MEASUREMENT_ID`, followed by a redeploy.

### Admin login (changed 2026-10-05)

The single admin is defined by environment variables, not by the `AdminUser` table: `ADMIN_USERNAME` and `ADMIN_PASSWORD_HASH` (bcrypt). Production previously had zero `AdminUser` rows because the seed script no longer exists, so nobody could sign in. Env-based credentials remove the seed/table dependency; rotating the password means generating a hash with `npm run admin:hash` (password passed via `NEW_ADMIN_PASSWORD`) and updating one Vercel variable. Missing or malformed configuration fails closed. In local `.env` files every `$` in the hash must be written as `\$` (Next expands `$NAME`); in the Vercel dashboard paste the hash unchanged. `bcrypt.compare` runs even for an unknown username to avoid a timing oracle. The `AdminUser` model stays in the schema (unused) so that `db push` never drops the table. Covered by `tests/unit/admin-auth.test.ts`; verified end-to-end on localhost (wrong password rejected, correct password reaches `/admin`).

### Deployment checklist (Vercel)

1. Enter the values from the git-ignored `.env.vercel.local` in Vercel → Settings → Environment Variables (Production): `ADMIN_USERNAME`, `ADMIN_PASSWORD_HASH`, `TRUSTED_IP_HEADER=x-vercel-forwarded-for` (Vercel overwrites `x-forwarded-for` to prevent spoofing; `x-vercel-forwarded-for` also survives an outer proxy), `RATE_LIMIT_SECRET`. Delete the file afterwards.
2. Redeploy. The database schema is already in place.
3. CRM later: add `HUB_LEAD_URL`, `HUB_LEAD_TOKEN`, `CRON_SECRET` and a 5-minute schedule for `GET /api/cron/hub-delivery`. Vercel Hobby cron runs at most daily; use Vercel Pro cron or an external scheduler sending `Authorization: Bearer <CRON_SECRET>`.
4. GA4: `NEXT_PUBLIC_GA_MEASUREMENT_ID` with the owner's property ID, then rebuild.
5. Rotate the `neondb_owner` password (it was exposed in a terminal transcript on 2026-10-05) and update `DATABASE_URL` in Vercel at the same time.
6. After confirming production, the Neon branch `pre-lead-reliability-backup` can be deleted.

For PostgreSQL deployment, review and apply `docs/sql/lead-reliability-postgres.sql` to the existing production database, or review the additive schema difference and use the existing `npm run db:push:pg` workflow. Back up production first. Generate the PostgreSQL client using `npm run db:generate:pg`, then build with `npm run build:pg`. Do not reset the database or use `--accept-data-loss`. No production schema change or deployment was performed here.

Admin model, news and offer writes invalidate public index and detail pages, home and sitemap. Model writes also invalidate the public models API and request page. Inter is bundled locally under its SIL Open Font License, so builds no longer require Google Fonts access. Existing car specifications and content are preserved.

## Verification

- 90 tests in 14 files passed, including real SQLite transactions across two clients: eight identical concurrent submissions create one lead; twelve concurrent quota increments allow exactly five attempts.
- ESLint and TypeScript passed. The final production build generated all 49 pages and copied standalone assets.
- An isolated database and the standalone server passed health, unauthenticated admin/cron rejection, lead persistence, model-sensitive deduplication, rate limiting and Retry-After checks.
- Chrome at 390 × 844 passed form hydration and horizontal overflow checks. Mocked failed-save and duplicate responses generated no Meta/GA conversion events.
- The existing eight models, two news articles and four offers match the content export. Original lead and administrator records match the pre-change backup exactly; private records were not printed.
- PostgreSQL migration and live CRM/GA connectivity have not been run. Their deployment setup remains necessary.

OneDrive blocked cleanup of a previous `.next` build with EPERM. The generated directory was preserved as a local build backup and a clean build succeeded. Local generated backups are excluded from Git and lint; they can be removed after confirming they are no longer needed.

## Mongolian copy review

| Original | Corrected | Rule | Note |
|---|---|---|---|
| Too many requests. Please try again in one minute. | Хүсэлтийн хязгаарт хүрлээ. Түр хүлээгээд дахин оролдоно уу. | Consistent Mongolian UI | Retry-After supplies the actual wait. |
| Invalid JSON payload | Хүсэлтийн бүтэц буруу байна. | Consistent Mongolian UI | Meaning preserved. |
| DB failure previously displayed success | Хүсэлтийг хадгалж чадсангүй. Түр хүлээгээд дахин оролдоно уу. | Accurate error copy | Only failed saves use this message. |
| English validation errors | Нэрээ зөв оруулна уу. / Утасны дугаараа зөв оруулна уу. / Цахим шуудангийн хаягаа зөв оруулна уу. | Consistent Mongolian UI | Field-specific instructions. |
| Success message | Хүсэлтийг амжилттай хүлээн авлаа. | Grammar | Clarified object suffix. |

New size, empty request and general validation messages were reviewed for spelling, vowel harmony, punctuation, respectful register and mobile length. Admin field labels were reviewed as short labels without sentence punctuation. Brand names and vehicle content were not changed.
