"use client";

import { memo, useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion, type Variants } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { BLUR_DATA_URL } from "@/lib/image";
import { useDragSwipe } from "@/hooks/use-drag";
import { cyclicOffset, slideJumped } from "@/lib/slider";

/* ============================================================
   Төрлүүд
   ============================================================ */

export type CinematicSlide = {
  /** Десктопын зураг (16:9) */
  image: string;
  /** Утасны зураг (9:16). Байвал lg-ээс доош үүнийг харуулна. */
  imageMobile?: string;
  /** Зураг тус бүрийн alt — байхгүй бол slider-ийн alt + дугаар */
  alt?: string;
  /** Заавал биш текст давхарга */
  headline?: string;
  description?: string;
  cta?: { label: string; href: string };
};

type Props = {
  slides: CinematicSlide[];
  /** Screen reader-т зориулсан ерөнхий тайлбар (загварын нэр) */
  alt: string;
  /** Автомат гүйлт (default: true) */
  autoplay?: boolean;
  /** Автомат гүйлтийн хугацаа, мс (default: 5000) */
  interval?: number;
  /** Эхний зургийг priority-гээр ачаалах (hero дээр true) */
  priority?: boolean;
  className?: string;
};

/* ============================================================
   Хөдөлгөөний тохиргоо — компонентын гадна, дахин үүсэхгүй
   ============================================================ */

/** cubic-bezier(0.22, 1, 0.36, 1) — Apple/Porsche маягийн зөөлөн гарц */
const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Текстийн давхарга. Гарц нь зургаас хамаагүй хурдан (0.3s vs 0.8s) —
 * зураг сольж дуусахаас нааш текст аль хэдийн уншигдахгүй болсон байна.
 */
const textVariants: Variants = {
  enter: { opacity: 0, y: 22 },
  center: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay, ease: EASE },
  }),
  exit: { opacity: 0, y: -12, transition: { duration: 0.3, ease: "linear" } },
};

/** Stagger — гарчиг → 120мс дараа тайлбар → 220мс дараа товч */
const TEXT_DELAY = { headline: 0.2, description: 0.32, cta: 0.42 } as const;

const SWIPE_DISTANCE = 60;

/* ============================================================
   Зураг — десктоп/утас хос хувилбар
   ============================================================ */

const SlideImage = memo(function SlideImage({
  slide,
  alt,
  priority,
}: {
  slide: CinematicSlide;
  alt: string;
  priority?: boolean;
}) {
  // alt-ыг spread дотор биш, тус тусад нь бичнэ — a11y linter spread-ийг тандаж
  // чаддаггүй тул ингэснээр "alt байхгүй" гэсэн хуурамч дуудлага гарахгүй.
  const imgAlt = slide.alt ?? alt;
  const common = {
    fill: true as const,
    priority,
    placeholder: "blur" as const,
    blurDataURL: BLUR_DATA_URL,
    draggable: false,
  };

  if (!slide.imageMobile) {
    return (
      <Image
        src={slide.image}
        alt={imgAlt}
        {...common}
        sizes="100vw"
        className="object-cover select-none"
      />
    );
  }

  /* Хос хувилбартай үед `sizes`-д нөгөө талыг 1px гэж зарлана.
     `lg:hidden` нь зөвхөн ХАРАГДАЦЫГ хаадаг — браузер зургийг татсаар байдаг.
     Тиймээс ширээний хэрэглэгч утасны 9:16 зургийг (мөн эсрэгээр) дэмий
     татаж, hero-гийн LCP хоёр дахин хүндэрдэг байв. */
  return (
    <>
      <Image
        src={slide.imageMobile}
        alt={imgAlt}
        {...common}
        sizes="(min-width: 1024px) 1px, 100vw"
        className="lg:hidden object-cover select-none"
      />
      <Image
        src={slide.image}
        alt={imgAlt}
        {...common}
        sizes="(min-width: 1024px) 100vw, 1px"
        className="hidden lg:block object-cover select-none"
      />
    </>
  );
});

/* ============================================================
   Үндсэн компонент
   ============================================================ */

export function CinematicSlider({
  slides,
  alt,
  autoplay = true,
  interval = 5000,
  priority = false,
  className = "",
}: Props) {
  const reduce = useReducedMotion();
  const count = slides.length;

  /** Одоогийн ба өмнөх слайд — өмнөхийг циклийн "үсрэлт"-ийг илрүүлэхэд хэрэглэнэ */
  const [nav, setNav] = useState({ active: 0, from: 0 });
  const { active: index, from } = nav;
  const [paused, setPaused] = useState(false);

  const active = slides[index];

  const go = useCallback(
    (delta: number) =>
      setNav((s) => ({ active: ((s.active + delta) % count + count) % count, from: s.active })),
    [count]
  );

  const goTo = useCallback(
    (target: number) => setNav((s) => (target === s.active ? s : { active: target, from: s.active })),
    []
  );

  const next = useCallback(() => go(1), [go]);
  const prev = useCallback(() => go(-1), [go]);

  /**
   * Чирэх явцын хэвтээ шилжилт (px) — зураг хуруу дагаж 1:1 хөдөлж, дараагийн
   * зураг хажуугаасаа хамт орж ирнэ. Тавихад 0 болж, CSS шилжилт нь ойрын
   * слайд руу зөөлөн бэхэлнэ.
   */
  const [dragDx, setDragDx] = useState(0);
  const dragging = dragDx !== 0;

  const swipe = useDragSwipe({
    onNext: next,
    onPrev: prev,
    threshold: SWIPE_DISTANCE,
    onStart: () => setPaused(true),
    onEnd: () => setPaused(false),
    onMove: setDragDx,
  });

  /* ── Автомат гүйлт — hover, drag, далд таб, reduced-motion үед зогсоно ── */
  useEffect(() => {
    if (!autoplay || reduce || paused || dragging || count < 2) return;
    const t = window.setInterval(() => {
      if (!document.hidden) next();
    }, interval);
    return () => window.clearInterval(t);
  }, [autoplay, reduce, paused, dragging, count, interval, next, index]);

  /* ── Дараагийн зургийг урьдчилан татах ── */
  useEffect(() => {
    if (count < 2) return;
    const upcoming = slides[(index + 1) % count];
    const isNarrow =
      typeof window !== "undefined" && window.matchMedia("(max-width: 1023px)").matches;
    const src = (isNarrow && upcoming.imageMobile) || upcoming.image;
    const img = new window.Image();
    img.src = src;
  }, [index, count, slides]);

  /* ── Клавиатур ── */
  const onKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        e.preventDefault();
        next();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        prev();
      }
    },
    [next, prev]
  );

  const hasText = Boolean(active.headline || active.description || active.cta);

  /* Ken Burns — идэвхтэй зураг харагдаж байх хугацаандаа тайван томорно.
     Шилжилтийн замд саад болохгүйн тулд зөвхөн `scale`, шугаман хурдтай. */
  const kenBurnsMs = Math.max(interval + 3000, 8000);

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label={alt}
      tabIndex={0}
      onKeyDown={onKeyDown}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      className={`absolute inset-0 overflow-hidden outline-none ${className}`}
    >
      {/* Чирэх давхарга — хяналтын товчнууд үүний гадна тул чирэхэд хөдлөхгүй.
          Слайд бүр байрандаа зэрэг зогсдог тул чирэхэд хоёулаа харагдана. */}
      <div
        className={`absolute inset-0 ${count > 1 ? swipe.className : ""}`}
        style={count > 1 ? swipe.style : undefined}
        {...(count > 1 ? swipe.handlers : {})}
      >
        {slides.map((s, i) => {
          /* Слайд бүр идэвхтэйгээсээ хамгийн дөт талд зогсоно — цикл эргэлтэд
             ч зөвхөн нэг дэлгэцийн зайд, зөв чиглэлд гүйнэ. */
          const off = cyclicOffset(i, index, count);
          const frozen = dragging || slideJumped(i, from, index, count);

          return (
            <div
              key={i}
              aria-roledescription="slide"
              aria-label={`${i + 1} / ${count}`}
              aria-hidden={off !== 0}
              className="cin__slide"
              style={{
                transform: `translateX(calc(${off * 100}% + ${dragDx}px))`,
                ...(frozen ? { transition: "none" } : null),
              }}
            >
              <div
                className={`cin__kb${off === 0 ? " is-active" : ""}`}
                style={{ transitionDuration: `${kenBurnsMs}ms` }}
              >
                <SlideImage slide={s} alt={alt} priority={priority && i === 0} />
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Текст давхарга — зургаас тусдаа, өөрийн stagger-тай ── */}
      {hasText && (
        <div className="absolute inset-x-0 bottom-0 z-10 pointer-events-none">
          <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/70 via-black/25 to-transparent" />
          <AnimatePresence mode="wait">
            <div key={index} className="relative container-page pb-20 lg:pb-24">
              {active.headline && (
                <motion.h2
                  variants={textVariants}
                  custom={TEXT_DELAY.headline}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="text-white font-extrabold tracking-[-0.03em] leading-[1.05] text-[clamp(1.75rem,4vw,3.25rem)]"
                  style={{ textShadow: "0 4px 24px rgba(0,0,0,0.45)" }}
                >
                  {active.headline}
                </motion.h2>
              )}

              {active.description && (
                <motion.p
                  variants={textVariants}
                  custom={TEXT_DELAY.description}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="mt-3 max-w-xl text-white/85 text-[15px] lg:text-lg leading-relaxed"
                  style={{ textShadow: "0 2px 14px rgba(0,0,0,0.5)" }}
                >
                  {active.description}
                </motion.p>
              )}

              {active.cta && (
                <motion.div
                  variants={textVariants}
                  custom={TEXT_DELAY.cta}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="mt-7 pointer-events-auto"
                >
                  <Link
                    href={active.cta.href}
                    className="group inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-bold text-[#17181B] transition-colors hover:bg-[#E20A17] hover:text-white"
                  >
                    {active.cta.label}
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </motion.div>
              )}
            </div>
          </AnimatePresence>
        </div>
      )}

      {/* ── Хяналт ── */}
      {count > 1 && (
        <>
          <button
            onClick={prev}
            aria-label="Өмнөх зураг"
            className="hidden lg:grid absolute left-5 top-1/2 -translate-y-1/2 z-20 w-12 h-12 place-items-center rounded-full bg-white/10 backdrop-blur-sm border border-white/25 text-white hover:bg-white hover:text-[#17181B] transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={next}
            aria-label="Дараагийн зураг"
            className="hidden lg:grid absolute right-5 top-1/2 -translate-y-1/2 z-20 w-12 h-12 place-items-center rounded-full bg-white/10 backdrop-blur-sm border border-white/25 text-white hover:bg-white hover:text-[#17181B] transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Цэгүүд — 4px зурвас, гэхдээ 44px товших талбайтай */}
          <div
            className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1"
            role="tablist"
            aria-label="Слайд сонгох"
          >
            {slides.map((_, i) => (
              <button
                key={i}
                role="tab"
                onClick={() => goTo(i)}
                aria-label={`${i + 1}-р зураг`}
                aria-selected={i === index}
                className="relative grid place-items-center h-11 w-11"
              >
                <span
                  className={`block h-1 rounded-full transition-all duration-500 ${
                    i === index ? "w-8 bg-[#E20A17]" : "w-3.5 bg-white/50 hover:bg-white/80"
                  }`}
                />
              </button>
            ))}
          </div>
        </>
      )}

      {/* Screen reader-т одоогийн слайдыг мэдэгдэнэ */}
      <p className="sr-only" aria-live="polite">
        {index + 1} / {count}
      </p>
    </div>
  );
}
