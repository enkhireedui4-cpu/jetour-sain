import { describe, it, expect } from "vitest";
import {
  parseDetailsJson,
  shapeCarModel,
  shapeNews,
  shapePromotion,
} from "@/lib/cms";

describe("parseDetailsJson", () => {
  it("parses valid JSON and exposes core + extra fields", () => {
    const raw = JSON.stringify({
      exteriorImages: ["/a.jpg"],
      safety: ["ABS"],
      variants: [{ id: "v1", name: "Base", powertrain: "Бензин" }],
      colorTransparent: true,
    });
    const d = parseDetailsJson(raw);
    expect(d.exteriorImages).toEqual(["/a.jpg"]);
    expect(d.safety).toEqual(["ABS"]);
    expect(d.variants?.[0].id).toBe("v1");
    expect(d.colorTransparent).toBe(true);
  });

  it("falls back to safe defaults on malformed JSON", () => {
    const d = parseDetailsJson("{ not valid");
    expect(d.exteriorImages).toEqual([]);
    expect(d.gallery).toEqual([]);
    expect(d.highlights).toEqual([]);
    expect(d.specs.engine).toBe(""); // emptySpecs()
  });

  it("falls back to defaults on empty string", () => {
    const d = parseDetailsJson("");
    expect(d.interiorImages).toEqual([]);
    expect(d.specs.fuel).toBe("");
  });
});

function makeCarRow(overrides: Record<string, unknown> = {}) {
  return {
    id: "x70-plus",
    name: "X70 Plus",
    series: "X",
    tagline: "tag",
    shortDesc: "short",
    description: "desc",
    longDescription: "long",
    heroImage: "/hero.jpg",
    price: "100 сая",
    priceNote: null,
    startingPrice: null,
    status: "available",
    accent: "red",
    order: 1,
    detailsJson: "{}",
    published: true,
    ...overrides,
  };
}

describe("shapeCarModel", () => {
  it("maps a row and splits core details from extra details", () => {
    const row = makeCarRow({
      detailsJson: JSON.stringify({
        exteriorImages: ["/e.jpg"],
        variants: [{ id: "v1", name: "Base", powertrain: "Бензин" }],
      }),
    });
    const m = shapeCarModel(row as never);
    expect(m.id).toBe("x70-plus");
    expect(m.name).toBe("X70 Plus");
    expect(m.exteriorImages).toEqual(["/e.jpg"]); // core, promoted to top level
    expect(m.details.variants?.[0].id).toBe("v1"); // extra, nested under details
    expect(m.published).toBe(true);
  });

  it("maps null priceNote/startingPrice to undefined", () => {
    const m = shapeCarModel(makeCarRow() as never);
    expect(m.priceNote).toBeUndefined();
    expect(m.startingPrice).toBeUndefined();
  });

  it("passes through provided status and accent", () => {
    const m = shapeCarModel(makeCarRow({ status: "coming-soon", accent: "blue" }) as never);
    expect(m.status).toBe("coming-soon");
    expect(m.accent).toBe("blue");
  });
});

describe("shapeNews", () => {
  it("maps a news row into a NewsArticle", () => {
    const row = {
      slug: "launch",
      title: "Launch",
      excerpt: "ex",
      content: "body",
      date: "2026-07-01",
      dateIso: "2026-07-01T00:00:00.000Z",
      image: "/n.jpg",
      tag: "News",
      type: "news",
      accent: "red",
    };
    const a = shapeNews(row as never);
    expect(a.slug).toBe("launch");
    expect(a.type).toBe("news");
    expect(a.image).toBe("/n.jpg");
  });
});

describe("shapePromotion", () => {
  const base = {
    id: "offer-1",
    modelId: "x70-plus",
    modelName: "X70 Plus",
    poster: "/p.jpg",
    title: "Summer",
    desc: "d",
    date: "2026-07",
    body: JSON.stringify(["line1", "line2"]),
    tagline: "t",
    price: "90 сая",
    specsJson: JSON.stringify([{ label: "Engine", value: "1.5T" }]),
  };

  it("parses body and specs JSON arrays", () => {
    const o = shapePromotion(base as never);
    expect(o.body).toEqual(["line1", "line2"]);
    expect(o.specs).toEqual([{ label: "Engine", value: "1.5T" }]);
    expect(o.price).toBe("90 сая");
  });

  it("falls back to empty arrays on malformed body/specs JSON", () => {
    const o = shapePromotion({ ...base, body: "[bad", specsJson: "nope" } as never);
    expect(o.body).toEqual([]);
    expect(o.specs).toEqual([]);
  });
});
