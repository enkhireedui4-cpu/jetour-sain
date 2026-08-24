import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAdminSession } from "@/lib/admin-guard";

type Params = { params: Promise<{ id: string }> };

export async function GET(_req: NextRequest, { params }: Params) {
  const { error } = await requireAdminSession();
  if (error) return error;
  const { id } = await params;
  const offer = await db.promotion.findUnique({ where: { id } });
  if (!offer) return NextResponse.json({ ok: false, error: "Олдсонгүй" }, { status: 404 });
  return NextResponse.json({ ok: true, offer });
}

export async function PUT(req: NextRequest, { params }: Params) {
  const { error } = await requireAdminSession();
  if (error) return error;
  const { id } = await params;
  const raw = await req.json();
  const { body: offerBody, specsJson, ...rest } = raw;

  if (specsJson !== undefined) {
    try {
      JSON.parse(specsJson || "[]");
    } catch {
      return NextResponse.json({ ok: false, error: "specs буруу JSON бүтэцтэй байна" }, { status: 400 });
    }
  }

  try {
    const updated = await db.promotion.update({
      where: { id },
      data: {
        ...rest,
        ...(offerBody !== undefined ? { body: offerBody } : {}),
        ...(specsJson !== undefined ? { specsJson } : {}),
      },
    });
    return NextResponse.json({ ok: true, offer: updated });
  } catch {
    return NextResponse.json({ ok: false, error: "Шинэчлэхэд алдаа гарлаа" }, { status: 400 });
  }
}

export async function DELETE(_req: NextRequest, { params }: Params) {
  const { error } = await requireAdminSession();
  if (error) return error;
  const { id } = await params;
  try {
    await db.promotion.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: "Устгахад алдаа гарлаа" }, { status: 400 });
  }
}
