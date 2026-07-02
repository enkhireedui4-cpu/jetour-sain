"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";

type Slide = { id: string; name: string; image: string };

// Цэвэр кино зураг (animation болгоход тохиромжтой) + /special-offers/{id}
const SLIDES: Slide[] = [
  { id: "x70-plus", name: "JETOUR X70 Plus", image: "/models-hero/x70-plus.jpg" },
  { id: "x50", name: "JETOUR X50", image: "/models-hero/x50.jpg" },
  { id: "x1", name: "JETOUR X1", image: "/models-hero/x1.jpg" },
  { id: "t1", name: "JETOUR T1", image: "/models-hero/t1.jpg" },
];

export function Hero() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => setActive((p) => (p + 1) % SLIDES.length), []);
  const prev = () => setActive((p) => (p - 1 + SLIDES.length) % SLIDES.length);

  // Авто-солигдол (5 сек)
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
          className={`absolute inset-0 transition-opacity duration-[900ms] ${
            i === active ? "opacity-100" : "opacity-0"
          }`}
        >
          <img
            src={s.image}
            alt={s.name}
            className="w-full h-full object-cover"
            loading={i === 0 ? "eager" : "lazy"}
            fetchPriority={i === 0 ? "high" : "auto"}
          />
        </div>
      ))}

      {/* Зөөлөн gradient — доод хэсэгт текст уншигдахуйц */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent pointer-events-none" />

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

      {/* === Content — зөвхөн нэр + нэг товч === */}
      <div className="relative z-10 h-full flex flex-col justify-end pb-24 lg:pb-28 px-6">
        <div className="mx-auto w-[min(1280px,94vw)]">
          <motion.h1
            key={`title-${active}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="font-extrabold tracking-tight text-white mb-7"
            style={{
              fontSize: "clamp(2.5rem, 6.5vw, 5.5rem)",
              lineHeight: 1.02,
              textShadow: "0 4px 30px rgba(0,0,0,0.45)",
            }}
          >
            {slide.name}
          </motion.h1>

          <motion.div
            key={`cta-${active}`}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <Link
              href={`/special-offers/${slide.id}`}
              className="inline-flex items-center gap-2 bg-white text-[#17181B] px-8 py-4 rounded-full text-base font-bold hover:bg-[#E20A17] hover:text-white transition-colors"
            >
              Дэлгэрэнгүй мэдээлэл авах
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </div>

      {/* === Slide indicators === */}
      <div className="absolute bottom-9 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2.5">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className="relative h-1 rounded-full overflow-hidden bg-white/30 transition-all"
            style={{ width: i === active ? "36px" : "16px" }}
            aria-label={`${i + 1}-р зураг`}
          >
            {i === active && !paused ? (
              <motion.div
                key={`bar-${active}`}
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 5, ease: "linear" }}
                className="absolute inset-y-0 left-0 bg-[#E20A17]"
              />
            ) : i === active ? (
              <div className="absolute inset-y-0 left-0 w-full bg-[#E20A17]" />
            ) : null}
          </button>
        ))}
      </div>
    </section>
  );
}
