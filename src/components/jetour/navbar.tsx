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

type NavItem =
  | { label: string; href: string; type: "route" | "anchor" }
  | {
      label: string;
      type: "dropdown";
      items: { label: string; href: string; type: "route" | "anchor" }[];
    };

const NAV_LINKS: NavItem[] = [
  { label: "Тусгай саналууд", href: "/special-offers", type: "route" },
  { label: "Дилер", href: "/dealer", type: "route" },
  {
    label: "Худалдан авагчдад зориулсан",
    type: "dropdown",
    items: [
      { label: "Туршилтын жолоодлого", href: "/#dealer", type: "anchor" },
      { label: "Зээлийн мэдээлэл", href: "/financing", type: "route" },
    ],
  },
  { label: "Мэдээ", href: "/news", type: "route" },
  { label: "Брэндийн тухай", href: "/#dealer", type: "anchor" },
];

export function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [dropOpen, setDropOpen] = useState(false);
  const [featured, setFeatured] = useState(0);
  const megaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mega/dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (megaRef.current && !megaRef.current.contains(e.target as Node)) {
        setMegaOpen(false);
        setDropOpen(false);
      }
    };
    if (megaOpen || dropOpen) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [megaOpen, dropOpen]);

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
                key={l.label}
                href={l.href}
                className={`text-sm font-medium transition-colors relative group ${
                  overHero ? "text-white/90 hover:text-white" : "text-[#54585F] hover:text-[#17181B]"
                }`}
              >
                {l.label}
                <span className="absolute -bottom-1.5 left-0 right-0 h-0.5 bg-[#E20A17] scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
              </Link>
            ) : l.type === "anchor" ? (
              <button
                key={l.label}
                onClick={() => handleAnchor(l.href)}
                className={`text-sm font-medium transition-colors relative group ${
                  overHero ? "text-white/90 hover:text-white" : "text-[#54585F] hover:text-[#17181B]"
                }`}
              >
                {l.label}
                <span className="absolute -bottom-1.5 left-0 right-0 h-0.5 bg-[#E20A17] scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
              </button>
            ) : (
              <div key={l.label} className="relative">
                <button
                  onClick={() => { setDropOpen((v) => !v); setMegaOpen(false); }}
                  className={`flex items-center gap-1 text-sm font-medium transition-colors relative ${
                    overHero ? "text-white/90 hover:text-white" : "text-[#54585F] hover:text-[#17181B]"
                  } ${dropOpen ? (overHero ? "text-white" : "text-[#17181B]") : ""}`}
                >
                  {l.label}
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${dropOpen ? "rotate-180" : ""}`} />
                  {dropOpen && <span className="absolute -bottom-1.5 left-0 right-0 h-0.5 bg-[#E20A17]" />}
                </button>
                {dropOpen && (
                  <div className="absolute top-full left-0 mt-3 min-w-[230px] bg-white rounded-xl border border-[#E7E7EA] shadow-xl py-2 z-50">
                    {l.items.map((it) =>
                      it.type === "route" ? (
                        <Link
                          key={it.label}
                          href={it.href}
                          onClick={() => setDropOpen(false)}
                          className="block px-4 py-2.5 text-sm font-medium text-[#54585F] hover:text-[#E20A17] hover:bg-[#F5F5F6] transition-colors"
                        >
                          {it.label}
                        </Link>
                      ) : (
                        <button
                          key={it.label}
                          onClick={() => { setDropOpen(false); handleAnchor(it.href); }}
                          className="block w-full text-left px-4 py-2.5 text-sm font-medium text-[#54585F] hover:text-[#E20A17] hover:bg-[#F5F5F6] transition-colors"
                        >
                          {it.label}
                        </button>
                      )
                    )}
                  </div>
                )}
              </div>
            )
          )}
        </nav>

        {/* Mobile menu toggle */}
        <button
          className={`lg:hidden p-2 ${overHero ? "text-white" : "text-[#17181B]"}`}
          onClick={() => setOpen(!open)}
          aria-label={open ? "Цэс хаах" : "Цэс нээх"}
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* ── Mega menu ── */}
      {megaOpen && (
        <div className="absolute top-full left-0 right-0 bg-white border-b border-[#E7E7EA] shadow-2xl">
          <div className="mx-auto w-[min(1280px,94vw)] grid lg:grid-cols-[1.55fr_1fr]">
            {/* Left — model grid */}
            <div className="py-9 pr-0 lg:pr-10">
              <div className="flex items-center justify-between mb-7">
                <p className="text-xs font-bold tracking-[0.2em] uppercase text-[#8A8F98]">
                  Бүх загвар
                </p>
                <button
                  onClick={() => setMegaOpen(false)}
                  className="lg:hidden p-1.5 rounded-lg hover:bg-[#F5F5F6] text-[#54585F] hover:text-[#17181B] transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-8">
                {ALL_MODELS_FOR_GRID.map((mm, i) => (
                  <Link
                    key={mm.id}
                    href={`/models/${mm.id}`}
                    onClick={() => setMegaOpen(false)}
                    onMouseEnter={() => setFeatured(i)}
                    className="group block"
                  >
                    <div className="relative aspect-[5/4] mb-2">
                      {mm.status === "coming-soon" && (
                        <span className="absolute top-0 left-0 z-10 text-[0.5rem] font-bold tracking-[0.14em] uppercase px-1.5 py-0.5 rounded bg-[#E20A17] text-white">
                          Шинэ
                        </span>
                      )}
                      <img
                        src={imgOf(mm)}
                        alt={mm.name}
                        className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
                        loading="lazy"
                      />
                    </div>
                    <p className="font-bold text-sm text-[#17181B] leading-tight group-hover:text-[#E20A17] transition-colors">
                      {mm.name}
                    </p>
                    <p className="text-xs text-[#54585F] mt-0.5">{priceOf(mm)}</p>
                  </Link>
                ))}
              </div>
            </div>

            {/* Right — featured panel */}
            <div className="hidden lg:flex relative flex-col justify-end bg-[#F5F5F6] rounded-l-2xl px-9 py-9 overflow-hidden min-h-[360px]">
              <button
                onClick={() => setMegaOpen(false)}
                className="absolute top-6 right-6 z-10 p-1.5 rounded-lg hover:bg-white text-[#54585F] hover:text-[#17181B] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="absolute inset-x-0 top-1/2 -translate-y-[58%] flex items-center justify-center px-6">
                <img
                  src={imgOf(ALL_MODELS_FOR_GRID[featured])}
                  alt={ALL_MODELS_FOR_GRID[featured]?.name}
                  className="w-full max-h-[230px] object-contain"
                />
              </div>
              <div className="relative">
                <h3 className="font-extrabold text-2xl text-[#17181B] tracking-tight">
                  {ALL_MODELS_FOR_GRID[featured]?.name}
                </h3>
                <p className="text-sm text-[#E20A17] font-semibold mt-1 mb-4">
                  {priceOf(ALL_MODELS_FOR_GRID[featured])}
                </p>
                <Link
                  href={`/models/${ALL_MODELS_FOR_GRID[featured]?.id}`}
                  onClick={() => setMegaOpen(false)}
                  className="inline-flex items-center gap-2 bg-[#E20A17] text-white px-6 py-3 rounded-full text-sm font-bold hover:bg-[#C00813] transition-colors"
                >
                  Дэлгэрэнгүй
                  <ChevronDown className="w-4 h-4 -rotate-90" />
                </Link>
              </div>
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
                  key={l.label}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="text-left py-3.5 font-medium text-[15px] text-[#17181B] border-b border-[#F0F0F1]"
                >
                  {l.label}
                </Link>
              ) : l.type === "anchor" ? (
                <button
                  key={l.label}
                  onClick={() => handleAnchor(l.href)}
                  className="text-left py-3.5 font-medium text-[15px] text-[#17181B] border-b border-[#F0F0F1]"
                >
                  {l.label}
                </button>
              ) : (
                <div key={l.label} className="py-3 border-b border-[#F0F0F1]">
                  <p className="text-[13px] font-bold tracking-wide uppercase text-[#8A8F98] mb-1">
                    {l.label}
                  </p>
                  {l.items.map((it) =>
                    it.type === "route" ? (
                      <Link
                        key={it.label}
                        href={it.href}
                        onClick={() => setOpen(false)}
                        className="block py-2 pl-3 font-medium text-[15px] text-[#17181B]"
                      >
                        {it.label}
                      </Link>
                    ) : (
                      <button
                        key={it.label}
                        onClick={() => handleAnchor(it.href)}
                        className="block w-full text-left py-2 pl-3 font-medium text-[15px] text-[#17181B]"
                      >
                        {it.label}
                      </button>
                    )
                  )}
                </div>
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
