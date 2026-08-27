import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { FloatingCTA } from "@/components/jetour/floating-cta";
import { QuickLead } from "@/components/jetour/quick-lead";
import { MetaPixel } from "@/components/jetour/meta-pixel";
import { GoogleAnalytics } from "@/components/jetour/google-analytics";
import { SITE_URL } from "@/lib/site";

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
    "JETOUR — албан ёсны дистрибьютор Сайн Моторс. X70 Plus, X1, X50, T1 загварууд. Тест драйв, борлуулалт, үйлчилгээ. Утас: 7277-8855, 8910-0274",
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
  ],
  authors: [{ name: "Sain Motors" }],
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
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

// Google-д зориулсан бүтэцтэй өгөгдөл — автомашины дилер
const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "AutoDealer",
  name: "SAIN MOTORS — JETOUR",
  legalName: "Сайн Моторс ХХК",
  url: SITE_URL,
  logo: `${SITE_URL}/logos/sain-motors-black.png`,
  image: `${SITE_URL}/models-hero/x70-plus.jpg`,
  telephone: "+976-7277-8855",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Улаанбаатар",
    addressCountry: "MN",
    streetAddress: "Чингэлтэй дүүрэг, Holiday Inn",
  },
  sameAs: [
    "https://www.facebook.com/Sainmotors.mn",
    "https://www.instagram.com/sainmotors.mn/",
    "https://www.youtube.com/@SainMotors",
  ],
  brand: { "@type": "Brand", name: "JETOUR" },
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
        />
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
