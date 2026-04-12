import Image from "next/image";
import StatsSection from "@/components/StatsSection";
import ProjectsSection from "@/components/ProjectsSection";
import SlidingSection from "@/components/SlidingSection";
import MapSection from "@/components/MapSection";
import TimelineSection from "@/components/TimelineSection";
import NumaraStandard from "@/components/NumaraStandard";
import Quote from "@/components/Quote";
import { SectionDivider } from "@/components/SectionDivider";
import { FAQSection } from "@/components/FAQSection";
import { CTASection } from "@/components/CTASection";



export default function Home() {
  return (
    <main style={{ background: "#F8F0E5", minHeight: "100vh" }}>
       {/* Hero Section */}
      <section style={{
        position: "relative",
        height: "85vh",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
      }}>
        <img src="/aboutmain.jpg" style={{
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
          background: "rgba(0,0,0,0.52)",
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
            About Us
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
            With over 15 years of expertise and previously known as Mithila Developers,
            Numara Group continues a journey of creating reliable, well-crafted residential
            and commercial spaces that serve communities and stand the test of time.
          </p>
        </div>
      </section>
      <Quote/>
      <TimelineSection/>
      <NumaraStandard/>
      <SectionDivider/>
      <FAQSection/>
      <SectionDivider/>

      <CTASection/>
      <SectionDivider/>
             
     
     
      
    </main>
  );
}