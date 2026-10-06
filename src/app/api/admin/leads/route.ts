import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";
import { getLeadPage } from "@/lib/lead-pagination";
import { safeErrorCode } from "@/lib/request-security";
import { requireAdminSession } from "@/lib/admin-guard";

export async function GET(request: NextRequest) {
  const { error } = await requireAdminSession();
  if (error) return error;
  try {
    const { leads, pagination } = await getLeadPage(Object.fromEntries(request.nextUrl.searchParams));
    return NextResponse.json({ ok: true, leads, pagination }, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    if (error instanceof ZodError) return NextResponse.json({ ok: false, error: "Хайлтын нөхцөлөө шалгана уу." }, { status: 400 });
    console.error("[ADMIN] leads unavailable", safeErrorCode(error));
    return NextResponse.json({ ok: false, error: "Хүсэлтүүдийг ачаалж чадсангүй." }, { status: 503 });
  }
}
