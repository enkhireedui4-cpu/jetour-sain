// src/lib/cms.ts
// Өгөгдлийн сангаас (Prisma/SQLite) CMS-ийн агуулгыг татаж,
// фронт-энд компонентуудад хэрэгтэй хуучин TS shape рүү буулгаж өгнө.
import { cache } from "react";
import { db } from "@/lib/db";
import type { JetourModel, ModelFeature, ModelSpec, SpecialOffer } from "@/lib/jetour-data";
import type { NewsArticle } from "@/lib/branches";

// === CarModel ===

/** Нэг загварын доторх хувилбар — хөдөлгүүр/трим (Бензин / Хайбрид / PHEV) */
export type VehicleVariant = {
  id: string;
  name: string;
  powertrain: string; // "Бензин" | "Хайбрид" | "PHEV" | "Цахилгаан"
  status?: "available" | "coming-soon";
  startingPrice?: string;
  priceNote?: string;
  tagline?: string;
  /** Зөвхөн ялгаатай үзүүлэлтүүдийг дарж бичнэ */
  specs?: Partial<{
    engine: string;
    power: string;
    torque: string;
    fuel: string;
    drivetrain: string;
    transmission: string;
    range: string;
    topSpeed: string;
    battery: string;
    charging: string;
  }>;
  highlights?: { label: string; value: string }[];
  loanTerms?: CarModelDetails["loanTerms"];
};

/**
 * Дэлгэц дүүрэн слайдерын нэг зураг.
 * imageMobile — утасны 9:16 хувилбар (байвал утсанд үүнийг харуулна).
 */
export type ShowcaseSlide = {
  image: string;
  caption: string;
  imageMobile?: string;
};

/** `ModelSection`-ий нэг зүйл. `imageMobile` — зөвхөн `band` хэвэнд хэрэгтэй. */
export type ModelSectionItem = {
  image: string;
  imageMobile?: string;
  title?: string;
  text?: string;
  alt?: string;
  /**
   * Сонгогч дээр харагдах БОГИНО шошго (`strip` хэвэнд).
   *
   * Зурвасын хэсгүүд нь анхдагчаар зүгээр нимгэн зам — тухайн зүйл нь юу
   * болохыг зөвхөн зураг сольсны дараа мэдэх боломжтой. Шошго өгвөл зурвас
   * нь НЭРТЭЙ сонгогч болно (эталон автомашины сайтуудын хэв). `title` нь
   * бүтэн нэр тул сонгогчид хэтэрхий урт — тиймээс тусад нь.
   *
   * Аль ч зүйлд байхгүй бол зурвас нь өмнөх шигээ хэвээр (X50 хөндөгдөхгүй).
   */
  label?: string;
};

/**
 * Загварын хуудасны нэмэлт хэсэг.
 *
 * `kind` нь АГУУЛГЫН хэлбэрээр сонгогдоно, зүгээр төрөл бүрийн зохиомж
 * үзүүлэхийн тулд биш:
 *  · `spread` — яг гурван зэрэгцээ дэлгэрэнгүй (хажуугийн 2 зураг дэлгэцийн
 *    зах хүртэл, гарчиг голд).
 *  · `strip`  — тоо нь чөлөөт, нэг төрлийн эгнээ (чирдэг слайдер).
 *  · `band`   — нэг өргөн зураг, тайлбар нь зурган дээр.
 *  · `stage`  — дэлгэц дүүрэн кино кадрын слайдер: гарчиг нь зургийн ДЭЭД
 *    ТАЛД голлож, тайлбар доод зүүн хэсэгт — хоёулаа зурган ДЭЭР.
 *  · `peek`   — хөрш кадр цухуйсан ТОМ карусель: гарчиг нь зургийн дээр
 *    хуудасны цагаан дэвсгэр дээр, голд том зураг, хажуугаар дараагийн
 *    кадрын хэсэг харагдана. Аль хэдийн бүтээгдсэн `PremiumFeatures`-ийг
 *    дахин ашиглана (зурвас, тоолуур, чирэлт, хүртээмж бэлэн).
 *
 * `stage` ба `peek` хоёрыг СОЛИН хэрэглэвэл хуудсанд хэмнэл гарна: дэлгэц
 * дүүрэн → цагаан дэвсгэр дээрх карусель → дэлгэц дүүрэн.
 *
 * `slot` нь шаблоны хаана орохыг заана.
 */
export type ModelSection = {
  id: string;
  kind: "spread" | "strip" | "band" | "stage" | "peek";
  slot: "after-exterior" | "after-interior";
  title?: string;
  subtitle?: string;
  /**
   * Зургийн кадрын харьцаа (`stage` хэвэнд). Эх зургийн харьцааг тавь —
   * тайралт гарахгүй. Анхдагч: десктоп 1.85 / утас 0.52 (9:17).
   */
  aspect?: { wide?: number; narrow?: number };
  /**
   * `stage` хэвэнд: кадрыг НЭГ ДЭЛГЭЦЭНД багтаана. Кадар нь 100vw өргөнтэй
   * тул өргөн мониторт харьцаанаас гарах өндөр нь харагдах хэсгээс хэтэрдэг
   * (1920px-д 1038px) — ингэснээр дээд гарчиг ба доод тайлбар хоёр зэрэг
   * харагдахгүй. Тавибал өндөр нь навигац ба зурвасын доорх зайгаар
   * хязгаарлагдаж, зураг дээд/доод талаас тэнцүү тайрагдана.
   */
  fitViewport?: boolean;
  /**
   * `strip` хэвийн ХАРАГДАЦЫН хувилбар.
   *
   * `"editorial"` — техникийн танилцуулгын зохиомж: зураг 68%, баруунд
   * «01 / 03» → нэр → нэг мөр үзүүлэлт гэсэн шатлал, зурвас нь 1px
   * нейтраль зам + 2px улаан идэвхтэй хэсэг (дарангуйлахгүй), текст нь
   * зургийн дараа 8px мандан орно.
   *
   * Тавиагүй бол өмнөх харагдац хэвээр (X50 хөндөгдөхгүй).
   */
  stripLayout?: "editorial";
  items: ModelSectionItem[];
};

export type CarModelDetails = {
  /** Хөдөлгүүр/трим хувилбарууд. Байхгүй бол нэг хувилбартай загвар. */
  variants?: VehicleVariant[];
  /**
   * Шаблонд нэмж орох хэсгүүд (`slot`-оор байрлана). Байхгүй загварт хуудас
   * өмнөх шигээ хэвээр — тул нэг загварыг баяжуулахад бусад нь хөндөгдөхгүй.
   */
  sections?: ModelSection[];
  /** `en` — өнгөний англи нэр; арын том сүүдэрлэсэн үг болж харагдана (заавал биш). */
  colorImages?: { name: string; hex: string; image: string; en?: string }[];
  /** true бол өнгөний зургууд нь тунгалаг дэвсгэртэй PNG — студи маягаар үзүүлнэ */
  colorTransparent?: boolean;
  /**
   * Өнгөний студийн ДЭЛГЭРЭНГҮЙ хувилбар (`colorTransparent`-тэй хамт).
   *
   * Албан ёсны JETOUR конфигуратортой ижил зохиомж: зүүн талд гурван гол
   * үзүүлэлт нимгэн зураастай, голд машин БҮТНЭЭР (тайралтгүй), баруун
   * зах дагуу өнгөний нэр босоо. Дэвсгэр нь сонгосон будгийн тонд орно.
   *
   * `highlights`-ийн эхний гурвыг үзүүлэлт болгон авна.
   */
  colorStudioPro?: boolean;
  /**
   * Өнгө сонгогчийн авсаархан, голлосон хувилбар: swatch-ууд 38px тэгш дугуй,
   * градиент/сүүдэргүй, сонгогдсоныг хос ринг илэрхийлнэ, өнгөний нэр нь
   * swatch-уудын доор голлоно. Босоо зай багасна — машин илүү тодрох.
   */
  colorPickerCompact?: boolean;
  /**
   * true бол "Дотор салон" хэсэг нь "Гадна үзэмж"-тэй ижил editorial
   * зохиомжтой болно: том цагаан шошго дээд зүүн, тайлбар доод зүүн,
   * нарийн сум + "01 / 03" тоолуур доод баруун.
   */
  interiorEditorial?: boolean;
  /**
   * Дотор салоны editorial story — 4 зургаар өгүүлэх авсаархан блок.
   * Байвал "Дотор салон" хэсэг нь үүгээр гарна.
   */
  interiorStory?: {
    title: string;
    lead: string;
    features: {
      image: string;
      objectPosition?: string;
      title: string;
      text: string;
      chips?: { value: string; label: string }[];
      wide?: boolean;
    }[];
  };
  /**
   * "Premium Features" — кинематик хэвтээ карусель (голд том актив зураг,
   * хажуу талд хөрш зураг хэсэгчлэн). Байвал "Дотор салон" хэсгийг бүхэлд
   * нь орлоно (interiorStory / showcase.interior-аас өмнө шалгагдана).
   */
  premiumFeatures?: {
    eyebrow?: string;
    title: string;
    subtitle?: string;
    features: {
      id: string;
      /** Хэрэглэгддэггүй — слайд бүрийн латин шошгыг хассан (зөвхөн блокийн
          `eyebrow` харагдана). Хуучин датаг эвдэхгүйн тулд л үлдээв. */
      eyebrow?: string;
      title: string;
      description: string;
      image: string;
      alt: string;
      objectPosition?: string;
    }[];
  };
  /**
   * Showcase хэсгүүдийн гарчгийг загвар бүрт солих.
   *
   * Анхдагч нь "Гадна үзэмж" / "Дотор салон". Гэхдээ загвар болгоны өгүүлэмж
   * ижил байх албагүй: жишээ нь T2-ын хоёр дахь блок нь салон биш, БАРТААТ
   * ЗАМЫН ЧАДВАР-ын тухай (тэр нь түүний гол давуу тал). Ингэснээр нэг
   * шаблоныг бүх загварт тулгахгүй.
   */
  showcaseTitles?: { exterior?: string; interior?: string };
  /**
   * Хэсгийн гарчгийн доорх нэг мөр тайлбар. Албан ёсны JETOUR утасны
   * зохиомжид гарчиг үргэлж нэг мөр дэд гарчигтай хамт байдаг — тэр нь
   * хэсгийн агуулгыг нэг харцаар ойлгуулж, гарчгийг агаартай болгоно.
   */
  showcaseSubtitles?: { exterior?: string; interior?: string };
  /**
   * 360° эргэлтийн кадрууд (эргэлтийн дарааллаар). Байвал "Гадна үзэмж"-ийн
   * дараа чирж эргүүлдэг блок гарна. Байхгүй бол хэсэг огт харагдахгүй —
   * загвар бүрт заавал байх шаардлагагүй.
   */
  spin360?: {
    /** Өнгө бүр өөрийн кадрын багцтай — эргэлтийн дараалал ижил урттай */
    colors: { id: string; name: string; nameEn?: string; hex: string; frames: string[] }[];
    /** Хуудсанд орж ирэхэд харагдах кадр (0 нь ихэвчлэн АРД тал — 3/4 өнцөг сонго) */
    startFrame?: number;
    /** Хэсгийн гарчиг — анхдагч "Гадна төрх" */
    title?: string;
    /** Англи дэд мөр (жишээ "Exterior & Colors") — жижиг, хөнгөн */
    titleEn?: string;
  };
  galleryImages?: string[];
  /**
   * Технологийн онцлох хэсэг — цөөн (2–3) сонгосон ухаалаг шийдэл.
   *
   * "Онцлох боломжууд" слайдераас ЯЛГААТАЙ: энэ нь каталог биш, тайван
   * editorial блок. Байвал тухайн загварт слайдерын ОРОНД энэ гарна —
   * ингэснээр нэг агуулга хоёр газар давхардахгүй.
   */
  technologyHighlights?: {
    id: string;
    title: string;
    description: string;
    image: string;
    alt: string;
  }[];
  /**
   * "Технологи" слотын кадрын харьцаа — ЭХ ЗУРГИЙНХ. Байхгүй бол 1.89.
   * (T2-ын эх зураг 2.49 тул анхдагчаар 24% тайрагдаж байв.)
   */
  technologyAspect?: number;
  techHighlights?: { image: string; title: string; caption: string }[];
  interiorHighlights?: { image: string; title: string; caption: string }[];
  qualityHighlights?: { image: string; title: string; caption: string }[];
  safetyHighlights?: { image: string; title: string; caption: string }[];
  exteriorImagesOverride?: string[];
  /**
   * Загварын хуудасны hero слайдер — 2-оос дээш зураг бол автоматаар гүйдэг
   * слайдер болно. Нэг ч зураг байхгүй бол ердийн нэг зурагтай hero харагдана.
   */
  heroSlides?: string[];
  /**
   * Утасны босоо hero зургууд — heroSlides-тэй ижил дараалалтай байх ёстой.
   * Байвал утсанд зураг тайрагдалгүй бүтнээрээ харагдана.
   */
  heroSlidesMobile?: string[];
  /**
   * Утасны hero кадрын харьцаа (CSS `aspect-ratio`, жишээ "4 / 5").
   *
   * Анхдагч нь "9 / 16" — эх зураг 9:16 бол кадр яг таарч, тайралт гарахгүй.
   *
   * `"fill"` гэвэл харьцааны оронд ДЭЛГЭЦИЙГ БҮТЭН эзэлнэ (`100svh − цэс`).
   * Эх зураг дэлгэцээс өндөр харьцаатай (жишээ нь 9:19) үед үүнийг хэрэглэнэ:
   * тайралт бага (6%) бөгөөд толгой нь хагас харагдахгүй.
   */
  heroMobileAspect?: string;
  showcase?: {
    hero?: string;
    exterior: ShowcaseSlide[];
    interior: ShowcaseSlide[];
  };
  mosaic?: string[];
  /**
   * "Дотор салон"-ы дараа орох бичлэг. Дарж тоглуулна (preload="none" —
   * хэрэглэгч дарах хүртэл юу ч татагдахгүй).
   */
  video?: { src: string; poster?: string; title?: string; caption?: string };
  /**
   * Дэлгэрэнгүй үзүүлэлт — БҮЛЭГЛЭСЭН хэлбэрээр, "Үндсэн техникийн үзүүлэлт"-ийн
   * доор нам гүм нээгддэг блокт. Брошюр байхгүй загварт эх сурвалжаас
   * баталгаажсан үзүүлэлтүүд хаягдахгүй байх зам.
   *
   * Байхгүй загварт блок ГАРАХГҮЙ — бусад загварын харагдац хөндөгдөхгүй.
   */
  specGroups?: { title: string; rows: { label: string; value: string }[] }[];
  featureGroups?: { icon: string; title: string; items: string[] }[];
  winterFeatures?: string[];
  loanTerms?: {
    downPayments: { percent: string; amount: string }[];
    bank: { term: string; rate: string; payments: string[] }[];
    nbfiNote?: string;
  };
  /** Татаж авах брошюр (PDF) — public доторх зам. Байхгүй бол хүсэлт үлдээх хэлбэрээр харагдана. */
  brochure?: string;
  /**
   * true бол загварын хуудасны hero зургийг дэлгэц дүүрэн (object-cover) харуулна.
   * Фото маягийн hero-д тохирно. Студийн цагаан дэвсгэртэй зурагт битгий асаа —
   * машин тайрагдана. Анхдагч: contain.
   */
  heroCover?: boolean;
  /**
   * Толгойн зургийн кадрын нарийвчлал (томсголт + дээш зөөлт).
   *
   * Анхдагчаар АСААЛТТАЙ: тодорхой загварын зурагт хоосон тэнгэр/асфальт их
   * байсан тул 1.10–1.12 томсгож машиныг том харуулах шаардлагатай байв.
   * Аль хэдийн зөв кадарласан зурагт `false` тавь — эс тэгвээс томсголт нь
   * машиныг тайрна.
   */
  heroZoom?: boolean;
  /**
   * Hero-гийн утасны хувилбар — 9:16 босоо зураг (`models/<id>/tall/…`).
   * Байвал утсанд үүнийг, дэлгэц дээр өргөн hero-г харуулна: өргөн зургийг
   * утсанд cover-оор тайрахгүй тул машин бүтнээрээ, кадр зохиогчийн санаагаар
   * харагдана. Байхгүй бол хоёр төхөөрөмжид ижил зураг (өмнөх зан үйл).
   */
  heroImageMobile?: string;
  /**
   * "Техникийн үзүүлэлт" хэсгийн зураг. Байхгүй бол hero зургийг ашиглана.
   * Hero-гоос өөр кадр тавихад хэрэглэнэ.
   */
  specsImage?: string;
  /**
   * Урьдчилсан захиалга авах загвар (тун удахгүй ирэх). true үед хуудасны CTA
   * "Урьдчилсан захиалга" болж, доод талын форм нэр + утас хоёрыг л асууна.
   */
  preOrder?: boolean;
};

export type CoreCarModelDetails = {
  exteriorImages: string[];
  interiorImages: string[];
  gallery: string[];
  specs: ModelSpec;
  exteriorFeatures: ModelFeature[];
  interiorFeatures: ModelFeature[];
  safety: string[];
  highlights: { label: string; value: string }[];
};

export type CmsCarModel = JetourModel & {
  order: number;
  published: boolean;
  details: CarModelDetails;
};

function emptySpecs(): ModelSpec {
  return {
    engine: "",
    power: "",
    torque: "",
    transmission: "",
    drivetrain: "",
    seats: "",
    length: "",
    wheelbase: "",
    groundClearance: "",
    topSpeed: "",
    fuel: "",
  };
}

/** @internal — exported only for unit testing; not part of the public CMS API. */
export function parseDetailsJson(raw: string): CoreCarModelDetails & CarModelDetails {
  let parsed: Record<string, unknown> = {};
  try {
    parsed = JSON.parse(raw || "{}");
  } catch {
    parsed = {};
  }
  return {
    exteriorImages: (parsed.exteriorImages as string[]) ?? [],
    interiorImages: (parsed.interiorImages as string[]) ?? [],
    gallery: (parsed.gallery as string[]) ?? [],
    specs: (parsed.specs as ModelSpec) ?? emptySpecs(),
    exteriorFeatures: (parsed.exteriorFeatures as ModelFeature[]) ?? [],
    interiorFeatures: (parsed.interiorFeatures as ModelFeature[]) ?? [],
    safety: (parsed.safety as string[]) ?? [],
    highlights: (parsed.highlights as { label: string; value: string }[]) ?? [],
    variants: parsed.variants as CarModelDetails["variants"],
    sections: parsed.sections as CarModelDetails["sections"],
    colorImages: parsed.colorImages as CarModelDetails["colorImages"],
    colorTransparent: parsed.colorTransparent as CarModelDetails["colorTransparent"],
    colorPickerCompact: parsed.colorPickerCompact as CarModelDetails["colorPickerCompact"],
    colorStudioPro: parsed.colorStudioPro as CarModelDetails["colorStudioPro"],
    interiorStory: parsed.interiorStory as CarModelDetails["interiorStory"],
    interiorEditorial: parsed.interiorEditorial as CarModelDetails["interiorEditorial"],
    premiumFeatures: parsed.premiumFeatures as CarModelDetails["premiumFeatures"],
    showcaseTitles: parsed.showcaseTitles as CarModelDetails["showcaseTitles"],
    showcaseSubtitles: parsed.showcaseSubtitles as CarModelDetails["showcaseSubtitles"],
    spin360: parsed.spin360 as CarModelDetails["spin360"],
    galleryImages: parsed.galleryImages as CarModelDetails["galleryImages"],
    technologyHighlights: parsed.technologyHighlights as CarModelDetails["technologyHighlights"],
    technologyAspect: parsed.technologyAspect as CarModelDetails["technologyAspect"],
    techHighlights: parsed.techHighlights as CarModelDetails["techHighlights"],
    interiorHighlights: parsed.interiorHighlights as CarModelDetails["interiorHighlights"],
    qualityHighlights: parsed.qualityHighlights as CarModelDetails["qualityHighlights"],
    safetyHighlights: parsed.safetyHighlights as CarModelDetails["safetyHighlights"],
    exteriorImagesOverride: parsed.exteriorImagesOverride as CarModelDetails["exteriorImagesOverride"],
    heroSlides: parsed.heroSlides as CarModelDetails["heroSlides"],
    heroSlidesMobile: parsed.heroSlidesMobile as CarModelDetails["heroSlidesMobile"],
    heroMobileAspect: parsed.heroMobileAspect as CarModelDetails["heroMobileAspect"],
    showcase: parsed.showcase as CarModelDetails["showcase"],
    mosaic: parsed.mosaic as CarModelDetails["mosaic"],
    video: parsed.video as CarModelDetails["video"],
    specGroups: parsed.specGroups as CarModelDetails["specGroups"],
    featureGroups: parsed.featureGroups as CarModelDetails["featureGroups"],
    winterFeatures: parsed.winterFeatures as CarModelDetails["winterFeatures"],
    loanTerms: parsed.loanTerms as CarModelDetails["loanTerms"],
    brochure: parsed.brochure as CarModelDetails["brochure"],
    heroCover: parsed.heroCover as CarModelDetails["heroCover"],
    heroZoom: parsed.heroZoom as CarModelDetails["heroZoom"],
    heroImageMobile: parsed.heroImageMobile as CarModelDetails["heroImageMobile"],
    specsImage: parsed.specsImage as CarModelDetails["specsImage"],
    preOrder: parsed.preOrder as CarModelDetails["preOrder"],
  };
}

type CarModelRow = {
  id: string;
  name: string;
  series: string;
  tagline: string;
  shortDesc: string;
  description: string;
  longDescription: string;
  heroImage: string;
  price: string | null;
  priceNote: string | null;
  startingPrice: string | null;
  status: string;
  accent: string;
  order: number;
  detailsJson: string;
  published: boolean;
};

/** @internal — exported only for unit testing; not part of the public CMS API. */
export function shapeCarModel(row: CarModelRow): CmsCarModel {
  const details = parseDetailsJson(row.detailsJson);
  const {
    exteriorImages,
    interiorImages,
    gallery,
    specs,
    exteriorFeatures,
    interiorFeatures,
    safety,
    highlights,
    ...extra
  } = details;

  return {
    id: row.id,
    name: row.name,
    series: row.series,
    tagline: row.tagline,
    shortDesc: row.shortDesc,
    description: row.description,
    longDescription: row.longDescription,
    heroImage: row.heroImage,
    exteriorImages,
    interiorImages,
    gallery,
    price: normalizeCurrencySpacing(row.price),
    priceNote: normalizeCurrencySpacing(row.priceNote ?? undefined),
    startingPrice: normalizeCurrencySpacing(row.startingPrice ?? undefined),
    status: (row.status as JetourModel["status"]) ?? "available",
    specs,
    exteriorFeatures,
    interiorFeatures,
    safety,
    highlights,
    accent: (row.accent as JetourModel["accent"]) ?? "red",
    order: row.order,
    published: row.published,
    details: extra,
  };
}

// Үнийн мөрийн ЗӨВХӨН харагдацыг (spacing) нэгтгэнэ — өгөгдлийн сан дахь утгыг
// өөрчлөхгүй. "94,999,900₮" (зай байхгүй) → "94,999,900 ₮"; "94.9 сая ₮" (зөв
// зайтай) хэвээрээ үлдэнэ. Тоо/абрэвиатур хэлбэрийг хооронд нь хөрвүүлэхгүй,
// зөвхөн ₮-ийн өмнөх зайг стандартчилна.
function normalizeCurrencySpacing<T extends string | null | undefined>(value: T): T {
  if (typeof value !== "string") return value;
  return value.replace(/\s+/g, " ").replace(/(\S)\s*₮/g, "$1 ₮").trim() as T;
}

// cache(): нэг server request дотор давхардсан дуудлагыг (generateMetadata + page)
// нэг DB round-trip болгож дедуп хийнэ. Request-scoped тул cross-request stale үүсгэхгүй.
export const getAllCarModels = cache(async (): Promise<CmsCarModel[]> => {
  const rows = await db.carModel.findMany({
    where: { published: true },
    orderBy: { order: "asc" },
  });
  return rows.map(shapeCarModel);
});

export const getCarModelById = cache(async (id: string): Promise<CmsCarModel | null> => {
  const row = await db.carModel.findUnique({ where: { id } });
  if (!row || !row.published) return null;
  return shapeCarModel(row);
});

// === NewsArticle ===

type NewsRow = {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  dateIso: string;
  image: string;
  tag: string;
  type: string;
  accent: string;
};

/** @internal — exported only for unit testing; not part of the public CMS API. */
export function shapeNews(row: NewsRow): NewsArticle {
  return {
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt,
    content: row.content,
    date: row.date,
    dateIso: row.dateIso,
    image: row.image,
    tag: row.tag,
    type: row.type as NewsArticle["type"],
    accent: row.accent as NewsArticle["accent"],
  };
}

export const getAllNews = cache(async (): Promise<NewsArticle[]> => {
  const rows = await db.newsArticle.findMany({
    where: { published: true },
    orderBy: { dateIso: "desc" },
  });
  return rows.map(shapeNews);
});

export const getNewsBySlug = cache(async (slug: string): Promise<NewsArticle | null> => {
  const row = await db.newsArticle.findUnique({ where: { slug } });
  if (!row || !row.published) return null;
  return shapeNews(row);
});

// === Promotion / SpecialOffer ===

type PromotionRow = {
  id: string;
  modelId: string;
  modelName: string;
  poster: string;
  title: string;
  desc: string;
  date: string;
  body: string;
  tagline: string;
  price: string | null;
  specsJson: string;
};

/** @internal — exported only for unit testing; not part of the public CMS API. */
export function shapePromotion(row: PromotionRow): SpecialOffer {
  let body: string[] = [];
  let specs: { label: string; value: string }[] | undefined;
  try {
    body = JSON.parse(row.body || "[]");
  } catch {
    body = [];
  }
  try {
    specs = JSON.parse(row.specsJson || "[]");
  } catch {
    specs = [];
  }
  return {
    id: row.id,
    modelId: row.modelId,
    modelName: row.modelName,
    poster: row.poster,
    title: row.title,
    desc: row.desc,
    date: row.date,
    body,
    tagline: row.tagline,
    price: normalizeCurrencySpacing(row.price ?? undefined),
    specs,
  };
}

export const getAllPromotions = cache(async (): Promise<SpecialOffer[]> => {
  const rows = await db.promotion.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
  });
  return rows.map(shapePromotion);
});

export const getPromotionById = cache(async (id: string): Promise<SpecialOffer | null> => {
  const row = await db.promotion.findUnique({ where: { id } });
  if (!row || !row.published) return null;
  return shapePromotion(row);
});
