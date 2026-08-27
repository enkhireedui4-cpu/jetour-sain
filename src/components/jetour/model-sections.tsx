"use client";

import { useCallback, useRef, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { BLUR_DATA_URL } from "@/lib/image";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useDragSwipe } from "@/hooks/use-drag";
import { cyclicOffset, slideJumped, arrowKeyNav } from "@/lib/slider";
import { TechnologyHighlights } from "@/components/jetour/technology-highlights";
import { PremiumFeatures } from "@/components/jetour/premium-features";
import type { ModelSection, ModelSectionItem } from "@/lib/cms";

/**
 * Загварын хуудасны нэмэлт хэсгүүд — таван хэв.
 *
 * Тав нь албан ёсны JETOUR хуудсуудын жинхэнэ зохиомжоос авсан бөгөөд
 * АГУУЛГЫН ХЭЛБЭРЭЭР сонгогдоно, гоёл биш:
 *
 *  · `stage`  — ДЭЛГЭЦ ДҮҮРЭН кино кадар: гарчиг зургийн дээд талд голлож,
 *    тайлбар доод зүүн хэсэгт, сум кадрын хоёр захад. Нэг том сэдвийг
 *    (дизайн, салон) хамгийн том зургаар өгүүлэхэд.
 *  · `peek`   — ХӨРШ ЦУХУЙСАН том карусель: гарчиг цагаан дэвсгэр дээр,
 *    голд том зураг, хажуугаар дараагийн кадар харагдана.
 *  · `spread` — зэрэгцээ гурван нарийн дэлгэрэнгүй (гэрэл / түлхүүр /
 *    бариул). Хажуугийн хоёр зураг дэлгэцийн ЗАХ хүртэл гарч, гарчиг нь
 *    голын тайван баганад суух.
 *  · `strip`  — тоо нь чөлөөт, нэг төрлийн эгнээ (аюулгүйн системүүд).
 *  · `band`   — нэг өргөн зураг, тайлбар нь зурган ДЭЭР.
 *
 * `stage` ба `peek` хоёрыг СОЛИН хэрэглэвэл хуудсанд хэмнэл гарна.
 */
export function ModelSections({ sections, alt }: { sections: ModelSection[]; alt: string }) {
  return (
    <>
      {sections.map((s) => {
        if (s.kind === "spread") return <ModelSpread key={s.id} section={s} alt={alt} />;
        if (s.kind === "band") return <ModelBand key={s.id} section={s} alt={alt} />;
        if (s.kind === "stage") return <ModelStage key={s.id} section={s} alt={alt} />;
        if (s.kind === "peek")
          return (
            <PremiumFeatures
              key={s.id}
              id={s.id}
              title={s.title ?? ""}
              subtitle={s.subtitle}
              features={s.items.map((it, i) => ({
                id: `${s.id}-${i}`,
                title: it.title ?? "",
                description: it.text ?? "",
                image: it.image,
                alt: it.alt ?? `${alt} — ${it.title ?? ""}`,
              }))}
            />
          );
        return (
          <TechnologyHighlights
            key={s.id}
            id={s.id}
            title={s.title ?? ""}
            subtitle={s.subtitle}
            aspect={s.aspect?.wide}
            layout={s.stripLayout}
            items={s.items.map((it, i) => ({
              id: `${s.id}-${i}`,
              title: it.title ?? "",
              description: it.text ?? "",
              image: it.image,
              alt: it.alt ?? `${alt} — ${it.title ?? ""}`,
              label: it.label,
            }))}
          />
        );
      })}
    </>
  );
}

/* ============================================================
   SPREAD — "хос захын нээлт"
   ============================================================ */

/**
 * Гурван зурагт нээлттэй тархай.
 *
 * Десктоп — хажуугийн хоёр зураг дэлгэцийн зах хүртэл гарч, гарчиг ба гуравдах
 * зураг голын баганад. Гүйлгэхэд хажуугийн хоёр зураг ЭСРЭГ чиглэлд хөвнө
 * (зүүн дээш, баруун доош, ±4%): гол багана хөдөлгөөнгүй тул хуудас "нээгдэж
 * байгаа" мэдрэмж төрнө. Хөдөлгөөн мэдрэмтгий үед болон утсанд унтарна.
 *
 * Утас — гурван карт доор доороо; зураг нь хэвтээ (`imageMobile`) хувилбар,
 * тайлбар нь доор. Дэлгэцийн хоёр зах хүртэл бүтэн.
 */
function ModelSpread({ section, alt }: { section: ModelSection; alt: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const wide = useMediaQuery("(min-width: 1024px)");

  /* Хэсэг дэлгэцийг дайран гарах явц (0 → 1) */
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const up = useTransform(scrollYProgress, [0, 1], ["4%", "-4%"]);
  const down = useTransform(scrollYProgress, [0, 1], ["-4%", "4%"]);

  const drift = wide && !reduce;
  const [a, mid, b] = section.items;
  if (!a || !mid || !b) return null;

  return (
    <section id={section.id} className="xspread scroll-mt-16" aria-label={section.title ?? alt}>
      <div className="xspread__grid" ref={ref}>
        <SpreadSide item={a} alt={alt} side="a" y={drift ? up : undefined} />

        <header className="xspread__head">
          {section.title && <h2 className="xspread__title">{section.title}</h2>}
          {section.subtitle && <p className="xspread__sub">{section.subtitle}</p>}
        </header>

        <div className="xspread__mid">
          <SplitImage
            item={mid}
            alt={alt}
            cls="xspread__img"
            wideSizes="min(34vw, 460px)"
            narrowSizes="100vw"
          />
        </div>

        <SpreadSide item={b} alt={alt} side="b" y={drift ? down : undefined} />

        <SpreadCaption item={a} slot="a" />
        <SpreadCaption item={mid} slot="m" />
        <SpreadCaption item={b} slot="b" />
      </div>
    </section>
  );
}

/**
 * Хажуугийн зураг. Хөвөх зайг нөхөхийн тулд дотоод давхарга нь кадраас 12%
 * өндөр, дээрээсээ -6% — ингэснээр ±4% хөдөлгөөнд ямар ч захад хоосон зай
 * гарахгүй.
 */
function SpreadSide({
  item,
  alt,
  side,
  y,
}: {
  item: ModelSectionItem;
  alt: string;
  side: "a" | "b";
  y?: ReturnType<typeof useTransform<number, string>>;
}) {
  return (
    <div className={`xspread__side xspread__side--${side}`}>
      <motion.div className="xspread__drift" style={y ? { y } : undefined}>
        <SplitImage
          item={item}
          alt={alt}
          cls="xspread__img"
          wideSizes="33vw"
          narrowSizes="100vw"
        />
      </motion.div>
    </div>
  );
}

/**
 * Десктоп ба утсанд ӨӨР кадртай зураг.
 *
 * `imageMobile` байвал хоёр `<img>` гарна: `lg:hidden` / `hidden lg:block`.
 * Нуугдсан нь ч татагдах тул `sizes`-ийг `1px` болгож хуваана — ингэснээр
 * утас зөвхөн утасны кадрыг, десктоп зөвхөн десктопынхыг татна.
 */
function SplitImage({
  item,
  alt,
  cls,
  wideSizes,
  narrowSizes,
}: {
  item: ModelSectionItem;
  alt: string;
  cls: string;
  wideSizes: string;
  narrowSizes: string;
}) {
  const label = item.alt ?? `${alt} — ${item.title ?? ""}`;
  const hasMobile = Boolean(item.imageMobile);

  return (
    <>
      {hasMobile && (
        <Image
          src={item.imageMobile!}
          alt={label}
          fill
          loading="lazy"
          placeholder="blur"
          blurDataURL={BLUR_DATA_URL}
          sizes={`(min-width: 1024px) 1px, ${narrowSizes}`}
          className={`${cls} lg:hidden`}
        />
      )}
      {/* Хоёулаа адил `alt` авна: нуугдсан нь `display: none` тул дэлгэц
          уншигчийн мод дээр гарахгүй — давхар уншигдахгүй. */}
      <Image
        src={item.image}
        alt={label}
        fill
        loading="lazy"
        placeholder="blur"
        blurDataURL={BLUR_DATA_URL}
        sizes={hasMobile ? `(min-width: 1024px) ${wideSizes}, 1px` : `(min-width: 1024px) ${wideSizes}, ${narrowSizes}`}
        className={`${cls}${hasMobile ? " hidden lg:block" : ""}`}
      />
    </>
  );
}

function SpreadCaption({ item, slot }: { item: ModelSectionItem; slot: "a" | "m" | "b" }) {
  if (!item.title && !item.text) return null;
  return (
    <div className={`xspread__cap xspread__cap--${slot}`}>
      {item.title && <h3 className="xspread__name">{item.title}</h3>}
      {item.text && <p className="xspread__text">{item.text}</p>}
    </div>
  );
}

/* ============================================================
   STAGE — дэлгэц дүүрэн кино кадрын слайдер
   ============================================================ */

/**
 * Загварын нэг том сэдвийг гурав хүртэл кадраар өгүүлэх блок.
 *
 * Эталон: албан ёсны JETOUR хуудасны "PIONEERING CROSSOVER DESIGN" — гарчиг
 * зургийн ДЭЭД ТАЛД голлож, тайлбар доод зүүн хэсэгт, сум нь кадрын хоёр
 * зах дээр. Дараах гурван зүйлээр САЙЖРУУЛСАН:
 *
 *  1. Хүрэлцээ — эталон нь цайвар тэнгэр дээр цагаан гарчиг тавьдаг тул
 *     бараг уншигдахгүй. Энд дээд ба доод хөшгийн хүчийг эх зургийн жинхэнэ
 *     пикселээс хэмжиж (4.5:1) сонгосон.
 *  2. Багцын хэмжээ — эталонд хэдэн кадр байгаа нь мэдэгдэхгүй. Энд доор
 *     сегментчилсэн зурвас: аль нь хэд дэх нь харагдана.
 *  3. Чирэлт — зураг хуруу дагаж 1:1 хөдөлж, цикл эргэлт нь ХАМГИЙН ДӨТ
 *     талаас орж ирнэ (`cyclicOffset`) — бүх кадраар ухарч буцахгүй.
 *
 * Хүртээмж: сум нь жинхэнэ товч, гарын сум ажиллана, одоогийн кадрыг
 * `role="status"`-аар мэдэгдэнэ, хөдөлгөөн мэдрэмтгий үед эффект унтарна.
 */
function ModelStage({ section, alt }: { section: ModelSection; alt: string }) {
  const items = section.items;
  const total = items.length;
  const [nav, setNav] = useState({ active: 0, from: 0 });
  const { active, from } = nav;

  const step = useCallback(
    (dir: 1 | -1) => setNav((s) => ({ active: (s.active + dir + total) % total, from: s.active })),
    [total]
  );
  const next = useCallback(() => step(1), [step]);
  const prev = useCallback(() => step(-1), [step]);
  const goTo = useCallback((i: number) => setNav((s) => ({ active: i, from: s.active })), []);

  const [dragDx, setDragDx] = useState(0);
  const dragging = dragDx !== 0;
  const swipe = useDragSwipe({ onNext: next, onPrev: prev, threshold: 48, onMove: setDragDx });

  const onKeyDown = arrowKeyNav({ next, prev });

  if (total === 0) return null;
  const cur = items[active];

  return (
    <section
      id={section.id}
      className={`xstage scroll-mt-16${section.fitViewport ? " xstage--fit" : ""}`}
      aria-label={section.title ?? alt}
      style={
        {
          ...(section.aspect?.wide ? { "--xg-aspect-w": String(section.aspect.wide) } : null),
          ...(section.aspect?.narrow ? { "--xg-aspect-n": String(section.aspect.narrow) } : null),
        } as React.CSSProperties
      }
    >
      <div
        className={`xstage__frame ${total > 1 ? swipe.className : ""}`}
        style={total > 1 ? swipe.style : undefined}
        {...(total > 1 ? swipe.handlers : {})}
        onKeyDown={total > 1 ? onKeyDown : undefined}
        tabIndex={total > 1 ? 0 : undefined}
        role="group"
        aria-roledescription="carousel"
        aria-label={section.title ?? alt}
      >
        {items.map((it, i) => {
          const off = cyclicOffset(i, active, total);
          const frozen = dragging || slideJumped(i, from, active, total);
          return (
            <div
              key={it.image}
              className="xstage__slide"
              aria-hidden={off !== 0}
              style={{
                transform: `translateX(calc(${off * 100}% + ${dragDx}px))`,
                ...(frozen ? { transition: "none" } : null),
              }}
            >
              <SplitImage item={it} alt={alt} cls="xstage__img" wideSizes="100vw" narrowSizes="100vw" />
            </div>
          );
        })}

        {/* Текст зурган ДЭЭР, хайрцаг ба хөшиггүй.
            Эталонтой ижил байрлал: гарчиг дээд талд голлож, тайлбар доод
            зүүн хэсэгт. Уншигдац нь сайтад аль хэдийн туршсан НЯГТ ГЛИФ
            СҮҮДРЭЭР (`.vhero__name`-тэй ижил) — зургийг бүрхэхгүй. */}
        {section.title && <h2 className="xstage__title">{section.title}</h2>}

        <div className="xstage__copy" key={cur.image}>
          <h3 className="xstage__name">{cur.title}</h3>
          {cur.text && <p className="xstage__text">{cur.text}</p>}
        </div>

        {total > 1 && (
          <>
            <button
              type="button"
              onClick={prev}
              aria-label="Өмнөх кадр"
              className="xstage__edge xstage__edge--prev"
            >
              <ChevronLeft size={24} strokeWidth={1.5} aria-hidden />
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="Дараагийн кадр"
              className="xstage__edge xstage__edge--next"
            >
              <ChevronRight size={24} strokeWidth={1.5} aria-hidden />
            </button>
          </>
        )}
      </div>

      {/* Зурвас нь кадрын ДООР, цагаан дэвсгэр дээр — багцын хэмжээ харагдана */}
      {total > 1 && (
        <div className="container-page">
          <div className="xstage__progress">
            {items.map((it, i) => (
              <button
                key={it.image}
                type="button"
                onClick={() => goTo(i)}
                aria-label={it.title}
                aria-current={i === active}
                className="xstage__seg"
              />
            ))}
          </div>
        </div>
      )}

      {total > 1 && (
        <p className="sr-only" role="status" aria-atomic="true">
          {`${active + 1} / ${total} — ${cur.title ?? ""}`}
        </p>
      )}
    </section>
  );
}


/* ============================================================
   BAND — өргөн зураг, текст нь зурган дээр
   ============================================================ */

/**
 * Нэг өргөн зураг + тайлбар.
 *
 * Десктоп — текст нь зургийн доод ЗҮҮН хэсэгт, доороос дээш харанхуйлсан
 * хөшигтэй. Зүүн тал нь энэ зурагт бараан (сүүдэрт элс) тул хөшиг зөөлөн байж
 * ч 14:1 хүрэлцээ гарна; гэрэлтэй манхан нь баруун талд байгаа учир текстийн
 * хайрцгийг 56%-аар хязгаарласан.
 *
 * Утас — 233px өндөр кадарт дөрвөн мөр текст давхарлах нь уншигдахгүй тул
 * тайлбар зургийн ДООР, хэсгийн өөрийн бараан дэвсгэр дээр гарна (эталон
 * сайтын утасны хувилбар ч ийм).
 */
function ModelBand({ section, alt }: { section: ModelSection; alt: string }) {
  const item = section.items[0];
  if (!item) return null;

  return (
    <section id={section.id} className="xband scroll-mt-16" aria-label={section.title ?? item.title ?? alt}>
      <div className="xband__media">
        <SplitImage item={item} alt={alt} cls="xband__img" wideSizes="100vw" narrowSizes="100vw" />
        <div className="xband__scrim" aria-hidden />
      </div>
      <div className="xband__copy">
        {item.title && <h2 className="xband__title">{item.title}</h2>}
        {item.text && <p className="xband__text">{item.text}</p>}
      </div>
    </section>
  );
}
