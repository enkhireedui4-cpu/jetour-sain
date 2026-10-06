# JETOUR Mongolia

Automotive website for Sain Motors. Visitors can explore vehicle models, request information or a test drive, and find showroom and service details. The admin area manages models, news, offers and customer requests.

## Stack

Next.js 16, React 19, TypeScript, Tailwind CSS 4, Prisma and NextAuth. Local development uses SQLite; production uses PostgreSQL. Inter is bundled locally.

## Local development

Requires Node.js 22 or later and npm.

```sh
npm ci
cp .env.example .env
# Set NEXTAUTH_SECRET and local admin credentials in .env.
npm run db:generate
npm run db:push
npm run db:import
npm run dev
```

On PowerShell, use `Copy-Item .env.example .env`. Admin access requires `ADMIN_USERNAME` and `ADMIN_PASSWORD_HASH`. Generate a bcrypt hash with `npm run admin:hash`; see [deployment](docs/deployment.md) for handling local environment files.

`db:import` imports public content from `db/content.json`. It does not import customer requests or admin credentials. Use it to initialize a new local database; do not run it as part of a production build because it can overwrite content edited in the admin area.

## Checks

```sh
npm run lint
npm run typecheck
npm test
npm run build
```

GitHub Actions runs these checks against an isolated database on pushes to `main` and pull requests. Tests cover input validation, pagination, authentication, cache invalidation, concurrent submissions and CRM delivery.

## Project structure

| Path | Purpose |
|---|---|
| `src/app` | Public pages, admin pages and API routes |
| `src/components` | Shared UI and vehicle components |
| `src/lib` | Content access, validation, authentication and request handling |
| `prisma/schema.prisma` | Shared data models; PostgreSQL schema is generated from this file |
| `db/content.json` | Public content export |
| `tests/unit` | Unit and database integration tests |
| `docs` | Deployment, integrations and maintenance |

Requests are committed before a success response is returned. Identical submissions are deduplicated for ten minutes; a different model or appointment remains a separate request. CRM delivery uses a persistent queue, and the admin request list supports search, status filters and pagination.

## Deployment

See [deployment](docs/deployment.md), [request handling](docs/lead-reliability.md) and [security](SECURITY.md). CI does not connect to production. Database migrations and integration credentials are managed separately from application builds.
