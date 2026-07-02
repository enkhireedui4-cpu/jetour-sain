"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Phone,
  Gauge,
  Zap,
  ShieldCheck,
  Camera,
  Music,
  Smartphone,
  Monitor,
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
  MODEL_EXTERIOR_IMAGES,
  MODEL_SHOWCASE,
  type ShowcaseSlide,
  CONTACT,
  TECHNOLOGY_FEATURES,
} from "@/lib/jetour-data";
import { Gallery } from "@/components/jetour/gallery";
import { EnhancedLeadForm } from "@/components/jetour/enhanced-lead-form";
import { Navbar } from "@/components/jetour/navbar";
import { Footer } from "@/components/jetour/contact";

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

export default function ModelDetailClient({ id }: { id: string }) {
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
  // Бодит өнгөний зураг (Color Configurator)
  const colorImages = MODEL_COLOR_IMAGES[model.id] ?? [];
  const galleryImgs = MODEL_GALLERY_IMAGES[model.id] ?? [];
  const [colorIdx, setColorIdx] = useState(0);
  const showcase = MODEL_SHOWCASE[model.id];
  const heroImg = showcase?.hero ?? colorImages[0]?.image ?? galleryImgs[0] ?? model.heroImage;
  const exteriorImgs =
    MODEL_EXTERIOR_IMAGES[model.id] ??
    (colorImages.length
      ? colorImages.map((c) => c.image)
      : galleryImgs.length
      ? galleryImgs
      : model.exteriorImages);
  const techHi = MODEL_TECH_HIGHLIGHTS[model.id] ?? [];
  const interiorHi = MODEL_INTERIOR_HIGHLIGHTS[model.id] ?? [];
  const qualityHi = MODEL_QUALITY_HIGHLIGHTS[model.id] ?? [];
  const safetyHi = MODEL_SAFETY_HIGHLIGHTS[model.id] ?? [];

  return (
    <div className="min-h-screen bg-white text-[#17181B]">
      {/* === Энгийн үндсэн цэс (kz маяг — хуудас солигдоход цэс өөрчлөгдөхгүй) === */}
      <Navbar />
      <div className="h-16" />

      {/* === Vehicle Hero — дэлгэц дүүрэн зураг, жижиг цэвэр текст (kz маяг) === */}
      <section className="relative h-[calc(100vh-4rem)] min-h-[520px] overflow-hidden bg-[#17181B]">
        <img
          src={heroImg}
          alt={model.name}
          className="absolute inset-0 w-full h-full object-cover"
          loading="eager"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent pointer-events-none" />

        <div className="relative z-10 h-full flex items-end pb-14 px-6">
          <div style={{ width: "min(1280px, 94vw)", margin: "0 auto" }}>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1
                className="font-extrabold tracking-tight text-white mb-3"
                style={{
                  fontSize: "clamp(2rem, 4.5vw, 3.5rem)",
                  lineHeight: 1.05,
                  textShadow: "0 4px 24px rgba(0,0,0,0.5)",
                }}
              >
                {model.name}
              </h1>
              <p
                className="text-base lg:text-lg text-white/90 mb-7 max-w-xl"
                style={{ textShadow: "0 2px 12px rgba(0,0,0,0.5)" }}
              >
                {model.tagline}
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <a
                  href="#request-info"
                  className="bg-white text-[#17181B] px-7 py-3.5 rounded-lg text-sm font-bold hover:bg-[#E20A17] hover:text-white transition-colors"
                >
                  Хүсэлт илгээх
                </a>
                <a
                  href="#specs"
                  className="bg-white/15 backdrop-blur-sm border border-white/40 text-white px-7 py-3.5 rounded-lg text-sm font-bold hover:bg-white/25 transition-colors"
                >
                  Үнийн жагсаалт
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* === Гадна үзэмж — дэлгэц дүүрэн гүйдэг слайдер (global маяг) === */}
      <section className="bg-white py-16 lg:py-24 overflow-hidden">
        <div className="mx-auto w-[min(1280px,94vw)] mb-10">
          <p className="eyebrow eyebrow-electric mb-3">Экстерьер</p>
          <h2 className="font-extrabold tracking-tight text-[#17181B] text-3xl lg:text-5xl mb-5">
            Гадна үзэмж
          </h2>
          <p className="text-[#6B7280] text-base lg:text-lg leading-relaxed max-w-3xl">
            {model.description}
          </p>
        </div>
        {showcase?.exterior?.length ? (
          <ShowcaseSlider key={`ext-${model.id}`} slides={showcase.exterior} alt={model.name} />
        ) : (
          <div className="mx-auto w-[min(1280px,94vw)]">
            <Gallery
              key={`ext-${model.id}`}
              images={exteriorImgs}
              alt={model.name}
              accent={model.accent}
            />
          </div>
        )}
      </section>

      {/* === Дотор салон — том гүйдэг слайдер === */}
      <section className="bg-[#F5F5F6] py-16 lg:py-24 overflow-hidden">
        <div className="mx-auto w-[min(1280px,94vw)] mb-10">
          <p className="eyebrow eyebrow-electric mb-3">Интерьер</p>
          <h2 className="font-extrabold tracking-tight text-[#17181B] text-3xl lg:text-5xl">
            Дотор салон
          </h2>
        </div>
        {showcase?.interior?.length ? (
          <ShowcaseSlider key={`int-${model.id}`} slides={showcase.interior} alt={model.name} />
        ) : interiorHi.length > 0 ? (
          <div className="mx-auto w-[min(1280px,94vw)]">
            <MediaHighlights items={interiorHi} />
          </div>
        ) : (
          <div className="mx-auto w-[min(1280px,94vw)] grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
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
      </section>

      {/* === Technology Section === */}
      {techHi.length > 0 ? (
        <Section title="Технологи" eyebrow="Технологи" bg="bg-white">
          <MediaHighlights items={techHi} />
        </Section>
      ) : (
      <Section title="Технологи" eyebrow="Технологи" bg="bg-[#17181B]" dark>
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
        <Section title="Аюулгүй байдал" eyebrow="Хамгаалалт" bg="bg-white">
          <MediaHighlights items={safetyHi} />
        </Section>
      ) : (
      <Section title="Аюулгүй байдал" eyebrow="Хамгаалалт" bg="bg-white">
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
        <Section title="Чанар" eyebrow="Чанар" bg="bg-white">
          <MediaHighlights items={qualityHi} />
        </Section>
      )}

      {/* === Color Configurator === */}
      {colorImages.length > 0 && (
        <Section
          title="Өнгөний сонголт"
          eyebrow="Өнгө"
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
      <Section id="specs" title="Техникийн үзүүлэлт" eyebrow="Үзүүлэлт" bg="bg-white">
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
                Мэдээлэл авах
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
      <Section title="Төстэй загварууд" eyebrow="Бусад загвар" bg="bg-white">
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
  id,
  children,
}: {
  title: string;
  eyebrow: string;
  bg: string;
  dark?: boolean;
  id?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className={`py-32 lg:py-40 ${bg} overflow-hidden scroll-mt-16`}>
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

/**
 * Дэлгэц дүүрэн, гүйж (translateX) солигддог том слайдер — global сайтын маяг.
 * Сум дарахад дараагийн зураг урсаж орж ирнэ; 5 сек тутам автоматаар солигдоно.
 */
function ShowcaseSlider({ slides, alt }: { slides: ShowcaseSlide[]; alt: string }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(
    () => setActive((p) => (p + 1) % slides.length),
    [slides.length]
  );
  const prev = () => setActive((p) => (p - 1 + slides.length) % slides.length);

  useEffect(() => {
    if (paused || slides.length <= 1) return;
    const t = setInterval(next, 5000);
    return () => clearInterval(t);
  }, [next, paused, slides.length, active]);

  return (
    <div
      className="relative w-full overflow-hidden bg-[#0E0E10]"
      style={{ height: "clamp(340px, 72vh, 820px)" }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Гүйдэг зам */}
      <div
        className="flex h-full transition-transform duration-700 ease-out"
        style={{ transform: `translateX(-${active * 100}%)` }}
      >
        {slides.map((s, i) => (
          <div key={i} className="relative min-w-full h-full">
            <img
              src={s.image}
              alt={`${alt} — ${s.caption}`}
              className="w-full h-full object-cover"
              loading={i === 0 ? "eager" : "lazy"}
            />
            <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-black/70 to-transparent pointer-events-none" />
            <p
              className="absolute left-6 lg:left-10 bottom-8 lg:bottom-10 text-white font-bold text-lg lg:text-2xl max-w-xl pr-6"
              style={{ textShadow: "0 2px 14px rgba(0,0,0,0.6)" }}
            >
              {s.caption}
            </p>
          </div>
        ))}
      </div>

      {slides.length > 1 && (
        <>
          {/* Сумнууд — баруун доод */}
          <div className="absolute bottom-8 lg:bottom-10 right-6 lg:right-10 z-10 flex gap-2">
            <button
              onClick={prev}
              aria-label="Өмнөх зураг"
              className="w-11 h-11 grid place-items-center rounded-lg bg-white/15 backdrop-blur-sm border border-white/40 text-white hover:bg-white hover:text-[#17181B] transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={next}
              aria-label="Дараагийн зураг"
              className="w-11 h-11 grid place-items-center rounded-lg bg-white/15 backdrop-blur-sm border border-white/40 text-white hover:bg-white hover:text-[#17181B] transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Тоолуур + цэгүүд */}
          <div className="absolute top-6 right-6 lg:right-10 z-10 text-xs font-bold text-white bg-black/40 backdrop-blur-sm rounded-full px-3 py-1.5">
            {String(active + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
          </div>
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 flex gap-1.5">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                aria-label={`${i + 1}-р зураг`}
                className={`h-1 rounded-full transition-all ${
                  i === active ? "w-7 bg-[#E20A17]" : "w-3.5 bg-white/40 hover:bg-white/70"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
