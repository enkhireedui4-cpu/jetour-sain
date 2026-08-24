import { Navbar } from "@/components/jetour/navbar";
import { Hero } from "@/components/jetour/hero";
import { Models } from "@/components/jetour/models";
import { News } from "@/components/jetour/news";
import { Footer } from "@/components/jetour/contact";
import { getAllCarModels, getAllNews } from "@/lib/cms";

// ISR — 10 мин (600 сек). Next-ийн segment config нь literal байх ёстой,
// import хийсэн тогтмол ажиллахгүй тул тоог шууд бичнэ.
export const revalidate = 600;

export default async function Home() {
  const [models, news] = await Promise.all([getAllCarModels(), getAllNews()]);
  const availableModels = models
    .filter((m) => m.status === "available")
    .sort((a, b) => a.order - b.order);

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#17181B]">
      <Navbar />
      <main id="main-content" className="flex-1">
        <Hero />
        <Models models={availableModels} />
        <News articles={news} />
      </main>
      <Footer />
    </div>
  );
}
