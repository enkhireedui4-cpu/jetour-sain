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

export const metadata: Metadata = {
  title: "JETOUR Mongolia — Албан ёсны дистрибьютер SAIN MOTORS",
  description:
    "JETOUR Mongolia — албан ёсны дистрибьютер Сайн Моторс. X70 Plus, X1, X50, T1, G700 загварууд. Тест драйв, борлуулалт, үйлчилгээ. Утас: 7277-8855, 8910-0274",
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
  ],
  authors: [{ name: "Sain Motors" }],
  openGraph: {
    title: "JETOUR Mongolia — Албан ёсны дистрибьютер SAIN MOTORS",
    description:
      "JETOUR Travel+ загварууд — Монголд албан ёсоор. Тест драйв, борлуулалт, үйлчилгээ.",
    siteName: "JETOUR Mongolia",
    type: "website",
    locale: "mn_MN",
  },
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
        <MetaPixel />
        {children}
        <FloatingCTA />
        <Toaster />
      </body>
    </html>
  );
}
