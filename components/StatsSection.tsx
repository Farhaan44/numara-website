"use client";

import { useEffect, useRef, useState } from "react";

function useCounter(target: number, duration: number, started: boolean) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!started) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [started, target, duration]);
  return count;
}

const STATS = [
  {
    value: 15,
    suffix: "+",
    label: "Years of Excellence",
    sub: "Trust & Integrity",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#776251" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
  },
  {
    value: 120,
    suffix: "K+",
    label: "Sq. Ft. Delivered",
    sub: "Residential & Commercial",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#776251" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 21h18"/>
        <path d="M5 21V7l7-4 7 4v14"/>
        <path d="M9 21v-6h6v6"/>
      </svg>
    ),
  },
  {
    value: 500,
    suffix: "+",
    label: "Happy Clients",
    sub: "Trusted by Families",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#776251" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
  },
];

function StatCard({
  stat,
  started,
  index,
}: {
  stat: typeof STATS[0];
  started: boolean;
  index: number;
}) {
  const count = useCounter(stat.value, 2200, started);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 12;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -12;
    card.style.transform = `perspective(900px) rotateX(${y}deg) rotateY(${x}deg) translateY(-4px)`;
  };

  const handleMouseLeave = () => {
    if (cardRef.current)
      cardRef.current.style.transform = `perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0)`;
  };

  return (
    <div
      className="ss-card"
      ref={cardRef}
      style={{
        transitionDelay: `${0.15 + index * 0.12}s`,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Rotating border beam */}
      <div className="ss-beam" />

      {/* Card face */}
      <div className="ss-card-face">
        <div className="ss-icon">{stat.icon}</div>
        <p className="ss-number">
          {count}
          <span className="ss-suffix">{stat.suffix}</span>
        </p>
        <p className="ss-label">{stat.label}</p>
        <p className="ss-sub">{stat.sub}</p>
      </div>
    </div>
  );
}

export default function StatsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStarted(true); },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const section = sectionRef.current;
      const bg = bgRef.current;
      if (!section || !bg) return;
      const rect = section.getBoundingClientRect();
      const offset = (rect.top + rect.height / 2 - window.innerHeight / 2) * 0.22;
      bg.style.transform = `translateY(${offset}px)`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,700;1,400;1,500&family=Lato:wght@300;400;700&display=swap');

        :root {
          --ss-bg:       #F8F0E5;
          --ss-fg:       #412c17;
          --ss-primary:  #412c17;
          --ss-secondary:#776251;
          --ss-accent:   #C2A170;
          --ss-muted:    #F1ECE7;
          --ss-border:   #DBD3CB;
        }

        /* ── Section wrapper ── */
        .ss-section {
          position: relative;
          overflow: hidden;
          padding: 120px 6vw 100px;
          background: var(--ss-bg);
        }

        /* Thin luxury lines top and bottom */
        .ss-line-top {
          position: absolute;
          top: 10px; left: 0; right: 0;
          height: 1.5px;
          background: var(--ss-accent);
          opacity: 0.9;
          pointer-events: none;
          z-index: 2;
        }
        .ss-line-bottom {
          position: absolute;
          bottom: 0px; left: 0; right: 0;
          height: 1px;
          background: var(--ss-accent);
          opacity: 0.9;
          pointer-events: none;
          z-index: 2;
        }

        /* ── Parallax photo bg ── */
        .ss-parallax-bg {
          position: absolute;
          inset: -26% 0;
          background-image: url('/statsbg.jpg');
          background-size: cover;
          background-position: center;
          opacity: 0.8;
          will-change: transform;
          z-index: 0;
        }

        /* ── Subtle noise grain overlay ── */
        .ss-section::before {
          content: '';
          position: absolute; inset: 0; z-index: 1; pointer-events: none;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.035'/%3E%3C/svg%3E");
          background-size: 200px 200px;
          opacity: 0.4;
        }

        /* ── Inner layout ── */
        .ss-inner {
          position: relative; z-index: 2;
          max-width: 1060px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0;
        }

        /* ── Cards row ── */
        .ss-cards {
          display: flex;
          gap: 28px;
          width: 100%;
          align-items: stretch;
        }

        /* ── Individual card ── */
        .ss-card {
          flex: 1;
          border-radius: 2px;
          position: relative;
          overflow: hidden;
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.6s ease, transform 0.6s ease, box-shadow 0.3s ease;
          transform-style: preserve-3d;
          will-change: transform;
          background: var(--ss-muted);
          cursor: default;
          display: flex;
          flex-direction: column;
        }
        .ss-section.visible .ss-card { opacity: 1; transform: translateY(0); }
        .ss-card:hover {
          box-shadow: 0 20px 56px rgba(73,54,43,0.10), 0 2px 8px rgba(73,54,43,0.06);
        }

        /* Rotating conic border beam — three named keyframes, one per card */
        @keyframes ss-beam-0 {
          from { transform: translate(-50%,-50%) rotate(0deg); }
          to   { transform: translate(-50%,-50%) rotate(360deg); }
        }
        @keyframes ss-beam-1 {
          from { transform: translate(-50%,-50%) rotate(120deg); }
          to   { transform: translate(-50%,-50%) rotate(480deg); }
        }
        @keyframes ss-beam-2 {
          from { transform: translate(-50%,-50%) rotate(240deg); }
          to   { transform: translate(-50%,-50%) rotate(600deg); }
        }
        .ss-beam {
          position: absolute;
          width: 220%; height: 220%;
          top: 50%; left: 50%;
          background: conic-gradient(
            from 0deg,
            transparent 0deg,
            transparent 338deg,
            rgba(194,161,112,1) 345deg,
            rgba(194,161,112,0.8) 352deg,
            rgba(194,161,112,0.9) 356deg,
            rgba(194,161,112,1) 359deg,
            transparent 360deg
          );
          z-index: 0;
          pointer-events: none;
        }
        .ss-card:nth-child(1) .ss-beam { animation: ss-beam-0 8s linear infinite; }
        .ss-card:nth-child(2) .ss-beam { animation: ss-beam-1 8s linear infinite; }
        .ss-card:nth-child(3) .ss-beam { animation: ss-beam-2 8s linear infinite; }

        /* Card face sits above beam */
        .ss-card-face {
          position: relative; z-index: 1;
          margin: 1.5px;
          border-radius: 1px;
          background: #ffffff;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: 52px 32px 44px;
          gap: 0;
          transition: background 0.3s ease;
          flex: 1;
        }
        .ss-card:hover .ss-card-face {
          background: #e4d9cc;
        }

        /* Icon */
        .ss-icon {
          color: var(--ss-accent);
          opacity: 0.9;
          margin-bottom: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 64px; height: 60px;
          border: 2px solid var(--ss-accent);
          border-radius: 50%;
          flex-shrink: 0;
        }
        .ss-card:hover .ss-icon {
          border-color: var(--ss-secondary);
          opacity: 1;
        }

        /* Number */
        .ss-number {
          font-family: 'Playfair Display', serif;
          font-size: clamp(3rem, 4.5vw, 4.2rem);
          font-weight: 400;
          color: var(--ss-primary);
          line-height: 1;
          letter-spacing: -0.02em;
          margin: 0 0 16px;
        }
        .ss-suffix {
          font-size: 0.6em;
          font-weight: 400;
          color: var(--ss-accent);
          vertical-align: baseline;
          letter-spacing: 0;
          margin-left: 3px;
        }

        /* Label */
        .ss-label {
          font-family: 'Lato', sans-serif;
          font-size: 0.8rem;
          font-weight: 700;
          letter-spacing: 0.24em;
          text-transform: uppercase;
          color: var(--ss-fg);
          margin: 0 0 10px;
        }

        /* Sub */
        .ss-sub {
          font-family: 'Lato', sans-serif;
          font-size: 0.9rem;
          font-weight: 300;
          color: var(--ss-secondary);
          letter-spacing: 0.04em;
          margin: 0;
        }

        /* ── Dividers between cards ── */
        .ss-cards > .ss-card + .ss-card::before {
          content: '';
          position: absolute;
          left: -14px; top: 20%; bottom: 20%;
          width: 1px;
          background: var(--ss-border);
          pointer-events: none;
        }

        /* ── Bottom caption ── */
        .ss-caption {
          font-family: 'Lato', sans-serif;
          font-size: 1.7rem;
          font-weight: 500;
          font-style: normal;
          color: #412c17;
          text-align: center;
          margin-top: 52px;
          letter-spacing: 0.02em;
          opacity: 0;
          transition: opacity 0.6s ease 0.6s;
        }
        .ss-section.visible .ss-caption { opacity: 1; }

        /* ── Responsive ── */
        @media (max-width: 700px) {
          .ss-section { padding: 60px 3vw 60px; }
          .ss-cards { gap: 8px; }
          .ss-cards > .ss-card + .ss-card::before { display: none; }
          .ss-card-face { padding: 22px 10px 20px; }
          .ss-icon { width: 40px; height: 40px; margin-bottom: 6px; }
          .ss-icon svg { width: 16px; height: 16px; }
          .ss-number { font-size: 1.9rem; margin-bottom: 8px; }
          .ss-label { font-size: 0.52rem; letter-spacing: 0.12em; margin-bottom: 5px; }
          .ss-sub { font-size: 0.62rem; }
          .ss-caption { font-size: 1rem; margin-top: 28px; }
        }

        @media (max-width: 380px) {
          .ss-cards { gap: 5px; }
          .ss-card-face { padding: 18px 8px 16px; }
          .ss-number { font-size: 1.6rem; }
          .ss-label { font-size: 0.46rem; }
          .ss-icon { width: 34px; height: 34px; }
        }
      `}</style>

      <section
        className={`ss-section${started ? " visible" : ""}`}
        ref={sectionRef}
      >
        <div className="ss-parallax-bg" ref={bgRef} />
        
        <div className="ss-line-bottom" />

        <div className="ss-inner">
          <div className="ss-cards">
            {STATS.map((stat, i) => (
              <StatCard key={i} stat={stat} started={started} index={i} />
            ))}
          </div>

          <p className="ss-caption">
            Nearly two decades of refined development across Mumbai
          </p>
        </div>
      </section>
    </>
  );
}