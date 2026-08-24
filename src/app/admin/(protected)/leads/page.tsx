import { db } from "@/lib/db";
import LeadsTable from "./leads-table";

export default async function AdminLeadsPage() {
  const leads = await db.lead.findMany({ orderBy: { createdAt: "desc" } });
  return (
    <div>
      <h1 className="text-2xl font-extrabold text-[#17181B] mb-6">Ирсэн хүсэлтүүд (Leads)</h1>
      <LeadsTable leads={leads} />
    </div>
  );
}
