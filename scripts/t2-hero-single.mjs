// scripts/t2-hero-single.mjs
//
// T2-ын загварын хуудасны hero: гурван слайдыг НЭГ зургаар солино.
// Ажиллуулах:  node scripts/t2-hero-single.mjs "<эх зураг>"   (дараа нь npm run db:export)
//
// Эх нь 13578×5655 CMYK JPEG (50 MB) — вэбд sRGB WebP болгон буулгана.
//  · Десктоп: кадр бүтнээрээ, 2880px өргөн.
//  · Утас (750×969, `heroMobileAspect`-тэй таарна): машиныг бүтнээр нь багтаах
//    хэсгийг дээд талд тавьж, доод талыг газрын өнгөөр бараан руу уусгана —
//    өмнөх утасны hero-нуудтай ижил зохиомж.
// T2 PHEV нь хуучин `1..3` файлуудыг ашигласаар байгаа тул тэдгээрийг устгахгүй.
import sharp from "sharp";
import { PrismaClient } from "@prisma/client";

const SRC = process.argv[2];
if (!SRC) throw new Error("Эх зургийн замыг өг");
const DIR = "public/models-hero/t2";
const WIDE = `${DIR}/hero-v2.webp`;
const TALL = `${DIR}/hero-v2-mobile.webp`;

const base = () => sharp(SRC, { limitInputPixels: false }).toColourspace("srgb");
const { width: W, height: H } = await sharp(SRC, { limitInputPixels: false }).metadata();

await base().resize({ width: 2880 }).webp({ quality: 82 }).toFile(WIDE);

// Машин кадрын 24–68%-д байрлана → 21.5–70.5% (зах зайтай) хэсгийг авна.
const TW = 750;
const TH = 969;
const cropW = Math.round(W * 0.49);
const photo = await base()
  .extract({ left: Math.round(W * 0.215), top: 0, width: cropW, height: H })
  .resize({ width: TW })
  .toBuffer();
const photoH = Math.round((H / cropW) * TW);

// Доод хэсэг: дугуйн доорх цэвэр газрын зурвасыг (GROUND px) толин тусгалаар
// ээлжлэн давтана — ирмэг бүр дээр пиксел нь таардаг тул залгаас гарахгүй,
// машин өөрөө огт бараарахгүй. Давталтыг дээрээс нь бараан уусалт нууна.
const GROUND = 44;
const strip = sharp(photo).extract({ left: 0, top: photoH - GROUND, width: TW, height: GROUND });
const tiles = [await strip.clone().flip().toBuffer(), await strip.clone().toBuffer()];
const ground = [];
for (let y = photoH, i = 0; y < TH; y += GROUND, i++) {
  ground.push({ input: tiles[i % 2], left: 0, top: y });
}

const fade = Buffer.from(
  `<svg width="${TW}" height="${TH}" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
    <stop offset="${(photoH - 24) / TH}" stop-color="#101012" stop-opacity="0"/>
    <stop offset="${(photoH + 70) / TH}" stop-color="#101012" stop-opacity="0.62"/>
    <stop offset="${(photoH + 190) / TH}" stop-color="#101012" stop-opacity="0.95"/>
    <stop offset="1" stop-color="#101012" stop-opacity="1"/>
  </linearGradient></defs><rect width="100%" height="100%" fill="url(#g)"/></svg>`
);

// Сүүлчийн хавтан доод ирмэгээс цухуйж болохгүй (sharp алдаа өгнө) — өндөр
// канвас дээр угсраад дараа нь яг хэмжээнд нь тайрна.
const canvasH = photoH + ground.length * GROUND;
const stacked = await sharp({
  create: { width: TW, height: canvasH, channels: 3, background: "#101012" },
})
  .composite([{ input: photo, left: 0, top: 0 }, ...ground])
  .png()
  .toBuffer();

await sharp(stacked)
  .extract({ left: 0, top: 0, width: TW, height: TH })
  .composite([{ input: fade, left: 0, top: 0 }])
  .webp({ quality: 84 })
  .toFile(TALL);

const db = new PrismaClient();
try {
  const row = await db.carModel.findUnique({ where: { id: "t2" } });
  if (!row) throw new Error("t2 загвар олдсонгүй");
  const details = JSON.parse(row.detailsJson || "{}");
  details.heroSlides = [`/${WIDE.replace("public/", "")}`];
  details.heroSlidesMobile = [`/${TALL.replace("public/", "")}`];
  // Утсан дээр зургийн дээрх нэр/уриа үгийг хасна — зураг цэвэр харагдана.
  details.heroMobileText = false;
  await db.carModel.update({ where: { id: "t2" }, data: { detailsJson: JSON.stringify(details) } });
  console.log("t2 hero:", details.heroSlides, details.heroSlidesMobile, "| photoH", photoH);
} finally {
  await db.$disconnect();
}
