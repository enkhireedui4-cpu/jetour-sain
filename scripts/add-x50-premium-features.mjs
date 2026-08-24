// scripts/add-x50-premium-features.mjs
// X50-ийн detailsJson дээр "premiumFeatures" блокийг нэмнэ/шинэчилнэ.
// Бусад талбарыг хөндөхгүй, дахин ажиллуулахад аюулгүй (idempotent).
// Агуулга нь src/lib/jetour-data.ts → MODEL_PREMIUM_FEATURES.x50-тай ижил байх ёстой.
//   node scripts/add-x50-premium-features.mjs
import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

const premiumFeatures = {
  // Хөдөлгүүр/явах ангийн слайд нэмэгдсэн тул eyebrow нь "INTERIOR" биш.
  eyebrow: "X50 HIGHLIGHTS",
  title: "PREMIUM FEATURES",
  subtitle: "Технологи, тав тух, хүчин чадал — нэг дор",
  features: [
    {
      id: "digital-cockpit",
      eyebrow: "DIGITAL COCKPIT",
      title: "Дижитал хос дэлгэц",
      description:
        "Дижитал хяналтын самбар болон төвийн ухаалаг дэлгэц нь мэдээлэл, энтертайнмент болон жолоодлогын хэрэгцээг нэг дороос удирдах боломжийг олгоно.",
      image: "/models/x50/features/x50-feature-digital-cockpit.webp",
      alt: "JETOUR X50-ийн дижитал хяналтын самбар болон мультимедиа дэлгэц",
    },
    {
      id: "premium-comfort",
      eyebrow: "PREMIUM COMFORT",
      title: "Тав тухыг мэдрэх орон зай",
      description:
        "Бүхээгийн зохион байгуулалт болон чанартай материалын хослол нь жолооч, зорчигч бүрд илүү тухтай, цэлгэр мэдрэмжийг төрүүлнэ.",
      image: "/models/x50/features/x50-feature-premium-seats.webp",
      alt: "JETOUR X50-ийн урд болон хойд суудал бүхий дотоод орчин",
    },
    // 03–04 — ЧАНАР хэсгийн батлагдсан агуулгаас: шинэ үзүүлэлт зохиогоогүй.
    {
      id: "acteco-engine",
      eyebrow: "ACTECO ENGINE",
      title: "1.5T ACTECO хөдөлгүүр",
      description:
        'Австри улсын AVL болон Chery компанийн хамтран бүтээсэн ACTECO хөдөлгүүр "ТОП-10 хөдөлгүүр" шагналыг нийт 6 удаа хүртсэн. 4 цилиндр турбо, урагшаа 6 шатлалт хурдны хайрцагтай.',
      image: "/ext/p3_1.png",
      alt: "JETOUR X50-ийн 1.5T ACTECO турбо хөдөлгүүрийн зүсмэл дүрслэл",
    },
    {
      id: "ride-chassis",
      eyebrow: "CHASSIS & SUSPENSION",
      title: "Жолооны тав тухаараа тэргүүлэгч",
      description:
        "Урд MacPherson болон хойд талын олон татлагат бие даасан амиржины системүүдийн ховор хослол — зорчигчид ирэх доргилтыг бууруулж, тав тухтай зорчиход зориулагдсан.",
      image: "/ext/p3_2.png",
      alt: "JETOUR X50-ийн явах ангийн бүтэц — урд MacPherson, хойд олон татлагат амиржин",
    },
  ],
};

const row = await db.carModel.findUnique({ where: { id: "x50" } });
if (!row) throw new Error("x50 загвар өгөгдлийн санд байхгүй.");

const details = JSON.parse(row.detailsJson ?? "{}");
details.premiumFeatures = premiumFeatures;

await db.carModel.update({
  where: { id: "x50" },
  data: { detailsJson: JSON.stringify(details) },
});

console.log(
  `[x50] premiumFeatures бэлэн — ${premiumFeatures.features.length} слайд:`,
  premiumFeatures.features.map((f) => f.id).join(", ")
);

await db.$disconnect();
