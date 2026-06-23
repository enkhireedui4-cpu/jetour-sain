"use client";

import { motion } from "framer-motion";
import { Phone, MapPin, Clock, Mail, Facebook, Instagram, ArrowUp, MessageCircle } from "lucide-react";
import { CONTACT } from "@/lib/jetour-data";
import { JetourLogo, SainMotorsMark } from "./logo";

export function Contact() {
  return (
    <section id="contact" className="relative py-24 lg:py-32 border-t border-line">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 100%, rgba(43,111,224,0.12), transparent 70%)",
        }}
      />
      <div className="relative mx-auto w-[min(1180px,92vw)]">
        <div className="text-center mb-12">
          <p className="eyebrow mb-3">
            <span className="text-jetour-red">06</span> · Холбоо барих
          </p>
          <h2 className="font-display font-extrabold italic leading-[0.95] text-paper text-4xl lg:text-6xl mb-3">
            Тантай <span className="text-gradient-fire">холбогдоё</span>
          </h2>
          <p className="text-chrome max-w-xl mx-auto text-sm lg:text-base leading-relaxed">
            Загвар, үнэ, зээл, тест драйв — бүх төрлийн асуултад манай мэргэжилтнүүд хариулна.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          <ContactCard
            icon={<Phone className="w-5 h-5" />}
            label="Утас"
            value={CONTACT.phone}
            href={CONTACT.phoneHref}
            accent="red"
          />
          <ContactCard
            icon={<MapPin className="w-5 h-5" />}
            label="Хаяг"
            value={CONTACT.address}
            accent="blue"
          />
          <ContactCard
            icon={<Clock className="w-5 h-5" />}
            label="Ажлын цаг"
            value={CONTACT.hours}
            accent="red"
          />
          <ContactCard
            icon={<Mail className="w-5 h-5" />}
            label="И-мэйл"
            value={CONTACT.email}
            href={`mailto:${CONTACT.email}`}
            accent="blue"
          />
        </div>

        {/* Map placeholder — Cinematic Ulaanbaatar card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="relative rounded-2xl overflow-hidden glass aspect-[16/9] lg:aspect-[21/9] mb-4"
        >
          <img
            src="https://sfile.chatglm.cn/images-ppt/3a7532ed7711.jpg"
            alt="Улаанбаатар хот — Sain Motors байршил"
            className="w-full h-full object-cover opacity-70"
            loading="lazy"
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(180deg, rgba(7,10,20,0.6) 0%, transparent 30%, rgba(7,10,20,0.95) 100%)",
            }}
          />
          <div className="absolute inset-0 flex flex-col items-center justify-end pb-10 text-center">
            <div className="w-12 h-12 grid place-items-center rounded-full bg-jetour-red mb-3 shadow-[0_0_30px_rgba(226,35,26,0.7)]">
              <MapPin className="w-6 h-6 text-white" />
            </div>
            <p className="eyebrow text-jetour-red-soft mb-1.5">Бидний байршил</p>
            <p className="font-display font-extrabold italic text-2xl lg:text-3xl text-paper max-w-2xl px-4">
              {CONTACT.address}
            </p>
          </div>
        </motion.div>

        {/* Social row */}
        <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
          <span className="text-xs text-muted-ink tracking-wider uppercase mr-2">Биднийг дага:</span>
          <SocialButton href={CONTACT.facebook} icon={<Facebook className="w-4 h-4" />} label="Facebook" />
          <SocialButton href={CONTACT.instagram} icon={<Instagram className="w-4 h-4" />} label="Instagram" />
          <SocialButton
            href={`https://m.me/Sainmotors.mn`}
            icon={<MessageCircle className="w-4 h-4" />}
            label="Messenger"
          />
        </div>
      </div>
    </section>
  );
}

function ContactCard({
  icon,
  label,
  value,
  href,
  accent,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
  accent: "red" | "blue";
}) {
  const Inner = (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="glass rounded-2xl p-6 h-full flex flex-col gap-3"
    >
      <div
        className={`w-12 h-12 grid place-items-center rounded-xl border border-line ${
          accent === "red"
            ? "bg-gradient-to-br from-jetour-red/30 to-jetour-red/10 text-jetour-red-soft"
            : "bg-gradient-to-br from-jetour-blue/30 to-jetour-blue/10 text-jetour-blue-soft"
        }`}
      >
        {icon}
      </div>
      <div>
        <p className="text-[0.6rem] tracking-[0.22em] uppercase text-muted-ink font-display mb-1">
          {label}
        </p>
        <p className="text-sm text-paper font-semibold leading-snug">{value}</p>
      </div>
    </motion.div>
  );

  if (href) {
    return (
      <a href={href} className="block h-full">
        {Inner}
      </a>
    );
  }
  return Inner;
}

function SocialButton({
  href,
  icon,
  label,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-2 glass rounded-full px-4 py-2 hover:border-jetour-red/50 transition-colors group"
    >
      <span className="text-chrome group-hover:text-paper transition-colors">{icon}</span>
      <span className="font-display text-xs font-semibold text-chrome group-hover:text-paper transition-colors">
        {label}
      </span>
    </a>
  );
}

export function Footer() {
  return (
    <footer className="relative border-t border-line bg-ink-2/60">
      <div className="mx-auto w-[min(1180px,92vw)] py-12">
        <div className="grid md:grid-cols-[1.5fr_1fr_1fr] gap-8 mb-10">
          {/* Brand */}
          <div>
            <JetourLogo size="md" />
            <p className="text-chrome text-xs leading-relaxed mt-4 max-w-xs">
              JETOUR Mongolia — албан ёсны дистрибьютер Сайн Моторс. Travel+ философиор Монголын
              уудам нутагт тохирох SUV загварууд.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <p className="eyebrow mb-4">Цэс</p>
            <ul className="space-y-2 text-sm">
              {[
                { href: "#brand", label: "Брэнд" },
                { href: "#models", label: "Загварууд" },
                { href: "#technology", label: "Технологи" },
                { href: "#test-drive", label: "Тест драйв" },
                { href: "#contact", label: "Холбоо" },
              ].map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="text-chrome hover:text-paper transition-colors"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Distributor */}
          <div>
            <p className="eyebrow mb-4">Дистрибьютер</p>
            <SainMotorsMark className="text-lg" />
            <p className="text-chrome text-xs mt-3 leading-relaxed">
              {CONTACT.address}
            </p>
            <a
              href={CONTACT.phoneHref}
              className="font-display font-bold text-paper hover:text-jetour-red-soft transition-colors block mt-2"
            >
              {CONTACT.phone}
            </a>
          </div>
        </div>

        <div className="pt-6 border-t border-line flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-ink">
            © {new Date().getFullYear()} JETOUR Mongolia · {CONTACT.brand}. Бүх эрх хуулиар
            хамгаалагдсан.
          </p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-2 text-xs text-chrome hover:text-paper transition-colors"
          >
            Дээш буцах
            <span className="w-7 h-7 grid place-items-center rounded-full glass">
              <ArrowUp className="w-3.5 h-3.5" />
            </span>
          </button>
        </div>
      </div>
    </footer>
  );
}
