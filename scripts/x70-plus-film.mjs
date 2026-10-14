// scripts/x70-plus-film.mjs
//
// X70 Plus-ын "Гадна үзэмж"-ийн доор орох бичлэгийг `detailsJson.film`-д бичнэ.
// Ажиллуулах:  node scripts/x70-plus-film.mjs   (дараа нь npm run db:export)
//
// Файлууд: public/models/x70-plus/video/ — 4K эхээс шахсан, дуугүй H.264.
import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

try {
  const row = await db.carModel.findUnique({ where: { id: "x70-plus" } });
  if (!row) throw new Error("x70-plus загвар олдсонгүй");

  const details = JSON.parse(row.detailsJson || "{}");
  details.film = {
    src: "/models/x70-plus/video/film-desktop.mp4",
    srcMobile: "/models/x70-plus/video/film-mobile.mp4",
    poster: "/models/x70-plus/video/film-desktop-poster.webp",
    posterMobile: "/models/x70-plus/video/film-mobile-poster.webp",
    label: "JETOUR X70 Plus — өвлийн туршилтын бичлэг",
  };

  await db.carModel.update({
    where: { id: "x70-plus" },
    data: { detailsJson: JSON.stringify(details) },
  });
  console.log("x70-plus film:", details.film);
} finally {
  await db.$disconnect();
}
