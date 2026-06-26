"use client";

import { motion } from "framer-motion";
import { TIMELINE } from "@/lib/jetour-data";

export function Timeline() {
  return (
    <section className="relative py-24 lg:py-32 bg-[#F5F5F6] overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-50 pointer-events-none" />
      <div className="relative mx-auto w-[min(1280px,94vw)]">
        <div className="text-center mb-14">
          <p className="eyebrow eyebrow-electric mb-3">Брэндийн түүх</p>
          <h2 className="font-display font-extrabold italic leading-[0.95] text-[#17181B] text-4xl lg:text-6xl mb-4">
            JETOUR-ын <span className="text-gradient-premium">аялал</span>
          </h2>
          <p className="text-[#6B7280] max-w-2xl mx-auto text-base leading-relaxed">
            2018 оноос хойш Travel+ философиор дэлхийг бөмбөгрүүлсэн JETOUR — одоо Монголд албан ёсоор.
          </p>
        </div>

        <div className="relative max-w-3xl mx-auto">
          {/* Center line */}
          <div
            className="absolute left-4 lg:left-1/2 top-0 bottom-0 w-px lg:-translate-x-1/2"
            style={{
              background:
                "linear-gradient(180deg, transparent, rgba(0,0,0,0.4) 10%, rgba(226,35,26,0.4) 90%, transparent)",
            }}
          />

          <div className="space-y-10 lg:space-y-0">
            {TIMELINE.map((item, i) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: i * 0.05 }}
                className="relative lg:grid lg:grid-cols-2 lg:gap-12 lg:items-center"
              >
                {/* Node */}
                <div className="absolute left-4 lg:left-1/2 -translate-x-1/2 z-10">
                  <div className="w-3 h-3 rounded-full bg-[#E20A17] ring-4 ring-[#E20A17]/20" />
                  <div className="absolute inset-0 w-3 h-3 rounded-full bg-[#E20A17] animate-ping opacity-40" />
                </div>

                {/* Card */}
                <div
                  className={`pl-12 lg:pl-0 lg:py-6 ${
                    i % 2 === 0
                      ? "lg:col-start-1 lg:text-right lg:pr-12"
                      : "lg:col-start-2 lg:pl-12"
                  }`}
                >
                  <div className="bg-white rounded-2xl p-6 border border-[#E7E7EA] card-lift inline-block w-full">
                    <p className="font-display font-extrabold italic text-3xl lg:text-4xl text-gradient-premium mb-2">
                      {item.year}
                    </p>
                    <h3 className="font-display font-bold text-lg text-[#17181B] mb-2">
                      {item.title}
                    </h3>
                    <p className="text-[#6B7280] text-sm leading-relaxed">{item.text}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
