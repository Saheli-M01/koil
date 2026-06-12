"use client";

import { useSmoothScroll } from "@/hooks/useSmoothScroll";
import Nav from "@/components/ui/Nav";
import ScrollProgress from "@/components/ui/ScrollProgress";
import ChapterHero from "@/components/sections/ChapterHero";
import ChapterWaste from "@/components/sections/ChapterWaste";
import ChapterSolutions from "@/components/sections/ChapterSolutions";
import ChapterIndustries from "@/components/sections/ChapterIndustries";
import ChapterCycle from "@/components/sections/ChapterCycle";
import {
  ChapterManufacturing,
  ChapterSustainability,
} from "@/components/sections/ChapterMidpoint";
import ChapterClosing from "@/components/sections/ChapterClosing";
import GetInTouch from "@/components/ui/GetInTouch";
import Footer from "@/components/ui/Footer";

export default function Home() {
  useSmoothScroll();

  return (
    <main className="relative">
      <ScrollProgress />
      <Nav />
      <ChapterHero />
      <ChapterWaste />
      <ChapterSolutions />
      <ChapterIndustries />
      <ChapterCycle />
      <ChapterManufacturing />
      <ChapterSustainability />
      <ChapterClosing />
      <GetInTouch />
      <Footer />
    </main>
  );
}
