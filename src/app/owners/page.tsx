import type { Metadata } from "next";
import Image from "next/image";
import { Navbar } from "@/components/jetour/navbar";
import { Footer } from "@/components/jetour/contact";
import { BLUR_DATA_URL } from "@/lib/image";

export const metadata: Metadata = {
  title: "Үйлчилгээ ба баталгаа — 3 жил / 100,000 км",
  description:
    "JETOUR-ийн албан ёсны баталгаа: 3 жил буюу 100,000 км. Хөдөлгүүр ба хүчний нэгж бүрэн хамрагдана — SAIN MOTORS.",
  alternates: { canonical: "/owners" },
};

/**
 * Үйлчилгээ ба баталгаа.
 *
 * Зохиомжийн эх нь jetouregypt.com/after-sales-services/warranty — толгой,
 * дараа нь зураг | текст блокууд солигдон эргэнэ. Дэлгэрэнгүйг
 * `.firecrawl/eg-warranty/README.md`-д тэмдэглэв.
 *
 * ХОЁР ЗӨРҮҮ (зориудаар):
 *   1. Тоо — Египетэд 6 жил / 150,000 км, хөдөлгүүрт 10 жил / 1 сая км гэж
 *      бичсэн ч тэр нь Kasrawy Group-ийн Египет-тусгай санал. Монголын
 *      баталгаа 3 жил / 100,000 км.
 *   2. Баннер — тэдний баннер нь JETOUR-ийн бус, лицензийн эх нь тодорхойгүй
 *      stock зураг. Оронд нь баталгааны хугацаа ӨӨРӨӨ толгойн тезис болов.
 *
 * Хуудас зориуд ЦӨӨХӨН агуулгатай: хамрагдах/хамрагдахгүй хүснэгт, засвар
 * авах алхмууд байсныг хассан — хуудас хэт урт болж байв. Холбогдох блок ч
 * хэрэггүй: хөвөгч утасны товч ба footer-т дугаар аль хэдийн бий.
 *
 * Интерактив зүйлгүй тул бүхэлдээ server component — клиент JS нэмэхгүй.
 */

type Block = {
  image: string;
  alt: string;
  /** Улаан accent мөр — гарчгийн дээр жижгээр. Байхгүй ч болно. */
  stat?: string;
  title: string;
  body: string;
};

const BLOCKS: Block[] = [
  {
    image: "/warranty/vehicle.webp",
    alt: "JETOUR X1 — гудамжинд",
    stat: "3 жил / 100,000 км",
    title: "Баталгаат үйлчилгээ",
    body:
      "Тээврийн хэрэгсэл худалдан авсан өдрөөс эхлэн 3 жил буюу 100,000 км хүртэлх хугацаанд баталгаат үйлчилгээнд хамрагдана. Баталгаат үйлчилгээ нь албан ёсны дистрибьютороос олгосон баталгааны нөхцөл, журмын дагуу хэрэгжинэ.",
  },
  {
    image: "/warranty/engine.webp",
    alt: "JETOUR X70 Plus — хөдөлгүүрийн зүсэлт",
    title: "Хөдөлгүүр ба хүч дамжуулах ангид олгох баталгаа",
    body:
      "Хөдөлгүүр болон хүч дамжуулах эд ангийн найдвартай ажиллагааг баталгаат хугацааны нөхцөлөөр бүрэн хангана. Баталгаат хугацаанд шаардлагатай үйлчилгээ, үзлэгийг эрх бүхий 4S төвд үйлдвэрлэгчийн стандартын дагуу гүйцэтгэнэ.",
  },
];

export default function OwnersPage() {
  return (
    <div id="main-content" className="min-h-screen bg-white text-[#17181B]">
      <Navbar />

      {/* === Толгой — баталгааны хугацаа өөрөө тезис ====================== */}
      <section className="wthesis">
        {/* Ghost watermark — Египетийн баннерын хэл. `aria-hidden`: гарчгийг
            дэлгэц уншигчид давхар уншихгүй. */}
        <span className="wthesis__ghost" aria-hidden>
          БАТАЛГАА
        </span>

        <div className="container-page wthesis__inner">
          <h1 className="wthesis__h1">Үйлчилгээ ба баталгаа</h1>

          <p className="wthesis__lock">
            <span className="wthesis__num">3 жил</span>
            <span className="wthesis__rule" aria-hidden />
            <span className="wthesis__num">100,000 км</span>
          </p>
        </div>
      </section>

      {/* === Зураг | текст блокууд, солигдон эргэнэ ======================= */}
      {BLOCKS.map((b, i) => (
        <section
          key={b.image}
          className={`wrnt ${i % 2 === 1 ? "wrnt--flip" : ""} ${
            i % 2 === 1 ? "bg-[#F5F5F6] border-y border-[#E7E7EA]" : "bg-white"
          }`}
        >
          <div className="container-page wrnt__grid">
            <div className="wrnt__media">
              <Image
                src={b.image}
                alt={b.alt}
                fill
                sizes="(min-width: 1024px) 52vw, 100vw"
                placeholder="blur"
                blurDataURL={BLUR_DATA_URL}
                className="object-cover"
              />
            </div>

            <div className="wrnt__copy">
              {b.stat && <p className="wrnt__stat">{b.stat}</p>}
              <h2 className="wrnt__title">{b.title}</h2>
              <p className="wrnt__body">{b.body}</p>
            </div>
          </div>
        </section>
      ))}

      <Footer />
    </div>
  );
}
