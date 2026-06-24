"use client";

import { motion } from "framer-motion";
import {
  Camera,
  Gauge,
  Zap,
  Music,
  Smartphone,
  Monitor,
} from "lucide-react";
import { TECHNOLOGY_FEATURES } from "@/lib/jetour-data";

const ICONS: Record<string, React.ReactNode> = {
  camera: <Camera className="w-7 h-7" />,
  gauge: <Gauge className="w-7 h-7" />,
  zap: <Zap className="w-7 h-7" />,
  music: <Music className="w-7 h-7" />,
  smartphone: <Smartphone className="w-7 h-7" />,
  display: <Monitor className="w-7 h-7" />,
};

export function Technology() {
  return (
    <section
      id="technology"
      className="relative py-24 lg:py-32 bg-[#0A1F44] overflow-hidden"
    >
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(50% 60% at 20% 20%, rgba(0,174,239,0.18), transparent 70%), radial-gradient(40% 50% at 80% 80%, rgba(0,174,239,0.1), transparent 70%)",
        }}
      />

      <div className="relative mx-auto w-[min(1280px,94vw)]">
        <div className="text-center mb-14">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="eyebrow text-[#4DD0F5] mb-3"
          >
            Technology
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="font-display font-extrabold italic leading-[0.95] text-white text-4xl lg:text-7xl mb-4"
          >
            Дэвшилтэт <span className="text-gradient-electric">технологи</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="max-w-2xl mx-auto text-white/70 text-base leading-relaxed"
          >
            360° камер, Adaptive Cruise, беспроводной цэнэглэгч, Apple CarPlay, Android Auto,
            Digital Cockpit — дэвшилтэт шийдэл бүхэн загварт суулгасан.
          </motion.p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {TECHNOLOGY_FEATURES.map((t, i) => (
            <motion.div
              key={t.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: (i % 3) * 0.1 }}
              whileHover={{ y: -8 }}
              className="group relative overflow-hidden bg-white/[0.04] border border-white/10 rounded-2xl p-7 hover:border-[#00AEEF]/50 transition-colors"
            >
              <div
                className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                style={{
                  background: "radial-gradient(circle, rgba(0,174,239,0.2), transparent 70%)",
                }}
              />

              <div className="relative">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="w-16 h-16 grid place-items-center rounded-2xl mb-5 border border-[#00AEEF]/30 bg-gradient-to-br from-[#00AEEF]/20 to-[#00AEEF]/5 text-[#4DD0F5]"
                >
                  {ICONS[t.icon]}
                </motion.div>
                <h3 className="font-display font-extrabold italic text-xl text-white mb-3 leading-tight">
                  {t.title}
                </h3>
                <p className="text-white/70 text-sm leading-relaxed">{t.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
