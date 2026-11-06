# Security

Keep database URLs, authentication secrets, bcrypt hashes and CRM tokens in the hosting environment or untracked local environment files. Never include them in issues, screenshots, commits or build logs.

Use a dedicated database for local tests. Customer request records and SQLite backups must not be committed. `db/content.json` contains public content only.

If a credential is exposed, rotate it with the provider and update all environments that use it. Redeploy and verify database health and authentication before retiring the previous credential. Deleting a file or editing documentation does not revoke a credential.

Security issues should be reported privately to the repository owner. Include reproduction steps without credentials or customer data.
