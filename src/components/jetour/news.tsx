"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Calendar } from "lucide-react";
import { NEWS_ARTICLES } from "@/lib/jetour-data";

export function News() {
  const items = NEWS_ARTICLES.slice(0, 3);

  return (
    <section id="news" className="relative py-24 lg:py-32 bg-[#F5F5F6]">
      <div className="relative mx-auto w-[min(1280px,94vw)]">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 mb-12 lg:mb-14">
          <div className="max-w-xl">
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
          <Link
            href="/news"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#17181B] hover:text-[#E20A17] transition-colors"
          >
            Бүх мэдээ
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {items.map((n, i) => (
            <motion.div
              key={n.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Link href={`/news/${n.slug}`} className="group block h-full">
                <article className="bg-white rounded-2xl overflow-hidden border border-[#E7E7EA] card-lift h-full flex flex-col">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img
                      src={n.image}
                      alt={n.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute top-3.5 left-3.5">
                      <span className="text-[0.6rem] font-semibold tracking-[0.16em] uppercase px-2.5 py-1 rounded-full bg-[#E20A17] text-white">
                        {n.tag}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 flex flex-col flex-1">
                    <p className="text-xs text-[#8A8F98] mb-2 flex items-center gap-1.5">
                      <Calendar className="w-3 h-3" />
                      {n.date}
                    </p>
                    <h3 className="font-bold text-lg text-[#17181B] mb-2.5 leading-snug group-hover:text-[#E20A17] transition-colors">
                      {n.title}
                    </h3>
                    <p className="text-sm text-[#54585F] leading-relaxed mb-4 line-clamp-3">{n.excerpt}</p>
                    <span className="mt-auto inline-flex items-center gap-1.5 text-[#17181B] font-semibold text-sm group-hover:gap-2.5 transition-all">
                      Цааш унших
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </article>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
