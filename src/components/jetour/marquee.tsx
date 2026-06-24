"use client";

// Brand marquee — Sain Motors' other distributor brands
const BRANDS = ["JETOUR", "SOUEAST", "CHERY", "BYD", "RIDDARA", "AITO", "212", "BESTUNE", "RELY", "MAXUS"];

export function BrandMarquee() {
  return (
    <section className="relative py-12 border-y border-[#E5E9F0] bg-white overflow-hidden">
      <div className="mx-auto w-[min(1280px,94vw)] mb-6 text-center">
        <p className="eyebrow" style={{ color: "#8A93A6" }}>
          <span style={{ color: "#E2231A" }}>+</span> Сайн Моторс — албан ёсны төлөөлөгч
        </p>
      </div>

      <div className="relative overflow-hidden">
        {/* fade edges */}
        <div
          className="absolute left-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
          style={{ background: "linear-gradient(90deg, #FFFFFF, transparent)" }}
        />
        <div
          className="absolute right-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
          style={{ background: "linear-gradient(270deg, #FFFFFF, transparent)" }}
        />

        <div className="flex animate-[marquee_28s_linear_infinite] gap-10 whitespace-nowrap">
          {[...BRANDS, ...BRANDS, ...BRANDS].map((b, i) => (
            <span
              key={`${b}-${i}`}
              className="font-display font-extrabold italic text-2xl lg:text-3xl text-[#5B6477]/30 hover:text-[#0B0F1A] transition-colors cursor-default"
            >
              {b}
              <span style={{ color: "#E2231A" }} className="mx-2">·</span>
            </span>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
      `}</style>
    </section>
  );
}
