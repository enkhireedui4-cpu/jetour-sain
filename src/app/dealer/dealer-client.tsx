"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Phone,
  MapPin,
  Clock,
  Mail,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { CONTACT, SHOWROOM_HOURS, BRANCHES } from "@/lib/jetour-data";
import { Navbar } from "@/components/jetour/navbar";
import { Footer } from "@/components/jetour/contact";
import { useDragSwipe } from "@/hooks/use-drag";
import { cyclicOffset, slideJumped } from "@/lib/slider";

const SHOWROOM_IMAGES = [
  "/showroom/showroom-1.jfif",
  "/showroom/showroom-2.jfif",
  "/showroom/showroom-3.jfif",
  "/showroom/showroom-4.jfif",
  "/showroom/showroom-5.jfif",
  "/showroom/showroom-6.jfif",
];

export function DealerClient() {
  const branch = BRANCHES[0];
  /** Одоогийн ба өмнөх зураг — өмнөхийг циклийн "үсрэлт"-ийг илрүүлэхэд хэрэглэнэ */
  const [nav, setNav] = useState({ active: 0, from: 0 });
  const { active, from } = nav;

  const total = SHOWROOM_IMAGES.length;
  const step = (dir: 1 | -1) =>
    setNav((s) => ({ active: (s.active + dir + total) % total, from: s.active }));
  const prev = () => step(-1);
  const next = () => step(1);

  /* Чирэх явцын шилжилт — зураг хуруу дагаж хөдөлнө, тавихад байрандаа суана */
  const [dragDx, setDragDx] = useState(0);
  const dragging = dragDx !== 0;

  const swipe = useDragSwipe({ onNext: next, onPrev: prev, onMove: setDragDx });

  return (
    <div id="main-content" className="min-h-screen bg-white text-[#17181B]">
      <Navbar />

      {/* Толгойн блок бүхэлдээ хасагдав — гарчиг ба тайлбар хоёулаа доорх
          картад давхардаж байв. Хуудас шууд агуулгаараа эхэлнэ.

          `sr-only` h1: хуудсанд ЯМАР Ч ҮЕД нэг h1 байх ёстой — хайлтын
          систем ба дэлгэц уншигчид бүтцийг үүнээс уншина. Харагдахгүй ч
          баримтын бүтэц бүтэн үлдэнэ.

          `pt-28` нь `PageHeader`-ийн эзэлж байсан зайг нөхнө: navbar нь
          `fixed` 64px тул `section-pad-sm` (36–52px) дангаараа хүрэлцэхгүй,
          агуулга түүний доор шургана. */}
      <h1 className="sr-only">Бидний шоурум — SAIN MOTORS, JETOUR-ийн албан ёсны дистрибьютор</h1>

      {/* Info + Enlarged Google Map */}
      {/* `section-pad-sm` хэрэглэхгүй: түүний `padding-block` нь Tailwind-ийн
          `pt-*`-ыг дийлж, агуулга дүүжин navbar-ын доор шургаж байв.
          Дээд/доод зайг тодорхой өгнө. */}
      <section className="bg-white pt-24 lg:pt-32 pb-9 lg:pb-12">
        <div className="container-page grid lg:grid-cols-[0.9fr_1.4fr] gap-6 lg:gap-8 items-stretch">
          {/* Info card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-[#F5F5F6] rounded-2xl p-7 border border-[#E7E7EA] flex flex-col"
          >
            <div className="flex items-start gap-4 mb-6">
              <div className="w-14 h-14 rounded-2xl overflow-hidden shrink-0 ring-1 ring-black/5">
                <Image
                  src="/logos/sain-motors-mark.png"
                  alt="SAIN MOTORS"
                  width={56}
                  height={56}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <p className="eyebrow mb-1">Албан ёсны дистрибьютор</p>
                <p className="font-extrabold text-xl text-[#17181B]">SAIN MOTORS</p>
                <p className="text-xs text-[#6B7280] mt-1">
                  {CONTACT.brandFullName} · {CONTACT.brandSince} оноос хойш
                </p>
              </div>
            </div>

            <div className="space-y-4 flex-1">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#6B7280] mt-0.5 shrink-0" />
                <div>
                  <p className="text-[11px] tracking-[0.18em] uppercase text-[#6B7280] mb-0.5">
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

              {/* Утаснууд — картан дотор карт болохоо болив. Хүрээ, дэвсгэр,
                  дүрсний хайрцаг хасагдаж, hairline-аар зааглагдсан хоёр мөр
                  болов. Шошго 8.8px байсныг 11px болгов (уншигдахгүй байв). */}
              <div className="grid sm:grid-cols-2 gap-x-6 border-t border-[#E7E7EA] pt-4">
                {[
                  { label: "Борлуулалтын ажилтан", num: CONTACT.phone1, href: CONTACT.phone1Href },
                  { label: "Борлуулалтын ажилтан", num: CONTACT.phone2, href: CONTACT.phone2Href },
                ].map((p) => (
                  <a
                    key={p.href}
                    href={p.href}
                    className="group flex items-center gap-2.5 py-2 px-1.5 rounded-lg transition-colors hover:bg-white/70"
                  >
                    <Phone className="w-4 h-4 text-[#6B7280] shrink-0 transition-colors group-hover:text-[#E20A17]" />
                    <span className="min-w-0">
                      <span className="block text-[11px] tracking-[0.14em] uppercase text-[#6B7280] leading-tight">
                        {p.label}
                      </span>
                      <span className="block font-bold text-[#17181B] text-sm tabular-nums">
                        {p.num}
                      </span>
                    </span>
                  </a>
                ))}
              </div>

              <a
                href={`mailto:${CONTACT.email}`}
                className="flex items-center gap-3 hover:text-[#E20A17] transition-colors"
              >
                <Mail className="w-5 h-5 text-[#6B7280] shrink-0" />
                <span className="text-[#17181B] text-sm">{CONTACT.email}</span>
              </a>

              <div className="pt-4 border-t border-[#E7E7EA]">
                <p className="text-[11px] tracking-[0.22em] uppercase text-[#6B7280] mb-3 flex items-center gap-1.5">
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
      <section className="section-pad bg-[#F5F5F6]">
        <div className="container-page">
          {/* Eyebrow → гарчиг → зураг гэсэн шатлал. Зай 40px → 36px. */}
          <div className="mb-9">
            <p className="eyebrow mb-3">Шоурум</p>
            <h2 className="type-h2 text-[#17181B]">Манай танхимаар зочлоорой</h2>
          </div>

          {/* Main image — зураг бүр идэвхтэйгээсээ хамгийн дөт талд зогсож,
              солигдоход хажуугаасаа гүйж орно. Чирэхэд хуруу дагана. */}
          <div
            /* 16:9 (1280px өргөнд 720px) байсныг кино маягийн 2.4:1 (533px)
               болгов — хэсгийн өндрөөс 187px хасагдана. Showroom зураг нь 4:3
               тул `object-cover` илүү тайрна, гэхдээ машин ба JETOUR хаяг тод
               хэвээр (тайралтыг зургаар шалгасан). Утсанд 2.4:1 хэт нарийхан
               болох тул тэнд 16:10. */
            className={`relative rounded-2xl overflow-hidden bg-[#121316] aspect-[16/10] md:aspect-[2.4/1] ${swipe.className}`}
            style={swipe.style}
            {...swipe.handlers}
          >
            {SHOWROOM_IMAGES.map((src, i) => {
              const off = cyclicOffset(i, active, total);
              const frozen = dragging || slideJumped(i, from, active, total);

              return (
                <div
                  key={src}
                  aria-hidden={off !== 0}
                  className="absolute inset-0 transition-transform duration-500 ease-out"
                  style={{
                    transform: `translateX(calc(${off * 100}% + ${dragDx}px))`,
                    ...(frozen ? { transition: "none" } : null),
                  }}
                >
                  <Image
                    src={src}
                    alt={`Showroom ${i + 1}`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 66vw"
                    draggable={false}
                    className="w-full h-full object-cover"
                  />
                </div>
              );
            })}

            {/* Arrows */}
            <button
              onClick={prev}
              aria-label="Өмнөх зураг"
              className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 z-10 w-11 h-11 md:w-10 md:h-10 grid place-items-center rounded-full bg-black/30 text-white transition-[background-color,transform] duration-200 hover:bg-black/55 hover:scale-105 active:scale-95"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={next}
              aria-label="Дараагийн зураг"
              className="absolute right-3 md:right-4 top-1/2 -translate-y-1/2 z-10 w-11 h-11 md:w-10 md:h-10 grid place-items-center rounded-full bg-black/30 text-white transition-[background-color,transform] duration-200 hover:bg-black/55 hover:scale-105 active:scale-95"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Counter */}
            <div className="absolute bottom-4 right-4 z-10 text-xs font-semibold text-white bg-black/40 backdrop-blur-sm rounded-full px-3 py-1.5">
              {active + 1} / {total}
            </div>
          </div>

          {/* Thumbnails */}
          <div className="mt-4 grid grid-cols-3 sm:grid-cols-6 gap-3">
            {SHOWROOM_IMAGES.map((src, i) => (
              <button
                key={src}
                onClick={() => setNav((s) => ({ active: i, from: s.active }))}
                aria-label={`${i + 1}-р зураг`}
                className={`relative aspect-[4/3] rounded-xl overflow-hidden border-2 transition-all ${
                  i === active ? "border-[#E20A17]" : "border-transparent opacity-60 hover:opacity-100"
                }`}
              >
                <Image src={src} alt={`Showroom thumbnail ${i + 1}`} fill sizes="(max-width: 640px) 33vw, 16vw" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
