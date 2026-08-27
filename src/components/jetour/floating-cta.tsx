"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Phone, X } from "lucide-react";
import { CONTACT } from "@/lib/jetour-data";
import { trackMetaEvent } from "./meta-pixel";
import { openQuickLead } from "./quick-lead";

/**
 * Хөвөгч холбоо барих товч — сайтын ТОГТМОЛ холбогдох цэг.
 *
 * ӨМНӨ НЬ энэ товч дарахад гурван дугуй товч задарч байв: залгах, тест
 * драйв, WhatsApp. Гурав нь адил жинтэй харагдаж, хэрэглэгч алийг нь
 * дарахаа бодох хэрэгтэй болдог. Одоо ХОЁР л сонголт:
 *
 *   · Шууд залгах   — одоо ярихад бэлэн хүнд
 *   · Дугаар үлдээх — ярих боломжгүй, эсвэл ярихыг хүсэхгүй хүнд
 *
 * WhatsApp хасагдсан ч хаагдаагүй — хөл хэсэгт хэвээр байна (`contact.tsx`).
 * Тест драйв нь `/info-request`-ээр дамжина.
 */
export function FloatingCTA() {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const firstItemRef = useRef<HTMLAnchorElement>(null);

  /**
   * Доош гүйлгэхэд далд болж, дээш гүйлгэхэд эргэн гарна — контент уншиж
   * байхад товч халхлахгүй. Цэс нээлттэй үед далд болгохгүй.
   */
  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      const delta = y - last;
      if (Math.abs(delta) > 8) {
        setHidden(delta > 0 && y > 240);
        last = y;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const close = useCallback(() => setOpen(false), []);

  /* Esc болон гадуур дарахад хаана — жижиг цонх тул хялбар байх ёстой */
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    const onDown = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) close();
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onDown);
    const t = window.setTimeout(() => firstItemRef.current?.focus(), 40);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onDown);
      window.clearTimeout(t);
    };
  }, [open, close]);

  return (
    <div
      ref={wrapRef}
      /* Хэсгүүдийн хооронд "үсрэхгүй" — fixed, дэлгэцийн ирмэгээс тогтмол зайд.
         Утасны safe-area (iOS home indicator) -г тооцно. */
      style={{
        bottom: "calc(1.25rem + env(safe-area-inset-bottom, 0px))",
        right: "calc(1.25rem + env(safe-area-inset-right, 0px))",
      }}
      className={`fcta ${
        hidden && !open ? "fcta--away" : ""
      }`}
    >
      {open && (
        <div className="fcta__menu" role="menu" aria-label="Холбоо барих">
          <a
            ref={firstItemRef}
            role="menuitem"
            href={CONTACT.phone1Href}
            onClick={() => {
              trackMetaEvent("Contact", { method: "phone" });
              close();
            }}
            className="fcta__item"
          >
            <span className="fcta__itemLabel">Шууд залгах</span>
            <span className="fcta__itemMeta">{CONTACT.phone1}</span>
          </a>

          <button
            role="menuitem"
            type="button"
            onClick={() => {
              close();
              openQuickLead();
            }}
            className="fcta__item fcta__item--ghost"
          >
            <span className="fcta__itemLabel">Дугаар үлдээх</span>
            <span className="fcta__itemMeta">Бид тантай холбогдоно</span>
          </button>
        </div>
      )}

      <button
        onClick={() => setOpen(!open)}
        aria-label={open ? "Хаах" : "Холбоо барих"}
        aria-expanded={open}
        className={`fcta__btn ${open ? "fcta__btn--open" : ""}`}
      >
        {open ? <X className="w-6 h-6" aria-hidden /> : <Phone className="w-6 h-6" aria-hidden />}
      </button>
    </div>
  );
}
