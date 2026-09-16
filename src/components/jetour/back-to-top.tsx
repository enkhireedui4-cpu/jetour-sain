"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

/**
 * «Дээш буцах» — тодорхой хэмжээнд доош гүйлгэсний дараа гарч ирнэ.
 *
 * Байрлал: баруун доод булан, холбоо барих товчны ДЭЭР. Хоёулаа нэг л
 * баганад эгнэнэ — хэрэглэгч нэг л газар харна.
 *
 * Холбоо барих цэс нээгдэхэд энэ товч түр далд болно: цэс нь товчноосоо
 * ДЭЭШ задардаг тул яг энэ талбайг эзэлнэ. Хоёр компонент хооронд import
 * татахын оронд `<html data-fcta-open>` шинжээр дамжина — CSS өөрөө шийднэ.
 *
 * Босго нь ДЭЛГЭЦИЙН ӨНДРӨӨР хэмжигдэнэ (px биш): нэг дэлгэц гаруй гүйлгэсэн
 * үед л «буцах зам урт боллоо» гэж тооцогдоно. Утас, ширээн дээр ижил
 * мэдрэмж өгнө.
 */
export function BackToTop() {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    let raf = 0;
    const measure = () => {
      raf = 0;
      setShown(window.scrollY > window.innerHeight * 1.2);
    };
    /* Гүйлгэх бүрт биш, кадр тутамд нэг л хэмжинэ — scroll нь секундэд
       олон арван удаа дуудагддаг тул шууд ажиллуулбал утсан дээр чирэгдэнэ. */
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const toTop = () => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <button
      type="button"
      onClick={toTop}
      aria-label="Дээш буцах"
      /* Харагдахгүй үед `inert` биш `tabindex=-1`: DOM-д үлдэж, зөвхөн
         товшилт/фокусаас түр гарна. Гарч ирэхэд дахин товшигдоно. */
      tabIndex={shown ? 0 : -1}
      aria-hidden={!shown}
      className={`btt ${shown ? "btt--in" : ""}`}
    >
      <ArrowUp className="btt__icon" strokeWidth={2} aria-hidden />
    </button>
  );
}
