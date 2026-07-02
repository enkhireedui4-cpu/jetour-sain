import type { Metadata } from "next";
import { ALL_MODELS, MODEL_COLOR_IMAGES } from "@/lib/jetour-data";
import ModelDetailClient from "./model-detail-client";

type Props = { params: Promise<{ id: string }> };

export function generateStaticParams() {
  return ALL_MODELS.map((m) => ({ id: m.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const model = ALL_MODELS.find((m) => m.id === id);
  if (!model) return { title: "Загвар олдсонгүй" };

  const img = MODEL_COLOR_IMAGES[model.id]?.[0]?.image ?? model.heroImage;
  const price = model.startingPrice ?? model.price;
  const description = `${model.name} — ${model.tagline}. ${
    price ? `Үнэ ${price}-с эхлэн. ` : ""
  }Тест драйв, үнийн санал — SAIN MOTORS, албан ёсны дистрибьютер.`;

  return {
    title: model.name,
    description,
    alternates: { canonical: `/models/${model.id}` },
    openGraph: {
      title: `${model.name} | JETOUR Mongolia`,
      description,
      images: img ? [{ url: img, alt: model.name }] : undefined,
      type: "website",
      url: `/models/${model.id}`,
    },
  };
}

export default async function ModelDetailPage({ params }: Props) {
  const { id } = await params;
  const model = ALL_MODELS.find((m) => m.id === id);

  // Google-д зориулсан машины бүтэцтэй өгөгдөл
  const jsonLd = model
    ? {
        "@context": "https://schema.org",
        "@type": "Car",
        name: model.name,
        brand: { "@type": "Brand", name: "JETOUR" },
        description: model.description,
        image: MODEL_COLOR_IMAGES[model.id]?.[0]?.image ?? model.heroImage,
        vehicleTransmission: model.specs?.transmission,
        seatingCapacity: model.specs?.seats,
        fuelType: model.specs?.fuel,
      }
    : null;

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      <ModelDetailClient id={id} />
    </>
  );
}
