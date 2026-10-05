/**
 * Загварын хуудасны <title> ба meta description.
 *
 * Хүмүүс «jetour t2 үнэ» гэж хайдаг тул гарчгийн эхэнд нэр, «үнэ», үнийн дүн
 * гарна. Google гарчгийн ~60, тайлбарын ~160 тэмдэгтийг харуулдаг.
 */
export type ModelSeoInput = {
  name: string;
  tagline: string;
  startingPrice?: string | null;
  price?: string | null;
};

const PHONE = "7010-8855";

export function modelSeo(model: ModelSeoInput) {
  const price = (model.startingPrice ?? model.price ?? "").replace(/-с$/, "").trim();

  const title = price
    ? `${model.name} үнэ ${price}, үзүүлэлт | Sain Motors`
    : `${model.name} үнэ, үзүүлэлт | Sain Motors`;

  // «129.9 сая ₮» → «129.9 сая төгрөгөөс». ₮-д дагавар залгахаас зайлсхийж үгээр бичнэ.
  const amount = price.match(/^(.+?)\s*₮$/)?.[1];
  const lead = amount
    ? `${model.name}: үнэ ${amount} төгрөгөөс эхэлнэ.`
    : `${model.name}.`;

  const description = `${lead} ${model.tagline}. Албан ёсны дистрибьютор Sain Motors: тест драйв, үнийн санал, утас ${PHONE}.`;

  return { title, description };
}
