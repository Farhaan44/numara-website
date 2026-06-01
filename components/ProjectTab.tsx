"use client"

import { useState, useMemo, useEffect, useRef } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"

// ==========================================
// 1. TYPES & DATA
// ==========================================

export type ProjectStatus = "ongoing" | "completed" | "upcoming"
export type ProjectType = "residential" | "commercial" | "mixed"

export interface Project {
  id: string
  slug: string
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

const projects: Project[] = [
  {
    id: "1",
    slug: "anzar-elegance",
    name: "Anzar Elegance",
    status: "ongoing",
    type: "mixed",
    location: "Agripada, Mumbai",
    description: "A 21-storey development of thoughtfully designed residences, offering refined living with expansive views and a strong sense of space. Every detail is carefully considered — from layout to finish — creating an environment that balances comfort, elegance, and everyday functionality in one of Mumbai’s well-connected neighborhoods.",
    image: "/anzarelegancewide2.jpg",
  },
  {
    id: "2",
    slug: "sea-senate",
    name: "Blue Ocean",
    status: "ongoing",
    type: "mixed",
    location: "Agripada, Mumbai",
    description: "A 39-storey landmark mixed-use development that stands as a defining presence in the skyline. Designed to combine residential and commercial spaces seamlessly, Sea Senate offers a contemporary living and working experience shaped by scale, thoughtful planning, and a focus on premium quality.",
    image: "/IMG_1656.PNG",
  },
  {
    id: "3",
    slug: "batul-house",
    name: "Batul House",
    status: "completed",
    type: "residential",
    location: "Mazgaon",
    description: "An exclusive residential development in the heart of Mazgaon, Batul House reflects reliability and well-planned urban living. With excellent connectivity and access to key parts of Mumbai, it offers residents a balanced lifestyle defined by convenience, accessibility, and a strong sense of community. office spaces below.",
    image: "/batulhousetall.jpg",
  },
  {
    id: "4",
    slug: "ahmed-tower",
    name: "Ahmed Tower",
    status: "completed",
    type: "mixed",
    location: "Agripada, Mumbai",
    description: "An exclusive building located in the heart of Agripada offering easy transport access.",
    image: "/ahmedtowerwide2.jpg",
  },
]

const STATUS_FILTERS = [
  { value: "all",       label: "All Projects" },
  { value: "ongoing",   label: "In Progress"  },
  { value: "completed", label: "Completed"    },
  { value: "upcoming",  label: "Coming Soon"  },
]

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


// ==========================================
// 2. MAIN PROJECT TAB COMPONENT
// ==========================================

export function ProjectTab() {
  const [statusFilter, setStatusFilter] = useState("all")

  const filtered = useMemo(() =>
    projects.filter((p) => statusFilter === "all" || p.status === statusFilter),
    [statusFilter]
  )

  const statusWithCounts = STATUS_FILTERS.map((f) => ({
    ...f,
    count: f.value === "all"
      ? projects.length
      : projects.filter((p) => p.status === f.value).length,
  }))

  return (
    <section
      id="projects"
      style={{
        position: "relative",
        minHeight: "100vh",
        overflow: "hidden",
        background: "#F8F0E5",
        padding: "clamp(20px, 4vw, 40px) 0 clamp(80px, 10vw, 120px)",
      }}
    >
      <div aria-hidden style={{ position: "absolute", inset: 0, opacity: 0.018, pointerEvents: "none", backgroundImage: `repeating-linear-gradient(45deg, #412c17 0, #412c17 1px, transparent 1px, transparent 72px), repeating-linear-gradient(-45deg, #412c17 0, #412c17 1px, transparent 1px, transparent 72px)` }} />
      <div aria-hidden style={{ position: "absolute", left: 0, top: 0, width: "1px", height: "100%", background: "linear-gradient(to bottom, transparent, rgba(65,44,23,0.15), transparent)", pointerEvents: "none" }} />

      <div style={{ position: "relative", zIndex: 1, maxWidth: "1920px", margin: "0 auto", padding: "0 clamp(16px, 6vw, 80px)" }}>
        
        {/* Header */}
        <div style={{ marginBottom: "clamp(40px, 6vw, 64px)", textAlign: "center" }}>
          <h2 style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: "clamp(36px, 5.5vw, 72px)",
            fontWeight: 400,
            lineHeight: 1.07,
            letterSpacing: "-0.02em",
            color: "#1a1108",
            margin: "0 0 16px",
          }}>
            Signature Developments
          </h2>
          <p style={{
            margin: "0 auto",
            fontSize: "clamp(14px, 1.8vw, 18px)",
            lineHeight: 1.7,
            color: "rgba(65,44,23,0.55)",
            maxWidth: "600px",
          }}>
            Each project is a testament to our unwavering commitment to excellence,
            innovation, and the art of timeless design.
          </p>
        </div>

        {/* Filters */}
        <div style={{ display: "flex", justifyContent: "center", borderTop: "1px solid #c2a170", borderBottom: "1px solid #c2a170", padding: "clamp(10px, 2vw, 16px) 0", marginBottom: "clamp(40px, 6vw, 64px)" }}>
          <FilterTabs options={statusWithCounts} value={statusFilter} onChange={setStatusFilter} />
        </div>

        {/* Grid */}
        {filtered.length > 0 ? (
          <>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 480px), 1fr))", gap: "clamp(24px, 3vw, 40px)" }}>
              {filtered.map((project, i) => (
                <ProjectCard key={project.id} project={project} index={i} />
              ))}
            </div>
            <p style={{ marginTop: "clamp(40px, 5vw, 64px)", textAlign: "center", fontSize: "clamp(9px, 1vw, 12px)", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(65,44,23,0.35)" }}>
              Showing {filtered.length} of {projects.length} projects
            </p>
          </>
        ) : (
          <div style={{ padding: "96px 0", textAlign: "center" }}>
            <p style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(24px, 3vw, 32px)", color: "rgba(65,44,23,0.4)" }}>No projects found</p>
            <p style={{ marginTop: "8px", fontSize: "clamp(12px, 1.5vw, 15px)", color: "rgba(65,44,23,0.3)" }}>Try adjusting your filters</p>
            <button onClick={() => setStatusFilter("all")} style={{ marginTop: "24px", cursor: "pointer", fontSize: "11px", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#c2a170", background: "none", border: "none", textDecoration: "underline", textDecorationColor: "#c2a170", textUnderlineOffset: "4px", fontFamily: "inherit" }}>
              Clear filters
            </button>
          </div>
        )}
      </div>

      <div aria-hidden style={{ position: "absolute", bottom: 0, left: "50%", transform: "translateX(-50%)", width: "1px", height: "80px", background: "linear-gradient(to top, rgba(194,161,112,0.2), transparent)", pointerEvents: "none" }} />
    </section>
  )
}


// ==========================================
// 3. PROJECT CARD COMPONENT
// ==========================================

interface ProjectCardProps {
  project: Project
  index: number
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const router = useRouter()
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

    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.4 })
    if (cardRef.current) observer.observe(cardRef.current)

    return () => { window.removeEventListener("resize", handleResize); observer.disconnect() }
  }, [])

  const isActive = mounted && isMobile ? inView : hovered
  const currentImage = mounted && isMobile && project.mobileImage ? project.mobileImage : project.image
  const aspectRatioPadding = mounted && isMobile ? "180%" : "110%"

  const handleViewDetails = (e: React.MouseEvent) => {
    e.stopPropagation()
    router.push(`/projects/${project.slug}`)
  }

  const handleEnquire = (e: React.MouseEvent) => {
    e.stopPropagation()
    router.push("/contact#contact-section")
  }

  const handleCardClick = () => {
    router.push(`/projects/${project.slug}`)
  }

  return (
    <article
      ref={cardRef}
      onClick={handleCardClick}
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
      {/* Image */}
      <div style={{ position: "relative", paddingTop: aspectRatioPadding, overflow: "hidden", transition: "padding-top 0.3s ease" }}>
        <Image src={currentImage} alt={project.name} fill sizes="(max-width: 768px) 100vw, 33vw" style={{ objectFit: "cover", transform: isActive ? "scale(1.07)" : "scale(1)", transition: "transform 1.1s ease-out" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, #000000 0%, rgba(0,0,0,0.65) 45%, rgba(0,0,0,0.08) 100%)" }} />
        <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.2)", opacity: isActive ? 1 : 0, transition: "opacity 0.7s" }} />
      </div>

      {/* Top Badges */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, padding: "clamp(14px, 2vw, 20px)", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "6px", zIndex: 2, pointerEvents: "none" }}>
        <span style={{ fontSize: "clamp(8px, 1vw, 10px)", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", padding: "clamp(5px, 1vw, 7px) clamp(8px, 1.5vw, 12px)", background: "rgba(0,0,0,0.5)", backdropFilter: "blur(6px)", color: "rgba(255,255,255,0.75)", borderRadius: "2px", whiteSpace: "nowrap" }}>
          {project.type}
        </span>
        <span style={{ display: "flex", alignItems: "center", gap: "5px", fontSize: "clamp(8px, 1vw, 10px)", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", padding: "clamp(5px, 1vw, 7px) clamp(8px, 1.5vw, 12px)", background: "rgba(0,0,0,0.5)", backdropFilter: "blur(6px)", color: "#c2a170", borderRadius: "2px", whiteSpace: "nowrap" }}>
          <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: DOT_COLOR[project.status], flexShrink: 0 }} />
          {STATUS_LABEL[project.status]}
        </span>
      </div>

      {/* Bottom Content */}
      <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, padding: "clamp(16px, 2.5vw, 24px)", zIndex: 2 }}>
        
        {/* Location */}
        <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "clamp(8px, 1vw, 12px)", opacity: isActive ? 1 : 0.8, transform: isActive ? "translateY(0)" : "translateY(2px)", transition: "opacity 0.5s, transform 0.5s" }}>
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#c2a170" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          <span style={{ fontSize: "clamp(8px, 1vw, 10px)", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.75)" }}>
            {project.location}
          </span>
        </div>

        {/* Title */}
        <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(20px, 3vw, 32px)", fontWeight: 400, lineHeight: 1.1, letterSpacing: "-0.01em", color: "#fff", marginBottom: "clamp(10px, 1.5vw, 14px)" }}>
          {project.name}
        </h3>

        <div style={{ height: "1px", background: "rgba(194,161,112,0.4)", width: isActive ? "100%" : "48px", transition: "width 0.7s ease-out", marginBottom: "clamp(10px, 1.5vw, 14px)" }} />

        {/* Description */}
        <div style={{ overflow: "hidden", maxHeight: isActive ? "80px" : "0px", opacity: isActive ? 1 : 0, transition: "max-height 0.5s ease, opacity 0.4s ease", marginBottom: isActive ? "clamp(12px, 2vw, 16px)" : "0px" }}>
          <p style={{ fontSize: "clamp(12px, 1.5vw, 15px)", lineHeight: 1.65, color: "rgba(255,255,255,0.65)", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" as const, overflow: "hidden" }}>
            {project.description}
          </p>
        </div>

        {/* CTAs */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px" }}>
          <button
            onClick={handleViewDetails}
            onMouseEnter={() => setViewBtnHovered(true)}
            onMouseLeave={() => setViewBtnHovered(false)}
            style={{ display: "flex", alignItems: "center", gap: "6px", background: viewBtnHovered ? "#d4b88a" : "#c2a170", padding: "clamp(8px, 1.2vw, 12px) clamp(12px, 1.8vw, 20px)", fontSize: "clamp(10px, 1.2vw, 12px)", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "#1a1108", border: "none", cursor: "pointer", transition: "background 0.25s", fontFamily: "inherit", borderRadius: "2px" }}
          >
            View Details
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: "clamp(12px, 1.5vw, 14px)", height: "clamp(12px, 1.5vw, 14px)", transform: isActive ? "translate(2px, -2px)" : "translate(0,0)", transition: "transform 0.3s" }}>
              <line x1="7" y1="17" x2="17" y2="7" />
              <polyline points="7 7 17 7 17 17" />
            </svg>
          </button>

          <button
            onClick={handleEnquire}
            onMouseEnter={() => setEnqBtnHovered(true)}
            onMouseLeave={() => setEnqBtnHovered(false)}
            style={{ fontSize: "clamp(10px, 1.2vw, 12px)", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: enqBtnHovered ? "#c2a170" : "rgba(255,255,255,0.55)", background: "none", border: "none", cursor: "pointer", textDecoration: "underline", textDecorationColor: enqBtnHovered ? "#c2a170" : "rgba(255,255,255,0.35)", textUnderlineOffset: "4px", transition: "color 0.25s", fontFamily: "inherit" }}
          >
            Enquire
          </button>
        </div>
      </div>

      <div style={{ position: "absolute", inset: 0, boxShadow: isActive ? "inset 0 0 0 1px rgba(194,161,112,0.6)" : "inset 0 0 0 0 rgba(194,161,112,0)", transition: "box-shadow 0.45s", pointerEvents: "none", zIndex: 3 }} />
    </article>
  )
}

// ==========================================
// 4. FILTER TABS COMPONENT
// ==========================================

interface FilterOption {
  value: string
  label: string
  count?: number
}

interface FilterTabsProps {
  options: FilterOption[]
  value: string
  onChange: (value: string) => void
}

export function FilterTabs({ options, value, onChange }: FilterTabsProps) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "4px" }}>
      {options.map((option) => {
        const isActive = value === option.value
        return (
          <button
            key={option.value}
            onClick={() => onChange(option.value)}
            style={{
              position: "relative",
              cursor: "pointer",
              padding: "clamp(8px, 1.2vw, 10px) clamp(12px, 2vw, 20px)",
              fontSize: "clamp(11px, 1.4vw, 14px)",
              fontWeight: 700,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              border: "none",
              background: isActive ? "#412c17" : "transparent",
              color: isActive ? "#F8F0E5" : "rgba(65,44,23,0.5)",
              transition: "background 0.25s, color 0.25s",
              fontFamily: "inherit",
              borderRadius: "2px"
            }}
            onMouseEnter={(e) => { if (!isActive) (e.currentTarget as HTMLButtonElement).style.color = "#412c17" }}
            onMouseLeave={(e) => { if (!isActive) (e.currentTarget as HTMLButtonElement).style.color = "rgba(65,44,23,0.5)" }}
          >
            {option.label}
            {option.count !== undefined && (
              <span style={{ marginLeft: "6px", fontSize: "clamp(10px, 1.2vw, 13px)", color: isActive ? "#c2a170" : "rgba(65,44,23,0.35)" }}>
                ({option.count})
              </span>
            )}
            {isActive && <span style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "1px", background: "#c2a170" }} />}
          </button>
        )
      })}
    </div>
  )
}