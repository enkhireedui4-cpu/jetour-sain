import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import ModelForm from "../model-form";

export default async function EditModelPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const model = await db.carModel.findUnique({ where: { id } });
  if (!model) notFound();

  return (
    <div>
      <h1 className="text-2xl font-extrabold text-[#17181B] mb-6">Загвар засах — {model.name}</h1>
      <ModelForm initial={model} />
    </div>
  );
}
