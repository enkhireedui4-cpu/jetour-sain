"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import type { NewsArticle } from "@/lib/jetour-data";

/**
 * Мэдээ ба үйл явдал — нүүр хуудасны редакцийн хэсэг.
 *
 * ГҮЙЛГЭЛТИЙН ШИЙДЭЛ. Хуучин карусель нь чирэх hook, циклийн офсет,
 * transform-ийн тооцоо, тоолуур бүхий ~80 мөр байв. Одоо гүйлгэлтийг
 * ТӨРӨЛХ `scroll-snap` хийнэ: хуруу, trackpad, чирэлт, гар — бүгд өөрөө
 * ажиллана. JS нь зөвхөн хоёр сумны `scrollBy` (~10 мөр).
 *
 * Сум нь БАГТААХААС ОЛОН мэдээ байвал л гарна (`> perView`). Аудитаар одоо
 * мэдээ 2 — ширээнд хоёул зэрэг харагддаг тул тэр үед сум ажилгүй UI болно.
 * Мэдээ нэмэгдмэгц сум өөрөө гарч ирнэ, код хөндөх шаардлагагүй.
 *
 * Шатлал: КАТЕГОРИ → гарчиг → огноо + Дэлгэрэнгүй. Категори нь зураг дээрх
 * том цагаан pill байсныг гарчгийн дээрх жижиг шошго болгов.
 */

/** Ширээний компьютерт нэг дор харагдах карт — сум хэрэгтэй эсэхийг шийднэ */
const PER_VIEW = 2;

export function News({ articles }: { articles: NewsArticle[] }) {
  const items = articles.slice(0, 8);
  const track = useRef<HTMLUListElement>(null);

  if (items.length === 0) return null;
  const scrollable = items.length > PER_VIEW;

  /** Нэг картын өргөнөөр гүйлгэнэ — зайг нь оруулж тооцно */
  const nudge = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    const card = el.querySelector("li");
    const step = card ? card.getBoundingClientRect().width + 28 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  return (
    <section id="news" className="nws">
      <div className="container-page">
        <header className="nws__head">
          <div className="nws__headText">
            <h2 className="nws__title">Мэдээ &amp; Үйл явдал</h2>
            <p className="nws__lead">
              JETOUR-ийн шинэ загвар, технологи, арга хэмжээ болон онцлох мэдээ.
            </p>
          </div>

          {/* Сум — зөвхөн багтаахаас олон мэдээ байвал */}
          {scrollable && (
            <div className="nws__nav">
              <button type="button" onClick={() => nudge(-1)} aria-label="Өмнөх мэдээ" className="nws__navBtn">
                <ChevronLeft className="w-4 h-4" aria-hidden />
              </button>
              <button type="button" onClick={() => nudge(1)} aria-label="Дараагийн мэдээ" className="nws__navBtn">
                <ChevronRight className="w-4 h-4" aria-hidden />
              </button>
            </div>
          )}
        </header>

        <ul ref={track} className={`nws__track${scrollable ? " is-scrollable" : ""}`}>
          {items.map((n) => (
            <li key={n.slug}>
              <Link href={`/news/${n.slug}`} className="nws__card group">
                <span className="nws__media">
                  <Image
                    src={n.image}
                    alt={n.title}
                    fill
                    sizes="(min-width: 768px) 46vw, 86vw"
                    className="nws__img"
                  />
                </span>

                <span className="nws__cat">{n.type}</span>
                <h3 className="nws__h3">{n.title}</h3>

                <span className="nws__foot">
                  <time className="nws__date">{n.date}</time>
                  <span className="nws__more">
                    Дэлгэрэнгүй
                    <ArrowRight className="nws__arrow" aria-hidden />
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <div className="nws__all">
          <Link href="/news" className="nws__btn">
            Бүх мэдээг үзэх
            <ArrowRight className="w-4 h-4" aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  );
}
