"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"

export type ProjectStatus = "ongoing" | "completed" | "upcoming"
// ADDED: "mixed" to the ProjectType
export type ProjectType = "residential" | "commercial" | "mixed"

export interface Project {
  id: string
  name: string
  status: ProjectStatus
  type: ProjectType
  location: string
  description: string
  image: string
  mobileImage?: string 
  year?: string        
  area?: string        
}

interface ProjectCardProps {
  project: Project
  index: number
  onViewMore: (project: Project) => void
  onEnquire: (project: Project) => void
}

const STATUS_LABEL: Record<ProjectStatus, string> = {
  ongoing:   "In Progress",
  completed: "Completed",
  upcoming:  "Coming Soon",
}

const DOT_COLOR: Record<ProjectStatus, string> = {
  ongoing:   "#fbbf24",
  completed: "#34d399",
  upcoming:  "rgba(255,255,255,0.5)",
}

export function ProjectCard({ project, index, onViewMore, onEnquire }: ProjectCardProps) {
  const cardRef = useRef<HTMLElement>(null)
  const [hovered, setHovered] = useState(false)
  const [inView, setInView] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [viewBtnHovered, setViewBtnHovered] = useState(false)
  const [enqBtnHovered, setEnqBtnHovered] = useState(false)

  useEffect(() => {
    setMounted(true)
    
    const handleResize = () => setIsMobile(window.innerWidth <= 768)
    handleResize() 
    window.addEventListener("resize", handleResize)

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries
        setInView(entry.isIntersecting)
      },
      { threshold: 0.4 } 
    )

    if (cardRef.current) {
      observer.observe(cardRef.current)
    }

    return () => {
      window.removeEventListener("resize", handleResize)
      observer.disconnect()
    }
  }, [])

  const isActive = mounted && isMobile ? inView : hovered

  const currentImage = mounted && isMobile && project.mobileImage 
    ? project.mobileImage 
    : project.image

  const aspectRatioPadding = mounted && isMobile ? "180%" : "110%"

  return (
    <article
      ref={cardRef}
      onClick={() => onViewMore(project)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        cursor: "pointer",
        background: "#1a1108",
        overflow: "hidden",
        display: "block",
        borderRadius: "4px",
        boxShadow: "rgba(50, 50, 93, 0.2) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px",
        transition: "transform 0.4s ease, box-shadow 0.4s ease",
        transform: hovered && !isMobile ? "translateY(-4px)" : "translateY(0)",
      }}
    >
      {/* Image wrapper */}
      <div 
        style={{ 
          position: "relative", 
          paddingTop: aspectRatioPadding, 
          overflow: "hidden",
          transition: "padding-top 0.3s ease" 
        }}
      >
        <Image
          src={currentImage}
          alt={project.name}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          style={{
            objectFit: "cover",
            transform: isActive ? "scale(1.07)" : "scale(1)",
            transition: "transform 1.1s ease-out",
          }}
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, #000000 0%, rgba(0,0,0,0.65) 45%, rgba(0,0,0,0.08) 100%)" }} />
        <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.2)", opacity: isActive ? 1 : 0, transition: "opacity 0.7s" }} />
      </div>

      {/* Top badges (FIXED: Reverted to Row, reduced padding on mobile so they fit) */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          padding: mounted && isMobile ? "16px 16px" : "20px 22px",
          display: "flex",
          flexDirection: "row", // Forced back to horizontal
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "6px",
          zIndex: 2,
          pointerEvents: "none",
        }}
      >
        <span
          style={{
            fontSize: mounted && isMobile ? "8px" : "9px", // Scaled down for mobile
            fontWeight: 700,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            padding: mounted && isMobile ? "5px 8px" : "7px 12px", // Tighter padding
            background: "rgba(0,0,0,0.5)",
            backdropFilter: "blur(6px)",
            color: "rgba(255,255,255,0.75)",
            borderRadius: "2px",
            whiteSpace: "nowrap",
          }}
        >
          {project.type}
        </span>
        <span
          style={{
            display: "flex",
            alignItems: "center",
            gap: "5px",
            fontSize: mounted && isMobile ? "8px" : "9px", // Scaled down for mobile
            fontWeight: 700,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            padding: mounted && isMobile ? "5px 8px" : "7px 12px", // Tighter padding
            background: "rgba(0,0,0,0.5)",
            backdropFilter: "blur(6px)",
            color: "#c2a170",
            borderRadius: "2px",
            whiteSpace: "nowrap",
          }}
        >
          <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: DOT_COLOR[project.status], flexShrink: 0 }} />
          {STATUS_LABEL[project.status]}
        </span>
      </div>

      {/* Bottom content */}
      <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, padding: mounted && isMobile ? "20px 16px" : "22px 24px", zIndex: 2 }}>
        
        {/* Location */}
        <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "10px", opacity: isActive ? 1 : 0.8, transform: isActive ? "translateY(0)" : "translateY(2px)", transition: "opacity 0.5s, transform 0.5s" }}>
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#c2a170" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          <span style={{ fontSize: "9px", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.75)" }}>
            {project.location}
          </span>
        </div>

        {/* Title */}
        <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(22px, 2.5vw, 30px)", fontWeight: 400, lineHeight: 1.1, letterSpacing: "-0.01em", color: "#fff", marginBottom: "12px" }}>
          {project.name}
        </h3>

        {/* Expanding hairline */}
        <div style={{ height: "1px", background: "rgba(194,161,112,0.4)", width: isActive ? "100%" : "48px", transition: "width 0.7s ease-out", marginBottom: "14px" }} />

        {/* Description */}
        <div style={{ overflow: "hidden", maxHeight: isActive ? "80px" : "0px", opacity: isActive ? 1 : 0, transition: "max-height 0.5s ease, opacity 0.4s ease", marginBottom: isActive ? "14px" : "0px" }}>
          <p style={{ fontSize: "13px", lineHeight: 1.65, color: "rgba(255,255,255,0.65)", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" as const, overflow: "hidden" }}>
            {project.description}
          </p>
        </div>

        {/* CTAs */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px" }}>
          <button
            onClick={(e) => { e.stopPropagation(); onViewMore(project) }}
            onMouseEnter={() => setViewBtnHovered(true)}
            onMouseLeave={() => setViewBtnHovered(false)}
            style={{
              display: "flex", 
              alignItems: "center", 
              gap: "6px",
              background: viewBtnHovered ? "#d4b88a" : "#c2a170",
              // FIXED: Reduced padding significantly for smaller screens to make the button sleeker
              padding: mounted && isMobile ? "7px 10px" : "9px 16px", 
              fontSize: mounted && isMobile ? "8px" : "9px", 
              fontWeight: 700,
              letterSpacing: "0.18em", 
              textTransform: "uppercase",
              color: "#1a1108", 
              border: "none", 
              cursor: "pointer",
              transition: "background 0.25s", 
              fontFamily: "inherit",
              borderRadius: "2px",
            }}
          >
            View Details
            <svg width={mounted && isMobile ? "10" : "12"} height={mounted && isMobile ? "10" : "12"} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ transform: isActive ? "translate(2px, -2px)" : "translate(0,0)", transition: "transform 0.3s" }}>
              <line x1="7" y1="17" x2="17" y2="7" />
              <polyline points="7 7 17 7 17 17" />
            </svg>
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onEnquire(project) }}
            onMouseEnter={() => setEnqBtnHovered(true)}
            onMouseLeave={() => setEnqBtnHovered(false)}
            style={{
              fontSize: mounted && isMobile ? "8px" : "9px", 
              fontWeight: 700, 
              letterSpacing: "0.15em",
              textTransform: "uppercase", 
              color: enqBtnHovered ? "#c2a170" : "rgba(255,255,255,0.55)",
              background: "none", 
              border: "none", 
              cursor: "pointer",
              textDecoration: "underline", 
              textDecorationColor: enqBtnHovered ? "#c2a170" : "rgba(255,255,255,0.35)",
              textUnderlineOffset: "4px", 
              transition: "color 0.25s", 
              fontFamily: "inherit",
            }}
          >
            Enquire
          </button>
        </div>
      </div>

      {/* Gold ring on active state */}
      <div style={{ position: "absolute", inset: 0, boxShadow: isActive ? "inset 0 0 0 1px rgba(194,161,112,0.6)" : "inset 0 0 0 0 rgba(194,161,112,0)", transition: "box-shadow 0.45s", pointerEvents: "none", zIndex: 3 }} />
    </article>
  )
}