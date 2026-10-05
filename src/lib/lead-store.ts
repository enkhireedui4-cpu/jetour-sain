import { Prisma, type PrismaClient } from "@prisma/client";
import { db } from "@/lib/db";
import { type LeadPayload, leadTypeLabels } from "@/lib/leads";
import { privateKey, safeErrorCode } from "@/lib/request-security";

export function canonicalLead(lead: LeadPayload) {
  let phone = lead.phone.replace(/\D/g, "");
  if (phone.length === 11 && phone.startsWith("976")) phone = phone.slice(3);
  const keys = ["type", "name", "phone", "email", "model", "branch", "date", "time", "contactMethod", "message", "vehiclePrice", "downPayment", "termMonths", "interestRate", "monthlyPayment"] as const;
  return Object.fromEntries(keys.map(key => [key, key === "phone" ? phone : key === "email" ? lead.email?.toLowerCase() : lead[key]]).filter(([, value]) => value !== undefined && value !== ""));
}
export async function submitLead(lead: LeadPayload, database: PrismaClient = db, now = new Date()) {
  const payload = canonicalLead(lead);
  const payloadJson = JSON.stringify(payload);
  const fingerprint = privateKey("lead-receipt", payloadJson);
  const hubStatus = process.env.HUB_LEAD_URL && process.env.HUB_LEAD_TOKEN ? "pending" : "disabled";
  for (let attempt = 0; ; attempt++) {
    try {
      return await database.$transaction(async tx => {
        const receipt = await tx.leadReceipt.upsert({ where: { fingerprint }, create: { fingerprint, touchedAt: now }, update: { touchedAt: now } });
        if (receipt.leadId && receipt.submittedAt && now.getTime() - receipt.submittedAt.getTime() < 600000) {
          const existing = await tx.lead.findUnique({ where: { id: receipt.leadId } });
          if (existing) return { id: existing.id, duplicate: true, hubStatus: existing.hubStatus };
        }
        const labels: Record<string, string> = { branch: "Салбар", date: "Огноо", time: "Цаг", contactMethod: "Холбогдох хэлбэр", message: "Нэмэлт мэдээлэл", vehiclePrice: "Автомашины үнэ", downPayment: "Урьдчилгаа", termMonths: "Хугацаа (сар)", interestRate: "Хүү (%)", monthlyPayment: "Сарын төлбөр" };
        const message = [leadTypeLabels[lead.type], ...Object.entries(payload).filter(([key]) => !["type", "name", "phone", "email", "model"].includes(key)).map(([key, value]) => `${labels[key] || key}: ${value}`)].join(" | ");
        const saved = await tx.lead.create({ data: { name: lead.name, phone: String(payload.phone), email: lead.email || null, modelName: lead.model || null, source: lead.type, message, payloadJson, hubStatus, hubNextAttemptAt: hubStatus === "pending" ? now : null } });
        await tx.leadReceipt.update({ where: { fingerprint }, data: { leadId: saved.id, submittedAt: now } });
        return { id: saved.id, duplicate: false, hubStatus: saved.hubStatus };
      }, { isolationLevel: Prisma.TransactionIsolationLevel.Serializable, maxWait: 10000, timeout: 10000 });
    } catch (error) {
      if (attempt >= 4 || !["P2034", "P2002", "P1008"].includes(safeErrorCode(error))) throw error;
      await new Promise(resolve => setTimeout(resolve, 25 * (attempt + 1)));
    }
  }
}
