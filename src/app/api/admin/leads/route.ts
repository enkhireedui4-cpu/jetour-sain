import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAdminSession } from "@/lib/admin-guard";

export async function GET() {
  const { error } = await requireAdminSession();
  if (error) return error;
  const leads = await db.lead.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json({ ok: true, leads });
}
