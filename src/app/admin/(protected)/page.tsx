import Link from "next/link";
import { db } from "@/lib/db";
import { Car, Newspaper, Tag, MessageSquare } from "lucide-react";

export default async function AdminDashboardPage() {
  const [models, news, offers, leads, newLeads] = await Promise.all([
    db.carModel.count(),
    db.newsArticle.count(),
    db.promotion.count(),
    db.lead.count(),
    db.lead.count({ where: { status: "new" } }),
  ]);

  const cards = [
    { label: "Загвар", value: models, href: "/admin/models", icon: Car },
    { label: "Мэдээ", value: news, href: "/admin/news", icon: Newspaper },
    { label: "Тусгай санал", value: offers, href: "/admin/offers", icon: Tag },
    { label: "Хүсэлт (шинэ)", value: `${newLeads} / ${leads}`, href: "/admin/leads", icon: MessageSquare },
  ];

  return (
    <div>
      <h1 className="text-2xl font-extrabold text-[#17181B] mb-6">Хянах самбар</h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((c) => {
          const Icon = c.icon;
          return (
            <Link
              key={c.href}
              href={c.href}
              className="bg-white rounded-2xl border border-[#E7E7EA] p-6 hover:shadow-md hover:border-[#E20A17] transition-all"
            >
              <Icon className="w-6 h-6 text-[#E20A17] mb-3" />
              <p className="text-3xl font-extrabold text-[#17181B]">{c.value}</p>
              <p className="text-sm text-[#666C77] mt-1">{c.label}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
