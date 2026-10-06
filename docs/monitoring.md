# Monitoring

GET /api/health is uncached and checks database connectivity. A healthy process returns HTTP 200; a failed database check returns 503. The response contains status and timing fields, not credentials or customer data.

Configure an HTTPS uptime monitor against the deployed endpoint. Review failed deployments and repeated database failures in the hosting dashboard. Do not paste database exception messages into public issues.

CRM delivery should be monitored separately. Review pending lead counts and recent attempts in an authorized database console. GitHub Actions reports failures in the retry workflow, but a successful invocation does not guarantee that every pending request reached the CRM.

After a deployment, verify public content, admin sign-in and database health. Send test requests only to an isolated environment.
