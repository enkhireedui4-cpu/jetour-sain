import type { Metadata } from "next";
import { Montserrat, Inter, Poppins } from "next/font/google";
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

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
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
        className={`${montserrat.variable} ${inter.variable} ${poppins.variable} antialiased bg-white text-[#0A1F44]`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
