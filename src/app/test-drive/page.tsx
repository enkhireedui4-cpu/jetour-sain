import type { Metadata } from "next";
import { getAllCarModels } from "@/lib/cms";
import { Navbar } from "@/components/jetour/navbar";
import { Footer } from "@/components/jetour/contact";
import { PageHeader } from "@/components/jetour/page-header";
import { TestDriveClient } from "./test-drive-client";

// ISR — 10 мин (600 сек). Next-ийн segment config нь literal байх ёстой,
// import хийсэн тогтмол ажиллахгүй тул тоог шууд бичнэ.
export const revalidate = 600;

export const metadata: Metadata = {
  title: "Тест драйв захиалах — JETOUR",
  description:
    "JETOUR загваруудыг өөрийн биеэр туршаарай. Загвараа сонгож, хэдхэн мэдээлэл үлдээхэд манай баг 24 цагийн дотор холбогдоно.",
  alternates: { canonical: "/test-drive" },
};

const imgOf = (m: Awaited<ReturnType<typeof getAllCarModels>>[number]) =>
  m.details.exteriorImagesOverride?.[0] ??
  m.details.colorImages?.[0]?.image ??
  m.details.galleryImages?.[0] ??
  m.heroImage;

export default async function TestDrivePage() {
  const all = await getAllCarModels();
  const models = all
    .filter((m) => m.status === "available")
    .map((m) => ({ id: m.id, name: m.name, image: imgOf(m) }));

  return (
    <div id="main-content" className="min-h-screen bg-white text-[#17181B]">
      <Navbar />
      <PageHeader
        title="Тест драйв захиалах"
        lead="Хэдхэн мэдээлэл үлдээгээрэй — манай баг 24 цагийн дотор холбогдож, тохиромжтой цагийг тохирно."
      />
      <TestDriveClient models={models} />
      <Footer />
    </div>
  );
}
