import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPromotionById, getAllPromotions, getCarModelById } from "@/lib/cms";
import OfferDetailClient from "./offer-detail-client";

// ISR — 10 мин (600 сек). Next-ийн segment config нь literal байх ёстой,
// import хийсэн тогтмол ажиллахгүй тул тоог шууд бичнэ.
export const revalidate = 600;

type Props = { params: Promise<{ id: string }> };

export async function generateStaticParams() {
  const offers = await getAllPromotions();
  return offers.map((o) => ({ id: o.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const offer = await getPromotionById(id);
  if (!offer) return { title: "Санал олдсонгүй" };

  return {
    title: offer.title,
    description: offer.desc,
    alternates: { canonical: `/special-offers/${offer.id}` },
    openGraph: {
      title: `${offer.title} | JETOUR`,
      description: offer.desc,
      images: [{ url: offer.poster, alt: offer.title }],
      type: "website",
      url: `/special-offers/${offer.id}`,
    },
  };
}

export default async function OfferDetailPage({ params }: Props) {
  const { id } = await params;
  const offer = await getPromotionById(id);
  if (!offer) notFound();

  // Санал холбогдох загварын брошюр (PDF) байвал татах товч харуулна.
  const model = offer.modelId ? await getCarModelById(offer.modelId) : null;
  const brochure = model?.details.brochure ?? null;

  return <OfferDetailClient offer={offer} brochure={brochure} />;
}
