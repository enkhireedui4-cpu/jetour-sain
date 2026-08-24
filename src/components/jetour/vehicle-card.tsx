"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export type VehicleCardModel = {
  id: string;
  name: string;
  image: string;
  startingPrice?: string | null;
  price?: string | null;
  priceNote?: string | null;
  status?: string;
  series?: string;
  powertrains?: string[];
  specs: {
    engine?: string;
    power?: string;
    torque?: string;
    drivetrain?: string;
    transmission?: string;
    fuel?: string;
  };
};

const priceOf = (m: VehicleCardModel) =>
  m.startingPrice ? `${m.startingPrice}-с эхлэн` : m.priceNote ?? m.price ?? "Тун удахгүй";

/**
 * Каталогийн загварын карт — showroom маягийн минимал.
 *
 * Зорилго нь ганцхан: машиныг таниулж, дэлгэрэнгүй хуудас руу оруулах.
 * Тиймээс дэлгэрэнгүй техник үзүүлэлт энд байхгүй (тэр нь загварын хуудсанд).
 */
export function VehicleCard({ model }: { model: VehicleCardModel }) {
  const coming = model.status === "coming-soon";
  const href = `/models/${model.id}`;

  return (
    <article className="vcard">
      {/* Зураг — тунгалаг cutout, бүх загварт ижил хэмжээст талбай тул
          машинууд харагдацаараа ойролцоо хэмжээтэй болно. */}
      <div className="vcard__media">
        <Image
          src={model.image}
          alt=""
          fill
          sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 31vw"
          loading="lazy"
          className="vcard__img object-contain object-center"
        />

        {coming && <span className="vcard__badge">Тун удахгүй</span>}

      </div>

      {/* Мэдээлэл — нэр, нэг богино тодорхойлолт, үнэ */}
      <div className="vcard__body">
        <h3 className="vcard__name">
          {/* Картын бүх талбайг холбоос болгоно (stretched link) */}
          <Link href={href} className="vcard__link">
            {model.name.replace("JETOUR ", "")}
          </Link>
        </h3>
        {model.series && <p className="vcard__series">{model.series}</p>}
        <p className="vcard__price">{priceOf(model)}</p>

        <span className="vcard__cta" aria-hidden>
          Загвар үзэх
          <ArrowRight size={14} />
        </span>
      </div>
    </article>
  );
}
