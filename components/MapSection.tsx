"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

const LOCATIONS = [
  { id: 1, type: "project" as const, name: "Numara Residences", city: "Mumbai",  status: "Completed", lat: 19.0760, lng: 72.8777 },
  { id: 2, type: "project" as const, name: "The Numara Plaza",  city: "Pune",    status: "Completed", lat: 18.5204, lng: 73.8567 },
  { id: 3, type: "project" as const, name: "Numara Gardens",    city: "Nashik",  status: "Ongoing",   lat: 19.9975, lng: 73.7898 },
  { id: 4, type: "office"  as const, name: "Numara Group HQ",   city: "Mumbai",  status: "Office",    lat: 18.9322, lng: 72.8264 },
];

export default function MapSection() {
  const mapRef = useRef<HTMLDivElement>(null);
  const leafletRef = useRef<any>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Dynamically load Leaflet CSS
    if (!document.getElementById("leaflet-css")) {
      const link = document.createElement("link");
      link.id = "leaflet-css";
      link.rel = "stylesheet";
      link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
      document.head.appendChild(link);
    }

    // Dynamically load Leaflet JS
    const loadLeaflet = async () => {
      if ((window as any).L) {
        initMap((window as any).L);
        return;
      }
      const script = document.createElement("script");
      script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
      script.onload = () => {
        initMap((window as any).L);
      };
      document.head.appendChild(script);
    };

    loadLeaflet();

    return () => {
      if (leafletRef.current) {
        leafletRef.current.remove();
        leafletRef.current = null;
      }
    };
  }, []);

  const initMap = (L: any) => {
    if (!mapRef.current || leafletRef.current) return;

    const map = L.map(mapRef.current, {
      center: [19.2, 73.5],
      zoom: 7,
      zoomControl: false,
      scrollWheelZoom: true,
    });

    leafletRef.current = map;

    
    L.tileLayer(
        "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
        {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
            maxZoom: 19,
        }
        ).addTo(map);

    // Custom zoom control bottom-right
    L.control.zoom({ position: "bottomright" }).addTo(map);

    // Add markers
    LOCATIONS.forEach((loc) => {
      const isProject = loc.type === "project";
      const color = isProject ? "#c8907e" : "#2d343c";
      const borderColor = isProject ? "#e8b098" : "#4a5a6a";

      // Custom SVG pin
      const svgPin = `
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="42" viewBox="0 0 32 42">
          <defs>
            <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
              <feDropShadow dx="0" dy="2" stdDeviation="2" flood-color="rgba(0,0,0,0.4)"/>
            </filter>
          </defs>
          <path d="M16 2 C8.3 2 2 8.3 2 16 C2 24 16 40 16 40 C16 40 30 24 30 16 C30 8.3 23.7 2 16 2Z"
            fill="${color}" stroke="${borderColor}" stroke-width="1.5" filter="url(#shadow)"/>
          <circle cx="16" cy="16" r="5" fill="rgba(255,255,255,0.85)"/>
        </svg>
      `;

      const icon = L.divIcon({
        html: svgPin,
        className: "",
        iconSize: [32, 42],
        iconAnchor: [16, 42],
        popupAnchor: [0, -44],
      });

      const statusClass =
        loc.status === "Completed" ? "completed"
        : loc.status === "Ongoing" ? "ongoing"
        : "office-badge";

      const statusColor =
        loc.status === "Completed" ? "#2d343c"
        : loc.status === "Ongoing" ? "#c8907e"
        : "#fff";

      const statusBg =
        loc.status === "Completed" ? "#f0ece4"
        : loc.status === "Ongoing" ? "#f5ede9"
        : "#2d343c";

      const popupHtml = `
        <div style="
          font-family: Georgia, serif;
          padding: 4px 2px;
          min-width: 160px;
        ">
          <p style="
            font-size: 0.56rem;
            font-weight: 700;
            letter-spacing: 0.22em;
            text-transform: uppercase;
            color: ${isProject ? "#c8907e" : "#2d343c"};
            margin: 0 0 6px;
          ">${loc.type === "office" ? "Head Office" : "Project"}</p>
          <p style="
            font-size: 0.88rem;
            font-weight: 700;
            color: #2d343c;
            margin: 0 0 3px;
          ">${loc.name}</p>
          <p style="
            font-size: 0.72rem;
            color: #9a9088;
            font-style: italic;
            margin: 0 0 10px;
          ">${loc.city}, Maharashtra</p>
          <span style="
            display: inline-block;
            font-size: 0.56rem;
            font-weight: 700;
            letter-spacing: 0.14em;
            text-transform: uppercase;
            padding: 3px 10px;
            border-radius: 20px;
            background: ${statusBg};
            color: ${statusColor};
          ">${loc.status}</span>
        </div>
      `;

      const marker = L.marker([loc.lat, loc.lng], { icon });
      marker.addTo(map);
      marker.bindPopup(popupHtml, {
        maxWidth: 220,
        className: "numara-popup",
      });
    });

    setReady(true);
  };

  return (
    <>
      <style>{`
        .ms-section {
          background: #f5f1eb;
          padding: 90px 0;
          position: relative;
          overflow: hidden;
        }
        .ms-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 5vw;
          display: flex;
          align-items: center;
          gap: 90px;
        }

        /* ── Left ── */
        .ms-left {
          flex: 0 0 340px;
          display: flex;
          flex-direction: column;
        }
        .ms-eyebrow {
          font-family: 'Georgia', serif;
          font-size: 1.8rem;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #c8907e;
          
          display: inline-block;
          border-bottom: 2.5px solid #c8907e;
         
          margin-bottom: 20px;
        }
        
        .ms-heading {
          font-family: 'Georgia', serif;
          font-size: clamp(1.8rem, 2.5vw, 2.4rem);
          font-weight: 700;
          color: #2d343c;
          line-height: 1.15;
          margin: 0 0 20px;
        }
        .ms-quote {
          font-family: 'Georgia', serif;
          font-size: 0.95rem;
          font-style: italic;
          color: #7a7060;
          line-height: 1.85;
          margin: 0 0 36px;
          padding-left: 16px;
          border-left: 2px solid #c8907e;
        }
        .ms-office-box {
          background: #2d343c;
          border-radius: 14px;
          padding: 24px 26px;
          margin-bottom: 20px;
        }
        .ms-office-label {
          font-family: 'Georgia', serif;
          font-size: 0.6rem;
          font-weight: 700;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: #c8907e;
          margin-bottom: 10px;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .ms-office-label::before {
          content: '';
          width: 6px; height: 6px;
          border-radius: 50%;
          background: #c8907e;
          flex-shrink: 0;
        }
        .ms-office-name {
          font-family: 'Georgia', serif;
          font-size: 1.05rem;
          font-weight: 700;
          color: #fff;
          margin: 0 0 4px;
        }
        .ms-office-addr {
          font-family: 'Georgia', serif;
          font-size: 0.78rem;
          color: rgba(255,255,255,0.45);
          font-style: italic;
          line-height: 1.6;
          margin: 0 0 18px;
        }
        .ms-contact-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: 'Georgia', serif;
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: #c8907e;
          text-decoration: none;
          transition: gap 0.3s, color 0.3s;
        }
        .ms-contact-link:hover { gap: 13px; color: #e0a890; }
        .ms-contact-link svg { transition: transform 0.3s; }
        .ms-contact-link:hover svg { transform: translateX(3px); }

        .ms-legend {
          display: flex;
          gap: 20px;
          align-items: center;
        }
        .ms-legend-item {
          display: flex;
          align-items: center;
          gap: 7px;
          font-family: 'Georgia', serif;
          font-size: 0.68rem;
          letter-spacing: 0.1em;
          color: #9a9088;
        }
        .ms-legend-dot {
          width: 10px; height: 10px;
          border-radius: 50%;
          flex-shrink: 0;
        }

        /* ── Map ── */
        .ms-map-wrap {
          flex: 1;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 8px 40px rgba(45,52,60,0.15), 0 2px 8px rgba(45,52,60,0.08);
          height: 500px;
          position: relative;
        }
        .ms-map-el {
          width: 100%;
          height: 100%;
        }

        /* Leaflet popup overrides */
        .numara-popup .leaflet-popup-content-wrapper {
          border-radius: 12px !important;
          box-shadow: 0 8px 28px rgba(45,52,60,0.18), 0 2px 6px rgba(45,52,60,0.1) !important;
          padding: 4px !important;
          border: none !important;
        }
        .numara-popup .leaflet-popup-content {
          margin: 12px 16px !important;
        }
        .numara-popup .leaflet-popup-tip {
          background: #fff !important;
        }
        .numara-popup .leaflet-popup-close-button {
          font-size: 18px !important;
          color: #9a9088 !important;
          top: 6px !important;
          right: 8px !important;
        }

        /* Leaflet zoom buttons */
        .leaflet-control-zoom a {
          font-family: Georgia, serif !important;
          color: #2d343c !important;
          border-color: rgba(45,52,60,0.15) !important;
        }
        .leaflet-control-zoom a:hover {
          background: #f5f1eb !important;
        }

        /* ── Responsive ── */
        @media (max-width: 960px) {
          .ms-inner { flex-direction: column; gap: 40px; }
          .ms-left { flex: none; width: 100%; }
          .ms-map-wrap { width: 100%; height: 420px; }
        }
        @media (max-width: 560px) {
          .ms-section { padding: 60px 0; }
          .ms-map-wrap { height: 320px; }
          .ms-heading { font-size: 1.6rem; }
        }
      `}</style>

      <section className="ms-section">
        <div className="ms-inner">

          {/* Left */}
          <div className="ms-left">
            <span className="ms-eyebrow">Our Presence</span>
            <h2 className="ms-heading">Where We Build<br />&amp; Belong</h2>
            <p className="ms-quote">
              Each Numara address is chosen with intention — places where architecture meets community and design meets life.
            </p>

            <div className="ms-office-box">
              <p className="ms-office-label">Head Office</p>
              <p className="ms-office-name">Numara Group HQ</p>
              <p className="ms-office-addr">
                123 Marine Drive, Nariman Point<br />
                Mumbai, Maharashtra 400 021
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
                <div className="ms-legend-dot" style={{ background: "#c8907e" }} />
                Projects
              </div>
              <div className="ms-legend-item">
                <div className="ms-legend-dot" style={{ background: "#2d343c" }} />
                Office
              </div>
            </div>
          </div>

          {/* Map */}
          <div className="ms-map-wrap">
            <div ref={mapRef} className="ms-map-el" />
          </div>

        </div>
      </section>
    </>
  );
}