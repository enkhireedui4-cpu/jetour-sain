import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { HeroImage } from "@/components/jetour/hero-image";

describe("hero image delivery", () => {
  it("offers mobile and desktop art direction through one image element", () => {
    const html = renderToStaticMarkup(createElement(HeroImage, {
      slide: { name: "JETOUR T2", image: "/desktop.webp", imageMobile: "/mobile.webp" },
      active: true,
      priority: true,
    }));
    expect(html.match(/<img\b/g)).toHaveLength(1);
    expect(html).toContain('<picture>');
    expect(html).toContain('media="(max-width: 1023px)"');
    expect(html).toContain('alt="JETOUR T2"');
    expect(html).toContain('loading="eager"');
    expect(html).toContain('fetchPriority="high"');
    // A desktop preload would download the wrong image on mobile.
    expect(html).not.toContain('<link');
  });

  it("keeps later slides lazy without requiring a mobile-specific image", () => {
    const html = renderToStaticMarkup(createElement(HeroImage, {
      slide: { name: "JETOUR X70 Plus", image: "/wide.webp" },
      active: false,
      priority: false,
    }));
    expect(html.match(/<img\b/g)).toHaveLength(1);
    expect(html).not.toContain('<source');
    expect(html).toContain('loading="lazy"');
    expect(html).toContain('fetchPriority="low"');
  });
});
