"use client";

import { useEffect, useRef, useState } from "react";

const SECTIONS = [
  {
    heading: "Our\nFoundation",
    label: "Our Foundation",
    quote: "Our word is as solid as the foundations we pour.",
    desc: "Since 2008, Numara Group has stood on a single unwavering principle — that every space we create must earn the trust of the families and communities that inhabit it.",
    image: "/numarahollow1.svg",
  },
  {
    heading: "Our\nVision",
    label: "Our Vision",
    quote: "Building spaces that create lasting value.",
    desc: "We envision developments that go beyond structures — spaces that support growth, enhance everyday living, and contribute meaningfully to the communities around them.",
    image: "/numarahollow2.svg",
  },
  {
    heading: "Our\nCommitment",
    label: "Our Commitment",
    quote: "Every Numara address is chosen and built with intention.",
    desc: "Our commitment extends beyond the handover of keys. We remain partners to every family and community we have served — a lifelong covenant to quality and care.",
    image: "/numarahollow3.svg",
  },
];

/* ─────────────────────────────────────────────
   Char-by-char scroll opacity component
───────────────────────────────────────────── */
function ScrollText({
  text,
  className,
  itemRef,
}: {
  text: string;
  className?: string;
  itemRef: React.RefObject<HTMLDivElement>;
}) {
  const elRef = useRef<HTMLSpanElement>(null);
  const [progresses, setProgresses] = useState<number[]>(
    Array(text.length).fill(0)
  );

  useEffect(() => {
    const onScroll = () => {
      const el   = elRef.current;
      const item = itemRef.current;
      if (!el || !item) return;

      const elRect  = el.getBoundingClientRect();
      const winH    = window.innerHeight;
      const entry   = winH * 0.80;
      const fullLit = winH * 0.35;
      const top     = elRect.top;

      const rawProgress     = (entry - top) / (entry - fullLit);
      const sectionProgress = Math.max(0, Math.min(1, rawProgress));

      const next = text.split("").map((_, ci) => {
        const charThreshold = ci / text.length;
        const charProgress  = (sectionProgress - charThreshold) / (1 / text.length);
        return Math.max(0, Math.min(1, charProgress * 2.5));
      });

      setProgresses(next);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [text]);

  const lerp = (a: number, b: number, t: number) => Math.round(a + (b - a) * t);
  const litR = 65, litG = 44, litB = 23;
  const phR = 176, phG = 154, phB = 136;

  return (
    <span ref={elRef} className={className} style={{ display: "block", color: "unset", width: "100%" }}>
      {text.split("").map((char, i) => {
        const t = progresses[i];
        const r = lerp(phR, litR, t);
        const g = lerp(phG, litG, t);
        const b = lerp(phB, litB, t);
        return (
          <span
            key={i}
            style={{
              color: `rgb(${r},${g},${b})`,
              transition: "color 0.12s ease",
              display: "inline",
              whiteSpace: char === " " ? "pre-wrap" : undefined,
            }}
          >
            {char}
          </span>
        );
      })}
    </span>
  );
}

/* ─────────────────────────────────────────────
   Heading line-by-line mask reveal
───────────────────────────────────────────── */
function HeadingReveal({
  heading,
  itemRef,
}: {
  heading: string;
  itemRef: React.RefObject<HTMLDivElement>;
}) {
  const lines     = heading.split("\n");
  const lineRefs  = useRef<(HTMLDivElement | null)[]>([]);
  const innerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const revealedFlags = useRef<boolean[]>(lines.map(() => false));

  useEffect(() => {
    const onScroll = () => {
      const item = itemRef.current;
      if (!item) return;
      const winH = window.innerHeight;

      lineRefs.current.forEach((line, i) => {
        const inner = innerRefs.current[i];
        if (!line || !inner) return;
        if (!revealedFlags.current[i]) {
          const rect = line.getBoundingClientRect();
          if (rect.top < winH * 0.72) revealedFlags.current[i] = true;
        }
        inner.style.transitionDelay = `${i * 0.08}s`;
        inner.style.transition      = "transform 0.9s cubic-bezier(0.16,1,0.3,1)";
        inner.style.transform       = revealedFlags.current[i] ? "translateY(0%)" : "translateY(105%)";
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <h2 className="bl-heading">
      {lines.map((line, i) => (
        <div
          key={i}
          ref={(el) => { lineRefs.current[i] = el; }}
          style={{ overflow: "hidden", display: "block", lineHeight: "inherit", width: "100%" }}
        >
          <div
            ref={(el) => { innerRefs.current[i] = el; }}
            style={{ transform: "translateY(105%)", display: "block", width: "100%" }}
          >
            {line}
          </div>
        </div>
      ))}
    </h2>
  );
}

export default function BeliefsSection() {
  const sectionRef  = useRef<HTMLDivElement>(null);
  const fillRef     = useRef<HTMLDivElement>(null);
  const dotRef      = useRef<HTMLDivElement>(null);
  const itemDomRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [activeIdx, setActiveIdx] = useState(-1);
  const [firstReady, setFirstReady] = useState(false);

  useEffect(() => {
    let r1: number, r2: number;
    r1 = requestAnimationFrame(() => {
      r2 = requestAnimationFrame(() => setFirstReady(true));
    });
    return () => { cancelAnimationFrame(r1); cancelAnimationFrame(r2); };
  }, []);

  const itemRefs = useRef<React.RefObject<HTMLDivElement>[]>(
    SECTIONS.map(() => ({ current: null } as unknown as React.RefObject<HTMLDivElement>))
  );

  useEffect(() => {
    let targetPct  = 0;
    let currentPct = 0;
    let fillPct    = 0;
    let rafId: number;

    const lerpFn = (a: number, b: number, t: number) => a + (b - a) * t;

    const tick = () => {
      currentPct = lerpFn(currentPct, targetPct, 0.15);
      fillPct    = lerpFn(fillPct, targetPct, 0.25);

      if (dotRef.current)  dotRef.current.style.top    = `${currentPct}%`;
      if (fillRef.current) fillRef.current.style.height = `${fillPct}%`;

      rafId = requestAnimationFrame(tick);
    };

    const onScroll = () => {
      const section = sectionRef.current;
      if (!section) return;

      const rect     = section.getBoundingClientRect();
      const total    = section.offsetHeight - window.innerHeight;
      const scrolled = -rect.top;
      const raw = Math.max(0, Math.min(1, scrolled / Math.max(total, 1)));

      targetPct = 8 + raw * 87;

      let active = -1;
      itemDomRefs.current.forEach((el, i) => {
        if (el && el.getBoundingClientRect().top < window.innerHeight * 0.55) active = i;
      });

      if (active >= 0) setActiveIdx(prev => active > prev ? active : prev);
    };

    rafId = requestAnimationFrame(tick);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600&family=Lato:wght@300;400;700&display=swap');

        :root {
          --bl-bg:    #F8F0E5;
          --bl-heading: #412c17;
          --bl-body:  #776251;
          --bl-accent: #C2A170;
          --bl-border: #DBD3CB;
          --bl-muted: #F1ECE7;
        }

        .bl-section {
          background: var(--bl-bg);
          position: relative;
          width: 100%;
          overflow-x: hidden;
          box-sizing: border-box;
        }

        .bl-line-col {
          position: absolute; top: 0; bottom: 0;
          left: 50%; transform: translateX(-50%);
          width: 60px; z-index: 30; pointer-events: none;
        }
        .bl-track {
          position: absolute; top: 0; bottom: 0;
          left: 50%; transform: translateX(-50%);
          width: 1px; background: var(--bl-border);
        }
        .bl-fill {
          position: absolute; top: 0;
          left: 50%; transform: translateX(-50%);
          width: 2px; border-radius: 2px;
          transition: height 0.06s linear;
          /* No "transparent" keyword — explicit rgba to avoid Safari black bleed */
          background: linear-gradient(to bottom,
            rgba(194,161,112,0), #C2A170 6%, #C2A170 55%, #C2A170 75%, rgba(194,161,112,0));
          box-shadow: 0 0 6px rgba(194,161,112,0.5), 0 0 18px rgba(194,161,112,0.2);
        }
        .bl-dot {
          position: absolute; left: 50%; transform: translateX(-50%);
          width: 14px; height: 14px; border-radius: 50%;
          background: var(--bl-accent);
          box-shadow: 0 0 0 4px rgba(194,161,112,0.2), 0 0 16px rgba(194,161,112,0.4);
          transition: top 0.12s ease; margin-top: -7px; z-index: 2;
        }
        .bl-line-top,
        .bl-line-bottom {
          position: absolute;
          left: 0; right: 0; height: 1px;
          background: var(--bl-accent);
          opacity: 0.6;
          z-index: 40;
          pointer-events: none;
        }
        .bl-line-top    { top: 0; }
        .bl-line-bottom { bottom: 0; }

        .bl-content { position: relative; z-index: 10; width: 100%; }

        .bl-item {
          min-height: 100svh;
          display: grid;
          grid-template-columns: 1fr 60px 1fr;
          position: relative;
          width: 100%;
          box-sizing: border-box;
        }
        .bl-item + .bl-item { border-top: 1px solid var(--bl-border); }

        /*
         * SAFARI FIX: No isolation, no will-change, no translate3d on this element.
         * The black-bg-behind-transparent-image bug is solved entirely in the DOM
         * by .bl-img-bg (a solid painted div, always behind the image at z-index 0).
         * No GPU compositing tricks needed here.
         */
        .bl-img-col {
          position: relative;
          overflow: hidden;
          min-height: 100svh;
          background-color: var(--bl-muted);
        }

        /*
         * SAFARI FIX — the key fix for transparent SVG/PNG on Mac Safari.
         *
         * Safari composites transparent images against the GPU tile background,
         * which defaults to black before the parent's background-color is painted.
         * By inserting this solid div at z-index 0 — below the image, above nothing —
         * we guarantee a real painted #F1ECE7 pixel exists before the compositor
         * ever processes the transparent image layer. No black can bleed through.
         *
         * This is simpler and more reliable than any CSS compositing hint.
         */
        .bl-img-bg {
          position: absolute;
          inset: 0;
          background-color: var(--bl-muted);
          z-index: 0;
        }

        .bl-img-inner {
          position: absolute;
          left: 50%; bottom: 0;
          width: auto; height: 95%;
          display: block;
          z-index: 1;
          /*
           * SAFARI FIX: translateZ(0) promotes the img to its own compositing
           * layer, stacked above .bl-img-bg. The transparent pixels now composite
           * against the already-painted .bl-img-bg colour, not black void.
           * We fold it into the existing transform to avoid double transforms.
           */
          -webkit-transform: translateX(-50%) translateZ(0);
          transform: translateX(-50%) translateZ(0);
          -webkit-backface-visibility: hidden;
          backface-visibility: hidden;
        }

        .bl-img-curtain {
          position: absolute;
          inset: 0;
          background-color: var(--bl-muted);
          z-index: 2;
          /*
           * SAFARI FIX: No will-change, no translate3d.
           * Premature GPU layer promotion via will-change caused tile seams
           * and the original brown smear. Safari promotes automatically when
           * the transition fires — let it do so naturally.
           * backface-visibility: hidden is a safe compositing hint without
           * triggering the tearing bug.
           */
          -webkit-backface-visibility: hidden;
          backface-visibility: hidden;
          transform: translateX(0%);
          transition: transform 1.8s cubic-bezier(0.77,0,0.18,1);
        }

        .bl-item.visible .bl-img-curtain {
          transform: translateX(100%);
        }

        /*
         * SAFARI FIX: No "transparent" in any gradient.
         * "transparent" = rgba(0,0,0,0) in Safari → interpolates through black.
         * All occurrences replaced with rgba(120,85,55,0) or rgba(248,240,229,0)
         * so the interpolation stays in the correct colour family.
         */
        .bl-img-col::before {
          content: '';
          position: absolute; inset: 0; z-index: 3; pointer-events: none;
          background-image:
            repeating-linear-gradient(
              0deg,
              rgba(120,85,55,0),
              rgba(120,85,55,0) 2px,
              rgba(120,85,55,0.05) 2px,
              rgba(120,85,55,0.05) 3px
            ),
            repeating-linear-gradient(
              90deg,
              rgba(120,85,55,0),
              rgba(120,85,55,0) 4px,
              rgba(120,85,55,0.04) 4px,
              rgba(120,85,55,0.04) 5px
            );
        }

        .bl-img-col::after {
          content: '';
          position: absolute; inset: 0; z-index: 4; pointer-events: none;
          /* All "transparent" replaced with rgba(248,240,229,0) = --bl-bg at opacity 0 */
          background:
            linear-gradient(
              to right,
              rgba(248,240,229,0) 38%,
              rgba(248,240,229,0.1) 70%,
              #F8F0E5 100%
            ),
            linear-gradient(
              to bottom,
              #F8F0E5 0%,
              rgba(248,240,229,0) 2%,
              rgba(248,240,229,0) 98%,
              #F8F0E5 100%
            );
        }

        .bl-right-col {
          display: flex; flex-direction: column;
          justify-content: flex-start;
          gap: 20px;
          padding: 60px 6vw 80px 36px;
          min-height: 100svh;
          background: var(--bl-bg);
          box-sizing: border-box;
          width: 100%;
        }

        .bl-heading {
          font-family: 'Playfair Display', serif;
          font-size: clamp(3.2rem, 5vw, 7rem);
          font-weight: 600;
          line-height: 0.92;
          letter-spacing: -0.01em;
          white-space: pre-line;
          text-align: left;
          color: var(--bl-heading);
          margin: 0;
          width: 100%;
          word-wrap: break-word;
          overflow-wrap: break-word;
        }

        .bl-quote {
          font-family: 'Playfair Display', serif;
          font-size: clamp(1.05rem, 4vw, 3rem);
          font-weight: 500;
          color: var(--bl-heading);
          line-height: 1.2;
          margin: 0;
          width: 100%;
          overflow-wrap: break-word;
        }

        .bl-desc {
          font-family: 'Lato', sans-serif;
          font-size: clamp(0.85rem, 3vw, 2.3rem);
          font-weight: 400;
          color: var(--bl-body);
          line-height: 1.1;
          margin: 0;
          padding-top: 16px;
          padding-bottom: 16px;
          padding-left: 15px;
          border-left: 3px solid var(--bl-accent);
          width: 100%;
          box-sizing: border-box;
        }

        @media (max-width: 900px) {
          .bl-item { grid-template-columns: 1fr 40px 1fr; }
          .bl-line-col { width: 40px; }
          .bl-heading { font-size: clamp(2.4rem, 6vw, 4.5rem); }
          .bl-right-col { padding: 60px 4vw 60px 24px; gap: 20px; }
          .bl-img-inner { height: 80%; }
        }

        @media (max-width: 600px) {
          .bl-line-col {
            display: block;
            left: 18px;
            transform: none;
            width: 20px;
            top: 0;
            bottom: 0;
          }
          .bl-track { left: 50%; transform: translateX(-50%); }
          .bl-fill  { left: 50%; transform: translateX(-50%); }
          .bl-dot   { left: 50%; transform: translateX(-50%); }

          .bl-item {
            display: flex;
            flex-direction: column;
            min-height: unset;
            position: relative;
            border-top: none !important;
            width: 100%;
          }
          .bl-item + .bl-item { border-top: none !important; }

          .bl-img-col {
            position: relative;
            width: 100%;
            aspect-ratio: 1 / 1;
            min-height: unset;
            background-color: var(--bl-muted);
          }

          /* Mobile: centre the image, keep translateZ(0) fix */
          .bl-img-inner {
            position: absolute;
            left: 50%; top: 50%;
            -webkit-transform: translate(-50%, -50%) translateZ(0);
            transform: translate(-50%, -50%) translateZ(0);
            width: auto; height: 100%;
          }

          .bl-img-col::after  { display: none; }
          .bl-img-col::before { display: block; }

          .bl-centre-spacer { display: none; }

          .bl-right-col {
            position: relative; z-index: 2;
            display: flex; flex-direction: column;
            align-items: flex-start;
            width: 100%;
            padding: 32px 20px 48px 48px;
            gap: 16px;
            box-sizing: border-box;
            background: var(--bl-bg);
            min-height: unset;
            border-top: 1px solid var(--bl-border);
          }

          .bl-item + .bl-item .bl-img-col {
            border-top: 1px solid var(--bl-border);
          }

          .bl-heading {
            font-size: clamp(2.2rem, 9vw, 3.2rem);
            line-height: 1;
            white-space: normal;
          }
          .bl-quote {
            font-size: clamp(1.1rem, 5vw, 1.6rem);
            line-height: 1.4;
          }
          .bl-desc {
            font-size: clamp(0.95rem, 4.5vw, 1.2rem);
            line-height: 1.6;
          }
        }
      `}</style>

      <section className="bl-section" ref={sectionRef}>
        <div className="bl-line-top" />
        <div className="bl-line-bottom" />
        <div className="bl-line-col">
          <div className="bl-track" />
          <div className="bl-fill" ref={fillRef} style={{ height: "0%" }} />
          <div className="bl-dot"  ref={dotRef}  style={{ top: "0%" }} />
        </div>

        <div className="bl-content">
          {SECTIONS.map((s, i) => (
            <div
              key={i}
              className={`bl-item ${i === 0 ? (firstReady ? "visible" : "") : (i <= activeIdx ? "visible" : "")}`}
              ref={(el) => {
                (itemRefs.current[i] as any).current = el;
                itemDomRefs.current[i] = el;
              }}
            >
              <div className="bl-img-col">
                {/*
                  SAFARI FIX: This solid div is the definitive fix for
                  transparent SVG/PNG appearing black on Mac Safari.

                  Safari's GPU compositor can paint transparent image pixels
                  against a black tile before the CSS background-color of the
                  parent is ready. By placing a real DOM element with a solid
                  background at z-index 0 — always rendered before the image —
                  the compositor always has a painted surface to composite
                  transparent pixels against. Black background glitch: gone.
                */}
                <div className="bl-img-bg" />

                <img className="bl-img-inner" src={s.image} alt={s.label} />
                <div className="bl-img-curtain" />
              </div>

              <div className="bl-centre-spacer" />

              <div className="bl-right-col">
                <HeadingReveal heading={s.heading} itemRef={itemRefs.current[i]} />

                <ScrollText
                  text={`"${s.quote}"`}
                  className="bl-quote"
                  itemRef={itemRefs.current[i]}
                />

                <ScrollText
                  text={s.desc}
                  className="bl-desc"
                  itemRef={itemRefs.current[i]}
                />
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}