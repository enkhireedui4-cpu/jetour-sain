import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// Prisma-гийн өөрийн логийг унтраав. Алдааг дуудагч тал барьж, зөвхөн кодыг нь
// логлоно (safeErrorCode). lead-store P2002/P2034-ийг хэвийн retry гэж үздэг тул
// 'error' лог асаавал хуурамч алдаа цацагдана; 'query' лог lead-ийн утас зэрэг PII-г логонд оруулна.
export const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: [],
  })

// Бүх орчинд globalThis дээр кэшлэнэ — warm serverless invocation-ууд нэг клиентийг
// дахин ашиглаж, холболтын шуурга (connection storm)-ээс сэргийлнэ.
globalForPrisma.prisma = db