"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight, Calendar } from "lucide-react";
import { SPECIAL_OFFERS } from "@/lib/jetour-data";
import { Navbar } from "@/components/jetour/navbar";
import { Footer } from "@/components/jetour/contact";
import { EnhancedLeadForm } from "@/components/jetour/enhanced-lead-form";

export default function OfferDetailClient({ id }: { id: string }) {
  const offer = SPECIAL_OFFERS.find((o) => o.id === id);

  if (!offer) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white text-[#17181B]">
        <div className="text-center">
          <h1 className="font-extrabold text-3xl mb-4">Санал олдсонгүй</h1>
          <Link href="/special-offers" className="text-[#E20A17] font-semibold">
            Бүх санал руу буцах
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-[#17181B]">
      <Navbar />
      <div className="h-16" />

      {/* Back link */}
      <div className="mx-auto w-[min(1280px,94vw)] pt-6">
        <Link
          href="/special-offers"
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#54585F] hover:text-[#E20A17] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Тусгай саналууд
        </Link>
      </div>

      {/* Hero poster — бүтэн постер, том, таслалгүй */}
      <section className="pt-4 pb-10">
        <div className="mx-auto w-[min(1100px,94vw)]">
          <img
            src={offer.poster}
            alt={offer.title}
            className="w-full h-auto rounded-2xl shadow-sm"
          />
        </div>
      </section>

      {/* Detail body */}
      <section className="pb-14">
        <div className="mx-auto w-[min(1280px,94vw)] grid lg:grid-cols-[1.4fr_1fr] gap-10 lg:gap-16">
          <div>
            <h1 className="font-extrabold tracking-tight text-[#17181B] text-2xl lg:text-4xl leading-tight mb-3">
              {offer.title}
            </h1>
            <p className="flex items-center gap-1.5 text-sm text-[#8A8F98] mb-5">
              <Calendar className="w-4 h-4" />
              {offer.date}
            </p>
            {offer.price && (
              <div className="mb-8">
                <span className="block text-xs font-bold tracking-[0.18em] uppercase text-[#8A8F98] mb-1">
                  Үндсэн үнэ
                </span>
                <span className="text-2xl lg:text-3xl font-extrabold text-[#E20A17]">
                  {offer.price}
                </span>
              </div>
            )}
            <div className="space-y-4">
              {offer.body.map((p, i) => (
                <p key={i} className="text-[#54585F] text-base leading-relaxed">
                  {p}
                </p>
              ))}
            </div>
            <button
              onClick={() =>
                document.querySelector("#lead-form")?.scrollIntoView({ behavior: "smooth" })
              }
              className="inline-flex items-center gap-2 bg-[#E20A17] text-white px-7 py-3.5 rounded-lg text-sm font-bold hover:bg-[#17181B] transition-colors mt-8"
            >
              Хүсэлт үлдээх
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          <div className="lg:pt-2">
            <p className="text-[#17181B] text-lg leading-relaxed font-medium">{offer.tagline}</p>
          </div>
        </div>
      </section>

      {/* Spec table */}
      {offer.specs && offer.specs.length > 0 && (
        <section className="pb-14">
          <div className="mx-auto w-[min(1280px,94vw)]">
            <h2 className="font-extrabold tracking-tight text-[#17181B] text-2xl lg:text-3xl mb-6">
              Техникийн үзүүлэлт
            </h2>
            <div className="overflow-hidden rounded-2xl border border-[#E7E7EA]">
              <table className="w-full text-sm">
                <tbody>
                  {offer.specs.map((s, i) => (
                    <tr
                      key={s.label}
                      className={i % 2 === 0 ? "bg-[#F5F5F6]" : "bg-white"}
                    >
                      <td className="px-5 py-3.5 font-semibold text-[#17181B] align-top w-[42%] sm:w-[32%] border-b border-[#E7E7EA]">
                        {s.label}
                      </td>
                      <td className="px-5 py-3.5 text-[#54585F] border-b border-[#E7E7EA]">
                        {s.value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      {/* Lead form */}
      <section id="lead-form" className="bg-[#F5F5F6] py-16 lg:py-20 border-t border-[#E7E7EA] scroll-mt-20">
        <div className="mx-auto w-[min(1280px,94vw)] grid lg:grid-cols-[0.8fr_1.2fr] gap-10 lg:gap-14 items-start">
          <div>
            <h2 className="font-extrabold tracking-tight text-[#17181B] text-3xl lg:text-4xl mb-4">
              Санал хүсэлт
            </h2>
            <p className="text-[#54585F] text-base leading-relaxed max-w-sm">
              Маягтыг илгээхийн тулд мэдээллээ бөглөж, зааврыг дагана уу. Манай баг тантай
              удахгүй холбогдоно.
            </p>
          </div>
          <EnhancedLeadForm
            type="info-request"
            variant="white"
            title="Санал хүсэлт"
            subtitle={`${offer.modelName} — таатай нөхцөлөөр`}
            modelName={offer.modelName}
            showDateField={false}
            showTimeField={false}
            showEmailField={false}
            submitLabel="Илгээх"
          />
        </div>
      </section>

      <Footer />
    </div>
  );
}
