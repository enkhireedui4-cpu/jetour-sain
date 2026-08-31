import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { SpecialOffer } from "@/lib/jetour-data";

/**
 * Нүүр хуудасны «Тусгай санал» товч блок.
 *
 * Navbar-т «Тусгай санал» нэгдүгээрт байдаг ч нүүр хуудас саналыг огт
 * харуулдаггүй байв — амлалт ба агуулга зөрж, дунд хэсэгт хөрвөх агшин
 * үлдэхгүй байсан. Энэ блок нь Models ба News хооронд орж, хамгийн сүүлийн
 * гурван саналыг үзүүлээд бүх санал руу хөтөлнө.
 *
 * ХАРАГДАЦ (Мэдээ хэсэгтэй нэг хэвээр):
 *   · Утас — ТӨРӨЛХ хэвтээ scroll-snap: карт бүр ~86% өргөн тул дараагийнх
 *     ирмэгээр цухуйж, шудрах боломжийг мэдэгдэнэ (JS-гүй, зөвхөн CSS).
 *   · sm-ээс дээш — цэвэр тор (2 → 3 багана), scroll унтарна.
 * Server component — интерактив зүйлгүй тул клиент JS нэмэхгүй. Картын
 * загвар нь /special-offers хуудасны сүлжээтэй ижил: сайт даяар нэг
 * танигдах хэлбэр.
 */
export function OffersTeaser({ offers }: { offers: SpecialOffer[] }) {
  const items = offers.slice(0, 3);
  if (items.length === 0) return null;

  return (
    <section
      id="offers"
      aria-label="Тусгай санал"
      className="section-pad bg-[#F5F5F6] border-y border-[#E7E7EA] scroll-mt-16"
    >
      <div className="container-page">
        <div className="mb-8 lg:mb-12 max-w-[52ch]">
          <p className="eyebrow mb-3">Тусгай санал</p>
          <h2 className="type-h2 text-[#17181B]">Үйлчлэх хугацаатай онцгой нөхцөл</h2>
          <p className="mt-3 text-[15px] sm:text-base leading-relaxed text-[#666C77]">
            Зээлийн хөнгөлөлт, урамшуулал — сонгосон загваруудад, хязгаарлагдмал хугацаагаар.
          </p>
        </div>

        {/* Утас: хэвтээ scroll-snap (карт цухуйна). sm+: тор.
            `overscroll-x-contain` — хэвтээ шудралт хөтчийн ухрах/урагшлах
            эсвэл хуудсанд «дамжихаас» сэргийлнэ (Мэдээ хэсэгтэй ижил). */}
        <ul
          className="flex gap-4 overflow-x-auto overscroll-x-contain scroll-smooth snap-x snap-mandatory scrollbar-hide pb-1
                     sm:grid sm:grid-cols-2 sm:gap-6 sm:overflow-visible
                     lg:grid-cols-3 lg:gap-8"
        >
          {items.map((o) => (
            <li key={o.id} className="shrink-0 basis-[86%] snap-start sm:basis-auto">
              <Link
                href={`/special-offers/${o.id}`}
                className="group block h-full bg-white rounded-2xl overflow-hidden card-lift"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-[#121316]">
                  <Image
                    src={o.poster}
                    alt={o.title}
                    fill
                    sizes="(max-width: 640px) 86vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-contain transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-5 sm:p-6">
                  <h3 className="type-h3 text-[#17181B] mb-2 text-lg sm:text-xl">{o.title}</h3>
                  <p className="text-[#54585F] leading-relaxed line-clamp-2 mb-4">{o.desc}</p>
                  <span className="inline-flex items-center gap-1.5 text-[#E20A17] font-semibold text-sm">
                    Дэлгэрэнгүй
                    <ArrowRight
                      className="w-4 h-4 transition-transform group-hover:translate-x-0.5"
                      aria-hidden
                    />
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>

        {/* «Бүх санал үзэх» — Мэдээ хэсэгтэй ижил: доод талд голлон */}
        <div className="mt-8 lg:mt-12 flex justify-center">
          <Link
            href="/special-offers"
            className="btn-ink-jetour inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm"
          >
            Бүх санал үзэх
            <ArrowRight className="w-4 h-4" aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  );
}
