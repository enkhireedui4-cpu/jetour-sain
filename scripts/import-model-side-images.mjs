// scripts/import-model-side-images.mjs
// Загвар сонгогчийн хажуу талын (side-profile) тунгалаг зургуудыг
// эх фолдероос `public/models/<id>/side.png` руу хуулна.
//
// Эх зургийг ӨӨРЧЛӨХГҮЙ — зөвхөн хуулна.
//
//   node scripts/import-model-side-images.mjs
import sharp from "sharp";
import { mkdir, copyFile } from "node:fs/promises";
import { existsSync } from "node:fs";

const SRC = "C:/Users/Administrator/Desktop/modelsZurag";
const PUB = "C:/Users/Administrator/Desktop/JetourMongolia/public";

/** эх файл → загварын id */
const MAP = {
  "model-x70plus.png": "x70-plus",
  "model-x50.png": "x50",
  "model-T1.png": "t1",
  "model-T2.png": "t2",
  "model-t1phev.png": "t1-phev",
  "model-T2Phev.png": "t2-phev",
  "model-g700.png": "g700",
  "model-x1.png": "x1",
};

for (const [file, id] of Object.entries(MAP)) {
  const from = `${SRC}/${file}`;
  if (!existsSync(from)) {
    console.warn(`  ! олдсонгүй, алгаслаа: ${file}`);
    continue;
  }
  await mkdir(`${PUB}/models/${id}`, { recursive: true });
  const to = `${PUB}/models/${id}/side.png`;
  await copyFile(from, to);
  const m = await sharp(to).metadata();
  console.log(`  ${file} -> models/${id}/side.png  ${m.width}x${m.height}`);
}

console.log("Дууслаа.");
