// scripts/admin-hash.mjs
//
// Админы нууц үгнээс ADMIN_PASSWORD_HASH (bcrypt) үүсгэнэ.
//
// Ашиглах (нууц үг shell-ийн түүхэнд үлдэхгүйн тулд орчны хувьсагчаар):
//   PowerShell:  $env:NEW_ADMIN_PASSWORD="..."; npm run admin:hash; $env:NEW_ADMIN_PASSWORD=$null
//
// Гаралт хоёр хувилбартай:
//   · Vercel / хостингийн самбарт — хэшийг ЯГ байгаагаар нь
//   · `.env` файлд — `$` бүрийг `\$` болгосон: Next.js `.env`-ийн `$NAME`-ийг
//     хувьсагч гэж задалдаг тул escape хийхгүй бол хэш эвдэрнэ.
import bcrypt from "bcryptjs";

const password = process.env.NEW_ADMIN_PASSWORD ?? "";
if (password.length < 12) {
  console.error("NEW_ADMIN_PASSWORD орчны хувьсагчид 12+ тэмдэгттэй нууц үг өгнө үү.");
  process.exit(1);
}
const hash = bcrypt.hashSync(password, 12);
console.log("Hosting (Vercel) — ADMIN_PASSWORD_HASH:");
console.log(hash);
console.log("\n.env — ADMIN_PASSWORD_HASH:");
console.log(hash.split("$").join("\\$")); // split/join: `$`-ийг орлуулах загвар гэж тайлбарлахгүй
