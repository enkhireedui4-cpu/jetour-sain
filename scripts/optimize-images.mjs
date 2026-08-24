// scripts/optimize-images.mjs
// P3-1 — Production source-image optimization (Sharp).
//
// Зорилго: public/ доторх хэт том эх зургуудыг (masters) харагдацын дээд
// хэмжээнд (1920px) багтаан, чанар алдалгүй дахин кодлож, deploy болон
// next/image-ийн ажиллах үеийн ачааллыг бууруулах.
//
// Аюулгүй байдлын зарчмууд:
//  1) Эх файлыг ЭХЛЭЭД .image-originals/ рүү (git-ignored) хувилж нөөцлөнө.
//     Нөөц аль хэдийн байвал дахин бичихгүй (pristine хадгална → re-run аюулгүй).
//  2) Файлын нэр/өргөтгөлийг ӨӨРЧЛӨХГҮЙ → код доторх зам хэвээр (zero ref change).
//  3) Зөвхөн шинэ файл нь эхнийхээс БАГА байвал л бичнэ ("write only if smaller")
//     → аль хэдийн оновчтой webp, тунгалаг логоны чанар мууддаггүй.
//  4) Харьцаа (aspect ratio) хадгална (fit: inside, withoutEnlargement).
//
// Ашиглалт:
//   node scripts/optimize-images.mjs --dry   # зөвхөн тайлан, юу ч бичихгүй
//   node scripts/optimize-images.mjs         # нөөцлөөд байрлалд нь оновчилно

import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const PUBLIC_DIR = path.join(ROOT, "public");
const BACKUP_DIR = path.join(ROOT, ".image-originals");

const DRY = process.argv.includes("--dry");

// Харагдацын дээд урт тал. deviceSizes-ийн дээд утга 1920 тул үүнээс их нь илүүц.
const MAX_EDGE = 1920;
// Энэ хэмжээнээс доош, багтаамжтай файлыг дахин кодлохгүй (чанар алдахаас сэргийлнэ).
const MIN_BYTES_TO_TOUCH = 300 * 1024; // 300KB
const EXTS = new Set([".jpg", ".jpeg", ".png", ".webp"]);

async function* walk(dir) {
  for (const entry of await fs.readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(full);
    else yield full;
  }
}

function fmt(bytes) {
  if (bytes >= 1048576) return (bytes / 1048576).toFixed(2) + " MB";
  return (bytes / 1024).toFixed(1) + " KB";
}

async function encode(inputBuf, ext, resize) {
  let pipe = sharp(inputBuf).rotate(); // EXIF чиглэлийг хэвийн болгоно
  if (resize) pipe = pipe.resize({ width: MAX_EDGE, height: MAX_EDGE, fit: "inside", withoutEnlargement: true });
  if (ext === ".jpg" || ext === ".jpeg") return pipe.jpeg({ quality: 82, mozjpeg: true }).toBuffer();
  if (ext === ".png") return pipe.png({ compressionLevel: 9, effort: 8 }).toBuffer(); // palette ашиглахгүй → банд үүсгэхгүй
  if (ext === ".webp") return pipe.webp({ quality: 80 }).toBuffer();
  return null;
}

async function main() {
  const files = [];
  for await (const f of walk(PUBLIC_DIR)) {
    if (EXTS.has(path.extname(f).toLowerCase())) files.push(f);
  }
  files.sort();

  let totalBefore = 0, totalAfter = 0, changed = 0, skipped = 0, backedUp = 0;
  const rows = [];

  for (const file of files) {
    const ext = path.extname(file).toLowerCase();
    const stat = await fs.stat(file);
    const before = stat.size;
    totalBefore += before;

    let meta;
    try {
      meta = await sharp(file).metadata();
    } catch {
      totalAfter += before; skipped++; continue;
    }

    const longest = Math.max(meta.width ?? 0, meta.height ?? 0);
    const needResize = longest > MAX_EDGE;
    const worthRecompress = before > MIN_BYTES_TO_TOUCH;

    if (!needResize && !worthRecompress) {
      totalAfter += before; skipped++; continue;
    }

    let out;
    try {
      out = await encode(await fs.readFile(file), ext, needResize);
    } catch {
      totalAfter += before; skipped++; continue;
    }

    // Зөвхөн бодитоор бага бол л солино (2%-иас дээш хэмнэлт).
    if (!out || out.length >= before * 0.98) {
      totalAfter += before; skipped++; continue;
    }

    totalAfter += out.length;
    changed++;
    const rel = path.relative(ROOT, file);
    rows.push({ rel, before, after: out.length, dim: `${meta.width}x${meta.height}`, resized: needResize });

    if (!DRY) {
      // 1) Нөөц (pristine хадгална)
      const backupPath = path.join(BACKUP_DIR, path.relative(ROOT, file));
      try {
        await fs.access(backupPath);
      } catch {
        await fs.mkdir(path.dirname(backupPath), { recursive: true });
        await fs.copyFile(file, backupPath);
        backedUp++;
      }
      // 2) Байрлалд нь бичих
      await fs.writeFile(file, out);
    }
  }

  rows.sort((a, b) => (b.before - b.after) - (a.before - a.after));
  console.log(`\n${DRY ? "[DRY RUN] " : ""}Optimizable files: ${changed}  |  Skipped (already fine): ${skipped}\n`);
  console.log("Top 25 savings:");
  for (const r of rows.slice(0, 25)) {
    console.log(
      `  ${fmt(r.before).padStart(9)} -> ${fmt(r.after).padStart(9)}  (${(100 - (r.after / r.before) * 100).toFixed(0)}% ${r.resized ? "R" : " "})  ${r.rel} [${r.dim}]`
    );
  }
  console.log(`\nTOTAL public/ images: ${fmt(totalBefore)} -> ${fmt(totalAfter)}  (saved ${fmt(totalBefore - totalAfter)}, ${(100 - (totalAfter / totalBefore) * 100).toFixed(1)}%)`);
  if (!DRY) console.log(`Backed up ${backedUp} originals to ${path.relative(ROOT, BACKUP_DIR)}/  (R = resized to ${MAX_EDGE}px)`);
  else console.log(`(R = would resize to ${MAX_EDGE}px longest edge)`);
}

main().catch((e) => { console.error(e); process.exit(1); });
