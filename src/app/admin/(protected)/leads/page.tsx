import Link from "next/link";
import { getLeadPage, leadQuerySchema } from "@/lib/lead-pagination";
import LeadsTable from "./leads-table";

export default async function AdminLeadsPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const parsed = leadQuerySchema.safeParse(await searchParams);
  const { leads, pagination, query } = await getLeadPage(parsed.success ? parsed.data : {});
  function pageHref(page: number) {
    const params = new URLSearchParams({ page: String(page), pageSize: String(query.pageSize) });
    if (query.status) params.set("status", query.status);
    if (query.q) params.set("q", query.q);
    return `/admin/leads?${params}`;
  }
  return (
    <div>
      <h1 className="text-2xl font-extrabold text-[#17181B] mb-6">Ирсэн хүсэлтүүд</h1>
      {!parsed.success && <p role="alert" className="mb-4 text-red-700">Хайлтын нөхцөл буруу байна. Эхний хуудсыг харуулж байна.</p>}
      <form action="/admin/leads" className="mb-4 flex flex-wrap items-end gap-3">
        <label className="grid gap-1 text-sm">Хайх
          <input name="q" defaultValue={query.q || ""} maxLength={100} placeholder="Нэр, утас, загвар" className="border rounded-lg px-3 py-2" />
        </label>
        <label className="grid gap-1 text-sm">Төлөв
          <select name="status" defaultValue={query.status || ""} className="border rounded-lg px-3 py-2">
            <option value="">Бүгд</option><option value="new">Шинэ</option><option value="contacted">Холбогдсон</option><option value="closed">Хаагдсан</option>
          </select>
        </label>
        <button type="submit" className="rounded-lg bg-[#17181B] px-4 py-2 text-white">Хайх</button>
        <Link href="/admin/leads" className="px-3 py-2 text-sm underline">Цэвэрлэх</Link>
      </form>
      <LeadsTable leads={leads} />
      <nav aria-label="Хүсэлтийн хуудсууд" className="mt-4 flex flex-wrap items-center gap-4 text-sm">
        <span>Нийт {pagination.total} хүсэлт · {pagination.page}/{pagination.totalPages} хуудас</span>
        {pagination.page > 1 && <Link href={pageHref(pagination.page - 1)} className="underline">Өмнөх</Link>}
        {pagination.page < pagination.totalPages && <Link href={pageHref(pagination.page + 1)} className="underline">Дараах</Link>}
      </nav>
    </div>
  );
}
