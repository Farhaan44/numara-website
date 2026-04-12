"use client";

import { useState } from "react";
import Link from "next/link";
import { SectionDivider } from "./SectionDivider";

// ─── TYPES ────────────────────────────────────────────────────────
export interface ProjectData {
  title: string;
  subtitle: string;
  heroImage: string;
  overview: {
    heading: string;
    description: string;
    image: string;
    stats: { label: string; value: string }[];
  };
  gallery?: { title: string; subtitle: string; image: string }[];
  floorplans?: { title: string; subtitle: string; image: string }[];
  brochureUrl?: string; // Made optional! Will only render if provided.
}

// ─── TEMPLATE COMPONENT ───────────────────────────────────────────
export default function ProjectTemplate({ data }: { data: ProjectData }) {
  // Interactive States
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);
  
  // Floorplan state kept for when you uncomment it later
  const [floorplanIdx, setFloorplanIdx] = useState(0);
  const nextFloorplan = () => {
    if (data.floorplans) setFloorplanIdx((p) => (p + 1) % data.floorplans!.length);
  };
  const prevFloorplan = () => {
    if (data.floorplans) setFloorplanIdx((p) => (p - 1 + data.floorplans!.length) % data.floorplans!.length);
  };

  return (
    <main className="project-page">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Lato:wght@300;400;700;900&display=swap');

        :root {
          --color-main: #412c17;
          --color-sub: #776251;
          --color-accent: #c2a170;
          --color-bg: #F8F0E5;
          --color-white: #ffffff;
          --color-overlay: rgba(65, 44, 23, 0.55);
          --font-heading: 'Playfair Display', serif;
          --font-body: 'Lato', sans-serif;
        }

        .project-page {
          font-family: var(--font-body);
          color: var(--color-main);
          background: var(--color-bg);
          overflow-x: hidden;
        }

        /* BIG UNIFIED HEADINGS */
        .section-heading {
          font-family: var(--font-heading);
          font-size: clamp(42px, 5vw, 68px);
          font-weight: 400;
          color: var(--color-main);
          line-height: 1.1;
          margin-bottom: 32px;
          letter-spacing: -0.01em;
        }

        /* DIVIDER LINES */
        .section-divider {
          width: calc(100% - 160px);
          max-width: 1400px;
          height: 1px;
          background: var(--color-accent);
          margin: 0 auto;
          opacity: 0.5;
        }

        /* HERO */
        .hero-section {
          position: relative;
          height: 100vh;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }
        .hero-bg {
          position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; z-index: 0;
        }
        .hero-overlay {
          position: absolute; inset: 0; z-index: 1;
          background: linear-gradient(180deg, rgba(65, 44, 23, 0.2) 0%, rgba(65, 44, 23, 0.6) 100%);
        }
        .hero-content {
          position: relative; z-index: 2; text-align: center; padding: 0 24px;
        }
        .hero-title {
          font-family: var(--font-heading); font-size: clamp(52px, 8vw, 100px); font-weight: 400;
          color: var(--color-white); line-height: 1.08; margin-bottom: 24px;
        }
        .hero-subtitle {
          font-family: var(--font-body); font-size: clamp(17px, 1.8vw, 22px); font-weight: 300;
          color: rgba(255, 255, 255, 0.85); max-width: 640px; margin: 0 auto; line-height: 1.75;
        }

        /* OVERVIEW */
        .overview-section { padding: 120px 80px; display: flex; align-items: center; gap: 80px; }
        .overview-text { flex: 1; }
        .overview-desc {
          font-family: var(--font-body); font-size: 18px; font-weight: 300; color: var(--color-sub);
          line-height: 1.9; margin-bottom: 36px; white-space: pre-line;
        }
        .overview-stats { display: flex; gap: 48px; }
        .stat-item { text-align: left; }
        .stat-value { font-family: var(--font-heading); font-size: 42px; color: var(--color-accent); margin-bottom: 6px; }
        .stat-label { font-family: var(--font-body); font-size: 13px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; color: var(--color-sub); }
        .overview-image-wrapper { flex: 1; position: relative; }
        .overview-image-wrapper img { width: 100%; height: 550px; object-fit: cover; border-radius: 4px; cursor: pointer;}
        .overview-image-frame {
          position: absolute; top: -16px; right: -16px; width: 100%; height: 100%;
          border: 1px solid var(--color-accent); border-radius: 4px; z-index: -1;
        }

        /* CAROUSEL SECTION (CSS kept for when uncommented) */
        .carousel-section { padding: 100px 80px; }
        .carousel-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 40px; }
        .carousel-track { display: flex; gap: 24px; overflow-x: auto; padding-bottom: 20px; scrollbar-width: none; }
        .carousel-track::-webkit-scrollbar { display: none; }
        .carousel-slide { min-width: calc(33.333% - 16px); position: relative; border-radius: 4px; overflow: hidden; cursor: pointer; flex-shrink: 0;}
        .carousel-slide img { width: 100%; height: 400px; object-fit: cover; transition: transform 0.6s ease; }
        .carousel-slide:hover img { transform: scale(1.05); }
        .carousel-slide-overlay { position: absolute; bottom: 0; left: 0; right: 0; padding: 24px; background: linear-gradient(transparent, rgba(65, 44, 23, 0.8)); pointer-events: none;}
        .carousel-slide-title { font-family: var(--font-heading); font-size: 22px; color: var(--color-white); }
        .carousel-slide-sub { font-family: var(--font-body); font-size: 14px; color: rgba(255, 255, 255, 0.8); margin-top: 4px; }

        /* FLOOR PLAN CAROUSEL (CSS kept for when uncommented) */
        .floorplan-section { padding: 100px 80px; }
        .floorplan-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 40px; }
        .floorplan-nav { display: flex; gap: 12px; align-items: center; }
        .floorplan-arrow {
          width: 48px; height: 48px; border-radius: 50%; border: 1px solid var(--color-accent);
          background: transparent; color: var(--color-accent); font-size: 20px; cursor: pointer;
          display: flex; align-items: center; justify-content: center; transition: all 0.3s ease;
        }
        .floorplan-arrow:hover { background: var(--color-accent); color: var(--color-main); }
        .floorplan-counter { font-family: var(--font-body); font-size: 14px; letter-spacing: 2px; color: var(--color-sub); min-width: 60px; text-align: center; }
        .floorplan-viewport { overflow: hidden; border-radius: 4px; position: relative; cursor: pointer; }
        .floorplan-viewport img { width: 100%; height: 520px; object-fit: contain; background: #fff; border-radius: 4px; border: 1px solid rgba(194,161,112,0.2); }
        .floorplan-caption { margin-top: 20px; text-align: center; }
        .floorplan-caption-title { font-family: var(--font-heading); font-size: 24px; color: var(--color-main); margin-bottom: 4px; }
        .floorplan-caption-sub { font-family: var(--font-body); font-size: 15px; color: var(--color-sub); }

        /* ENQUIRE CTA */
        .enquire-section { padding: 120px 80px; text-align: center; background: var(--color-bg); position: relative; overflow: hidden; }
        .enquire-desc { font-family: var(--font-body); font-size: 18px; font-weight: 300; color: var(--color-sub); max-width: 540px; margin: 0 auto 48px; line-height: 1.75; position: relative; }
        .enquire-buttons { display: flex; gap: 20px; justify-content: center; align-items: center; flex-wrap: wrap; position: relative; }
        .enquire-btn {
          font-family: var(--font-body); font-size: 14px; font-weight: 700; letter-spacing: 3px; text-transform: uppercase;
          padding: 20px 56px; background: var(--color-main); color: var(--color-white); border: none; cursor: pointer; transition: all 0.3s ease; text-decoration: none; display: inline-block;
        }
        .enquire-btn:hover { background: var(--color-accent); transform: translateY(-2px); box-shadow: 0 12px 40px rgba(194, 161, 112, 0.2); }
        
        /* Brochure Button CSS kept ready for use */
        .brochure-btn {
          font-family: var(--font-body); font-size: 14px; font-weight: 700; letter-spacing: 3px; text-transform: uppercase;
          padding: 20px 56px; background: transparent; color: var(--color-main); border: 1px solid var(--color-main); cursor: pointer; transition: all 0.3s ease; text-decoration: none; display: inline-block;
        }
        .brochure-btn:hover { border-color: var(--color-accent); color: var(--color-accent); transform: translateY(-2px); }

        /* LIGHTBOX */
        .lightbox-overlay {
          position: fixed; inset: 0; background: rgba(0, 0, 0, 0.92); z-index: 1000;
          display: flex; align-items: center; justify-content: center; cursor: pointer;
        }
        .lightbox-overlay img { max-width: 90vw; max-height: 85vh; object-fit: contain; border-radius: 4px; }
        .lightbox-close {
          position: absolute; top: 24px; right: 32px; font-family: var(--font-body); font-size: 14px; letter-spacing: 2px;
          text-transform: uppercase; color: var(--color-white); background: none; border: 1px solid rgba(255,255,255,0.3);
          padding: 8px 20px; cursor: pointer; transition: all 0.3s;
        }
        .lightbox-close:hover { background: var(--color-accent); color: var(--color-main); border-color: var(--color-accent); }

        /* RESPONSIVE */
        @media (max-width: 768px) {
          .section-divider { width: calc(100% - 48px); }
          .overview-section { flex-direction: column; padding: 60px 24px; gap: 40px; }
          .overview-stats { gap: 24px; flex-wrap: wrap;}
          .carousel-section, .floorplan-section { padding: 60px 24px; }
          .carousel-slide { min-width: calc(85%); }
          .enquire-section { padding: 80px 24px; }
        }
      `}</style>

      {/* 1. HERO */}
      <section className="hero-section">
        <img src={data.heroImage} alt={data.title} className="hero-bg" />
        <div className="hero-overlay" />
        <div className="hero-content">
          <h1 className="hero-title">{data.title}</h1>
          <p className="hero-subtitle">{data.subtitle}</p>
        </div>
      </section>

      {/* 2. OVERVIEW */}
      <section className="overview-section">
        <div className="overview-text">
          <h2 className="section-heading">{data.overview.heading}</h2>
          <p className="overview-desc">{data.overview.description}</p>
          
          <div className="overview-stats">
            {data.overview.stats.map((stat, i) => (
              <div key={i} className="stat-item">
                <div className="stat-value">{stat.value}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="overview-image-wrapper">
          <div className="overview-image-frame" />
          <img src={data.overview.image} alt="Overview" onClick={() => setLightboxImg(data.overview.image)} />
        </div>
      </section>

      <div className="section-divider" />

      {/* 3. GALLERY CAROUSEL (Commented out) */}
      {/* {data.gallery && data.gallery.length > 0 && (
        <section className="carousel-section">
          <div className="carousel-header">
            <h2 className="section-heading" style={{ marginBottom: 0 }}>Design & Amenities</h2>
          </div>
          <div className="carousel-track">
            {data.gallery.map((item, i) => (
              <div key={i} className="carousel-slide" onClick={() => setLightboxImg(item.image)}>
                <img src={item.image} alt={item.title} />
                <div className="carousel-slide-overlay">
                  <h3 className="carousel-slide-title">{item.title}</h3>
                  <p className="carousel-slide-sub">{item.subtitle}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      <div className="section-divider" /> 
      */}

      {/* 4. FLOORPLANS (Commented out) */}
      {/* {data.floorplans && data.floorplans.length > 0 && (
        <section className="floorplan-section">
          <div className="floorplan-header">
            <h2 className="section-heading" style={{ marginBottom: 0 }}>Floor Plans</h2>
            <div className="floorplan-nav">
              <button className="floorplan-arrow" onClick={prevFloorplan}>←</button>
              <span className="floorplan-counter">
                {floorplanIdx + 1} / {data.floorplans.length}
              </span>
              <button className="floorplan-arrow" onClick={nextFloorplan}>→</button>
            </div>
          </div>
          
          <div className="floorplan-viewport" onClick={() => setLightboxImg(data.floorplans[floorplanIdx].image)}>
            <img 
              src={data.floorplans[floorplanIdx].image} 
              alt={data.floorplans[floorplanIdx].title} 
            />
          </div>
          <div className="floorplan-caption">
            <h3 className="floorplan-caption-title">{data.floorplans[floorplanIdx].title}</h3>
            <p className="floorplan-caption-sub">{data.floorplans[floorplanIdx].subtitle}</p>
          </div>
        </section>
      )}

      <div className="section-divider" /> 
      */}

      {/* 5. ENQUIRE CTA */}
      <section className="enquire-section">
        <h2 className="section-heading">Interested in {data.title}?</h2>
        <p className="enquire-desc">
          Reach out to our dedicated team to schedule a private viewing or request comprehensive project details.
        </p>
        <div className="enquire-buttons">
          <Link href="/contact" className="enquire-btn">Register Interest</Link>
          
          {/* Automatically renders if you add 'brochureUrl: "/path.pdf"' to your data */}
          {data.brochureUrl && (
            <a href={data.brochureUrl} target="_blank" rel="noopener noreferrer" className="brochure-btn">
              Download Brochure
            </a>
          )}
        </div>
      </section>

      {/* LIGHTBOX MODAL */}
      {lightboxImg && (
        <div className="lightbox-overlay" onClick={() => setLightboxImg(null)}>
          <button className="lightbox-close" onClick={() => setLightboxImg(null)}>Close</button>
          <img src={lightboxImg} alt="Enlarged view" onClick={(e) => e.stopPropagation()} />
        </div>
      )}
    <SectionDivider/>
    </main>
  );
}