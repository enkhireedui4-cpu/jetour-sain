import type { Metadata } from "next";
import Image from "next/image";
import { Navbar } from "@/components/jetour/navbar";
import { Footer } from "@/components/jetour/contact";
import { EnhancedLeadForm } from "@/components/jetour/enhanced-lead-form";

// ISR — 10 мин. Next-ийн segment config нь literal байх ёстой.
export const revalidate = 600;

export const metadata: Metadata = {
  title: "Дэлгэрэнгүй мэдээлэл авах",
  description:
    "Сонирхож буй JETOUR загварын үнэ, үзүүлэлт, хувилбар болон тест драйвын талаар дэлгэрэнгүй мэдээлэл авах хүсэлт.",
  alternates: { canonical: "/info-request" },
};

/* Энэ хуудсанд зөвшөөрөх лийдийн төрлүүд. Бусад төрөл (financing, service,
   parts) өөрийн context-той тул энд ирэхгүй — буруу/санамсаргүй утга ирвэл
   info-request руу унана. */
const ALLOWED_TYPES = ["info-request", "test-drive"] as const;
type PageLeadType = (typeof ALLOWED_TYPES)[number];

function resolveType(raw?: string): PageLeadType {
  return ALLOWED_TYPES.includes(raw as PageLeadType) ? (raw as PageLeadType) : "info-request";
}

/**
 * Дэлгэрэнгүй мэдээлэл авах — маркетингийн лийд маягт.
 *
 * НЭГ маягт, НЭГ endpoint (`/api/lead`). Тест драйв ба энгийн мэдээллийн
 * хүсэлтийг тусдаа код/хуудсаар биш, зөвхөн `type` талбараар ялгана —
 * hub тал ижил гэрээгээр хүлээж авч, төрлөөр нь ангилна. Тест драйвын
 * холбоос `/info-request?type=test-drive`-аар ирэхэд шошго тохирно, харин
 * илгээх зам ижил хэвээр.
 *
 * Босго нам: хот/салбар, огноо, цаг — оператор залгахдаа тодруулна.
 */
export default async function InfoRequestPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string; model?: string }>;
}) {
  const { type: rawType, model } = await searchParams;
  const type = resolveType(rawType);
  const isTestDrive = type === "test-drive";

  const ghost = isTestDrive ? "ТЕСТ ДРАЙВ" : "МЭДЭЭЛЭЛ";
  const heading = isTestDrive ? "Тест драйв захиалах" : "Мэдээлэл авах";
  const formTitle = isTestDrive
    ? "JETOUR тест драйв захиалах"
    : "JETOUR загваруудын мэдээлэл авах";
  const formSubtitle = isTestDrive
    ? "Сонирхсон загвар болон холбоо барих мэдээллээ үлдээнэ үү. Манай зөвлөх тохиромжтой цаг, салбарыг тохирч тест драйвыг тань зохион байгуулна."
    : "Та сонирхсон загвар болон холбоо барих мэдээллээ үлдээнэ үү. Манай зөвлөх танд үнэ, техникийн үзүүлэлт болон туршилтын жолоодлогын (Test Drive) мэдээллийг хүргэх болно.";
  const submitLabel = isTestDrive ? "Тест драйв захиалах" : "Хүсэлт илгээх";

  return (
    <div className="min-h-screen bg-white text-[#17181B]">
      <Navbar />

      <main id="main-content">

      {/* Толгой — өргөн, нам банд. Зохиомжийн санаа нь
          jetouregypt.com/shopping-tools/test-drive: зогсож байгаа машин биш,
          ХӨДӨЛГӨӨН (panning blur) + хойд талд сүүдэр бичиг.

          Тэдний сүүдэр бичиг нь зураг (`overlay.png`); бид CSS текстээр хийв —
          масштаблагдана, монголоор, нэмэлт файл шаардахгүй. */}
      <section className="irq-hero">
        <Image
          src="/info-request/hero.webp"
          alt=""
          fill
          sizes="100vw"
          priority
          className="object-cover"
        />
        <span className="irq-hero__scrim" aria-hidden />
        <span className="irq-hero__ghost" aria-hidden>
          {ghost}
        </span>
        <div className="container-page irq-hero__inner">
          <h1 className="irq-hero__title">{heading}</h1>
        </div>
      </section>

      <section className="section-pad bg-[#F5F5F6] border-b border-[#E7E7EA]">
        <div className="container-page mx-auto w-full max-w-[720px]">
          <EnhancedLeadForm
            type={type}
            variant="white"
            title={formTitle}
            subtitle={formSubtitle}
            modelName={model}
            showModelField
            showEmailField={false}
            /* Салбар, огноо, цаг, харилцах хэрэгсэл — хасав. Энэ нь анхны
               холбоо барих хүсэлт тул нэр, утас, загвар хангалттай. Тест
               драйвын үед ч босго нам: оператор цаг/салбарыг залгаж тохирно. */
            showBranchField={false}
            showDateField={false}
            showTimeField={false}
            showContactMethod={false}
            showMessageField={false}
            submitLabel={submitLabel}
          />
        </div>
      </section>

      </main>

      <Footer />
    </div>
  );
}
