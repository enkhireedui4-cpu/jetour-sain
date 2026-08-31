"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { BLUR_DATA_URL } from "@/lib/image";
import { useDragSwipe } from "@/hooks/use-drag";
import { arrowKeyNav, cyclicOffset, slideJumped } from "@/lib/slider";

type Props = {
  images: string[];
  alt: string;
};

export function Gallery({ images, alt }: Props) {
  /** Одоогийн ба өмнөх зураг — өмнөхийг циклийн "үсрэлт"-ийг илрүүлэхэд хэрэглэнэ */
  const [nav, setNav] = useState({ active: 0, from: 0 });
  const { active, from } = nav;
  const [paused, setPaused] = useState(false);

  const step = useCallback(
    (dir: 1 | -1) =>
      setNav((s) => ({
        active: (s.active + dir + images.length) % images.length,
        from: s.active,
      })),
    [images.length]
  );
  const next = useCallback(() => step(1), [step]);
  const prev = () => step(-1);

  useEffect(() => {
    if (paused || images.length <= 1) return;
    // WCAG 2.2.2. Hero-той ижил бодлого: хөдөлгөөн мэдрэмтгий
    // хэрэглэгчид огт эхлүүлэхгүй — зогсоох хяналт хайх хэрэггүй болно.
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }
    const t = setInterval(next, 4500);
    return () => clearInterval(t);
  }, [next, paused, images.length]);

  const accentColor = "#E20A17";

  /* Чирэх явцын шилжилт — зураг хуруу дагаж хөдөлнө, тавихад байрандаа суана */
  const [dragDx, setDragDx] = useState(0);
  const dragging = dragDx !== 0;

  // Хулганаар чирэх / хуруугаар шудрах
  const swipe = useDragSwipe({
    onNext: next,
    onPrev: prev,
    onStart: () => setPaused(true),
    onEnd: () => setPaused(false),
    onMove: setDragDx,
  });

  /* Гарын жолоодлого — сум/цэг рүү фокуслаад ←/→ дарахад зураг солигдоно,
     Home/End нь эхний/сүүлийн зураг руу үсэрнэ (Hero, Models слайдертай
     ижил хэв). Товчлуурын keydown нь энэ саванд бөмбөрч дээрх зохицуулагчид
     хүрнэ — глобал сумыг булаахгүй (зөвхөн энэ галерейд фокустай үед). */
  const onKeyDown = arrowKeyNav({
    next,
    prev,
    first: () => setNav((s) => ({ active: 0, from: s.active })),
    last: () => setNav((s) => ({ active: images.length - 1, from: s.active })),
  });

  return (
    <div
      className={`relative aspect-[16/10] rounded-2xl overflow-hidden bg-white border border-[#E7E7EA] ${
        images.length > 1 ? swipe.className : ""
      }`}
      style={images.length > 1 ? swipe.style : undefined}
      {...(images.length > 1 ? swipe.handlers : {})}
      onKeyDown={images.length > 1 ? onKeyDown : undefined}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      /* Гарын хэрэглэгч Tab-аар сум/цэг рүү ормогц зогсоно. Өмнө нь зөвхөн
         хулгана зогсоодог байсан тул гараар явж буй хүн 4.5 секунд тутам
         доороосоо зураг солигдох нөхцөлд үлддэг байв (WCAG 2.2.2). */
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      /* `aria-roledescription` нь ГЭНЕРИК бус role шаарддаг. Энэ нь энгийн
         <div> тул `role="group"` + нэргүйгээр бол уг атрибут зүгээр л
         үл тоомсорлогдоно — тиймээс гурвыг хамт өгөв. */
      role="group"
      aria-roledescription="carousel"
      aria-label={`${alt} — зургийн цомог`}
    >
      {/* Хэвтээ гулсалт: зураг бүр идэвхтэйгээсээ хамгийн дөт талд зогсож,
          солигдоход хажуугаасаа гүйж орно (fade биш). Циклээр эргэхэд ч
          зөвхөн нэг дэлгэцийн зайд хөдөлнө. Чирэх үед хуруу дагана. */}
      {images.map((src, i) => {
        const off = cyclicOffset(i, active, images.length);
        const frozen = dragging || slideJumped(i, from, active, images.length);

        return (
          <div
            key={src}
            className="absolute inset-0 transition-transform duration-500 ease-out"
            style={{
              transform: `translateX(calc(${off * 100}% + ${dragDx}px))`,
              /* Чирч байх зуур шилжилт байвал зураг хуруунаас хоцорно */
              ...(frozen ? { transition: "none" } : null),
            }}
            aria-hidden={off !== 0}
          >
            <Image
              src={src}
              alt={`${alt} - ${i + 1}`}
              fill
              sizes="(max-width: 1280px) 100vw, 1200px"
              placeholder="blur"
              blurDataURL={BLUR_DATA_URL}
              priority={i === 0}
              draggable={false}
              className="object-cover"
            />
          </div>
        );
      })}

      {/* Image counter */}
      <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full text-xs font-display font-bold bg-[#17181B]/80 text-white backdrop-blur-sm">
        {String(active + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
      </div>

      {/* Side navigation arrows */}
      {images.length > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full grid place-items-center transition-all hover:scale-110"
            style={{
              background: "rgba(255,255,255,0.95)",
              color: "#17181B",
              boxShadow: "0 6px 18px -4px rgba(0,0,0,0.25)",
            }}
            aria-label="Өмнөх зураг"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={next}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full grid place-items-center transition-all hover:scale-110"
            style={{
              background: "rgba(255,255,255,0.95)",
              color: "#17181B",
              boxShadow: "0 6px 18px -4px rgba(0,0,0,0.25)",
            }}
            aria-label="Дараагийн зураг"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </>
      )}

      {/* Bottom progress dots — харагдах зурвас нимгэн ч ХҮРЭЛТИЙН бай нь
          ≥24px (WCAG 2.5.8). Товч нь тунгалаг hit-area, дотор нь өнгөт зурвас —
          padding нь өнгийг тархаахгүйгээр байг томсгоно. */}
      {images.length > 1 && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-0.5 z-10">
          {images.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setNav((s) => ({ active: i, from: s.active }))}
              className="grid place-items-center h-6 w-7"
              aria-label={`Зураг ${i + 1}`}
              aria-current={i === active ? "true" : undefined}
            >
              <span
                className="block h-1.5 rounded-full transition-[width,background-color] duration-300"
                style={{
                  width: i === active ? "24px" : "8px",
                  background: i === active ? accentColor : "rgba(255,255,255,0.5)",
                }}
              />
            </button>
          ))}
        </div>
      )}

      {/* Зогссон үед л зарлана. Байнга "polite" байвал авто-солилт нь
          4.5 секунд тутам уншигчийг тасалж, хуудсыг ашиглах боломжгүй
          болгоно — зарлахгүй байснаас дор. */}
      <p className="sr-only" aria-live={paused ? "polite" : "off"}>
        {active + 1} / {images.length}
      </p>
    </div>
  );
}
