"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X, Phone, ChevronDown, ArrowRight } from "lucide-react";
import { CONTACT } from "@/lib/jetour-data";
import { modelMenuImage } from "@/lib/model-media";
import { openQuickLead } from "@/components/jetour/quick-lead";

type RouteNavItem = { label: string; href: string; type: "route" };
type AnchorNavItem = { label: string; href: string; type: "anchor" };
type DropdownNavItem = {
  label: string;
  type: "dropdown";
  items: Array<RouteNavItem | AnchorNavItem>;
};
type NavItem = RouteNavItem | AnchorNavItem | DropdownNavItem;

const NAV_LINKS: NavItem[] = [
  { label: "Тусгай саналууд", href: "/special-offers", type: "route" },
  {
    label: "Бидний тухай",
    type: "dropdown",
    items: [
      { label: "Брэнд", href: "/brand", type: "route" },
      { label: "Дилер", href: "/dealer", type: "route" },
    ],
  },
  {
    label: "Худалдан авагчдад",
    type: "dropdown",
    items: [
      { label: "Туршилтын жолоодлого", href: "/#dealer", type: "anchor" },
      { label: "Үйлчилгээ ба баталгаа", href: "/owners", type: "route" },
    ],
  },
  { label: "Мэдээ", href: "/news", type: "route" },
];

/** "Загварууд"-ын дэд цэсийг `openMenu`-д нэрлэх түлхүүр */
const MODELS_MENU = "Загварууд";

/* `heroImage` нь `modelMenuImage`-ын нөөц зам — тусгай cutout байхгүй загварт
   hero рүү унана, зураггүй нүх үлдэхгүй. */
type NavModel = { id: string; name: string; heroImage: string };

/** Дэд цэсний идэвхтэй хуудсыг тодруулах — тухайн route дотор байгаа эсэх */
const isActiveRoute = (pathname: string, href: string) =>
  href !== "/" && !href.startsWith("/#") && pathname.startsWith(href);

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  /* "Загварууд"-ын дэд цэсний жагсаалт. `/api/public/models` нь яг nav/footer/
     lead-форм гуравт зориулсан хөнгөн хариулт бөгөөд 10 минут кэштэй тул
     footer-тэй ижил хүсэлт хөтчийн кэшээс шууд ирнэ. */
  const [navModels, setNavModels] = useState<NavModel[]>([]);
  // Гадна дарахад цэс хаахад ашиглана
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("/api/public/models")
      .then((r) => r.json())
      .then((d) => {
        if (d?.ok) setNavModels(d.models);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Route солигдоход бүх цэсийг хаана. Effect дотор биш, render үед шууд тохируулна
  // (React-ийн "prop солигдоход state-ээ зохицуулах" хэв маяг) — ингэснээр цэс
  // хаагдсан хувилбар нь нэг ч удаа зурагдахгүй, cascading render гарахгүй.
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setOpen(false);
    setOpenMenu(null);
  }

  // Гадна дарахад — хаана
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenMenu(null);
      }
    };
    if (openMenu) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [openMenu]);

  // Escape дарахад — хаана (keyboard accessibility)
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
            setOpenMenu(null);
        setOpen(false);
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  /* Hero дээрх тунгалаг төрх — дэд цэс НЭЭГДЭХЭД цуцлагдана.
     Үгүй бол цагаан үсэгтэй тунгалаг navbar-ын доор цагаан самбар нээгдэж,
     хоёр давхарга зөрчилдөж, цэсний нэрс уншигдахаа больдог байв. */
  const overHero = isHome && !scrolled && !open && !openMenu;

  const handleAnchor = (href: string) => {
    setOpen(false);
    if (!href.startsWith("/#")) return;
    const hash = href.slice(1);
    if (window.location.pathname === "/") {
      const el = document.querySelector(hash);
      if (el) el.scrollIntoView({ behavior: "smooth" });
      else window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      router.push(href);
    }
  };

  const linkBase = overHero
    ? "text-white/90 hover:text-white"
    : "text-[#54585F] hover:text-[#17181B]";
  const linkActive = overHero ? "text-white" : "text-[#17181B]";

  return (
    <header
      ref={navRef}
      onMouseLeave={() => setOpenMenu(null)}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        overHero
          ? "bg-transparent"
          : "bg-white/95 backdrop-blur-xl border-b border-[#E7E7EA] shadow-[0_4px_20px_-14px_rgba(23,24,27,0.3)]"
      }`}
    >
      <div className="container-page flex items-center justify-between h-16 gap-4">
        {/* Logo */}
        <Link
          href="/"
          onClick={() => setOpen(false)}
          className="shrink-0"
          aria-label="JETOUR — Sain Motors, нүүр хуудас"
        >
          <JetourLogo overHero={overHero} />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-7" aria-label="Үндсэн цэс">
          {/* Загварууд — хүрэхэд бүтэн өргөнтэй самбар нээгдэж, загвар бүр
              зураг + нэрээрээ гарна (үнэ, тайлбар байхгүй — зөвхөн таних).
              Товч нь ХОЛБООС хэвээр: дарвал /models руу очно.

              Самбар нь энэ жижиг блокийн ДОТОР биш, `<header>`-ийн шууд хүүхэд
              болж доор рендерлэгдэнэ — үгүй бол бүтэн өргөн авч чадахгүй.
              Хаах нь `<header>`-ийн `onMouseLeave` дээр: самбар нь header-ийн
              DOM удам тул түүн рүү орох үед mouseleave АСАХГҮЙ. */}
          <div className="relative" onMouseEnter={() => setOpenMenu(MODELS_MENU)}>
            <Link
              href="/models"
              aria-current={pathname.startsWith("/models") ? "page" : undefined}
              aria-expanded={openMenu === MODELS_MENU}
              aria-haspopup="true"
              className={`flex items-center gap-1 text-sm font-medium transition-colors relative group py-5 ${linkBase} ${
                pathname.startsWith("/models") || openMenu === MODELS_MENU ? linkActive : ""
              }`}
            >
              Загварууд
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-200 ${
                  openMenu === MODELS_MENU ? "rotate-180" : ""
                }`}
              />
              <span
                className={`absolute bottom-3.5 left-0 right-4 h-0.5 bg-[#E20A17] transition-transform origin-left ${
                  pathname.startsWith("/models") || openMenu === MODELS_MENU
                    ? "scale-x-100"
                    : "scale-x-0 group-hover:scale-x-100"
                }`}
              />
            </Link>

          </div>

          {NAV_LINKS.map((l) =>
            l.type === "route" ? (
              <Link
                key={l.label}
                href={l.href}
                aria-current={isActiveRoute(pathname, l.href) ? "page" : undefined}
                className={`text-sm font-medium transition-colors relative group py-5 ${linkBase} ${
                  isActiveRoute(pathname, l.href) ? linkActive : ""
                }`}
              >
                {l.label}
                <span
                  className={`absolute bottom-3.5 left-0 right-0 h-0.5 bg-[#E20A17] transition-transform origin-left ${
                    isActiveRoute(pathname, l.href)
                      ? "scale-x-100"
                      : "scale-x-0 group-hover:scale-x-100"
                  }`}
                />
              </Link>
            ) : l.type === "anchor" ? (
              <button
                key={l.label}
                onClick={() => handleAnchor(l.href)}
                className={`text-sm font-medium transition-colors relative group py-5 ${linkBase}`}
              >
                {l.label}
                <span className="absolute bottom-3.5 left-0 right-0 h-0.5 bg-[#E20A17] scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
              </button>
            ) : (
              <div
                key={l.label}
                className="relative"
                onMouseEnter={() => setOpenMenu(l.label)}
                onMouseLeave={() => setOpenMenu((v) => (v === l.label ? null : v))}
              >
                <button
                  onClick={() => setOpenMenu((v) => (v === l.label ? null : l.label))}
                  aria-expanded={openMenu === l.label}
                  aria-haspopup="true"
                  className={`flex items-center gap-1 text-sm font-medium transition-colors relative py-5 ${linkBase} ${
                    openMenu === l.label || l.items.some((it) => isActiveRoute(pathname, it.href))
                      ? linkActive
                      : ""
                  }`}
                >
                  {l.label}
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${openMenu === l.label ? "rotate-180" : ""}`} />
                  {(openMenu === l.label || l.items.some((it) => isActiveRoute(pathname, it.href))) && (
                    <span className="absolute bottom-3.5 left-0 right-4 h-0.5 bg-[#E20A17]" />
                  )}
                </button>
                {openMenu === l.label && (
                  <div className="absolute top-full left-0 -mt-2 min-w-[240px] bg-white rounded-xl border border-[#E7E7EA] shadow-[0_20px_50px_-20px_rgba(23,24,27,0.25)] py-2 z-50">
                    {l.items.map((it) =>
                      it.type === "route" ? (
                        <Link
                          key={it.label}
                          href={it.href}
                          onClick={() => setOpenMenu(null)}
                          aria-current={isActiveRoute(pathname, it.href) ? "page" : undefined}
                          className={`block px-4 py-2.5 text-sm font-medium transition-colors ${
                            isActiveRoute(pathname, it.href)
                              ? "text-[#E20A17] bg-[#F5F5F6]"
                              : "text-[#54585F] hover:text-[#E20A17] hover:bg-[#F5F5F6]"
                          }`}
                        >
                          {it.label}
                        </Link>
                      ) : (
                        <button
                          key={it.label}
                          onClick={() => { setOpenMenu(null); handleAnchor(it.href); }}
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

        {/* Desktop CTA — хурдан хүсэлтийн цонх нээнэ. Бүтэн маягт
            /info-request-д хэвээр байгаа; энд зөвхөн нэр, утас асууна. */}
        <button
          type="button"
          onClick={openQuickLead}
          className={`hidden lg:inline-flex items-center gap-1.5 text-sm font-semibold px-5 py-2.5 rounded-full transition-colors shrink-0 ${
            overHero
              ? "bg-white/10 border border-white/50 text-white backdrop-blur-sm hover:bg-white hover:text-[#17181B]"
              : "bg-[#E20A17] text-white hover:bg-[#C00813]"
          }`}
        >
          Хүсэлт үлдээх
        </button>

        {/* Mobile menu toggle */}
        <button
          /* Хүрэлтийн бай 44×44 (WCAG 2.5.8) — өмнө 40px байв. `-mr-2.5` нь
             нэмсэн зайг гадагш нөхөж, дүрсний оптик байрлалыг хөндөхгүй. */
          className={`lg:hidden grid place-items-center h-11 w-11 -mr-2.5 ${
            overHero ? "text-white" : "text-[#17181B]"
          }`}
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-label={open ? "Цэс хаах" : "Цэс нээх"}
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* ── Mega menu — загваруудын хэвтээ эгнээ ──
          Зөвхөн зураг + нэр. Үнэ, тайлбар байхгүй: энэ нь навигаци, каталог биш.
          `<header>`-ийн шууд хүүхэд тул бүтэн өргөн авна. */}
      {openMenu === MODELS_MENU && navModels.length > 0 && (
        <div className="hidden lg:block absolute top-full left-0 right-0 bg-white border-t border-[#E7E7EA] shadow-[0_24px_50px_-24px_rgba(23,24,27,0.28)]">
          {/* Цомхон: найман загвар ҮРГЭЛЖ нэг эгнээнд. Самбар нь `lg`-ээс дээш л
              гарах тул хамгийн нарийн тохиолдол 1024px — тэнд ч нэг нүд ~120px
              болж, нэр (11px) багтана. Хоёр эгнээ болговол өндөр 305px хүрч,
              нүүр рүү харах замыг бөглөж эхэлдэг. */}
          <div className="container-page py-5">
            <ul className="grid grid-cols-8 gap-x-3 gap-y-4">
              {navModels.map((m) => {
                const active = pathname === `/models/${m.id}`;
                return (
                  <li key={m.id}>
                    <Link
                      href={`/models/${m.id}`}
                      onClick={() => setOpenMenu(null)}
                      aria-current={active ? "page" : undefined}
                      className="group flex flex-col items-center gap-1.5 rounded-lg px-1 py-1.5 transition-colors hover:bg-[#F5F5F6]"
                    >
                      {/* `side.png` нь ~2.6–3.2 харьцаатай. Нүдийг 3:1 болгосон нь
                          хамгийн өргөн машиныг багтаах ба доогуур нь хоосон зай
                          үлдээхгүй — самбар нам, цомхон болно. */}
                      <span className="relative block w-full aspect-[3/1]">
                        <Image
                          src={modelMenuImage(m)}
                          alt=""
                          fill
                          sizes="(min-width: 1280px) 12vw, (min-width: 1024px) 24vw, 0px"
                          className="object-contain transition-transform duration-300 group-hover:scale-[1.06]"
                        />
                      </span>
                      <span
                        className={`text-[11px] font-bold uppercase tracking-[0.06em] whitespace-nowrap transition-colors ${
                          active ? "text-[#E20A17]" : "text-[#17181B] group-hover:text-[#E20A17]"
                        }`}
                      >
                        {m.name.replace(/^JETOUR\s+/, "")}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      )}

      {/* Mobile drawer */}
      {open && (
        <div className="lg:hidden bg-white border-t border-[#E7E7EA] shadow-lg max-h-[calc(100vh-4rem)] overflow-y-auto">
          <nav className="container-page py-3 flex flex-col" aria-label="Мобайл цэс">
            {/* Загварууд — дарахад ЭНД задарч, машинууд хоёр баганаар гарна.
                Хуудас руу үсрэхийн оронд цэсэн дотроо сонгоно: хэрэглэгч нэг
                товшилтоор хүссэн загвар руугаа шууд очно.

                Хүрэлтийн бай: нүд бүр ~90×160px (≥48dp), хооронд 12px зай —
                мобайлын хүрэлтийн шаардлагаас дээгүүр. */}
            <button
              type="button"
              onClick={() => setOpenMenu((v) => (v === MODELS_MENU ? null : MODELS_MENU))}
              aria-expanded={openMenu === MODELS_MENU}
              aria-controls="mobile-models"
              className={`py-3.5 font-medium text-[15px] border-b border-[#F0F0F1] flex items-center justify-between w-full text-left ${
                pathname.startsWith("/models") || openMenu === MODELS_MENU
                  ? "text-[#E20A17]"
                  : "text-[#17181B]"
              }`}
            >
              Загварууд
              <ChevronDown
                className={`w-4 h-4 text-[#6B7280] transition-transform duration-200 ${
                  openMenu === MODELS_MENU ? "rotate-180" : ""
                }`}
              />
            </button>

            {openMenu === MODELS_MENU && navModels.length > 0 && (
              <ul id="mobile-models" className="grid grid-cols-2 gap-3 py-4 border-b border-[#F0F0F1]">
                {navModels.map((m) => {
                  const active = pathname === `/models/${m.id}`;
                  return (
                    <li key={m.id}>
                      <Link
                        href={`/models/${m.id}`}
                        onClick={() => {
                          setOpen(false);
                          setOpenMenu(null);
                        }}
                        aria-current={active ? "page" : undefined}
                        className="flex flex-col items-center gap-1.5 rounded-lg px-2 py-3 active:bg-[#F5F5F6]"
                      >
                        <span className="relative block w-full aspect-[3/1]">
                          <Image
                            src={modelMenuImage(m)}
                            alt=""
                            fill
                            sizes="(max-width: 1023px) 44vw, 0px"
                            className="object-contain"
                          />
                        </span>
                        <span
                          className={`text-[12px] font-bold uppercase tracking-[0.06em] whitespace-nowrap ${
                            active ? "text-[#E20A17]" : "text-[#17181B]"
                          }`}
                        >
                          {m.name.replace(/^JETOUR\s+/, "")}
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            )}

            {NAV_LINKS.map((l) =>
              l.type === "route" ? (
                <Link
                  key={l.label}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  aria-current={isActiveRoute(pathname, l.href) ? "page" : undefined}
                  className={`py-3.5 font-medium text-[15px] border-b border-[#F0F0F1] flex items-center justify-between ${
                    isActiveRoute(pathname, l.href) ? "text-[#E20A17]" : "text-[#17181B]"
                  }`}
                >
                  {l.label}
                  <ArrowRight className="w-4 h-4 text-[#C5C8CC]" />
                </Link>
              ) : l.type === "anchor" ? (
                <button
                  key={l.label}
                  onClick={() => handleAnchor(l.href)}
                  className="text-left py-3.5 font-medium text-[15px] text-[#17181B] border-b border-[#F0F0F1] flex items-center justify-between"
                >
                  {l.label}
                  <ArrowRight className="w-4 h-4 text-[#C5C8CC]" />
                </button>
              ) : (
                <div key={l.label} className="py-3 border-b border-[#F0F0F1]">
                  <p className="text-[13px] font-bold tracking-wide uppercase text-[#6B7280] mb-1">
                    {l.label}
                  </p>
                  {l.items.map((it) =>
                    it.type === "route" ? (
                      <Link
                        key={it.label}
                        href={it.href}
                        onClick={() => setOpen(false)}
                        className={`block py-2 pl-3 font-medium text-[15px] ${
                          isActiveRoute(pathname, it.href) ? "text-[#E20A17]" : "text-[#17181B]"
                        }`}
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
            {/* Утасны дугаар энд БАЙХГҮЙ: хөвөгч улаан товч нь сайтын тогтмол
                холбогдох цэг тул цэсэнд давтахгүй. Энэ товч нь хурдан хүсэлт. */}
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                openQuickLead();
              }}
              className="btn-electric-jetour mt-2 mb-4 py-3.5 rounded-full text-center text-sm"
            >
              Хүсэлт үлдээх
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
      {/* Хуваах зураас — өмнө нь хэт бүдэг байв (#E7E7EA нь цагаан дээр бараг
          үзэгдэхгүй, hero дээр 0.25 alpha ч мөн). Хоёр брэндийг тусгаарлах
          үүргээ биелүүлэхийн тулд тодруулав. */}
      <span
        className="w-px self-stretch"
        style={{ background: overHero ? "rgba(255,255,255,0.45)" : "#C9CCD1" }}
      />
      {/* SAIN нь 24px байсныг 26px болгов. JETOUR-ийн 28px-тай ТЭНЦҮҮ болгосонгүй:
          JETOUR нь брэнд, SAIN нь дистрибьютор тул бага зэргийн шатлал үлдэнэ. */}
      <img
        src={overHero ? "/logos/sain-motors-logo.png" : "/logos/sain-motors-black.png"}
        alt="Sain Motors"
        className="h-[26px] w-auto"
      />
    </div>
  );
}
