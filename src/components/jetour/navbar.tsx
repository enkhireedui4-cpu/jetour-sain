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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-ink/96 backdrop-blur-md border-b border-line"
          : "bg-gradient-to-b from-ink/92 to-transparent"
      }`}
    >
      <div className="mx-auto w-[min(1180px,92vw)] flex items-center justify-between py-3.5">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="shrink-0"
          aria-label="JETOUR Mongolia — эхлэл рүү буцах"
        >
          <JetourLogo size="md" />
        </button>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-7">
          {NAV_LINKS.map((l) => (
            <button
              key={l.href}
              onClick={() => handleNav(l.href)}
              className="font-display text-[0.82rem] font-semibold tracking-wide text-chrome hover:text-paper transition-colors relative group"
            >
              {l.label}
              <span className="absolute -bottom-1 left-0 right-0 h-px bg-gradient-to-r from-jetour-red to-jetour-blue scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={CONTACT.phoneHref}
            className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full border border-line glass text-paper hover:border-jetour-red/60 transition-colors group"
          >
            <Phone className="w-3.5 h-3.5 text-jetour-red group-hover:scale-110 transition-transform" />
            <span className="font-display text-xs font-bold tracking-wider">
              {CONTACT.phone}
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
            className="lg:hidden p-2 text-paper"
            onClick={() => setOpen(!open)}
            aria-label={open ? "Цэс хаах" : "Цэс нээх"}
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="lg:hidden bg-ink/98 backdrop-blur-md border-t border-line">
          <nav className="mx-auto w-[min(1180px,92vw)] py-4 flex flex-col gap-1">
            {NAV_LINKS.map((l) => (
              <button
                key={l.href}
                onClick={() => handleNav(l.href)}
                className="text-left py-3 px-2 font-display font-semibold text-chrome hover:text-paper border-b border-line/60"
              >
                {l.label}
              </button>
            ))}
            <a
              href={CONTACT.phoneHref}
              className="mt-3 flex items-center justify-center gap-2 py-3 rounded-full border border-line glass"
            >
              <Phone className="w-4 h-4 text-jetour-red" />
              <span className="font-display font-bold">{CONTACT.phone}</span>
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
