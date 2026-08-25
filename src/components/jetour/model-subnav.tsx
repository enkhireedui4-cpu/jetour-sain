"use client";

import { useEffect, useState } from "react";
import { CONTACT } from "@/lib/jetour-data";

/**
 * Загварын хуудасны наалдамхай дэд цэс.
 *
 * ЯАГААД: загварын хуудас утсан дээр ~7.6 дэлгэц урт бөгөөд дотроо 4–5
 * хэсэгтэй ч тэдгээрийн хооронд шилжих зам байхгүй байв. Хүсэлтийн форм нь
 * хуудасны 85%-д байрладаг тул CTA-д хүрэхийн тулд бүх зүйлийг гүйлгэх
 * шаардлагатай байсан.
 *
 * ГҮЙЦЭТГЭЛ (зориудаар хамгийн хөнгөн):
 *   · Наалдалт — цэвэр CSS `position: sticky`. Scroll listener БАЙХГҮЙ.
 *   · Үсрэлт — төрөлх `<a href="#id">`. Хэсгүүдэд `scroll-mt-16` аль хэдийн бий.
 *   · JS нь ЗӨВХӨН идэвхтэй хэсгийг тодруулахад — нэг `IntersectionObserver`.
 *
 * Зангуунууд нь хуудсанд БОДИТООР байгаагаас бүрдэнэ: загвар бүр өөр хэсэгтэй
 * (жишээ нь T1-д `exterior`/`interior` байхгүй, тэдгээр нь ерөнхий `sections`
 * бүтээгчээр гардаг). Хатуу жагсаалт бичвэл байхгүй хэсэг рүү заасан эвдэрсэн
 * холбоос үлдэнэ.
 */

type Item = { id: string; label: string };

export function ModelSubnav({
  modelName,
  items,
}: {
  modelName: string;
  /** Эцэг нь хуудсанд юу рендерлэснээ мэднэ — эндээс тааварлахгүй */
  items: Item[];
}) {
  const [active, setActive] = useState<string | null>(null);
  const [shown, setShown] = useState(false);

  /* Дэд цэс нь толгойн ОРОНД солигдоно, доор нь нэмэгдэхгүй.
     Эхэнд харагдахгүй; hero-г өнгөрөөд гүйлгэхэд толгой дээшээ гулсаж, энэ
     нь түүний байрыг эзэлнэ. `<html>`-д класс тавьж, толгойг нуух ажлыг CSS
     хийнэ — Navbar нь бүх хуудсанд нийтлэг тул түүнд prop дамжуулахгүй.

     Scroll listener нь `passive` бөгөөд нэг л харьцуулалт хийнэ — Navbar
     өөрөө яг ийм хэвээр ажилладаг (`scrollY > 60`). */
  useEffect(() => {
    const onScroll = () => {
      /* Босго нь дэлгэцийн өндрөөс хамаарна: hero нь ~100svh тул ширээний
         компьютер (900px) ба утас (812px) хоёрт ижил мэдрэмж өгнө. Тогтмол
         420px бол утсан дээр hero дундуур гарч ирдэг байв. */
      const on = window.scrollY > window.innerHeight * 0.6;
      setShown(on);
      document.documentElement.classList.toggle("msub-on", on);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      document.documentElement.classList.remove("msub-on");
    };
  }, []);

  useEffect(() => {
    if (items.length === 0) return;

    /* Идэвхтэй хэсэг: дэлгэцийн ДЭЭД гуравны нэгд орсныг сонгоно.
       `rootMargin`-ийн доод утга сөрөг тул хэсэг доод талаараа орж ирэхэд
       идэвхжихгүй — уншиж буй хэсэг л тодорно. */
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-72px 0px -66% 0px", threshold: 0 }
    );

    for (const it of items) {
      const el = document.getElementById(it.id);
      if (el) io.observe(el);
    }
    return () => io.disconnect();
  }, [items]);

  if (items.length === 0) return null;

  return (
    <div className={`msub${shown ? " is-on" : ""}`} aria-hidden={!shown}>
      <div className="msub__inner container-page">
        <span className="msub__name">{modelName.replace(/^JETOUR\s+/, "")}</span>

        {/* Нарийн дэлгэцэд хэвтээ гүйнэ — таслахгүй, багасгахгүй */}
        <nav className="msub__links" aria-label="Хуудасны хэсгүүд">
          {items.map((it) => (
            <a
              key={it.id}
              href={`#${it.id}`}
              aria-current={active === it.id ? "true" : undefined}
              className={`msub__link${active === it.id ? " is-active" : ""}`}
            >
              {it.label}
            </a>
          ))}
        </nav>

        <div className="msub__cta">
          <a href={CONTACT.phone1Href} className="msub__phone">
            {CONTACT.phone1}
          </a>
          <a href="#request-info" className="msub__book">
            Тест драйв
          </a>
        </div>
      </div>
    </div>
  );
}
