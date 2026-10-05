import { afterAll, beforeAll, expect, it, vi } from "vitest";
import { PrismaClient } from "@prisma/client";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { execFileSync } from "node:child_process";
import { submitLead } from "@/lib/lead-store";
import { consumeRateLimit } from "@/lib/rate-limit";

const directory = mkdtempSync(join(tmpdir(), "jetour-lead-test-"));
const url = `file:${join(directory, "test.db").replace(/\\/g, "/")}`;
const first = new PrismaClient({ datasourceUrl: url });
const second = new PrismaClient({ datasourceUrl: url });
beforeAll(() => {
  vi.stubEnv("NEXTAUTH_SECRET", "synthetic-only-secret");
  vi.stubEnv("HUB_LEAD_URL", ""); vi.stubEnv("HUB_LEAD_TOKEN", "");
  execFileSync(process.execPath, ["node_modules/prisma/build/index.js", "db", "push", "--skip-generate"], { env: { ...process.env, DATABASE_URL: url }, stdio: "pipe" });
}, 30000);
afterAll(async () => { await Promise.all([first.$disconnect(), second.$disconnect()]); rmSync(directory, { recursive: true, force: true }); vi.unstubAllEnvs(); });
const lead = { type: "test-drive" as const, name: "Synthetic applicant", phone: "99112233", model: "T2" };
it("serializes identical concurrent submissions from separate database clients", async () => {
  const now = new Date("2026-11-01T00:00:00Z");
  const responses = await Promise.all(Array.from({ length: 8 }, (_, index) => submitLead(lead, index % 2 ? first : second, now)));
  expect(new Set(responses.map(row => row.id)).size).toBe(1);
  expect(responses.filter(row => !row.duplicate)).toHaveLength(1);
  expect(await first.lead.count()).toBe(1);
});
it("accepts another model and another appointment, while normalizing Mongolian phone formatting", async () => {
  const now = new Date("2026-11-01T00:01:00Z");
  expect((await submitLead({ ...lead, phone: "+976 9911-2233" }, first, now)).duplicate).toBe(true);
  expect((await submitLead({ ...lead, model: "T1" }, first, now)).duplicate).toBe(false);
  expect((await submitLead({ ...lead, time: "14:30" }, first, now)).duplicate).toBe(false);
});
it("accepts the same request after the ten minute window", async () => {
  expect((await submitLead(lead, first, new Date("2026-11-01T00:10:00Z"))).duplicate).toBe(false);
});
it("shares the atomic request quota between independent server connections", async () => {
  const results = await Promise.all(Array.from({ length: 12 }, (_, index) => consumeRateLimit("synthetic", "192.0.2.55", 5, 60000, 61000, index % 2 ? first : second)));
  expect(results.filter(row => row.allowed)).toHaveLength(5);
  expect((await first.requestLimit.findFirstOrThrow()).count).toBe(12);
});
