"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { wrapIndex, framesToAdvance, pxPerFrameFor } from "@/lib/spin";
import { loadSpinFrames, pruneSpinCache, spinFrameUrl, type SpinProgress } from "@/lib/spin-loader";
import { ViewerLoading } from "./viewer-loading";

export type SpinColor = { id: string; name: string; nameEn?: string; hex: string; frames: string[] };
type Paint = { images: (HTMLImageElement | null)[]; bytes: number; ready: boolean };
const PAINT_MS = 240;

/** Only the selected paint is fetched; the previous vehicle stays visible until decode completes. */
export function Spin360({ colors, alt, heading, headingEn, startFrame = 0, className = "" }: {
  colors: SpinColor[]; alt: string; heading?: string; headingEn?: string; startFrame?: number; className?: string;
}) {
  const hostRef = useRef<HTMLDivElement>(null);
  const cache = useRef(new Map<string, Paint>());
  const [colorIdx, setColorIdx] = useState(0);
  const [shownIdx, setShownIdx] = useState(0);
  const shownRef = useRef(0);
  const [fadingFrom, setFadingFrom] = useState<number | null>(null);
  const [index, setIndex] = useState(startFrame);
  const angle = useRef(startFrame);
  const [hinted, setHinted] = useState(false);
  const [near, setNear] = useState(false);
  const [mobile, setMobile] = useState<boolean | null>(null);
  const [progress, setProgress] = useState<SpinProgress>({ loaded: 0, total: 0, failed: 0, percent: 1 });
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const [retry, setRetry] = useState(0);
  const requested = colors[colorIdx], shown = colors[shownIdx];
  const total = shown?.frames.length ?? 0;
  const ready = status === "ready";
  const keyOf = useCallback((i: number) => `${mobile ? "mobile" : "desktop"}:${colors[i]?.id}`, [colors, mobile]);

  // Keep the initial resolution tier during resize; avoid discarding an already decoded rotation.
  useEffect(() => {
    const timer = setTimeout(() => setMobile(window.matchMedia("(max-width: 699px)").matches), 0);
    return () => clearTimeout(timer);
  }, []);
  useEffect(() => {
    const el = hostRef.current;
    if (!el || near) return;
    if (typeof IntersectionObserver === "undefined") {
      const timer = setTimeout(() => setNear(true), 0);
      return () => clearTimeout(timer);
    }
    const io = new IntersectionObserver(entries => {
      if (entries.some(e => e.isIntersecting)) { setNear(true); io.disconnect(); }
    }, { rootMargin: "300px" });
    io.observe(el);
    return () => io.disconnect();
  }, [near]);

  useEffect(() => {
    if (fadingFrom === null) return;
    const timer = setTimeout(() => setFadingFrom(null), PAINT_MS);
    return () => clearTimeout(timer);
  }, [fadingFrom, shownIdx]);

  useEffect(() => {
    if (!near || mobile === null || !requested?.frames.length) return;
    const key = keyOf(colorIdx);
    let paint = cache.current.get(key);
    if (!paint) {
      paint = { images: Array(requested.frames.length).fill(null), bytes: 0, ready: false };
      cache.current.set(key, paint);
    } else {
      cache.current.delete(key); cache.current.set(key, paint);
    }
    const entry = paint;
    const budget = (mobile ? 96 : 192) * 1024 * 1024;
    pruneSpinCache(cache.current, new Set([key, keyOf(shownRef.current)]), budget);
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }).connection;
    const slow = connection?.saveData || /(^|-)2g$/.test(connection?.effectiveType ?? "");
    return loadSpinFrames({
      frames: requested.frames.map(src => spinFrameUrl(src, mobile)), images: entry.images,
      start: angle.current, concurrency: slow ? 2 : 6,
      onProgress: value => { setProgress(value); if (value.percent < 100) setStatus("loading"); },
      onComplete: success => {
        entry.bytes = entry.images.reduce((n, image) => n + (image ? image.naturalWidth * image.naturalHeight * 4 : 0), 0);
        entry.ready = success;
        if (!success) { setStatus("error"); return; }
        const from = shownRef.current;
        if (from !== colorIdx) { setFadingFrom(from); shownRef.current = colorIdx; setShownIdx(colorIdx); }
        setStatus("ready");
        // Retain the old layer through its short transition, then release older decoded paints.
        pruneSpinCache(cache.current, new Set([key, keyOf(from)]), budget);
      },
    });
  }, [near, mobile, requested, colorIdx, keyOf, retry]);

  useEffect(() => {
    if (fadingFrom !== null) return;
    pruneSpinCache(cache.current, new Set([keyOf(shownIdx), keyOf(colorIdx)]), (mobile ? 96 : 192) * 1024 * 1024);
  }, [fadingFrom, colorIdx, shownIdx, mobile, keyOf]);

  const step = useCallback((delta: number) => {
    setIndex(i => { const next = wrapIndex(i + delta, total); angle.current = next; return next; });
  }, [total]);
  const pxPerFrame = useRef(16);
  useEffect(() => {
    const el = hostRef.current;
    if (!el) return;
    const measure = () => { pxPerFrame.current = pxPerFrameFor(el.clientWidth, total); };
    measure();
    const ro = new ResizeObserver(measure); ro.observe(el);
    return () => ro.disconnect();
  }, [total]);
  const drag = useRef({ active: false, x: 0, acc: 0 });
  const onPointerDown = (e: React.PointerEvent) => {
    if (!ready || e.pointerType === "touch") return;
    drag.current = { active: true, x: e.clientX, acc: 0 };
    e.currentTarget.setPointerCapture(e.pointerId); setHinted(true);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!ready || !drag.current.active) return;
    drag.current.acc += e.clientX - drag.current.x; drag.current.x = e.clientX;
    const n = framesToAdvance(drag.current.acc, pxPerFrame.current);
    if (n) { step(-n); drag.current.acc -= n * pxPerFrame.current; }
  };
  const endPointer = (e: React.PointerEvent) => {
    drag.current.active = false;
    if (e.currentTarget.hasPointerCapture(e.pointerId)) e.currentTarget.releasePointerCapture(e.pointerId);
  };
  useEffect(() => {
    const el = hostRef.current;
    if (!el || !ready) return;
    let originX = 0, originY = 0, lastX = 0, acc = 0;
    let axis: "x" | "y" | null = null;
    const start = (e: TouchEvent) => {
      if (e.touches.length !== 1) return;
      originX = lastX = e.touches[0].clientX; originY = e.touches[0].clientY; acc = 0; axis = null;
    };
    const move = (e: TouchEvent) => {
      if (e.touches.length !== 1) return;
      const x = e.touches[0].clientX;
      if (axis === null) {
        const dx = x - originX, dy = e.touches[0].clientY - originY;
        if (Math.abs(dx) < 8 && Math.abs(dy) < 8) return;
        axis = Math.abs(dx) > Math.abs(dy) ? "x" : "y"; lastX = x;
        if (axis === "x") setHinted(true);
      }
      if (axis !== "x") return;
      e.preventDefault(); acc += x - lastX; lastX = x;
      const n = framesToAdvance(acc, pxPerFrame.current);
      if (n) { step(-n); acc -= n * pxPerFrame.current; }
    };
    el.addEventListener("touchstart", start, { passive: true });
    el.addEventListener("touchmove", move, { passive: false });
    return () => { el.removeEventListener("touchstart", start); el.removeEventListener("touchmove", move); };
  }, [ready, step]);

  if (!shown || !total) return null;
  const labelOf = (c: SpinColor) => c.nameEn ? `${c.name} (${c.nameEn})` : c.name;
  const frameOf = (ci: number) => spinFrameUrl(colors[ci].frames[wrapIndex(index, colors[ci].frames.length)], mobile === true);
  return <div className={`spin ${className}`}>
    {heading && <div className="spin__id"><h2 className="spin__model">{heading}</h2>{headingEn && <p className="spin__model-en">{headingEn}</p>}</div>}
    <div ref={hostRef} className={`spin__stage ${ready ? "is-ready" : ""}`} tabIndex={0}
      role="group" aria-roledescription="360°" aria-label={`${alt}, ${labelOf(requested ?? shown)} — Зүүн, баруун сумны товчлуураар эргүүлнэ`}
      aria-busy={near && status === "loading"}
      onKeyDown={e => { if (ready && (e.key === "ArrowRight" || e.key === "ArrowLeft")) { e.preventDefault(); step(e.key === "ArrowRight" ? 1 : -1); setHinted(true); } }}
      onPointerDown={onPointerDown} onPointerMove={onPointerMove} onPointerUp={endPointer} onPointerCancel={endPointer}>
      <span className="spin__floor" aria-hidden />
      {near && fadingFrom !== null && <img key={`from-${colors[fadingFrom].id}`} src={frameOf(fadingFrom)} alt="" className="spin__frame" draggable={false} decoding="sync" />}
      {near && mobile !== null && <img key={`to-${shown.id}`} src={frameOf(shownIdx)} alt="" className={`spin__frame ${fadingFrom !== null ? "is-painting" : ""}`} draggable={false} decoding="sync" />}
      {near && status !== "ready" && <ViewerLoading percent={progress.percent} error={status === "error"} onRetry={() => setRetry(n => n + 1)} />}
      {ready && !hinted && <p className="spin__hint" aria-hidden><span className="spin__hint-glyph">↻</span>360° ЭРГҮҮЛЖ ХАРАХ</p>}
    </div>
    <div className="spin__colors"><div className="spin__swatches" role="group" aria-label="Биеийн өнгө сонгох">
      {colors.map((c, i) => <button key={c.id} type="button" className="spin__swatch" aria-label={labelOf(c)} aria-pressed={i === colorIdx}
        onClick={() => { if (i !== colorIdx) { drag.current.active = false; setStatus("loading"); setProgress({ loaded: 0, failed: 0, total: c.frames.length, percent: 1 }); setColorIdx(i); } }}><span className="spin__chip" style={{ background: c.hex }} /></button>)}
    </div><p className={`spin__colorname ${!ready ? "is-pending" : ""}`}>{requested?.name ?? shown.name}</p></div>
  </div>;
}
