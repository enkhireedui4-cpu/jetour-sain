import { describe, it, expect } from "vitest";
import { colorTone, swatchGradient, SWATCH_INSET } from "@/lib/color-studio";

/**
 * Эдгээр функц нь өнгөний сонголтын дэвсгэр, swatch-ийг тооцоолдог. Өмнө нь
 * `model-detail-client.tsx` дотор байсан тул тестлэх боломжгүй байв.
 *
 * Гол шалгах зүйл: ЦАГААН/цайвар будаг сонгоход дэвсгэр нь машинтайгаа
 * нийлж, цагаан текст уншигдахаа болихгүй байх (студийн саарал руу шилжинэ).
 */
describe("colorTone", () => {
  it("буруу/дутуу hex дээр ч уналгүй утга буцаана", () => {
    for (const bad of [undefined, "", "#12", "тэнэг", "#GGGGGG"]) {
      const t = colorTone(bad);
      expect(t.background).toContain("radial-gradient");
      expect(t.ink).toBe("#FFFFFF");
    }
  });

  it("3 оронтой hex-ийг 6 орон болгож уншина", () => {
    expect(colorTone("#abc").background).toBe(colorTone("#aabbcc").background);
  });

  it("бараан будаг өөрийнхөө аясыг хадгална", () => {
    const dark = colorTone("#121316"); // хар
    // Хар будаг студийн саарал руу ШИЛЖИХГҮЙ — өөрийн бараан аяс хэвээр
    expect(dark.background).not.toContain("rgb(92, 96, 102)");
  });

  it("цайвар будаг студийн нейтрал саарал руу шилжинэ", () => {
    // Цагаан дээр дэвсгэр нь цайвар болбол цагаан текст алга болно. Иймд
    // булангийн өнгө нь тогтмол студийн саарал (92,96,102) болох ёстой.
    for (const light of ["#F1F1F2", "#FFFFFF", "#E8E9EA"]) {
      expect(colorTone(light).background).toContain("rgb(92, 96, 102)");
    }
  });

  it("цагаан текст булангийн өнгө дээр AA (4.5:1) давна", () => {
    const lum = ([r, g, b]: number[]) => {
      const f = (v: number) => {
        const c = v / 255;
        return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
      };
      return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
    };
    const contrastVsWhite = (rgb: number[]) => 1.05 / (lum(rgb) + 0.05);

    // Бүх бодит будгийн өнгө дээр шалгана
    const hexes = ["#F1F1F2", "#121316", "#6B7079", "#1C3D5A", "#C8202A", "#8A8F98"];
    for (const hex of hexes) {
      const bg = colorTone(hex).background;
      // Градиентийн СҮҮЛЧИЙН (булангийн) rgb-г салгаж авна
      const stops = [...bg.matchAll(/rgb\((\d+), (\d+), (\d+)\)/g)];
      const edge = stops[stops.length - 1].slice(1, 4).map(Number);
      expect(contrastVsWhite(edge), `${hex} булан`).toBeGreaterThanOrEqual(4.5);
    }
  });
});

describe("swatchGradient", () => {
  it("135° градиент буцаана", () => {
    expect(swatchGradient("#C8202A")).toMatch(/^linear-gradient\(135deg, rgb\(.+\), rgb\(.+\)\)$/);
  });

  it("буруу hex дээр уналгүй, оролтоо буцаана", () => {
    expect(swatchGradient("тэнэг")).toContain("тэнэг");
  });
});

describe("SWATCH_INSET", () => {
  it("дээрээс цайвар, доороос бараан inset агуулна", () => {
    expect(SWATCH_INSET).toContain("inset 0 1px 1px");
    expect(SWATCH_INSET).toContain("inset 0 -2px 3px");
  });
});
