import type { Metadata } from "next";
import Image from "next/image";
import { Navbar } from "@/components/jetour/navbar";
import { Footer } from "@/components/jetour/contact";
import { BLUR_DATA_URL } from "@/lib/image";

export const metadata: Metadata = {
  title: "Үйлчилгээ ба баталгаа — 3 жил / 100,000 км",
  description:
    "JETOUR-ийн албан ёсны баталгаа: 3 жил буюу 100,000 км. Хөдөлгүүр ба хүч дамжуулах эд ангийн үйлчилгээ — SAIN MOTORS.",
  alternates: { canonical: "/owners" },
};

/**
 * Үйлчилгээ ба баталгаа.
 *
 * ЗОХИОМЖИЙН ГОЛ ЗАРЧИМ: «3 жил / 100,000 км» гэдэг НЭГ л удаа, метрикийн
 * блокт хүчтэй харагдана. Өмнө нь тэр тоо толгойд том, дараа нь блокийн
 * улаан мөрөнд, дээр нь биед — гурван удаа давтагдаж байв. Дараагийн блокууд
 * тоог давтахын оронд баталгааг ТАЙЛБАРЛАНА.
 *
 * Улаан өнгө нь зөвхөн accent: метрикийн дээрх нарийн зураас ба eyebrow-ийн
 * хэрчим. Гарчиг, тайлбар бүгд хар/саарал — корпорацийн автомашины сайтын хэв.
 *
 * Интерактив зүйлгүй тул бүхэлдээ server component.
 */

type Block = {
  image: string;
  alt: string;
  eyebrow: string;
  title: string;
  body: string;
};

const BLOCKS: Block[] = [
  {
    image: "/warranty/vehicle.webp",
    alt: "JETOUR X1 — гудамжинд",
    eyebrow: "Баталгаат үйлчилгээ",
    title: "Таны JETOUR-д итгэлтэйгээр зорчих баталгаа",
    body:
      "Тээврийн хэрэгсэл худалдан авсан өдрөөс эхлэн 3 жил буюу 100,000 км хүртэлх хугацаанд баталгаат үйлчилгээнд хамрагдана. Баталгаат үйлчилгээ нь албан ёсны дистрибьютороос олгосон баталгааны нөхцөл, журмын дагуу хэрэгжинэ.",
  },
  {
    image: "/warranty/engine.webp",
    alt: "JETOUR X70 Plus — хөдөлгүүрийн зүсэлт",
    eyebrow: "Хөдөлгүүр ба хүч дамжуулах анги",
    title: "Үйлдвэрлэгчийн стандартын дагуух үйлчилгээ",
    body:
      "Хөдөлгүүр болон хүч дамжуулах эд ангийн найдвартай ажиллагааг баталгаат хугацааны нөхцөлөөр хангана. Шаардлагатай үзлэг, үйлчилгээг эрх бүхий 4S төвд үйлдвэрлэгчийн стандартын дагуу гүйцэтгэнэ.",
  },
];

/** Гол үзүүлэлт — хуудсанд ЗӨВХӨН эндээ гарна */
const METRICS = [
  { value: "3 жил", label: "Баталгаат хугацаа" },
  { value: "100,000 км", label: "Баталгаат гүйлт" },
];

export default function OwnersPage() {
  return (
    <div className="min-h-screen bg-white text-[#17181B]">
      <Navbar />

      <main id="main-content">

      {/* === Хэсгийн танилцуулга + гол үзүүлэлт ========================== */}
      <section className="wsvc">
        <div className="container-page">
          <p className="wsvc__eyebrow">Үйлчилгээ ба баталгаа</p>
          <h1 className="wsvc__h1">JETOUR — урт хугацааны найдвартай байдал</h1>
          <p className="wsvc__lead">
            Таны тээврийн хэрэгслийн найдвартай ажиллагааг баталгаат үйлчилгээ болон
            мэргэжлийн засвар үйлчилгээний стандартаар дэмжинэ.
          </p>

          {/* Хоёр үзүүлэлт — тоо хар, тайлбар саарал. Зураасаар зааглахын оронд
              тусдаа багана: илүү тайван, техникийн үзүүлэлтийн хэв. */}
          <dl className="wmetric">
            {METRICS.map((m) => (
              <div key={m.label} className="wmetric__item">
                <dd className="wmetric__value">{m.value}</dd>
                <dt className="wmetric__label">{m.label}</dt>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* === Зураг | текст блокууд — тоог давтахгүй, тайлбарлана ========= */}
      {BLOCKS.map((b, i) => (
        <section
          key={b.image}
          className={`wrnt ${i % 2 === 1 ? "wrnt--flip" : ""} ${
            i % 2 === 1 ? "bg-[#FAFAFB] border-y border-[#EDEEF0]" : "bg-white"
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
              <p className="wrnt__eyebrow">{b.eyebrow}</p>
              <h2 className="wrnt__title">{b.title}</h2>
              <p className="wrnt__body">{b.body}</p>
            </div>
          </div>
        </section>
      ))}

      </main>

      <Footer />
    </div>
  );
}
