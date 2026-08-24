"use client";

import { useState, useSyncExternalStore } from "react";
import Image from "next/image";
import { Check, ShieldCheck, Clock, MapPin } from "lucide-react";
import { EnhancedLeadForm } from "@/components/jetour/enhanced-lead-form";
import { CONTACT, SHOWROOM_HOURS } from "@/lib/jetour-data";

type MiniModel = { id: string; name: string; image: string };

// ?model=x70-plus — хуудас нь статикаар үүсдэг тул query нь React-ийн гадна орших
// эх сурвалж. useSyncExternalStore-оор уншвал effect дотор setState хийхгүйгээр,
// SSR-ийн HTML-тэй зөрөлдөхгүйгээр урьдчилан сонголт хийж чадна.
function subscribeUrl(onChange: () => void) {
  window.addEventListener("popstate", onChange);
  return () => window.removeEventListener("popstate", onChange);
}
const getUrlModel = () => new URLSearchParams(window.location.search).get("model");
const getNoUrlModel = () => null;

export function TestDriveClient({ models }: { models: MiniModel[] }) {
  const urlModel = useSyncExternalStore(subscribeUrl, getUrlModel, getNoUrlModel);
  // undefined = хэрэглэгч хараахан гараар сонгоогүй → URL-ийн сонголт хүчинтэй
  const [picked, setPicked] = useState<string | null | undefined>(undefined);
  const selectedId =
    picked !== undefined
      ? picked
      : urlModel && models.some((m) => m.id === urlModel)
      ? urlModel
      : null;

  const selected = models.find((m) => m.id === selectedId) ?? null;

  return (
    <section className="section-pad bg-white">
      <div className="container-page">
        {/* Загвар сонгогч */}
        <div className="mb-10">
          <p className="text-sm font-semibold text-[#54585F] mb-4">
            Аль загварыг туршихыг хүсэж байна вэ?
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {models.map((m) => {
              const active = m.id === selectedId;
              return (
                <button
                  key={m.id}
                  onClick={() => setPicked(active ? null : m.id)}
                  aria-pressed={active}
                  className={`group text-left rounded-2xl border p-2.5 transition-colors ${
                    active ? "border-[#17181B] bg-[#F5F5F6]" : "border-[#E7E7EA] hover:border-[#17181B]/40"
                  }`}
                >
                  <span className="relative block w-full aspect-[16/10] rounded-lg overflow-hidden mb-2.5">
                    <Image src={m.image} alt={m.name} fill sizes="(max-width:1024px) 45vw, 280px" className="object-cover" />
                    {active && (
                      <span className="absolute top-2 right-2 w-6 h-6 grid place-items-center rounded-full bg-[#E20A17] text-white">
                        <Check className="w-3.5 h-3.5" />
                      </span>
                    )}
                  </span>
                  <span className="block font-bold text-sm text-[#17181B] px-1 pb-1">
                    {m.name.replace("JETOUR ", "")}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Форм + итгэлийн хэсэг */}
        <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-10 lg:gap-14 items-start">
          <EnhancedLeadForm
            key={selectedId ?? "none"}
            type="test-drive"
            variant="white"
            title="Тест драйв захиалах"
            subtitle={selected ? `${selected.name} — тест драйв` : "Загвараа сонгож, мэдээллээ үлдээгээрэй"}
            modelName={selected?.name}
            showModelField={!selected}
            showDateField
            showTimeField
            showEmailField={false}
            showMessageField
            submitLabel="Тест драйв баталгаажуулах"
          />

          {/* Итгэл */}
          <aside className="space-y-5">
            <div className="rounded-2xl border border-[#E7E7EA] p-6 flex items-start gap-4">
              <span className="w-11 h-11 grid place-items-center rounded-xl bg-[#F5F5F6] text-[#E20A17] shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </span>
              <div>
                <p className="font-bold text-[#17181B]">3 жил / 100,000 км баталгаа</p>
                <p className="type-small mt-1">Албан ёсны дистрибьюторын баталгаа.</p>
              </div>
            </div>

            <div className="rounded-2xl border border-[#E7E7EA] p-6">
              <p className="flex items-center gap-2 text-[0.65rem] tracking-[0.18em] uppercase text-[#6B7280] mb-4">
                <Clock className="w-3.5 h-3.5" /> Ажлын цаг
              </p>
              <div className="space-y-2">
                {SHOWROOM_HOURS.map((h) => (
                  <div key={h.day} className="flex justify-between text-sm">
                    <span className="text-[#54585F]">{h.day}</span>
                    <span className="font-bold text-[#17181B]">{h.hours}</span>
                  </div>
                ))}
              </div>
            </div>

            <a
              href={CONTACT.googleMap}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-2xl border border-[#E7E7EA] p-6 flex items-start gap-4 hover:border-[#17181B]/30 transition-colors"
            >
              <span className="w-11 h-11 grid place-items-center rounded-xl bg-[#F5F5F6] text-[#E20A17] shrink-0">
                <MapPin className="w-5 h-5" />
              </span>
              <div>
                <p className="font-bold text-[#17181B]">Showroom</p>
                <p className="type-small mt-1">{CONTACT.address}</p>
              </div>
            </a>
          </aside>
        </div>
      </div>
    </section>
  );
}
