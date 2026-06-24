"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  Calculator,
  Wallet,
  Percent,
  Calendar,
  TrendingDown,
  Building2,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import {
  ALL_MODELS_FOR_GRID,
  FINANCE_PARTNERS,
  CONTACT,
} from "@/lib/jetour-data";
import { EnhancedLeadForm } from "@/components/jetour/enhanced-lead-form";
import Link from "next/link";

export default function FinancingPage() {
  // Calculator state
  const [vehiclePrice, setVehiclePrice] = useState(95000000);
  const [downPaymentPct, setDownPaymentPct] = useState(25);
  const [termMonths, setTermMonths] = useState(48);
  const [interestRate, setInterestRate] = useState(1.8);

  const downPayment = useMemo(
    () => Math.round((vehiclePrice * downPaymentPct) / 100),
    [vehiclePrice, downPaymentPct]
  );
  const loanAmount = vehiclePrice - downPayment;
  const monthlyPayment = useMemo(() => {
    // Simple amortization: monthly rate
    const r = interestRate / 100;
    const n = termMonths;
    if (r === 0) return Math.round(loanAmount / n);
    return Math.round((loanAmount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1));
  }, [loanAmount, termMonths, interestRate]);
  const totalPayment = monthlyPayment * termMonths;
  const totalInterest = totalPayment - loanAmount;

  const financingData = {
    vehiclePrice,
    downPayment,
    termMonths,
    interestRate,
    monthlyPayment,
  };

  const formatMNT = (v: number) => v.toLocaleString("mn-MN") + " ₮";

  return (
    <div className="min-h-screen bg-white text-[#0A1F44]">
      {/* === Header spacer for sticky nav === */}
      <div className="h-20" />

      {/* === Hero === */}
      <section className="relative py-20 lg:py-28 bg-[#0A1F44] overflow-hidden">
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
            background: "radial-gradient(50% 60% at 80% 30%, rgba(0,174,239,0.15), transparent 70%)",
          }}
        />
        <div className="relative mx-auto w-[min(1280px,94vw)] text-center">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="eyebrow text-[#4DD0F5] mb-3"
          >
            Зээл · Санхүүжилт
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="font-display font-extrabold italic leading-[0.95] text-white text-5xl lg:text-7xl mb-5"
          >
            Өөрийн болгох <span className="text-gradient-electric">боломж</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="max-w-2xl mx-auto text-white/70 text-base lg:text-lg leading-relaxed"
          >
            20–30% урьдчилгаа төлөөд сарын 1.3–2.9% хүүгээр JETOUR-оо өөрийн болгоорой.
            Зээлийн тооцоолуур ашиглан сарын төлөлтөө шууд тооцоол.
          </motion.p>
        </div>
      </section>

      {/* === Loan Calculator === */}
      <section className="py-20 lg:py-28 bg-[#F7F9FC]">
        <div className="mx-auto w-[min(1280px,94vw)]">
          <div className="text-center mb-12">
            <p className="eyebrow eyebrow-electric mb-3">
              <Calculator className="w-3.5 h-3.5 inline mr-1.5" />
              Зээлийн тооцоолуур
            </p>
            <h2 className="font-display font-extrabold italic text-[#0A1F44] text-4xl lg:text-5xl">
              Сарын төлбөрөө тооцоол
            </h2>
          </div>

          <div className="grid lg:grid-cols-[1.3fr_1fr] gap-8">
            {/* Left — inputs */}
            <div className="bg-white rounded-2xl p-7 lg:p-8 border border-[#E2E7EF] shadow-lg">
              {/* Vehicle price */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-[0.65rem] tracking-[0.18em] uppercase text-[#6B7280] font-display flex items-center gap-1.5">
                    <Wallet className="w-3.5 h-3.5" />
                    Машины үнэ
                  </label>
                  <span className="font-display font-extrabold italic text-lg text-[#0A1F44]">
                    {formatMNT(vehiclePrice)}
                  </span>
                </div>
                <input
                  type="range"
                  min={50000000}
                  max={200000000}
                  step={1000000}
                  value={vehiclePrice}
                  onChange={(e) => setVehiclePrice(Number(e.target.value))}
                  className="w-full accent-[#00AEEF]"
                />
                <div className="flex justify-between text-[0.6rem] text-[#6B7280] mt-1">
                  <span>50 сая</span>
                  <span>200 сая</span>
                </div>
              </div>

              {/* Down payment */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-[0.65rem] tracking-[0.18em] uppercase text-[#6B7280] font-display flex items-center gap-1.5">
                    <TrendingDown className="w-3.5 h-3.5" />
                    Урьдчилгаа ({downPaymentPct}%)
                  </label>
                  <span className="font-display font-extrabold italic text-lg text-[#0A1F44]">
                    {formatMNT(downPayment)}
                  </span>
                </div>
                <input
                  type="range"
                  min={10}
                  max={50}
                  step={5}
                  value={downPaymentPct}
                  onChange={(e) => setDownPaymentPct(Number(e.target.value))}
                  className="w-full accent-[#00AEEF]"
                />
                <div className="flex justify-between text-[0.6rem] text-[#6B7280] mt-1">
                  <span>10%</span>
                  <span>50%</span>
                </div>
              </div>

              {/* Term */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-[0.65rem] tracking-[0.18em] uppercase text-[#6B7280] font-display flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    Хугацаа
                  </label>
                  <span className="font-display font-extrabold italic text-lg text-[#0A1F44]">
                    {termMonths} сар
                  </span>
                </div>
                <input
                  type="range"
                  min={12}
                  max={72}
                  step={6}
                  value={termMonths}
                  onChange={(e) => setTermMonths(Number(e.target.value))}
                  className="w-full accent-[#00AEEF]"
                />
                <div className="flex justify-between text-[0.6rem] text-[#6B7280] mt-1">
                  <span>12 сар</span>
                  <span>72 сар</span>
                </div>
              </div>

              {/* Interest rate */}
              <div className="mb-2">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-[0.65rem] tracking-[0.18em] uppercase text-[#6B7280] font-display flex items-center gap-1.5">
                    <Percent className="w-3.5 h-3.5" />
                    Сарын хүү
                  </label>
                  <span className="font-display font-extrabold italic text-lg text-[#0A1F44]">
                    {interestRate.toFixed(1)}%
                  </span>
                </div>
                <input
                  type="range"
                  min={1.0}
                  max={2.9}
                  step={0.1}
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="w-full accent-[#00AEEF]"
                />
                <div className="flex justify-between text-[0.6rem] text-[#6B7280] mt-1">
                  <span>1.0%</span>
                  <span>2.9%</span>
                </div>
              </div>
            </div>

            {/* Right — result */}
            <div className="bg-gradient-to-br from-[#0A1F44] to-[#142A5C] rounded-2xl p-7 lg:p-8 text-white shadow-2xl flex flex-col justify-center">
              <p className="text-[0.65rem] tracking-[0.22em] uppercase text-[#4DD0F5] font-display mb-2">
                Сарын төлөлт
              </p>
              <p className="font-display font-extrabold italic text-5xl lg:text-6xl text-gradient-electric mb-6">
                {formatMNT(monthlyPayment)}
              </p>

              <div className="space-y-3 pt-5 border-t border-white/10">
                <div className="flex justify-between text-sm">
                  <span className="text-white/60">Зээлийн дүн</span>
                  <span className="font-display font-bold">{formatMNT(loanAmount)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/60">Хүүний нийт дүн</span>
                  <span className="font-display font-bold">{formatMNT(totalInterest)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/60">Нийт төлөх дүн</span>
                  <span className="font-display font-bold">{formatMNT(totalPayment)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/60">Хугацаа</span>
                  <span className="font-display font-bold">{termMonths} сар ({Math.round(termMonths / 12 * 10) / 10} жил)</span>
                </div>
              </div>

              <p className="text-[0.6rem] text-white/40 mt-5 leading-relaxed">
                * Энэхүү тооцоолол нь зөвхөн ойлголт өгөх зорилготой. Бодит хүү, нөхцөл банкнаас хамаарна.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* === Bank partners === */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="mx-auto w-[min(1280px,94vw)]">
          <div className="text-center mb-12">
            <p className="eyebrow eyebrow-electric mb-3">
              <Building2 className="w-3.5 h-3.5 inline mr-1.5" />
              Хамтрагч банкууд
            </p>
            <h2 className="font-display font-extrabold italic text-[#0A1F44] text-4xl lg:text-5xl mb-4">
              Хамтран ажилладаг банкууд
            </h2>
            <p className="text-[#6B7280] max-w-xl mx-auto text-sm">
              Монголын тэргүүлэгч банкуудтай хамтран ажилладаг. Зээлийн нөхцөл банкнаас хамааран өөр байж болно.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {FINANCE_PARTNERS.map((b, i) => (
              <motion.div
                key={b.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="bg-white rounded-2xl p-6 border border-[#E2E7EF] card-lift"
              >
                <div
                  className="w-14 h-14 grid place-items-center rounded-xl mb-4 font-display font-extrabold text-lg text-white"
                  style={{ background: b.color }}
                >
                  {b.name.charAt(0)}
                </div>
                <h3 className="font-display font-extrabold text-lg text-[#0A1F44] mb-3">{b.name}</h3>
                <div className="space-y-1.5 text-sm">
                  <div className="flex justify-between">
                    <span className="text-[#6B7280]">Хүү</span>
                    <span className="font-display font-bold text-[#0A1F44]">{b.rate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#6B7280]">Хугацаа</span>
                    <span className="font-display font-bold text-[#0A1F44]">{b.term}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#6B7280]">Урьдчилгаа</span>
                    <span className="font-display font-bold text-[#0A1F44]">{b.downPayment}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* === Lead form === */}
      <section className="py-20 lg:py-28 bg-[#F7F9FC]">
        <div className="mx-auto w-[min(1180px,94vw)]">
          <div className="grid lg:grid-cols-[1fr_1.1fr] gap-12 lg:gap-16 items-start">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <p className="eyebrow eyebrow-electric mb-3">Зээлийн өргөдөл</p>
              <h2 className="font-display font-extrabold italic leading-[0.95] text-[#0A1F44] text-4xl lg:text-6xl mb-5">
                Өргөдөл <span className="text-gradient-premium">бөглөх</span>
              </h2>
              <p className="text-[#6B7280] text-base leading-relaxed mb-7 max-w-md">
                Манай санхүүгийн зөвлөх танд зээлийн нөхцөл, шаардлагатай баримт бичгээр
                тусална. Доорх формоор өргөдөл илгээгээрэй.
              </p>

              <div className="space-y-3 mb-7">
                {[
                  "20–30% урьдчилгаа төлөөд үлдсэнийг зээлээр",
                  "12–72 сарын хугацаагаар сонголттой",
                  "4 банкны нөхцөл харьцуулж зөвлөгөө өгнө",
                  "Бизнес, цалингаас хамаарч өөр нөхцөл",
                ].map((p) => (
                  <div key={p} className="flex items-start gap-2.5 text-sm text-[#0A1F44]">
                    <CheckCircle2 className="w-4 h-4 text-[#00AEEF] mt-0.5 shrink-0" />
                    <span>{p}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-3">
                <a href={CONTACT.phone1Href} className="btn-outline-jetour inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm">
                  {CONTACT.phone1}
                </a>
                <Link href="/#models" className="btn-primary-jetour inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm">
                  Загварууд үзэх
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>

            <EnhancedLeadForm
              type="financing"
              variant="white"
              title="Зээлийн өргөдөл"
              subtitle="Тооцоолуурын үр дүн автомат илгээгдэнэ"
              financingData={financingData}
              showDateField={false}
              showTimeField={false}
              showContactMethod={true}
              showModelField={true}
              showBranchField={false}
              submitLabel="Зээлийн өргөдөл илгээх"
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <FooterLite />
    </div>
  );
}

function FooterLite() {
  return (
    <footer className="bg-[#0A1F44] text-white py-10">
      <div className="mx-auto w-[min(1280px,94vw)] text-center">
        <p className="text-xs text-white/50">
          © {new Date().getFullYear()} JETOUR Mongolia · Сайн Моторс ХХК. Бүх эрх хуулиар хамгаалагдсан.
        </p>
        <div className="flex justify-center gap-4 mt-3 text-xs">
          <Link href="/" className="text-white/60 hover:text-[#4DD0F5] transition-colors">Нүүр</Link>
          <Link href="/#models" className="text-white/60 hover:text-[#4DD0F5] transition-colors">Загварууд</Link>
          <Link href="/news" className="text-white/60 hover:text-[#4DD0F5] transition-colors">Мэдээ</Link>
          <Link href="/owners" className="text-white/60 hover:text-[#4DD0F5] transition-colors">Эзэмшигчдэд</Link>
        </div>
      </div>
    </footer>
  );
}
