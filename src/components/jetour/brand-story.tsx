"use client";

import { motion } from "framer-motion";
import { Compass, Mountain, Star, Globe2 } from "lucide-react";

const PILLARS = [
  {
    icon: <Compass className="w-5 h-5" />,
    title: "Travel+ философи",
    text: "JETOUR нь зөвхөн автомашин биш — аялал, баатарлага, илрүүлэлтийн амьдралын хэв маяг. Монголын уудам нутагт Travel+ философи.",
  },
  {
    icon: <Mountain className="w-5 h-5" />,
    title: "Chery Group-ын өв",
    text: "Chery Group-ын R&D суурь, Итаалийн дизайны студи. Шинэ загвар бүр дэлхийн түвшний дизайны хэлээр яригдана.",
  },
  {
    icon: <Globe2 className="w-5 h-5" />,
    title: "Дэлхийн зах зээл",
    text: "60+ оронд албан ёсоор борлогдсон JETOUR нь 1 сая гаруй борлуулалтын түүхтэй. Өмнөд Африк, Ойрхи Дорнод, Латин Америк — одоо Монголд.",
  },
  {
    icon: <Star className="w-5 h-5" />,
    title: "Инновац ба технологи",
    text: "TCI Turbo хөдөлгүүр, PHEV хосолсон систем, L2.5 ADAS жолоодлогын туслалцаа — дэвшилтэт технологи бүхэн загварт суулгасан.",
  },
];

export function BrandStory() {
  return (
    <section id="brand" className="relative py-24 lg:py-32 bg-white overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-50 pointer-events-none" />
      <div className="relative mx-auto w-[min(1280px,94vw)]">
        <div className="grid lg:grid-cols-[0.85fr_1.15fr] gap-12 lg:gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="lg:sticky lg:top-32"
          >
            <p className="eyebrow eyebrow-electric mb-4">01 · Брэндийн танилцуулга</p>
            <h2 className="font-display font-extrabold italic leading-[0.95] mb-6">
              <span className="text-[#0A1F44] text-4xl lg:text-6xl block">JETOUR —</span>
              <span className="text-gradient-premium text-4xl lg:text-6xl block">Аяллын соёл</span>
            </h2>
            <p className="text-[#6B7280] text-base leading-relaxed mb-5">
              2018 онд Chery Group-ын дотор төрсөн JETOUR нь залуу, эрч хүчтэй SUV-д төвлөрсөн
              дэлхийн брэнд. "Travel+" уриан дор — аялагчдын хүсэл, гэр бүлийн аялал, баатарлаг
              илрүүлэлтийг нэг загварт нэгтгэсэн.
            </p>
            <p className="text-[#6B7280] text-base leading-relaxed mb-8">
              Монголын уудам нутаг, өвлийн хүйтэн, зуны халуун, уулсын араар татсан шороон зам —
              эдгээр нь JETOUR T2, X70 Plus зэрэг загваруудын үндсэн зорилго. Бид зөвхөн машин
              борлуулдаггүй: аяллын итгэл өгдөг.
            </p>

            <div className="flex flex-wrap gap-3">
              <div className="bg-[#F7F9FC] border border-[#E2E7EF] rounded-xl px-5 py-3">
                <p className="font-display font-extrabold italic text-3xl text-gradient-premium">2018</p>
                <p className="text-xs text-[#6B7280] mt-1 tracking-wider uppercase">Үүсгэн байгуулсан</p>
              </div>
              <div className="bg-[#F7F9FC] border border-[#E2E7EF] rounded-xl px-5 py-3">
                <p className="font-display font-extrabold italic text-3xl text-gradient-premium">60+</p>
                <p className="text-xs text-[#6B7280] mt-1 tracking-wider uppercase">Оронд борлуулсан</p>
              </div>
              <div className="bg-[#F7F9FC] border border-[#E2E7EF] rounded-xl px-5 py-3">
                <p className="font-display font-extrabold italic text-3xl text-gradient-premium">1М+</p>
                <p className="text-xs text-[#6B7280] mt-1 tracking-wider uppercase">Борлуулалт</p>
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
                className="group relative overflow-hidden bg-white rounded-2xl p-7 border border-[#E2E7EF] card-lift"
              >
                <div
                  className="absolute -top-12 -right-12 w-40 h-40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                  style={{
                    background: "radial-gradient(circle, rgba(0,174,239,0.1), transparent 70%)",
                  }}
                />
                <div className="flex items-start gap-5 relative">
                  <div className="shrink-0 w-12 h-12 grid place-items-center rounded-xl bg-gradient-to-br from-[#0A1F44]/10 to-[#00AEEF]/10 text-[#0A1F44] border border-[#E2E7EF]">
                    {p.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-display font-extrabold italic text-xl lg:text-2xl text-[#0A1F44] mb-2.5">
                      {p.title}
                    </h3>
                    <p className="text-[#6B7280] text-sm lg:text-base leading-relaxed">{p.text}</p>
                  </div>
                  <span className="font-display font-extrabold italic text-5xl text-[#E2E7EF] leading-none">
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
