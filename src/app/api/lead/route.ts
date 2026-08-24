import { NextRequest, NextResponse } from "next/server";
import {
  getLeadValidationMessage,
  leadSchema,
  leadTypes,
  leadTypeLabels,
  type LeadPayload,
} from "@/lib/leads";
import { db } from "@/lib/db";

const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 5;
const rateMap = new Map<string, { count: number; firstAt: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateMap.get(ip);

  if (!entry || now - entry.firstAt > RATE_LIMIT_WINDOW_MS) {
    rateMap.set(ip, { count: 1, firstAt: now });
    return true;
  }

  if (entry.count >= RATE_LIMIT_MAX) return false;
  entry.count += 1;
  return true;
}

function errorResponse(error: string, status = 400) {
  return NextResponse.json({ ok: false, error }, { status });
}

/**
 * Гадаад CRM (hub) руу дамжуулах.
 *
 * `HUB_LEAD_URL` ба `HUB_LEAD_TOKEN` хоёуланг тохируулаагүй бол ЧИМЭЭГҮЙ
 * өнгөрнө — hub тал бэлэн болоход `.env`-д хоёр мөр нэмэхэд шууд ажиллаж
 * эхэлнэ, код хөндөх шаардлагагүй.
 *
 * Дамжуулах бие нь `leadSchema`-ийн талбаруудыг ЯГ ТЭР нэрээр явуулна —
 * hub тал тэр гэрээгээр хүлээн авахаар бүтээгдэж байгаа. Тиймээс энд
 * талбарын нэрийг дахин зохиохгүй.
 */
async function sendToHub(lead: LeadPayload): Promise<{ ok: boolean; error?: string }> {
  const url = process.env.HUB_LEAD_URL;
  const token = process.env.HUB_LEAD_TOKEN;
  if (!url || !token) return { ok: false, error: "not configured" };

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Django REST Framework-ийн TokenAuthentication хэлбэр
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify({ ...lead, createdAt: new Date().toISOString() }),
      // Hub удаан хариулбал хэрэглэгчийн формыг барихгүй
      signal: AbortSignal.timeout(8000),
    });

    if (!res.ok) {
      return { ok: false, error: `hub ${res.status}: ${(await res.text()).slice(0, 200)}` };
    }
    return { ok: true };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "Unknown error" };
  }
}

/**
 * Лийд хүлээн авах.
 *
 * Хадгалалт (DB) нь ГОЛ — гадаад дамжуулалт унасан ч лийд хаяхгүй. Хоёрыг
 * ЗЭРЭГ (`Promise.allSettled`) явуулна: өмнө нь дараалан `await` хийдэг тул
 * гадаад хүлээн авагч бүр хэрэглэгчийн хүлээх хугацааг нэмдэг байв.
 */
export async function POST(req: NextRequest) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    "unknown";

  if (!checkRateLimit(ip)) {
    return errorResponse("Too many requests. Please try again in one minute.", 429);
  }

  let rawBody: unknown;
  try {
    rawBody = await req.json();
  } catch {
    return errorResponse("Invalid JSON payload");
  }

  const parsed = leadSchema.safeParse(rawBody);
  if (!parsed.success) {
    return errorResponse(getLeadValidationMessage(parsed.error));
  }

  const lead = parsed.data;
  console.log(`[LEAD] ${lead.type} — ${lead.name} (${lead.phone})`);

  const [dbResult, hubResult] = await Promise.allSettled([
    db.lead.create({
      data: {
        name: lead.name,
        phone: lead.phone,
        email: lead.email || null,
        modelId: null,
        modelName: lead.model || null,
        message: [
          leadTypeLabels[lead.type] ?? lead.type,
          lead.message,
          lead.branch ? "Салбар: " + lead.branch : null,
        ]
          .filter(Boolean)
          .join(" | "),
        source: lead.type,
      },
    }),
    sendToHub(lead),
  ]);

  const saved = dbResult.status === "fulfilled";
  if (!saved) {
    console.error("[LEAD] DB-д хадгалахад алдаа гарлаа:", dbResult.reason);
  }

  const hub = hubResult.status === "fulfilled" && hubResult.value.ok;
  if (!hub && process.env.HUB_LEAD_URL) {
    console.warn(
      "[LEAD] Hub руу дамжуулж чадсангүй:",
      hubResult.status === "fulfilled" ? hubResult.value.error : hubResult.reason
    );
  }

  return NextResponse.json({
    ok: true,
    message: "Хүсэлт амжилттай хүлээн авлаа.",
    saved,
    hub,
  });
}

export async function GET() {
  return NextResponse.json({
    ok: true,
    endpoint: "/api/lead",
    methods: ["POST"],
    types: leadTypes,
  });
}
