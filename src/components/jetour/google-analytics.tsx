"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Script from "next/script";

/**
 * Google Analytics 4 — сайт даяар (root layout-д нэг л удаа).
 *
 * Meta Pixel-тэй ижил хэв маягаар бичив, ГЭХДЭЭ нэг чухал ялгаатай: ID-г кодод
 * анхдагчаар бичихгүй. Хэмжилтийн ID нь тухайн эзэмшигчийн property-д холбогддог
 * тул буруу ID бичвэл өгөгдөл ХАРИЙН тоолуур руу урсана. Иймд
 * `NEXT_PUBLIC_GA_MEASUREMENT_ID` тохируулаагүй бол компонент юу ч
 * ачаалахгүй — чимээгүй унтарна (лидийн Telegram мэдэгдэлтэй ижил зарчим).
 *
 * Тохируулах: .env-д `NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX`
 */
const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim();

type GtagFn = (...args: unknown[]) => void;

/** gtag бэлэн биш бол чимээгүй алгасна */
function gtagCall(...args: unknown[]) {
  if (typeof window === "undefined") return;
  const gtag = (window as unknown as { gtag?: GtagFn }).gtag;
  if (typeof gtag === "function") gtag(...args);
}

export function GoogleAnalytics() {
  const pathname = usePathname();
  /**
   * Эхний page_view-г gtag-ийн config өөрөө илгээнэ. Тиймээс замын ЭХНИЙ
   * утгыг зөвхөн тэмдэглээд илгээхгүй — давхардахгүй. Strict Mode-д effect
   * хоёр удаа ажиллахад ч замаар харьцуулж байгаа тул давхар event гарахгүй.
   */
  const lastPath = useRef<string | null>(null);

  useEffect(() => {
    if (!GA_ID) return;
    if (lastPath.current === null) {
      lastPath.current = pathname;
      return;
    }
    if (lastPath.current === pathname) return;
    lastPath.current = pathname;
    gtagCall("event", "page_view", {
      page_path: pathname,
      page_location: window.location.href,
      page_title: document.title,
    });
  }, [pathname]);

  if (!GA_ID) return null;

  return (
    <>
      <Script
        id="ga4-src"
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('js', new Date());
          gtag('config', '${GA_ID}', { send_page_view: true });
        `}
      </Script>
    </>
  );
}
