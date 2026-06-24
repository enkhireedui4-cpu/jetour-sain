"use client";

import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";
import { LeadForm } from "./lead-form";

export function FinalCTA() {
  return (
    <section className="relative py-32 lg:py-40 bg-white overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-50 pointer-events-none" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(50% 60% at 80% 30%, rgba(0,174,239,0.08), transparent 70%)",
        }}
      />

      <div className="relative mx-auto w-[min(1280px,94vw)]">
        <div className="grid lg:grid-cols-[1.1fr_1fr] gap-12 lg:gap-16 items-center">
          {/* Left — copy */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-4 h-4 text-[#00AEEF]" />
              <p className="eyebrow eyebrow-electric">Таны дараагийн машин</p>
            </div>
            <h2 className="font-display font-extrabold italic leading-[0.95] text-[#0A1F44] text-4xl lg:text-6xl mb-5">
              Өнөөдөр <span className="text-gradient-premium">JETOUR</span>-оо сонгоорой
            </h2>
            <p className="text-[#6B7280] text-base lg:text-lg leading-relaxed mb-7 max-w-lg">
              Манай борлуулалтын баг танд зөв загвар сонгоход туслана. Үнийн санал, тест драйв,
              зээлийн зөвлөгөө — үнэгүй. Бичлэг үлдээгээрэй, бид тантай холбогдоно.
            </p>

            <div className="space-y-3 mb-7">
              {[
                { num: "1", text: "Бичлэг үлдээ — нэр, утас, сонирхсон загвар" },
                { num: "2", text: "Манай баг 24 цагийн дотор холбогдоно" },
                { num: "3", text: "Showroom-д ирж тест драйв хийнэ" },
              ].map((s) => (
                <div key={s.num} className="flex items-start gap-3">
                  <span className="shrink-0 w-7 h-7 grid place-items-center rounded-full bg-gradient-to-br from-[#0A1F44] to-[#00AEEF] text-white font-display font-bold text-xs">
                    {s.num}
                  </span>
                  <p className="text-[#0A1F44] text-sm pt-1">{s.text}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={() =>
                  document.querySelector("#models")?.scrollIntoView({ behavior: "smooth" })
                }
                className="btn-primary-jetour inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm"
              >
                Загварууд үзэх
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() =>
                  document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })
                }
                className="btn-outline-jetour inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm"
              >
                Showroom хаяг
              </button>
            </div>
          </motion.div>

          {/* Right — Lead form (premium white) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <LeadForm
              variant="solid-white"
              title="Мэдээлэл авах"
              subtitle="Бичлэг үлдээгээрэй — манай баг 24 цагийн дотор холбогдоно"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
