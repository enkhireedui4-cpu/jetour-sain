"use client";

import { useEffect, useRef, type RefObject } from "react";
import { ArrowRight, ChevronDown } from "lucide-react";
import { ALL_BRANDS, BRAND_NAVIGATION, COMPANY_HOME } from "@/lib/brand-navigation";
import styles from "./brand-navigation.module.css";

function BrandList({ id }: { id?: string }) {
  return (
    <ul id={id} className={styles.list}>
      {BRAND_NAVIGATION.map(brand => {
        const content = <>
          {/* Official SAIN Motors wordmarks already have a compact transparent canvas. */}
          <img src={brand.logo} alt="" width={40} height={24} className={styles.brandLogo} />
          <span className={styles.brandText}>
            <span data-brand-name>{brand.name}</span>
            {brand.current && <span className={styles.current}>Одоо үзэж байна</span>}
          </span>
        </>;
        return <li key={brand.id}>
          {brand.current
            ? <span className={`${styles.brand} ${styles.active}`} aria-current="true">{content}</span>
            : <a href={brand.href} className={styles.brand}>{content}</a>}
        </li>;
      })}
    </ul>
  );
}

function AllBrandsLink() {
  return <a href={ALL_BRANDS} className={styles.allBrands}>
    Бүх брэндийг үзэх <ArrowRight size={16} aria-hidden="true" />
  </a>;
}

export function BrandSwitcher({ open, onOpenChange, triggerRef, overHero }: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  triggerRef: RefObject<HTMLButtonElement | null>;
  overHero: boolean;
}) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const closeOutside = (event: PointerEvent) => {
      if (!root.current?.contains(event.target as Node)) onOpenChange(false);
    };
    document.addEventListener("pointerdown", closeOutside);
    return () => document.removeEventListener("pointerdown", closeOutside);
  }, [open, onOpenChange]);

  return <div
    ref={root}
    className={styles.desktop}
    onBlur={event => {
      if (!event.currentTarget.contains(event.relatedTarget as Node | null)) onOpenChange(false);
    }}
  >
    <button
      ref={triggerRef}
      type="button"
      className={styles.trigger}
      data-hero={overHero}
      aria-label="Бусад брэндүүд"
      aria-expanded={open}
      aria-controls="desktop-brands"
      onClick={() => onOpenChange(!open)}
    >
      <ChevronDown size={15} aria-hidden="true" className={open ? styles.rotated : ""} />
      <span role="tooltip" className={styles.tooltip} aria-hidden="true">Бусад брэндүүд</span>
    </button>
    <nav
      id="desktop-brands"
      aria-label="SAIN Motors — Манай брэндүүд"
      className={styles.panel}
      data-open={open}
      inert={!open}
      aria-hidden={!open}
    >
      <div className={styles.company}>
        <span>SAIN Motors</span>
        <a href={COMPANY_HOME}>Компанийн сайт руу <ArrowRight size={14} aria-hidden="true" /></a>
      </div>
      <p className={styles.heading}>Манай брэндүүд</p>
      <BrandList />
      <AllBrandsLink />
    </nav>
  </div>;
}

export function MobileBrands({ open, onOpenChange }: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return <div className={styles.mobile}>
    <a href={COMPANY_HOME} className={styles.mobileCompany}>
      <span>SAIN Motors <span className={styles.companyDescription}>— Компанийн сайт</span></span>
      <ArrowRight size={16} aria-hidden="true" />
    </a>
    <button
      type="button"
      aria-expanded={open}
      aria-controls="mobile-brands"
      className={styles.mobileToggle}
      onClick={() => onOpenChange(!open)}
    >
      Бусад брэндүүд
      <ChevronDown size={16} aria-hidden="true" className={open ? styles.rotated : ""} />
    </button>
    <div id="mobile-brands" hidden={!open} className={styles.mobileContent}>
      <BrandList />
      <AllBrandsLink />
    </div>
  </div>;
}
