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
    <footer className={styles.footer} data-footer-version="3">
      <div className={`container-page ${styles.inner}`}>
        <div className={styles.masthead}>
          <a href="/" className={styles.brand} aria-label="JETOUR нүүр хуудас">
            <img src="/logos/jetour-white.png" alt="JETOUR" className={styles.logo} />
          </a>

          <div className={styles.phone}>
            <p className={styles.caption}>Холбогдох утас</p>
            <a href={CONTACT.phone1Href}>{CONTACT.phone1}</a>
          </div>

          <div className={styles.hours}>
            <p className={styles.caption}>Ажиллах цаг</p>
            <dl className={styles.hoursList}>
              {SHOWROOM_HOURS.map((h) => (
                <div key={h.day}><dt>{h.day}</dt><dd>{h.hours}</dd></div>
              ))}
            </dl>
          </div>
        </div>

        {/* === Дээд хэсэг: брэнд + мэдээлэл + холбоосын баганууд (jetour.kz маяг) === */}
        <div className={styles.columns} data-footer-columns>
          <section className={styles.contact} aria-labelledby="footer-contact-title">
            <h2 id="footer-contact-title" className={styles.heading}>Холбоо барих</h2>
            <dl className={styles.details}>
              <div className={styles.detail}>
                <dt>Шоурум</dt>
                <dd>{CONTACT.addressShort}</dd>
              </div>
              {CONTACT.serviceAddress && (
                <div className={styles.detail}>
                  <dt>Сервис төв</dt>
                  <dd>{CONTACT.serviceAddressShort}</dd>
                </div>
              )}
              <div className={styles.detail}>
                <dt>И-мэйл</dt>
                <dd><a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a></dd>
              </div>
            </dl>
          </section>

          <FooterCol title="Загварууд" models>
            {models.map((m) => (
              <FooterLink key={m.id} href={`/models/${m.id}`}>{m.name.replace("JETOUR ", "")}</FooterLink>
            ))}
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

        <div className={styles.bottom}>
          <div className={styles.social}>
            {[
              { href: CONTACT.instagram, Icon: Instagram, label: "Instagram" },
              { href: CONTACT.youtube, Icon: Youtube, label: "YouTube" },
              { href: CONTACT.facebook, Icon: Facebook, label: "Facebook" },
            ].map(({ href, Icon, label }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>
                <Icon width={20} height={20} aria-hidden="true" />
              </a>
            ))}
          </div>
          <div className={styles.legalLinks}>
            <a href="/privacy">Нууцлалын бодлого</a>
            <a href="/terms">Үйлчилгээний нөхцөл</a>
          </div>
          <p className={styles.copyright}>© {new Date().getFullYear()} JETOUR. Бүх эрх хуулиар хамгаалагдсан.</p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, children, models = false }: { title: string; children: React.ReactNode; models?: boolean }) {
  return (
    <nav aria-label={title}>
      <h2 className={styles.heading}>{title}</h2>
      <ul className={`${styles.links} ${models ? styles.models : ""}`}>{children}</ul>
    </nav>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return <li><a href={href}>{children}</a></li>;
}
