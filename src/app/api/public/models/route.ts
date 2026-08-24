import { NextResponse } from "next/server";
import { getAllCarModels } from "@/lib/cms";
import { REVALIDATE_SECONDS } from "@/lib/image";

// Нийтэд зориулсан, зөвхөн nav/footer/lead-форм дотор ашиглах хөнгөн жагсаалт.
// Route cache: nav/contact/lead-form 3 компонент нэг хуудсанд ижил хүсэлт
// зэрэг явуулдаг тул кэшгүй бол DB-д 3 удаа цохино. revalidate-аар Next
// хариултыг кэшлэж, DB-г 10 минутанд нэг л удаа цохино (хуудаснуудтай ижил).
// ISR — 10 мин (600 сек). Next-ийн segment config нь literal байх ёстой,
// import хийсэн тогтмол ажиллахгүй тул тоог шууд бичнэ.
export const revalidate = 600;

export async function GET() {
  const models = await getAllCarModels();
  const list = models
    .filter((m) => m.status === "available")
    .map((m) => ({
      id: m.id,
      name: m.name,
      heroImage: m.details.colorImages?.[0]?.image ?? m.details.galleryImages?.[0] ?? m.heroImage,
      price: m.price,
      priceNote: m.priceNote ?? null,
      startingPrice: m.startingPrice ?? null,
      status: m.status,
    }));
  return NextResponse.json(
    { ok: true, models: list },
    {
      headers: {
        // Browser/CDN түвшний кэш: давтан ачаалалт/навигацид дахин DB цохихгүй.
        "Cache-Control": `public, s-maxage=${REVALIDATE_SECONDS}, stale-while-revalidate=86400`,
      },
    },
  );
}
