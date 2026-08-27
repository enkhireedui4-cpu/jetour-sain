import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Navbar } from "@/components/jetour/navbar";
import { Footer } from "@/components/jetour/contact";
import { CONTACT } from "@/lib/jetour-data";

export const metadata: Metadata = {
  title: "Бидний тухай",
  description:
    "JETOUR — Хятадад төвтэй, 23 гаруй жилийн туршлагатай автомашины группийн SUV брэнд. 2018 онд Бээжин хотноо танилцуулсан. Монголд SAIN MOTORS-оор дамжин албан ёсоор.",
  alternates: { canonical: "/brand" },
};

/**
 * Бидний тухай.
 *
 * группийн туршлага, 2018 оны Бээжингийн танилцуулга,
 * эрхэм зорилго, алсын хараа, нэрийн утга. Зохиомж нь тэдний хуудсы
 * ХУУЛААГҮЙ — тэнд догол мөрүүд саарал хайрцагт нягт хураагдсан, хажуудаа
 * хөвөгч дүрсний багана бий. Энд: том зураг, тайван багана, шошготой мөр.
 *
 * ГАРЫН ҮСЭГ нь нэрийн бүтэц. JETOUR = JET + TOUR бөгөөд дундах «T» үсэг
 * ХОЁУЛАНД нь хамаардаг. Хоёр улаан зураас тэр давхцлыг харуулна — гүйлгэхэд
 * зураасууд яг тэр T-ээс гадагш сунаж, нэр өөрөө задарч харагдана.
 *
 * ШОШГЫГ АНХААР: JET нь «хурд» БИШ. Албан ёсны тайлбар нь
 * «JET + TOUR = тохиромжтой + аялал», өөрөөр хэлбэл «Тохиромжтой аялал».
 *
 * Интерактив зүйлгүй тул бүхэлдээ server component. Анимаци нь CSS-only
 * (`animation-timeline: view()`), тиймээс клиент JavaScript нэмэгдэхгүй.
 */

/** Нэрийг үсэг тус бүрээр — доорх зураасууд 6 баганад яг таарна */
const LETTERS = ["J", "E", "T", "O", "U", "R"];

/** Брэндийн танилцуулга — догол мөр тус бүр нэг санаа */
const STORY = [
  "JETOUR нь Хятад улсад төвтэй, автомашин үйлдвэрлэлийн салбарт 23 гаруй жилийн туршлагатай, дэлхийн хэмжээний автомашины группийн нэг хэсэг юм.",
  "Тус брэнд нь Хятадын шилдэг SUV брэндүүдийн нэг болох зорилгын хүрээнд олон жилийн турш хуримтлуулсан инженерчлэл, технологийн туршлага дээр үндэслэн хөгжсөн.",
  "JETOUR брэндийг 2018 онд Бээжин хотноо албан ёсоор танилцуулсан. Ухаалаг технологи, үзэмж, өргөн зай, олон талт хэрэглээ болон олон суудлын шийдлийг хослуулж, аялал болон өдөр тутмын хэрэглээнд зориулсан шинэ үеийн аяллын хэв маягийг бий болгох нь брэндийн үндсэн зорилго.",
];

/** Эрхэм зорилго ба алсын хараа — шошго | нэг өгүүлбэр */
const PURPOSE = [
  {
    label: "Эрхэм зорилго",
    text: "Илүү олон гэр бүлд зориулсан ухаалаг, хүртээмжтэй, оновчтой аяллын шийдлийг бий болгох.",
  },
  {
    label: "Алсын хараа",
    text: "Дэлхий даяар хүлээн зөвшөөрөгдсөн, нэр хүндтэй автомашины брэнд болох.",
  },
];

/** Зөвхөн эх сурвалжтай баримт — тоо зохиохгүй */
const FACTS = [
  { value: "2018", label: "Бээжин хотноо танилцуулсан" },
  { value: "23+ жил", label: "Группийн инженерчлэлийн туршлага" },
  { value: CONTACT.brandSince, label: "Монголд албан ёсоор" },
];

export default function BrandPage() {
  return (
    <div id="main-content" className="min-h-screen bg-white text-[#17181B]">
      <Navbar />

      {/* === 1. Толгой — хонгилын банд ================================== */}
      <section className="brnd-hero">
        <Image
          src="/brand/tunnel.webp"
          alt="JETOUR — хотын хонгилд"
          fill
          priority
          sizes="100vw"
          className="brnd-hero__img"
        />
        <span className="brnd-hero__scrim" aria-hidden />
        {/* Сүүдэр бичиг нь ХУУДАСНЫ ГАРЧИГ, брэндийн нэр биш. «JETOUR»
            байсныг сольсон шалтгаан: толгойд JETOUR лого аль хэдийн бий,
            доор нэрийн диаграм бий — машины зураг дээр гурав дахь удаа
            давтах нь илүүдэл. Эх сурвалж дээр ч гарчиг нь давтагддаг. */}
        <span className="brnd-hero__ghost" aria-hidden>
          Бидний тухай
        </span>
        <div className="container-page brnd-hero__inner">
          <h1 className="brnd-hero__title">Бидний тухай</h1>
        </div>
      </section>

      {/* === 2. Брэндийн тухай — зураг | текст ========================== */}
      <section className="brnd-split">
        <div className="container-page brnd-split__grid">
          <div className="brnd-split__media">
            <Image
              src="/brand/journey.webp"
              alt="JETOUR T2 — уулын шороон замд"
              fill
              sizes="(min-width: 64rem) 52vw, 100vw"
              className="object-cover"
            />
          </div>

          <div className="brnd-split__copy">
            <p className="eyebrow brnd-split__eyebrow">Брэндийн тухай</p>
            {STORY.map((p, i) => (
              <p key={i} className="brnd-split__text">
                {p}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* === 3. Нэрийн утга — гарын үсэг ================================ */}
      <section className="brnd-name">
        <div className="container-page">
          <p className="eyebrow brnd-name__eyebrow">Нэрийн утга</p>

          <figure className="brnd-name__figure">
            {/* Дэлгэц уншигчид нэрийг үсэгчлэн бус, утгаар нь сонсоно */}
            <figcaption className="sr-only">
              JETOUR нэр нь JET (тохиромжтой) ба TOUR (аялал) хоёр үгээс
              бүрдэж, «Тохиромжтой аялал» гэсэн санааг илэрхийлнэ. Дундах «T»
              үсэг хоёуланд нь хамаарна.
            </figcaption>

            <span className="brnd-name__grid" aria-hidden>
              {LETTERS.map((ch, i) => (
                <span key={i} className="brnd-name__ch">
                  {ch}
                </span>
              ))}

              {/* Зураасууд тусдаа мөрөнд — давхцал нь ХАРАГДАХ ёстой.
                  Нэг мөрөнд тавибал хоёр улаан шугам нийлж, нэг тасралтгүй
                  зураас мэт харагдаад санаа нь алдагдана. */}
              <span className="brnd-name__rule brnd-name__rule--jet" />
              <span className="brnd-name__rule brnd-name__rule--tour" />

              <span className="brnd-name__tag brnd-name__tag--jet">
                Тохиромжтой
              </span>
              <span className="brnd-name__tag brnd-name__tag--tour">Аялал</span>
            </span>
          </figure>

          <p className="brnd-name__note">
            JET + TOUR — «Тохиромжтой аялал». Дундах «T» хоёуланд нь хамаарна.
          </p>
        </div>
      </section>

      {/* === 4. Зорилго ба баримт — нэг хэсэг, нэг хэмнэл =============== */}
      <section className="brnd-about">
        <div className="container-page">
          <dl className="brnd-mv__row">
            {PURPOSE.map((p) => (
              <div key={p.label} className="brnd-mv__item">
                <dt className="brnd-mv__label">{p.label}</dt>
                <dd className="brnd-mv__text">{p.text}</dd>
              </div>
            ))}
          </dl>

          <dl className="brnd-facts__row">
            {FACTS.map((f) => (
              <div key={f.label} className="brnd-facts__item">
                <dd className="brnd-facts__value">{f.value}</dd>
                <dt className="brnd-facts__label">{f.label}</dt>
              </div>
            ))}
          </dl>

          <p className="brnd-facts__note">
            Монгол дахь албан ёсны дистрибьютор — {CONTACT.brandFullName}.
          </p>
        </div>
      </section>

      {/* === 5. Үргэлжлэл — байгаа холбоосууд хэвээр ==================== */}
      <section className="brnd-end">
        <div className="container-page">
          <h2 className="brnd-end__title">
            Аялал, эрх чөлөө, ухаалаг хэрэглээ — нэг машинд
          </h2>
          <div className="brnd-end__actions">
            <Link
              href="/models"
              className="btn-electric-jetour inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm"
            >
              Загварууд үзэх
              <ArrowRight className="w-4 h-4" aria-hidden />
            </Link>
            <Link
              href="/info-request"
              className="btn-ink-jetour inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm"
            >
              Мэдээлэл авах
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
