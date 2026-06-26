"use client";

import { motion } from "framer-motion";
import { Car, Calendar, Sparkles } from "lucide-react";
import { CONTACT } from "@/lib/jetour-data";
import { EnhancedLeadForm } from "./enhanced-lead-form";

export function TestDrive() {
  return (
    <section id="test-drive" className="relative py-32 lg:py-40 bg-[#17181B] overflow-hidden">
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
          background: "radial-gradient(50% 50% at 80% 30%, rgba(226,35,26,0.15), transparent 70%)",
        }}
      />

      <div className="relative mx-auto w-[min(1180px,94vw)]">
        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-12 lg:gap-16 items-start">
          {/* Left — copy */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="eyebrow text-[#E20A17] mb-3">05 · Тест драйв</p>
            <h2 className="font-display font-extrabold italic leading-[0.95] text-white text-4xl lg:text-6xl mb-5">
              Өөрийн биеэр{" "}
              <span className="text-gradient-electric">мэдрээрэй</span>
            </h2>
            <p className="text-white/80 text-base leading-relaxed mb-7">
              Зураг, видеогоор дамжуулан ойлгох аргагүй — сууж, жолоодон, өөртөө тохирох эсэхийг
              мэдрэх. Тест драйв үнэгүй, дараалалгүй. Манай борлуулалтын баг тантай холбогдоно.
            </p>

            <div className="space-y-3 mb-7">
              {[
                { icon: <Car className="w-4 h-4" />, text: "Бүх JETOUR загвар үнэгүй туршилт" },
                { icon: <Calendar className="w-4 h-4" />, text: "30–60 минутад туршиж үзнэ" },
                { icon: <Sparkles className="w-4 h-4" />, text: "Мэргэжлийн зөвлөгөө үнэгүй" },
              ].map((item) => (
                <div
                  key={item.text}
                  className="flex items-center gap-3 bg-white/[0.05] border border-white/10 rounded-xl px-4 py-3"
                >
                  <span className="w-8 h-8 grid place-items-center rounded-lg bg-gradient-to-br from-[#E20A17]/30 to-[#E20A17]/10 text-[#E20A17]">
                    {item.icon}
                  </span>
                  <span className="text-sm text-white">{item.text}</span>
                </div>
              ))}
            </div>

            <div className="pt-6 border-t border-white/10">
              <p className="text-xs text-white/60 leading-relaxed">
                Холбоо барих утас:{" "}
                <a href={CONTACT.phone1Href} className="text-[#E20A17] hover:text-white transition-colors font-bold">
                  {CONTACT.phone1}
                </a>
                {" · "}
                <a href={CONTACT.phone2Href} className="text-[#E20A17] hover:text-white transition-colors font-bold">
                  {CONTACT.phone2}
                </a>
                {" · "}
                <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer" className="text-[#E20A17] hover:text-white transition-colors font-bold">
                  WhatsApp
                </a>
                {" · "}
                <span className="text-white">Чингэлтэй, Holiday Inn-ийн урд</span>
              </p>
            </div>
          </motion.div>

          {/* Right — Enhanced Lead Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <EnhancedLeadForm
              type="test-drive"
              variant="dark"
              title="Тест драйв бүртгэх"
              subtitle="Огноо, цаг, салбар сонгон бүртгүүлээрэй"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
