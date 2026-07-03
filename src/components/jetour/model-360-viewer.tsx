"use client";

import { useState, useEffect, useRef } from "react";
import { RotateCw } from "lucide-react";

type Model360Color = { key: string; name: string; hex: string; frames: string[] };

type Props = {
  colors: Model360Color[];
  alt: string;
};

const PX_PER_FRAME = 6; // чирэх мэдрэмж — бага байх тусам хурдан эргэнэ

export function Model360Viewer({ colors, alt }: Props) {
  const [colorKey, setColorKey] = useState(colors[0]?.key);
  const active = colors.find((c) => c.key === colorKey) ?? colors[0];
  const frames = active.frames;

  const [index, setIndex] = useState(0);
  const [loadedCount, setLoadedCount] = useState(0);
  const [ready, setReady] = useState(false);
  const [showHint, setShowHint] = useState(true);
  const drag = useRef<{ startX: number; startIndex: number } | null>(null);

  // Өнгө солиход тухайн өнгөний бүх фреймийг урьдчилж ачаална
  useEffect(() => {
    let cancelled = false;
    setReady(false);
    setLoadedCount(0);
    setIndex(0);
    frames.forEach((src) => {
      const img = new Image();
      img.onload = img.onerror = () => {
        if (!cancelled) setLoadedCount((c) => c + 1);
      };
      img.src = src;
    });
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [colorKey]);

  useEffect(() => {
    if (frames.length > 0 && loadedCount >= frames.length) setReady(true);
  }, [loadedCount, frames.length]);

  // Бэлэн болмогц "чирж болно" гэдгийг сануулах богино wiggle
  useEffect(() => {
    if (!ready) return;
    const t = setTimeout(() => {
      const steps = [3, 6, 3, 0];
      let i = 0;
      const int = setInterval(() => {
        setIndex(steps[i] ?? 0);
        if (++i >= steps.length) clearInterval(int);
      }, 220);
    }, 500);
    return () => clearTimeout(t);
  }, [ready]);

  const clamp = (n: number) => Math.max(0, Math.min(frames.length - 1, n));

  const onPointerDown = (e: React.PointerEvent) => {
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    drag.current = { startX: e.clientX, startIndex: index };
    setShowHint(false);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!drag.current) return;
    const dx = e.clientX - drag.current.startX;
    setIndex(clamp(drag.current.startIndex - Math.trunc(dx / PX_PER_FRAME)));
  };
  const onPointerUp = () => {
    drag.current = null;
  };

  if (frames.length === 0) return null;

  return (
    <div className="w-full">
      <div
        className="relative w-full aspect-[4/3] sm:aspect-[16/10] bg-[#F5F5F6] rounded-2xl overflow-hidden select-none touch-none cursor-grab active:cursor-grabbing"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
      >
        {!ready && (
          <div className="absolute inset-0 z-10 grid place-items-center bg-[#F5F5F6]">
            <div className="flex flex-col items-center gap-3">
              <div className="w-8 h-8 border-2 border-[#D9DADE] border-t-[#E20A17] rounded-full animate-spin" />
              <p className="text-xs font-semibold text-[#8A8F98]">
                {Math.round((loadedCount / frames.length) * 100)}%
              </p>
            </div>
          </div>
        )}
        <img
          src={frames[index]}
          alt={`${alt} — 360° харагдац ${index + 1}`}
          className="w-full h-full object-contain pointer-events-none"
          draggable={false}
        />
        {ready && showHint && (
          <div className="absolute inset-x-0 bottom-4 flex justify-center pointer-events-none">
            <span className="inline-flex items-center gap-2 bg-[#17181B]/85 text-white text-xs font-bold px-4 py-2 rounded-full backdrop-blur-sm">
              <RotateCw className="w-3.5 h-3.5" />
              Чирж эргүүлнэ үү
            </span>
          </div>
        )}
      </div>

      {colors.length > 1 && (
        <div className="flex items-center justify-center gap-3 mt-5">
          {colors.map((c) => (
            <button
              key={c.key}
              onClick={() => setColorKey(c.key)}
              title={c.name}
              aria-label={c.name}
              className={`w-9 h-9 rounded-full transition-all ${
                colorKey === c.key
                  ? "ring-2 ring-offset-2 ring-[#17181B] scale-110"
                  : "ring-1 ring-[#D9DADE] hover:scale-105"
              }`}
              style={{ background: c.hex }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
