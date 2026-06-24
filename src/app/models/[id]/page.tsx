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
  ALL_MODELS_FOR_GRID,
  VEHICLE_COLORS,
  CONTACT,
  TECHNOLOGY_FEATURES,
} from "@/lib/jetour-data";
import { Gallery, ColorSelector } from "@/components/jetour/gallery";
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
  const model = ALL_MODELS_FOR_GRID.find((m) => m.id === id);

  if (!model) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white text-[#0A1F44]">
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
  const accentColor = model.accent === "red" ? "#E2231A" : "#00AEEF";
  const accentSoft = model.accent === "red" ? "#FF4A42" : "#4DD0F5";

  return (
    <div className="min-h-screen bg-white text-[#0A1F44]">
      {/* === Top back navigation === */}
      <div className="bg-[#0A1F44] text-white py-4 sticky top-0 z-30">
        <div className="mx-auto w-[min(1280px,94vw)] flex items-center justify-between">
          <Link
            href="/#models"
            className="flex items-center gap-2 text-white/80 hover:text-white transition-colors text-sm font-display font-bold tracking-wider"
          >
            <ArrowLeft className="w-4 h-4" />
            БҮХ ЗАГВАР
          </Link>
          <div className="flex items-center gap-3">
            <a
              href={CONTACT.phone1Href}
              className="hidden sm:flex items-center gap-2 text-white/80 hover:text-[#4DD0F5] transition-colors text-xs font-display font-bold"
            >
              <Phone className="w-3.5 h-3.5" />
              {CONTACT.phone1}
            </a>
            <Link
              href="/#test-drive"
              className="btn-electric-jetour px-4 py-2 rounded-full text-xs tracking-widest"
            >
              BOOK TEST DRIVE
            </Link>
          </div>
        </div>
      </div>

      {/* === Vehicle Hero Banner === */}
      <section className="relative h-[80vh] min-h-[560px] overflow-hidden bg-[#0A1F44]">
        <div className="absolute inset-0">
          <img
            src={model.heroImage}
            alt={model.name}
            className="w-full h-full object-cover"
            loading="eager"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(10,31,68,0.7) 0%, rgba(10,31,68,0.3) 35%, rgba(10,31,68,0.5) 75%, rgba(10,31,68,0.95) 100%)",
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
                {model.series} Series
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
                  Request Quote
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href="#test-drive-form"
                  className="btn-outline-light px-6 py-3.5 rounded-xl text-sm"
                >
                  Book Test Drive
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* === Exterior Gallery === */}
      <Section title="Exterior Gallery" eyebrow="01 · Экстерьер" bg="bg-white">
        <p className="text-[#6B7280] text-base lg:text-lg leading-relaxed mb-10 max-w-3xl">
          {model.description}
        </p>
        <Gallery key={`ext-${model.id}`} images={model.exteriorImages} alt={model.name} accent={model.accent} />
      </Section>

      {/* === Interior Gallery === */}
      <Section title="Interior Gallery" eyebrow="02 · Интерьер" bg="bg-[#F7F9FC]">
        <p className="text-[#6B7280] text-base lg:text-lg leading-relaxed mb-10 max-w-3xl">
          {model.longDescription}
        </p>
        <Gallery key={`int-${model.id}`} images={model.interiorImages} alt={model.name} accent={model.accent} />
      </Section>

      {/* === Technology Section === */}
      <Section title="Technology" eyebrow="03 · Технологи" bg="bg-[#0A1F44]" dark>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {TECHNOLOGY_FEATURES.map((t, i) => (
            <motion.div
              key={t.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: (i % 3) * 0.1 }}
              whileHover={{ y: -8 }}
              className="group relative overflow-hidden bg-white/[0.04] border border-white/10 rounded-2xl p-7 hover:border-[#00AEEF]/50 transition-colors"
            >
              <div className="w-14 h-14 grid place-items-center rounded-2xl mb-5 border border-[#00AEEF]/30 bg-gradient-to-br from-[#00AEEF]/20 to-[#00AEEF]/5 text-[#4DD0F5]">
                {TECH_ICON_MAP[t.icon]}
              </div>
              <h3 className="font-display font-extrabold italic text-lg text-white mb-3">{t.title}</h3>
              <p className="text-white/70 text-sm leading-relaxed">{t.description}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* === Safety Section === */}
      <Section title="Safety Features" eyebrow="04 · Аюулгүй байдал" bg="bg-white">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SAFETY_FEATURES.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: (i % 3) * 0.1 }}
              className="bg-white rounded-2xl p-6 border border-[#E2E7EF] card-lift"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 grid place-items-center rounded-xl bg-gradient-to-br from-[#0A1F44] to-[#142A5C] text-[#4DD0F5]">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="font-display font-extrabold italic text-base text-[#0A1F44]">
                  {s.title}
                </h3>
              </div>
              <p className="text-[#6B7280] text-sm leading-relaxed">{s.description}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* === Specifications Section === */}
      <Section title="Specifications" eyebrow="05 · Техник үзүүлэлт" bg="bg-[#F7F9FC]">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <SpecCard icon={<Gauge className="w-4 h-4" />} label="Хөдөлгүүр" value={model.specs.engine} />
          <SpecCard icon={<Zap className="w-4 h-4" />} label="Морины хүч" value={model.specs.power} />
          <SpecCard icon={<CircleDot className="w-4 h-4" />} label="Мушгих хүч" value={model.specs.torque} />
          <SpecCard icon={<Cog className="w-4 h-4" />} label="Хурдны хайрцаг" value={model.specs.transmission} />
          <SpecCard icon={<Wind className="w-4 h-4" />} label="Хөтлөгч" value={model.specs.drivetrain} />
          <SpecCard icon={<Users className="w-4 h-4" />} label="Суудал" value={model.specs.seats} />
          <SpecCard icon={<Ruler className="w-4 h-4" />} label="Биеийн урт" value={model.specs.length} />
          <SpecCard icon={<Navigation className="w-4 h-4" />} label="Тэнхлэгийн зай" value={model.specs.wheelbase} />
          <SpecCard icon={<Fuel className="w-4 h-4" />} label="Газрын тусгаар" value={model.specs.groundClearance} />
        </div>
      </Section>

      {/* === Color Selector === */}
      <Section title="Color Options" eyebrow="06 · Өнгийн сонголт" bg="bg-white">
        <div className="bg-[#F7F9FC] rounded-2xl p-8 border border-[#E2E7EF]">
          <div className="grid lg:grid-cols-[1.5fr_1fr] gap-10 items-center">
            <div
              className="aspect-[16/10] rounded-xl overflow-hidden grid place-items-center"
              style={{
                background: "linear-gradient(135deg, #F7F9FC 0%, #E2E7EF 100%)",
              }}
            >
              <img
                src={model.heroImage}
                alt={model.name}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div>
              <p className="eyebrow eyebrow-electric mb-3">Сонгосон өнгө</p>
              <ColorSelector colors={VEHICLE_COLORS} />
              <p className="text-xs text-[#6B7280] mt-5 leading-relaxed">
                Өнгө сонгоход үнэ өөрчлөгдөхгүй. Showroom-д бодит өнгийг харах боломжтой.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* === Request Information Form === */}
      <section id="request-info" className="py-32 lg:py-40 bg-[#F7F9FC] border-t border-[#E2E7EF]">
        <div className="mx-auto w-[min(1280px,94vw)]">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <p className="eyebrow eyebrow-electric mb-3">07 · Мэдээлэл авах</p>
              <h2 className="font-display font-extrabold italic leading-[0.95] text-[#0A1F44] text-4xl lg:text-6xl mb-5">
                {model.name} —{" "}
                <span className="text-gradient-premium">мэдээлэл авах</span>
              </h2>
              <p className="text-[#6B7280] text-base lg:text-lg leading-relaxed mb-7 max-w-md">
                Манай борлуулалтын баг танд нарийвчилсан мэдээлэл, үнийн санал өгнө. Бичлэг
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

            <InfoRequestForm modelName={model.name} />
          </div>
        </div>
      </section>

      {/* === Test Drive Form === */}
      <section id="test-drive-form" className="py-32 lg:py-40 bg-[#0A1F44]">
        <div className="mx-auto w-[min(1280px,94vw)]">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <p className="eyebrow text-[#4DD0F5] mb-3">08 · Тест драйв</p>
              <h2 className="font-display font-extrabold italic leading-[0.95] text-white text-4xl lg:text-6xl mb-5">
                Өөрийн биеэр <span className="text-gradient-electric">мэдрээрэй</span>
              </h2>
              <p className="text-white/80 text-base lg:text-lg leading-relaxed mb-7 max-w-md">
                {model.name}-ыг өөрийн биеэр жолоодон, өөрт тохирох эсэхийг мэдрээрэй. Үнэгүй,
                дараалалгүй.
              </p>
              <div className="space-y-3">
                {[
                  "30-60 минутад туршиж үзнэ",
                  "Мэргэжлийн зөвлөгөө үнэгүй",
                  "Showroom: Чингэлтэй, Holiday Inn",
                ].map((p) => (
                  <div key={p} className="flex items-center gap-2.5 text-sm text-white">
                    <CheckCircle2 className="w-4 h-4 text-[#4DD0F5]" />
                    {p}
                  </div>
                ))}
              </div>
            </motion.div>

            <TestDriveForm modelName={model.name} />
          </div>
        </div>
      </section>

      {/* === Related Models === */}
      <Section title="Related Models" eyebrow="09 · Бусад загварууд" bg="bg-white">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {ALL_MODELS_FOR_GRID.filter((m) => m.id !== model.id)
            .slice(0, 3)
            .map((m) => (
              <Link
                key={m.id}
                href={`/models/${m.id}`}
                className="group block bg-white rounded-2xl overflow-hidden border border-[#E2E7EF] card-lift"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-[#F7F9FC]">
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
                        "linear-gradient(180deg, transparent 50%, rgba(10,31,68,0.5) 100%)",
                    }}
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-display font-extrabold italic text-xl text-[#0A1F44] mb-2">
                    {m.name}
                  </h3>
                  <p className="text-sm text-[#6B7280] mb-4">{m.shortDesc}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-display font-bold text-[#0A1F44]">
                      {m.startingPrice ?? m.priceNote}
                    </span>
                    <span className="flex items-center gap-1.5 text-[#00AEEF] font-display font-bold text-sm group-hover:gap-2.5 transition-all">
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
      <StickyContactBarWrapper />
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
            className={`eyebrow mb-3 ${dark ? "text-[#4DD0F5]" : "eyebrow-electric"}`}
          >
            {eyebrow}
          </p>
          <h2
            className={`font-display font-extrabold italic leading-[0.95] text-4xl lg:text-6xl ${
              dark ? "text-white" : "text-[#0A1F44]"
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

function SpecCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="bg-white rounded-xl p-5 border border-[#E2E7EF]">
      <div className="flex items-center gap-2 mb-2 text-[#00AEEF]">
        {icon}
        <p className="text-[0.55rem] tracking-[0.18em] uppercase text-[#6B7280] font-display">
          {label}
        </p>
      </div>
      <p className="font-display font-extrabold italic text-base text-[#0A1F44]">{value}</p>
    </div>
  );
}

function InfoRequestForm({ modelName }: { modelName: string }) {
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "" });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone) {
      toast({
        variant: "destructive",
        title: "Мэдээлэл дутуу байна",
        description: "Нэр болон утас оруулна уу.",
      });
      return;
    }
    setSubmitted(true);
    toast({
      title: "Хүсэлт амжилттай!",
      description: `${form.name}, манай баг удахгүй холбогдоно.`,
    });
  };

  if (submitted) {
    return (
      <div className="bg-white rounded-2xl p-8 shadow-2xl border border-[#E2E7EF] text-center">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-[#0A1F44] to-[#00AEEF] grid place-items-center">
          <CheckCircle2 className="w-8 h-8 text-white" />
        </div>
        <h3 className="font-display font-extrabold italic text-xl text-[#0A1F44] mb-2">
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
    <form onSubmit={onSubmit} className="bg-white rounded-2xl p-8 shadow-2xl border border-[#E2E7EF] space-y-4">
      <div className="flex items-center gap-2 mb-2">
        <div className="w-1.5 h-6 bg-[#00AEEF] rounded-full" />
        <h3 className="font-display font-extrabold italic text-xl text-[#0A1F44]">
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
          className="w-full bg-transparent text-[#0A1F44] placeholder:text-[#9CA3AF] text-sm focus:outline-none"
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
          className="w-full bg-transparent text-[#0A1F44] placeholder:text-[#9CA3AF] text-sm focus:outline-none"
        />
      </Field>
      <button
        type="submit"
        className="btn-electric-jetour w-full flex items-center justify-center gap-2 py-4 rounded-xl text-base"
      >
        <Send className="w-4 h-4" />
        Request Information
      </button>
      <p className="text-[0.65rem] text-[#6B7280] text-center leading-relaxed">
        Загвар: <span className="font-bold text-[#0A1F44]">{modelName}</span>
      </p>
    </form>
  );
}

function TestDriveForm({ modelName }: { modelName: string }) {
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", date: "" });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.date) {
      toast({
        variant: "destructive",
        title: "Мэдээлэл дутуу байна",
        description: "Нэр, утас, огноо оруулна уу.",
      });
      return;
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
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-[#0A1F44] to-[#00AEEF] grid place-items-center">
          <CheckCircle2 className="w-8 h-8 text-white" />
        </div>
        <h3 className="font-display font-extrabold italic text-xl text-[#0A1F44] mb-2">
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
        <div className="w-1.5 h-6 bg-[#00AEEF] rounded-full" />
        <h3 className="font-display font-extrabold italic text-xl text-[#0A1F44]">
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
          className="w-full bg-transparent text-[#0A1F44] placeholder:text-[#9CA3AF] text-sm focus:outline-none"
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
          className="w-full bg-transparent text-[#0A1F44] placeholder:text-[#9CA3AF] text-sm focus:outline-none"
        />
      </Field>
      <Field label="Огноо *">
        <Calendar className="w-3.5 h-3.5 text-[#6B7280]" />
        <input
          type="date"
          value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
          min={new Date().toISOString().slice(0, 10)}
          className="w-full bg-transparent text-[#0A1F44] text-sm focus:outline-none"
        />
      </Field>
      <button
        type="submit"
        className="btn-electric-jetour w-full flex items-center justify-center gap-2 py-4 rounded-xl text-base"
      >
        <Calendar className="w-4 h-4" />
        Book Test Drive
      </button>
      <p className="text-[0.65rem] text-[#6B7280] text-center leading-relaxed">
        Загвар: <span className="font-bold text-[#0A1F44]">{modelName}</span>
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
      <div className="flex items-center gap-2.5 bg-[#F7F9FC] border border-[#E2E7EF] rounded-xl px-4 py-3 focus-within:border-[#00AEEF] focus-within:ring-2 focus-within:ring-[#00AEEF]/15 transition-all">
        {children}
      </div>
    </label>
  );
}

// Footer + Sticky contact imports to reuse
import { Footer } from "@/components/jetour/contact";
import { StickyContactBar } from "@/components/jetour/sticky-contact";
function StickyContactBarWrapper() {
  return <StickyContactBar />;
}
