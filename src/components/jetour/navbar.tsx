"use client";

import { useEffect, useState } from "react";
import { Menu, X, ChevronRight } from "lucide-react";
import { NAV_LINKS } from "@/lib/jetour-data";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
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

  const isHero = !scrolled;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isHero
          ? "bg-transparent"
          : "bg-white/95 backdrop-blur-xl shadow-sm border-b border-[#E2E7EF]"
      }`}
    >
      <div className="mx-auto w-[min(1280px,94vw)] flex items-center justify-between py-5">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="shrink-0"
          aria-label="JETOUR Mongolia — эхлэл рүү буцах"
        >
          <JetourLogo isHero={isHero} />
        </button>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-10">
          {NAV_LINKS.map((l) => (
            <button
              key={l.key}
              onClick={() => handleNav(l.href)}
              className={`font-display text-sm font-bold tracking-[0.18em] transition-colors relative group ${
                isHero ? "text-white hover:text-[#4DD0F5]" : "text-[#0A1F44] hover:text-[#00AEEF]"
              }`}
            >
              {l.label}
              <span className="absolute -bottom-1.5 left-0 right-0 h-px bg-[#00AEEF] scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={() => handleNav("#test-drive")}
            className="btn-electric-jetour hidden sm:inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs tracking-widest"
          >
            BOOK TEST DRIVE
            <ChevronRight className="w-3.5 h-3.5" />
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

      {/* Mobile drawer */}
      {open && (
        <div className="lg:hidden bg-[#0A1F44] text-white border-t border-white/10">
          <nav className="mx-auto w-[min(1280px,94vw)] py-4 flex flex-col gap-1">
            {NAV_LINKS.map((l) => (
              <button
                key={l.key}
                onClick={() => handleNav(l.href)}
                className="text-left py-4 px-2 font-display font-bold tracking-[0.18em] text-sm text-white/90 hover:text-[#4DD0F5] border-b border-white/10"
              >
                {l.label}
              </button>
            ))}
            <button
              onClick={() => handleNav("#test-drive")}
              className="btn-electric-jetour mt-3 py-3.5 rounded-full text-center text-xs tracking-widest"
            >
              BOOK TEST DRIVE
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}

function JetourLogo({ isHero }: { isHero: boolean }) {
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
          fontSize: "0.6rem",
          letterSpacing: "0.36em",
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
