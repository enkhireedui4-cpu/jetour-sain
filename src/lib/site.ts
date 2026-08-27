/**
 * Сайтын үндсэн хаяг — НЭГ эх сурвалж.
 *
 * Өмнө нь `layout.tsx` дотор локал тогтмол байсан тул экспортлогдохгүй,
 * улмаас `news/[slug]/page.tsx` нь өөрөө `https://jetour-sain.mn/...` гэж
 * ХАТУУ бичсэн байв — тэр домэйн байхгүй бөгөөд мэдээний бүтэцтэй
 * өгөгдөл (JSON-LD) дэх лого нь эвдэрсэн хаяг заасаар байсан.
 *
 * Deploy үед `NEXT_PUBLIC_SITE_URL`-ыг бодит домэйнээр тохируулна.
 * Тохируулаагүй үеийн нөөц утга нь зөвхөн локал хөгжүүлэлтэд зориулагдсан —
 * production дээр ЗААВАЛ тохируулна, эс тэгвээс canonical, sitemap, OG зураг
 * бүгд буруу домэйн заана.
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://jetour.mn";

/** Үндсэн хаягтай нийлүүлсэн бүтэн URL — JSON-LD, OG зэрэгт */
export function absoluteUrl(pathname: string): string {
  return `${SITE_URL}${pathname.startsWith("/") ? "" : "/"}${pathname}`;
}
