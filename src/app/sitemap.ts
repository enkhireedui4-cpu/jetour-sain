import type { MetadataRoute } from "next";
import { getAllNews, getAllCarModels, getAllPromotions } from "@/lib/cms";

// Layout-тай ижил домэйн ашиглана (NEXT_PUBLIC_SITE_URL → fallback jetour.mn)
const baseUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://jetour.mn").replace(/\/$/, "");

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const [news, models, offers] = await Promise.all([
    getAllNews(),
    getAllCarModels(),
    getAllPromotions(),
  ]);

  // Статик хуудаснууд
  const staticPages: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/`, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${baseUrl}/models`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/special-offers`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    // Нэгдсэн лийд маягт — сайтын гол хөрвөлтийн хуудас (/test-drive-ыг сольсон)
    { url: `${baseUrl}/info-request`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/owners`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/brand`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/dealer`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/news`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${baseUrl}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    { url: `${baseUrl}/terms`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
  ];

  // Загварын хуудаснууд
  const modelPages: MetadataRoute.Sitemap = models
    .filter((m) => m.status === "available")
    .map((m) => ({
      url: `${baseUrl}/models/${m.id}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    }));

  // Тусгай саналын хуудаснууд
  const offerPages: MetadataRoute.Sitemap = offers.map((o) => ({
    url: `${baseUrl}/special-offers/${o.id}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.5,
  }));

  // Мэдээний хуудаснууд
  const newsPages: MetadataRoute.Sitemap = news.map((a) => ({
    url: `${baseUrl}/news/${a.slug}`,
    lastModified: new Date(a.dateIso),
    changeFrequency: "yearly" as const,
    priority: 0.6,
  }));

  return [...staticPages, ...modelPages, ...offerPages, ...newsPages];
}
