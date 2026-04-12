"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Lato:wght@300;400;500;700&display=swap');

        .ft-root {
          background: #F8F0E5;
          color: #412C17;
          padding: 80px 0 0;
          position: relative;
          overflow: hidden;
        }

        .ft-watermark {
          position: absolute;
          bottom: -15px;
          left: -8px;
          font-family: 'Playfair Display', serif;
          font-size: clamp(80px, 16vw, 180px);
          font-weight: 700;
          color: rgba(65,44,23,0.08);
          letter-spacing: 0.05em;
          pointer-events: none;
          user-select: none;
          white-space: nowrap;
          line-height: 1;
        }

        .ft-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 5vw;
          position: relative;
          z-index: 1;
        }

        .ft-grid {
          display: grid;
          grid-template-columns: 1.8fr 1fr 1fr 1fr;
          gap: 48px;
          padding-bottom: 60px;
          border-bottom: 1px solid rgba(65,44,23,0.12);
        }

        .ft-brand-logo {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 24px;
          text-decoration: none;
        }
        
        .ft-brand-logo-img {
          width: 60px;
          height: 60px;
          object-fit: contain;
          border: none;
          outline: none;
          box-shadow: none;
          display: block;
        }
        
        .ft-brand-name {
          font-family: 'Playfair Display', serif;
          font-size: 1.7rem;
          font-weight: 700;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #412C17;
        }
        .ft-brand-desc {
          font-family: 'Lato', sans-serif;
          font-size: 0.95rem; 
          font-weight: 500;   
          color: #776251;
          line-height: 1.8;
          font-style: italic;
          max-width: 300px;   
          margin-bottom: 32px;
        }

        .ft-socials {
          display: flex;
          gap: 14px;
        }
        
        .ft-social-link {
          width: 42px;
          height: 42px;
          border-radius: 50%;
          border: 1.5px solid rgba(65,44,23,0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          color: rgba(65,44,23,0.6);
          text-decoration: none;
          transition: border-color 0.25s ease, color 0.25s ease, background 0.25s ease;
          -webkit-tap-highlight-color: transparent;
          will-change: auto;
        }
        
        .ft-social-link svg {
          width: 18px;
          height: 18px;
          display: block;
          flex-shrink: 0;
          pointer-events: none;
        }
        
        .ft-social-link:hover {
          border-color: #C2A170;
          color: #C2A170;
          background: rgba(194,161,112,0.1);
        }

        .ft-col-title {
          font-family: 'Lato', sans-serif;
          font-size: 0.75rem; 
          font-weight: 700;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: #C2A170;
          margin-bottom: 24px;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .ft-col-title::after {
          content: '';
          flex: 1;
          height: 1px;
          background: rgba(65,44,23,0.12);
        }
        
        .ft-links {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .ft-links a {
          font-family: 'Lato', sans-serif;
          font-size: 0.95rem; 
          font-weight: 500;   
          color: #776251;
          text-decoration: none;
          transition: color 0.25s, padding-left 0.25s;
          display: inline-block;
          letter-spacing: 0.02em;
        }
        .ft-links a:hover {
          color: #412C17;
          padding-left: 6px;
        }

        .ft-contact-item {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          margin-bottom: 18px;
        }
        
        .ft-contact-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          flex: 0 0 18px;
          width: 18px;
          height: 18px;
          margin-top: 4px;
          color: #C2A170;
        }
        
        .ft-contact-icon svg {
          width: 100%;
          height: 100%;
          display: block;
          pointer-events: none;
        }
        
        .ft-contact-text {
          font-family: 'Lato', sans-serif;
          font-size: 0.95rem; 
          font-weight: 500;   
          color: #776251;
          line-height: 1.6;
          font-style: italic;
        }
        .ft-contact-text a {
          color: #776251;
          text-decoration: none;
          transition: color 0.25s;
        }
        .ft-contact-text a:hover { color: #412C17; }

        .ft-bottom {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 26px 0;
          gap: 16px;
          flex-wrap: wrap;
          border-top: 1px solid rgba(65,44,23,0.1);
        }
        .ft-copyright {
          font-family: 'Lato', sans-serif;
          font-size: 0.85rem; 
          font-weight: 500;   
          color: rgba(65,44,23,0.5);
          letter-spacing: 0.05em;
        }
        .ft-legal-links {
          display: flex;
          gap: 28px;
        }
        .ft-legal-links a {
          font-family: 'Lato', sans-serif;
          font-size: 0.85rem; 
          font-weight: 500;   
          color: rgba(65,44,23,0.5);
          text-decoration: none;
          letter-spacing: 0.05em;
          transition: color 0.25s;
        }
        .ft-legal-links a:hover { color: #412C17; }

        @media (max-width: 960px) {
          .ft-grid { grid-template-columns: 1fr 1fr; gap: 40px; }
        }
        @media (max-width: 560px) {
          .ft-root { padding: 60px 0 0; }
          .ft-grid { grid-template-columns: 1fr; gap: 40px; padding-bottom: 40px; }
          .ft-bottom { flex-direction: column; align-items: flex-start; gap: 16px; }
          .ft-legal-links { flex-wrap: wrap; gap: 16px; }
        }
      `}</style>

      <footer className="ft-root">
        <div className="ft-watermark" aria-hidden="true">NUMARA</div>

        <div className="ft-inner">
          <div className="ft-grid">

            {/* ── Brand ── */}
            <div>
              <Link href="/" className="ft-brand-logo">
                <img src="/numarabrown.svg" alt="Numara Logo" className="ft-brand-logo-img" />
                <span className="ft-brand-name">Numara</span>
              </Link>
              <p className="ft-brand-desc">
                Building spaces of enduring beauty and purpose — where architecture meets community and design meets life.
              </p>
              <div className="ft-socials">
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="ft-social-link" aria-label="Instagram">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                    <circle cx="12" cy="12" r="4"/>
                    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/>
                  </svg>
                </a>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="ft-social-link" aria-label="Facebook">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                  </svg>
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="ft-social-link" aria-label="LinkedIn">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                    <rect x="2" y="9" width="4" height="12"/>
                    <circle cx="4" cy="4" r="2"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* ── Pages ── */}
            <div>
              <p className="ft-col-title">Pages</p>
              <ul className="ft-links">
                <li><Link href="/">Home</Link></li>
                <li><Link href="/about">About Us</Link></li>
                <li><Link href="/projects">Projects</Link></li>
                <li><Link href="/partner">Partner With Us</Link></li>
                <li><Link href="/contact">Contact</Link></li>
              </ul>
            </div>

            {/* ── Legal ── */}
            <div>
              <p className="ft-col-title">Legal</p>
              <ul className="ft-links">
                <li><Link href="/privacy">Privacy Policy</Link></li>
                <li><Link href="/terms">Terms of Service</Link></li>
                <li><Link href="/disclaimer">Disclaimer</Link></li>
              </ul>
            </div>

            {/* ── Contact Us ── */}
            <div>
              <p className="ft-col-title">Contact Us</p>
              <div className="ft-contact-item">
                <div className="ft-contact-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                </div>
                <p className="ft-contact-text">1st Floor, Anzar Elegance, Madhavrao Gangan Street,<br />Agripada, Mumbai-400011</p>
              </div>
              <div className="ft-contact-item">
                <div className="ft-contact-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.41 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.89a16 16 0 0 0 6 6l.94-.94a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
                  </svg>
                </div>
                <p className="ft-contact-text"><a href="tel:+917900084786">+91 7900084786</a></p>
              </div>
              <div className="ft-contact-item">
                <div className="ft-contact-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                </div>
                <p className="ft-contact-text"><a href="mailto:contact@numaragroup.com">contact@numaragroup.com</a></p>
              </div>
            </div>

          </div>

          <div className="ft-bottom">
            <p className="ft-copyright">© {new Date().getFullYear()} Numara Group. All rights reserved.</p>
            <div className="ft-legal-links">
              <Link href="/privacy">Privacy Policy</Link>
              <Link href="/terms">Terms of Service</Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}