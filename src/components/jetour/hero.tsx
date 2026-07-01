"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { SPECIAL_OFFERS } from "@/lib/jetour-data";

// Үнэ / зээлийн нөхцөл шигтгэсэн баннерууд (SAIN MOTORS постерууд)
const SLIDES = SPECIAL_OFFERS;

export function Hero() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => setActive((p) => (p + 1) % SLIDES.length), []);
  const prev = () => setActive((p) => (p - 1 + SLIDES.length) % SLIDES.length);

  // Авто-солигдол (~5 сек)
  useEffect(() => {
    if (paused) return;
    const t = setInterval(next, 5000);
    return () => clearInterval(t);
  }, [next, paused, active]);

  const slide = SLIDES[active];

  return (
    <section
      id="home"
      className="relative h-screen min-h-[560px] overflow-hidden bg-[#0E0E10]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* === Slides === */}
      {SLIDES.map((s, i) => (
        <div
          key={s.id}
          className={`absolute inset-0 transition-opacity duration-700 ${
            i === active ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* Бүдэг дэвсгэр — дэлгэцийг дүүргэнэ */}
          <img
            src={s.poster}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover scale-110 blur-2xl opacity-40"
          />
          <div className="absolute inset-0 bg-black/25" />
          {/* Тод постер — бүтэн харагдана (тал тастрахгүй) */}
          <img
            src={s.poster}
            alt={s.modelName}
            className="absolute inset-0 w-full h-full object-contain"
            loading={i === 0 ? "eager" : "lazy"}
          />
        </div>
      ))}

      {/* === Prev / Next arrows === */}
      <button
        onClick={prev}
        aria-label="Өмнөх"
        className="absolute left-4 lg:left-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 lg:w-14 lg:h-14 grid place-items-center rounded-full bg-white/15 backdrop-blur-sm border border-white/30 text-white hover:bg-white hover:text-[#17181B] transition-colors"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={next}
        aria-label="Дараагийн"
        className="absolute right-4 lg:right-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 lg:w-14 lg:h-14 grid place-items-center rounded-full bg-white/15 backdrop-blur-sm border border-white/30 text-white hover:bg-white hover:text-[#17181B] transition-colors"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* === "Дэлгэрэнгүй мэдээлэл авах" товч === */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10">
        <Link
          href={`/special-offers/${slide.id}`}
          className="inline-flex items-center gap-2 bg-white text-[#17181B] px-7 py-3.5 text-sm font-bold rounded-lg shadow-lg hover:bg-[#E20A17] hover:text-white transition-colors"
        >
          Дэлгэрэнгүй мэдээлэл авах
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* === Slide indicators === */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            aria-label={`${i + 1}-р баннер`}
            className={`h-1 rounded-full transition-all ${
              i === active ? "w-8 bg-[#E20A17]" : "w-4 bg-white/40 hover:bg-white/70"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
