import type { Metadata } from "next";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { notFound } from "next/navigation";
import { getAllCarModels, getCarModelById, type CmsCarModel } from "@/lib/cms";
import ModelDetailClient from "./model-detail-client";

// ISR — 10 мин (600 сек). Next-ийн segment config нь literal байх ёстой,
// import хийсэн тогтмол ажиллахгүй тул тоог шууд бичнэ.
export const revalidate = 600;

/**
 * Брошюрын PDF public дотор байхгүй байхад товч 404 руу аваачихгүйн тулд —
 * файл байхгүй бол brochure-ыг цэвэрлэнэ. PDF-ээ нэмэнгүүт товч өөрөө гарч ирнэ.
 */
function withExistingBrochure(model: CmsCarModel): CmsCarModel {
  const brochure = model.details.brochure;
  if (!brochure?.startsWith("/")) return model;
  if (existsSync(join(process.cwd(), "public", brochure))) return model;
  return { ...model, details: { ...model.details, brochure: undefined } };
}

type Props = { params: Promise<{ id: string }> };

export async function generateStaticParams() {
  const models = await getAllCarModels();
  return models.map((m) => ({ id: m.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const model = await getCarModelById(id);
  if (!model) return { title: "Загвар олдсонгүй" };

  const img = model.details.colorImages?.[0]?.image ?? model.heroImage;
  const price = model.startingPrice ?? model.price;
  const description = `${model.name} — ${model.tagline}. ${
    price ? `Үнэ ${price}-с эхлэн. ` : ""
  }Тест драйв, үнийн санал — SAIN MOTORS, албан ёсны дистрибьютор.`;

  return {
    title: model.name,
    description,
    alternates: { canonical: `/models/${model.id}` },
    openGraph: {
      title: `${model.name} | JETOUR`,
      description,
      images: img ? [{ url: img, alt: model.name }] : undefined,
      type: "website",
      url: `/models/${model.id}`,
    },
  };
}

export default async function ModelDetailPage({ params }: Props) {
  const { id } = await params;
  const model = await getCarModelById(id);

  if (!model) {
    notFound();
  }

  // Google-д зориулсан машины бүтэцтэй өгөгдөл
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Car",
    name: model.name,
    brand: { "@type": "Brand", name: "JETOUR" },
    description: model.description,
    image: model.details.colorImages?.[0]?.image ?? model.heroImage,
    vehicleTransmission: model.specs?.transmission,
    seatingCapacity: model.specs?.seats,
    fuelType: model.specs?.fuel,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ModelDetailClient model={withExistingBrochure(model)} />
    </>
  );
}
