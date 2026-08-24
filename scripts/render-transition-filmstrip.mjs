// scripts/render-transition-filmstrip.mjs
// Загвар сонгогчийн шилжилтийг КАДР ТУС БҮРЭЭР зурж, нэг зураг болгоно.
//
// Дүр эсгэсэн зураг БИШ: `models.tsx` / `globals.css` / `wheel-anchors.ts`-д
// яг бичигдсэн параметрүүдээр (зай, хугацаа, easing, дугуйн байрлал/эргэлт)
// тооцоолж, бодит PNG-үүдийг тэр байрлалд нь тавина.
//
//   node scripts/render-transition-filmstrip.mjs
import sharp from "sharp";

// --- Кодтой ижил параметрүүд ---
const VIEWPORT = 1512;
const CAR_W = 949; // --car-w @ 1512x900
const CAR_AR = 2.55; // --car-ar
const DURATION = 1000; // DURATION
const EXIT = Math.ceil(VIEWPORT / 2 + CAR_W / 2) + 24; // exitDistance()
const STAGE_H = Math.round(CAR_W / CAR_AR);
const DIR = 1; // +1 = БАРУУН сум

// wheel-anchors.ts-ийн утгууд
const ANCH = {
  "x70-plus": {
    car: "public/models/x70-plus/side.png",
    wheel: "public/models/x70-plus/wheel.png",
    ar: 1042 / 327,
    wPct: 12.668, hPct: 41.284,
    front: { xPct: 25.624, yPct: 71.101 },
    rear: { xPct: 71.689, yPct: 72.018 },
  },
  x50: {
    car: "public/models/x50/side.png",
    wheel: "public/models/x50/wheel.png",
    ar: 1042 / 345,
    wPct: 13.532, hPct: 40,
    front: { xPct: 26.344, yPct: 72.174 },
    rear: { xPct: 75, yPct: 72.174 },
  },
};

const bez = (p1x, p1y, p2x, p2y) => {
  const cx = 3 * p1x, bx = 3 * (p2x - p1x) - cx, ax = 1 - cx - bx;
  const cy = 3 * p1y, by = 3 * (p2y - p1y) - cy, ay = 1 - cy - by;
  const sx = (t) => ((ax * t + bx) * t + cx) * t;
  const sy = (t) => ((ay * t + by) * t + cy) * t;
  const dx = (t) => (3 * ax * t + 2 * bx) * t + cx;
  return (x) => {
    let t = x;
    for (let i = 0; i < 8; i++) {
      const e = sx(t) - x;
      if (Math.abs(e) < 1e-6) break;
      const d = dx(t);
      if (Math.abs(d) < 1e-6) break;
      t -= e / d;
    }
    return sy(Math.max(0, Math.min(1, t)));
  };
};
const ease = bez(0.22, 1, 0.36, 1);

/** Нэг машиныг (кузов + эргэсэн дугуй) тайзан дээр байрлуулна */
async function carLayers(a, centerX, spinDeg) {
  const boxW = CAR_W;
  const boxH = Math.round(boxW / a.ar);
  const boxL = Math.round(centerX - boxW / 2);
  const boxT = STAGE_H - boxH; // доогуураа тэгшилнэ

  const layers = [
    {
      input: await sharp(a.car).resize(boxW, boxH, { fit: "fill" }).png().toBuffer(),
      left: boxL,
      top: boxT,
    },
  ];

  const wPx = Math.round((a.wPct / 100) * boxW);
  const hPx = Math.round((a.hPct / 100) * boxH);
  for (const p of ["front", "rear"]) {
    const cx = boxL + (a[p].xPct / 100) * boxW;
    const cy = boxT + (a[p].yPct / 100) * boxH;
    // Эргүүлсний дараа зураг томордог тул ТӨВӨӨР нь буцааж байрлуулна
    const rot = await sharp(a.wheel)
      .resize(wPx, hPx, { fit: "fill" })
      .rotate(spinDeg, { background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png()
      .toBuffer();
    const rm = await sharp(rot).metadata();
    layers.push({
      input: rot,
      left: Math.round(cx - rm.width / 2),
      top: Math.round(cy - rm.height / 2),
    });
  }
  return layers;
}

/** Тайзны гадна бүрэн гарсан давхаргыг хаяна (overflow: hidden) */
const visible = (l, w) => l.left + w > 0 && l.left < VIEWPORT;

const FRAMES = [0, 120, 250, 420, 650, 1000];
const rows = [];

for (const t of FRAMES) {
  const p = ease(Math.min(1, t / DURATION));
  const outX = VIEWPORT / 2 + p * (-DIR * EXIT);
  const inX = VIEWPORT / 2 + DIR * EXIT * (1 - p);

  // Дугуйн эргэлт: явсан зам / тойрог × 360, зүүн тийш → сөрөг (CSS)
  const spinOf = (a) => {
    const wPx = (a.wPct / 100) * CAR_W;
    // wheelSpinDeg()-тэй ижил: бүтэн эргэлт рүү бөөрөнхийлнө
    const turns = Math.max(1, Math.round(EXIT / (Math.PI * wPx)));
    return -DIR * p * turns * 360;
  };

  const layers = [
    ...(await carLayers(ANCH["x70-plus"], outX, spinOf(ANCH["x70-plus"]))),
    ...(await carLayers(ANCH.x50, inX, spinOf(ANCH.x50))),
  ].filter((l) => l.left > -3000 && l.left < VIEWPORT + 3000);

  const label =
    `${String(t).padStart(4)}ms   X70 Plus x=${String(Math.round(outX - VIEWPORT / 2)).padStart(5)}px ` +
    `дугуй ${Math.round(spinOf(ANCH["x70-plus"]))}°   ` +
    `X50 x=${String(Math.round(inX - VIEWPORT / 2)).padStart(5)}px дугуй ${Math.round(spinOf(ANCH.x50))}°`;

  const frame = await sharp({
    create: { width: VIEWPORT, height: STAGE_H, channels: 4, background: "#ffffff" },
  })
    .composite([
      ...layers,
      {
        input: Buffer.from(
          `<svg width="${VIEWPORT}" height="${STAGE_H}">
             <rect x="0" y="0" width="${VIEWPORT}" height="30" fill="#17181B"/>
             <text x="14" y="21" font-family="monospace" font-size="14" fill="#ffffff">${label}</text>
             <line x1="${VIEWPORT / 2}" y1="30" x2="${VIEWPORT / 2}" y2="${STAGE_H}"
                   stroke="#E20A17" stroke-width="1" stroke-dasharray="5 6"/>
           </svg>`
        ),
        left: 0,
        top: 0,
      },
    ])
    .png()
    .toBuffer();
  rows.push(frame);
  console.log(label);
}

const GAP = 6;
await sharp({
  create: {
    width: VIEWPORT,
    height: rows.length * STAGE_H + (rows.length - 1) * GAP,
    channels: 4,
    background: "#C5C8CC",
  },
})
  .composite(rows.map((input, i) => ({ input, left: 0, top: i * (STAGE_H + GAP) })))
  .png()
  .toFile("scripts/_transition-filmstrip.png");

console.log(`\nБэлэн: scripts/_transition-filmstrip.png`);
console.log(`Тайз ${VIEWPORT}px, машин ${CAR_W}px, гарах зай ${EXIT}px, ${DURATION}ms`);
void visible;
