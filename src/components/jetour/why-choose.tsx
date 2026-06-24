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
    <section id="why" className="relative py-24 lg:py-32 bg-[#F7F9FC] overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-50 pointer-events-none" />
      <div className="relative mx-auto w-[min(1280px,94vw)]">
        <div className="text-center mb-14">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="eyebrow eyebrow-electric mb-3"
          >
            Яагаад JETOUR вэ?
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="font-display font-extrabold italic leading-[0.95] text-[#0A1F44] text-4xl lg:text-7xl mb-4"
          >
            6 шалтгаан — <span className="text-gradient-premium">JETOUR сонгох</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="max-w-2xl mx-auto text-[#6B7280] text-base leading-relaxed"
          >
            Баталгаа, технологийн инновац, аяллын хүчин чадал, мэргэжлийн үйлчилгээ — бүгд нэг дор.
          </motion.p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {ADVANTAGES.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: (i % 3) * 0.1 }}
              whileHover={{ y: -8 }}
              className="group relative overflow-hidden bg-white rounded-2xl p-7 border border-[#E2E7EF] card-lift"
            >
              <div
                className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                style={{
                  background: "radial-gradient(circle, rgba(0,174,239,0.12), transparent 70%)",
                }}
              />

              <div className="relative">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="w-14 h-14 grid place-items-center rounded-2xl mb-5 bg-gradient-to-br from-[#0A1F44] to-[#142A5C] text-[#4DD0F5]"
                >
                  {ICONS[f.icon]}
                </motion.div>
                <h3 className="font-display font-extrabold italic text-lg lg:text-xl text-[#0A1F44] mb-2.5">
                  {f.title}
                </h3>
                <p className="text-[#6B7280] text-sm leading-relaxed">{f.description}</p>

                <span className="absolute top-6 right-6 font-display font-extrabold italic text-4xl text-[#E2E7EF] leading-none">
                  0{i + 1}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
