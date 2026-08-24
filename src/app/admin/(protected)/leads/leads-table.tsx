"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type Lead = {
  id: string;
  name: string | null;
  phone: string | null;
  email: string | null;
  modelId: string | null;
  modelName: string | null;
  message: string | null;
  source: string | null;
  status: string;
  createdAt: string | Date;
};

export default function LeadsTable({ leads }: { leads: Lead[] }) {
  const router = useRouter();
  const [busy, setBusy] = useState<string | null>(null);

  async function handleStatusChange(id: string, status: string) {
    setBusy(id);
    const res = await fetch(`/api/admin/leads/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    setBusy(null);
    if (res.ok) router.refresh();
    else alert("Шинэчлэхэд алдаа гарлаа");
  }

  return (
    <div className="bg-white rounded-2xl border border-[#E7E7EA] overflow-hidden overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="bg-[#F5F5F6] text-[#6B7280] text-xs uppercase tracking-wide">
          <tr>
            <th className="text-left px-4 py-3">Огноо</th>
            <th className="text-left px-4 py-3">Нэр</th>
            <th className="text-left px-4 py-3">Утас</th>
            <th className="text-left px-4 py-3">Загвар</th>
            <th className="text-left px-4 py-3">Мессеж</th>
            <th className="text-left px-4 py-3">Статус</th>
          </tr>
        </thead>
        <tbody>
          {leads.map((l) => (
            <tr key={l.id} className="border-t border-[#E7E7EA] align-top">
              <td className="px-4 py-3 whitespace-nowrap text-[#6B7280]">
                {new Date(l.createdAt).toLocaleString("mn-MN")}
              </td>
              <td className="px-4 py-3 font-semibold text-[#17181B]">{l.name ?? "—"}</td>
              <td className="px-4 py-3 whitespace-nowrap">{l.phone ?? "—"}</td>
              <td className="px-4 py-3">{l.modelName ?? l.modelId ?? "—"}</td>
              <td className="px-4 py-3 max-w-xs">{l.message ?? "—"}</td>
              <td className="px-4 py-3">
                <select
                  value={l.status}
                  disabled={busy === l.id}
                  onChange={(e) => handleStatusChange(l.id, e.target.value)}
                  className="border border-[#E7E7EA] rounded-lg px-2 py-1.5 text-xs font-semibold"
                >
                  <option value="new">Шинэ</option>
                  <option value="contacted">Холбогдсон</option>
                  <option value="closed">Хаагдсан</option>
                </select>
              </td>
            </tr>
          ))}
          {leads.length === 0 && (
            <tr>
              <td colSpan={6} className="px-4 py-8 text-center text-[#6B7280]">
                Одоогоор хүсэлт ирээгүй байна.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
