"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Users, Globe, Factory, Award } from "lucide-react";
import { GLOBAL_STATS } from "@/lib/jetour-data";

const ICONS: Record<string, React.ReactNode> = {
  users: <Users className="w-7 h-7" />,
  globe: <Globe className="w-7 h-7" />,
  factory: <Factory className="w-7 h-7" />,
  award: <Award className="w-7 h-7" />,
};

export function GlobalStats() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="relative py-24 lg:py-32 bg-[#121316] overflow-hidden"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(50% 60% at 50% 0%, rgba(226,35,26,0.12), transparent 70%)",
        }}
      />

      <div className="relative mx-auto w-[min(1280px,94vw)]">
        <div className="text-center mb-14">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="eyebrow text-[#E20A17] mb-3"
          >
            Дэлхийд
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="font-extrabold tracking-tight text-white text-3xl lg:text-5xl mb-4"
          >
            Дэлхийн <span className="text-[#E20A17]">JETOUR</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="max-w-2xl mx-auto text-white/70 text-base leading-relaxed"
          >
            60+ оронд албан ёсоор борлуулсан, 1 сая+ эзэмшигчтэй JETOUR — одоо Монголд.
          </motion.p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {GLOBAL_STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              className="relative bg-white/[0.04] border border-white/10 rounded-2xl p-7 text-center hover:border-[#E20A17]/50 transition-colors group"
            >
              <div className="w-14 h-14 mx-auto grid place-items-center rounded-2xl mb-5 bg-[#E20A17]/15 text-[#E20A17] border border-[#E20A17]/25 group-hover:scale-110 transition-transform">
                {ICONS[s.icon]}
              </div>
              <Counter value={s.value} suffix={s.suffix} inView={inView} />
              <p className="text-white/70 text-sm mt-2 leading-tight">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Counter({ value, suffix, inView }: { value: number; suffix: string; inView: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 2000;
    const start = Date.now();
    const tick = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(value * eased));
      if (progress < 1) requestAnimationFrame(tick);
      else setCount(value);
    };
    requestAnimationFrame(tick);
  }, [inView, value]);

  const formatted =
    value >= 1000
      ? count.toLocaleString("en-US")
      : count.toString();

  return (
    <p className="font-display font-extrabold italic text-4xl lg:text-5xl text-gradient-electric">
      {formatted}
      {suffix}
    </p>
  );
}
