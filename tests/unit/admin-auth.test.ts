// Админ нэвтрэлт — орчны хувьсагчаар (ADMIN_USERNAME + ADMIN_PASSWORD_HASH).
// Өгөгдлийн сангийн AdminUser хүснэгтэд ХАМААРАХГҮЙ: seed хийгээгүй production
// дээр ч нэвтрэлт ажиллана, тохиргоо дутуу бол хаалттай (fail closed).
import bcrypt from "bcryptjs";
import { beforeEach, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({ rate: vi.fn() }));
vi.mock("@/lib/db", () => ({ db: {
  requestLimit: { upsert: mocks.rate, deleteMany: vi.fn().mockResolvedValue({ count: 0 }) },
} }));
import { authOptions } from "@/lib/auth";

const HASH = bcrypt.hashSync("correct horse battery", 4);
const authorize = (username: string, password: string) => {
  const provider = authOptions.providers[0] as any;
  const fn = provider.options?.authorize || provider.authorize;
  return fn({ username, password }, { headers: { "x-forwarded-for": "192.0.2.10" } });
};

beforeEach(() => {
  vi.unstubAllEnvs();
  vi.stubEnv("NEXTAUTH_SECRET", "test-secret-only");
  vi.stubEnv("ADMIN_USERNAME", "admin");
  vi.stubEnv("ADMIN_PASSWORD_HASH", HASH);
  mocks.rate.mockResolvedValue({ count: 1 });
});

it("accepts the configured username and password", async () => {
  expect(await authorize("admin", "correct horse battery")).toEqual({ id: "admin", name: "admin" });
});

it("rejects a wrong password", async () => {
  expect(await authorize("admin", "wrong")).toBeNull();
});

it("rejects an unknown username", async () => {
  expect(await authorize("root", "correct horse battery")).toBeNull();
});

it("fails closed when the admin is not configured", async () => {
  vi.stubEnv("ADMIN_PASSWORD_HASH", "");
  expect(await authorize("admin", "correct horse battery")).toBeNull();
});

it("rejects a plaintext value mistakenly placed in ADMIN_PASSWORD_HASH", async () => {
  vi.stubEnv("ADMIN_PASSWORD_HASH", "correct horse battery");
  expect(await authorize("admin", "correct horse battery")).toBeNull();
});
