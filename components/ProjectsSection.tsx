"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

function useLineReveal(containerRef: React.RefObject<HTMLElement>) {
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const threshold = 0.1; 

    const lines = Array.from(container.children) as HTMLElement[];
    lines.forEach((line) => {
      if (line.dataset.wrapped) return;
      line.dataset.wrapped = "1";
      line.style.overflow = "hidden";
      line.style.display = "inline-block";
      
      const inner = document.createElement("span");
      inner.style.display = "inline-block";
      inner.style.transform = "translateY(110%)";
      inner.style.transition = "transform 0.85s cubic-bezier(0.16,1,0.3,1)";
      inner.style.willChange = "transform";
      
      while (line.firstChild) inner.appendChild(line.firstChild);
      line.appendChild(inner);
    });

    const inners = lines.map((l) => l.querySelector("span") as HTMLElement);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            inners.forEach((inner, i) => {
              inner.style.transitionDelay = `${i * 0.09}s`;
              inner.style.transform = "translateY(0%)";
            });
          } else {
            inners.forEach((inner) => {
              inner.style.transitionDelay = "0s";
              inner.style.transform = "translateY(110%)";
            });
          }
        });
      },
      {
        root: null,
        threshold: threshold,
        rootMargin: "0px", 
      }
    );

    observer.observe(container);

    return () => observer.disconnect();
  }, []);
}

function ProjectsHeader() {
  const headingRef = useRef<HTMLHeadingElement>(null);
  useLineReveal(headingRef as React.RefObject<HTMLElement>);

  return (
    <div style={{
      background: "#F8F0E5",
      padding: "20px 6vw 25px",
      borderBottom: "1.5px solid #c2a170",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "1rem",
      flexWrap: "wrap",
    }}>
      <h2
        ref={headingRef}
        style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "clamp(3.3rem, 5.5vw, 5rem)",
          fontWeight: 500,
          color: "#412c17",
          lineHeight: 0.95,
          letterSpacing: "-0.02em",
          margin: 0,
        }}
      >
        <span style={{ display:"block",paddingBottom: "0.15em", marginRight: "0.25em" }}>Signature</span>
        
        <span style={{ display:"block", paddingBottom: "0.15em" }}>Projects</span>
      </h2>

      <blockquote style={{
        margin: 0,
        padding: "0 0 0 1.25rem",
        borderLeft: "2px solid #c2a170",
        maxWidth: "18rem",
        flexShrink: 0,
      }}>
        <p style={{
          fontFamily: "'Lato', sans-serif",
          fontSize: "clamp(1rem, 1.6vw, 1.4rem)",
          fontWeight: 500,
          color: "#776251",
          lineHeight: 1.7,
          margin: "0 0 0.6rem",
          letterSpacing: "0.01em",
        }}>
          "Every structure we raise is a quiet promise — of permanence, of care, of craft."
        </p>
        <cite style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "1rem",
          textTransform: "uppercase",
          letterSpacing: "0.2em",
          color: "#412c17",
          fontStyle: "normal",
          fontWeight: 600,
        }}>
          Numara Group
        </cite>
      </blockquote>
    </div>
  );
}

function ArrowRight({ size = 13 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

const PROJECTS = [
  {
    id: 1,
    slug: "anzar-elegance",
    title: "Anzar Elegance",
    category: "Residential | Commercial",
    location: "Agripada, Mumbai",
    status: "Ongoing",
    description: "21-floors of thoughtfully designed apartments offering sea-view and where every detail speaks of refinement and comfort.",
    image: "/anzarelegancewide2.jpg",
  },
  {
    id: 2,
    slug: "sea-senate",
    title: "Sea Senate",
    category: "Residential | Commercial",
    location: "Agripada, Mumbai",
    status: "Ongoing",
    description: "A 39-story landmark mixed-use development redefining the city skyline with bold architecture and premium spaces.",
    image: "/seasenatewide2.jpg",
  },
  {
    id: 3,
    slug: "batul-house",
    title: "Batul House",
    category: "Residential",
    location: "Mazgaon, Mumbai",
    status: "Completed",
    description: "An exclusive building located in the heart of Mazgaon offering the finest accessibility and connectivity to all parts of Mumbai.",
    image: "/batulhousewide.jpg",
  },
];

export default function ProjectsSection() {
  return (
    <section id="projects-section" style={{ background: "#0d0a08", width: "100%" }}>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600&family=Lato:wght@300;400;700&display=swap');

        .project-panel {
          position: relative;
          width: 100%;
          min-height: 100vh;
          min-height: 100svh;
          display: flex;
          align-items: flex-end;
        }

        /* Standard Gradients (Restored) */
        .project-gradient-left {
          background: linear-gradient(to right, rgba(6,4,2,0.93) 0%, rgba(6,4,2,0.65) 45%, rgba(6,4,2,0.15) 100%);
        }
        .project-gradient-right {
          background: linear-gradient(to left,  rgba(6,4,2,0.93) 0%, rgba(6,4,2,0.65) 45%, rgba(6,4,2,0.15) 100%);
        }
        .project-vignette {
          background: linear-gradient(to top, rgba(6,4,2,0.5) 0%, transparent 35%);
        }

        .project-content {
          position: relative;
          z-index: 10;
          width: 100%;
          max-width: 40rem;
          padding: 4rem 6vw 4rem;
        }

        /* Footer Link CSS */
        .footer-bar {
          padding: 3rem 6vw;
        }
        .footer-link {
          font-family: 'Lato', sans-serif;
          display: inline-flex;
          align-items: center;
          gap: 0.75rem;
          font-size: 1.3rem;
          text-transform: uppercase;
          letter-spacing: 0.3em;
          font-weight: 700;
          color: #412c17;
          text-decoration: none;
          transition: gap 0.3s ease, color 0.3s ease;
        }
        .footer-link:hover {
          gap: 1.1rem;
          color: #c2a170;
        }

        /* ── Mobile Overrides ── */
        @media (max-width: 640px) {
          .project-content {
            margin-left: 0 !important;
            text-align: left !important;
            padding: 2rem 1.5rem 2rem !important;
            max-width: 100% !important;
          }
          .project-meta-row {
            justify-content: flex-start !important;
          }
          .project-description {
            margin-left: 0 !important;
            font-size: 0.85rem !important;
          }
          .project-title {
            font-size: clamp(1.6rem, 6vw, 2.2rem) !important;
          }
          .project-cta-link {
            font-size: 0.55rem !important;
            padding: 0.7rem 1.1rem !important;
          }

          /* Footer CTA Fixes (Kept the mobile sizing improvements here) */
          .footer-bar {
            padding: 2rem 1.5rem;
          }
          .footer-link {
            font-size: 0.9rem;
            gap: 0.4rem;
            letter-spacing: 0.2em;
          }
          .footer-link:hover {
            gap: 0.6rem;
          }
        }
      `}</style>

      <ProjectsHeader />

      {PROJECTS.map((project, i) => {
        const fromLeft = i % 2 === 0;
        return (
          <div key={project.id} className="project-panel">
            
            <div style={{
              position: "absolute",
              inset: 0,
              clipPath: "inset(0 0 0 0)",
              WebkitClipPath: "inset(0 0 0 0)",
              zIndex: 0,
            }}>
              <div style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100svh",
                backgroundImage: `url(${project.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                transform: "translateZ(0)", 
              }} />
            </div>

            {/* Side gradient using dynamic class */}
            <div 
              className={fromLeft ? "project-gradient-left" : "project-gradient-right"}
              style={{ position: "absolute", inset: 0, zIndex: 1 }} 
            />

            {/* Bottom vignette using class */}
            <div 
              className="project-vignette"
              style={{ position: "absolute", inset: 0, zIndex: 1 }} 
            />

            {i > 0 && (
              <div style={{
                position: "absolute",
                top: 0, left: 0, right: 0,
                height: "1px",
                background: "rgba(255,255,255,0.08)",
                zIndex: 2,
              }} />
            )}

            <div
              className="project-content"
              style={{
                marginLeft: fromLeft ? 0 : "auto",
                textAlign: fromLeft ? "left" : "right",
              }}
            >
              <div
                className="project-meta-row"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                  marginBottom: "0.8rem",
                  justifyContent: fromLeft ? "flex-start" : "flex-end",
                }}
              >
                <span style={{
                  fontFamily: "'Lato', sans-serif",
                  background: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  backdropFilter: "blur(4px)",
                  padding: "6px 12px",
                  fontSize: "0.625rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.3em",
                  fontWeight: 500,
                  color: "rgba(255,255,255,0.8)",
                }}>
                  {project.status}
                </span>
                <span style={{
                  fontFamily: "'Lato', sans-serif",
                  color: "rgba(255,255,255,0.7)",
                  fontSize: "0.625rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.2em",
                  fontWeight: 400,
                }}>
                  {project.category}
                </span>
              </div>

              <h3 className="project-title" style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(2.4rem, 4vw, 3.7rem)",
                fontWeight: 500,
                color: "#fff",
                lineHeight: 1.18,
                letterSpacing: "-0.01em",
                margin: "0 0 1.5rem",
              }}>
                {project.title}
              </h3>

              <p style={{
                fontFamily: "'Lato', sans-serif",
                color: "rgba(255,255,255,0.45)",
                fontSize: "0.6875rem",
                textTransform: "uppercase",
                letterSpacing: "0.3em",
                fontWeight: 400,
                margin: "0 0 1rem",
              }}>
                {project.location}
              </p>

              <p
                className="project-description"
                style={{
                  fontFamily: "'Lato', sans-serif",
                  color: "rgba(255,255,255,0.5)",
                  fontSize: "clamp(0.9rem, 1.5vw, 1.05rem)",
                  fontWeight: 400,
                  lineHeight: 1.85,
                  letterSpacing: "0.01em",
                  margin: "0 0 1.5rem",
                  maxWidth: "26rem",
                  marginLeft: fromLeft ? 0 : "auto",
                }}
              >
                {project.description}
              </p>

              {/* Only the link href changed to use project.slug */}
              <CtaLink href={`/projects/${project.slug}`} reverse={!fromLeft} />
            </div>
          </div>
        );
      })}

      <div 
        className="footer-bar"
        style={{
          background: "#F8F0E5",
          borderTop: "1px solid rgba(0,0,0,0.08)",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          position: "relative",
          zIndex: 20,
        }}
      >
        <Link href="/projects" className="footer-link">
          View All Projects <ArrowRight size={16} />
        </Link>
      </div>

    </section>
  );
}

function CtaLink({ href, reverse }: { href: string; reverse: boolean }) {
  return (
    <Link
      href={href}
      style={{
        fontFamily: "'Lato', sans-serif",
        display: "inline-flex",
        alignItems: "center",
        flexDirection: reverse ? "row-reverse" : "row",
        gap: "0.75rem",
        fontSize: "0.6875rem",
        textTransform: "uppercase",
        letterSpacing: "0.3em",
        fontWeight: 700,
        border: "1px solid rgba(255,255,255,0.25)",
        color: "#fff",
        padding: "1rem 1.75rem",
        textDecoration: "none",
        transition: "background 0.3s, color 0.3s",
      }}
      className="project-cta-link"
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLAnchorElement;
        el.style.background = "#fff";
        el.style.color = "#0d0a08";
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLAnchorElement;
        el.style.background = "transparent";
        el.style.color = "#fff";
      }}
    >
      <span>Explore Development</span>
      <ArrowRight size={12} />
    </Link>
  );
}