// JETOUR Mongolia — албан ёсны брэндийн вэбсайт
// Мэдээллийн эх сурвалж: Sain Motors Facebook хуудас (Sainmotors.mn)

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

export type JetourModel = {
  id: string;
  name: string;
  series: string;
  tagline: string;
  description: string;
  longDescription: string;
  image: string;
  gallery: string[];
  price: string | null;
  priceNote?: string;
  status: "available" | "coming-soon";
  specs: {
    engine: string;
    power: string;
    torque: string;
    topSpeed: string;
    transmission: string;
    drivetrain: string;
    seats: string;
    fuel: string;
  };
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
    description:
      "Гэр бүлийн хэрэгцээнд бүрэн нийцсэн, тав тух, өргөн уужим салон, ухаалаг технологи, найдвартай ажиллагаа.",
    longDescription:
      "X70 Plus нь Монголын эрс тэс цаг агаарт тохируулан бүтээгдсэн. Жолооны хүрд, жолоочийн болон зорчигчийн суудлыг халаах, цантаж тогтсон цас мөсийг хайлуулах салхины шил зэрэг өвлийн горимуудаар тоноглогдсон. 197 морины хүчтэй 1.6 Турбо хөдөлгүүр нь урт замд хүчин чадлаа алдалгүй, гэр бүлийн аяллыг тав тухтай болгоно.",
    image: "https://sfile.chatglm.cn/images-ppt/f84c08aa3ba2.png",
    gallery: [
      "https://sfile.chatglm.cn/images-ppt/f84c08aa3ba2.png",
      "https://sfile.chatglm.cn/images-ppt/3bbb03af7cbd.jpg",
      "https://sfile.chatglm.cn/images-ppt/7a60d648ce8c.jpg",
    ],
    price: "95.0 сая ₮",
    status: "available",
    specs: {
      engine: "1.6 TCI Turbo",
      power: "197 hp",
      torque: "290 Nm",
      topSpeed: "195 km/h",
      transmission: "7-DCT",
      drivetrain: "FWD",
      seats: "7 суудал",
      fuel: "Бензин",
    },
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
    tagline: "Хот болон аяллын төгс хослол",
    description:
      "Орчин үеийн технологи, ухаалаг шийдэл болон олон талын хэрэглээг хослуулсан SUV. Хотын өдөр тутмын амьдрал болон аялалд тохирсон.",
    longDescription:
      "T1 нь хотын өдөр тутмын амьдралд зориулагдсан SUV. Ухаалаг жолоодлогын систем, орчин үеийн дизайн, өргөн салонтой. Хотын замд эвтэйхэн, захад эх нутагт ч хүчин чадлаа үзүүлнэ. Хоёр төрлийн багц сонголттой.",
    image: "https://sfile.chatglm.cn/images-ppt/3dbbabc9f32c.jpg",
    gallery: [
      "https://sfile.chatglm.cn/images-ppt/3dbbabc9f32c.jpg",
      "https://sfile.chatglm.cn/images-ppt/6bf866e6f982.jpg",
    ],
    price: "99.9 / 120.0 сая ₮",
    priceNote: "Хоёр багц сонголттой",
    status: "available",
    specs: {
      engine: "1.5T / 2.0T",
      power: "156–197 hp",
      torque: "230–390 Nm",
      topSpeed: "180–200 km/h",
      transmission: "6DCT / 7DCT",
      drivetrain: "2WD / 4WD",
      seats: "5 суудал",
      fuel: "Бензин",
    },
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
    description:
      "Дэвшилтэт технологи, орчин үеийн дизайн, хүчирхэг гүйцэтгэлийг хослуулсан. Их хотын өдөр тутмын амьдралд тохирсон шийдэл.",
    longDescription:
      "X1 нь залуу өрх, анхны машинтай болох гэр бүлд зориулагдсан compact SUV. 1.5 TCI Turbo хөдөлгүүр нь хотод 7L/100km зарцуулга үзүүлэх ба хурдны хувьд чадалтай. Иж бүрэн аюулгүй байдлын системүүд (ABS, EBD, EBA, TCS, ESC, HHC, HDC, RMI, DBF) суулгасан.",
    image: "https://sfile.chatglm.cn/images-ppt/56e894a88fee.jpg",
    gallery: [
      "https://sfile.chatglm.cn/images-ppt/56e894a88fee.jpg",
      "https://sfile.chatglm.cn/images-ppt/e1957dcb315a.jpg",
    ],
    price: "85.0 сая ₮",
    status: "available",
    specs: {
      engine: "1.5 TCI Turbo",
      power: "156 hp",
      torque: "230 Nm",
      topSpeed: "180 km/h",
      transmission: "6-DCT",
      drivetrain: "2WD",
      seats: "5 суудал",
      fuel: "Бензин",
    },
    safety: ["ABS", "EBD", "EBA", "TCS", "ESC", "HHC", "HDC", "RMI", "DBF"],
    highlights: [
      { label: "Хөдөлгүүр", value: "1.5T Turbo" },
      { label: "Хүчин чадал", value: "156 hp" },
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
    description:
      "Спортлог дизайн, ухаалаг жолоодлогын систем, 20.5 инчийн хос дижитал дэлгэц, 360° камер болон иж бүрэн аюулгүй байдлын шийдлүүдтэй.",
    longDescription:
      "X50 нь спортлог загвартай, залуусын таашаалд нийцсэн SUV. 20.5 инчийн хос дижитал дэлгэц нь жолооны мэдээлэл болон entertainment-ийг нэг дор харуулна. 360° камер, олон тооны аюулгүй байдлын систем — хотын нүүрэн дээр ч, зогсоолд ч тайван.",
    image: "https://sfile.chatglm.cn/images-ppt/0aff9397ae0f.jpg",
    gallery: [
      "https://sfile.chatglm.cn/images-ppt/0aff9397ae0f.jpg",
      "https://sfile.chatglm.cn/images-ppt/d97fb1e8df00.jpg",
    ],
    price: "69.9 сая ₮",
    status: "available",
    specs: {
      engine: "1.5 TCI Turbo",
      power: "156 hp",
      torque: "230 Nm",
      topSpeed: "180 km/h",
      transmission: "6-DCT",
      drivetrain: "2WD",
      seats: "5 суудал",
      fuel: "Бензин",
    },
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
    description:
      "Дэлхийн нэрт дизайнер Paula Scher-тай хамтран бүтээсэн тэргүүлэх их буудлын SUV. Хүчирхэг технологи болон жинхэнэ мэдрэмжийн нэгдэл.",
    longDescription:
      "G700 нь JETOUR-ын тэргүүлэх их буудлын SUV. Дэлхийн нэрт дизайнер Paula Scher-ийн мастер загвар — \"Энэ бол миний ажиллаж буй анхны автомашин\" гэж тэрээр онцолсон. PHEV хосолсон систем, Nappa арьсан салон, агаарын дөрвөн салхивч — люкс тав тухатай.",
    image: "https://sfile.chatglm.cn/images-ppt/d97fb1e8df00.jpg",
    gallery: [
      "https://sfile.chatglm.cn/images-ppt/d97fb1e8df00.jpg",
      "https://sfile.chatglm.cn/images-ppt/8fefe8b0aac8.png",
    ],
    price: null,
    priceNote: "Тун удахгүй",
    status: "coming-soon",
    specs: {
      engine: "2.0L Turbo PHEV",
      power: "555 hp",
      torque: "800 Nm",
      topSpeed: "200 km/h",
      transmission: "3-DHT",
      drivetrain: "4WD",
      seats: "6–7 суудал",
      fuel: "PHEV",
    },
    safety: ["L2.5 ADAS", "360° камер", "5 одтой NCAP"],
    highlights: [
      { label: "Дизайн", value: "Paula Scher" },
      { label: "Хөдөлгүүр", value: "2.0T PHEV" },
      { label: "Хүчин чадал", value: "555 hp" },
      { label: "Жолоодлого", value: "4WD" },
    ],
    accent: "red",
  },
  {
    id: "t2-phev",
    name: "JETOUR T2 PHEV",
    series: "PHEV",
    tagline: "Тун удахгүй — Plug-in Hybrid",
    description:
      "Байгаль орчинд ээлтэй, залгаж цэнэглэдэг эрчим хүчний дэвшилтэт технологи болон бартаат замын хүчин чадлыг хослуулсан.",
    longDescription:
      "T2 PHEV нь JETOUR-ын Travel+ философиор бүтээгдсэн, plug-in хосолсон аяллын SUV. Цахилгаанаар 100 км, нийт 1000+ км аяллын зайд явах боломжтой. Бартаат зам, уул, цөл — хаа ч ажиллана. Байгаль орчинд ээлтэй шийдэл.",
    image: "https://sfile.chatglm.cn/images-ppt/8fefe8b0aac8.png",
    gallery: [
      "https://sfile.chatglm.cn/images-ppt/8fefe8b0aac8.png",
      "https://sfile.chatglm.cn/images-ppt/6bf866e6f982.jpg",
    ],
    price: null,
    priceNote: "Тун удахгүй",
    status: "coming-soon",
    specs: {
      engine: "1.5T PHEV",
      power: "340 hp",
      torque: "600 Nm",
      topSpeed: "190 km/h",
      transmission: "3-DHT",
      drivetrain: "4WD",
      seats: "5 суудал",
      fuel: "PHEV",
    },
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
    image: "https://sfile.chatglm.cn/images-ppt/f84c08aa3ba2.png",
    price: "95.0 сая ₮",
    accent: "red" as const,
  },
  {
    model: "JETOUR T1",
    tagline: "Хот болон аяллын хослол",
    description: "Орчин үеийн технологи, ухаалаг шийдэл",
    image: "https://sfile.chatglm.cn/images-ppt/3dbbabc9f32c.jpg",
    price: "99.9 / 120.0 сая ₮",
    accent: "blue" as const,
  },
  {
    model: "JETOUR X50",
    tagline: "Спортлог дизайн, ухаалаг технологи",
    description: "20.5\" хос дэлгэц, 360° камер",
    image: "https://sfile.chatglm.cn/images-ppt/0aff9397ae0f.jpg",
    price: "69.9 сая ₮",
    accent: "red" as const,
  },
  {
    model: "JETOUR X1",
    tagline: "Хотын залуусын сонголт",
    description: "Дэвшилтэт технологи, хүчирхэг гүйцэтгэл",
    image: "https://sfile.chatglm.cn/images-ppt/56e894a88fee.jpg",
    price: "85.0 сая ₮",
    accent: "blue" as const,
  },
  {
    model: "JETOUR G700",
    tagline: "Paula Scher-ийн мастер загвар",
    description: "Тэргүүлэх их буудлын SUV — тун удахгүй",
    image: "https://sfile.chatglm.cn/images-ppt/d97fb1e8df00.jpg",
    price: "Тун удахгүй",
    accent: "red" as const,
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
  { href: "#brand", label: "Брэнд" },
  { href: "#models", label: "Загварууд" },
  { href: "#technology", label: "Технологи" },
  { href: "#financing", label: "Зээл" },
  { href: "#network", label: "Түгээлт" },
  { href: "#contact", label: "Холбоо" },
];
