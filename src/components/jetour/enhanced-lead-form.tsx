"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  User,
  Phone,
  Mail,
  Car,
  Calendar,
  ShieldCheck,
  MessageSquare,
  Send,
  CheckCircle2,
  Building2,
  PhoneCall,
  MessageCircle,
} from "lucide-react";
import { BRANCHES } from "@/lib/jetour-data";

type PublicModel = { id: string; name: string; status: string };
import { useToast } from "@/hooks/use-toast";
import { trackMetaEvent } from "./meta-pixel";

type LeadType = "test-drive" | "info-request" | "service" | "parts" | "general";

type Props = {
  type?: LeadType;
  title?: string;
  subtitle?: string;
  modelName?: string;
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

// Нарийн цагийн оронд өдрийн хэсэг — сонголт хялбар, showroom утсаар баталгаажуулна
const TIME_OF_DAY = [
  { value: "Өглөө (09:00–12:00)", label: "Өглөө" },
  { value: "Өдөр (12:00–16:00)", label: "Өдөр" },
  { value: "Орой (16:00–20:00)", label: "Орой" },
  { value: "Хэзээ ч болно", label: "Хэзээ ч болно" },
];

/**
 * Салбар · огноо · өдрийн хэсэг · харилцах хэрэгсэл (Messenger/WhatsApp) —
 * анхдагчаар ХААЛТТАЙ.
 *
 * Тест драйвын тусдаа хуудсыг хассан (нэгдсэн нэг маягт болов) тул эдгээр
 * талбарыг ямар ч дуудалт асаадаггүй. Анхдагчийг `true` орхивол шинэ хуудас
 * нэмэхэд санамсаргүйгээр дахин гарч ирэх урхи болно. Оператор залгахдаа
 * салбар, цагийг тодруулна.
 */
export function EnhancedLeadForm({
  type = "info-request",
  title = "Мэдээлэл авах",
  subtitle = "Манай борлуулалтын баг тантай холбогдоно",
  modelName,
  variant = "white",
  showModelField = true,
  showBranchField = false,
  showDateField = false,
  showTimeField = false,
  showContactMethod = false,
  showEmailField = false,
  showMessageField = true,
  submitLabel,
}: Props) {
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [models, setModels] = useState<PublicModel[]>([]);

  useEffect(() => {
    fetch("/api/public/models")
      .then((r) => r.json())
      .then((d) => {
        if (d?.ok) setModels(d.models);
      })
      .catch(() => {});
  }, []);
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
    ? "bg-white/[0.06] border-white/15 focus-within:border-[#E20A17] focus-within:ring-2 focus-within:ring-[#E20A17]/20"
    : "bg-[#F5F5F6] border-[#E7E7EA] focus-within:border-[#E20A17] focus-within:ring-2 focus-within:ring-[#E20A17]/15";
  const inputText = isDark
    ? "text-white placeholder:text-white/50"
    : "text-[#17181B] placeholder:text-[#9CA3AF]";
  const labelClass = isDark
    ? "text-[11px] tracking-[0.18em] uppercase text-white/70 font-display"
    : "text-[11px] tracking-[0.18em] uppercase text-[#6B7280] font-display";
  const headingColor = isDark ? "text-white" : "text-[#17181B]";
  const iconColor = isDark ? "text-white/50" : "text-[#6B7280]";

  const submitLabelFinal =
    submitLabel ??
    (type === "test-drive"
      ? "Тест драйв бүртгүүлэх"
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
      // Meta Pixel — Lead conversion (boost/retargeting-д ашиглана)
      trackMetaEvent("Lead", {
        content_name: type,
        content_category: form.model || undefined,
      });
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
          isDark ? "bg-white/[0.05] border border-white/10" : "bg-white border border-[#E7E7EA]"
        }`}
      >
        <motion.div
          initial={{ scale: 0, rotate: -30 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", duration: 0.6 }}
          className="w-20 h-20 mx-auto mb-5 rounded-full bg-gradient-to-br from-[#17181B] to-[#E20A17] grid place-items-center"
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
              : "border border-[#17181B] text-[#17181B] hover:bg-[#17181B] hover:text-white"
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
      className={`rounded-2xl p-5 lg:p-8 shadow-2xl space-y-3.5 lg:space-y-4 ${
        isDark ? "bg-white/[0.05] border border-white/10" : "bg-white border border-[#E7E7EA]"
      }`}
    >
      <div className="flex items-center gap-2 mb-2">
        <div className="w-1.5 h-6 bg-[#E20A17] rounded-full" />
        <h3 className={`font-display font-extrabold italic text-xl lg:text-2xl ${headingColor}`}>
          {title}
        </h3>
      </div>
      {/* Дэд гарчиг: 12px (`text-xs`) байсныг 13px + уужим мөрийн зайтай
          болгов. Тэр хэмжээ нь «X50 — тест драйв» гэсэн нэг мөрийн шошгод
          тохирч байсан ч дэд гарчиг нь одоо үнэ цэнийг тайлбарлах бүтэн догол
          мөр болсон: утсан дээр 12px-ээр 5 мөр болж, уншихад хүндэрч байв.
          Өнгө нь #6B7280 → #54585F (4.83:1 → 7.15:1). */}
      {subtitle && (
        <p
          className={`text-[13px] leading-relaxed ${
            isDark ? "text-white/65" : "text-[#54585F]"
          }`}
        >
          {subtitle}
        </p>
      )}

      {/* Хариу өгөх амлалт — илгээхээс ӨМНӨ харагдана (санаа зовнилыг бууруулна) */}
      <div
        className={`flex items-center gap-2 rounded-xl px-3.5 py-2.5 mb-1 ${
          isDark ? "bg-white/[0.06]" : "bg-[#F5F5F6]"
        }`}
      >
        <ShieldCheck className="w-4 h-4 text-[#E20A17] shrink-0" />
        <p className={`text-xs leading-snug ${isDark ? "text-white/75" : "text-[#54585F]"}`}>
          Манай борлуулалтын зөвлөх тантай <span className="font-bold text-[#E20A17]">24 цагийн дотор</span> холбогдоно.
        </p>
      </div>

      {/* Name + Phone */}
      <div className="grid sm:grid-cols-2 gap-3">
        <Field label="Нэр *" labelClass={labelClass}>
          <div className={`flex items-center gap-2.5 rounded-xl px-4 py-3 transition-all ${inputBg}`}>
            <User className={`w-3.5 h-3.5 ${iconColor}`} />
            <input
              type="text"
              /* `name` + `autoComplete` — утсан дээр хөтөч/нууц үг хадгалагч
                 нэр, дугаарыг автоматаар санал болгоно. Үүнгүйгээр хэрэглэгч
                 бүгдийг гараар шивдэг — гол хөрвүүлэлтийн зам дээрх шууд саад. */
              name="name"
              autoComplete="name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Таны нэр"
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
              name="phone"
              autoComplete="tel"
              /* Монголын дугаар 8 оронтой цэвэр тоо — утсанд тоон гар гарна */
              inputMode="numeric"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              placeholder="Утасны дугаар (8811xxxx)"
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
              name="email"
              autoComplete="email"
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
        <Field label="Сонирхож буй загвар" labelClass={labelClass}>
          <div className={`flex items-center gap-2.5 rounded-xl px-4 py-3 transition-all ${inputBg}`}>
            <Car className={`w-3.5 h-3.5 ${iconColor}`} />
            <select
              value={form.model}
              onChange={(e) => setForm({ ...form, model: e.target.value })}
              className={`w-full bg-transparent text-sm focus:outline-none ${inputText} [&>option]:bg-white [&>option]:text-[#17181B]`}
            >
              <option value="">{modelName ?? "Загвар сонгох (Заавал биш)"}</option>
              {models.map((m) => (
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
              className={`w-full bg-transparent text-sm focus:outline-none ${inputText} disabled:opacity-70 [&>option]:bg-white [&>option]:text-[#17181B]`}
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
            <Field label="Тохиромжтой цаг" labelClass={labelClass}>
              <div className="grid grid-cols-2 gap-2">
                {TIME_OF_DAY.map((t) => {
                  const active = form.time === t.value;
                  return (
                    <button
                      key={t.value}
                      type="button"
                      onClick={() => setForm({ ...form, time: active ? "" : t.value })}
                      aria-pressed={active}
                      className={`flex items-center justify-center gap-1.5 py-2.5 rounded-full border text-[0.8rem] font-semibold transition-all ${
                        active
                          ? "border-[#17181B] bg-[#17181B] text-white"
                          : isDark
                          ? "border-white/15 text-white/70 hover:border-white/30"
                          : "border-[#E7E7EA] text-[#54585F] hover:border-[#17181B]/30"
                      }`}
                    >
                      {t.label}
                    </button>
                  );
                })}
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

      <p className={`text-[11px] text-center leading-relaxed pt-1 ${isDark ? "text-white/50" : "text-[#6B7280]"}`}>
        Таны мэдээллийг зөвхөн тантай холбогдох зорилгоор ашиглах бөгөөд гуравдагч талд задруулахгүй.{" "}
        <a href="/privacy" className="underline text-[#E20A17]">
          Нууцлалын бодлого
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
          ? "border-[#E20A17] bg-[#E20A17]/10 text-[#E20A17]"
          : isDark
          ? "border-white/15 text-white/60 hover:border-white/30"
          : "border-[#E7E7EA] text-[#6B7280] hover:border-[#17181B]/20"
      }`}
    >
      {icon}
      <span className="text-[0.65rem] font-display font-bold tracking-wider">{label}</span>
    </button>
  );
}
