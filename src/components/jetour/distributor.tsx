"use client";

import { motion } from "framer-motion";
import { CheckCircle2, MapPin, Phone, Clock, Building2 } from "lucide-react";
import { CONTACT, DISTRIBUTOR_STATS } from "@/lib/jetour-data";
import { SainMotorsMark } from "./logo";

export function Distributor() {
  return (
    <section id="distributor" className="relative py-24 lg:py-32 bg-white border-y border-[#E5E9F0]">
      <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />
      <div className="relative mx-auto w-[min(1180px,92vw)]">
        <div className="grid lg:grid-cols-[1fr_1fr] gap-12 lg:gap-16 items-center">
          {/* Left — copy & stats */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <p className="eyebrow mb-3">
              <span className="text-jetour-red">04</span> · Албан ёсны түнш
            </p>
            <h2 className="font-display font-extrabold italic leading-[0.95] text-paper text-4xl lg:text-6xl mb-5">
              <SainMotorsMark className="text-4xl lg:text-6xl" />
            </h2>
            <p className="text-chrome text-base leading-relaxed mb-5">
              <b className="text-paper">Сайн Моторс</b> нь JETOUR-ын Монгол дахь албан ёсны
              дистрибьютер. {" "}
              {CONTACT.brandSince} оноос хойш 11+ брэндийн 20+ загварыг албан ёсоор борлуулж,
              4S стандартын үйлчилгээний төвөөр ажиллаж байна.
            </p>
            <p className="text-chrome text-base leading-relaxed mb-7">
              Бид зөвхөн машин борлуулдаггүй — худалдан авагч бүрийн амьдралын хэв маягийг ойлгож,
              тохирох загварыг санал болгодог. Тест драйв, зээлийн зөвлөгөө, баталгаат үйлчилгээ —
              нэг дор.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-7">
              {DISTRIBUTOR_STATS.map((s) => (
                <div key={s.label} className="glass rounded-xl p-4 text-center">
                  <p className="font-display font-extrabold italic text-3xl text-gradient-fire">
                    {s.value}
                  </p>
                  <p className="text-[0.65rem] text-muted-ink mt-1 leading-tight tracking-wider uppercase">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>

            {/* Promise list */}
            <ul className="space-y-2.5">
              {[
                "Албан ёсны баталгаа, үйлчилгээ",
                "Зээлийн бүх төрлийн шийдэл (Хаан, Capitron, Төрийн банк)",
                "Үндсэн ба хөдөлгүүрийн баталгаа 5 жил / 150,000 км",
                "Оригинал сэлбэгийн нөөц, мэргэжлийн засвар",
              ].map((p) => (
                <li key={p} className="flex items-start gap-2.5 text-sm text-paper">
                  <CheckCircle2 className="w-4 h-4 text-jetour-red mt-0.5 shrink-0" />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Right — showroom card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative aspect-[4/5] sm:aspect-[5/4] rounded-2xl overflow-hidden glass">
              <img
                src="https://sfile.chatglm.cn/images-ppt/8882f820761a.jpg"
                alt="SAIN MOTORS showroom — JETOR cabin view"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(7,10,20,0.4) 0%, transparent 30%, rgba(7,10,20,0.95) 100%)",
                }}
              />
              <div className="absolute bottom-5 left-5 right-5">
                <p className="eyebrow text-jetour-blue-soft mb-1.5">4S Showroom</p>
                <p className="font-display font-extrabold italic text-2xl lg:text-3xl text-paper mb-1">
                  BYD 4S Showroom
                </p>
                <p className="text-chrome text-xs">
                  JETOUR загварууд байнга дэлгэрцтэй
                </p>
              </div>
            </div>

            {/* Floating contact card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="absolute -bottom-5 -left-5 sm:bottom-auto sm:top-5 sm:-right-5 glass rounded-xl p-5 max-w-[260px]"
            >
              <div className="flex items-center gap-2.5 mb-3">
                <Building2 className="w-4 h-4 text-jetour-red" />
                <span className="font-display font-bold text-sm text-paper">Холбоо барих</span>
              </div>
              <div className="space-y-2">
                <a href={CONTACT.phone1Href} className="flex items-center gap-2 text-xs text-chrome hover:text-paper transition-colors">
                  <Phone className="w-3.5 h-3.5 text-jetour-red-soft" />
                  {CONTACT.phone1}
                </a>
                <a href={CONTACT.phone2Href} className="flex items-center gap-2 text-xs text-chrome hover:text-paper transition-colors">
                  <Phone className="w-3.5 h-3.5 text-jetour-blue-soft" />
                  {CONTACT.phone2}
                </a>
                <div className="flex items-start gap-2 text-xs text-chrome">
                  <MapPin className="w-3.5 h-3.5 text-jetour-red-soft mt-0.5 shrink-0" />
                  <span>{CONTACT.address}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-chrome">
                  <Clock className="w-3.5 h-3.5 text-jetour-red-soft" />
                  {CONTACT.hours}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
