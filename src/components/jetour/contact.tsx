"use client";

import { useEffect, useState } from "react";
import { Facebook, Instagram, Youtube } from "lucide-react";
import { CONTACT, SHOWROOM_HOURS } from "@/lib/jetour-data";

type PublicModel = { id: string; name: string };

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
              {/* Хаяг + утас нь сайтын БҮХ хуудсанд, нэг ижил хэлбэрээр
                  гарна (NAP тууштай байдал). Орон нутгийн хайлтад Google нь
                  сайт дээрх хаягийг Business Profile-тай тааруулж шалгадаг
                  тул зөрүү нь дохиог сулруулна. Дэлгэрэнгүй нь /dealer. */}
              <div>
                <p className="text-white/55 mb-1">Шоурум:</p>
                <p className="text-white font-bold leading-snug">{CONTACT.addressShort}</p>
              </div>
              {CONTACT.serviceAddress && (
                <div>
                  <p className="text-white/55 mb-1">Сервис төв:</p>
                  <p className="text-white font-bold leading-snug">
                    {CONTACT.serviceAddressShort}
                  </p>
                </div>
              )}
              {/* Хоёр байршил НЭГ дугаартай тул утас нэг л мөр. Хоёр удаа
                  ижил дугаар бичвэл «аль нь аль вэ?» гэсэн эргэлзээ үүсгэнэ. */}
              <div>
                <p className="text-white/55 mb-1">Утас:</p>
                <a href={CONTACT.phone1Href} className="text-white font-bold tabular-nums hover:text-[#E20A17] transition-colors">
                  {CONTACT.phone1}
                </a>
              </div>
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
            <FooterLink href="/dealer">Шоурум ба Сервис төв</FooterLink>
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
