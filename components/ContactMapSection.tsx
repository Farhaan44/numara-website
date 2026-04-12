"use client";

import { useEffect, useRef } from "react";

const LOCATIONS = [
  { id: 1, type: "project" as const, name: "Anzar Elegance", city: "Mumbai", status: "Ongoing",   lat: 18.974137560541465, lng: 72.82568127587717 },
  { id: 2, type: "project" as const, name: "Sea Senate",     city: "Mumbai", status: "Ongoing",   lat: 18.975508749027348, lng: 72.82732501724621 },
  { id: 3, type: "project" as const, name: "Ahmed Tower",    city: "Mumbai", status: "Completed", lat: 18.974594757511348, lng: 72.82578540742946 },
  { id: 4, type: "office"  as const, name: "Numara Group HQ",city: "Mumbai", status: "Office",    lat: 18.974074594378262, lng: 72.82548238872194 },
];

export default function ContactMapSection() {
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
    mapRef.current?.addEventListener("mouseleave", () => map.scrollWheelZoom.disable());
    leafletRef.current = map;

    // Warm-toned map tiles via OpenStreetMap
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      maxZoom: 19,
    }).addTo(map);

    L.control.zoom({ position: "bottomright" }).addTo(map);

    LOCATIONS.forEach((loc) => {
      const isProject   = loc.type === "project";
      const isOffice    = loc.type === "office";
      
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

      const icon = L.divIcon({
        html: svgPin,
        className: "",
        iconSize: [32, 42],
        iconAnchor: [16, 42],
        popupAnchor: [0, -44],
      });

      // Conditional Button Logic
      const directionsButton = isOffice ? `
        <a href="https://maps.app.goo.gl/R3BCs938KdcjXGSX8" target="_blank" rel="noopener noreferrer" 
           style="display:block;text-align:center;background:#c2a170;color:#ffffff;text-decoration:none;font-size:0.75rem;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;padding:12px;border-radius:6px;transition:background 0.3s ease;margin-top:4px;">
          Get Directions
        </a>
      ` : "";

      // Dynamic sizing based on type
      const popupMinWidth = isOffice ? "240px" : "180px";
      const titleFontSize = isOffice ? "1.25rem" : "1.05rem";
      const popupPadding = isOffice ? "10px 6px" : "6px 4px";
      const leafMaxWidth = isOffice ? 300 : 240;

      const popup = `
        <div style="font-family:'Lato',sans-serif;padding:${popupPadding};min-width:${popupMinWidth};display:flex;flex-direction:column;gap:12px;">
          <div>
            <p style="font-size:0.55rem;font-weight:700;letter-spacing:0.22em;text-transform:uppercase;color:${isProject ? "#C2A170" : "#412c17"};margin:0 0 6px;">
              ${isOffice ? "Head Office" : "Project"}
            </p>
            <p style="font-family:'Playfair Display',serif;font-size:${titleFontSize};font-weight:600;color:#412c17;margin:0 0 3px;">${loc.name}</p>
            <p style="font-size:0.75rem;color:#776251;font-style:italic;margin:0 0 10px;">${loc.city}, Maharashtra</p>
            <span style="display:inline-block;font-size:0.52rem;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;padding:4px 12px;border-radius:20px;background:${statusBg};color:${statusColor};">
              ${loc.status}
            </span>
          </div>
          ${directionsButton}
        </div>`;

      const marker = L.marker([loc.lat, loc.lng], { icon })
        .addTo(map)
        .bindPopup(popup, { maxWidth: leafMaxWidth, className: "numara-popup" });

      if (loc.type === "office") {
        marker.openPopup();
      }
    });
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400&family=Lato:wght@300;400;700&display=swap');

        :root {
          --cm-bg:      #F8F0E5;
          --cm-heading: #412c17;
          --cm-body:    #776251;
          --cm-accent:  #C2A170;
          --cm-border:  #DBD3CB;
          --cm-muted:   #F1ECE7;
        }

        .cm-section {
          width: 100%;
          position: relative;
          background: var(--cm-bg);
          padding: clamp(60px, 8vw, 120px) clamp(20px, 5vw, 80px);
          box-sizing: border-box;
        }

        .cm-map-wrap {
          position: relative;
          width: 100%;
          max-width: 1400px;
          margin: 0 auto;
          height: clamp(600px, 80vh, 900px); 
          z-index: 1;
          border-radius: 20px;
          overflow: hidden;
          border: 1px solid rgba(194, 161, 112, 0.2);
          box-shadow: 0 24px 48px rgba(65, 44, 23, 0.08);
          transform: translateZ(0);
        }

        .cm-map-el {
          width: 100%;
          height: 100%;
        }

        /* ─── Leaflet overrides ─── */
        .numara-popup .leaflet-popup-content-wrapper {
          border-radius: 12px !important;
          box-shadow: 0 16px 40px rgba(65,44,23,0.18) !important;
          border: 1px solid var(--cm-border) !important;
          background: #ffffff !important; 
          padding: 0 !important;
        }
        .numara-popup .leaflet-popup-content {
          margin: 18px !important;
        }
        .numara-popup .leaflet-popup-tip {
          background: #ffffff !important;
        }
        .numara-popup .leaflet-popup-close-button {
          font-size: 20px !important;
          color: #776251 !important;
          top: 10px !important;
          right: 12px !important;
        }
        
        .numara-popup a:hover {
          background: #a3865a !important;
        }

        .leaflet-control-zoom {
          border: 1px solid var(--cm-border) !important;
          border-radius: 8px !important;
          overflow: hidden;
          margin-right: 20px !important;
          margin-bottom: 20px !important;
          box-shadow: 0 8px 24px rgba(65, 44, 23, 0.1) !important;
        }
        .leaflet-control-zoom a {
          color: var(--cm-heading) !important;
          background: #ffffff !important;
          border-color: var(--cm-border) !important;
          font-size: 16px !important;
          line-height: 36px !important;
          width: 36px !important;
          height: 36px !important;
        }
        .leaflet-control-zoom a:hover {
          background: var(--cm-muted) !important;
          color: var(--cm-accent) !important;
        }
        .leaflet-attribution-flag { display: none !important; }
        .leaflet-control-attribution {
          font-family: 'Lato', sans-serif !important;
          font-size: 10px !important;
          background: rgba(255,255,255,0.85) !important;
          color: var(--cm-body) !important;
          padding: 4px 10px !important;
          border-top-left-radius: 8px;
        }
        .leaflet-control-attribution a {
          color: var(--cm-accent) !important;
        }

        @media (max-width: 760px) {
          .cm-section {
             padding: clamp(40px, 6vw, 60px) clamp(16px, 4vw, 24px);
          }
          .cm-map-wrap {
            height: clamp(500px, 70vh, 700px);
            border-radius: 16px;
          }
        }
      `}</style>

      <section className="cm-section">
        <div className="cm-map-wrap">
          <div ref={mapRef} className="cm-map-el" />
        </div>
      </section>
    </>
  );
}