"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";

type Model = {
  id: string;
  name: string;
  price: string | null;
  status: string;
  order: number;
  published: boolean;
};

export default function ModelsTable({ models }: { models: Model[] }) {
  const router = useRouter();
  const [busy, setBusy] = useState<string | null>(null);

  async function handleDelete(id: string) {
    if (!confirm(`"${id}" загварыг устгах уу?`)) return;
    setBusy(id);
    const res = await fetch(`/api/admin/models/${id}`, { method: "DELETE" });
    setBusy(null);
    if (res.ok) {
      router.refresh();
    } else {
      alert("Устгахад алдаа гарлаа");
    }
  }

  return (
    <div className="bg-white rounded-2xl border border-[#E7E7EA] overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-[#F5F5F6] text-[#6B7280] text-xs uppercase tracking-wide">
          <tr>
            <th className="text-left px-4 py-3">Дараалал</th>
            <th className="text-left px-4 py-3">Нэр</th>
            <th className="text-left px-4 py-3">Үнэ</th>
            <th className="text-left px-4 py-3">Статус</th>
            <th className="text-left px-4 py-3">Нийтлэгдсэн</th>
            <th className="text-right px-4 py-3">Үйлдэл</th>
          </tr>
        </thead>
        <tbody>
          {models.map((m) => (
            <tr key={m.id} className="border-t border-[#E7E7EA]">
              <td className="px-4 py-3 text-[#6B7280]">{m.order}</td>
              <td className="px-4 py-3 font-semibold text-[#17181B]">{m.name}</td>
              <td className="px-4 py-3">{m.price ?? "—"}</td>
              <td className="px-4 py-3">
                <span
                  className={`text-xs font-bold px-2 py-1 rounded-full ${
                    m.status === "available" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {m.status === "available" ? "Зарагдаж байна" : "Тун удахгүй"}
                </span>
              </td>
              <td className="px-4 py-3">{m.published ? "Тийм" : "Үгүй"}</td>
              <td className="px-4 py-3 text-right">
                <div className="inline-flex items-center gap-2">
                  <Link
                    href={`/admin/models/${m.id}`}
                    className="p-2 rounded-lg hover:bg-[#F5F5F6] text-[#17181B]"
                    title="Засах"
                  >
                    <Pencil className="w-4 h-4" />
                  </Link>
                  <button
                    onClick={() => handleDelete(m.id)}
                    disabled={busy === m.id}
                    className="p-2 rounded-lg hover:bg-red-50 text-red-600 disabled:opacity-50"
                    title="Устгах"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
          {models.length === 0 && (
            <tr>
              <td colSpan={6} className="px-4 py-8 text-center text-[#6B7280]">
                Одоогоор загвар бүртгэгдээгүй байна.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
