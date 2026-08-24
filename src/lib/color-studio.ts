/**
 * Өнгөний сонголтын (color studio) тооцоолол.
 *
 * Өгөгдөлд өнгө бүрт ганц hex л байдаг тул swatch-ийн градиент болон секцийн
 * дэвсгэрийг түүнээс нь ТООЦОЖ гаргана — өнгө бүрт нэмэлт талбар оруулах
 * шаардлагагүй.
 *
 * Эдгээр нь цэвэр функцууд (React-гүй, side-effect-гүй) тул `model-detail-client.tsx`
 * (1,500+ мөр) дотроос энд гаргав: тусад нь тест бичих боломжтой болж, тэр
 * файлын хэмжээ багасна. Гадагш зөвхөн ГУРВАН зүйл нээлттэй — үлдсэн нь
 * дотоод туслах функц.
 */

/** "#1C3D5A" эсвэл "1c3d5a" эсвэл "#abc" → [r, g, b]. Таарахгүй бол null. */
function hexToRgb(hex?: string): [number, number, number] | null {
  if (!hex) return null;
  const h = hex.trim().replace("#", "");
  const full = h.length === 3 ? h.split("").map((c) => c + c).join("") : h;
  if (!/^[0-9a-fA-F]{6}$/.test(full)) return null;
  const n = parseInt(full, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

function rgbCss([r, g, b]: [number, number, number]) {
  return `rgb(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)})`;
}

/** t > 0 — цагаан руу, t < 0 — хар руу шилжүүлнэ */
function shade(hex: string, t: number) {
  const rgb = hexToRgb(hex);
  if (!rgb) return hex;
  const to = t >= 0 ? 255 : 0;
  const k = Math.abs(t);
  return rgbCss([
    rgb[0] + (to - rgb[0]) * k,
    rgb[1] + (to - rgb[1]) * k,
    rgb[2] + (to - rgb[2]) * k,
  ]);
}

/** shade-ийн rgb хувилбар (тооцоонд дахин ашиглахад) */
function shadeRgb(
  [r, g, b]: [number, number, number],
  t: number
): [number, number, number] {
  const to = t >= 0 ? 255 : 0;
  const k = Math.abs(t);
  return [r + (to - r) * k, g + (to - g) * k, b + (to - b) * k];
}

/** sRGB relative luminance (WCAG) — дэвсгэр гэрэлтэй эсэхийг шийдэхэд */
function relLuminance([r, g, b]: [number, number, number]) {
  const f = (v: number) => {
    const c = v / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  };
  return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
}

/** Өнгөний ханалтыг бууруулна (amount=1 бол бүрэн саарал) */
function desaturateRgb(
  rgb: [number, number, number],
  amount: number
): [number, number, number] {
  const grey = 0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2];
  return [
    rgb[0] + (grey - rgb[0]) * amount,
    rgb[1] + (grey - rgb[1]) * amount,
    rgb[2] + (grey - rgb[2]) * amount,
  ];
}

/** Студийн саарал суурь — гол гэрэлтэй, булан руугаа гүнзгийрнэ.
    Цагаан текст булан дээр AA (≥4.5:1) давахуйц бараан байхаар сонгов. */
const STUDIO_CENTER: [number, number, number] = [140, 145, 151];
const STUDIO_MID: [number, number, number] = [118, 123, 129];
const STUDIO_EDGE: [number, number, number] = [92, 96, 102];

/**
 * Будгийн өөрийнх нь аясыг ХЭРЭГЛЭХЭЭ БОЛИХ гэрэлтэлтийн босго.
 *
 * Гаралт: цагаан текстийн контраст = 1.05 / (L + 0.05). WCAG AA нь 4.5:1
 * шаарддаг тул L ≤ 1.05/4.5 − 0.05 = 0.1833.
 *
 * Өмнө 0.2 байсан нь ХЭТ СУЛ: X1-ийн "Технологийн саарал" (#8A8F98) будгийн
 * булан L=0.1968 гарч, босгыг давахгүй өнгөрөөд контраст нь 4.25:1 болж
 * AA уналаа. Тест (`tests/unit/color-studio.test.ts`) үүнийг илрүүлсэн.
 */
const MAX_EDGE_LUMINANCE = 1.05 / 4.5 - 0.05;

/* ── Гадагш нээлттэй ────────────────────────────────────────────── */

export type StudioTone = {
  background: string;
  ink: string;
  muted: string;
  ring: string;
  swatchLine: string;
};

/** Swatch — гялалзсан мэт хөнгөн градиент */
export function swatchGradient(hex: string) {
  return `linear-gradient(135deg, ${shade(hex, 0.18)}, ${shade(hex, -0.22)})`;
}

/**
 * Swatch-ийн дотоод highlight — металлик будгийн мэдрэмж. Дээрээс нимгэн цайвар,
 * доороос нимгэн бараан: цагаан/мөнгөлөг өнгө ч цайвар дэвсгэрээс салж, хар нь
 * бүрэн хавтгай харагдахгүй. Сонгогдсон байдалд ring-тэй хамт дахин бичигдэнэ
 * (inline style CSS-ийн box-shadow-г бүхэлд нь дарж бичдэг тул).
 */
export const SWATCH_INSET =
  "inset 0 1px 1px rgba(255,255,255,0.55), inset 0 -2px 3px rgba(0,0,0,0.10)";

/**
 * Секцийн өнгөний аяс — студийн зөөлөн дэвсгэр.
 *
 * Сонгосон будгийг 62%-иар цайруулж (ханалтыг нь бууруулж) голоос гэрэлтсэн
 * radial градиент болгоно: цагаан → зөөлөн цайвар саарал, хар → нүүрсэн хар,
 * хөх → маш бүдэг хөх-саарал, саарал → нейтрал саарал. Будаг хэзээ ч хэт
 * ханасан болохгүй — машин л гол баатар хэвээр.
 *
 * Цайвар будгийн үед (булангийн гэрэлтэлт > 0.2) дэвсгэр нь машинтайгаа нийлж,
 * цагаан текст уншигдахаа болих тул студийн нейтрал саарал руу шилжинэ.
 */
export function colorTone(hex?: string): StudioTone {
  const rgb = hexToRgb(hex) ?? [236, 237, 239];
  const base = desaturateRgb(rgb, 0.62);
  let center = shadeRgb(base, 0.26);
  let mid = base;
  let edge = shadeRgb(base, -0.14);

  if (relLuminance(edge) > MAX_EDGE_LUMINANCE) {
    center = STUDIO_CENTER;
    mid = STUDIO_MID;
    edge = STUDIO_EDGE;
  }

  return {
    background: `radial-gradient(125% 105% at 50% 38%, ${rgbCss(center)} 0%, ${rgbCss(
      mid
    )} 44%, ${rgbCss(edge)} 100%)`,
    ink: "#FFFFFF",
    muted: "rgba(255,255,255,0.80)",
    ring: "#FFFFFF",
    swatchLine: "rgba(255,255,255,0.38)",
  };
}
