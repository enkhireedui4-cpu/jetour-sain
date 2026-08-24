import { describe, it, expect } from "vitest";
import { cyclicOffset, slideJumped } from "@/lib/slider";

describe("cyclicOffset", () => {
  it("идэвхтэй слайд голдоо байна", () => {
    expect(cyclicOffset(2, 2, 5)).toBe(0);
  });

  it("хөрш слайдууд ±1 байрт", () => {
    expect(cyclicOffset(3, 2, 5)).toBe(1);
    expect(cyclicOffset(1, 2, 5)).toBe(-1);
  });

  it("циклийн зааг дээр дөт талаараа гарна", () => {
    // 3 слайд, идэвхтэй нь сүүлийнх → эхний слайд БАРУУН талд (+1) зогсоно
    expect(cyclicOffset(0, 2, 3)).toBe(1);
    expect(cyclicOffset(1, 2, 3)).toBe(-1);
    // идэвхтэй нь эхнийх → сүүлийнх ЗҮҮН талд (−1)
    expect(cyclicOffset(2, 0, 3)).toBe(-1);
  });

  it("хэзээ ч n/2-оос хэтрэхгүй", () => {
    for (const n of [2, 3, 4, 5, 6, 7, 12]) {
      for (let base = 0; base < n; base++) {
        for (let i = 0; i < n; i++) {
          expect(Math.abs(cyclicOffset(i, base, n))).toBeLessThanOrEqual(n / 2);
        }
      }
    }
  });

  it("байр давхцахгүй — офсет бүр цор ганц", () => {
    for (const n of [2, 3, 4, 5, 8]) {
      for (let base = 0; base < n; base++) {
        const offs = Array.from({ length: n }, (_, i) => cyclicOffset(i, base, n));
        expect(new Set(offs).size).toBe(n);
      }
    }
  });

  it("хоосон слайдертай унахгүй", () => {
    expect(cyclicOffset(0, 0, 0)).toBe(0);
  });
});

describe("slideJumped", () => {
  it("харагдах хөршүүд үсрэхгүй", () => {
    // 5 слайд, 1 → 2. Идэвхтэй ба түүний хөршүүд жигд хөдөлнө; зөвхөн
    // хамгийн хол (2 дэлгэцийн цаана) байгаа слайд цаагуур эргэнэ.
    for (const i of [0, 1, 2, 3]) expect(slideJumped(i, 1, 2, 5)).toBe(false);
    expect(slideJumped(4, 1, 2, 5)).toBe(true);
  });

  it("зөвхөн цаад талаар үсэрсэн слайдыг тэмдэглэнэ", () => {
    // 3 слайд, 2 → 0: слайд 1 нь −1-ээс +1 рүү, өөрөөр хэлбэл цаагуур үсэрнэ
    expect(slideJumped(0, 2, 0, 3)).toBe(false);
    expect(slideJumped(2, 2, 0, 3)).toBe(false);
    expect(slideJumped(1, 2, 0, 3)).toBe(true);
  });

  it("шилжилт бүрт хамгийн ихдээ нэг слайд үсэрнэ", () => {
    for (const n of [3, 4, 5, 8]) {
      for (let from = 0; from < n; from++) {
        for (const dir of [1, -1]) {
          const to = (from + dir + n) % n;
          const jumped = Array.from({ length: n }, (_, i) => slideJumped(i, from, to, n));
          expect(jumped.filter(Boolean).length).toBeLessThanOrEqual(1);
        }
      }
    }
  });
});
