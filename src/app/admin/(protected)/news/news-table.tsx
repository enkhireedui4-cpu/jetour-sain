"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";

type News = { id: string; title: string; date: string; type: string; published: boolean };

export default function NewsTable({ news }: { news: News[] }) {
  const router = useRouter();
  const [busy, setBusy] = useState<string | null>(null);

  async function handleDelete(id: string, title: string) {
    if (!confirm(`"${title}" мэдээг устгах уу?`)) return;
    setBusy(id);
    const res = await fetch(`/api/admin/news/${id}`, { method: "DELETE" });
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
            <th className="text-left px-4 py-3">Огноо</th>
            <th className="text-left px-4 py-3">Төрөл</th>
            <th className="text-left px-4 py-3">Нийтлэгдсэн</th>
            <th className="text-right px-4 py-3">Үйлдэл</th>
          </tr>
        </thead>
        <tbody>
          {news.map((n) => (
            <tr key={n.id} className="border-t border-[#E7E7EA]">
              <td className="px-4 py-3 font-semibold text-[#17181B] max-w-sm truncate">{n.title}</td>
              <td className="px-4 py-3">{n.date}</td>
              <td className="px-4 py-3">{n.type}</td>
              <td className="px-4 py-3">{n.published ? "Тийм" : "Үгүй"}</td>
              <td className="px-4 py-3 text-right">
                <div className="inline-flex items-center gap-2">
                  <Link href={`/admin/news/${n.id}`} className="p-2 rounded-lg hover:bg-[#F5F5F6] text-[#17181B]">
                    <Pencil className="w-4 h-4" />
                  </Link>
                  <button
                    onClick={() => handleDelete(n.id, n.title)}
                    disabled={busy === n.id}
                    className="p-2 rounded-lg hover:bg-red-50 text-red-600 disabled:opacity-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
          {news.length === 0 && (
            <tr>
              <td colSpan={5} className="px-4 py-8 text-center text-[#666C77]">
                Одоогоор мэдээ бүртгэгдээгүй байна.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
