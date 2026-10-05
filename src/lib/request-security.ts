import { createHmac } from "node:crypto";
import { isIP } from "node:net";

export function privateKey(scope: string, value: string) {
  const secret = process.env.RATE_LIMIT_SECRET || process.env.NEXTAUTH_SECRET;
  if (!secret) throw new Error("Request security secret missing");
  return createHmac("sha256", secret).update(`${scope}:${value}`).digest("hex");
}
export function clientIp(headers: Headers | Record<string, string | string[] | undefined>) {
  const key = process.env.TRUSTED_IP_HEADER || "x-forwarded-for";
  const raw = headers instanceof Headers ? headers.get(key) : headers[key];
  const value = (Array.isArray(raw) ? raw[0] : raw)?.split(",")[0]?.trim();
  return value && isIP(value) ? value : "unknown";
}
export function safeErrorCode(error: unknown) {
  const code = error && typeof error === "object" && "code" in error ? String(error.code) : "";
  return /^[A-Z][A-Z0-9_]{1,30}$/.test(code) ? code : "UNAVAILABLE";
}
