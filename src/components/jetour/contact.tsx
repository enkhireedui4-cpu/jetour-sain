"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Phone,
  MapPin,
  Clock,
  Mail,
  Building2,
  Send,
  CheckCircle2,
  Facebook,
  Instagram,
  ExternalLink,
} from "lucide-react";
import { CONTACT, MODELS } from "@/lib/jetour-data";
import { useToast } from "@/hooks/use-toast";
import { SainMotorsMark } from "./logo";

export function Contact() {
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    interest: "info",
    model: "",
    message: "",
  });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone) {
      toast({
        variant: "destructive",
        title: "Мэдээлэл дутуу байна",
        description: "Нэр болон утасны дугаараа оруулна уу.",
      });
      return;
    }
    const digits = form.phone.replace(/\D/g, "");
    if (digits.length !== 8) {
      toast({
        variant: "destructive",
        title: "Утасны дугаар буруу",
        description: "8 оронтой утасны дугаараа оруулна уу.",
      });
      return;
    }
    setSubmitted(true);
    toast({
      title: "Хүсэлт амжилттай!",
      description: `${form.name}, манай баг удахгүй холбогдоно.`,
    });
  };

  const reset = () => {
    setForm({ name: "", phone: "", interest: "info", model: "", message: "" });
    setSubmitted(false);
  };

  return (
    <section id="contact" className="relative py-24 lg:py-32 border-t border-line bg-ink-2/40">
      <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />
      <div className="relative mx-auto w-[min(1180px,92vw)]">
        <div className="text-center mb-12">
          <p className="eyebrow mb-3">
            <span className="text-jetour-red">06</span> · Холбоо барих
          </p>
          <h2 className="font-display font-extrabold italic leading-[0.95] text-paper text-4xl lg:text-6xl mb-3">
            Тантай <span className="text-gradient-fire">холбогдоё</span>
          </h2>
          <p className="text-chrome max-w-xl mx-auto text-sm lg:text-base leading-relaxed">
            Загвар, үнэ, зээл, үйлчилгээ — бүх төрлийн асуултад манай борлуулалтын баг хариулна.
          </p>
        </div>

        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-6 lg:gap-10">
          {/* Left — contact cards */}
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="glass rounded-2xl p-6 lg:p-7"
            >
              <div className="flex items-start gap-4 mb-5">
                <div className="w-12 h-12 grid place-items-center rounded-xl bg-gradient-to-br from-jetour-red/30 to-jetour-red/10 text-jetour-red-soft border border-line">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <p className="eyebrow mb-1">Албан ёсны дистрибьютер</p>
                  <SainMotorsMark className="text-2xl" />
                  <p className="text-xs text-muted-ink mt-2">
                    {CONTACT.brandFullName} · {CONTACT.brandSince} оноос хойш Монголд
                  </p>
                </div>
              </div>

              <div className="space-y-2.5 pt-5 border-t border-line">
                {/* Two phone numbers */}
                <div className="grid grid-cols-2 gap-2">
                  <a href={CONTACT.phone1Href} className="flex items-center gap-3 group">
                    <span className="w-9 h-9 grid place-items-center rounded-lg bg-jetour-red/15 text-jetour-red-soft group-hover:scale-110 transition-transform">
                      <Phone className="w-4 h-4" />
                    </span>
                    <div>
                      <p className="text-[0.55rem] tracking-[0.18em] uppercase text-muted-ink font-display">
                        Борлуулалт 1
                      </p>
                      <p className="font-display font-bold text-paper text-sm group-hover:text-jetour-red-soft transition-colors">
                        {CONTACT.phone1}
                      </p>
                    </div>
                  </a>
                  <a href={CONTACT.phone2Href} className="flex items-center gap-3 group">
                    <span className="w-9 h-9 grid place-items-center rounded-lg bg-jetour-blue/15 text-jetour-blue-soft group-hover:scale-110 transition-transform">
                      <Phone className="w-4 h-4" />
                    </span>
                    <div>
                      <p className="text-[0.55rem] tracking-[0.18em] uppercase text-muted-ink font-display">
                        Борлуулалт 2
                      </p>
                      <p className="font-display font-bold text-paper text-sm group-hover:text-jetour-blue-soft transition-colors">
                        {CONTACT.phone2}
                      </p>
                    </div>
                  </a>
                </div>

                <div className="flex items-start gap-3 pt-2">
                  <span className="w-9 h-9 grid place-items-center rounded-lg bg-jetour-red/15 text-jetour-red-soft shrink-0">
                    <MapPin className="w-4 h-4" />
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-[0.55rem] tracking-[0.18em] uppercase text-muted-ink font-display">
                      Showroom хаяг
                    </p>
                    <p className="text-paper text-sm leading-snug">{CONTACT.address}</p>
                    <a
                      href={CONTACT.googleMap}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs text-jetour-red-soft hover:text-jetour-red transition-colors mt-1.5"
                    >
                      Google Map-аар үзэх
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="w-9 h-9 grid place-items-center rounded-lg bg-jetour-blue/15 text-jetour-blue-soft">
                    <Clock className="w-4 h-4" />
                  </span>
                  <div>
                    <p className="text-[0.55rem] tracking-[0.18em] uppercase text-muted-ink font-display">
                      Ажлын цаг
                    </p>
                    <p className="text-paper text-sm">{CONTACT.hours}</p>
                  </div>
                </div>

                <a href={`mailto:${CONTACT.email}`} className="flex items-center gap-3 group">
                  <span className="w-9 h-9 grid place-items-center rounded-lg bg-jetour-red/15 text-jetour-red-soft group-hover:scale-110 transition-transform">
                    <Mail className="w-4 h-4" />
                  </span>
                  <div>
                    <p className="text-[0.55rem] tracking-[0.18em] uppercase text-muted-ink font-display">
                      И-мэйл
                    </p>
                    <p className="font-display font-bold text-paper text-sm group-hover:text-jetour-red-soft transition-colors">
                      {CONTACT.email}
                    </p>
                  </div>
                </a>
              </div>

              {/* Social row */}
              <div className="flex flex-wrap items-center gap-2 mt-5 pt-5 border-t border-line">
                <span className="text-[0.6rem] tracking-[0.18em] uppercase text-muted-ink font-display mr-2">
                  Биднийг дага:
                </span>
                <a
                  href={CONTACT.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 glass rounded-full px-3 py-1.5 hover:border-jetour-red/50 transition-colors group"
                >
                  <Facebook className="w-3.5 h-3.5 text-chrome group-hover:text-paper transition-colors" />
                  <span className="font-display text-xs font-semibold text-chrome group-hover:text-paper transition-colors">
                    Facebook
                  </span>
                </a>
                <a
                  href={CONTACT.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 glass rounded-full px-3 py-1.5 hover:border-jetour-red/50 transition-colors group"
                >
                  <Instagram className="w-3.5 h-3.5 text-chrome group-hover:text-paper transition-colors" />
                  <span className="font-display text-xs font-semibold text-chrome group-hover:text-paper transition-colors">
                    Instagram
                  </span>
                </a>
              </div>
            </motion.div>
          </div>

          {/* Right — request form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="glass rounded-2xl p-6 lg:p-8"
          >
            {submitted ? (
              <div className="text-center py-12">
                <motion.div
                  initial={{ scale: 0, rotate: -30 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", duration: 0.6 }}
                  className="w-20 h-20 mx-auto mb-5 rounded-full bg-gradient-to-br from-jetour-red to-jetour-blue grid place-items-center"
                >
                  <CheckCircle2 className="w-10 h-10 text-white" />
                </motion.div>
                <h3 className="font-display font-extrabold italic text-2xl text-paper mb-2">
                  Хүсэлт амжилттай!
                </h3>
                <p className="text-chrome text-sm leading-relaxed mb-6 max-w-sm mx-auto">
                  <b className="text-paper">{form.name}</b>, таны хүсэлт хүлээн авлаа. Манай
                  борлуулалтын баг 24 цагийн дотор холбогдож, нарийвчилсан мэдээлэл өгнө.
                </p>
                <button
                  onClick={reset}
                  className="font-display font-bold text-sm text-paper border border-line rounded-full px-5 py-2.5 hover:bg-panel/60 transition-colors"
                >
                  Шинээр хүсэлт илгээх
                </button>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <Field label="Нэр *">
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Нэрээ оруулна уу"
                      className="w-full bg-transparent text-paper placeholder:text-muted-ink text-sm focus:outline-none"
                    />
                  </Field>
                  <Field label="Утас *">
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="8 оронтой"
                      maxLength={8}
                      className="w-full bg-transparent text-paper placeholder:text-muted-ink text-sm focus:outline-none"
                    />
                  </Field>
                </div>

                <Field label="Сонирхсон сэдвийн төрөл">
                  <select
                    value={form.interest}
                    onChange={(e) => setForm({ ...form, interest: e.target.value })}
                    className="w-full bg-transparent text-paper text-sm focus:outline-none [&>option]:bg-ink"
                  >
                    <option value="info">Ерөнхий мэдээлэл</option>
                    <option value="price">Үнэ, багц</option>
                    <option value="loan">Зээлийн нөхцөл</option>
                    <option value="test-drive">Тест драйв</option>
                    <option value="service">Үйлчилгээ, засвар</option>
                  </select>
                </Field>

                <Field label="Сонирхсон загвар">
                  <select
                    value={form.model}
                    onChange={(e) => setForm({ ...form, model: e.target.value })}
                    className="w-full bg-transparent text-paper text-sm focus:outline-none [&>option]:bg-ink"
                  >
                    <option value="">Загвар сонгох (заавал биш)</option>
                    {MODELS.map((m) => (
                      <option key={m.id} value={m.name}>
                        {m.name} {m.status === "coming-soon" ? "(тун удахгүй)" : ""}
                      </option>
                    ))}
                  </select>
                </Field>

                <Field label="Нэмэлт мэдээлэл">
                  <textarea
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Асуулт, хүсэлтээ бичнэ үү..."
                    rows={3}
                    className="w-full bg-transparent text-paper placeholder:text-muted-ink text-sm focus:outline-none resize-none"
                  />
                </Field>

                <button
                  type="submit"
                  className="btn-jetour w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-base mt-2"
                >
                  <Send className="w-4 h-4" />
                  Хүсэлт илгээх
                </button>

                <p className="text-[0.65rem] text-muted-ink text-center leading-relaxed pt-1">
                  Таны мэдээлэл зөвхөн JETOUR Mongolia-тай холбоотой зорилгоор ашиглагдана.
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block text-[0.65rem] tracking-[0.18em] uppercase text-muted-ink font-display mb-1.5">
        {label}
      </span>
      <div className="flex items-center gap-2.5 bg-ink/60 border border-line rounded-xl px-4 py-3 focus-within:border-jetour-red/60 transition-colors">
        <div className="flex-1 min-w-0">{children}</div>
      </div>
    </label>
  );
}

export function Footer() {
  return (
    <footer className="relative border-t border-line bg-ink-2/60">
      <div className="mx-auto w-[min(1180px,92vw)] py-12">
        <div className="grid md:grid-cols-[1.5fr_1fr_1fr] gap-8 mb-10">
          <div>
            <JetourLogoSmall />
            <p className="text-chrome text-xs leading-relaxed mt-4 max-w-xs">
              JETOUR Mongolia — албан ёсны дистрибьютер {CONTACT.brandFullName}. Travel+ философиор
              Монголын уудам нутагт тохирох SUV загварууд.
            </p>
          </div>

          <div>
            <p className="eyebrow mb-4">Цэс</p>
            <ul className="space-y-2 text-sm">
              {NAV_LINKS_FOOTER.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="text-chrome hover:text-paper transition-colors">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="eyebrow mb-4">Дистрибьютер</p>
            <SainMotorsMark className="text-lg" />
            <p className="text-chrome text-xs mt-3 leading-relaxed">{CONTACT.address}</p>
            <a
              href={CONTACT.phone1Href}
              className="font-display font-bold text-paper hover:text-jetour-red-soft transition-colors block mt-2"
            >
              {CONTACT.phone1}
            </a>
            <a
              href={CONTACT.phone2Href}
              className="font-display font-bold text-paper hover:text-jetour-red-soft transition-colors block"
            >
              {CONTACT.phone2}
            </a>
          </div>
        </div>

        <div className="pt-6 border-t border-line flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-ink">
            © {new Date().getFullYear()} JETOUR Mongolia · {CONTACT.brandFullName}. Бүх эрх хуулиар
            хамгаалагдсан.
          </p>
        </div>
      </div>
    </footer>
  );
}

const NAV_LINKS_FOOTER = [
  { href: "#brand", label: "Брэнд" },
  { href: "#models", label: "Загварууд" },
  { href: "#technology", label: "Технологи" },
  { href: "#financing", label: "Зээл" },
  { href: "#contact", label: "Холбоо" },
];

function JetourLogoSmall() {
  return (
    <div className="inline-flex flex-col leading-none">
      <span
        className="font-display font-extrabold italic tracking-tight text-2xl text-paper"
        style={{ letterSpacing: "-0.02em" }}
      >
        JETOUR
      </span>
      <span
        className="font-display font-bold not-italic mt-1"
        style={{
          fontSize: "0.62rem",
          letterSpacing: "0.34em",
          background: "linear-gradient(92deg, #E2231A, #2B6FE0)",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          color: "transparent",
        }}
      >
        MONGOLIA
      </span>
    </div>
  );
}
