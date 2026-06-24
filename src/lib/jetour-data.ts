// JETOUR Mongolia — official distributor site data

export const CONTACT = {
  phone: "8910 2070",
  phoneHref: "tel:+97689102070",
  email: "info@sainmotors.mn",
  address: "BYD 4S Showroom, Цамбагаравын баруун урд, Улаанбаатар",
  addressShort: "Улаанбаатар, Цамбагарав",
  hours: "Даваа – Ням: 09:00 – 20:00",
  facebook: "https://www.facebook.com/Sainmotors.mn",
  instagram: "https://www.instagram.com/",
  brand: "SAIN MOTORS",
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
  specs: {
    engine: string;
    power: string;
    transmission: string;
    drivetrain: string;
    seats: string;
    topSpeed: string;
    fuel: string;
    range: string;
  };
  highlights: { label: string; value: string }[];
  accent: "red" | "blue";
};

export const MODELS: JetourModel[] = [
  {
    id: "t2",
    name: "JETOUR T2",
    series: "Traveller",
    tagline: "Travel+ баатар SUV",
    description:
      "Бэхлэлт(body-on-frame) бүтэц, дөрвөн дугуйн жолоодлого, 700мм усанд орох чадвар — Монголын нутагт зориулагдсан аяллын SUV.",
    longDescription:
      "T2 нь JETOUR-ын Travel+ философид тулгуурлан бүтээгдсэн баатар SUV. 220мм газрын тусгаар, MUD/Terrain горимууд, олон замын тохиргоо — уул, цөл, намаг, цас — хаа ч явах боломжтой. Цэвэрлэгээтэй дизайн, Travel+ салон — урт аялалд төгс тав тухатай.",
    image: "https://sfile.chatglm.cn/images-ppt/3dbbabc9f32c.jpg",
    gallery: [
      "https://sfile.chatglm.cn/images-ppt/3dbbabc9f32c.jpg",
      "https://sfile.chatglm.cn/images-ppt/6bf866e6f982.jpg",
      "https://sfile.chatglm.cn/images-ppt/8fefe8b0aac8.png",
    ],
    specs: {
      engine: "2.0L Turbo",
      power: "254 hp / 390 Nm",
      transmission: "7-DCT",
      drivetrain: "4WD",
      seats: "5 суудал",
      topSpeed: "210 km/h",
      fuel: "Бензин",
      range: "850 км",
    },
    highlights: [
      { label: "Усанд орох", value: "700 мм" },
      { label: "Газрын тусгаар", value: "220 мм" },
      { label: "Жолоодлогын горим", value: "6 горим" },
      { label: "Дугуй", value: "R18 / R19" },
    ],
    accent: "red",
  },
  {
    id: "dashing",
    name: "JETOUR Dashing",
    series: "Crossover",
    tagline: "Технологи кросоверын ирээдүй",
    description:
      "15.6\" цахим хяналтын дэлгэц, L2.5 өөрөө жолоодох горим — залуусын хүсэн хүлээсэн кросоверын шинэ хэл.",
    longDescription:
      "Dashing нь залуу үеийнхэнд зориулсан технологиор дүүрэн кросоверын тодорхойлолт. Sony 8 чиглэлтэй аудо, холбооны систем, тоормосны туслалцаа, эгнээнд барих — хотын амьдралд тохирох төгс шийдэл.",
    image: "https://sfile.chatglm.cn/images-ppt/675b64fc9fb6.png",
    gallery: [
      "https://sfile.chatglm.cn/images-ppt/675b64fc9fb6.png",
      "https://sfile.chatglm.cn/images-ppt/e1957dcb315a.jpg",
      "https://sfile.chatglm.cn/images-ppt/1d053fabfd7a.jpg",
    ],
    specs: {
      engine: "1.6L Turbo",
      power: "197 hp / 290 Nm",
      transmission: "7-DCT",
      drivetrain: "FWD",
      seats: "5 суудал",
      topSpeed: "195 km/h",
      fuel: "Бензин",
      range: "720 км",
    },
    highlights: [
      { label: "Дэлгэц", value: "15.6 дюйм" },
      { label: "Аудио", value: "Sony 8-speaker" },
      { label: "ADAS", value: "L2.5 горим" },
      { label: "Хотод зарцуулга", value: "7.5L/100km" },
    ],
    accent: "blue",
  },
  {
    id: "x70-plus",
    name: "JETOUR X70 Plus",
    series: "Family",
    tagline: "Гэр бүлийн их буудал",
    description:
      "7 суудалт уудам салон, панорамик тэнгэрлэг дээвэр — гэр бүлийн урт замд тав тухатай, аюулгүй.",
    longDescription:
      "X70 Plus нь өргөн уудам 7 суудалтай, гэр бүлийн бүх хэрэгцээг хангасан төгс SUV. L2.5 өөрөө жолоодох горим, 5 одтой NCAP аюулгүй байдал, олон тооны аюулгүй байдлын системүүд. Урт замд тайван, хотод эвтэйхэн.",
    image: "https://sfile.chatglm.cn/images-ppt/f84c08aa3ba2.png",
    gallery: [
      "https://sfile.chatglm.cn/images-ppt/f84c08aa3ba2.png",
      "https://sfile.chatglm.cn/images-ppt/3bbb03af7cbd.jpg",
      "https://sfile.chatglm.cn/images-ppt/7a60d648ce8c.jpg",
    ],
    specs: {
      engine: "1.6L Turbo",
      power: "197 hp / 290 Nm",
      transmission: "7-DCT",
      drivetrain: "FWD",
      seats: "7 суудал",
      topSpeed: "195 km/h",
      fuel: "Бензин",
      range: "780 км",
    },
    highlights: [
      { label: "Суудал", value: "7 хүн" },
      { label: "Панорамик дээвэр", value: "Багтсан" },
      { label: "NCAP", value: "5 од" },
      { label: "Багажны зай", value: "1980 L" },
    ],
    accent: "red",
  },
  {
    id: "g700",
    name: "JETOUR G700",
    series: "Flagship",
    tagline: "Тэргүүлэх Travel+ их буудал",
    description:
      "PHEV хосолсон хөдөлгүүр, 555 морины хүч, 1000+ км цэвэр аяллын зай — JETOUR-ын тэргүүлэх SUV.",
    longDescription:
      "G700 нь JETOUR-ын тэргүүлэх их буудлын SUV. PHEV plug-in хосолсон систем нь хотод цахилгаанаар, хөдөөд бензинээр ажилладаг. Alcantara + Nappa арьсан салон, агаарын дөрвөн салхивч, дэвшилттэй холбооны систем — люкс тав тухатай.",
    image: "https://sfile.chatglm.cn/images-ppt/d97fb1e8df00.jpg",
    gallery: [
      "https://sfile.chatglm.cn/images-ppt/d97fb1e8df00.jpg",
      "https://sfile.chatglm.cn/images-ppt/8fefe8b0aac8.png",
      "https://sfile.chatglm.cn/images-ppt/0aff9397ae0f.jpg",
    ],
    specs: {
      engine: "2.0L Turbo PHEV",
      power: "555 hp / 800 Nm",
      transmission: "3-DHT",
      drivetrain: "4WD",
      seats: "6–7 суудал",
      topSpeed: "200 km/h",
      fuel: "Бензин + Цахилгаан",
      range: "1000+ км",
    },
    highlights: [
      { label: "PHEV зай", value: "100 км цахилгаан" },
      { label: "Нийт зай", value: "1000+ км" },
      { label: "Салон", value: "Nappa + Alcantara" },
      { label: "Жолоодлого", value: "L2.5 ADAS" },
    ],
    accent: "blue",
  },
];

export const TECHNOLOGY = [
  {
    icon: "engine",
    title: "Kunlun Powertrain",
    description:
      "JETOUR-ын өөрийн хөгжүүлсэн 2.0T хөдөлгүүр нь 254 морины хүч, 390 Нм эргүүлэх хүчийг гаргаж, бага эзлэхүүнтэй хэвээр өндөр ашигтай байдаг. Дэлхийн өндөр хэм хэмжээгээр баталгаажсан.",
  },
  {
    icon: "battery",
    title: "i-DM PHEV систем",
    description:
      "T2 i-DM болон G700-д суулгасан plug-in хосолсон систем нь 100км-ийн цахилгаан аяллын зайд, 1000км+ нийт аяллын зайд хүрдэг. Хотод цэвэр цахилгаанаар, хөдөөд бензинээр.",
  },
  {
    icon: "shield",
    title: "L2.5 Жолоодлогын туслалцаа",
    description:
      "Утсанд төвлөрсөн ADAS багц: тоормосны туслалцаа, эгнээнд барих, цахим уян хатан хурдны хязгаарлалт, олон тооны камерын систем — урт замд тайван.",
  },
  {
    icon: "connect",
    title: "JETOUR Connect",
    description:
      "Утсаар төхөөрөмжийн удирдлага: хөдөлгүүр асах, агаарын бүртгэл, багажны байршил, цахилгаан цэнэглэлтийн хяналт. 5G-тэй холбогдсон дэвшилттэй дэлгэц.",
  },
];

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
    text: "Сайн Моторс JETOUR-ын албан ёсны дистрибьютерээр ажиллаж эхэлсэн. T2, Dashing, X70 Plus, G700 — бүгд Монголд.",
  },
];

export const NAV_LINKS = [
  { href: "#brand", label: "Брэнд" },
  { href: "#models", label: "Загварууд" },
  { href: "#technology", label: "Технологи" },
  { href: "#network", label: "Түгээлт" },
  { href: "#contact", label: "Холбоо" },
];
