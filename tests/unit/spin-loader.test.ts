import { describe, it, expect, vi } from "vitest";
import { loadSpinFrames, spinFrameUrl, pruneSpinCache } from "@/lib/spin-loader";

function fixture() {
  const created: HTMLImageElement[] = [];
  const makeImage = () => {
    const image = { src: "", onload: null, onerror: null, decode: vi.fn().mockResolvedValue(undefined) } as unknown as HTMLImageElement;
    created.push(image);
    return image;
  };
  return { created, makeImage };
}
async function loaded(image: HTMLImageElement) {
  image.onload?.call(image, {} as Event);
  await new Promise(resolve => setImmediate(resolve));
}

describe("selected spin loading", () => {
  it("loads the visible angle first with bounded concurrency and real progress", async () => {
    const { created, makeImage } = fixture();
    const progress = vi.fn(), complete = vi.fn();
    const images = Array<HTMLImageElement | null>(5).fill(null);
    const cancel = loadSpinFrames({ frames: ["0", "1", "2", "3", "4"], images, start: 3, concurrency: 2, makeImage, onProgress: progress, onComplete: complete });
    expect(created.map(i => i.src)).toEqual(["3", "4"]);
    expect(progress).toHaveBeenLastCalledWith({ loaded: 0, total: 5, failed: 0, percent: 1 });
    await loaded(created[0]);
    expect(created).toHaveLength(3);
    expect(progress).toHaveBeenLastCalledWith({ loaded: 1, total: 5, failed: 0, percent: 20 });
    expect(complete).not.toHaveBeenCalled();
    cancel();
  });
  it("waits for decode and reports failures without claiming 100%", async () => {
    const { created, makeImage } = fixture();
    const progress = vi.fn(), complete = vi.fn();
    const images = Array<HTMLImageElement | null>(2).fill(null);
    const cancel = loadSpinFrames({ frames: ["a", "b"], images, start: 0, makeImage, onProgress: progress, onComplete: complete });
    let decode!: () => void;
    created[0].decode = () => new Promise<void>(r => { decode = r; });
    await loaded(created[0]);
    expect(images[0]).toBeNull();
    created[1].onerror?.call(created[1], {} as Event);
    decode(); await Promise.resolve(); await Promise.resolve();
    expect(complete).toHaveBeenLastCalledWith(false);
    expect(progress).toHaveBeenLastCalledWith({ loaded: 1, total: 2, failed: 1, percent: 50 });
    cancel();
  });
  it("cancels in-flight requests and never starts obsolete queued frames", async () => {
    const { created, makeImage } = fixture();
    const progress = vi.fn(), complete = vi.fn();
    const cancel = loadSpinFrames({ frames: ["a", "b", "c"], images: [null, null, null], start: 0, concurrency: 1, makeImage, onProgress: progress, onComplete: complete });
    const stale = created[0].onload!;
    cancel(); stale.call(created[0], {} as Event);
    await Promise.resolve();
    expect(created).toHaveLength(1);
    expect(created[0].src).toBe("");
    expect(progress).toHaveBeenCalledTimes(1);
    expect(complete).not.toHaveBeenCalled();
  });
  it("retries only missing frames and returns cached paints without new requests", async () => {
    const { created, makeImage } = fixture();
    const cached = {} as HTMLImageElement;
    const images = [cached, null];
    const complete = vi.fn();
    loadSpinFrames({ frames: ["a", "b"], images, start: 0, makeImage, onProgress: vi.fn(), onComplete: complete });
    expect(created.map(i => i.src)).toEqual(["b"]);
    await loaded(created[0]);
    expect(complete).toHaveBeenLastCalledWith(true);
    loadSpinFrames({ frames: ["a", "b"], images, start: 0, makeImage, onProgress: vi.fn(), onComplete: complete });
    expect(created).toHaveLength(1);
  });
  it("times out stalled images so retry remains available", () => {
    vi.useFakeTimers();
    const { makeImage } = fixture();
    const complete = vi.fn();
    loadSpinFrames({ frames: ["a"], images: [null], start: 0, makeImage, timeoutMs: 10, onProgress: vi.fn(), onComplete: complete });
    vi.advanceTimersByTime(11);
    expect(complete).toHaveBeenLastCalledWith(false);
    vi.useRealTimers();
  });
  it("uses versioned mobile frames only for supported local spin assets", () => {
    expect(spinFrameUrl("/models/t2/spin/sand/23.webp", true)).toBe("/models/t2/spin/mobile-v1/sand/23.webp");
    expect(spinFrameUrl("/models/t2/spin/sand/23.webp", false)).toBe("/models/t2/spin/sand/23.webp");
    expect(spinFrameUrl("https://example.com/a.webp", true)).toBe("https://example.com/a.webp");
  });
  it("exposes retry after a total deadline rather than waiting several minutes for every stalled batch", () => {
    vi.useFakeTimers();
    const { created, makeImage } = fixture();
    const complete = vi.fn(), progress = vi.fn();
    loadSpinFrames({ frames: Array.from({ length: 36 }, (_, i) => String(i)), images: Array(36).fill(null), start: 0,
      concurrency: 2, makeImage, onProgress: progress, onComplete: complete });
    vi.advanceTimersByTime(45001);
    expect(complete).toHaveBeenLastCalledWith(false);
    expect(created.every(image => image.src === "")).toBe(true);
    expect(progress).toHaveBeenLastCalledWith({ loaded: 0, total: 36, failed: 36, percent: 1 });
    vi.useRealTimers();
  });
  it("evicts old decoded paints while retaining the visible paint", () => {
    const cache = new Map([ ["old", { bytes: 30 }], ["shown", { bytes: 30 }], ["next", { bytes: 30 }] ]);
    pruneSpinCache(cache, new Set(["shown", "next"]), 70);
    expect([...cache.keys()]).toEqual(["shown", "next"]);
  });
});
