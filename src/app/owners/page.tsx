import type { Metadata } from "next";
import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { Navbar } from "@/components/jetour/navbar";
import { Footer } from "@/components/jetour/contact";
import { BLUR_DATA_URL } from "@/lib/image";
import { SERVICE_BRANCH, branchMap } from "@/lib/jetour-data";

export const metadata: Metadata = {
  title: "Үйлчилгээ ба баталгаа — 3 жил / 100,000 км",
  description:
    "JETOUR-ийн албан ёсны баталгаа: 3 жил буюу 100,000 км. Хөдөлгүүр ба хүч дамжуулах эд ангийн үйлчилгээ — SAIN MOTORS. Үйлчилгээний төв: ТЭЦ-4-ийн баруун хойд талд.",
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

/**
 * Үйлчилгээний төвийн зураг — БАЙХГҮЙ (`null`).
 *
 * Асетын санд сервисийн танхимын зураг байхгүй: `public/showroom/*` зургууд
 * бүгд борлуулалтын танхимынх. Шоурумын зургийг «үйлчилгээний төв» гэж
 * тавих нь хэрэглэгчийг төөрөгдүүлнэ — тиймээс тавихгүй.
 *
 * Бодит зураг гармагц зөвхөн ЭНД замыг бичнэ (жишээ:
 * `"/service/workshop-1.webp"`) — хуудас өөрөө зургаа хэрэглэж, доорх
 * типографик хавтан автоматаар унана. Өөр юу ч засах шаардлагагүй.
 */
const SERVICE_IMAGE: string | null = null;

/**
 * 4S стандартын дөрвөн бүрэлдэхүүн — зураг байхгүй үеийн баруун багана.
 *
 * Зохиомол агуулга БИШ: сайт өөрөө «4S стандарт нь Sales (борлуулалт),
 * Spare parts (сэлбэг), Service (үйлчилгээ), Survey (санал хүсэлт)» гэж
 * мэдээндээ нийтэлсэн (`src/lib/branches.ts` → NEWS_ARTICLES).
 */
const SERVICE_4S = [
  { en: "Sales", mn: "Борлуулалт" },
  { en: "Spare parts", mn: "Сэлбэг" },
  { en: "Service", mn: "Засвар үйлчилгээ" },
  { en: "Survey", mn: "Санал хүсэлт" },
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

      {/* === Албан ёсны үйлчилгээний төв ================================
          Баталгааг уншсан хүний ДАРААГИЙН асуулт нь «хаана авчрах вэ?» —
          хариултыг өөр хуудас руу шидэхгүй, тэндээ хэлнэ.

          Зохиомж нь дээрх `.wrnt` блокуудын ижил хэмнэлээр: 2 багана,
          зураг баруун талд (`--flip`), 16px радиус, карт/сүүдэр/градиент
          байхгүй. Улаан нь ЗӨВХӨН eyebrow-ийн хэрчим ба CTA.

          Google Maps-ийг ЭНД embed хийхгүй: Google-ийн UI нь хуудасны
          типографийн тайван байдлыг эвдэж, гуравдагч эрхийн скрипт нэмнэ.
          Газрын зураг нь /dealer дээр — энд зөвхөн CTA.

          Салбар байхгүй бол блок огт гарахгүй. */}
      {SERVICE_BRANCH && (
        <section className="wrnt wrnt--flip bg-white border-t border-[#EDEEF0]">
          <div className="container-page wrnt__grid">
              {/* Баруун багана (DOM-д эхэлж — `--flip` нь `order: 2`-оор
                  баруун тийш зөөнө; дэлгэц уншигчид зураг → текст гэж
                  дээрх блокуудтай ижил дараалалд уншина). */}
              {SERVICE_IMAGE ? (
                <div className="wrnt__media">
                  <Image
                    src={SERVICE_IMAGE}
                    alt="JETOUR үйлчилгээний төв — засварын танхим"
                    fill
                    sizes="(min-width: 1024px) 52vw, 100vw"
                    placeholder="blur"
                    blurDataURL={BLUR_DATA_URL}
                    className="object-cover"
                  />
                </div>
              ) : (
                /* Үйлчилгээний төвийн бодит зураг АСЕТЫН САНД БАЙХГҮЙ
                   (шоурумын 6 зураг бүгд танхимынх). Хоосон хайрцаг тавихын
                   оронд 4S стандартын дөрвөн бүрэлдэхүүнийг үзүүлнэ — сайт
                   өөрөө мэдээндээ нийтэлсэн, баталгаатай агуулга.
                   Зураг ирмэгц `SERVICE_IMAGE`-д зам бичихэд л энэ хавтан
                   зургаар солигдоно. */
                <div className="svcloc__panel">
                  <p className="svcloc__panel-eyebrow">4S стандарт</p>
                  <ul className="svcloc__panel-list">
                    {SERVICE_4S.map((s, i) => (
                      <li key={s.en} className="svcloc__panel-item">
                        <span className="svcloc__panel-key">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span>
                          {s.en} — {s.mn}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <p className="svcloc__panel-note">
                    Борлуулалт, сэлбэг, засвар үйлчилгээ, санал хүсэлт — дөрвүүлээ
                    нэг стандартын дор.
                  </p>
                </div>
              )}

              {/* Зүүн багана — мэдээллийн шатлал:
                  eyebrow → гарчиг → тайлбар → байршил → утас → CTA */}
              <div className="wrnt__copy">
                <p className="wrnt__eyebrow">Албан ёсны үйлчилгээний төв</p>
                <h2 className="wrnt__title">
                  Таны JETOUR-д зориулсан мэргэжлийн үйлчилгээ
                </h2>
                <p className="wrnt__body">
                  JETOUR автомашины оношилгоо, засвар үйлчилгээ болон баталгаат
                  үйлчилгээг үйлдвэрлэгчийн стандартын дагуу мэргэжлийн төвөөс
                  аваарай.
                </p>

                <div className="svcloc__meta">
                  <div>
                    <p className="svcloc__label">Байршил</p>
                    <p className="svcloc__value">{SERVICE_BRANCH.address}.</p>
                  </div>

                  <div>
                    <p className="svcloc__label" id="svc-phone-label">
                      Лавлах утас
                    </p>
                    {/* `tel:` нь семантик холбоос — хөтөч, дэлгэц уншигч,
                        мобайл гурвуулаа дуудлага гэж танина. */}
                    <a
                      href={SERVICE_BRANCH.phone1Href}
                      className="svcloc__phone"
                      aria-describedby="svc-phone-label"
                    >
                      {SERVICE_BRANCH.phone1}
                    </a>
                  </div>
                </div>

                <a
                  href={branchMap(SERVICE_BRANCH).mapLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary-jetour svcloc__cta"
                >
                  Google Maps
                  <ExternalLink className="w-4 h-4" aria-hidden />
                  {/* Шинэ таб дээр нээгдэхийг дэлгэц уншигчид ХЭЛНЭ —
                      эс тэгвээс хэрэглэгч контекст солигдсоныг мэдэхгүй. */}
                  <span className="sr-only">(шинэ хуудсанд нээгдэнэ)</span>
                </a>
              </div>
          </div>
        </section>
      )}

      </main>

      <Footer />
    </div>
  );
}
