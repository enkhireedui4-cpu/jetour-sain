"use client";

import { motion } from "framer-motion";
import { ChevronDown, Gauge, MapPin, Calendar } from "lucide-react";
import { CONTACT } from "@/lib/jetour-data";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-cinematic pt-28 pb-16">
      {/* Background grid */}
      <div className="absolute inset-0 bg-grid opacity-40 pointer-events-none" />

      {/* Horizon glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(60% 30% at 50% 58%, rgba(120,150,210,0.18), transparent 70%), linear-gradient(180deg, transparent 55%, rgba(7,10,20,0.85) 100%)",
        }}
      />

      <div className="relative mx-auto w-[min(1180px,92vw)] grid lg:grid-cols-[1.15fr_0.85fr] gap-12 items-center">
        {/* Left column — copy */}
        <div className="flex flex-col">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="flex items-center gap-3 mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-jetour-red shadow-[0_0_0_5px_rgba(226,35,26,0.18)]" />
            <span className="eyebrow">Travel+ · Албан ёсны төлөөлөгч</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
            className="font-display font-extrabold italic leading-[0.86] tracking-tight mb-6"
          >
            <span
              className="block text-gradient-fire"
              style={{
                fontSize: "clamp(3rem, 10vw, 7rem)",
                filter: "drop-shadow(0 6px 30px rgba(43,111,224,0.25))",
              }}
            >
              JETOUR
            </span>
            <span
              className="flex items-baseline gap-3 text-paper"
              style={{ fontSize: "clamp(2rem, 6vw, 4rem)" }}
            >
              MONGOLIA
              <span className="font-display not-italic font-bold text-jetour-red text-[0.4em] border-2 border-jetour-red rounded px-2 py-0.5 shadow-[0_0_24px_-6px_rgba(226,35,26,0.8)]">
                Travel+
              </span>
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="max-w-[42ch] text-lg text-chrome mb-7 leading-relaxed"
          >
            <b className="text-paper font-bold">Аялал гэдэг нь зорилго биш — амьдралын хэв маяг.</b>{" "}
            JETOUR-ын SUV загварууд Монголд албан ёсоор.{" "}
            <span className="text-paper">Сайн Моторс</span> таны аяллын итгэлтэй хамтрагч.
          </motion.p>

          {/* Meta chips */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-wrap gap-3 mb-9"
          >
            <Chip icon={<Gauge className="w-4 h-4" />} label="Хөдөлгүүр" value="254 hp" />
            <Chip icon={<MapPin className="w-4 h-4" />} label="Байршил" value={CONTACT.addressShort} />
            <Chip icon={<Calendar className="w-4 h-4" />} label="Дистрибьютер" value="SAIN MOTORS" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.55 }}
            className="flex flex-wrap gap-4 items-center"
          >
            <button
              onClick={() =>
                document.querySelector("#test-drive")?.scrollIntoView({ behavior: "smooth" })
              }
              className="btn-jetour px-7 py-4 rounded-xl text-base"
            >
              Тест драйв авах →
            </button>
            <button
              onClick={() =>
                document.querySelector("#models")?.scrollIntoView({ behavior: "smooth" })
              }
              className="font-display font-semibold text-paper border border-line rounded-xl px-6 py-4 hover:bg-panel/60 transition-colors text-sm"
            >
              Загварууд үзэх
            </button>
          </motion.div>
        </div>

        {/* Right column — car image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
          className="relative hidden lg:block"
        >
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden glass">
            <img
              src="https://sfile.chatglm.cn/images-ppt/55f9db8baf20.jpg"
              alt="JETOUR G700 — Flagship SUV"
              className="w-full h-full object-cover"
              loading="eager"
            />
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "linear-gradient(180deg, transparent 40%, rgba(7,10,20,0.7) 100%), radial-gradient(80% 60% at 50% 100%, rgba(226,35,26,0.18), transparent 70%)",
              }}
            />
            <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between">
              <div>
                <p className="eyebrow text-jetour-red-soft mb-1.5">Flagship</p>
                <p className="font-display font-extrabold italic text-2xl text-paper">
                  JETOUR G700
                </p>
              </div>
              <span className="text-xs font-mono text-chrome glass px-3 py-1.5 rounded-full">
                PHEV · 4WD
              </span>
            </div>
          </div>

          {/* Floating spec card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="absolute -bottom-6 -left-6 glass rounded-xl p-4 max-w-[180px] hidden xl:block"
          >
            <p className="eyebrow text-jetour-blue-soft mb-1">Travel+ зайд</p>
            <p className="font-display font-extrabold italic text-3xl text-gradient-fire">
              1000+
            </p>
            <p className="text-xs text-chrome mt-0.5">км нийт аяллын зай</p>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-chrome/60"
      >
        <span className="text-[0.6rem] tracking-[0.3em] uppercase font-display">Доош гулгах</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-4 h-4" />
        </motion.div>
      </motion.div>
    </section>
  );
}

function Chip({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-2.5 glass rounded-xl px-3.5 py-2.5">
      <span className="w-8 h-8 grid place-items-center rounded-lg bg-gradient-to-br from-jetour-red/25 to-jetour-blue/25 text-paper">
        {icon}
      </span>
      <div>
        <p className="text-[0.6rem] text-muted-ink tracking-[0.18em] uppercase font-display">
          {label}
        </p>
        <p className="font-bold text-sm text-paper leading-tight">{value}</p>
      </div>
    </div>
  );
}
