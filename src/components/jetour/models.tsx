"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { CmsCarModel } from "@/lib/cms";
import {
  modelSideImage,
  modelMetrics,
  hasModelSideImage,
} from "@/lib/model-media";
import { useDragSwipe } from "@/hooks/use-drag";
import { WHEEL_ANCHORS, CAR_IMAGE_RATIO } from "@/lib/wheel-anchors";

type M = CmsCarModel;

const shortName = (m: M) => m.name.replace(/^JETOUR\s+/i, "");

/* --- Хөдөлгөөний тогтмолууд --------------------------------------------- */

/**
 * Шилжилтийн хугацаа (мс) — жинтэй, тайван automotive хэмнэл.
 * Утсанд арай богино: жижиг дэлгэц дээр ижил хугацаа удаан мэдрэгддэг.
 */
const DURATION = 980;
const DURATION_SMALL = 900;
const durationFor = (vw: number) => (vw < 640 ? DURATION_SMALL : DURATION);
/**
 * Хөдөлгөөн мэдрэмтгий хэрэглэгчид зориулсан хугацаа.
 *
 * Машины хэвтээ гулсалт нь энэ хэсгийн ҮНДСЭН харагдац — түүнийг богино
 * түлхэлт + бүдгэрэлтээр солих нь агуулгыг нь өөрчилнө. Иймд зам нь БҮТЭН
 * хэвээр, зөвхөн хугацаа нь богиносоно.
 *
 * Гэхдээ хэт богиносгохгүй: вестибуляр цочролыг тодорхойлдог зүйл бол ХУРД,
 * хугацаа биш. Анхны 320мс нь ≈4000px/с оргил хурд өгдөг байсан бол энэ нь
 * ≈3100px/с — бүтэн гулсалтаа хадгалж, цочролыг нь мэдэгдэхүйц бууруулна.
 */
const DURATION_REDUCED = 780;
/**
 * Хөдөлгөөний муруй — МАССЫН мэдрэмж өгөх нь гол зорилго.
 *
 * Өмнөх `cubic-bezier(0.22, 1, 0.36, 1)` (болон түүнтэй төстэй expo-out
 * муруйнууд) замынхаа 40%-ийг ЭХНИЙ 10% хугацаанд туулаад, үлдсэнийг нь
 * мөлхдөг. Тиймээс машин "гэнэт үсэрч ирээд" удаан суудаг мэт мэдрэгддэг.
 *
 * Өмнөх `cubic-bezier(0.5, 0.02, 0.32, 1)` нь замынхаа 91%-ийг эхний 70%
 * хугацаанд туулж дуусгаад үлдсэнийг мөлхдөг байв — өөрөөр хэлбэл машин
 * голдоо эрт хүрч, сүүлдээ зөвхөн "суудаг". Энэ муруй ирж БУУХ хэсгийг нь
 * уртасгана: эцсийн 30% хугацаанд замынхаа 18.5%-ийг тайван туулна (өмнө нь
 * 8.9%). Оргил хурд нь бас бага (18.6 vs 22.9) тул шидэлт багатай.
 *
 * 10 хэсэгт задалсан хурд: 1.8 → 5.1 → 9.1 → 13.7 → 17.5 → 18.6 (оргил)
 * → 15.8 → 10.8 → 5.9 → 1.8. Аажим хурдалж, дундаа намхан оргилдоо хүрч,
 * урт жигд буулттай — огцом зогсолт ч, хэтрэлт (bounce) ч байхгүй.
 */
const EASING = "cubic-bezier(0.5, 0.02, 0.55, 1)";

/**
 * Машин ЦОНХНООС БҮРЭН гарах зай (px).
 *
 * Хувиар (110%) авбал машины хайрцгаас л гарна — тайз нь дэлгэц дүүрэн учир
 * ирмэг дээр хэсэг нь харагдсаар үлдэнэ. Тиймээс бодит хэмжээнээс тооцно:
 * цонхны хагас + машины хагас + бага зэрэг нөөц.
 */
const exitDistance = (carWidth: number) =>
  Math.ceil(window.innerWidth / 2 + carWidth / 2) + 24;

/**
 * Гарч буй / орж ирж буй машины замнал. dir=+1 → шинэ нь БАРУУНААС ирнэ.
 *
 * `from` нь гараа авах агшинд машин чирэлтээр аль хэдийн явсан зай (px).
 * Үүнээс эхлүүлснээр чирээд тавихад машин 0 руу үсэрч буцаад дараа нь
 * гарахгүй — хуруунаас салсан яг тэр байрлалаасаа үргэлжлүүлнэ.
 */
const outKeyframes = (dir: 1 | -1, dist: number, from = 0): Keyframe[] => [
  { transform: `translate3d(${from}px, 0, 0)` },
  { transform: `translate3d(${-dir * dist}px, 0, 0)` },
];
const inKeyframes = (dir: 1 | -1, dist: number): Keyframe[] => [
  { transform: `translate3d(${dir * dist}px, 0, 0)` },
  { transform: "translate3d(0px, 0, 0)" },
];

/**
 * Дугуйн эргэлт — машины хөдөлгөөнтэй ФИЗИКИЙН хамааралтай.
 *
 * Өнхрөх нөхцөл: дугуйн доод цэг газартай харьцангуй хөдөлгөөнгүй. Тиймээс
 * эргэлтийн өнцөг = явсан зам / тойрог × 360°. Зүүн тийш явахад (dir=+1)
 * дугуй цагийн зүүний ЭСРЭГ (CSS-д сөрөг) эргэнэ.
 *
 * Машин, дугуй хоёр НЭГ л timeline дээр, ижил easing-тэй тул хурдасч,
 * удаашрахдаа хамт хөдөлнө — "наасан" мэдрэмж үүсэхгүй.
 */
const wheelSpinDeg = (dir: 1 | -1, dist: number, wheelPx: number) => {
  if (wheelPx <= 0) return 0;
  /* Бүтэн эргэлт рүү бөөрөнхийлнө: тайван байдалд дугайны зураг кузовынхаа
     дугуйтай ЯГ давхцаж, "наасан" давхарга огт мэдэгдэхгүй болно.
     Бодит өнхрөлтөөс ±10% зөрөх нь нүдэнд мэдэгдэхгүй. */
  const turns = Math.max(1, Math.round(dist / (Math.PI * wheelPx)));
  return -dir * turns * 360;
};

const spinKeyframes = (deg: number, from = 0): Keyframe[] => [
  { transform: `translate(-50%, -50%) rotate(${from}deg)` },
  { transform: `translate(-50%, -50%) rotate(${deg}deg)` },
];

/**
 * Чирэх үеийн дугуйн эргэлт — өнхрөх нөхцлөөс шууд гарна:
 * өнцөг = явсан зам / тойрог × 360°. Зүүн тийш (dx < 0) чирэхэд сөрөг.
 */
const rollDegFor = (dx: number, wheelPx: number) =>
  wheelPx > 0 ? (dx / (Math.PI * wheelPx)) * 360 : 0;

/**
 * Шилжилтийн төлөв.
 *  • active   — голд байгаа загвар
 *  • outgoing — гарч яваа загвар (-1 бол шилжилт дууссан, навигаци нээлттэй)
 *  • dir      — +1: хуучин нь ЗҮҮН тийш гарч, шинэ нь БАРУУНААС ирнэ
 *               -1: хуучин нь БАРУУН тийш гарч, шинэ нь ЗҮҮНЭЭС ирнэ
 *  • from     — гарч яваа машин чирэлтээр аль хэдийн явсан зай (px).
 *               Сум/гараар шилжихэд 0. Анимаци эндээс эхэлнэ.
 */
type Nav = { active: number; outgoing: number; dir: 1 | -1; from: number };

/* ============================================================
   Нүүр — JETOUR загвар сонгогч (premium automotive configurator)

   Зохиомж: зүүнд нэр/ангилал/CTA, баруунд гол үзүүлэлт, доор нь том
   хажуу дүрс, хамгийн доор нь хөнгөн сонгогч. Десктоп дээр бүхэлдээ
   нэг дэлгэцэнд багтахаар тайзны өргөнийг боломжит өндрөөр хязгаарлав.

   Хөдөлгөөн: машин нь Web Animations API-аар ФИЗИКЭЭР хэвтээ гулсана.
   Зөвхөн `transform` хөдөлдөг — opacity-гүй (тайз `overflow: hidden` тул
   машин ирмэг дээрээ өөрөө таслагдана). Ингэснээр "cross-fade" мэдрэмж
   огт үүсэхгүй: гарч буй машин ирмэг хүртэл бүрэн тодоороо явна.
   ============================================================ */
export function Models({ models: allModels }: { models: M[] }) {
  /* Зөвхөн хажуу талын зурагтай загварууд — дутуу/өөр маягийн зураг эгнээг
     эвдэнэ. Одоогоор бүх загвар зурагтай. Шинэ загвар нэмэхэд `MODEL_SIDE`-д
     нэг мөр бичихэд л энэ хэсэгт орж ирнэ.
     Дараалал нь өгөгдлийнхөө дарааллаар хэвээр (filter эрэмбийг хөндөхгүй). */
  const models = allModels.filter(hasModelSideImage);

  const [nav, setNav] = useState<Nav>({ active: 0, outgoing: -1, dir: 1, from: 0 });
  const carRefs = useRef<(HTMLDivElement | null)[]>([]);
  const runningRef = useRef<Animation[]>([]);
  const railRef = useRef<HTMLDivElement>(null);

  const total = models.length;
  const safeActive = Math.min(nav.active, Math.max(total - 1, 0));
  /** Шилжилт явж байхад шинэ навигаци хүлээж авахгүй — анимаци давхарлахгүй */
  const busy = nav.outgoing !== -1;

  /** Индексээр шилжих — чиглэлийг дуудагч тал өгнө (цикл дээр ч зөв ажиллана) */
  const go = useCallback((to: number, dir: 1 | -1, from = 0) => {
    setNav((s) =>
      s.outgoing !== -1 || to === s.active ? s : { active: to, outgoing: s.active, dir, from }
    );
  }, []);

  /** Сум / гар / шудрахад — циклээр */
  const step = useCallback(
    (dir: 1 | -1, from = 0) =>
      setNav((s) =>
        s.outgoing !== -1
          ? s
          : {
              active: (s.active + dir + models.length) % models.length,
              outgoing: s.active,
              dir,
              from,
            }
      ),
    [models.length]
  );
  const next = useCallback(() => step(1), [step]);
  const prev = useCallback(() => step(-1), [step]);

  /* --- Гулсалт --------------------------------------------------------
     useLayoutEffect: React нь шинэ машиныг аль хэдийн голд (transform: none)
     байрлуулсан байдаг ч энэ нь будагдахаас ӨМНӨ ажиллаж, анимацийг
     эхлүүлнэ. WAAPI нь эхлэлийн кадраа өөрөө зааж өгдөг тул CSS transition
     шиг "хоёр кадр хүлээх" заль шаардлагагүй — эхлэл нь баталгаатай. */
  useLayoutEffect(() => {
    if (nav.outgoing === -1) return;

    const outEl = carRefs.current[nav.outgoing];
    const inEl = carRefs.current[nav.active];

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const duration = reduce ? DURATION_REDUCED : durationFor(window.innerWidth);
    const opts: KeyframeAnimationOptions = { duration, easing: EASING };
    const dist = exitDistance((inEl ?? outEl)?.getBoundingClientRect().width ?? 0);

    /* Кузов ба дугуй — ЯГ нэг сонголт (duration/easing) дээр. Дугайнууд нь
       кузовын дотор байрладаг тул хэвтээ шилжилтийг өвлөнө; энд зөвхөн
       өөрсдийн эргэлтийг нэмнэ. */
    /* `fromPx` — чирэлтээр аль хэдийн явсан зай. Кузов болон дугуй хоёулаа
       ЯГ тэр байрлал/өнцгөөсөө үргэлжилнэ; эс бөгөөс 0 руу үсрэх нь мэдэгдэнэ. */
    const spinOf = (el: HTMLDivElement | null, fromPx = 0) =>
      Array.from(el?.querySelectorAll<HTMLElement>(".mdlsel__wheel") ?? []).map((w) => {
        const wpx = w.getBoundingClientRect().width;
        return w.animate(
          spinKeyframes(wheelSpinDeg(nav.dir, dist, wpx), rollDegFor(fromPx, wpx)),
          opts
        );
      });

    const anims = [
      outEl?.animate(outKeyframes(nav.dir, dist, nav.from), opts),
      inEl?.animate(inKeyframes(nav.dir, dist), opts),
      ...spinOf(outEl, nav.from),
      ...spinOf(inEl),
    ].filter((a): a is Animation => Boolean(a));
    runningRef.current = anims;
    const done = Promise.allSettled(anims.map((a) => a.finished));

    let cancelled = false;
    // Нөөц таймер: таб нуугдсан үед WAAPI-ийн `finished` удаж болзошгүй
    const guard = window.setTimeout(() => {
      if (!cancelled) setNav((s) => (s.outgoing === -1 ? s : { ...s, outgoing: -1 }));
    }, duration + 120);

    done.then(() => {
      if (!cancelled) setNav((s) => (s.outgoing === -1 ? s : { ...s, outgoing: -1 }));
    });

    return () => {
      cancelled = true;
      window.clearTimeout(guard);
      runningRef.current.forEach((a) => a.cancel());
      runningRef.current = [];
    };
  }, [nav.active, nav.outgoing, nav.dir]);

  /* Сонгогдсон бяцхан зургийг эгнээнийхээ ГОЛД аваачна (§12).

     `scrollIntoView` ашиглахгүй: тэр нь зөвхөн энэ савыг биш, ЭЦЭГ бүх
     гүйдэг элементийг (мөн хуудсыг өөрийг нь) хөдөлгөдөг тул утсан дээр
     загвар солиход хуудас үсэрдэг. Энд зөвхөн эгнээний `scrollLeft`-ийг
     өөрчилнө — хуудас байрандаа хэвээр. */
  useEffect(() => {
    const rail = railRef.current;
    const el = rail?.querySelectorAll<HTMLElement>(".mdlsel__thumb")[safeActive];
    if (!rail || !el) return;

    const max = rail.scrollWidth - rail.clientWidth;
    if (max <= 0) return; // гүйх зайгүй (ширээний өргөн) — хөндөхгүй

    const left = Math.max(
      0,
      Math.min(el.offsetLeft - (rail.clientWidth - el.offsetWidth) / 2, max)
    );
    if (Math.abs(left - rail.scrollLeft) < 2) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    rail.scrollTo({ left, behavior: reduce ? "auto" : "smooth" });
  }, [safeActive]);

  /* --- Чирэх явцын хөдөлгөөн ------------------------------------------
     Машин хуруу дагаж 1:1 хөдөлж, дугуй нь явсан замынхаа хэрээр өнхөрнө.
     Босгонд хүрвэл WAAPI нь яг тэр байрлалаас нь аваад гүйцээнэ; хүрэхгүй
     бол машин зөөлөн байрандаа буцаж суана. */
  const [dragDx, setDragDx] = useState(0);
  const dragging = dragDx !== 0;
  /** Дугуйн диаметр (px) — чирэлт эхлэхэд нэг удаа хэмжинэ */
  const [wheelPx, setWheelPx] = useState(0);

  /* `onNext`/`onPrev` нь ЭНЭ рендерийн `dragDx`-ийг барина. Хук нь гараа
     авахад эхлээд `onMove(0)`, дараа нь `onNext()` дууддаг — сүүлийн
     рендерийн утга тул чирэлтийн эцсийн шилжилт яг энд байна. */
  const swipe = useDragSwipe({
    onNext: () => step(1, dragDx),
    onPrev: () => step(-1, dragDx),
    threshold: 56,
    onStart: () => {
      const w = carRefs.current[safeActive]?.querySelector<HTMLElement>(".mdlsel__wheel");
      setWheelPx(w?.getBoundingClientRect().width ?? 0);
    },
    onMove: setDragDx,
  });

  /* Чирэлтийг "дарлаа" гэж андуурахгүй: тайзан дээр хуруу/хулгана 8px-ээс их
     хөдөлсөн бол машин дээрх холбоосын шилжилтийг цуцална. Ингэснээр шудрахад
     санамсаргүйгээр дэлгэрэнгүй хуудас руу үсрэхгүй. */
  const pressRef = useRef({ x: 0, y: 0 });
  const onStagePressStart = (e: React.PointerEvent) => {
    pressRef.current = { x: e.clientX, y: e.clientY };
  };
  const cancelIfDragged = (e: React.MouseEvent) => {
    if (
      Math.abs(e.clientX - pressRef.current.x) > 8 ||
      Math.abs(e.clientY - pressRef.current.y) > 8
    )
      e.preventDefault();
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      next();
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      prev();
    } else if (e.key === "Home") {
      e.preventDefault();
      go(0, -1);
    } else if (e.key === "End") {
      e.preventDefault();
      go(models.length - 1, 1);
    }
  };

  if (total === 0) return null;

  const m = models[safeActive];
  const metrics = modelMetrics(m);

  return (
    <section id="models" className="mdlsel scroll-mt-16" aria-label="JETOUR загварууд">
      <div className="mdlsel__inner">
        {/* Толгой — зөвхөн загварын нэр ба ангилал. Хэсгийн гарчиг, үнэ, CTA
            байхгүй: загвар өөрөө хэсгийг танилцуулна. */}
        <div className="mdlsel__head">
          {/* key → загвар солигдоход чиглэлийн дагуу зөөлөн орж ирнэ */}
          <div className="mdlsel__id" key={`id-${m.id}`} data-dir={nav.dir}>
            <h2 className="mdlsel__name">{shortName(m)}</h2>
            <p className="mdlsel__sub">{m.tagline}</p>
          </div>

          {metrics.length > 0 && (
            <dl className="mdlsel__metrics" key={`sp-${m.id}`} data-dir={nav.dir}>
              {/* DOM дараалал: нэр → утга (dl семантик).
                  Харагдац нь column-reverse-ээр эргэж, том тоо дээрээ гарна. */}
              {metrics.map((s) => (
                <div key={s.label} className="mdlsel__metric">
                  <dt className="mdlsel__metric-label">{s.label}</dt>
                  <dd className="mdlsel__metric-value">
                    {s.value}
                    {s.unit && <span>{s.unit}</span>}
                  </dd>
                </div>
              ))}
            </dl>
          )}
        </div>

        {/* --- Тайз: машинууд давхарлан байрлана. Голынх нь `transform: none`,
                бусад нь тайзны гадна. Гулсалтыг WAAPI хийнэ. --- */}
        <div
          role="group"
          aria-roledescription="carousel"
          aria-label="JETOUR загварын үзүүлэн"
          className={`mdlsel__stage ${total > 1 ? swipe.className : ""}`}
          style={total > 1 ? swipe.style : undefined}
          {...(total > 1 ? swipe.handlers : {})}
          onPointerDownCapture={onStagePressStart}
        >
          {models.map((mm, i) => {
            const isActive = i === safeActive;
            /* Зэргэлдээ загваруудыг урьдчилан ачаална — гулсалт хоосон гарахгүй */
            const near =
              i === 0 ||
              Math.abs(i - safeActive) <= 1 ||
              Math.abs(i - safeActive) === total - 1;
            const wheels = WHEEL_ANCHORS[mm.id];

            return (
              <div
                key={mm.id}
                ref={(el) => {
                  carRefs.current[i] = el;
                }}
                className="mdlsel__car"
                /* Зөвхөн эцсийн байрлал. Шилжилтийн замыг WAAPI зурна.
                   Хүлээж буй машинууд `50vw + 100%`-д зогсоно: ямар ч өргөнтэй
                   цонхонд цонхны гадна баталгаатай (тайз дэлгэц дүүрэн тул
                   хувь дангаараа хангалтгүй). */
                style={
                  {
                    transform: isActive
                      ? `translate3d(${dragDx}px, 0, 0)`
                      : "translate3d(calc(50vw + 100%), 0, 0)",
                    /* Чирч байхад 1:1 дагана; тавихад (босго хүрээгүй үед)
                       зөөлөн буцна. Шилжилт явж байхад унтарна — WAAPI-тай
                       зөрчилдөхгүй. */
                    transition:
                      isActive && !busy && !dragging
                        ? "transform 420ms cubic-bezier(0.22, 1, 0.36, 1)"
                        : "none",
                    /* Дугуйн өнхрөлт — `.mdlsel__wheel` үүнийг өвлөнө */
                    ...(isActive && dragging
                      ? { "--roll": `${rollDegFor(dragDx, wheelPx)}deg` }
                      : null),
                  } as React.CSSProperties
                }
                aria-hidden={!isActive}
              >
                {/* Кузов + дугуй нэг хайрцагт. Хайрцгийн харьцаа нь эх
                    зургийнхтай ижил тул зураг яг дүүрч, дугуйн хувиар өгсөн
                    байрлал нь пиксел түвшинд таарна. */}
                <div
                  className="mdlsel__carbox"
                  style={{ aspectRatio: String(CAR_IMAGE_RATIO[mm.id] ?? 2.9) }}
                >
                  <Image
                    src={modelSideImage(mm)}
                    alt={`${mm.name} — хажуу талын үзэмж`}
                    fill
                    sizes="(max-width: 1200px) 90vw, 1080px"
                    priority={i === 0}
                    loading={near ? "eager" : "lazy"}
                    draggable={false}
                    className="mdlsel__img"
                  />

                  {wheels &&
                    (["front", "rear"] as const).map((pos) => (
                      <span
                        key={pos}
                        className="mdlsel__wheel"
                        style={
                          {
                            "--wx": `${wheels[pos].xPct}%`,
                            "--wy": `${wheels[pos].yPct}%`,
                            "--ww": `${wheels.wPct}%`,
                            "--wh": `${wheels.hPct}%`,
                          } as React.CSSProperties
                        }
                        aria-hidden
                      >
                        <Image
                          src={wheels.image}
                          alt=""
                          fill
                          sizes="160px"
                          loading={near ? "eager" : "lazy"}
                          draggable={false}
                          className="mdlsel__img"
                        />
                      </span>
                    ))}

                  {/* Машин өөрөө дэлгэрэнгүй хуудас руу хөтөлнө — тусдаа
                      товч хэрэггүй. Зөвхөн голын машинд; чирэлтийн дараах
                      дарлагыг `cancelIfDragged` таслана. */}
                  {isActive && (
                    <Link
                      href={`/models/${mm.id}`}
                      className="mdlsel__carlink"
                      aria-label={`${mm.name} — дэлгэрэнгүй үзэх`}
                      onClick={cancelIfDragged}
                      draggable={false}
                    />
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* --- Доод сонгогч: сум | бяцхан зургууд | сум --- */}
        <div className="mdlsel__rail">
          <button
            type="button"
            onClick={prev}
            disabled={busy}
            aria-label="Өмнөх загвар"
            className="mdlsel__arrow"
          >
            <ChevronLeft strokeWidth={1.75} aria-hidden />
          </button>

          <div
            ref={railRef}
            aria-label="JETOUR загварууд"
            onKeyDown={onKeyDown}
            className="mdlsel__thumbs scrollbar-hide"
          >
            {models.map((mm, i) => {
              const selected = i === safeActive;
              const inner = (
                <>
                  <span className="mdlsel__thumb-img">
                    <Image
                      src={modelSideImage(mm)}
                      alt=""
                      fill
                      sizes="130px"
                      loading="lazy"
                      draggable={false}
                      className="mdlsel__img"
                    />
                  </span>
                  <span className="mdlsel__thumb-name">{shortName(mm)}</span>
                </>
              );

              /* Сонгогдсон загвар — ХОЛБООС (дэлгэрэнгүй рүү).
                 Бусад нь — ТОВЧ (тухайн загварыг сонгоно). Ингэснээр нэг
                 дарлагаар сонгож, дахин дарлагаар дэлгэрэнгүй рүү орно;
                 чиглэлтэй шилжилтийн логик хэвээр үлдэнэ. */
              return selected ? (
                <Link
                  key={mm.id}
                  href={`/models/${mm.id}`}
                  aria-current="true"
                  className="mdlsel__thumb is-active"
                >
                  {inner}
                </Link>
              ) : (
                <button
                  key={mm.id}
                  type="button"
                  disabled={busy}
                  aria-label={`${shortName(mm)} загварыг сонгох`}
                  /* Чиглэл нь индексийн зөрүүгээр: баруун талын загвар
                     дарвал баруунаас, зүүн талынх бол зүүнээс орж ирнэ */
                  onClick={() => go(i, i > safeActive ? 1 : -1)}
                  className="mdlsel__thumb"
                >
                  {inner}
                </button>
              );
            })}
          </div>

          <button
            type="button"
            onClick={next}
            disabled={busy}
            aria-label="Дараагийн загвар"
            className="mdlsel__arrow"
          >
            <ChevronRight strokeWidth={1.75} aria-hidden />
          </button>
        </div>
      </div>
    </section>
  );
}
