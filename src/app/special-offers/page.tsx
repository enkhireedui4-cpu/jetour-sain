"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Tag, Percent, Gift, Wrench, ArrowRight, Phone } from "lucide-react";
import { CONTACT, FINANCE_PARTNERS } from "@/lib/jetour-data";
import { Navbar } from "@/components/jetour/navbar";
import { Footer } from "@/components/jetour/contact";

const OFFERS = [
  {
    icon: <Percent className="w-6 h-6" />,
    title: "Хүүгийн хөнгөлөлттэй зээл",
    desc: "Хамтрагч банкуудтай хамтран 1.3%-аас эхлэх хүүтэй, 60 сар хүртэлх хугацаатай уян хатан зээл.",
    badge: "Санхүүжилт",
    href: "/financing",
  },
  {
    icon: <Gift className="w-6 h-6" />,
    title: "Бэлэн авах урамшуулал",
    desc: "Бэлэн төлбөрөөр худалдан авахад нэмэлт хөнгөлөлт болон дагалдах хэрэгслийн багц.",
    badge: "Урамшуулал",
    href: "/#dealer",
  },
  {
    icon: <Wrench className="w-6 h-6" />,
    title: "Үнэгүй техник үзлэг",
    desc: "Шинэ эзэмшигчдэд эхний жилийн засвар үйлчилгээ, техникийн үзлэг үнэгүй.",
    badge: "Үйлчилгээ",
    href: "/owners",
  },
];

export default function SpecialOffersPage() {
  return (
    <div className="min-h-screen bg-white text-[#17181B]">
      <Navbar />
      <div className="h-16" />

      {/* Header */}
      <section className="bg-white pt-14 lg:pt-20 pb-10">
        <div className="mx-auto w-[min(1280px,94vw)]">
          <p className="eyebrow eyebrow-electric mb-3">Тусгай саналууд</p>
          <h1 className="font-extrabold tracking-tight text-[#17181B] text-3xl lg:text-5xl mb-3">
            Танд зориулсан онцгой санал
          </h1>
          <p className="text-[#54585F] text-base lg:text-lg max-w-2xl leading-relaxed">
            JETOUR-аа илүү таатай нөхцөлөөр эзэмших боломж. Доорх саналуудын талаар манай баг
            дэлгэрэнгүй мэдээлэл өгөх болно.
          </p>
        </div>
      </section>

      {/* Offers grid */}
      <section className="bg-white pb-16 lg:pb-20">
        <div className="mx-auto w-[min(1280px,94vw)] grid md:grid-cols-3 gap-6">
          {OFFERS.map((o, i) => (
            <motion.div
              key={o.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Link
                href={o.href}
                className="group block h-full bg-[#F5F5F6] rounded-2xl p-7 border border-[#E7E7EA] hover:bg-white hover:border-[#E20A17] hover:shadow-lg transition-all"
              >
                <div className="flex items-center justify-between mb-5">
                  <span className="w-12 h-12 grid place-items-center rounded-xl bg-[#E20A17]/10 text-[#E20A17]">
                    {o.icon}
                  </span>
                  <span className="text-[0.6rem] font-bold tracking-[0.16em] uppercase px-2.5 py-1 rounded-full bg-[#17181B] text-white">
                    {o.badge}
                  </span>
                </div>
                <h3 className="font-bold text-xl text-[#17181B] mb-2.5 group-hover:text-[#E20A17] transition-colors">
                  {o.title}
                </h3>
                <p className="text-sm text-[#54585F] leading-relaxed mb-5">{o.desc}</p>
                <span className="inline-flex items-center gap-1.5 text-[#E20A17] font-semibold text-sm group-hover:gap-2.5 transition-all">
                  Дэлгэрэнгүй
                  <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Finance partners strip */}
      <section className="bg-[#F5F5F6] py-16 lg:py-20 border-t border-[#E7E7EA]">
        <div className="mx-auto w-[min(1280px,94vw)]">
          <div className="flex items-center gap-2 mb-8">
            <Tag className="w-4 h-4 text-[#E20A17]" />
            <p className="eyebrow eyebrow-electric">Хамтрагч банкууд</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {FINANCE_PARTNERS.map((p) => (
              <div key={p.name} className="bg-white rounded-2xl p-6 border border-[#E7E7EA]">
                <p className="font-bold text-lg text-[#17181B] mb-3">{p.name}</p>
                <div className="space-y-1.5 text-sm">
                  <div className="flex justify-between">
                    <span className="text-[#8A8F98]">Хүү</span>
                    <span className="font-semibold text-[#E20A17]">{p.rate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#8A8F98]">Хугацаа</span>
                    <span className="font-semibold text-[#17181B]">{p.term}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#8A8F98]">Урьдчилгаа</span>
                    <span className="font-semibold text-[#17181B]">{p.downPayment}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            <a
              href={CONTACT.phone1Href}
              className="btn-electric-jetour inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-sm"
            >
              <Phone className="w-4 h-4" />
              {CONTACT.phone1}
            </a>
            <Link
              href="/financing"
              className="inline-flex items-center gap-2 bg-[#17181B] text-white px-6 py-3.5 rounded-full text-sm font-bold hover:bg-[#E20A17] transition-colors"
            >
              Зээлийн тооцоолуур
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
