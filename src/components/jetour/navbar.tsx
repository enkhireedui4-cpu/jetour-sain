"use client";

import { useEffect, useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import { JetourLogo } from "./logo";
import { NAV_LINKS, CONTACT } from "@/lib/jetour-data";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = (href: string) => {
    setOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`navbar-light fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "shadow-sm" : ""
      }`}
    >
      <div className="mx-auto w-[min(1280px,94vw)] flex items-center justify-between py-3.5">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="shrink-0"
          aria-label="JETOUR Mongolia — эхлэл рүү буцах"
        >
          <JetourLogoLight />
        </button>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-7">
          {NAV_LINKS.map((l) => (
            <button
              key={l.href}
              onClick={() => handleNav(l.href)}
              className="font-display text-[0.82rem] font-semibold tracking-wide text-[#5B6477] hover:text-[#0B0F1A] transition-colors relative group"
            >
              {l.label}
              <span className="absolute -bottom-1 left-0 right-0 h-px bg-gradient-to-r from-[#E2231A] to-[#2B6FE0] scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={CONTACT.phone1Href}
            className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full border border-[#E5E9F0] bg-white text-[#0B0F1A] hover:border-[#E2231A]/60 transition-colors group"
          >
            <Phone className="w-3.5 h-3.5 text-[#E2231A] group-hover:scale-110 transition-transform" />
            <span className="font-display text-xs font-bold tracking-wider text-[#0B0F1A]">
              {CONTACT.phone1}
            </span>
          </a>
          <button
            onClick={() => handleNav("#contact")}
            className="btn-jetour hidden sm:inline-block px-5 py-2.5 rounded-full text-sm"
          >
            Холбогдох
          </button>

          {/* Mobile toggle */}
          <button
            className="lg:hidden p-2 text-[#0B0F1A]"
            onClick={() => setOpen(!open)}
            aria-label={open ? "Цэс хаах" : "Цэс нээх"}
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="lg:hidden bg-white border-t border-[#E5E9F0]">
          <nav className="mx-auto w-[min(1280px,94vw)] py-4 flex flex-col gap-1">
            {NAV_LINKS.map((l) => (
              <button
                key={l.href}
                onClick={() => handleNav(l.href)}
                className="text-left py-3 px-2 font-display font-semibold text-[#5B6477] hover:text-[#0B0F1A] border-b border-[#E5E9F0]/60"
              >
                {l.label}
              </button>
            ))}
            <a
              href={CONTACT.phone1Href}
              className="mt-3 flex items-center justify-center gap-2 py-3 rounded-full border border-[#E5E9F0] bg-white"
            >
              <Phone className="w-4 h-4 text-[#E2231A]" />
              <span className="font-display font-bold text-[#0B0F1A]">{CONTACT.phone1}</span>
            </a>
            <button
              onClick={() => handleNav("#contact")}
              className="btn-jetour mt-2 py-3 rounded-full text-center"
            >
              Холбогдох
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}

function JetourLogoLight() {
  return (
    <div className="inline-flex flex-col leading-none">
      <span
        className="font-display font-extrabold italic tracking-tight text-2xl text-[#0B0F1A]"
        style={{ letterSpacing: "-0.02em" }}
      >
        JETOUR
      </span>
      <span
        className="font-display font-bold not-italic mt-1"
        style={{
          fontSize: "0.62rem",
          letterSpacing: "0.34em",
          background: "linear-gradient(92deg, #E2231A, #2B6FE0)",
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
