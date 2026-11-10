import { getImageProps } from "next/image";

export type HeroSlideImage = { name: string; image: string; imageMobile?: string };

export function HeroImage({ slide, active, priority }: {
  slide: HeroSlideImage;
  active: boolean;
  priority: boolean;
}) {
  const common = {
    alt: slide.name,
    fill: true,
    sizes: "100vw",
    loading: priority ? "eager" as const : "lazy" as const,
    fetchPriority: priority ? "high" as const : "low" as const,
    decoding: "async" as const,
    draggable: false,
    className: `object-cover transition-transform ease-out ${active ? "scale-[1.03]" : "scale-100"}`,
    style: { transitionDuration: "7200ms" },
  };
  const { props: desktop } = getImageProps({ ...common, src: slide.image });
  const mobile = slide.imageMobile
    ? getImageProps({ ...common, src: slide.imageMobile }).props
    : null;

  return (
    <picture>
      {mobile && <source media="(max-width: 1023px)" srcSet={mobile.srcSet} sizes={mobile.sizes} />}
      <img {...desktop} alt={slide.name} />
    </picture>
  );
}
