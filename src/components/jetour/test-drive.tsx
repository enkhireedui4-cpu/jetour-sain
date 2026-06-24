"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  User,
  Phone,
  Mail,
  Car,
  Calendar,
  MessageSquare,
  Send,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { MODELS, CONTACT } from "@/lib/jetour-data";
import { useToast } from "@/hooks/use-toast";

export function TestDrive() {
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    model: "",
    date: "",
    message: "",
  });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.model || !form.date) {
      toast({
        variant: "destructive",
        title: "Мэдээлэл дутуу байна",
        description: "Нэр, утас, загвар, огноо заавал шаардлагатай.",
      });
      return;
    }
    const digits = form.phone.replace(/\D/g, "");
    if (digits.length !== 8) {
      toast({
        variant: "destructive",
        title: "Утасны дугаар буруу",
        description: "8 оронтой утасны дугаараа оруулна уу.",
      });
      return;
    }
    setSubmitted(true);
    toast({
      title: "Тест драйв бүртгэл амжилттай!",
      description: `${form.name}, манай баг удахгүй холбогдоно.`,
    });
  };

  const reset = () => {
    setForm({ name: "", phone: "", email: "", model: "", date: "", message: "" });
    setSubmitted(false);
  };

  return (
    <section
      id="test-drive"
      className="relative py-32 lg:py-40 bg-[#0A1F44] overflow-hidden"
    >
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
          background:
            "radial-gradient(50% 50% at 80% 30%, rgba(0,174,239,0.15), transparent 70%)",
        }}
      />

      <div className="relative mx-auto w-[min(1180px,94vw)]">
        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-12 lg:gap-16 items-start">
          {/* Left — copy */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="eyebrow text-[#4DD0F5] mb-3">05 · Тест драйв</p>
            <h2 className="font-display font-extrabold italic leading-[0.95] text-white text-4xl lg:text-6xl mb-5">
              Өөрийн биеэр{" "}
              <span className="text-gradient-electric">мэдрээрэй</span>
            </h2>
            <p className="text-white/80 text-base leading-relaxed mb-7">
              Зураг, видеогоор дамжуулан ойлгох аргагүй — сууж, жолоодон, өөртөө тохирох эсэхийг
              мэдрэх. Тест драйв үнэгүй, дараалалгүй. Манай борлуулалтын баг тантай холбогдоно.
            </p>

            <div className="space-y-3 mb-7">
              {[
                { icon: <Car className="w-4 h-4" />, text: "Бүх JETOUR загвар үнэгүй туршилт" },
                { icon: <Calendar className="w-4 h-4" />, text: "30–60 минутад туршиж үзнэ" },
                { icon: <Sparkles className="w-4 h-4" />, text: "Мэргэжлийн зөвлөгөө үнэгүй" },
              ].map((item) => (
                <div
                  key={item.text}
                  className="flex items-center gap-3 bg-white/[0.05] border border-white/10 rounded-xl px-4 py-3"
                >
                  <span className="w-8 h-8 grid place-items-center rounded-lg bg-gradient-to-br from-[#00AEEF]/30 to-[#00AEEF]/10 text-[#4DD0F5]">
                    {item.icon}
                  </span>
                  <span className="text-sm text-white">{item.text}</span>
                </div>
              ))}
            </div>

            <div className="pt-6 border-t border-white/10">
              <p className="text-xs text-white/60 leading-relaxed">
                Холбоо барих утас:{" "}
                <a href={CONTACT.phone1Href} className="text-[#4DD0F5] hover:text-white transition-colors font-bold">
                  {CONTACT.phone1}
                </a>
                {" · "}
                <a href={CONTACT.phone2Href} className="text-[#4DD0F5] hover:text-white transition-colors font-bold">
                  {CONTACT.phone2}
                </a>
                {" · "}
                <span className="text-white">Чингэлтэй, Holiday Inn-ийн урд</span>
              </p>
            </div>
          </motion.div>

          {/* Right — luxury form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="bg-white rounded-2xl p-6 lg:p-8 shadow-2xl"
          >
            {submitted ? (
              <div className="text-center py-12">
                <motion.div
                  initial={{ scale: 0, rotate: -30 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", duration: 0.6 }}
                  className="w-20 h-20 mx-auto mb-5 rounded-full bg-gradient-to-br from-[#0A1F44] to-[#00AEEF] grid place-items-center"
                >
                  <CheckCircle2 className="w-10 h-10 text-white" />
                </motion.div>
                <h3 className="font-display font-extrabold italic text-2xl text-[#0A1F44] mb-2">
                  Бүртгэл амжилттай!
                </h3>
                <p className="text-[#6B7280] text-sm leading-relaxed mb-6 max-w-sm mx-auto">
                  <b className="text-[#0A1F44]">{form.name}</b>, таны тест драйвийн хүсэлт
                  хүлээн авлаа. Манай борлуулалтын баг 24 цагийн дотор холбогдож баталгаажуулна.
                  Таны <b className="text-[#0A1F44]">{form.model}</b> таныг хүлээж байна.
                </p>
                <button
                  onClick={reset}
                  className="btn-outline-jetour rounded-full px-5 py-2.5 text-sm"
                >
                  Шинээр бүртгүүлэх
                </button>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="space-y-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-1.5 h-6 bg-[#00AEEF] rounded-full" />
                  <h3 className="font-display font-extrabold italic text-xl text-[#0A1F44]">
                    Тест драйв бүртгэх
                  </h3>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <Field label="Нэр *">
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Нэрээ оруулна уу"
                      className="w-full bg-transparent text-[#0A1F44] placeholder:text-[#9CA3AF] text-sm focus:outline-none"
                    />
                  </Field>
                  <Field label="Утас *">
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="8 оронтой"
                      maxLength={8}
                      className="w-full bg-transparent text-[#0A1F44] placeholder:text-[#9CA3AF] text-sm focus:outline-none"
                    />
                  </Field>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <Field label="И-мэйл">
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="email@example.com"
                      className="w-full bg-transparent text-[#0A1F44] placeholder:text-[#9CA3AF] text-sm focus:outline-none"
                    />
                  </Field>
                  <Field label="Огноо *">
                    <input
                      type="date"
                      value={form.date}
                      onChange={(e) => setForm({ ...form, date: e.target.value })}
                      min={new Date().toISOString().slice(0, 10)}
                      className="w-full bg-transparent text-[#0A1F44] text-sm focus:outline-none"
                    />
                  </Field>
                </div>

                <Field label="Сонирхсон загвар *">
                  <select
                    value={form.model}
                    onChange={(e) => setForm({ ...form, model: e.target.value })}
                    className="w-full bg-transparent text-[#0A1F44] text-sm focus:outline-none [&>option]:bg-white"
                  >
                    <option value="">Загвараа сонгоно уу</option>
                    {MODELS.map((m) => (
                      <option key={m.id} value={m.name}>
                        {m.name} {m.status === "coming-soon" ? "(тун удахгүй)" : ""}
                      </option>
                    ))}
                  </select>
                </Field>

                <Field label="Нэмэлт мэдээлэл">
                  <textarea
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Асуулт, хүсэлтээ бичнэ үү..."
                    rows={3}
                    className="w-full bg-transparent text-[#0A1F44] placeholder:text-[#9CA3AF] text-sm focus:outline-none resize-none"
                  />
                </Field>

                <button
                  type="submit"
                  className="btn-electric-jetour w-full flex items-center justify-center gap-2 py-4 rounded-xl text-base mt-2"
                >
                  <Send className="w-4 h-4" />
                  Тест драйв бүртгүүлэх
                </button>

                <p className="text-[0.65rem] text-[#6B7280] text-center leading-relaxed pt-1">
                  Таны мэдээлэл зөвхөн JETOUR Mongolia-тай холбоотой зорилгоор ашиглагдана.
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block text-[0.65rem] tracking-[0.18em] uppercase text-[#6B7280] font-display mb-1.5">
        {label}
      </span>
      <div className="flex items-center gap-2.5 bg-[#F7F9FC] border border-[#E2E7EF] rounded-xl px-4 py-3 focus-within:border-[#00AEEF] focus-within:ring-2 focus-within:ring-[#00AEEF]/15 transition-all">
        <div className="flex-1 min-w-0">{children}</div>
      </div>
    </label>
  );
}
