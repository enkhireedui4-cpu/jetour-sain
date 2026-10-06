import type { Prisma, PrismaClient } from "@prisma/client";
import { z } from "zod";
import { db } from "@/lib/db";

export const leadQuerySchema = z.object({
  page: z.coerce.number().int().min(1).max(1000000).default(1),
  pageSize: z.coerce.number().int().min(1).max(100).default(25),
  status: z.preprocess(value => value === "" ? undefined : value, z.enum(["new", "contacted", "closed"]).optional()),
  q: z.string().trim().max(100).optional(),
});

export async function getLeadPage(input: unknown, database: Pick<PrismaClient, "lead"> = db) {
  const query = leadQuerySchema.parse(input);
  const where: Prisma.LeadWhereInput = {
    ...(query.status ? { status: query.status } : {}),
    ...(query.q ? { OR: ["name", "phone", "email", "modelName"].map(field => ({ [field]: { contains: query.q } })) } : {}),
  };
  const total = await database.lead.count({ where });
  const totalPages = Math.max(1, Math.ceil(total / query.pageSize));
  const page = Math.min(query.page, totalPages);
  const leads = await database.lead.findMany({
    where,
    orderBy: [{ createdAt: "desc" }, { id: "desc" }],
    take: query.pageSize,
    skip: (page - 1) * query.pageSize,
    select: { id: true, name: true, phone: true, email: true, modelId: true, modelName: true, message: true, source: true, status: true, createdAt: true },
  });
  return { leads, pagination: { page, pageSize: query.pageSize, total, totalPages }, query };
}
