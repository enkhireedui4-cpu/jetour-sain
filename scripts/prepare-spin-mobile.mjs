import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = process.cwd();
const verify = process.argv.includes("--verify");
const content = JSON.parse(await fs.readFile(path.join(root, "db/content.json"), "utf8"));
let count = 0, originalBytes = 0, mobileBytes = 0;
for (const model of content.carModels) {
  const details = JSON.parse(model.detailsJson || "{}");
  for (const color of details.spin360?.colors ?? []) {
    for (const src of color.frames) {
      if (!/^\/models\/(t2|t1-phev)\/spin\//.test(src)) throw new Error(`Unsupported spin source: ${src}`);
      const dest = src.replace("/spin/", "/spin/mobile-v1/");
      const input = path.join(root, "public", src);
      const output = path.join(root, "public", dest);
      if (!verify) {
        await fs.mkdir(path.dirname(output), { recursive: true });
        await sharp(input).resize({ width: 640, withoutEnlargement: true }).webp({ quality: 78, alphaQuality: 85, effort: 5 }).toFile(output);
      }
      const metadata = await sharp(output).metadata();
      if (metadata.width !== 640 || metadata.format !== "webp" || !metadata.hasAlpha) throw new Error(`Invalid mobile frame: ${dest}`);
      originalBytes += (await fs.stat(input)).size;
      mobileBytes += (await fs.stat(output)).size;
      count++;
    }
  }
}
console.log(JSON.stringify({ mode: verify ? "verify" : "generate", count, originalBytes, mobileBytes, reductionPercent: Math.round((1 - mobileBytes / originalBytes) * 100) }));
