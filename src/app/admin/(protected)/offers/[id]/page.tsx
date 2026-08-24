import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import OfferForm from "../offer-form";

export default async function EditOfferPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const offer = await db.promotion.findUnique({ where: { id } });
  if (!offer) notFound();

  return (
    <div>
      <h1 className="text-2xl font-extrabold text-[#17181B] mb-6">Санал засах</h1>
      <OfferForm initial={offer} />
    </div>
  );
}
