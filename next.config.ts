import type { NextConfig } from "next";
import { fileURLToPath } from "node:url";
import { dirname } from "node:path";

const nextConfig: NextConfig = {
  /**
   * `standalone` нь ЗӨВХӨН өөрөө host хийхэд (VPS) хэрэгтэй.
   *
   * Vercel дээр тэр нь шаардлагагүй бөгөөд Vercel өөрөө serverless функц болгон
   * багцалдаг тул зөрчилддөг. `VERCEL` орчны хувьсагчийг Vercel автоматаар
   * тавьдаг — иймд нэг л config хоёуланд ажиллана.
   */
  ...(process.env.VERCEL ? {} : { output: "standalone" as const }),
  /**
   * Standalone гаралтын үүрийг ТӨСЛИЙН фолдер гэж тодорхой зааж өгнө.
   *
   * Үүнгүйгээр Next нь дээд талын фолдероос lockfile хайж үүрийг таамагладаг
   * бөгөөд энэ төсөл дээр `C:\Users\Administrator`-г үүр гэж үзсэн. Үр дүнд нь
   * сервер `.next/standalone/Desktop/JetourMongolia/server.js` гэж гүн үүрлэж,
   *   • `npm start`-ын зам буруу болж,
   *   • static/public нь серверийн хажууд биш ГАДНА талд хуулагдаж,
   *     улмаар CSS/JS/зураг ачаалагдахгүй болно.
   * Энэ мөр нь гаралтыг `.next/standalone/server.js` болгож тэгшилнэ.
   */
  outputFileTracingRoot: dirname(fileURLToPath(import.meta.url)),
  /**
   * Төрлийн алдааг build дээр НУУХГҮЙ.
   *
   * Өмнө `true` байсан нь алдаатай код чимээгүй production руу гарах эрсдэл
   * үүсгэдэг байв. `tsc --noEmit` одоо цэвэр тул унтраахад аюулгүй.
   */
  typescript: {
    ignoreBuildErrors: false,
  },
  reactStrictMode: false,
  poweredByHeader: false,
  // Хөгжүүлэлтийн үеийн зүүн доод булангийн "N" тэмдэг — зөвхөн dev дээр
  // харагддаг ч контентыг таглаж, дизайны алдаа мэт ойлгогдож байсан тул унтраав.
  devIndicators: false,
  // Орчин үеийн зургийн формат — next/image ашиглах үед AVIF/WebP автоматаар
  // хүргэж, файлын хэмжээг ихээхэн бууруулна.
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [360, 420, 640, 768, 1024, 1280, 1600, 1920],
    imageSizes: [64, 96, 128, 256, 384],
  },
  /**
   * `/test-drive` → `/info-request`.
   *
   * Тест драйвын тусдаа хуудсыг хассан (нэгдсэн нэг маягт болов). Гэхдээ
   * ЗҮГЭЭР УСТГАЖ БОЛОХГҮЙ: Meta реклам, хуучин линк, bookmark, гадаад сайтын
   * холбоос тэр хаяг руу заасан байж магадгүй — 404 болбол реклам эргэлт
   * тасарна. 308 (permanent) нь хайлтын системд ч шинэ хаягийг өвлүүлнэ.
   */
  async redirects() {
    return [{ source: "/test-drive", destination: "/info-request", permanent: true }];
  },

  /**
   * Аюулгүй байдлын суурь HTTP header-үүд — бүх зам дээр.
   *
   * Эдгээр нь сайтын ажиллагааг ХӨНДӨХГҮЙ, гэхдээ түгээмэл халдлагын
   * гадаргууг хаана:
   *   · X-Frame-Options — clickjacking (сайтыг гадны iframe-д оруулахыг хорих)
   *   · X-Content-Type-Options — MIME sniffing халдлага
   *   · Referrer-Policy — гадаад сайт руу бүтэн URL алдагдахаас сэргийлнэ
   *   · Strict-Transport-Security — HTTPS-ийг албадах (HSTS). Vercel бүхэлдээ
   *     HTTPS тул аюулгүй. `includeSubDomains`/`preload` ЗОРИУДААР ОРООГҮЙ —
   *     тэдгээр нь бүх дэд домэйн HTTPS болохыг шаардах бөгөөд буцаахад хэцүү.
   *   · Permissions-Policy — ашиглагддаггүй хөтчийн эрхийг (камер, микрофон,
   *     байршил) бүрэн хаана.
   *
   * ⚠️ Content-Security-Policy энд ОРООГҮЙ: сайт Meta Pixel, GA, Google Fonts
   * ашигладаг тул зөв allowlist шаардана. Буруу CSP production-ыг чимээгүй
   * эвдэнэ — тиймээс тусад нь, эхлээд `Content-Security-Policy-Report-Only`
   * горимоор турших ёстой (дараагийн алхам).
   */
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          /**
           * CSP — ENFORCING горимд (зөрчлийг бодитоор БЛОКЛОНО).
           *
           * Эхлээд Report-Only горимоор production build (`next start`) дээр
           * гурван төрлийн хуудсанд (нүүр+Pixel+GA, загвар, мэдээ) туршиж,
           * зөрчил ТЭГ гарсны дараа энэ горимд шилжүүлэв. (Dev дэх `eval`
           * зөрчил нь зөвхөн HMR-ийнх — production-д байхгүй.)
           *
           * Allowlist — сайтын бодит гуравдагч эх сурвалжаас гаргасан:
           *   · script  — Meta Pixel (connect.facebook.net), GA (gtag)
           *   · img     — Meta pixel (facebook.com), GA цуглуулга
           *   · connect — GA/gtag beacon (google-analytics бүс + gtm)
           *   · font    — 'self' л хангалттай: next/font Inter-ийг build үед
           *               татаж, өөрийн origin-оос үйлчилдэг (Google руу хандахгүй)
           *
           * 'unsafe-inline' (script/style): Next.js hydration, Meta/GA-ийн
           * inline bootstrap, framer-motion-ийн inline style бүгд inline тул
           * шаардлагатай. Nonce суурьтай ЧАНГА CSP нь middleware өөрчлөлт
           * шаардах томоохон ажил — тусдаа алхам.
           *
           * ⚠️ ШИНЭ гуравдагч үйлчилгээ (шинэ analytics, chat widget, video
           * embed г.м.) нэмбэл ЭНЭ allowlist-д тухайн домэйнийг мөн нэмэх ёстой
           * — эс бөгөөс CSP түүнийг блоклож, чимээгүй ажиллахгүй болно.
           */
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' https://connect.facebook.net https://www.googletagmanager.com",
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data: blob: https://www.facebook.com https://www.google-analytics.com https://www.googletagmanager.com",
              "font-src 'self' data:",
              "connect-src 'self' https://www.google-analytics.com https://region1.google-analytics.com https://www.googletagmanager.com https://connect.facebook.net",
              "frame-ancestors 'self'",
              "base-uri 'self'",
              "form-action 'self'",
              "object-src 'none'",
            ].join("; "),
          },
        ],
      },
    ];
  },
};

export default nextConfig;
