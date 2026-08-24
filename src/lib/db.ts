import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// Орчноос хамаарсан лог: dev-д дэлгэрэнгүй, production-д зөвхөн алдаа.
// (production-д 'query' лог хийвэл TTFB нэмэгдэж, leadн утас зэрэг PII логонд орно.)
const log =
  process.env.NODE_ENV === 'development'
    ? (['query', 'error', 'warn'] as const)
    : (['error'] as const)

export const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: [...log],
  })

// Бүх орчинд globalThis дээр кэшлэнэ — warm serverless invocation-ууд нэг клиентийг
// дахин ашиглаж, холболтын шуурга (connection storm)-ээс сэргийлнэ.
globalForPrisma.prisma = db