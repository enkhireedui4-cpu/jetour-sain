"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Field, SaveButton } from "../_ui/form";

type OfferData = {
  id: string;
  modelId: string;
  modelName: string;
  poster: string;
  title: string;
  desc: string;
  date: string;
  body: string; // JSON-encoded string[] as stored in DB
  tagline: string;
  price: string | null;
  specsJson: string;
  published: boolean;
};

const EMPTY: Omit<OfferData, "id"> = {
  modelId: "",
  modelName: "",
  poster: "",
  title: "",
  desc: "",
  date: "",
  body: "[]",
  tagline: "",
  price: "",
  specsJson: "[]",
  published: true,
};

function bodyArrayToText(bodyJson: string): string {
  try {
    const arr = JSON.parse(bodyJson || "[]");
    return Array.isArray(arr) ? arr.join("\n\n") : "";
  } catch {
    return "";
  }
}

function bodyTextToArray(text: string): string {
  const paragraphs = text
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);
  return JSON.stringify(paragraphs);
}

export default function OfferForm({ initial }: { initial?: OfferData }) {
  const router = useRouter();
  const isEdit = Boolean(initial);
  const [form, setForm] = useState<Omit<OfferData, "id" | "body"> & { id?: string }>(initial ?? EMPTY);
  const [bodyText, setBodyText] = useState(bodyArrayToText(initial?.body ?? "[]"));
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  function set<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    try {
      JSON.parse(form.specsJson || "[]");
    } catch {
      setError("Техникийн үзүүлэлт (specs) талбар буруу JSON бүтэцтэй байна.");
      return;
    }

    const payload = { ...form, body: bodyTextToArray(bodyText) };

    setSaving(true);
    const url = isEdit ? `/api/admin/offers/${initial!.id}` : "/api/admin/offers";
    const method = isEdit ? "PUT" : "POST";
    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    setSaving(false);
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error || "Хадгалахад алдаа гарлаа");
      return;
    }
    router.push("/admin/offers");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl">
      {error && <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-3">{error}</p>}

      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="ID (давтагдахгүй, жишээ: x70-plus-2)">
          <input value={form.id ?? ""} onChange={(e) => set("id", e.target.value)} disabled={isEdit} required className="input" />
        </Field>
        <Field label="Гарчиг (title)">
          <input value={form.title} onChange={(e) => set("title", e.target.value)} required className="input" />
        </Field>
        <Field label="Загварын ID (modelId)">
          <input value={form.modelId} onChange={(e) => set("modelId", e.target.value)} className="input" />
        </Field>
        <Field label="Загварын нэр (modelName)">
          <input value={form.modelName} onChange={(e) => set("modelName", e.target.value)} className="input" />
        </Field>
      </div>

      <Field label="Постер зураг (poster — зам эсвэл URL)">
        <input value={form.poster} onChange={(e) => set("poster", e.target.value)} className="input" />
      </Field>

      <Field label="Товч тайлбар (desc)">
        <textarea value={form.desc} onChange={(e) => set("desc", e.target.value)} className="input" rows={2} />
      </Field>

      <Field label="Уриа (tagline)">
        <textarea value={form.tagline} onChange={(e) => set("tagline", e.target.value)} className="input" rows={2} />
      </Field>

      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Огноо (жишээ: 2026.07.09)">
          <input value={form.date} onChange={(e) => set("date", e.target.value)} className="input" />
        </Field>
        <Field label="Үнэ (price)">
          <input value={form.price ?? ""} onChange={(e) => set("price", e.target.value)} className="input" />
        </Field>
      </div>

      <Field label="Дэлгэрэнгүй агуулга (догол мөр тус бүрийг хоосон мөрөөр тусгаарлана)">
        <textarea value={bodyText} onChange={(e) => setBodyText(e.target.value)} className="input" rows={8} />
      </Field>

      <Field label="Техникийн үзүүлэлт (specs — JSON бүтэц: [{label, value}])">
        <textarea
          value={form.specsJson}
          onChange={(e) => set("specsJson", e.target.value)}
          className="input font-mono text-xs"
          rows={8}
        />
      </Field>

      <Field label="Нийтлэгдсэн">
        <select value={form.published ? "1" : "0"} onChange={(e) => set("published", e.target.value === "1")} className="input max-w-[200px]">
          <option value="1">Тийм</option>
          <option value="0">Үгүй</option>
        </select>
      </Field>

      <SaveButton saving={saving} />
    </form>
  );
}

