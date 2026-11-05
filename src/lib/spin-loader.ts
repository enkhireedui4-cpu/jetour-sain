import { wrapIndex } from "./spin";

export type SpinProgress = { loaded: number; total: number; failed: number; percent: number };

export function spinFrameUrl(src: string, mobile: boolean): string {
  return mobile ? src.replace(/^(\/models\/(?:t2|t1-phev)\/spin)\/(?!mobile-v1\/)/, "$1/mobile-v1/") : src;
}

/** LRU order is the Map insertion order. Visible/requested paints are protected. */
export function pruneSpinCache<T extends { bytes: number }>(cache: Map<string, T>, protectedKeys: Set<string>, budget: number) {
  let bytes = [...cache.values()].reduce((n, v) => n + v.bytes, 0);
  for (const [key, entry] of cache) {
    if (cache.size <= 2 && bytes <= budget) break;
    if (protectedKeys.has(key)) continue;
    cache.delete(key);
    bytes -= entry.bytes;
  }
}

/** Successful decodes only; errors leave holes that a retry can fill. */
export function loadSpinFrames({ frames, images, start, concurrency = 6, timeoutMs = 20000,
  makeImage = () => new Image(), onProgress, onComplete,
}: {
  frames: string[];
  images: (HTMLImageElement | null)[];
  start: number;
  concurrency?: number;
  timeoutMs?: number;
  makeImage?: () => HTMLImageElement;
  onProgress: (progress: SpinProgress) => void;
  onComplete: (success: boolean) => void;
}) {
  let cancelled = false, finished = false, cursor = 0, active = 0, failed = 0;
  let deadline: ReturnType<typeof setTimeout> | undefined;
  let loaded = images.filter(Boolean).length;
  const pending = new Map<HTMLImageElement, ReturnType<typeof setTimeout>>();
  const order: number[] = [];
  for (let distance = 0; order.length < frames.length; distance++) {
    for (const offset of distance === 0 ? [0] : [distance, -distance]) {
      const index = wrapIndex(start + offset, frames.length);
      if (!order.includes(index)) order.push(index);
      if (order.length === frames.length) break;
    }
  }
  const queue = order.filter(i => !images[i]);
  const report = () => onProgress({ loaded, total: frames.length, failed,
    percent: Math.max(1, Math.floor(loaded * 100 / Math.max(1, frames.length))) });
  const pump = () => {
    if (cancelled) return;
    while (active < Math.max(1, concurrency) && cursor < queue.length) {
      const index = queue[cursor++];
      const image = makeImage();
      active++;
      let settled = false;
      const finish = (success: boolean) => {
        if (cancelled || settled) return;
        settled = true;
        clearTimeout(pending.get(image));
        pending.delete(image);
        image.onload = image.onerror = null;
        active--;
        if (success) { images[index] = image; loaded++; }
        else { failed++; image.src = ""; }
        report();
        pump();
      };
      image.onload = () => {
        if (cancelled || settled) return;
        Promise.resolve().then(() => image.decode?.()).then(() => finish(true), () => finish(false));
      };
      image.onerror = () => finish(false);
      image.decoding = "async";
      image.fetchPriority = index === wrapIndex(start, frames.length) ? "high" : "low";
      pending.set(image, setTimeout(() => finish(false), timeoutMs));
      image.src = frames[index];
    }
    if (!finished && active === 0 && cursor === queue.length) {
      finished = true;
      clearTimeout(deadline);
      onComplete(loaded === frames.length);
    }
  };
  const cancel = () => {
    cancelled = true;
    clearTimeout(deadline);
    for (const [image, timer] of pending) {
      clearTimeout(timer);
      image.onload = image.onerror = null;
      image.src = "";
    }
    pending.clear();
  };
  // A per-frame timeout alone can keep a slow connection waiting for many batches.
  deadline = setTimeout(() => {
    if (cancelled || finished) return;
    cancel(); failed = frames.length - loaded;
    report(); onComplete(false);
  }, 45000);
  report();
  pump();
  return cancel;
}
