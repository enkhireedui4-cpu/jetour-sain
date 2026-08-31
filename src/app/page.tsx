import { Navbar } from "@/components/jetour/navbar";
import { Hero } from "@/components/jetour/hero";
import { Models } from "@/components/jetour/models";
import { OffersTeaser } from "@/components/jetour/offers-teaser";
import { News } from "@/components/jetour/news";
import { QuickLinks } from "@/components/jetour/quick-links";
import { Footer } from "@/components/jetour/contact";
import { getAllCarModels, getAllNews, getAllPromotions } from "@/lib/cms";

// ISR — 10 мин (600 сек). Next-ийн segment config нь literal байх ёстой,
// import хийсэн тогтмол ажиллахгүй тул тоог шууд бичнэ.
export const revalidate = 600;

export default async function Home() {
  const [models, news, offers] = await Promise.all([
    getAllCarModels(),
    getAllNews(),
    getAllPromotions(),
  ]);
  const availableModels = models
    .filter((m) => m.status === "available")
    .sort((a, b) => a.order - b.order);

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#17181B]">
      <Navbar />
      <main id="main-content" className="flex-1">
        <Hero />
        <Models models={availableModels} />
        <OffersTeaser offers={offers} />
        <News articles={news} />
        <QuickLinks />
      </main>
      <Footer />
    </div>
  );
}
