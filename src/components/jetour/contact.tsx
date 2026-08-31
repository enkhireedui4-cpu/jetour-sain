"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Phone, MapPin, Clock, Mail, Facebook, Instagram, Youtube, ExternalLink, MessageCircle } from "lucide-react";
import { CONTACT, SHOWROOM_HOURS, BRANCHES } from "@/lib/jetour-data";

type PublicModel = { id: string; name: string };

function SainMotorsMark({ className = "" }: { className?: string }) {
  return (
    <span
      className={`font-extrabold tracking-tight ${className}`}
      style={{ letterSpacing: "-0.01em", color: "#17181B" }}
    >
      SAIN <span style={{ color: "#E20A17" }}>MOTORS</span>
    </span>
  );
}

export function Contact() {
  return (
    <section id="dealer" className="relative section-pad bg-[#F5F5F6] border-t border-[#E7E7EA] scroll-mt-16">
      <div className="relative container-page">
        <div className="mb-10 lg:mb-14">
          <h2 className="type-h2 text-[#17181B] mb-4">Бидэнтэй холбогдоорой</h2>
          <p className="max-w-xl type-lead">
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
                <div className="w-14 h-14 rounded-2xl overflow-hidden shrink-0 ring-1 ring-black/5">
                  <Image
                    src="/logos/sain-motors-mark.png"
                    alt="SAIN MOTORS"
                    width={56}
                    height={56}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="eyebrow mb-1">Албан ёсны дистрибьютор</p>
                  <SainMotorsMark className="text-2xl" />
                  <p className="text-xs text-[#666C77] mt-2">
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
                    <p className="text-[0.55rem] tracking-[0.18em] uppercase text-[#666C77] font-display">Борлуулалтын ажилтан 1</p>
                    <p className="font-display font-bold text-[#17181B] text-sm">{CONTACT.phone1}</p>
                  </div>
                </a>
                <a href={CONTACT.phone2Href} className="flex items-center gap-3 bg-[#F5F5F6] rounded-xl p-3.5 hover:bg-[#F5F5F6] transition-colors group">
                  <span className="w-9 h-9 grid place-items-center rounded-lg bg-[#E20A17]/15 text-[#E20A17] group-hover:scale-110 transition-transform">
                    <Phone className="w-4 h-4" />
                  </span>
                  <div>
                    <p className="text-[0.55rem] tracking-[0.18em] uppercase text-[#666C77] font-display">Борлуулалтын ажилтан 2</p>
                    <p className="font-display font-bold text-[#17181B] text-sm">{CONTACT.phone2}</p>
                  </div>
                </a>
              </div>

              <div className="space-y-2 mb-5">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#E20A17] mt-0.5 shrink-0" />
                  <div>
                    <p className="text-[0.55rem] tracking-[0.18em] uppercase text-[#666C77] font-display">Showroom хаяг</p>
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
                <p className="text-[0.55rem] tracking-[0.22em] uppercase text-[#666C77] font-display mb-3 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  Ажлын цаг
                </p>
                <div className="space-y-1.5">
                  {SHOWROOM_HOURS.map((h) => (
                    <div key={h.day} className="flex items-center justify-between text-sm">
                      <span className="text-[#666C77]">{h.day}</span>
                      <span className="font-display font-bold text-[#17181B]">{h.hours}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Social */}
              <div className="flex items-center gap-2 mt-5 pt-5 border-t border-[#E7E7EA]">
                <span className="text-[11px] tracking-[0.18em] uppercase text-[#666C77] font-display mr-2">Биднийг дага:</span>
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
              <Image
                src="/showroom/showroom-1.webp"
                alt={`${BRANCHES[0].name} — Showroom`}
                fill
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover"
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
  const [models, setModels] = useState<PublicModel[]>([]);

  useEffect(() => {
    fetch("/api/public/models")
      .then((r) => r.json())
      .then((d) => {
        if (d?.ok) setModels(d.models);
      })
      .catch(() => {});
  }, []);

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
      <div className="relative container-page py-14 lg:py-20">
        {/* === Дээд хэсэг: брэнд + мэдээлэл + холбоосын баганууд (jetour.kz маяг) === */}
        <div className="grid grid-cols-2 lg:grid-cols-[1.7fr_1fr_1.35fr_1.35fr_1fr] gap-x-6 gap-y-10 lg:gap-x-8">
          {/* Брэнд + гол мэдээлэл */}
          <div className="col-span-2 lg:col-span-1">
            <img src="/logos/jetour-white.png" alt="JETOUR" className="h-11 lg:h-12 w-auto" />
            <div className="mt-6 space-y-4 text-sm">
              {/* «Дуудлагын төв» + дугаар хасав — яг тэр дугаар дээрх
                  холбоо барих картад бий, мөн хөвөгч улаан товчинд бий. */}
              <div>
                <p className="text-white/55 mb-1">Ажиллах цаг:</p>
                <p className="text-white font-bold">{SHOWROOM_HOURS[0].day}: {SHOWROOM_HOURS[0].hours}</p>
              </div>
              <div>
                <p className="text-white/55 mb-1">И-мэйл:</p>
                <a href={`mailto:${CONTACT.email}`} className="text-white font-bold hover:text-[#E20A17] transition-colors break-all">
                  {CONTACT.email}
                </a>
              </div>
            </div>
          </div>

          {/* Загварууд */}
          <FooterCol title="Загварууд">
            {models.map((m) => (
              <FooterLink key={m.id} href={`/models/${m.id}`}>{m.name.replace("JETOUR ", "")}</FooterLink>
            ))}
          </FooterCol>

          {/* Эзэмшигчдэд */}
          <FooterCol title="Эзэмшигчдэд">
            <FooterLink href="/owners">Үйлчилгээ ба баталгаа</FooterLink>
            <FooterLink href="/special-offers">Тусгай санал</FooterLink>
          </FooterCol>

          {/* Худалдан авахад туслах */}
          <FooterCol title="Худалдан авахад туслах">
            <FooterLink href="/dealer">Дилер олох</FooterLink>
            <FooterLink href="/info-request?type=test-drive">Туршилтын жолоодлого</FooterLink>
          </FooterCol>

          {/* JETOUR-ийн тухай */}
          <FooterCol title="JETOUR-ийн тухай">
            <FooterLink href="/brand">Брэндийн тухай</FooterLink>
            <FooterLink href="/news">Мэдээ</FooterLink>
            <FooterLink href="/dealer">Холбоо барих</FooterLink>
          </FooterCol>
        </div>

        {/* === Доод хэсэг: сошиал (зүүн) + copyright (баруун) === */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-5">
          <div className="flex items-center gap-6">
            {[
              { href: CONTACT.instagram, Icon: Instagram, label: "Instagram" },
              { href: CONTACT.whatsapp, Icon: MessageCircle, label: "WhatsApp" },
              { href: CONTACT.youtube, Icon: Youtube, label: "YouTube" },
              { href: CONTACT.facebook, Icon: Facebook, label: "Facebook" },
            ].map(({ href, Icon, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="foot-social text-white/60 hover:text-white transition-colors hover:scale-110"
              >
                <Icon className="w-5 h-5" />
              </a>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
            <div className="flex items-center gap-5 text-xs">
              <a href="/privacy" className="text-white/50 hover:text-white transition-colors">
                Нууцлалын бодлого
              </a>
              <a href="/terms" className="text-white/50 hover:text-white transition-colors">
                Үйлчилгээний нөхцөл
              </a>
            </div>
            <p className="text-xs text-white/55">
              © {new Date().getFullYear()} JETOUR. Бүх эрх хуулиар хамгаалагдсан.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-white/90 font-bold text-sm mb-4">{title}</p>
      <ul className="space-y-2.5 text-sm">{children}</ul>
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <a href={href} className="text-white/60 hover:text-white transition-colors">
        {children}
      </a>
    </li>
  );
}
