// Дилер/Showroom-ын дата — ирээдүйд шинэ салбар нэмэхэд зөвхөн энд нэмэх төдий
export type Branch = {
  id: string;
  name: string;
  nameEn: string;
  type: "showroom" | "service" | "parts" | "all-in-one";
  address: string;
  /** Хаягийн товч хэлбэр — карт, footer, breadcrumb-д (бүтэн хаяг хэт урт) */
  addressShort: string;
  /** Юу хийдэг цэг вэ — байршил сонгогчид нэрийн доор нэг мөрөөр гарна */
  category: string;
  /** Ойролцоох тэмдэглэгээ — хүн газар олоход хаягаас илүү тус болдог */
  landmark?: string;
  phone1: string;
  phone1Href: string;
  phone2?: string;
  phone2Href?: string;
  email: string;
  hoursWeekday: string;
  hoursSaturday: string;
  /** Амарна гэвэл "Амарна" гэж бич — schema-д хаалттай өдөр болж буудна */
  hoursSunday: string;
  /**
   * Google Maps дээр ЭНЭ цэгийг олох хайлтын мөр.
   *
   * `mapEmbed` ба `mapLink` хоёулаа ҮҮНЭЭС үүснэ — гараар бичихээ больсон
   * шалтгаан: өмнө нь embed нь нэг газрыг, линк нь өөр газрыг заадаг байсан
   * (embed «Holiday Inn» дээр зүү тавьдаг байв).
   */
  mapQuery: string;
  /**
   * Байршлын яг координат (Google Business Profile-оос авна).
   *
   * ЗОХИОХГҮЙ. Байхгүй үед зураг нь `mapQuery`-гээр хайж харуулна — цэг нь
   * ойролцоо, гэхдээ буруу тоо биш. Бодит утга орж ирмэгц зураг ч, JSON-LD ч
   * (geo) хоёулаа нэг дор нарийсна.
   */
  geo?: { lat: number; lng: number };
  /**
   * Google Business Profile-ийн `cid` (аравтын тоо).
   *
   * Байвал «Google Maps» товч нь **бизнесийн бүртгэл** рүү орно —
   * нэр, ажлын цаг, зураг, сэтгэгдэл, «Залгах» товчтой. Байхгүй бол зөвхөн
   * координат дээр зүү тавьсан хоосон карт гарна (нэр, цаг харагдахгүй).
   *
   * Хаанаас авах: Google Maps дээр бүртгэлээ нээгээд URL дахь
   * `!1s0x…:0xАБВ` хэсгийн ХОЁРДУГААР hex тоог аравтад хөрвүүлнэ.
   */
  placeCid?: string;
  /**
   * Sain Motors-ийн өөрөө хуваалцсан Google Maps холбоос.
   *
   * Байвал ХАРАГДАХ «Google Maps» товч түүнийг заана — маркетингийн
   * материалд тараасан холбоостой ижил байх нь ойлгомжтой. Байхгүй бол
   * координатаас үүсгэсэн холбоос. JSON-LD-ийн `hasMap` нь ямагт үүсгэсэн
   * (хугацаа дуусдаггүй) хэлбэрийг хэрэглэнэ.
   */
  mapShareLink?: string;
  /** Энэ цэг дээр үзүүлэх үйлчилгээ — хуудас ба JSON-LD хоёулаа үүнийг уншина */
  services: string[];
  city: string;
  isPrimary: boolean;
};

/**
 * Google Maps-ийн гурван URL — нэг хайлтын мөрнөөс.
 *
 * `maps/search/?api=1` ба `maps?q=…&output=embed` хоёр нь албан ёсны, тогтвортой
 * хэлбэр. Богино холбоос (`maps.app.goo.gl`, `share.google`) хэрэглэхгүй:
 * тэдгээр нь хугацаа дуусаж, тухайн бүртгэл засагдахад «Dynamic Link Not Found»
 * болж үхдэг — production сайт дээр үхсэн холбоос нь алдагдсан үйлчлүүлэгч.
 */
function mapUrls(
  query: string,
  geo?: { lat: number; lng: number },
  placeCid?: string,
) {
  const q = encodeURIComponent(query);
  // Координат байвал зүүг яг тэнд буулгана; байхгүй бол нэрээр хайна.
  const point = geo ? `${geo.lat},${geo.lng}` : q;
  /* Бүртгэл байвал шууд түүн рүү (нэр, цаг, зураг, «Залгах»); эс бөгөөс
     координат/нэрээр хайлт. */
  const generated = placeCid
    ? `https://www.google.com/maps?cid=${placeCid}`
    : `https://www.google.com/maps/search/?api=1&query=${point}`;
  return {
    mapEmbed: `https://www.google.com/maps?q=${point}&output=embed`,
    mapLink: generated,
  };
}

/**
 * Салбарын газрын зургийн холбоосууд.
 *
 * `mapLink` — харагдах товчны хаяг: Sain Motors хуваалцсан холбоос байвал
 * түүнийг, эс бөгөөс үүсгэсэн хаягийг. `mapCanonical` — JSON-LD-д зориулсан
 * ямагт үүсгэсэн хаяг (богино холбоос хугацаа дуусахад бүтэцтэй өгөгдөл
 * эвдэрдэггүй байхын тулд).
 */
export function branchMap(b: Branch) {
  const urls = mapUrls(b.mapQuery, b.geo, b.placeCid);
  return {
    ...urls,
    mapCanonical: urls.mapLink,
    mapLink: b.mapShareLink ?? urls.mapLink,
  };
}

export const BRANCHES: Branch[] = [
  {
    id: "chingeltei-holiday-inn",
    name: "SAIN MOTORS SHOWROOM",
    nameEn: "Sain Motors Showroom",
    type: "all-in-one",
    category: "Автомашин борлуулалт",
    address:
      "Чингэлтэй дүүрэг, 5-р хороо, Хуучнаар Хүнсний нэгдүгээр дэлгүүр, C1 ТВ-ийн байр, Holiday Inn зочид буудлын урд",
    addressShort: "Чингэлтэй дүүрэг, Holiday Inn-ийн урд",
    landmark: "Holiday Inn зочид буудлын урд",
    phone1: "7277-8855",
    phone1Href: "tel:+97672778855",
    phone2: "8910-0274",
    phone2Href: "tel:+97689100274",
    email: "marketing2@esain.mn",
    hoursWeekday: "09:00 – 20:00",
    hoursSaturday: "10:00 – 18:00",
    hoursSunday: "11:00 – 16:00",
    /**
     * Google дээрх бүртгэлийн нэр. Зөвхөн `geo` байхгүй үеийн нөөц зам —
     * координат байгаа тул бодитоор хэрэглэгдэхгүй, гэхдээ бүртгэл солигдвол
     * хаанаас хайхыг заасан хэвээр байна.
     */
    mapQuery: "Sain Motors-Сайн Моторс-Jetour, Улаанбаатар",
    /**
     * Sain Motors-ийн өгсөн холбоосоос задарсан бодит координат
     * (rb.gy/xji02i → maps/place/Sain+Motors-Сайн+Моторс-Jetour/…!3d47.9210074!4d106.9015123).
     * Holiday Inn-ээс 250 м — «буудлын урд» гэсэн хаягтай тохирч байгааг
     * тооцоолж шалгасан.
     */
    geo: { lat: 47.9210074, lng: 106.9015123 },
    /** 0xe052597810a96072 → аравтад. «Google Maps» товч нь бүртгэл рүү орно. */
    placeCid: "16164080384796614770",
    services: [
      "Шинэ автомашины борлуулалт",
      "Туршилтын жолоодлого",
      "Банкны санхүүжилт, зээлийн зөвлөгөө",
      "Загвар, тоноглолын танилцуулга",
    ],
    city: "Улаанбаатар",
    isPrimary: true,
  },
  {
    /**
     * Үйлчилгээний төв — showroom-оос ТУСДАА байршилтай.
     *
     * Хаягийг үйлчлүүлэгч өөрөө өгсөн хэлбэрээр нь үлдээв: ТЭЦ-4 ба Sandvik
     * хоёр нь Улаанбаатарт танигдсан тэмдэглэгээ тул хүн газар олоход
     * дүүрэг/хорооны дугаараас илүү тус болно. Дүүргийн нэрийг ЗОХИОГООГҮЙ —
     * баталгаажаагүй мэдээллийг албан ёсны сайтад бичихгүй.
     */
    id: "service-center-tec4",
    name: "JETOUR SERVICE CENTER",
    nameEn: "JETOUR Service Center",
    type: "service",
    category: "Засвар, үйлчилгээ",
    address: "ТЭЦ-4-ийн баруун хойд талд, Sandvik Customer Service Center-ийн ард",
    addressShort: "ТЭЦ-4-ийн баруун хойд талд",
    landmark: "Sandvik Customer Service Center-ийн ард",
    /* Үйлчилгээний ТУСДАА дугаар — showroom-ынхаас (7277-8855) өөр.
       `tel:` нь Sain Motors-ийн заасан хэлбэрээр (дотоодын дугаар). */
    phone1: "7010-8855",
    phone1Href: "tel:70108855",
    email: "marketing2@esain.mn",
    hoursWeekday: "09:00 – 20:00",
    hoursSaturday: "10:00 – 18:00",
    hoursSunday: "Амарна",
    mapQuery: "Sandvik custom service center, Улаанбаатар",
    /**
     * Үйлчлүүлэгчийн өөрийн тавьсан зүүнээс задарсан координат
     * (maps.app.goo.gl/rUZwthMCfSeAVWZZ9 → /maps/place/47.897841,106.796819).
     * Богино холбоос нь хугацаа дуусахад үхдэг тул тоог нь энд бэхэлж авав.
     */
    geo: { lat: 47.897841, lng: 106.796819 },
    /* Sain Motors-ийн тараадаг холбоос — харагдах товч түүнийг заана.
       Координатыг мөн үүнээс задалж авсан тул хоёр нь ижил цэг. */
    mapShareLink: "https://maps.app.goo.gl/rUZwthMCfSeAVWZZ9",
    services: [
      "Баталгаат засвар үйлчилгээ",
      "Тогтмол үзлэг, тос сэлбэлт",
      "JETOUR оригинал сэлбэг",
      "Оношилгоо",
    ],
    city: "Улаанбаатар",
    isPrimary: false,
  },
];

/** Showroom (борлуулалт) — үндсэн цэг */
export const SHOWROOM_BRANCH = BRANCHES.find((b) => b.isPrimary) ?? BRANCHES[0];

/** Үйлчилгээний төв — байхгүй бол `undefined` (UI нь блокоо гаргахгүй) */
export const SERVICE_BRANCH = BRANCHES.find((b) => b.type === "service");

// Хэрэглэхэд хялбар болгох helper
export const PRIMARY_BRANCH = BRANCHES.find((b) => b.isPrimary) ?? BRANCHES[0];

// Хуучин CONTACT-тай уялдаж байгаа тул доорх гээрүү shallow export хийв
export const CONTACT = {
  phone1: PRIMARY_BRANCH.phone1,
  phone2: PRIMARY_BRANCH.phone2 ?? PRIMARY_BRANCH.phone1,
  phone1Href: PRIMARY_BRANCH.phone1Href,
  phone2Href: PRIMARY_BRANCH.phone2Href ?? PRIMARY_BRANCH.phone1Href,
  email: PRIMARY_BRANCH.email,
  address: PRIMARY_BRANCH.address,
  addressShort: "Чингэлтэй, Holiday Inn",
  hoursWeekday: `Даваа – Баасан: ${PRIMARY_BRANCH.hoursWeekday}`,
  hoursSaturday: `Бямба: ${PRIMARY_BRANCH.hoursSaturday}`,
  hoursSunday: `Ням: ${PRIMARY_BRANCH.hoursSunday}`,
  facebook: "https://www.facebook.com/Sainmotors.mn",
  instagram: "https://www.instagram.com/sainmotors.mn/",
  youtube: "https://www.youtube.com/@SainMotorsLLC",
  messenger: "https://m.me/Sainmotors.mn",
  googleMap: branchMap(PRIMARY_BRANCH).mapLink,
  /* Үйлчилгээний төв — footer болон холбоо барих хэсэгт showroom-оос
     ТУСАД нь харуулна. Байхгүй бол UI нь мөрөө огт гаргахгүй. */
  serviceAddress: SERVICE_BRANCH?.address,
  servicePhone: SERVICE_BRANCH?.phone1,
  servicePhoneHref: SERVICE_BRANCH?.phone1Href,
  serviceMap: SERVICE_BRANCH ? branchMap(SERVICE_BRANCH).mapLink : undefined,
  brand: "SAIN MOTORS",
  brandFullName: "Сайн Моторс ХХК",
  brandRole: "Албан ёсны дистрибьютор",
  brandSince: "2023",
};

// Ажлын цагийн жагсаалт (UI-д ашиглана)
export const SHOWROOM_HOURS = [
  { day: "Даваа – Баасан", hours: PRIMARY_BRANCH.hoursWeekday },
  { day: "Бямба гараг", hours: PRIMARY_BRANCH.hoursSaturday },
  { day: "Ням гараг", hours: PRIMARY_BRANCH.hoursSunday },
];


// Мэдээний дата
export type NewsArticle = {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  dateIso: string;
  image: string;
  tag: string;
  type: "Шинэ загвар" | "Брэндийн мэдээ" | "Үйлчилгээ" | "Үйл явдал";
  accent: "electric" | "deep";
};

export const NEWS_ARTICLES: NewsArticle[] = [
  {
    slug: "jetour-t2-phev-mongolia-launch",
    title: "JETOUR T2 PHEV — Тун удахгүй Монголд",
    excerpt:
      "Сайн Моторс ХХК Jetour брэндийн шинээр худалдаанд гарах T2 PHEV загварыг танилцуулж байна. 1000+ км аяллын зай, 700мм усанд орох чадвар.",
    content:
      "Сайн Моторс ХХК Jetour брэндийн шинээр худалдаанд гарах T2 PHEV загварыг танилцуулж байна. Тус загвар нь байгаль орчинд ээлтэй, залгаж цэнэглэдэг эрчим хүчний дэвшилтэт технологи болон бартаат замын хүчин чадлыг хослуулснаараа онцлогтой.\n\nТус загвар нь цахилгаанаар 100 км, нийт аяллын зай 1000+ км. Усанд орох чадвар 700мм, газрын тусгаар 220мм — Монголын уудам нутагт төгс аяллын машин.\n\nШинэ загвартай холбоотой дэлгэрэнгүй мэдээлэл болон бэлэн болох хугацааг манай борлуулалтын багаас лавлана уу: 7277-8855, 8910-0274.",
    date: "2026.06.20",
    dateIso: "2026-06-20",
    image: "/jetour-cars/724894424_1972867063376374_6712646349117792876_n.webp",
    tag: "Шинэ",
    type: "Шинэ загвар",
    accent: "electric",
  },
  {
    slug: "jetour-g700-paula-scher-design",
    title: "Paula Scher-ийн мастер загвар JETOUR G700",
    excerpt:
      "Дэлхийн нэрт дизайнер Paula Scher JETOUR G700 төслийн Дизайны Зөвлөхөөр нэгдэв. \"Энэ бол миний ажиллаж буй анхны автомашин.\"",
    content:
      "Бид дэлхийн нэрт дизайнер Paula Scher-тай хамтран ажиллаж байгаагаа албан ёсоор зарлаж байгаадаа туйлын баяртай байна. Тэрээр JETOUR G700 төслийн Дизайны Зөвлөхөөр бидэнтэй нэгдэж байна.\n\n\"Энэ бол миний ажиллаж буй анхны автомашин\" хэмээн тэрээр онцолсон бөгөөд баг хамт олон маань энэхүү төсөлдөө үнэхээр дуртай байгаагаа хуваалцжээ.\n\nG700 нь JETOUR-ын тэргүүлэх их буудлын SUV. PHEV хосолсон систем, Nappa арьсан салон, агаарын дөрвөн салхивч — люкс тав тухатай.",
    date: "2026.05.10",
    dateIso: "2026-05-10",
    image: "/jetour-cars/712583730_921064490993111_3963637079716035790_n.jpg",
    tag: "Брэнд",
    type: "Брэндийн мэдээ",
    accent: "deep",
  },
  {
    slug: "4s-service-center-opening",
    title: "4S стандарт үйлчилгээний төв — нээгдлээ",
    excerpt:
      "Сайн Моторс 4S стандартын үйлчилгээний төвөөр ажиллаж эхэллээ. Оригинал сэлбэг, мэргэжлийн засвар, баталгаат үйлчилгээ — нэг дор.",
    content:
      "Сайн Моторс 4S стандартын үйлчилгээний төвөөр ажиллаж эхэллээ. 4S стандарт нь Sales (борлуулалт), Spare parts (сэлбэг), Service (үйлчилгээ), Survey (санал хүсэлт) гэсэн дөрвөн үндсэн бүрэлдэхүүнийг нэг дор багтаасан автомашин үйлчилгээний дээд хэмжүүр юм.\n\nБид JETOUR оригинал сэлбэгийн бүрэн нөөцтэй. Мэргэжлийн механикчид, тоног төхөөрөмж — таны машинд тав тухтай, найдвартай үйлчилгээ үзүүлнэ.\n\nХаяг: Чингэлтэй дүүрэг, Holiday Inn-ийн урд. Утас: 7277-8855.",
    date: "2026.04.15",
    dateIso: "2026-04-15",
    image: "/jetour-cars/714204588_921061650993395_1098145828660312850_n.jpg",
    tag: "Үйлчилгээ",
    type: "Үйлчилгээ",
    accent: "electric",
  },
  {
    slug: "jetour-mongolia-test-drive-event",
    title: "Mega Test Drive өдөрлөг — Тун удахгүй",
    excerpt:
      "Бүх JETOUR загвар үнэгүй турших боломжтой өдөрлөг. Бямба гарагт Showroom-д тантай уулзахыг хүлээж байна.",
    content:
      "Сайн Моторс ХХК Mega Test Drive өдөрлөг зохион байгуулна. Бүх JETOUR загварыг үнэгүй туршиж, өөрөө жолоодон үзэх боломжтой.\n\nБямба гарагт JETOUR Showroom-д (Чингэлтэй, Holiday Inn-ийн урд) 10:00 – 18:00 цагийн хооронд.\n\nГэр бүл, найзуудаараа ирж туршиж үзээрэй. Мэргэжлийн зөвлөгөө үнэгүй.\n\nБүртгэл: 7277-8855, 8910-0274.",
    date: "2026.03.28",
    dateIso: "2026-03-28",
    image: "/jetour-cars/0de60c67e26e.webp",
    tag: "Үйл явдал",
    type: "Үйл явдал",
    accent: "deep",
  },
];
