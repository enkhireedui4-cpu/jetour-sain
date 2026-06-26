"use client";

import { motion } from "framer-motion";
import {
  ShieldCheck,
  Package,
  Cpu,
  Shield,
  Compass,
  Wrench,
} from "lucide-react";
import { ADVANTAGES } from "@/lib/jetour-data";

const ICONS: Record<string, React.ReactNode> = {
  shield: <ShieldCheck className="w-6 h-6" />,
  package: <Package className="w-6 h-6" />,
  cpu: <Cpu className="w-6 h-6" />,
  "shield-check": <Shield className="w-6 h-6" />,
  compass: <Compass className="w-6 h-6" />,
  wrench: <Wrench className="w-6 h-6" />,
};

export function WhyChoose() {
  return (
    <section id="why" className="relative py-24 lg:py-32 bg-[#F5F5F6]">
      <div className="relative mx-auto w-[min(1280px,94vw)]">
        <div className="max-w-2xl mb-14 lg:mb-16">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="eyebrow eyebrow-electric mb-3"
          >
            Яагаад JETOUR вэ?
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-extrabold tracking-tight text-[#17181B] text-3xl lg:text-5xl mb-4"
          >
            JETOUR сонгох 6 шалтгаан
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-[#54585F] text-base leading-relaxed"
          >
            Баталгаа, технологи, аяллын хүчин чадал, мэргэжлийн үйлчилгээ — нэг дор.
          </motion.p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {ADVANTAGES.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
              className="group relative bg-white rounded-2xl p-7 border border-[#E7E7EA] card-lift"
            >
              <div className="flex items-start justify-between mb-5">
                <div className="w-12 h-12 grid place-items-center rounded-xl bg-[#FDECEB] text-[#E20A17]">
                  {ICONS[f.icon]}
                </div>
                <span className="font-bold text-3xl text-[#F0F0F1] leading-none">
                  0{i + 1}
                </span>
              </div>
              <h3 className="font-bold text-lg text-[#17181B] mb-2">{f.title}</h3>
              <p className="text-[#54585F] text-sm leading-relaxed">{f.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
