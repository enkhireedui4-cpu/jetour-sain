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
};

export default nextConfig;
