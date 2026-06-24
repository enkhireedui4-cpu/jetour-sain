"use client";

import { useEffect, useState } from "react";
import { Menu, X, Phone, MapPin, Clock, Facebook, Instagram, Youtube, ChevronRight } from "lucide-react";
import { NAV_LINKS, CONTACT } from "@/lib/jetour-data";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = (href: string) => {
    setOpen(false);
    if (href === "#home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  // On hero (not scrolled): white text on dark hero
  // On scroll: dark text on white bg
  const isHero = !scrolled;

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* === Top Bar === */}
      <div
        className={`hidden md:block transition-all duration-300 ${
          isHero
            ? "bg-[#0A1F44]/80 backdrop-blur-md text-white"
            : "bg-[#0A1F44] text-white"
        }`}
      >
        <div className="mx-auto w-[min(1280px,94vw)] flex items-center justify-between py-2 text-xs">
          <div className="flex items-center gap-5">
            <a href={CONTACT.phone1Href} className="flex items-center gap-1.5 hover:text-[#4DD0F5] transition-colors">
              <Phone className="w-3 h-3" />
              <span className="font-semibold">{CONTACT.phone1}</span>
            </a>
            <span className="text-white/30">|</span>
            <a
              href={CONTACT.googleMap}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-[#4DD0F5] transition-colors max-w-[420px] truncate"
            >
              <MapPin className="w-3 h-3 shrink-0" />
              <span className="truncate">{CONTACT.address}</span>
            </a>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-white/70 hidden lg:flex items-center gap-1.5">
              <Clock className="w-3 h-3" />
              {CONTACT.hoursWeekday}
            </span>
            <span className="text-white/30 hidden lg:inline">|</span>
            <div className="flex items-center gap-2">
              <a href={CONTACT.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-[#4DD0F5] transition-colors" aria-label="Facebook">
                <Facebook className="w-3.5 h-3.5" />
              </a>
              <a href={CONTACT.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-[#4DD0F5] transition-colors" aria-label="Instagram">
                <Instagram className="w-3.5 h-3.5" />
              </a>
              <a href={CONTACT.youtube} target="_blank" rel="noopener noreferrer" className="hover:text-[#4DD0F5] transition-colors" aria-label="YouTube">
                <Youtube className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* === Main Nav === */}
      <div
        className={`transition-all duration-300 ${
          isHero
            ? "bg-transparent"
            : "bg-white/95 backdrop-blur-md shadow-sm border-b border-[#E2E7EF]"
        }`}
      >
        <div className="mx-auto w-[min(1280px,94vw)] flex items-center justify-between py-4">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="shrink-0"
            aria-label="JETOUR Mongolia — эхлэл рүү буцах"
          >
            <JetourLogoLight isHero={isHero} />
          </button>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((l) => (
              <button
                key={l.href}
                onClick={() => handleNav(l.href)}
                className={`font-display text-sm font-semibold tracking-wide transition-colors relative group ${
                  isHero ? "text-white hover:text-[#4DD0F5]" : "text-[#0A1F44] hover:text-[#00AEEF]"
                }`}
              >
                {l.label}
                <span className="absolute -bottom-1.5 left-0 right-0 h-0.5 bg-[#00AEEF] scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={() => handleNav("#test-drive")}
              className="btn-electric-jetour hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm"
            >
              Тест драйв
              <ChevronRight className="w-4 h-4" />
            </button>

            {/* Mobile toggle */}
            <button
              className={`lg:hidden p-2 ${isHero ? "text-white" : "text-[#0A1F44]"}`}
              onClick={() => setOpen(!open)}
              aria-label={open ? "Цэс хаах" : "Цэс нээх"}
            >
              {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="lg:hidden bg-[#0A1F44] text-white border-t border-white/10">
          <nav className="mx-auto w-[min(1280px,94vw)] py-4 flex flex-col gap-1">
            {NAV_LINKS.map((l) => (
              <button
                key={l.href}
                onClick={() => handleNav(l.href)}
                className="text-left py-3 px-2 font-display font-semibold text-white/90 hover:text-[#4DD0F5] border-b border-white/10"
              >
                {l.label}
              </button>
            ))}
            <a
              href={CONTACT.phone1Href}
              className="mt-3 flex items-center justify-center gap-2 py-3 rounded-full border border-white/20 text-white"
            >
              <Phone className="w-4 h-4 text-[#4DD0F5]" />
              <span className="font-display font-bold">{CONTACT.phone1}</span>
            </a>
            <button
              onClick={() => handleNav("#test-drive")}
              className="btn-electric-jetour mt-2 py-3 rounded-full text-center"
            >
              Тест драйв бүртгүүлэх
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}

function JetourLogoLight({ isHero }: { isHero: boolean }) {
  return (
    <div className="inline-flex flex-col leading-none">
      <span
        className="font-display font-extrabold italic tracking-tight text-2xl"
        style={{ letterSpacing: "-0.02em", color: isHero ? "#FFFFFF" : "#0A1F44" }}
      >
        JETOUR
      </span>
      <span
        className="font-display font-bold not-italic mt-1"
        style={{
          fontSize: "0.62rem",
          letterSpacing: "0.34em",
          background: "linear-gradient(92deg, #00AEEF, #4DD0F5)",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          color: "transparent",
        }}
      >
        MONGOLIA
      </span>
    </div>
  );
}
