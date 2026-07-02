import type { Metadata } from "next";
import { SPECIAL_OFFERS } from "@/lib/jetour-data";
import OfferDetailClient from "./offer-detail-client";

type Props = { params: Promise<{ id: string }> };

export function generateStaticParams() {
  return SPECIAL_OFFERS.map((o) => ({ id: o.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const offer = SPECIAL_OFFERS.find((o) => o.id === id);
  if (!offer) return { title: "Санал олдсонгүй" };

  return {
    title: offer.title,
    description: offer.desc,
    alternates: { canonical: `/special-offers/${offer.id}` },
    openGraph: {
      title: `${offer.title} | JETOUR Mongolia`,
      description: offer.desc,
      images: [{ url: offer.poster, alt: offer.title }],
      type: "website",
      url: `/special-offers/${offer.id}`,
    },
  };
}

export default async function OfferDetailPage({ params }: Props) {
  const { id } = await params;
  return <OfferDetailClient id={id} />;
}
