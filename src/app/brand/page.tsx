"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Users,
  Globe,
  Factory,
  Award,
  Heart,
  Compass,
  Cpu,
  ArrowRight,
  Phone,
  Lightbulb,
  Shield,
  Zap,
  MapPin,
} from "lucide-react";
import {
  GLOBAL_STATS,
  TRAVEL_FEATURES,
  CONTACT,
  LIFESTYLE_IMAGES,
} from "@/lib/jetour-data";
import { Navbar } from "@/components/jetour/navbar";
import { Footer } from "@/components/jetour/contact";

const STAT_ICONS: Record<string, React.ReactNode> = {
  users: <Users className="w-6 h-6" />,
  globe: <Globe className="w-6 h-6" />,
  factory: <Factory className="w-6 h-6" />,
  award: <Award className="w-6 h-6" />,
};

const FEATURE_ICONS: Record<string, React.ReactNode> = {
  heart: <Heart className="w-6 h-6" />,
  compass: <Compass className="w-6 h-6" />,
  cpu: <Cpu className="w-6 h-6" />,
};

const TIMELINE = [
  { year: 2018, title: "Брэнд байгуулагдав", desc: "Chery Group дэлхийн SUV брэнд төрүүлэв" },
  { year: 2019, title: "X70 гарсан", desc: "Флагман загвар худалдаанд орлоо" },
  { year: 2021, title: "Дэлхийн зах зээл", desc: "100+ орны зах зээлд нүүлэгдэв" },
  { year: 2024, title: "Монголд орлоо", desc: "SAIN MOTORS-оор албан ёсоор суухалтал" },
];

const WHY_JETOUR = [
  { icon: Lightbulb, title: "Innovation", desc: "Орчин үеийн технологи + дизайн" },
  { icon: MapPin, title: "Travel Lifestyle", desc: "Аялалын бүх зүйл нэгдсэн" },
  { icon: Shield, title: "Safety", desc: "Орчлон аюулгүй байдлын 6-р зэрэг" },
  { icon: Zap, title: "Smart Tech", desc: "L2.5 ADAS, 360° камер, Apple CarPlay" },
];

// Animated counter hook
function useCounter(end: number, duration: number = 2000) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const step = end / (duration / 50);
    const timer = setInterval(() => {
      start += step;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 50);
    return () => clearInterval(timer);
  }, [end, duration]);
  return count;
}

export default function BrandPage() {
  const count80 = useCounter(80, 2000);
  const count2000 = useCounter(2000, 2000);
  const count50 = useCounter(50, 2000);

  return (
    <div className="min-h-screen bg-white text-[#17181B]">
      <Navbar />
      <div className="h-16" />

      {/* Hero — Full-screen cinematic */}
      <section className="relative h-screen min-h-[600px] overflow-hidden bg-[#0E0E10]">
        <motion.img
          initial={{ scale: 1.05, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2 }}
          src={LIFESTYLE_IMAGES.hero}
          alt="JETOUR — Travel+"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/40" />
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="max-w-2xl px-6"
          >
            <p className="text-xs font-bold tracking-[0.24em] uppercase text-white/70 mb-6">
              Брэндийн тухай
            </p>
            <h1 className="font-extrabold tracking-tight text-white text-5xl lg:text-7xl leading-[1.05] mb-6">
              JETOUR —<br />
              <span className="text-[#E20A17]">Аяллын соёл</span>
            </h1>
            <p className="text-white/85 text-lg leading-relaxed max-w-xl mx-auto mb-10">
              Зөвхөн машин биш — аялал, адал явдал, шинийг нээх амьдралын хэв маяг.
            </p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-wrap gap-4 justify-center"
            >
              <Link
                href="/#models"
                className="bg-[#E20A17] text-white px-8 py-4 rounded-full font-bold hover:bg-white hover:text-[#E20A17] transition-all"
              >
                Загварууд үзэх
              </Link>
              <Link
                href="/dealer"
                className="border-2 border-white text-white px-8 py-4 rounded-full font-bold hover:bg-white hover:text-[#17181B] transition-all"
              >
                Дилер олох
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 lg:py-28 bg-gradient-to-b from-white to-[#F5F5F6]">
        <div className="mx-auto w-[min(1280px,94vw)]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <p className="text-xs font-bold tracking-[0.24em] uppercase text-[#E20A17] mb-2">
              Брэндийн түүх
            </p>
            <h2 className="font-extrabold tracking-tight text-[#17181B] text-4xl lg:text-5xl">
              JETOUR-ийн аялал
            </h2>
          </motion.div>
          <div className="grid lg:grid-cols-4 gap-8">
            {TIMELINE.map((item, i) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="relative"
              >
                <div className="h-32 rounded-2xl bg-gradient-to-br from-[#E20A17]/10 to-[#E20A17]/5 border border-[#E20A17]/20 p-6 flex flex-col justify-between">
                  <div>
                    <p className="text-3xl font-extrabold text-[#E20A17] mb-1">{item.year}</p>
                    <h3 className="font-bold text-[#17181B] text-lg">{item.title}</h3>
                  </div>
                  <p className="text-sm text-[#54585F]">{item.desc}</p>
                </div>
                {i < TIMELINE.length - 1 && (
                  <div className="hidden lg:block absolute -right-4 top-1/2 -translate-y-1/2 w-8 h-0.5 bg-[#E20A17]/30" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="mx-auto w-[min(1100px,94vw)] grid lg:grid-cols-2 gap-10 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-extrabold tracking-tight text-[#17181B] text-2xl lg:text-3xl mb-4">
              Chery Group-ын дотор төрсөн дэлхийн брэнд
            </h2>
            <p className="text-[#54585F] leading-relaxed mb-4">
              2018 онд Chery Group-ын дотор төрсөн JETOUR нь залуу, эрч хүчтэй SUV-д төвлөрсөн
              дэлхийн брэнд. &quot;Travel+&quot; урианы дор — аялагчдын хүсэл, гэр бүлийн аялал,
              адал явдал нээлтийг нэг загварт нэгтгэсэн.
            </p>
            <p className="text-[#54585F] leading-relaxed">
              Chery Group-ын R&amp;D суурь, Италийн дизайны студи дээр тулгуурлан шинэ загвар бүр
              дэлхийн түвшний дизайны хэлээр яригдана.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h2 className="font-extrabold tracking-tight text-[#17181B] text-2xl lg:text-3xl mb-4">
              Монголд — Sain Motors-оор дамжин
            </h2>
            <p className="text-[#54585F] leading-relaxed mb-4">
              {CONTACT.brandFullName} нь JETOUR брэндийн Монгол дахь {CONTACT.brandRole.toLowerCase()}.
              {CONTACT.brandSince} оноос хойш Монголын зах зээлд албан ёсоор үйл ажиллагаа явуулж байна.
            </p>
            <p className="text-[#54585F] leading-relaxed">
              Монголын уудам нутаг, өвлийн хүйтэн, зуны халуун, уулсын зам — эдгээрт тохирсон загвар,
              4S стандартын үйлчилгээ, оригинал сэлбэгийн бүрэн нөөцтэйгээр үйлчилнэ.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Global stats with counter animation */}
      <section className="py-16 lg:py-20 bg-[#0E0E10] text-white">
        <div className="mx-auto w-[min(1280px,94vw)]">
          <p className="text-xs font-bold tracking-[0.24em] uppercase text-white/50 mb-2">
            Дэлхийд
          </p>
          <h2 className="font-extrabold tracking-tight text-3xl lg:text-4xl mb-10">
            Дэлхийн <span className="text-[#E20A17]">JETOUR</span>
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-5">
            {/* Custom counter cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="rounded-2xl bg-white/[0.04] border border-white/10 p-6"
            >
              <span className="w-12 h-12 grid place-items-center rounded-xl bg-[#E20A17]/15 text-[#E20A17] mb-5">
                <Globe className="w-6 h-6" />
              </span>
              <p className="font-extrabold text-3xl lg:text-4xl tracking-tight">{count80}+</p>
              <p className="text-white/60 text-sm mt-1">Оронд борлуулсан</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="rounded-2xl bg-white/[0.04] border border-white/10 p-6"
            >
              <span className="w-12 h-12 grid place-items-center rounded-xl bg-[#E20A17]/15 text-[#E20A17] mb-5">
                <Users className="w-6 h-6" />
              </span>
              <p className="font-extrabold text-3xl lg:text-4xl tracking-tight">{count2000}+</p>
              <p className="text-white/60 text-sm mt-1">Дилер сүлжээ</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 col-span-2 lg:col-span-1"
            >
              <span className="w-12 h-12 grid place-items-center rounded-xl bg-[#E20A17]/15 text-[#E20A17] mb-5">
                <Award className="w-6 h-6" />
              </span>
              <p className="font-extrabold text-3xl lg:text-4xl tracking-tight">{count50}+M</p>
              <p className="text-white/60 text-sm mt-1">Дэлхийн эзэмшигчид</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Travel+ features */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="mx-auto w-[min(1280px,94vw)]">
          <p className="text-xs font-bold tracking-[0.24em] uppercase text-[#E20A17] mb-2">
            Travel+ философи
          </p>
          <h2 className="font-extrabold tracking-tight text-[#17181B] text-3xl lg:text-4xl mb-10">
            Зөвхөн машин биш
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {TRAVEL_FEATURES.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="rounded-2xl bg-[#F5F5F6] border border-[#E7E7EA] p-7"
              >
                <span className="w-12 h-12 grid place-items-center rounded-xl bg-[#E20A17]/10 text-[#E20A17] mb-5">
                  {FEATURE_ICONS[f.icon]}
                </span>
                <h3 className="font-bold text-lg text-[#17181B] mb-2">{f.title}</h3>
                <p className="text-sm text-[#54585F] leading-relaxed">{f.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Jetour */}
      <section className="py-16 lg:py-24 bg-[#F5F5F6] border-t border-[#E7E7EA]">
        <div className="mx-auto w-[min(1280px,94vw)]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <p className="text-xs font-bold tracking-[0.24em] uppercase text-[#E20A17] mb-2">
              Яагаад JETOUR?
            </p>
            <h2 className="font-extrabold tracking-tight text-[#17181B] text-3xl lg:text-4xl">
              4 шалтгаан
            </h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {WHY_JETOUR.map((item, i) => {
              const IconComponent = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="group rounded-2xl bg-white border border-[#E7E7EA] p-7 hover:shadow-xl hover:border-[#E20A17] transition-all h-full cursor-pointer"
                >
                  <motion.span
                    className="w-14 h-14 grid place-items-center rounded-xl bg-[#E20A17]/10 text-[#E20A17] mb-5 inline-flex"
                    whileHover={{ scale: 1.1 }}
                  >
                    <IconComponent className="w-7 h-7" />
                  </motion.span>
                  <h3 className="font-bold text-lg text-[#17181B] mb-2 group-hover:text-[#E20A17] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-[#54585F] leading-relaxed">{item.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 lg:py-20 bg-[#F5F5F6] border-t border-[#E7E7EA]">
        <div className="mx-auto w-[min(1280px,94vw)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <h2 className="font-extrabold tracking-tight text-[#17181B] text-2xl lg:text-3xl mb-2">
              JETOUR-ийг өөрийн биеэр мэдрээрэй
            </h2>
            <p className="text-[#54585F]">Загвар үзэх, тест драйв, дилертэй холбогдох.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/#models"
              className="inline-flex items-center gap-2 bg-[#17181B] text-white px-6 py-3.5 rounded-full text-sm font-bold hover:bg-[#E20A17] transition-colors"
            >
              Загварууд үзэх
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href={CONTACT.phone1Href}
              className="btn-electric-jetour inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-sm"
            >
              <Phone className="w-4 h-4" />
              {CONTACT.phone1}
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
