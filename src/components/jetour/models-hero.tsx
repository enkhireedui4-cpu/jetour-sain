import Image from "next/image";

/**
 * Загваруудын хуудасны кино маягийн толгой.
 *
 * Server component — интерактив зүйлгүй тул клиент JS нэмэхгүй.
 * Зураг нь төслийн одоо байгаа асет (`/models-hero/x70-plus-band-wide.jpg`);
 * шинэ placeholder үүсгээгүй.
 */
export function ModelsHero() {
  return (
    <section className="mhero">
      <Image
        src="/models-hero/x70-plus-band-wide.jpg"
        alt=""
        fill
        sizes="100vw"
        priority
        className="object-cover object-center"
      />
      {/* Зөөлөн scrim — зөвхөн текстийн талд, зургийг хардуулахгүй */}
      <div className="mhero__scrim" />

      <div className="mhero__inner container-page">
        <h1 className="mhero__title">Загварууд</h1>
        <p className="mhero__lead">JETOUR-ийн бүх лайнапыг нэг дороос</p>
      </div>
    </section>
  );
}
