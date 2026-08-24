import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAdminSession } from "@/lib/admin-guard";

export async function GET() {
  const { error } = await requireAdminSession();
  if (error) return error;
  const news = await db.newsArticle.findMany({ orderBy: { dateIso: "desc" } });
  return NextResponse.json({ ok: true, news });
}

export async function POST(req: NextRequest) {
  const { error } = await requireAdminSession();
  if (error) return error;
  const body = await req.json();
  if (!body.slug || typeof body.slug !== "string") {
    return NextResponse.json({ ok: false, error: "slug заавал бөглөнө үү" }, { status: 400 });
  }
  const existing = await db.newsArticle.findUnique({ where: { slug: body.slug } });
  if (existing) {
    return NextResponse.json({ ok: false, error: "Ийм slug-тай мэдээ өмнө нь бүртгэгдсэн байна" }, { status: 409 });
  }
  const created = await db.newsArticle.create({ data: body });
  return NextResponse.json({ ok: true, article: created });
}
