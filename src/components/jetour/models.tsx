"use client";

import { motion } from "framer-motion";
import { ArrowRight, Gauge, Users, Cog, Wind, ChevronRight } from "lucide-react";
import { MODELS, CONTACT } from "@/lib/jetour-data";

export function Models() {
  return (
    <section
      id="models"
      className="relative py-24 lg:py-32 bg-[#F7F9FC] border-y border-[#E2E7EF] overflow-hidden"
    >
      <div className="absolute inset-0 bg-grid opacity-50 pointer-events-none" />
      <div
        className="absolute top-0 left-0 right-0 h-px pointer-events-none"
        style={{
          background: "linear-gradient(90deg, transparent, #00AEEF, transparent)",
        }}
      />

      <div className="relative mx-auto w-[min(1280px,94vw)]">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14">
          <div>
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="eyebrow eyebrow-electric mb-3"
            >
              02 · Загварын багц
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="font-display font-extrabold leading-[0.95] text-[#0A1F44] text-4xl lg:text-7xl"
            >
              Jetour багц —{" "}
              <span className="text-gradient-premium italic">өөрийнхөө загвар</span>
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="max-w-md text-base leading-relaxed text-[#6B7280]"
          >
            Хотын кросовероос аяллын SUV хүртэл — өөрийн амьдралын хэв маягт тохирох загвараа
            сонгоорой. Бүх загвар Сайн Моторсоор албан ёсоор баталгаажуулсан.
          </motion.p>
        </div>

        {/* Premium grid of cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {MODELS.map((m, i) => (
            <ModelCard key={m.id} model={m} index={i} />
          ))}
        </div>

        {/* CTA below grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-14 text-center"
        >
          <p className="text-[#6B7280] text-sm mb-5">
            Танд тохирох загварыг олж чадахгүй байна уу? Манай борлуулалтын баг танд туслана.
          </p>
          <button
            onClick={() =>
              document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })
            }
            className="btn-outline-jetour inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm"
          >
            Зөвлөгөө авах
            <ChevronRight className="w-4 h-4" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}

function ModelCard({ model, index }: { model: typeof MODELS[number]; index: number }) {
  const isAvailable = model.status === "available";

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: (index % 3) * 0.1 }}
      className="group relative bg-white rounded-2xl overflow-hidden border border-[#E2E7EF] card-lift"
    >
      {/* Image */}
      <div className="relative aspect-[16/11] overflow-hidden bg-[#F7F9FC]">
        <img
          src={model.heroImage}
          alt={model.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(180deg, transparent 0%, transparent 50%, rgba(10,31,68,0.92) 100%)",
          }}
        />

        {/* Series badge */}
        <div className="absolute top-4 left-4 flex gap-2">
          <span className="font-display text-[0.6rem] font-bold tracking-[0.22em] uppercase px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-sm text-[#0A1F44]">
            {model.series}
          </span>
          {isAvailable ? (
            <span className="font-display text-[0.6rem] font-bold tracking-[0.18em] uppercase px-2.5 py-1.5 rounded-full bg-emerald-500/95 text-white flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-white" />
              Бэлэн
            </span>
          ) : (
            <span className="font-display text-[0.6rem] font-bold tracking-[0.18em] uppercase px-2.5 py-1.5 rounded-full bg-[#00AEEF] text-white">
              Тун удахгүй
            </span>
          )}
        </div>

        {/* Title overlay */}
        <div className="absolute bottom-4 left-5 right-5">
          <p className="eyebrow text-[#4DD0F5] mb-1.5">{model.tagline}</p>
          <h3 className="font-display font-extrabold italic text-2xl lg:text-3xl text-white">
            {model.name}
          </h3>
        </div>
      </div>

      {/* Body */}
      <div className="p-6">
        <p className="text-sm text-[#6B7280] leading-relaxed mb-5 min-h-[60px]">
          {model.shortDesc}
        </p>

        {/* Spec row */}
        <div className="grid grid-cols-4 gap-2 mb-5">
          <MiniSpec icon={<Gauge className="w-3.5 h-3.5" />} value={model.specs.power} />
          <MiniSpec icon={<Cog className="w-3.5 h-3.5" />} value={model.specs.transmission} />
          <MiniSpec icon={<Wind className="w-3.5 h-3.5" />} value={model.specs.drivetrain} />
          <MiniSpec icon={<Users className="w-3.5 h-3.5" />} value={model.specs.seats.split(" ")[0]} />
        </div>

        {/* Price + CTAs */}
        <div className="pt-5 border-t border-[#E2E7EF]">
          <div className="flex items-end justify-between mb-4">
            <div>
              <p className="text-[0.6rem] tracking-[0.22em] uppercase text-[#6B7280] font-display">
                Үнэ
              </p>
              <p className="font-display font-extrabold italic text-2xl text-[#0A1F44]">
                {model.price ?? model.priceNote}
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() =>
                document.querySelector("#test-drive")?.scrollIntoView({ behavior: "smooth" })
              }
              className="btn-primary-jetour flex-1 flex items-center justify-center gap-1.5 py-3 rounded-xl text-sm"
            >
              Үнийн санал
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() =>
                document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })
              }
              className="px-4 py-3 rounded-xl border border-[#E2E7EF] text-[#0A1F44] hover:bg-[#F7F9FC] transition-colors text-sm font-display font-bold"
            >
              Цааш
            </button>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

function MiniSpec({ icon, value }: { icon: React.ReactNode; value: string }) {
  return (
    <div className="bg-[#F7F9FC] rounded-lg p-2 text-center">
      <div className="flex justify-center text-[#00AEEF] mb-1">{icon}</div>
      <p className="text-[0.65rem] font-bold text-[#0A1F44] truncate">{value}</p>
    </div>
  );
}
