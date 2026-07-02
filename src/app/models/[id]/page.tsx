"use client";

import { useState, use } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Phone,
  Gauge,
  Cog,
  CircleDot,
  Users,
  Zap,
  Wind,
  Ruler,
  Navigation,
  Fuel,
  ShieldCheck,
  Camera,
  Music,
  Smartphone,
  Monitor,
  Send,
  Calendar,
  User,
  CheckCircle2,
} from "lucide-react";
import {
  ALL_MODELS,
  ALL_MODELS_FOR_GRID,
  MODEL_COLOR_IMAGES,
  MODEL_GALLERY_IMAGES,
  MODEL_TECH_HIGHLIGHTS,
  MODEL_INTERIOR_HIGHLIGHTS,
  MODEL_QUALITY_HIGHLIGHTS,
  MODEL_SAFETY_HIGHLIGHTS,
  CONTACT,
  TECHNOLOGY_FEATURES,
} from "@/lib/jetour-data";
import { Gallery } from "@/components/jetour/gallery";
import { EnhancedLeadForm } from "@/components/jetour/enhanced-lead-form";
import { useToast } from "@/hooks/use-toast";

const TECH_ICON_MAP: Record<string, React.ReactNode> = {
  camera: <Camera className="w-6 h-6" />,
  gauge: <Gauge className="w-6 h-6" />,
  zap: <Zap className="w-6 h-6" />,
  music: <Music className="w-6 h-6" />,
  smartphone: <Smartphone className="w-6 h-6" />,
  display: <Monitor className="w-6 h-6" />,
};

const SAFETY_FEATURES = [
  { title: "ADAS жолоодлогын туслалцаа", description: "L2.5 түвшний ухаалаг систем — эгнээнд барих, тоормосны туслалцаа, замын тэмдэг таних." },
  { title: "Олон тооны аюулгүйн дэр", description: "6-8 аюулгүйн дэр — жолооч болон зорчигчдын бүх талыг хамгаална." },
  { title: "Өндөр бат бөх бүтэц", description: "Өндөр хүчдэлийн ган бие — мөргөлдөөний үед энерги дарах бүтэц." },
  { title: "Эгнээний туслалцаа (LKA)", description: "Эгнэээс гарахаас сэргийлэх систем — жолоочийн анхаарал төвлөрүүлнэ." },
  { title: "Яаралтай тоормос (AEB)", description: "Бэрхшээл үүсэхэд автомат тоормос — ослоос урьдчилан сэргийлнэ." },
];

export default function ModelDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const model = ALL_MODELS.find((m) => m.id === id);

  if (!model) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white text-[#17181B]">
        <div className="text-center">
          <h1 className="font-display font-extrabold italic text-4xl mb-4">Загвар олдсонгүй</h1>
          <p className="text-[#6B7280] mb-6">Таны хайсан загвар байхгүй байна.</p>
          <Link href="/" className="btn-electric-jetour inline-flex px-6 py-3 rounded-xl text-sm">
            Нүүр хуудас руу буцах
          </Link>
        </div>
      </div>
    );
  }

  return <ModelDetailContent model={model} />;
}

function ModelDetailContent({ model }: { model: typeof ALL_MODELS_FOR_GRID[number] }) {
  const accentColor = "#E20A17";
  const accentSoft = "#FF4A42";

  // Бодит өнгөний зураг (Color Configurator)
  const colorImages = MODEL_COLOR_IMAGES[model.id] ?? [];
  const galleryImgs = MODEL_GALLERY_IMAGES[model.id] ?? [];
  const [colorIdx, setColorIdx] = useState(0);
  const heroImg = colorImages[0]?.image ?? galleryImgs[0] ?? model.heroImage;
  const exteriorImgs = colorImages.length
    ? colorImages.map((c) => c.image)
    : galleryImgs.length
    ? galleryImgs
    : model.exteriorImages;
  const techHi = MODEL_TECH_HIGHLIGHTS[model.id] ?? [];
  const interiorHi = MODEL_INTERIOR_HIGHLIGHTS[model.id] ?? [];
  const qualityHi = MODEL_QUALITY_HIGHLIGHTS[model.id] ?? [];
  const safetyHi = MODEL_SAFETY_HIGHLIGHTS[model.id] ?? [];

  return (
    <div className="min-h-screen bg-white text-[#17181B]">
      {/* === Top back navigation === */}
      <div className="bg-[#17181B] text-white py-4 sticky top-0 z-30">
        <div className="mx-auto w-[min(1280px,94vw)] flex items-center justify-between">
          <Link
            href="/#models"
            className="flex items-center gap-2 text-white/80 hover:text-white transition-colors text-sm font-display font-bold tracking-wider"
          >
            <ArrowLeft className="w-4 h-4" />
            Бүх загвар
          </Link>
          <div className="flex items-center gap-3">
            <a
              href={CONTACT.phone1Href}
              className="hidden sm:flex items-center gap-2 text-white/80 hover:text-[#E20A17] transition-colors text-xs font-display font-bold"
            >
              <Phone className="w-3.5 h-3.5" />
              {CONTACT.phone1}
            </a>
            <Link
              href="#request-info"
              className="btn-electric-jetour px-4 py-2 rounded-full text-xs tracking-wide"
            >
              Тест драйв
            </Link>
          </div>
        </div>
      </div>

      {/* === Vehicle Hero Banner === */}
      <section className="relative h-[80vh] min-h-[560px] overflow-hidden bg-[#17181B]">
        <div className="absolute inset-0">
          <img
            src={heroImg}
            alt={model.name}
            className="w-full h-full object-cover"
            loading="eager"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 35%, rgba(0,0,0,0.5) 75%, rgba(0,0,0,0.95) 100%)",
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background: `radial-gradient(50% 60% at 20% 50%, ${accentColor}33, transparent 70%)`,
            }}
          />
        </div>

        <div className="relative z-10 h-full flex items-end pb-16">
          <div className="mx-auto w-[min(1280px,94vw)] w-full">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9 }}
            >
              <p
                className="eyebrow mb-3"
                style={{ color: accentSoft }}
              >
                {model.series} цуврал
              </p>
              <h1
                className="font-display font-extrabold italic text-white mb-4"
                style={{
                  fontSize: "clamp(2.8rem, 8vw, 6rem)",
                  lineHeight: 0.95,
                  textShadow: "0 6px 30px rgba(0,0,0,0.5)",
                }}
              >
                {model.name}
              </h1>
              <p
                className="text-lg lg:text-xl text-white/90 mb-8 max-w-xl"
                style={{ textShadow: "0 2px 12px rgba(0,0,0,0.5)" }}
              >
                {model.tagline}
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <div>
                  <p className="text-[0.6rem] tracking-[0.22em] uppercase text-white/60 font-display mb-1">
                    Үнэ
                  </p>
                  <p
                    className="font-display font-extrabold italic text-3xl text-white"
                    style={{ textShadow: "0 4px 20px rgba(0,0,0,0.5)" }}
                  >
                    {model.startingPrice ?? model.price ?? model.priceNote}
                  </p>
                </div>
                <div className="h-14 w-px bg-white/20" />
                <a
                  href="#request-info"
                  className="btn-electric-jetour px-6 py-3.5 rounded-xl text-sm flex items-center gap-2"
                >
                  Үнийн санал авах
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href="#request-info"
                  className="btn-outline-light px-6 py-3.5 rounded-xl text-sm"
                >
                  Тест драйв захиалах
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* === Exterior Gallery === */}
      <Section title="Гадна үзэмж" eyebrow="01 · Экстерьер" bg="bg-white">
        <p className="text-[#6B7280] text-base lg:text-lg leading-relaxed mb-10 max-w-3xl">
          {model.description}
        </p>
        <Gallery key={`ext-${model.id}`} images={exteriorImgs} alt={model.name} accent={model.accent} />
      </Section>

      {/* === Interior === */}
      <Section title="Дотор салон" eyebrow="02 · Интерьер" bg="bg-[#F5F5F6]">
        {interiorHi.length > 0 ? (
          <MediaHighlights items={interiorHi} />
        ) : (
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
            <div className="rounded-2xl overflow-hidden bg-white border border-[#E7E7EA]">
              <img
                src={model.interiorImages[0]}
                alt={`${model.name} — салон`}
                className="w-full aspect-[16/10] object-cover"
                loading="lazy"
              />
            </div>
            <div>
              <p className="text-[#54585F] text-base leading-relaxed mb-7 max-w-lg">
                {model.shortDesc}
              </p>
              <div className="space-y-5">
                {model.interiorFeatures.map((f) => (
                  <div key={f.title} className="border-l-2 border-[#E20A17] pl-4">
                    <h3 className="font-bold text-base text-[#17181B] mb-1">{f.title}</h3>
                    <p className="text-sm text-[#54585F] leading-relaxed">{f.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </Section>

      {/* === Technology Section === */}
      {techHi.length > 0 ? (
        <Section title="Технологи" eyebrow="03 · Технологи" bg="bg-white">
          <MediaHighlights items={techHi} />
        </Section>
      ) : (
      <Section title="Технологи" eyebrow="03 · Технологи" bg="bg-[#17181B]" dark>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {TECHNOLOGY_FEATURES.map((t, i) => (
            <motion.div
              key={t.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: (i % 3) * 0.1 }}
              whileHover={{ y: -8 }}
              className="group relative overflow-hidden bg-white/[0.04] border border-white/10 rounded-2xl p-7 hover:border-[#E20A17]/50 transition-colors"
            >
              <div className="w-14 h-14 grid place-items-center rounded-2xl mb-5 border border-[#E20A17]/30 bg-gradient-to-br from-[#E20A17]/20 to-[#E20A17]/5 text-[#E20A17]">
                {TECH_ICON_MAP[t.icon]}
              </div>
              <h3 className="font-display font-extrabold italic text-lg text-white mb-3">{t.title}</h3>
              <p className="text-white/70 text-sm leading-relaxed">{t.description}</p>
            </motion.div>
          ))}
        </div>
      </Section>
      )}

      {/* === Safety Section === */}
      {safetyHi.length > 0 ? (
        <Section title="Аюулгүй байдал" eyebrow="04 · Хамгаалалт" bg="bg-white">
          <MediaHighlights items={safetyHi} />
        </Section>
      ) : (
      <Section title="Аюулгүй байдал" eyebrow="04 · Хамгаалалт" bg="bg-white">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SAFETY_FEATURES.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: (i % 3) * 0.1 }}
              className="bg-white rounded-2xl p-6 border border-[#E7E7EA] card-lift"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 grid place-items-center rounded-xl bg-gradient-to-br from-[#17181B] to-[#232428] text-[#E20A17]">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="font-display font-extrabold italic text-base text-[#17181B]">
                  {s.title}
                </h3>
              </div>
              <p className="text-[#6B7280] text-sm leading-relaxed">{s.description}</p>
            </motion.div>
          ))}
        </div>
      </Section>
      )}

      {/* === Quality Section (хөдөлгүүр, явах анги) === */}
      {qualityHi.length > 0 && (
        <Section title="Чанар" eyebrow="05 · Чанар" bg="bg-white">
          <MediaHighlights items={qualityHi} />
        </Section>
      )}

      {/* === Color Configurator === */}
      {colorImages.length > 0 && (
        <Section
          title="Өнгөний сонголт"
          eyebrow={`${qualityHi.length ? "06" : "05"} · Өнгө`}
          bg="bg-[#F5F5F6]"
        >
          <div className="bg-white rounded-2xl p-6 lg:p-8 border border-[#E7E7EA]">
            <div className="grid lg:grid-cols-[1.5fr_1fr] gap-8 lg:gap-10 items-center">
              <div className="aspect-[16/10] rounded-xl overflow-hidden bg-white border border-[#E7E7EA]">
                <img
                  key={colorImages[colorIdx].image}
                  src={colorImages[colorIdx].image}
                  alt={`${model.name} — ${colorImages[colorIdx].name}`}
                  className="w-full h-full object-cover animate-[reveal-up_0.5s_ease]"
                  loading="lazy"
                />
              </div>
              <div>
                <p className="eyebrow eyebrow-electric mb-1.5">Өнгө сонгох</p>
                <p className="font-bold text-2xl text-[#17181B] mb-5">
                  {colorImages[colorIdx].name}
                </p>
                <div className="flex flex-wrap gap-3 mb-5">
                  {colorImages.map((c, i) => (
                    <button
                      key={c.name}
                      onClick={() => setColorIdx(i)}
                      title={c.name}
                      aria-label={c.name}
                      className={`w-11 h-11 rounded-full transition-all ${
                        colorIdx === i
                          ? "ring-2 ring-offset-2 ring-[#E20A17] scale-110"
                          : "ring-1 ring-[#D9DADE] hover:scale-105"
                      }`}
                      style={{ background: c.hex }}
                    />
                  ))}
                </div>
                <p className="text-xs text-[#8A8F98] leading-relaxed">
                  Өнгө сонгоход үнэ өөрчлөгдөхгүй. Showroom-д бодит өнгийг харах боломжтой.
                </p>
              </div>
            </div>
          </div>
        </Section>
      )}

      {/* === Specifications Section (kz-маягийн: зураг + үзүүлэлт + үнэ) === */}
      <Section
        title="Техникийн үзүүлэлт"
        eyebrow={`${qualityHi.length ? "07" : "06"} · Үзүүлэлт`}
        bg="bg-white"
      >
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div className="rounded-2xl overflow-hidden bg-white border border-[#E7E7EA]">
            <img
              src={heroImg}
              alt={model.name}
              className="w-full aspect-[16/10] object-cover"
              loading="lazy"
            />
          </div>
          <div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-7 mb-8">
              <SpecItem label="Хөдөлгүүрийн хэмжээ" value={model.specs.engine} />
              <SpecItem label="Хамгийн их чадал" value={model.specs.power} />
              <SpecItem label="Биеийн урт" value={model.specs.length} />
              <SpecItem label="Газрын тусгаар" value={model.specs.groundClearance} />
              <SpecItem label="Хурдны хайрцаг" value={model.specs.transmission} />
              <SpecItem label="Тэнхлэг хоорондын зай" value={model.specs.wheelbase} />
            </div>
            <div className="flex flex-wrap items-end gap-6 pt-6 border-t border-[#E7E7EA]">
              <div>
                <p className="text-[0.6rem] tracking-[0.18em] uppercase text-[#8A8F98] mb-1">Үнэ</p>
                <p className="font-bold text-2xl lg:text-3xl text-[#17181B]">
                  {model.startingPrice ?? model.price ?? model.priceNote ?? "Тун удахгүй"}
                </p>
              </div>
              <a href="#request-info" className="btn-electric-jetour px-6 py-3.5 rounded-full text-sm">
                Тест драйв захиалах
              </a>
            </div>
          </div>
        </div>
      </Section>

      {/* === Test Drive CTA band (kz-маягийн авсаархан) === */}
      <section className="py-14 lg:py-16 bg-[#17181B]">
        <div className="mx-auto w-[min(1280px,94vw)] flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <h2 className="font-extrabold tracking-tight text-white text-2xl lg:text-4xl mb-3">
              Тест драйвт бүртгүүлэх
            </h2>
            <p className="text-white/70 text-sm lg:text-base leading-relaxed">
              JETOUR-ийн дэвшилтэт технологи, загварлаг хийц, гайхалтай жолоодлогын мэдрэмжийг
              биечлэн туршиж үзээрэй. Өнөөдөр тест драйвт бүртгүүлж, өөрт тохирох автомашинаа сонгоорой.
            </p>
          </div>
          <a
            href="#request-info"
            className="btn-electric-jetour shrink-0 px-8 py-4 rounded-full text-sm text-center"
          >
            Тест драйв захиалах
          </a>
        </div>
      </section>

      {/* === Request Information Form === */}
      <section id="request-info" className="py-24 lg:py-28 bg-[#F5F5F6] border-t border-[#E7E7EA]">
        <div className="mx-auto w-[min(1280px,94vw)]">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <p className="eyebrow eyebrow-electric mb-3">
                {qualityHi.length ? "08" : "07"} · Мэдээлэл авах
              </p>
              <h2 className="font-display font-extrabold italic leading-[0.95] text-[#17181B] text-4xl lg:text-6xl mb-5">
                {model.name} —{" "}
                <span className="text-gradient-premium">мэдээлэл авах</span>
              </h2>
              <p className="text-[#6B7280] text-base lg:text-lg leading-relaxed mb-7 max-w-md">
                Манай борлуулалтын баг танд нарийвчилсан мэдээлэл, үнийн санал өгнө. Хүсэлт
                үлдээгээрэй.
              </p>
              <a
                href={CONTACT.phone1Href}
                className="btn-outline-jetour inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm"
              >
                <Phone className="w-4 h-4" />
                {CONTACT.phone1}
              </a>
            </motion.div>

            <EnhancedLeadForm
              type="test-drive"
              variant="white"
              title="Санал хүсэлт"
              subtitle={`${model.name} — мэдээлэл авах, тест драйв`}
              modelName={model.name}
              showModelField
              showDateField
              showTimeField={false}
              showEmailField={false}
              showMessageField
              submitLabel="Илгээх"
            />
          </div>
        </div>
      </section>

      {/* === Related Models === */}
      <Section title="Төстэй загварууд" eyebrow="09 · Бусад загвар" bg="bg-white">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {ALL_MODELS_FOR_GRID.filter((m) => m.id !== model.id)
            .slice(0, 3)
            .map((m) => (
              <Link
                key={m.id}
                href={`/models/${m.id}`}
                className="group block bg-white rounded-2xl overflow-hidden border border-[#E7E7EA] card-lift"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-[#F5F5F6]">
                  <img
                    src={m.heroImage}
                    alt={m.name}
                    className="w-full h-full object-cover transition-transform duration-[1.2s] group-hover:scale-110"
                    loading="lazy"
                  />
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background:
                        "linear-gradient(180deg, transparent 50%, rgba(0,0,0,0.5) 100%)",
                    }}
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-display font-extrabold italic text-xl text-[#17181B] mb-2">
                    {m.name}
                  </h3>
                  <p className="text-sm text-[#6B7280] mb-4">{m.shortDesc}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-display font-bold text-[#17181B]">
                      {m.startingPrice ?? m.priceNote}
                    </span>
                    <span className="flex items-center gap-1.5 text-[#E20A17] font-display font-bold text-sm group-hover:gap-2.5 transition-all">
                      Цааш
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
        </div>
      </Section>

      {/* Footer */}
      <Footer />
    </div>
  );
}

function Section({
  title,
  eyebrow,
  bg,
  dark = false,
  children,
}: {
  title: string;
  eyebrow: string;
  bg: string;
  dark?: boolean;
  children: React.ReactNode;
}) {
  return (
    <section className={`py-32 lg:py-40 ${bg} overflow-hidden`}>
      <div className="mx-auto w-[min(1280px,94vw)]">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-12"
        >
          <p
            className={`eyebrow mb-3 ${dark ? "text-[#E20A17]" : "eyebrow-electric"}`}
          >
            {eyebrow}
          </p>
          <h2
            className={`font-display font-extrabold italic leading-[0.95] text-4xl lg:text-6xl ${
              dark ? "text-white" : "text-[#17181B]"
            }`}
          >
            {title}
          </h2>
        </motion.div>
        {children}
      </div>
    </section>
  );
}

function MediaHighlights({ items }: { items: { image: string; title: string; caption: string }[] }) {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7">
      {items.map((it, i) => (
        <motion.div
          key={it.title}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
        >
          <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-[#F5F5F6] border border-[#E7E7EA] mb-4">
            <img src={it.image} alt={it.title} className="w-full h-full object-cover" loading="lazy" />
          </div>
          <h3 className="font-bold text-lg text-[#17181B] mb-1.5">{it.title}</h3>
          <p className="text-[#54585F] text-sm leading-relaxed">{it.caption}</p>
        </motion.div>
      ))}
    </div>
  );
}

function SpecItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[#8A8F98] text-[0.8rem] leading-snug mb-1.5">{label}:</p>
      <p className="font-bold text-lg text-[#17181B]">{value}</p>
    </div>
  );
}

function SpecCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="bg-white rounded-xl p-5 border border-[#E7E7EA]">
      <div className="flex items-center gap-2 mb-2 text-[#E20A17]">
        {icon}
        <p className="text-[0.55rem] tracking-[0.18em] uppercase text-[#6B7280] font-display">
          {label}
        </p>
      </div>
      <p className="font-display font-extrabold italic text-base text-[#17181B]">{value}</p>
    </div>
  );
}

function InfoRequestForm({ modelName }: { modelName: string }) {
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "" });

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone) {
      toast({
        variant: "destructive",
        title: "Мэдээлэл дутуу байна",
        description: "Нэр болон утас оруулна уу.",
      });
      return;
    }
    try {
      await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "info-request", name: form.name, phone: form.phone, model: modelName }),
      });
    } catch {
      /* lead console log-д хадгалагдана */
    }
    setSubmitted(true);
    toast({
      title: "Хүсэлт амжилттай!",
      description: `${form.name}, манай баг удахгүй холбогдоно.`,
    });
  };

  if (submitted) {
    return (
      <div className="bg-white rounded-2xl p-8 shadow-2xl border border-[#E7E7EA] text-center">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-[#17181B] to-[#E20A17] grid place-items-center">
          <CheckCircle2 className="w-8 h-8 text-white" />
        </div>
        <h3 className="font-display font-extrabold italic text-xl text-[#17181B] mb-2">
          Баярлалаа!
        </h3>
        <p className="text-[#6B7280] text-sm mb-5">
          {modelName}-ын мэдээлэл танд илгээх болно. Манай борлуулалтын баг удахгүй холбогдоно.
        </p>
        <button
          onClick={() => {
            setForm({ name: "", phone: "" });
            setSubmitted(false);
          }}
          className="btn-outline-jetour px-5 py-2.5 rounded-full text-sm"
        >
          Шинээр хүсэлт
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="bg-white rounded-2xl p-8 shadow-2xl border border-[#E7E7EA] space-y-4">
      <div className="flex items-center gap-2 mb-2">
        <div className="w-1.5 h-6 bg-[#E20A17] rounded-full" />
        <h3 className="font-display font-extrabold italic text-xl text-[#17181B]">
          Мэдээлэл авах
        </h3>
      </div>
      <Field label="Нэр *">
        <User className="w-3.5 h-3.5 text-[#6B7280]" />
        <input
          type="text"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          placeholder="Нэрээ оруулна уу"
          className="w-full bg-transparent text-[#17181B] placeholder:text-[#9CA3AF] text-sm focus:outline-none"
        />
      </Field>
      <Field label="Утас *">
        <Phone className="w-3.5 h-3.5 text-[#6B7280]" />
        <input
          type="tel"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          placeholder="8 оронтой"
          maxLength={8}
          className="w-full bg-transparent text-[#17181B] placeholder:text-[#9CA3AF] text-sm focus:outline-none"
        />
      </Field>
      <button
        type="submit"
        className="btn-electric-jetour w-full flex items-center justify-center gap-2 py-4 rounded-xl text-base"
      >
        <Send className="w-4 h-4" />
        Мэдээлэл авах
      </button>
      <p className="text-[0.65rem] text-[#6B7280] text-center leading-relaxed">
        Загвар: <span className="font-bold text-[#17181B]">{modelName}</span>
      </p>
    </form>
  );
}

function TestDriveForm({ modelName }: { modelName: string }) {
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", date: "" });

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.date) {
      toast({
        variant: "destructive",
        title: "Мэдээлэл дутуу байна",
        description: "Нэр, утас, огноо оруулна уу.",
      });
      return;
    }
    try {
      await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "test-drive", name: form.name, phone: form.phone, date: form.date, model: modelName }),
      });
    } catch {
      /* lead console log-д хадгалагдана */
    }
    setSubmitted(true);
    toast({
      title: "Тест драйв бүртгэгдлээ!",
      description: `${form.name}, манай баг холбогдоно.`,
    });
  };

  if (submitted) {
    return (
      <div className="bg-white rounded-2xl p-8 shadow-2xl text-center">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-[#17181B] to-[#E20A17] grid place-items-center">
          <CheckCircle2 className="w-8 h-8 text-white" />
        </div>
        <h3 className="font-display font-extrabold italic text-xl text-[#17181B] mb-2">
          Бүртгэл амжилттай!
        </h3>
        <p className="text-[#6B7280] text-sm mb-5">
          {modelName} тест драйв {form.date}-нд бүртгэгдлээ. Манай баг баталгаажуулж холбогдоно.
        </p>
        <button
          onClick={() => {
            setForm({ name: "", phone: "", date: "" });
            setSubmitted(false);
          }}
          className="btn-outline-jetour px-5 py-2.5 rounded-full text-sm"
        >
          Шинээр бүртгэх
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="bg-white rounded-2xl p-8 shadow-2xl space-y-4">
      <div className="flex items-center gap-2 mb-2">
        <div className="w-1.5 h-6 bg-[#E20A17] rounded-full" />
        <h3 className="font-display font-extrabold italic text-xl text-[#17181B]">
          Тест драйв бүртгэх
        </h3>
      </div>
      <Field label="Нэр *">
        <User className="w-3.5 h-3.5 text-[#6B7280]" />
        <input
          type="text"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          placeholder="Нэрээ оруулна уу"
          className="w-full bg-transparent text-[#17181B] placeholder:text-[#9CA3AF] text-sm focus:outline-none"
        />
      </Field>
      <Field label="Утас *">
        <Phone className="w-3.5 h-3.5 text-[#6B7280]" />
        <input
          type="tel"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          placeholder="8 оронтой"
          maxLength={8}
          className="w-full bg-transparent text-[#17181B] placeholder:text-[#9CA3AF] text-sm focus:outline-none"
        />
      </Field>
      <Field label="Огноо *">
        <Calendar className="w-3.5 h-3.5 text-[#6B7280]" />
        <input
          type="date"
          value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
          min={new Date().toISOString().slice(0, 10)}
          className="w-full bg-transparent text-[#17181B] text-sm focus:outline-none"
        />
      </Field>
      <button
        type="submit"
        className="btn-electric-jetour w-full flex items-center justify-center gap-2 py-4 rounded-xl text-base"
      >
        <Calendar className="w-4 h-4" />
        Тест драйв захиалах
      </button>
      <p className="text-[0.65rem] text-[#6B7280] text-center leading-relaxed">
        Загвар: <span className="font-bold text-[#17181B]">{modelName}</span>
      </p>
    </form>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block text-[0.65rem] tracking-[0.18em] uppercase text-[#6B7280] font-display mb-1.5">
        {label}
      </span>
      <div className="flex items-center gap-2.5 bg-[#F5F5F6] border border-[#E7E7EA] rounded-xl px-4 py-3 focus-within:border-[#E20A17] focus-within:ring-2 focus-within:ring-[#E20A17]/15 transition-all">
        {children}
      </div>
    </label>
  );
}

// Footer import to reuse
import { Footer } from "@/components/jetour/contact";
