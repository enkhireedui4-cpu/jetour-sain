"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";

type HeroModel = {
  id: string; // /special-offers/{id}
  name: string;
  image: string;
};

const MODELS: HeroModel[] = [
  { id: "x70-plus", name: "JETOUR X70 Plus", image: "/models-hero/x70-plus.png" },
  { id: "x50", name: "JETOUR X50", image: "/models-hero/x50.png" },
  { id: "x1", name: "JETOUR X1", image: "/models-hero/x1.png" },
  { id: "t1", name: "JETOUR T1", image: "/models-hero/t1.png" },
];

export function Models() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => setActive((p) => (p + 1) % MODELS.length), []);
  const prev = () => setActive((p) => (p - 1 + MODELS.length) % MODELS.length);

  // Авто-солигдол (~5 сек)
  useEffect(() => {
    if (paused) return;
    const t = setInterval(next, 5000);
    return () => clearInterval(t);
  }, [next, paused, active]);

  return (
    <section id="models" className="bg-white">
      {/* Header */}
      <div className="mx-auto w-[min(1280px,94vw)] pt-14 pb-6">
        <p className="eyebrow eyebrow-electric mb-2">Загварууд</p>
        <h2 className="font-extrabold tracking-tight text-[#17181B] text-3xl lg:text-4xl">
          Танд тохирох JETOUR загвар
        </h2>
      </div>

      {/* Full-width image showcase */}
      <div
        className="relative w-full overflow-hidden bg-[#111]"
        style={{ height: "clamp(420px, 72vh, 820px)" }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* Slides */}
        {MODELS.map((m, i) => (
          <img
            key={m.id}
            src={m.image}
            alt={m.name}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
              i === active ? "opacity-100" : "opacity-0"
            }`}
            loading={i === 0 ? "eager" : "lazy"}
          />
        ))}

        {/* Subtle gradient for button legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

        {/* "Дэлгэрэнгүй мэдээлэл авах" button — bottom left */}
        <div className="absolute bottom-8 left-6 lg:left-10 z-10">
          <Link
            href={`/special-offers/${MODELS[active].id}`}
            className="inline-flex items-center gap-2 bg-[#17181B] text-white px-7 py-3.5 text-sm font-bold rounded-lg hover:bg-[#E20A17] transition-colors"
          >
            Дэлгэрэнгүй мэдээлэл авах
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Arrows + dots — bottom right */}
        <div className="absolute bottom-8 right-6 lg:right-10 z-10 flex flex-col items-end gap-4">
          <div className="flex gap-2">
            <button
              onClick={prev}
              aria-label="Өмнөх"
              className="w-11 h-11 grid place-items-center rounded-lg bg-white/15 backdrop-blur-sm border border-white/40 text-white hover:bg-white hover:text-[#17181B] transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={next}
              aria-label="Дараагийн"
              className="w-11 h-11 grid place-items-center rounded-lg bg-white/15 backdrop-blur-sm border border-white/40 text-white hover:bg-white hover:text-[#17181B] transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
          <div className="flex items-center gap-2">
            {MODELS.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                aria-label={`${i + 1}-р загвар`}
                className={`h-1 rounded-full transition-all ${
                  i === active ? "w-8 bg-white" : "w-4 bg-white/40 hover:bg-white/70"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
