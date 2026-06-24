"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Gauge, Cog, CircleDot, Users, Zap, Route } from "lucide-react";
import { MODELS, type JetourModel } from "@/lib/jetour-data";

export function Models() {
  const [activeId, setActiveId] = useState(MODELS[0].id);
  const active = MODELS.find((m) => m.id === activeId)!;

  return (
    <section id="models" className="relative py-24 lg:py-32 bg-ink-2/40 border-y border-line overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />
      <div className="relative mx-auto w-[min(1180px,92vw)]">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div>
            <p className="eyebrow mb-3">
              <span className="text-jetour-red">02</span> · Загварын багц
            </p>
            <h2 className="font-display font-extrabold italic leading-[0.95] text-paper text-4xl lg:text-6xl">
              Өөрт тохирох <span className="text-gradient-fire">JETOUR</span>-оо ол.
            </h2>
          </div>
          <p className="text-chrome max-w-md text-sm lg:text-base leading-relaxed">
            Хотын кросовероос аяллын баатарт SUV хүртэл — өөрийн амьдралын хэв маягт тохирох загвараа
            сонгоорой. Бүх загвар Монголд албан ёсоор, {`Сайн Моторс`}-оор баталгаажуулсан.
          </p>
        </div>

        {/* Model selector tabs */}
        <div className="flex flex-wrap gap-2 mb-8 border-b border-line pb-1">
          {MODELS.map((m) => (
            <button
              key={m.id}
              onClick={() => setActiveId(m.id)}
              className={`font-display font-extrabold italic text-base lg:text-xl px-5 py-3 transition-all relative ${
                activeId === m.id
                  ? "text-paper"
                  : "text-muted-ink hover:text-chrome"
              }`}
            >
              {m.name}
              {activeId === m.id && (
                <motion.span
                  layoutId="activeModel"
                  className="absolute bottom-0 left-0 right-0 h-0.5"
                  style={{ background: "linear-gradient(90deg, #E2231A, #2B6FE0)" }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Active model showcase */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="grid lg:grid-cols-[1.3fr_1fr] gap-8 lg:gap-12 items-start"
          >
            {/* Left — large image */}
            <div className="relative aspect-[16/10] rounded-2xl overflow-hidden glass">
              <img
                src={active.image}
                alt={active.name}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(180deg, transparent 0%, transparent 40%, rgba(7,10,20,0.85) 100%)",
                }}
              />
              <div className="absolute top-5 left-5">
                <span
                  className={`font-display text-[0.62rem] font-bold tracking-[0.22em] uppercase px-3 py-1.5 rounded-full glass ${
                    active.accent === "red" ? "text-jetour-red-soft" : "text-jetour-blue-soft"
                  }`}
                >
                  {active.series} Series
                </span>
              </div>
              <div className="absolute bottom-5 left-5 right-5">
                <p
                  className={`eyebrow mb-1.5 ${
                    active.accent === "red" ? "text-jetour-red-soft" : "text-jetour-blue-soft"
                  }`}
                >
                  {active.tagline}
                </p>
                <h3 className="font-display font-extrabold italic text-4xl lg:text-5xl text-paper">
                  {active.name}
                </h3>
              </div>
            </div>

            {/* Right — details */}
            <div className="flex flex-col">
              <p className="text-chrome text-sm lg:text-base leading-relaxed mb-5">
                {active.longDescription}
              </p>

              {/* Spec grid */}
              <div className="grid grid-cols-2 gap-2.5 mb-5">
                <Spec icon={<Gauge className="w-3.5 h-3.5" />} label="Хөдөлгүүр" value={active.specs.engine} />
                <Spec icon={<CircleDot className="w-3.5 h-3.5" />} label="Хүчин чадал" value={active.specs.power} />
                <Spec icon={<Cog className="w-3.5 h-3.5" />} label="Хурдны хайрцаг" value={active.specs.transmission} />
                <Spec icon={<Users className="w-3.5 h-3.5" />} label="Суудал" value={active.specs.seats} />
                <Spec icon={<Zap className="w-3.5 h-3.5" />} label="Хамгийн өндөр хурд" value={active.specs.topSpeed} />
                <Spec icon={<Route className="w-3.5 h-3.5" />} label="Аяллын зай" value={active.specs.range} />
              </div>

              {/* Highlights */}
              <div className="grid grid-cols-2 gap-2.5 mb-6">
                {active.highlights.map((h) => (
                  <div
                    key={h.label}
                    className={`rounded-xl p-3.5 border ${
                      active.accent === "red"
                        ? "bg-jetour-red/10 border-jetour-red/30"
                        : "bg-jetour-blue/10 border-jetour-blue/30"
                    }`}
                  >
                    <p className="text-[0.6rem] tracking-[0.18em] uppercase text-muted-ink font-display">
                      {h.label}
                    </p>
                    <p
                      className={`font-display font-extrabold italic text-base mt-0.5 ${
                        active.accent === "red" ? "text-jetour-red-soft" : "text-jetour-blue-soft"
                      }`}
                    >
                      {h.value}
                    </p>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <a
                href={`#contact`}
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
                }}
                className={`group flex items-center justify-center gap-2 w-full py-3.5 rounded-xl font-display font-bold text-sm transition-all ${
                  active.accent === "red"
                    ? "bg-jetour-red/15 text-jetour-red-soft hover:bg-jetour-red hover:text-white"
                    : "bg-jetour-blue/15 text-jetour-blue-soft hover:bg-jetour-blue hover:text-white"
                }`}
              >
                {active.name} — холбоо барих
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* All models mini-grid */}
        <div className="mt-14 pt-10 border-t border-line">
          <p className="eyebrow text-center mb-6">Бүх загварууд</p>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {MODELS.map((m) => (
              <button
                key={m.id}
                onClick={() => {
                  setActiveId(m.id);
                  document.querySelector("#models")?.scrollIntoView({ behavior: "smooth" });
                }}
                className={`group relative aspect-[4/3] rounded-xl overflow-hidden glass ${
                  activeId === m.id ? "ring-2 ring-jetour-red" : ""
                }`}
              >
                <img
                  src={m.image}
                  alt={m.name}
                  className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/60 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 text-left">
                  <p
                    className={`text-[0.55rem] tracking-[0.2em] uppercase font-display ${
                      m.accent === "red" ? "text-jetour-red-soft" : "text-jetour-blue-soft"
                    }`}
                  >
                    {m.series}
                  </p>
                  <p className="font-display font-extrabold italic text-sm text-paper mt-0.5">
                    {m.name}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Spec({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-2 bg-ink/60 border border-line rounded-lg px-3 py-2.5">
      <span className="text-muted-ink">{icon}</span>
      <div className="min-w-0 flex-1">
        <p className="text-[0.55rem] tracking-[0.18em] uppercase text-muted-ink font-display">
          {label}
        </p>
        <p className="text-xs font-bold text-paper truncate">{value}</p>
      </div>
    </div>
  );
}
