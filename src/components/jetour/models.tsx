"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { ALL_MODELS_FOR_GRID } from "@/lib/jetour-data";

export function Models() {
  return (
    <section
      id="models"
      className="relative py-32 lg:py-40 bg-white overflow-hidden"
    >
      <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none" />
      <div className="relative mx-auto w-[min(1280px,94vw)]">
        {/* Header */}
        <div className="text-center mb-20">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="eyebrow eyebrow-electric mb-4"
          >
            Featured Models
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="font-display font-extrabold italic leading-[0.95] text-[#0A1F44] text-5xl lg:text-7xl mb-5"
          >
            Explore The <span className="text-gradient-premium">Jetour Lineup</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="max-w-2xl mx-auto text-[#6B7280] text-base lg:text-lg leading-relaxed"
          >
            Хотын кросовероос аяллын SUV хүртэл — өөрийн амьдралын хэв маягт тохирох JETOUR-оо олоорой.
          </motion.p>
        </div>

        {/* Clean premium grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {ALL_MODELS_FOR_GRID.map((m, i) => (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: (i % 3) * 0.12 }}
            >
              <Link href={`/models/${m.id}`} className="group block">
                <article className="bg-white rounded-2xl overflow-hidden border border-[#E2E7EF] card-lift h-full flex flex-col">
                  {/* Image */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-[#F7F9FC]">
                    <img
                      src={m.heroImage}
                      alt={m.name}
                      className="w-full h-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-110"
                      loading="lazy"
                    />
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background:
                          "linear-gradient(180deg, transparent 0%, transparent 55%, rgba(10,31,68,0.5) 100%)",
                      }}
                    />
                    {/* Series badge — minimal */}
                    <div className="absolute top-4 left-4">
                      <span className="font-display text-[0.55rem] font-bold tracking-[0.22em] uppercase px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-sm text-[#0A1F44]">
                        {m.series}
                      </span>
                    </div>
                  </div>

                  {/* Body — minimal info */}
                  <div className="p-7 flex flex-col flex-1">
                    <h3 className="font-display font-extrabold italic text-2xl text-[#0A1F44] mb-2">
                      {m.name}
                    </h3>
                    <p className="text-sm text-[#6B7280] mb-5 leading-relaxed">
                      {m.shortDesc}
                    </p>

                    <div className="mt-auto pt-5 border-t border-[#E2E7EF] flex items-end justify-between">
                      <div>
                        <p className="text-[0.55rem] tracking-[0.22em] uppercase text-[#6B7280] font-display mb-1">
                          Starting From
                        </p>
                        <p className="font-display font-extrabold italic text-xl text-[#0A1F44]">
                          {m.startingPrice ?? m.priceNote ?? "—"}
                        </p>
                      </div>
                      <span className="flex items-center gap-1.5 text-[#00AEEF] font-display font-bold text-sm group-hover:gap-2.5 transition-all">
                        Learn More
                        <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </article>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
