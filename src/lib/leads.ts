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

function isCalendarDate(value: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const [year, month, day] = value.split("-").map(Number);
  if (year < 1 || month < 1 || month > 12) return false;
  const leap = year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
  const days = [31, leap ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  return day >= 1 && day <= days[month - 1];
}

export const leadSchema = z.object({
  type: z.enum(leadTypes).default("general"),
  name: z.string().trim().min(1, "Name is required").max(100),
  phone: z
    .string()
    .trim()
    .max(32)
    .min(1, "Phone is required")
    .refine((value) => {
      const digits = value.replace(/\D/g, "");
      return digits.length >= 7 && digits.length <= 12;
    }, "Phone number is invalid"),
  email: z.string().trim().email("Email is invalid").optional().or(z.literal("")),
  model: z.string().trim().max(100).optional(),
  branch: z.string().trim().max(200).optional(),
  date: z.string().trim().refine(value => value === "" || isCalendarDate(value), "Date is invalid").optional(),
  time: z.string().trim().refine(value => value === "" || /^([01]\d|2[0-3]):[0-5]\d$/.test(value), "Time is invalid").optional(),
  contactMethod: z.enum(contactMethods).optional(),
  message: z.string().trim().max(4000).optional(),
  vehiclePrice: z.coerce.number().min(0).max(1e12).optional(),
  downPayment: z.coerce.number().min(0).max(1e12).optional(),
  termMonths: z.coerce.number().int().min(1).max(600).optional(),
  interestRate: z.coerce.number().min(0).max(100).optional(),
  monthlyPayment: z.coerce.number().min(0).max(1e12).optional(),
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
  const field = String(error.issues[0]?.path[0] ?? "");
  const messages: Record<string, string> = {
    name: "Нэрээ зөв оруулна уу.", phone: "Утасны дугаараа зөв оруулна уу.",
    email: "Цахим шуудангийн хаягаа зөв оруулна уу.",
    date: "Огноогоо зөв сонгоно уу.", time: "Цагаа зөв сонгоно уу.",
  };
  return messages[field] ?? "Хүсэлтийн мэдээллээ шалгана уу.";
}
