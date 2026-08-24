"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { BLUR_DATA_URL } from "@/lib/image";
import { useDragSwipe } from "@/hooks/use-drag";
import { cyclicOffset, slideJumped } from "@/lib/slider";

type Props = {
  images: string[];
  alt: string;
  accent: "red" | "blue";
};

export function Gallery({ images, alt, accent }: Props) {
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
    const t = setInterval(next, 4500);
    return () => clearInterval(t);
  }, [next, paused, images.length]);

  const accentColor = accent === "red" ? "#E20A17" : "#E20A17";

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

  return (
    <div
      className={`relative aspect-[16/10] rounded-2xl overflow-hidden bg-white border border-[#E7E7EA] ${
        images.length > 1 ? swipe.className : ""
      }`}
      style={images.length > 1 ? swipe.style : undefined}
      {...(images.length > 1 ? swipe.handlers : {})}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
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

      {/* Bottom progress dots */}
      {images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setNav((s) => ({ active: i, from: s.active }))}
              className="h-1.5 rounded-full transition-all"
              style={{
                width: i === active ? "28px" : "8px",
                background: i === active ? accentColor : "rgba(255,255,255,0.5)",
              }}
              aria-label={`Зураг ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
