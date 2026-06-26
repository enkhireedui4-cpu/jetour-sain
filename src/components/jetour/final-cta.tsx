"use client";

import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";
import { EnhancedLeadForm } from "./enhanced-lead-form";

export function FinalCTA() {
  return (
    <section id="test-drive" className="relative py-24 lg:py-32 bg-white">
      <div className="relative mx-auto w-[min(1280px,94vw)]">
        <div className="grid lg:grid-cols-[1.1fr_1fr] gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-4 h-4 text-[#E20A17]" />
              <p className="eyebrow eyebrow-electric">Таны дараагийн машин</p>
            </div>
            <h2 className="font-extrabold tracking-tight leading-[1.02] text-[#17181B] text-3xl lg:text-5xl mb-5">
              Өнөөдөр <span className="text-[#E20A17]">JETOUR</span>-оо сонгоорой
            </h2>
            <p className="text-[#54585F] text-base lg:text-lg leading-relaxed mb-7 max-w-lg">
              Манай баг танд зөв загвар сонгоход тусална. Үнийн санал, тест драйв, зээлийн зөвлөгөө — үнэгүй.
            </p>
            <div className="space-y-3 mb-7">
              {[
                { num: "1", text: "Хүсэлт үлдээ — нэр, утас, сонирхсон загвар" },
                { num: "2", text: "Манай баг 24 цагийн дотор холбогдоно" },
                { num: "3", text: "Showroom-д ирж тест драйв хийнэ" },
              ].map((s) => (
                <div key={s.num} className="flex items-start gap-3">
                  <span className="shrink-0 w-7 h-7 grid place-items-center rounded-full bg-[#E20A17] text-white font-bold text-xs">
                    {s.num}
                  </span>
                  <p className="text-[#54585F] text-sm pt-1">{s.text}</p>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => document.querySelector("#models")?.scrollIntoView({ behavior: "smooth" })}
                className="btn-primary-jetour inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm"
              >
                Загварууд үзэх
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => document.querySelector("#dealer")?.scrollIntoView({ behavior: "smooth" })}
                className="btn-outline-jetour inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm"
              >
                Showroom хаяг
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <EnhancedLeadForm
              type="test-drive"
              variant="white"
              title="Тест драйв бүртгэх"
              subtitle="Огноо, цаг, салбар сонгон бүртгүүлээрэй"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
