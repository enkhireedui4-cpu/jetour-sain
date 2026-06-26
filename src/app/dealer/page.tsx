"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Phone,
  MapPin,
  Clock,
  Mail,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Building2,
} from "lucide-react";
import { CONTACT, SHOWROOM_HOURS, BRANCHES } from "@/lib/jetour-data";
import { Navbar } from "@/components/jetour/navbar";
import { Footer } from "@/components/jetour/contact";

const SHOWROOM_IMAGES = [
  "/showroom/showroom-1.jfif",
  "/showroom/showroom-2.jfif",
  "/showroom/showroom-3.jfif",
  "/showroom/showroom-4.jfif",
  "/showroom/showroom-5.jfif",
  "/showroom/showroom-6.jfif",
];

export default function DealerPage() {
  const branch = BRANCHES[0];
  const [active, setActive] = useState(0);

  const prev = () => setActive((p) => (p - 1 + SHOWROOM_IMAGES.length) % SHOWROOM_IMAGES.length);
  const next = () => setActive((p) => (p + 1) % SHOWROOM_IMAGES.length);

  return (
    <div className="min-h-screen bg-white text-[#17181B]">
      <Navbar />
      <div className="h-16" />

      {/* Header */}
      <section className="bg-white pt-14 lg:pt-20 pb-8">
        <div className="mx-auto w-[min(1280px,94vw)]">
          <p className="eyebrow eyebrow-electric mb-3">Дилер</p>
          <h1 className="font-extrabold tracking-tight text-[#17181B] text-3xl lg:text-5xl mb-3">
            Бидний showroom
          </h1>
          <p className="text-[#54585F] text-base lg:text-lg max-w-2xl leading-relaxed">
            {branch.name} — {branch.city}. Showroom, үйлчилгээ, тест драйв нэг дор. Доорх газрын
            зургаар замаа төлөвлөж, өдөр бүр тавтай морилно уу.
          </p>
        </div>
      </section>

      {/* Info + Enlarged Google Map */}
      <section className="bg-white pb-6">
        <div className="mx-auto w-[min(1280px,94vw)] grid lg:grid-cols-[0.9fr_1.4fr] gap-6 lg:gap-8 items-stretch">
          {/* Info card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-[#F5F5F6] rounded-2xl p-7 border border-[#E7E7EA] flex flex-col"
          >
            <div className="flex items-start gap-4 mb-6">
              <div className="w-14 h-14 grid place-items-center rounded-2xl bg-gradient-to-br from-[#17181B] to-[#232428] text-[#E20A17] shrink-0">
                <Building2 className="w-6 h-6" />
              </div>
              <div>
                <p className="eyebrow mb-1">Албан ёсны дистрибьютер</p>
                <p className="font-extrabold text-xl text-[#17181B]">SAIN MOTORS</p>
                <p className="text-xs text-[#8A8F98] mt-1">
                  {CONTACT.brandFullName} · {CONTACT.brandSince} оноос хойш
                </p>
              </div>
            </div>

            <div className="space-y-4 flex-1">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#E20A17] mt-0.5 shrink-0" />
                <div>
                  <p className="text-[0.6rem] tracking-[0.18em] uppercase text-[#8A8F98] mb-0.5">
                    Showroom хаяг
                  </p>
                  <p className="text-[#17181B] text-sm leading-snug">{branch.address}</p>
                  <a
                    href={branch.mapLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-[#E20A17] hover:text-[#17181B] transition-colors mt-1.5 font-semibold"
                  >
                    Google Map-аар үзэх
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-3">
                <a
                  href={CONTACT.phone1Href}
                  className="flex items-center gap-3 bg-white rounded-xl p-3.5 border border-[#E7E7EA] hover:border-[#E20A17] transition-colors"
                >
                  <span className="w-9 h-9 grid place-items-center rounded-lg bg-[#E20A17]/10 text-[#E20A17]">
                    <Phone className="w-4 h-4" />
                  </span>
                  <div>
                    <p className="text-[0.55rem] tracking-[0.18em] uppercase text-[#8A8F98]">
                      Борлуулалт 1
                    </p>
                    <p className="font-bold text-[#17181B] text-sm">{CONTACT.phone1}</p>
                  </div>
                </a>
                <a
                  href={CONTACT.phone2Href}
                  className="flex items-center gap-3 bg-white rounded-xl p-3.5 border border-[#E7E7EA] hover:border-[#E20A17] transition-colors"
                >
                  <span className="w-9 h-9 grid place-items-center rounded-lg bg-[#E20A17]/10 text-[#E20A17]">
                    <Phone className="w-4 h-4" />
                  </span>
                  <div>
                    <p className="text-[0.55rem] tracking-[0.18em] uppercase text-[#8A8F98]">
                      Борлуулалт 2
                    </p>
                    <p className="font-bold text-[#17181B] text-sm">{CONTACT.phone2}</p>
                  </div>
                </a>
              </div>

              <a
                href={`mailto:${CONTACT.email}`}
                className="flex items-center gap-3 hover:text-[#E20A17] transition-colors"
              >
                <Mail className="w-5 h-5 text-[#E20A17] shrink-0" />
                <span className="text-[#17181B] text-sm">{CONTACT.email}</span>
              </a>

              <div className="pt-4 border-t border-[#E7E7EA]">
                <p className="text-[0.6rem] tracking-[0.22em] uppercase text-[#8A8F98] mb-3 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  Ажлын цаг
                </p>
                <div className="space-y-1.5">
                  {SHOWROOM_HOURS.map((h) => (
                    <div key={h.day} className="flex items-center justify-between text-sm">
                      <span className="text-[#54585F]">{h.day}</span>
                      <span className="font-bold text-[#17181B]">{h.hours}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Enlarged Google Map */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative rounded-2xl overflow-hidden border border-[#E7E7EA] min-h-[420px] lg:min-h-[560px]"
          >
            <iframe
              src={branch.mapEmbed}
              title={`${branch.name} — байршил`}
              className="w-full h-full min-h-[420px] lg:min-h-[560px] border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </motion.div>
        </div>
      </section>

      {/* Showroom image carousel */}
      <section className="bg-white py-16 lg:py-24">
        <div className="mx-auto w-[min(1280px,94vw)]">
          <div className="mb-8">
            <p className="eyebrow eyebrow-electric mb-2">Showroom</p>
            <h2 className="font-extrabold tracking-tight text-[#17181B] text-2xl lg:text-4xl">
              Манай танхимаар зочлоорой
            </h2>
          </div>

          {/* Main image */}
          <div className="relative rounded-3xl overflow-hidden bg-[#111] aspect-[16/9]">
            {SHOWROOM_IMAGES.map((src, i) => (
              <img
                key={src}
                src={src}
                alt={`Showroom ${i + 1}`}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                  i === active ? "opacity-100" : "opacity-0"
                }`}
                loading={i === 0 ? "eager" : "lazy"}
              />
            ))}

            {/* Arrows */}
            <button
              onClick={prev}
              aria-label="Өмнөх зураг"
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 grid place-items-center rounded-full bg-white/15 backdrop-blur-sm border border-white/30 text-white hover:bg-white hover:text-[#17181B] transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={next}
              aria-label="Дараагийн зураг"
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 grid place-items-center rounded-full bg-white/15 backdrop-blur-sm border border-white/30 text-white hover:bg-white hover:text-[#17181B] transition-colors"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Counter */}
            <div className="absolute bottom-4 right-4 z-10 text-xs font-semibold text-white bg-black/40 backdrop-blur-sm rounded-full px-3 py-1.5">
              {active + 1} / {SHOWROOM_IMAGES.length}
            </div>
          </div>

          {/* Thumbnails */}
          <div className="mt-4 grid grid-cols-3 sm:grid-cols-6 gap-3">
            {SHOWROOM_IMAGES.map((src, i) => (
              <button
                key={src}
                onClick={() => setActive(i)}
                aria-label={`${i + 1}-р зураг`}
                className={`relative aspect-[4/3] rounded-xl overflow-hidden border-2 transition-all ${
                  i === active ? "border-[#E20A17]" : "border-transparent opacity-60 hover:opacity-100"
                }`}
              >
                <img src={src} alt={`Showroom thumbnail ${i + 1}`} className="w-full h-full object-cover" loading="lazy" />
              </button>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
