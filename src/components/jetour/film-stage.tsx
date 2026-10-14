"use client";

import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import { useReducedMotion } from "framer-motion";

const FOCUS = { top: "50% 0%", center: "50% 50%", bottom: "50% 100%" } as const;

/**
 * Дэлгэц дүүрэн, дуугүй, өөрөө тоглодог бичлэгийн тайз.
 *
 * Десктоп (16:9) ба утас (9:16) хоёр ТУСДАА найруулгатай файл авна — нэг
 * файлыг тайрч тааруулахгүй. Бичлэг нь өөрөө гарчиг, логотой тул дээр нь
 * ямар ч бичвэр давхарлахгүй. Тайз нь навигацийн доорх харагдах хэсгийг
 * ЯГ дүүргэнэ (`object-cover`, хар зурвасгүй). Десктопод кадрыг ДЭЭД ирмэгт
 * барина: дэлгэц 16:9-өөс намхан үед илүүдэл нь доороос тайрагдаж, зүүн дээд
 * буланд байгаа лого хэзээ ч зүсэгдэхгүй.
 *
 * `preload="none"` — хэсэг дэлгэцэнд ойртох хүртэл файл татагдахгүй, мөн
 * зөвхөн ХАРАГДАЖ БАЙГАА хувилбар л татагдана (нуугдсан нь `play()` авахгүй).
 */
export function FilmStage({
  src,
  srcMobile,
  poster,
  posterMobile,
  focus = "top",
  label,
}: {
  src: string;
  srcMobile?: string;
  poster?: string;
  posterMobile?: string;
  /**
   * Десктопод кадрын аль ирмэгийг барих вэ (дэлгэц 16:9-өөс намхан үед
   * эсрэг тал нь тайрагдана). Лого дээд талд бол `top`, тайлбар бичвэр доод
   * талд бол `bottom`.
   */
  focus?: "top" | "center" | "bottom";
  /** Дэлгэц уншигчид зориулсан нэр — бичлэг дээр харагдахгүй */
  label: string;
}) {
  const reduce = useReducedMotion();
  const stageRef = useRef<HTMLDivElement>(null);
  const wideRef = useRef<HTMLVideoElement>(null);
  const tallRef = useRef<HTMLVideoElement>(null);
  const inView = useRef(false);
  /** Хэрэглэгч өөрөө зогсоосон бол гүйлгэхэд дахин эхлүүлэхгүй */
  const userPaused = useRef(false);
  const [playing, setPlaying] = useState(false);

  /** CSS-ээр нуугдаагүй (тухайн дэлгэцийн) хувилбар */
  const activeVideo = () =>
    [tallRef.current, wideRef.current].find((v) => v && v.offsetParent !== null) ?? null;

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const sync = () => {
      const active = activeVideo();
      for (const v of [tallRef.current, wideRef.current]) {
        if (v && v !== active) v.pause();
      }
      if (!active) return;
      const shouldPlay = inView.current && !document.hidden && !userPaused.current && !reduce;
      if (shouldPlay) active.play().catch(() => {});
      else if (!inView.current) active.pause();
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        inView.current = entry.isIntersecting;
        sync();
      },
      { rootMargin: "200px 0px", threshold: 0.01 }
    );
    io.observe(stage);

    // Далд таб дээр хөтөч бичлэгийг зогсоодог — эргэж ирэхэд үргэлжлүүлнэ.
    document.addEventListener("visibilitychange", sync);
    // Утас эргүүлэх / цонх татахад нөгөө хувилбар руу шилжинэ.
    const mq = window.matchMedia("(min-width: 768px)");
    mq.addEventListener("change", sync);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", sync);
      mq.removeEventListener("change", sync);
    };
  }, [reduce]);

  const toggle = () => {
    const v = activeVideo();
    if (!v) return;
    if (v.paused) {
      userPaused.current = false;
      v.play().catch(() => {});
    } else {
      userPaused.current = true;
      v.pause();
    }
  };

  const videoProps = {
    preload: "none" as const,
    muted: true,
    loop: true,
    playsInline: true,
    disablePictureInPicture: true,
    "aria-label": label,
    onPlay: () => setPlaying(true),
    onPause: () => setPlaying(false),
  };
  const fit = "absolute inset-0 h-full w-full object-cover";

  return (
    <section id="film" aria-label={label} className="scroll-mt-16 bg-black">
      <div
        ref={stageRef}
        // Утасны босоо хувилбар байхгүй бол өргөн кадрыг босоо дэлгэцэнд
        // тулгаж тайрахгүй — утсанд 16:9 зурвасаар бүтнээр нь харуулна.
        className={`relative w-full overflow-hidden ${
          srcMobile
            ? "h-[calc(100svh-4rem)]"
            : "aspect-video md:aspect-auto md:h-[calc(100svh-4rem)]"
        }`}
      >
        {srcMobile && (
          <video
            ref={tallRef}
            src={srcMobile}
            poster={posterMobile ?? poster}
            className={`${fit} md:hidden`}
            {...videoProps}
          />
        )}
        <video
          ref={wideRef}
          src={src}
          poster={poster}
          className={srcMobile ? `${fit} hidden md:block` : fit}
          style={{ objectPosition: FOCUS[focus] }}
          {...videoProps}
        />

        <button
          type="button"
          onClick={toggle}
          aria-label={playing ? "Бичлэгийг зогсоох" : "Бичлэгийг тоглуулах"}
          className="absolute bottom-4 right-4 z-10 grid h-11 w-11 place-items-center rounded-full border border-white/25 bg-black/35 text-white backdrop-blur-sm transition-colors hover:bg-white hover:text-[#17181B] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white lg:bottom-6 lg:right-6"
        >
          {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 translate-x-px" />}
        </button>
      </div>
    </section>
  );
}
