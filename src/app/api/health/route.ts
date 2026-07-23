import { NextResponse } from "next/server";
import { db } from "@/lib/db";

// Ops health probe (Phase 7A). Never cached — always reflects live state.
// Used by: external uptime monitor, Docker HEALTHCHECK, deploy smoke test.
// 200 = app process up AND database reachable; 503 = DB unreachable.
// Returns only non-sensitive status fields.
export const dynamic = "force-dynamic";

export async function GET() {
  const startedAt = Date.now();
  try {
    // Lightweight round-trip; valid on both SQLite (dev) and PostgreSQL (prod).
    await db.$queryRaw`SELECT 1`;
    return NextResponse.json(
      {
        status: "ok",
        db: "up",
        uptimeSec: Math.round(process.uptime()),
        latencyMs: Date.now() - startedAt,
        ts: new Date().toISOString(),
      },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch {
    // Do not leak the DB error detail to a public probe.
    return NextResponse.json(
      { status: "error", db: "down", ts: new Date().toISOString() },
      { status: 503, headers: { "Cache-Control": "no-store" } },
    );
  }
}
