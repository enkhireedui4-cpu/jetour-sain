"use client";

import { Navbar } from "@/components/jetour/navbar";
import { Hero } from "@/components/jetour/hero";
import { BrandStory } from "@/components/jetour/brand-story";
import { Models } from "@/components/jetour/models";
import { Technology } from "@/components/jetour/technology";
import { Distributor } from "@/components/jetour/distributor";
import { TestDrive } from "@/components/jetour/test-drive";
import { Contact, Footer } from "@/components/jetour/contact";
import { BrandMarquee } from "@/components/jetour/marquee";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-ink text-paper">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <BrandMarquee />
        <BrandStory />
        <Models />
        <Technology />
        <Distributor />
        <TestDrive />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
