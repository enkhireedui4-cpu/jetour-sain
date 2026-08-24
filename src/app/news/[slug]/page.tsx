import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { CONTACT } from "@/lib/jetour-data";
import { getAllNews, getNewsBySlug } from "@/lib/cms";

// ISR — 10 мин (600 сек). Next-ийн segment config нь literal байх ёстой,
// import хийсэн тогтмол ажиллахгүй тул тоог шууд бичнэ.
export const revalidate = 600;
import { Navbar } from "@/components/jetour/navbar";
import { Footer } from "@/components/jetour/contact";
import { Calendar, ArrowLeft, ArrowRight, Phone } from "lucide-react";

// === Static params for all news slugs ===
export async function generateStaticParams() {
  const articles = await getAllNews();
  return articles.map((a) => ({ slug: a.slug }));
}

// === Per-article metadata for SEO ===
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = await getNewsBySlug(slug);
  if (!article) {
    return {
      title: "Мэдээ олдсонгүй — JETOUR",
    };
  }
  return {
    title: `${article.title} — JETOUR`,
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
}

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getNewsBySlug(slug);

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
        url: "https://jetour-sain.mn/logos/sain-motors-black.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://jetour-sain.mn/news/${article.slug}`,
    },
  };

  // Related articles (other than current)
  const allNews = await getAllNews();
  const related = allNews.filter((a) => a.slug !== article.slug).slice(0, 2);

  return (
    <div id="main-content" className="min-h-screen bg-white text-[#17181B]">
      {/* JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Navbar />
      <div className="h-16" />

      {/* Article header — editorial: гарчиг цагаан дэвсгэр дээр, зураг бүтнээрээ (тайралтгүй) */}
      <section className="bg-white pt-8 lg:pt-12">
        <div className="container-page max-w-[900px]">
          <Link
            href="/news"
            className="inline-flex items-center gap-2 text-[#6B7280] hover:text-[#E20A17] transition-colors text-sm font-semibold mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Мэдээ
          </Link>
          <div className="flex items-center gap-3 mb-5">
            <span
              className={`eyebrow px-3 py-1.5 rounded-full ${
                article.accent === "electric"
                  ? "bg-[#E20A17] text-white"
                  : "bg-[#F5F5F6] text-[#54585F] border border-[#E7E7EA]"
              }`}
            >
              {article.tag}
            </span>
            <span className="flex items-center gap-1.5 text-[#6B7280] text-sm">
              <Calendar className="w-4 h-4" />
              {article.date}
            </span>
          </div>
          <h1 className="type-h1 text-[#17181B] mb-8 lg:mb-10">{article.title}</h1>

          {/* Зураг — object-contain тул ямар ч харьцаатай зураг тайрагдахгүй, чанараа хадгална.
              Хажуугийн хоосон зайг мөн зургийн бүдэгрүүлсэн хуулбараар дүүргэнэ. */}
          <div className="relative h-[300px] sm:h-[400px] lg:h-[520px] rounded-2xl overflow-hidden bg-[#F5F5F6] border border-[#E7E7EA]">
            <Image
              src={article.image}
              alt=""
              aria-hidden
              fill
              sizes="(max-width: 900px) 94vw, 900px"
              className="object-cover scale-110 blur-2xl opacity-40"
            />
            <Image
              src={article.image}
              alt={article.title}
              fill
              priority
              sizes="(max-width: 900px) 94vw, 900px"
              className="relative object-contain"
            />
          </div>
        </div>
      </section>

      {/* Article body */}
      <article className="section-pad">
        <div className="container-page">
          <div className="max-w-[720px] mx-auto">
            <p className="type-lead mb-10">{article.excerpt}</p>

            <div className="space-y-6">
              {article.content.split("\n\n").map((para, i) => (
                <p
                  key={i}
                  className="text-[#17181B] text-base lg:text-lg leading-[1.8]"
                >
                  {para}
                </p>
              ))}
            </div>

            {/* Contact CTA */}
            <div className="mt-14 p-8 bg-[#F5F5F6] rounded-2xl">
              <h3 className="type-h3 text-[#17181B] mb-3">Холбоо барих</h3>
              <p className="text-[#54585F] leading-relaxed mb-6">
                Энэ мэдээнд холбоотой асуулт байвал манай багтай холбогдоорой.
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href={CONTACT.phone1Href}
                  className="btn-electric-jetour inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm"
                >
                  <Phone className="w-4 h-4" />
                  {CONTACT.phone1}
                </a>
                <Link
                  href="/#dealer"
                  className="btn-outline-jetour inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm"
                >
                  Тест драйв
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* Related */}
      {related.length > 0 && (
        <section className="section-pad-sm bg-[#F5F5F6] border-t border-[#E7E7EA]">
          <div className="container-page">
            <h2 className="type-h2 text-[#17181B] mb-10">Холбоотой мэдээ</h2>
            <div className="grid sm:grid-cols-2 gap-6 lg:gap-8">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={`/news/${r.slug}`}
                  className="group block bg-white rounded-2xl overflow-hidden card-lift"
                >
                  <div className="grid sm:grid-cols-[1fr_1.2fr]">
                    <div className="relative aspect-[16/10] sm:aspect-auto overflow-hidden bg-[#F5F5F6]">
                      <Image
                        src={r.image}
                        alt={r.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="type-h3 text-[#17181B] mb-2 text-xl">{r.title}</h3>
                      <p className="type-small text-[#54585F] leading-relaxed line-clamp-2 mb-4">
                        {r.excerpt}
                      </p>
                      <span className="inline-flex items-center gap-1.5 text-[#E20A17] font-semibold text-sm group-hover:gap-2.5 transition-all">
                        Цааш унших
                        <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
}
