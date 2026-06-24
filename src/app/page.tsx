"use client";

import { Navbar } from "@/components/jetour/navbar";
import { Hero } from "@/components/jetour/hero";
import { BrandStory } from "@/components/jetour/brand-story";
import { BrandMarquee } from "@/components/jetour/marquee";
import { Models } from "@/components/jetour/models";
import { Technology } from "@/components/jetour/technology";
import { Financing } from "@/components/jetour/financing";
import { Timeline } from "@/components/jetour/timeline";
import { Distributor } from "@/components/jetour/distributor";
import { Contact, Footer } from "@/components/jetour/contact";

export default function Home() {
  return (
    <div className="light-theme min-h-screen flex flex-col bg-[#F4F6FA] text-[#0B0F1A]">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <BrandMarquee />
        <BrandStory />
        <Models />
        <Technology />
        <Financing />
        <Timeline />
        <Distributor />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
