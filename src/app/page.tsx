import { Navbar } from "@/components/jetour/navbar";
import { Hero } from "@/components/jetour/hero";
import { Models } from "@/components/jetour/models";
import { OffersStrip, Advantages } from "@/components/jetour/home-highlights";
import { ExploreNav } from "@/components/jetour/explore-nav";
import { News } from "@/components/jetour/news";
import { Contact, Footer } from "@/components/jetour/contact";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-[#17181B]">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Models />
        <OffersStrip />
        <Advantages />
        <ExploreNav />
        <News />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
