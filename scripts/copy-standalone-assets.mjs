import { cpSync, existsSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const standaloneDir = join(root, ".next", "standalone");
const standaloneNextDir = join(standaloneDir, ".next");

/* Standalone гаралт байхгүй бол ЭНЭ СКРИПТ ХЭРЭГГҮЙ — алдаа биш.
   Vercel дээр `next.config.ts` нь `output: "standalone"`-ыг унтраадаг (Vercel
   өөрөө serverless функц болгон багцалдаг) тул `.next/standalone` үүсэхгүй.
   Өмнө нь энд throw хийдэг байсан нь Vercel-ийн build-ыг уначихдаг байв. */
if (!existsSync(standaloneDir)) {
  console.log("Standalone гаралт байхгүй — асет хуулах шаардлагагүй, өнгөрөв.");
  process.exit(0);
}

mkdirSync(standaloneNextDir, { recursive: true });
cpSync(join(root, ".next", "static"), join(standaloneNextDir, "static"), { recursive: true });
cpSync(join(root, "public"), join(standaloneDir, "public"), { recursive: true });

/* SQLite файл — standalone багцад ЗААВАЛ дагах ёстой.
   Үүнгүйгээр сервер хоосон өгөгдлийн сантай асч, загвар/үнэ/мэдээ бүгд алга
   болно. `DATABASE_URL=file:../db/custom.db` нь server.js-ээс харьцангуй тул
   багцын үүрэнд `db/` фолдер байрлана.

   ⚠️ Сервер дээр аль хэдийн ажиллаж буй сан байвал ДАРАХГҮЙ: админаар оруулсан
   өөрчлөлт, хуримтлагдсан лид устахаас сэргийлнэ. Анхны байрлуулалтад л хуулна. */
const dbSrc = join(root, "db", "custom.db");
const dbDest = join(standaloneDir, "db", "custom.db");
if (existsSync(dbSrc)) {
  if (existsSync(dbDest)) {
    console.log("Standalone: db/custom.db аль хэдийн бий — дарахгүй орхив.");
  } else {
    mkdirSync(dirname(dbDest), { recursive: true });
    cpSync(dbSrc, dbDest);
    console.log("Standalone: db/custom.db хуулав.");
  }
} else {
  console.warn("⚠ db/custom.db олдсонгүй — сервер хоосон сантай асна.");
}

console.log("Standalone assets copied.");
