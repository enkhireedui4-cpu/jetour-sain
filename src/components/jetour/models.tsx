"use client";

import { motion } from "framer-motion";
import { ArrowRight, Gauge, Cog, CircleDot, Users } from "lucide-react";
import { MODELS, type JetourModel } from "@/lib/jetour-data";

export function Models() {
  return (
    <section
      id="models"
      className="relative py-24 lg:py-32 bg-ink-2/40 border-y border-line"
    >
      <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />
      <div className="relative mx-auto w-[min(1180px,92vw)]">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14">
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
            сонгоорой. Бүх загвар Монголд албан ёсоор, Сайн Моторсоор баталгаажуулсан.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {MODELS.map((m, i) => (
            <ModelCard key={m.id} model={m} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ModelCard({ model, index }: { model: JetourModel; index: number }) {
  const isRed = model.accent === "red";

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay: (index % 2) * 0.12 }}
      className="group relative overflow-hidden rounded-2xl glass hover:border-paper/30 transition-all duration-300"
    >
      {/* Image area */}
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={model.image}
          alt={model.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(180deg, rgba(7,10,20,0.2) 0%, transparent 30%, rgba(7,10,20,0.95) 100%)",
          }}
        />

        {/* Series badge */}
        <div className="absolute top-4 left-4">
          <span
            className={`font-display text-[0.62rem] font-bold tracking-[0.22em] uppercase px-3 py-1.5 rounded-full glass ${
              isRed ? "text-jetour-red-soft" : "text-jetour-blue-soft"
            }`}
          >
            {model.series}
          </span>
        </div>

        {/* Title overlay */}
        <div className="absolute bottom-4 left-5 right-5">
          <p className={`eyebrow mb-1 ${isRed ? "text-jetour-red-soft" : "text-jetour-blue-soft"}`}>
            {model.tagline}
          </p>
          <h3 className="font-display font-extrabold italic text-3xl lg:text-4xl text-paper">
            {model.name}
          </h3>
        </div>
      </div>

      {/* Body */}
      <div className="p-6 lg:p-7">
        <p className="text-chrome text-sm leading-relaxed mb-5 min-h-[72px]">
          {model.description}
        </p>

        {/* Spec grid */}
        <div className="grid grid-cols-2 gap-2.5 mb-5">
          <Spec icon={<Gauge className="w-3.5 h-3.5" />} label="Хөдөлгүүр" value={model.specs.engine} />
          <Spec icon={<CircleDot className="w-3.5 h-3.5" />} label="Хүчин чадал" value={model.specs.power} />
          <Spec icon={<Cog className="w-3.5 h-3.5" />} label="Хурдны хайрцаг" value={model.specs.transmission} />
          <Spec icon={<Users className="w-3.5 h-3.5" />} label="Суудал" value={model.specs.seats} />
        </div>

        {/* Highlights */}
        <ul className="space-y-2 mb-6">
          {model.highlights.map((h) => (
            <li key={h} className="flex items-start gap-2.5 text-sm text-chrome">
              <span
                className={`mt-1 w-1.5 h-1.5 rounded-full shrink-0 ${
                  isRed ? "bg-jetour-red" : "bg-jetour-blue"
                }`}
              />
              {h}
            </li>
          ))}
        </ul>

        {/* CTA */}
        <button
          onClick={() =>
            document.querySelector("#test-drive")?.scrollIntoView({ behavior: "smooth" })
          }
          className={`group/btn flex items-center justify-center gap-2 w-full py-3 rounded-xl font-display font-bold text-sm transition-all ${
            isRed
              ? "bg-jetour-red/15 text-jetour-red-soft hover:bg-jetour-red hover:text-white"
              : "bg-jetour-blue/15 text-jetour-blue-soft hover:bg-jetour-blue hover:text-white"
          }`}
        >
          Тест драйв бүртгүүлэх
          <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
        </button>
      </div>
    </motion.article>
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
    <div className="flex items-center gap-2 bg-ink/60 border border-line rounded-lg px-3 py-2">
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
