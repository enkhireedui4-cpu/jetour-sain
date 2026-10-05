import { db } from "@/lib/db";
import { safeErrorCode } from "@/lib/request-security";

export async function deliverHubLead(id: string) {
  const url = process.env.HUB_LEAD_URL;
  const token = process.env.HUB_LEAD_TOKEN;
  if (!url || !token) return;
  const target = new URL(url);
  if (target.protocol !== "https:" && !(process.env.NODE_ENV !== "production" && target.hostname === "localhost")) throw new Error("HTTPS required");
  const now = new Date();
  const claim = await db.lead.updateMany({ where: { id, hubStatus: "pending", AND: [{ OR: [{ hubNextAttemptAt: null }, { hubNextAttemptAt: { lte: now } }] }, { OR: [{ hubLockedUntil: null }, { hubLockedUntil: { lt: now } }] }] }, data: { hubLockedUntil: new Date(Date.now() + 30000), hubAttempts: { increment: 1 } } });
  if (!claim.count) return;
  const lead = await db.lead.findUniqueOrThrow({ where: { id } });
  let delivered = false;
  try {
    const response = await fetch(url, { method: "POST", headers: { "Content-Type": "application/json", Authorization: `Token ${token}`, "Idempotency-Key": id }, body: JSON.stringify({ ...JSON.parse(lead.payloadJson), createdAt: lead.createdAt.toISOString() }), signal: AbortSignal.timeout(8000), redirect: "error" });
    delivered = response.ok;
    await response.body?.cancel();
  } catch (error) { console.error("[HUB] delivery failed", safeErrorCode(error)); }
  await db.lead.update({ where: { id }, data: { hubStatus: delivered ? "delivered" : "pending", hubLockedUntil: null, hubNextAttemptAt: delivered ? null : new Date(Date.now() + Math.min(3600000, 30000 * 2 ** Math.min(lead.hubAttempts, 7))) } });
}
export async function retryPendingHubLeads() {
  const now = new Date();
  const rows = await db.lead.findMany({ where: { hubStatus: "pending", AND: [{ OR: [{ hubNextAttemptAt: null }, { hubNextAttemptAt: { lte: now } }] }, { OR: [{ hubLockedUntil: null }, { hubLockedUntil: { lt: now } }] }] }, select: { id: true }, take: 20, orderBy: { createdAt: "asc" } });
  for (let offset = 0; offset < rows.length; offset += 4) await Promise.all(rows.slice(offset, offset + 4).map(row => deliverHubLead(row.id)));
  return rows.length;
}
