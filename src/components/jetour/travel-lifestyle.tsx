"use client";

import { motion } from "framer-motion";
import { Heart, Compass, Cpu } from "lucide-react";
import { TRAVEL_FEATURES, LIFESTYLE_IMAGES } from "@/lib/jetour-data";

const ICONS: Record<string, React.ReactNode> = {
  heart: <Heart className="w-6 h-6" />,
  compass: <Compass className="w-6 h-6" />,
  cpu: <Cpu className="w-6 h-6" />,
};

export function TravelLifestyle() {
  return (
    <section id="travel" className="relative overflow-hidden">
      {/* Full-width hero image */}
      <div className="relative h-[60vh] min-h-[400px] lg:h-[80vh] overflow-hidden">
        <motion.img
          initial={{ scale: 1.1 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          src={LIFESTYLE_IMAGES.hero}
          alt="Mongolia landscape — Travel+ lifestyle"
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(10,31,68,0.5) 0%, rgba(10,31,68,0.2) 50%, rgba(10,31,68,0.85) 100%)",
          }}
        />

        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="eyebrow text-[#4DD0F5] mb-4"
          >
            Travel+ Lifestyle
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display font-extrabold italic text-white text-4xl lg:text-7xl mb-4 leading-[0.95]"
          >
            Зөвхөн машин биш
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-white/90 text-lg lg:text-xl max-w-2xl"
          >
            Бүх аялалд зориулагдсан — Монголын уудам нутаг, гэр бүлийн амьдрал, баатарлаг илрүүлэлт.
          </motion.p>
        </div>
      </div>

      {/* Feature blocks */}
      <div className="bg-white py-32 lg:py-40">
        <div className="mx-auto w-[min(1280px,94vw)]">
          <div className="grid md:grid-cols-3 gap-6">
            {TRAVEL_FEATURES.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, delay: i * 0.15 }}
                className="group bg-white rounded-2xl p-7 border border-[#E2E7EF] card-lift"
              >
                <motion.div
                  whileHover={{ scale: 1.05, rotate: -3 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="w-14 h-14 grid place-items-center rounded-2xl mb-5 bg-gradient-to-br from-[#0A1F44] to-[#00AEEF] text-white"
                >
                  {ICONS[f.icon]}
                </motion.div>
                <h3 className="font-display font-extrabold italic text-xl lg:text-2xl text-[#0A1F44] mb-3">
                  {f.title}
                </h3>
                <p className="text-[#6B7280] text-sm leading-relaxed">{f.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
