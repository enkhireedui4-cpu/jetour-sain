// scripts/db-verify.mjs
//
// Одоогийн `DATABASE_URL` заасан өгөгдлийн санг `db/content.json`-той
// харьцуулж, ЮУ ДУТСАНЫГ мөр мөрөөр хэлнэ. Юу ч ӨӨРЧЛӨХГҮЙ — зөвхөн уншина.
//
// Ажиллуулах (Neon-ий эсрэг):
//   1) .env-д DATABASE_URL="postgresql://…neon.tech/…?sslmode=require"
//   2) npm run db:generate:pg
//   3) node scripts/db-verify.mjs
//
// Локал SQLite-ыг шалгах бол: node scripts/db-verify.mjs (env хэвээр)
import { PrismaClient } from "@prisma/client";
import { readFileSync } from "node:fs";

const SRC = process.argv[2] ?? "db/content.json";
const db = new PrismaClient();

const payload = JSON.parse(readFileSync(SRC, "utf8"));
const TABLES = [
  ["carModel", "carModels", "Загвар"],
  ["newsArticle", "newsArticles", "Мэдээ"],
  ["promotion", "promotions", "Санал"],
];

const url = process.env.DATABASE_URL ?? "";
const kind = url.startsWith("file:")
  ? "SQLite (локал)"
  : /neon\.tech/i.test(url)
    ? "Neon Postgres"
    : url.startsWith("postgres")
      ? "Postgres"
      : "тодорхойгүй";
console.log(`Шалгаж байна: ${kind}\n`);

let missingTotal = 0;
let staleTotal = 0;

for (const [model, key, label] of TABLES) {
  const expected = payload[key] ?? [];
  let rows;
  try {
    rows = await db[model].findMany();
  } catch (e) {
    const msg = String(e.message).replace(/\s+/g, " ").trim();
    console.log(`${label}: ⚠ уншиж чадсангүй`);
    if (/must start with the protocol `postgresql/.test(msg)) {
      console.log(`   Prisma client нь POSTGRES режимд, харин DATABASE_URL нь SQLite.`);
      console.log(`   → Локал ажиллах бол:  npm run db:generate`);
    } else if (/must start with the protocol `file:/.test(msg)) {
      console.log(`   Prisma client нь SQLITE режимд, харин DATABASE_URL нь Postgres.`);
      console.log(`   → Neon шалгах бол:  npm run db:generate:pg  (дараа нь дахин ажиллуул)`);
      console.log(`   → Дуусаад БУЦААЖ эдгээ:  npm run db:generate`);
    } else if (/does not exist|relation .* does not exist|P1001|P1017/.test(msg)) {
      console.log(`   Схем/холболт бэлэн биш.`);
      console.log(`   → npm run db:push:pg`);
    } else {
      console.log(`   ${msg.slice(0, 200)}`);
    }
    console.log("");
    missingTotal += expected.length;
    continue;
  }

  const byId = new Map(rows.map((r) => [r.id, r]));
  const missing = expected.filter((e) => !byId.has(e.id));
  // detailsJson нь агуулгын гол хэсэг — зөрвөл хуучирсан гэж үзнэ
  const stale = expected.filter((e) => {
    const live = byId.get(e.id);
    if (!live) return false;
    return (
      (e.detailsJson ?? "") !== (live.detailsJson ?? "") ||
      (e.specsJson ?? "") !== (live.specsJson ?? "")
    );
  });

  missingTotal += missing.length;
  staleTotal += stale.length;

  const mark = missing.length === 0 && stale.length === 0 ? "✓" : "⚠";
  console.log(
    `${mark} ${label.padEnd(8)} DB ${String(rows.length).padStart(3)} / файлд ${String(expected.length).padStart(3)}`
  );
  if (missing.length) console.log(`     ДУТУУ:      ${missing.map((m) => m.id).join(", ")}`);
  if (stale.length) console.log(`     ХУУЧИРСАН:  ${stale.map((m) => m.id).join(", ")}`);
}

console.log("");
if (missingTotal === 0 && staleTotal === 0) {
  console.log("Агуулга бүрэн — импорт хийх шаардлагагүй.");
} else {
  console.log(`Дутуу ${missingTotal}, хуучирсан ${staleTotal} бичлэг.`);
  console.log("Засах:  npm run db:import      (upsert — аюулгүй, дахин ажиллуулж болно)");
  console.log("Дараа нь Vercel дээр Redeploy — статик хуудсууд дахин бэлтгэгдэнэ.");
}

await db.$disconnect();
