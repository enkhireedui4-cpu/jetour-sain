"use client";

import { Navbar } from "@/components/jetour/navbar";
import { Hero } from "@/components/jetour/hero";
import { BrandStory } from "@/components/jetour/brand-story";
import { Models } from "@/components/jetour/models";
import { WhyChoose } from "@/components/jetour/why-choose";
import { Timeline } from "@/components/jetour/timeline";
import { News } from "@/components/jetour/news";
import { TestDrive } from "@/components/jetour/test-drive";
import { Contact, Footer } from "@/components/jetour/contact";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-[#0A1F44]">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <BrandStory />
        <Models />
        <WhyChoose />
        <Timeline />
        <News />
        <TestDrive />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
