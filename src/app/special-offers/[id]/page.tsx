"use client";

import { use } from "react";
import Link from "next/link";
import { ArrowLeft, Calendar } from "lucide-react";
import { SPECIAL_OFFERS } from "@/lib/jetour-data";
import { Navbar } from "@/components/jetour/navbar";
import { Footer } from "@/components/jetour/contact";
import { EnhancedLeadForm } from "@/components/jetour/enhanced-lead-form";

export default function OfferDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
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

      {/* Hero poster */}
      <section className="pt-6 pb-10">
        <div className="mx-auto w-[min(1280px,94vw)]">
          <div className="w-full rounded-2xl overflow-hidden bg-[#0E0E10] flex items-center justify-center">
            <img
              src={offer.poster}
              alt={offer.title}
              className="w-full h-auto max-h-[78vh] object-contain"
            />
          </div>
        </div>
      </section>

      {/* Detail body */}
      <section className="pb-14">
        <div className="mx-auto w-[min(1280px,94vw)] grid lg:grid-cols-[1.4fr_1fr] gap-10 lg:gap-16">
          <div>
            <h1 className="font-extrabold tracking-tight text-[#17181B] text-2xl lg:text-4xl leading-tight mb-3">
              {offer.title}
            </h1>
            <p className="flex items-center gap-1.5 text-sm text-[#8A8F98] mb-8">
              <Calendar className="w-4 h-4" />
              {offer.date}
            </p>
            <div className="space-y-4">
              {offer.body.map((p, i) => (
                <p key={i} className="text-[#54585F] text-base leading-relaxed">
                  {p}
                </p>
              ))}
            </div>
          </div>
          <div className="lg:pt-2">
            <p className="text-[#17181B] text-lg leading-relaxed font-medium">{offer.tagline}</p>
          </div>
        </div>
      </section>

      {/* Lead form */}
      <section className="bg-[#F5F5F6] py-16 lg:py-20 border-t border-[#E7E7EA]">
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
