import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { FloatingCTA } from "@/components/jetour/floating-cta";
import { MetaPixel } from "@/components/jetour/meta-pixel";

// Нэг font family — Inter. Монгол кирилл (ө, ү, ё) цэвэр, цэгтэй, уншигдахуйц.
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

// Deploy үед .env-д NEXT_PUBLIC_SITE_URL=https://танай-домэйн.mn гэж тохируулна
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://jetour.mn";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "JETOUR Mongolia — Албан ёсны дистрибьютер SAIN MOTORS",
    template: "%s | JETOUR Mongolia",
  },
  description:
    "JETOUR — албан ёсны дистрибьютер Сайн Моторс. X70 Plus, X1, X50, T1 загварууд. Тест драйв, борлуулалт, үйлчилгээ. Утас: 7277-8855, 8910-0274",
  keywords: [
    "JETOUR Mongolia",
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
    title: "JETOUR Mongolia — Албан ёсны дистрибьютер SAIN MOTORS",
    description:
      "JETOUR Travel+ загварууд — Монголд албан ёсоор. Тест драйв, борлуулалт, үйлчилгээ.",
    siteName: "JETOUR Mongolia",
    type: "website",
    locale: "mn_MN",
    url: "/",
    images: [
      {
        url: "/models-hero/x70-plus.jpg",
        width: 2048,
        height: 2048,
        alt: "JETOUR X70 Plus — SAIN MOTORS",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "JETOUR Mongolia — SAIN MOTORS",
    description: "JETOUR Travel+ загварууд — Монголд албан ёсоор.",
    images: ["/models-hero/x70-plus.jpg"],
  },
};

// Google-д зориулсан бүтэцтэй өгөгдөл — автомашины дилер
const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "AutoDealer",
  name: "SAIN MOTORS — JETOUR Mongolia",
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
      <body
        className={`${inter.variable} antialiased bg-white text-[#17181B]`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
        />
        <MetaPixel />
        {children}
        <FloatingCTA />
        <Toaster />
      </body>
    </html>
  );
}
