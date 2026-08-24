import { describe, it, expect } from "vitest";
import { z } from "zod";
import {
  leadSchema,
  leadTypes,
  leadTypeLabels,
  getLeadValidationMessage,
  type LeadPayload,
} from "@/lib/leads";

describe("leadSchema", () => {
  const base = { name: "Bat", phone: "88112233" };

  it("accepts a minimal valid payload and defaults type to 'general'", () => {
    const parsed = leadSchema.safeParse(base);
    expect(parsed.success).toBe(true);
    if (parsed.success) expect(parsed.data.type).toBe("general");
  });

  it("trims name and rejects empty name", () => {
    expect(leadSchema.safeParse({ ...base, name: "   " }).success).toBe(false);
  });

  it("rejects a phone with fewer than 7 digits", () => {
    const r = leadSchema.safeParse({ ...base, phone: "12345" });
    expect(r.success).toBe(false);
    if (!r.success) expect(r.error.issues[0].message).toBe("Phone number is invalid");
  });

  it("rejects a phone with more than 12 digits", () => {
    expect(leadSchema.safeParse({ ...base, phone: "1234567890123" }).success).toBe(false);
  });

  it("counts only digits, so formatted phones are accepted", () => {
    // "+976 8811-2233" → 11 digits
    expect(leadSchema.safeParse({ ...base, phone: "+976 8811-2233" }).success).toBe(true);
  });

  it("treats empty-string email as valid (optional-or-empty)", () => {
    expect(leadSchema.safeParse({ ...base, email: "" }).success).toBe(true);
  });

  it("rejects a malformed email", () => {
    const r = leadSchema.safeParse({ ...base, email: "not-an-email" });
    expect(r.success).toBe(false);
    if (!r.success) expect(r.error.issues[0].message).toBe("Email is invalid");
  });

  it("accepts a valid email", () => {
    expect(leadSchema.safeParse({ ...base, email: "a@b.mn" }).success).toBe(true);
  });

  it("rejects an out-of-enum lead type", () => {
    expect(leadSchema.safeParse({ ...base, type: "spam" }).success).toBe(false);
  });

  it("accepts every declared lead type", () => {
    for (const type of leadTypes) {
      expect(leadSchema.safeParse({ ...base, type }).success).toBe(true);
    }
  });

  it("coerces numeric finance fields from strings", () => {
    const r = leadSchema.safeParse({ ...base, vehiclePrice: "25000000", termMonths: "36" });
    expect(r.success).toBe(true);
    if (r.success) {
      expect(r.data.vehiclePrice).toBe(25_000_000);
      expect(r.data.termMonths).toBe(36);
    }
  });
});

describe("getLeadValidationMessage", () => {
  it("returns the first issue message", () => {
    const r = leadSchema.safeParse({ name: "", phone: "1" });
    if (!r.success) {
      expect(getLeadValidationMessage(r.error)).toBe(r.error.issues[0].message);
    } else {
      throw new Error("expected validation failure");
    }
  });

  it("falls back when a ZodError has no issues", () => {
    expect(getLeadValidationMessage(new z.ZodError([]))).toBe("Invalid lead payload");
  });
});
