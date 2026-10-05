// src/lib/auth.ts
// NextAuth (v4) тохиргоо — Credentials provider, JWT session.
//
// Ганц админ — ОРЧНЫ ХУВЬСАГЧААР тодорхойлогдоно:
//   ADMIN_USERNAME       — нэвтрэх нэр
//   ADMIN_PASSWORD_HASH  — нууц үгийн bcrypt хэш (`npm run admin:hash`)
//
// ЯАГААД өгөгдлийн сан биш: өмнө нь админ `AdminUser` хүснэгтэд seed-ээр
// үүсдэг байсан; seed устаж production-д хүснэгт хоосон үлдсэн нь нэвтрэх
// боломжгүй болгосон. Нэг админд хүснэгт, seed, migration шаардлагагүй —
// нууц үг солих нь хостинг дээр нэг утга солиод redeploy хийхэд л хангалттай.
// Тохиргоо дутуу эсвэл буруу бол нэвтрэлт ХААЛТТАЙ (fail closed).
import type { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { consumeRateLimit } from "@/lib/rate-limit";
import { clientIp, safeErrorCode } from "@/lib/request-security";
import bcrypt from "bcryptjs";

/** bcrypt хэш мөн эсэх — энгийн нууц үгийг хэш гэж андуурч тавьсан бол хаана */
const BCRYPT = /^\$2[aby]\$\d{2}\$[./A-Za-z0-9]{53}$/;

function adminConfig(): { username: string; hash: string } | null {
  const username = process.env.ADMIN_USERNAME?.trim();
  const hash = process.env.ADMIN_PASSWORD_HASH?.trim();
  if (!username || !hash || !BCRYPT.test(hash)) return null;
  return { username, hash };
}

export const authOptions: AuthOptions = {
  session: { strategy: "jwt" },
  pages: {
    signIn: "/admin/login",
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        username: { label: "Нэвтрэх нэр", type: "text" },
        password: { label: "Нууц үг", type: "password" },
      },
      async authorize(credentials, request) {
        if (!credentials?.username || !credentials?.password) return null;

        if (credentials.username.length > 100 || credentials.password.length > 256) return null;
        const admin = adminConfig();
        if (!admin) {
          console.error("[AUTH] admin not configured (ADMIN_USERNAME / ADMIN_PASSWORD_HASH)");
          return null;
        }
        try {
          const ipLimit = await consumeRateLimit("login-ip", clientIp(request.headers || {}), 20, 900000);
          if (!ipLimit.allowed) return null;
          const accountLimit = await consumeRateLimit("login-account", credentials.username, 10, 900000);
          if (!accountLimit.allowed) return null;

          /* Нэр буруу ч bcrypt-ийг ажиллуулна — хариуны хугацаагаар нэр
             таах боломжгүй болгоно. */
          const valid = await bcrypt.compare(credentials.password, admin.hash);
          if (!valid || credentials.username !== admin.username) return null;

          return { id: "admin", name: admin.username };
        } catch (error) { console.error("[AUTH] unavailable", safeErrorCode(error)); return null; }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as { id?: string }).id = token.id as string | undefined;
        session.user.name = token.name as string | undefined;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
