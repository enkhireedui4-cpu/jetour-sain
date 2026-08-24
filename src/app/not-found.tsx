import Link from "next/link";
import type { Metadata } from "next";
import { Navbar } from "@/components/jetour/navbar";
import { Footer } from "@/components/jetour/contact";
import { CONTACT } from "@/lib/jetour-data";

export const metadata: Metadata = {
  title: "Хуудас олдсонгүй",
  // Алдааны хуудсыг хайлтын системд индекслүүлэхгүй
  robots: { index: false, follow: false },
};

/**
 * 404 — хуудас олдоогүй.
 *
 * Өмнө нь энэ файл байхгүй байсан тул Next-ийн АНХДАГЧ, англи хэлтэй хуудас
 * гарч, сайтын толгой/хөл ч харагддаггүй байв. Энд хэрэглэгчийг гацаалгүй
 * үргэлжлүүлэх гурван зам (загварууд, нүүр, утас) өгнө.
 */
export default function NotFound() {
  return (
    <div className="min-h-screen bg-white text-[#17181B] flex flex-col">
      <Navbar />
      <div className="h-16" />

      <main className="flex-1 flex items-center">
        <div className="container-page py-20 lg:py-28">
          <p className="text-[11px] font-semibold tracking-[0.22em] uppercase text-[#696F79] mb-4">
            Алдаа 404
          </p>
          <h1 className="text-[clamp(30px,5vw,52px)] font-extrabold leading-[1.08] tracking-[-0.02em] max-w-[16ch]">
            Хайсан хуудас олдсонгүй
          </h1>
          <p className="mt-5 max-w-[46ch] text-[15px] lg:text-base leading-[1.7] text-[#54585F]">
            Хаяг өөрчлөгдсөн эсвэл устсан байж болзошгүй. Доорхоос үргэлжлүүлнэ үү.
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <Link
              href="/models"
              className="inline-flex items-center justify-center rounded-full bg-[#17181B] px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#000]"
            >
              Загварууд үзэх
            </Link>
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-full border border-[#D7D8DC] px-7 py-3.5 text-sm font-semibold text-[#17181B] transition-colors hover:border-[#17181B]"
            >
              Нүүр хуудас
            </Link>
            <a
              href={CONTACT.phone1Href}
              className="inline-flex items-center justify-center rounded-full border border-[#D7D8DC] px-7 py-3.5 text-sm font-semibold text-[#17181B] transition-colors hover:border-[#17181B]"
            >
              {CONTACT.phone1}
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
