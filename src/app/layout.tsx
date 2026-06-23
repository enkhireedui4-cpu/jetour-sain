import type { Metadata } from "next";
import { Montserrat, Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "JETOUR Mongolia — Албан ёсны дистрибьютер SAIN MOTORS",
  description:
    "JETOUR Mongolia — албан ёсны дистрибьютер Сайн Моторс. T2, Dashing, X70 Plus, G700 загварууд. Тест драйв, борлуулалт, үйлчилгээ. Утас: 8910 2070",
  keywords: [
    "JETOUR Mongolia",
    "Jetour Монгол",
    "Сайн Моторс",
    "Sain Motors",
    "Jetour T2",
    "Jetour Dashing",
    "Jetour X70",
    "SUV Монгол",
    "автомашин Улаанбаатар",
  ],
  authors: [{ name: "Sain Motors" }],
  openGraph: {
    title: "JETOUR Mongolia — Албан ёсны дистрибьютер SAIN MOTORS",
    description:
      "JETOUR легендар SUV загварууд — Монголд албан ёсоор. Тест драйв, борлуулалт, үйлчилгээ.",
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
        className={`${montserrat.variable} ${inter.variable} antialiased bg-ink text-paper font-sans`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
