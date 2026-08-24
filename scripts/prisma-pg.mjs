// Prisma PostgreSQL schema generator.
//
// Prisma-гийн datasource.provider нь тогтмол литерал байх ёстой (env() уншиж чадахгүй).
// Тиймээс нэг schema-г SQLite ба PostgreSQL хоёуланд ашиглах боломжгүй.
// Энэ скрипт нь ЦОРЫН ГАНЦ эх сурвалж болох prisma/schema.prisma-аас (SQLite, локал)
// зөвхөн datasource блокийг нь PostgreSQL болгож сольж, prisma/schema.postgres.prisma
// файлыг автоматаар үүсгэнэ. Модель хэзээ ч гараар давхардуулахгүй тул drift үүсэхгүй.
//
// Ашиглах:  npm run db:generate:pg   (эсвэл db:push:pg / build:pg)
import { readFileSync, writeFileSync } from "node:fs";

const SRC = "prisma/schema.prisma";
const OUT = "prisma/schema.postgres.prisma";

// directUrl-ийг ЗӨВХӨН DIRECT_URL тодорхойлогдсон үед оруулна (pooled холболт,
// жишээ нь PgBouncer/serverless). Ингэснээр pooling шаардлагагүй, шууд холбогдох
// Postgres (self-hosted г.м) дээр DIRECT_URL заавал бөглөх шаардлагагүй — provider-agnostic.
const usePooling = Boolean(process.env.DIRECT_URL);

const PG_DATASOURCE = usePooling
  ? `datasource db {
  provider  = "postgresql"
  url       = env("DATABASE_URL")
  directUrl = env("DIRECT_URL")
}`
  : `datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}`;

const src = readFileSync(SRC, "utf8");
const out = src.replace(/datasource\s+db\s*\{[\s\S]*?\n\}/, PG_DATASOURCE);

if (!out.includes('"postgresql"')) {
  console.error("✗ datasource блок олдсонгүй. prisma/schema.prisma-г шалгана уу.");
  process.exit(1);
}

const banner =
  "// !!! ГАР АЖЛААР ЗАСАХГҮЙ — prisma/schema.prisma-аас автоматаар үүсгэсэн.\n" +
  "// Дахин үүсгэх: npm run db:generate:pg\n\n";

writeFileSync(OUT, banner + out, "utf8");
console.log(
  `✓ prisma/schema.postgres.prisma үүсгэлээ (PostgreSQL${usePooling ? " + directUrl pooling" : ""}).`
);
