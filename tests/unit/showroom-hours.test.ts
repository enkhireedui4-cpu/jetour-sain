import { describe, it, expect } from "vitest";
import { SHOWROOM_HOURS } from "@/lib/branches";
import { dealerGraph } from "@/lib/schema";

describe("showroom hours", () => {
  it("matches the hours the showroom confirmed (2026-10-05)", () => {
    expect(SHOWROOM_HOURS).toEqual([
      { day: "Даваа – Баасан", hours: "10:30 – 19:30" },
      { day: "Бямба гараг", hours: "13:00 – 18:00" },
      { day: "Ням гараг", hours: "Амарна" },
    ]);
  });

  it("publishes the same hours in structured data, Sunday closed", () => {
    const json = JSON.stringify(dealerGraph());
    expect(json).toContain('"dayOfWeek":["Monday","Tuesday","Wednesday","Thursday","Friday"],"opens":"10:30","closes":"19:30"');
    expect(json).toContain('"dayOfWeek":["Saturday"],"opens":"13:00","closes":"18:00"');
    expect(json).toContain('"dayOfWeek":["Sunday"],"opens":"00:00","closes":"00:00"');
  });
});
