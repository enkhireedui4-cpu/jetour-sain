import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import NewsForm from "../news-form";

export default async function EditNewsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const article = await db.newsArticle.findUnique({ where: { id } });
  if (!article) notFound();

  return (
    <div>
      <h1 className="text-2xl font-extrabold text-[#17181B] mb-6">Мэдээ засах</h1>
      <NewsForm initial={article} />
    </div>
  );
}
