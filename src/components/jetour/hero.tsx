"use client";

import { motion } from "framer-motion";
import { ChevronDown, Gauge, MapPin, Sparkles } from "lucide-react";
import { CONTACT } from "@/lib/jetour-data";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-cinematic pt-24 pb-16">
      {/* Background grid */}
      <div className="absolute inset-0 bg-grid opacity-40 pointer-events-none" />

      {/* Cinematic horizon glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(60% 30% at 50% 58%, rgba(120,150,210,0.18), transparent 70%), linear-gradient(180deg, transparent 55%, rgba(7,10,20,0.85) 100%)",
        }}
      />

      {/* Floating particle dots */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 18 }).map((_, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0, 0.6, 0],
              y: [0, -20, 0],
              x: [0, (i % 2 === 0 ? 1 : -1) * 12, 0],
            }}
            transition={{
              duration: 6 + (i % 4),
              repeat: Infinity,
              delay: i * 0.4,
              ease: "easeInOut",
            }}
            className="absolute w-1 h-1 rounded-full"
            style={{
              left: `${(i * 5.5 + 8) % 100}%`,
              top: `${(i * 7.3 + 12) % 100}%`,
              background: i % 3 === 0 ? "#E2231A" : i % 3 === 1 ? "#2B6FE0" : "#C8CEDA",
              boxShadow: `0 0 8px ${i % 2 === 0 ? "#E2231A" : "#2B6FE0"}`,
            }}
          />
        ))}
      </div>

      <div className="relative mx-auto w-[min(1180px,92vw)] w-full">
        <div className="flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="flex items-center gap-3 mb-7"
          >
            <span className="w-2 h-2 rounded-full bg-jetour-red shadow-[0_0_0_5px_rgba(226,35,26,0.18)]" />
            <span className="eyebrow">
              Travel+ · Албан ёсны төлөөлөгч · {CONTACT.brand}
            </span>
            <span className="w-2 h-2 rounded-full bg-jetour-blue shadow-[0_0_0_5px_rgba(43,111,224,0.18)]" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.15, ease: "easeOut" }}
            className="font-display font-extrabold italic leading-[0.84] tracking-tight mb-8"
          >
            <span
              className="block text-gradient-fire"
              style={{
                fontSize: "clamp(3.6rem, 13vw, 9.5rem)",
                filter: "drop-shadow(0 10px 40px rgba(43,111,224,0.3))",
              }}
            >
              JETOUR
            </span>
            <span
              className="block text-paper mt-1"
              style={{ fontSize: "clamp(1.4rem, 4.5vw, 3rem)" }}
            >
              MONGOLIA
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="max-w-[46ch] text-base lg:text-lg text-chrome mb-9 leading-relaxed"
          >
            <b className="text-paper">Аялал гэдэг нь зорилго биш — амьдралын хэв маяг.</b>{" "}
            JETOUR-ын Travel+ загварууд Монголын уудам нутагт албан ёсоор. {CONTACT.brand} — таны итгэлтэй хамтрагч.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.42 }}
            className="flex flex-wrap items-center justify-center gap-3 mb-10"
          >
            <Chip icon={<Gauge className="w-4 h-4" />} label="Хүчин чадал" value="555 hp" />
            <Chip icon={<Sparkles className="w-4 h-4" />} label="Аяллын зай" value="1000+ км" />
            <Chip icon={<MapPin className="w-4 h-4" />} label="Showroom" value={CONTACT.addressShort} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.55 }}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            <button
              onClick={() => document.querySelector("#models")?.scrollIntoView({ behavior: "smooth" })}
              className="btn-jetour px-8 py-4 rounded-xl text-base flex items-center gap-2"
            >
              Загварууд үзэх
              <ChevronDown className="w-4 h-4" />
            </button>
            <a
              href={CONTACT.phoneHref}
              className="font-display font-semibold text-paper border border-line rounded-xl px-6 py-4 hover:bg-panel/60 transition-colors text-sm flex items-center gap-2.5"
            >
              <span className="w-2 h-2 rounded-full bg-jetour-red animate-pulse" />
              {CONTACT.phone}
            </a>
          </motion.div>
        </div>
      </div>

      {/* Bottom hero feature strip */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.8 }}
        className="absolute bottom-0 left-0 right-0 border-t border-line bg-ink/80 backdrop-blur-md"
      >
        <div className="mx-auto w-[min(1180px,92vw)] py-5 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { v: "60+", l: "Оронд борлуулсан" },
            { v: "1М+", l: "Дэлхийн борлуулалт" },
            { v: "4 загвар", l: "Монголд албан ёсоор" },
            { v: "4S", l: "Үйлчилгээний стандарт" },
          ].map((s, i) => (
            <div key={i} className="text-center md:text-left">
              <p className="font-display font-extrabold italic text-2xl lg:text-3xl text-gradient-fire">
                {s.v}
              </p>
              <p className="text-[0.65rem] tracking-[0.18em] uppercase text-muted-ink font-display mt-0.5">
                {s.l}
              </p>
            </div>
          ))}
        </div>
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
      <div className="text-left">
        <p className="text-[0.6rem] text-muted-ink tracking-[0.18em] uppercase font-display">
          {label}
        </p>
        <p className="font-bold text-sm text-paper leading-tight">{value}</p>
      </div>
    </div>
  );
}
