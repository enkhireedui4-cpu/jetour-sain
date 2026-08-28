"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight, Calendar, FileText } from "lucide-react";
import type { SpecialOffer } from "@/lib/jetour-data";
import { Navbar } from "@/components/jetour/navbar";
import { Footer } from "@/components/jetour/contact";
import { EnhancedLeadForm } from "@/components/jetour/enhanced-lead-form";

export default function OfferDetailClient({
  offer,
  brochure,
  posterSize,
}: {
  offer: SpecialOffer;
  brochure?: string | null;
  posterSize?: { width: number; height: number } | null;
}) {
  return (
    <div className="min-h-screen bg-white text-[#17181B]">
      <Navbar />

      <main id="main-content">
      <div className="h-16" />

      {/* Back link */}
      <div className="container-page pt-8">
        <Link
          href="/special-offers"
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#666C77] hover:text-[#E20A17] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Тусгай саналууд
        </Link>
      </div>

      {/* Hero poster — бүтэн постер, том, таслалгүй */}
      <section className="pt-6 pb-12 lg:pb-16">
        <div className="mx-auto w-[min(1100px,94vw)]">
          {/* Хэмжээ мэдэгдэж байвал `next/image` — responsive srcset үүсгэж,
              утсанд 1920px биш ~700px хувилбар очно. Мэдэгдэхгүй бол (шинэ
              постер, файл олдоогүй г.м.) энгийн <img> рүү аюулгүй буцна. */}
          {posterSize ? (
            <Image
              src={offer.poster}
              alt={offer.title}
              width={posterSize.width}
              height={posterSize.height}
              sizes="(min-width: 1180px) 1100px, 94vw"
              priority
              className="w-full h-auto rounded-2xl"
            />
          ) : (
            <img
              src={offer.poster}
              alt={offer.title}
              className="w-full h-auto rounded-2xl"
            />
          )}
        </div>
      </section>

      {/* Detail body */}
      <section className="pb-16 lg:pb-20">
        <div className="container-page grid lg:grid-cols-[1.4fr_1fr] gap-12 lg:gap-20">
          <div>
            <h1 className="type-h1 text-[#17181B] mb-4">{offer.title}</h1>
            <p className="flex items-center gap-1.5 type-small text-[#666C77] mb-6">
              <Calendar className="w-4 h-4" />
              {offer.date}
            </p>
            {offer.price && (
              <div className="mb-10">
                <span className="eyebrow block mb-2">Үндсэн үнэ</span>
                <span className="text-3xl lg:text-4xl font-extrabold text-[#E20A17]">
                  {offer.price}
                </span>
              </div>
            )}
            <div className="space-y-5">
              {offer.body.map((p, i) => (
                <p key={i} className="text-[#54585F] text-base leading-[1.8]">
                  {p}
                </p>
              ))}
            </div>
            <div className="flex flex-wrap items-center gap-3 mt-10">
              <button
                onClick={() =>
                  document.querySelector("#lead-form")?.scrollIntoView({ behavior: "smooth" })
                }
                className="btn-electric-jetour inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm"
              >
                Хүсэлт үлдээх
                <ArrowRight className="w-4 h-4" />
              </button>
              {/* `download` атрибутгүй: PDF шинэ табд НЭЭГДЭНЭ, шууд татагдахгүй.
                  Хэрэглэгч эхлээд үзээд, хүсвэл тэндээсээ татна. */}
              {brochure && (
                <a
                  href={brochure}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ink-jetour inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm"
                >
                  <FileText className="w-4 h-4" />
                  Брошюр
                </a>
              )}
            </div>
          </div>
          <div className="lg:pt-2">
            <p className="type-lead text-[#17181B]">{offer.tagline}</p>
          </div>
        </div>
      </section>

      {/* Spec table */}
      {offer.specs && offer.specs.length > 0 && (
        <section className="pb-16 lg:pb-20">
          <div className="container-page">
            <h2 className="type-h2 text-[#17181B] mb-8">Техникийн үзүүлэлт</h2>
            <div className="max-w-3xl divide-y divide-[#E7E7EA] border-t border-b border-[#E7E7EA]">
              {offer.specs.map((s) => (
                <div
                  key={s.label}
                  className="flex items-start justify-between gap-6 py-4"
                >
                  <span className="text-[#54585F] w-[42%] sm:w-[38%] shrink-0">
                    {s.label}
                  </span>
                  <span className="font-semibold text-[#17181B] text-right">
                    {s.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Lead form */}
      <section
        id="lead-form"
        className="section-pad bg-[#F5F5F6] border-t border-[#E7E7EA] scroll-mt-20"
      >
        <div className="container-page grid lg:grid-cols-[0.8fr_1.2fr] gap-12 lg:gap-16 items-start">
          <div>
            <h2 className="type-h2 text-[#17181B] mb-4">Холбогдох хүсэлт</h2>
            <p className="type-lead max-w-sm">
              Маягтыг илгээхийн тулд мэдээллээ бөглөж, зааврыг дагана уу. Манай баг тантай
              удахгүй холбогдоно.
            </p>
          </div>
          <EnhancedLeadForm
            type="info-request"
            variant="white"
            title="Холбогдох хүсэлт"
            subtitle={`${offer.modelName} — таатай нөхцөлөөр`}
            modelName={offer.modelName}
            /* Салбар/огноо — хасав. Загварын хуудасны "Холбогдох хүсэлт"-тэй ижил:
               анхны хүсэлтэд нэр, утас, загвар хангалттай; салбар/цагийг
               оператор залгахдаа тохирно. */
            showBranchField={false}
            showDateField={false}
            showTimeField={false}
            showContactMethod={false}
            showEmailField={false}
            submitLabel="Хүсэлт илгээх"
          />
        </div>
      </section>

      </main>

      <Footer />
    </div>
  );
}
