"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, ExternalLink, Navigation } from "lucide-react";
import { CONTACT, BRANCHES, branchMap, type Branch } from "@/lib/jetour-data";
import { Navbar } from "@/components/jetour/navbar";
import { Footer } from "@/components/jetour/contact";
import { useDragSwipe } from "@/hooks/use-drag";
import { cyclicOffset, slideJumped } from "@/lib/slider";

const SHOWROOM_IMAGES = [
  "/showroom/showroom-1.webp",
  "/showroom/showroom-2.webp",
  "/showroom/showroom-3.webp",
  "/showroom/showroom-4.webp",
  "/showroom/showroom-5.webp",
  "/showroom/showroom-6.webp",
];

/** Салбарын ажлын цаг — гурван мөр. Салбар бүр өөрийн цагтай. */
function branchHours(b: Branch) {
  return [
    { day: "Даваа – Баасан", hours: b.hoursWeekday },
    { day: "Бямба гараг", hours: b.hoursSaturday },
    { day: "Ням гараг", hours: b.hoursSunday },
  ];
}

/** Утаснуудыг нэг хэлбэрт — хоёрдугаар дугаар байхгүй салбарт мөр гарахгүй */
function branchPhones(b: Branch) {
  const list = [{ num: b.phone1, href: b.phone1Href }];
  if (b.phone2 && b.phone2Href) list.push({ num: b.phone2, href: b.phone2Href });
  return list;
}

/**
 * Идэвхтэй байршлын дэлгэрэнгүй.
 *
 * Дүрсний оронд ЖИЖИГ том үсэгт шошго: хуудас нь типографаар уншигддаг,
 * `owners`-ийн үйлчилгээний блоктой ижил хэв. Дүрс тавибал мөр бүрт нэг
 * дүрс болж, «зурагт цэс» шинжтэй болно.
 */
function LocationDetail({ branch }: { branch: Branch }) {
  const map = branchMap(branch);

  return (
    /* `aria-live` — товч дарахад хаяг/утас солигдсоныг дэлгэц уншигч хэлнэ.
       `key` нь блокийг дахин холбож CSS-ийн нам гүн шилжилтийг эхлүүлнэ. */
    <div className="locsel__detail" aria-live="polite">
      <div>
        <p className="svcloc__label">Хаяг</p>
        <p className="svcloc__value">{branch.address}</p>
        {branch.landmark && (
          <p className="text-[13px] text-[#666C77] mt-1.5">
            Ойролцоох тэмдэглэгээ: {branch.landmark}
          </p>
        )}
      </div>

      <div>
        <p className="svcloc__label">
          {branch.type === "service" ? "Үйлчилгээний захиалга" : "Борлуулалт"}
        </p>
        <div className="flex flex-wrap items-baseline gap-x-7 gap-y-1">
          {branchPhones(branch).map((p) => (
            <a key={p.href + p.num} href={p.href} className="svcloc__phone">
              {p.num}
            </a>
          ))}
        </div>
      </div>

      <div>
        <p className="svcloc__label">Ажлын цаг</p>
        <dl className="mt-2 space-y-1.5">
          {branchHours(branch).map((h) => (
            <div key={h.day} className="flex items-center justify-between gap-6 text-sm max-w-[26rem]">
              <dt className="text-[#54585F]">{h.day}</dt>
              <dd className="font-bold text-[#17181B]">{h.hours}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div>
        <p className="svcloc__label">Үйлчилгээ</p>
        <ul className="mt-2 space-y-1 text-sm text-[#54585F]">
          {branch.services.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
      </div>

      <div className="flex flex-wrap items-center gap-x-6 gap-y-2.5 pt-1">
        <a
          href={map.mapDirections}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#E20A17] hover:text-[#17181B] transition-colors"
        >
          <Navigation className="w-4 h-4" aria-hidden />
          Замын заавар авах
          <span className="sr-only">
            — {branch.name} (шинэ хуудсанд нээгдэнэ)
          </span>
        </a>
        <a
          href={map.mapLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-on-grey hover:text-[#17181B] transition-colors"
        >
          Google Maps дээр нээх
          <ExternalLink className="w-3.5 h-3.5" aria-hidden />
          <span className="sr-only">
            — {branch.name} (шинэ хуудсанд нээгдэнэ)
          </span>
        </a>
      </div>
    </div>
  );
}

export function DealerClient() {
  /**
   * Идэвхтэй байршил. Анхдагч нь showroom (index 0) — хуудсанд орж ирсэн
   * хүний дийлэнх нь машин харах гэж ирдэг.
   */
  const [activeLoc, setActiveLoc] = useState(0);
  const branch = BRANCHES[activeLoc] ?? BRANCHES[0];
  const map = branchMap(branch);

  /** Одоогийн ба өмнөх зураг — өмнөхийг циклийн "үсрэлт"-ийг илрүүлэхэд хэрэглэнэ */
  const [nav, setNav] = useState({ active: 0, from: 0 });
  const { active, from } = nav;

  const total = SHOWROOM_IMAGES.length;
  const step = (dir: 1 | -1) =>
    setNav((s) => ({ active: (s.active + dir + total) % total, from: s.active }));
  const prev = () => step(-1);
  const next = () => step(1);

  /* Чирэх явцын шилжилт — зураг хуруу дагаж хөдөлнө, тавихад байрандаа суана */
  const [dragDx, setDragDx] = useState(0);
  const dragging = dragDx !== 0;

  const swipe = useDragSwipe({ onNext: next, onPrev: prev, onMove: setDragDx });

  return (
    <div className="min-h-screen bg-white text-[#17181B]">
      <Navbar />

      <main id="main-content">

      {/* `sr-only` h1: хуудсанд ЯМАР Ч ҮЕД нэг h1 байх ёстой — хайлтын
          систем ба дэлгэц уншигчид бүтцийг үүнээс уншина.

          `pt-*` нь navbar-ын (fixed, 64px) доор шургахаас сэргийлнэ:
          `section-pad-sm`-ийн `padding-block` нь Tailwind-ийн `pt-*`-ыг
          дийлдэг тул тэр класс хэрэглэхгүй. */}
      <h1 className="sr-only">
        JETOUR шоурум ба үйлчилгээний төв — SAIN MOTORS, Монгол дахь албан ёсны дистрибьютор
      </h1>

      {/* === Байршил сонгогч — ЗӨВХӨН НЭГ газрын зураг ================== */}
      <section className="bg-white pt-24 lg:pt-32 pb-9 lg:pb-12">
        <div className="container-page">
          <div className="mb-8 lg:mb-10">
            <p className="eyebrow mb-3">Байршил</p>
            <h2 className="type-h2 text-[#17181B]">
              Борлуулалт ба үйлчилгээ
            </h2>
            <p className="text-[#54585F] text-sm leading-relaxed mt-3 max-w-[62ch]">
              Шинэ автомашин сонгох, туршиж үзэхийг шоурумд; баталгаат засвар,
              тогтмол үзлэг, оригинал сэлбэгийг үйлчилгээний төвд гүйцэтгэнэ.
            </p>
          </div>

          <div className="locsel">
            {/* Зүүн — сонгогч + идэвхтэй байршлын дэлгэрэнгүй */}
            <div>
              <ul className="locsel__list">
                {BRANCHES.map((b, i) => (
                  <li key={b.id}>
                    {/* Семантик `<button>`: Tab-аар хүрч, Enter/Space-ээр
                        сонгогдоно. `aria-pressed` нь идэвхтэй байдлыг
                        хэлэх ба CSS-ийн заагч ч түүнээс уншина — хоёр
                        өөр эх сурвалж болж зөрөхгүй. */}
                    <button
                      type="button"
                      className="locsel__item"
                      aria-pressed={i === activeLoc}
                      onClick={() => setActiveLoc(i)}
                    >
                      <span className="locsel__index">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="min-w-0">
                        <span className="locsel__name block">{b.name}</span>
                        <span className="locsel__cat block">{b.category}</span>
                      </span>
                    </button>
                  </li>
                ))}
              </ul>

              <LocationDetail key={branch.id} branch={branch} />
            </div>

            {/* Баруун — идэвхтэй байршлын газрын зураг.
                НЭГ л iframe: хоёр байршлыг зэрэг ачаалдаг байсныг больсон.
                `key` нь солигдоход iframe-ыг дахин холбоно; `loading="lazy"`
                нь хуудасны эхний зурагтай өрсөлдөхгүй. */}
            <div className="locsel__map">
              <iframe
                key={branch.id}
                src={map.mapEmbed}
                title={`${branch.name} — Google газрын зураг`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </section>

      {/* === Шоурумын зургийн карусель ================================== */}
      <section className="section-pad bg-[#F5F5F6]">
        <div className="container-page">
          {/* Eyebrow → гарчиг → зураг гэсэн шатлал. Зай 40px → 36px. */}
          <div className="mb-9">
            <p className="eyebrow mb-3">Шоурум</p>
            <h2 className="type-h2 text-[#17181B]">Манай танхимаар зочлоорой</h2>
          </div>

          {/* Main image — зураг бүр идэвхтэйгээсээ хамгийн дөт талд зогсож,
              солигдоход хажуугаасаа гүйж орно. Чирэхэд хуруу дагана. */}
          <div
            /* 16:9 (1280px өргөнд 720px) байсныг кино маягийн 2.4:1 (533px)
               болгов — хэсгийн өндрөөс 187px хасагдана. Showroom зураг нь 4:3
               тул `object-cover` илүү тайрна, гэхдээ машин ба JETOUR хаяг тод
               хэвээр (тайралтыг зургаар шалгасан). Утсанд 2.4:1 хэт нарийхан
               болох тул тэнд 16:10. */
            className={`relative rounded-2xl overflow-hidden bg-[#121316] aspect-[16/10] md:aspect-[2.4/1] ${swipe.className}`}
            style={swipe.style}
            {...swipe.handlers}
          >
            {SHOWROOM_IMAGES.map((src, i) => {
              const off = cyclicOffset(i, active, total);
              const frozen = dragging || slideJumped(i, from, active, total);

              return (
                <div
                  key={src}
                  aria-hidden={off !== 0}
                  className="absolute inset-0 transition-transform duration-500 ease-out"
                  style={{
                    transform: `translateX(calc(${off * 100}% + ${dragDx}px))`,
                    ...(frozen ? { transition: "none" } : null),
                  }}
                >
                  <Image
                    src={src}
                    alt={`Showroom ${i + 1}`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 66vw"
                    draggable={false}
                    className="w-full h-full object-cover"
                  />
                </div>
              );
            })}

            {/* Arrows */}
            <button
              onClick={prev}
              aria-label="Өмнөх зураг"
              className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 z-10 w-11 h-11 md:w-10 md:h-10 grid place-items-center rounded-full bg-black/30 text-white transition-[background-color,transform] duration-200 hover:bg-black/55 hover:scale-105 active:scale-95"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={next}
              aria-label="Дараагийн зураг"
              className="absolute right-3 md:right-4 top-1/2 -translate-y-1/2 z-10 w-11 h-11 md:w-10 md:h-10 grid place-items-center rounded-full bg-black/30 text-white transition-[background-color,transform] duration-200 hover:bg-black/55 hover:scale-105 active:scale-95"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Counter */}
            <div className="absolute bottom-4 right-4 z-10 text-xs font-semibold text-white bg-black/40 backdrop-blur-sm rounded-full px-3 py-1.5">
              {active + 1} / {total}
            </div>
          </div>

          {/* Thumbnails */}
          <div className="mt-4 grid grid-cols-3 sm:grid-cols-6 gap-3">
            {SHOWROOM_IMAGES.map((src, i) => (
              <button
                key={src}
                onClick={() => setNav((s) => ({ active: i, from: s.active }))}
                aria-label={`${i + 1}-р зураг`}
                className={`relative aspect-[4/3] rounded-xl overflow-hidden border-2 transition-all ${
                  i === active ? "border-[#E20A17]" : "border-transparent opacity-60 hover:opacity-100"
                }`}
              >
                <Image src={src} alt={`Showroom thumbnail ${i + 1}`} fill sizes="(max-width: 640px) 33vw, 16vw" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>

          {/* Брэндийн мөр — хуудсын доод талд нэг л удаа, нам гүм */}
          <p className="mt-7 text-[13px] text-[#666C77]">
            {CONTACT.brandFullName} · {CONTACT.brandRole} · {CONTACT.brandSince}{" "}
            оноос хойш
          </p>
        </div>
      </section>

      </main>

      <Footer />
    </div>
  );
}
