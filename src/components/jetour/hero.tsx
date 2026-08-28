"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowRight, ChevronDown } from "lucide-react";
import { BLUR_DATA_URL } from "@/lib/image";
import { useDragSwipe } from "@/hooks/use-drag";
import { cyclicOffset, slideJumped } from "@/lib/slider";
import { openQuickLead } from "@/components/jetour/quick-lead";

/**
 * `imageMobile` — босоо (9:16) хувилбар. Слайд дэлгэц дүүрэн `object-cover`
 * тул утсан дээр 16:9 зураг өргөнөөсөө 3/4 тайрагддаг. Босоо хувилбартай
 * загварт түүнийг үзүүлнэ; байхгүй бол wide зураг л хэрэглэгдэнэ.
 */
type Slide = { id: string; name: string; image: string; imageMobile?: string };

// Кино маягийн бүтэн дэлгэцийн зургууд. Зураг нь тухайн загварын хуудасны
// толгойн зурагтай нэг — нүүр ба дэлгэрэнгүй хуудас хоорондоо тасрахгүй.
const SLIDES: Slide[] = [
  { id: "x70-plus", name: "JETOUR X70 Plus", image: "/models-hero/x70-plus-hero.webp" },
  {
    id: "t2-phev",
    name: "JETOUR T2 PHEV",
    image: "/models-hero/t2/1.jpg",
    imageMobile: "/models-hero/t2/1-hero.webp",
  },
  {
    id: "g700",
    name: "JETOUR G700",
    image: "/models/g700/wide/cover.webp",
    imageMobile: "/models/g700/tall/cover.webp",
  },
];

const SLIDE_MS = 6000;

/**
 * Слайдын зураг — босоо хувилбартай бол breakpoint тус бүр ЗӨВХӨН өөрийн
 * хувилбарыг татна: нуугдсан салааны `sizes`-ыг `1px` болгоно (Next нь
 * `display:none`-ыг мэдэхгүй тул үүнгүйгээр хоёр зураг хоёуланг татах).
 */
function SlideImage({
  slide,
  active,
  priority,
}: {
  slide: Slide;
  active: boolean;
  priority: boolean;
}) {
  const cls = `object-cover transition-transform ease-out ${
    active ? "scale-[1.03]" : "scale-100"
  }`;
  const style = { transitionDuration: `${SLIDE_MS + 1200}ms` };
  const hasMobile = Boolean(slide.imageMobile);

  return (
    <>
      {hasMobile && (
        <Image
          src={slide.imageMobile!}
          alt={slide.name}
          fill
          sizes="(min-width: 1024px) 1px, 100vw"
          priority={priority}
          placeholder="blur"
          blurDataURL={BLUR_DATA_URL}
          draggable={false}
          className={`${cls} lg:hidden`}
          style={style}
        />
      )}
      {/* Хоёулаа адил `alt` авна: нуугдсан нь `display: none` тул дэлгэц
          уншигчийн мод дээр гарахгүй — давхар уншигдахгүй. */}
      <Image
        src={slide.image}
        alt={slide.name}
        fill
        sizes={hasMobile ? "(min-width: 1024px) 100vw, 1px" : "100vw"}
        priority={priority}
        placeholder="blur"
        blurDataURL={BLUR_DATA_URL}
        draggable={false}
        className={`${cls}${hasMobile ? " hidden lg:block" : ""}`}
        style={style}
      />
    </>
  );
}

export function Hero() {
  /** Одоогийн ба өмнөх слайд — өмнөхийг циклийн "үсрэлт"-ийг илрүүлэхэд хэрэглэнэ */
  const [nav, setNav] = useState({ active: 0, from: 0 });
  const { active, from } = nav;
  const [paused, setPaused] = useState(false);

  // Hero контентын parallax — скролл хийхэд текст/CTA дээш хөвж бүдгэрнэ
  const heroRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  // useReducedMotion() нь сервер дээр false, клиент дээр хэрэглэгчийн тохиргоог
  // буцаадаг. Тиймээс style-ыг `undefined`-аар нөхцөлдүүлбэл hydration mismatch болно.
  // Оронд нь style-ыг ҮРГЭЛЖ дамжуулж, reduced-motion үед хөдөлгөөний хүрээг тэглэнэ —
  // scroll=0 үед хоёр тал ижил (y:0, opacity:1) гарах тул mismatch үүсэхгүй.
  const contentY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, -80]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], reduce ? [1, 1] : [1, 0]);

  const step = useCallback(
    (dir: 1 | -1) =>
      setNav((s) => ({
        active: (s.active + dir + SLIDES.length) % SLIDES.length,
        from: s.active,
      })),
    []
  );
  const next = useCallback(() => step(1), [step]);
  const prev = () => step(-1);

  // Авто-солигдол. WCAG 2.2.2: хөдөлгөөн мэдрэмтгий хэрэглэгчид огт
  // эхлүүлэхгүй — тэдэнд зогсоох хяналт хайх шаардлага үүсэхгүй.
  useEffect(() => {
    if (paused) return;
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }
    const t = setInterval(next, SLIDE_MS);
    return () => clearInterval(t);
  }, [next, paused, active]);

  // Гарын сумаар удирдах
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
     
  }, [next]);

  const slide = SLIDES[active];

  /* Чирэх явцын шилжилт — зураг хуруу дагаж хөдөлнө, тавихад байрандаа суана */
  const [dragDx, setDragDx] = useState(0);
  const dragging = dragDx !== 0;

  // Хулганаар чирэх / хуруугаар шудрах — дэлгэц дүүрэн тул босго өндөр
  const swipe = useDragSwipe({
    onNext: next,
    onPrev: prev,
    threshold: 60,
    onStart: () => setPaused(true),
    onEnd: () => setPaused(false),
    onMove: setDragDx,
  });

  return (
    <section
      ref={heroRef}
      id="home"
      aria-roledescription="carousel"
      aria-label="JETOUR загварууд"
      className={`hero ${swipe.className}`}
      style={swipe.style}
      {...swipe.handlers}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      /* Гарын хэрэглэгч Tab-аар дотогш ормогц зогсоно. Өмнө нь зөвхөн
         хулганы hover зогсоодог байсан тул гарын хэрэглэгч 6 секунд
         тутам солигдох слайдыг зогсоох ямар ч арга байгаагүй. */
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      {/* === Slides — хажуу булангаас гүйж орно, дотор нь зөөлөн Ken Burns ===
          Зурвас хуруу дагаж хөдөлдөг тул чирэлт зогсонги биш; тавихад
          `transition` эргэж асаад ойрын слайд руу зөөлөн суудаг. */}
      <div className="hero__track">
        {SLIDES.map((s, i) => {
          const off = cyclicOffset(i, active, SLIDES.length);
          /* Циклээр эргэхэд нэг слайд нөгөө тал руу "гүйж" гарахыг зогсооно:
             цаагуур үсэрсэн слайд чимээгүй байрлалаа авна. */
          const frozen = dragging || slideJumped(i, from, active, SLIDES.length);

          return (
            <div
              key={s.id}
              aria-hidden={off !== 0}
              className="hero__slide"
              style={{
                transform: `translateX(calc(${off * 100}% + ${dragDx}px))`,
                ...(frozen ? { transition: "none" } : null),
              }}
            >
              {/* Гүний давхарга — зураг слайдаасаа өөр хурдтай хөдөлж орон зайн
                  мэдрэмж өгнө */}
              <div
                className="hero__parallax"
                style={{
                  transform: `translateX(calc(${off * 10}% - ${dragDx * 0.1}px))`,
                  ...(frozen ? { transition: "none" } : null),
                }}
              >
                <SlideImage slide={s} active={off === 0} priority={i === 0} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Ганц зөөлөн scrim — уншигдацад шаардлагатай хамгийн бага хэмжээ.
          (Өмнө хоёр давхар overlay зургийг хэт хардуулж байсан.) */}
      <div className="hero__scrim" />

      {/* === Prev / Next arrows — зөвхөн desktop === */}
      <button
        onClick={prev}
        aria-label="Өмнөх загвар"
        className="hero__arrow left-4 lg:left-7"
      >
        <ChevronLeft size={16} />
      </button>
      <button
        onClick={next}
        aria-label="Дараагийн загвар"
        className="hero__arrow right-4 lg:right-7"
      >
        <ChevronRight size={16} />
      </button>

      {/* === Content — загварын нэр + CTA (parallax) === */}
      <motion.div className="hero__content" style={{ y: contentY, opacity: contentOpacity }}>
        <div className="container-page">
          <motion.p
            key={`tag-${active}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="hero__eyebrow"
          >
            TRAVEL+ SUV
          </motion.p>

          <motion.h1
            key={`title-${active}`}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="hero__title"
          >
            {slide.name}
          </motion.h1>

          {/* Туслах мөр — утсанд нуугдана (машины доод хэсэгтэй давхцахгүй) */}
          <p className="hero__sub hidden sm:block">Таны аяллыг илүү эрхэм болгоно.</p>

          <motion.div
            key={`cta-${active}`}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="hero__cta"
          >
            {/* Шатлал: НЭГ үндсэн үйлдэл. Өмнө нь «Дэлгэрэнгүй үзэх» ба
                «Мэдээлэл авах» хоёр ижил жинтэй зэрэгцэж, аль нь гол болох нь
                мэдэгдэхгүй байв. Одоо хүсэлт үлдээх нь дүүргэсэн улаан, загвар
                үзэх нь зөвхөн тойрогтой. */}
            <button
              type="button"
              onClick={openQuickLead}
              className="hero__btn hero__btn--red"
            >
              Хүсэлт үлдээх
              <ArrowRight size={15} aria-hidden />
            </button>
            <Link href={`/models/${slide.id}`} className="hero__btn hero__btn--ghost">
              Дэлгэрэнгүй үзэх
            </Link>
          </motion.div>
        </div>
      </motion.div>

      {/* === Slide indicators — container-т зэрэгцүүлсэн === */}
      <div className="hero__dots">
        <div className="container-page flex items-center gap-2">
          {SLIDES.map((s, i) => (
            <button
              key={i}
              onClick={() => setNav((s) => ({ active: i, from: s.active }))}
              className="hero__dot"
              style={{ width: i === active ? "28px" : "12px" }}
              aria-label={`${s.name} үзэх`}
              aria-current={i === active}
            >
              {i === active && !paused ? (
                <motion.div
                  key={`bar-${active}`}
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: SLIDE_MS / 1000, ease: "linear" }}
                  className="absolute inset-y-0 left-0 bg-[#E20A17]"
                />
              ) : i === active ? (
                <div className="absolute inset-y-0 left-0 w-full bg-[#E20A17]" />
              ) : null}
            </button>
          ))}
        </div>
      </div>

      {/* Scroll cue */}
      <button
        onClick={() =>
          document.querySelector("#models")?.scrollIntoView({ behavior: "smooth" })
        }
        aria-label="Доош гүйлгэх"
        className="hidden lg:flex absolute bottom-7 right-7 z-10 w-9 h-9 items-center justify-center rounded-full border border-white/20 text-white/60 hover:text-white hover:border-white/60 transition-colors"
      >
        <ChevronDown size={16} />
      </button>
      {/* Дэлгэц уншигчид одоогийн слайдыг мэдэгдэнэ.
          `aria-live`-ыг ЗОГССОН үед л асаадаг шалтгаан: карусель өөрөө 6
          секунд тутам солигддог. Байнга "polite" байвал уншигч 6 секунд
          тутам таслан ярьж, хуудсыг ашиглах боломжгүй болно — энэ нь
          зарлахгүй байснаас ДОР. Hover эсвэл Tab-аар дотогш ормогц
          `paused` үнэн болдог тул гарын хэрэглэгч сум/товч дарахад
          зарлагдана, автоматаар солигдоход дуугарахгүй. */}
      <p className="sr-only" aria-live={paused ? "polite" : "off"}>
        {active + 1} / {SLIDES.length} — {slide.name}
      </p>
    </section>
  );
}
