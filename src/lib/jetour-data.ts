// JETOUR Mongolia site data — central source of truth

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
  image: string;
  specs: {
    engine: string;
    power: string;
    transmission: string;
    drivetrain: string;
    seats: string;
  };
  highlights: string[];
  accent: "red" | "blue";
};

export const MODELS: JetourModel[] = [
  {
    id: "t2",
    name: "JETOUR T2",
    series: "Traveller Series",
    tagline: "Аяллын баатар",
    description:
      "Цэвэрлэгээтэй замд төрсөн Travel+ SUV. Бэхлэлтийн хүчтэй дизайн, дөрвөн дугуйн жолоодлого, олон тооны аяллын горим — Монголын нутагт тохиромжтой.",
    image: "https://sfile.chatglm.cn/images-ppt/779b5fef3cd7.jpg",
    specs: {
      engine: "2.0L Turbo",
      power: "254 hp / 390 Nm",
      transmission: "7DCT",
      drivetrain: "4WD",
      seats: "5 суудал",
    },
    highlights: [
      "Дөрвөн дугуйн жолоодлого",
      "Олон замын горим (Snow / Mud / Sand)",
      "220 мм газрын тусгаар",
      "700 мм усанд орох чадвар",
    ],
    accent: "red",
  },
  {
    id: "dashing",
    name: "JETOUR Dashing",
    series: "Crossover Series",
    tagline: "Ирээдүйн кросоверын тодорхойлолт",
    description:
      "Залуусын хүсэн хүлээсэн дизайны шинэ хэл. Цахим仪表ийн орчин, дэвшилттэй аюулгүй байдлын системүүд болон үр ашигтай хөдөлгүүртэй.",
    image: "https://sfile.chatglm.cn/images-ppt/bbde81a8e111.png",
    specs: {
      engine: "1.6L Turbo",
      power: "197 hp / 290 Nm",
      transmission: "7DCT",
      drivetrain: "FWD",
      seats: "5 суудал",
    },
    highlights: [
      "15.6\" цахим хяналтын дэлгэц",
      "Sony 8 чиглэлтэй аудио систем",
      "ADAS аюулгүй байдлын багц",
      "Хот дотор 7.5L/100km зарцуулга",
    ],
    accent: "blue",
  },
  {
    id: "x70",
    name: "JETOUR X70 Plus",
    series: "Family Series",
    tagline: "Гэр бүлийн том зорилгод",
    description:
      "Өргөн уудам 7 суудалтай гэр бүлийн SUV. Урт замын тав тухатай, дээд зэргийн аюулгүй байдал, эхнэхийн дээвэр болох загвар.",
    image: "https://sfile.chatglm.cn/images-ppt/afd3ef95c28e.jpg",
    specs: {
      engine: "1.6L Turbo",
      power: "197 hp / 290 Nm",
      transmission: "7DCT",
      drivetrain: "FWD",
      seats: "7 суудал",
    },
    highlights: [
      "7 суудалт уудам салон",
      "Панорамик тэнгэрлэг дээвэр",
      "L2.5 өөрөө жолоодох горим",
      "5 одтой NCAP аюулгүй байдал",
    ],
    accent: "red",
  },
  {
    id: "g700",
    name: "JETOUR G700",
    series: "Flagship Series",
    tagline: "Тууштай тэргүүн",
    description:
      "JETOUR-ын тэргүүлэх их буудлын SUV. Гурван эгнээнд суудалтай, дөрвөн дугуйн жолоодлоготой, дээд зэргийн люкс тав тухатай.",
    image: "https://sfile.chatglm.cn/images-ppt/da81ea07e2ff.jpg",
    specs: {
      engine: "2.0L Turbo PHEV",
      power: "555 hp / 800 Nm",
      transmission: "3DHT",
      drivetrain: "4WD",
      seats: "6–7 суудал",
    },
    highlights: [
      "PHEV plug-in хосолсон хөдөлгүүр",
      "1000+ км нийт цэвэр аяллын зайд",
      "Агаарын дөрвөн салхивч",
      "Alcantara + Nappa арьсан салон",
    ],
    accent: "blue",
  },
];

export const TECHNOLOGY = [
  {
    icon: "engine",
    title: "Kunlun Powertrain",
    description:
      "JETOUR-ын өөрийн хөгжүүлсэн 2.0T хөдөлгүүр нь 254 морины хүч, 390 Нм эргүүлэх хүчийг гаргаж, бага эзлэхүүнтэй хэвээр өндөр ашигтай байдаг.",
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
  { value: "2023", label: "Онгоцонд орогч жил" },
  { value: "4S", label: "Стандарт үйлчилгээний төв" },
];

export const NAV_LINKS = [
  { href: "#brand", label: "Брэнд" },
  { href: "#models", label: "Загварууд" },
  { href: "#technology", label: "Технологи" },
  { href: "#distributor", label: "Сайн Моторс" },
  { href: "#test-drive", label: "Тест драйв" },
  { href: "#contact", label: "Холбоо" },
];
