// scripts/db-export.mjs
//
// Өгөгдлийн сангийн АГУУЛГЫГ `db/content.json` файл болгон гаргана.
// Ажиллуулах:  npm run db:export
//
// ЗОРИЛГО: `db/custom.db` (хоёртын файл) нь git-д diff харагддаггүй, мөн
// хоёр хүн зэрэг өөрчилвөл нэгтгэх боломжгүй. JSON экспорт нь агуулгыг
// уншиж, дифф хийж, code review хийх боломжтой болгоно. Мөн DB уствал
// `npm run db:import`-оор бүрэн сэргээнэ.
//
// ЯМАР ХҮСНЭГТ ГАРАХГҮЙ ВЭ (зориуд):
//   · `Lead`      — үйлчлүүлэгчийн нэр/утас. Хувийн өгөгдөл git-д орох ёсгүй.
//   · `AdminUser` — bcrypt хэшийг агуулна. Нэвтрэх мэдээлэл git-д орох ёсгүй.
// Тэдгээр нь зөвхөн ажиллаж байгаа серверийн DB-д үлдэнэ.
import { PrismaClient } from "@prisma/client";
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const OUT = "db/content.json";

/** Талбарын дарааллыг тогтмол болгоно — ингэснээр git diff цэвэр байна. */
function sortKeys(obj) {
  return Object.fromEntries(Object.entries(obj).sort(([a], [b]) => a.localeCompare(b)));
}

/** `createdAt`/`updatedAt` — Prisma өөрөө удирддаг тул экспортлохгүй. */
function strip(row) {
  const { createdAt: _c, updatedAt: _u, ...rest } = row;
  return sortKeys(rest);
}

const db = new PrismaClient();

try {
  const [carModels, newsArticles, promotions] = await Promise.all([
    db.carModel.findMany({ orderBy: [{ order: "asc" }, { id: "asc" }] }),
    db.newsArticle.findMany({ orderBy: [{ dateIso: "desc" }, { id: "asc" }] }),
    db.promotion.findMany({ orderBy: [{ id: "asc" }] }),
  ]);

  const payload = {
    // Формат хувилбар — импорт нь буруу бүтэцтэй файлыг татгалзана
    version: 1,
    carModels: carModels.map(strip),
    newsArticles: newsArticles.map(strip),
    promotions: promotions.map(strip),
  };

  mkdirSync(dirname(OUT), { recursive: true });
  writeFileSync(OUT, JSON.stringify(payload, null, 2) + "\n", "utf8");

  console.log(`${OUT} бичигдэв`);
  console.log(`  carModels    ${payload.carModels.length}`);
  console.log(`  newsArticles ${payload.newsArticles.length}`);
  console.log(`  promotions   ${payload.promotions.length}`);
  console.log("  (Lead ба AdminUser зориуд гараагүй — хувийн өгөгдөл/нэвтрэх мэдээлэл)");
} finally {
  await db.$disconnect();
}
