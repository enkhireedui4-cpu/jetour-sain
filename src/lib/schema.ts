/**
 * Бүтэцтэй өгөгдөл (JSON-LD) — НЭГ эх сурвалж.
 *
 * Өмнө нь `layout.tsx`, `models/[id]/page.tsx`, `news/[slug]/page.tsx` гурав
 * тус тусдаа JSON-LD бичдэг байсан тул нэг нь засагдахад нөгөө нь хоцордог
 * байв (жишээ нь дилерийн хаяг layout дотор ХАТУУ бичигдсэн — `branches.ts`-ийг
 * зассан ч Google-д хуучин хаяг очсоор байсан).
 *
 * Хатуу дүрэм: **байхгүй утгыг огт оруулахгүй**. Хоосон мөр, `undefined` нь
 * Google-д алдаа болж, rich result-ыг бүхэлд нь унагаадаг. Тиймээс бүх туслах
 * функц утга байхгүй бол `undefined` буцаадаг ба төгсгөлд нь `prune` цэвэрлэнэ.
 */
import { SITE_URL, absoluteUrl } from "./site";
import {
  CONTACT,
  SHOWROOM_BRANCH,
  SERVICE_BRANCH,
  branchMap,
  type Branch,
} from "./branches";
import type { CmsCarModel } from "./cms";

/** JSON-LD зангилаа — түлхүүр нь мэдэгдэж байгаа, утга нь дурын */
type Node = Record<string, unknown>;

/** `undefined`, хоосон мөр, хоосон массив/объектыг гүнзгий цэвэрлэнэ */
function prune<T>(value: T): T {
  if (Array.isArray(value)) {
    const arr = value.map(prune).filter((v) => v !== undefined);
    return (arr.length ? arr : undefined) as T;
  }
  if (value && typeof value === "object") {
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(value as Record<string, unknown>)) {
      const pruned = prune(v);
      if (pruned !== undefined && pruned !== "") out[k] = pruned;
    }
    return (Object.keys(out).length ? out : undefined) as T;
  }
  return value;
}

/* ------------------------------------------------------------------ */
/* Байршил                                                             */
/* ------------------------------------------------------------------ */

const WEEKDAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

/**
 * "09:00 – 20:00" → `{ opens, closes }`. Таарахгүй бол (жишээ нь "Амарна")
 * `null` — дуудагч нь хаалттай өдөр гэж үзнэ.
 */
function parseHours(range: string): { opens: string; closes: string } | null {
  const m = range.match(/(\d{1,2}:\d{2})\s*[–—-]\s*(\d{1,2}:\d{2})/);
  return m ? { opens: m[1], closes: m[2] } : null;
}

/**
 * Нэг мөр ажлын цаг → `OpeningHoursSpecification`.
 *
 * Хаалттай өдрийг Google-ийн зөвлөсөн `00:00–00:00` хэлбэрээр тэмдэглэнэ —
 * мөрийг огт бичихгүй орхивол «мэдэгдэхгүй» болж, «амарна» гэсэн мэдээлэл
 * хайлтын хариултад гарахгүй.
 */
function hoursSpec(dayOfWeek: string[], range: string): Node {
  const parsed = parseHours(range);
  return {
    "@type": "OpeningHoursSpecification",
    dayOfWeek,
    opens: parsed?.opens ?? "00:00",
    closes: parsed?.closes ?? "00:00",
  };
}

function openingHours(b: Branch): Node[] {
  return [
    hoursSpec(WEEKDAYS, b.hoursWeekday),
    hoursSpec(["Saturday"], b.hoursSaturday),
    hoursSpec(["Sunday"], b.hoursSunday),
  ];
}

function postalAddress(b: Branch): Node {
  return {
    "@type": "PostalAddress",
    streetAddress: b.address,
    addressLocality: b.city,
    addressCountry: "MN",
  };
}

/** Координат байвал `GeoCoordinates`, байхгүй бол `undefined` (зохиохгүй) */
function geoNode(b: Branch): Node | undefined {
  return b.geo
    ? { "@type": "GeoCoordinates", latitude: b.geo.lat, longitude: b.geo.lng }
    : undefined;
}

/**
 * Салбарын нийтлэг талбарууд — showroom, үйлчилгээний төв хоёуланд.
 *
 * `name`-ыг ЗӨВХӨН дуудагч тавина. Өмнө нь энд байсан тул дилерийн зангилаанд
 * spread хийхэд бизнесийн нэрийг («JETOUR Mongolia — SAIN MOTORS») салбарын
 * шошгоор дарж, Google-д «JETOUR — Үндсэн Showroom» гэж очиж байв.
 *
 * `hasMap` нь `mapCanonical` — богино холбоос биш үүсгэсэн хаяг. Богино
 * холбоос хугацаа дуусахад бүтэцтэй өгөгдөл эвдрэхгүй.
 */
function placeNodeBase(b: Branch): Node {
  return {
    address: postalAddress(b),
    geo: geoNode(b),
    hasMap: branchMap(b).mapCanonical,
    telephone: `+976-${b.phone1}`,
    email: b.email,
    openingHoursSpecification: openingHours(b),
    areaServed: { "@type": "Country", name: "Mongolia" },
  };
}

/** Үйлчилгээний төв — дилерийн `department` болж холбогдоно */
function serviceNode(b: Branch): Node {
  return {
    "@type": "AutoRepair",
    "@id": `${SITE_URL}#service`,
    name: b.name,
    alternateName: b.nameEn,
    ...placeNodeBase(b),
    url: absoluteUrl("/dealer"),
    parentOrganization: { "@id": `${SITE_URL}#dealer` },
    makesOffer: b.services.map((s) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name: s },
    })),
  };
}

/* ------------------------------------------------------------------ */
/* Дилерийн үндсэн граф                                                */
/* ------------------------------------------------------------------ */

/**
 * Сайт даяарх дилерийн бүтэцтэй өгөгдөл.
 *
 * `priceRange`-ыг ЗОХИОХГҮЙ: дуудагч нь өгөгдлийн сангаас бодит үнийн мужийг
 * бодож дамжуулна (`/dealer`). Дамжуулаагүй бол талбар огт гарахгүй.
 */
export function dealerGraph(opts: { priceRange?: string } = {}): Node {
  const showroom = SHOWROOM_BRANCH;

  const dealer: Node = {
    "@type": "AutoDealer",
    "@id": `${SITE_URL}#dealer`,
    name: "JETOUR Mongolia — SAIN MOTORS",
    alternateName: showroom.name,
    legalName: CONTACT.brandFullName,
    description:
      "JETOUR брэндийн Монгол дахь албан ёсны дистрибьютор. Шинэ автомашины борлуулалт, баталгаат засвар үйлчилгээ, оригинал сэлбэг.",
    url: SITE_URL,
    logo: absoluteUrl("/logos/sain-motors-black.png"),
    image: [
      absoluteUrl("/showroom/showroom-1.webp"),
      absoluteUrl("/showroom/showroom-2.webp"),
    ],
    foundingDate: CONTACT.brandSince,
    priceRange: opts.priceRange,
    currenciesAccepted: "MNT",
    brand: { "@type": "Brand", name: "JETOUR" },
    ...placeNodeBase(showroom),
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: `+976-${showroom.phone1}`,
        contactType: "sales",
        areaServed: "MN",
        availableLanguage: ["mn"],
      },
      showroom.phone2
        ? {
            "@type": "ContactPoint",
            telephone: `+976-${showroom.phone2}`,
            contactType: "sales",
            areaServed: "MN",
            availableLanguage: ["mn"],
          }
        : undefined,
    ],
    sameAs: [CONTACT.facebook, CONTACT.instagram, CONTACT.youtube],
    department: SERVICE_BRANCH ? [serviceNode(SERVICE_BRANCH)] : undefined,
  };

  const website: Node = {
    "@type": "WebSite",
    "@id": `${SITE_URL}#website`,
    url: SITE_URL,
    name: "JETOUR Mongolia",
    inLanguage: "mn-MN",
    publisher: { "@id": `${SITE_URL}#dealer` },
  };

  return prune({ "@context": "https://schema.org", "@graph": [dealer, website] });
}

/**
 * Дилерийн үнийн мужийг НЭМЖ бичих жижиг зангилаа.
 *
 * `dealerGraph()` нь layout дотор сайтын БҮХ хуудсанд гардаг. `/dealer` дээр
 * бүтэн графыг дахин хэвлэвэл ижил `@id`-тай хоёр `AutoDealer` гарна — Google
 * тэднийг `@id`-гаар нэгтгэдэг тул алдаа болохгүй ч ~2КБ дэмий давхардана.
 * Оронд нь ижил `@id` дээр зөвхөн шинэ талбарыг залгана: JSON-LD-ийн стандарт
 * «нэг л обьект, өөр өөр газраас нэмэгдсэн талбарууд» хэлбэр.
 */
export function dealerPriceRange(priceRange?: string): Node | undefined {
  if (!priceRange) return undefined;
  return {
    "@context": "https://schema.org",
    "@type": "AutoDealer",
    "@id": `${SITE_URL}#dealer`,
    priceRange,
  };
}

/* ------------------------------------------------------------------ */
/* Замын мөр                                                           */
/* ------------------------------------------------------------------ */

/** `[{ name, path }]` → `BreadcrumbList`. Эхний зүйл нь ихэвчлэн "Нүүр". */
export function breadcrumbList(items: { name: string; path: string }[]): Node {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: absoluteUrl(it.path),
    })),
  };
}

/* ------------------------------------------------------------------ */
/* Автомашин                                                           */
/* ------------------------------------------------------------------ */

/** "94.9 сая ₮" → 94900000. Таарахгүй бол `undefined` (тоо зохиохгүй). */
export function parseMnt(price?: string | null): number | undefined {
  if (!price) return undefined;
  const m = price.match(/(\d+(?:[.,]\d+)?)\s*сая/);
  if (!m) return undefined;
  const value = Number(m[1].replace(",", "."));
  return Number.isFinite(value) ? Math.round(value * 1_000_000) : undefined;
}

/** "7 суудал" → 7 · "197 м.х." → 197. Тоо олдохгүй бол `undefined`. */
function leadingNumber(raw?: string): number | undefined {
  const m = raw?.match(/(\d+(?:[.,]\d+)?)/);
  if (!m) return undefined;
  const value = Number(m[1].replace(",", "."));
  return Number.isFinite(value) ? value : undefined;
}

function quantity(raw: string | undefined, unitText: string): Node | undefined {
  const value = leadingNumber(raw);
  return value === undefined
    ? undefined
    : { "@type": "QuantitativeValue", value, unitText };
}

/**
 * Загварын хуудасны `Car` + `Offer`.
 *
 * Үнэ нь DB-д "94.9 сая ₮" гэсэн хүн уншихад зориулсан мөр байдаг тул
 * `parseMnt`-ээр тоо болгоно — Google-д `price` нь ЗААВАЛ тоо байх ёстой.
 * Задрахгүй бол `offers` огт гарахгүй (буруу тоо бичихээс дээр).
 */
export function vehicleSchema(model: CmsCarModel): Node {
  const path = `/models/${model.id}`;
  const price = parseMnt(model.startingPrice ?? model.price);
  const specs = model.specs;
  const images = [
    model.details.colorImages?.[0]?.image,
    model.heroImage,
    ...(model.gallery ?? []).slice(0, 3),
  ].filter((src): src is string => Boolean(src));

  return prune({
    "@context": "https://schema.org",
    "@type": "Car",
    "@id": absoluteUrl(`${path}#vehicle`),
    name: model.name,
    model: model.name,
    url: absoluteUrl(path),
    description: model.description,
    image: Array.from(new Set(images)).map((src) =>
      src.startsWith("http") ? src : absoluteUrl(src),
    ),
    brand: { "@type": "Brand", name: "JETOUR" },
    manufacturer: { "@type": "Organization", name: "JETOUR" },
    bodyType: model.series,
    vehicleTransmission: specs?.transmission,
    fuelType: specs?.fuel,
    driveWheelConfiguration: specs?.drivetrain,
    vehicleSeatingCapacity: leadingNumber(specs?.seats),
    speed: quantity(specs?.topSpeed, "км/ц"),
    vehicleEngine: prune({
      "@type": "EngineSpecification",
      name: specs?.engine,
      enginePower: quantity(specs?.power, "м.х."),
      torque: quantity(specs?.torque, "Нм"),
    }),
    offers:
      price === undefined
        ? undefined
        : {
            "@type": "Offer",
            price,
            priceCurrency: "MNT",
            url: absoluteUrl(path),
            availability:
              model.status === "available"
                ? "https://schema.org/InStock"
                : "https://schema.org/PreOrder",
            seller: { "@id": `${SITE_URL}#dealer` },
          },
  });
}
