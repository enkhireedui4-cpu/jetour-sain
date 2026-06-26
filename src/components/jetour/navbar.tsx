"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Phone, ChevronDown } from "lucide-react";
import { CONTACT, ALL_MODELS_FOR_GRID, MODEL_COLOR_IMAGES, MODEL_GALLERY_IMAGES } from "@/lib/jetour-data";

type M = (typeof ALL_MODELS_FOR_GRID)[number];

const imgOf = (m: M) =>
  MODEL_COLOR_IMAGES[m.id]?.[0]?.image ?? MODEL_GALLERY_IMAGES[m.id]?.[0] ?? m.heroImage;

const priceOf = (m: M) =>
  m.startingPrice ? `${m.startingPrice}-с эхлэн` : m.priceNote ?? "Тун удахгүй";

const NAV_LINKS = [
  { label: "Тусгай саналууд", href: "/special-offers", type: "route" as const },
  { label: "Дилер", href: "/dealer", type: "route" as const },
  { label: "Санхүүжилт", href: "/financing", type: "route" as const },
  { label: "Үйлчилгээ", href: "/owners", type: "route" as const },
  { label: "Мэдээ", href: "/news", type: "route" as const },
  { label: "Холбоо барих", href: "/#dealer", type: "anchor" as const },
];

export function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const megaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mega on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (megaRef.current && !megaRef.current.contains(e.target as Node)) {
        setMegaOpen(false);
      }
    };
    if (megaOpen) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [megaOpen]);

  const overHero = isHome && !scrolled && !megaOpen;

  const handleAnchor = (href: string) => {
    setOpen(false);
    setMegaOpen(false);
    if (!href.startsWith("/#")) return;
    const hash = href.slice(1);
    if (window.location.pathname === "/") {
      const el = document.querySelector(hash);
      if (el) el.scrollIntoView({ behavior: "smooth" });
      else window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      window.location.href = href;
    }
  };

  return (
    <header
      ref={megaRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        overHero
          ? "bg-transparent"
          : "bg-white/95 backdrop-blur-xl border-b border-[#E7E7EA] shadow-[0_4px_20px_-14px_rgba(23,24,27,0.3)]"
      }`}
    >
      <div className="mx-auto w-[min(1280px,94vw)] flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/" onClick={() => { setOpen(false); setMegaOpen(false); }} className="shrink-0" aria-label="JETOUR — Sain Motors">
          <JetourLogo overHero={overHero} />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {/* Models mega trigger */}
          <button
            onClick={() => setMegaOpen(!megaOpen)}
            className={`flex items-center gap-1 text-sm font-medium transition-colors relative group ${
              overHero ? "text-white/90 hover:text-white" : "text-[#54585F] hover:text-[#17181B]"
            } ${megaOpen ? (overHero ? "text-white" : "text-[#17181B]") : ""}`}
          >
            Загварууд
            <ChevronDown
              className={`w-3.5 h-3.5 transition-transform duration-200 ${megaOpen ? "rotate-180" : ""}`}
            />
            {megaOpen && (
              <span className="absolute -bottom-1.5 left-0 right-0 h-0.5 bg-[#E20A17]" />
            )}
          </button>

          {NAV_LINKS.map((l) =>
            l.type === "route" ? (
              <Link
                key={l.href}
                href={l.href}
                className={`text-sm font-medium transition-colors relative group ${
                  overHero ? "text-white/90 hover:text-white" : "text-[#54585F] hover:text-[#17181B]"
                }`}
              >
                {l.label}
                <span className="absolute -bottom-1.5 left-0 right-0 h-0.5 bg-[#E20A17] scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
              </Link>
            ) : (
              <button
                key={l.href}
                onClick={() => handleAnchor(l.href)}
                className={`text-sm font-medium transition-colors relative group ${
                  overHero ? "text-white/90 hover:text-white" : "text-[#54585F] hover:text-[#17181B]"
                }`}
              >
                {l.label}
                <span className="absolute -bottom-1.5 left-0 right-0 h-0.5 bg-[#E20A17] scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
              </button>
            )
          )}
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-2.5">
          <a
            href={CONTACT.phone1Href}
            className={`hidden md:inline-flex items-center gap-2 text-sm font-semibold transition-colors ${
              overHero ? "text-white hover:text-white/80" : "text-[#17181B] hover:text-[#E20A17]"
            }`}
          >
            <Phone className="w-4 h-4" />
            {CONTACT.phone1}
          </a>
          <button
            onClick={() => handleAnchor("/#dealer")}
            className="btn-electric-jetour hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm"
          >
            Тест драйв
          </button>
          <button
            className={`lg:hidden p-2 ${overHero ? "text-white" : "text-[#17181B]"}`}
            onClick={() => setOpen(!open)}
            aria-label={open ? "Цэс хаах" : "Цэс нээх"}
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* ── Mega menu ── */}
      {megaOpen && (
        <div className="absolute top-full left-0 right-0 bg-white border-b border-[#E7E7EA] shadow-2xl">
          <div className="mx-auto w-[min(1280px,94vw)] py-8">
            <div className="flex items-center justify-between mb-6">
              <p className="text-xs font-bold tracking-[0.2em] uppercase text-[#8A8F98]">
                Бүх загвар
              </p>
              <button
                onClick={() => setMegaOpen(false)}
                className="p-1.5 rounded-lg hover:bg-[#F5F5F6] text-[#54585F] hover:text-[#17181B] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {ALL_MODELS_FOR_GRID.map((mm) => (
                <Link
                  key={mm.id}
                  href={`/models/${mm.id}`}
                  onClick={() => setMegaOpen(false)}
                  className="group block bg-[#F5F5F6] rounded-xl p-4 hover:bg-[#FDECEB] transition-colors"
                >
                  {mm.status === "coming-soon" && (
                    <span className="inline-block mb-2 text-[0.55rem] font-bold tracking-[0.16em] uppercase px-2 py-0.5 rounded-full bg-[#E20A17] text-white">
                      Тун удахгүй
                    </span>
                  )}
                  <div className="aspect-[4/3] overflow-hidden rounded-lg mb-3 bg-white">
                    <img
                      src={imgOf(mm)}
                      alt={mm.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  <p className="font-bold text-sm text-[#17181B] leading-tight">{mm.name}</p>
                  <p className="text-xs text-[#E20A17] font-semibold mt-0.5">{priceOf(mm)}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Mobile drawer */}
      {open && (
        <div className="lg:hidden bg-white border-t border-[#E7E7EA] shadow-lg">
          <nav className="mx-auto w-[min(1280px,94vw)] py-3 flex flex-col">
            <button
              onClick={() => { setOpen(false); handleAnchor("/#models"); }}
              className="text-left py-3.5 font-medium text-[15px] text-[#17181B] border-b border-[#F0F0F1] flex items-center justify-between"
            >
              Загварууд
              <ChevronDown className="w-4 h-4 text-[#8A8F98]" />
            </button>
            {NAV_LINKS.map((l) =>
              l.type === "route" ? (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="text-left py-3.5 font-medium text-[15px] text-[#17181B] border-b border-[#F0F0F1]"
                >
                  {l.label}
                </Link>
              ) : (
                <button
                  key={l.href}
                  onClick={() => handleAnchor(l.href)}
                  className="text-left py-3.5 font-medium text-[15px] text-[#17181B] border-b border-[#F0F0F1]"
                >
                  {l.label}
                </button>
              )
            )}
            <a
              href={CONTACT.phone1Href}
              className="text-left py-3.5 font-medium text-[15px] text-[#E20A17] flex items-center gap-2"
            >
              <Phone className="w-4 h-4" /> {CONTACT.phone1}
            </a>
            <button
              onClick={() => handleAnchor("/#dealer")}
              className="btn-electric-jetour mt-3 py-3.5 rounded-full text-center text-sm"
            >
              Тест драйв захиалах
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}

function JetourLogo({ overHero }: { overHero: boolean }) {
  return (
    <div className="inline-flex items-center gap-2.5">
      <img
        src={overHero ? "/logos/jetour-white.png" : "/logos/jetour-black.png"}
        alt="JETOUR"
        className="h-7 w-auto"
      />
      <span
        className="w-px self-stretch"
        style={{ background: overHero ? "rgba(255,255,255,0.25)" : "#E7E7EA" }}
      />
      <img
        src="/logos/sain-motors-logo.png"
        alt="Sain Motors"
        className="h-6 w-auto"
      />
    </div>
  );
}
