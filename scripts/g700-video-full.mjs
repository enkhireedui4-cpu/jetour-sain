// scripts/g700-video-full.mjs
//
// G700-ийн "Танк эргэлт" бичлэгийг хар зурвасгүй хувилбар руу заана.
// Ажиллуулах:  node scripts/g700-video-full.mjs   (дараа нь npm run db:export)
//
// Эх `tankturn.mp4` нь 16:9 кадр дотроо дээд/доод хар зурвастай (кино харьцаа
// 2.35:1 шингэсэн) байв. `tankturn-full.mp4` — тэр зурвасыг тайрсан 1920×816.
// Нэрийг сольсон нь хөтчийн кэшид хуучин файл үлдэхээс сэргийлнэ.
import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

try {
  const row = await db.carModel.findUnique({ where: { id: "g700" } });
  if (!row) throw new Error("g700 загвар олдсонгүй");

  const details = JSON.parse(row.detailsJson || "{}");
  if (!details.video) throw new Error("g700-д video талбар алга");
  details.video.src = "/models/g700/video/tankturn-full.mp4";

  await db.carModel.update({
    where: { id: "g700" },
    data: { detailsJson: JSON.stringify(details) },
  });
  console.log("g700 video:", details.video);
} finally {
  await db.$disconnect();
}
