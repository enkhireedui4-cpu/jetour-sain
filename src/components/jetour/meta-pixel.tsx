"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Script from "next/script";

/**
 * Meta (Facebook) Pixel — САЙТ ДАЯАР (root layout-д нэг л удаа).
 *
 * Скриптийн агуулга нь Meta-ийн үүсгэсэн кодтой яг ижил — логикийг хөндөөгүй.
 * Next.js-д тохирох зөв хэлбэр нь `next/script` + `afterInteractive`:
 * hydration-ы дараа, гол зурагтай өрсөлдөхгүйгээр ачаална (blocking биш).
 *
 * Pixel ID нь нийтийн утга (хуудасны эх кодод харагддаг, нуумал биш) тул
 * кодод анхдагчаар бичив: `.env` тохируулаагүй production deploy дээр Pixel
 * дуугүй унтарч орхихоос сэргийлнэ. Шаардлагатай бол env-ээр дарж бичиж
 * болно (staging дээр өөр ID хэрэглэх тохиолдолд).
 */
const DEFAULT_PIXEL_ID = "1359124325435159";
const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID?.trim() || DEFAULT_PIXEL_ID;

/** fbq байхгүй (скрипт хараахан ачаалагдаагүй) бол чимээгүй алгасна */
function fbqCall(...args: unknown[]) {
  if (typeof window === "undefined") return;
  const fbq = (window as unknown as { fbq?: (...a: unknown[]) => void }).fbq;
  if (typeof fbq === "function") fbq(...args);
}

export function MetaPixel() {
  const pathname = usePathname();
  /**
   * Эхний PageView-г Meta-ийн base код өөрөө илгээдэг. Тиймээс замын
   * ЭХНИЙ утгыг зөвхөн тэмдэглээд, PageView илгээхгүй — давхардахгүй.
   *
   * `null` эсэхээр биш, ЗАМААР харьцуулж байгаа нь Strict Mode-д effect
   * хоёр удаа ажиллахад ч давхар event гарахгүй болгож байна.
   */
  const lastPath = useRef<string | null>(null);

  useEffect(() => {
    if (lastPath.current === null) {
      lastPath.current = pathname; // эхний ачаалалт — base код хариуцна
      return;
    }
    if (lastPath.current === pathname) return; // дахин render, зам солигдоогүй
    lastPath.current = pathname;
    // Client-side navigation — App Router дээр inline скрипт дахин ажиллахгүй
    fbqCall("track", "PageView");
  }, [pathname]);

  if (!PIXEL_ID) return null;

  return (
    <>
      {/* Meta Pixel Code — Meta-ийн үүсгэсэн код (хөндөөгүй) */}
      <Script id="meta-pixel" strategy="afterInteractive">
        {`!function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window, document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', '${PIXEL_ID}');
        fbq('track', 'PageView');`}
      </Script>
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          alt=""
          src={`https://www.facebook.com/tr?id=${PIXEL_ID}&ev=PageView&noscript=1`}
        />
      </noscript>
      {/* End Meta Pixel Code */}
    </>
  );
}

/**
 * Meta Pixel event-ийг найдвартай дуудах helper.
 * ⚠ Хувийн мэдээлэл (нэр, утас, и-мэйл, формын утга) НЭВТРҮҮЛЭХГҮЙ —
 * зөвхөн агуулгын төрөл/загвар зэрэг хувийн бус шошго дамжуулна.
 */
export function trackMetaEvent(event: string, params?: Record<string, unknown>) {
  fbqCall("track", event, params);
}
