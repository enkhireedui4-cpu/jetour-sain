"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Car, User, Phone, Clock, Send, CheckCircle2, Gift } from "lucide-react";
import { MODELS, CONTACT } from "@/lib/jetour-data";
import { useToast } from "@/hooks/use-toast";

export function TestDrive() {
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    model: "",
    date: "",
    time: "",
  });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.model || !form.date || !form.time) {
      toast({
        variant: "destructive",
        title: "Мэдээлэл дутуу байна",
        description: "Бүх талбарыг бөглөнө үү.",
      });
      return;
    }
    // Mongolian phone validation — 8 digits
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
      title: "Бүртгэл амжилттай!",
      description: `${form.name} — манай хамт олон удахгүй холбогдоно.`,
    });
  };

  const reset = () => {
    setForm({ name: "", phone: "", model: "", date: "", time: "" });
    setSubmitted(false);
  };

  return (
    <section
      id="test-drive"
      className="relative py-24 lg:py-32 overflow-hidden bg-cinematic"
    >
      <div className="absolute inset-0 bg-grid opacity-25 pointer-events-none" />
      <div className="relative mx-auto w-[min(1180px,92vw)]">
        <div className="grid lg:grid-cols-[1fr_1fr] gap-12 lg:gap-16 items-center">
          {/* Left — copy */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <p className="eyebrow mb-3">
              <span className="text-jetour-red">05</span> · Тест драйв бүртгэл
            </p>
            <h2 className="font-display font-extrabold italic leading-[0.95] text-paper text-4xl lg:text-6xl mb-5">
              Өөрийн биеэр{" "}
              <span className="text-gradient-fire">мэдрээрэй</span>
            </h2>
            <p className="text-chrome text-base leading-relaxed mb-7">
              Зураг, видеогоор дамжуулан ойлгох аргагүй — сууж, жолоодон, өөртөө тохирох эсэхийг
              мэдрэх. Тест драйв үнэгүй, дараалалгүй. Бүртгэлээ баталгаажуулахын тулд манай
              баг тантай холбогдоно.
            </p>

            <div className="space-y-3">
              {[
                { icon: <Car className="w-4 h-4" />, text: "Бүх JETOUR загвар үнэгүй туршилт" },
                { icon: <Clock className="w-4 h-4" />, text: "30–60 минутад туршиж үзнэ" },
                { icon: <Gift className="w-4 h-4" />, text: "Эхний 50 зочинд бэлэг сугалаа" },
              ].map((item) => (
                <div
                  key={item.text}
                  className="flex items-center gap-3 glass rounded-xl px-4 py-3"
                >
                  <span className="w-8 h-8 grid place-items-center rounded-lg bg-gradient-to-br from-jetour-red/25 to-jetour-blue/25 text-paper">
                    {item.icon}
                  </span>
                  <span className="text-sm text-paper">{item.text}</span>
                </div>
              ))}
            </div>

            <div className="mt-7 pt-7 border-t border-line">
              <p className="text-xs text-muted-ink leading-relaxed">
                Бүртгэлийн утас:{" "}
                <a href={CONTACT.phoneHref} className="text-paper hover:text-jetour-red-soft transition-colors">
                  {CONTACT.phone}
                </a>
                {" · "}
                Байршил: <span className="text-paper">{CONTACT.address}</span>
              </p>
            </div>
          </motion.div>

          {/* Right — form card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8 }}
            className="glass rounded-2xl p-6 lg:p-8"
          >
            {submitted ? (
              <div className="text-center py-10">
                <motion.div
                  initial={{ scale: 0, rotate: -30 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", duration: 0.6 }}
                  className="w-20 h-20 mx-auto mb-5 rounded-full bg-gradient-to-br from-jetour-red to-jetour-blue grid place-items-center"
                >
                  <CheckCircle2 className="w-10 h-10 text-white" />
                </motion.div>
                <h3 className="font-display font-extrabold italic text-2xl text-paper mb-2">
                  Бүртгэл амжилттай!
                </h3>
                <p className="text-chrome text-sm leading-relaxed mb-6 max-w-sm mx-auto">
                  <b className="text-paper">{form.name}</b>, таны өргөдөл хүлээн авлаа. Манай хамт
                  олон тест драйвын өдрөөс өмнө холбогдож баталгаажуулна. Таны {form.model}{" "}
                  таныг хүлээж байна.
                </p>
                <button
                  onClick={reset}
                  className="font-display font-bold text-sm text-paper border border-line rounded-full px-5 py-2.5 hover:bg-panel/60 transition-colors"
                >
                  Шинээр бүртгүүлэх
                </button>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="space-y-4">
                <Field label="Нэр *" icon={<User className="w-4 h-4" />}>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Нэрээ оруулна уу"
                    className="w-full bg-transparent text-paper placeholder:text-muted-ink text-sm focus:outline-none"
                  />
                </Field>

                <Field label="Утасны дугаар *" icon={<Phone className="w-4 h-4" />}>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="8 оронтой дугаар"
                    maxLength={8}
                    className="w-full bg-transparent text-paper placeholder:text-muted-ink text-sm focus:outline-none"
                  />
                </Field>

                <Field label="Сонирхсон загвар *" icon={<Car className="w-4 h-4" />}>
                  <select
                    value={form.model}
                    onChange={(e) => setForm({ ...form, model: e.target.value })}
                    className="w-full bg-transparent text-paper text-sm focus:outline-none [&>option]:bg-ink"
                  >
                    <option value="">Загвараа сонгоно уу</option>
                    {MODELS.map((m) => (
                      <option key={m.id} value={m.name}>
                        {m.name}
                      </option>
                    ))}
                  </select>
                </Field>

                <div className="grid grid-cols-2 gap-3">
                  <Field label="Огноо *" icon={<Calendar className="w-4 h-4" />}>
                    <input
                      type="date"
                      value={form.date}
                      onChange={(e) => setForm({ ...form, date: e.target.value })}
                      min={new Date().toISOString().slice(0, 10)}
                      className="w-full bg-transparent text-paper text-sm focus:outline-none [color-scheme:dark]"
                    />
                  </Field>
                  <Field label="Цаг *" icon={<Clock className="w-4 h-4" />}>
                    <select
                      value={form.time}
                      onChange={(e) => setForm({ ...form, time: e.target.value })}
                      className="w-full bg-transparent text-paper text-sm focus:outline-none [&>option]:bg-ink"
                    >
                      <option value="">Цаг сонгох</option>
                      <option value="11:00–13:00">11:00 – 13:00</option>
                      <option value="13:00–15:00">13:00 – 15:00</option>
                      <option value="15:00–17:00">15:00 – 17:00</option>
                      <option value="17:00–20:00">17:00 – 20:00</option>
                    </select>
                  </Field>
                </div>

                <button
                  type="submit"
                  className="btn-jetour w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-base mt-2"
                >
                  <Send className="w-4 h-4" />
                  Бүртгүүлэх
                </button>

                <p className="text-[0.65rem] text-muted-ink text-center leading-relaxed pt-1">
                  Мэдээллийг зөвхөн тест драйвийн зорилгоор ашиглана.{" "}
                  <span className="text-jetour-red-soft">✓ Үнэгүй</span>{" "}
                  <span className="text-jetour-blue-soft">✓ Дараалалгүй</span>
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  icon,
  children,
}: {
  label: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="block text-[0.65rem] tracking-[0.18em] uppercase text-muted-ink font-display mb-1.5">
        {label}
      </span>
      <div className="flex items-center gap-2.5 bg-ink/60 border border-line rounded-xl px-4 py-3 focus-within:border-jetour-red/60 transition-colors">
        <span className="text-muted-ink">{icon}</span>
        <div className="flex-1 min-w-0">{children}</div>
      </div>
    </label>
  );
}
