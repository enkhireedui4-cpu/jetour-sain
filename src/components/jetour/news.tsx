"use client";

import { useEffect, useRef, useState } from "react";
import { useDragScroll } from "@/hooks/use-drag";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Calendar, ArrowRight } from "lucide-react";
import type { NewsArticle } from "@/lib/jetour-data";

export function News({ articles }: { articles: NewsArticle[] }) {
  const items = articles.slice(0, 4);

  return (
    <section id="news" className="relative section-pad bg-white overflow-hidden">
      {/* Header */}
      <div className="relative container-page">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10 lg:mb-14"
        >
          <h2 className="type-h2 text-[#17181B]">Сүүлийн үеийн мэдээ</h2>
        </motion.div>

      </div>

      {/* Бүх дэлгэц — гол мэдээ голдоо том, хажуугийн мэдээнүүд хажуу тийш бага зэрэг харагдана
          (featured center + peek carousel, allur.kz маягийн) */}
      <NewsCarousel items={items} />
    </section>
  );
}

/** Гол мэдээ голдоо том харагдаж, хажуугийн мэдээнүүд ирмэгээр бага зэрэг үзэгдэнэ.
    Хуруугаар/чичрүүлж шударна, хэдэн секунд тутам автоматаар гүйж солигдоно. */
function NewsCarousel({ items }: { items: NewsArticle[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const activeRef = useRef(0);
  const pausedRef = useRef(false);

  const strideOf = (el: HTMLDivElement) =>
    el.children.length > 1
      ? (el.children[1] as HTMLElement).offsetLeft - (el.children[0] as HTMLElement).offsetLeft
      : el.clientWidth;

  const onScroll = () => {
    const el = ref.current;
    if (!el) return;
    const i = Math.round(el.scrollLeft / strideOf(el));
    const clamped = Math.max(0, Math.min(items.length - 1, i));
    activeRef.current = clamped;
    setActive(clamped);
  };

  // Авто-солигдол (4.5 сек) — хэрэглэгч шүрэн шударсны дараа түр зогсоно
  useEffect(() => {
    const t = setInterval(() => {
      const el = ref.current;
      if (!el || pausedRef.current) return;
      const nextI = (activeRef.current + 1) % items.length;
      el.scrollTo({ left: nextI === 0 ? 0 : strideOf(el) * nextI, behavior: "smooth" });
    }, 4500);
    return () => clearInterval(t);
  }, [items.length]);

  const goTo = (i: number) => {
    const el = ref.current;
    if (!el) return;
    el.scrollTo({ left: i === 0 ? 0 : strideOf(el) * i, behavior: "smooth" });
  };

  const pause = () => {
    pausedRef.current = true;
  };
  const resumeSoon = () => {
    window.setTimeout(() => {
      pausedRef.current = false;
    }, 5000);
  };

  // Хулганаар чирэх (хуруунд төрөлхийн scroll хэвээр)
  const dragScroll = useDragScroll(ref, {
    step: () => {
      const el = ref.current;
      return el ? strideOf(el) : 0;
    },
  });

  return (
    <div className="mt-2">
      <div
        ref={ref}
        onScroll={onScroll}
        onPointerDown={(e) => {
          pause();
          dragScroll.handlers.onPointerDown(e);
        }}
        onPointerMove={dragScroll.handlers.onPointerMove}
        onPointerUp={(e) => {
          dragScroll.handlers.onPointerUp(e);
          resumeSoon();
        }}
        onPointerCancel={(e) => {
          dragScroll.handlers.onPointerCancel(e);
          resumeSoon();
        }}
        onDragStart={dragScroll.handlers.onDragStart}
        className={`flex gap-4 lg:gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide px-[7vw] lg:px-[13vw] pb-2 ${dragScroll.className}`}
        style={{ scrollbarWidth: "none" }}
      >
        {items.map((n) => (
          <div
            key={n.slug}
            className="snap-center shrink-0 w-[86vw] sm:w-[64vw] md:w-[46vw] lg:w-[34vw] max-w-[520px]"
          >
            <NewsCard n={n} />
          </div>
        ))}
      </div>

      {/* Цэгүүд */}
      <div className="flex items-center justify-center gap-2 mt-6 lg:mt-8">
        {items.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`${i + 1}-р мэдээ`}
            className="h-1.5 rounded-full transition-all"
            style={{
              width: i === active ? 22 : 7,
              background: i === active ? "#E20A17" : "#D9DADE",
            }}
          />
        ))}
      </div>

      <div className="flex justify-center mt-7 lg:mt-9">
        <Link
          href="/news"
          className="inline-flex items-center justify-center bg-[#17181B] text-white px-9 py-3.5 lg:py-4 rounded-full text-sm font-bold tracking-wide hover:bg-[#E20A17] active:bg-[#E20A17] transition-colors"
        >
          Бүх мэдээ
        </Link>
      </div>
    </div>
  );
}

/** Тансаг мэдээний карт — дээр зураг (gradient + категори), доор гарчиг/тайлбар */
function NewsCard({ n }: { n: NewsArticle }) {
  return (
    <Link href={`/news/${n.slug}`} className="group block">
      {/* Зураг */}
      <div className="relative aspect-[4/3] md:aspect-[16/11] overflow-hidden rounded-2xl bg-[#0E0E10] shadow-[0_16px_40px_-24px_rgba(23,24,27,0.5)] ring-1 ring-black/[0.04]">
        <Image
          src={n.image}
          alt={n.title}
          fill
          sizes="(max-width: 640px) 86vw, (max-width: 768px) 64vw, (max-width: 1024px) 46vw, 520px"
          className="w-full h-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.06]"
        />
        {/* Тансаг харагдацын gradient scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/0 to-black/10 pointer-events-none" />
        {/* Категори chip */}
        <span className="absolute top-4 left-4 inline-flex items-center rounded-full bg-white/95 backdrop-blur px-3 py-1 text-[11px] font-bold tracking-wide text-[#17181B] shadow-sm">
          {n.type}
        </span>
      </div>

      {/* Гарчиг */}
      <h3 className="font-bold text-xl text-[#17181B] mt-5 mb-2.5 leading-snug group-hover:text-[#E20A17] transition-colors line-clamp-2">
        {n.title}
      </h3>

      {/* Тайлбар */}
      <p className="text-[15px] text-[#54585F] leading-relaxed mb-4 line-clamp-3">{n.excerpt}</p>

      {/* Огноо + дэлгэрэнгүй */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-[#6B7280] flex items-center gap-1.5">
          <Calendar className="w-4 h-4" />
          {n.date}
        </p>
        <span className="inline-flex items-center gap-1 text-[#E20A17] font-semibold text-sm group-hover:gap-2 transition-all">
          Дэлгэрэнгүй
          <ArrowRight className="w-4 h-4" />
        </span>
      </div>
    </Link>
  );
}
