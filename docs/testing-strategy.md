# Testing

Run npm run lint, npm run typecheck and npm test before a release. npm run build verifies production compilation and page generation. GitHub Actions runs the same checks with public content imported into an isolated SQLite database.

Tests cover validation, pagination, credentials, cache invalidation, CRM retry state, and shared request limits. Database integration tests create disposable databases and exercise concurrent submissions through independent clients. Test runs must not use production customer records or send real CRM requests.

For a visible UI change, check desktop and narrow mobile viewports, keyboard navigation and reduced motion. Verify loading, empty, success and error states. Test request submissions in an isolated environment and intercept analytics when using a production-like page.

PostgreSQL behavior and deployment integrations should also be checked against a disposable PostgreSQL branch before schema changes. A passing local SQLite test does not establish the state of a production database.
