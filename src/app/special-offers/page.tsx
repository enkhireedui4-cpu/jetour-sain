import type { Metadata } from "next";
import { getAllPromotions } from "@/lib/cms";
import SpecialOffersClient from "./offers-client";

// ISR — 10 мин (600 сек). Next-ийн segment config нь literal байх ёстой,
// import хийсэн тогтмол ажиллахгүй тул тоог шууд бичнэ.
export const revalidate = 600;

export const metadata: Metadata = {
  title: "Тусгай саналууд",
  description: "JETOUR загваруудын хамгийн сүүлийн үеийн тусгай санал, зээлийн хөнгөлөлт.",
  /* Өөрийгөө заасан canonical. Байхгүй бол Next `metadataBase`
     буюу НҮҮР рүү унаж, Google энэ хуудсыг нүүрийн хуулбар гэж
     үзээд индексээс хасдаг. */
  alternates: { canonical: "/special-offers" },
};

export default async function SpecialOffersPage() {
  const offers = await getAllPromotions();
  return <SpecialOffersClient offers={offers} />;
}
