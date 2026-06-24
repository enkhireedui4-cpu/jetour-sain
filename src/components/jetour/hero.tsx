"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ArrowRight, Phone } from "lucide-react";
import { HERO_SLIDES, CONTACT } from "@/lib/jetour-data";

export function Hero() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  const next = useCallback(() => {
    setActive((p) => (p + 1) % HERO_SLIDES.length);
  }, []);

  const prev = useCallback(() => {
    setActive((p) => (p - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  }, []);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(next, 6000);
    return () => clearInterval(t);
  }, [next, paused, active]);

  // Parallax effect
  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const slide = HERO_SLIDES[active];

  return (
    <section
      id="home"
      className="relative h-screen min-h-[680px] overflow-hidden bg-[#0A1F44]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* === Parallax background carousel === */}
      <div
        className="absolute inset-0"
        style={{ transform: `translateY(${scrollY * 0.4}px) scale(${1 + scrollY * 0.0003})` }}
      >
        <AnimatePresence mode="sync">
          <motion.div
            key={active}
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1 }}
            transition={{ duration: 1.6, ease: "easeInOut" }}
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

        {/* Dark gradient overlay for readability */}
        <div className="absolute inset-0 hero-overlay pointer-events-none" />

        {/* Electric blue accent glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(50% 60% at 90% 30%, rgba(0,174,239,0.18), transparent 70%)",
          }}
        />
      </div>

      {/* === Foreground content === */}
      <div className="relative z-10 h-full flex flex-col">
        {/* Spacer for navbar */}
        <div className="pt-32 md:pt-36" />

        {/* Center content */}
        <div className="flex-1 flex items-center">
          <div className="mx-auto w-[min(1280px,94vw)] w-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -40 }}
                transition={{ duration: 0.9, ease: "easeOut" }}
                className="max-w-3xl"
              >
                {/* Eyebrow */}
                <div className="flex items-center gap-3 mb-6">
                  <span className="w-2 h-2 rounded-full bg-[#00AEEF] shadow-[0_0_0_6px_rgba(0,174,239,0.2)]" />
                  <span className="eyebrow text-[#4DD0F5]">{slide.tagline}</span>
                </div>

                {/* Massive title */}
                <h1
                  className="font-display font-extrabold leading-[0.92] tracking-tight mb-6 text-white"
                  style={{
                    fontSize: "clamp(3rem, 8.5vw, 6rem)",
                    textShadow: "0 4px 30px rgba(0,0,0,0.5)",
                  }}
                >
                  {slide.model}
                </h1>

                {/* Description */}
                <p
                  className="text-lg lg:text-2xl text-white/85 mb-9 leading-relaxed max-w-2xl"
                  style={{ textShadow: "0 2px 12px rgba(0,0,0,0.6)" }}
                >
                  {slide.description}
                </p>

                {/* Price + CTAs */}
                <div className="flex flex-wrap items-center gap-6 mb-10">
                  <div>
                    <p className="text-[0.6rem] tracking-[0.22em] uppercase text-[#4DD0F5] font-display mb-1">
                      Үнэ
                    </p>
                    <p
                      className="font-display font-extrabold italic text-3xl lg:text-4xl text-white"
                      style={{ textShadow: "0 4px 20px rgba(0,0,0,0.6)" }}
                    >
                      {slide.price}
                    </p>
                  </div>
                  <div className="h-14 w-px bg-white/20" />
                  <div className="flex flex-wrap items-center gap-3">
                    <button
                      onClick={() =>
                        document.querySelector("#models")?.scrollIntoView({ behavior: "smooth" })
                      }
                      className="btn-electric-jetour px-7 py-3.5 rounded-xl text-base flex items-center gap-2"
                    >
                      Загварууд үзэх
                      <ArrowRight className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() =>
                        document.querySelector("#test-drive")?.scrollIntoView({ behavior: "smooth" })
                      }
                      className="btn-outline-light px-6 py-3.5 rounded-xl text-base flex items-center gap-2"
                    >
                      Тест драйв
                      <ChevronDown className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* === Slide navigation bottom bar === */}
        <div className="pb-10">
          <div className="mx-auto w-[min(1280px,94vw)]">
            <div className="flex items-center justify-between gap-6">
              {/* Slide counter */}
              <div className="flex items-center gap-4">
                <span className="font-display font-extrabold italic text-3xl text-white">
                  0{active + 1}
                </span>
                <div className="flex flex-col">
                  <span className="text-xs text-white/60 font-display tracking-widest">/ 0{HERO_SLIDES.length}</span>
                  <span className="text-[0.55rem] text-white/40 font-display tracking-[0.3em] uppercase">Slide</span>
                </div>
              </div>

              {/* Progress bars */}
              <div className="flex-1 max-w-md flex gap-2">
                {HERO_SLIDES.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActive(i)}
                    className="group flex-1 relative h-1 rounded-full overflow-hidden bg-white/20"
                    aria-label={`Slide ${i + 1}`}
                  >
                    {i === active && !paused ? (
                      <motion.div
                        key={`bar-${active}`}
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 6, ease: "linear" }}
                        className="absolute inset-y-0 left-0 bg-[#00AEEF]"
                      />
                    ) : i === active ? (
                      <div className="absolute inset-y-0 left-0 w-full bg-[#00AEEF]" />
                    ) : null}
                  </button>
                ))}
              </div>

              {/* Phone */}
              <a
                href={CONTACT.phone1Href}
                className="hidden md:flex items-center gap-2 glass-dark rounded-full px-4 py-2.5 text-white hover:bg-white/15 transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-[#4DD0F5]" />
                <span className="font-display text-sm font-bold tracking-wider">{CONTACT.phone1}</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <motion.button
        onClick={() => document.querySelector("#brand")?.scrollIntoView({ behavior: "smooth" })}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute left-1/2 -translate-x-1/2 bottom-3 z-20 flex flex-col items-center gap-1 text-white/70 hover:text-white transition-colors"
        aria-label="Доош гулгах"
      >
        <span className="text-[0.55rem] tracking-[0.3em] uppercase font-display">Илүү</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-4 h-4" />
        </motion.div>
      </motion.button>
    </section>
  );
}
