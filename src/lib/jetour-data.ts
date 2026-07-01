// JETOUR Mongolia — албан ёсны брэндийн вэбсайт
// Мэдээллийн эх сурвалж:
// - Sain Motors Facebook хуудас (Sainmotors.mn)
// - Jetour Kazakhstan (jetour-auto.kz)
// - Chery Kazakhstan (chery.kz) — дизайны санаа

// CONTACT, BRANCHES, FINANCE_PARTNERS, NEWS_ARTICLES, SHOWROOM_HOURS-ийг
// branches.ts-ээс re-export хийнэ — ингэснээр ирээдүйд салбар нэмэхэд
// зөвхөн branches.ts өөрчлөх төдий хангалттай.
export {
  CONTACT,
  BRANCHES,
  PRIMARY_BRANCH,
  FINANCE_PARTNERS,
  NEWS_ARTICLES,
  SHOWROOM_HOURS,
} from "./branches";
export type { Branch, NewsArticle } from "./branches";

export type VehicleColor = {
  name: string;
  hex: string;
};

// === Vehicle colors ===
export const VEHICLE_COLORS: VehicleColor[] = [
  { name: "Цагаан", hex: "#FFFFFF" },
  { name: "Хар", hex: "#0A0A0A" },
  { name: "Мөнгөн", hex: "#C5C8CC" },
  { name: "Гүн цэнхэр", hex: "#0A1F44" },
  { name: "Улаан", hex: "#E2231A" },
  { name: "Цэнхэр", hex: "#00AEEF" },
];

// === Загвар тус бүрийн бодит өнгөний зураг (Color Configurator) ===
// public/models/<id>/<өнгө>.<ext> — Sain Motors-аас өгсөн студийн зургууд
export type ModelColorImage = { name: string; hex: string; image: string };

export const MODEL_COLOR_IMAGES: Record<string, ModelColorImage[]> = {
  "x70-plus": [
    { name: "Цагаан", hex: "#F1F1F2", image: "/models/x70-plus/white.jpg" },
    { name: "Хар", hex: "#121316", image: "/models/x70-plus/black.jpg" },
    { name: "Фантом саарал", hex: "#6B7079", image: "/models/x70-plus/phantom-grey.jpg" },
    { name: "Далайн цэнхэр", hex: "#1C3D5A", image: "/models/x70-plus/deep-sea-blue.png" },
  ],
  x1: [
    { name: "Цагаан", hex: "#F1F1F2", image: "/models/x1/white.jpeg" },
    { name: "Шөнийн хар", hex: "#121316", image: "/models/x1/night-black.jpg" },
    { name: "Улаан", hex: "#C8202A", image: "/models/x1/red.jpeg" },
    { name: "Технологийн саарал", hex: "#8A8F98", image: "/models/x1/technology-gray.jpeg" },
  ],
  x50: [
    { name: "Цагаан", hex: "#F1F1F2", image: "/models/x50/white.jpeg" },
    { name: "Хар", hex: "#121316", image: "/models/x50/black.jpeg" },
    { name: "Фантом саарал", hex: "#6B7079", image: "/models/x50/phantom-grey.jpeg" },
    { name: "Мөнгөлөг", hex: "#C5C8CC", image: "/models/x50/silver.jpeg" },
  ],
  t1: [
    { name: "Цагаан", hex: "#F1F1F2", image: "/models/t1/white.jpeg" },
    { name: "Хар", hex: "#121316", image: "/models/t1/black.jpg" },
    { name: "Алтлаг", hex: "#C9A96A", image: "/models/t1/gold.jpg" },
    { name: "Мөнгөлөг", hex: "#C5C8CC", image: "/models/t1/silver.jpg" },
  ],
  s06: [
    { name: "Цасан цагаан", hex: "#F1F1F2", image: "/models/s06/snow-white.jpg" },
    { name: "Оддын хар", hex: "#121316", image: "/models/s06/starlit-black.jpg" },
    { name: "Фантом саарал", hex: "#6B7079", image: "/models/s06/phantom-gray.jpg" },
    { name: "Сарны саарал", hex: "#9AA0A6", image: "/models/s06/moon-grey.jpg" },
    { name: "Сансрын мөнгөлөг", hex: "#C5C8CC", image: "/models/s06/cosmic-silver.jpg" },
    { name: "Туяа ногоон", hex: "#3E5C4B", image: "/models/s06/aurora-green.jpg" },
  ],
  s07: [
    { name: "Сувдан цагаан", hex: "#F1F1F2", image: "/models/s07/pearl-white.jpg" },
    { name: "Цасан цагаан", hex: "#EDEEF0", image: "/models/s07/snow-white.jpg" },
    { name: "Оддын хар", hex: "#121316", image: "/models/s07/starlit-black.jpg" },
    { name: "Фантом саарал", hex: "#6B7079", image: "/models/s07/phantom-gray.jpg" },
    { name: "Далайн цэнхэр", hex: "#1C3D5A", image: "/models/s07/ocean-blue.jpg" },
  ],
};

// === Технологи / Интерьер — зурагтай цэвэр тайлбар (kz-сайт маягийн) ===
export type ModelMediaHighlight = { image: string; title: string; caption: string };

export const MODEL_TECH_HIGHLIGHTS: Record<string, ModelMediaHighlight[]> = {
  x50: [
    {
      image: "/models/x50/tech/1.webp",
      title: "Ухаалаг мультимедиа",
      caption:
        "10.25 инчийн хос HD дэлгэц нь дижитал хянах самбар, мэдрэгчтэй мультимедиаг нэгтгэж, жолоодлогын мэдээлэл, энтертайнментийг нэг дор төвлөрүүлнэ.",
    },
    {
      image: "/models/x50/tech/2.webp",
      title: "360° панорам харах",
      caption:
        "Өндөр нягтаршилтай 360° орчны систем автомашины эргэн тойрныг бүрэн харуулж, зогсоол болон нарийн зайд аюулгүй, итгэлтэй маневр хийхэд тусална.",
    },
    {
      image: "/models/x50/tech/3.webp",
      title: "Утасгүй цэнэглэгч",
      caption:
        "Утасгүй цэнэглэгч болон олон төрлийн холболтын шийдэл нь аяллын турш төхөөрөмжөө үргэлж бэлэн байлгах боломжийг олгоно.",
    },
  ],
  "x70-plus": [
    {
      image: "https://back.jetour-auto.kz/images/cars/technos/68144fc691ccd.webp",
      title: "Гурван бүсийн климат-контроль",
      caption: "Жолооч болон зорчигч тус бүр өөрийн тохиргоотой — салон даяар тэнцвэртэй, таатай орчин.",
    },
    {
      image: "https://back.jetour-auto.kz/images/cars/technos/688c693188abc.webp",
      title: "10.25\" мэдрэгчтэй дэлгэц",
      caption: "Физик болон мэдрэгчтэй товчлуурын хослол — жолоодлогын үед хялбар, ойлгомжтой удирдлага.",
    },
    {
      image: "https://back.jetour-auto.kz/images/cars/technos/68144f7274c2e.webp",
      title: "Панорам тэнгэрлэг дээвэр",
      caption: "Цахилгаан удирдлагатай панорам дээвэр салоныг илүү гэрэлтэй, уужим болгоно.",
    },
  ],
  dashing: [
    {
      image: "https://back.jetour-auto.kz/images/cars/technos/681475c64e77a.webp",
      title: "Том хэмжээний дижитал дэлгэц",
      caption: "Цэвэр интерфэйс бүхий дижитал орчин — жолоодлогын мэдээлэл, энтертайнментийг нэг дор.",
    },
    {
      image: "https://back.jetour-auto.kz/images/cars/technos/681475a356421.webp",
      title: "L2.5 ADAS жолоодлогын туслах",
      caption: "Эгнээнд барих, адаптив круиз, тоормосны туслалцаа — хотын замд илүү аюулгүй.",
    },
    {
      image: "https://back.jetour-auto.kz/images/cars/technos/68147585f3de5.webp",
      title: "Sony аудио систем",
      caption: "Олон чиглэлийн өндөр чанартай дуу — аялал бүрийг илүү тав тухтай болгоно.",
    },
  ],
  t1: [
    {
      image: "https://back.jetour-auto.kz/images/cars/technos/69158d98aa647.webp",
      title: "Ухаалаг мультимедиа",
      caption: "Холболттой дэлгэц — навигаци, хөгжим, утасны удирдлага нэг дор төвлөрнө.",
    },
    {
      image: "https://back.jetour-auto.kz/images/cars/technos/69158d862b25e.webp",
      title: "360° камер",
      caption: "Машины эргэн тойрны бүрэн дүр зураг — зогсоол, давчуу орчинд аюулгүй маневр.",
    },
    {
      image: "https://back.jetour-auto.kz/images/cars/technos/69158d312e2fa.webp",
      title: "Жолоодлогын туслах систем",
      caption: "Идэвхтэй аюулгүй байдлын багц — урт замд жолоочийн ачааллыг бууруулна.",
    },
  ],
  t2: [
    {
      image: "https://back.jetour-auto.kz/images/cars/technos/68dc041052819.webp",
      title: "Олон горимт 4WD",
      caption: "Элс, шавар, цас зэрэг газрын нөхцөлд тохирох жолоодлогын горимууд.",
    },
    {
      image: "https://back.jetour-auto.kz/images/cars/technos/68dc03f912f03.webp",
      title: "Бартаат замын мэдээлэл",
      caption: "Налуу, өнцөг, луужин — хүнд нөхцөлд бодит цагийн мэдээлэл.",
    },
    {
      image: "https://back.jetour-auto.kz/images/cars/technos/68dc03f03634f.webp",
      title: "Ухаалаг туслах систем",
      caption: "Камер, мэдрэгчид — бартаат зам, гүн усанд итгэлтэй жолоодлого.",
    },
  ],
  "x90-plus": [
    {
      image: "https://back.jetour-auto.kz/images/cars/technos/6812ef655f2da.webp",
      title: "Том дижитал дэлгэц",
      caption: "Жолоочийн самбар ба мультимедиа нэгдсэн дэвшилтэт интерфэйс.",
    },
    {
      image: "https://back.jetour-auto.kz/images/cars/technos/6812ef4ab16e3.webp",
      title: "7 суудлын уян хатан зохион байгуулалт",
      caption: "Гуравдугаар эгнээ нугалснаар өргөн ачааны зай — том гэр бүлд тохиромжтой.",
    },
    {
      image: "https://back.jetour-auto.kz/images/cars/technos/6812ef298d291.webp",
      title: "Дэвшилтэт аюулгүй байдал",
      caption: "85%+ өндөр хүчдэлийн ган бие, олон тооны аюулгүйн систем.",
    },
  ],
};

export const MODEL_INTERIOR_HIGHLIGHTS: Record<string, ModelMediaHighlight[]> = {
  x50: [
    {
      image: "/models/x50/interior/1.webp",
      title: "Дижитал хянах самбар",
      caption:
        "Жолоочийн өмнөх өндөр нягтаршилтай дижитал самбар хурд, навигаци, аяллын мэдээллийг тод, ойлгомжтой харуулна.",
    },
    {
      image: "/models/x50/interior/2.webp",
      title: "Дээд зэрэглэлийн салон",
      caption:
        "Чанартай материал, ухаалаг технологи хосолсон өргөн салон нь зорчигч бүрд тав тух, аюулгүй мэдрэмжийг бэлэглэнэ.",
    },
    {
      image: "/models/x50/interior/3.webp",
      title: "Эргономик удирдлага",
      caption:
        "Эргономик байрлал, мэдрэгчтэй удирдлага нь жолоодлогыг илүү хялбар, таатай болгоно.",
    },
  ],
};

// === Галерейн зураг (jetour-auto.kz-аас) — exterior/gallery shots ===
const KZ = "https://back.jetour-auto.kz/images/cars/photos/";
export const MODEL_GALLERY_IMAGES: Record<string, string[]> = {
  "x70-plus": [
    `${KZ}6912e7c9339b5.webp`, `${KZ}6912e7f1702a8.webp`, `${KZ}6912e80f0dc63.webp`,
    `${KZ}6912e85d12a82.webp`, `${KZ}6912e89254cd5.webp`, `${KZ}6912e8bfca8eb.webp`,
  ],
  dashing: [
    `${KZ}6912d89f9b419.webp`, `${KZ}6912d8c548234.webp`, `${KZ}6912d26c61503.webp`,
    `${KZ}6912d9e066d76.webp`, `${KZ}6912db73e8e37.webp`, `${KZ}6912dbbe70b18.webp`,
  ],
  t1: [
    `${KZ}6915887161cdf.webp`, `${KZ}691588a1ed436.webp`, `${KZ}6915896163067.webp`,
    `${KZ}691589b262fca.webp`, `${KZ}691589f4c905f.webp`, `${KZ}69158a51e43ad.webp`,
  ],
  t2: [
    `${KZ}6912eb5f97acb.webp`, `${KZ}6912eb8e567c1.webp`, `${KZ}6912fa47bd963.webp`,
    `${KZ}6912fa64d996b.webp`, `${KZ}6912fa8f8c66d.webp`, `${KZ}6912faa9ee2f5.webp`,
  ],
  "x90-plus": [
    `${KZ}6912e9c4c1777.webp`, `${KZ}6912ea16368c6.webp`, `${KZ}6912ea3538760.webp`,
    `${KZ}6912eaa275d00.webp`, `${KZ}6912eacd1942c.webp`,
  ],
};

// === Lead form colors ===
export const LEAD_VARIANTS = {
  glassLight: "glass-light",
  glassDark: "glass-dark",
  solidWhite: "solid-white",
} as const;


export const WHY_CHOOSE_JETOUR = [
  {
    icon: "shield",
    title: "4 жилийн баталгаа",
    description:
      "Үндсэн баталгаа 4 жил / 150,000 км. Хөдөлгүүрийн баталгаа бүрэн багтсан. Оригинал сэлбэг, мэргэжлийн засвар үйлчилгээ.",
  },
  {
    icon: "cpu",
    title: "Ухаалаг технологи",
    description:
      "L2.5 ADAS жолоодлогын туслалцаа, 20.5\" хос дижитал дэлгэц, 360° камер, Apple CarPlay / Android Auto.",
  },
  {
    icon: "compass",
    title: "Аяллын хүчин чадал",
    description:
      "Travel+ философиор бүтээгдсэн. 4WD, 700мм усанд орох, 220мм газрын тусгаар — Монголын нутагт төгс.",
  },
  {
    icon: "heart",
    title: "Гэр бүлийн тав тух",
    description:
      "7 суудалт уудам салон, панорамик тэнгэрлэг дээвэр, жолооны хүрд халаах, өвлийн бүх горим багтсан.",
  },
];

export const NEWS = [
  {
    id: "1",
    type: "Шинэ загвар",
    date: "2024.11.15",
    title: "JETOUR T2 PHEV — Тун удахгүй Монголд",
    excerpt:
      "Сайн Моторс ХХК Jetour брэндийн шинээр худалдаанд гарах T2 PHEV загварыг танилцуулж байна. 1000+ км аяллын зай, 700мм усанд орох чадвар.",
    image: "/jetour-cars/724894424_1972867063376374_6712646349117792876_n.jfif",
    tag: "Шинэ",
    accent: "electric" as const,
  },
  {
    id: "2",
    type: "Брэндийн мэдээ",
    date: "2024.10.20",
    title: "Paula Scher-ийн мастер загвар JETOUR G700",
    excerpt:
      "Дэлхийн нэрт дизайнер Paula Scher JETOUR G700 төслийн Дизайны Зөвлөхөөр нэгдэв. \"Энэ бол миний ажиллаж буй анхны автомашин.\"",
    image: "/jetour-cars/712583730_921064490993111_3963637079716035790_n.jpg",
    tag: "Брэнд",
    accent: "deep" as const,
  },
  {
    id: "3",
    type: "Үйлчилгээ",
    date: "2024.10.05",
    title: "4S стандарт үйлчилгээний төв — нээгдлээ",
    excerpt:
      "Сайн Моторс 4S стандартын үйлчилгээний төвөөр ажиллаж эхэллээ. Оригинал сэлбэг, мэргэжлийн засвар, баталгаат үйлчилгээ — нэг дор.",
    image: "/jetour-cars/714204588_921061650993395_1098145828660312850_n.jpg",
    tag: "Үйлчилгээ",
    accent: "electric" as const,
  },
];

// NEWS болон SHOWROOM_HOURS-ийг branches.ts-аас re-export хийсэн.
// (хуучин тодорхойлолтуудыг эндээс хасав)

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
  x70_front_dark: "/jetour-cars/728664206_1496351285107979_4890402185645234812_n.jfif",
  x70_night: "/jetour-cars/729089543_1340059197564783_8512743044015312546_n.jfif",
  x1_front: "/jetour-cars/714599471_921057417660485_8056177143950755889_n.jpg",
  x1_rear_side: "/jetour-cars/712430733_921057444327149_8958675274380949451_n.jpg",
  x1_rear: "/jetour-cars/713844126_921057440993816_7361683212998011935_n.jpg",
  x1_branded: "/jetour-cars/714830678_921057467660480_6100228284048399906_n.jpg",
  x50_front_family: "/jetour-cars/711906105_921061610993399_8049625632775256600_n.jpg",
  x50_camping: "/jetour-cars/714204588_921061650993395_1098145828660312850_n.jpg",
  x50_rear: "/jetour-cars/714244033_921061647660062_8766989467164421896_n.jpg",
  t1_phev: "/jetour-cars/724894424_1972867063376374_6712646349117792876_n.jfif",
  travel_interior: "/jetour-cars/728653558_1906599580038472_5850227596044427037_n.jfif",
};

export const MODELS: JetourModel[] = [
  {
    id: "x70-plus",
    name: "JETOUR X70 Plus",
    series: "Family",
    tagline: "Гэр бүлийн төгс шийдэл",
    shortDesc: "Тав тух, өргөн уужим салон, ухаалаг технологи",
    description:
      "Гэр бүлийн хэрэгцээнд бүрэн нийцсэн, тав тух, өргөн уужим салон, ухаалаг технологи, найдвартай ажиллагаа.",
    longDescription:
      "X70 Plus нь Монголын эрс тэс цаг агаарт тохируулан бүтээгдсэн. Жолооны хүрд, жолоочийн болон зорчигчийн суудлыг халаах, цантаж тогтсон цас мөсийг хайлуулах салхины шил зэрэг өвлийн горимуудаар тоноглогдсон. 197 морины хүчтэй 1.6 Турбо хөдөлгүүр нь урт замд хүчин чадлаа алдалгүй, гэр бүлийн аяллыг тав тухтай болгоно.",
    heroImage: IMG.x70_aerial,
    exteriorImages: [IMG.x70_aerial, IMG.x70_rear, IMG.x70_night, IMG.x70_front_dark],
    interiorImages: [IMG.travel_interior],
    gallery: [IMG.x70_aerial, IMG.x70_rear, IMG.x70_night, IMG.x70_front_dark],
    price: "94.9 сая ₮",
    startingPrice: "94.9 сая ₮",
    status: "available",
    specs: {
      engine: "1.6T GDI",
      power: "197 л.с.",
      torque: "290 Нм",
      transmission: "6-DCT",
      drivetrain: "FWD",
      seats: "7 суудал",
      length: "4749 мм",
      wheelbase: "2720 мм",
      groundClearance: "210 мм",
      topSpeed: "195 км/ц",
      fuel: "Бензин",
    },
    exteriorFeatures: [
      {
        title: "Спорт төрх",
        description: "Том жигүүрийн хэв маяг, LED гэрэлтүүлэг, хөдөлгөөнт биеийн хэв слүүдтэй. Хотын нүүрэн дээр ч хаа сайгүй анхаарал татах загвар.",
      },
      {
        title: "Панорамик тэнгэрлэг дээвэр",
        description: "Бүхэл бүтэн гэр бүлд өргөн дэлгэц нээлттэй. Нарны туяаг сайрхуулж, салоны мэдрэмжийг өргөн болгоно.",
      },
      {
        title: "19\" легерийн дугуй",
        description: "Том хэмжээт дугуй нь замын бартааг зөөлрүүлж, спортлог төрхийг нэмэгдүүлнэ.",
      },
    ],
    interiorFeatures: [
      {
        title: "7 суудалт уудам салон",
        description: "Гурван мөрөнд суудалтай. Хоёр, гуравдугаар мөрөн дэх суудлууд нь нийлмэл зэргээр хувирч, нэмэлт багажны зай гаргана.",
      },
      {
        title: "Жолооны хүрд, суудал халаах",
        description: "Өвлийн хүйтэнд жолооны хүрд, жолоочийн болон зорчигчийн суудлыг халаах — Монголын цаг агаарт заавал шаардлагатай.",
      },
      {
        title: "Салхины шил, цас хайлуулах",
        description: "Цантаж тогтсон цас мөсийг салхины шил халаах системээр хялбархан хайлуулна.",
      },
      {
        title: "10.2\" мультимедиа дэлгэц",
        description: "Apple CarPlay / Android Auto дэмждэг. Утсаа холбож, навигаци, хөгжим, дуут хяналтаар хянана.",
      },
    ],
    safety: ["ABS", "EBD", "EBA", "TCS", "ESC", "HHC", "HDC", "RMI", "DBF"],
    highlights: [
      { label: "Суудал", value: "7 хүн" },
      { label: "Хөдөлгүүр", value: "1.6T GDI" },
      { label: "Хурдны хайрцаг", value: "6-DCT" },
      { label: "Өвлийн горим", value: "Багтсан" },
    ],
    accent: "red",
  },
  {
    id: "x1",
    name: "JETOUR X1",
    series: "Compact",
    tagline: "Хотын залуусын сонголт",
    shortDesc: "Дэвшилтэт технологи, хүчирхэг гүйцэтгэл",
    description:
      "Дэвшилтэт технологи, орчин үеийн дизайн, хүчирхэг гүйцэтгэлийг хослуулсан. Их хотын өдөр тутмын амьдралд тохирсон шийдэл.",
    longDescription:
      "X1 нь залуу өрх, анхны машинтай болох гэр бүлд зориулагдсан compact SUV. 1.5 TCI Turbo хөдөлгүүр нь хотод 7L/100km зарцуулга үзүүлэх ба хурдны хувьд чадалтай. Иж бүрэн аюулгүй байдлын системүүд (ABS, EBD, EBA, TCS, ESC, HHC, HDC, RMI, DBF) суулгасан.",
    heroImage: IMG.x1_branded,
    exteriorImages: [IMG.x1_branded, IMG.x1_front, IMG.x1_rear_side, IMG.x1_rear],
    interiorImages: [IMG.travel_interior],
    gallery: [IMG.x1_branded, IMG.x1_front, IMG.x1_rear_side, IMG.x1_rear],
    price: "84.9 сая ₮",
    startingPrice: "84.9 сая ₮",
    status: "available",
    specs: {
      engine: "1.5 TCI Turbo",
      power: "156 л.с.",
      torque: "230 Нм",
      transmission: "6-DCT",
      drivetrain: "2WD",
      seats: "5 суудал",
      length: "4400 мм",
      wheelbase: "2610 мм",
      groundClearance: "180 мм",
      topSpeed: "180 км/ц",
      fuel: "Бензин",
    },
    exteriorFeatures: [
      {
        title: "Compact хэмжээ",
        description: "Хотын нарийн гудамж, зогсоолд эвтэйхэн. Залуу өрхийн анхны машинд тохиромжтой хэмжээ.",
      },
      {
        title: "Улаан өнгийн спорт төрх",
        description: "Тод улаан өнгө, хар тэнгэрлэг дээвэртэй. LED гэрэлтүүлэг, спорт төрх — залуусын таашаалд нийцсэн.",
      },
      {
        title: "Орчин үеийн гоо зүй",
        description: "Цэвэр шугаман дизайн, JETOUR тэмдэг, X1 бэлгэдэл — анхаарал татах төрх.",
      },
    ],
    interiorFeatures: [
      {
        title: "1.5T Turbo хөдөлгүүр",
        description: "Бага эзлэхүүнтэй хэвээр 156 морины хүч. Хотод 7L/100km зарцуулга — үр ашигтай.",
      },
      {
        title: "6-DCT автомат",
        description: "Шатлалт автомат хурдны хайрцаг — жолоодлого зөөлөн, шилжилт хурдан.",
      },
      {
        title: "9 аюулгүй байдлын систем",
        description: "ABS, EBD, EBA, TCS, ESC, HHC, HDC, RMI, DBF — иж бүрэн аюулгүй байдлын багц.",
      },
    ],
    safety: ["ABS", "EBD", "EBA", "TCS", "ESC", "HHC", "HDC", "RMI", "DBF"],
    highlights: [
      { label: "Хөдөлгүүр", value: "1.5T Turbo" },
      { label: "Хүчин чадал", value: "156 л.с." },
      { label: "Хурдны хайрцаг", value: "6-DCT" },
      { label: "Аюулгүй байдал", value: "9 систем" },
    ],
    accent: "red",
  },
  {
    id: "x50",
    name: "JETOUR X50",
    series: "Sport",
    tagline: "Спортлог дизайн, ухаалаг технологи",
    shortDesc: "20.5\" хос дэлгэц, 360° камер",
    description:
      "Спортлог дизайн, ухаалаг жолоодлогын систем, 20.5 инчийн хос дижитал дэлгэц, 360° камер болон иж бүрэн аюулгүй байдлын шийдлүүдтэй.",
    longDescription:
      "X50 нь спортлог загвартай, залуусын таашаалд нийцсэн SUV. 20.5 инчийн хос дижитал дэлгэц нь жолооны мэдээлэл болон entertainment-ийг нэг дор харуулна. 360° камер, олон тооны аюулгүй байдлын систем — хотын нүүрэн дээр ч, зогсоолд ч тайван.",
    heroImage: IMG.x50_front_family,
    exteriorImages: [IMG.x50_front_family, IMG.x50_camping, IMG.x50_rear],
    interiorImages: [IMG.travel_interior],
    gallery: [IMG.x50_front_family, IMG.x50_camping, IMG.x50_rear],
    price: "69.9 сая ₮",
    startingPrice: "69.9 сая ₮",
    status: "available",
    specs: {
      engine: "1.5 TCI Turbo",
      power: "156 л.с.",
      torque: "230 Нм",
      transmission: "6-DCT",
      drivetrain: "2WD",
      seats: "5 суудал",
      length: "4390 мм",
      wheelbase: "2610 мм",
      groundClearance: "180 мм",
      topSpeed: "180 км/ц",
      fuel: "Бензин",
    },
    exteriorFeatures: [
      {
        title: "Спортлог хар төрх",
        description: "Том ам, том дугуй, спортлог биеийн пропорц. Хар өнгө — залуусын таашаалд нийцсэн дизайн.",
      },
      {
        title: "Аяллын амьдралын хэв маяг",
        description: "Гэр бүл, найзуудтайгаа байгальд гарахад тохирох — Travel+ философиор бүтээгдсэн.",
      },
      {
        title: "LED гэрэлтүүлэг",
        description: "LED урд болон ард гэрэлтүүлэг — шөнийн жолоодлогод тод, эрчимтэй.",
      },
    ],
    interiorFeatures: [
      {
        title: "20.5\" хос дижитал дэлгэц",
        description: "Жолооны мэдээлэл болон мультимедиа нэг дор. Цэвэр, дэвшилттэй хэрэглэгчийн интерфэйс.",
      },
      {
        title: "360° камер",
        description: "Машины эргэн тойронд бүх талын хяналт. Зогсоол, нарийн нөхцөлд тайван маневр хийх боломжтой.",
      },
      {
        title: "Ухаалаг жолоодлогын систем",
        description: "ADAS шийдэл — эгнээнд барих, тоормосны туслалцаа, олон тооны аюулгүй байдлын багц.",
      },
    ],
    safety: ["ABS", "EBD", "EBA", "TCS", "ESC", "360° камер"],
    highlights: [
      { label: "Дэлгэц", value: "20.5\" хос" },
      { label: "Камер", value: "360°" },
      { label: "Хөдөлгүүр", value: "1.5T Turbo" },
      { label: "Үнэ", value: "69.9 сая ₮" },
    ],
    accent: "blue",
  },
  {
    id: "t1",
    name: "JETOUR T1",
    series: "Urban SUV",
    tagline: "Хот болон аяллын хослол",
    shortDesc: "Орчин үеийн технологи, ухаалаг шийдэл",
    description:
      "Орчин үеийн технологи, ухаалаг шийдэл болон олон талын хэрэглээг хослуулсан SUV. Хотын өдөр тутмын амьдрал болон аялалд тохирсон төгс шийдэл.",
    longDescription:
      "T1 нь хотын өдөр тутмын амьдралд зориулагдсан SUV. Ухаалаг жолоодлогын систем, орчин үеийн дизайн, өргөн салонтой. Хотын замд эвтэйхэн, захад эх нутагт ч хүчин чадлаа үзүүлнэ. Хоёр төрлийн багц сонголттой.",
    heroImage: IMG.t1_phev,
    exteriorImages: [IMG.t1_phev],
    interiorImages: [IMG.travel_interior],
    gallery: [IMG.t1_phev],
    price: "119.9 сая ₮-с",
    priceNote: "Бензин ба PHEV хувилбартай",
    startingPrice: "119.9 сая ₮",
    status: "available",
    specs: {
      engine: "2.0T / 1.5T PHEV",
      power: "254 / 590 л.с.",
      torque: "390 / 840 Нм",
      transmission: "8AT / 3DHT",
      drivetrain: "4WD",
      seats: "5 суудал",
      length: "4500 мм",
      wheelbase: "2670 мм",
      groundClearance: "200 мм",
      topSpeed: "200 км/ц",
      fuel: "Бензин / PHEV",
    },
    exteriorFeatures: [
      {
        title: "Орчин үеийн дизайн",
        description: "Цэвэр шугаман биений дизайнд спорт ба залуусын таашаал нийлсэн. LED гэрэлтүүлэг, том амын хэв маяг.",
      },
      {
        title: "Хоёр багц сонголт",
        description: "1.5T 2WD болон 2.0T 4WD гэсэн хоёр багц. Таны хэрэгцээнд тохирох сонголтоо хийх боломжтой.",
      },
      {
        title: "200мм газрын тусгаар",
        description: "Хотын бартаатай зам, хөдөөгийн шороон замд ч тайван явах боломжтой.",
      },
    ],
    interiorFeatures: [
      {
        title: "Ухаалаг мультимедиа",
        description: "Том хэмжээт дэлгэц, утсаа холбох боломжтой. Навигаци, хөгжим, утсан дуудлага — нэг дор.",
      },
      {
        title: "Өргөн салон",
        description: "5 хүний суудал. Урт замд ч тав тухтай, хотын хэрэгцээнд эвтэйхэн.",
      },
      {
        title: "Олон талын хэрэглээ",
        description: "Хот болон аялалд тохирох уян хатан загвар. Гэр бүл, найзуудтайгаа хамт явахад тохиромжтой.",
      },
    ],
    safety: ["ABS", "EBD", "EBA", "TCS", "ESC", "HHC", "HDC"],
    highlights: [
      { label: "Хөдөлгүүр", value: "2.0T / PHEV" },
      { label: "Хүчин чадал", value: "254 л.с." },
      { label: "Хурдны хайрцаг", value: "8AT / 3DHT" },
      { label: "Суудал", value: "5 хүн" },
    ],
    accent: "blue",
  },
  {
    id: "g700",
    name: "JETOUR G700",
    series: "Flagship",
    tagline: "Paula Scher-ийн мастер загвар",
    shortDesc: "Тэргүүлэх их буудлын SUV",
    description:
      "Дэлхийн нэрт дизайнер Paula Scher-тай хамтран бүтээсэн тэргүүлэх их буудлын SUV. Хүчирхэг технологи болон жинхэнэ мэдрэмжийн нэгдэл.",
    longDescription:
      "G700 нь JETOUR-ын тэргүүлэх их буудлын SUV. Дэлхийн нэрт дизайнер Paula Scher-ийн мастер загвар — \"Энэ бол миний ажиллаж буй анхны автомашин\" гэж тэрээр онцолсон. PHEV хосолсон систем, Nappa арьсан салон, агаарын дөрвөн салхивч — люкс тав тухатай.",
    heroImage: IMG.x70_aerial,
    exteriorImages: [IMG.x70_aerial, IMG.x70_rear],
    interiorImages: [IMG.travel_interior],
    gallery: [IMG.x70_aerial, IMG.x70_rear],
    price: null,
    priceNote: "Тун удахгүй",
    status: "coming-soon",
    specs: {
      engine: "2.0L Turbo PHEV",
      power: "555 л.с.",
      torque: "800 Нм",
      transmission: "3-DHT",
      drivetrain: "4WD",
      seats: "6–7 суудал",
      length: "4860 мм",
      wheelbase: "2850 мм",
      groundClearance: "220 мм",
      topSpeed: "200 км/ц",
      fuel: "PHEV",
    },
    exteriorFeatures: [
      {
        title: "Paula Scher дизайн",
        description: "Дэлхийн нэрт дизайнер Paula Scher-ийн мастер загвар. \"Энэ бол миний ажиллаж буй анхны автомашин.\"",
      },
      {
        title: "Люкс хэмжээ",
        description: "4860мм урт бие, 2850мм тэнхлэгийн зай — өргөн уужим, сүртэй төрх.",
      },
    ],
    interiorFeatures: [
      {
        title: "PHEV хосолсон систем",
        description: "2.0L Turbo PHEV хөдөлгүүр — 555 морины хүч, 800 Нм. Цахилгаанаар 100км, нийт 1000+ км зай.",
      },
      {
        title: "Nappa + Alcantara салон",
        description: "Дээд зэрэглэлийн Nappa арьс, Alcantara тавилга — люкс тав тухатай.",
      },
      {
        title: "6–7 суудалт уудам",
        description: "Гурван мөрөнд суудалтай — гэр бүл, найзуудтайгаа хамт аялалд тохиромжтой.",
      },
    ],
    safety: ["L2.5 ADAS", "360° камер", "5 одтой NCAP"],
    highlights: [
      { label: "Дизайн", value: "Paula Scher" },
      { label: "Хөдөлгүүр", value: "2.0T PHEV" },
      { label: "Хүчин чадал", value: "555 л.с." },
      { label: "Жолоодлого", value: "4WD" },
    ],
    accent: "red",
  },
  {
    id: "t2-phev",
    name: "JETOUR T2 PHEV",
    series: "PHEV",
    tagline: "Plug-in Hybrid — Тун удахгүй",
    shortDesc: "1000+ км аяллын зай",
    description:
      "Байгаль орчинд ээлтэй, залгаж цэнэглэдэг эрчим хүчний дэвшилтэт технологи болон бартаат замын хүчин чадлыг хослуулсан.",
    longDescription:
      "T2 PHEV нь JETOUR-ын Travel+ философиор бүтээгдсэн, plug-in хосолсон аяллын SUV. Цахилгаанаар 100 км, нийт 1000+ км аяллын зайд явах боломжтой. Бартаат зам, уул, цөл — хаа ч ажиллана. Байгаль орчинд ээлтэй шийдэл.",
    heroImage: IMG.t1_phev,
    exteriorImages: [IMG.t1_phev],
    interiorImages: [IMG.travel_interior],
    gallery: [IMG.t1_phev],
    price: null,
    priceNote: "Тун удахгүй",
    status: "coming-soon",
    specs: {
      engine: "1.5T PHEV",
      power: "340 л.с.",
      torque: "600 Нм",
      transmission: "3-DHT",
      drivetrain: "4WD",
      seats: "5 суудал",
      length: "4495 мм",
      wheelbase: "2672 мм",
      groundClearance: "220 мм",
      topSpeed: "190 км/ц",
      fuel: "PHEV",
    },
    exteriorFeatures: [
      {
        title: "Travel+ баатар загвар",
        description: "Бэхлэлтийн хүчтэй биеийн бүтэц, бартаат замд тохирох дизайн. Уул, цөл, намаг — хаа ч.",
      },
      {
        title: "700мм усанд орох чадвар",
        description: "Гүн усан даваа, гол горхийг туулах боломжтой. 220мм газрын тусгаар.",
      },
    ],
    interiorFeatures: [
      {
        title: "PHEV хосолсон систем",
        description: "1.5T PHEV — цахилгаанаар 100км, нийт 1000+ км аяллын зай. Хотод цахилгаанаар, хөдөөд бензинээр.",
      },
      {
        title: "6 жолоодлогын горим",
        description: "Snow, Mud, Sand зэрэг 6 горим — ямар ч замын нөхцөлд тохирох.",
      },
      {
        title: "Байгаль орчинд ээлтэй",
        description: "Зайлшгүй шатахуул зарцуулга багатай, цахилгаанаар ажилладаг — байгаль орчинд ээлтэй.",
      },
    ],
    safety: ["L2.5 ADAS", "6 горим", "700мм ус"],
    highlights: [
      { label: "Цахилгаан зай", value: "100 км" },
      { label: "Нийт зай", value: "1000+ км" },
      { label: "Усанд орох", value: "700 мм" },
      { label: "Жолоодлого", value: "4WD" },
    ],
    accent: "blue",
  },
];

export const HERO_SLIDES = [
  {
    model: "JETOUR X70 Plus",
    tagline: "Гэр бүлийн төгс шийдэл",
    description: "Тав тух, өргөн уужим салон, ухаалаг технологи",
    image: IMG.x70_aerial,
    price: "94.9 сая ₮",
    accent: "red" as const,
  },
  {
    model: "JETOUR X1",
    tagline: "Хотын залуусын сонголт",
    description: "Дэвшилтэт технологи, хүчирхэг гүйцэтгэл",
    image: IMG.x1_branded,
    price: "84.9 сая ₮",
    accent: "red" as const,
  },
  {
    model: "JETOUR X50",
    tagline: "Спортлог дизайн, ухаалаг технологи",
    description: "20.5\" хос дэлгэц, 360° камер",
    image: IMG.x50_front_family,
    price: "69.9 сая ₮",
    accent: "blue" as const,
  },
  {
    model: "JETOUR T1",
    tagline: "Хот болон аяллын хослол",
    description: "Орчин үеийн технологи, ухаалаг шийдэл",
    image: IMG.t1_phev,
    price: "119.9 сая ₮-с",
    accent: "blue" as const,
  },
];

export const TECHNOLOGY = [
  {
    icon: "engine",
    title: "TCI Turbo хөдөлгүүр",
    description:
      "1.5L болон 1.6L TCI Turbo хөдөлгүүрүүд нь 156–197 морины хүч, 230–390 Нм эргүүлэх хүчийг гаргана. Бага эзлэхүүнтэй хэвээр өндөр ашигтай.",
  },
  {
    icon: "battery",
    title: "PHEV хосолсон систем",
    description:
      "T2 PHEV болон G700-д суулгасан plug-in хосолсон систем нь 100км цахилгаан, 1000+ км нийт аяллын зайд хүрдэг. Хотод цахилгаанаар, хөдөөд бензинээр.",
  },
  {
    icon: "shield",
    title: "Аюулгүй байдлын систем",
    description:
      "ABS, EBD, EBA, TCS, ESC, HHC, HDC, RMI, DBF — иж бүрэн аюулгүй байдлын багц. 360° камер, L2.5 ADAS жолоодлогын туслалцаа.",
  },
  {
    icon: "connect",
    title: "20.5\" Хос дижитал дэлгэц",
    description:
      "Жолооны мэдээлэл болон entertainment нэг дор. Утсаар төхөөрөмжийн удирдлага, GPS навигаци, олон тооны холбооны боломжууд.",
  },
];

export const FINANCING = {
  downPayment: "20–30%",
  monthlyRate: "1.3%–2.9%",
  note: "Зээлийн сарын төлөлт нь цалингийн болон бизнесийн орлого, зээл судлагдах байгууллагуудаас хамааран өөр байж болно.",
  banks: ["Хаан банк", "Capitron банк", "Төрийн банк", "Худалдаа Хөгжлийн банк"],
};

export const DISTRIBUTOR_STATS = [
  { value: "11+", label: "Брэндийн албан ёсны төлөөлөгч" },
  { value: "20+", label: "Загварын сонголт" },
  { value: "2023", label: "Үйл ажиллагааны жил" },
  { value: "4S", label: "Стандарт үйлчилгээний төв" },
];

export const TIMELINE = [
  {
    year: "2018",
    title: "JETOUR брэнд үүсгэн байгуулагдсан",
    text: "Chery Group-ын дотор Travel+ философиор төрсөн. Зорилго — залуу, эрч хүчтэй SUV-д төвлөрөх.",
  },
  {
    year: "2020",
    title: "Дэлхийн зах зээл руу нэвтрэлт",
    text: "Өмнөд Африк, Ойрхи Дорнод, Латин Америк — 20+ оронд албан ёсоор борлуулж эхэлсэн.",
  },
  {
    year: "2023",
    title: "1 сая борлуулалтын хязгаар",
    text: "Дэлхий даяар 1 сая гаруй JETOUR машин зам дээр. SUV сегментийн тэргүүлэгч болсон.",
  },
  {
    year: "2024",
    title: "Монголд албан ёсоор нэвтэрсэн",
    text: "Сайн Моторс ХХК JETOUR-ын албан ёсны дистрибьютерээр ажиллаж эхэлсэн. X1, X50, X70 Plus, T1 — бүгд Монголд.",
  },
];

export const NAV_LINKS = [
  { href: "#home", label: "HOME", key: "home" },
  { href: "#models", label: "MODELS", key: "models" },
  { href: "#dealer", label: "SERVICE", key: "service" },
  { href: "#brand", label: "ABOUT", key: "about" },
  { href: "#dealer", label: "CONTACT", key: "contact" },
];

// === GLOBAL STATISTICS (dark luxury section with animated counters) ===
export const GLOBAL_STATS = [
  { value: 1000000, suffix: "+", label: "Дэлхийн эзэмшигчид", icon: "users" },
  { value: 100, suffix: "+", label: "Оронд борлуулсан", icon: "globe" },
  { value: 4, suffix: "S", label: "Үйлдвэрлэлийн төв", icon: "factory" },
  { value: 25, suffix: "+", label: "Олон улсын шагнал", icon: "award" },
];

// === TRAVEL+ LIFESTYLE FEATURES ===
export const TRAVEL_FEATURES = [
  {
    icon: "heart",
    title: "Гэр бүлийн тав тух",
    description:
      "7 суудалт уудам салон, панорамик тэнгэрлэг дээвэр, жолооны хүрд халаах. Урт замд гэр бүлд тав тухтай.",
  },
  {
    icon: "compass",
    title: "Аялалд бэлэн",
    description:
      "4WD, 700мм усанд орох, 220мм газрын тусгаар. Уул, цөл, намаг — Монголын хаа ч аяллын баатар.",
  },
  {
    icon: "cpu",
    title: "Ухаалаг технологи",
    description:
      "L2.5 ADAS, 360° камер, 20.5\" хос дижитал дэлгэц. Хотын болон аяллын замд төгс хослол.",
  },
];

// === 6 ADVANTAGES ===
export const ADVANTAGES = [
  {
    icon: "shield",
    title: "Албан ёсны баталгаа",
    description: "4 жил / 150,000 км үндсэн баталгаа. Хөдөлгүүрийн баталгаа бүрэн багтсан.",
  },
  {
    icon: "package",
    title: "Оригинал сэлбэг",
    description: "JETOUR оригинал сэлбэгийн бүрэн нөөц. Хуурамч сэлбэг байхгүй.",
  },
  {
    icon: "cpu",
    title: "Ухаалаг технологи",
    description: "L2.5 ADAS, 360° камер, Apple CarPlay / Android Auto дэмждэг.",
  },
  {
    icon: "shield-check",
    title: "Дэвшилтэт аюулгүй байдал",
    description: "ABS, EBD, ESC, HHC, HDC — 9+ аюулгүй байдлын систем.",
  },
  {
    icon: "compass",
    title: "Аяллын хүчин чадал",
    description: "Travel+ философиор бүтээгдсэн. 4WD, 700мм усанд орох.",
  },
  {
    icon: "wrench",
    title: "Мэргэжлийн үйлчилгээ",
    description: "4S стандарт үйлчилгээний төв. Мэргэжлийн механикчид.",
  },
];

// === TECHNOLOGY (dark premium section) ===
export const TECHNOLOGY_FEATURES = [
  {
    icon: "camera",
    title: "360° Камер",
    description: "Машины эргэн тойронд бүх талын хяналт. Зогсоол, нарийн нөхцөлд тайван маневр.",
  },
  {
    icon: "gauge",
    title: "Adaptive Cruise Control",
    description: "Урт замд өмнөх машинтай зай хадгалж автомат хурд тохируулна. Жолоочийн ядаргааг буулгана.",
  },
  {
    icon: "zap",
    title: "Утасгүй цэнэглэгч",
    description: "Утсаа тавьж цэнэглэх — утасгүй, кабельгүй. Smartphone-ын тав тухат хэрэглээ.",
  },
  {
    icon: "music",
    title: "Apple CarPlay",
    description: "iPhone-оо холбож, навигаци, хөгжим, дуут хяналт — нэг дор. Бүх төрлийн апп дэмждэг.",
  },
  {
    icon: "smartphone",
    title: "Android Auto",
    description: "Android утсаа холбож, Google Maps, Spotify, утас — нэг дор. Төгс холболт.",
  },
  {
    icon: "display",
    title: "Digital Cockpit",
    description: "20.5\" хос дижитал дэлгэц. Жолооны мэдээлэл ба мультимедиа нэг дор.",
  },
];

// === ADDITIONAL MODELS (T2, Dashing, X90 Plus) ===
export const ADDITIONAL_MODELS = [
  {
    id: "t2",
    name: "JETOUR T2",
    series: "Adventure",
    tagline: "Travel+ аяллын баатар",
    shortDesc: "700мм усанд орох, 4WD, Travel+ философи",
    description:
      "Travel+ философиор бүтээгдсэн аяллын SUV. Уул, цөл, намаг — хаа ч ажиллана.",
    longDescription:
      "T2 нь JETOUR-ын Travel+ философиор бүтээгдсэн аяллын SUV. 220мм газрын тусгаар, 700мм усанд орох чадвар, 6 горимын 4WD — Монголын нутагт төгс. Бартаат замд төрсөн баатар.",
    heroImage: "/jetour-cars/0de60c67e26e.png",
    exteriorImages: ["/jetour-cars/0de60c67e26e.png", "/jetour-cars/a1bafcdc2043.jpg"],
    interiorImages: ["/jetour-cars/728653558_1906599580038472_5850227596044427037_n.jfif"],
    gallery: ["/jetour-cars/0de60c67e26e.png", "/jetour-cars/a1bafcdc2043.jpg"],
    price: "129.9 сая ₮-с",
    priceNote: "Бензин ба PHEV хувилбар",
    startingPrice: "129.9 сая ₮",
    status: "coming-soon" as const,
    specs: {
      engine: "1.5T PHEV",
      power: "340 л.с.",
      torque: "600 Нм",
      transmission: "3-DHT",
      drivetrain: "4WD",
      seats: "5 суудал",
      length: "4495 мм",
      wheelbase: "2672 мм",
      groundClearance: "220 мм",
      topSpeed: "190 км/ц",
      fuel: "PHEV",
    },
    exteriorFeatures: [
      { title: "Travel+ баатар загвар", description: "Бэхлэлт бүтэц, бартаат замд тохирох дизайн." },
      { title: "700мм усанд орох", description: "Гүн усан даваа, гол горхи туулах." },
    ],
    interiorFeatures: [
      { title: "PHEV систем", description: "1000+ км нийт аяллын зай." },
      { title: "6 жолоодлогын горим", description: "Snow, Mud, Sand зэрэг 6 горим." },
    ],
    safety: ["L2.5 ADAS", "6 горим", "700мм ус"],
    highlights: [
      { label: "Цахилгаан зай", value: "100 км" },
      { label: "Нийт зай", value: "1000+ км" },
      { label: "Усанд орох", value: "700 мм" },
      { label: "Жолоодлого", value: "4WD" },
    ],
    accent: "blue" as const,
  },
  {
    id: "dashing",
    name: "JETOUR Dashing",
    series: "Crossover",
    tagline: "Технологи кросоверын ирээдүй",
    shortDesc: "15.6\" дэлгэц, Sony 8-speaker, L2.5 ADAS",
    description:
      "Залуусын хүсэн хүлээсэн дизайны шинэ хэл. Цахим仪表ийн орчин, дэвшилттэй аюулгүй байдлын систем.",
    longDescription:
      "Dashing нь залуу үеийнхэнд зориулсан технологиор дүүрэн кросоверын тодорхойлолт. Sony 8 чиглэлтэй аудо, холбооны систем, тоормосны туслалцаа, эгнээнд барих — хотын амьдралд тохирох төгс шийдэл.",
    heroImage: "/jetour-cars/bbde81a8e111.png",
    exteriorImages: ["/jetour-cars/bbde81a8e111.png", "/jetour-cars/428fe4f38e38.jpg"],
    interiorImages: ["/jetour-cars/728653558_1906599580038472_5850227596044427037_n.jfif"],
    gallery: ["/jetour-cars/bbde81a8e111.png", "/jetour-cars/428fe4f38e38.jpg"],
    price: "Тун удахгүй",
    priceNote: "Шинэ загвар",
    startingPrice: null,
    status: "coming-soon" as const,
    specs: {
      engine: "1.6L Turbo",
      power: "197 л.с.",
      torque: "290 Нм",
      transmission: "7-DCT",
      drivetrain: "FWD",
      seats: "5 суудал",
      length: "4590 мм",
      wheelbase: "2720 мм",
      groundClearance: "200 мм",
      topSpeed: "195 км/ц",
      fuel: "Бензин",
    },
    exteriorFeatures: [
      { title: "Орчин үеийн дизайн", description: "Залуусын таашаалд нийцсэн кросоверын шинэ хэл." },
      { title: "15.6\" дэлгэц", description: "Том хэмжээт цахим хяналтын дэлгэц." },
    ],
    interiorFeatures: [
      { title: "Sony 8-speaker", description: "Өндөр чанартай аудио систем." },
      { title: "L2.5 ADAS", description: "Ухаалаг жолоодлогын туслалцаа." },
    ],
    safety: ["L2.5 ADAS", "ABS", "ESC", "360° камер"],
    highlights: [
      { label: "Дэлгэц", value: "15.6\"" },
      { label: "Аудио", value: "Sony 8" },
      { label: "ADAS", value: "L2.5" },
      { label: "Хотод зарцуулга", value: "7.5L/100km" },
    ],
    accent: "blue" as const,
  },
  {
    id: "x90-plus",
    name: "JETOUR X90 Plus",
    series: "Premium",
    tagline: "Том гэр бүлийн люкс SUV",
    shortDesc: "7 суудал, 2.0T, 6 AT, том салон",
    description:
      "Том гэр бүл, урт аялалд зориулагдсан люкс SUV. 7 суудалт уудам салон, 2.0T хөдөлгүүр.",
    longDescription:
      "X90 Plus нь JETOUR-ын том гэр бүлд зориулсан люкс SUV. 2.0T хөдөлгүүр нь 254 морины хүчтэй, 6 автомат хурдны хайрцагтай. Панорамик тэнгэрлэг дээвэр, Nappa арьсан салон — урт аялалд тав тухтай.",
    heroImage: "/jetour-cars/fd97252fcc54.jpg",
    exteriorImages: ["/jetour-cars/fd97252fcc54.jpg"],
    interiorImages: ["/jetour-cars/728653558_1906599580038472_5850227596044427037_n.jfif"],
    gallery: ["/jetour-cars/fd97252fcc54.jpg"],
    price: "Тун удахгүй",
    priceNote: "Том гэр бүлийн SUV",
    startingPrice: null,
    status: "coming-soon" as const,
    specs: {
      engine: "2.0L Turbo",
      power: "254 л.с.",
      torque: "390 Нм",
      transmission: "6-AT",
      drivetrain: "FWD",
      seats: "7 суудал",
      length: "4858 мм",
      wheelbase: "2850 мм",
      groundClearance: "210 мм",
      topSpeed: "200 км/ц",
      fuel: "Бензин",
    },
    exteriorFeatures: [
      { title: "Люкс хэмжээ", description: "4858мм урт бие, 2850мм тэнхлэгийн зай." },
      { title: "Панорамик дээвэр", description: "Бүхэл гэр бүлд өргөн дэлгэц нээлттэй." },
    ],
    interiorFeatures: [
      { title: "Nappa арьсан салон", description: "Дээд зэрэглэлийн Nappa арьс." },
      { title: "7 суудал", description: "Гурван мөрөнд суудалтай, уудам." },
    ],
    safety: ["L2.5 ADAS", "5 одтой NCAP", "360° камер"],
    highlights: [
      { label: "Хөдөлгүүр", value: "2.0T" },
      { label: "Хүчин чадал", value: "254 л.с." },
      { label: "Суудал", value: "7 хүн" },
      { label: "Хэмжээ", value: "4858мм" },
    ],
    accent: "red" as const,
  },
  {
    id: "s06",
    name: "JETOUR S06",
    series: "Urban",
    tagline: "Хотын ухаалаг кросовер",
    shortDesc: "Орчин үеийн дизайн, ухаалаг технологи, тав тухтай салон",
    description:
      "Хотын өдөр тутмын амьдралд зориулсан орчин үеийн кросовер. Цэвэрхэн дизайн, ухаалаг технологи, өргөн өнгөний сонголт.",
    longDescription:
      "JETOUR S06 нь хотын залуу өрхөд зориулсан ухаалаг кросовер. Орчин үеийн дизайн, дижитал салон, өргөн уужим дотоод орчинтой. Олон төрлийн өнгөний сонголтоор хувийн хэв маягаа илэрхийлэх боломжтой.",
    heroImage: "/models/s06/snow-white.jpg",
    exteriorImages: [
      "/models/s06/snow-white.jpg",
      "/models/s06/starlit-black.jpg",
      "/models/s06/phantom-gray.jpg",
      "/models/s06/aurora-green.jpg",
    ],
    interiorImages: ["/jetour-cars/728653558_1906599580038472_5850227596044427037_n.jfif"],
    gallery: [
      "/models/s06/snow-white.jpg",
      "/models/s06/starlit-black.jpg",
      "/models/s06/cosmic-silver.jpg",
      "/models/s06/moon-grey.jpg",
    ],
    price: null,
    priceNote: "Үнийн санал авах",
    startingPrice: null,
    status: "available" as const,
    specs: {
      engine: "1.5T GDI",
      power: "156 л.с.",
      torque: "230 Нм",
      transmission: "CVT",
      drivetrain: "FWD",
      seats: "5 суудал",
      length: "4540 мм",
      wheelbase: "2720 мм",
      groundClearance: "190 мм",
      topSpeed: "180 км/ц",
      fuel: "Бензин",
    },
    exteriorFeatures: [
      { title: "Орчин үеийн дизайн", description: "Цэвэрхэн шугам, LED гэрэлтүүлэг, спортлог төрх." },
      { title: "Өргөн өнгөний сонголт", description: "6 төрлийн өнгө — хувийн хэв маягаа илэрхийлэх." },
    ],
    interiorFeatures: [
      { title: "Дижитал салон", description: "Том хэмжээт мэдрэгчтэй дэлгэц, дижитал хянах самбар." },
      { title: "Тав тухтай орчин", description: "Өргөн уужим салон, чанартай материал." },
    ],
    safety: ["ABS", "EBD", "ESC", "360° камер"],
    highlights: [
      { label: "Хөдөлгүүр", value: "1.5T GDI" },
      { label: "Хурдны хайрцаг", value: "CVT" },
      { label: "Суудал", value: "5 хүн" },
      { label: "Өнгө", value: "6 сонголт" },
    ],
    accent: "red" as const,
  },
  {
    id: "s07",
    name: "JETOUR S07",
    series: "Urban",
    tagline: "Гэр бүлийн ухаалаг SUV",
    shortDesc: "Уужим салон, дэвшилтэт технологи, тав тух",
    description:
      "Гэр бүлд зориулсан өргөн уужим SUV. Дэвшилтэт технологи, тав тухтай салон, найдвартай гүйцэтгэл.",
    longDescription:
      "JETOUR S07 нь гэр бүлд зориулсан ухаалаг SUV. Өргөн уужим салон, дэвшилтэт аюулгүй байдлын систем, орчин үеийн дизайнтай. Хот болон хот хоорондын аялалд тав тухтай шийдэл.",
    heroImage: "/models/s07/pearl-white.jpg",
    exteriorImages: [
      "/models/s07/pearl-white.jpg",
      "/models/s07/starlit-black.jpg",
      "/models/s07/phantom-gray.jpg",
      "/models/s07/ocean-blue.jpg",
    ],
    interiorImages: ["/jetour-cars/728653558_1906599580038472_5850227596044427037_n.jfif"],
    gallery: [
      "/models/s07/pearl-white.jpg",
      "/models/s07/starlit-black.jpg",
      "/models/s07/ocean-blue.jpg",
      "/models/s07/snow-white.jpg",
    ],
    price: null,
    priceNote: "Үнийн санал авах",
    startingPrice: null,
    status: "available" as const,
    specs: {
      engine: "1.6T GDI",
      power: "197 л.с.",
      torque: "290 Нм",
      transmission: "7-DCT",
      drivetrain: "FWD",
      seats: "5 суудал",
      length: "4720 мм",
      wheelbase: "2770 мм",
      groundClearance: "200 мм",
      topSpeed: "195 км/ц",
      fuel: "Бензин",
    },
    exteriorFeatures: [
      { title: "Орчин үеийн дизайн", description: "Спортлог биеийн хэлбэр, LED гэрэлтүүлэг." },
      { title: "Өргөн өнгөний сонголт", description: "5 төрлийн өнгө — далайн цэнхэрээс оддын хар хүртэл." },
    ],
    interiorFeatures: [
      { title: "Уужим салон", description: "Гэр бүлд тохирох өргөн дотоод орчин." },
      { title: "Дэвшилтэт технологи", description: "Дижитал дэлгэц, ухаалаг холболт, аюулгүй байдлын систем." },
    ],
    safety: ["ABS", "EBD", "ESC", "L2 ADAS", "360° камер"],
    highlights: [
      { label: "Хөдөлгүүр", value: "1.6T GDI" },
      { label: "Хурдны хайрцаг", value: "7-DCT" },
      { label: "Суудал", value: "5 хүн" },
      { label: "Өнгө", value: "5 сонголт" },
    ],
    accent: "red" as const,
  },
];

// Combine all models — grid/mega-menu дээр зөвхөн зарагдаж буй (available) загвар:
// X70 Plus, X50, X1, T1, S06, S07. "Тун удахгүй" загваруудыг grid-ээс хасна.
export const ALL_MODELS = [...MODELS, ...ADDITIONAL_MODELS];
export const ALL_MODELS_FOR_GRID = ALL_MODELS.filter((m) => m.status === "available");

export const LIFESTYLE_IMAGES = {
  hero: "/jetour-cars/8a3bf450cc83.jpg",
  wide1: "/jetour-cars/203031f48c7b.jpg",
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

export const SPECIAL_OFFERS: SpecialOffer[] = [
  {
    id: "x70-plus",
    modelId: "x70-plus",
    modelName: "JETOUR X70 Plus",
    poster: "/offers/x70-offer.png",
    title: "Jetour X70 Plus — зээл 1.5% хүүтэй",
    desc: "Гэр бүлийн хэрэгцээнд бүрэн нийцсэн, тав тух, өргөн уужим салон, ухаалаг технологи, найдвартай ажиллагаагаараа таны гэр бүлийн аялал, өдөр тутмын хэрэглээнд төгс шийдэл болно.",
    date: "2026.06.03",
    tagline:
      "Jetour X70 Plus бол өдөр тутмын амьдралын хэмнэлд зориулагдсан орчин үеийн 7 суудалтай кроссовер юм. 1.6 литрийн 197 морины хүчтэй турбо хөдөлгүүр нь хотын зам болон хатуу хучилттай зам дээр ч жигд, хүчтэй хөдөлгөөнийг хангана.",
    body: [
      "Энэхүү хүлэг нь аялал бүрийг тань тав тухтай, аюулгүй болгох ухаалаг системүүдээр тоноглогдсон тул та зөвхөн замандаа л анхаарлаа хандуулахад болно.",
      "Уужим долоон суудал, багтаамж ихтэй ачааны хэсэг, нямбай өнгөлгөө нь гэр бүлийн урт замын аялал болон хотын хэрэглээнд ч яг таг тохирно. Мөн панорам люк, хос дижитал дэлгэц, ухаалаг агааржуулалт зэрэг тохь тухыг нэмэх бүх шийдлийг энд бүрдүүлжээ.",
      "Санхүүжилтийн боломж — урьдчилгаа: 10%-иас эхэлнэ, сарын хүү: 1.5%, хугацаа: 96 сар хүртэл. Танд хамгийн тохиромжтой төлбөрийн хуваарийг манай дилерийн зөвлөхүүд тооцож өгнө.",
      "Дэлгэрэнгүй мэдээлэл авах, туршилтын жолоодлогод бүртгүүлэхийг хүсвэл SAIN MOTORS-ийн албан ёсны дилерийн төвд хандаарай.",
    ],
    price: "94,999,900₮",
    specs: [
      { label: "Хөдөлгүүрийн төрөл", value: "Бензин" },
      { label: "Загвар гарсан он", value: "2025" },
      { label: "Хөдөлгүүр", value: "1.6T GDI" },
      { label: "Дамжуулга", value: "6DCT" },
      { label: "Суудлын тоо", value: "7" },
      { label: "Үндсэн үнэ", value: "94,999,900₮" },
      { label: "Онцлох боломжууд", value: "Панорам дээвэр, автомат хаалга, арьсан суудал, ухаалаг түлхүүр" },
      { label: "Техникийн үзүүлэлт", value: "197 морины хүч, 290 Н·м мушгих хүч, 4,724 × 1,900 × 1,720 мм, тэнхлэгийн зай 2,720 мм" },
    ],
  },
  {
    id: "x50",
    modelId: "x50",
    modelName: "JETOUR X50",
    poster: "/offers/x50-offer.png",
    title: "Jetour X50 — таатай зээлийн нөхцөл",
    desc: "Тав тух, ухаалаг технологи, бат бөх найдвартай байдлыг хослуулсан шинэ үеийн SUV. Урьдчилгаа 10%, сарын хүү 1.5%, хугацаа 96 сар хүртэл.",
    date: "2026.06.03",
    tagline:
      "Jetour X50 — хотын амьдралд төрсөн авсаархан кроссовер. Хурдан эргэлт, хэмнэлттэй хөдөлгүүр, залуу эрч хүчтэй загвар нэг дор.",
    body: [
      "X50 нь чихмэл хотын зам, нарийн зогсоол, өдөр тутмын завгүй хэмнэлд яг тохирсон хэмжээтэй. Авсаархан биетэй ч дотогшоо уужим, орчин үеийн дижитал самбар болон утас холбох боломжтой мультимедиагаар тоноглогдсон.",
      "Аюулгүй байдлын иж бүрэн систем, олон камерын хяналт нь хот доторх өдөр тутмын хөдөлгөөнийг илүү тайван, итгэлтэй болгоно. Загварлаг гадна тал, чамин дотор засал нь залуу үеийн амтанд бүрэн нийцнэ.",
      "Санхүүжилтийн боломж: урьдчилгаа 10%-иас эхлэн, сарын хүү 1.5%, эргэн төлөх хугацаа 96 сар хүртэл.",
      "Дэлгэрэнгүй мэдээлэл авах, туршилтын жолоодлогод бүртгүүлэхийг хүсвэл SAIN MOTORS-ийн албан ёсны дилерийн төвд хандаарай.",
    ],
    price: "69,999,900₮",
    specs: [
      { label: "Хөдөлгүүрийн төрөл", value: "Бензин" },
      { label: "Загвар гарсан он", value: "2025" },
      { label: "Хөдөлгүүр", value: "1.5T" },
      { label: "Дамжуулга", value: "6DCT" },
      { label: "Суудлын тоо", value: "5" },
      { label: "Үндсэн үнэ", value: "69,999,900₮" },
      { label: "Онцлох боломжууд", value: "10.25 инчийн HD дэлгэц, Apple CarPlay & Android Auto, арьсан суудал, жолоочийн суудлын цахилгаан тохируулга" },
      { label: "Техникийн үзүүлэлт", value: "156 морины хүч, 230 Н·м мушгих хүч" },
    ],
  },
  {
    id: "x1",
    modelId: "x1",
    modelName: "JETOUR X1",
    poster: "/offers/x1-offer.png",
    title: "Jetour X1 — хотын ухаалаг сонголт",
    desc: "Дэвшилтэт технологи, орчин үеийн дизайн, хүчирхэг гүйцэтгэлийг хослуулсан бөгөөд их хотын өдөр тутмын амьдралд тохирсон шийдэл болно. Урьдчилгаа 10%, сарын хүү 1.5%.",
    date: "2026.06.03",
    tagline:
      "Jetour X1 — анхны машинд төгс тохирох авсаархан, ухаалаг SUV. Хэмнэлттэй, авахад хялбар, өдөр бүр найдвартай.",
    body: [
      "X1 нь анхны автомашинтай болох гэж буй залуус, жижиг өрхөд зориулагдсан. Авсаархан хэмжээ нь хотын нягт хөдөлгөөнд авирлахад амар, түлш хэмнэлттэй эдийн засгийн үзүүлэлт нь өдөр тутмын зардлыг мэдэгдэхүйц бууруулна.",
      "Гаднаа авсаархан ч дотогшоо тав тухтай салон, орчин үеийн мультимедиа, аюулгүй байдлын үндсэн системүүд нь энгийн загвар мэт боловч бодит үнэ цэнийг санал болгоно. Дэвшилтэт технологи, цэвэрхэн орчин үеийн дизайн хоёр эвтэйхэн хосолсон.",
      "Санхүүжилтийн боломж: урьдчилгаа 10%-иас эхлэн, сарын хүү 1.5%, эргэн төлөх хугацаа 96 сар хүртэл — анхны машинаа хүртээмжтэй нөхцөлөөр аваарай.",
      "Дэлгэрэнгүй мэдээлэл авах, туршилтын жолоодлогод бүртгүүлэхийг хүсвэл SAIN MOTORS-ийн албан ёсны дилерийн төвд хандаарай.",
    ],
    price: "84,999,900₮",
    specs: [
      { label: "Хөдөлгүүрийн төрөл", value: "Бензин" },
      { label: "Загвар гарсан он", value: "2025" },
      { label: "Хөдөлгүүр", value: "1.5T" },
      { label: "Дамжуулга", value: "6DCT" },
      { label: "Суудлын тоо", value: "5" },
      { label: "Үндсэн үнэ", value: "84,999,900₮" },
      { label: "Онцлох боломжууд", value: "Панорамик шилэн дээвэр (75 инч өргөн), 12.3 инчийн төв дэлгэц (Snapdragon chip), Apple CarPlay & Android Auto" },
      { label: "Техникийн үзүүлэлт", value: "156 морины хүч, 230 Н·м мушгих хүч, 4,590 × 1,900 × 1,685 мм, тэнхлэгийн зай 2,720 мм" },
    ],
  },
  {
    id: "t1",
    modelId: "t1",
    modelName: "JETOUR T1",
    poster: "/offers/t1-offer.png",
    title: "Jetour T цуврал — аяллын баатар",
    desc: "Орчин үеийн технологи, ухаалаг шийдэл болон олон талын хэрэглээг хослуулсан SUV. Урьдчилгаа 10%, сарын хүү 1.5%, хугацаа 96 сар хүртэл.",
    date: "2026.06.03",
    tagline:
      "Jetour T1 — Travel+ философиор бүтээгдсэн бартаат замын жинхэнэ SUV. Уул, тал, элсэн цөл — хаана ч итгэлтэй.",
    body: [
      "T1 нь Монголын эрс тэс байгаль, замгүй нутгаар аялахад зориулагдсан. Бүх дугуй хөтлөгч систем, өндөр суулт, бат бөх явах эд анги нь бартаат газар, шаварлаг зам, уулын өгсүүрийг өөртөө итгэлтэй давахад тусална.",
      "Хүчирхэг хөдөлгүүр, олон төрлийн жолоодлогын горим, ухаалаг туслах системүүд нь урт аяллыг тав тухтай, аюулгүй болгоно. Гадаад төрх нь баттай, дотор орчин нь тухтай — адал явдал хайгчдын жинхэнэ хамтрагч.",
      "Санхүүжилтийн боломж: урьдчилгаа 10%-иас эхлэн, сарын хүү 1.5%, эргэн төлөх хугацаа 96 сар хүртэл.",
      "Дэлгэрэнгүй мэдээлэл авах, туршилтын жолоодлогод бүртгүүлэхийг хүсвэл SAIN MOTORS-ийн албан ёсны дилерийн төвд хандаарай.",
    ],
    price: "119,999,900₮",
    specs: [
      { label: "Хөдөлгүүрийн төрөл", value: "Бензин / PHEV (цэнэглэдэг гибрид)" },
      { label: "Загвар гарсан он", value: "2026" },
      { label: "Хөдөлгүүр", value: "Бензин: 2.0T турбо (1998cc) · PHEV: 1.5T турбо + цахилгаан мотор (1499cc)" },
      { label: "Дамжуулга", value: "Бензин: 8AT (8 хурдны автомат) · PHEV: 3DHT" },
      { label: "Суудлын тоо", value: "5" },
      { label: "Үндсэн үнэ", value: "119,999,900₮" },
      { label: "Комплектаци", value: "T1 Comfort 2.0 · T1 PHEV (1.5T-1DHT)" },
      { label: "Онцлох боломжууд", value: "15.6 инчийн дэлгэц (Qualcomm Snapdragon 8155), Apple CarPlay & Android Auto, 10.25 инчийн LCD хэрэглэгчийн самбар, 50W утасгүй цэнэглэгч, 60W Type-C порт. PHEV: хотод цахилгаанаар, хээрээ бензинээр." },
      { label: "Техникийн үзүүлэлт", value: "Бензин: 254 морины хүч, 390 Н·м · PHEV: 590 морины хүч, 840 Н·м" },
    ],
  },
];
