"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Field, SaveButton } from "../_ui/form";

type NewsData = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  dateIso: string;
  image: string;
  tag: string;
  type: string;
  accent: string;
  published: boolean;
};

const EMPTY: Omit<NewsData, "id"> = {
  slug: "",
  title: "",
  excerpt: "",
  content: "",
  date: "",
  dateIso: "",
  image: "",
  tag: "",
  type: "Брэндийн мэдээ",
  accent: "electric",
  published: true,
};

export default function NewsForm({ initial }: { initial?: NewsData }) {
  const router = useRouter();
  const isEdit = Boolean(initial);
  const [form, setForm] = useState<Omit<NewsData, "id"> & { id?: string }>(initial ?? EMPTY);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  function set<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSaving(true);
    const url = isEdit ? `/api/admin/news/${initial!.id}` : "/api/admin/news";
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
    router.push("/admin/news");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl">
      {error && <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-3">{error}</p>}

      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Slug (URL-д ашиглагдана, давтагдахгүй)">
          <input value={form.slug} onChange={(e) => set("slug", e.target.value)} disabled={isEdit} required className="input" />
        </Field>
        <Field label="Гарчиг">
          <input value={form.title} onChange={(e) => set("title", e.target.value)} required className="input" />
        </Field>
      </div>

      <Field label="Товч агуулга (excerpt)">
        <textarea value={form.excerpt} onChange={(e) => set("excerpt", e.target.value)} className="input" rows={2} />
      </Field>

      <Field label="Дэлгэрэнгүй агуулга (content)">
        <textarea value={form.content} onChange={(e) => set("content", e.target.value)} className="input" rows={8} />
      </Field>

      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Огноо (харагдах, жишээ: 2026.07.09)">
          <input value={form.date} onChange={(e) => set("date", e.target.value)} className="input" />
        </Field>
        <Field label="Огноо ISO (жишээ: 2026-07-09)">
          <input value={form.dateIso} onChange={(e) => set("dateIso", e.target.value)} className="input" />
        </Field>
      </div>

      <Field label="Зураг (image — зам эсвэл URL)">
        <input value={form.image} onChange={(e) => set("image", e.target.value)} className="input" />
      </Field>

      <div className="grid sm:grid-cols-4 gap-4">
        <Field label="Шошго (tag)">
          <input value={form.tag} onChange={(e) => set("tag", e.target.value)} className="input" />
        </Field>
        <Field label="Төрөл (type)">
          <select value={form.type} onChange={(e) => set("type", e.target.value)} className="input">
            <option>Шинэ загвар</option>
            <option>Брэндийн мэдээ</option>
            <option>Үйлчилгээ</option>
            <option>Үйл явдал</option>
          </select>
        </Field>
        <Field label="Өнгө (accent)">
          <select value={form.accent} onChange={(e) => set("accent", e.target.value)} className="input">
            <option value="electric">electric</option>
            <option value="deep">deep</option>
          </select>
        </Field>
        <Field label="Нийтлэгдсэн">
          <select value={form.published ? "1" : "0"} onChange={(e) => set("published", e.target.value === "1")} className="input">
            <option value="1">Тийм</option>
            <option value="0">Үгүй</option>
          </select>
        </Field>
      </div>

      <SaveButton saving={saving} />
    </form>
  );
}

