import { db } from "@/lib/db";
import type { PrismaClient } from "@prisma/client";
import { privateKey } from "@/lib/request-security";

export async function consumeRateLimit(scope: string, identity: string, max: number, windowMs: number, now = Date.now(), database: Pick<PrismaClient, "requestLimit"> = db) {
  const window = Math.floor(now / windowMs);
  const expiresAt = new Date((window + 1) * windowMs);
  const key = `${scope}:${window}:${privateKey(scope, identity)}`;
  const row = await database.requestLimit.upsert({ where: { key }, create: { key, count: 1, expiresAt }, update: { count: { increment: 1 } } });
  await database.requestLimit.deleteMany({ where: { expiresAt: { lt: new Date(now - 86400000) } } });
  return { allowed: row.count <= max, retryAfter: Math.max(1, Math.ceil((expiresAt.getTime() - now) / 1000)) };
}
