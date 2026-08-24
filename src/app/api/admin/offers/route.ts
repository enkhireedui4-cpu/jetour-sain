import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAdminSession } from "@/lib/admin-guard";

export async function GET() {
  const { error } = await requireAdminSession();
  if (error) return error;
  const offers = await db.promotion.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json({ ok: true, offers });
}

export async function POST(req: NextRequest) {
  const { error } = await requireAdminSession();
  if (error) return error;
  const body = await req.json();
  const { id, body: offerBody, specsJson, ...rest } = body;

  if (!id || typeof id !== "string") {
    return NextResponse.json({ ok: false, error: "id заавал бөглөнө үү" }, { status: 400 });
  }
  try {
    JSON.parse(specsJson || "[]");
  } catch {
    return NextResponse.json({ ok: false, error: "specs буруу JSON бүтэцтэй байна" }, { status: 400 });
  }
  const existing = await db.promotion.findUnique({ where: { id } });
  if (existing) {
    return NextResponse.json({ ok: false, error: "Ийм ID-тай санал өмнө нь бүртгэгдсэн байна" }, { status: 409 });
  }
  const created = await db.promotion.create({
    data: { id, body: offerBody ?? "[]", specsJson: specsJson || "[]", ...rest },
  });
  return NextResponse.json({ ok: true, offer: created });
}
