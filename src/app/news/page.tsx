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
import { BLUR_DATA_URL } from "@/lib/image";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  /* «— JETOUR» дагавар хасав: layout-ын template аль хэдийн
     «| JETOUR» нэмдэг тул брэнд хоёр удаа гарч байв. */
  title: "Мэдээ, сурталчилгаа",
  description:
    "JETOUR-ийн шинэ загвар, брэндийн мэдээ, үйлчилгээний шинэчлэлт, олон улсын амжилт болон Монгол дахь үйл явдал — бүгд нэг дор. SAIN MOTORS-ийн албан ёсны мэдээлэл.",
  /* Өөрийгөө заасан canonical. Байхгүй бол Next `metadataBase`
     буюу НҮҮР рүү унаж, Google энэ хуудсыг нүүрийн хуулбар гэж
     үзээд индексээс хасдаг. */
  alternates: { canonical: "/news" },
  openGraph: {
    title: "Мэдээ, сурталчилгаа — JETOUR",
    description: "JETOUR-ын шинэ загвар, брэндийн мэдээ, үйлчилгээ.",
    type: "website",
    locale: "mn_MN",
    url: "/news",
    images: [
      {
        url: "/models-hero/x70-plus.jpg",
        width: 1772,
        height: 1772,
        alt: "JETOUR X70 Plus — SAIN MOTORS",
      },
    ],
  },
};

export default async function NewsListPage() {
  const NEWS_ARTICLES = await getAllNews();
  return (
    <div className="min-h-screen bg-white text-[#17181B]">
      <Navbar />

      <main id="main-content">

      <PageHeader
        eyebrow="Албан ёсны мэдээ"
        title="Мэдээ, мэдээлэл"
        lead="JETOUR-ын шинэ загвар, брэндийн мэдээ, үйлчилгээний шинэчлэлт, үйл явдлууд."
      />

      {/* === Мэдээний сүлжээ ===============================================
          Хоёр багана (`.nwsl__grid`) — өмнө нь гурав байсан тул хоёр мэдээ
          гурван баганад орж, баруун тал хоосон үлддэг байв. Багана тоог
          мэдээний тоонд ХАТУУ уяагүй: 3, 4, 5… мэдээ орж ирвэл эгнээ
          болон нэмэгдэнэ.

          Жагсаалт нь `<ul>/<li>` — дэлгэц уншигч «2 зүйлтэй жагсаалт» гэж
          хэлнэ. Карт бүхэлдээ НЭГ холбоос: нэг Tab-ийн зогсоол, хуруугаар
          дарах талбай том. */}
      <section className="section-pad">
        <div className="container-page">
          <ul className="nwsl__grid">
            {NEWS_ARTICLES.map((article, i) => (
              <li key={article.slug}>
                <article className="nwsl__item">
                  <Link href={`/news/${article.slug}`} className="nwsl__card">
                    <span className="nwsl__media">
                      <Image
                        src={article.image}
                        alt={article.title}
                        fill
                        /* Хоёр баганад картын өргөн ≈ 620px. Хэт том хувилбар
                           татахгүйн тулд яг тэр хэмжээг зааж өгнө. */
                        sizes="(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 620px"
                        placeholder="blur"
                        blurDataURL={BLUR_DATA_URL}
                        /* Эхний эгнээ нь дэлгэцэнд шууд харагдана — LCP.
                           Бусад нь lazy (next/image-ийн анхдагч). */
                        priority={i < 2}
                        className="nwsl__img"
                      />
                    </span>

                    <span className="nwsl__body">
                      <span className="nwsl__meta">
                        {/* `type` — «Брэндийн мэдээ», «Шинэ загвар»… Өгөгдөлд
                            аль хэдийн байгаа талбар; `tag` («Брэнд») нь хэт
                            ерөнхий тул үүнийг харуулна. */}
                        <span className="nwsl__cat">{article.type}</span>
                        <time className="nwsl__date" dateTime={article.dateIso}>
                          {article.date}
                        </time>
                      </span>

                      <h2 className="nwsl__title">{article.title}</h2>
                      <p className="nwsl__excerpt">{article.excerpt}</p>

                      <span className="nwsl__more">
                        Цааш унших
                        <ArrowRight className="nwsl__arrow" aria-hidden />
                      </span>
                    </span>
                  </Link>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </section>

      </main>

      <Footer />
    </div>
  );
}
