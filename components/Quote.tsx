"use client";

import { useEffect, useRef, useState } from "react";

/* ── Line-by-line reveal ── */
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

/* ── Block reveal ── */
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
        const revealed = rect.top < window.innerHeight * (1 - 0.02);
        inner.style.transitionDelay = `${i * 0.11}s`;
        inner.style.transform = revealed ? "translateY(0%)" : "translateY(110%)";
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
}

export default function QuoteSection() {
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
          padding-top:3rem;
          padding-bottom:3rem;
        }

        .ls-line-bottom {
          position: absolute;
          bottom: 2rem; left: 0; right: 0;
          height: 1.5px;
          background: var(--ls-accent);
          opacity: 0.9;
          z-index: 3;
          pointer-events: none;
        }
          .ls-line-top {
          position: absolute;
          top: 2rem; left: 0; right: 0;
          height: 1.5px;
          background: var(--ls-accent);
          opacity: 0.9;
          z-index: 3;
          pointer-events: none;
        }

        /* image-left | text-right */
        .ls-inner {
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-template-rows: 1fr;
          grid-template-areas: "image text";
          min-height: 85vh;
        }

        /* ── Image side — bleeds to left edge ── */
        .ls-right {
          grid-area: image;
          position: relative;
          overflow: hidden;
          opacity: 0;
          transform: translateX(-28px);
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
          background-image: url('/quote.jpg');
          background-size: cover;
          background-position: center;
          will-change: transform;
          
          filter: contrast(1.08) brightness(1.05) saturate(1.18);
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

        /* ── Text side ── */
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
          margin-bottom: 0;
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

        .ls-author {
          display: flex;
          align-items: center;
          gap: 14px;
          margin-top: 36px;
        }

        .ls-author-line {
          width: 50px;
          height: 1.5px;
          background: var(--ls-accent);
          flex-shrink: 0;
        }

        .ls-author-name {
          font-family: 'Lato', sans-serif;
          font-size: 1rem;
          font-weight: 700;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: var(--ls-heading);
        }

        .ls-author-title {
          font-family: 'Lato', sans-serif;
          font-size: 0.8rem;
          font-weight: 600;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--ls-body);
          margin-top: 4px;
        }

        /* ── Mobile ── */
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
        <div className="ls-line-top" />
        <div className="ls-line-bottom" />

        <div className="ls-inner">

          {/* ── Image side — bleeds to left edge ── */}
          <div className="ls-right">
            <div className="ls-img" ref={imgRef} />
            <div className="ls-corner" />
            <div className="ls-corner ls-corner-br" />
          </div>

          {/* ── Text side ── */}
          <div className="ls-left">
            <h2 className="ls-heading" ref={headingRef}>
              <span>A Vision</span>
              <span>That</span>
              <span>Guides Us</span>
            </h2>

            <div className="ls-body-wrap" ref={bodyRef}>
              <div className="ls-body-block">
               
                <p className="ls-body" data-reveal>
                  “At Numara, we believe that every space we create carries a responsibility — to the families who live in it, the communities that grow around it, and the future it shapes. Our commitment is simple: build with integrity, deliver with excellence, and create lasting value for generations.”    
                </p>
              </div>

              <div className="ls-author" data-reveal>
                <div className="ls-author-line" />
                <div>
                  <div className="ls-author-name">Anwar A. Shaikh</div>
                  <div className="ls-author-title">Chairman, Numara Group</div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}