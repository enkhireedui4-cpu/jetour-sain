import Link from "next/link";
import {
  ArrowRight,
  Shield,
  Package,
  Cpu,
  ShieldCheck,
  Compass,
  Wrench,
} from "lucide-react";
import { SPECIAL_OFFERS, ADVANTAGES } from "@/lib/jetour-data";

// Server component — framer-motion ашиглахгүй, хөнгөн (нүүрний performance)

const ADV_ICONS: Record<string, React.ReactNode> = {
  shield: <Shield className="w-6 h-6" />,
  package: <Package className="w-6 h-6" />,
  cpu: <Cpu className="w-6 h-6" />,
  "shield-check": <ShieldCheck className="w-6 h-6" />,
  compass: <Compass className="w-6 h-6" />,
  wrench: <Wrench className="w-6 h-6" />,
};

/** Нүүрний "Тусгай саналууд" — 4 картын цомхон тууз */
export function OffersStrip() {
  return (
    <section className="bg-[#F5F5F6] border-y border-[#E7E7EA] py-16 lg:py-20">
      <div className="mx-auto w-[min(1280px,94vw)]">
        <div className="flex items-end justify-between gap-4 mb-8">
          <div>
            <p className="eyebrow eyebrow-electric mb-2">Тусгай саналууд</p>
            <h2 className="font-extrabold tracking-tight text-[#17181B] text-3xl lg:text-4xl">
              Энэ сарын онцлох санал
            </h2>
          </div>
          <Link
            href="/special-offers"
            className="hidden sm:inline-flex items-center gap-1.5 text-sm font-bold text-[#E20A17] hover:gap-2.5 transition-all shrink-0"
          >
            Бүх санал
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
          {SPECIAL_OFFERS.map((o) => (
            <Link
              key={o.id}
              href={`/special-offers/${o.id}`}
              className="group block bg-white rounded-2xl overflow-hidden border border-[#E7E7EA] hover:border-[#E20A17] hover:shadow-lg transition-all"
            >
              <div className="aspect-square overflow-hidden bg-[#0E0E10]">
                <img
                  src={o.poster}
                  alt={o.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="p-4">
                <p className="font-bold text-sm text-[#17181B] leading-snug group-hover:text-[#E20A17] transition-colors line-clamp-2">
                  {o.title}
                </p>
                {o.price && (
                  <p className="text-xs text-[#54585F] mt-1.5">
                    Үнэ: <span className="font-bold text-[#17181B]">{o.price}</span>
                  </p>
                )}
              </div>
            </Link>
          ))}
        </div>

        <Link
          href="/special-offers"
          className="sm:hidden mt-6 inline-flex items-center gap-1.5 text-sm font-bold text-[#E20A17]"
        >
          Бүх санал
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
}

/** "Яагаад SAIN MOTORS?" — 6 давуу тал */
export function Advantages() {
  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="mx-auto w-[min(1280px,94vw)]">
        <p className="eyebrow eyebrow-electric mb-2">Яагаад бид?</p>
        <h2 className="font-extrabold tracking-tight text-[#17181B] text-3xl lg:text-4xl mb-10">
          Албан ёсны дистрибьютерийн давуу тал
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {ADVANTAGES.map((a) => (
            <div
              key={a.title}
              className="rounded-2xl border border-[#E7E7EA] p-6 hover:border-[#E20A17]/40 hover:shadow-md transition-all"
            >
              <span className="w-12 h-12 grid place-items-center rounded-xl bg-[#E20A17]/10 text-[#E20A17] mb-4">
                {ADV_ICONS[a.icon] ?? <Shield className="w-6 h-6" />}
              </span>
              <h3 className="font-bold text-base text-[#17181B] mb-1.5">{a.title}</h3>
              <p className="text-sm text-[#54585F] leading-relaxed">{a.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
