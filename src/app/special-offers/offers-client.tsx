"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowRight, Phone } from "lucide-react";
import { CONTACT } from "@/lib/jetour-data";
import type { SpecialOffer } from "@/lib/jetour-data";
import { Navbar } from "@/components/jetour/navbar";
import { Footer } from "@/components/jetour/contact";
import { useDragSwipe } from "@/hooks/use-drag";
import { cyclicOffset, slideJumped } from "@/lib/slider";

export default function SpecialOffersClient({ offers: OFFERS }: { offers: SpecialOffer[] }) {
  /** Одоогийн ба өмнөх санал — өмнөхийг циклийн "үсрэлт"-ийг илрүүлэхэд хэрэглэнэ */
  const [nav, setNav] = useState({ active: 0, from: 0 });
  const { active, from } = nav;
  const [paused, setPaused] = useState(false);
  const offer = OFFERS[active];

  const step = useCallback(
    (dir: 1 | -1) =>
      setNav((s) => ({
        active: (s.active + dir + OFFERS.length) % OFFERS.length,
        from: s.active,
      })),
    [OFFERS.length]
  );
  const prev = () => step(-1);
  const next = useCallback(() => step(1), [step]);

  // Авто-гүйлгэлт (jetour.kz шиг)
  useEffect(() => {
    if (paused || OFFERS.length === 0) return;
    const t = setInterval(next, 5000);
    return () => clearInterval(t);
  }, [next, paused, active, OFFERS.length]);

  /* Чирэх явцын шилжилт — зураг хуруу дагаж хөдөлнө, тавихад байрандаа суана */
  const [dragDx, setDragDx] = useState(0);
  const dragging = dragDx !== 0;

  // Хулганаар чирэх / хуруугаар шудрах
  const swipe = useDragSwipe({
    onNext: next,
    onPrev: prev,
    onStart: () => setPaused(true),
    onEnd: () => setPaused(false),
    onMove: setDragDx,
  });

  if (OFFERS.length === 0) {
    return (
      <div id="main-content" className="min-h-screen bg-white text-[#17181B]">
        <Navbar />
        <div className="h-16" />
        <div className="py-32 text-center text-[#54585F]">Одоогоор тусгай санал байхгүй байна.</div>
        <Footer />
      </div>
    );
  }

  return (
    <div id="main-content" className="min-h-screen bg-white text-[#17181B]">
      <Navbar />
      <div className="h-16" />

      {/* ── Featured slider ── */}
      <section className="section-pad">
        <div
          className="container-page grid lg:grid-cols-[0.8fr_1.2fr] gap-10 lg:gap-16 items-center"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* Left — text */}
          <div className="order-2 lg:order-1">
            <p className="eyebrow mb-6">Тусгай саналууд</p>
            <div key={offer.id}>
              <h1 className="type-h1 text-[#17181B] mb-5">{offer.title}</h1>
              <p className="type-lead max-w-md mb-8">{offer.desc}</p>
            </div>

            <Link
              href={`/special-offers/${offer.id}`}
              className="btn-ink-jetour inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm"
            >
              Дэлгэрэнгүй мэдээлэл
              <ArrowRight className="w-4 h-4" />
            </Link>

            {/* Controls */}
            <div className="flex items-center gap-3 mt-12">
              <button
                onClick={prev}
                aria-label="Өмнөх"
                className="w-11 h-11 grid place-items-center rounded-full border border-[#E7E7EA] text-[#17181B] hover:bg-[#17181B] hover:text-white hover:border-[#17181B] transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={next}
                aria-label="Дараагийн"
                className="w-11 h-11 grid place-items-center rounded-full border border-[#E7E7EA] text-[#17181B] hover:bg-[#17181B] hover:text-white hover:border-[#17181B] transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Dots */}
            <div className="flex items-center gap-2 mt-6">
              {OFFERS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setNav((s) => ({ active: i, from: s.active }))}
                  aria-label={`${i + 1}-р санал`}
                  className={`h-1 rounded-full transition-all ${
                    i === active ? "w-8 bg-[#17181B]" : "w-4 bg-[#D9DADD] hover:bg-[#B5B8BD]"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Right — poster carousel (slide-in) */}
          <div className="order-1 lg:order-2 lg:-mr-[max(0px,calc((100vw-1280px)/2))]">
            <div
              className={`relative w-full overflow-hidden rounded-2xl ${
                OFFERS.length > 1 ? swipe.className : ""
              }`}
              style={OFFERS.length > 1 ? swipe.style : undefined}
              {...(OFFERS.length > 1 ? swipe.handlers : {})}
            >
              {/* Постер бүр идэвхтэйгээсээ хамгийн дөт талд зогсоно — циклээр
                  эргэхэд ч зөвхөн нэг дэлгэцийн зайд, зөв чиглэлд гүйнэ. */}
              <div className="relative aspect-[4/3]">
                {OFFERS.map((o, i) => {
                  const off = cyclicOffset(i, active, OFFERS.length);
                  const frozen = dragging || slideJumped(i, from, active, OFFERS.length);

                  return (
                    <div
                      key={o.id}
                      className="absolute inset-0 flex items-center justify-center transition-transform duration-500 ease-out"
                      style={{
                        transform: `translateX(calc(${off * 100}% + ${dragDx}px))`,
                        ...(frozen ? { transition: "none" } : null),
                      }}
                      aria-hidden={off !== 0}
                    >
                      <img
                        src={o.poster}
                        alt={o.title}
                        draggable={false}
                        className="max-w-full max-h-full w-auto h-auto object-contain"
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── All offers grid ── */}
      <section className="section-pad bg-[#F5F5F6] border-t border-[#E7E7EA]">
        <div className="container-page">
          <h2 className="type-h2 text-[#17181B] mb-10">Бүх санал</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {OFFERS.map((o, i) => (
              <motion.div
                key={o.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
              >
                <Link
                  href={`/special-offers/${o.id}`}
                  className="group block bg-white rounded-2xl overflow-hidden card-lift h-full"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-[#121316]">
                    <Image
                      src={o.poster}
                      alt={o.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="type-h3 text-[#17181B] mb-2 text-xl">{o.title}</h3>
                    <p className="text-[#54585F] leading-relaxed line-clamp-2 mb-4">
                      {o.desc}
                    </p>
                    <span className="inline-flex items-center gap-1.5 text-[#E20A17] font-semibold text-sm group-hover:gap-2.5 transition-all">
                      Дэлгэрэнгүй
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Contact CTA */}
          <div className="mt-14 flex flex-wrap gap-3">
            <a
              href={CONTACT.phone1Href}
              className="btn-electric-jetour inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm"
            >
              <Phone className="w-4 h-4" />
              {CONTACT.phone1}
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
