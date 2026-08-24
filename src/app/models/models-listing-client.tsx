"use client";

import { VehicleCard, type VehicleCardModel } from "@/components/jetour/vehicle-card";

export function ModelsListingClient({ models }: { models: VehicleCardModel[] }) {
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
