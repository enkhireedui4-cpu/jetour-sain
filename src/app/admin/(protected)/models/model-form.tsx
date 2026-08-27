"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Field, SaveButton } from "../_ui/form";

type ModelData = {
  id: string;
  name: string;
  series: string;
  tagline: string;
  shortDesc: string;
  description: string;
  longDescription: string;
  heroImage: string;
  price: string | null;
  priceNote: string | null;
  startingPrice: string | null;
  status: string;
  accent: string;
  order: number;
  detailsJson: string;
  published: boolean;
};

const EMPTY: ModelData = {
  id: "",
  name: "",
  series: "",
  tagline: "",
  shortDesc: "",
  description: "",
  longDescription: "",
  heroImage: "",
  price: "",
  priceNote: "",
  startingPrice: "",
  status: "available",
  accent: "red",
  order: 0,
  detailsJson: "{}",
  published: true,
};

export default function ModelForm({ initial }: { initial?: ModelData }) {
  const router = useRouter();
  const isEdit = Boolean(initial);
  const [form, setForm] = useState<ModelData>(initial ?? EMPTY);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  function set<K extends keyof ModelData>(key: K, value: ModelData[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    try {
      JSON.parse(form.detailsJson || "{}");
    } catch {
      setError("Нарийвчилсан мэдээлэл (detailsJson) талбар буруу JSON бүтэцтэй байна.");
      return;
    }

    setSaving(true);
    const url = isEdit ? `/api/admin/models/${form.id}` : "/api/admin/models";
    const method = isEdit ? "PUT" : "POST";
    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setSaving(false);

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error || "Хадгалахад алдаа гарлаа");
      return;
    }
    router.push("/admin/models");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl">
      {error && <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-3">{error}</p>}

      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="ID (slug, жишээ: x70-plus)">
          <input
            value={form.id}
            onChange={(e) => set("id", e.target.value)}
            disabled={isEdit}
            required
            className="input"
          />
        </Field>
        <Field label="Нэр">
          <input value={form.name} onChange={(e) => set("name", e.target.value)} required className="input" />
        </Field>
        <Field label="Цуврал (series)">
          <input value={form.series} onChange={(e) => set("series", e.target.value)} className="input" />
        </Field>
        <Field label="Уриа үг (tagline)">
          <input value={form.tagline} onChange={(e) => set("tagline", e.target.value)} className="input" />
        </Field>
      </div>

      <Field label="Богино тайлбар (shortDesc)">
        <input value={form.shortDesc} onChange={(e) => set("shortDesc", e.target.value)} className="input" />
      </Field>

      <Field label="Тайлбар (description)">
        <textarea value={form.description} onChange={(e) => set("description", e.target.value)} className="input" rows={3} />
      </Field>

      <Field label="Дэлгэрэнгүй тайлбар (longDescription)">
        <textarea
          value={form.longDescription}
          onChange={(e) => set("longDescription", e.target.value)}
          className="input"
          rows={4}
        />
      </Field>

      <Field label="Гол зураг (heroImage — зам эсвэл URL)">
        <input value={form.heroImage} onChange={(e) => set("heroImage", e.target.value)} className="input" />
      </Field>

      <div className="grid sm:grid-cols-3 gap-4">
        <Field label="Үнэ (price)">
          <input value={form.price ?? ""} onChange={(e) => set("price", e.target.value)} className="input" />
        </Field>
        <Field label="Үнийн тэмдэглэл (priceNote)">
          <input value={form.priceNote ?? ""} onChange={(e) => set("priceNote", e.target.value)} className="input" />
        </Field>
        <Field label="Эхлэх үнэ (startingPrice)">
          <input value={form.startingPrice ?? ""} onChange={(e) => set("startingPrice", e.target.value)} className="input" />
        </Field>
      </div>

      <div className="grid sm:grid-cols-4 gap-4">
        <Field label="Статус">
          <select value={form.status} onChange={(e) => set("status", e.target.value)} className="input">
            <option value="available">Зарагдаж байна</option>
            <option value="coming-soon">Тун удахгүй</option>
          </select>
        </Field>
        <Field label="Өнгө (accent)">
          <select value={form.accent} onChange={(e) => set("accent", e.target.value)} className="input">
            <option value="red">red</option>
            <option value="blue">blue</option>
          </select>
        </Field>
        <Field label="Дараалал (order)">
          <input
            type="number"
            value={form.order}
            onChange={(e) => set("order", Number(e.target.value))}
            className="input"
          />
        </Field>
        <Field label="Нийтлэгдсэн">
          <select
            value={form.published ? "1" : "0"}
            onChange={(e) => set("published", e.target.value === "1")}
            className="input"
          >
            <option value="1">Тийм</option>
            <option value="0">Үгүй</option>
          </select>
        </Field>
      </div>

      <Field label="Нарийвчилсан мэдээлэл (өнгө, зураг, техник үзүүлэлт г.м. — JSON бүтэц)">
        <textarea
          value={form.detailsJson}
          onChange={(e) => set("detailsJson", e.target.value)}
          className="input font-mono text-xs"
          rows={16}
        />
      </Field>

      <div className="flex gap-3">
        <SaveButton saving={saving} />
      </div>
    </form>
  );
}

