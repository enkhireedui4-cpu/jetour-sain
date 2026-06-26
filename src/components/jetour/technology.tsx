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
  camera: <Camera className="w-6 h-6" />,
  gauge: <Gauge className="w-6 h-6" />,
  zap: <Zap className="w-6 h-6" />,
  music: <Music className="w-6 h-6" />,
  smartphone: <Smartphone className="w-6 h-6" />,
  display: <Monitor className="w-6 h-6" />,
};

export function Technology() {
  return (
    <section id="technology" className="relative py-24 lg:py-32 bg-white">
      <div className="relative mx-auto w-[min(1280px,94vw)]">
        <div className="max-w-2xl mb-14 lg:mb-16">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="eyebrow eyebrow-electric mb-3"
          >
            Технологи
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-extrabold tracking-tight text-[#17181B] text-3xl lg:text-5xl mb-4"
          >
            Дэвшилтэт технологи
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-[#54585F] text-base leading-relaxed"
          >
            360° камер, Adaptive Cruise, Apple CarPlay, Android Auto, Digital Cockpit — загвар бүрт суулгасан.
          </motion.p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {TECHNOLOGY_FEATURES.map((t, i) => (
            <motion.div
              key={t.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
              className="group bg-white rounded-2xl p-7 border border-[#E7E7EA] card-lift"
            >
              <div className="w-12 h-12 grid place-items-center rounded-xl mb-5 bg-[#FDECEB] text-[#E20A17]">
                {ICONS[t.icon]}
              </div>
              <h3 className="font-bold text-lg text-[#17181B] mb-2 leading-tight">{t.title}</h3>
              <p className="text-[#54585F] text-sm leading-relaxed">{t.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
