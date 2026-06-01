"use client";


import StatsSection from "@/components/StatsSection";
import ProjectsSection from "@/components/ProjectsSection";

import MapSection from "@/components/MapSection";

import LegacySection from "@/components/LegacySection";

import { SectionDivider } from "@/components/SectionDivider";
import { CTASection } from "@/components/CTASection";
import HeroSection from "@/components/HeroSection";

export default function Home() {
  
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