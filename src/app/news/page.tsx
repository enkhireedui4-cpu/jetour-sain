import type { Metadata } from "next";
import Link from "next/link";
import { NEWS_ARTICLES } from "@/lib/jetour-data";
import { Navbar } from "@/components/jetour/navbar";
import { Calendar, Tag, ArrowRight, ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Мэдээ, сурталчилгаа — JETOUR Mongolia",
  description:
    "JETOUR Mongolia-ын шинэ загвар, брэндийн мэдээ, үйлчилгээний шинэчлэлт, үйл явдал — бүгд энд.",
  openGraph: {
    title: "Мэдээ, сурталчилгаа — JETOUR Mongolia",
    description: "JETOUR Mongolia-ын шинэ загвар, брэндийн мэдээ, үйлчилгээ.",
    type: "website",
    locale: "mn_MN",
  },
};

export default function NewsListPage() {
  return (
    <div className="min-h-screen bg-white text-[#17181B]">
      <Navbar />
      <div className="h-16" />

      {/* Hero */}
      <section className="relative py-20 lg:py-28 bg-[#17181B] overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(50% 60% at 50% 0%, rgba(226,35,26,0.15), transparent 70%)",
          }}
        />
        <div className="relative mx-auto w-[min(1280px,94vw)]">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-white/60 hover:text-[#E20A17] transition-colors text-sm font-display font-bold tracking-wider mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            НҮҮР
          </Link>
          <p className="eyebrow text-[#E20A17] mb-3">Мэдээ · Сурталчилгаа</p>
          <h1 className="font-display font-extrabold italic leading-[0.95] text-white text-5xl lg:text-7xl">
            Шинэ <span className="text-gradient-electric">мэдээлэл</span>
          </h1>
        </div>
      </section>

      {/* Articles grid */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="mx-auto w-[min(1280px,94vw)]">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {NEWS_ARTICLES.map((article) => (
              <Link
                key={article.slug}
                href={`/news/${article.slug}`}
                className="group block bg-white rounded-2xl overflow-hidden border border-[#E7E7EA] card-lift"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-[#F5F5F6]">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-[1.2s] group-hover:scale-110"
                    loading="lazy"
                  />
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: "linear-gradient(180deg, transparent 50%, rgba(0,0,0,0.5) 100%)",
                    }}
                  />
                  <div className="absolute top-4 left-4">
                    <span
                      className={`font-display text-[0.6rem] font-bold tracking-[0.18em] uppercase px-3 py-1.5 rounded-full text-white ${
                        article.accent === "electric" ? "bg-[#E20A17]" : "bg-[#17181B]"
                      }`}
                    >
                      {article.tag}
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 flex items-center gap-2 text-white text-xs">
                    <Calendar className="w-3 h-3" />
                    <span className="font-display tracking-wide">{article.date}</span>
                  </div>
                </div>

                <div className="p-6">
                  <p className="text-[0.65rem] tracking-[0.22em] uppercase text-[#E20A17] font-display mb-2 flex items-center gap-1.5">
                    <Tag className="w-3 h-3" />
                    {article.type}
                  </p>
                  <h2 className="font-display font-extrabold italic text-xl text-[#17181B] mb-3 leading-tight">
                    {article.title}
                  </h2>
                  <p className="text-sm text-[#6B7280] leading-relaxed mb-4 line-clamp-2">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center gap-1.5 text-[#E20A17] font-display font-bold text-sm group-hover:gap-2.5 transition-all">
                    Цааш унших
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#17181B] text-white py-10">
        <div className="mx-auto w-[min(1280px,94vw)] text-center">
          <p className="text-xs text-white/50">
            © {new Date().getFullYear()} JETOUR Mongolia · Сайн Моторс ХХК.
          </p>
        </div>
      </footer>
    </div>
  );
}
