import Link from "next/link";
import { db } from "@/lib/db";
import NewsTable from "./news-table";

export default async function AdminNewsPage() {
  const news = await db.newsArticle.findMany({ orderBy: { dateIso: "desc" } });
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-extrabold text-[#17181B]">Мэдээ</h1>
        <Link
          href="/admin/news/new"
          className="bg-[#E20A17] text-white text-sm font-bold px-4 py-2.5 rounded-lg hover:bg-[#17181B] transition-colors"
        >
          + Шинэ мэдээ
        </Link>
      </div>
      <NewsTable news={news} />
    </div>
  );
}
