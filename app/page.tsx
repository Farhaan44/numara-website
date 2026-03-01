import Image from "next/image";
import StatsSection from "@/components/StatsSection";
import ProjectsSection from "@/components/ProjectsSection";
import SlidingSection from "@/components/SlidingSection";
import MapSection from "@/components/MapSection";

export default function Home() {
  return (
    <main>
      {/* Hero Section */}
      <section style={{
        position: "relative",       // ← required so video stays inside
        height: "100vh",
        overflow: "hidden",         // ← clips video to section bounds
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}>

        {/* Background Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          controls={false}        // ← add this
          preload="auto"  
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            zIndex: 0,
                         // ← behind everything
          }}
        >
          <source src="/herovid2.mp4" type="video/mp4" />
        </video>

        {/* Dark overlay so text is readable over video */}
        <div style={{
          position: "absolute",
          inset: 0,
          background: "rgba(0, 0, 0, 0.4)",
          zIndex: 1,
        }} />

        {/* Text content — on top */}
        <h1 style={{
          position: "relative",
          zIndex: 2,                // ← above video and overlay
          color: "white",
          fontSize: "3rem",
          fontFamily: "Georgia, serif",
        }}>
          
        </h1>

      </section>

      <StatsSection/>

      <ProjectsSection/>

      <SlidingSection/>

      <MapSection/>

      <section style={{
        height: "100vh",
        background: "#C7C1B8",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}>
        <h2 style={{ color: "#ffffff", fontFamily: "Georgia, serif" }}>
          Scroll down to see the navbar change
        </h2>
      </section>
    </main>
  );
}