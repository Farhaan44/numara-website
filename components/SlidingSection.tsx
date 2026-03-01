"use client";

import { useEffect, useRef, useState } from "react";

const SLIDES = [
  {
    id: 1,
    image: "/slider/slide1.png",
    bg: "#1a1f1a",
    heading: "DESIGNING\nBEYOND HORIZONS",
    quote: "At Numara innovation isn't just about the structures we build, it's about the future we dare to imagine.",
  },
  {
    id: 2,
    image: "/slider/slide2.png",
    bg: "#1a1510",
    heading: "CRAFTING\nRELATIONSHIPS",
    quote: "By fostering genuine connections and understanding your unique journey, we create spaces that truly feel like home.",
  },
  {
    id: 3,
    image: "/slider/slide3.png",
    bg: "#111820",
    heading: "CRAFTING\nINTEGRITY",
    quote: "Trust is the most important material we use. At Numara we ensure that our word is as solid as the foundations we pour.",
  },
  {
    id: 4,
    image: "/slider/slide4.png",
    bg: "#1c1410",
    heading: "CRAFTING\nPERMANENCE",
    quote: "At Numara, each development is crafted with the intent to endure by combining timeless design with structural integrity.",
  },
  {
    id: 5,
    image: "/slider/slide5.png",
    bg: "#1a0006",
    heading: "ELEVATING LIFESTYLES.\nARCHITECTING DISTINCTION",
    quote: "At Numara, each development is crafted with the intent to endure by combining timeless design with structural integrity.",
  },
];

const DURATION = 5000;

export default function SlidingSection() {
  const [idx, setIdx] = useState(0);
  const [key, setKey] = useState(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const goTo = (next: number) => {
    if (next === idx) return;
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIdx(next);
    setKey((k) => k + 1);
  };

  const advance = () => goTo((idx + 1) % SLIDES.length);

  useEffect(() => {
    timeoutRef.current = setTimeout(advance, DURATION);
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [idx]);

  const s = SLIDES[idx];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Anton&display=swap');

        .sl-root {
          position: relative;
          width: 100%;
          height: 100vh;
          min-height: 500px;
          max-height: 920px;
          overflow: hidden;
          display: flex;
          align-items: center;
          background: #0d0d0d;
        }



        /* ── Portrait image: left, not full height ── */
        .sl-images {
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
          width: 55%;
          aspect-ratio: 3 / 4;
          max-height: 92%;
          z-index: 2;
          overflow: hidden;
        }

        .sl-img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 0;
          z-index: 1;
          transition: opacity 0.8s ease;
        }
        .sl-img.on { opacity: 1; z-index: 2; }

        /* Dark gradient over image: left dark → right transparent */
        .sl-img-gradient {
          position: absolute;
          inset: 0;
          background:
            linear-gradient(to right, transparent 55%, rgba(0,0,0,0.9) 100%),
            linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, transparent 20%, transparent 80%, rgba(0,0,0,0.6) 100%),
            linear-gradient(to left, transparent 60%, rgba(0,0,0,0.4) 100%);
          z-index: 3;
          pointer-events: none;
        }

        /* ── Text: right side overlapping image ── */
        .sl-heading-wrap {
          position: absolute;
          left: 44%;
          right: 4vw;
          top: 50%;
          transform: translateY(-50%);
          z-index: 4;
        }

        .sl-heading-inner {
          animation: slIn 0.55s cubic-bezier(0.22,1,0.36,1) both;
        }
        @keyframes slIn {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .sl-heading {
          font-family: "Anton", sans-serif;
          font-weight: 400;
          font-size: clamp(3.2rem, 7vw, 8.5rem);
          color: #fff;
          line-height: 0.9;
          letter-spacing: 0.02em;
          margin: 0;
          white-space: pre-line;
        }

        .sl-quote-wrap { margin-top: 18px; }
        .sl-quote {
          font-family: "Anton", sans-serif;
          font-size: 1rem;
          color: rgba(255,255,255,0.75);
          line-height: 1.65;
          letter-spacing: 0.04em;
          margin: 0;
          max-width: 320px;
        }

        /* ── Arrow button: far right, vertically centered ── */
        .sl-arrow {
          position: absolute;
          right: 3vw;
          top: 50%;
          transform: translateY(-50%);
          z-index: 5;
          width: 52px;
          height: 52px;
          border-radius: 50%;
          border: 1.5px solid rgba(255,255,255,0.22);
          background: rgba(255,255,255,0.05);
          backdrop-filter: blur(6px);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          cursor: pointer;
          transition: background 0.25s, border-color 0.25s, transform 0.25s;
        }
        .sl-arrow:hover {
          background: rgba(255,255,255,0.14);
          border-color: rgba(255,255,255,0.55);
          transform: translateY(-50%) scale(1.08);
        }

        /* ── Dots: bottom left ── */
        .sl-dots {
          position: absolute;
          bottom: 45px;
          left: 6vw;
          z-index: 5;
          display: flex;
          gap: 8px;
          align-items: center;
        }
        .sl-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: rgba(255,255,255,0.2);
          border: none;
          cursor: pointer;
          padding: 0;
          transition: background 0.3s, width 0.3s, border-radius 0.3s;
        }
        .sl-dot.on {
          background: rgba(255,255,255,0.65);
          width: 20px;
          border-radius: 3px;
        }

        /* Progress */
        .sl-prog {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 1px;
          background: rgba(255,255,255,0.06);
          z-index: 6;
        }
        .sl-prog-fill {
          height: 100%;
          background: rgba(255,255,255,0.28);
          animation: progFill 5s linear forwards;
        }
        @keyframes progFill {
          from { width: 0; }
          to   { width: 100%; }
        }

        /* ── Mobile ── */
        @media (max-width: 768px) {
          .sl-root {
            max-height: none;
            height: 60svh;
            min-height: 480px;
            align-items: flex-end;
          }

          /* Image: full bleed, overlaps with text area */
          .sl-images {
            left: 0;
            top: 0;
            transform: none;
            width: 100%;
            aspect-ratio: auto;
            height: 75%;
            max-height: none;
            border-radius: 0;
          }

          /* Gradient goes bottom-up on mobile so text is readable */
          .sl-img-gradient {
            background: linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.65) 40%, rgba(0,0,0,0.15) 100%);
          }

          /* Text: sits in lower image overlap zone */
          .sl-heading-wrap {
            left: 5vw;
            right: 16vw;
            top: auto;
            bottom: 52px;
            transform: none;
          }
          .sl-heading { font-size: clamp(2.2rem, 9vw, 3.4rem); }
          .sl-quote-wrap { margin-top: 10px; }
          .sl-quote { font-size: 0.7rem; max-width: 100%; }

          /* Arrow: bottom right */
          .sl-arrow {
            top: auto;
            bottom: 60px;
            right: 5vw;
            transform: none;
            width: 46px;
            height: 46px;
          }
          .sl-arrow:hover { transform: scale(1.08); }

          .sl-dots { bottom: 20px; left: 5vw; }
        }

        @media (max-width: 420px) {
          .sl-heading { font-size: 1.9rem; }
          .sl-quote { font-size: 0.65rem; }
        }
      `}</style>

      <div className="sl-root" style={{ backgroundColor: s.bg }}>

        {/* Portrait image + gradient overlay */}
        <div className="sl-images">
          {SLIDES.map((slide, i) =>
            slide.image ? (
              <img
                key={slide.id}
                src={slide.image}
                alt=""
                className={`sl-img ${i === idx ? "on" : ""}`}
              />
            ) : (
              <div
                key={slide.id}
                className={`sl-img ${i === idx ? "on" : ""}`}
                style={{ background: slide.bg }}
              />
            )
          )}
          <div className="sl-img-gradient" />
        </div>

        {/* Heading + quote */}
        <div className="sl-heading-wrap">
          <div key={key} className="sl-heading-inner">
            <h2 className="sl-heading">{s.heading}</h2>
            <div className="sl-quote-wrap">
              <p className="sl-quote">"{s.quote}"</p>
            </div>
          </div>
        </div>

        {/* Arrow button */}
        <button className="sl-arrow" onClick={advance} aria-label="Next slide">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>

        {/* Dots */}
        <div className="sl-dots">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              className={`sl-dot ${i === idx ? "on" : ""}`}
              onClick={() => goTo(i)}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>

        {/* Progress */}
        <div className="sl-prog">
          <div key={idx} className="sl-prog-fill" />
        </div>

      </div>
    </>
  );
}