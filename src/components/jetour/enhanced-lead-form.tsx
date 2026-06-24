"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  User,
  Phone,
  Mail,
  Car,
  Calendar,
  Clock,
  MessageSquare,
  Send,
  CheckCircle2,
  Building2,
  PhoneCall,
  MessageCircle,
} from "lucide-react";
import { ALL_MODELS_FOR_GRID, BRANCHES, CONTACT } from "@/lib/jetour-data";
import { useToast } from "@/hooks/use-toast";

type LeadType = "test-drive" | "info-request" | "financing" | "service" | "parts" | "general";

type Props = {
  type?: LeadType;
  title?: string;
  subtitle?: string;
  modelName?: string;
  // financing-specific
  financingData?: {
    vehiclePrice?: number;
    downPayment?: number;
    termMonths?: number;
    interestRate?: number;
    monthlyPayment?: number;
  };
  variant?: "white" | "dark";
  showModelField?: boolean;
  showBranchField?: boolean;
  showDateField?: boolean;
  showTimeField?: boolean;
  showContactMethod?: boolean;
  showEmailField?: boolean;
  showMessageField?: boolean;
  submitLabel?: string;
};

const TIME_SLOTS = [
  "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "12:00", "12:30", "13:00", "13:30", "14:00", "14:30",
  "15:00", "15:30", "16:00", "16:30", "17:00", "17:30",
  "18:00", "18:30", "19:00",
];

export function EnhancedLeadForm({
  type = "test-drive",
  title = "Тест драйв бүртгэх",
  subtitle = "Манай борлуулалтын баг тантай холбогдоно",
  modelName,
  financingData,
  variant = "white",
  showModelField = true,
  showBranchField = true,
  showDateField = true,
  showTimeField = true,
  showContactMethod = true,
  showEmailField = false,
  showMessageField = true,
  submitLabel,
}: Props) {
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    model: modelName ?? "",
    branch: BRANCHES.length === 1 ? BRANCHES[0].id : "",
    date: "",
    time: "",
    contactMethod: "call" as "call" | "messenger" | "whatsapp",
    message: "",
  });

  const isDark = variant === "dark";
  const inputBg = isDark
    ? "bg-white/[0.06] border-white/15 focus-within:border-[#00AEEF] focus-within:ring-2 focus-within:ring-[#00AEEF]/20"
    : "bg-[#F7F9FC] border-[#E2E7EF] focus-within:border-[#00AEEF] focus-within:ring-2 focus-within:ring-[#00AEEF]/15";
  const inputText = isDark
    ? "text-white placeholder:text-white/50"
    : "text-[#0A1F44] placeholder:text-[#9CA3AF]";
  const labelClass = isDark
    ? "text-[0.6rem] tracking-[0.18em] uppercase text-white/70 font-display"
    : "text-[0.6rem] tracking-[0.18em] uppercase text-[#6B7280] font-display";
  const headingColor = isDark ? "text-white" : "text-[#0A1F44]";
  const iconColor = isDark ? "text-white/50" : "text-[#6B7280]";

  const submitLabelFinal =
    submitLabel ??
    (type === "test-drive"
      ? "Тест драйв бүртгүүлэх"
      : type === "financing"
      ? "Зээлийн өргөдөл илгээх"
      : type === "service"
      ? "Засвар захиалах"
      : type === "parts"
      ? "Сэлбэг захиалах"
      : "Хүсэлт илгээх");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone) {
      toast({
        variant: "destructive",
        title: "Мэдээлэл дутуу байна",
        description: "Нэр болон утас заавал шаардлагатай.",
      });
      return;
    }
    const digits = form.phone.replace(/\D/g, "");
    if (digits.length < 7 || digits.length > 12) {
      toast({
        variant: "destructive",
        title: "Утасны дугаар буруу",
        description: "Зөв утасны дугаараа оруулна уу.",
      });
      return;
    }
    if (showDateField && !form.date) {
      toast({
        variant: "destructive",
        title: "Огноо сонгоно уу",
        description: "Та тест драйвийн огноо сонгох шаардлагатай.",
      });
      return;
    }

    setSubmitting(true);
    try {
      const payload: Record<string, unknown> = {
        type,
        name: form.name,
        phone: form.phone,
      };
      if (form.email) payload.email = form.email;
      if (form.model) payload.model = form.model;
      if (form.branch) {
        const branch = BRANCHES.find((b) => b.id === form.branch);
        payload.branch = branch ? branch.name : form.branch;
      }
      if (form.date) payload.date = form.date;
      if (form.time) payload.time = form.time;
      if (showContactMethod) payload.contactMethod = form.contactMethod;
      if (form.message) payload.message = form.message;
      if (financingData) Object.assign(payload, financingData);

      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Хүсэлт илгээхэд алдаа гарлаа");
      }
      setSubmitted(true);
      toast({
        title: "Амжилттай!",
        description: `${form.name}, манай баг удахгүй холбогдоно.`,
      });
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Алдаа",
        description: err instanceof Error ? err.message : "Хүсэлт илгээхэд алдаа гарлаа",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const reset = () => {
    setForm({
      name: "",
      phone: "",
      email: "",
      model: modelName ?? "",
      branch: BRANCHES.length === 1 ? BRANCHES[0].id : "",
      date: "",
      time: "",
      contactMethod: "call",
      message: "",
    });
    setSubmitted(false);
  };

  if (submitted) {
    return (
      <div
        className={`rounded-2xl p-8 shadow-2xl text-center ${
          isDark ? "bg-white/[0.05] border border-white/10" : "bg-white border border-[#E2E7EF]"
        }`}
      >
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
        <p className={`text-sm leading-relaxed mb-6 max-w-sm mx-auto ${isDark ? "text-white/70" : "text-[#6B7280]"}`}>
          Таны хүсэлт амжилттай хүлээн авлаа. Манай борлуулалтын баг 24 цагийн дотор холбогдож
          баталгаажуулна.
        </p>
        <button
          onClick={reset}
          className={`font-display font-bold text-sm rounded-full px-5 py-2.5 transition-colors ${
            isDark
              ? "border border-white/30 text-white hover:bg-white/10"
              : "border border-[#0A1F44] text-[#0A1F44] hover:bg-[#0A1F44] hover:text-white"
          }`}
        >
          Шинээр хүсэлт илгээх
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className={`rounded-2xl p-6 lg:p-8 shadow-2xl space-y-4 ${
        isDark ? "bg-white/[0.05] border border-white/10" : "bg-white border border-[#E2E7EF]"
      }`}
    >
      <div className="flex items-center gap-2 mb-2">
        <div className="w-1.5 h-6 bg-[#00AEEF] rounded-full" />
        <h3 className={`font-display font-extrabold italic text-xl lg:text-2xl ${headingColor}`}>
          {title}
        </h3>
      </div>
      <p className={`text-xs mb-2 ${isDark ? "text-white/60" : "text-[#6B7280]"}`}>{subtitle}</p>

      {/* Name + Phone */}
      <div className="grid sm:grid-cols-2 gap-3">
        <Field label="Нэр *" labelClass={labelClass}>
          <div className={`flex items-center gap-2.5 rounded-xl px-4 py-3 transition-all ${inputBg}`}>
            <User className={`w-3.5 h-3.5 ${iconColor}`} />
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Нэрээ оруулна уу"
              required
              className={`w-full bg-transparent text-sm focus:outline-none ${inputText}`}
            />
          </div>
        </Field>
        <Field label="Утас *" labelClass={labelClass}>
          <div className={`flex items-center gap-2.5 rounded-xl px-4 py-3 transition-all ${inputBg}`}>
            <Phone className={`w-3.5 h-3.5 ${iconColor}`} />
            <input
              type="tel"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              placeholder="8 оронтой"
              required
              className={`w-full bg-transparent text-sm focus:outline-none ${inputText}`}
            />
          </div>
        </Field>
      </div>

      {/* Email (optional) */}
      {showEmailField && (
        <Field label="И-мэйл" labelClass={labelClass}>
          <div className={`flex items-center gap-2.5 rounded-xl px-4 py-3 transition-all ${inputBg}`}>
            <Mail className={`w-3.5 h-3.5 ${iconColor}`} />
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="email@example.com"
              className={`w-full bg-transparent text-sm focus:outline-none ${inputText}`}
            />
          </div>
        </Field>
      )}

      {/* Model */}
      {showModelField && (
        <Field label="Сонирхсон загвар" labelClass={labelClass}>
          <div className={`flex items-center gap-2.5 rounded-xl px-4 py-3 transition-all ${inputBg}`}>
            <Car className={`w-3.5 h-3.5 ${iconColor}`} />
            <select
              value={form.model}
              onChange={(e) => setForm({ ...form, model: e.target.value })}
              className={`w-full bg-transparent text-sm focus:outline-none ${inputText} [&>option]:bg-white [&>option]:text-[#0A1F44]`}
            >
              <option value="">{modelName ?? "Загвар сонгох (заавал биш)"}</option>
              {ALL_MODELS_FOR_GRID.map((m) => (
                <option key={m.id} value={m.name}>
                  {m.name} {m.status === "coming-soon" ? "(тун удахгүй)" : ""}
                </option>
              ))}
            </select>
          </div>
        </Field>
      )}

      {/* Branch */}
      {showBranchField && (
        <Field
          label="Салбар / Showroom"
          labelClass={labelClass}
          disabled={BRANCHES.length === 1}
        >
          <div className={`flex items-center gap-2.5 rounded-xl px-4 py-3 transition-all ${inputBg}`}>
            <Building2 className={`w-3.5 h-3.5 ${iconColor}`} />
            <select
              value={form.branch}
              onChange={(e) => setForm({ ...form, branch: e.target.value })}
              disabled={BRANCHES.length === 1}
              className={`w-full bg-transparent text-sm focus:outline-none ${inputText} disabled:opacity-70 [&>option]:bg-white [&>option]:text-[#0A1F44]`}
            >
              <option value="">Салбар сонгох</option>
              {BRANCHES.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.name} — {b.city}
                </option>
              ))}
            </select>
          </div>
        </Field>
      )}

      {/* Date + Time */}
      {(showDateField || showTimeField) && (
        <div className="grid sm:grid-cols-2 gap-3">
          {showDateField && (
            <Field label="Огноо *" labelClass={labelClass}>
              <div className={`flex items-center gap-2.5 rounded-xl px-4 py-3 transition-all ${inputBg}`}>
                <Calendar className={`w-3.5 h-3.5 ${iconColor}`} />
                <input
                  type="date"
                  value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                  min={new Date().toISOString().slice(0, 10)}
                  required
                  className={`w-full bg-transparent text-sm focus:outline-none ${inputText}`}
                />
              </div>
            </Field>
          )}
          {showTimeField && (
            <Field label="Цаг" labelClass={labelClass}>
              <div className={`flex items-center gap-2.5 rounded-xl px-4 py-3 transition-all ${inputBg}`}>
                <Clock className={`w-3.5 h-3.5 ${iconColor}`} />
                <select
                  value={form.time}
                  onChange={(e) => setForm({ ...form, time: e.target.value })}
                  className={`w-full bg-transparent text-sm focus:outline-none ${inputText} [&>option]:bg-white [&>option]:text-[#0A1F44]`}
                >
                  <option value="">Цаг сонгох</option>
                  {TIME_SLOTS.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>
            </Field>
          )}
        </div>
      )}

      {/* Contact method */}
      {showContactMethod && (
        <Field label="Харилцах хэрэгсэл" labelClass={labelClass}>
          <div className="grid grid-cols-3 gap-2">
            <ContactMethodBtn
              active={form.contactMethod === "call"}
              onClick={() => setForm({ ...form, contactMethod: "call" })}
              icon={<PhoneCall className="w-4 h-4" />}
              label="Утсаар"
              isDark={isDark}
            />
            <ContactMethodBtn
              active={form.contactMethod === "messenger"}
              onClick={() => setForm({ ...form, contactMethod: "messenger" })}
              icon={<MessageCircle className="w-4 h-4" />}
              label="Messenger"
              isDark={isDark}
            />
            <ContactMethodBtn
              active={form.contactMethod === "whatsapp"}
              onClick={() => setForm({ ...form, contactMethod: "whatsapp" })}
              icon={<MessageSquare className="w-4 h-4" />}
              label="WhatsApp"
              isDark={isDark}
            />
          </div>
        </Field>
      )}

      {/* Message */}
      {showMessageField && (
        <Field label="Нэмэлт мэдээлэл" labelClass={labelClass}>
          <div className={`flex items-start gap-2.5 rounded-xl px-4 py-3 transition-all ${inputBg}`}>
            <MessageSquare className={`w-3.5 h-3.5 mt-0.5 ${iconColor}`} />
            <textarea
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              placeholder="Асуулт, хүсэлтээ бичнэ үү..."
              rows={3}
              className={`w-full bg-transparent text-sm focus:outline-none resize-none ${inputText}`}
            />
          </div>
        </Field>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="btn-electric-jetour w-full flex items-center justify-center gap-2 py-4 rounded-xl text-base mt-2 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {submitting ? (
          <>
            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Илгээж байна...
          </>
        ) : (
          <>
            <Send className="w-4 h-4" />
            {submitLabelFinal}
          </>
        )}
      </button>

      <p className={`text-[0.6rem] text-center leading-relaxed pt-1 ${isDark ? "text-white/50" : "text-[#6B7280]"}`}>
        Таны мэдээлэл зөвхөн JETOUR Mongolia-тай холбоотой зорилгоор ашиглагдана.{" "}
        <a href={CONTACT.phone1Href} className={`underline ${isDark ? "text-[#4DD0F5]" : "text-[#00AEEF]"}`}>
          {CONTACT.phone1}
        </a>
      </p>
    </form>
  );
}

function Field({
  label,
  labelClass,
  children,
  disabled,
}: {
  label: string;
  labelClass: string;
  children: React.ReactNode;
  disabled?: boolean;
}) {
  return (
    <label className={`block ${disabled ? "opacity-70" : ""}`}>
      <span className={`block mb-1.5 ${labelClass}`}>{label}</span>
      {children}
    </label>
  );
}

function ContactMethodBtn({
  active,
  onClick,
  icon,
  label,
  isDark,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
  isDark: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex flex-col items-center gap-1.5 py-3 rounded-xl border transition-all ${
        active
          ? "border-[#00AEEF] bg-[#00AEEF]/10 text-[#00AEEF]"
          : isDark
          ? "border-white/15 text-white/60 hover:border-white/30"
          : "border-[#E2E7EF] text-[#6B7280] hover:border-[#0A1F44]/20"
      }`}
    >
      {icon}
      <span className="text-[0.65rem] font-display font-bold tracking-wider">{label}</span>
    </button>
  );
}
