import Link from "next/link";
import { ArrowLeft } from "lucide-react";

/**
 * Дэд хуудсуудын нэгдсэн, цайвар, тансаг гарчгийн блок.
 * Хар/gradient hero-гийн оронд — цагаан суурь, том type scale, уужим зай.
 */
export function PageHeader({
  title,
  lead,
  back,
  align = "left",
}: {
  title: string;
  lead?: string;
  back?: { href: string; label: string };
  align?: "left" | "center";
}) {
  const centered = align === "center";
  return (
    <section className="bg-white border-b border-[#E7E7EA]">
      <div
        className={`container-page pt-28 lg:pt-36 pb-12 lg:pb-16 ${
          centered ? "text-center flex flex-col items-center" : ""
        }`}
      >
        {back && (
          <Link
            href={back.href}
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#666C77] hover:text-[#E20A17] transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            {back.label}
          </Link>
        )}
        <h1 className={`type-h1 text-[#17181B] ${centered ? "max-w-3xl" : ""}`}>{title}</h1>
        {lead && (
          <p className={`type-lead mt-5 ${centered ? "max-w-2xl" : "max-w-2xl"}`}>{lead}</p>
        )}
      </div>
    </section>
  );
}
