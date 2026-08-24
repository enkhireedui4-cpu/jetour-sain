import type { Metadata } from "next";
import { Navbar } from "@/components/jetour/navbar";
import { Footer } from "@/components/jetour/contact";
import { PageHeader } from "@/components/jetour/page-header";
import { CONTACT } from "@/lib/jetour-data";

export const metadata: Metadata = {
  title: "Нууцлалын бодлого",
  description:
    "JETOUR Mongolia — вэбсайтаар цуглуулах хувийн мэдээлэл, түүнийг ашиглах, хамгаалах талаарх нууцлалын бодлого.",
  alternates: { canonical: "/privacy" },
  robots: { index: true, follow: true },
};

const SECTIONS = [
  {
    h: "Ямар мэдээлэл цуглуулдаг вэ",
    p: "Та тест драйв, зээлийн хүсэлт, засвар үйлчилгээ зэрэг маягт бөглөхөд бид таны нэр, утасны дугаар болон таны сайн дураар оруулсан нэмэлт мэдээллийг (и-мэйл, сонирхсон загвар, зурвас) хүлээн авдаг. Зээлийн тооцоолуур ашиглавал таны оруулсан тооцооллын үзүүлэлтүүд хүсэлттэй хамт илгээгддэг.",
  },
  {
    h: "Мэдээллийг хэрхэн ашигладаг вэ",
    p: "Цуглуулсан мэдээллийг зөвхөн таны хүсэлтэд хариу өгөх, санал болгосон үйлчилгээг үзүүлэх, тантай холбогдох зорилгоор ашиглана. Бид таны мэдээллийг зар сурталчилгааны зорилгоор гуравдагч этгээдэд зардаггүй.",
  },
  {
    h: "Мэдээллийг хэнтэй хуваалцдаг вэ",
    p: "Таны мэдээлэл SAIN MOTORS ХХК-ийн борлуулалт, үйлчилгээний багт дамждаг. Зээлийн хүсэлтийн хувьд, зөвхөн таны зөвшөөрлөөр хамтрагч банктай холбогдох мэдээллийг хуваалцаж болно.",
  },
  {
    h: "Мэдээллийг хамгаалах",
    p: "Бид таны хувийн мэдээллийг зохих ёсоор хамгаалах, зөвшөөрөлгүй хандалтаас сэргийлэх боломжит арга хэмжээг авдаг. Мэдээллийг зөвхөн шаардлагатай хугацаанд хадгална.",
  },
  {
    h: "Таны эрх",
    p: "Та өөрийн мэдээллийг засварлах, устгах, эсвэл цаашид ашиглахыг зогсоохыг хүсвэл доорх холбоо барих мэдээллээр хандаж болно.",
  },
];

export default function PrivacyPage() {
  return (
    <div id="main-content" className="min-h-screen bg-white text-[#17181B]">
      <Navbar />
      <PageHeader
        title="Нууцлалын бодлого"
        lead="Танаас цуглуулах мэдээлэл, түүнийг хэрхэн ашиглаж, хамгаалдаг талаар."
      />

      <section className="section-pad bg-white">
        <div className="container-page max-w-[720px] mx-auto space-y-12">
          {SECTIONS.map((s) => (
            <div key={s.h}>
              <h2 className="type-h3 text-[#17181B] mb-3">{s.h}</h2>
              <p className="text-[#54585F] leading-[1.8]">{s.p}</p>
            </div>
          ))}

          <div className="pt-2">
            <h2 className="type-h3 text-[#17181B] mb-3">Холбоо барих</h2>
            <p className="text-[#54585F] leading-[1.8]">
              Нууцлалтай холбоотой асуулт байвал:{" "}
              <a href={CONTACT.phone1Href} className="text-[#E20A17] font-semibold">
                {CONTACT.phone1}
              </a>{" "}
              ·{" "}
              <a href={`mailto:${CONTACT.email}`} className="text-[#E20A17] font-semibold">
                {CONTACT.email}
              </a>
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
