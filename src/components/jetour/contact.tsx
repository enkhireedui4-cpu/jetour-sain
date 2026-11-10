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
      .then((d) => { if (d?.ok) setModels(d.models); })
      .catch(() => {});
  }, []);

  return (
    <footer className={styles.footer} data-footer-version="4">
      <div className={`container-page ${styles.inner}`}>
        {/* === Дээд хэсэг: брэнд + мэдээлэл + холбоосын баганууд () === */}
        <div className={styles.top}>
          <div className={styles.navigation} data-footer-columns>
            <FooterCol title="Загварууд" defaultOpen>
              {models.map((m) => <FooterLink key={m.id} href={`/models/${m.id}`}>{m.name.replace("JETOUR ", "")}</FooterLink>)}
            </FooterCol>
            <FooterCol title="Эзэмшигчдэд">
              <FooterLink href="/owners">Үйлчилгээ ба баталгаа</FooterLink>
              <FooterLink href="/special-offers">Тусгай санал</FooterLink>
            </FooterCol>
            <FooterCol title="Худалдан авагчдад">
              <FooterLink href="/dealer">Шоурум ба Сервис төв</FooterLink>
              <FooterLink href="/info-request?type=test-drive">Туршилтын жолоодлого</FooterLink>
            </FooterCol>
            <FooterCol title="JETOUR-ийн тухай">
              <FooterLink href="/brand">Брэндийн тухай</FooterLink>
              <FooterLink href="/news">Мэдээ</FooterLink>
              <FooterLink href="/dealer">Холбоо барих</FooterLink>
            </FooterCol>
          </div>

          <aside className={styles.aside}>
            <div className={styles.follow}>
              <h2>Биднийг дагаарай</h2>
              <div className={styles.social}>
                {[
                  { href: CONTACT.instagram, Icon: Instagram, label: "Instagram" },
                  { href: CONTACT.youtube, Icon: Youtube, label: "YouTube" },
                  { href: CONTACT.facebook, Icon: Facebook, label: "Facebook" },
                ].map(({ href, Icon, label }) => (
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>
                    <Icon width={22} height={22} aria-hidden="true" />
                  </a>
                ))}
              </div>
            </div>
            <FooterCol title="Холбоо барих" contact>
              <li><span className={styles.label}>Шоурум</span>{CONTACT.addressShort}</li>
              {CONTACT.serviceAddress && <li><span className={styles.label}>Сервис төв</span>{CONTACT.serviceAddressShort}</li>}
              <li><span className={styles.label}>Утас</span><a href={CONTACT.phone1Href}>{CONTACT.phone1}</a></li>
              <li><span className={styles.label}>Ажиллах цаг</span>{SHOWROOM_HOURS.map((h) => <div key={h.day}>{h.day}: {h.hours}</div>)}</li>
              <li><span className={styles.label}>И-мэйл</span><a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a></li>
            </FooterCol>
          </aside>
        </div>
        <div className={styles.bottom}>
          <p>© {new Date().getFullYear()} <a href="/">JETOUR</a>. Бүх эрх хуулиар хамгаалагдсан.</p>
          <div className={styles.legalLinks}>
            <a href="/privacy">Нууцлалын бодлого</a>
            <a href="/terms">Үйлчилгээний нөхцөл</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, children, defaultOpen = false, contact = false }: { title: string; children: React.ReactNode; defaultOpen?: boolean; contact?: boolean }) {
  const listClass = `${styles.links} ${contact ? styles.contactLinks : ""}`;
  return (
    <nav className={styles.group} aria-label={title}>
      <div className={styles.desktopGroup}><h2>{title}</h2><ul className={listClass}>{children}</ul></div>
      <details className={styles.mobileGroup} open={defaultOpen || undefined}>
        <summary><span>{title}</span><span className={styles.plus} aria-hidden="true" /></summary>
        <ul className={listClass}>{children}</ul>
      </details>
    </nav>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return <li><a href={href}>{children}</a></li>;
}
