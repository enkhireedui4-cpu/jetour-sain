import { z } from "zod";

export const leadTypes = [
  "test-drive",
  "info-request",
  "financing",
  "service",
  "parts",
  "general",
] as const;

export const contactMethods = ["call", "messenger", "whatsapp"] as const;

export const leadSchema = z.object({
  type: z.enum(leadTypes).default("general"),
  name: z.string().trim().min(1, "Name is required"),
  phone: z
    .string()
    .trim()
    .min(1, "Phone is required")
    .refine((value) => {
      const digits = value.replace(/\D/g, "");
      return digits.length >= 7 && digits.length <= 12;
    }, "Phone number is invalid"),
  email: z.string().trim().email("Email is invalid").optional().or(z.literal("")),
  model: z.string().trim().optional(),
  branch: z.string().trim().optional(),
  date: z.string().trim().optional(),
  time: z.string().trim().optional(),
  contactMethod: z.enum(contactMethods).optional(),
  message: z.string().trim().optional(),
  vehiclePrice: z.coerce.number().optional(),
  downPayment: z.coerce.number().optional(),
  termMonths: z.coerce.number().optional(),
  interestRate: z.coerce.number().optional(),
  monthlyPayment: z.coerce.number().optional(),
});

export type LeadPayload = z.infer<typeof leadSchema>;
export type LeadType = LeadPayload["type"];

export const leadTypeLabels: Record<LeadType, string> = {
  "test-drive": "Test drive",
  "info-request": "Info request",
  financing: "Financing request",
  service: "Service request",
  parts: "Parts request",
  general: "General request",
};

export function getLeadValidationMessage(error: z.ZodError) {
  return error.issues[0]?.message ?? "Invalid lead payload";
}
