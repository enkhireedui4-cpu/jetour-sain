"use client";

import { motion } from "framer-motion";
import { ArrowRight, Calendar, Tag } from "lucide-react";
import { NEWS } from "@/lib/jetour-data";

export function News() {
  return (
    <section id="news" className="relative py-24 lg:py-32 bg-white overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-50 pointer-events-none" />
      <div className="relative mx-auto w-[min(1280px,94vw)]">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14">
          <div>
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="eyebrow eyebrow-electric mb-3"
            >
              04 · Мэдээ, сурталчилгаа
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="font-display font-extrabold leading-[0.95] text-[#0A1F44] text-4xl lg:text-7xl"
            >
              Шинэ <span className="text-gradient-premium italic">мэдээлэл</span>
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="max-w-md text-base leading-relaxed text-[#6B7280]"
          >
            Jetour Mongolia-ын шинэ загвар, брэндийн мэдээ, үйлчилгээний шинэчлэлт — бүгд энд.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {NEWS.map((n, i) => (
            <motion.article
              key={n.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group bg-white rounded-2xl overflow-hidden border border-[#E2E7EF] card-lift cursor-pointer"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={n.image}
                  alt={n.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: "linear-gradient(180deg, transparent 50%, rgba(10,31,68,0.5) 100%)",
                  }}
                />
                <div className="absolute top-4 left-4 flex gap-2">
                  <span
                    className={`font-display text-[0.6rem] font-bold tracking-[0.18em] uppercase px-3 py-1.5 rounded-full ${
                      n.accent === "electric"
                        ? "bg-[#00AEEF] text-white"
                        : "bg-[#0A1F44] text-white"
                    }`}
                  >
                    {n.tag}
                  </span>
                </div>
                <div className="absolute bottom-4 left-4 right-4 flex items-center gap-2 text-white text-xs">
                  <Calendar className="w-3 h-3" />
                  <span className="font-display tracking-wide">{n.date}</span>
                </div>
              </div>

              <div className="p-6">
                <p className="text-[0.65rem] tracking-[0.22em] uppercase text-[#00AEEF] font-display mb-2 flex items-center gap-1.5">
                  <Tag className="w-3 h-3" />
                  {n.type}
                </p>
                <h3 className="font-display font-extrabold italic text-xl text-[#0A1F44] mb-3 leading-tight">
                  {n.title}
                </h3>
                <p className="text-sm text-[#6B7280] leading-relaxed mb-4">{n.excerpt}</p>
                <div className="flex items-center gap-1.5 text-[#0A1F44] font-display font-bold text-sm group-hover:text-[#00AEEF] transition-colors">
                  Цааш унших
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
