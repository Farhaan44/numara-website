"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

const FAQS = [
  { id: "01", question: "What types of projects does Numara Group undertake?", answer: "Numara Group develops residential and commercial projects, including redevelopment initiatives, with a focus on quality construction, practical design, and long-term value." },
  { id: "02", question: "Who can partner with Numara Group?", answer: "We collaborate with landowners, housing societies, and investors who are looking to develop or redevelop properties through a structured and transparent partnership approach." },
  { id: "03", question: "Where are your projects located?", answer: "Numara Group primarily focuses on Mumbai, developing projects in well-connected and established neighborhoods with strong growth potential." },
  { id: "04", question: "What sets Numara Group apart from other developers?", answer: "Numara Group stands out for its focus on trust, transparency, and disciplined execution. With over 15 years of experience, we prioritize thoughtful planning, reliable delivery, and long-term relationships, ensuring every project creates lasting value for both partners and communities." },
  { id: "05", question: "How can I get in touch for inquiries or partnerships?", answer: "You can contact us through our website, phone, or email. Our team will respond promptly to assist with project details, partnership opportunities, or general inquiries." }
]

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)
  const [isMobile, setIsMobile] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const handleResize = () => setIsMobile(window.innerWidth <= 900)
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const toggleFAQ = (index: number) => setOpenIndex(openIndex === index ? null : index)

  return (
    <section style={{ position: "relative", color: "#F8F0E5", padding: "clamp(80px, 10vw, 140px) clamp(20px, 6vw, 80px)", minHeight: "150vh" }}>
      
      {/* Background with zIndex: 0 fix */}
      <div style={{ position: "absolute", inset: 0, zIndex: 0, backgroundImage: "url('/numarareception.jpg')", backgroundSize: "cover", backgroundPosition: "center", backgroundAttachment: mounted && isMobile ? "scroll" : "fixed" }}>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(13,8,4,0.3) 0%, rgba(13,8,4,0.2) 100%)" }} />
      </div>

      <div style={{ position: "relative", zIndex: 1, maxWidth: "1600px", margin: "0 auto", display: "flex", flexDirection: mounted && isMobile ? "column" : "row", alignItems: mounted && isMobile ? "flex-start" : "flex-start", gap: "clamp(48px, 8vw, 120px)" }}>
        
        {/* Sticky Header */}
        <div style={{ flex: "1 1 400px", position: mounted && isMobile ? "relative" : "sticky", top: "clamp(100px, 15vh, 160px)" }}>
          <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(48px, 6vw, 80px)", fontWeight: 400, lineHeight: 1.05, letterSpacing: "-0.01em", color: "#ffffff", margin: 0 }}>
            Curated Questions
          </h2>
          <p style={{ marginTop: "clamp(16px, 2vw, 24px)", fontSize: "clamp(14px, 1.5vw, 16px)", color: "rgba(255,255,255,0.6)", lineHeight: 1.6, maxWidth: "400px" }}>
            Details regarding our process, material sourcing, and private commissions.
          </p>
        </div>

        {/* Scrolling Accordion */}
        <div style={{ flex: "1 1 700px", display: "flex", flexDirection: "column", borderTop: "1px solid rgba(194,161,112,0.3)", background: "rgba(26, 17, 8, 0.4)", backdropFilter: "blur(16px)", borderRadius: "4px", padding: "clamp(20px, 3vw, 40px)" }}>
          {FAQS.map((faq, index) => (
            <FAQItem key={faq.id} faq={faq} isOpen={openIndex === index} onClick={() => toggleFAQ(index)} />
          ))}
        </div>
      </div>
    </section>
  )
}

function FAQItem({ faq, isOpen, onClick }: { faq: any, isOpen: boolean, onClick: () => void }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div onClick={onClick} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} style={{ borderBottom: "1px solid rgba(194,161,112,0.2)", cursor: "pointer", overflow: "hidden" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "clamp(24px, 3vw, 36px) 0", gap: "24px" }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: "clamp(20px, 3vw, 40px)" }}>
          <span style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(16px, 2vw, 24px)", color: isOpen || isHovered ? "#c2a170" : "rgba(255,255,255,0.3)", transition: "color 0.4s ease", minWidth: "30px" }}>{faq.id}</span>
          <h3 style={{ fontSize: "clamp(18px, 2vw, 26px)", fontWeight: 400, letterSpacing: "0.02em", color: isOpen || isHovered ? "#ffffff" : "rgba(255,255,255,0.7)", transition: "color 0.4s ease", margin: 0, lineHeight: 1.3 }}>{faq.question}</h3>
        </div>
        <div style={{ position: "relative", width: "clamp(16px, 2vw, 20px)", height: "clamp(16px, 2vw, 20px)", flexShrink: 0 }}>
          <div style={{ position: "absolute", top: "50%", left: 0, width: "100%", height: "1px", backgroundColor: isOpen || isHovered ? "#c2a170" : "rgba(255,255,255,0.5)", transform: "translateY(-50%)", transition: "background-color 0.4s ease" }} />
          <div style={{ position: "absolute", top: 0, left: "50%", width: "1px", height: "100%", backgroundColor: isOpen || isHovered ? "#c2a170" : "rgba(255,255,255,0.5)", transform: `translateX(-50%) rotate(${isOpen ? "90deg" : "0deg"})`, opacity: isOpen ? 0 : 1, transition: "transform 0.5s ease, opacity 0.5s ease, background-color 0.4s ease" }} />
        </div>
      </div>
      <div style={{ maxHeight: isOpen ? "400px" : "0px", transition: "max-height 0.6s cubic-bezier(0.65, 0, 0.35, 1)" }}>
        <div style={{ paddingBottom: "clamp(32px, 4vw, 48px)", paddingLeft: "clamp(50px, 5vw, 70px)", paddingRight: "5vw", opacity: isOpen ? 1 : 0, transform: isOpen ? "translateY(0)" : "translateY(15px)", transition: "opacity 0.5s ease 0.2s, transform 0.5s ease 0.2s" }}>
          <p style={{ fontSize: "clamp(14px, 1.5vw, 17px)", lineHeight: 1.8, color: "rgba(255,255,255,0.75)", margin: 0 }}>{faq.answer}</p>
        </div>
      </div>
    </div>
  )
}