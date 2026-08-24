import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAdminSession } from "@/lib/admin-guard";

type Params = { params: Promise<{ id: string }> };

export async function PATCH(req: NextRequest, { params }: Params) {
  const { error } = await requireAdminSession();
  if (error) return error;
  const { id } = await params;
  const { status } = await req.json();
  if (!["new", "contacted", "closed"].includes(status)) {
    return NextResponse.json({ ok: false, error: "Буруу статус" }, { status: 400 });
  }
  try {
    const updated = await db.lead.update({ where: { id }, data: { status } });
    return NextResponse.json({ ok: true, lead: updated });
  } catch {
    return NextResponse.json({ ok: false, error: "Шинэчлэхэд алдаа гарлаа" }, { status: 400 });
  }
}
