"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { User, Phone, Car, MessageSquare, Send, CheckCircle2 } from "lucide-react";
import { ALL_MODELS_FOR_GRID } from "@/lib/jetour-data";
import { useToast } from "@/hooks/use-toast";

type Variant = "glass-light" | "glass-dark" | "solid-white";

type Props = {
  variant?: Variant;
  title?: string;
  subtitle?: string;
  showBookTestDrive?: boolean;
  compact?: boolean;
};

export function LeadForm({
  variant = "solid-white",
  title = "Мэдээлэл авах",
  subtitle = "Манай борлуулалтын баг тантай холбогдоно",
  showBookTestDrive = true,
  compact = false,
}: Props) {
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    model: "",
    message: "",
  });

  const onSubmit = (e: React.FormEvent, action: "quote" | "test-drive") => {
    e.preventDefault();
    if (!form.name || !form.phone) {
      toast({
        variant: "destructive",
        title: "Мэдээлэл дутуу байна",
        description: "Нэр болон утасны дугаараа оруулна уу.",
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
      title: action === "test-drive" ? "Тест драйв бүртгэгдлээ!" : "Хүсэлт амжилттай!",
      description: `${form.name}, манай борлуулалтын баг удахгүй холбогдоно.`,
    });
  };

  const reset = () => {
    setForm({ name: "", phone: "", model: "", message: "" });
    setSubmitted(false);
  };

  const isLight = variant === "glass-light";
  const isSolid = variant === "solid-white";

  const containerClass = isSolid
    ? "bg-white rounded-2xl p-6 lg:p-7 shadow-2xl border border-[#E2E7EF]"
    : isLight
    ? "glass-premium rounded-2xl p-6 lg:p-7"
    : "glass-dark rounded-2xl p-6 lg:p-7";

  const labelClass = isLight || isSolid
    ? "text-[0.6rem] tracking-[0.18em] uppercase text-[#6B7280] font-display"
    : "text-[0.6rem] tracking-[0.18em] uppercase text-white/70 font-display";

  const inputBg = isLight || isSolid
    ? "bg-[#F7F9FC] border border-[#E2E7EF] focus-within:border-[#00AEEF] focus-within:ring-2 focus-within:ring-[#00AEEF]/15"
    : "bg-white/[0.06] border border-white/15 focus-within:border-[#00AEEF] focus-within:ring-2 focus-within:ring-[#00AEEF]/20";

  const inputText = isLight || isSolid
    ? "text-[#0A1F44] placeholder:text-[#9CA3AF]"
    : "text-white placeholder:text-white/50";

  const headingColor = isLight || isSolid ? "text-[#0A1F44]" : "text-white";

  if (submitted) {
    return (
      <div className={`${containerClass} text-center py-12`}>
        <motion.div
          initial={{ scale: 0, rotate: -30 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", duration: 0.6 }}
          className="w-20 h-20 mx-auto mb-5 rounded-full bg-gradient-to-br from-[#0A1F44] to-[#00AEEF] grid place-items-center"
        >
          <CheckCircle2 className="w-10 h-10 text-white" />
        </motion.div>
        <h3 className={`font-display font-extrabold italic text-2xl mb-2 ${headingColor}`}>
          Баярлалаа!
        </h3>
        <p className={`text-sm leading-relaxed mb-6 max-w-sm mx-auto ${isLight || isSolid ? "text-[#6B7280]" : "text-white/70"}`}>
          Манай борлуулалтын баг тантай удахгүй холбогдох болно.
        </p>
        <button
          onClick={reset}
          className={`font-display font-bold text-sm rounded-full px-5 py-2.5 transition-colors ${
            isLight || isSolid
              ? "border border-[#0A1F44] text-[#0A1F44] hover:bg-[#0A1F44] hover:text-white"
              : "border border-white/30 text-white hover:bg-white/10"
          }`}
        >
          Шинээр хүсэлт илгээх
        </button>
      </div>
    );
  }

  return (
    <div className={containerClass}>
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-1.5 h-6 bg-[#00AEEF] rounded-full" />
          <h3 className={`font-display font-extrabold italic text-xl lg:text-2xl ${headingColor}`}>
            {title}
          </h3>
        </div>
        <p className={`text-xs ${isLight || isSolid ? "text-[#6B7280]" : "text-white/60"}`}>
          {subtitle}
        </p>
      </div>

      <form onSubmit={(e) => onSubmit(e, "quote")} className="space-y-3">
        <div className={`grid ${compact ? "grid-cols-1" : "sm:grid-cols-2"} gap-3`}>
          <label className="block">
            <span className={`block mb-1.5 ${labelClass}`}>Нэр *</span>
            <div className={`flex items-center gap-2.5 rounded-xl px-4 py-3 transition-all ${inputBg}`}>
              <User className={`w-3.5 h-3.5 ${isLight || isSolid ? "text-[#6B7280]" : "text-white/50"}`} />
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Нэрээ оруулна уу"
                className={`w-full bg-transparent text-sm focus:outline-none ${inputText}`}
              />
            </div>
          </label>

          <label className="block">
            <span className={`block mb-1.5 ${labelClass}`}>Утас *</span>
            <div className={`flex items-center gap-2.5 rounded-xl px-4 py-3 transition-all ${inputBg}`}>
              <Phone className={`w-3.5 h-3.5 ${isLight || isSolid ? "text-[#6B7280]" : "text-white/50"}`} />
              <input
                type="tel"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                placeholder="8 оронтой"
                maxLength={8}
                className={`w-full bg-transparent text-sm focus:outline-none ${inputText}`}
              />
            </div>
          </label>
        </div>

        <label className="block">
          <span className={`block mb-1.5 ${labelClass}`}>Сонирхсон загвар</span>
          <div className={`flex items-center gap-2.5 rounded-xl px-4 py-3 transition-all ${inputBg}`}>
            <Car className={`w-3.5 h-3.5 ${isLight || isSolid ? "text-[#6B7280]" : "text-white/50"}`} />
            <select
              value={form.model}
              onChange={(e) => setForm({ ...form, model: e.target.value })}
              className={`w-full bg-transparent text-sm focus:outline-none ${inputText} [&>option]:bg-white [&>option]:text-[#0A1F44]`}
            >
              <option value="">Загвар сонгох (заавал биш)</option>
              {ALL_MODELS_FOR_GRID.map((m) => (
                <option key={m.id} value={m.name}>
                  {m.name} {m.status === "coming-soon" ? "(тун удахгүй)" : ""}
                </option>
              ))}
            </select>
          </div>
        </label>

        {!compact && (
          <label className="block">
            <span className={`block mb-1.5 ${labelClass}`}>Нэмэлт мэдээлэл</span>
            <div className={`flex items-start gap-2.5 rounded-xl px-4 py-3 transition-all ${inputBg}`}>
              <MessageSquare className={`w-3.5 h-3.5 mt-0.5 ${isLight || isSolid ? "text-[#6B7280]" : "text-white/50"}`} />
              <textarea
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="Асуулт, хүсэлтээ бичнэ үү..."
                rows={2}
                className={`w-full bg-transparent text-sm focus:outline-none resize-none ${inputText}`}
              />
            </div>
          </label>
        )}

        <div className={`flex ${compact ? "flex-col" : "flex-col sm:flex-row"} gap-2 pt-1`}>
          <button
            type="submit"
            className="btn-electric-jetour flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm"
          >
            <Send className="w-4 h-4" />
            Үнийн санал
          </button>
          {showBookTestDrive && (
            <button
              type="button"
              onClick={(e) => onSubmit(e as unknown as React.FormEvent, "test-drive")}
              className={`flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-display font-bold transition-all ${
                isLight || isSolid
                  ? "border border-[#0A1F44] text-[#0A1F44] hover:bg-[#0A1F44] hover:text-white"
                  : "border border-white/40 text-white hover:bg-white/15"
              }`}
            >
              Тест драйв
            </button>
          )}
        </div>

        <p className={`text-[0.6rem] text-center leading-relaxed pt-1 ${isLight || isSolid ? "text-[#6B7280]" : "text-white/50"}`}>
          Таны мэдээлэл зөвхөн JETOUR Mongolia-тай холбоотой зорилгоор ашиглагдана.
        </p>
      </form>
    </div>
  );
}
