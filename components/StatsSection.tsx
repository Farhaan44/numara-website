"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

// ── Animated counter hook ──────────────────────────────────────────
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

// ── Icons ─────────────────────────────────────────────────────────
const YearsIcon = () => (
  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2"/>
    <line x1="16" y1="2" x2="16" y2="6"/>
    <line x1="8" y1="2" x2="8" y2="6"/>
    <line x1="3" y1="10" x2="21" y2="10"/>
    <circle cx="8" cy="16" r="1" fill="#ffffff" stroke="none"/>
    <circle cx="12" cy="16" r="1" fill="#ffffff" stroke="none"/>
    <circle cx="16" cy="16" r="1" fill="#ffffff" stroke="none"/>
  </svg>
);

const SqftIcon = () => (
  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="12" height="18" rx="1"/>
    <rect x="15" y="8" width="6" height="13" rx="1"/>
    <rect x="7" y="15" width="4" height="6" rx="0.5"/>
    <line x1="7" y1="8" x2="11" y2="8"/>
    <line x1="7" y1="11" x2="11" y2="11"/>
  </svg>
);

const ClientsIcon = () => (
  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);

// ── Stat Card ─────────────────────────────────────────────────────
function StatItem({
  icon, value, suffix, label, sub, started, delay,
}: {
  icon: React.ReactNode; value: number; suffix: string; label: string;
  sub: string; started: boolean; delay: number;
}) {
  const count = useCounter(value, 2000, started);
  return (
    <div className="stat-item" style={{ transitionDelay: `${delay}ms` }}>
      <div className="stat-icon">{icon}</div>
      <p className="stat-number">{count}{suffix}</p>
      <p className="stat-label">{label}</p>
      <p className="stat-sub">{sub}</p>
    </div>
  );
}

// ── Stats Section ─────────────────────────────────────────────────
export default function StatsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStarted(true); },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{`
        .stats-section {
          background: #FFFFFF;
          
          background-image:
            linear-gradient(to right, #e0d1c1 1px, transparent 1px),
            linear-gradient(to bottom, #e0d1c1 1px, transparent 1px);
          background-size: 40px 40px;
          padding: 80px 6vw;
          display: flex;
          align-items: center;
          gap: 0;
          position: relative;
          overflow: hidden;
        }
        
        .stats-section::after {
            content: '';
            position: absolute;
            inset: 0;
            background: radial-gradient(ellipse at center, transparent 20%, white 100%);
            pointer-events: none;
            z-index: 0;
          }
        

        /* ── Left: Quote side ── */
        .stats-left {
          flex: 0 0 40%;
          max-width: 440px;
          z-index:1;
          padding-right: 6vw;
          opacity: 0;
          transform: translateX(-20px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .stats-section.visible .stats-left {
          opacity: 1;
          transform: none;
        }

        .stats-eyebrow {
          font-family: 'Georgia', serif;
          font-size: clamp(1.7rem, 2.5vw, 2rem);
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #c8907e;
          margin-bottom: 20px;
          display: inline-block;
          border-bottom: 2.5px solid #c8907e;
          
          line-height: 1.2;
        }

        .stats-heading {
          font-family: 'Georgia', serif;
          font-size: clamp(1.3rem, 1.5rem, 1.7rem);
          font-weight: 700;
          color: #2d343c;
          line-height: 1.25;
          letter-spacing: 0.02em;
          text-transform: uppercase;
          margin: 0 0 24px;
        }

        .stats-description {
          font-family: 'Georgia', serif;
          font-size: 1.2rem;
          color: #6b7280;
          line-height: 1.8;
          margin-bottom: 32px;
          font-style: italic;
        }

        .stats-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: 'Georgia', serif;
          font-size: 1.2rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          color: #c8907e;
          text-decoration: none;
          text-transform: uppercase;
          transition: gap 0.3s ease, color 0.3s ease;
        }
        .stats-link:hover {
          gap: 14px;
          color: #a87060;
        }
        .stats-link-arrow {
          transition: transform 0.3s ease;
        }
        .stats-link:hover .stats-link-arrow {
          transform: translateX(4px);
        }

        /* ── Right: Stats cards ── */
        .stats-right {
          flex: 1;
          z-index:1;
          display: flex;
          align-items: stretch;
          gap: 20px;
          padding-left: 6vw;
        }

        /* ── Each stat card ── */
        .stat-item {
          flex: 1;
          background: linear-gradient(145deg, #b5a48a 0%, #9e8f76 40%, #8a7a62 100%);
          border-radius: 16px;
          padding: 36px 28px;
          box-shadow:
            0 2px 8px rgba(45, 52, 60, 1.5),
            0 8px 24px rgba(45, 52, 60, 0.8);
          opacity: 0;
          transform: translateY(20px);
          transition:
            opacity 0.6s ease,
            transform 0.6s ease,
            box-shadow 0.35s ease,
            background 0.35s ease;
          cursor: default;
          position: relative;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          align-items: center;   /* centre everything */
          text-align: center;
        }

        /* rose gold top accent line */
        .stat-item::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 3px;
          background: linear-gradient(to right, #c8907e, #e8c4b0);
          border-radius: 16px 16px 0 0;
          opacity: 0;
          transition: opacity 0.35s ease;
        }

        .stats-section.visible .stat-item {
          opacity: 1;
          transform: none;
        }

        .stat-item:hover {
          background: linear-gradient(145deg, #c0ae92 0%, #a89880 40%, #948270 100%);
          box-shadow:
            0 8px 32px rgba(45, 52, 60, 0.5),
            0 20px 48px rgba(200, 144, 126, 0.12);
          transform: translateY(-6px);
        }
        .stat-item:hover::before {
          opacity: 1;
        }

        /* ── Icon centred above number ── */
        .stat-icon {
          margin-bottom: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: rgba(255,255,255,0.15);
          transition: background 0.3s ease;
        }
        .stat-item:hover .stat-icon {
          background: rgba(255,255,255,0.22);
        }

        .stat-number {
          font-family: 'Georgia', serif;
          font-size: clamp(2rem, 3.5vw, 3rem);
          font-weight: 700;
          color: #ffffff;
          line-height: 1;
          letter-spacing: -0.02em;
          margin: 0 0 14px;
          transition: color 0.3s ease;
        }
        .stat-item:hover .stat-number {
          color: rgba(255,255,255,0.85);
        }

        .stat-label {
          font-family: 'Georgia', serif;
          font-size: 0.68rem;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.85);
          margin: 0 0 8px;
          line-height: 1.5;
        }

        .stat-sub {
          font-family: 'Georgia', serif;
          font-size: 0.75rem;
          color: rgba(255,255,255,0.75);
          letter-spacing: 0.04em;
          margin: 0;
          line-height: 1.5;
          font-style: italic;
        }

        /* ── Responsive ── */
        @media (max-width: 900px) {
          .stats-section {
            flex-direction: column;
            align-items: flex-start;
            padding: 60px 5vw;
            gap: 40px;
          }
          .stats-left {
            flex: none;
            width: 100%;
            max-width: 100%;
            padding-right: 0;
          }
          .stats-right {
            width: 100%;
            padding-left: 0;
          }
        }

        @media (max-width: 560px) {
          .stats-section { padding: 48px 5vw; gap: 32px; }
          .stats-right {
            flex-direction: column;
            gap: 16px;
          }
          .stat-item {
            padding: 28px 24px;
          }
        }
      `}</style>

      <section
        className={`stats-section${started ? " visible" : ""}`}
        ref={sectionRef}
      >
        {/* ── Left: Quote ── */}
        <div className="stats-left">
          <span className="stats-eyebrow">Our Legacy</span>
          <h2 className="stats-heading">
            The Evolution of<br />an Enduring<br />Partnership
          </h2>
          <p className="stats-description">
            Numara Group was founded with a single mission — to craft spaces
            that stand as landmarks of trust, quality, and lasting value
            for the communities we serve.
          </p>
          <Link href="/about" className="stats-link">
            About Us
            <svg className="stats-link-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"/>
              <polyline points="12 5 19 12 12 19"/>
            </svg>
          </Link>
        </div>

        {/* ── Right: Stat Cards ── */}
        <div className="stats-right">
          <StatItem
            icon={<YearsIcon />}
            value={15}
            suffix="+"
            label="Years of Trust & Integrity"
            sub="Founded 2008"
            started={started}
            delay={100}
          />
          <StatItem
            icon={<SqftIcon />}
            value={120}
            suffix="K+"
            label="Sq. Ft. Delivered Successfully"
            sub="Residential & Commercial"
            started={started}
            delay={220}
          />
          <StatItem
            icon={<ClientsIcon />}
            value={500}
            suffix="+"
            label="Happy Clients Across the Region"
            sub="Trusted by families"
            started={started}
            delay={340}
          />
        </div>
      </section>
    </>
  );
}