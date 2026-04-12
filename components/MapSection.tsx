"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

const LOCATIONS = [
  { id: 1, type: "project" as const, name: "Anzar Elegance", city: "Mumbai",  status: "Ongoing",   lat: 18.974137560541465, lng: 72.82568127587717 },
  { id: 2, type: "project" as const, name: "Sea Senate",     city: "Mumbai",  status: "Ongoing",   lat: 18.975508749027348, lng: 72.82732501724621 },
  { id: 3, type: "project" as const, name: "Ahmed Tower",    city: "Mumbai",  status: "Completed", lat: 18.974594757511348, lng: 72.82578540742946 },
  { id: 4, type: "office"  as const, name: "Numara Group HQ",city: "Mumbai",  status: "Office",    lat: 18.974074594378262, lng: 72.82548238872194 },
];

/* ── Line-by-line mask reveal (reversible) ── */
function MaskReveal({
  lines,
  tag = "div",
  className,
  delay = 0,
}: {
  lines: string[];
  tag?: "h2" | "div" | "p";
  className?: string;
  delay?: number;
}) {
  const lineRefs  = useRef<(HTMLDivElement | null)[]>([]);
  const innerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const delayRef  = useRef(delay);

  useEffect(() => {
    const check = () => {
      const wh = window.innerHeight;
      lineRefs.current.forEach((line, i) => {
        const inner = innerRefs.current[i];
        if (!line || !inner) return;
        const rect     = line.getBoundingClientRect();
        const revealed = rect.top < wh * 0.88;
        inner.style.transitionDelay = revealed ? `${delayRef.current + i * 0.12}s` : "0s";
        inner.style.transition      = "transform 1s cubic-bezier(0.16,1,0.3,1)";
        inner.style.transform       = revealed ? "translateY(0%)" : "translateY(110%)";
      });
    };

    let r1: number, r2: number;
    r1 = requestAnimationFrame(() => { r2 = requestAnimationFrame(check); });

    window.addEventListener("scroll", check, { passive: true });
    return () => {
      cancelAnimationFrame(r1);
      cancelAnimationFrame(r2);
      window.removeEventListener("scroll", check);
    };
  }, []);

  const Tag = tag as any;

  return (
    <Tag className={className}>
      {lines.map((line, i) => (
        <div
          key={i}
          ref={(el: HTMLDivElement | null) => { lineRefs.current[i] = el; }}
          style={{ overflow: "hidden", display: "block", lineHeight: "inherit" }}
        >
          <div
            ref={(el: HTMLDivElement | null) => { innerRefs.current[i] = el; }}
            style={{ transform: "translateY(110%)", display: "block" }}
          >
            {line}
          </div>
        </div>
      ))}
    </Tag>
  );
}

export default function MapSection() {
  const mapRef     = useRef<HTMLDivElement>(null);
  const leafletRef = useRef<any>(null);

  useEffect(() => {
    if (!document.getElementById("leaflet-css")) {
      const link = document.createElement("link");
      link.id   = "leaflet-css";
      link.rel  = "stylesheet";
      link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
      document.head.appendChild(link);
    }

    const boot = () => {
      if ((window as any).L) { initMap((window as any).L); return; }
      const script  = document.createElement("script");
      script.src    = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
      script.onload = () => initMap((window as any).L);
      document.head.appendChild(script);
    };
    boot();

    const t1 = setTimeout(() => leafletRef.current?.invalidateSize(), 200);
    const t2 = setTimeout(() => leafletRef.current?.invalidateSize(), 600);

    return () => {
      clearTimeout(t1); clearTimeout(t2);
      if (leafletRef.current) { leafletRef.current.remove(); leafletRef.current = null; }
    };
  }, []);

  useEffect(() => {
    const onResize = () => leafletRef.current?.invalidateSize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const initMap = (L: any) => {
    if (!mapRef.current || leafletRef.current) return;

    const map = L.map(mapRef.current, {
      center: [18.9745, 72.8260],
      zoom: 17,
      zoomControl: false,
      scrollWheelZoom: false,
    });

    map.on("click", () => map.scrollWheelZoom.enable());
    mapRef.current.addEventListener("mouseleave", () => map.scrollWheelZoom.disable());
    leafletRef.current = map;

    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      maxZoom: 19,
    }).addTo(map);

    L.control.zoom({ position: "bottomright" }).addTo(map);

    LOCATIONS.forEach((loc) => {
      const isProject   = loc.type === "project";
      const color       = isProject ? "#C2A170" : "#412c17";
      const borderColor = isProject ? "#d4b88a" : "#6b4a30";
      const statusColor = loc.status === "Completed" ? "#412c17" : loc.status === "Ongoing" ? "#C2A170" : "#F8F0E5";
      const statusBg    = loc.status === "Completed" ? "#f1ece7" : loc.status === "Ongoing" ? "#fdf7f0" : "#412c17";

      const svgPin = `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="42" viewBox="0 0 32 42">
        <defs><filter id="sh${loc.id}" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="0" dy="2" stdDeviation="2" flood-color="rgba(65,44,23,0.4)"/>
        </filter></defs>
        <path d="M16 2 C8.3 2 2 8.3 2 16 C2 24 16 40 16 40 C16 40 30 24 30 16 C30 8.3 23.7 2 16 2Z"
          fill="${color}" stroke="${borderColor}" stroke-width="1.5" filter="url(#sh${loc.id})"/>
        <circle cx="16" cy="16" r="5" fill="rgba(248,240,229,0.92)"/>
      </svg>`;

      const icon = L.divIcon({ html: svgPin, className: "", iconSize: [32, 42], iconAnchor: [16, 42], popupAnchor: [0, -44] });

      const directionsButton = loc.type === "office" ? `
        <a href="https://maps.app.goo.gl/R3BCs938KdcjXGSX8" target="_blank" rel="noopener noreferrer" 
           style="display:block;text-align:center;background:#c2a170;color:#ffffff;text-decoration:none;font-size:0.75rem;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;padding:10px;border-radius:4px;margin-top:14px;transition:background 0.3s ease;">
          Get Directions
        </a>
      ` : "";

      const popup = `<div style="font-family:'Lato',sans-serif;padding:4px 2px;min-width:160px;">
        <p style="font-size:0.52rem;font-weight:700;letter-spacing:0.22em;text-transform:uppercase;color:${isProject ? "#C2A170" : "#412c17"};margin:0 0 6px;">
          ${loc.type === "office" ? "Head Office" : "Project"}</p>
        <p style="font-family:'Playfair Display',serif;font-size:0.88rem;font-weight:600;color:#412c17;margin:0 0 3px;">${loc.name}</p>
        <p style="font-size:0.72rem;color:#776251;font-style:italic;margin:0 0 10px;">${loc.city}, Maharashtra</p>
        <span style="display:inline-block;font-size:0.52rem;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;padding:3px 10px;border-radius:20px;background:${statusBg};color:${statusColor};">
          ${loc.status}</span>
        ${directionsButton}
        </div>`;

      L.marker([loc.lat, loc.lng], { icon }).addTo(map)
        .bindPopup(popup, { maxWidth: 220, className: "numara-popup" });
    });
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600&family=Lato:wght@300;400;700&display=swap');

        :root {
          --ms-bg:      #F8F0E5;
          --ms-heading: #412c17;
          --ms-body:    #776251;
          --ms-accent:  #C2A170;
          --ms-border:  #DBD3CB;
          --ms-muted:   #F1ECE7;
        }

        .ms-section {
          background: var(--ms-bg);
          position: relative;
          overflow: hidden;
          padding: 90px 0;
        }

        .ms-line-top, .ms-line-bottom {
          position: absolute;
          left: 0; right: 0; height: 2px;
          background: var(--ms-accent);
          opacity: 0.9;
          z-index: 3;
          pointer-events: none;
        }
        .ms-line-top    { top: 0; }
        .ms-line-bottom { bottom: 0; }

        .ms-bg-svg {
          position: absolute;
          inset: 0; pointer-events: none; z-index: 0; opacity: 0.07;
        }
        .ms-bg-svg img {
          position: absolute; bottom: 0; right: 0;
          width: 100%; height: 100%;
          object-fit: cover; object-position: bottom right;
        }

        .ms-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 5vw;
          display: flex;
          align-items: center;
          gap: 60px;
          position: relative;
          z-index: 1;
        }

        .ms-left {
          flex: 0 0 320px;
          display: flex;
          flex-direction: column;
        }

        .ms-eyebrow {
          font-family: 'Playfair Display', serif;
          font-size: clamp(2.4rem, 5vw, 4.1rem);
          font-weight: 600;
          letter-spacing: -0.01em;
          color: var(--ms-heading);
          margin-bottom: 18px;
          line-height: 0.9;
        }

        .ms-heading {
          font-family: 'Playfair Display', serif;
          font-size: clamp(1.4rem, 3vw, 2.5rem);
          font-weight: 500;
          color: var(--ms-heading);
          line-height: 1.1;
          letter-spacing: -0.01em;
          margin: 0 0 22px;
        }

        .ms-quote {
          font-family: 'Lato', sans-serif;
          font-size: 1.2rem;
          font-weight: 500;
          color: var(--ms-body);
          line-height: 1.6;
          margin: 0 0 36px;
          padding-left: 16px;
          border-left: 2px solid var(--ms-accent);
          letter-spacing: 0.01em;
        }

        .ms-office-box {
          background: #fff;
          border-radius: 4px;
          padding: 20px 28px 20px;
          margin-bottom: 24px;
          position: relative;
          overflow: hidden;
          border: 1px solid var(--ms-border);
          box-shadow: 0 4px 20px rgba(65,44,23,0.3);
        }
        .ms-office-box::before {
          content: ''; position: absolute; top: 0; left: 0;
          width: 36px; height: 2px; background: var(--ms-accent);
        }
        .ms-office-box::after {
          content: ''; position: absolute; top: 0; left: 0;
          width: 2px; height: 36px; background: var(--ms-accent);
        }

        .ms-office-label {
          font-family: 'Lato', sans-serif;
          font-size: 0.9rem; font-weight: 700;
          letter-spacing: 0.15em; text-transform: uppercase;
          color: var(--ms-accent); margin-bottom: 8px;
          display: flex; align-items: center; gap: 7px;
        }
        .ms-office-label::before {
          content: ''; width: 7px; height: 7px;
          border-radius: 50%; background: var(--ms-accent); flex-shrink: 0;
        }

        .ms-office-name {
          font-family: 'Playfair Display', serif;
          font-size: 1.6rem; font-weight: 600;
          color: var(--ms-heading); margin: 0 0 9px;
        }

        .ms-office-addr {
          font-family: 'Lato', sans-serif;
          font-size: 1rem; font-weight: 500;
          border-left: 2px solid var(--ms-accent);
          padding-left: 16px;
          color: var(--ms-body); line-height: 1.8; margin: 0 0 20px;
        }

        .ms-contact-link {
          display: inline-flex; align-items: center; gap: 8px;
          font-family: 'Lato', sans-serif;
          font-size: 0.9rem; font-weight: 700;
          letter-spacing: 0.24em; text-transform: uppercase;
          color: var(--ms-heading); text-decoration: none;
          transition: gap 0.3s, color 0.3s;
        }
        .ms-contact-link:hover { gap: 13px; color: var(--ms-accent); }
        .ms-contact-link svg   { transition: transform 0.3s; }
        .ms-contact-link:hover svg { transform: translateX(3px); }

        .ms-legend {
          display: flex; gap: 20px; align-items: center;
        }
        .ms-legend-item {
          display: flex; align-items: center; gap: 7px;
          font-family: 'Lato', sans-serif;
          font-size: 1rem; font-weight: 500; color: var(--ms-body);
        }
        .ms-legend-dot { width: 10px; height: 10px; border-radius: 50%; flex-shrink: 0; }

        .ms-map-wrap {
          flex: 1; min-width: 0;
          border-radius: 4px; overflow: hidden;
          box-shadow: 0 8px 40px rgba(65,44,23,0.12);
          height: 500px; border: 1px solid var(--ms-border);
        }
        .ms-map-el { width: 100%; height: 100%; }

        .numara-popup .leaflet-popup-content-wrapper {
          border-radius: 4px !important;
          box-shadow: 0 8px 28px rgba(65,44,23,0.12) !important;
          padding: 4px !important;
          border: 1px solid var(--ms-border) !important;
          background: #F8F0E5 !important;
        }
        .numara-popup .leaflet-popup-content { margin: 12px 16px !important; }
        .numara-popup .leaflet-popup-tip     { background: #F8F0E5 !important; }
        .numara-popup .leaflet-popup-close-button {
          font-size: 18px !important; color: #776251 !important;
          top: 6px !important; right: 8px !important;
        }
        .numara-popup a:hover { background: #a3865a !important; } /* Added hover effect for directions button */
        
        .leaflet-control-zoom a {
          color: #412c17 !important;
          border-color: var(--ms-border) !important;
          background: #F8F0E5 !important;
        }
        .leaflet-control-zoom a:hover { background: #F1ECE7 !important; }

        @media (max-width: 960px) {
          .ms-inner { flex-direction: column; align-items: stretch; gap: 36px; }
          .ms-left  { flex: none; width: 100%; }
          .ms-office-box { max-width: 460px; }
          .ms-map-wrap {
            flex: none !important; width: 100% !important;
            height: 420px !important; min-height: 420px !important; display: block !important;
          }
          .ms-map-el {
            width: 100% !important; height: 100% !important;
            min-height: 420px !important; display: block !important;
          }
            .ms-eyebrow {font-size:2.7rem}
          .ms-heading {font-size:2rem}
        }
        @media (max-width: 560px) {
          .ms-section { padding: 60px 0; }
          .ms-office-box { max-width: 100%; }
          .ms-map-wrap { height: 320px !important; min-height: 320px !important; }
          .ms-map-el   { min-height: 320px !important; }
          .ms-eyebrow {font-size:2.5em}
          .ms-heading {font-size:1.8rem}
          .ms-quote {font-size:1.2rem}
        }
      `}</style>

      <section className="ms-section">
        <div className="ms-line-top" />
        
        <div className="ms-bg-svg" aria-hidden="true">
          <img src="/numaraspan.svg" alt="" />
        </div>

        <div className="ms-inner">
          <div className="ms-left">

            <MaskReveal
              lines={["Our Presence"]}
              tag="div"
              className="ms-eyebrow"
              delay={0}
            />

            <MaskReveal
              lines={["Where We Build", "& Belong"]}
              tag="h2"
              className="ms-heading"
              delay={0.1}
            />

            <p className="ms-quote">
              Each Numara address is chosen with intention — designed for life.
            </p>
            <div className="ms-office-box">
              <p className="ms-office-name">Numara Group HQ</p>
              <p className="ms-office-addr">
                1st Floor, Anzar Elegance, <br/> Madhavrao Gangan Street, <br />Agripada, Mumbai-400011
              </p>
              <Link href="/contact" className="ms-contact-link">
                Contact Us
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"/>
                  <polyline points="12 5 19 12 12 19"/>
                </svg>
              </Link>
            </div>
            <div className="ms-legend">
              <div className="ms-legend-item">
                <div className="ms-legend-dot" style={{ background: "#C2A170" }} />
                Projects
              </div>
              <div className="ms-legend-item">
                <div className="ms-legend-dot" style={{ background: "#412c17" }} />
                Office
              </div>
            </div>
          </div>

          <div className="ms-map-wrap">
            <div ref={mapRef} className="ms-map-el" />
          </div>
        </div>
      </section>
    </>
  );
}