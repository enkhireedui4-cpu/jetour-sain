import { beforeEach, expect, it, vi } from "vitest";
const mocks = vi.hoisted(() => ({ upsert: vi.fn(), cleanup: vi.fn() }));
vi.mock("@/lib/db", () => ({ db: { requestLimit: { upsert: mocks.upsert, deleteMany: mocks.cleanup } } }));
import { consumeRateLimit } from "@/lib/rate-limit";
beforeEach(() => { vi.clearAllMocks(); vi.stubEnv("NEXTAUTH_SECRET", "synthetic-only"); });
it("uses a shared atomic counter, hashes identity and returns remaining retry seconds", async () => {
  mocks.upsert.mockResolvedValue({ count: 6 });
  expect(await consumeRateLimit("lead", "192.0.2.123", 5, 60000, 61000)).toEqual({ allowed: false, retryAfter: 59 });
  const query = mocks.upsert.mock.calls[0][0];
  expect(query.where.key).not.toContain("192.0.2.123");
  expect(query.update).toEqual({ count: { increment: 1 } });
});
it("uses a new bucket when the fixed window ends", async () => {
  mocks.upsert.mockResolvedValue({ count: 1 });
  await consumeRateLimit("lead", "same", 5, 60000, 59999);
  await consumeRateLimit("lead", "same", 5, 60000, 60000);
  expect(mocks.upsert.mock.calls[0][0].where.key).not.toBe(mocks.upsert.mock.calls[1][0].where.key);
});
