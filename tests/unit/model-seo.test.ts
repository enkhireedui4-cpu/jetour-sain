import { describe, it, expect } from "vitest";
import { modelSeo } from "@/lib/model-seo";

const t2 = { name: "JETOUR T2", tagline: "Хурц төрх, хүчирхэг гүйцэтгэл", startingPrice: "129.9 сая ₮", price: "129.9 сая ₮-с" };

describe("modelSeo", () => {
  it("puts the name, «үнэ» and the price at the start of the title", () => {
    expect(modelSeo(t2).title).toBe("JETOUR T2 үнэ 129.9 сая ₮, үзүүлэлт | Sain Motors");
  });

  it("keeps the title within 60 characters", () => {
    const g = { ...t2, name: "JETOUR X70 Plus", startingPrice: "94.9 сая ₮" };
    expect(modelSeo(g).title.length).toBeLessThanOrEqual(60);
  });

  it("writes the starting price in words with the ablative suffix", () => {
    expect(modelSeo(t2).description).toBe(
      "JETOUR T2: үнэ 129.9 сая төгрөгөөс эхэлнэ. Хурц төрх, хүчирхэг гүйцэтгэл. Албан ёсны дистрибьютор Sain Motors: тест драйв, үнийн санал, утас 7010-8855.",
    );
  });

  it("keeps the description within 160 characters", () => {
    expect(modelSeo(t2).description.length).toBeLessThanOrEqual(160);
  });

  it("falls back to the plain price when startingPrice is missing", () => {
    const m = { ...t2, startingPrice: undefined, price: "140 сая ₮" };
    expect(modelSeo(m).title).toBe("JETOUR T2 үнэ 140 сая ₮, үзүүлэлт | Sain Motors");
  });

  it("omits the price when the model has none", () => {
    const m = { ...t2, startingPrice: undefined, price: undefined };
    expect(modelSeo(m).title).toBe("JETOUR T2 үнэ, үзүүлэлт | Sain Motors");
    expect(modelSeo(m).description.startsWith("JETOUR T2. Хурц төрх")).toBe(true);
  });
});
