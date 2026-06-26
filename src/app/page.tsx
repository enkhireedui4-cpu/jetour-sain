"use client";

import { Navbar } from "@/components/jetour/navbar";
import { Hero } from "@/components/jetour/hero";
import { Models } from "@/components/jetour/models";
import { ExploreNav } from "@/components/jetour/explore-nav";
import { TestDrive } from "@/components/jetour/test-drive";
import { News } from "@/components/jetour/news";
import { FinalCTA } from "@/components/jetour/final-cta";
import { Contact, Footer } from "@/components/jetour/contact";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-[#17181B]">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Models />
        <ExploreNav />
        <TestDrive />
        <News />
        <FinalCTA />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
