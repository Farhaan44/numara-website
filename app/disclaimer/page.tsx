import { SectionDivider } from "@/components/SectionDivider";

export default function LegalDisclaimer() {
  return (
    <main style={{ backgroundColor: "#F8F0E5", minHeight: "100vh" }}>
        <section style={{
            position: "relative",
            height: "85vh",
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
        }}>
            <img src="/disclaimerimg.jpg" style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            zIndex: 0,
            }} />

            {/* Vignette Overlay: Lighter in the center (0.4), darker at the edges (0.85) */}
            <div style={{
            position: "absolute",
            inset: 0,
            background: "radial-gradient(circle at center, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.9) 100%)",
            zIndex: 1,
            }} />

            <div style={{
            position: "relative",
            zIndex: 2,
            textAlign: "left",
            padding: "0 6vw",
            maxWidth: "760px",
            }}>
            <h1 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(3.2rem, 6vw, 5.7rem)",
                fontWeight: 500,
                color: "#ffffff",
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
                margin: "0 0 28px",
            }}>
            Disclaimer
            </h1>
            </div>
        </section>



        <SectionDivider/>
      <div style={{ maxWidth: "800px", margin: "0 auto", backgroundColor: "#ffffff", padding: "clamp(40px, 8vw, 80px)", borderRadius: "16px", boxShadow: "0 10px 40px rgba(65, 44, 23, 0.03)" }}>
        
        <header style={{ marginBottom: "48px", borderBottom: "1px solid #DBD3CB", paddingBottom: "24px" }}>
          <p style={{ fontFamily: "'Lato', sans-serif", color: "#c2a170", fontSize: "14px", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 700, marginBottom: "12px" }}>Numara Group</p>
          <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(32px, 5vw, 48px)", color: "#412c17", fontWeight: 600, margin: 0, lineHeight: 1.1 }}>Legal Disclaimer</h1>
          <p style={{ fontFamily: "'Lato', sans-serif", color: "#776251", marginTop: "16px", fontSize: "15px" }}>Effective Date: April 2026</p>
        </header>

        <div style={{ display: "flex", flexDirection: "column", gap: "32px", fontFamily: "'Lato', sans-serif", color: "#776251", lineHeight: 1.8, fontSize: "16px" }}>
          <section>
            <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "24px", color: "#412c17", fontWeight: 500, marginBottom: "16px" }}>1. Not an Offer to Sell</h2>
            <p>The information contained on this website is for general informational purposes only and does not constitute an offer to sell, or a solicitation of an offer to buy, any property or real estate from Numara Group. Any such offerings will be made only through formal, legally binding documents.</p>
          </section>

          <section>
            <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "24px", color: "#412c17", fontWeight: 500, marginBottom: "16px" }}>2. Architectural Representations</h2>
            <p>All computer-generated images, 3D renderings, floor plans, and architectural visualizations provided on this site are intended for illustrative purposes only. Actual built environments, dimensions, layouts, and finishes may vary from what is depicted. Numara Group reserves the right to make modifications to the design, specifications, and materials without prior notice.</p>
          </section>

          <section>
            <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "24px", color: "#412c17", fontWeight: 500, marginBottom: "16px" }}>3. Pricing & Availability</h2>
            <p>Prices, floor plans, and property availability are subject to change without notice. The details provided herein are subject to final verification and should be confirmed directly with a Numara Group sales representative prior to making any financial or legal commitments.</p>
          </section>
        </div>

      </div>
      <SectionDivider/>
    </main>
  );
}