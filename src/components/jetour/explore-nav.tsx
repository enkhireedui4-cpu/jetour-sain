"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const NAV_ITEMS = [
  { label: "Загвараа сонгох", href: "/#models", type: "anchor" as const },
  { label: "Санхүүжилт", href: "/financing", type: "route" as const },
  { label: "Үйлчилгээ ба баталгаа", href: "/owners", type: "route" as const },
  { label: "Салбар & холбоо барих", href: "/#contact", type: "anchor" as const },
];

export function ExploreNav() {
  const handleAnchor = (href: string) => {
    const hash = href.slice(1);
    if (window.location.pathname === "/") {
      document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" });
    } else {
      window.location.href = href;
    }
  };

  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="mx-auto w-[min(1280px,94vw)] grid lg:grid-cols-[0.85fr_1.15fr] gap-12 lg:gap-16 items-center">
        {/* Left — navigation */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xs font-bold tracking-[0.22em] uppercase text-[#8A8F98] mb-8">
            Цэс
          </p>
          <div className="flex flex-col">
            {NAV_ITEMS.map((item) =>
              item.type === "route" ? (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group flex items-center justify-between py-5 border-b border-[#E7E7EA] text-[#17181B] hover:text-[#E20A17] transition-colors"
                >
                  <span className="text-lg lg:text-xl font-bold">{item.label}</span>
                  <ArrowRight className="w-5 h-5 text-[#8A8F98] group-hover:text-[#E20A17] group-hover:translate-x-1 transition-all" />
                </Link>
              ) : (
                <button
                  key={item.href}
                  onClick={() => handleAnchor(item.href)}
                  className="group flex items-center justify-between py-5 border-b border-[#E7E7EA] text-left text-[#17181B] hover:text-[#E20A17] transition-colors"
                >
                  <span className="text-lg lg:text-xl font-bold">{item.label}</span>
                  <ArrowRight className="w-5 h-5 text-[#8A8F98] group-hover:text-[#E20A17] group-hover:translate-x-1 transition-all" />
                </button>
              )
            )}
          </div>
        </motion.div>

        {/* Right — image */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative overflow-hidden rounded-3xl bg-[#F5F5F6]"
        >
          <img
            src="/models/x70-plus/deep-sea-blue.png"
            alt="JETOUR X70 Plus"
            className="w-full h-full object-cover aspect-[16/11]"
            loading="lazy"
          />
        </motion.div>
      </div>
    </section>
  );
}
