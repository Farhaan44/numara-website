import { SectionDivider } from "@/components/SectionDivider";

export default function PrivacyPolicy() {
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
            <img src="/privacyimg.jpg" style={{
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
            Privacy Policy
            </h1>
            </div>
        </section>
      <SectionDivider/>
      <div style={{ maxWidth: "800px", margin: "0 auto", backgroundColor: "#ffffff", padding: "clamp(40px, 8vw, 80px)", borderRadius: "16px", boxShadow: "0 10px 40px rgba(65, 44, 23, 0.03)" }}>
        
        <header style={{ marginBottom: "48px", borderBottom: "1px solid #DBD3CB", paddingBottom: "24px" }}>
          <p style={{ fontFamily: "'Lato', sans-serif", color: "#c2a170", fontSize: "14px", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 700, marginBottom: "12px" }}>Numara Group</p>
          <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(32px, 5vw, 48px)", color: "#412c17", fontWeight: 600, margin: 0, lineHeight: 1.1 }}>Privacy Policy</h1>
          <p style={{ fontFamily: "'Lato', sans-serif", color: "#776251", marginTop: "16px", fontSize: "15px" }}>Effective Date: April 2026</p>
        </header>

        <div style={{ display: "flex", flexDirection: "column", gap: "32px", fontFamily: "'Lato', sans-serif", color: "#776251", lineHeight: 1.8, fontSize: "16px" }}>
          <section>
            <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "24px", color: "#412c17", fontWeight: 500, marginBottom: "16px" }}>1. Information We Collect</h2>
            <p>At Numara Group, we respect your privacy and are committed to protecting your personal data. We collect information you provide directly to us when you fill out contact forms, subscribe to our newsletters, or communicate with our concierge team. This may include your name, email address, phone number, and specific property interests.</p>
          </section>

          <section>
            <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "24px", color: "#412c17", fontWeight: 500, marginBottom: "16px" }}>2. How We Use Your Data</h2>
            <p>Your information is utilized strictly to provide a bespoke real estate experience. We use your data to:</p>
            <ul style={{ paddingLeft: "20px", marginTop: "12px", display: "flex", flexDirection: "column", gap: "8px" }}>
              <li>Respond to your inquiries and arrange private viewings.</li>
              <li>Send tailored updates regarding our luxury developments.</li>
              <li>Improve our digital platforms and service offerings.</li>
            </ul>
          </section>

          <section>
            <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "24px", color: "#412c17", fontWeight: 500, marginBottom: "16px" }}>3. Data Protection & Sharing</h2>
            <p>We do not sell, trade, or otherwise transfer your personally identifiable information to outside parties without your consent, except to trusted third parties who assist us in operating our website or servicing you, so long as those parties agree to keep this information confidential.</p>
          </section>

          <section>
            <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "24px", color: "#412c17", fontWeight: 500, marginBottom: "16px" }}>4. Contact Us</h2>
            <p>If you have any questions regarding this privacy policy or wish to request the deletion of your data, please contact our privacy compliance officer at <a href="mailto:privacy@numaragroup.com" style={{ color: "#c2a170", textDecoration: "none" }}>privacy@numaragroup.com</a>.</p>
          </section>
        </div>

      </div>

      <SectionDivider/>
    </main>
  );
}