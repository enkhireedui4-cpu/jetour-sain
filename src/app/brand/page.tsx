import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Compass,
  Cpu,
  Route,
  Zap,
  ShieldCheck,
  Package,
  Wrench,
  Award,
  Snowflake,
  BadgeCheck,
  Gauge,
} from "lucide-react";
import { Navbar } from "@/components/jetour/navbar";
import { Footer } from "@/components/jetour/contact";
import { CONTACT } from "@/lib/jetour-data";
import { BLUR_DATA_URL } from "@/lib/image";

export const metadata: Metadata = {
  title: "Брэндийн тухай — JETOUR",
  description:
    "JETOUR — Chery Group-ийн Travel+ SUV брэнд. Монголд SAIN MOTORS-оор дамжин албан ёсоор.",
  alternates: { canonical: "/brand" },
};

// Server Component — клиент JavaScript ачаалахгүй.
// Анимаци нь globals.css-ийн CSS-only `.reveal` / `.stagger` утилитаар хийгдэнэ.

const STORY = [
  { icon: Award, title: "2018 онд байгуулагдсан", text: "Chery Group-ийн шинэлэг, эрч хүчтэй SUV брэнд." },
  { icon: Gauge, title: "20+ жилийн туршлага", text: "Автомашины салбарын гүн туршлага дээр бүтээгдсэн." },
  { icon: Cpu, title: "Дэлхийн R&D", text: "Судалгаа, хөгжүүлэлтийн дэлхийн түвшний бааз." },
  { icon: Compass, title: "Олон улсын дизайны баг", text: "Загвар бүр олон улсын дизайны хэлээр яригдана." },
];

const PHILOSOPHY = [
  {
    icon: Compass,
    label: "Travel+",
    title: "Аяллын концепц",
    items: ["Гэр бүлийн тав тух", "Адал явдал", "Өдөр тутмын хэрэглээ"],
  },
  {
    icon: Zap,
    label: "JET + TOUR",
    title: "Нэрийн утга",
    items: ["JET — түргэн шуурхай", "TOUR — аялал", "Таатай, хялбар аялал"],
  },
  {
    icon: Route,
    label: "Vision",
    title: "Алсын хараа",
    items: ["Ухаалаг технологи", "Тав тух, орчин үеийн дизайн", "Дэлхийн SUV брэнд"],
  },
];

const SAIN_FEATURES = [
  { icon: BadgeCheck, title: "Албан ёсны дистрибьютор", text: "JETOUR брэндийн Монгол дахь албан ёсны төлөөлөгч." },
  { icon: ShieldCheck, title: "Албан ёсны баталгаа", text: "Баталгаат хугацаа, стандартын дагуух үйлчилгээ." },
  { icon: Package, title: "Оригинал сэлбэг", text: "Албан ёсны, чанарын шаардлага хангасан сэлбэг." },
  { icon: Wrench, title: "Мэргэжлийн үйлчилгээ", text: "Борлуулалтын дараах засвар үйлчилгээ." },
  { icon: Gauge, title: "Найдвартай ашиглалт", text: "Тогтмол засвар, техник хяналтын дэмжлэг." },
  { icon: Snowflake, title: "Монголд зохицсон", text: "Цаг уур, замын нөхцөлд тохирсон загварууд." },
];

const WHY = [
  { icon: Cpu, title: "Дэлхийн инженерчлэл" },
  { icon: Compass, title: "Олон улсын дизайн" },
  { icon: BadgeCheck, title: "Албан ёсны дистрибьютор" },
  { icon: ShieldCheck, title: "Баталгаа ба сэлбэг" },
  { icon: Zap, title: "Ухаалаг технологи" },
  { icon: Snowflake, title: "Монголд зохицсон" },
];

const TIMELINE = [
  { year: "2018", title: "Брэнд байгуулагдсан" },
  { year: "—", title: "Зах зээлд тэлэлт" },
  { year: "—", title: "Дэлхийн хэмжээнд өсөлт" },
  { year: CONTACT.brandSince, title: "Монголд албан ёсоор" },
];

export default function BrandPage() {
  return (
    <div id="main-content" className="min-h-screen bg-white text-[#17181B]">
      <Navbar />
      <div className="h-16" />

      {/* ===== 1. HERO ===== */}
      <section className="border-b border-[#E7E7EA]">
        <div className="container-page grid lg:grid-cols-2 gap-12 lg:gap-16 items-center py-16 lg:py-24 min-h-[70vh]">
          <div className="reveal">
            <h1 className="type-h1 mb-6">Аялахын тулд бүтээгдсэн брэнд</h1>
            <p className="text-[17px] lg:text-lg leading-[1.7] text-[#54585F] max-w-md mb-9">
              JETOUR бол Chery Group-ийн шинэлэг SUV брэнд. Travel+ концепцээр гэр бүлийн тав тух,
              адал явдал, өдөр тутмын хэрэглээг нэг дор цогцлуулна.
            </p>
            <Link
              href="/models"
              className="btn-electric-jetour inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm"
            >
              Загварууд үзэх
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="reveal relative aspect-[4/3] rounded-3xl overflow-hidden bg-[#F5F5F6]">
            <Image
              src="/models-hero/x70-plus-hero.png"
              alt="JETOUR SUV"
              fill
              priority
              sizes="(max-width: 1024px) 94vw, 46vw"
              placeholder="blur"
              blurDataURL={BLUR_DATA_URL}
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* ===== 2. WHO IS JETOUR ===== */}
      <section className="py-20 lg:py-36">
        <div className="container-page grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="reveal relative aspect-[4/3] rounded-3xl overflow-hidden bg-[#F5F5F6]">
            <Image
              src="/models-hero/t1.jpg"
              alt="JETOUR"
              fill
              sizes="(max-width: 1024px) 94vw, 46vw"
              placeholder="blur"
              blurDataURL={BLUR_DATA_URL}
              className="object-cover"
            />
          </div>

          <div>
            <div className="reveal mb-10">
              <h2 className="type-h2">Chery Group-ийн SUV брэнд</h2>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {STORY.map((s, i) => (
                <div
                  key={s.title}
                  className="stagger rounded-3xl border border-[#E7E7EA] bg-white p-6 card-lift"
                  style={{ "--index": i } as React.CSSProperties}
                >
                  <s.icon className="w-5 h-5 text-[#E20A17] mb-4" />
                  <h3 className="font-bold text-base mb-1.5">{s.title}</h3>
                  <p className="text-sm text-[#54585F] leading-[1.7]">{s.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== 3. TRAVEL+ PHILOSOPHY ===== */}
      <section className="py-20 lg:py-36 bg-[#F5F5F6] border-y border-[#E7E7EA]">
        <div className="container-page">
          <div className="reveal max-w-xl mb-12 lg:mb-16">
            <h2 className="type-h2">Travel+ — аялахын философи</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {PHILOSOPHY.map((p, i) => (
              <div
                key={p.label}
                className="stagger rounded-3xl border border-[#E7E7EA] bg-white p-8 lg:p-9 card-lift"
                style={{ "--index": i } as React.CSSProperties}
              >
                <p.icon className="w-6 h-6 text-[#E20A17] mb-6" />
                <p className="eyebrow text-[#6B7280] mb-2">{p.label}</p>
                <h3 className="text-xl font-bold mb-5">{p.title}</h3>
                <ul className="space-y-2.5">
                  {p.items.map((it) => (
                    <li key={it} className="text-[15px] text-[#54585F] leading-[1.7]">
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 4. ABOUT SAIN MOTORS ===== */}
      <section className="py-20 lg:py-36">
        <div className="container-page grid lg:grid-cols-[0.85fr_1.15fr] gap-12 lg:gap-16">
          <div className="reveal lg:sticky lg:top-24 self-start">
            <h2 className="type-h2 mb-6">Итгэлтэй түнш</h2>
            <p className="text-[17px] lg:text-lg leading-[1.7] text-[#54585F] max-w-sm">
              {CONTACT.brandFullName} нь дэлхийн жишигт нийцсэн JETOUR брэндийг Монголын
              хэрэглэгчиддээ албан ёсоор хүргэж байна.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {SAIN_FEATURES.map((f, i) => (
              <div
                key={f.title}
                className="stagger rounded-3xl border border-[#E7E7EA] bg-white p-6 card-lift"
                style={{ "--index": i } as React.CSSProperties}
              >
                <f.icon className="w-5 h-5 text-[#E20A17] mb-4" />
                <h3 className="font-bold text-base mb-1.5">{f.title}</h3>
                <p className="text-sm text-[#54585F] leading-[1.7]">{f.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 5. WHY CHOOSE JETOUR ===== */}
      <section className="py-20 lg:py-36 bg-[#F5F5F6] border-y border-[#E7E7EA]">
        <div className="container-page">
          <div className="reveal max-w-xl mb-12 lg:mb-14">
            <h2 className="type-h2">Сонголтын үндэслэл</h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
            {WHY.map((w, i) => (
              <div
                key={w.title}
                className="stagger flex items-center gap-4 rounded-3xl border border-[#E7E7EA] bg-white px-6 py-7 card-lift"
                style={{ "--index": i } as React.CSSProperties}
              >
                <w.icon className="w-5 h-5 text-[#E20A17] shrink-0" />
                <h3 className="font-bold text-[15px] lg:text-base leading-snug">{w.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 6. TIMELINE ===== */}
      <section className="py-20 lg:py-36">
        <div className="container-page">
          <div className="reveal max-w-xl mb-12 lg:mb-14">
            <h2 className="type-h2">Брэндийн аялал</h2>
          </div>
          <ol className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-6 border-t border-[#E7E7EA] pt-12">
            {TIMELINE.map((t, i) => (
              <li
                key={t.title}
                className="stagger relative"
                style={{ "--index": i } as React.CSSProperties}
              >
                <span
                  className="absolute -top-[54px] left-0 w-2 h-2 rounded-full bg-[#E20A17]"
                  aria-hidden
                />
                <p className="text-2xl lg:text-3xl font-extrabold tracking-tight mb-2">{t.year}</p>
                <p className="text-[15px] text-[#54585F] leading-[1.7]">{t.title}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ===== 7. FINAL CTA ===== */}
      <section className="py-20 lg:py-32 bg-[#F5F5F6] border-t border-[#E7E7EA]">
        <div className="container-page reveal text-center">
          <h2 className="type-h2 mb-8">Дараагийн аялалдаа бэлэн үү?</h2>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link
              href="/models"
              className="btn-electric-jetour inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm"
            >
              Загварууд үзэх
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/info-request"
              className="btn-ink-jetour inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm"
            >
              Мэдээлэл авах
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
