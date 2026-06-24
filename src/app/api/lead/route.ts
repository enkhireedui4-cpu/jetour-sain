// API route: Lead capture (test drive, info request, financing, owners)
// Илгээх замууд:
//   1. Telegram bot (TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID env var байгаа үед)
//   2. Console log (fallback — env var байхгүй үед)
// Rate limiting: энгийн in-memory (IP бүр 60с хүртэл 5 хүсэлт)

import { NextRequest, NextResponse } from "next/server";

type LeadType = "test-drive" | "info-request" | "financing" | "service" | "parts" | "general";

type LeadPayload = {
  type: LeadType;
  name: string;
  phone: string;
  email?: string;
  model?: string;
  branch?: string;
  date?: string;
  time?: string;
  contactMethod?: "call" | "messenger" | "whatsapp";
  message?: string;
  // financing-specific
  vehiclePrice?: number;
  downPayment?: number;
  termMonths?: number;
  interestRate?: number;
  monthlyPayment?: number;
};

// === In-memory rate limiting (simple, per-IP, 5 req / 60s) ===
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
  entry.count++;
  return true;
}

// === Telegram message formatter ===
function formatTelegramMessage(p: LeadPayload): string {
  const lines: string[] = [];
  const typeLabels: Record<LeadType, string> = {
    "test-drive": "🚗 Тест драйв",
    "info-request": "ℹ️ Мэдээлэл хүсэлт",
    financing: "💰 Зээлийн өргөдөл",
    service: "🔧 Засвар үйлчилгээ",
    parts: "📦 Сэлбэг захиалга",
    general: "📝 Ерөнхий хүсэлт",
  };

  lines.push(`*${typeLabels[p.type] ?? "📝 Хүсэлт"}*`);
  lines.push("");
  lines.push(`👤 Нэр: ${p.name}`);
  lines.push(`📞 Утас: ${p.phone}`);
  if (p.email) lines.push(`✉️ И-мэйл: ${p.email}`);
  if (p.model) lines.push(`🚙 Загвар: ${p.model}`);
  if (p.branch) lines.push(`🏪 Салбар: ${p.branch}`);
  if (p.date) lines.push(`📅 Огноо: ${p.date}`);
  if (p.time) lines.push(`🕐 Цаг: ${p.time}`);
  if (p.contactMethod) {
    const cm =
      p.contactMethod === "call"
        ? "Утасны дуудлага"
        : p.contactMethod === "messenger"
        ? "Messenger"
        : "WhatsApp";
    lines.push(`💬 Харилцах хэрэгсэл: ${cm}`);
  }
  if (p.message) lines.push(`\n💬 Зурвас: ${p.message}`);
  if (p.vehiclePrice) lines.push(`\n💰 Машины үнэ: ${p.vehiclePrice.toLocaleString()} ₮`);
  if (p.downPayment) lines.push(`💵 Урьдчилгаа: ${p.downPayment.toLocaleString()} ₮`);
  if (p.termMonths) lines.push(`📆 Хугацаа: ${p.termMonths} сар`);
  if (p.interestRate) lines.push(`📊 Хүү: ${p.interestRate}%`);
  if (p.monthlyPayment)
    lines.push(`💸 Сарын төлөлт: ${p.monthlyPayment.toLocaleString()} ₮`);

  return lines.join("\n");
}

async function sendToTelegram(text: string): Promise<{ ok: boolean; error?: string }> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) {
    return { ok: false, error: "TELEGRAM_BOT_TOKEN эсвэл TELEGRAM_CHAT_ID env var тохируулаагүй" };
  }
  try {
    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: "Markdown",
      }),
    });
    if (!res.ok) {
      const errText = await res.text();
      return { ok: false, error: `Telegram API ${res.status}: ${errText}` };
    }
    return { ok: true };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "Unknown error" };
  }
}

// === POST handler ===
export async function POST(req: NextRequest) {
  // Rate limit
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    "unknown";
  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { ok: false, error: "Хэт олон хүсэлт. 1 минутын дараа дахин оролдоно уу." },
      { status: 429 }
    );
  }

  let body: LeadPayload;
  try {
    body = (await req.json()) as LeadPayload;
  } catch {
    return NextResponse.json({ ok: false, error: "JSON буруу форматтай" }, { status: 400 });
  }

  // Basic validation
  if (!body.name || !body.phone) {
    return NextResponse.json(
      { ok: false, error: "Нэр болон утас заавал шаардлагатай" },
      { status: 400 }
    );
  }
  const digits = body.phone.replace(/\D/g, "");
  if (digits.length < 7 || digits.length > 12) {
    return NextResponse.json({ ok: false, error: "Утасны дугаар буруу" }, { status: 400 });
  }

  const message = formatTelegramMessage(body);

  // Console log (always — for server-side debugging)
  console.log(`[LEAD] ${body.type} from ${body.name} (${body.phone})`);
  console.log(message);

  // Try Telegram
  const tgResult = await sendToTelegram(message);
  if (!tgResult.ok) {
    console.warn(`[LEAD] Telegram илгээхэд асуудал: ${tgResult.error}`);
    // Lead хадгалагдсан гэж client-д хариулна (console log-д байгаа)
  }

  return NextResponse.json({
    ok: true,
    message: "Хүсэлт амжилттай хүлээн авлаа.",
    delivered: tgResult.ok,
  });
}

export async function GET() {
  return NextResponse.json({
    ok: true,
    endpoint: "/api/lead",
    methods: ["POST"],
    types: ["test-drive", "info-request", "financing", "service", "parts", "general"],
  });
}
