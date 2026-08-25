import Image from "next/image";
import Link from "next/link";

/**
 * Мэдээний доорх гурван хавтан — байршил, баталгаа, дэлгэрэнгүй мэдээлэл.
 *
 * Зохиомжийн эх нь jetouregypt.com-ын гурван хавтангийн блок: зураг дээр
 * харанхуй хөшиг, голдоо нэг богино нэр. Гэхдээ зураг нь БИДНИЙХ —
 * SAIN MOTORS-ийн салбар, X70 Plus-ийн хөдөлгүүр, X70 Plus замд.
 *
 * Server component — интерактив зүйлгүй тул клиент JS нэмэхгүй.
 */

/* Файлын нэрэнд "-v2": зургийг сольсны дараа зам ижил байвал хөтөч ба
   Next-ийн оптимизатор хуучин байтыг кэшнээсээ үзүүлсээр байдаг. Нэр солиход
   URL солигдож кэш тасарна (репод "x1-v2" дээр ижил зүйл тохиолдсон). */
const TILES = [
  {
    href: "/dealer",
    label: "Байршил",
    image: "/tiles/locations-v2.webp",
    alt: "Гар утсан дээрх газрын зураг — салбар хүртэлх маршрут",
  },
  {
    href: "/owners",
    label: "Баталгаа",
    image: "/tiles/warranty-v2.webp",
    alt: "Засварын төвд хөдөлгүүрт үйлчилж буй мэргэжилтэн",
  },
  {
    href: "/info-request",
    label: "Туршилтын жолоодлого",
    image: "/tiles/testdrive-v2.webp",
    alt: "JETOUR SUV — замд, ард талаас",
  },
] as const;

export function QuickLinks() {
  return (
    <section className="qlink" aria-label="Түргэн холбоос">
      <ul className="qlink__grid">
        {TILES.map((t) => (
          <li key={t.href}>
            <Link href={t.href} className="qlink__tile group">
              <Image
                src={t.image}
                alt={t.alt}
                fill
                sizes="(min-width: 768px) 33vw, 100vw"
                className="qlink__img"
              />
              <span className="qlink__scrim" aria-hidden />
              <span className="qlink__label">{t.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
