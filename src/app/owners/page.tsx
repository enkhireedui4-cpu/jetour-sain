"use client";

import { motion } from "framer-motion";
import {
  Wrench,
  Package,
  ShieldCheck,
  Clock,
  Phone,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import Link from "next/link";
import { CONTACT, SHOWROOM_HOURS } from "@/lib/jetour-data";
import { EnhancedLeadForm } from "@/components/jetour/enhanced-lead-form";
import { Navbar } from "@/components/jetour/navbar";
import { useState } from "react";

export default function OwnersPage() {
  const [tab, setTab] = useState<"service" | "parts">("service");

  return (
    <div className="min-h-screen bg-white text-[#17181B]">
      <Navbar />
      <div className="h-16" />

      {/* Hero */}
      <section className="relative py-20 lg:py-28 bg-[#17181B] overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none opacity-30"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(50% 60% at 20% 50%, rgba(226,35,26,0.15), transparent 70%)",
          }}
        />
        <div className="relative mx-auto w-[min(1280px,94vw)] text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-white/60 hover:text-[#E20A17] transition-colors text-sm font-display font-bold tracking-wider mb-6"
          >
            ← НҮҮР
          </Link>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="eyebrow text-[#E20A17] mb-3"
          >
            Эзэмшигчдэд зориулсан булан
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="font-display font-extrabold italic leading-[0.95] text-white text-5xl lg:text-7xl mb-5"
          >
            Өөрийн <span className="text-gradient-electric">JETOUR</span>-доо туршлага
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="max-w-2xl mx-auto text-white/70 text-base lg:text-lg leading-relaxed"
          >
            Засвар үйлчилгээний цаг захиалах, баталгаат засварын явц лавлах, сэлбэгийн захиалга —
            бүгд нэг дор.
          </motion.p>
        </div>
      </section>

      {/* Service highlights */}
      <section className="py-20 lg:py-28 bg-[#F5F5F6]">
        <div className="mx-auto w-[min(1280px,94vw)]">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {[
              {
                icon: <ShieldCheck className="w-7 h-7" />,
                title: "4 жилийн баталгаа",
                text: "Үндсэн баталгаа 4 жил / 150,000 км. Хөдөлгүүрийн баталгаа бүрэн багтсан.",
              },
              {
                icon: <Package className="w-7 h-7" />,
                title: "Оригинал сэлбэг",
                text: "JETOUR оригинал сэлбэгийн бүрэн нөөц. Хуурамч сэлбэг байхгүй.",
              },
              {
                icon: <Wrench className="w-7 h-7" />,
                title: "Мэргэжлийн засвар",
                text: "4S стандарт үйлчилгээний төв. Мэргэжлийн механикчид, тоног төхөөрөмж.",
              },
            ].map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="bg-white rounded-2xl p-7 border border-[#E7E7EA] card-lift"
              >
                <div className="w-14 h-14 grid place-items-center rounded-2xl mb-5 bg-gradient-to-br from-[#17181B] to-[#232428] text-[#E20A17]">
                  {f.icon}
                </div>
                <h3 className="font-display font-extrabold italic text-xl text-[#17181B] mb-3">
                  {f.title}
                </h3>
                <p className="text-[#6B7280] text-sm leading-relaxed">{f.text}</p>
              </motion.div>
            ))}
          </div>

          {/* Tab switcher */}
          <div className="flex justify-center mb-10">
            <div className="inline-flex bg-white rounded-full border border-[#E7E7EA] p-1">
              <button
                onClick={() => setTab("service")}
                className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-display font-bold transition-all ${
                  tab === "service"
                    ? "bg-[#17181B] text-white"
                    : "text-[#6B7280] hover:text-[#17181B]"
                }`}
              >
                <Wrench className="w-4 h-4" />
                Засвар захиалах
              </button>
              <button
                onClick={() => setTab("parts")}
                className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-display font-bold transition-all ${
                  tab === "parts"
                    ? "bg-[#17181B] text-white"
                    : "text-[#6B7280] hover:text-[#17181B]"
                }`}
              >
                <Package className="w-4 h-4" />
                Сэлбэг захиалах
              </button>
            </div>
          </div>

          {/* Form area */}
          <div className="grid lg:grid-cols-[1fr_1.1fr] gap-12 lg:gap-16 items-start">
            {/* Left — info */}
            <motion.div
              key={`info-${tab}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
            >
              {tab === "service" ? (
                <>
                  <p className="eyebrow eyebrow-electric mb-3">Засвар үйлчилгээ</p>
                  <h2 className="font-display font-extrabold italic leading-[0.95] text-[#17181B] text-4xl lg:text-5xl mb-5">
                    Үйлчилгээний цаг <span className="text-gradient-premium">захиалах</span>
                  </h2>
                  <p className="text-[#6B7280] text-base leading-relaxed mb-7">
                    Тохирсон цагаар ирж, үйлчилгээ хүлээхгүй — засвар үйлчилгээний цаг урьдчилан
                    захиалаарай. Манай механикчид таны JETOUR-д үнэмшилтэй үйлчилгээ үзүүлнэ.
                  </p>
                  <div className="space-y-3 mb-7">
                    {[
                      "Стандарт үйлчилгээ (5,000 / 10,000 км)",
                      "Хөдөлгүүрийн засвар",
                      "Тоормос, дугуйн үйлчилгээ",
                      "Цахилгаан, электроник систем",
                      "Баталгаат засвар (warranty)",
                    ].map((p) => (
                      <div key={p} className="flex items-start gap-2.5 text-sm text-[#17181B]">
                        <CheckCircle2 className="w-4 h-4 text-[#E20A17] mt-0.5 shrink-0" />
                        <span>{p}</span>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <>
                  <p className="eyebrow eyebrow-electric mb-3">Сэлбэг захиалга</p>
                  <h2 className="font-display font-extrabold italic leading-[0.95] text-[#17181B] text-4xl lg:text-5xl mb-5">
                    Оригинал сэлбэг <span className="text-gradient-premium">захиалах</span>
                  </h2>
                  <p className="text-[#6B7280] text-base leading-relaxed mb-7">
                    JETOUR оригинал сэлбэгийн бүрэн нөөцтэй. Шаардлагатай сэлбэгийнхээ нэрийг
                    бичиж илгээгээрэй — манай баг нөөцөөс олж холбогдоно.
                  </p>
                  <div className="space-y-3 mb-7">
                    {[
                      "100% оригинал сэлбэг",
                      "Хөдөлгүүр, дамжуулгын сэлбэг",
                      "Тоормос, дугуй, жигүүр",
                      "Цахилгаан, гэрэлтүүлэг",
                      "Дотоод засал, суудал",
                    ].map((p) => (
                      <div key={p} className="flex items-start gap-2.5 text-sm text-[#17181B]">
                        <CheckCircle2 className="w-4 h-4 text-[#E20A17] mt-0.5 shrink-0" />
                        <span>{p}</span>
                      </div>
                    ))}
                  </div>
                </>
              )}

              {/* Service hours */}
              <div className="bg-white rounded-xl p-5 border border-[#E7E7EA]">
                <p className="text-[0.6rem] tracking-[0.22em] uppercase text-[#6B7280] font-display mb-3 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  Үйлчилгээний цаг
                </p>
                <div className="space-y-1.5">
                  {SHOWROOM_HOURS.map((h) => (
                    <div key={h.day} className="flex justify-between text-sm">
                      <span className="text-[#6B7280]">{h.day}</span>
                      <span className="font-display font-bold text-[#17181B]">{h.hours}</span>
                    </div>
                  ))}
                </div>
                <a
                  href={CONTACT.phone1Href}
                  className="mt-4 flex items-center gap-2 text-sm text-[#E20A17] hover:text-[#17181B] transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  {CONTACT.phone1}
                </a>
              </div>
            </motion.div>

            {/* Right — form */}
            <motion.div
              key={`form-${tab}`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <EnhancedLeadForm
                type={tab === "service" ? "service" : "parts"}
                variant="white"
                title={tab === "service" ? "Засвар захиалах" : "Сэлбэг захиалах"}
                subtitle={
                  tab === "service"
                    ? "Огноо, цаг сонгож захиалаарай"
                    : "Шаардлагатай сэлбэгийн мэдээллийг бичнэ үү"
                }
                showModelField={true}
                showBranchField={true}
                showDateField={tab === "service"}
                showTimeField={tab === "service"}
                showContactMethod={true}
                showMessageField={true}
                submitLabel={tab === "service" ? "Засвар захиалах" : "Сэлбэг захиалах"}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#17181B] text-white py-10">
        <div className="mx-auto w-[min(1280px,94vw)] text-center">
          <p className="text-xs text-white/50">
            © {new Date().getFullYear()} JETOUR Mongolia · Сайн Моторс ХХК.
          </p>
          <div className="flex justify-center gap-4 mt-3 text-xs">
            <Link href="/" className="text-white/60 hover:text-[#E20A17] transition-colors">Нүүр</Link>
            <Link href="/#models" className="text-white/60 hover:text-[#E20A17] transition-colors">Загварууд</Link>
            <Link href="/financing" className="text-white/60 hover:text-[#E20A17] transition-colors">Зээл</Link>
            <Link href="/news" className="text-white/60 hover:text-[#E20A17] transition-colors">Мэдээ</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
