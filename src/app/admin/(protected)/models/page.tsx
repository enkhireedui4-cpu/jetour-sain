import Link from "next/link";
import { db } from "@/lib/db";
import ModelsTable from "./models-table";

export default async function AdminModelsPage() {
  const models = await db.carModel.findMany({ orderBy: { order: "asc" } });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-extrabold text-[#17181B]">Загвар & Үнэ</h1>
        <Link
          href="/admin/models/new"
          className="bg-[#E20A17] text-white text-sm font-bold px-4 py-2.5 rounded-lg hover:bg-[#17181B] transition-colors"
        >
          + Шинэ загвар
        </Link>
      </div>
      <ModelsTable models={models} />
    </div>
  );
}
