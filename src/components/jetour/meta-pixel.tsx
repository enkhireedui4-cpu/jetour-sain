"use client";

import Script from "next/script";

// Meta (Facebook) Pixel ID — deploy хийх үед .env-д нэмнэ:
//   NEXT_PUBLIC_META_PIXEL_ID=1234567890
// ID хоосон бол Pixel огт ачаалагдахгүй (аюулгүй).
const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;

export function MetaPixel() {
  if (!PIXEL_ID) return null;

  return (
    <>
      <Script id="meta-pixel" strategy="afterInteractive">
        {`!function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window,document,'script',
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
    </>
  );
}

// Meta Pixel event-ийг найдвартай дуудах helper.
// fbq байхгүй (ID тохируулаагүй) бол чимээгүй алгасна.
export function trackMetaEvent(event: string, params?: Record<string, unknown>) {
  if (typeof window !== "undefined") {
    const fbq = (window as unknown as { fbq?: (...args: unknown[]) => void }).fbq;
    if (typeof fbq === "function") {
      fbq("track", event, params);
    }
  }
}
