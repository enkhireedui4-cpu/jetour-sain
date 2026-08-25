// Зургийн ашиглалтын аудит: public/ дахь файл бүр DB эсвэл кодод
// ашиглагдаж байгаа эсэхийг шалгана.
import { PrismaClient } from "@prisma/client";
import { readdirSync, statSync, readFileSync } from "node:fs";
import { join, relative, sep } from "node:path";

const ROOT = process.cwd();
const PUB = join(ROOT, "public");
const db = new PrismaClient();

// 1) Бүх лавлагааг цуглуулна: DB + src/
const refs = new Set();
const addRefs = (text) => {
  for (const m of String(text).matchAll(/\/[\w./@-]+\.(?:png|jpe?g|webp|avif|svg)/gi))
    refs.add(m[0].toLowerCase());
};

for (const t of ["carModel", "newsArticle", "promotion"]) {
  const rows = await db[t].findMany().catch(() => []);
  for (const r of rows) addRefs(JSON.stringify(r));
}

const walkSrc = (d) => {
  for (const e of readdirSync(d, { withFileTypes: true })) {
    const p = join(d, e.name);
    if (e.isDirectory()) walkSrc(p);
    else if (/\.(tsx?|css|mjs|json)$/.test(e.name)) addRefs(readFileSync(p, "utf8"));
  }
};
walkSrc(join(ROOT, "src"));

// 2) public/ дахь бүх зургийг тоолно
const files = [];
const walkPub = (d) => {
  for (const e of readdirSync(d, { withFileTypes: true })) {
    const p = join(d, e.name);
    if (e.isDirectory()) walkPub(p);
    else if (/\.(png|jpe?g|webp|avif)$/i.test(e.name))
      files.push({ p, size: statSync(p).size, url: "/" + relative(PUB, p).split(sep).join("/") });
  }
};
walkPub(PUB);

const used = [], unused = [];
for (const f of files) (refs.has(f.url.toLowerCase()) ? used : unused).push(f);

const mb = (b) => (b / 1048576).toFixed(1);
const kb = (b) => Math.round(b / 1024);
console.log(`НИЙТ      ${files.length} файл  ${mb(files.reduce((a, f) => a + f.size, 0))} MB`);
console.log(`АШИГЛАСАН ${used.length} файл  ${mb(used.reduce((a, f) => a + f.size, 0))} MB`);
console.log(`АШИГЛААГҮЙ ${unused.length} файл  ${mb(unused.reduce((a, f) => a + f.size, 0))} MB`);

console.log(`\n— Хамгийн хүнд АШИГЛАСАН 12 —`);
for (const f of used.sort((a, b) => b.size - a.size).slice(0, 12))
  console.log(`  ${String(kb(f.size)).padStart(6)} KB  ${f.url}`);

console.log(`\n— Хамгийн хүнд АШИГЛААГҮЙ 12 —`);
for (const f of unused.sort((a, b) => b.size - a.size).slice(0, 12))
  console.log(`  ${String(kb(f.size)).padStart(6)} KB  ${f.url}`);

await db.$disconnect();
