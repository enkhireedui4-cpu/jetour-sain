import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAdminSession } from "@/lib/admin-guard";

type Params = { params: Promise<{ id: string }> };

export async function GET(_req: NextRequest, { params }: Params) {
  const { error } = await requireAdminSession();
  if (error) return error;
  const { id } = await params;
  const model = await db.carModel.findUnique({ where: { id } });
  if (!model) return NextResponse.json({ ok: false, error: "Олдсонгүй" }, { status: 404 });
  return NextResponse.json({ ok: true, model });
}

export async function PUT(req: NextRequest, { params }: Params) {
  const { error } = await requireAdminSession();
  if (error) return error;
  const { id } = await params;
  const body = await req.json();
  const { detailsJson, ...rest } = body;

  if (detailsJson !== undefined) {
    try {
      JSON.parse(detailsJson || "{}");
    } catch {
      return NextResponse.json({ ok: false, error: "detailsJson буруу JSON бүтэцтэй байна" }, { status: 400 });
    }
  }

  try {
    const updated = await db.carModel.update({
      where: { id },
      data: { ...rest, ...(detailsJson !== undefined ? { detailsJson } : {}) },
    });
    return NextResponse.json({ ok: true, model: updated });
  } catch {
    return NextResponse.json({ ok: false, error: "Шинэчлэхэд алдаа гарлаа" }, { status: 400 });
  }
}

export async function DELETE(_req: NextRequest, { params }: Params) {
  const { error } = await requireAdminSession();
  if (error) return error;
  const { id } = await params;
  try {
    await db.carModel.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: "Устгахад алдаа гарлаа" }, { status: 400 });
  }
}
