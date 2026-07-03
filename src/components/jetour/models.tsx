"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ALL_MODELS_FOR_GRID, MODEL_COLOR_IMAGES, MODEL_GALLERY_IMAGES } from "@/lib/jetour-data";

type M = (typeof ALL_MODELS_FOR_GRID)[number];

const imgOf = (m: M) =>
  MODEL_COLOR_IMAGES[m.id]?.[0]?.image ?? MODEL_GALLERY_IMAGES[m.id]?.[0] ?? m.heroImage;

const priceOf = (m: M) =>
  m.startingPrice ? `${m.startingPrice}-с эхлэн` : m.priceNote ?? "Тун удахгүй";

export function Models() {
  const models = ALL_MODELS_FOR_GRID;
  const [active, setActive] = useState(0);
  const m = models[active];

  return (
    <section id="models" className="bg-white">
      {/* Header */}
      <div className="mx-auto w-[min(1280px,94vw)] pt-14 pb-6">
        <p className="eyebrow eyebrow-electric mb-2">Загварууд</p>
        <h2 className="font-extrabold tracking-tight text-[#17181B] text-3xl lg:text-4xl">
          Танд тохирох JETOUR загвар
        </h2>
      </div>

      {/* Tab strip */}
      <div className="border-t border-[#E7E7EA] overflow-x-auto">
        <div className="mx-auto w-[min(1280px,94vw)] flex gap-1 py-2">
          {models.map((mm, i) => (
            <button
              key={mm.id}
              onClick={() => setActive(i)}
              className={`shrink-0 px-5 py-2.5 rounded-lg text-sm font-bold transition-all whitespace-nowrap ${
                i === active
                  ? "bg-[#17181B] text-white"
                  : "text-[#54585F] hover:text-[#17181B] hover:bg-[#F5F5F6]"
              }`}
            >
              {mm.name}
            </button>
          ))}
        </div>
      </div>

      {/* Full-width image showcase */}
      <div className="relative w-full overflow-hidden bg-[#111]" style={{ minHeight: "62vh" }}>
        <AnimatePresence mode="wait">
          <motion.img
            key={m.id}
            src={imgOf(m)}
            alt={m.name}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="w-full object-cover"
            style={{ minHeight: "62vh", maxHeight: "78vh" }}
          />
        </AnimatePresence>

        {/* Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent pointer-events-none" />

        {/* Coming soon */}
        {m.status === "coming-soon" && (
          <span className="absolute top-5 left-6 text-[0.6rem] font-bold tracking-[0.18em] uppercase px-3 py-1.5 rounded-full bg-[#E20A17] text-white">
            Тун удахгүй
          </span>
        )}

        {/* Bottom overlay */}
        <div className="absolute bottom-0 left-0 right-0 px-6 lg:px-10 pb-8 flex items-end justify-between gap-4 flex-wrap">
          {/* Left: CTAs */}
          <div className="flex gap-3 flex-wrap">
            <button
              onClick={() =>
                document.querySelector("#dealer")?.scrollIntoView({ behavior: "smooth" })
              }
              className="bg-white/15 backdrop-blur-sm border border-white/40 text-white px-7 py-3 text-sm font-bold rounded-lg hover:bg-white/25 transition-colors"
            >
              Хүсэлт илгээх
            </button>
            <Link
              href={`/models/${m.id}`}
              className="bg-white text-[#17181B] px-7 py-3 text-sm font-bold rounded-lg hover:bg-[#E20A17] hover:text-white transition-colors"
            >
              Дэлгэрэнгүй үзэх
            </Link>
          </div>

          {/* Right: Model name + price */}
          <div className="text-right">
            <p className="text-white/55 text-sm font-medium mb-0.5">{priceOf(m)}</p>
            <h3 className="font-extrabold text-3xl lg:text-5xl text-white tracking-tight leading-none">
              {m.name}
            </h3>
          </div>
        </div>
      </div>
    </section>
  );
}
