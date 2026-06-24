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
    price: "95.0 сая ₮",
    startingPrice: "95.0 сая ₮",
    status: "available",
    specs: {
      engine: "1.6 TCI Turbo",
      power: "197 л.с.",
      torque: "290 Нм",
      transmission: "7-DCT",
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
      { label: "Хөдөлгүүр", value: "1.6T Turbo" },
      { label: "Хурдны хайрцаг", value: "7-DCT" },
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
    price: "85.0 сая ₮",
    startingPrice: "85.0 сая ₮",
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
    price: "99.9 / 120.0 сая ₮",
    priceNote: "Хоёр багц сонголттой",
    startingPrice: "99.9 сая ₮",
    status: "available",
    specs: {
      engine: "1.5T / 2.0T",
      power: "156–197 л.с.",
      torque: "230–390 Нм",
      transmission: "6DCT / 7DCT",
      drivetrain: "2WD / 4WD",
      seats: "5 суудал",
      length: "4500 мм",
      wheelbase: "2670 мм",
      groundClearance: "200 мм",
      topSpeed: "180–200 км/ц",
      fuel: "Бензин",
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
      { label: "Багц", value: "2 сонголт" },
      { label: "Жолоодлого", value: "2WD / 4WD" },
      { label: "Хурдны хайрцаг", value: "6/7-DCT" },
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
    price: "95.0 сая ₮",
    accent: "red" as const,
  },
  {
    model: "JETOUR X1",
    tagline: "Хотын залуусын сонголт",
    description: "Дэвшилтэт технологи, хүчирхэг гүйцэтгэл",
    image: IMG.x1_branded,
    price: "85.0 сая ₮",
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
    price: "99.9 / 120.0 сая ₮",
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
    title: "Беспроводной цэнэглэгч",
    description: "Утсаа тавьж цэнэглэх — утасгүй, кабельгүй. Smartphone-ын тав тухат хэрэглээ.",
  },
  {
    icon: "music",
    title: "Apple CarPlay",
    description: "iPhone-оо холбож,导航, хөгжим, дуут хяналт — нэг дор. Бүх төрлийн апп дэмждэг.",
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
    price: "Тун удахгүй",
    priceNote: "Plug-in Hybrid",
    startingPrice: null,
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
];

// Combine all models for the grid
export const ALL_MODELS_FOR_GRID = [...MODELS, ...ADDITIONAL_MODELS];

export const LIFESTYLE_IMAGES = {
  hero: "/jetour-cars/8a3bf450cc83.jpg",
  wide1: "/jetour-cars/203031f48c7b.jpg",
};
