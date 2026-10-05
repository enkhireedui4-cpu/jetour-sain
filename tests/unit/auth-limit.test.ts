import { beforeEach, expect, it, vi } from "vitest";
const mocks = vi.hoisted(() => ({ rate: vi.fn(), compare: vi.fn() }));
vi.mock("@/lib/db", () => ({ db: {
  requestLimit: { upsert: mocks.rate, deleteMany: vi.fn().mockResolvedValue({ count: 0 }) },
} }));
vi.mock("bcryptjs", () => ({ default: { compare: mocks.compare } }));
import { authOptions } from "@/lib/auth";
beforeEach(() => {
  vi.clearAllMocks();
  vi.stubEnv("NEXTAUTH_SECRET", "test-secret-only");
  vi.stubEnv("ADMIN_USERNAME", "admin");
  vi.stubEnv("ADMIN_PASSWORD_HASH", "$2b$10$" + "x".repeat(53));
  mocks.compare.mockResolvedValue(true);
});
it("blocks credentials when shared login quota is exceeded", async () => {
  mocks.rate.mockResolvedValue({ count: 100 });
  const provider = authOptions.providers[0] as any;
  const authorize = provider.options?.authorize || provider.authorize;
  expect(await authorize({ username: "admin", password: "test-only" }, { headers: { "x-forwarded-for": "192.0.2.1" } })).toBeNull();
  // Хязгаар хэтэрсэн үед нууц үгийг шалгах ч үгүй (bcrypt ажиллахгүй)
  expect(mocks.compare).not.toHaveBeenCalled();
});
