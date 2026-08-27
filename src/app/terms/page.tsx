import type { Metadata } from "next";
import { Navbar } from "@/components/jetour/navbar";
import { Footer } from "@/components/jetour/contact";
import { PageHeader } from "@/components/jetour/page-header";
import { CONTACT } from "@/lib/jetour-data";

export const metadata: Metadata = {
  title: "Үйлчилгээний нөхцөл",
  description:
    "JETOUR вэбсайтыг ашиглах нөхцөл, агуулгын хэрэглээ, хариуцлагын хязгаарлалт.",
  alternates: { canonical: "/terms" },
  robots: { index: true, follow: true },
};

const SECTIONS = [
  {
    h: "Ерөнхий нөхцөл",
    p: "Энэхүү вэбсайтыг ашигласнаар та доорх нөхцөлийг хүлээн зөвшөөрч байгаа болно. Сайт нь SAIN MOTORS ХХК-ийн (JETOUR-ийн Монгол дахь албан ёсны дистрибьютор) мэдээллийн зорилготой платформ юм.",
  },
  {
    h: "Мэдээллийн үнэн зөв байдал",
    p: "Загвар, үнэ, техник үзүүлэлт, тусгай санал зэрэг мэдээллийг аль болох үнэн зөв байлгахыг хичээдэг ч урьдчилан мэдэгдэлгүйгээр өөрчлөгдөж болно. Эцсийн үнэ, тохиргоо, нөхцөлийг showroom дээр баталгаажуулна.",
  },
  {
    h: "Зээл ба тооцоолуур",
    p: "Вэбсайт дээрх зээлийн тооцоолуур нь зөвхөн ойролцоо тооцоо гаргах зорилготой. Бодит хүү, урьдчилгаа, сарын төлбөр нь хамтрагч банкны шийдвэр, таны зээлийн нөхцөлөөс хамаарна.",
  },
  {
    h: "Оюуны өмч",
    p: "Сайт дээрх лого, зураг, текст болон бусад агуулга нь холбогдох эздийн өмч бөгөөд зөвшөөрөлгүйгээр хуулбарлах, ашиглахыг хориглоно.",
  },
  {
    h: "Хариуцлагын хязгаарлалт",
    p: "Вэбсайтыг ашигласнаас үүдэн гарсан аливаа шууд болон шууд бус хохирлыг бид хариуцахгүй. Гадаад холбоос (банк, сошиал сүлжээ) дээрх агуулгыг бид хариуцахгүй.",
  },
];

export default function TermsPage() {
  return (
    <div id="main-content" className="min-h-screen bg-white text-[#17181B]">
      <Navbar />
      <PageHeader
        title="Үйлчилгээний нөхцөл"
        lead="Вэбсайтыг ашиглах ерөнхий нөхцөл, хариуцлагын хязгаарлалт."
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
              Асуулт байвал:{" "}
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
