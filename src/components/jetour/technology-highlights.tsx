"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { BLUR_DATA_URL } from "@/lib/image";
import { useDragSwipe } from "@/hooks/use-drag";
import { cyclicOffset, slideJumped } from "@/lib/slider";

export type TechnologyHighlight = {
  id: string;
  title: string;
  description: string;
  image: string;
  alt: string;
  /**
   * Сонгогч дээр харагдах БОГИНО шошго. Аль нэг зүйлд байвал зурвас нь
   * нэртэй сонгогч болж, «01 / 03» тоолуур гарна. Байхгүй бол зурвас нь
   * өмнөх шигээ нимгэн зам хэвээр.
   */
  label?: string;
};

/**
 * Технологийн онцлох — слайдер.
 *
 * Зохиомж (десктоп ба утас нэг зарчим, зөвхөн эрэмбэ өөр):
 *  • Толгой голлоно: том хөнгөн үсэг, доор нэг мөр тайлбар.
 *  • Десктоп — зүүнд том зураг, баруунд нэр ба өгүүлбэр.
 *  • Утас — зургийн карт, доор нь голлосон нэр/өгүүлбэр.
 *
 * Хөдөлгөөн:
 *  • Чиглэлтэй — слайд бүр идэвхтэйгээсээ ХАМГИЙН ДӨТ талд байрлана
 *    (`cyclicOffset`), тул баруун тийш дарвал шинэ зураг баруунаас гүйж
 *    орно; цикл эргэлтэд ч бүх слайдаар ухарч буцахгүй.
 *  • Гүн — зураг слайдаасаа удаан хөдөлж (parallax) орон зайн мэдрэмж өгнө.
 *  • Текст — зураг ирсний дараа нэр → өгүүлбэр жижиг зөрүүтэй дээшээ гарна
 *    (CSS: `is-active` класс анимацийг дахин ажиллуулна).
 *  • Чирэхэд зураг хуруу дагаж 1:1 хөдөлнө.
 *
 * Хүртээмж: одоогийн слайдыг фокус хөдөлгөлгүй мэдэгдэнэ (`role="status"`),
 * сум ба зурвасын хэсгүүд жинхэнэ товч, хөдөлгөөн мэдрэмтгий үед эффект
 * унтарч зөвхөн эцсийн төлөв харагдана.
 */
export function TechnologyHighlights({
  id = "technology",
  eyebrow,
  title,
  subtitle,
  aspect,
  layout,
  items,
}: {
  /** Хэсгийн `id` — нэг хуудсанд хоёр слайдер байвал давхардуулахгүйн тулд. */
  id?: string;
  eyebrow?: string;
  title: string;
  subtitle?: string;
  /**
   * Кадрын харьцаа — ЭХ ЗУРГИЙНХ. Байхгүй бол 1.89 (анхдагч).
   * Зөв тавихад зураг тайрагдахгүй: X1-ийн эх зураг 1.74, T2-ынх 2.49 тул
   * нийтлэг 1.89 нь тус тус 8% ба 24% тайрч байсан.
   */
  aspect?: number;
  /**
   * Харагдацын хувилбар. `"editorial"` — техникийн танилцуулга: зураг 68%,
   * баруунд «01 / 03» → нэр → үзүүлэлт гэсэн шатлал, зурвас нам гүй.
   */
  layout?: "editorial";
  items: TechnologyHighlight[];
}) {
  const total = items.length;
  /** Одоогийн ба өмнөх слайд — өмнөхийг циклийн "үсрэлт"-ийг илрүүлэхэд хэрэглэнэ */
  const [nav, setNav] = useState({ active: 0, from: 0 });
  const { active, from } = nav;

  const step = useCallback(
    (dir: 1 | -1) =>
      setNav((s) => ({ active: (s.active + dir + total) % total, from: s.active })),
    [total]
  );
  const next = useCallback(() => step(1), [step]);
  const prev = useCallback(() => step(-1), [step]);
  const goTo = useCallback((i: number) => setNav((s) => ({ active: i, from: s.active })), []);

  /* Чирэх явцын шилжилт — зураг хуруу дагаж хөдөлнө, тавихад байрандаа суана */
  const [dragDx, setDragDx] = useState(0);
  const dragging = dragDx !== 0;
  const swipe = useDragSwipe({ onNext: next, onPrev: prev, threshold: 48, onMove: setDragDx });

  /* Гарын сумаар удирдах — тайз фокустай үед */
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      next();
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      prev();
    }
  };

  /* Дараагийн зургийг урьдчилан татна — гүйж орж ирэхэд хоосон гарахгүй */
  const preloaded = useRef(new Set<string>());
  useEffect(() => {
    if (total < 2) return;
    const upcoming = items[(active + 1) % total]?.image;
    if (!upcoming || preloaded.current.has(upcoming)) return;
    preloaded.current.add(upcoming);
    const img = new window.Image();
    img.src = upcoming;
  }, [active, items, total]);

  if (total === 0) return null;

  const cur = items[active];
  /** Аль нэг зүйлд богино шошго байвал зурвас нь нэртэй сонгогч болно */
  const labelled = items.some((f) => Boolean(f.label));
  const editorial = layout === "editorial";

  return (
    <section
      id={id}
      className={`x50tech scroll-mt-16${editorial ? " x50tech--editorial" : ""}`}
      aria-label={title}
      style={aspect ? ({ "--tech-aspect": String(aspect) } as React.CSSProperties) : undefined}
    >
      <div className="container-page">
        <header className="x50tech__head">
          {eyebrow && <p className="x50tech__eyebrow">{eyebrow}</p>}
          <h2 className="x50tech__title">{title}</h2>
          {subtitle && <p className="x50tech__sub">{subtitle}</p>}
        </header>

        <div
          className={`x50tech__list ${total > 1 ? swipe.className : ""}`}
          style={total > 1 ? swipe.style : undefined}
          {...(total > 1 ? swipe.handlers : {})}
          onKeyDown={total > 1 ? onKeyDown : undefined}
          tabIndex={total > 1 ? 0 : undefined}
          role="group"
          aria-roledescription="carousel"
          aria-label={title}
        >
          {items.map((f, i) => {
            const off = cyclicOffset(i, active, total);
            const isActive = off === 0;
            /* Циклийн цаагуур үсэрсэн слайд — харагдахгүй газраа шууд
               байрлалаа авна, эс тэгвээс дэлгэцийг хөндлөн гарна. */
            const frozen = dragging || slideJumped(i, from, active, total);

            return (
              <article
                key={f.id}
                className={`x50tech__row${isActive ? " is-active" : ""}`}
                aria-hidden={!isActive}
                style={{
                  transform: `translateX(calc(${off * 100}% + ${dragDx}px))`,
                  ...(frozen ? { transition: "none" } : null),
                }}
              >
                <div className="x50tech__media">
                  {/* Гүний давхарга — зураг слайдаасаа 8% удаан хөдөлнө */}
                  <div
                    className="x50tech__parallax"
                    style={{
                      transform: `translateX(calc(${off * 8}% - ${dragDx * 0.08}px))`,
                      ...(frozen ? { transition: "none" } : null),
                    }}
                  >
                    <Image
                      src={f.image}
                      alt={f.alt}
                      fill
                      /* Хэсэг нь эхний дэлгэцээс доор тул урьдчилж ачаалахгүй */
                      loading="lazy"
                      placeholder="blur"
                      blurDataURL={BLUR_DATA_URL}
                      draggable={false}
                      sizes="(max-width: 1023px) 100vw, 62vw"
                      className="x50tech__img"
                    />
                  </div>
                </div>

                <div className="x50tech__copy">
                  {/* Шатлалын эхний зэрэглэл — байрлалын жижиг тэмдэглэгээ.
                      Нэр ба үзүүлэлт хоёр ижил жинтэй харагдахаас сэргийлж,
                      уншигчид "хаана байгаагаа" шууд мэдэгдэнэ. */}
                  {editorial && total > 1 && (
                    <p className="x50tech__index" aria-hidden>
                      <span className="x50tech__index-now">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {` / ${String(total).padStart(2, "0")}`}
                    </p>
                  )}
                  <h3 className="x50tech__name">{f.title}</h3>
                  {f.description && <p className="x50tech__text">{f.description}</p>}
                </div>
              </article>
            );
          })}

          {total > 1 && (
            <>
              <button
                type="button"
                onClick={prev}
                aria-label="Өмнөх онцлог"
                className="x50tech__edge x50tech__edge--prev"
              >
                <ChevronLeft size={22} strokeWidth={1.75} aria-hidden />
              </button>
              <button
                type="button"
                onClick={next}
                aria-label="Дараагийн онцлог"
                className="x50tech__edge x50tech__edge--next"
              >
                <ChevronRight size={22} strokeWidth={1.75} aria-hidden />
              </button>
            </>
          )}
        </div>

        {total > 1 && (
          <div className={`x50tech__progress${labelled ? " x50tech__progress--named" : ""}`}>
            {items.map((f, i) => (
              <button
                key={f.id}
                type="button"
                onClick={() => goTo(i)}
                aria-label={f.title}
                aria-current={i === active}
                className="x50tech__seg"
              >
                {/* Нэртэй сонгогч: зурвасын доор богино шошго. Шошгогүй
                    загварт `<span>` гарахгүй тул харагдац өмнөх шигээ. */}
                {labelled && (
                  <span className="x50tech__seg-label">{f.label ?? f.title}</span>
                )}
              </button>
            ))}
          </div>
        )}

        {/* Байрлалын жижиг тоолуур — зөвхөн нэртэй сонгогчтой хувилбарт.
            Хэсгийн хамгийн тод элемент болохгүйн тулд маш нам гүм. */}
        {labelled && total > 1 && (
          <p className="x50tech__counter" aria-hidden>
            <span className="x50tech__counter-now">
              {String(active + 1).padStart(2, "0")}
            </span>
            {` / ${String(total).padStart(2, "0")}`}
          </p>
        )}

        {/* Одоогийн слайдыг фокус хөдөлгөлгүй мэдэгдэнэ (дэлгэц уншигчид) */}
        {total > 1 && (
          <p className="sr-only" role="status" aria-atomic="true">
            {`${active + 1} / ${total} — ${cur?.title ?? ""}`}
          </p>
        )}
      </div>
    </section>
  );
}
