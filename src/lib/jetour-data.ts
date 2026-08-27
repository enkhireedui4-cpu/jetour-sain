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

// Жинхэнэ Jetour машин зургууд
const IMG = {
  x70_aerial: "/jetour-cars/712583730_921064490993111_3963637079716035790_n.jpg",
  x70_rear: "/jetour-cars/712803544_921064480993112_1706989833314110976_n.jpg",
  x70_front_dark: "/jetour-cars/728664206_1496351285107979_4890402185645234812_n.webp",
  x70_night: "/jetour-cars/729089543_1340059197564783_8512743044015312546_n.webp",
  x1_front: "/jetour-cars/714599471_921057417660485_8056177143950755889_n.jpg",
  x1_rear_side: "/jetour-cars/712430733_921057444327149_8958675274380949451_n.jpg",
  x1_rear: "/jetour-cars/713844126_921057440993816_7361683212998011935_n.jpg",
  x1_branded: "/jetour-cars/714830678_921057467660480_6100228284048399906_n.jpg",
  x50_front_family: "/jetour-cars/711906105_921061610993399_8049625632775256600_n.jpg",
  x50_camping: "/jetour-cars/714204588_921061650993395_1098145828660312850_n.jpg",
  x50_rear: "/jetour-cars/714244033_921061647660062_8766989467164421896_n.jpg",
  t1_phev: "/jetour-cars/724894424_1972867063376374_6712646349117792876_n.webp",
  travel_interior: "/jetour-cars/728653558_1906599580038472_5850227596044427037_n.webp",
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
