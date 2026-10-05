import { beforeEach, expect, it, vi } from "vitest";
const mocks = vi.hoisted(() => ({ claim: vi.fn(), find: vi.fn(), update: vi.fn() }));
vi.mock("@/lib/db", () => ({ db: { lead: { updateMany: mocks.claim, findUniqueOrThrow: mocks.find, update: mocks.update } } }));
import { deliverHubLead } from "@/lib/hub-delivery";
beforeEach(() => {
  vi.clearAllMocks();
  vi.stubEnv("HUB_LEAD_URL", "https://crm.example.test/leads"); vi.stubEnv("HUB_LEAD_TOKEN", "synthetic-token");
  mocks.claim.mockResolvedValue({ count: 1 });
  mocks.find.mockResolvedValue({ id: "synthetic-lead", payloadJson: JSON.stringify({ name: "Synthetic", date: "2026-11-05", time: "14:30" }), createdAt: new Date("2026-11-01T00:00:00Z"), hubAttempts: 1 });
});
it("retains failed deliveries for retry and does not read sensitive response bodies", async () => {
  const text = vi.fn();
  vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: false, status: 500, text }));
  await deliverHubLead("synthetic-lead");
  expect(mocks.update).toHaveBeenCalledWith(expect.objectContaining({ data: expect.objectContaining({ hubStatus: "pending", hubLockedUntil: null, hubNextAttemptAt: expect.any(Date) }) }));
  expect(text).not.toHaveBeenCalled();
});
it("sends saved scheduling fields with a stable idempotency key", async () => {
  const fetch = vi.fn().mockResolvedValue({ ok: true }); vi.stubGlobal("fetch", fetch);
  await deliverHubLead("synthetic-lead");
  const options = fetch.mock.calls[0][1];
  expect(options.headers["Idempotency-Key"]).toBe("synthetic-lead");
  expect(JSON.parse(options.body)).toMatchObject({ date: "2026-11-05", time: "14:30" });
  expect(mocks.update).toHaveBeenCalledWith(expect.objectContaining({ data: expect.objectContaining({ hubStatus: "delivered", hubNextAttemptAt: null }) }));
});
it("does not send when another worker owns the delivery lease", async () => {
  mocks.claim.mockResolvedValue({ count: 0 }); const fetch = vi.fn(); vi.stubGlobal("fetch", fetch);
  await deliverHubLead("synthetic-lead"); expect(fetch).not.toHaveBeenCalled();
});
