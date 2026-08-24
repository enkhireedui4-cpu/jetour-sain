/**
 * T1 PHEV — загварын хуудасны агуулга.
 *
 * Эх сурвалж: jetourglobal.com/T1iDM/ ба /T1iDM/specification (Firecrawl).
 * Зураг: `.firecrawl/t1idm/` → `public/models/t1-phev/` (webp).
 *
 * ЭХ СУРВАЛЖИЙН ЭРХ: зургууд нь JETOUR-ын албан ёсны глобал хуудсанаас.
 * Хөгжүүлэлтийн эх материал болгон хэрэглэв; үйлдвэрлэлд гаргахаас өмнө
 * дистрибьютерээр эрхийг батлуулах шаардлагатай (README-д тэмдэглэсэн).
 *
 * НЭРШИЛ: харагдах нэр нь ЗӨВХӨН "T1 PHEV". Техникийн нэршил "T1 i-DM" нь
 * зөвхөн үзүүлэлтийн блокт нэг удаа гарна.
 *
 * ТООН ӨГӨГДӨЛ: бүгд эх сурвалжийн специфкацаас БАЙГААГААР. Эх сурвалжид
 * байхгүй үзүүлэлт (хосолсон системийн чадал, газраас хөндийрөх өндөр,
 * дээд хурд, зарцуулалт, цахилгаан явалтын зай) НЭМЭЭГҮЙ.
 */
import { PrismaClient } from "@prisma/client";

const P = "/models/t1-phev";
const SPIN_FRAMES = Array.from({ length: 36 }, (_, i) => String(i * 2 + 1).padStart(2, "0"));
const spin = (c) => SPIN_FRAMES.map((n) => `${P}/spin/${c}/${n}.webp`);

/** Гадна өнгө — фолдерын нэр нь эх сурвалжийнх, харагдах нэр монголоор */
const COLORS = [
  { id: "gold", name: "Шампань", nameEn: "Gold", hex: "#B7AE9E", frames: spin("gold") },
  { id: "silver", name: "Титан саарал", nameEn: "Silver", hex: "#A9ADB2", frames: spin("silver") },
  { id: "white", name: "Сувдан цагаан", nameEn: "White", hex: "#EDEEF0", frames: spin("white") },
  { id: "black", name: "Торгон хар", nameEn: "Black", hex: "#3A3C40", frames: spin("black") },
];

const details = {
  /* --- 01 Толгой --------------------------------------------------------
     Студийн 3/4 урд кадр. Дэлгэц дүүрэн, дээр нь зөвхөн нэр ба төрөл
     (бараан бэх — кадар цайвар тул хөшиг хэрэггүй). Утсанд ижил кадрын
     босоо хувилбар: 750×1624. */
  heroSlides: [`${P}/hero/wide/01.webp`],
  heroSlidesMobile: [`${P}/hero/tall/01.webp`],
  heroMobileAspect: "750 / 1624",

  /* --- 02 + 11 Өнгө ба 360° ---------------------------------------------
     Нэг л харилцан үйлдэл: өнгө сонгох + чирж эргүүлэх. Тусад нь
     статик өнгөний блок ГАРГАХГҮЙ — тэр нь агуулгыг хоёр дахин
     үзүүлэх болно. `Spin360` нь зөвхөн ИДЭВХТЭЙ өнгийг ачаалж (36
     кадар ≈1.05MB), 620мс маскаар будгийг сольдог. */
  spin360: {
    title: "Гадна төрх ба өнгө",
    startFrame: 24, // 49.webp — 3/4 урд өнцөг
    colors: COLORS,
  },

  /* Ердийн галерейн хэсгүүдийг ЗОРИУДААР хаана — өгүүллэг нь доорх
     `sections`-оор явна (хоосон массив = "хэсэг байхгүй" гэсэн гэрээ). */
  showcase: { exterior: [], interior: [] },

  specsImage: `${P}/spin/gold/49.webp`,

  specs: {
    engine: "1.5TD (1499 см³) + цахилгаан мотор",
    /* Эх сурвалжид ХОСОЛСОН системийн чадал байхгүй тул хөдөлгүүрийн
       дээд чадлыг байгаагаар. `fuel`-д "PHEV" товчлол байвал шаблон
       "Хосолсон системийн чадал" гэж нэрлэдэг — тэр нь энд БУРУУ
       болох тул түүнийг зориуд оруулаагүй. */
    power: "132 м.х. (99 кВт)",
    torque: "200 Н·м",
    transmission: "Нэг шатлалт DHT",
    drivetrain: "Урд хөтлөгч (FF)",
    seats: "5 (2+3)",
    length: "4705 мм",
    wheelbase: "2800 мм",
    fuel: "Цэнэглэгддэг гибрид",
  },

  /* --- 12 Дэлгэрэнгүй үзүүлэлт (бүлэглэсэн) -----------------------------
     T1 PHEV-ийн брошюр байхгүй тул эх сурвалжаас баталгаажсан
     үзүүлэлтүүд энд бүтнээр хадгалагдана. */
  specGroups: [
    {
      title: "Хэмжээ",
      rows: [
        { label: "Урт × өргөн × өндөр", value: "4705 × 1967 × 1843 мм" },
        { label: "Тэнхлэг хоорондын зай", value: "2800 мм" },
        { label: "Суудлын байрлал", value: "2+3" },
        { label: "Их биеийн бүтэц", value: "Даацын" },
      ],
    },
    {
      title: "Хөдөлгүүр ба мотор",
      rows: [
        { label: "Хөдөлгүүр", value: "1.5TD, 1499 см³, 4 цилиндр" },
        { label: "Хөдөлгүүрийн чадал", value: "132 м.х. (99 кВт), 5200 эрг/мин" },
        { label: "Эргүүлэх момент", value: "200 Н·м" },
        { label: "Цахилгаан мотор", value: "Байнгын магнитан синхрон, P3" },
        { label: "Моторын чадал", value: "150 кВт" },
        { label: "Моторын эргүүлэх момент", value: "310 Н·м" },
        { label: "Шатахууны төрөл", value: "Цэнэглэгддэг гибрид (PHEV), E30" },
      ],
    },
    {
      title: "Батарей ба цэнэглэлт",
      rows: [
        { label: "Өндөр хүчдэлийн батарей", value: "LiFePO4, 26.7 кВт·ц" },
        { label: "Цэнэглэх залгуур", value: "CCS2" },
        { label: "Хурдан цэнэглэлт", value: "0.5 ц (30–80%)" },
        { label: "Удаан цэнэглэлт", value: "4 цагаас доош (30–100%)" },
        { label: "Батарейн хамгаалалт", value: "Хажуу ба доод алюминий хамгаалалт" },
      ],
    },
    {
      title: "Дамжуулга ба явах эд",
      rows: [
        { label: "Хурдны хайрцаг", value: "Нэг шатлалт DHT" },
        { label: "Хөтлөгч тэнхлэг", value: "Урд (FF)" },
        { label: "Урд дүүжин", value: "МакФерсон, бие даасан" },
        { label: "Хойд дүүжин", value: "Мультилинк, бие даасан" },
        { label: "Урд тоормос", value: "Агааржуулалттай диск" },
        { label: "Хойд тоормос", value: "Диск" },
        { label: "Гар тоормос", value: "Электрон (EPB)" },
        { label: "Дугуй", value: "235/60 R19" },
        { label: "Жолоодлогын режим", value: "Sport · Economic · Standard" },
        { label: "Явалтын режим", value: "EV · HEV" },
        { label: "Замгүй газрын режим", value: "Snow" },
      ],
    },
    {
      title: "Аюулгүй байдлыг дэмжих технологи",
      rows: [
        { label: "Автомат яаралтай тоормосны систем (AEB)", value: "Байна" },
        { label: "Эгнээнээс гарахыг анхааруулах систем (LDW)", value: "Байна" },
        { label: "Эгнээнд байлгах туслах систем (LKA)", value: "Байна" },
        { label: "Урд мөргөлдөхөөс сэрэмжлүүлэх систем (FCW)", value: "Байна" },
        { label: "Сохор бүсийн хяналтын систем (BSD)", value: "Байна" },
        { label: "Хойд хөндлөн хөдөлгөөнөөс сэрэмжлүүлэх систем (RCTA)", value: "Байна" },
        { label: "Хойд мөргөлдөхөөс сэрэмжлүүлэх систем (RCW)", value: "Байна" },
        { label: "Хаалга онгойлгохоос сэрэмжлүүлэх систем (DOW)", value: "Байна" },
        { label: "540° орчны харах систем", value: "Байна" },
        { label: "Хөдөлгөөний тогтвортой байдлын хяналт (ESC)", value: "Байна" },
        { label: "Довны туслах ба уруудалтын хяналт (HDC)", value: "Байна" },
        { label: "Бүрэн хурдны адаптив круиз", value: "Байна" },
        { label: "Автомат паркинг", value: "Байна" },
        { label: "Дугуйн даралтын хяналт (TPMS)", value: "Байна" },
        { label: "Аюулгүйн дэр", value: "Жолооч/зорчигч, урд хажуу, урд/хойд хөшиг" },
        { label: "Хүүхдийн суудлын холбогч", value: "ISOFIX / LATCH" },
      ],
    },
    {
      title: "Тоноглол",
      rows: [
        { label: "Суудлын бүрээс", value: "Арьс" },
        { label: "Суудлын агааржуулалт", value: "Жолооч ба зорчигч" },
        { label: "Хойд суудал", value: "Бүрэн хэвтүүлдэг, хэсэгчлэн буулгах" },
        { label: "Дээврийн тавиур", value: "Байна" },
        { label: "USB / Type-C", value: "Урд 1+1, хойд 1+1" },
        { label: "Техникийн нэршил", value: "T1 i-DM" },
      ],
    },
  ],

  /* --- Тоноглолын хувилбар ----------------------------------------------
     Хүчний систем нь хоёуланд ИЖИЛ — ялгаа нь зөвхөн тоноглолд. Эх
     сурвалжийн хүснэгтээс 21 ялгаа гарсны хамгийн ач холбогдолтойг авав.
     ҮНЭ: хувилбар тус бүрийн үнэ эх сурвалжид байхгүй тул оруулаагүй. */
  variants: [
    {
      id: "standard",
      name: "Standard",
      powertrain: "PHEV",
      status: "available",
      tagline: "Үндсэн тоноглол",
      highlights: [
        { label: "Суудлын агааржуулалт", value: "Жолооч ба зорчигч" },
        { label: "Чанга яригч", value: "8" },
        { label: "Дугуй", value: "235/60 R19" },
        { label: "Жолооны хүрд", value: "Арьсан бүрээстэй" },
      ],
    },
    {
      id: "premium",
      name: "Premium",
      powertrain: "PHEV",
      status: "available",
      tagline: "Бүрэн тоноглол",
      highlights: [
        { label: "Панорам дээвэр", value: "Байна" },
        { label: "Цахилгаан багажны хаалга", value: "Санах ойтой" },
        { label: "Утасгүй цэнэглэгч", value: "Байна" },
        { label: "Салоны гэрэлтүүлэг", value: "64 өнгө" },
        { label: "Чанга яригч", value: "9, брэндийн аудио" },
        { label: "Жолоочийн суудал", value: "Санах ой, угтах хөдөлгөөн" },
        { label: "Зорчигчийн хөл дэрлэгч", value: "Цахилгаан" },
        { label: "Бараан шил", value: "Байна" },
        { label: "Амрах режим", value: "Байна" },
      ],
    },
  ],

  /* --- Өгүүллэгийн хэсгүүд ---------------------------------------------
     Зохиомжийн хэмнэл (ЗОРИУД өөр өөр):
       design  — stage : дэлгэц дүүрэн карусель, зураг өгүүлнэ
       comfort — spread: гурван зурагт editorial, хөвөх хөдөлгөөнтэй
       power   — strip : авсаархан техникийн блок (эх зураг 904px тул
                         дэлгэц дүүрэн болговол бүдгэрнэ)
       tech    — stage : дэлгэц дүүрэн карусель
       life    — band  : хар дэвсгэр дээрх нэг кинематик кадр
     Ингэснээр зураг→текст→зураг→текст гэсэн механик хэмнэл гарахгүй. */
  sections: [
    {
      id: "design",
      kind: "stage",
      slot: "after-exterior",
      title: "Бат бөх, бартаат замын хийц",
      aspect: { wide: 1.778, narrow: 0.462 },
      fitViewport: true,
      items: [
        {
          image: `${P}/design/wide/01.webp`,
          imageMobile: `${P}/design/tall/01.webp`,
          title: "Storm-eye урд гэрэл",
          alt: "JETOUR T1 PHEV — Storm-eye урд гэрэлтүүлэг",
        },
        {
          image: `${P}/design/wide/02.webp`,
          imageMobile: `${P}/design/tall/02.webp`,
          title: "Horizon гэрлийн зурвас",
          alt: "JETOUR T1 PHEV — урд талын хөндлөн гэрлийн зурвас",
        },
      ],
    },
    {
      id: "comfort",
      kind: "spread",
      slot: "after-exterior",
      title: "Тав тухтай бүхээг",
      subtitle: "2800 мм тэнхлэг хоорондын зай, 2+3 суудлын байрлал.",
      items: [
        {
          image: `${P}/comfort/wide/01.webp`,
          imageMobile: `${P}/comfort/tall/01.webp`,
          title: "Хоёр бүсийн автомат агааржуулалт",
          alt: "JETOUR T1 PHEV — бүхээгийн агааржуулалт",
        },
        {
          image: `${P}/comfort/wide/02.webp`,
          imageMobile: `${P}/comfort/tall/02.webp`,
          title: "Давхар давхаргат дээврийн шил",
          alt: "JETOUR T1 PHEV — дээврийн шил",
        },
        {
          image: `${P}/comfort/wide/03.webp`,
          imageMobile: `${P}/comfort/tall/03.webp`,
          title: "Суудлын агааржуулалт",
          alt: "JETOUR T1 PHEV — суудлын агааржуулалт",
        },
      ],
    },
    {
      id: "power",
      kind: "strip",
      slot: "after-interior",
      title: "Гибрид хүчний систем",
      subtitle: "150 кВт цахилгаан мотор, 26.7 кВт·ц LiFePO4 батарей.",
      /* Эх зургийн харьцаа 2.667 — тайралт 0% */
      aspect: { wide: 2.667 },
      items: [
        {
          image: `${P}/power/01.webp`,
          title: "1.5TD гибрид хөдөлгүүр",
          text: "1499 см³ · 132 м.х. (99 кВт) · 200 Н·м",
          alt: "JETOUR T1 PHEV — 1.5TD гибрид хөдөлгүүр",
        },
        {
          image: `${P}/power/02.webp`,
          title: "1DHT e-CVT гибрид дамжуулга",
          text: "Нэг шатлалт DHT · урд хөтлөгч",
          alt: "JETOUR T1 PHEV — DHT гибрид дамжуулга",
        },
        {
          image: `${P}/power/03.webp`,
          title: "Даацын их биеийн бүтэц",
          text: "Урд тасалгааны металл, батарейн алюминий хамгаалалттай.",
          alt: "JETOUR T1 PHEV — их биеийн бүтэц",
        },
      ],
    },
    {
      id: "tech",
      kind: "stage",
      slot: "after-interior",
      title: "Бүхээгийн ухаалаг технологи",
      aspect: { wide: 1.778, narrow: 0.462 },
      fitViewport: true,
      items: [
        {
          image: `${P}/tech/wide/01.webp`,
          imageMobile: `${P}/tech/tall/01.webp`,
          title: "TOUR OS 2.0 ухаалаг систем",
          alt: "JETOUR T1 PHEV — TOUR OS 2.0 систем",
        },
        {
          image: `${P}/tech/wide/02.webp`,
          imageMobile: `${P}/tech/tall/02.webp`,
          title: "15.6 инчийн мэдрэгчтэй дэлгэц",
          alt: "JETOUR T1 PHEV — 15.6 инчийн дэлгэц",
        },
        {
          image: `${P}/tech/wide/03.webp`,
          imageMobile: `${P}/tech/tall/03.webp`,
          title: "10.25 инчийн дижитал хянах самбар",
          alt: "JETOUR T1 PHEV — дижитал хянах самбар",
        },
        {
          image: `${P}/tech/wide/04.webp`,
          imageMobile: `${P}/tech/tall/04.webp`,
          title: "Snapdragon 8155 ухаалаг чип",
          alt: "JETOUR T1 PHEV — Snapdragon 8155 чип",
        },
      ],
    },
    {
      id: "life",
      kind: "band",
      slot: "after-interior",
      items: [
        {
          image: `${P}/life/wide/01.webp`,
          imageMobile: `${P}/life/tall/01.webp`,
          title: "Аялалд бэлэн",
          text: "Дээврийн тавиур, бүрэн хэвтүүлдэг хойд суудал.",
          alt: "JETOUR T1 PHEV — аяллын хэрэглээ",
        },
      ],
    },
  ],
};

const p = new PrismaClient();
const before = await p.carModel.findUnique({ where: { id: "t1-phev" } });
if (!before) {
  console.log("t1-phev олдсонгүй");
  process.exit(1);
}

await p.carModel.update({
  where: { id: "t1-phev" },
  data: {
    tagline: "Цэнэглэгддэг гибрид (PHEV) SUV",
    shortDesc: "1.5TD гибрид хөдөлгүүр, нэг шатлалт DHT, урд хөтлөгч",
    description:
      "Цэнэглэгддэг гибрид (PHEV) систем — 1.5TD хөдөлгүүр ба 150 кВт цахилгаан мотор " +
      "хамтран ажиллана. 26.7 кВт·ц LiFePO4 батарейг хурдан цэнэглэгчээр 30–80% хүртэл " +
      "0.5 цагт цэнэглэнэ.",
    longDescription:
      "T1 PHEV нь 4705 мм урт, 2800 мм тэнхлэг хоорондын зайтай таван суудалтай SUV. " +
      "1.5TD гибрид хөдөлгүүр, нэг шатлалт DHT дамжуулга, урд хөтлөгчтэй. " +
      "Гадна төрх нь Германы Red Dot дизайны шагнал хүртсэн. Standard болон Premium " +
      "хоёр тоноглолын хувилбартай.",
    heroImage: `${P}/hero/wide/01.webp`,
    priceNote: "Standard ба Premium тоноглолын хувилбартай",
    detailsJson: JSON.stringify(details),
  },
});

const after = await p.carModel.findUnique({ where: { id: "t1-phev" } });
const d = JSON.parse(after.detailsJson);
console.log("хэсгүүд   :", d.sections.map((s) => `${s.kind}:${s.id}`).join("  "));
console.log("360° өнгө :", d.spin360.colors.map((c) => `${c.name}(${c.frames.length})`).join(", "));
console.log("хувилбар  :", d.variants.map((v) => v.name).join(", "));
console.log("үзүүлэлт  :", d.specGroups.map((g) => `${g.title}(${g.rows.length})`).join(", "));
console.log("брошюр    :", d.brochure ?? "хасав (t1.pdf нь бензин хувилбарынх)");
console.log("JSON      :", after.detailsJson.length, "тэмдэгт");
await p.$disconnect();
