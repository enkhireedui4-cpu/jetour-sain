"use client";

import { motion } from "framer-motion";
import { TIMELINE } from "@/lib/jetour-data";

export function Timeline() {
  return (
    <section id="network" className="relative py-24 lg:py-32 overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(50% 40% at 80% 20%, rgba(43,111,224,0.1), transparent 70%), radial-gradient(40% 30% at 20% 80%, rgba(226,35,26,0.08), transparent 70%)",
        }}
      />
      <div className="relative mx-auto w-[min(1180px,92vw)]">
        <div className="text-center mb-14">
          <p className="eyebrow mb-3">
            <span className="text-jetour-red">04</span> · Брэндийн түүх
          </p>
          <h2 className="font-display font-extrabold italic leading-[0.95] text-paper text-4xl lg:text-6xl mb-4">
            JETOUR-ын <span className="text-gradient-fire">аялал</span>
          </h2>
          <p className="text-chrome max-w-2xl mx-auto text-base leading-relaxed">
            2018 оноос хойш Travel+ философиор дэлхийг бөмбөгрүүлсэн JETOUR — одоо Монголд албан ёсоор.
          </p>
        </div>

        {/* Vertical timeline */}
        <div className="relative max-w-3xl mx-auto">
          {/* Center line */}
          <div
            className="absolute left-4 lg:left-1/2 top-0 bottom-0 w-px lg:-translate-x-1/2"
            style={{
              background:
                "linear-gradient(180deg, transparent, rgba(226,35,26,0.5) 10%, rgba(43,111,224,0.5) 90%, transparent)",
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
                className={`relative lg:grid lg:grid-cols-2 lg:gap-12 lg:items-center ${
                  i % 2 === 0 ? "" : ""
                }`}
              >
                {/* Node */}
                <div className="absolute left-4 lg:left-1/2 -translate-x-1/2 z-10">
                  <div className="w-3 h-3 rounded-full bg-jetour-red ring-4 ring-jetour-red/20" />
                  <div className="absolute inset-0 w-3 h-3 rounded-full bg-jetour-red animate-ping opacity-40" />
                </div>

                {/* Card */}
                <div
                  className={`pl-12 lg:pl-0 lg:py-6 ${
                    i % 2 === 0
                      ? "lg:col-start-1 lg:text-right lg:pr-12"
                      : "lg:col-start-2 lg:pl-12"
                  }`}
                >
                  <div className="glass rounded-2xl p-6 inline-block w-full">
                    <p className="font-display font-extrabold italic text-3xl lg:text-4xl text-gradient-fire mb-2">
                      {item.year}
                    </p>
                    <h3 className="font-display font-bold text-lg text-paper mb-2">
                      {item.title}
                    </h3>
                    <p className="text-chrome text-sm leading-relaxed">{item.text}</p>
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
