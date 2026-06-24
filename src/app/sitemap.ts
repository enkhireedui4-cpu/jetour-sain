import type { MetadataRoute } from "next";
import { NEWS_ARTICLES, ALL_MODELS_FOR_GRID } from "@/lib/jetour-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://jetour-mongolia.mn";
  const now = new Date();

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/`, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${baseUrl}/financing`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/news`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${baseUrl}/owners`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
  ];

  // Model pages
  const modelPages: MetadataRoute.Sitemap = ALL_MODELS_FOR_GRID.map((m) => ({
    url: `${baseUrl}/models/${m.id}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }));

  // News article pages
  const newsPages: MetadataRoute.Sitemap = NEWS_ARTICLES.map((a) => ({
    url: `${baseUrl}/news/${a.slug}`,
    lastModified: new Date(a.dateIso),
    changeFrequency: "yearly" as const,
    priority: 0.6,
  }));

  return [...staticPages, ...modelPages, ...newsPages];
}
