"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Gauge,
  Cog,
  CircleDot,
  Users,
  Zap,
  Route,
  Wind,
  ShieldCheck,
  Clock,
  CheckCircle2,
} from "lucide-react";
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
            Хотын кросовероос аяллын SUV хүртэл — өөрийн амьдралын хэв маягт тохирох загвараа
            сонгоорой. Бүх загвар Сайн Моторсоор албан ёсоор баталгаажуулсан.
          </p>
        </div>

        {/* Model selector tabs */}
        <div className="flex flex-wrap gap-1 mb-8 border-b border-line pb-1 overflow-x-auto">
          {MODELS.map((m) => (
            <button
              key={m.id}
              onClick={() => setActiveId(m.id)}
              className={`font-display font-extrabold italic text-sm lg:text-lg px-4 lg:px-5 py-3 transition-all relative whitespace-nowrap ${
                activeId === m.id ? "text-paper" : "text-muted-ink hover:text-chrome"
              }`}
            >
              {m.name}
              {m.status === "coming-soon" && (
                <span className="ml-1.5 text-[0.5rem] tracking-wider uppercase bg-jetour-red/20 text-jetour-red-soft px-1.5 py-0.5 rounded font-display not-italic align-middle">
                  Uдахгүй
                </span>
              )}
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
                    "linear-gradient(180deg, transparent 0%, transparent 40%, rgba(7,10,20,0.92) 100%)",
                }}
              />
              <div className="absolute top-5 left-5 flex gap-2">
                <span
                  className={`font-display text-[0.62rem] font-bold tracking-[0.22em] uppercase px-3 py-1.5 rounded-full glass ${
                    active.accent === "red" ? "text-jetour-red-soft" : "text-jetour-blue-soft"
                  }`}
                >
                  {active.series} Series
                </span>
                {active.status === "coming-soon" && (
                  <span className="font-display text-[0.62rem] font-bold tracking-[0.22em] uppercase px-3 py-1.5 rounded-full bg-jetour-red text-white flex items-center gap-1.5">
                    <Clock className="w-3 h-3" />
                    Тун удахгүй
                  </span>
                )}
              </div>
              <div className="absolute bottom-5 left-5 right-5">
                <p
                  className={`eyebrow mb-1.5 ${
                    active.accent === "red" ? "text-jetour-red-soft" : "text-jetour-blue-soft"
                  }`}
                >
                  {active.tagline}
                </p>
                <h3 className="font-display font-extrabold italic text-3xl lg:text-5xl text-paper">
                  {active.name}
                </h3>
              </div>
            </div>

            {/* Right — details */}
            <div className="flex flex-col">
              <p className="text-chrome text-sm lg:text-base leading-relaxed mb-5">
                {active.longDescription}
              </p>

              {/* Price block */}
              <div
                className={`rounded-xl p-4 mb-5 border ${
                  active.accent === "red"
                    ? "bg-jetour-red/10 border-jetour-red/30"
                    : "bg-jetour-blue/10 border-jetour-blue/30"
                }`}
              >
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-[0.6rem] tracking-[0.22em] uppercase text-muted-ink font-display mb-0.5">
                      {active.price ? "Үнэ" : "Статус"}
                    </p>
                    <p
                      className={`font-display font-extrabold italic text-2xl lg:text-3xl ${
                        active.accent === "red"
                          ? "text-jetour-red-soft"
                          : "text-jetour-blue-soft"
                      }`}
                    >
                      {active.price ?? active.priceNote}
                    </p>
                    {active.priceNote && active.price && (
                      <p className="text-xs text-chrome mt-0.5">{active.priceNote}</p>
                    )}
                  </div>
                  {active.status === "available" && (
                    <span className="flex items-center gap-1.5 text-xs text-jetour-red-soft">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Бэлэн
                    </span>
                  )}
                </div>
              </div>

              {/* Spec grid */}
              <div className="grid grid-cols-2 gap-2.5 mb-5">
                <Spec icon={<Gauge className="w-3.5 h-3.5" />} label="Хөдөлгүүр" value={active.specs.engine} />
                <Spec icon={<Zap className="w-3.5 h-3.5" />} label="Морины хүч" value={active.specs.power} />
                <Spec icon={<CircleDot className="w-3.5 h-3.5" />} label="Мушгих хүч" value={active.specs.torque} />
                <Spec icon={<Cog className="w-3.5 h-3.5" />} label="Хурдны хайрцаг" value={active.specs.transmission} />
                <Spec icon={<Wind className="w-3.5 h-3.5" />} label="Хөтлөгч" value={active.specs.drivetrain} />
                <Spec icon={<Users className="w-3.5 h-3.5" />} label="Суудал" value={active.specs.seats} />
              </div>

              {/* Safety */}
              <div className="mb-5">
                <p className="text-[0.6rem] tracking-[0.22em] uppercase text-muted-ink font-display mb-2 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Аюулгүй байдлын систем
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {active.safety.map((s) => (
                    <span
                      key={s}
                      className="text-[0.65rem] font-mono bg-ink/60 border border-line rounded px-2 py-1 text-chrome"
                    >
                      {s}
                    </span>
                  ))}
                </div>
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
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
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
                  <p className="text-[0.6rem] text-chrome mt-0.5">
                    {m.price ?? m.priceNote}
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
