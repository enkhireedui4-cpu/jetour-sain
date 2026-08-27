/**
 * Каталогийн загварын жагсаалт.
 *
 * Server Component. Өмнө нь `"use client"` тэмдэглэгээтэй байсан ч энд
 * хук, үйл явдлын заавар, хөтчийн API аль нь ч байхгүй — зөвхөн жагсаалт
 * зурдаг. Тэмдэглэгээг хассанаар карт болон түүний икон клиентийн багц
 * руу орохоо болино. Гаралт нь ЯГ адилхан.
 */
import { VehicleCard, type VehicleCardModel } from "@/components/jetour/vehicle-card";

export function ModelsListing({ models }: { models: VehicleCardModel[] }) {
  return (
    <section className="section-pad bg-white">
      <div className="container-page">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7">
          {models.map((m, i) => (
            <div key={m.id} className="stagger" style={{ ["--index" as string]: i }}>
              <VehicleCard model={m} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
