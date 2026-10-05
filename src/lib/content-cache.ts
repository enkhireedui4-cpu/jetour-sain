import { revalidatePath } from "next/cache";
export function invalidateContent(kind: "models" | "news" | "offers") {
  revalidatePath("/");
  revalidatePath("/sitemap.xml");
  if (kind === "models") {
    revalidatePath("/models"); revalidatePath("/models/[id]", "page"); revalidatePath("/info-request"); revalidatePath("/api/public/models");
  } else if (kind === "news") {
    revalidatePath("/news"); revalidatePath("/news/[slug]", "page");
  } else {
    revalidatePath("/special-offers"); revalidatePath("/special-offers/[id]", "page");
  }
}
