"use client";

const C = {
  bg:          "#F8F0E5",
  card:        "#FDFAF6",
  text:        "#412c17",
  textMid:     "#776251",
  accent:      "#C2A170",
  accentLight: "#b8965a",
  border:      "rgba(65,44,23,0.12)",
  hoverBg:     "#412c17",
};

// Icons rendered twice — normal (accent stroke) and hover (white stroke)
function IconBuilding({ stroke }: { stroke: string }) {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="13" height="18" rx="1" />
      <path d="M16 8h3a1 1 0 0 1 1 1v11H16" />
      <line x1="7" y1="8" x2="7" y2="8.01" />
      <line x1="11" y1="8" x2="11" y2="8.01" />
      <line x1="7" y1="12" x2="7" y2="12.01" />
      <line x1="11" y1="12" x2="11" y2="12.01" />
      <line x1="7" y1="16" x2="7" y2="16.01" />
      <line x1="11" y1="16" x2="11" y2="16.01" />
    </svg>
  );
}
function IconCompass({ stroke }: { stroke: string }) {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
    </svg>
  );
}
function IconDiamond({ stroke }: { stroke: string }) {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 3h12l4 6-10 13L2 9z" />
      <path d="M2 9h20" />
      <path d="M12 3L8 9l4 13 4-13-4-6z" />
    </svg>
  );
}
function IconHandshake({ stroke }: { stroke: string }) {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 7.65l.77.77 7.65 7.65 7.65-7.65.77-.77a5.4 5.4 0 0 0 0-7.65z" />
    </svg>
  );
}

const ITEMS = [
  {
    id: "01",
    Icon: IconBuilding,
    title: "Development",
    desc: "From concept to completion, we oversee every aspect of luxury property development with meticulous attention to detail.",
  },
  {
    id: "02",
    Icon: IconCompass,
    title: "Design",
    desc: "Our award-winning design team creates spaces that seamlessly blend timeless elegance with contemporary innovation.",
  },
  {
    id: "03",
    Icon: IconDiamond,
    title: "Curation",
    desc: "We curate exceptional finishes and amenities that elevate each residence to a work of art.",
  },
  {
    id: "04",
    Icon: IconHandshake,
    title: "Partnership",
    desc: "Strategic partnerships with investors and stakeholders who share our vision for excellence.",
  },
];

export default function MeridianStandard() {
  return (
    <section style={{ background: C.bg, padding: "6rem 2rem 7rem" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;1,400&family=Lato:wght@300;400;700&display=swap');

        .ms-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.25rem;
          max-width: 76rem;
          margin: 0 auto;
        }

        .ms-card {
          position: relative;
          padding: 2.5rem 2rem 3rem;
          border: 1.5px solid ${C.accent};
          background: ${C.card};
          transition: background 0.35s ease, border-color 0.35s ease;
          cursor: default;
          box-shadow: rgba(50, 50, 93, 0.2) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
        }
        .ms-card:hover {
          background: ${C.hoverBg};
          border-color: ${C.hoverBg};
        }

        /* Icon wrapper — swaps between normal and hover icon */
        .ms-icon-normal  { display: block; }
        .ms-icon-hover   { display: none; }
        .ms-card:hover .ms-icon-normal { display: none; }
        .ms-card:hover .ms-icon-hover  { display: block; }

        .ms-icon-wrap { margin-bottom: 2rem; }

        .ms-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(1.3rem, 1.6vw, 1.6rem);
          font-weight: 500;
          color: ${C.text};
          margin: 0 0 1rem;
          line-height: 1.2;
          transition: color 0.35s ease;
        }
        .ms-card:hover .ms-title { color: #fff; }

        .ms-desc {
          font-family: 'Lato', sans-serif;
          font-size: 1rem;
          font-weight: 500;
          color: ${C.textMid};
          line-height: 1.8;
          margin: 0;
          transition: color 0.35s ease;
        }
        .ms-card:hover .ms-desc { color: rgba(255,255,255,0.75); }

        /* ── Responsive ── */
        @media (max-width: 640px) {
          .ms-grid {
            grid-template-columns: 1fr;
          }
          .ms-card {
            padding: 2rem 1.5rem 2.5rem;
          }
        }

        @media (min-width: 641px) and (max-width: 900px) {
          .ms-grid {
            grid-template-columns: 1fr 1fr;
          }
          .ms-card {
            padding: 2.25rem 1.75rem 2.75rem;
          }
        }

        @media (min-width: 901px) and (max-width: 1100px) {
          .ms-grid {
            grid-template-columns: repeat(4, 1fr);
          }
          .ms-card {
            padding: 2rem 1.5rem 2.5rem;
          }
        }
      `}</style>

      {/* Heading */}
      <h2 style={{
        fontFamily: "'Playfair Display', serif",
        fontSize: "clamp(2.4rem, 5vw, 4rem)",
        fontWeight: 400,
        color: C.text,
        textAlign: "center",
        margin: "0 auto 4rem",
        lineHeight: 1.1,
        letterSpacing: "-0.01em",
      }}>
        The Numara Standard
      </h2>

      {/* 4-column grid */}
      <div className="ms-grid">
        {ITEMS.map(({ id, Icon, title, desc }) => (
          <div key={id} className="ms-card">

            {/* Icon — two versions, CSS swaps on hover */}
            <div className="ms-icon-wrap">
              <span className="ms-icon-normal">
                <Icon stroke={C.accentLight} />
              </span>
              <span className="ms-icon-hover">
                <Icon stroke="rgba(255,255,255,0.85)" />
              </span>
            </div>

            <h3 className="ms-title">{title}</h3>
            <p className="ms-desc">{desc}</p>

          </div>
        ))}
      </div>
    </section>
  );
}