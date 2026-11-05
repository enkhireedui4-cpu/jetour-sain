"use client";

import { useEffect, useState } from "react";
import { Facebook, Instagram, Youtube } from "lucide-react";
import { CONTACT, SHOWROOM_HOURS } from "@/lib/jetour-data";
import styles from "./footer.module.css";

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
      <div className={`relative container-page ${styles.inner}`}>
        {/* === Дээд хэсэг: брэнд + мэдээлэл + холбоосын баганууд (jetour.kz маяг) === */}
        <div className={styles.columns}>
          {/* Брэнд + гол мэдээлэл */}
          <div className={styles.brand}>
            <img src="/logos/jetour-white.png" alt="JETOUR" className={styles.logo} />
            <dl className={styles.details}>
              {/* Хаяг + утас нь сайтын БҮХ хуудсанд, нэг ижил хэлбэрээр
                  гарна (NAP тууштай байдал). Орон нутгийн хайлтад Google нь
                  сайт дээрх хаягийг Business Profile-тай тааруулж шалгадаг
                  тул зөрүү нь дохиог сулруулна. Дэлгэрэнгүй нь /dealer. */}
              <div className={styles.detail}>
                <dt>Шоурум:</dt>
                <dd>{CONTACT.addressShort}</dd>
              </div>
              {CONTACT.serviceAddress && (
                <div className={styles.detail}>
                  <dt>Сервис төв:</dt>
                  <dd>
                    {CONTACT.serviceAddressShort}
                  </dd>
                </div>
              )}
              {/* Хоёр байршил НЭГ дугаартай тул утас нэг л мөр. Хоёр удаа
                  ижил дугаар бичвэл «аль нь аль вэ?» гэсэн эргэлзээ үүсгэнэ. */}
              <div className={styles.detail}>
                <dt>Утас:</dt>
                <dd><a href={CONTACT.phone1Href} className="tabular-nums hover:text-[#E20A17] transition-colors">
                  {CONTACT.phone1}
                </a></dd>
              </div>
              {/* «Дуудлагын төв» + дугаар хасав — яг тэр дугаар дээрх
                  холбоо барих картад бий, мөн хөвөгч улаан товчинд бий. */}
              <div className={styles.detail}>
                <dt>Ажиллах цаг:</dt>
                {/* Бүх өдрийг харуулна: зөвхөн эхний мөрийг харуулбал амралтын
                    өдрийн цаг алга болж, хүн буруу ойлгоно. */}
                <dd>{SHOWROOM_HOURS.map((h) => (
                  <p key={h.day}>{h.day}: {h.hours}</p>
                ))}</dd>
              </div>
              <div className={styles.detail}>
                <dt>И-мэйл:</dt>
                <dd><a href={`mailto:${CONTACT.email}`} className="hover:text-[#E20A17] transition-colors">
                  {CONTACT.email}
                </a></dd>
              </div>
            </dl>
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
        <div className={`border-t border-white/10 flex flex-col sm:flex-row items-center justify-between ${styles.bottom}`}>
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
          <div className={`flex flex-col sm:flex-row items-center ${styles.legal}`}>
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
      <p className={`text-white/90 font-bold ${styles.heading}`}>{title}</p>
      <ul className={styles.links}>{children}</ul>
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
