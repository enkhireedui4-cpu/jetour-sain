import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getAllNews } from "@/lib/cms";
import { Navbar } from "@/components/jetour/navbar";

// ISR — 10 мин (600 сек). Next-ийн segment config нь literal байх ёстой,
// import хийсэн тогтмол ажиллахгүй тул тоог шууд бичнэ.
export const revalidate = 600;
import { Footer } from "@/components/jetour/contact";
import { PageHeader } from "@/components/jetour/page-header";
import { Calendar, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Мэдээ, сурталчилгаа — JETOUR",
  description:
    "JETOUR -ын шинэ загвар, брэндийн мэдээ, үйлчилгээний шинэчлэлт, үйл явдал — бүгд энд.",
  openGraph: {
    title: "Мэдээ, сурталчилгаа — JETOUR",
    description: "JETOUR-ын шинэ загвар, брэндийн мэдээ, үйлчилгээ.",
    type: "website",
    locale: "mn_MN",
  },
};

export default async function NewsListPage() {
  const NEWS_ARTICLES = await getAllNews();
  return (
    <div id="main-content" className="min-h-screen bg-white text-[#17181B]">
      <Navbar />

      <PageHeader
        title="Шинэ мэдээлэл"
        lead="JETOUR-ын шинэ загвар, брэндийн мэдээ, үйлчилгээний шинэчлэлт, үйл явдлууд."
      />

      {/* Articles grid */}
      <section className="section-pad">
        <div className="container-page">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {NEWS_ARTICLES.map((article) => (
              <Link
                key={article.slug}
                href={`/news/${article.slug}`}
                className="group block rounded-2xl overflow-hidden card-lift"
              >
                <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-[#F5F5F6]">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <span
                    className={`absolute top-4 left-4 eyebrow px-3 py-1.5 rounded-full text-white ${
                      article.accent === "electric" ? "bg-[#E20A17]" : "bg-[#17181B]"
                    }`}
                  >
                    {article.tag}
                  </span>
                </div>

                <div className="pt-5">
                  <p className="type-small text-[#6B7280] flex items-center gap-1.5 mb-3">
                    <Calendar className="w-3.5 h-3.5" />
                    {article.date}
                  </p>
                  <h2 className="type-h3 text-[#17181B] mb-3">{article.title}</h2>
                  <p className="text-[#54585F] leading-relaxed line-clamp-2 mb-4">
                    {article.excerpt}
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-[#E20A17] font-semibold text-sm group-hover:gap-2.5 transition-all">
                    Цааш унших
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
