"use client";

import { useEffect } from "react";
import Link from "next/link";
import { CONTACT } from "@/lib/jetour-data";

/**
 * Ажиллах үеийн алдааны хамгаалалт (route segment).
 *
 * Өмнө нь байхгүй байсан тул ямар нэг хуудсанд алдаа гарвал Next-ийн анхдагч,
 * англи хэлтэй дэлгэц гарч, хэрэглэгч гацдаг байв. Энд дахин оролдох товч,
 * үргэлжлүүлэх зам, шууд утас өгнө — лид алдахгүй.
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Серверийн лог руу тэмдэглэнэ (сервер дээр digest-ээр хайж олно)
    console.error("Хуудасны алдаа:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-white text-[#17181B] flex items-center">
      <div className="container-page py-20">
        <p className="text-[11px] font-semibold tracking-[0.22em] uppercase text-[#696F79] mb-4">
          Алдаа гарлаа
        </p>
        <h1 className="text-[clamp(26px,4.4vw,44px)] font-extrabold leading-[1.1] tracking-[-0.02em] max-w-[18ch]">
          Уучлаарай, хуудас ачаалахад алдаа гарлаа
        </h1>
        <p className="mt-5 max-w-[46ch] text-[15px] lg:text-base leading-[1.7] text-[#54585F]">
          Түр зуурын доголдол байж магадгүй. Дахин оролдоно уу, эсвэл бидэнтэй
          шууд холбогдоорой.
        </p>

        <div className="mt-9 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center justify-center rounded-full bg-[#17181B] px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#000]"
          >
            Дахин оролдох
          </button>
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

        {error.digest && (
          <p className="mt-8 text-[11px] tracking-[0.1em] text-[#696F79]">
            Алдааны код: {error.digest}
          </p>
        )}
      </div>
    </div>
  );
}
