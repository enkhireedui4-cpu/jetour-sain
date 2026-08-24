"use client";

import { useCallback, useEffect, useId, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { BLUR_DATA_URL } from "@/lib/image";
import { useDragSwipe } from "@/hooks/use-drag";
import { cyclicOffset, slideJumped } from "@/lib/slider";

/** Нэг онцлох слайд — өгөгдлөөс удирдана (CMS: detailsJson.premiumFeatures) */
export type PremiumFeature = {
  id: string;
  title: string;
  description: string;
  image: string;
  /** Дэлгэрэнгүй монгол alt текст */
  alt: string;
  /** Тайралтын фокус — object-position (заавал биш) */
  objectPosition?: string;
};

/** Автомат гүйлт — 6с (заавал биш, hover/фокус/оролцоо дээр зогсоно) */
const AUTOPLAY_MS = 6000;

/**
 * Premium Features — кинематик хэвтээ карусель.
 *
 * Зохиомж: голд том актив зураг, зүүн/баруун талд өмнөх/дараагийн зураг
 * хэсэгчлэн харагдана. Слайд бүр stage дотор absolute байрлалтай, төвөөс
 * `--pf-offset` × (өөрийн өргөн + gap)-аар шилжинэ — ингэснээр slide-ийн
 * өргөнийг (`--pf-w`) breakpoint-оор л сольж, бүх геометр өөрөө зохицно.
 *
 * Уншигдац: ≥640px-д текст зургийн доод хэсэгт зөөлөн gradient дээр,
 * утсанд зургийн доор (цагаан дэвсгэр) — тод, хаана ч бүтэн уншигдана.
 */
export function PremiumFeatures({
  id = "interior",
  eyebrow,
  title,
  subtitle,
  features,
  autoplay = true,
}: {
  /** Хэсгийн `id`. Анхдагч `"interior"` — салоны слотод байрлах үед. Салон
   *  биш агуулгад (жишээ нь T1-ийн "Бартаат чадвар") өөр `id` дамжуулна. */
  id?: string;
  /** Латин шошго — заавал биш. Байхгүй бол огт рендер хийхгүй (хоосон
   *  элемент нь босоо зай эзэлдэг). */
  eyebrow?: string;
  title: string;
  subtitle?: string;
  features: PremiumFeature[];
  autoplay?: boolean;
}) {
  const total = features.length;
  /** Одоогийн ба өмнөх слайд — өмнөхийг циклийн "үсрэлт"-ийг илрүүлэхэд хэрэглэнэ */
  const [nav, setNav] = useState({ active: 0, from: 0 });
  const { active, from } = nav;
  const [paused, setPaused] = useState(false);
  const [reduce, setReduce] = useState(false);
  const headingId = useId();

  const step = useCallback(
    (delta: number) =>
      setNav((s) => ({ active: (s.active + delta + total) % total, from: s.active })),
    [total]
  );
  const goTo = useCallback((i: number) => setNav((s) => ({ active: i, from: s.active })), []);
  const next = useCallback(() => step(1), [step]);
  const prev = useCallback(() => step(-1), [step]);

  // Хөдөлгөөн мэдрэмтгий хэрэглэгчид — автомат гүйлт бүрэн унтарна
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduce(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (!autoplay || reduce || paused || total <= 1) return;
    const t = window.setInterval(next, AUTOPLAY_MS);
    return () => window.clearInterval(t);
  }, [autoplay, reduce, paused, total, next, active]);

  /* Чирэх явцын шилжилт — слайд хуруу дагаж хөдөлнө, тавихад байрандаа суана */
  const [dragDx, setDragDx] = useState(0);
  const dragging = dragDx !== 0;

  const swipe = useDragSwipe({
    onNext: next,
    onPrev: prev,
    threshold: 48,
    onStart: () => setPaused(true),
    onEnd: () => setPaused(false),
    onMove: setDragDx,
  });

  /**
   * Циклэн байрлуулсан офсет: 3 слайдтай ч зүүн/баруун талд үргэлж хөрш
   * зураг харагдана (active=0 үед хамгийн сүүлийн слайд зүүн талд гарна).
   */
  const offsetOf = useCallback((i: number, base: number) => cyclicOffset(i, base, total), [total]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      prev();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      next();
    }
  };

  if (total === 0) return null;

  return (
    <section
      id={id}
      className="x50pf scroll-mt-16"
      aria-labelledby={headingId}
    >
      {/* --- Толгой --- */}
      <div className="x50pf__head">
        {eyebrow && <p className="x50pf__kicker">{eyebrow}</p>}
        <h2 id={headingId} className="x50pf__title">
          {title}
        </h2>
        {subtitle && <p className="x50pf__lead">{subtitle}</p>}
      </div>

      {/* --- Карусель --- */}
      <div
        className="x50pf__carousel"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
      >
        <div
          className={`x50pf__stage ${total > 1 ? swipe.className : ""}`}
          style={
            total > 1
              ? ({ ...swipe.style, "--pf-drag": `${dragDx}px` } as React.CSSProperties)
              : undefined
          }
          {...(total > 1 ? swipe.handlers : {})}
          onKeyDown={onKeyDown}
          tabIndex={0}
          role="group"
          aria-roledescription="carousel"
          aria-label={title}
        >
          {features.map((f, i) => {
            const off = offsetOf(i, active);
            const isActive = off === 0;
            const isNeighbour = Math.abs(off) === 1;
            /* Циклэн шилжихэд нэг слайд нөгөө тал руу "гүйж" гарахыг зогсооно:
               офсет нь 1-ээс их үсэрсэн слайдын transition-ыг унтраана. */
            const jumped = slideJumped(i, from, active, total);

            return (
              <div
                key={f.id}
                className={`x50pf__slide${isActive ? " is-active" : ""}${
                  isNeighbour ? " is-near" : ""
                }`}
                style={
                  {
                    "--pf-offset": off,
                    /* Чирч байх зуур шилжилт байвал слайд хуруунаас хоцорно */
                    ...(jumped || dragging ? { transition: "none" } : null),
                  } as React.CSSProperties
                }
                aria-hidden={!isActive}
                /* Хажуугийн зургийг дарахад тэр слайд руу шилжинэ — сумтай
                   ижил үйлдэл тул хэрэгслийн хувьд давхардал үүсгэхгүй. */
                onClick={isNeighbour ? () => goTo(i) : undefined}
                role="group"
                aria-roledescription="slide"
                aria-label={`${String(i + 1).padStart(2, "0")} / ${String(total).padStart(2, "0")}`}
              >
                <div className="x50pf__media">
                  <Image
                    src={f.image}
                    alt={f.alt}
                    fill
                    sizes="(max-width: 639px) 88vw, (max-width: 1023px) 79vw, (max-width: 1279px) 70vw, min(63vw, 1050px)"
                    placeholder="blur"
                    blurDataURL={BLUR_DATA_URL}
                    priority={i === 0}
                    loading={i === 0 ? undefined : "lazy"}
                    draggable={false}
                    style={{ objectPosition: f.objectPosition ?? "center" }}
                    className="x50pf__img"
                  />
                  <div className="x50pf__scrim" aria-hidden />
                </div>

                <div className="x50pf__copy">
                  <h3 className="x50pf__feature-title">{f.title}</h3>
                  {/* Тайлбар байхгүй бол элемент огт гаргахгүй — хоосон
                      <p> нь босоо зай эзэлж, зохиомжийг хөндөнө. */}
                  {f.description && <p className="x50pf__text">{f.description}</p>}
                </div>
              </div>
            );
          })}

          {total > 1 && (
            <>
              <button
                type="button"
                onClick={prev}
                aria-label="Өмнөх онцлог"
                className="x50pf__nav x50pf__nav--prev"
              >
                <ChevronLeft strokeWidth={1.5} aria-hidden />
              </button>
              <button
                type="button"
                onClick={next}
                aria-label="Дараагийн онцлог"
                className="x50pf__nav x50pf__nav--next"
              >
                <ChevronRight strokeWidth={1.5} aria-hidden />
              </button>
            </>
          )}
        </div>

        {/* --- Тоолуур --- */}
        {total > 1 && (
          <div className="x50pf__foot">
            <p className="x50pf__counter" aria-live="polite">
              {String(active + 1).padStart(2, "0")}
              <em>/</em>
              {String(total).padStart(2, "0")}
            </p>
            <div className="x50pf__progress">
              {features.map((f, i) => (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => goTo(i)}
                  aria-label={f.title}
                  aria-current={i === active}
                  className="x50pf__seg"
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
