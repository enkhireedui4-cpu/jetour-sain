import type { Metadata } from "next";
import { getAllCarModels } from "@/lib/cms";
import { modelCutout } from "@/lib/model-media";
import { Navbar } from "@/components/jetour/navbar";
import { Footer } from "@/components/jetour/contact";
import { PageHeader } from "@/components/jetour/page-header";
import { ModelsListing } from "./models-listing";
import type { VehicleCardModel } from "@/components/jetour/vehicle-card";

// ISR — 10 мин (600 сек). Next-ийн segment config нь literal байх ёстой,
// import хийсэн тогтмол ажиллахгүй тул тоог шууд бичнэ.
export const revalidate = 600;

export const metadata: Metadata = {
  title: "Загварууд — JETOUR лайнап",
  description:
    "JETOUR-ийн бүх загвар — X70 Plus, X50, X1, T1, T2, G700. Загвар бүрийн үнэ, ангилал болон дэлгэрэнгүй мэдээллийг эндээс үзнэ үү.",
  alternates: { canonical: "/models" },
};

/**
 * Каталогийн зураг — загвар бүрийн тунгалаг cutout (`/menu/*.webp`).
 * Бүгд нэг ижил 800×480 canvas дээр бэлтгэгдсэн тул машинууд каталог дээр
 * харагдацаараа ижил хэмжээтэй болно (өмнө нь янз бүрийн харьцаатай
 * lifestyle фото байсан тул нэг нь том, нөгөө нь жижиг харагддаг байв).
 */

export default async function ModelsPage() {
  const all = await getAllCarModels();
  // Available эхэнд, coming-soon дараа нь — order-оор эрэмбэлнэ
  const sorted = [...all].sort((a, b) => {
    const av = a.status === "available" ? 0 : 1;
    const bv = b.status === "available" ? 0 : 1;
    if (av !== bv) return av - bv;
    return a.order - b.order;
  });

  const cards: VehicleCardModel[] = sorted.map((m) => ({
    id: m.id,
    name: m.name,
    image: modelCutout(m),
    startingPrice: m.startingPrice ?? null,
    price: m.price,
    priceNote: m.priceNote ?? null,
    status: m.status,
    series: m.series,
    powertrains: m.details.variants?.map((v) => v.powertrain),
    specs: {
      engine: m.specs.engine,
      power: m.specs.power,
      torque: m.specs.torque,
      drivetrain: m.specs.drivetrain,
      transmission: m.specs.transmission,
      fuel: m.specs.fuel,
    },
  }));

  return (
    <div id="main-content" className="min-h-screen bg-white text-[#17181B]">
      <Navbar />
      <PageHeader
        title="Загварууд"
        lead="JETOUR-ийн бүх лайнапыг нэг дороос"
      />
      <ModelsListing models={cards} />
      <Footer />
    </div>
  );
}
