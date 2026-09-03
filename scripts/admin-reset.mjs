/**
 * Админы нэвтрэх нэр/нууц үгийг ТАВИХ (эсвэл дахин тавих).
 *
 * ЯАГААД ЭНЭ SCRIPT ХЭРЭГТЭЙ: `AdminUser` хүснэгтэд нууц үг нь bcrypt
 * hash хэлбэрээр л хадгалагддаг (`src/lib/auth.ts` → `bcrypt.compare`).
 * Hash нь эргэлт буцалтгүй тул мартсан нууц үгийг «уншиж» болохгүй —
 * шинийг тавих нь цорын ганц зам.
 *
 * Нууц үгийг ЭНД БИЧИХГҮЙ, кодод ч хадгалахгүй: орчны хувьсагчаар авна.
 * Script нь нууц үгийг хэвлэхгүй — зөвхөн нэр ба үр дүнг хэвлэнэ.
 *
 * ХЭРЭГЛЭЭ (PowerShell, production Neon дээр):
 *
 *   # 1) Postgres-ийн client үүсгэнэ (CLAUDE.md-ийн дараалал)
 *   $env:DATABASE_URL="<neon-pooled-url>"
 *   npm run db:generate:pg
 *
 *   # 2) Нэр/нууц үгийг тавина
 *   $env:ADMIN_USERNAME="admin"
 *   $env:ADMIN_PASSWORD="<шинэ нууц үг>"
 *   node scripts/admin-reset.mjs
 *
 *   # 3) ЗААВАЛ буцааж эдгээнэ — эс тэгвээс локал SQLite эвдэрнэ
 *   Remove-Item Env:\DATABASE_URL, Env:\ADMIN_USERNAME, Env:\ADMIN_PASSWORD
 *   npm run db:generate
 *
 * Локал SQLite дээр туршихад 1-р ба 3-р шат шаардлагагүй — `.env` дэх
 * `DATABASE_URL` өөрөө хүчинтэй.
 */
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const username = process.env.ADMIN_USERNAME?.trim();
const password = process.env.ADMIN_PASSWORD;

if (!username || !password) {
  console.error(
    "ADMIN_USERNAME ба ADMIN_PASSWORD хоёуланг орчны хувьсагчаар өгнө үү.\n" +
      "Жишээ (PowerShell):\n" +
      '  $env:ADMIN_USERNAME="admin"; $env:ADMIN_PASSWORD="<шинэ нууц үг>"',
  );
  process.exit(1);
}

/* Хэт богино нууц үг нь админ панелийг бүхэлд нь эмзэг болгоно —
   тэр нь лийдийн хувийн мэдээлэл, агуулгын CRUD-д хүрдэг. */
if (password.length < 10) {
  console.error("Нууц үг дэндүү богино: 10-аас доошгүй тэмдэгт байг.");
  process.exit(1);
}

const db = new PrismaClient();

try {
  const passwordHash = await bcrypt.hash(password, 12);

  /* upsert: хэрэглэгч байвал зөвхөн hash-ыг шинэчилнэ, байхгүй бол
     шинээр үүсгэнэ. Ингэснээр «нууц үг мартсан» ба «админ огт байхгүй»
     хоёр тохиолдол нэг тушаалаар шийдэгдэнэ. */
  const before = await db.adminUser.findMany({ select: { username: true } });

  await db.adminUser.upsert({
    where: { username },
    update: { passwordHash },
    create: { username, passwordHash },
  });

  const existed = before.some((u) => u.username === username);
  console.log(
    existed
      ? `✔ «${username}» хэрэглэгчийн нууц үг шинэчлэгдлээ.`
      : `✔ «${username}» админ хэрэглэгч шинээр үүслээ.`,
  );

  if (before.length && !existed) {
    console.log(
      `\nАнхаар: өгөгдлийн санд өмнө нь ${before.length} админ байсан ` +
        `(${before.map((u) => u.username).join(", ")}). Хэрэггүйг устгана уу.`,
    );
  }

  console.log("\nОдоо /admin/login дээр тэр нэр, шинэ нууц үгээр нэвтэрнэ.");
  console.log("Нууц үг хэвлэгдээгүй — терминалын түүхэнд ч үлдэхгүй.");
} finally {
  await db.$disconnect();
}
