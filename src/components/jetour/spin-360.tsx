"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { wrapIndex, framesToAdvance, pxPerFrameFor } from "@/lib/spin";

export type SpinColor = {
  id: string;
  /** Харагдах нэр (монголоор) */
  name: string;
  /** Албан ёсны англи нэр — дэлгэц уншигч, тулгалтад (заавал биш) */
  nameEn?: string;
  /** Дугуй цэгийн өнгө */
  hex: string;
  /** Кадрын зам — эргэлтийн дарааллаар */
  frames: string[];
};

/** Өнгө солих шилжилтийн хугацаа (мс) — тайван, шоу биш */
const PAINT_MS = 620;

/**
 * Тоглоомын талбар: чирж эргүүлдэг, өнгө сольдог автомашины тайз.
 *
 * Хэрэгжүүлэлтийн гол шийдвэрүүд:
 *
 *  • **Зөвхөн ИДЭВХТЭЙ өнгийг ачаална** (нэг өнгө ≈1.4MB), ачаалсаныг САНАНА.
 *
 *  • **Шинэ өнгө бэлэн болтол ХУУЧИН машин харагдсаар байна.** Урьд нь өнгө
 *    дарангуут тайз хоосорч, явцын зураас гарч ирдэг байв — энэ нь "өөр
 *    зураг ачаалж байна" мэт мэдрэгддэг. Одоо машин байрандаа зогсож,
 *    бэлэн болмогц будаг нь солигдоно.
 *
 *  • **Өнгө солих нь ШУУД СОЛИЛТ БИШ.** Кадрууд пиксел түвшинд давхцдаг
 *    (хэмжсэн: силуэт 0.000% зөрүүтэй, зөвхөн биеийн 30.8% нь өнгөөр
 *    ялгаатай) тул маскаар чиглэлтэй урсгал үүсгэхэд дугуй, шил, сүүдэр
 *    хөдлөхгүй — ЗӨВХӨН будаг солигдоно. Байрлал, хэмжээ, өнцөг огт
 *    хөндөгдөхгүй.
 *
 *  • **Хуудасны гүйлтийг барихгүй** — эхний 8px хөдөлгөөнөөр зорилгыг
 *    тогтооно. `touchmove`-г гараар `{ passive: false }`-оор холбоно.
 */
export function Spin360({
  colors,
  alt,
  heading,
  headingEn,
  startFrame = 0,
  className = "",
}: {
  colors: SpinColor[];
  alt: string;
  /**
   * Толгойн англи дэд мөр (жишээ "Exterior & Colors") — жижиг, хөнгөн.
   * Монгол гарчгийг тодотгож, албан ёсны автомашины сайтын хэв өгнө.
   */
  headingEn?: string;
  /**
   * Хэсгийн гарчиг — тайзны дээр даруухан нэг мөр.
   *
   * Урьд нь загварын нэр (T2) + дэд гарчиг хоёрыг харуулдаг байв. Гэвч
   * загварын нэр хуудасны hero дээр аль хэдийн том харагддаг тул энд
   * давхардаж, хэсгийн зорилгыг (юуг үзүүлж байгааг) харин нэрлэдэггүй байлаа.
   */
  heading?: string;
  /** Хуудсанд орж ирэхэд харагдах кадр (0 нь ихэвчлэн АРД тал) */
  startFrame?: number;
  className?: string;
}) {
  const hostRef = useRef<HTMLDivElement>(null);
  /** Хэрэглэгчийн СОНГОСОН өнгө (шууд шинэчлэгдэнэ — swatch, нэр үүнийг дагана) */
  const [colorIdx, setColorIdx] = useState(0);
  /** ХАРАГДАЖ буй өнгө — кадрууд нь бэлэн болсны дараа л энэ шинэчлэгдэнэ */
  const [shownIdx, setShownIdx] = useState(0);
  /** Уусаж буй хуучин өнгө (шилжилтийн үед) */
  const [fadingFrom, setFadingFrom] = useState<number | null>(null);
  const [index, setIndex] = useState(startFrame);
  const [hinted, setHinted] = useState(false);
  const [near, setNear] = useState(false);
  const [loadedColors, setLoadedColors] = useState<Set<string>>(new Set());

  const requested = colors[colorIdx];
  const shown = colors[shownIdx];
  const total = shown?.frames.length ?? 0;
  const ready = Boolean(shown && loadedColors.has(shown.id));
  /** Сонгосон өнгө ачаалагдаж байна уу */
  const pending = Boolean(requested && !loadedColors.has(requested.id));

  /* --- Шилжилтийг эхлүүлэх --------------------------------------------- */
  const beginPaint = useCallback((toIdx: number) => {
    setShownIdx((from) => {
      if (from === toIdx) return from;
      setFadingFrom(from);
      return toIdx;
    });
  }, []);

  /* Шилжилт дуусахад хуучин давхаргыг салгана */
  useEffect(() => {
    if (fadingFrom === null) return;
    const t = setTimeout(() => setFadingFrom(null), PAINT_MS);
    return () => clearTimeout(t);
  }, [fadingFrom]);

  /* --- Дэлгэцэнд ойртоход л ачаалж эхэлнэ ------------------------------- */
  useEffect(() => {
    const el = hostRef.current;
    if (!el || near) return;
    if (typeof IntersectionObserver === "undefined") {
      const t = setTimeout(() => setNear(true), 0);
      return () => clearTimeout(t);
    }
    /* Геометрээр нэг удаа шалгана — блок аль хэдийн харагдаж байхад IO-гийн
       эхний дуудлага саатвал хэрэглэгч хоосон тайз хараад суухаас сэргийлнэ. */
    const r = el.getBoundingClientRect();
    if (r.top < window.innerHeight + 300 && r.bottom > -300) {
      const t = setTimeout(() => setNear(true), 0);
      return () => clearTimeout(t);
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setNear(true);
          io.disconnect();
        }
      },
      { rootMargin: "300px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [near]);

  /* --- Сонгосон өнгийн кадруудыг ачаална -------------------------------- */
  useEffect(() => {
    if (!near || !requested || loadedColors.has(requested.id)) return;
    let cancelled = false;
    let done = 0;
    const imgs: HTMLImageElement[] = [];
    const n = requested.frames.length;
    const id = requested.id;
    const idx = colorIdx;
    for (const src of requested.frames) {
      const img = new Image();
      const tick = () => {
        if (cancelled) return;
        done++;
        if (done < n) return;
        setLoadedColors((prev) => new Set(prev).add(id));
        /* Ачаалж дуусахад ЭНЭ өнгө сонгогдсон хэвээр байвал будгийг сольно.
           Хэрэглэгч хүлээж байхдаа өөр өнгө дарсан бол энэ нь хүчингүй. */
        beginPaint(idx);
      };
      img.onload = () => {
        /* Татсан нь ХАНГАЛТГҮЙ: хөтөч зургийг дэлгэцэнд гаргах агшинд
           ЗАДАЛДАГ (decode). Эргүүлж байхад секундэд олон кадр солигддог тул
           задлалт бүр бага зэрэг саатал үүсгэж, "зураг солигдож байна" мэт
           таталдаа мэдрэгддэг. `decode()` нь түүнийг урьдчилж хийнэ.

           ГЭХДЭЭ түүнийг ХҮЛЭЭХГҮЙ. Таб ард байх/нуугдсан үед `decode()`-ийн
           амлалт шийдэгдэхгүй байж, ачаалалт мөнхөд гацдаг (туршилтаар
           баталсан). Иймд тоололт нь `onload` дээр явж, задлалт нь зөвхөн
           хажуугийн оптимизаци болж үлдэнэ. */
        img.decode?.().catch(() => {});
        tick();
      };
      // Алдаатай кадрыг ч тоолно — эс бөгөөс хэзээ ч бэлэн болохгүй
      img.onerror = tick;
      img.src = src;
      imgs.push(img);
    }
    return () => {
      cancelled = true;
      imgs.forEach((i) => {
        i.onload = null;
        i.onerror = null;
      });
    };
  }, [near, requested, loadedColors, colorIdx, beginPaint]);

  /* --- Эргүүлэх --------------------------------------------------------- */
  const step = useCallback(
    (delta: number) => setIndex((i) => wrapIndex(i + delta, total)),
    [total]
  );

  const pxPerFrame = useRef(16);
  useEffect(() => {
    const el = hostRef.current;
    if (!el) return;
    const measure = () => {
      pxPerFrame.current = pxPerFrameFor(el.clientWidth, total);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [total]);

  /* --- Хулгана --- */
  const drag = useRef({ active: false, x: 0, acc: 0 });

  const onPointerDown = (e: React.PointerEvent) => {
    if (!ready || e.pointerType === "touch") return;
    drag.current = { active: true, x: e.clientX, acc: 0 };
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    setHinted(true);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!drag.current.active) return;
    drag.current.acc += e.clientX - drag.current.x;
    drag.current.x = e.clientX;
    const n = framesToAdvance(drag.current.acc, pxPerFrame.current);
    if (n !== 0) {
      step(-n); // зүүн тийш чирэх → машин цагийн зүүний дагуу
      drag.current.acc -= n * pxPerFrame.current;
    }
  };
  const endPointer = (e: React.PointerEvent) => {
    if (!drag.current.active) return;
    drag.current.active = false;
    try {
      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      /* аль хэдийн суларсан */
    }
  };

  /* --- Хүрэлт: тэнхлэгийн зорилгыг ялгана ------------------------------- */
  useEffect(() => {
    const el = hostRef.current;
    if (!el || !ready) return;

    let originX = 0, originY = 0, lastX = 0, acc = 0;
    let axis: "x" | "y" | null = null;

    const onStart = (e: TouchEvent) => {
      if (e.touches.length !== 1) return;
      originX = lastX = e.touches[0].clientX;
      originY = e.touches[0].clientY;
      acc = 0;
      axis = null;
    };

    const onMove = (e: TouchEvent) => {
      if (e.touches.length !== 1) return;
      const x = e.touches[0].clientX;
      if (axis === null) {
        const dx = x - originX;
        const dy = e.touches[0].clientY - originY;
        if (Math.abs(dx) < 8 && Math.abs(dy) < 8) return;
        axis = Math.abs(dx) > Math.abs(dy) ? "x" : "y";
        if (axis === "x") setHinted(true);
        lastX = x;
      }
      if (axis !== "x") return; // босоо — хуудас чөлөөтэй гүйнэ
      e.preventDefault();
      acc += x - lastX;
      lastX = x;
      const n = framesToAdvance(acc, pxPerFrame.current);
      if (n !== 0) {
        step(-n);
        acc -= n * pxPerFrame.current;
      }
    };

    el.addEventListener("touchstart", onStart, { passive: true });
    el.addEventListener("touchmove", onMove, { passive: false });
    return () => {
      el.removeEventListener("touchstart", onStart);
      el.removeEventListener("touchmove", onMove);
    };
  }, [ready, step]);

  /* --- Гар --- */
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (!ready) return;
    if (e.key === "ArrowRight") { e.preventDefault(); step(1); setHinted(true); }
    else if (e.key === "ArrowLeft") { e.preventDefault(); step(-1); setHinted(true); }
  };

  const pickColor = (i: number) => {
    if (i === colorIdx) return;
    setColorIdx(i);
    /* Аль хэдийн ачаалсан өнгө бол ШУУД шилжинэ — swatch, машин, нэр гурав
       нэг үйлдэл мэт нэгэн зэрэг хөдөлнө (§11). Ачаалаагүй бол хуучин машин
       байрандаа үлдэж, бэлэн болмогц дээрх effect шилжүүлнэ. */
    if (loadedColors.has(colors[i].id)) beginPaint(i);
  };

  /** Дэлгэц уншигчид: монгол нэр + албан ёсны англи нэр (байвал) */
  const labelOf = (c: SpinColor) => (c.nameEn ? `${c.name} (${c.nameEn})` : c.name);

  if (!shown || total === 0) return null;

  const frameOf = (ci: number) => colors[ci]?.frames[wrapIndex(index, total)];

  return (
    <div className={`spin ${className}`}>
      {heading && (
        <div className="spin__id">
          <h2 className="spin__model">{heading}</h2>
          {headingEn && <p className="spin__model-en">{headingEn}</p>}
        </div>
      )}

      <div
        ref={hostRef}
        className={`spin__stage ${ready ? "is-ready" : ""}`}
        role="img"
        aria-label={`${alt}, ${labelOf(requested ?? shown)} — 360 градус эргүүлж үзэх`}
        tabIndex={0}
        onKeyDown={onKeyDown}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endPointer}
        onPointerCancel={endPointer}
      >
        {/* Шалны нимгэн зууван шугам — машиныг тавцан дээр зогсоож харуулна */}
        <span className="spin__floor" aria-hidden />

        {/* Уусаж буй ХУУЧИН өнгө — доод давхарга */}
        {near && fadingFrom !== null && (
          <img
            key={`from-${colors[fadingFrom]?.id}`}
            src={frameOf(fadingFrom)}
            alt=""
            className="spin__frame"
            draggable={false}
            /*  — кадр аль хэдийн задлагдсан тул хойшлуулалгүй шууд будна.
                үед хөтөч будалтыг дараагийн кадр руу хойшлуулж,
               эргүүлэхэд таталдаа мэдрэгдэж болзошгүй. */
            decoding="sync"
          />
        )}

        {/* ХАРАГДАХ өнгө. `next/image` БИШ: кадрыг өөрсдөө кэшлэсэн бөгөөд
            секундэд олон удаа `src` солино — оптимизатораар дамжуулбал кадр
            тутамд хүсэлт үүсч эргэлт таталдана. */}
        {near && (
          <img
            key={`to-${shown.id}`}
            src={frameOf(shownIdx)}
            alt=""
            className={`spin__frame ${fadingFrom !== null ? "is-painting" : ""}`}
            draggable={false}
            decoding="sync"
          />
        )}

        {/* Гялбааг ЗОРИУДААР хассан.
            Цагаан долгион нь "будаг солигдож байна" гэхээсээ илүү "вэбсайт
            эффект тоглууллаа" гэж уншигддаг — өөрөөр хэлбэл зорилгынхоо
            эсрэг ажилладаг. Кадрууд пиксел түвшинд давхцдаг тул маскийн
            урсгал дангаараа хангалттай: зөвхөн будаг өөрчлөгдөнө. */}

        {/* Анхны ачаалалт — энэ үед харуулах машин байхгүй */}
        {!ready && (
          <div className="spin__loading" aria-live="polite">
            <span className="spin__spinner" />
          </div>
        )}

        {ready && !hinted && (
          <p className="spin__hint" aria-hidden>
            <span className="spin__hint-glyph">↻</span>
            360° ЭРГҮҮЛЖ ХАРАХ
          </p>
        )}
      </div>

      {/* --- Өнгөний сонголт --- */}
      <div className="spin__colors">
        <div className="spin__swatches" role="group" aria-label="Биеийн өнгө сонгох">
          {colors.map((c, i) => (
            <button
              key={c.id}
              type="button"
              className="spin__swatch"
              aria-label={labelOf(c)}
              aria-pressed={i === colorIdx}
              onClick={() => pickColor(i)}
            >
              {/* Будгийн гадаргуу: дээрээс нимгэн гэрэл, доороос сүүдэр —
                  хавтгай өнгө биш, металлик мэдрэмж өгнө */}
              <span className="spin__chip" style={{ background: c.hex }} />
            </button>
          ))}
        </div>

        {/* Зөвхөн ИДЭВХТЭЙ өнгийн нэр (§8). Ачаалж байгаа үед ч сонгосон
            өнгөний нэрийг харуулна — сонголт нь шууд хариу өгсөн мэдрэгдэнэ. */}
        <p className={`spin__colorname ${pending ? "is-pending" : ""}`} key={requested?.id}>
          {requested?.name ?? shown.name}
        </p>
      </div>
    </div>
  );
}
