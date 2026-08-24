import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAdminSession } from "@/lib/admin-guard";

type Params = { params: Promise<{ id: string }> };

export async function GET(_req: NextRequest, { params }: Params) {
  const { error } = await requireAdminSession();
  if (error) return error;
  const { id } = await params;
  const article = await db.newsArticle.findUnique({ where: { id } });
  if (!article) return NextResponse.json({ ok: false, error: "Олдсонгүй" }, { status: 404 });
  return NextResponse.json({ ok: true, article });
}

export async function PUT(req: NextRequest, { params }: Params) {
  const { error } = await requireAdminSession();
  if (error) return error;
  const { id } = await params;
  const body = await req.json();
  try {
    const updated = await db.newsArticle.update({ where: { id }, data: body });
    return NextResponse.json({ ok: true, article: updated });
  } catch {
    return NextResponse.json({ ok: false, error: "Шинэчлэхэд алдаа гарлаа" }, { status: 400 });
  }
}

export async function DELETE(_req: NextRequest, { params }: Params) {
  const { error } = await requireAdminSession();
  if (error) return error;
  const { id } = await params;
  try {
    await db.newsArticle.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: "Устгахад алдаа гарлаа" }, { status: 400 });
  }
}
