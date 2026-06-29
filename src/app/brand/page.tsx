"use client";

import Link from "next/link";
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

export default function BrandPage() {
  return (
    <div className="min-h-screen bg-white text-[#17181B]">
      <Navbar />
      <div className="h-16" />

      {/* Hero */}
      <section className="relative h-[60vh] min-h-[420px] overflow-hidden bg-[#0E0E10]">
        <img
          src={LIFESTYLE_IMAGES.hero}
          alt="JETOUR — Travel+"
          className="absolute inset-0 w-full h-full object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/30" />
        <div className="relative z-10 h-full flex items-end pb-12 lg:pb-16">
          <div className="mx-auto w-[min(1280px,94vw)]">
            <p className="text-xs font-bold tracking-[0.24em] uppercase text-white/70 mb-3">
              Брэндийн тухай
            </p>
            <h1 className="font-extrabold tracking-tight text-white text-4xl lg:text-6xl leading-[1.02] max-w-3xl">
              JETOUR — <span className="text-[#E20A17]">Аяллын соёл</span>
            </h1>
            <p className="text-white/85 text-base lg:text-lg leading-relaxed mt-4 max-w-xl">
              Зөвхөн машин биш — аялал, адал явдал, шинийг нээх амьдралын хэв маяг.
            </p>
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

      {/* Global stats */}
      <section className="py-16 lg:py-20 bg-[#0E0E10] text-white">
        <div className="mx-auto w-[min(1280px,94vw)]">
          <p className="text-xs font-bold tracking-[0.24em] uppercase text-white/50 mb-2">
            Дэлхийд
          </p>
          <h2 className="font-extrabold tracking-tight text-3xl lg:text-4xl mb-10">
            Дэлхийн <span className="text-[#E20A17]">JETOUR</span>
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {GLOBAL_STATS.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="rounded-2xl bg-white/[0.04] border border-white/10 p-6"
              >
                <span className="w-12 h-12 grid place-items-center rounded-xl bg-[#E20A17]/15 text-[#E20A17] mb-5">
                  {STAT_ICONS[s.icon]}
                </span>
                <p className="font-extrabold text-3xl lg:text-4xl tracking-tight">
                  {s.value >= 1000000 ? `${s.value / 1000000}M` : s.value}
                  {s.suffix}
                </p>
                <p className="text-white/60 text-sm mt-1">{s.label}</p>
              </motion.div>
            ))}
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
