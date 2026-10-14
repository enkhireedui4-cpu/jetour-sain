// scripts/neon-sync-films.mjs
//
// `db/content.json`-оос ЗӨВХӨН бичлэгийн талбаруудыг (`detailsJson.film`,
// `detailsJson.video`) DB руу хуулна. Бусад талбарт хүрэхгүй — admin-ы
// засварыг дарж арчдаг `db:import`-оос ялгаатай.
//
// Ажиллуулах (Neon):
//   $env:DATABASE_URL="<neon-pooled-url>"; npm run db:generate:pg
//   node scripts/neon-sync-films.mjs            # зөвхөн харуулна (dry-run)
//   node scripts/neon-sync-films.mjs --apply    # бичнэ
//   Remove-Item Env:\DATABASE_URL; npm run db:generate   # ЗААВАЛ буцааж эдгээ
import { readFileSync } from "node:fs";
import { PrismaClient } from "@prisma/client";

const KEYS = ["film", "video"];
const apply = process.argv.includes("--apply");
const content = JSON.parse(readFileSync(new URL("../db/content.json", import.meta.url), "utf8"));
const db = new PrismaClient();

try {
  for (const model of content.carModels) {
    const wanted = JSON.parse(model.detailsJson || "{}");
    if (!KEYS.some((k) => wanted[k])) continue;

    const row = await db.carModel.findUnique({ where: { id: model.id } });
    if (!row) {
      console.log(`${model.id}: DB-д алга — алгаслаа`);
      continue;
    }

    const details = JSON.parse(row.detailsJson || "{}");
    const changed = KEYS.filter((k) => wanted[k] && JSON.stringify(details[k]) !== JSON.stringify(wanted[k]));
    if (!changed.length) {
      console.log(`${model.id}: өөрчлөлтгүй`);
      continue;
    }
    for (const k of changed) {
      console.log(`${model.id}.${k}:`, details[k] ?? "(байхгүй)", "->", wanted[k]);
      details[k] = wanted[k];
    }
    if (apply) {
      await db.carModel.update({ where: { id: model.id }, data: { detailsJson: JSON.stringify(details) } });
      console.log(`${model.id}: бичлээ`);
    }
  }
  if (!apply) console.log("\nDry-run. Бичихийн тулд --apply нэм.");
} finally {
  await db.$disconnect();
}
