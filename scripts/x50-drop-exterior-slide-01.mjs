// scripts/x50-drop-exterior-slide-01.mjs
// X50-ийн "Гадна үзэмж" хэсгээс 01 слайдыг (x50-1.jpg) хасна.
// Зургийн файлыг устгахгүй — зөвхөн өгөгдлөөс хасна. Idempotent.
//   node scripts/x50-drop-exterior-slide-01.mjs
import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();
const DROP = "/models-ext/x50-1.jpg";

const row = await db.carModel.findUnique({ where: { id: "x50" } });
if (!row) throw new Error("x50 загвар өгөгдлийн санд байхгүй.");

const d = JSON.parse(row.detailsJson ?? "{}");

const before = {
  showcase: d.showcase?.exterior?.length ?? 0,
  override: d.exteriorImagesOverride?.length ?? 0,
  gallery: d.gallery?.length ?? 0,
  exteriorImages: d.exteriorImages?.length ?? 0,
};

if (d.showcase?.exterior) {
  d.showcase.exterior = d.showcase.exterior.filter((s) => s.image !== DROP);
}
if (d.exteriorImagesOverride) {
  d.exteriorImagesOverride = d.exteriorImagesOverride.filter((s) => s !== DROP);
}

await db.carModel.update({
  where: { id: "x50" },
  data: { detailsJson: JSON.stringify(d) },
});

console.log("[x50] Гадна үзэмж — 01 слайд хасагдлаа.");
console.log(
  `  showcase.exterior: ${before.showcase} -> ${d.showcase?.exterior?.length ?? 0}`,
  `\n  exteriorImagesOverride: ${before.override} -> ${d.exteriorImagesOverride?.length ?? 0}`,
  `\n  үлдсэн:`,
  (d.showcase?.exterior ?? []).map((s) => s.image).join(", ")
);

await db.$disconnect();
