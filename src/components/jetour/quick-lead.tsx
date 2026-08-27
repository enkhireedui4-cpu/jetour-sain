"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import { trackMetaEvent } from "./meta-pixel";

/**
 * Хурдан хүсэлт — НЭР ба УТАС хоёр талбар, өөр юу ч байхгүй.
 *
 * ЯАГААД ТУСДАА КОМПОНЕНТ. `EnhancedLeadForm` нь загвар, салбар, огноо, цаг,
 * харилцах хэрэгсэл, зурвас гэсэн долоон нэмэлт талбартай. Хуудсан дээрх
 * бүтэн маягтад тэр нь зөв, харин «Хүсэлт үлдээх» дарсан хүнд хэт их саад.
 * Энд зөвхөн холбогдоход хэрэгтэй хоёр л зүйлийг асууна.
 *
 * ДУУДАХ АРГА нь window-ийн үйл явдал. Provider-ээр бүх модыг ороохгүйгээр
 * сайтын аль ч товч `openQuickLead()`-ыг дуудаж чадна. Компонент нь
 * `layout.tsx`-д НЭГ л удаа холбогдоно.
 */

const EVENT = "jetour:quick-lead";

/** Сайтын аль ч газраас хурдан хүсэлтийн цонхыг нээнэ */
export function openQuickLead() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent(EVENT));
  }
}

/** API-ийн дүрэмтэй ижил: 7–12 орон (`src/lib/leads.ts`) */
function phoneIsValid(value: string): boolean {
  const digits = value.replace(/\D/g, "");
  return digits.length >= 7 && digits.length <= 12;
}

export function QuickLead() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);

  const nameRef = useRef<HTMLInputElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  /** Нээхийн өмнөх фокус — хаахад тэр товч руугаа буцна */
  const returnTo = useRef<HTMLElement | null>(null);

  const close = useCallback(() => {
    setOpen(false);
    setError(null);
    returnTo.current?.focus();
  }, []);

  useEffect(() => {
    const onOpen = () => {
      returnTo.current = document.activeElement as HTMLElement | null;
      setDone(false);
      setError(null);
      setOpen(true);
    };
    window.addEventListener(EVENT, onOpen);
    return () => window.removeEventListener(EVENT, onOpen);
  }, []);

  /* Нээлттэй үед: араас нь гүйлгэхгүй, Esc хаана, фокус эхний талбарт */
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const t = window.setTimeout(() => nameRef.current?.focus(), 40);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        close();
        return;
      }
      /* Фокусын урхи — Tab нь цонхны гадна гарахгүй */
      if (e.key !== "Tab" || !cardRef.current) return;
      const items = cardRef.current.querySelectorAll<HTMLElement>(
        'button, input, [href], [tabindex]:not([tabindex="-1"])'
      );
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.clearTimeout(t);
      document.removeEventListener("keydown", onKey);
    };
  }, [open, close]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) {
      setError("Нэрээ оруулна уу.");
      nameRef.current?.focus();
      return;
    }
    if (!phoneIsValid(phone)) {
      setError("Утасны дугаараа зөв оруулна уу.");
      return;
    }

    setSending(true);
    setError(null);
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "info-request",
          name: name.trim(),
          phone: phone.trim(),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Хүсэлт илгээхэд алдаа гарлаа.");
      trackMetaEvent("Lead", { content_name: "quick-lead" });
      setDone(true);
      setName("");
      setPhone("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Хүсэлт илгээхэд алдаа гарлаа.");
    } finally {
      setSending(false);
    }
  }

  if (!open) return null;

  return (
    <div
      className="qlead"
      role="dialog"
      aria-modal="true"
      aria-labelledby="qlead-title"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) close();
      }}
    >
      <div className="qlead__card" ref={cardRef}>
        <button type="button" onClick={close} aria-label="Хаах" className="qlead__x">
          <X className="w-4 h-4" aria-hidden />
        </button>

        {done ? (
          <div className="qlead__done">
            <p id="qlead-title" className="qlead__title">
              Хүсэлт хүлээн авлаа
            </p>
            <p className="qlead__lead">Манай зөвлөх тантай удахгүй холбогдоно.</p>
            <button type="button" onClick={close} className="qlead__submit">
              Хаах
            </button>
          </div>
        ) : (
          <form onSubmit={submit} noValidate>
            <p id="qlead-title" className="qlead__title">
              Хүсэлт үлдээх
            </p>
            <p className="qlead__lead">Манай зөвлөх тантай удахгүй холбогдоно.</p>

            <label className="qlead__label" htmlFor="qlead-name">
              Нэр
            </label>
            <input
              id="qlead-name"
              ref={nameRef}
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="name"
              className="qlead__input"
              placeholder="Нэрээ оруулна уу"
            />

            <label className="qlead__label" htmlFor="qlead-phone">
              Утасны дугаар
            </label>
            <input
              id="qlead-phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              className="qlead__input"
              placeholder="8811xxxx"
            />

            {error && (
              <p className="qlead__err" role="alert">
                {error}
              </p>
            )}

            <button type="submit" disabled={sending} className="qlead__submit">
              {sending ? "Илгээж байна…" : "Хүсэлт илгээх"}
            </button>

            <p className="qlead__note">
              Таны мэдээллийг зөвхөн тантай холбогдох зорилгоор ашиглана.
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
