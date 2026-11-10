"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Script from "next/script";

// Queue events immediately; download the optional tracker after page load.
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
  // The bootstrap sends the initial PageView; later routes send one each.
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
      <Script id="meta-pixel" strategy="afterInteractive">
        {`!function(f,n)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];n('init', ${JSON.stringify(PIXEL_ID)});
        n('track', 'PageView');}(window);`}
      </Script>
      <Script
        id="meta-pixel-src"
        src="https://connect.facebook.net/en_US/fbevents.js"
        strategy="lazyOnload"
      />
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          alt=""
          src={`https://www.facebook.com/tr?id=${PIXEL_ID}&ev=PageView&noscript=1`}
        />
      </noscript>
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
