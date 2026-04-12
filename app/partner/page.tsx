import Image from "next/image";
import StatsSection from "@/components/StatsSection";
import ProjectsSection from "@/components/ProjectsSection";
import SlidingSection from "@/components/SlidingSection";
import MapSection from "@/components/MapSection";
import { WhyPartnerSection } from "@/components/WhyPartnerSection";
import { PartnerForm } from "@/components/PartnerForm";
import { SectionDivider } from "@/components/SectionDivider";

export default function Home() {
  return (
    <main>
      <section style={{
        position: "relative",
        height: "85vh",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
      }}>
        <img src="/numaraout.jpg" style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: 0,
        }} />

        {/* Vignette Overlay: Lighter in the center, darker at the edges */}
        <div style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(circle at center, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.85) 100%)",
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
           Partner <br/> 
           With Us
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
            With a strong foundation of trust, transparency, and long-term vision, Numara Group focuses on creating partnerships that deliver reliable growth, shared success, and lasting value for everyone involved.
          </p>
        </div>
      </section>
      <SectionDivider/>
      <PartnerForm/>
      <SectionDivider/>
      <WhyPartnerSection/>
      <SectionDivider/>
      
    </main>
  );
}