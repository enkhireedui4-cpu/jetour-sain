"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ArrowRight } from "lucide-react";
import { HERO_SLIDES } from "@/lib/jetour-data";

export function Hero() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  const next = useCallback(() => {
    setActive((p) => (p + 1) % HERO_SLIDES.length);
  }, []);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(next, 6500);
    return () => clearInterval(t);
  }, [next, paused, active]);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const slide = HERO_SLIDES[active];

  return (
    <section
      id="home"
      className="relative min-h-screen overflow-hidden bg-[#0A1F44]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* === Cinematic parallax background === */}
      <div
        className="absolute inset-0"
        style={{ transform: `translateY(${scrollY * 0.4}px) scale(${1 + scrollY * 0.0003})` }}
      >
        <AnimatePresence mode="sync">
          <motion.div
            key={active}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1 }}
            transition={{ duration: 1.8, ease: "easeInOut" }}
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

        {/* Premium dark gradient overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(180deg, rgba(10,31,68,0.55) 0%, rgba(10,31,68,0.25) 35%, rgba(10,31,68,0.55) 75%, rgba(10,31,68,0.9) 100%)",
          }}
        />

        {/* Subtle electric blue glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(60% 60% at 50% 80%, rgba(0,174,239,0.18), transparent 70%)",
          }}
        />
      </div>

      {/* === Centered minimal content === */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="flex items-center gap-3 mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-[#00AEEF] shadow-[0_0_0_6px_rgba(0,174,239,0.18)]" />
          <span className="eyebrow text-[#4DD0F5]">Official Distributor · Sain Motors</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.45, ease: "easeOut" }}
          className="font-display font-extrabold italic tracking-tight text-white mb-6"
          style={{
            fontSize: "clamp(3.5rem, 11vw, 9rem)",
            lineHeight: 0.9,
            textShadow: "0 8px 40px rgba(0,0,0,0.5)",
          }}
        >
          JETOUR MONGOLIA
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="text-xl lg:text-2xl text-white/90 mb-12 max-w-2xl font-light"
          style={{ textShadow: "0 2px 16px rgba(0,0,0,0.6)" }}
        >
          Your Next Adventure Starts Here
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <button
            onClick={() => document.querySelector("#models")?.scrollIntoView({ behavior: "smooth" })}
            className="btn-electric-jetour px-8 py-4 rounded-xl text-base flex items-center gap-2"
          >
            Explore Models
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => document.querySelector("#test-drive")?.scrollIntoView({ behavior: "smooth" })}
            className="btn-outline-light px-8 py-4 rounded-xl text-base"
          >
            Book Test Drive
          </button>
        </motion.div>
      </div>

      {/* === Minimal slide progress (bottom) === */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex items-center gap-3">
        {HERO_SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className="group relative h-1 rounded-full overflow-hidden bg-white/25 transition-all"
            style={{ width: i === active ? "40px" : "20px" }}
            aria-label={`Slide ${i + 1}`}
          >
            {i === active && !paused ? (
              <motion.div
                key={`bar-${active}`}
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 6.5, ease: "linear" }}
                className="absolute inset-y-0 left-0 bg-[#00AEEF]"
              />
            ) : i === active ? (
              <div className="absolute inset-y-0 left-0 w-full bg-[#00AEEF]" />
            ) : null}
          </button>
        ))}
      </div>

      {/* Scroll cue */}
      <motion.button
        onClick={() => document.querySelector("#models")?.scrollIntoView({ behavior: "smooth" })}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1 text-white/60 hover:text-white transition-colors"
        aria-label="Доош гулгах"
      >
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
