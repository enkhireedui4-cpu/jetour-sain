"use client";

import { useLayoutEffect, useRef } from "react";
import { metricFrame, parseMetric } from "@/lib/count-anim";

/**
 * Загвар солигдоход үзүүлэлтийн ТОО хуучин утгаасаа шинэ рүүгээ тоолж очно
 * (4590 → 4720). Шошго нь хөдөлгөөнгүй хэвээр — зөвхөн тоо нь солигдоно.
 *
 * Хоёр давхарга:
 *   1. ТООЛОЛ — `requestAnimationFrame` дээр `textContent`-ыг шууд бичнэ.
 *      React-ийн `setState` ашиглавал кадр бүрт дахин рендер хийгдэнэ
 *      (3 үзүүлэлт × ~45 кадр ≈ 135 удаа) — энд огт хэрэггүй ажил.
 *   2. ЧИГЛЭЛ — өссөн тоо ДООРООС дээш, буурсан нь ДЭЭРЭЭС доош гулсаж
 *      тогтоно (WAAPI, зөвхөн `transform`/`opacity`). Хөдөлгөөн нь ±7px —
 *      анзаарагдах ч анхаарал сарниулахааргүй.
 *
 * SSR: эхний рендерт эцсийн утгаа шууд гаргана. `useLayoutEffect` нь
 * будагдахаас ӨМНӨ ажиллах тул шилжилтийн эхний кадр хэзээ ч "гялсхийхгүй".
 */
export function MetricNumber({
  value,
  duration = 720,
  delay = 0,
}: {
  value: string;
  /** Тооллын хугацаа (мс). Богино, тайван — гялалзуулах зорилгогүй. */
  duration?: number;
  /** Эхлэхээс өмнөх хүлээлт (мс) — багануудыг дараалуулахад */
  delay?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  /** Дэлгэц дээр ОДООГООР харагдаж буй утга — шилжилтийн эхлэл нь энэ */
  const shownRef = useRef(value);
  const rafRef = useRef(0);
  const animRef = useRef<Animation | null>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    const from = parseMetric(shownRef.current);
    const to = parseMetric(value);
    const prev = shownRef.current;
    shownRef.current = value;

    /* Эхний холболт, тоо бус утга, эсвэл өөрчлөгдөөгүй — хөдөлгөөнгүй */
    if (!el || !from || !to || from.n === to.n || prev === value) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return; // React аль хэдийн эцсийн утгыг бичсэн

    const dir = to.n > from.n ? 1 : -1;
    const t0 = performance.now();

    /* React шинэ утгыг DOM-д биччихсэн — тоолол эхлэхийн өмнө хуучин руу нь
       буцаана. Будагдахаас өмнө болж буй тул нүдэнд мэдэгдэхгүй. */
    el.textContent = metricFrame(from, to, 0);

    const tick = (now: number) => {
      /* Хүлээлтийн хугацаанд `p` нь сөрөг → `metricFrame` 0 руу хавчина,
         өөрөөр хэлбэл тоо хуучин утга дээрээ хөдөлгөөнгүй хүлээнэ. */
      const p = Math.min(1, (now - t0 - delay) / duration);
      el.textContent = p < 1 ? metricFrame(from, to, p) : value;
      rafRef.current = p < 1 ? requestAnimationFrame(tick) : 0;
    };
    rafRef.current = requestAnimationFrame(tick);

    /* Өссөн бол доороос дээш, буурсан бол дээрээс доош. `dir * 7` нь
       ЭХЛЭЛИЙН шилжилт: +1 (өссөн) → +7px = доор → 0 руу дээшилнэ. */
    animRef.current = el.animate(
      [
        { transform: `translate3d(0, ${dir * 7}px, 0)`, opacity: 0.35 },
        { transform: "translate3d(0, 0, 0)", opacity: 1 },
      ],
      {
        duration: Math.round(duration * 0.86),
        delay,
        fill: "backwards",
        easing: "cubic-bezier(0.22, 1, 0.36, 1)",
      }
    );

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = 0;
      animRef.current?.cancel();
      animRef.current = null;
      /* Таслагдсан шилжилт эцсийн утгадаа очиж үлдэнэ — хагас тоо гацахгүй */
      if (el) el.textContent = value;
      shownRef.current = value;
    };
  }, [value, duration, delay]);

  return (
    <span ref={ref} className="mdlsel__metric-num">
      {value}
    </span>
  );
}
