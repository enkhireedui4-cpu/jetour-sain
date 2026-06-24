// Дилер/Showroom-ын дата — ирээдүйд шинэ салбар нэмэхэд зөвхөн энд нэмэх төдий
export type Branch = {
  id: string;
  name: string;
  nameEn: string;
  type: "showroom" | "service" | "parts" | "all-in-one";
  address: string;
  phone1: string;
  phone1Href: string;
  phone2?: string;
  phone2Href?: string;
  email: string;
  hoursWeekday: string;
  hoursSaturday: string;
  hoursSunday: string;
  // Google Maps embed URL (Holiday Inn Chingeltei coordinates)
  mapEmbed: string;
  mapLink: string;
  city: string;
  isPrimary: boolean;
};

export const BRANCHES: Branch[] = [
  {
    id: "chingeltei-holiday-inn",
    name: "JETOUR Mongolia — Үндсэн Showroom",
    nameEn: "JETOUR Mongolia Main Showroom",
    type: "all-in-one",
    address: "Чингэлтэй дүүрэг, 5-р хороо, Хуучнаар ХИД-1, C1 ТВ-ийн байр, Holiday Inn зочид буудлын урд",
    phone1: "7277-8855",
    phone1Href: "tel:+97672778855",
    phone2: "8910-0274",
    phone2Href: "tel:+97689100274",
    email: "info@sainmotors.mn",
    hoursWeekday: "09:00 – 20:00",
    hoursSaturday: "10:00 – 18:00",
    hoursSunday: "11:00 – 16:00",
    mapEmbed:
      "https://www.google.com/maps?q=Holiday+Inn+Ulaanbaatar+Chingeltei&output=embed",
    mapLink: "https://rb.gy/xji02i",
    city: "Улаанбаатар",
    isPrimary: true,
  },
];

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
  youtube: "https://www.youtube.com/@SainMotors",
  whatsapp: "https://wa.me/97672778855",
  whatsappNumber: "+976 7277 8855",
  messenger: "https://m.me/Sainmotors.mn",
  googleMap: PRIMARY_BRANCH.mapLink,
  brand: "SAIN MOTORS",
  brandFullName: "Сайн Моторс ХХК",
  brandRole: "Албан ёсны дистрибьютер",
  brandSince: "2023",
};

// Ажлын цагийн жагсаалт (UI-д ашиглана)
export const SHOWROOM_HOURS = [
  { day: "Даваа – Баасан", hours: PRIMARY_BRANCH.hoursWeekday },
  { day: "Бямба гараг", hours: PRIMARY_BRANCH.hoursSaturday },
  { day: "Ням гараг", hours: PRIMARY_BRANCH.hoursSunday },
];

// Зээлийн банк хамтрагчид
export const FINANCE_PARTNERS = [
  {
    name: "Хаан банк",
    rate: "1.3% – 2.5%",
    term: "60 сар хүртэл",
    downPayment: "20%",
    logo: "/banks/khan.png",
    color: "#E2231A",
  },
  {
    name: "ХасБанк",
    rate: "1.5% – 2.7%",
    term: "60 сар хүртэл",
    downPayment: "25%",
    logo: "/banks/khas.png",
    color: "#00AEEF",
  },
  {
    name: "Голомт банк",
    rate: "1.4% – 2.6%",
    term: "60 сар хүртэл",
    downPayment: "25%",
    logo: "/banks/golomt.png",
    color: "#142A5C",
  },
  {
    name: "Capitron банк",
    rate: "1.5% – 2.9%",
    term: "60 сар хүртэл",
    downPayment: "30%",
    logo: "/banks/capitron.png",
    color: "#0A1F44",
  },
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
    date: "2024.11.15",
    dateIso: "2024-11-15",
    image: "/jetour-cars/724894424_1972867063376374_6712646349117792876_n.jfif",
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
    date: "2024.10.20",
    dateIso: "2024-10-20",
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
    date: "2024.10.05",
    dateIso: "2024-10-05",
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
      "Сайн Моторс ХХК Mega Test Drive өдөрлөг зохион байгуулна. Бүх JETOUR загвар үнэгүй турших боломжтой. 11 тэргүүлэгч брэндийн 20+ загвар — бензин, дизель, PHEV.\n\nБямба гарагт BYD 4S Showroom-д (Чингэлтэй, Holiday Inn-ийн урд) 11:00 – 20:00 цагийн хооронд.\n\nГэр бүл, найзуудаараа ирж өөрөө жолоодон туршиж үзээрэй. Мэргэжлийн зөвлөгөө үнэгүй. Эхний 50 зочинд бэлэг сугалаа.\n\nБүртгэл: 7277-8855, 8910-0274.",
    date: "2024.09.28",
    dateIso: "2024-09-28",
    image: "/jetour-cars/0de60c67e26e.png",
    tag: "Үйл явдал",
    type: "Үйл явдал",
    accent: "deep",
  },
];
