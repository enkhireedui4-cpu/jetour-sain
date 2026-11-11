/** Matches SAIN Motors' published brand directory; logos are its curated official wordmarks. */
export const COMPANY_HOME = "https://sainmotors.mn/mn/";
export const ALL_BRANDS = "https://sainmotors.mn/mn/brands/";

const brands = [
  { id: "jetour", name: "JETOUR", href: "https://jetour.mn/" },
  { id: "soueast", name: "SOUEAST", href: "https://sainmotors.mn/mn/brands/soueast/" },
  { id: "chery", name: "CHERY", href: "https://chery.mn/" },
  { id: "byd", name: "BYD", href: "https://sainmotors.mn/mn/brands/byd/" },
  { id: "riddara", name: "RIDDARA", href: "https://sainmotors.mn/mn/brands/riddara/" },
  { id: "aito", name: "AITO", href: "https://sainmotors.mn/mn/brands/aito/" },
  { id: "212", name: "212", href: "https://sainmotors.mn/mn/brands/212/" },
  { id: "bestune", name: "FAW BESTUNE", href: "https://sainmotors.mn/mn/brands/bestune/" },
  { id: "rely", name: "CHERY RELY", href: "https://sainmotors.mn/mn/brands/rely/" },
  { id: "maxus", name: "MAXUS", href: "https://sainmotors.mn/mn/brands/maxus/" },
  { id: "hongqi", name: "FAW HONGQI", href: "https://sainmotors.mn/mn/brands/hongqi/" },
] as const;

export const BRAND_NAVIGATION = brands.map(brand => ({
  ...brand,
  logo: `/logos/brands/brand-${brand.id}.png`,
  current: brand.id === "jetour",
}));
