import { expect, it, vi } from "vitest";
import { NextRequest } from "next/server";
const mocks = vi.hoisted(() => ({ revalidate: vi.fn() }));
vi.mock("next/cache", () => ({ revalidatePath: mocks.revalidate }));
vi.mock("@/lib/admin-guard", () => ({ requireAdminSession: async () => ({ error: null }) }));
vi.mock("@/lib/db", () => ({ db: { carModel: {
  findUnique: async () => null, create: async () => ({ id: "synthetic" }),
} } }));
import { POST } from "@/app/api/admin/models/route";
it("invalidates public model content after a successful admin write", async () => {
  const response = await POST(new NextRequest("http://localhost/api/admin/models", {
    method: "POST", body: JSON.stringify({ id: "synthetic", detailsJson: "{}" }),
  }));
  expect(response.status).toBe(200);
  expect(mocks.revalidate).toHaveBeenCalledWith("/models");
  expect(mocks.revalidate).toHaveBeenCalledWith("/models/[id]", "page");
});
