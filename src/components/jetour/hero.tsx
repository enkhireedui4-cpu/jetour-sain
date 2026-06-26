"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ArrowRight } from "lucide-react";
import { HERO_SLIDES } from "@/lib/jetour-data";

export function Hero() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => {
    setActive((p) => (p + 1) % HERO_SLIDES.length);
  }, []);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(next, 6500);
    return () => clearInterval(t);
  }, [next, paused, active]);

  const slide = HERO_SLIDES[active];

  return (
    <section
      id="home"
      className="relative min-h-[92vh] overflow-hidden bg-[#121316]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* === Full-bleed image === */}
      <div className="absolute inset-0">
        <AnimatePresence mode="sync">
          <motion.div
            key={active}
            initial={{ opacity: 0, scale: 1.06 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.4, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <img
              src={slide.image}
              alt={slide.model}
              className="w-full h-full object-cover"
              loading="eager"
            />
          </motion.div>
        </AnimatePresence>

        {/* Зөөлөн харанхуй overlay — текст уншигдахуйц, зургийг дарахгүй */}
        <div className="absolute inset-0 hero-overlay pointer-events-none" />
      </div>

      {/* === Content — зүүн доод буланд, цэвэр === */}
      <div className="relative z-10 min-h-[92vh] flex flex-col justify-end pb-24 lg:pb-28 px-6">
        <div className="mx-auto w-[min(1280px,94vw)]">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex items-center gap-2.5 mb-5"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#E20A17]" />
            <span className="eyebrow text-white/80">Албан ёсны дистрибьютер · Sain Motors</span>
          </motion.div>

          <motion.h1
            key={`title-${active}`}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="font-extrabold tracking-tight text-white max-w-3xl"
            style={{
              fontSize: "clamp(2.5rem, 6.5vw, 5.5rem)",
              lineHeight: 1.02,
              textShadow: "0 4px 30px rgba(0,0,0,0.4)",
            }}
          >
            {slide.model}
          </motion.h1>

          <motion.p
            key={`desc-${active}`}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-lg lg:text-xl text-white/85 mt-4 mb-9 max-w-xl font-light"
            style={{ textShadow: "0 2px 14px rgba(0,0,0,0.5)" }}
          >
            {slide.tagline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex flex-wrap items-center gap-3"
          >
            <button
              onClick={() => document.querySelector("#models")?.scrollIntoView({ behavior: "smooth" })}
              className="btn-electric-jetour px-7 py-3.5 rounded-full text-base flex items-center gap-2"
            >
              Загвар үзэх
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => document.querySelector("#test-drive")?.scrollIntoView({ behavior: "smooth" })}
              className="btn-outline-light px-7 py-3.5 rounded-full text-base"
            >
              Тест драйв захиалах
            </button>
          </motion.div>
        </div>
      </div>

      {/* === Slide indicators === */}
      <div className="absolute bottom-9 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2.5">
        {HERO_SLIDES.map((_, i) => (
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
                transition={{ duration: 6.5, ease: "linear" }}
                className="absolute inset-y-0 left-0 bg-[#E20A17]"
              />
            ) : i === active ? (
              <div className="absolute inset-y-0 left-0 w-full bg-[#E20A17]" />
            ) : null}
          </button>
        ))}
      </div>

      {/* Scroll cue */}
      <motion.button
        onClick={() => document.querySelector("#models")?.scrollIntoView({ behavior: "smooth" })}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 text-white/50 hover:text-white transition-colors"
        aria-label="Доош гүйлгэх"
      >
        <motion.div animate={{ y: [0, 5, 0] }} transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}>
          <ChevronDown className="w-4 h-4" />
        </motion.div>
      </motion.button>
    </section>
  );
}
