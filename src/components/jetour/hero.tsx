"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Phone, ArrowRight, Sparkles } from "lucide-react";
import { HERO_SLIDES, CONTACT } from "@/lib/jetour-data";

export function Hero() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => {
    setActive((p) => (p + 1) % HERO_SLIDES.length);
  }, []);

  const prev = useCallback(() => {
    setActive((p) => (p - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  }, []);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(next, 5500);
    return () => clearInterval(t);
  }, [next, paused, active]);

  const slide = HERO_SLIDES[active];
  const isRed = slide.accent === "red";

  return (
    <section
      className="relative min-h-screen overflow-hidden bg-white"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* === Full-screen rotating background carousel === */}
      <div className="absolute inset-0">
        <AnimatePresence mode="sync">
          <motion.div
            key={active}
            initial={{ opacity: 0, scale: 1.06 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1 }}
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

        {/* Light gradient overlays — keeps the car visible but text readable on top */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(90deg, rgba(255,255,255,0.96) 0%, rgba(255,255,255,0.82) 22%, rgba(255,255,255,0.25) 55%, rgba(255,255,255,0.5) 100%), linear-gradient(180deg, rgba(255,255,255,0.6) 0%, transparent 30%, rgba(255,255,255,0.92) 100%)",
          }}
        />

        {/* Soft accent glow (changes color per slide) */}
        <motion.div
          key={`glow-${active}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 pointer-events-none"
          style={{
            background: isRed
              ? "radial-gradient(60% 80% at 12% 50%, rgba(226,35,26,0.18), transparent 70%)"
              : "radial-gradient(60% 80% at 12% 50%, rgba(43,111,224,0.18), transparent 70%)",
          }}
        />

        {/* Subtle grid texture */}
        <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none" />
      </div>

      {/* === Foreground content === */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Top spacer for navbar */}
        <div className="pt-24" />

        {/* Center content */}
        <div className="flex-1 flex items-center">
          <div className="mx-auto w-[min(1280px,94vw)] w-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="max-w-2xl"
              >
                {/* Eyebrow */}
                <div className="flex items-center gap-3 mb-5">
                  <span
                    className={`w-2 h-2 rounded-full ${
                      isRed ? "bg-[#E2231A]" : "bg-[#2B6FE0]"
                    } shadow-[0_0_0_5px_rgba(0,0,0,0.05)]`}
                  />
                  <span
                    className={`eyebrow ${
                      isRed ? "text-[#E2231A]" : "text-[#2B6FE0]"
                    }`}
                  >
                    {slide.tagline}
                  </span>
                </div>

                {/* Title — massive gradient */}
                <h1 className="font-display font-extrabold italic leading-[0.84] tracking-tight mb-6">
                  <span
                    className="block text-[#0B0F1A]"
                    style={{
                      fontSize: "clamp(3rem, 9vw, 6.5rem)",
                    }}
                  >
                    {slide.model}
                  </span>
                </h1>

                {/* Description */}
                <p
                  className="text-lg lg:text-xl text-[#5B6477] mb-8 leading-relaxed max-w-xl"
                >
                  {slide.description}
                </p>

                {/* Price + CTAs */}
                <div className="flex flex-wrap items-center gap-5 mb-10">
                  <div>
                    <p className="text-[0.6rem] tracking-[0.22em] uppercase text-[#8A93A6] font-display mb-1">
                      Үнэ
                    </p>
                    <p
                      className={`font-display font-extrabold italic text-3xl lg:text-4xl ${
                        isRed ? "text-[#E2231A]" : "text-[#2B6FE0]"
                      }`}
                    >
                      {slide.price}
                    </p>
                  </div>
                  <div className="h-12 w-px bg-[#E5E9F0]" />
                  <button
                    onClick={() =>
                      document.querySelector("#models")?.scrollIntoView({ behavior: "smooth" })
                    }
                    className="btn-jetour px-6 py-3.5 rounded-xl text-base flex items-center gap-2"
                  >
                    Дэлгэрэнгүй
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <a
                    href={CONTACT.phone1Href}
                    className="font-display font-semibold text-[#0B0F1A] border border-[#E5E9F0] bg-white rounded-xl px-5 py-3.5 text-sm flex items-center gap-2.5 hover:border-[#0B0F1A]/30 transition-colors"
                  >
                    <Phone className="w-4 h-4 text-[#E2231A]" />
                    {CONTACT.phone1}
                  </a>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* === Slide navigation bottom bar === */}
        <div className="pb-10">
          <div className="mx-auto w-[min(1280px,94vw)]">
            <div className="flex items-center justify-between gap-6">
              {/* Slide counter + controls */}
              <div className="flex items-center gap-4">
                <span className="font-display font-extrabold italic text-2xl text-[#0B0F1A]">
                  0{active + 1}
                </span>
                <span className="font-display text-sm text-[#8A93A6]">/ 0{HERO_SLIDES.length}</span>
                <div className="flex gap-1.5 ml-3">
                  <button
                    onClick={prev}
                    className="w-9 h-9 rounded-full border border-[#E5E9F0] bg-white grid place-items-center text-[#5B6477] hover:text-[#0B0F1A] hover:border-[#0B0F1A]/30 transition-colors"
                    aria-label="Өмнөх"
                  >
                    <ChevronDown className="w-4 h-4 rotate-90" />
                  </button>
                  <button
                    onClick={next}
                    className="w-9 h-9 rounded-full border border-[#E5E9F0] bg-white grid place-items-center text-[#5B6477] hover:text-[#0B0F1A] hover:border-[#0B0F1A]/30 transition-colors"
                    aria-label="Дараагийн"
                  >
                    <ChevronDown className="w-4 h-4 -rotate-90" />
                  </button>
                </div>
              </div>

              {/* Progress bars */}
              <div className="flex-1 max-w-md flex gap-2">
                {HERO_SLIDES.map((s, i) => (
                  <button
                    key={i}
                    onClick={() => setActive(i)}
                    className="group flex-1 relative h-1 rounded-full overflow-hidden bg-[#E5E9F0]"
                    aria-label={`Slide ${i + 1}`}
                  >
                    {i === active && !paused ? (
                      <motion.div
                        key={`bar-${active}`}
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 5.5, ease: "linear" }}
                        className={`absolute inset-y-0 left-0 ${
                          isRed ? "bg-[#E2231A]" : "bg-[#2B6FE0]"
                        }`}
                      />
                    ) : i === active ? (
                      <div
                        className={`absolute inset-y-0 left-0 w-full ${
                          isRed ? "bg-[#E2231A]" : "bg-[#2B6FE0]"
                        }`}
                      />
                    ) : null}
                  </button>
                ))}
              </div>

              {/* Feature mini-chip */}
              <div className="hidden md:flex items-center gap-2 bg-white border border-[#E5E9F0] rounded-full px-4 py-2">
                <Sparkles className="w-3.5 h-3.5 text-[#E2231A]" />
                <span className="text-xs text-[#5B6477] font-display tracking-wider">
                  Travel+ · Албан ёсны
                </span>
              </div>
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
        className="absolute left-1/2 -translate-x-1/2 bottom-4 z-20 flex flex-col items-center gap-1 text-[#8A93A6] hover:text-[#0B0F1A] transition-colors"
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
