import { describe, it, expect } from "vitest";
import { wrapIndex, framesToAdvance, pxPerFrameFor } from "@/lib/spin";

describe("wrapIndex", () => {
  it("хүрээн доторх утгыг хэвээр үлдээнэ", () => {
    expect(wrapIndex(0, 36)).toBe(0);
    expect(wrapIndex(35, 36)).toBe(35);
  });

  it("урагш тойрно", () => {
    expect(wrapIndex(36, 36)).toBe(0);
    expect(wrapIndex(37, 36)).toBe(1);
    expect(wrapIndex(100, 36)).toBe(28);
  });

  it("СӨРӨГ утгыг зөв тойруулна (эхний кадраас ухрах үе)", () => {
    // JS-ийн % нь -1 өгдөг — шууд ашиглавал зураг алга болно
    expect(-1 % 36).toBe(-1);
    expect(wrapIndex(-1, 36)).toBe(35);
    expect(wrapIndex(-36, 36)).toBe(0);
    expect(wrapIndex(-37, 36)).toBe(35);
  });

  it("хэзээ ч хүрээнээс гарахгүй", () => {
    for (let i = -200; i <= 200; i++) {
      const v = wrapIndex(i, 36);
      expect(v).toBeGreaterThanOrEqual(0);
      expect(v).toBeLessThan(36);
    }
  });

  it("кадргүй үед 0 буцаана (0-д хуваахгүй)", () => {
    expect(wrapIndex(5, 0)).toBe(0);
  });
});

describe("framesToAdvance", () => {
  it("босго хүрээгүй жижиг хөдөлгөөнд 0", () => {
    expect(framesToAdvance(10, 16)).toBe(0);
    expect(framesToAdvance(-10, 16)).toBe(0);
  });

  it("хоёр тийш ТЭГШ мэдрэмжтэй", () => {
    // trunc тул +17 ба -17 хоёулаа яг нэг кадр
    expect(framesToAdvance(17, 16)).toBe(1);
    expect(framesToAdvance(-17, 16)).toBe(-1);
    expect(framesToAdvance(33, 16)).toBe(2);
    expect(framesToAdvance(-33, 16)).toBe(-2);
  });

  it("буруу pxPerFrame дээр 0 буцаана (хуваалтын алдаанаас сэргийлнэ)", () => {
    expect(framesToAdvance(100, 0)).toBe(0);
    expect(framesToAdvance(100, -5)).toBe(0);
    expect(framesToAdvance(100, NaN)).toBe(0);
  });
});

describe("pxPerFrameFor", () => {
  it("блокийн өргөнөөс хамаарч томорно", () => {
    expect(pxPerFrameFor(1280, 36)).toBeCloseTo(19.6, 0);
    expect(pxPerFrameFor(390, 36)).toBeCloseTo(6, 0);
  });

  it("6px-ээс доош буухгүй (хуруу чичрэхэд кадр үсрэхгүй)", () => {
    expect(pxPerFrameFor(100, 36)).toBe(6);
    expect(pxPerFrameFor(0, 36)).toBe(6);
  });

  it("бүтэн эргэлт нь блокийн өргөний ≈0.55 дахин чирэлт", () => {
    const w = 1000, total = 36;
    const full = pxPerFrameFor(w, total) * total;
    expect(full).toBeCloseTo(w * 0.55, 0);
  });

  it("кадргүй үед уналгүй анхдагч утга өгнө", () => {
    expect(pxPerFrameFor(1000, 0)).toBe(16);
  });
});
