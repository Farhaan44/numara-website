"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

/* ── Line-by-line reveal: wraps each <span> child in overflow:hidden mask ── */
function useLineReveal(
  containerRef: React.RefObject<HTMLElement>,
  threshold = 0.18
) {
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const lines = Array.from(container.children) as HTMLElement[];

    lines.forEach((line) => {
      if (line.dataset.wrapped) return;
      line.dataset.wrapped = "1";
      line.style.overflow = "hidden";
      line.style.display  = "block";
      const inner = document.createElement("span");
      inner.style.display    = "block";
      inner.style.transform  = "translateY(110%)";
      inner.style.transition = "transform 0.85s cubic-bezier(0.16,1,0.3,1)";
      inner.style.willChange = "transform";
      while (line.firstChild) inner.appendChild(line.firstChild);
      line.appendChild(inner);
    });

    const inners = lines.map(
      (l) => l.querySelector("span") as HTMLElement
    );

    const onScroll = () => {
      inners.forEach((inner, i) => {
        if (!inner) return;
        const rect = (inner.parentElement as HTMLElement).getBoundingClientRect();
        const revealed = rect.top < window.innerHeight * (1 - threshold);
        inner.style.transitionDelay = `${i * 0.09}s`;
        inner.style.transform = revealed ? "translateY(0%)" : "translateY(110%)";
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
}

/* ── Block reveal: targets [data-reveal] children ── */
function useBlockReveal(
  containerRef: React.RefObject<HTMLElement>,
  threshold = 0.01
) {
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const blocks = Array.from(
      container.querySelectorAll<HTMLElement>("[data-reveal]")
    );

    blocks.forEach((block) => {
      if (block.dataset.wrapped) return;
      block.dataset.wrapped = "1";
      block.style.overflow = "hidden";
      const inner = document.createElement("div");
      inner.style.transform  = "translateY(110%)";
      inner.style.transition = "transform 0.85s cubic-bezier(0.16,1,0.3,1)";
      inner.style.willChange = "transform";
      while (block.firstChild) inner.appendChild(block.firstChild);
      block.appendChild(inner);
    });

    const onScroll = () => {
      blocks.forEach((block, i) => {
        const inner = block.querySelector("div") as HTMLElement;
        if (!inner) return;
        const rect = block.getBoundingClientRect();
        const isCta = i === blocks.length - 1;
        const t = isCta ? 0.01 : 0.02;
        const revealed = rect.top < window.innerHeight * (1 - t);
        inner.style.transitionDelay = `${i * 0.11}s`;
        inner.style.transform = revealed ? "translateY(0%)" : "translateY(110%)";
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
}

export default function LegacySection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imgRef     = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const bodyRef    = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useLineReveal(headingRef as React.RefObject<HTMLElement>);
  useBlockReveal(bodyRef   as React.RefObject<HTMLElement>);

  /* ── Intersection observer (image slide-in) ── */
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  /* ── Parallax scroll ── */
  useEffect(() => {
    const onScroll = () => {
      const section = sectionRef.current;
      const img     = imgRef.current;
      if (!section || !img) return;
      const rect   = section.getBoundingClientRect();
      const center = rect.top + rect.height / 2 - window.innerHeight / 2;
      img.style.transform = `translateY(${center * 0.14}px)`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600&family=Lato:wght@300;400;700&display=swap');

        :root {
          --ls-bg:      #f8f0e5;
          --ls-heading: #412c17;
          --ls-body:    #776251;
          --ls-accent:  #c2a170;
          --ls-border:  #ddd0bf;
        }

        .ls-section {
          background: var(--ls-bg);
          position: relative;
          overflow: hidden;
        }

        .ls-line-bottom {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 1.5px;
          background: var(--ls-accent);
          opacity: 0.9;
          z-index: 3;
          pointer-events: none;
        }

        .ls-inner {
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-template-rows: 1fr;
          grid-template-areas: "text image";
          min-height: 85vh;
        }

        .ls-left {
          grid-area: text;
          padding: 80px 6vw 80px 6vw;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .ls-heading {
          font-family: 'Playfair Display', serif;
          font-size: clamp(2.4rem, 4vw, 3.7rem);
          font-weight: 500;
          color: var(--ls-heading);
          line-height: 1.18;
          letter-spacing: -0.01em;
          margin: 0 0 36px;
        }

        .ls-body-wrap {
          display: flex;
          flex-direction: column;
        }

        .ls-body-block {
          border-left: 1.5px solid var(--ls-accent);
          padding-left: 20px;
          display: flex;
          flex-direction: column;
          gap: 20px;
          margin-bottom: 44px;
        }

        .ls-body {
          font-family: 'Lato', sans-serif;
          font-size: clamp(0.9rem, 1.5vw, 1.3rem);
          font-weight: 400;
          color: var(--ls-body);
          line-height: 1.85;
          margin: 0;
          letter-spacing: 0.01em;
        }

        .ls-cta {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-family: 'Lato', sans-serif;
          font-size: 1.3rem;
          font-weight: 700;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: var(--ls-heading);
          text-decoration: none;
          transition: gap 0.3s ease, color 0.3s ease;
        }
        .ls-cta:hover { gap: 16px; color: var(--ls-accent); }
        .ls-cta-arrow {
          display: flex;
          align-items: center;
          transition: transform 0.3s ease;
        }
        .ls-cta:hover .ls-cta-arrow { transform: translateX(4px); }

        .ls-right {
          grid-area: image;
          position: relative;
          overflow: hidden;
          opacity: 0;
          transform: translateX(28px);
          transition: opacity 0.9s cubic-bezier(0.22,1,0.36,1) 0.15s,
                      transform 0.9s cubic-bezier(0.22,1,0.36,1) 0.15s;
        }
        .ls-section.visible .ls-right {
          opacity: 1;
          transform: none;
        }

        .ls-img {
          position: absolute;
          inset: -12% 0;
          background-image: url('/legacyimg.png');
          background-size: cover;
          background-position: center;
          will-change: transform;
          filter: contrast(1.08) brightness(1.05) saturate(1.18);
          /* transition removed — caused iOS async scroll stutter */
        }

        .ls-corner {
          position: absolute;
          top: 28px; left: 28px;
          width: 36px; height: 36px;
          border-top: 1.5px solid rgba(255,255,255,0.55);
          border-left: 1.5px solid rgba(255,255,255,0.55);
          z-index: 2;
          pointer-events: none;
        }
        .ls-corner-br {
          top: auto; left: auto;
          bottom: 28px; right: 28px;
          border-top: none; border-left: none;
          border-bottom: 1.5px solid rgba(255,255,255,0.55);
          border-right:  1.5px solid rgba(255,255,255,0.55);
        }

        @media (max-width: 900px) {
          .ls-inner {
            grid-template-columns: 1fr;
            grid-template-rows: auto auto auto;
            grid-template-areas:
              "heading-mob"
              "image"
              "body-mob";
            min-height: unset;
          }

          .ls-left {
            grid-area: unset;
            display: contents;
          }

          .ls-heading {
            grid-area: heading-mob;
            padding: 52px 6vw 28px;
            margin: 0;
          }

          .ls-body-wrap {
            grid-area: body-mob;
            padding: 32px 6vw 60px;
          }

          .ls-right {
            grid-area: image;
            min-height: 70vw;
            height: 70vw;
            opacity: 1;
            transform: none;
          }
        }
      `}</style>

      <section
        className={`ls-section${visible ? " visible" : ""}`}
        ref={sectionRef}
      >
       

        <div className="ls-inner">

          {/* ── Text side ── */}
          <div className="ls-left">
            <h2 className="ls-heading" ref={headingRef}>
              <span>A Legacy of</span>
              <span>Unrivaled</span>
              <span>Craftsmanship</span>
            </h2>

            <div className="ls-body-wrap" ref={bodyRef}>
              <div className="ls-body-block">
                <p className="ls-body" data-reveal>
                  We do not simply develop spaces — we shape environments that endure.
                  At Numara Group, each project reflects a commitment to thoughtful design and refined execution.
                </p>
                <p className="ls-body" data-reveal>
                  Rooted in over 15 years of experience, our work reflects a balance between refinement and timeless structure.
                  From redevelopment to new developments,
                  every Numara address stands as a quiet statement of quality and permanence.
                </p>
              </div>

              <div data-reveal>
                <Link href="/about" className="ls-cta">
                  About Us
                  <span className="ls-cta-arrow">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" strokeWidth="1.8"
                      strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12"/>
                      <polyline points="12 5 19 12 12 19"/>
                    </svg>
                  </span>
                </Link>
              </div>
            </div>
          </div>

          {/* ── Image side — bleeds to right edge ── */}
          <div className="ls-right">
            <div className="ls-img" ref={imgRef} />
          </div>

        </div>
      </section>
    </>
  );
}