// scripts/x1-film.mjs
//
// X1-ийн "Гадна үзэмж"-ийн доор орох бичлэгийг `detailsJson.film`-д бичнэ.
// Ажиллуулах:  node scripts/x1-film.mjs   (дараа нь npm run db:export)
//
// Эх нь ганц өргөн (16:9, 720p) файл — утасны босоо хувилбар байхгүй тул
// `srcMobile` өгөөгүй (утсанд 16:9 зурвасаар гарна). Тайлбар бичвэр нь кадрын
// доод талд тул `focus: "bottom"`.
import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

try {
  const row = await db.carModel.findUnique({ where: { id: "x1" } });
  if (!row) throw new Error("x1 загвар олдсонгүй");

  const details = JSON.parse(row.detailsJson || "{}");
  details.film = {
    src: "/models/x1/video/film.mp4",
    poster: "/models/x1/video/film-poster.webp",
    focus: "bottom",
    label: "JETOUR X1 — танилцуулга бичлэг",
  };

  await db.carModel.update({
    where: { id: "x1" },
    data: { detailsJson: JSON.stringify(details) },
  });
  console.log("x1 film:", details.film);
} finally {
  await db.$disconnect();
}
