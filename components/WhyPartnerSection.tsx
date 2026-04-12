"use client"

import { useState, useEffect } from "react"

const PARTNER_REASONS = [
  {
    id: "01",
    title: "Trusted Experience",
    desc: "With over 15 years of experience in real estate development, Numara Group brings reliability, structured execution, and deep market understanding to every partnership. Our journey from Mithila Developers to Numara reflects a consistent commitment to delivering projects with professionalism and long-term value.",
  },
  {
    id: "02",
    title: "Transparent Process",
    desc: "We believe strong partnerships are built on open communication and complete transparency. From initial discussions to project completion, every step is clearly defined, ensuring landowners and partners remain informed, confident, and involved throughout the development process.",
  },
  {
    id: "03",
    title: "Strategic Approach",
    desc: "Numara Group focuses on well-connected and high-potential locations, ensuring every partnership leads to developments that offer strong market value and long-term growth.",
  },
  {
    id: "04",
    title: "Long-Term Vision",
    desc: "By working closely with landowners, investors, and collaborators, Numara Group aims to build strong relationships that continue to create opportunities and shared success for years to come.",
  }
]

export function WhyPartnerSection() {
  const [isMobile, setIsMobile] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const handleResize = () => setIsMobile(window.innerWidth <= 900)
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <section
      style={{
        position: "relative",
        color: "#F8F0E5",
        padding: "clamp(60px, 10vw, 140px) clamp(20px, 6vw, 80px)",
        minHeight: "150vh", 
        // SAFARI FIX 1: This stops the fixed background from bleeding out of this specific section
        clipPath: "inset(0)", 
      }}
    >
      {/* SAFARI FIX 2: Replaced background-attachment with a deeply pinned fixed container */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100vh",
          zIndex: 0,
          backgroundImage: "url('/bg1.png')", 
          backgroundSize: "cover",
          backgroundPosition: "center",
          pointerEvents: "none", // Ensures it doesn't block scrolling
        }}
      >
        {/* Dark Overlay */}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(13,8,4,0.5) 0%, rgba(13,8,4,0.6) 100%)" }} />
      </div>

      <div 
        style={{ 
          position: "relative", 
          zIndex: 1, 
          maxWidth: "1600px", 
          margin: "0 auto",
          display: "flex",
          flexDirection: mounted && isMobile ? "column" : "row",
          alignItems: "flex-start",
          gap: "clamp(32px, 8vw, 120px)",
        }}
      >
        
        {/* Left Side: Sticky Header */}
        <div 
          style={{ 
            flex: mounted && isMobile ? "none" : "1 1 400px",
            width: "100%",
            position: "sticky",
            top: mounted && isMobile ? "90px" : "clamp(100px, 15vh, 160px)", 
            zIndex: 10,
            
            // SAFARI FIX 3: Added WebkitBackdropFilter for Apple devices
            background: mounted && isMobile ? "rgba(13, 8, 4, 0.85)" : "transparent",
            backdropFilter: mounted && isMobile ? "blur(12px)" : "none",
            WebkitBackdropFilter: mounted && isMobile ? "blur(12px)" : "none",
            padding: mounted && isMobile ? "24px" : "0",
            borderRadius: mounted && isMobile ? "8px" : "0",
            border: mounted && isMobile ? "1px solid rgba(194,161,112,0.2)" : "none",
            boxShadow: mounted && isMobile ? "0 10px 30px rgba(0,0,0,0.5)" : "none",
          }}
        >
          

          <h2 style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: mounted && isMobile ? "32px" : "clamp(48px, 6vw, 80px)",
            fontWeight: 400,
            lineHeight: 1.05,
            letterSpacing: "-0.01em",
            color: "#ffffff",
            margin: 0,
          }}>
            Why Partner With Us
          </h2>
          <p style={{
            marginTop: "clamp(12px, 2vw, 24px)",
            fontSize: "clamp(13px, 1.5vw, 16px)",
            color: "rgba(255,255,255,0.65)",
            lineHeight: 1.6,
            maxWidth: "400px",
          }}>
            Collaborate with a team that treats your capital and vision with the same reverence as our own. We build for the next century.
          </p>
        </div>

        {/* Right Side: Scrolling Pillar Cards */}
        <div 
          style={{ 
            flex: "1 1 700px",
            display: "flex", 
            flexDirection: "column",
            gap: "clamp(24px, 4vw, 40px)",
            paddingBottom: mounted && isMobile ? "40px" : "0", 
          }}
        >
          {PARTNER_REASONS.map((reason) => (
            <ReasonCard key={reason.id} reason={reason} />
          ))}
        </div>

      </div>
    </section>
  )
}

// --- Sub-component for individual Pillar Cards ---

function ReasonCard({ reason }: { reason: { id: string; title: string; desc: string } }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        background: isHovered ? "rgba(26, 17, 8, 0.6)" : "rgba(26, 17, 8, 0.4)",
        // SAFARI FIX 4: Added WebkitBackdropFilter for Apple devices
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        border: "1px solid rgba(194,161,112,0.15)",
        borderRadius: "4px",
        padding: "clamp(24px, 4vw, 56px)",
        transition: "background 0.4s ease, transform 0.4s ease, border-color 0.4s ease",
        transform: isHovered ? "translateY(-4px)" : "translateY(0)",
        borderColor: isHovered ? "rgba(194,161,112,0.4)" : "rgba(194,161,112,0.15)",
      }}
    >
      <div style={{ display: "flex", alignItems: "flex-start", gap: "clamp(20px, 3vw, 40px)" }}>
        <span style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontSize: "clamp(24px, 3vw, 40px)",
          color: isHovered ? "#c2a170" : "rgba(194,161,112,0.4)",
          transition: "color 0.4s ease",
          minWidth: "40px",
          lineHeight: 1,
        }}>
          {reason.id}
        </span>
        
        <div>
          <h3 style={{
            fontSize: "clamp(18px, 2vw, 26px)",
            fontWeight: 400,
            letterSpacing: "0.02em",
            color: isHovered ? "#ffffff" : "rgba(255,255,255,0.85)",
            margin: "0 0 16px 0",
            lineHeight: 1.3,
            transition: "color 0.4s ease",
          }}>
            {reason.title}
          </h3>
          <p style={{
            fontSize: "clamp(13px, 1.5vw, 16px)",
            lineHeight: 1.7,
            color: isHovered ? "rgba(255,255,255,0.75)" : "rgba(255,255,255,0.55)",
            margin: 0,
            transition: "color 0.4s ease",
          }}>
            {reason.desc}
          </p>
        </div>
      </div>
    </div>
  )
}