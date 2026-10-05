import { NextRequest, NextResponse, after } from "next/server";
import { getLeadValidationMessage, leadSchema, leadTypes } from "@/lib/leads";
import { consumeRateLimit } from "@/lib/rate-limit";
import { clientIp, safeErrorCode } from "@/lib/request-security";
import { submitLead } from "@/lib/lead-store";
import { deliverHubLead } from "@/lib/hub-delivery";

export async function POST(req: NextRequest) {
  try {
    const limit = await consumeRateLimit("lead", clientIp(req.headers), 5, 60000);
    if (!limit.allowed) return NextResponse.json({ ok: false, error: "Хүсэлтийн хязгаарт хүрлээ. Түр хүлээгээд дахин оролдоно уу." }, { status: 429, headers: { "Retry-After": String(limit.retryAfter) } });
    const reader = req.body?.getReader();
    if (!reader) return NextResponse.json({ ok: false, error: "Хүсэлт хоосон байна." }, { status: 400 });
    const chunks: Uint8Array[] = [];
    let size = 0;
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > 16384) { await reader.cancel(); return NextResponse.json({ ok: false, error: "Хүсэлтийн хэмжээ хэт их байна." }, { status: 413 }); }
      chunks.push(value);
    }
    let body: unknown;
    try { body = JSON.parse(Buffer.concat(chunks).toString("utf8")); }
    catch { return NextResponse.json({ ok: false, error: "Хүсэлтийн бүтэц буруу байна." }, { status: 400 }); }
    const parsed = leadSchema.safeParse(body);
    if (!parsed.success) return NextResponse.json({ ok: false, error: getLeadValidationMessage(parsed.error) }, { status: 422 });
    const saved = await submitLead(parsed.data);
    if (saved.hubStatus === "pending") {
      try { after(async () => { try { await deliverHubLead(saved.id); } catch (error) { console.error("[HUB] deferred delivery", safeErrorCode(error)); } }); }
      catch (error) { console.error("[HUB] scheduling", safeErrorCode(error)); }
    }
    return NextResponse.json({ ok: true, saved: true, duplicate: saved.duplicate, hubStatus: saved.hubStatus, message: "Хүсэлтийг амжилттай хүлээн авлаа." });
  } catch (error) {
    console.error("[LEAD] storage unavailable", safeErrorCode(error));
    return NextResponse.json({ ok: false, saved: false, error: "Хүсэлтийг хадгалж чадсангүй. Түр хүлээгээд дахин оролдоно уу." }, { status: 503 });
  }
}
export async function GET() { return NextResponse.json({ ok: true, endpoint: "/api/lead", methods: ["POST"], types: leadTypes }); }
