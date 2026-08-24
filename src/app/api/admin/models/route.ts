import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAdminSession } from "@/lib/admin-guard";

export async function GET() {
  const { error } = await requireAdminSession();
  if (error) return error;
  const models = await db.carModel.findMany({ orderBy: { order: "asc" } });
  return NextResponse.json({ ok: true, models });
}

export async function POST(req: NextRequest) {
  const { error } = await requireAdminSession();
  if (error) return error;

  const body = await req.json();
  const { id, detailsJson, ...rest } = body;

  if (!id || typeof id !== "string") {
    return NextResponse.json({ ok: false, error: "id заавал бөглөнө үү" }, { status: 400 });
  }

  try {
    JSON.parse(detailsJson || "{}");
  } catch {
    return NextResponse.json({ ok: false, error: "detailsJson буруу JSON бүтэцтэй байна" }, { status: 400 });
  }

  const existing = await db.carModel.findUnique({ where: { id } });
  if (existing) {
    return NextResponse.json({ ok: false, error: "Ийм ID-тай загвар өмнө нь бүртгэгдсэн байна" }, { status: 409 });
  }

  const created = await db.carModel.create({
    data: { id, detailsJson: detailsJson || "{}", ...rest },
  });
  return NextResponse.json({ ok: true, model: created });
}
