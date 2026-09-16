import { describe, expect, it } from "vitest";
import {
  metricDirection,
  metricFrame,
  parseMetric,
  smootherstep,
} from "@/lib/count-anim";

describe("parseMetric", () => {
  it("бүхэл тоог задална", () => {
    expect(parseMetric("4720")).toEqual({ n: 4720, decimals: 0 });
  });

  it("аравтын орны тоог хадгална", () => {
    expect(parseMetric("1.80")).toEqual({ n: 1.8, decimals: 2 });
  });

  it("сөрөг утга (клиренс биш ч байж болно)", () => {
    expect(parseMetric("-12.5")).toEqual({ n: -12.5, decimals: 1 });
  });

  it("тоо биш бол null — утгыг хэзээ ч зохиохгүй", () => {
    expect(parseMetric("н/д")).toBeNull();
    expect(parseMetric("")).toBeNull();
    expect(parseMetric("4 720")).toBeNull(); // зай авагдсан байх ёстой
    expect(parseMetric("1,8")).toBeNull();
    expect(parseMetric("12px")).toBeNull();
  });
});

describe("smootherstep", () => {
  it("хязгаарууд дээр яг 0 ба 1", () => {
    expect(smootherstep(0)).toBe(0);
    expect(smootherstep(1)).toBe(1);
  });

  it("мужаас гарсан утгыг хавчина", () => {
    expect(smootherstep(-3)).toBe(0);
    expect(smootherstep(9)).toBe(1);
  });

  it("голдоо тэгш хэмтэй", () => {
    expect(smootherstep(0.5)).toBeCloseTo(0.5, 10);
    expect(smootherstep(0.25) + smootherstep(0.75)).toBeCloseTo(1, 10);
  });

  it("монотон өснө — тоо хэзээ ч ухрахгүй", () => {
    let prev = -1;
    for (let t = 0; t <= 1.0001; t += 0.02) {
      const v = smootherstep(t);
      expect(v).toBeGreaterThanOrEqual(prev);
      prev = v;
    }
  });

  it("эхэлж/дуусахдаа удаан — эхний 10% нь замын 1%-ээс бага", () => {
    expect(smootherstep(0.1)).toBeLessThan(0.01);
    expect(1 - smootherstep(0.9)).toBeLessThan(0.01);
  });
});

describe("metricFrame", () => {
  const from = parseMetric("4590")!;
  const to = parseMetric("4720")!;

  it("эхлэл ба төгсгөл нь яг өгөгдсөн утгууд", () => {
    expect(metricFrame(from, to, 0)).toBe("4590");
    expect(metricFrame(from, to, 1)).toBe("4720");
  });

  it("явц дунд нь хоёрын хооронд байна", () => {
    const mid = Number(metricFrame(from, to, 0.5));
    expect(mid).toBeGreaterThan(4590);
    expect(mid).toBeLessThan(4720);
    expect(mid).toBeCloseTo(4655, 0);
  });

  it("буурах чиглэлд ч ажиллана", () => {
    expect(metricFrame(to, from, 0)).toBe("4720");
    expect(metricFrame(to, from, 1)).toBe("4590");
  });

  it("орон нь ҮРГЭЛЖ зорилтынх — өргөн чичрэхгүй", () => {
    const a = parseMetric("2.0")!;
    const b = parseMetric("2.75")!;
    for (const p of [0, 0.3, 0.6, 1]) {
      expect(metricFrame(a, b, p)).toMatch(/^\d+\.\d{2}$/);
    }
  });
});

describe("metricDirection", () => {
  it("өссөн → +1, буурсан → -1", () => {
    expect(metricDirection("4590", "4720")).toBe(1);
    expect(metricDirection("4720", "4590")).toBe(-1);
  });

  it("ижил утга эсвэл тоо бус → 0 (хөдөлгөөнгүй)", () => {
    expect(metricDirection("4720", "4720")).toBe(0);
    expect(metricDirection("н/д", "4720")).toBe(0);
    expect(metricDirection("4720", "н/д")).toBe(0);
  });
});
