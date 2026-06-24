"use client";

import { motion } from "framer-motion";
import { Compass, Mountain, Star } from "lucide-react";

const PILLARS = [
  {
    icon: <Mountain className="w-5 h-5" />,
    title: "Travel+ философи",
    text: "JETOUR — зөвхөн автомашин бус. Аялал, баатарлага, илрүүлэлтийн амьдралын хэв маяг. Монголын уудам нутагт тохирох Travel+ философи.",
  },
  {
    icon: <Compass className="w-5 h-5" />,
    title: "Технологи ба дизайны нэгдэл",
    text: "Chery Group-ын R&D суурь, Итаалийн дизайны студи, дэлхийн өнцөг булан бүрт 8 студи. Шинэ загвар бүр дэлхийн түвшний дизайны хэлээр яригдана.",
  },
  {
    icon: <Star className="w-5 h-5" />,
    title: "Дэлхийн зах зээл",
    text: "60+ оронд албан ёсоор борлогдсон JETOUR нь 1 сая гаруй борлуулалтын түүхтэй. Өмнөд Африк, Ойрхи Дорнод, Латин Америк — одоо Монголд.",
  },
];

export function BrandStory() {
  return (
    <section id="brand" className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />
      <div
        className="absolute top-0 left-0 right-0 h-px pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(226,35,26,0.5), rgba(43,111,224,0.5), transparent)",
        }}
      />

      <div className="relative mx-auto w-[min(1180px,92vw)]">
        <div className="grid lg:grid-cols-[0.85fr_1.15fr] gap-12 lg:gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="lg:sticky lg:top-32"
          >
            <p className="eyebrow mb-4">
              <span className="text-jetour-red">01</span> · Брэндийн танилцуулга
            </p>
            <h2 className="font-display font-extrabold italic leading-[0.95] mb-6">
              <span className="text-paper text-4xl lg:text-6xl block">JETOUR —</span>
              <span className="text-gradient-fire text-4xl lg:text-6xl block">Аяллын соёл</span>
            </h2>
            <p className="text-chrome text-base leading-relaxed mb-5">
              2018 онд Chery Group-ын дотор төрсөн JETOUR нь залуу, эрч хүчтэй SUV-д төвлөрсөн
              дэлхийн брэнд. "Travel+" уриан дор — аялагчдын хүсэл, гэр бүлийн аялал, баатарлаг
              илрүүлэлтийг нэг загварт нэгтгэсэн.
            </p>
            <p className="text-chrome text-base leading-relaxed mb-8">
              Монголын уудам нутаг, өвлийн хүйтэн, зуны халуун, уулсын араар татсан шороон зам —
              эдгээр нь JETOUR T2, G700 зэрэг загваруудын үндсэн зорилго. Бид зөвхөн машин
              борлуулдаггүй: аяллын итгэл өгдөг.
            </p>

            <div className="flex flex-wrap gap-4">
              <div className="glass rounded-xl px-5 py-3">
                <p className="font-display font-extrabold italic text-3xl text-gradient-fire">2018</p>
                <p className="text-xs text-muted-ink mt-1 tracking-wider uppercase">Үүсгэн байгуулсан</p>
              </div>
              <div className="glass rounded-xl px-5 py-3">
                <p className="font-display font-extrabold italic text-3xl text-gradient-fire">60+</p>
                <p className="text-xs text-muted-ink mt-1 tracking-wider uppercase">Оронд борлуулсан</p>
              </div>
              <div className="glass rounded-xl px-5 py-3">
                <p className="font-display font-extrabold italic text-3xl text-gradient-fire">1М+</p>
                <p className="text-xs text-muted-ink mt-1 tracking-wider uppercase">Борлуулалт</p>
              </div>
            </div>
          </motion.div>

          <div className="flex flex-col gap-5">
            {PILLARS.map((p, i) => (
              <motion.article
                key={p.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7, delay: i * 0.1 }}
                className="group glass rounded-2xl p-7 hover:border-jetour-red/40 transition-colors relative overflow-hidden"
              >
                <div
                  className="absolute -top-12 -right-12 w-40 h-40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                  style={{
                    background:
                      "radial-gradient(circle, rgba(226,35,26,0.15), transparent 70%)",
                  }}
                />
                <div className="flex items-start gap-5 relative">
                  <div className="shrink-0 w-12 h-12 grid place-items-center rounded-xl bg-gradient-to-br from-jetour-red/30 to-jetour-blue/30 text-paper border border-line">
                    {p.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-display font-extrabold italic text-xl lg:text-2xl text-paper mb-2.5">
                      {p.title}
                    </h3>
                    <p className="text-chrome text-sm lg:text-base leading-relaxed">{p.text}</p>
                  </div>
                  <span className="font-display font-extrabold italic text-5xl text-line leading-none">
                    0{i + 1}
                  </span>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
