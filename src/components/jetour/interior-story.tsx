import Image from "next/image";
import { BLUR_DATA_URL } from "@/lib/image";

export type InteriorStoryFeature = {
  image: string;
  /** Зураг тус бүрийн фокус — тайрахад гол дэлгэрэнгүй хадгалагдана */
  objectPosition?: string;
  title: string;
  text: string;
  /** Батлагдсан үзүүлэлт — жижиг chip болж гарна */
  chips?: { value: string; label: string }[];
  /** true бол бүх өргөнөө эзэлж, хаалтын том дүр болно */
  wide?: boolean;
};

/**
 * Дотор салоны editorial story.
 *
 * Нэг DOM, хоёр зохиомж — зураг давхар татагдахгүй:
 *  • Утас  (grid-cols-2): [01 | 02] / [03 бүтэн] / [04 бүтэн]
 *  • Десктоп (grid-cols-3): [01 | 02 | 03] / [04 бүтэн]
 *
 * Зургууд нь эх хэмжээгээрээ (616px өргөн) тул томсгохгүй; харьцааг эхийнхтэй
 * (0.82) ойр 4:5 болгож тайралтыг бага байлгав.
 */
export function InteriorStory({
  title,
  lead,
  features,
}: {
  title: string;
  lead: string;
  features: InteriorStoryFeature[];
}) {
  return (
    <section
      id="interior"
      className="bg-white scroll-mt-16 py-[clamp(32px,4vw,56px)] overflow-hidden"
    >
      <div className="container-page">
        {/* Толгой — авсаархан, гарчиг зайг залгихгүй */}
        <div className="pb-4 lg:pb-5 mb-6 lg:mb-8 border-b border-[#E7E7EA]">
          <h2 className="font-extrabold tracking-[-0.02em] leading-[1.08] text-[#17181B] text-[clamp(28px,3vw,40px)]">
            {title}
          </h2>
          <p className="mt-2 text-[#54585F] text-[clamp(14px,1.1vw,17px)] leading-[1.5] max-w-[52ch]">
            {lead}
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-3 gap-y-7 lg:gap-x-6 lg:gap-y-10">
          {features.map((f, i) => {
            const isWide = f.wide === true;
            return (
              <article
                key={f.image}
                className={
                  isWide
                    ? "col-span-2 lg:col-span-3"
                    : i === 2
                    ? "col-span-2 lg:col-span-1" // 03 — утсанд бүтэн, десктоп 1/3
                    : "col-span-1"
                }
              >
                <div
                  className={`relative overflow-hidden rounded-[14px] bg-[#F5F5F6] group ${
                    isWide
                      ? "aspect-[16/9] lg:aspect-[3/1]"
                      : "aspect-[4/3] lg:aspect-[1/1]"
                  }`}
                >
                  <Image
                    src={f.image}
                    alt={f.title}
                    fill
                    sizes={
                      isWide
                        ? "(max-width: 1024px) 94vw, 1280px"
                        : "(max-width: 1024px) 47vw, 420px"
                    }
                    placeholder="blur"
                    blurDataURL={BLUR_DATA_URL}
                    style={{ objectPosition: f.objectPosition ?? "center" }}
                    /* Маш нам гүм hover — 1.03 хэмжээ, 0.5с */
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                  />

                  {/* Бүтэн өргөний хаалтын дүр — текст нь зураг дээр overlay
                      болж, доор дахин блок эзлэхгүй (босоо зай ~100px хэмнэнэ).
                      Уншигдац: доод талд зөөлөн scrim. */}
                  {isWide && (
                    <>
                      <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/70 via-black/30 to-transparent pointer-events-none" />
                      <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6 lg:p-8">
                        <h3 className="font-bold tracking-tight text-white text-[clamp(20px,1.5vw,23px)] leading-[1.25]">
                          {f.title}
                        </h3>
                        <p className="mt-1.5 text-white/80 text-[clamp(14px,1vw,16px)] leading-[1.5] max-w-[58ch]">
                          {f.text}
                        </p>
                      </div>
                    </>
                  )}
                </div>

                {!isWide && (
                  <>
                    <h3 className="mt-3 lg:mt-4 font-bold tracking-tight text-[#17181B] text-[clamp(20px,1.5vw,23px)] leading-[1.25]">
                      {f.title}
                    </h3>
                    <p className="mt-1.5 text-[#54585F] text-[clamp(14px,1vw,16px)] leading-[1.5] max-w-[42ch]">
                      {f.text}
                    </p>
                  </>
                )}

                {f.chips && f.chips.length > 0 && (
                  <dl className="mt-3 flex flex-wrap gap-x-6 gap-y-2">
                    {f.chips.map((c) => (
                      <div key={c.label}>
                        <dt className="font-bold text-[#17181B] text-[clamp(15px,1.3vw,19px)] leading-none tabular-nums">
                          {c.value}
                        </dt>
                        <dd className="mt-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#696F79]">
                          {c.label}
                        </dd>
                      </div>
                    ))}
                  </dl>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
