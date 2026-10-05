import { createHash, timingSafeEqual } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import { retryPendingHubLeads } from "@/lib/hub-delivery";
import { safeErrorCode } from "@/lib/request-security";
export async function GET(request: NextRequest) {
  const secret = process.env.CRON_SECRET;
  const supplied = request.headers.get("authorization") || "";
  const digest = (value: string) => createHash("sha256").update(value).digest();
  if (!secret || !timingSafeEqual(digest(supplied), digest(`Bearer ${secret}`))) return NextResponse.json({ ok: false }, { status: 401 });
  try { return NextResponse.json({ ok: true, attempted: await retryPendingHubLeads() }); }
  catch (error) { console.error("[HUB] retry failed", safeErrorCode(error)); return NextResponse.json({ ok: false }, { status: 503 }); }
}
