// scripts/detect-wheel-anchors.mjs
// Build-time хэрэгсэл: машин бүрийн дугуйн ТӨВ ба ДИАМЕТРийг олж,
// `src/lib/wheel-anchors.ts` конфигийг үүсгэнэ.
//
// Ажиллах үед таамаглал хийхгүй (шаардлага §6): энэ скрипт нэг удаа ажиллаж,
// шалгагдсан тоонуудыг кодод бичнэ.
//
// Арга:
//   1. НОРМАЛЧИЛСАН ХӨНДЛӨН КОРРЕЛЯЦИ (NCC) — дугуйн зургийг машин дээр
//      гүйлгэж, хамгийн сайн таарах байрлал/масштабыг олно. NCC нь
//      гэрэлтэлтээс хамааралгүй бөгөөд темплейтийн хэмжээнд хазайдаггүй.
//   2. ГАЗРЫН ХЯЗГААР — дугуй ҮРГЭЛЖ газартай хүрдэг. Тиймээс дугуйн доод
//      ирмэг нь машины доод ирмэгтэй таарахгүй бол тэр хувилбарыг хаяна.
//      Энэ хязгаар нь буруу масштабыг (өмнөх оролдлогын гол алдаа) таслана.
//   3. СИММЕТР — нэг машины хоёр дугуй ижил хэмжээтэй, ижил өндөрт. Нэгийг
//      нь олсны дараа нөгөөг зөвхөн x тэнхлэгээр хайна.
//
//   node scripts/detect-wheel-anchors.mjs [--debug]
import sharp from "sharp";
import { writeFile } from "node:fs/promises";

const DEBUG = process.argv.includes("--debug");
const WHEEL_DIR = "C:/Users/Administrator/Desktop/modelsZurag";

/* [id, машины зураг, дугуйн зураг, (заавал биш) дугуйн бэхлэгдсэн өргөн —
   машины зургийн өргөний хувиар]

   T1 ба T1 PHEV, мөн T2 ба T2 PHEV нь ИЖИЛ кузовтой тул дугуй нь ижил
   харьцаатай. T1 болон T2 PHEV дээр NCC сул гарч (өнгө/гэрэлтэлт зөрсөн)
   хамгийн жижиг масштаб руу унасан тул ах дүү загвараас нь хэмжээг
   бэхэлж, зөвхөн БАЙРЛАЛЫГ хайлгана. */
const MODELS = [
  ["x70-plus", "public/models/x70-plus/side.png", "wheel_x70plus.png"],
  ["x50", "public/models/x50/side.png", "wheel_x50.png"],
  ["t2", "public/models/t2/side.png", "wheel_T2.png"],
  ["t1-phev", "public/models/t1-phev/side.png", "wheel-t1phev.png"],
  ["g700", "public/models/g700/side.png", "wheel-g700.png"],
  ["x1", "public/models/x1/side.png", "wheel_x1.png"],
  // t1-phev-ээс: 144 / 1080 = 13.33%
  ["t1", "public/models/t1/side.png", "wheel_T1.png", 0.1333],
  // t2-ээс: 132 / 1042 = 12.67%
  ["t2-phev", "public/models/t2-phev/side.png", "wheel_T2Phev.png", 0.1267],
];

async function gray(file, size) {
  let p = sharp(file).ensureAlpha();
  if (size) p = p.resize(size.w, size.h, { fit: "fill" });
  const { data, info } = await p.raw().toBuffer({ resolveWithObject: true });
  const n = info.width * info.height;
  const g = new Float32Array(n);
  const a = new Uint8Array(n);
  for (let i = 0, k = 0; k < n; i += info.channels, k++) {
    g[k] = 0.2126 * data[i] + 0.7152 * data[i + 1] + 0.0722 * data[i + 2];
    a[k] = data[i + 3];
  }
  return { g, a, w: info.width, h: info.height };
}

/** Дугуйн зургийн ТУНГАЛАГ БУС хүрээ — жинхэнэ дугуйн хэмжээ */
async function opaqueBox(file) {
  const { a, w, h } = await gray(file);
  let top = h, bottom = -1, left = w, right = -1;
  for (let y = 0; y < h; y++)
    for (let x = 0; x < w; x++)
      if (a[y * w + x] > 170) {
        if (y < top) top = y;
        if (y > bottom) bottom = y;
        if (x < left) left = x;
        if (x > right) right = x;
      }
  return { top, bottom, left, right, w, h, bw: right - left + 1, bh: bottom - top + 1 };
}

function prepTpl(tpl) {
  const idx = [];
  for (let i = 0; i < tpl.g.length; i++) if (tpl.a[i] > 170) idx.push(i);
  let s = 0;
  for (const i of idx) s += tpl.g[i];
  const mean = s / idx.length;
  let n2 = 0;
  for (const i of idx) n2 += (tpl.g[i] - mean) ** 2;
  return { idx, mean, norm: Math.sqrt(n2) };
}

function ncc(car, tpl, idx, tMean, tNorm, ox, oy) {
  const n = idx.length;
  let sumC = 0;
  for (let k = 0; k < n; k++) {
    const tx = idx[k] % tpl.w, ty = (idx[k] / tpl.w) | 0;
    const cx = ox + tx, cy = oy + ty;
    if (cx < 0 || cy < 0 || cx >= car.w || cy >= car.h) return -1;
    sumC += car.g[cy * car.w + cx];
  }
  const mC = sumC / n;
  let num = 0, denC = 0;
  for (let k = 0; k < n; k++) {
    const tx = idx[k] % tpl.w, ty = (idx[k] / tpl.w) | 0;
    const dc = car.g[(oy + ty) * car.w + ox + tx] - mC;
    const dt = tpl.g[idx[k]] - tMean;
    num += dc * dt;
    denC += dc * dc;
  }
  const den = Math.sqrt(denC) * tNorm;
  return den < 1e-6 ? -1 : num / den;
}

const config = {};

for (const [id, carFile, wheelFile, forceWFrac] of MODELS) {
  const carMeta = await sharp(carFile).metadata();
  const wheelSrc = `${WHEEL_DIR}/${wheelFile}`;
  const wBox = await opaqueBox(wheelSrc);
  const carFull = await gray(carFile);

  /** Тухайн баганын орчмын газрын шугам (нарийн зурвасаар — хажуугийн
      гишгүүр/бампер орж ирэхээс сэргийлнэ) */
  const groundAt = (cxPx, half) => {
    const x0 = Math.max(0, Math.round(cxPx - half));
    const x1 = Math.min(carFull.w - 1, Math.round(cxPx + half));
    for (let y = carFull.h - 1; y >= 0; y--)
      for (let x = x0; x <= x1; x++) if (carFull.a[y * carFull.w + x] > 200) return y;
    return carFull.h - 1;
  };

  const SUB = 3;
  const car = await gray(carFile, {
    w: Math.round(carMeta.width / SUB),
    h: Math.round(carMeta.height / SUB),
  });

  // Масштабын жагсаалт. Бэхлэгдсэн бол ганц утга — зөвхөн байрлалыг хайна.
  const scales = [];
  if (forceWFrac) {
    scales.push((carMeta.width * forceWFrac) / wBox.w);
  } else {
    for (let s = 0.55; s <= 1.35; s += 0.025) scales.push(+s.toFixed(3));
  }

  let best = null;
  for (const scale of scales) {
    const tw = Math.round((wBox.w * scale) / SUB);
    const th = Math.round((wBox.h * scale) / SUB);
    if (tw < 8 || th < 8 || tw >= car.w || th >= car.h) continue;
    const tpl = await gray(wheelSrc, { w: tw, h: th });
    const { idx, mean, norm } = prepTpl(tpl);
    if (!idx.length || norm < 1e-6) continue;

    // Дугуйн доод ирмэг (opaque box-ынх) газартай таарах ёстой
    const botOffset = ((wBox.bottom + 1) / wBox.h) * th; // темплейт доторх дугуйн ёроол
    for (let oy = Math.floor(car.h * 0.3); oy + th <= car.h; oy++) {
      for (let ox = 0; ox + tw <= car.w; ox++) {
        const cxPx = (ox + tw / 2) * SUB;
        const wheelBottomPx = (oy + botOffset) * SUB;
        const g = groundAt(cxPx, Math.max(4, (tw * SUB) / 12));
        if (Math.abs(wheelBottomPx - g) > carMeta.height * 0.035) continue; // газарт хүрэхгүй бол хаях
        const s = ncc(car, tpl, idx, mean, norm, ox, oy);
        if (!best || s > best.s) best = { s, scale, ox, oy, tw, th };
      }
    }
  }

  if (!best) {
    console.log(`${id.padEnd(9)} ТААРАЛТ ОЛДСОНГҮЙ`);
    continue;
  }

  // Хоёр дахь дугуй: ижил масштаб, ижил өндөр — зөвхөн x-ээр
  let second = null;
  {
    const tpl = await gray(wheelSrc, { w: best.tw, h: best.th });
    const { idx, mean, norm } = prepTpl(tpl);
    for (let dy = -2; dy <= 2; dy++) {
      const oy = best.oy + dy;
      if (oy < 0 || oy + best.th > car.h) continue;
      for (let ox = 0; ox + best.tw <= car.w; ox++) {
        if (Math.abs(ox - best.ox) <= best.tw * 1.1) continue;
        const s = ncc(car, tpl, idx, mean, norm, ox, oy);
        if (!second || s > second.s) second = { s, ox, oy, tw: best.tw, th: best.th };
      }
    }
  }
  if (!second) {
    console.log(`${id.padEnd(9)} ХОЁР ДАХЬ ДУГУЙ ОЛДСОНГҮЙ`);
    continue;
  }

  /* Хувь болгож хөрвүүлнэ — байрлал нь МАШИНЫ ЗУРГИЙН хувь тул дэлгэцийн
     хэмжээ өөрчлөгдөхөд ч эвдрэхгүй (§6 responsive шаардлага). */
  const pair = [best, second].sort((a, b) => a.ox - b.ox).map((f) => ({
    cx: (f.ox + f.tw / 2) * SUB,
    cy: (f.oy + f.th / 2) * SUB,
    boxW: f.tw * SUB,
    boxH: f.th * SUB,
    s: +f.s.toFixed(3),
  }));

  config[id] = {
    wheel: `/models/${id}/wheel.png`,
    // Дугуйн ЗУРГИЙН хайрцгийн өргөн/өндөр (машины зургийн % -иар)
    wPct: +((pair[0].boxW / carMeta.width) * 100).toFixed(3),
    hPct: +((pair[0].boxH / carMeta.height) * 100).toFixed(3),
    front: {
      xPct: +((pair[0].cx / carMeta.width) * 100).toFixed(3),
      yPct: +((pair[0].cy / carMeta.height) * 100).toFixed(3),
    },
    rear: {
      xPct: +((pair[1].cx / carMeta.width) * 100).toFixed(3),
      yPct: +((pair[1].cy / carMeta.height) * 100).toFixed(3),
    },
  };

  console.log(
    `${id.padEnd(9)} NCC ${pair[0].s}/${pair[1].s}  scale ${best.scale}  ` +
      `дугуй ${Math.round(pair[0].boxW)}x${Math.round(pair[0].boxH)}px  ` +
      `#1 ${Math.round(pair[0].cx)},${Math.round(pair[0].cy)}  #2 ${Math.round(pair[1].cx)},${Math.round(pair[1].cy)}`
  );

  if (DEBUG) {
    const comps = [];
    for (const w of pair) {
      comps.push({
        input: await sharp(wheelSrc)
          .resize(Math.round(w.boxW), Math.round(w.boxH), { fit: "fill" })
          .png()
          .toBuffer(),
        left: Math.round(w.cx - w.boxW / 2),
        top: Math.round(w.cy - w.boxH / 2),
      });
    }
    await sharp(carFile).composite(comps).flatten({ background: "#ffffff" }).png()
      .toFile(`scripts/_wheel-debug-${id}.png`);
  }
}

console.log("\n" + JSON.stringify(config, null, 2));
await writeFile("scripts/_wheel-anchors.json", JSON.stringify(config, null, 2), "utf8");
