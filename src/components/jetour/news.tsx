"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar } from "lucide-react";
import { NEWS_ARTICLES } from "@/lib/jetour-data";

export function News() {
  const items = NEWS_ARTICLES.slice(0, 3);

  return (
    <section id="news" className="relative py-24 lg:py-32 bg-white">
      <div className="relative mx-auto w-[min(1280px,94vw)]">
        {/* Header */}
        <div className="text-center mb-14 lg:mb-16">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="eyebrow eyebrow-electric mb-3"
          >
            Мэдээ
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-extrabold tracking-tight text-[#17181B] text-3xl lg:text-5xl"
          >
            Шинэ мэдээлэл
          </motion.h2>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-8 lg:gap-10">
          {items.map((n, i) => (
            <motion.div
              key={n.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Link href={`/news/${n.slug}`} className="group block">
                {/* Image */}
                <div className="relative aspect-[16/11] overflow-hidden rounded-2xl bg-[#F5F5F6] mb-5">
                  <img
                    src={n.image}
                    alt={n.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>

                {/* Title */}
                <h3 className="font-bold text-xl text-[#17181B] mb-3 leading-snug group-hover:text-[#E20A17] transition-colors">
                  {n.title}
                </h3>

                {/* Excerpt */}
                <p className="text-[15px] text-[#54585F] leading-relaxed mb-4 line-clamp-4">
                  {n.excerpt}
                </p>

                {/* Read more */}
                <span className="inline-flex items-center gap-1 text-[#E20A17] font-semibold text-sm group-hover:gap-2 transition-all">
                  Дэлгэрэнгүй »
                </span>

                {/* Date */}
                <p className="mt-3 text-sm text-[#8A8F98] flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" />
                  {n.date}
                </p>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* More news button */}
        <div className="flex justify-center mt-14 lg:mt-16">
          <Link
            href="/news"
            className="inline-flex items-center justify-center bg-[#17181B] text-white px-9 py-4 rounded-full text-sm font-bold tracking-wide hover:bg-[#E20A17] transition-colors"
          >
            Бүх мэдээ
          </Link>
        </div>
      </div>
    </section>
  );
}
