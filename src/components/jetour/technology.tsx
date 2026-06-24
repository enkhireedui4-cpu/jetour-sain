"use client";

import { motion } from "framer-motion";
import { Cpu, Battery, ShieldCheck, Wifi } from "lucide-react";
import { TECHNOLOGY } from "@/lib/jetour-data";

const ICONS: Record<string, React.ReactNode> = {
  engine: <Cpu className="w-5 h-5" />,
  battery: <Battery className="w-5 h-5" />,
  shield: <ShieldCheck className="w-5 h-5" />,
  connect: <Wifi className="w-5 h-5" />,
};

export function Technology() {
  return (
    <section id="technology" className="relative py-24 lg:py-32 overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(60% 40% at 80% 20%, rgba(43,111,224,0.12), transparent 70%), radial-gradient(50% 30% at 10% 80%, rgba(226,35,26,0.1), transparent 70%)",
        }}
      />

      <div className="relative mx-auto w-[min(1180px,92vw)]">
        <div className="text-center mb-14">
          <p className="eyebrow mb-3">
            <span className="text-jetour-red">03</span> · Технологи ба инновац
          </p>
          <h2 className="font-display font-extrabold italic leading-[0.95] text-paper text-4xl lg:text-6xl mb-4">
            Дэвшилтэт <span className="text-gradient-fire">технологи</span>
          </h2>
          <p className="text-chrome max-w-2xl mx-auto text-base leading-relaxed">
            Chery Group-ын R&D төв, JETOUR-ын өөрийн инновацын систем — аюулгүй байдал, үр ашиг,
            холболтын шинэ түвшинг гаргасан.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {TECHNOLOGY.map((t, i) => (
            <motion.div
              key={t.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group relative overflow-hidden glass rounded-2xl p-6 hover:-translate-y-1 transition-transform duration-300"
            >
              <div
                className="absolute top-0 right-0 w-24 h-24 rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                style={{
                  background:
                    i % 2 === 0
                      ? "radial-gradient(circle at top right, rgba(226,35,26,0.2), transparent 70%)"
                      : "radial-gradient(circle at top right, rgba(43,111,224,0.2), transparent 70%)",
                }}
              />

              <div className="relative">
                <div
                  className={`w-12 h-12 grid place-items-center rounded-xl mb-5 border border-line ${
                    i % 2 === 0
                      ? "bg-gradient-to-br from-jetour-red/30 to-jetour-red/10 text-jetour-red-soft"
                      : "bg-gradient-to-br from-jetour-blue/30 to-jetour-blue/10 text-jetour-blue-soft"
                  }`}
                >
                  {ICONS[t.icon]}
                </div>
                <h3 className="font-display font-extrabold italic text-lg text-paper mb-2.5 leading-tight">
                  {t.title}
                </h3>
                <p className="text-chrome text-[0.85rem] leading-relaxed">{t.description}</p>
              </div>

              <span
                className={`absolute bottom-3 right-4 font-display font-extrabold italic text-3xl leading-none ${
                  i % 2 === 0 ? "text-jetour-red/20" : "text-jetour-blue/20"
                }`}
              >
                0{i + 1}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
