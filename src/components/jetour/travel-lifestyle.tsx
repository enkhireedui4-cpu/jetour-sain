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
              "linear-gradient(180deg, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.15) 50%, rgba(0,0,0,0.75) 100%)",
          }}
        />

        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="eyebrow text-white/80 mb-4"
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
            Бүх аялалд зориулагдсан — Монголын уудам нутаг, гэр бүлийн амьдрал, адал явдалт аялал.
          </motion.p>
        </div>
      </div>

      {/* Feature blocks */}
      <div className="bg-white py-20 lg:py-28">
        <div className="mx-auto w-[min(1280px,94vw)]">
          <div className="grid md:grid-cols-3 gap-6">
            {TRAVEL_FEATURES.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.12 }}
                className="group bg-white rounded-2xl p-7 border border-[#E7E7EA] card-lift"
              >
                <div className="w-12 h-12 grid place-items-center rounded-xl mb-5 bg-[#FDECEB] text-[#E20A17]">
                  {ICONS[f.icon]}
                </div>
                <h3 className="font-bold text-xl text-[#17181B] mb-3">
                  {f.title}
                </h3>
                <p className="text-[#54585F] text-sm leading-relaxed">{f.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
