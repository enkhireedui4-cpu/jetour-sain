# Deployment

## Environment

Set `DATABASE_URL`, `NEXTAUTH_SECRET`, `NEXTAUTH_URL`, `ADMIN_USERNAME` and `ADMIN_PASSWORD_HASH` in the hosting environment. Use a long random authentication secret and a bcrypt password hash. `npm run admin:hash` reads a password from `NEW_ADMIN_PASSWORD` and writes its hash; remove that temporary variable afterwards.

Next.js expands dollar signs in local `.env` values. Escape each dollar sign in a bcrypt hash as `\$` in local files. In the hosting dashboard, enter the hash unchanged. Never commit the resulting file.

Set `TRUSTED_IP_HEADER` to a header overwritten by the hosting proxy and keep the application behind that proxy. `RATE_LIMIT_SECRET` can provide a dedicated HMAC secret; otherwise `NEXTAUTH_SECRET` is used. All application instances must share the same database and secret.

## PostgreSQL

`scripts/prisma-pg.mjs` generates the PostgreSQL schema from `prisma/schema.prisma`. Supply `DATABASE_URL` through the process environment; supply `DIRECT_URL` when a direct connection is required for schema changes.

```sh
npm run db:generate:pg
npm run db:verify
npm run build:pg
```

Review schema differences and back up the target database before applying changes. `docs/sql/lead-reliability-postgres.sql` is the additive request-storage update. Check whether it has already been applied. Do not reset a production database or accept unreviewed data loss.

Initialize public content explicitly on a new database. Production builds do not import content or apply schema changes. After returning to SQLite development, regenerate the local client with `npm run db:generate`.

## Integrations

- CRM: set `HUB_LEAD_URL` to an HTTPS endpoint and `HUB_LEAD_TOKEN` to its token. The receiver must honor the lead ID in `Idempotency-Key`.
- Retry: set `CRON_SECRET` in the hosting environment. Add repository Actions secrets `CRON_SECRET` (the same value) and `HUB_RETRY_URL` (the deployed `/api/cron/hub-delivery` URL). The retry workflow runs every five minutes and is inactive until both secrets exist. GitHub schedules can be delayed, so this is an eventual retry service rather than a precise timer. Do not configure a second scheduler unnecessarily.
- GA4: set `NEXT_PUBLIC_GA_MEASUREMENT_ID` to the owner's actual property ID and rebuild. No form names, phone numbers or email addresses should be sent to analytics.

## Release check

Run lint, typecheck, tests and build. Check `/api/health`, admin authentication and public content after deployment. Use an isolated environment for test submissions. Review pending CRM deliveries separately from successful local storage.
