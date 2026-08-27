import type { MetadataRoute } from "next";

/**
 * Web app manifest — утсанд "Нүүр дэлгэцэд нэмэх" үед нэр, өнгө, дүрс зөв гарна.
 * Үүнгүйгээр Android дээр хаяг, ерөнхий дүрс харагддаг.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "JETOUR — SAIN MOTORS",
    short_name: "JETOUR",
    description:
      "JETOUR-ын SUV загварууд Монголд — албан ёсны дистрибьютор SAIN MOTORS. Тест драйв захиалах, үнэ, санхүүжилт.",
    start_url: "/",
    display: "standalone",
    background_color: "#FFFFFF",
    /* Хөтчийн хаягийн мөрний өнгө — брэндийн улаан (тэмдгийн өнгөтэй ижил) */
    theme_color: "#E6001C",
    lang: "mn",
    icons: [
      { src: "/icon.png", sizes: "512x512", type: "image/png" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  };
}
