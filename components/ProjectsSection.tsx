"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";

const PROJECTS = [
  {
    id: 1,
    name: "Numara Residences",
    type: "Residential",
    location: "Mumbai, Maharashtra",
    year: "2023",
    status: "Completed",
    description: "A collection of thoughtfully designed luxury apartments where every detail speaks of refinement and comfort.",
    image: "/IMG_1652.PNG",
    accent: "#c8907e",
  },
  {
    id: 2,
    name: "The Numara Plaza",
    type: "Commercial",
    location: "Pune, Maharashtra",
    year: "2024",
    status: "Completed",
    description: "A landmark commercial development redefining the city skyline with its bold architecture and premium spaces.",
    image: "/projects/project2.jpg",
    accent: "#b87a6a",
  },
  {
    id: 3,
    name: "Numara Gardens",
    type: "Residential",
    location: "Nashik, Maharashtra",
    year: "2025",
    status: "Ongoing",
    description: "An exclusive gated community blending lush green landscapes with modern luxury living at its finest.",
    image: "/projects/project3.jpg",
    accent: "#d4a090",
  },
];

export default function ProjectsSection() {
  const [active, setActive] = useState(0);
  const [animating, setAnimating] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const go = (dir: number) => {
    if (animating) return;
    setAnimating(true);
    setTimeout(() => {
      setActive((prev) => (prev + dir + PROJECTS.length) % PROJECTS.length);
      setAnimating(false);
    }, 280);
  };

  return (
    <>
      <style>{`
        /* ── Section ── */
        .projects-section {
          background: #bebebe;
          padding: 60px 2rem 60px;
          position: relative;
          overflow: hidden;
        }

        /* subtle texture overlay */
        .projects-section::before {
          content: '';
          position: absolute;
          inset: 0;
          background: 
            radial-gradient(ellipse 80% 60% at 50% 0%, rgba(255,245,235,0.35) 0%, transparent 60%),
            radial-gradient(ellipse 50% 40% at 80% 100%, rgba(200,144,126,0.12) 0%, transparent 60%);
          pointer-events: none;
        }

        /* ── Heading ── */
        .projects-heading {
          text-align: center;
          overflow: visible;
          margin-bottom: 64px;
          position: relative;
          z-index: 1;
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .projects-section.visible .projects-heading {
          opacity: 1;
          transform: none;
        }
        .projects-eyebrow {
          font-family: 'Georgia', serif;
          font-size: 2.6rem;
          font-weight: 700;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: #c8907e;
          margin-bottom: 14px;
          display: inline-block;
          border-bottom: 2.5px solid #c8907e;
          padding-bottom: 0px;
        }
        .projects-title {
          font-family: 'Georgia', serif;
          font-size: clamp(2rem, 4vw, 3rem);
          font-weight: 700;
          color: #2d343c;
          letter-spacing: 0.04em;
          line-height: 1.1;
          margin: 0 0 16px;
        }
        .projects-subtitle {
          font-family: 'Georgia', serif;
          font-size: 1rem;
          font-style: italic;
          color: #412c17;
          letter-spacing: 0.06em;
        }
        /* rose gold overline */
       .projects-title-overline {
        width: 0px;
        opacity: 0;
        height: 5px;
        background:#ffffff;
        margin: 0 auto 28px;
        border-radius: 2px;
        position: relative;
        z-index:-100;
      }
      .projects-section.visible .projects-title-overline {
        animation: lampGrow 1.2s cubic-bezier(0.22,1,0.36,1) 0.2s forwards;
      }
      @keyframes lampGrow {
        from { width: 0px; opacity: 0; }
        to   { width: 600px; opacity: 1; }
      }

      /* wide light cone */
      .projects-title-overline::after {
        z-index:-100;
        content: '';
        position: absolute;
        top: 5px;
        left: 50%;
        transform: translateX(-50%);
        width: 700px;
        height: 400px;
        background: radial-gradient(ellipse 70% 100% at 50% 0%, rgba(255,255,255,0.9) 0%, transparent 70%);
        pointer-events: none;
      }

      /* rose gold bloom */
      .projects-title-overline::before {
        content: '';
        position: absolute;
        top: -4px;
        left: 50%;
        transform: translateX(-50%);
        width: 200px;
        height: 12px;
        background: radial-gradient(ellipse at center, rgba(230,255,255,0.8) 0%, transparent 70%);
        border-radius: 50%;
        filter: blur(4px);
        animation: lampGlow 2s ease-in-out infinite alternate;
      }
      @keyframes lampGlow {
        from { opacity: 0.6; width: 160px; }
        to   { opacity: 1;   width: 240px; }
      }

        /* ── Desktop Grid ── */
        .projects-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 28px;
          max-width: 1200px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }

        /* ── Card ── */
        .project-card {
          background: #ffffff;
          border-radius: 20px;
          overflow: hidden;
          box-shadow:
            0 4px 24px rgba(45, 52, 60, 0.7),
            0 1px 4px rgba(45, 52, 60, 0.5);
          transition: transform 0.35s cubic-bezier(0.22,1,0.36,1),
                      box-shadow 0.35s ease;
          opacity: 0;
          transform: translateY(32px);
          cursor: pointer;
          text-decoration: none;
          display: block;
          color: inherit;
        }
        .projects-section.visible .project-card:nth-child(1) {
          opacity: 1; transform: none;
          transition: opacity 0.6s ease 0.1s, transform 0.6s cubic-bezier(0.22,1,0.36,1) 0.1s,
                      box-shadow 0.35s ease;
        }
        .projects-section.visible .project-card:nth-child(2) {
          opacity: 1; transform: none;
          transition: opacity 0.6s ease 0.22s, transform 0.6s cubic-bezier(0.22,1,0.36,1) 0.22s,
                      box-shadow 0.35s ease;
        }
        .projects-section.visible .project-card:nth-child(3) {
          opacity: 1; transform: none;
          transition: opacity 0.6s ease 0.34s, transform 0.6s cubic-bezier(0.22,1,0.36,1) 0.34s,
                      box-shadow 0.35s ease;
        }
        .project-card:hover {
          transform: translateY(-8px);
          box-shadow:
            0 16px 48px rgba(45, 52, 60, 0.16),
            0 4px 12px rgba(200, 144, 126, 0.15);
        }

        /* Card image */
        .card-image {
          width: 100%;
          height: 220px;
          object-fit: cover;
          display: block;
          background: linear-gradient(135deg, #d4b8a8 0%, #c8a898 50%, #b89080 100%);
          position: relative;
          overflow: hidden;
        }
        .card-image-placeholder {
          width: 100%;
          height: 220px;
          background: linear-gradient(135deg, #d4b8a8 0%, #c0a090 40%, #a88070 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
        }
        .card-image-placeholder::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.15) 100%);
        }
        .placeholder-icon {
          opacity: 0.3;
        }

        /* Status badge */
        .card-status {
          position: absolute;
          top: 16px;
          right: 16px;
          font-family: 'Georgia', serif;
          font-size: 0.62rem;
          font-weight: 700;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          padding: 5px 12px;
          border-radius: 20px;
          z-index: 2;
        }
        .card-status.completed {
          background: rgba(255,255,255,0.92);
          color: #2d343c;
        }
        .card-status.ongoing {
          background: rgba(200, 144, 126, 0.92);
          color: #fff;
        }

        /* Card body */
        .card-body {
          padding: 28px 28px 32px;
        }
        .card-type {
          font-family: 'Georgia', serif;
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #c8907e;
          margin-bottom: 8px;
          display: block;
        }
        .card-name {
          font-family: 'Georgia', serif;
          font-size: 1.35rem;
          font-weight: 700;
          color: #2d343c;
          letter-spacing: 0.03em;
          margin: 0 0 6px;
          line-height: 1.2;
        }
        .card-location {
          font-family: 'Georgia', serif;
          font-size: 0.78rem;
          color: #8a8078;
          letter-spacing: 0.06em;
          margin-bottom: 14px;
          display: flex;
          align-items: center;
          gap: 5px;
        }
        .card-divider {
          width: 36px;
          height: 1.5px;
          background: linear-gradient(to right, #c8907e, transparent);
          border-radius: 2px;
          margin-bottom: 14px;
        }
        .card-description {
          font-family: 'Georgia', serif;
          font-size: 0.85rem;
          color: #6b6058;
          line-height: 1.7;
          font-style: italic;
          margin-bottom: 24px;
        }
        .card-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .card-year {
          font-family: 'Georgia', serif;
          font-size: 0.7rem;
          color: #a09088;
          letter-spacing: 0.1em;
        }
        .card-cta {
          font-family: 'Georgia', serif;
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #2d343c;
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 6px;
          transition: color 0.3s ease, gap 0.3s ease;
          border-bottom: 1px solid rgba(200,144,126,0.4);
          padding-bottom: 2px;
        }
        .card-cta:hover {
          color: #c8907e;
          gap: 10px;
        }
        .card-cta-arrow {
          transition: transform 0.3s ease;
        }
        .card-cta:hover .card-cta-arrow {
          transform: translateX(3px);
        }

        /* ── Bottom CTA ── */
        .projects-bottom {
          text-align: center;
          margin-top: 56px;
          position: relative;
          z-index: 1;
          opacity: 0;
          transform: translateY(16px);
          transition: opacity 0.6s ease 0.5s, transform 0.6s ease 0.5s;
        }
        .projects-section.visible .projects-bottom {
          opacity: 1;
          transform: none;
        }
        .projects-bottom-text {
          font-family: 'Georgia', serif;
          font-size: 1.4rem;
          font-style: italic;
          color: #412c17;
          margin-bottom: 24px;
          letter-spacing: 0.06em;
        }
        .projects-view-all {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-family: 'Georgia', serif;
          font-size: 0.85rem;
          font-weight: 700;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          text-decoration: none;
          color: #fff;
          background: #2d343c;
          padding: 0.85rem 2.4rem;
          border-radius: 30px;
          border: 1.5px solid #2d343c;
          transition: all 0.35s ease;
        }
        .projects-view-all:hover {
          background: transparent;
          color: #2d343c;
        }

        /* ── Carousel (mobile) ── */
        .projects-carousel { display: none; }

        @media (max-width: 900px) {
          .projects-grid    { display: none; }
          .projects-carousel { display: block; position: relative; z-index: 1; }

          .carousel-track {
            overflow: hidden;
            border-radius: 20px;
            max-width: 420px;
            margin: 0 auto;
          }
          .carousel-slide {
            transition: opacity 0.28s ease, transform 0.28s ease;
          }
          .carousel-slide.hiding {
            opacity: 0;
            transform: scale(0.97);
          }

          /* nav buttons */
          .carousel-controls {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 20px;
            margin-top: 28px;
          }
          .carousel-btn {
            width: 44px; height: 44px;
            border-radius: 50%;
            border: 1.5px solid rgba(45,52,60,0.3);
            background: #ffffff;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.25s ease;
            box-shadow: 0 2px 8px rgba(45,52,60,0.1);
          }
          .carousel-btn:hover {
            background: #2d343c;
            border-color: #2d343c;
          }
          .carousel-btn:hover svg { stroke: #fff; }
          .carousel-btn svg { stroke: #2d343c; transition: stroke 0.25s ease; }

          /* dots */
          .carousel-dots {
            display: flex;
            gap: 8px;
            align-items: center;
          }
          .carousel-dot {
            width: 6px; height: 6px;
            border-radius: 50%;
            background: rgba(45,52,60,0.2);
            transition: all 0.3s ease;
            cursor: pointer;
            border: none;
            padding: 0;
          }
          .carousel-dot.active {
            background: #c8907e;
            width: 20px;
            border-radius: 3px;
          }

          .projects-section { padding: 40px 1.5rem 50px; }
          .projects-heading { margin-bottom: 40px; }
          @keyframes lampGrow {
            from { width: 0px; opacity: 0; }
            to   { width: 420px; opacity: 1; }
          }
          .projects-title-overline::after { width: 600px; height: 280px; }
        }

        @media (max-width: 480px) {
          .projects-section .projects-eyebrow { font-size: 1.9rem; }
          .projects-section .projects-title { font-size: 1.6rem; }
          .projects-section { padding: 30px 1rem 40px; }
          .card-body { padding: 22px 22px 26px; }
          .card-image-placeholder { height: 180px; }
          
          @keyframes lampGrow {
            from { width: 0px; opacity: 0; }
            to   { width: 280px; opacity: 1; }
          }
          .projects-title-overline::after { width: 380px; height: 200px; }
        }
      `}</style>

      <section
        className={`projects-section${visible ? " visible" : ""}`}
        ref={sectionRef}
      >
        {/* Heading */}
        <div className="projects-heading">
          <div className="projects-title-overline" />
          <span className="projects-eyebrow">Our Work</span>
          <h2 className="projects-title">Signature Projects</h2>
          <p className="projects-subtitle">Every great legacy begins with a single foundation</p>
        </div>

        {/* ── Desktop Grid ── */}
        <div className="projects-grid">
          {PROJECTS.map((p) => (
            <Link href={`/projects/${p.id}`} className="project-card" key={p.id}>
              <div style={{ position: "relative" }}>
                <div className="card-image-placeholder">
                  <svg className="placeholder-icon" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="12" height="18" rx="1"/>
                    <rect x="15" y="8" width="6" height="13" rx="1"/>
                  </svg>
                </div>
                <span className={`card-status ${p.status.toLowerCase()}`}>{p.status}</span>
              </div>
              <div className="card-body">
                <span className="card-type">{p.type}</span>
                <h3 className="card-name">{p.name}</h3>
                <p className="card-location">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                  {p.location}
                </p>
                <div className="card-divider" />
                <p className="card-description">{p.description}</p>
                <div className="card-footer">
                  <span className="card-year">{p.year}</span>
                  <span className="card-cta">
                    View Project
                    <svg className="card-cta-arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="5" y1="12" x2="19" y2="12"/>
                      <polyline points="12 5 19 12 12 19"/>
                    </svg>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* ── Mobile Carousel ── */}
        <div className="projects-carousel">
          <div className="carousel-track">
            <div className={`carousel-slide${animating ? " hiding" : ""}`}>
              <Link href={`/projects/${PROJECTS[active].id}`} className="project-card" style={{ opacity: 1, transform: "none" }}>
                <div style={{ position: "relative" }}>
                  <div className="card-image-placeholder">
                    <svg className="placeholder-icon" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="3" width="12" height="18" rx="1"/>
                      <rect x="15" y="8" width="6" height="13" rx="1"/>
                    </svg>
                  </div>
                  <span className={`card-status ${PROJECTS[active].status.toLowerCase()}`}>{PROJECTS[active].status}</span>
                </div>
                <div className="card-body">
                  <span className="card-type">{PROJECTS[active].type}</span>
                  <h3 className="card-name">{PROJECTS[active].name}</h3>
                  <p className="card-location">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                      <circle cx="12" cy="10" r="3"/>
                    </svg>
                    {PROJECTS[active].location}
                  </p>
                  <div className="card-divider" />
                  <p className="card-description">{PROJECTS[active].description}</p>
                  <div className="card-footer">
                    <span className="card-year">{PROJECTS[active].year}</span>
                    <span className="card-cta">
                      View Project
                      <svg className="card-cta-arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="5" y1="12" x2="19" y2="12"/>
                        <polyline points="12 5 19 12 12 19"/>
                      </svg>
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          </div>

          <div className="carousel-controls">
            <button className="carousel-btn" onClick={() => go(-1)} aria-label="Previous">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6"/>
              </svg>
            </button>
            <div className="carousel-dots">
              {PROJECTS.map((_, i) => (
                <button
                  key={i}
                  className={`carousel-dot${active === i ? " active" : ""}`}
                  onClick={() => setActive(i)}
                  aria-label={`Go to project ${i + 1}`}
                />
              ))}
            </div>
            <button className="carousel-btn" onClick={() => go(1)} aria-label="Next">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="projects-bottom">
          <p className="projects-bottom-text">"We are growing — more projects coming soon"</p>
          <Link href="/projects" className="projects-view-all">
            View All Projects
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"/>
              <polyline points="12 5 19 12 12 19"/>
            </svg>
          </Link>
        </div>
      </section>
    </>
  );
}