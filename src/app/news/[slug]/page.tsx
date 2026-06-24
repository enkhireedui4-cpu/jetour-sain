import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { NEWS_ARTICLES, CONTACT } from "@/lib/jetour-data";
import { Calendar, Tag, ArrowLeft, ArrowRight, Phone } from "lucide-react";

// === Static params for all news slugs ===
export function generateStaticParams() {
  return NEWS_ARTICLES.map((a) => ({ slug: a.slug }));
}

// === Per-article metadata for SEO ===
export function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  return params.then(({ slug }) => {
    const article = NEWS_ARTICLES.find((a) => a.slug === slug);
    if (!article) {
      return {
        title: "Мэдээ олдсонгүй — JETOUR Mongolia",
      };
    }
    return {
      title: `${article.title} — JETOUR Mongolia`,
      description: article.excerpt,
      openGraph: {
        title: article.title,
        description: article.excerpt,
        type: "article",
        locale: "mn_MN",
        images: [{ url: article.image, alt: article.title }],
        publishedTime: article.dateIso,
      },
      twitter: {
        card: "summary_large_image",
        title: article.title,
        description: article.excerpt,
        images: [article.image],
      },
    };
  });
}

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = NEWS_ARTICLES.find((a) => a.slug === slug);

  if (!article) {
    notFound();
  }

  // JSON-LD Article structured data for SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    image: article.image,
    datePublished: article.dateIso,
    dateModified: article.dateIso,
    author: {
      "@type": "Organization",
      name: "JETOUR Mongolia · Sain Motors",
    },
    publisher: {
      "@type": "Organization",
      name: "Sain Motors LLC",
      logo: {
        "@type": "ImageObject",
        url: "/logo.svg",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://jetour-mongolia.mn/news/${article.slug}`,
    },
  };

  // Related articles (other than current)
  const related = NEWS_ARTICLES.filter((a) => a.slug !== article.slug).slice(0, 2);

  return (
    <div className="min-h-screen bg-white text-[#0A1F44]">
      {/* JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="h-20" />

      {/* Hero */}
      <section className="relative h-[50vh] min-h-[360px] overflow-hidden bg-[#0A1F44]">
        <img
          src={article.image}
          alt={article.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(10,31,68,0.7) 0%, rgba(10,31,68,0.4) 50%, rgba(10,31,68,0.95) 100%)",
          }}
        />
        <div className="relative z-10 h-full flex items-end pb-12">
          <div className="mx-auto w-[min(900px,94vw)]">
            <Link
              href="/news"
              className="inline-flex items-center gap-2 text-white/60 hover:text-[#4DD0F5] transition-colors text-sm font-display font-bold tracking-wider mb-5"
            >
              <ArrowLeft className="w-4 h-4" />
              МЭДЭЭ
            </Link>
            <div className="flex items-center gap-3 mb-4">
              <span
                className={`font-display text-[0.6rem] font-bold tracking-[0.18em] uppercase px-3 py-1.5 rounded-full text-white ${
                  article.accent === "electric" ? "bg-[#00AEEF]" : "bg-[#0A1F44] border border-white/20"
                }`}
              >
                {article.tag}
              </span>
              <span className="flex items-center gap-1.5 text-white/70 text-xs font-display">
                <Calendar className="w-3 h-3" />
                {article.date}
              </span>
            </div>
            <h1 className="font-display font-extrabold italic text-white text-3xl lg:text-5xl leading-[1.05]">
              {article.title}
            </h1>
          </div>
        </div>
      </section>

      {/* Article body */}
      <article className="py-16 lg:py-24">
        <div className="mx-auto w-[min(900px,94vw)]">
          <p className="text-[0.65rem] tracking-[0.22em] uppercase text-[#00AEEF] font-display mb-4 flex items-center gap-1.5">
            <Tag className="w-3 h-3" />
            {article.type}
          </p>
          <p className="text-lg lg:text-xl text-[#6B7280] leading-relaxed mb-8 font-light">
            {article.excerpt}
          </p>

          <div className="prose prose-lg max-w-none">
            {article.content.split("\n\n").map((para, i) => (
              <p key={i} className="text-[#0A1F44] text-base lg:text-lg leading-[1.8] mb-6">
                {para}
              </p>
            ))}
          </div>

          {/* Contact CTA */}
          <div className="mt-12 p-7 bg-[#F7F9FC] rounded-2xl border border-[#E2E7EF]">
            <h3 className="font-display font-extrabold italic text-xl text-[#0A1F44] mb-3">
              Холбоо барих
            </h3>
            <p className="text-sm text-[#6B7280] mb-4 leading-relaxed">
              Энэ мэдээнд холбоотой асуулт байвал манай багтай холбогдоорой.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href={CONTACT.phone1Href}
                className="btn-electric-jetour inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm"
              >
                <Phone className="w-4 h-4" />
                {CONTACT.phone1}
              </a>
              <Link
                href="/#test-drive"
                className="btn-outline-jetour inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm"
              >
                Тест драйв
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </article>

      {/* Related */}
      {related.length > 0 && (
        <section className="py-16 lg:py-20 bg-[#F7F9FC] border-t border-[#E2E7EF]">
          <div className="mx-auto w-[min(1280px,94vw)]">
            <h2 className="font-display font-extrabold italic text-2xl lg:text-3xl text-[#0A1F44] mb-8">
              Холбоотой мэдээ
            </h2>
            <div className="grid sm:grid-cols-2 gap-6">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={`/news/${r.slug}`}
                  className="group block bg-white rounded-2xl overflow-hidden border border-[#E2E7EF] card-lift"
                >
                  <div className="grid sm:grid-cols-[1fr_1.2fr] gap-0">
                    <div className="aspect-[16/10] sm:aspect-auto overflow-hidden bg-[#F7F9FC]">
                      <img
                        src={r.image}
                        alt={r.title}
                        className="w-full h-full object-cover transition-transform duration-[1.2s] group-hover:scale-110"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-5">
                      <p className="text-[0.6rem] tracking-[0.22em] uppercase text-[#00AEEF] font-display mb-2">
                        {r.type}
                      </p>
                      <h3 className="font-display font-extrabold italic text-base text-[#0A1F44] mb-2 leading-tight">
                        {r.title}
                      </h3>
                      <p className="text-xs text-[#6B7280] leading-relaxed line-clamp-2 mb-3">
                        {r.excerpt}
                      </p>
                      <div className="flex items-center gap-1.5 text-[#00AEEF] font-display font-bold text-xs group-hover:gap-2.5 transition-all">
                        Цааш
                        <ArrowRight className="w-3 h-3" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <footer className="bg-[#0A1F44] text-white py-10">
        <div className="mx-auto w-[min(1280px,94vw)] text-center">
          <p className="text-xs text-white/50">
            © {new Date().getFullYear()} JETOUR Mongolia · Сайн Моторс ХХК.
          </p>
        </div>
      </footer>
    </div>
  );
}
