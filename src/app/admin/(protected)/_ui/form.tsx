/**
 * Админы маягтын хуваалцсан хэсгүүд.
 *
 * `model-form`, `news-form`, `offer-form` гурав нь `Field` компонент болон
 * хадгалах товчийг ҮСЭГ ҮСГЭЭРЭЭ ижилхэн гурван удаа давтаж бичсэн байв.
 * Нэг өөрчлөлт гурван газар засах шаардлагатай болдог тул энд гаргав.
 *
 * `.input` классын CSS мөн гурван файлд `<style jsx global>`-оор давхардаж
 * байсныг `admin.css`-д гаргаж, `layout.tsx`-д нэг л удаа импортлов —
 * ингэснээр нийтийн хуудсууд руу тэр CSS явахгүй.
 */

export function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="block text-xs font-semibold text-[#6B7280] mb-1.5">
        {label}
      </span>
      {children}
    </label>
  );
}

export function SaveButton({ saving }: { saving: boolean }) {
  return (
    <button
      type="submit"
      disabled={saving}
      className="bg-[#E20A17] text-white font-bold px-6 py-2.5 rounded-lg hover:bg-[#17181B] transition-colors disabled:opacity-60"
    >
      {saving ? "Хадгалж байна..." : "Хадгалах"}
    </button>
  );
}
