"use client";
import { useState } from "react";

import Image from "next/image";
import StatsSection from "@/components/StatsSection";
import ProjectsSection from "@/components/ProjectsSection";
import SlidingSection from "@/components/SlidingSection";
import MapSection from "@/components/MapSection";
import TimelineSection from "@/components/TimelineSection"
import LegacySection from "@/components/LegacySection";
import NumaraLoader from "@/components/NumaraLoader";
import { SectionDivider } from "@/components/SectionDivider";
import { CTASection } from "@/components/CTASection";
import HeroSection from "@/components/HeroSection";

export default function Home() {
  const [loaded, setLoaded] = useState(false);
  return (
    <main>
      
      <HeroSection/>
      <SectionDivider/>
      <StatsSection/>
      <SectionDivider/>
      <LegacySection/>
      <SectionDivider/>
      <ProjectsSection/>
      
   

      
      
      <MapSection/>
      <SectionDivider/>
      <CTASection/>
      <SectionDivider/>

      
    </main>
  );
}