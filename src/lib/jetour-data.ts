// JETOUR — албан ёсны брэндийн вэбсайт
// Мэдээллийн эх сурвалж:
// - Sain Motors Facebook хуудас (Sainmotors.mn)
// - Jetour Kazakhstan (jetour-auto.kz)
// - Chery Kazakhstan (chery.kz) — дизайны санаа

// CONTACT, BRANCHES, NEWS_ARTICLES, SHOWROOM_HOURS-ийг
// branches.ts-ээс re-export хийнэ — ингэснээр ирээдүйд салбар нэмэхэд
// зөвхөн branches.ts өөрчлөх төдий хангалттай.
export {
  CONTACT,
  BRANCHES,
  PRIMARY_BRANCH,
  SHOWROOM_BRANCH,
  SERVICE_BRANCH,
  branchMap,
  NEWS_ARTICLES,
  SHOWROOM_HOURS,
} from "./branches";
export type { Branch, NewsArticle } from "./branches";

export type ModelSpec = {
  engine: string;
  power: string;
  torque: string;
  transmission: string;
  drivetrain: string;
  seats: string;
  length: string;
  wheelbase: string;
  groundClearance: string;
  topSpeed: string;
  fuel: string;
};

export type ModelFeature = {
  title: string;
  description: string;
};

export type JetourModel = {
  id: string;
  name: string;
  series: string;
  tagline: string;
  shortDesc: string;
  description: string;
  longDescription: string;
  heroImage: string;
  exteriorImages: string[];
  interiorImages: string[];
  gallery: string[];
  price: string | null;
  priceNote?: string;
  startingPrice?: string;
  status: "available" | "coming-soon";
  specs: ModelSpec;
  exteriorFeatures: ModelFeature[];
  interiorFeatures: ModelFeature[];
  safety: string[];
  highlights: { label: string; value: string }[];
  accent: "red" | "blue";
};

// === Тусгай саналууд (Special Offers) ===
export type SpecialOffer = {
  id: string;
  modelId: string;
  modelName: string;
  poster: string;
  title: string;
  desc: string; // богино тайлбар (grid/slider)
  date: string;
  body: string[]; // дэлгэрэнгүй догол мөрүүд
  tagline: string;
  price?: string; // үндсэн үнэ (жишээ: "94,999,900₮")
  specs?: { label: string; value: string }[]; // техникийн үзүүлэлт
};
