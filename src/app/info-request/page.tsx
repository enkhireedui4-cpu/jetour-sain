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

/**
 * Дэлгэрэнгүй мэдээлэл авах — маркетингийн лийд маягт.
 *
 * Тест драйвын хуудаснаас ЯЛГААТАЙ нь: хэрэглэгчээс «тест драйв захиалж
 * байна» гэсэн үүрэг хүлээлгэхгүй. Зүгээр л сонирхож буй загвар, холбоо
 * барих мэдээллээ үлдээхэд хангалттай — босго нам, дугаар үлдээхэд амар.
 *
 * Талбарууд зориуд ЦӨӨХӨН: загвар, нэр, утас, и-мэйл. Хот/салбар, огноо,
 * цаг — оператор залгахдаа тодруулна.
 */
export default function InfoRequestPage() {
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
          МЭДЭЭЛЭЛ
        </span>
        <div className="container-page irq-hero__inner">
          <h1 className="irq-hero__title">Мэдээлэл авах</h1>
        </div>
      </section>

      <section className="section-pad bg-[#F5F5F6] border-b border-[#E7E7EA]">
        <div className="container-page mx-auto w-full max-w-[720px]">
          <EnhancedLeadForm
            type="info-request"
            variant="white"
            title="JETOUR загваруудын мэдээлэл авах"
            subtitle="Та сонирхсон загвар болон холбоо барих мэдээллээ үлдээнэ үү. Манай зөвлөх танд үнэ, техникийн үзүүлэлт болон туршилтын жолоодлогын (Test Drive) мэдээллийг хүргэх болно."
            showModelField
            showEmailField={false}
            /* Салбар, огноо, цаг, харилцах хэрэгсэл — хасав. Энэ нь анхны
               холбоо барих хүсэлт тул нэр, утас, загвар хангалттай. */
            showBranchField={false}
            showDateField={false}
            showTimeField={false}
            showContactMethod={false}
            showMessageField={false}
            submitLabel="Хүсэлт илгээх"
          />
        </div>
      </section>

      </main>

      <Footer />
    </div>
  );
}
