import type { Metadata } from "next";
import { DealerClient } from "./dealer-client";
import { getAllCarModels } from "@/lib/cms";
import { dealerPriceRange, breadcrumbList, parseMnt } from "@/lib/schema";
import { JsonLd } from "@/components/jetour/json-ld";
import { SHOWROOM_BRANCH, SERVICE_BRANCH } from "@/lib/jetour-data";

// Үнийн муж DB-ээс ирдэг тул загварын үнэ засагдахад дагаж шинэчлэгдэнэ.
// Бусад хуудастай ижил 10 минут (Next-ийн segment config нь literal байх ёстой).
export const revalidate = 600;

export const metadata: Metadata = {
  title: "Шоурум ба үйлчилгээний төв — хаяг, байршил",
  description: `JETOUR-ийн Монгол дахь албан ёсны дистрибьютор SAIN MOTORS. Шоурум: ${SHOWROOM_BRANCH.addressShort}. Үйлчилгээний төв: ${
    SERVICE_BRANCH?.addressShort ?? ""
  }. Ажлын цаг, газрын зураг, замын заавар, холбоо барих.`,
  alternates: { canonical: "/dealer" },
  openGraph: {
    title: "JETOUR шоурум ба үйлчилгээний төв | SAIN MOTORS",
    description:
      "Хоёр байршил: борлуулалтын шоурум ба баталгаат засвар үйлчилгээний төв. Хаяг, ажлын цаг, газрын зураг.",
    url: "/dealer",
    type: "website",
    images: [{ url: "/showroom/showroom-1.webp", alt: "JETOUR шоурум — SAIN MOTORS" }],
  },
};

/**
 * Дилерийн бодит үнийн муж — «69.9 – 140 сая ₮».
 *
 * ЗОХИОХГҮЙ: тоо нь DB-д бүртгэлтэй загваруудын үнээс бодогдоно. Нэг ч үнэ
 * задрахгүй бол `undefined` буцаж, JSON-LD-д `priceRange` талбар огт гарахгүй.
 */
async function priceRangeFromDb(): Promise<string | undefined> {
  const models = await getAllCarModels();
  const prices = models
    .map((m) => parseMnt(m.startingPrice ?? m.price))
    .filter((p): p is number => p !== undefined);
  if (!prices.length) return undefined;

  const millions = (n: number) => {
    const v = n / 1_000_000;
    // 140 → "140", 69.9 → "69.9" (хуурамч нарийвчлал үүсгэхгүй)
    return Number.isInteger(v) ? String(v) : v.toFixed(1);
  };
  const min = Math.min(...prices);
  const max = Math.max(...prices);
  return min === max
    ? `${millions(min)} сая ₮`
    : `${millions(min)} – ${millions(max)} сая ₮`;
}

export default async function DealerPage() {
  const priceRange = await priceRangeFromDb();
  const priceNode = dealerPriceRange(priceRange);

  return (
    <>
      {/* Дилер + үйлчилгээний төвийн бүтэн граф нь layout-аас сайтын бүх
          хуудсанд гарч байгаа. Энд зөвхөн ижил `@id` дээр үнийн мужийг
          залгана — бүтэн графыг давхардуулахгүй. */}
      {priceNode && <JsonLd data={priceNode} />}
      <JsonLd
        data={breadcrumbList([
          { name: "Нүүр", path: "/" },
          { name: "Шоурум ба үйлчилгээний төв", path: "/dealer" },
        ])}
      />
      <DealerClient />
    </>
  );
}
