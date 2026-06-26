"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Props = {
  images: string[];
  alt: string;
  accent: "red" | "blue";
};

export function Gallery({ images, alt, accent }: Props) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => {
    setActive((p) => (p + 1) % images.length);
  }, [images.length]);

  const prev = () => setActive((p) => (p - 1 + images.length) % images.length);

  useEffect(() => {
    if (paused || images.length <= 1) return;
    const t = setInterval(next, 4500);
    return () => clearInterval(t);
  }, [next, paused, images.length]);

  const accentColor = accent === "red" ? "#E20A17" : "#E20A17";

  return (
    <div
      className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-white border border-[#E7E7EA]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <AnimatePresence mode="sync">
        <motion.img
          key={`${alt}-${active}`}
          src={images[active]}
          alt={`${alt} - ${active + 1}`}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
        />
      </AnimatePresence>

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
              onClick={() => setActive(i)}
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

// === Color Selector ===
export type VehicleColor = {
  name: string;
  hex: string;
  image?: string;
};

type ColorSelectorProps = {
  colors: VehicleColor[];
  onColorChange?: (color: VehicleColor) => void;
};

export function ColorSelector({ colors, onColorChange }: ColorSelectorProps) {
  const [active, setActive] = useState(0);

  return (
    <div>
      <div className="flex flex-wrap gap-3 mb-5">
        {colors.map((c, i) => (
          <button
            key={c.name}
            onClick={() => {
              setActive(i);
              onColorChange?.(c);
            }}
            className={`group flex items-center gap-2.5 px-4 py-3 rounded-xl border transition-all ${
              active === i
                ? "border-[#E20A17] bg-[#F0F9FF]"
                : "border-[#E7E7EA] bg-white hover:border-[#17181B]/30"
            }`}
          >
            <span
              className="w-6 h-6 rounded-full border-2 border-white shadow-md"
              style={{ background: c.hex, boxShadow: `0 0 0 1px ${c.hex}40` }}
            />
            <span
              className={`font-display font-bold text-sm ${
                active === i ? "text-[#E20A17]" : "text-[#17181B]"
              }`}
            >
              {c.name}
            </span>
          </button>
        ))}
      </div>
      <p className="text-sm text-[#6B7280]">
        Сонгосон өнгө:{" "}
        <span className="font-display font-bold text-[#17181B]">{colors[active].name}</span>
      </p>
    </div>
  );
}
