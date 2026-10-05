import { beforeEach, describe, expect, it, vi } from "vitest";
import { NextRequest } from "next/server";

const mocks = vi.hoisted(() => ({
  create: vi.fn(),
  rate: vi.fn(),
  receipt: vi.fn(),
  updateReceipt: vi.fn(),
}));
vi.mock("@/lib/db", () => {
  const tx = {
    lead: { create: mocks.create },
    requestLimit: { upsert: mocks.rate, deleteMany: vi.fn().mockResolvedValue({ count: 0 }) },
    leadReceipt: { upsert: mocks.receipt, update: mocks.updateReceipt },
  };
  return { db: { ...tx, $transaction: (fn: (tx: unknown) => unknown) => fn(tx) } };
});
vi.mock("next/server", async (original) => ({ ...await original<object>(), after: vi.fn() }));
import { POST } from "@/app/api/lead/route";

const payload = { type: "test-drive", name: "Synthetic Test", phone: "99112233", model: "T2" };
function request(extra = {}) {
  return new NextRequest("http://localhost/api/lead", {
    method: "POST", body: JSON.stringify({ ...payload, ...extra }),
    headers: { "content-type": "application/json", "x-forwarded-for": "192.0.2.123" },
  });
}
beforeEach(() => {
  vi.clearAllMocks();
  vi.stubEnv("HUB_LEAD_URL", "");
  vi.stubEnv("HUB_LEAD_TOKEN", "");
  vi.stubEnv("NEXTAUTH_SECRET", "test-secret-only");
  vi.spyOn(console, "log").mockImplementation(() => {});
  vi.spyOn(console, "error").mockImplementation(() => {});
  mocks.rate.mockResolvedValue({ count: 1 });
  mocks.receipt.mockResolvedValue({ leadId: null, submittedAt: null });
  mocks.create.mockResolvedValue({ id: "test-lead", hubStatus: "disabled" });
});
describe("lead submission regressions", () => {
  it("never reports success when the database write fails", async () => {
    mocks.create.mockRejectedValueOnce(new Error("synthetic storage failure"));
    const response = await POST(request());
    expect(response.status).toBe(503);
    expect(await response.json()).toMatchObject({ ok: false });
  });
  it("persists scheduling, contact preference and every finance field", async () => {
    const details = { date: "2026-11-05", time: "14:30", contactMethod: "whatsapp", vehiclePrice: 100000000,
      downPayment: 30000000, termMonths: 36, interestRate: 12, monthlyPayment: 2300000 };
    expect((await POST(request(details))).status).toBe(200);
    const stored = mocks.create.mock.calls[0][0].data;
    expect(JSON.parse(stored.payloadJson)).toMatchObject(details);
    expect(stored.message).toContain("14:30");
  });
  it("does not log the applicant's name or phone", async () => {
    await POST(request());
    const logs = vi.mocked(console.log).mock.calls.flat().join(" ");
    expect(logs).not.toContain(payload.name);
    expect(logs).not.toContain(payload.phone);
  });
});
