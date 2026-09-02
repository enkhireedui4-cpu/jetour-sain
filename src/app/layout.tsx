import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { FloatingCTA } from "@/components/jetour/floating-cta";
import { QuickLead } from "@/components/jetour/quick-lead";
import { MetaPixel } from "@/components/jetour/meta-pixel";
import { GoogleAnalytics } from "@/components/jetour/google-analytics";
import { SITE_URL } from "@/lib/site";
import { dealerGraph } from "@/lib/schema";
import { JsonLd } from "@/components/jetour/json-ld";

// Нэг font family — Inter. Монгол кирилл (ө, ү, ё) цэвэр, цэгтэй, уншигдахуйц.
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "cyrillic"],
  /* 300 (light) хасав — кодод 0 удаа хэрэглэгдсэн (font-light ч,
     font-weight: 300 ч алга). Хоёр фонтын файл дэмий татагдаж байв. */
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});


export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "JETOUR — Албан ёсны дистрибьютор SAIN MOTORS",
    template: "%s | JETOUR",
  },
  description:
    "JETOUR — Монгол дахь албан ёсны дистрибьютор Сайн Моторс ХХК. X70 Plus, X1, X50, T1, T2 загварууд. Шоурум Чингэлтэй дүүрэгт, үйлчилгээний төв ТЭЦ-4-ийн орчимд. Тест драйв, борлуулалт, баталгаат засвар. Утас: 7277-8855, 8910-0274",
  keywords: [
    /* Хайлтын түлхүүр үг — ХАРАГДАХ бичиг биш. Хүмүүс яг «JETOUR
       Mongolia» гэж хайдаг тул үүнийг хасахгүй. */
    "JETOUR Mongolia",
    "JETOUR",
    "Jetour Монгол",
    "Сайн Моторс",
    "Sain Motors",
    "Jetour X70 Plus",
    "Jetour X1",
    "Jetour X50",
    "Jetour T1",
    "SUV Монгол",
    "автомашин Улаанбаатар",
    "машин зээл",
    "тест драйв",
    /* Орон нутгийн хайлт — «хаана байдаг», «засвар» гэсэн санаа. Хүмүүс
       брэндийн нэрээр төдийгүй хэрэгцээгээрээ хайдаг. */
    "JETOUR шоурум",
    "JETOUR үйлчилгээний төв",
    "JETOUR засвар",
    "JETOUR сэлбэг",
  ],
  authors: [{ name: "Sain Motors" }],
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
  /**
   * Google Search Console — meta tag баталгаажуулалт.
   *
   * Утга нь Vercel-ийн орчны хувьсагчаас ирнэ. Тохируулаагүй бол Next нь
   * тагийг огт гаргахгүй тул локал/preview дээр хог үлдэхгүй. Кодыг дахин
   * засах шаардлагагүй — env тавиад Redeploy хийхэд л хангалттай.
   * Заавар: `docs/seo/seo-local.md`.
   */
  verification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION }
    : undefined,
  openGraph: {
    title: "JETOUR — Албан ёсны дистрибьютор SAIN MOTORS",
    description:
      "JETOUR Travel+ загварууд — Монголд албан ёсоор. Тест драйв, борлуулалт, үйлчилгээ.",
    siteName: "JETOUR",
    type: "website",
    locale: "mn_MN",
    url: "/",
    images: [
      {
        url: "/models-hero/x70-plus.jpg",
        width: 1772,
        height: 1772,
        alt: "JETOUR X70 Plus — SAIN MOTORS",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "JETOUR — SAIN MOTORS",
    description: "JETOUR Travel+ загварууд — Монголд албан ёсоор.",
    images: ["/models-hero/x70-plus.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="mn" suppressHydrationWarning>
      <head>
        {/* Гуравдагч origin-уудтай холболтыг урьдчилан бэлтгэнэ — газрын зураг, pixel
            ачаалагдах үедээ хүлээлгэхгүй (эхний зурагтай өрсөлдөхгүй). */}
        <link rel="dns-prefetch" href="https://www.google.com" />
        <link rel="dns-prefetch" href="https://maps.google.com" />
        <link rel="dns-prefetch" href="https://connect.facebook.net" />
      </head>
      <body
        className={`${inter.variable} antialiased bg-white text-[#17181B]`}
      >
        {/* Дилер + үйлчилгээний төв + вэбсайт — `src/lib/schema.ts`-ээс.
            Хаяг, ажлын цаг, координат нь `branches.ts`-ээс шууд ирнэ тул
            салбарын мэдээлэл зассан газраасаа Google руу дамжина. */}
        <JsonLd data={dealerGraph()} />
        <a href="#main-content" className="skip-link">
          Үндсэн агуулга руу шилжих
        </a>
        <MetaPixel />
        {/* GA4 — NEXT_PUBLIC_GA_MEASUREMENT_ID тохируулаагүй бол юу ч ачаалахгүй */}
        <GoogleAnalytics />
        {children}
        <FloatingCTA />
        {/* Хурдан хүсэлтийн цонх — сайтын аль ч товч `openQuickLead()`-оор
            дуудна. НЭГ л удаа холбогдоно. */}
        <QuickLead />
        <Toaster />
      </body>
    </html>
  );
}
