# Customer requests

The API returns success only after a database transaction commits. Scheduling, contact preference and financing fields are stored in the structured payload and the admin summary.

## Duplicate submissions

The receipt key compares the complete normalized submission. Identical requests within ten minutes share one lead. Another model, request type, appointment or message is a separate request. Mongolian phone formatting with and without +976 is normalized. Receipt updates and lead creation share a serializable transaction; contention is retried a limited number of times.

## Limits and validation

Database counters enforce five lead attempts per minute per client IP, twenty login attempts per fifteen minutes per IP and ten login attempts per fifteen minutes per account. Counters use fixed windows and hashed identities. Old buckets are removed after one day. Database or secret failures close access rather than bypassing the limit.

Names, phone numbers, messages and finance fields have size or value bounds. Appointment dates must be valid calendar dates in YYYY-MM-DD format; times use HH:mm in the 24-hour clock. Empty optional scheduling fields remain allowed. Validation does not confirm appointment availability.

## Admin list

The request list defaults to 25 records per page. The API caps page size at 100, validates query parameters and supports status and text filters. Results use createdAt and id for stable ordering. Only fields needed by the table are returned.

## CRM delivery

Configured CRM submissions become pending after storage. Delivery uses an atomic thirty second worker lease and an eight second network timeout. Failures stay pending with exponential retry, capped at one hour. The receiver must honor the stable lead ID in Idempotency-Key because delivery is at least once.

The authenticated retry endpoint processes up to twenty due leads per invocation. The GitHub Actions retry workflow requires HUB_RETRY_URL and CRON_SECRET. Historical leads with delivery disabled are not sent automatically. See [deployment](deployment.md).

## Database maintenance

The additive PostgreSQL update is in docs/sql/lead-reliability-postgres.sql. It adds receipt and counter tables plus delivery fields without deleting existing lead records. Apply schema changes separately from builds and check the actual target database before running an update.

Admin credentials come from ADMIN_USERNAME and ADMIN_PASSWORD_HASH. The legacy AdminUser table remains in the schema to avoid an accidental drop during schema synchronization.
