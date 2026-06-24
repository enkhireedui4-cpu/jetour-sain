// JETOUR Mongolia — албан ёсны брэндийн вэбсайт
// Мэдээллийн эх сурвалж: Sain Motors Facebook хуудас (Sainmotors.mn) + jetour-auto.kz

export const CONTACT = {
  phone1: "7277-8855",
  phone2: "8910-0274",
  phone1Href: "tel:+97672778855",
  phone2Href: "tel:+97689100274",
  email: "info@sainmotors.mn",
  address: "Чингэлтэй дүүрэг, 5-р хороо, Хуучнаар ХИД-1, C1 ТВ-ийн байр, Holiday Inn зочид буудлын урд",
  addressShort: "Чингэлтэй, Holiday Inn",
  hours: "Даваа – Ням: 09:00 – 20:00",
  facebook: "https://www.facebook.com/Sainmotors.mn",
  instagram: "https://www.instagram.com/",
  googleMap: "https://rb.gy/xji02i",
  brand: "SAIN MOTORS",
  brandFullName: "Сайн Моторс ХХК",
  brandRole: "Албан ёсны дистрибьютер",
  brandSince: "2023",
};

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
  status: "available" | "coming-soon";
  specs: ModelSpec;
  exteriorFeatures: ModelFeature[];
  interiorFeatures: ModelFeature[];
  safety: string[];
  highlights: { label: string; value: string }[];
  accent: "red" | "blue";
};

export const MODELS: JetourModel[] = [
  {
    id: "x70-plus",
    name: "JETOUR X70 Plus",
    series: "Family",
    tagline: "Гэр бүлийн төгс шийдэл",
    shortDesc: "Тав тух, өргөн уужим салон, ухаалаг технологи",
    description:
      "Гэр бүлийн хэрэгцээнд бүрэн нийцсэн, тав тух, өргөн уужим салон, ухаалаг технологи, найдвартай ажиллагаагаараа таны гэр бүлийн аялал, өдөр тутмын хэрэглээнд төгс шийдэл болно.",
    longDescription:
      "X70 Plus нь Монголын эрс тэс цаг агаарт тохируулан бүтээгдсэн. Жолооны хүрд, жолоочийн болон зорчигчийн суудлыг халаах, цантаж тогтсон цас мөсийг хайлуулах салхины шил зэрэг өвлийн горимуудаар тоноглогдсон. 197 морины хүчтэй 1.6 Турбо хөдөлгүүр нь урт замд хүчин чадлаа алдалгүй, гэр бүлийн аяллыг тав тухтай болгоно.",
    heroImage: "https://sfile.chatglm.cn/images-ppt/f84c08aa3ba2.png",
    exteriorImages: [
      "https://sfile.chatglm.cn/images-ppt/f84c08aa3ba2.png",
      "https://sfile.chatglm.cn/images-ppt/3bbb03af7cbd.jpg",
      "https://sfile.chatglm.cn/images-ppt/7a60d648ce8c.jpg",
    ],
    interiorImages: [
      "https://sfile.chatglm.cn/images-ppt/8882f820761a.jpg",
      "https://sfile.chatglm.cn/images-ppt/b0577d898baa.jpg",
    ],
    gallery: [
      "https://sfile.chatglm.cn/images-ppt/f84c08aa3ba2.png",
      "https://sfile.chatglm.cn/images-ppt/3bbb03af7cbd.jpg",
      "https://sfile.chatglm.cn/images-ppt/7a60d648ce8c.jpg",
      "https://sfile.chatglm.cn/images-ppt/8882f820761a.jpg",
    ],
    price: "95.0 сая ₮",
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
        description: "Apple CarPlay / Android Auto дэмждэг. Утсаа холбож,导航, хөгжим, дуут хяналтаар хянана.",
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
    id: "t1",
    name: "JETOUR T1",
    series: "Urban SUV",
    tagline: "Хот болон аяллын хослол",
    shortDesc: "Орчин үеийн технологи, ухаалаг шийдэл",
    description:
      "Орчин үеийн технологи, ухаалаг шийдэл болон олон талын хэрэглээг хослуулсан SUV. Хотын өдөр тутмын амьдрал болон аялалд тохирсон төгс шийдэл.",
    longDescription:
      "T1 нь хотын өдөр тутмын амьдралд зориулагдсан SUV. Ухаалаг жолоодлогын систем, орчин үеийн дизайн, өргөн салонтой. Хотын замд эвтэйхэн, захад эх нутагт ч хүчин чадлаа үзүүлнэ. Хоёр төрлийн багц сонголттой.",
    heroImage: "https://sfile.chatglm.cn/images-ppt/3dbbabc9f32c.jpg",
    exteriorImages: [
      "https://sfile.chatglm.cn/images-ppt/3dbbabc9f32c.jpg",
      "https://sfile.chatglm.cn/images-ppt/6bf866e6f982.jpg",
    ],
    interiorImages: ["https://sfile.chatglm.cn/images-ppt/8882f820761a.jpg"],
    gallery: [
      "https://sfile.chatglm.cn/images-ppt/3dbbabc9f32c.jpg",
      "https://sfile.chatglm.cn/images-ppt/6bf866e6f982.jpg",
    ],
    price: "99.9 / 120.0 сая ₮",
    priceNote: "Хоёр багц сонголттой",
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
        description: "Том хэмжээт дэлгэц, утсаа холбох боломжтой.导航, хөгжим, утсан дуудлага — нэг дор.",
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
    id: "x1",
    name: "JETOUR X1",
    series: "Compact",
    tagline: "Хотын залуусын сонголт",
    shortDesc: "Дэвшилтэт технологи, хүчирхэг гүйцэтгэл",
    description:
      "Дэвшилтэт технологи, орчин үеийн дизайн, хүчирхэг гүйцэтгэлийг хослуулсан. Их хотын өдөр тутмын амьдралд тохирсон шийдэл.",
    longDescription:
      "X1 нь залуу өрх, анхны машинтай болох гэр бүлд зориулагдсан compact SUV. 1.5 TCI Turbo хөдөлгүүр нь хотод 7L/100km зарцуулга үзүүлэх ба хурдны хувьд чадалтай. Иж бүрэн аюулгүй байдлын системүүд (ABS, EBD, EBA, TCS, ESC, HHC, HDC, RMI, DBF) суулгасан.",
    heroImage: "https://sfile.chatglm.cn/images-ppt/56e894a88fee.jpg",
    exteriorImages: [
      "https://sfile.chatglm.cn/images-ppt/56e894a88fee.jpg",
      "https://sfile.chatglm.cn/images-ppt/e1957dcb315a.jpg",
    ],
    interiorImages: ["https://sfile.chatglm.cn/images-ppt/8882f820761a.jpg"],
    gallery: [
      "https://sfile.chatglm.cn/images-ppt/56e894a88fee.jpg",
      "https://sfile.chatglm.cn/images-ppt/e1957dcb315a.jpg",
    ],
    price: "85.0 сая ₮",
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
        title: "Орчин үеийн гоо зүй",
        description: "Залуусын таашаалд нийцсэн цэвэр шугаман дизайн. LED гэрэлтүүлэг, спорт төрх.",
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
    heroImage: "https://sfile.chatglm.cn/images-ppt/0aff9397ae0f.jpg",
    exteriorImages: [
      "https://sfile.chatglm.cn/images-ppt/0aff9397ae0f.jpg",
      "https://sfile.chatglm.cn/images-ppt/d97fb1e8df00.jpg",
    ],
    interiorImages: ["https://sfile.chatglm.cn/images-ppt/8882f820761a.jpg"],
    gallery: [
      "https://sfile.chatglm.cn/images-ppt/0aff9397ae0f.jpg",
      "https://sfile.chatglm.cn/images-ppt/d97fb1e8df00.jpg",
    ],
    price: "69.9 сая ₮",
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
        title: "Спортлог төрх",
        description: "Том ам, том дугуй, спортлог биеийн пропорц. Залуусын таашаалд нийцсэн дизайн.",
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
    id: "g700",
    name: "JETOUR G700",
    series: "Flagship",
    tagline: "Paula Scher-ийн мастер загвар",
    shortDesc: "Тэргүүлэх их буудлын SUV",
    description:
      "Дэлхийн нэрт дизайнер Paula Scher-тай хамтран бүтээсэн тэргүүлэх их буудлын SUV. Хүчирхэг технологи болон жинхэнэ мэдрэмжийн нэгдэл.",
    longDescription:
      "G700 нь JETOUR-ын тэргүүлэх их буудлын SUV. Дэлхийн нэрт дизайнер Paula Scher-ийн мастер загвар — \"Энэ бол миний ажиллаж буй анхны автомашин\" гэж тэрээр онцолсон. PHEV хосолсон систем, Nappa арьсан салон, агаарын дөрвөн салхивч — люкс тав тухатай.",
    heroImage: "https://sfile.chatglm.cn/images-ppt/d97fb1e8df00.jpg",
    exteriorImages: [
      "https://sfile.chatglm.cn/images-ppt/d97fb1e8df00.jpg",
      "https://sfile.chatglm.cn/images-ppt/8fefe8b0aac8.png",
    ],
    interiorImages: ["https://sfile.chatglm.cn/images-ppt/8882f820761a.jpg"],
    gallery: [
      "https://sfile.chatglm.cn/images-ppt/d97fb1e8df00.jpg",
      "https://sfile.chatglm.cn/images-ppt/8fefe8b0aac8.png",
    ],
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
    heroImage: "https://sfile.chatglm.cn/images-ppt/8fefe8b0aac8.png",
    exteriorImages: [
      "https://sfile.chatglm.cn/images-ppt/8fefe8b0aac8.png",
      "https://sfile.chatglm.cn/images-ppt/6bf866e6f982.jpg",
    ],
    interiorImages: ["https://sfile.chatglm.cn/images-ppt/8882f820761a.jpg"],
    gallery: [
      "https://sfile.chatglm.cn/images-ppt/8fefe8b0aac8.png",
      "https://sfile.chatglm.cn/images-ppt/6bf866e6f982.jpg",
    ],
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

export const HERO_SLIDES = MODELS.map((m) => ({
  model: m.name,
  tagline: m.tagline,
  description: m.shortDesc,
  image: m.heroImage,
  price: m.price ?? m.priceNote ?? "",
  accent: m.accent,
}));

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
  { href: "#brand", label: "Брэнд" },
  { href: "#models", label: "Загварууд" },
  { href: "#technology", label: "Технологи" },
  { href: "#financing", label: "Зээл" },
  { href: "#network", label: "Түгээлт" },
  { href: "#contact", label: "Холбоо" },
];
