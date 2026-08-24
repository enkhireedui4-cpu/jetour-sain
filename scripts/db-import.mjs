// scripts/db-import.mjs
//
// `db/content.json`-оос агуулгыг өгөгдлийн санд буулгана.
// Ажиллуулах:  npm run db:import
//
// ЗАН ҮЙЛ:
//   · `upsert` — дахин ажиллуулахад аюулгүй (idempotent).
//   · Файлд БАЙХГҮЙ бичлэгийг УСТГАХГҮЙ. Тиймээс шинэ сервер дээр агуулга
//     татахад ч, локал дээр нэг загварыг сэргээхэд ч ижил ажиллана.
//     (Устгах нь буруу файлаар бүх агуулгыг арчих эрсдэлтэй.)
//   · `Lead` ба `AdminUser`-ыг ХӨНДӨХГҮЙ — экспортод ч байхгүй.
import { PrismaClient } from "@prisma/client";
import { readFileSync } from "node:fs";

const SRC = process.argv[2] ?? "db/content.json";

let payload;
try {
  payload = JSON.parse(readFileSync(SRC, "utf8"));
} catch (e) {
  console.error(`${SRC} уншиж чадсангүй: ${e.message}`);
  process.exit(1);
}

if (payload?.version !== 1) {
  console.error(`Формат таарахгүй: version=${payload?.version}, 1 хүлээж байна`);
  process.exit(1);
}

for (const key of ["carModels", "newsArticles", "promotions"]) {
  if (!Array.isArray(payload[key])) {
    console.error(`Бүтэц буруу: "${key}" массив байх ёстой`);
    process.exit(1);
  }
}

/** `detailsJson`/`specsJson` нь мөр — бүтэн JSON эсэхийг ЭХЛЭЭД батална,
    ингэснээр эвдэрсэн агуулга DB-д орохгүй. */
function assertJsonField(rows, field, label) {
  for (const r of rows) {
    if (r[field] === undefined) continue;
    try {
      JSON.parse(r[field]);
    } catch {
      throw new Error(`${label} "${r.id}" — ${field} нь бүтэн JSON биш`);
    }
  }
}

const db = new PrismaClient();

try {
  assertJsonField(payload.carModels, "detailsJson", "carModel");
  assertJsonField(payload.promotions, "specsJson", "promotion");

  let n = 0;
  for (const row of payload.carModels) {
    await db.carModel.upsert({ where: { id: row.id }, update: row, create: row });
    n++;
  }
  console.log(`carModels    ${n}`);

  n = 0;
  for (const row of payload.newsArticles) {
    await db.newsArticle.upsert({ where: { id: row.id }, update: row, create: row });
    n++;
  }
  console.log(`newsArticles ${n}`);

  n = 0;
  for (const row of payload.promotions) {
    await db.promotion.upsert({ where: { id: row.id }, update: row, create: row });
    n++;
  }
  console.log(`promotions   ${n}`);

  console.log("(Lead ба AdminUser хөндөгдөөгүй)");
} catch (e) {
  console.error(`Импорт тасалдав: ${e.message}`);
  process.exitCode = 1;
} finally {
  await db.$disconnect();
}
