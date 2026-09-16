/**
 * Тоон үзүүлэлтийн зөөлөн шилжилт — ЦЭВЭР функцүүд.
 *
 * `4590` → `4720` гэж агшин зуур солихын оронд хооронд нь интерполяци хийж,
 * тоо нь "тоолж" очно. Энд DOM, React, цаг хугацаа байхгүй — зөвхөн математик.
 * Ингэснээр зан үйлийг нь браузергүйгээр шалгаж болно (`tests/unit`).
 *
 * Хэрэглэгч: `components/jetour/metric-number.tsx`.
 */

/** Задлагдсан тоон утга: өөрөө + аравтын орны тоо (форматыг тогтвортой барина) */
export type NumericMetric = { n: number; decimals: number };

/**
 * "4720" → { n: 4720, decimals: 0 } · "1.8" → { n: 1.8, decimals: 1 }.
 *
 * `modelMetrics` нь мянгатын таслал/зайг аль хэдийн авчихсан байдаг тул энд
 * зөвхөн цэвэр тоо ирнэ. Тоо БИШ бол `null` — дуудагч тал шууд солино
 * (утгыг хэзээ ч зохиохгүй: CMS-д "н/д" гэх мэт бичиг байж болно).
 */
export function parseMetric(raw: string): NumericMetric | null {
  const s = raw.trim();
  if (!/^-?\d+(?:\.\d+)?$/.test(s)) return null;
  const n = Number(s);
  if (!Number.isFinite(n)) return null;
  const dot = s.indexOf(".");
  return { n, decimals: dot === -1 ? 0 : s.length - dot - 1 };
}

/**
 * Smootherstep (Perlin) — 0 ба 1 цэг дээр нэгдүгээр ба ХОЁРДУГААР уламжлал нь
 * тэг. Практикт: тоо огцом "хөдлөөд" эхлэхгүй, эцэст нь мөлхөхгүй.
 *
 * `easeOutExpo` мэтийн муруй замынхаа ихэнхийг эхний хэдэн кадрт туулдаг тул
 * тоолол нь "шидэлт" мэт харагддаг — энэ хэсэгт хэрэггүй. Smootherstep нь
 * тэгш хэмтэй, тайван — үзүүлэлтийн самбарт тохирох хэмнэл.
 */
export function smootherstep(t: number): number {
  const x = t <= 0 ? 0 : t >= 1 ? 1 : t;
  return x * x * x * (x * (x * 6 - 15) + 10);
}

/**
 * Явцын агшин дахь утга. `decimals` нь ҮРГЭЛЖ ЗОРИЛТЫНХ — тоолох явцад
 * оронгийн тоо өөрчлөгдвөл өргөн нь чичирнэ (`tabular-nums` ч аврахгүй).
 */
export function metricFrame(
  from: NumericMetric,
  to: NumericMetric,
  progress: number
): string {
  const v = from.n + (to.n - from.n) * smootherstep(progress);
  return v.toFixed(to.decimals);
}

/**
 * Шилжилтийн чиглэл: +1 өссөн · −1 буурсан · 0 өөрчлөгдөөгүй/тоо биш.
 *
 * Харагдацад хэрэглэнэ: өссөн тоо ДЭЭШ, буурсан нь ДООШ хөдөлж тогтоно —
 * утга нь ямар зүг рүү явсныг уншихаас өмнө мэдрүүлнэ.
 */
export function metricDirection(from: string, to: string): -1 | 0 | 1 {
  const a = parseMetric(from);
  const b = parseMetric(to);
  if (!a || !b || a.n === b.n) return 0;
  return b.n > a.n ? 1 : -1;
}
