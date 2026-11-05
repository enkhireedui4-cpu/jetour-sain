"use client";

import { getImageProps } from "next/image";
import { useEffect, useRef, useState } from "react";
import { ViewerLoading } from "./viewer-loading";
import styles from "./viewer.module.css";

/** Fetch/decode one selected responsive image; never mount every hidden paint. */
export function SelectedPaintImage({ src, alt, sizes, className = "" }: { src: string; alt: string; sizes: string; className?: string }) {
  const host = useRef<HTMLDivElement>(null);
  const cache = useRef(new Map<string, { url: string; image: HTMLImageElement; bytes: number }>());
  const [near, setNear] = useState(false);
  const [shown, setShown] = useState<{ key: string; url: string; alt: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [percent, setPercent] = useState(1);
  const [error, setError] = useState(false);
  const [retry, setRetry] = useState(0);

  useEffect(() => {
    const el = host.current;
    if (!el || near) return;
    if (typeof IntersectionObserver === "undefined") {
      const timer = setTimeout(() => setNear(true), 0);
      return () => clearTimeout(timer);
    }
    const observer = new IntersectionObserver(entries => {
      if (entries.some(e => e.isIntersecting)) { setNear(true); observer.disconnect(); }
    }, { rootMargin: "300px" });
    observer.observe(el);
    return () => observer.disconnect();
  }, [near]);

  useEffect(() => {
    if (!near) return;
    let cancelled = false, objectUrl: string | null = null;
    const { props } = getImageProps({ src, alt, fill: true, sizes });
    const targetWidth = (host.current?.clientWidth || window.innerWidth) * Math.min(2, window.devicePixelRatio || 1);
    const candidates = (props.srcSet ?? "").split(",").map(candidate => {
      const [url, width] = candidate.trim().split(/\s+/);
      return { url, width: Number.parseInt(width, 10) };
    }).filter(c => c.url && Number.isFinite(c.width)).sort((a, b) => a.width - b.width);
    const url = candidates.find(c => c.width >= targetWidth)?.url ?? candidates.at(-1)?.url ?? props.src;
    const display = (entry: { url: string; image: HTMLImageElement; bytes: number }) => {
      if (cancelled) return;
      cache.current.delete(url); cache.current.set(url, entry);
      setShown({ key: url, url: entry.url, alt }); setLoading(false); setPercent(100);
      let bytes = [...cache.current.values()].reduce((n, image) => n + image.bytes, 0);
      for (const [key, image] of cache.current) {
        if (cache.current.size <= 2 && bytes <= 48 * 1024 * 1024) break;
        if (key === url) continue;
        cache.current.delete(key); bytes -= image.bytes; URL.revokeObjectURL(image.url);
      }
    };
    const cached = cache.current.get(url);
    if (cached) { queueMicrotask(() => { setError(false); display(cached); }); return () => { cancelled = true; }; }
    const request = new XMLHttpRequest();
    request.open("GET", url); request.responseType = "blob"; request.timeout = 20000;
    request.onloadstart = () => { if (!cancelled) { setError(false); setLoading(true); setPercent(1); } };
    const fail = () => {
      if (cancelled) return;
      if (objectUrl) { URL.revokeObjectURL(objectUrl); objectUrl = null; }
      setError(true); setLoading(false);
    };
    // Keep 100 for a decoded, displayable image rather than merely received bytes.
    request.onprogress = event => {
      if (!cancelled && event.lengthComputable) setPercent(Math.max(1, Math.min(99, Math.floor(event.loaded * 100 / event.total))));
    };
    let decodeTimer: ReturnType<typeof setTimeout> | undefined;
    request.onload = () => {
      if (cancelled) return;
      if (request.status < 200 || request.status >= 300 || !request.response?.type?.startsWith("image/")) { fail(); return; }
      objectUrl = URL.createObjectURL(request.response);
      const image = new Image(); image.decoding = "async"; image.src = objectUrl;
      let expired = false;
      decodeTimer = setTimeout(() => { expired = true; fail(); }, 20000);
      image.decode().then(() => {
        clearTimeout(decodeTimer);
        if (cancelled || expired || !objectUrl) return;
        const decodedUrl = objectUrl; objectUrl = null;
        display({ url: decodedUrl, image, bytes: image.naturalWidth * image.naturalHeight * 4 });
      }, () => { clearTimeout(decodeTimer); fail(); });
    };
    request.onerror = request.ontimeout = fail;
    request.send();
    return () => {
      cancelled = true; request.abort(); clearTimeout(decodeTimer);
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [near, src, alt, sizes, retry]);

  useEffect(() => {
    const entries = cache.current;
    return () => { for (const entry of entries.values()) URL.revokeObjectURL(entry.url); entries.clear(); };
  }, []);

  return <div ref={host} className={`selected-paint ${styles.selectedPaint} ${className}`} aria-busy={near && loading}>
    {shown && <img key={shown.key} src={shown.url} alt={shown.alt} className={`selected-paint__image ${styles.selectedImage}`} draggable={false} />}
    {near && (loading || error) && <ViewerLoading percent={percent} error={error} onRetry={() => setRetry(n => n + 1)} />}
  </div>;
}
