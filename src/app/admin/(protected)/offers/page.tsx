import Link from "next/link";
import { db } from "@/lib/db";
import OffersTable from "./offers-table";

export default async function AdminOffersPage() {
  const offers = await db.promotion.findMany({ orderBy: { createdAt: "desc" } });
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-extrabold text-[#17181B]">Тусгай санал</h1>
        <Link
          href="/admin/offers/new"
          className="bg-[#E20A17] text-white text-sm font-bold px-4 py-2.5 rounded-lg hover:bg-[#17181B] transition-colors"
        >
          + Шинэ санал
        </Link>
      </div>
      <OffersTable offers={offers} />
    </div>
  );
}
