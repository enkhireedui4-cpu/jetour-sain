/**
 * Загварын харагдац — нэг эх сурвалж.
 *
 * Navbar-ын mega menu болон нүүрийн загварын хэсэг хоёулаа эдгээрийг ашиглана
 * (өмнө нь navbar дотор дотоод map байсныг энд гаргаж, давхардлыг арилгав).
 *
 * `/menu/*.webp` нь загвар бүрийн ТУСДАА бэлтгэсэн, тунгалаг дэвсгэртэй
 * 800×480 хажуу талын зураг — цагаан дэвсгэр дээр тайралтгүй, бүтнээрээ
 * харагддаг тул configurator маягийн үзүүлэлтэд тохиромжтой.
 */

/** id → тунгалаг cutout зураг */
const MODEL_CUTOUT: Record<string, string> = {
  "x70-plus": "/menu/x70-plus.webp",
  x50: "/menu/x50.webp",
  // x1-v2 — зураг сольсны дараа хөтөч/Next-ийн оптимизаторын кэш хуучин
  // зургийг үзүүлсээр байсан. Файлын нэр солиход URL солигдож, кэш тасарна.
  x1: "/menu/x1-v2.webp",
  t1: "/menu/t1.webp",
  t2: "/menu/t2.webp",
  g700: "/menu/g700.webp",
  "t1-phev": "/menu/t1-phev.webp",
  "t2-phev": "/menu/t2-phev.webp",
};

/**
 * id → нүүрийн загвар сонгогчийн хажуу талын зураг.
 *
 * `/menu/*.webp`-ээс ялгаатай нь машин кадраа бараг дүүрэн эзэлсэн (≈93%),
 * илүү өндөр нягтралтай тунгалаг PNG — configurator маягийн том дүрсэлхэд
 * тохирно. Загвар бүрийн кадрлалт ойролцоо тул `object-fit: contain` дээр
 * машинууд ижил хэмжээтэй харагдана.
 *
 * Файлуудыг `scripts/import-model-side-images.mjs` (+ X1-д
 * `scripts/normalize-x1-side.mjs`) оруулдаг.
 */
const MODEL_SIDE: Record<string, string> = {
  "x70-plus": "/models/x70-plus/side.webp",
  x50: "/models/x50/side.webp",
  x1: "/models/x1/side.webp",
  t1: "/models/t1/side.webp",
  t2: "/models/t2/side.webp",
  g700: "/models/g700/side.webp",
  "t1-phev": "/models/t1-phev/side.webp",
  "t2-phev": "/models/t2-phev/side.webp",
};

/** Тухайн загварт зориулсан хажуу талын зураг байгаа эсэх */
export function hasModelSideImage(m: { id: string }): boolean {
  return Boolean(MODEL_SIDE[m.id]);
}

type MediaModel = { id: string; heroImage: string };
type PriceModel = { startingPrice?: string; price?: string | null; priceNote?: string };

/** Цэс/showcase-д тавих зураг. Тусгай асет байхгүй бол hero рүү унана. */
export function modelCutout(m: MediaModel): string {
  return MODEL_CUTOUT[m.id] ?? m.heroImage;
}

/**
 * Навигацийн mega цэсэнд тавих зураг — нүүр хуудасны сонгогчийнхтой ИЖИЛ.
 *
 * `/menu/*.webp` биш `side.png`-ийг сонгосон шалтгаан:
 *   · Өнгө нь нүүртэй таарна (X70 Plus улаан, X1 саарал) — цэс, нүүр хоёр
 *     өөр машин үзүүлэхээ болино.
 *   · Машин кадраа ~93% эзэлдэг (menu-д ~55%). Цэсэнд зураг жижиг тул энэ нь
 *     чухал: ижил нүдэнд машин мэдэгдэхүйц том, тод харагдана.
 *   · Найман загвар БҮГД нэг гэр бүлийн асет болж, эгнээнд жигд сууна.
 *     Хоёрыг нь сольчихвол тэр хоёр нь бусдаасаа өөр өндөртэй болно.
 */
export function modelMenuImage(m: MediaModel): string {
  return MODEL_SIDE[m.id] ?? modelCutout(m);
}

/** Загвар сонгогчийн том хажуу зураг. Байхгүй бол цэсний cutout руу унана. */
export function modelSideImage(m: MediaModel): string {
  return MODEL_SIDE[m.id] ?? modelCutout(m);
}

/** Тоо + нэгжийг салгасан үзүүлэлт (том тоо, жижиг нэгж болж харагдана) */
export type ModelMetric = { value: string; unit: string; label: string };

type SpecsModel = {
  specs: { length?: string; wheelbase?: string; groundClearance?: string };
};

/** "4,397 мм" → { value: "4397", unit: "мм" }. Таарахгүй бол бүтнээр нь буцаана. */
function splitUnit(raw?: string): { value: string; unit: string } | null {
  const s = raw?.trim();
  if (!s) return null;
  const m = s.match(/^([\d\s.,]+?)\s*([^\d\s].*)?$/);
  if (!m) return { value: s, unit: "" };
  // Мянгатын таслал/зайг авна — загвар болгонд ижил хэлбэртэй харагдана
  return { value: m[1].replace(/[\s,]/g, ""), unit: (m[2] ?? "").trim() };
}

/**
 * Загварын гурван хэмжээст үзүүлэлт.
 *
 * Урт / Тэнхлэгийн зай / Газраас тэнхлэг хүртэлх зай — учир нь энэ гурав л
 * ЗАГВАР БҮРТ
 * баталгаатай байгаа. Өргөн/өндөр нь зөвхөн X50, G700-д бүртгэлтэй тул
 * бүх загварт нэгэн жигд харуулах боломжгүй (байхгүй утгыг зохиохгүй).
 * CMS-д өргөн/өндөр бүрэн орсон үед энэ жагсаалтыг сольж болно.
 *
 * Нэршил нь сайт бүхэлдээ нэг стандарттай: чадал → "Хөдөлгүүрийн чадал",
 * зүтгэх хүч → "Дээд зүтгэх хүч", клиренс → "Газраас тэнхлэг хүртэлх зай (мм)".
 */
export function modelMetrics(m: SpecsModel): ModelMetric[] {
  const rows: { label: string; raw?: string }[] = [
    { label: "Урт", raw: m.specs.length },
    { label: "Тэнхлэг хоорондын зай", raw: m.specs.wheelbase },
    { label: "Газраас тэнхлэг хүртэлх зай (мм)", raw: m.specs.groundClearance },
  ];
  return rows
    .map(({ label, raw }) => {
      const parsed = splitUnit(raw);
      return parsed ? { ...parsed, label } : null;
    })
    .filter((x): x is ModelMetric => x !== null);
}

/** Тухайн загварт өөрийн cutout асет бий эсэх */
export function hasModelCutout(m: MediaModel): boolean {
  return Boolean(MODEL_CUTOUT[m.id]);
}

/** Цэсэнд харуулах үнэ — "94.9 сая ₮-с эхлэн" / тэмдэглэл / "Тун удахгүй" */
export function modelMenuPrice(m: PriceModel): string {
  return m.startingPrice ? `${m.startingPrice}-с эхлэн` : m.priceNote ?? "Тун удахгүй";
}

/**
 * Showcase-ийн үнэ — товч хэлбэр ("94.9 сая ₮-с").
 * Үнэгүй загварт `null` буцаана; дуудагч талдаа мөрийг нь бүрэн нуух боломжтой.
 */
export function modelPriceFrom(m: PriceModel): string | null {
  const raw = m.startingPrice ?? m.price ?? null;
  if (!raw) return null;
  // "119.9 сая ₮-с" гэж аль хэдийн бичигдсэн бол давхар дагавар нэмэхгүй
  return /-с$/.test(raw.trim()) ? raw.trim() : `${raw.trim()}-с`;
}
