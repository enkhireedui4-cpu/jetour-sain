-- Additive schema update. Review against the target database and back it up first.
BEGIN;
ALTER TABLE "Lead" ADD COLUMN IF NOT EXISTS "payloadJson" TEXT NOT NULL DEFAULT '{}';
ALTER TABLE "Lead" ADD COLUMN IF NOT EXISTS "hubStatus" TEXT NOT NULL DEFAULT 'disabled';
ALTER TABLE "Lead" ADD COLUMN IF NOT EXISTS "hubAttempts" INTEGER NOT NULL DEFAULT 0;
ALTER TABLE "Lead" ADD COLUMN IF NOT EXISTS "hubNextAttemptAt" TIMESTAMP(3);
ALTER TABLE "Lead" ADD COLUMN IF NOT EXISTS "hubLockedUntil" TIMESTAMP(3);
CREATE INDEX IF NOT EXISTS "Lead_hubStatus_hubNextAttemptAt_idx" ON "Lead"("hubStatus", "hubNextAttemptAt");
CREATE TABLE IF NOT EXISTS "RequestLimit" (
  "key" TEXT PRIMARY KEY,
  "count" INTEGER NOT NULL DEFAULT 0,
  "expiresAt" TIMESTAMP(3) NOT NULL
);
CREATE INDEX IF NOT EXISTS "RequestLimit_expiresAt_idx" ON "RequestLimit"("expiresAt");
CREATE TABLE IF NOT EXISTS "LeadReceipt" (
  "fingerprint" TEXT PRIMARY KEY,
  "leadId" TEXT,
  "submittedAt" TIMESTAMP(3),
  "touchedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS "LeadReceipt_touchedAt_idx" ON "LeadReceipt"("touchedAt");
COMMIT;
