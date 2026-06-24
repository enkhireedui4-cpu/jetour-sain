"use client";

import { Navbar } from "@/components/jetour/navbar";
import { Hero } from "@/components/jetour/hero";
import { BrandStory } from "@/components/jetour/brand-story";
import { Models } from "@/components/jetour/models";
import { TravelLifestyle } from "@/components/jetour/travel-lifestyle";
import { WhyChoose } from "@/components/jetour/why-choose";
import { Technology } from "@/components/jetour/technology";
import { GlobalStats } from "@/components/jetour/global-stats";
import { Timeline } from "@/components/jetour/timeline";
import { News } from "@/components/jetour/news";
import { TestDrive } from "@/components/jetour/test-drive";
import { FinalCTA } from "@/components/jetour/final-cta";
import { Contact, Footer } from "@/components/jetour/contact";
import { StickyContactBar } from "@/components/jetour/sticky-contact";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-[#0A1F44]">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <BrandStory />
        <Models />
        <TravelLifestyle />
        <GlobalStats />
        <WhyChoose />
        <Technology />
        <Timeline />
        <News />
        <TestDrive />
        <FinalCTA />
        <Contact />
      </main>
      <Footer />
      <StickyContactBar />
    </div>
  );
}
