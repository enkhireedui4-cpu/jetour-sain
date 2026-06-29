"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowRight, Phone } from "lucide-react";
import { CONTACT } from "@/lib/jetour-data";
import { Navbar } from "@/components/jetour/navbar";
import { Footer } from "@/components/jetour/contact";

type Offer = {
  id: string;
  modelId: string;
  poster: string;
  title: string;
  desc: string;
};

const OFFERS: Offer[] = [
  {
    id: "x70-plus",
    modelId: "x70-plus",
    poster: "/offers/x70-offer.png",
    title: "Jetour X70 Plus — зээл 1.5% хүүтэй",
    desc: "10% урьдчилгаатай, сарын 1.5% хүүтэй, 96 сар хүртэлх хугацаатай. Гэр бүлийн 7 суудалт орчин үеийн SUV.",
  },
  {
    id: "x50",
    modelId: "x50",
    poster: "/offers/x50-offer.png",
    title: "Jetour X50 — таатай зээлийн нөхцөл",
    desc: "Хотын амьдралд төгс тохирох кроссовер. 10% урьдчилгаа, 1.5% сарын хүү, 96 сар хүртэл.",
  },
  {
    id: "x1",
    modelId: "x1",
    poster: "/offers/x1-offer.png",
    title: "Jetour X1 — хотын ухаалаг сонголт",
    desc: "Залуу өрх, анхны машинд. Уян хатан зээлийн нөхцөл — 10% урьдчилгаа, 1.5% сарын хүү.",
  },
  {
    id: "t1",
    modelId: "t1",
    poster: "/offers/t1-offer.png",
    title: "Jetour T цуврал — аяллын баатар",
    desc: "Travel+ философиор бүтээгдсэн бартаат замын SUV. 10% урьдчилгаа, 1.5% сарын хүү, 96 сар хүртэл.",
  },
];

export default function SpecialOffersPage() {
  const [active, setActive] = useState(0);
  const offer = OFFERS[active];

  const prev = () => setActive((p) => (p - 1 + OFFERS.length) % OFFERS.length);
  const next = () => setActive((p) => (p + 1) % OFFERS.length);

  return (
    <div className="min-h-screen bg-white text-[#17181B]">
      <Navbar />
      <div className="h-16" />

      {/* ── Featured slider ── */}
      <section className="bg-white pt-10 lg:pt-14 pb-16 lg:pb-20">
        <div className="mx-auto w-[min(1280px,94vw)] grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          {/* Left — text */}
          <div className="order-2 lg:order-1">
            <p className="text-xs font-bold tracking-[0.24em] uppercase text-[#8A8F98] mb-8">
              Тусгай саналууд
            </p>
            <div key={offer.id}>
              <h1 className="font-extrabold tracking-tight text-[#17181B] text-2xl lg:text-4xl leading-tight mb-4">
                {offer.title}
              </h1>
              <p className="text-[#54585F] text-base leading-relaxed max-w-md mb-7">
                {offer.desc}
              </p>
            </div>

            <Link
              href={`/models/${offer.modelId}`}
              className="inline-flex items-center gap-2 bg-[#17181B] text-white px-7 py-3.5 rounded-lg text-sm font-bold hover:bg-[#E20A17] transition-colors"
            >
              Дэлгэрэнгүй мэдээлэл
            </Link>

            {/* Controls */}
            <div className="flex items-center gap-3 mt-12">
              <button
                onClick={prev}
                aria-label="Өмнөх"
                className="w-11 h-11 grid place-items-center rounded-lg border border-[#E7E7EA] text-[#17181B] hover:bg-[#17181B] hover:text-white transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={next}
                aria-label="Дараагийн"
                className="w-11 h-11 grid place-items-center rounded-lg border border-[#E7E7EA] text-[#17181B] hover:bg-[#17181B] hover:text-white transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Dots */}
            <div className="flex items-center gap-2 mt-6">
              {OFFERS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  aria-label={`${i + 1}-р санал`}
                  className={`h-1 rounded-full transition-all ${
                    i === active ? "w-8 bg-[#17181B]" : "w-4 bg-[#D9Dadd] hover:bg-[#B5B8BD]"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Right — poster */}
          <div className="order-1 lg:order-2">
            <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-[#F5F5F6]">
              <img
                key={offer.id}
                src={offer.poster}
                alt={offer.title}
                className="absolute inset-0 w-full h-full object-contain transition-opacity duration-300"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── All offers grid ── */}
      <section className="bg-[#F5F5F6] py-16 lg:py-20 border-t border-[#E7E7EA]">
        <div className="mx-auto w-[min(1280px,94vw)]">
          <h2 className="font-extrabold tracking-tight text-[#17181B] text-2xl lg:text-3xl mb-8">
            Бүх санал
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {OFFERS.map((o, i) => (
              <motion.div
                key={o.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
              >
                <Link
                  href={`/models/${o.modelId}`}
                  className="group block bg-white rounded-2xl overflow-hidden border border-[#E7E7EA] hover:shadow-lg hover:border-[#E20A17] transition-all h-full"
                >
                  <div className="aspect-[16/10] overflow-hidden bg-[#0E0E10]">
                    <img
                      src={o.poster}
                      alt={o.title}
                      className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold text-base text-[#17181B] mb-2 leading-snug group-hover:text-[#E20A17] transition-colors">
                      {o.title}
                    </h3>
                    <p className="text-sm text-[#54585F] leading-relaxed line-clamp-2 mb-3">
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
          <div className="mt-12 flex flex-wrap gap-3">
            <a
              href={CONTACT.phone1Href}
              className="btn-electric-jetour inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-sm"
            >
              <Phone className="w-4 h-4" />
              {CONTACT.phone1}
            </a>
            <Link
              href="/financing"
              className="inline-flex items-center gap-2 bg-[#17181B] text-white px-6 py-3.5 rounded-full text-sm font-bold hover:bg-[#E20A17] transition-colors"
            >
              Зээлийн тооцоолуур
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
