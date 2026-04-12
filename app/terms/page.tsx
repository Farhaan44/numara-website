import { SectionDivider } from "@/components/SectionDivider";

export default function TermsOfService() {
  return (
    <main style={{ backgroundColor: "#F8F0E5", minHeight: "100vh"}}>

        <section style={{
            position: "relative",
            height: "85vh",
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
        }}>
            <img src="/termsimg.jpg" style={{
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
            Terms Of Service
            </h1>
            </div>
        </section>



        <SectionDivider/>
      <div style={{ maxWidth: "800px", margin: "0 auto", backgroundColor: "#ffffff", padding: "clamp(40px, 8vw, 80px)", borderRadius: "16px", boxShadow: "0 10px 40px rgba(65, 44, 23, 0.03)" }}>
        
        <header style={{ marginBottom: "48px", borderBottom: "1px solid #DBD3CB", paddingBottom: "24px" }}>
          <p style={{ fontFamily: "'Lato', sans-serif", color: "#c2a170", fontSize: "14px", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 700, marginBottom: "12px" }}>Numara Group</p>
          <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(32px, 5vw, 48px)", color: "#412c17", fontWeight: 600, margin: 0, lineHeight: 1.1 }}>Terms of Service</h1>
          <p style={{ fontFamily: "'Lato', sans-serif", color: "#776251", marginTop: "16px", fontSize: "15px" }}>Effective Date: April 2026</p>
        </header>

        <div style={{ display: "flex", flexDirection: "column", gap: "32px", fontFamily: "'Lato', sans-serif", color: "#776251", lineHeight: 1.8, fontSize: "16px" }}>
          <section>
            <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "24px", color: "#412c17", fontWeight: 500, marginBottom: "16px" }}>1. Acceptance of Terms</h2>
            <p>By accessing and using the Numara Group website, you accept and agree to be bound by the terms and provisions of this agreement. If you do not agree to abide by these terms, please do not use this site.</p>
          </section>

          <section>
            <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "24px", color: "#412c17", fontWeight: 500, marginBottom: "16px" }}>2. Intellectual Property</h2>
            <p>All content, including but not limited to architectural renderings, photography, logos, text, and graphics, is the exclusive property of Numara Group and is protected by international copyright laws. Unauthorized reproduction, distribution, or use of any material is strictly prohibited.</p>
          </section>

          <section>
            <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "24px", color: "#412c17", fontWeight: 500, marginBottom: "16px" }}>3. Website Usage</h2>
            <p>Our digital platform is provided to showcase our luxury real estate portfolio. You agree to use the site only for lawful purposes and in a way that does not infringe the rights of, restrict, or inhibit anyone else's use and enjoyment of the website.</p>
          </section>

          <section>
            <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "24px", color: "#412c17", fontWeight: 500, marginBottom: "16px" }}>4. Modifications to Service</h2>
            <p>Numara Group reserves the right to modify or discontinue, temporarily or permanently, the website (or any part thereof) with or without notice. We shall not be liable to you or any third party for any modification, suspension, or discontinuance of the service.</p>
          </section>
        </div>

      </div>
      <SectionDivider/>
    </main>
  );
}