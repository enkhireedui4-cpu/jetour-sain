"use client";

import { motion } from "framer-motion";
import { Phone, MapPin, Clock, Mail, Facebook, Instagram, Youtube, ExternalLink, Building2, MessageCircle } from "lucide-react";
import { CONTACT, SHOWROOM_HOURS, BRANCHES } from "@/lib/jetour-data";

function SainMotorsMark({ className = "" }: { className?: string }) {
  return (
    <span
      className={`font-display font-extrabold italic tracking-tight ${className}`}
      style={{ letterSpacing: "-0.01em", color: "#17181B" }}
    >
      <span style={{ color: "#17181B" }}>SAIN</span>{" "}
      <span
        style={{
          background: "linear-gradient(92deg, #17181B, #E20A17)",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          color: "transparent",
        }}
      >
        MOTORS
      </span>
    </span>
  );
}

export function Contact() {
  return (
    <section id="dealer" className="relative py-32 lg:py-40 bg-[#F5F5F6] border-t border-[#E7E7EA]">
      <div className="absolute inset-0 bg-grid opacity-50 pointer-events-none" />
      <div className="relative mx-auto w-[min(1280px,94vw)]">
        <div className="text-center mb-12">
          <p className="eyebrow eyebrow-electric mb-3">06 · Холбоо барих</p>
          <h2 className="font-display font-extrabold italic leading-[0.95] text-[#17181B] text-4xl lg:text-6xl mb-3">
            Бидэнтэй <span className="text-gradient-premium">холбогдоё</span>
          </h2>
          <p className="max-w-xl mx-auto text-[#6B7280] text-base leading-relaxed">
            Showroom, үйлчилгээ, тест драйв — бүх төрлийн асуултад хариулна.
          </p>
        </div>

        <div className="grid lg:grid-cols-[1.1fr_1fr] gap-6 lg:gap-8">
          {/* Left — info card + map */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="space-y-6"
          >
            <div className="bg-white rounded-2xl p-7 border border-[#E7E7EA]">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-14 h-14 grid place-items-center rounded-2xl bg-gradient-to-br from-[#17181B] to-[#232428] text-[#E20A17]">
                  <Building2 className="w-6 h-6" />
                </div>
                <div>
                  <p className="eyebrow mb-1">Албан ёсны дистрибьютер</p>
                  <SainMotorsMark className="text-2xl" />
                  <p className="text-xs text-[#6B7280] mt-2">
                    {CONTACT.brandFullName} · {CONTACT.brandSince} оноос хойш Монголд
                  </p>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-3 mb-5">
                <a href={CONTACT.phone1Href} className="flex items-center gap-3 bg-[#F5F5F6] rounded-xl p-3.5 hover:bg-[#F5F5F6] transition-colors group">
                  <span className="w-9 h-9 grid place-items-center rounded-lg bg-[#17181B]/10 text-[#17181B] group-hover:scale-110 transition-transform">
                    <Phone className="w-4 h-4" />
                  </span>
                  <div>
                    <p className="text-[0.55rem] tracking-[0.18em] uppercase text-[#6B7280] font-display">Борлуулалт 1</p>
                    <p className="font-display font-bold text-[#17181B] text-sm">{CONTACT.phone1}</p>
                  </div>
                </a>
                <a href={CONTACT.phone2Href} className="flex items-center gap-3 bg-[#F5F5F6] rounded-xl p-3.5 hover:bg-[#F5F5F6] transition-colors group">
                  <span className="w-9 h-9 grid place-items-center rounded-lg bg-[#E20A17]/15 text-[#E20A17] group-hover:scale-110 transition-transform">
                    <Phone className="w-4 h-4" />
                  </span>
                  <div>
                    <p className="text-[0.55rem] tracking-[0.18em] uppercase text-[#6B7280] font-display">Борлуулалт 2</p>
                    <p className="font-display font-bold text-[#17181B] text-sm">{CONTACT.phone2}</p>
                  </div>
                </a>
              </div>

              <div className="space-y-2 mb-5">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#E20A17] mt-0.5 shrink-0" />
                  <div>
                    <p className="text-[0.55rem] tracking-[0.18em] uppercase text-[#6B7280] font-display">Showroom хаяг</p>
                    <p className="text-[#17181B] text-sm leading-snug">{CONTACT.address}</p>
                    <a
                      href={CONTACT.googleMap}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs text-[#E20A17] hover:text-[#17181B] transition-colors mt-1.5"
                    >
                      Google Map-аар үзэх
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
                <a href={`mailto:${CONTACT.email}`} className="flex items-center gap-3 hover:text-[#E20A17] transition-colors">
                  <Mail className="w-4 h-4 text-[#E20A17] shrink-0" />
                  <span className="text-[#17181B] text-sm">{CONTACT.email}</span>
                </a>
              </div>

              {/* Working hours */}
              <div className="pt-5 border-t border-[#E7E7EA]">
                <p className="text-[0.55rem] tracking-[0.22em] uppercase text-[#6B7280] font-display mb-3 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  Ажлын цаг
                </p>
                <div className="space-y-1.5">
                  {SHOWROOM_HOURS.map((h) => (
                    <div key={h.day} className="flex items-center justify-between text-sm">
                      <span className="text-[#6B7280]">{h.day}</span>
                      <span className="font-display font-bold text-[#17181B]">{h.hours}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Social */}
              <div className="flex items-center gap-2 mt-5 pt-5 border-t border-[#E7E7EA]">
                <span className="text-[0.6rem] tracking-[0.18em] uppercase text-[#6B7280] font-display mr-2">Биднийг дага:</span>
                <a href={CONTACT.facebook} target="_blank" rel="noopener noreferrer" className="w-9 h-9 grid place-items-center rounded-lg bg-[#F5F5F6] text-[#17181B] hover:bg-[#17181B] hover:text-white transition-colors">
                  <Facebook className="w-4 h-4" />
                </a>
                <a href={CONTACT.instagram} target="_blank" rel="noopener noreferrer" className="w-9 h-9 grid place-items-center rounded-lg bg-[#F5F5F6] text-[#17181B] hover:bg-[#17181B] hover:text-white transition-colors">
                  <Instagram className="w-4 h-4" />
                </a>
                <a href={CONTACT.youtube} target="_blank" rel="noopener noreferrer" className="w-9 h-9 grid place-items-center rounded-lg bg-[#F5F5F6] text-[#17181B] hover:bg-[#17181B] hover:text-white transition-colors">
                  <Youtube className="w-4 h-4" />
                </a>
                <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer" className="w-9 h-9 grid place-items-center rounded-lg bg-[#F5F5F6] text-[#25D366] hover:bg-[#25D366] hover:text-white transition-colors">
                  <MessageCircle className="w-4 h-4" />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right — Showroom photo + Google Maps embed (data-driven from BRANCHES) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex flex-col gap-4"
          >
            <div className="relative rounded-2xl overflow-hidden border border-[#E7E7EA] aspect-[16/10]">
              <img
                src="/showroom/showroom-1.jfif"
                alt={`${BRANCHES[0].name} — Showroom`}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
                <p className="text-white font-bold text-sm">{BRANCHES[0].name}</p>
                <p className="text-white/80 text-xs">{BRANCHES[0].city}</p>
              </div>
            </div>
            <div className="relative rounded-2xl overflow-hidden bg-white border border-[#E7E7EA] flex-1 min-h-[300px]">
              <iframe
                src={BRANCHES[0].mapEmbed}
                title={`${BRANCHES[0].name} — байршил`}
                className="w-full h-full min-h-[300px] border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="relative bg-[#17181B] text-white overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />
      <div className="relative mx-auto w-[min(1280px,94vw)] py-14">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <JetourLogoLight />
            <p className="text-white/70 text-sm leading-relaxed mt-5 max-w-sm">
              JETOUR Mongolia — албан ёсны дистрибьютер {CONTACT.brandFullName}. Travel+ философиор
              Монголын уудам нутагт тохирох SUV загварууд.
            </p>
            <div className="flex items-center gap-2 mt-6">
              <a href={CONTACT.facebook} target="_blank" rel="noopener noreferrer" className="w-10 h-10 grid place-items-center rounded-lg bg-white/5 border border-white/10 hover:bg-[#E20A17] hover:border-[#E20A17] transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href={CONTACT.instagram} target="_blank" rel="noopener noreferrer" className="w-10 h-10 grid place-items-center rounded-lg bg-white/5 border border-white/10 hover:bg-[#E20A17] hover:border-[#E20A17] transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href={CONTACT.youtube} target="_blank" rel="noopener noreferrer" className="w-10 h-10 grid place-items-center rounded-lg bg-white/5 border border-white/10 hover:bg-[#E20A17] hover:border-[#E20A17] transition-colors">
                <Youtube className="w-4 h-4" />
              </a>
              <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer" className="w-10 h-10 grid place-items-center rounded-lg bg-white/5 border border-white/10 hover:bg-[#25D366] hover:border-[#25D366] transition-colors">
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Models */}
          <div>
            <p className="eyebrow text-[#E20A17] mb-4">Загварууд</p>
            <ul className="space-y-2 text-sm">
              <li><a href="#models" className="text-white/70 hover:text-white transition-colors">JETOUR X70 Plus</a></li>
              <li><a href="#models" className="text-white/70 hover:text-white transition-colors">JETOUR X1</a></li>
              <li><a href="#models" className="text-white/70 hover:text-white transition-colors">JETOUR X50</a></li>
              <li><a href="#models" className="text-white/70 hover:text-white transition-colors">JETOUR T1</a></li>
              <li><a href="#models" className="text-white/70 hover:text-white transition-colors">JETOUR G700</a></li>
              <li><a href="#models" className="text-white/70 hover:text-white transition-colors">JETOUR T2 PHEV</a></li>
            </ul>
          </div>

          {/* Service */}
          <div>
            <p className="eyebrow text-[#E20A17] mb-4">Үйлчилгээ</p>
            <ul className="space-y-2 text-sm">
              <li><a href="#dealer" className="text-white/70 hover:text-white transition-colors">Тест драйв</a></li>
              <li><a href="/financing" className="text-white/70 hover:text-white transition-colors">Зээл, санхүүжилт</a></li>
              <li><a href="/owners" className="text-white/70 hover:text-white transition-colors">Засвар үйлчилгээ</a></li>
              <li><a href="/owners" className="text-white/70 hover:text-white transition-colors">Оригинал сэлбэг</a></li>
              <li><a href="/news" className="text-white/70 hover:text-white transition-colors">Мэдээ, сурталчилгаа</a></li>
              <li><a href="#why" className="text-white/70 hover:text-white transition-colors">Баталгаа</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="eyebrow text-[#E20A17] mb-4">Холбоо</p>
            <div className="space-y-3 text-sm">
              <a href={CONTACT.phone1Href} className="block text-white hover:text-[#E20A17] transition-colors font-display font-bold">
                {CONTACT.phone1}
              </a>
              <a href={CONTACT.phone2Href} className="block text-white hover:text-[#E20A17] transition-colors font-display font-bold">
                {CONTACT.phone2}
              </a>
              <p className="text-white/70 leading-snug">{CONTACT.address}</p>
              <a href={`mailto:${CONTACT.email}`} className="block text-white/70 hover:text-white transition-colors">
                {CONTACT.email}
              </a>
            </div>

            {/* Working hours compact */}
            <div className="mt-5 pt-5 border-t border-white/10">
              <p className="text-[0.6rem] tracking-[0.22em] uppercase text-[#E20A17] font-display mb-2">Ажлын цаг</p>
              <div className="space-y-1 text-xs text-white/70">
                {SHOWROOM_HOURS.map((h) => (
                  <div key={h.day} className="flex justify-between">
                    <span>{h.day}</span>
                    <span className="font-display font-bold text-white">{h.hours}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/50">
            © {new Date().getFullYear()} JETOUR Mongolia · {CONTACT.brandFullName}. Бүх эрх хуулиар хамгаалагдсан.
          </p>
          <p className="text-xs text-white/50">
            Албан ёсны дистрибьютер · Travel+ Mongolia
          </p>
        </div>
      </div>
    </footer>
  );
}

function JetourLogoLight() {
  return (
    <div className="inline-flex items-center gap-2.5">
      <img src="/logos/jetour-white.png" alt="JETOUR — Sain Motors" className="h-9 w-auto" />
      <span className="font-semibold tracking-[0.22em] text-xs text-white/80 border-l border-white/25 pl-2.5 whitespace-nowrap">
        SAIN MOTORS
      </span>
    </div>
  );
}
