"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Gauge,
  Cog,
  CircleDot,
  Users,
  Zap,
  Wind,
  ShieldCheck,
  Clock,
  CheckCircle2,
  Ruler,
  Navigation,
  ArrowRight,
} from "lucide-react";
import { MODELS, CONTACT } from "@/lib/jetour-data";

type Tab = "exterior" | "interior" | "specs";

export function Models() {
  const [activeId, setActiveId] = useState(MODELS[0].id);
  const [tab, setTab] = useState<Tab>("exterior");
  const [imgIdx, setImgIdx] = useState(0);
  const [paused, setPaused] = useState(false);

  const active = MODELS.find((m) => m.id === activeId)!;

  const images =
    tab === "exterior" ? active.exteriorImages : tab === "interior" ? active.interiorImages : active.gallery;
  const imgCount = images.length;

  // Auto-rotate — only depends on count + paused, not the index, to avoid resetting each tick
  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => {
      setImgIdx((p) => (p + 1) % imgCount);
    }, 4000);
    return () => clearInterval(t);
  }, [paused, imgCount]);

  const nextImg = () => setImgIdx((p) => (p + 1) % imgCount);
  const prevImg = () => setImgIdx((p) => (p - 1 + imgCount) % imgCount);

  const switchModel = (id: string) => {
    setActiveId(id);
    setTab("exterior");
    setImgIdx(0);
  };

  const switchTab = (t: Tab) => {
    setTab(t);
    setImgIdx(0);
  };

  return (
    <section
      id="models"
      className="light-theme relative py-20 lg:py-28 bg-light-bg border-y border-light-line"
    >
      {/* Soft accent bg */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            active.accent === "red"
              ? "radial-gradient(50% 50% at 80% 20%, rgba(226,35,26,0.06), transparent 70%), radial-gradient(40% 40% at 10% 90%, rgba(43,111,224,0.04), transparent 70%)"
              : "radial-gradient(50% 50% at 80% 20%, rgba(43,111,224,0.06), transparent 70%), radial-gradient(40% 40% at 10% 90%, rgba(226,35,26,0.04), transparent 70%)",
        }}
      />

      <div className="relative mx-auto w-[min(1280px,94vw)]">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div>
            <p className="eyebrow mb-3">
              <span style={{ color: "#E2231A" }}>02</span> · Загварын багц
            </p>
            <h2
              className="font-display font-extrabold italic leading-[0.95] text-5xl lg:text-7xl"
              style={{ color: "#0B0F1A" }}
            >
              Өөрт тохирох{" "}
              <span
                style={{
                  background: "linear-gradient(96deg, #E2231A 8%, #1A2C5B 48%, #2B6FE0 92%)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                }}
              >
                JETOUR
              </span>
              -оо ол.
            </h2>
          </div>
          <p
            className="max-w-md text-base leading-relaxed"
            style={{ color: "#5B6477" }}
          >
            Хотын кросовероос аяллын SUV хүртэл — өөрийн амьдралын хэв маягт тохирох загвараа сонгоорой. Бүх загвар Сайн Моторсоор албан ёсоор баталгаажуулсан.
          </p>
        </div>

        {/* Horizontal model selector */}
        <div className="flex gap-2 mb-10 overflow-x-auto pb-2 -mx-2 px-2">
          {MODELS.map((m) => (
            <button
              key={m.id}
              onClick={() => switchModel(m.id)}
              className={`group shrink-0 rounded-2xl px-5 py-4 transition-all border ${
                activeId === m.id
                  ? "border-transparent text-white shadow-lg"
                  : "border-light-line bg-white hover:border-paper"
              }`}
              style={
                activeId === m.id
                  ? {
                      background:
                        m.accent === "red"
                          ? "linear-gradient(135deg, #E2231A, #B0151C)"
                          : "linear-gradient(135deg, #2B6FE0, #1A2C5B)",
                      boxShadow:
                        m.accent === "red"
                          ? "0 12px 32px -10px rgba(226,35,26,0.45)"
                          : "0 12px 32px -10px rgba(43,111,224,0.45)",
                    }
                  : {}
              }
            >
              <div className="text-left">
                <p
                  className="text-[0.55rem] tracking-[0.22em] uppercase font-display mb-0.5"
                  style={{
                    color: activeId === m.id ? "rgba(255,255,255,0.8)" : "#8A93A6",
                  }}
                >
                  {m.series}
                </p>
                <p className="font-display font-extrabold italic text-base whitespace-nowrap">
                  {m.name}
                </p>
              </div>
            </button>
          ))}
        </div>

        {/* === Active model showcase === */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            {/* Model title strip */}
            <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
              <div>
                <p
                  className="text-[0.65rem] tracking-[0.22em] uppercase font-display mb-1"
                  style={{ color: active.accent === "red" ? "#E2231A" : "#2B6FE0" }}
                >
                  {active.tagline}
                </p>
                <h3
                  className="font-display font-extrabold italic text-4xl lg:text-6xl"
                  style={{ color: "#0B0F1A" }}
                >
                  {active.name}
                </h3>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p
                    className="text-[0.6rem] tracking-[0.22em] uppercase font-display"
                    style={{ color: "#8A93A6" }}
                  >
                    {active.price ? "Үнэ" : "Статус"}
                  </p>
                  <p
                    className="font-display font-extrabold italic text-2xl lg:text-3xl"
                    style={{ color: active.accent === "red" ? "#E2231A" : "#2B6FE0" }}
                  >
                    {active.price ?? active.priceNote}
                  </p>
                  {active.priceNote && active.price && (
                    <p className="text-xs" style={{ color: "#5B6477" }}>
                      {active.priceNote}
                    </p>
                  )}
                </div>
                {active.status === "available" ? (
                  <span
                    className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full"
                    style={{ background: "rgba(34,197,94,0.1)", color: "#16a34a" }}
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Бэлэн
                  </span>
                ) : (
                  <span
                    className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full text-white"
                    style={{ background: "linear-gradient(95deg, #E2231A, #B0151C)" }}
                  >
                    <Clock className="w-3.5 h-3.5" />
                    Тун удахгүй
                  </span>
                )}
              </div>
            </div>

            {/* Tab navigation (Exterior / Interior / Specs) */}
            <div
              className="flex gap-1 mb-6 border-b"
              style={{ borderColor: "#E5E9F0" }}
            >
              {([
                { id: "exterior", label: "Экстерьер" },
                { id: "interior", label: "Интерьер" },
                { id: "specs", label: "Техник үзүүлэлт" },
              ] as const).map((t) => (
                <button
                  key={t.id}
                  onClick={() => switchTab(t.id)}
                  className="font-display font-bold text-sm lg:text-base px-5 py-3 transition-colors relative"
                  style={{
                    color: tab === t.id ? "#0B0F1A" : "#8A93A6",
                  }}
                >
                  {t.label}
                  {tab === t.id && (
                    <motion.span
                      layoutId="activeTab"
                      className="absolute bottom-0 left-0 right-0 h-0.5"
                      style={{
                        background:
                          active.accent === "red"
                            ? "linear-gradient(90deg, #E2231A, #FF4A42)"
                            : "linear-gradient(90deg, #2B6FE0, #5B9BFF)",
                      }}
                    />
                  )}
                </button>
              ))}
            </div>

            {/* === Image carousel + content === */}
            <div className="grid lg:grid-cols-[1.3fr_1fr] gap-8 lg:gap-10">
              {/* Carousel */}
              <div
                className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-white"
                style={{ border: "1px solid #E5E9F0", boxShadow: "0 16px 40px -16px rgba(11,15,26,0.18)" }}
                onMouseEnter={() => setPaused(true)}
                onMouseLeave={() => setPaused(false)}
              >
                <AnimatePresence mode="sync">
                  <motion.img
                    key={`${active.id}-${tab}-${imgIdx}`}
                    src={images[imgIdx]}
                    alt={`${active.name} - ${tab}`}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1 }}
                    transition={{ duration: 0.7, ease: "easeInOut" }}
                    className="absolute inset-0 w-full h-full object-cover"
                    loading="lazy"
                  />
                </AnimatePresence>

                {/* Bottom gradient for caption readability */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(180deg, transparent 60%, rgba(7,10,20,0.85) 100%)",
                  }}
                />

                {/* Image counter (top right) */}
                <div
                  className="absolute top-4 right-4 px-3 py-1.5 rounded-full text-xs font-display font-bold"
                  style={{ background: "rgba(7,10,20,0.65)", color: "#fff" }}
                >
                  {String(imgIdx + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
                </div>

                {/* Side navigation arrows (KZ style — 2 sides) */}
                <button
                  onClick={prevImg}
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full grid place-items-center transition-all hover:scale-110"
                  style={{
                    background: "rgba(255,255,255,0.95)",
                    color: "#0B0F1A",
                    boxShadow: "0 6px 18px -4px rgba(11,15,26,0.25)",
                  }}
                  aria-label="Өмнөх зураг"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={nextImg}
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full grid place-items-center transition-all hover:scale-110"
                  style={{
                    background: "rgba(255,255,255,0.95)",
                    color: "#0B0F1A",
                    boxShadow: "0 6px 18px -4px rgba(11,15,26,0.25)",
                  }}
                  aria-label="Дараагийн зураг"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>

                {/* Bottom progress dots */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                  {images.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setImgIdx(i)}
                      className="h-1.5 rounded-full transition-all"
                      style={{
                        width: i === imgIdx ? "28px" : "8px",
                        background:
                          i === imgIdx
                            ? active.accent === "red"
                              ? "#E2231A"
                              : "#2B6FE0"
                            : "rgba(255,255,255,0.5)",
                      }}
                      aria-label={`Зураг ${i + 1}`}
                    />
                  ))}
                </div>

                {/* Bottom caption */}
                <div className="absolute bottom-6 left-6 right-6 pointer-events-none">
                  <p
                    className="text-[0.6rem] tracking-[0.22em] uppercase font-display mb-1"
                    style={{ color: active.accent === "red" ? "#FF4A42" : "#5B9BFF" }}
                  >
                    {tab === "exterior" ? "Экстерьер" : tab === "interior" ? "Интерьер" : "Галерей"}
                  </p>
                  <p className="font-display font-extrabold italic text-xl text-white">
                    {active.name}
                  </p>
                </div>
              </div>

              {/* Content panel — clean, easy to read */}
              <div className="flex flex-col">
                <AnimatePresence mode="wait">
                  {tab === "exterior" && (
                    <motion.div
                      key="ext-content"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <p
                        className="text-base leading-relaxed mb-6"
                        style={{ color: "#5B6477" }}
                      >
                        {active.description}
                      </p>
                      <div className="space-y-4">
                        {active.exteriorFeatures.map((f, i) => (
                          <FeatureBlock
                            key={f.title}
                            num={i + 1}
                            title={f.title}
                            description={f.description}
                            accent={active.accent}
                          />
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {tab === "interior" && (
                    <motion.div
                      key="int-content"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <p
                        className="text-base leading-relaxed mb-6"
                        style={{ color: "#5B6477" }}
                      >
                        {active.longDescription}
                      </p>
                      <div className="space-y-4">
                        {active.interiorFeatures.map((f, i) => (
                          <FeatureBlock
                            key={f.title}
                            num={i + 1}
                            title={f.title}
                            description={f.description}
                            accent={active.accent}
                          />
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {tab === "specs" && (
                    <motion.div
                      key="specs-content"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="grid grid-cols-2 gap-3 mb-6">
                        <SpecCard icon={<Gauge className="w-4 h-4" />} label="Хөдөлгүүр" value={active.specs.engine} accent={active.accent} />
                        <SpecCard icon={<Zap className="w-4 h-4" />} label="Морины хүч" value={active.specs.power} accent={active.accent} />
                        <SpecCard icon={<CircleDot className="w-4 h-4" />} label="Мушгих хүч" value={active.specs.torque} accent={active.accent} />
                        <SpecCard icon={<Cog className="w-4 h-4" />} label="Хурдны хайрцаг" value={active.specs.transmission} accent={active.accent} />
                        <SpecCard icon={<Wind className="w-4 h-4" />} label="Хөтлөгч" value={active.specs.drivetrain} accent={active.accent} />
                        <SpecCard icon={<Users className="w-4 h-4" />} label="Суудал" value={active.specs.seats} accent={active.accent} />
                        <SpecCard icon={<Ruler className="w-4 h-4" />} label="Биеийн урт" value={active.specs.length} accent={active.accent} />
                        <SpecCard icon={<Navigation className="w-4 h-4" />} label="Тэнхлэгийн зай" value={active.specs.wheelbase} accent={active.accent} />
                      </div>

                      {/* Safety */}
                      <div
                        className="rounded-xl p-5 mb-6"
                        style={{ background: "#F4F6FA", border: "1px solid #E5E9F0" }}
                      >
                        <p
                          className="text-[0.6rem] tracking-[0.22em] uppercase font-display mb-3 flex items-center gap-1.5"
                          style={{ color: "#5B6477" }}
                        >
                          <ShieldCheck className="w-4 h-4" />
                          Аюулгүй байдлын систем
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {active.safety.map((s) => (
                            <span
                              key={s}
                              className="text-xs font-mono px-2.5 py-1.5 rounded-md"
                              style={{ background: "white", border: "1px solid #E5E9F0", color: "#0B0F1A" }}
                            >
                              {s}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Highlights */}
                      <div className="grid grid-cols-2 gap-3 mb-6">
                        {active.highlights.map((h) => (
                          <div
                            key={h.label}
                            className="rounded-xl p-3.5 border"
                            style={{
                              background: "white",
                              borderColor:
                                active.accent === "red" ? "rgba(226,35,26,0.2)" : "rgba(43,111,224,0.2)",
                            }}
                          >
                            <p
                              className="text-[0.6rem] tracking-[0.18em] uppercase font-display"
                              style={{ color: "#8A93A6" }}
                            >
                              {h.label}
                            </p>
                            <p
                              className="font-display font-extrabold italic text-base mt-0.5"
                              style={{ color: active.accent === "red" ? "#E2231A" : "#2B6FE0" }}
                            >
                              {h.value}
                            </p>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* CTA — sticky at bottom of content */}
                <div className="mt-auto pt-6">
                  <div
                    className="flex flex-wrap items-center gap-3 p-4 rounded-2xl"
                    style={{ background: "#F4F6FA", border: "1px solid #E5E9F0" }}
                  >
                    <div className="flex-1 min-w-0">
                      <p
                        className="text-[0.6rem] tracking-[0.22em] uppercase font-display"
                        style={{ color: "#8A93A6" }}
                      >
                        Холбоо барих
                      </p>
                      <a
                        href={CONTACT.phone1Href}
                        className="font-display font-extrabold italic text-lg block"
                        style={{ color: "#0B0F1A" }}
                      >
                        {CONTACT.phone1}
                      </a>
                    </div>
                    <button
                      onClick={() =>
                        document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })
                      }
                      className="btn-jetour inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm"
                    >
                      Хүсэлт илгээх
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* === All models mini-grid === */}
            <div className="mt-14 pt-8" style={{ borderTop: "1px solid #E5E9F0" }}>
              <p
                className="eyebrow text-center mb-5"
                style={{ color: "#5B6477" }}
              >
                Бүх загварууд
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                {MODELS.map((m) => (
                  <button
                    key={m.id}
                    onClick={() => switchModel(m.id)}
                    className="group relative aspect-[4/3] rounded-xl overflow-hidden transition-all"
                    style={{
                      border: activeId === m.id ? "2px solid #E2231A" : "1px solid #E5E9F0",
                      background: "white",
                    }}
                  >
                    <img
                      src={m.heroImage}
                      alt={m.name}
                      className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity"
                      loading="lazy"
                    />
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background:
                          "linear-gradient(180deg, transparent 40%, rgba(11,15,26,0.85) 100%)",
                      }}
                    />
                    <div className="absolute bottom-2 left-3 right-3 text-left">
                      <p
                        className="text-[0.5rem] tracking-[0.2em] uppercase font-display"
                        style={{ color: m.accent === "red" ? "#FF4A42" : "#5B9BFF" }}
                      >
                        {m.series}
                      </p>
                      <p className="font-display font-extrabold italic text-xs text-white">
                        {m.name}
                      </p>
                      <p className="text-[0.6rem] text-white/80 mt-0.5">
                        {m.price ?? m.priceNote}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

function FeatureBlock({
  num,
  title,
  description,
  accent,
}: {
  num: number;
  title: string;
  description: string;
  accent: "red" | "blue";
}) {
  return (
    <div
      className="rounded-xl p-4 transition-all hover:translate-x-1"
      style={{ background: "white", border: "1px solid #E5E9F0" }}
    >
      <div className="flex items-start gap-3">
        <span
          className="shrink-0 w-8 h-8 grid place-items-center rounded-lg font-display font-extrabold italic text-sm"
          style={{
            background:
              accent === "red"
                ? "linear-gradient(135deg, rgba(226,35,26,0.15), rgba(226,35,26,0.05))"
                : "linear-gradient(135deg, rgba(43,111,224,0.15), rgba(43,111,224,0.05))",
            color: accent === "red" ? "#E2231A" : "#2B6FE0",
            border: `1px solid ${accent === "red" ? "rgba(226,35,26,0.2)" : "rgba(43,111,224,0.2)"}`,
          }}
        >
          {num}
        </span>
        <div className="flex-1 min-w-0">
          <h4
            className="font-display font-bold text-base mb-1.5"
            style={{ color: "#0B0F1A" }}
          >
            {title}
          </h4>
          <p
            className="text-sm leading-relaxed"
            style={{ color: "#5B6477" }}
          >
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}

function SpecCard({
  icon,
  label,
  value,
  accent,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  accent: "red" | "blue";
}) {
  return (
    <div
      className="rounded-xl p-4"
      style={{ background: "white", border: "1px solid #E5E9F0" }}
    >
      <div className="flex items-center gap-2 mb-2">
        <span style={{ color: accent === "red" ? "#E2231A" : "#2B6FE0" }}>{icon}</span>
        <p
          className="text-[0.55rem] tracking-[0.18em] uppercase font-display"
          style={{ color: "#8A93A6" }}
        >
          {label}
        </p>
      </div>
      <p
        className="font-display font-extrabold italic text-base"
        style={{ color: "#0B0F1A" }}
      >
        {value}
      </p>
    </div>
  );
}
