"use client";

import { motion } from "framer-motion";
import { Wallet, Calendar, Building2, Percent, ArrowRight, CheckCircle2 } from "lucide-react";
import { FINANCING, CONTACT } from "@/lib/jetour-data";

export function Financing() {
  return (
    <section id="financing" className="relative py-24 lg:py-32 overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(50% 50% at 80% 30%, rgba(43,111,224,0.12), transparent 70%), radial-gradient(40% 40% at 20% 80%, rgba(226,35,26,0.08), transparent 70%)",
        }}
      />

      <div className="relative mx-auto w-[min(1180px,92vw)]">
        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-12 lg:gap-16 items-start">
          {/* Left — copy */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="lg:sticky lg:top-32"
          >
            <p className="eyebrow mb-3">
              <span className="text-jetour-red">04</span> · Зээл, лизинг
            </p>
            <h2 className="font-display font-extrabold italic leading-[0.95] text-paper text-4xl lg:text-6xl mb-5">
              Өөрийн болгох <span className="text-gradient-fire">боломж</span>
            </h2>
            <p className="text-chrome text-base leading-relaxed mb-7">
              Та 20–30%-ийн урьдчилгаа төлөөд сарын 1.3–2.9%-ийн зээлээр JETOUR-оо өөрийн болгох
              боломжтой. Манай борлуулалтын баг танд зээлийн байгууллагуудтай холбогдох, шаардлагатай
              баримт бичгээ бэлдэхэд тусална.
            </p>

            <div className="space-y-2.5">
              {[
                "Урьдчилгаа 20–30% төлөөд үлдэх хэсгийг зээлээр",
                "Сарын хүү 1.3%–2.9% (банкаас хамаарна)",
                "Зээлийн хугацаа 24–60 сар",
                "Бизнес, цалингаас хамаарч өөр нөхцөл",
              ].map((p) => (
                <div key={p} className="flex items-start gap-2.5 text-sm text-paper">
                  <CheckCircle2 className="w-4 h-4 text-jetour-red mt-0.5 shrink-0" />
                  <span>{p}</span>
                </div>
              ))}
            </div>

            <p className="text-[0.65rem] text-muted-ink mt-5 leading-relaxed italic">
              {FINANCING.note}
            </p>

            <button
              onClick={() =>
                document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })
              }
              className="btn-jetour mt-7 px-6 py-3.5 rounded-xl text-sm flex items-center gap-2"
            >
              Зээлийн зөвлөгөө авах
              <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>

          {/* Right — stat cards */}
          <div className="grid grid-cols-2 gap-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0 }}
              className="glass rounded-2xl p-6 lg:p-7"
            >
              <div className="w-12 h-12 grid place-items-center rounded-xl bg-gradient-to-br from-jetour-red/30 to-jetour-red/10 text-jetour-red-soft border border-line mb-4">
                <Wallet className="w-5 h-5" />
              </div>
              <p className="text-[0.6rem] tracking-[0.22em] uppercase text-muted-ink font-display mb-1">
                Урьдчилгаа
              </p>
              <p className="font-display font-extrabold italic text-4xl lg:text-5xl text-gradient-fire">
                {FINANCING.downPayment}
              </p>
              <p className="text-xs text-chrome mt-2">Машины үнийн урьдчилгаа төлөх</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="glass rounded-2xl p-6 lg:p-7"
            >
              <div className="w-12 h-12 grid place-items-center rounded-xl bg-gradient-to-br from-jetour-blue/30 to-jetour-blue/10 text-jetour-blue-soft border border-line mb-4">
                <Percent className="w-5 h-5" />
              </div>
              <p className="text-[0.6rem] tracking-[0.22em] uppercase text-muted-ink font-display mb-1">
                Сарын хүү
              </p>
              <p className="font-display font-extrabold italic text-4xl lg:text-5xl text-gradient-fire">
                {FINANCING.monthlyRate}
              </p>
              <p className="text-xs text-chrome mt-2">Банкинд хамаарна</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="glass rounded-2xl p-6 lg:p-7 col-span-2"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 grid place-items-center rounded-xl bg-gradient-to-br from-jetour-red/30 to-jetour-blue/30 text-paper border border-line">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[0.6rem] tracking-[0.22em] uppercase text-muted-ink font-display">
                    Хамтран ажилладаг банкууд
                  </p>
                  <p className="font-display font-bold text-paper text-sm">Зээлийн байгууллагууд</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {FINANCING.banks.map((b) => (
                  <div
                    key={b}
                    className="flex items-center gap-2 bg-ink/60 border border-line rounded-lg px-3 py-2.5"
                  >
                    <Calendar className="w-3.5 h-3.5 text-jetour-red-soft" />
                    <span className="text-sm text-paper">{b}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
