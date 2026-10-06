import { beforeEach, expect, it, vi } from "vitest";
import { NextRequest } from "next/server";
const mocks = vi.hoisted(() => ({ count: vi.fn(), find: vi.fn(), guard: vi.fn() }));
vi.mock("@/lib/db", () => ({ db: { lead: { count: mocks.count, findMany: mocks.find } } }));
vi.mock("@/lib/admin-guard", () => ({ requireAdminSession: mocks.guard }));
import { GET } from "@/app/api/admin/leads/route";
beforeEach(() => {
  vi.clearAllMocks(); mocks.guard.mockResolvedValue({ error: null });
  mocks.count.mockResolvedValue(73); mocks.find.mockResolvedValue([]);
});
it("limits the database query and applies stable pagination and filters", async () => {
  const response = await GET(new NextRequest("http://localhost/api/admin/leads?page=2&pageSize=25&status=new&q=T2"));
  expect(response.status).toBe(200);
  expect(mocks.find).toHaveBeenCalledWith(expect.objectContaining({ take: 25, skip: 25,
    orderBy: [{ createdAt: "desc" }, { id: "desc" }],
    where: expect.objectContaining({ status: "new", OR: expect.any(Array) }) }));
  expect(await response.json()).toMatchObject({ pagination: { page: 2, pageSize: 25, total: 73, totalPages: 3 } });
});
it.each(["page=0", "page=abc", "pageSize=10000", "status=invalid"])("rejects invalid query %s before querying the database", async query => {
  expect((await GET(new NextRequest(`http://localhost/api/admin/leads?${query}`))).status).toBe(400);
  expect(mocks.find).not.toHaveBeenCalled();
});
it("does not query private records before authentication", async () => {
  mocks.guard.mockResolvedValue({ error: new Response(null, { status: 401 }) });
  expect((await GET(new NextRequest("http://localhost/api/admin/leads"))).status).toBe(401);
  expect(mocks.find).not.toHaveBeenCalled();
});
it("supports the all-status form value without dropping the search", async () => {
  const response = await GET(new NextRequest("http://localhost/api/admin/leads?status=&q=T2"));
  expect(response.status).toBe(200);
  expect(mocks.find.mock.calls[0][0].where).toMatchObject({ OR: expect.any(Array) });
});
