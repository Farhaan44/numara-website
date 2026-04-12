import Image from "next/image";
import StatsSection from "@/components/StatsSection";
import ProjectsSection from "@/components/ProjectsSection";
import SlidingSection from "@/components/SlidingSection";
import MapSection from "@/components/MapSection";
import {ProjectTab} from "@/components/ProjectTab";
import { SectionDivider } from "@/components/SectionDivider";
import { CTASection } from "@/components/CTASection";
export default function Home() {
  return (
    <main>
  
       {/* Hero Section */}
      <section style={{
        position: "relative",
        height: "85vh",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
      }}>
        <img src="/anzarelegancehd.jpg" style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: 0,
        }} />

        <div style={{
          position: "absolute",
          inset: 0,
          background: "rgba(0,0,0,0.6)",
          zIndex: 1,
        }} />

        <div style={{
          position: "relative",
          zIndex: 2,
          textAlign: "left",
          padding: "0 6vw",
          maxWidth: "760px",
        }}>
          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(3.2rem, 6vw, 5.7rem)",
            fontWeight: 500,
            color: "#ffffff",
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            margin: "0 0 28px",
          }}>
            Our Portfolio
          </h1>

          <p style={{
            fontFamily: "'Lato', sans-serif",
            fontSize: "clamp(0.9rem, 1.5vw, 1.1rem)",
            fontWeight: 400,
            color: "rgba(255,255,255,0.72)",
            lineHeight: 1.9,
            letterSpacing: "0.02em",
            margin: 0,
          }}>
            From residential developments to commercial spaces, every Numara project represents a commitment to quality, careful planning, and environments designed to serve communities for years to come.
          </p>
        </div>
      </section>
      <SectionDivider/>
      <ProjectTab/>
      
      <SectionDivider/>
      <CTASection/>
      <SectionDivider/>
      
    </main>
  );
}