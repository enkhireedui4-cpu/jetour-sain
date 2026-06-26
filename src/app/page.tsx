"use client";

import { Navbar } from "@/components/jetour/navbar";
import { Hero } from "@/components/jetour/hero";
import { Models } from "@/components/jetour/models";
import { TravelLifestyle } from "@/components/jetour/travel-lifestyle";
import { WhyChoose } from "@/components/jetour/why-choose";
import { Technology } from "@/components/jetour/technology";
import { GlobalStats } from "@/components/jetour/global-stats";
import { News } from "@/components/jetour/news";
import { FinalCTA } from "@/components/jetour/final-cta";
import { Contact, Footer } from "@/components/jetour/contact";
import { BrandStory } from "@/components/jetour/brand-story";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-[#17181B]">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Models />
        <TravelLifestyle />
        <WhyChoose />
        <Technology />
        <BrandStory />
        <GlobalStats />
        <News />
        <FinalCTA />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
