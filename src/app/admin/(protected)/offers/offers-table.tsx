"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";

type Offer = { id: string; title: string; modelName: string; date: string; published: boolean };

export default function OffersTable({ offers }: { offers: Offer[] }) {
  const router = useRouter();
  const [busy, setBusy] = useState<string | null>(null);

  async function handleDelete(id: string, title: string) {
    if (!confirm(`"${title}" саналыг устгах уу?`)) return;
    setBusy(id);
    const res = await fetch(`/api/admin/offers/${id}`, { method: "DELETE" });
    setBusy(null);
    if (res.ok) router.refresh();
    else alert("Устгахад алдаа гарлаа");
  }

  return (
    <div className="bg-white rounded-2xl border border-[#E7E7EA] overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-[#F5F5F6] text-[#666C77] text-xs uppercase tracking-wide">
          <tr>
            <th className="text-left px-4 py-3">Гарчиг</th>
            <th className="text-left px-4 py-3">Загвар</th>
            <th className="text-left px-4 py-3">Огноо</th>
            <th className="text-left px-4 py-3">Нийтлэгдсэн</th>
            <th className="text-right px-4 py-3">Үйлдэл</th>
          </tr>
        </thead>
        <tbody>
          {offers.map((o) => (
            <tr key={o.id} className="border-t border-[#E7E7EA]">
              <td className="px-4 py-3 font-semibold text-[#17181B] max-w-sm truncate">{o.title}</td>
              <td className="px-4 py-3">{o.modelName}</td>
              <td className="px-4 py-3">{o.date}</td>
              <td className="px-4 py-3">{o.published ? "Тийм" : "Үгүй"}</td>
              <td className="px-4 py-3 text-right">
                <div className="inline-flex items-center gap-2">
                  <Link href={`/admin/offers/${o.id}`} className="p-2 rounded-lg hover:bg-[#F5F5F6] text-[#17181B]">
                    <Pencil className="w-4 h-4" />
                  </Link>
                  <button
                    onClick={() => handleDelete(o.id, o.title)}
                    disabled={busy === o.id}
                    className="p-2 rounded-lg hover:bg-red-50 text-red-600 disabled:opacity-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
          {offers.length === 0 && (
            <tr>
              <td colSpan={5} className="px-4 py-8 text-center text-[#666C77]">
                Одоогоор санал бүртгэгдээгүй байна.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
