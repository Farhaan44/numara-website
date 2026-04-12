"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [overDark, setOverDark] = useState(false);

  /* ── Scrolled state ── */
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* ── Detect when navbar is over a dark project image panel ──
      Strategy: on each scroll tick, check if any .project-panel's top edge
      has passed the navbar bottom (80px) and its bottom hasn't yet.       ── */
  useEffect(() => {
    const NAVBAR_H = 80;

    const check = () => {
      const panels = document.querySelectorAll<HTMLElement>(".project-panel");
      let any = false;
      panels.forEach((panel) => {
        const { top, bottom } = panel.getBoundingClientRect();
        // Panel is behind the navbar when its top is above navbar bottom
        // and its bottom hasn't scrolled past yet
        if (top < NAVBAR_H && bottom > 0) any = true;
      });
      setOverDark(any);
    };

    window.addEventListener("scroll", check, { passive: true });
    // Also run once on mount in case page loads mid-scroll
    check();
    return () => window.removeEventListener("scroll", check);
  }, []);

  /* ── Close drawer on desktop resize ── */
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1050) setMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  /* ── Lock body scroll when menu open ── */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // Three states:
  //   "light"     — scrolled, not over dark panels → frosted white
  //   "over-dark" — over dark project images → same size as light, transparent + blur, white text
  //   "dark"      — top of page, not scrolled → large transparent, white text
  // Menu open always forces "light".
  const navState = menuOpen
    ? "light"
    : overDark
    ? "over-dark"
    : scrolled
    ? "light"
    : "dark";

  // For logo src: white when dark or over-dark, brown when light
  const logoSrc = navState === "light" ? "/numarabrown.svg" : "/numarawhite.svg";

  return (
    <>
      <style>{`
        /* ── Base ── */
        .navbar {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 1000;
          padding: 0 3rem;
          transition: background 0.4s cubic-bezier(0.4,0,0.2,1),
                      box-shadow 0.4s ease,
                      backdrop-filter 0.4s ease;
        }

        /* Frosted white — scrolled, not over images */
        .navbar.light {
          background: rgba(255, 255, 255, 0.7);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          border-bottom: 1px solid rgba(119, 98, 81, 0.15);
          box-shadow: 0 4px 30px rgba(119, 98, 81, 0.08);
        }

        /* Over dark project images — same height as light, transparent + blur, white text */
        .navbar.over-dark {
          background: rgba(0, 0, 0, 0.08);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          box-shadow: none;
        }

        /* Top of page — tall, fully transparent */
        .navbar.dark {
          background: transparent;
          backdrop-filter: none;
          -webkit-backdrop-filter: none;
          box-shadow: none;
        }

        /* ── Inner ── */
        .navbar-inner {
          max-width: 1400px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          transition: height 0.4s cubic-bezier(0.4,0,0.2,1);
          gap: 1rem;
        }
        /* dark = tall hero size */
        .navbar.dark      .navbar-inner { height: 130px; }
        /* light & over-dark = same compact height */
        .navbar.light     .navbar-inner { height: 80px; }
        .navbar.over-dark .navbar-inner { height: 80px; }

        /* ── Logo ── */
        .logo {
          display: flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
          z-index: 1001;
          flex-shrink: 0;
          transition: opacity 0.3s ease;
        }
        .logo:hover { opacity: 0.7; }

        .logo-icon-wrap {
          position: relative;
          flex-shrink: 0;
          transition: width 0.4s ease, height 0.4s ease;
        }
        .navbar.dark      .logo-icon-wrap { width: 64px; height: 64px; }
        .navbar.light     .logo-icon-wrap { width: 53px; height: 53px; }
        .navbar.over-dark .logo-icon-wrap { width: 53px; height: 53px; }
        .logo-icon-wrap img {
          width: 100% !important;
          height: 100% !important;
          object-fit: contain;
        }

        .brand-name {
          font-family: 'Georgia', serif;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          transition: color 0.4s ease, font-size 0.4s ease;
          line-height: 1;
        }
        .navbar.dark      .brand-name { color: #ffffff; font-size: 1.5rem; }
        .navbar.light     .brand-name { color: #412c17; font-size: 1.4rem; }
        .navbar.over-dark .brand-name { color: #ffffff; font-size: 1.4rem; }

        /* ── Desktop Nav Links ── */
        .nav-links {
          display: flex;
          align-items: center;
          gap: 3rem;
          list-style: none;
          margin: 0; padding: 0;
          flex-shrink: 0;
        }
        .nav-links li a {
          text-decoration: none;
          font-family: 'Georgia', serif;
          letter-spacing: 0.07em;
          text-transform: uppercase;
          position: relative;
          white-space: nowrap;
          transition: color 0.35s ease;
        }
        .navbar.dark      .nav-links li a { font-size: 1.1rem; font-weight: 500; color: rgba(255,255,255,0.9); }
        .navbar.light     .nav-links li a { font-size: 1.1rem; font-weight: 500; color: #412c17; }
        .navbar.over-dark .nav-links li a { font-size: 1.1rem; font-weight: 500; color: rgba(255,255,255,0.9); }

        .nav-links li a::after {
          content: '';
          position: absolute;
          bottom: -5px; left: 0; right: 0;
          height: 1.5px;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.3s cubic-bezier(0.4,0,0.2,1), background 0.4s ease;
        }
        .navbar.dark      .nav-links li a::after { background: rgba(255,255,255,0.8); }
        .navbar.light     .nav-links li a::after { background: #412c17; }
        .navbar.over-dark .nav-links li a::after { background: rgba(255,255,255,0.8); }
        .navbar.dark      .nav-links li a:hover  { color: #ffffff; }
        .navbar.light     .nav-links li a:hover  { color: #412c17; }
        .navbar.over-dark .nav-links li a:hover  { color: #ffffff; }
        .nav-links li a:hover::after { transform: scaleX(1); }

        /* ── CTA Button ── */
        .cta-btn {
          text-decoration: none;
          font-family: 'Georgia', serif;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          border-radius: 30px;
          border: 1.5px solid;
          cursor: pointer;
          transition: all 0.35s cubic-bezier(0.4,0,0.2,1);
          white-space: nowrap;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .navbar.dark      .cta-btn { font-size: 1rem;    font-weight: 600; padding: 0.75rem 1.8rem;  color: #fff; border-color: rgba(255,255,255,0.7); background: rgba(255,255,255,0.08); }
        .navbar.light     .cta-btn { font-size: 0.85rem; font-weight: 600; padding: 0.62rem 1.5rem; color: #fff; border-color: #412c17; background: #412c17; }
        .navbar.over-dark .cta-btn { font-size: 0.85rem; font-weight: 600; padding: 0.62rem 1.5rem; color: #fff; border-color: rgba(255,255,255,0.6); background: rgba(255,255,255,0.12); }
        .navbar.dark      .cta-btn:hover { background: #fff; border-color: #fff; color: #412c17; }
        .navbar.light     .cta-btn:hover { background: #412c17; border-color: #412c17; }
        .navbar.over-dark .cta-btn:hover { background: #fff; border-color: #fff; color: #412c17; }

        .cta-phone-icon { flex-shrink: 0; transition: all 0.35s ease; }
        .navbar.dark      .cta-btn .cta-phone-icon { filter: brightness(0) invert(1); }
        .navbar.light     .cta-btn .cta-phone-icon { filter: brightness(0) invert(1); }
        .navbar.over-dark .cta-btn .cta-phone-icon { filter: brightness(0) invert(1); }
        
        /* Updated CSS Filter to exact #412c17 (Numara Brown) */
        .navbar.dark      .cta-btn:hover .cta-phone-icon,
        .navbar.over-dark .cta-btn:hover .cta-phone-icon {
          filter: brightness(0) saturate(100%) invert(16%) sepia(21%) saturate(1518%) hue-rotate(345deg) brightness(93%) contrast(92%);
        }
        
        .navbar.light .cta-btn:hover .cta-phone-icon { filter: brightness(0) invert(1); }

        /* ── Hamburger ── */
        .hamburger {
          display: none;
          flex-direction: column;
          justify-content: center;
          gap: 6px;
          width: 44px; height: 44px;
          cursor: pointer;
          background: none;
          border: none;
          padding: 6px;
          z-index: 1001;
          flex-shrink: 0;
        }
        .hamburger span {
          display: block;
          width: 100%; height: 2px;
          border-radius: 2px;
          transition: background 0.4s ease,
                      transform 0.35s cubic-bezier(0.4,0,0.2,1),
                      opacity 0.3s ease;
          transform-origin: center;
        }
        .navbar.dark      .hamburger span { background: #ffffff; }
        .navbar.light     .hamburger span { background: #412c17; }
        .navbar.over-dark .hamburger span { background: #ffffff; }
        .hamburger.open span:nth-child(1) { transform: translateY(8px) rotate(45deg); }
        .hamburger.open span:nth-child(2) { opacity: 0; transform: scaleX(0); }
        .hamburger.open span:nth-child(3) { transform: translateY(-8px) rotate(-45deg); }

        /* ── Mobile Drawer ── */
        .mobile-menu {
          display: none;
          position: fixed;
          inset: 0;
          background: rgba(248, 240, 229, 0.7);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          z-index: 999;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transform: translateY(-16px);
          pointer-events: none;
          transition: opacity 0.35s cubic-bezier(0.4,0,0.2,1),
                      transform 0.35s cubic-bezier(0.4,0,0.2,1);
          padding: 0 2rem;
        }
        .mobile-menu.open {
          opacity: 1;
          transform: translateY(0);
          pointer-events: all;
        }

        .mobile-nav-list {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 100%;
          max-width: 480px;
        }

        .mobile-nav-item {
          width: 100%;
          display: flex;
          justify-content: center;
          opacity: 0;
          transform: translateY(14px);
          transition: opacity 0.3s ease, transform 0.3s ease;
        }
        /* Adjusted timings for 4 items instead of 3 */
        .mobile-menu.open .mobile-nav-item:nth-child(1) { opacity:1; transform:none; transition-delay:0.06s; }
        .mobile-menu.open .mobile-nav-item:nth-child(2) { opacity:1; transform:none; transition-delay:0.12s; }
        .mobile-menu.open .mobile-nav-item:nth-child(3) { opacity:1; transform:none; transition-delay:0.18s; }
        .mobile-menu.open .mobile-nav-item:nth-child(4) { opacity:1; transform:none; transition-delay:0.24s; }

        .mobile-nav-item + .mobile-nav-item {
          border-top: 2px solid rgba(119, 98, 81, 47);
        }

        .mobile-menu a.mobile-nav-link {
          text-decoration: none;
          font-family: 'Georgia', serif;
          font-size: clamp(1.2rem, 4.5vw, 1.6rem);
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #412c17;
          padding: 1.4rem 0;
          width: 100%;
          text-align: center;
          position: relative;
          display: inline-block;
          transition: color 0.3s ease;
        }
        .mobile-menu a.mobile-nav-link::after {
          content: '';
          position: absolute;
          bottom: 0.8rem;
          left: 50%;
          transform: translateX(-50%) scaleX(0);
          transform-origin: center;
          width: 60%;
          height: 1.5px;
          background: #412c17;
          transition: transform 0.3s cubic-bezier(0.4,0,0.2,1);
        }
        .mobile-menu a.mobile-nav-link:hover { color: #412c17; }
        .mobile-menu a.mobile-nav-link:hover::after { transform: translateX(-50%) scaleX(1); }

        .mobile-cta-wrap {
          margin-top: 2.5rem;
          opacity: 0;
          transform: translateY(14px);
          transition: opacity 0.3s ease, transform 0.3s ease;
          transition-delay: 0.30s; /* Updated delay to account for the 4th link */
        }
        .mobile-menu.open .mobile-cta-wrap {
          opacity: 1;
          transform: none;
        }

        .mobile-cta {
          text-decoration: none;
          font-family: 'Georgia', serif;
          font-size: 1rem; font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          padding: 0.9rem 2.5rem;
          border-radius: 30px;
          border: 1.5px solid #412c17;
          background: #412c17;
          color: #ffffff;
          display: flex;
          align-items: center;
          gap: 8px;
          transition: all 0.3s ease;
        }
        .mobile-cta:hover { background: #412c17; border-color: #412c17; }
        .mobile-cta .cta-phone-icon { filter: brightness(0) invert(1); }

        /* ── Responsive ── */
        @media (max-width: 1050px) {
          .nav-links,
          .navbar .cta-btn  { display: none; }
          .hamburger         { display: flex; }
          .mobile-menu       { display: flex; }
          .navbar            { padding: 0 1.5rem; }
          .navbar.dark       .logo-icon-wrap { width: 60px; height: 60px; }
          .navbar.light      .logo-icon-wrap { width: 47px; height: 47px; }
          .navbar.over-dark  .logo-icon-wrap { width: 47px; height: 47px; }
          .navbar.dark       .brand-name { font-size: 1.3rem; }
          .navbar.light      .brand-name { font-size: 1.1rem; }
          .navbar.over-dark  .brand-name { font-size: 1.1rem; }
        }

        @media (max-width: 480px) {
          .navbar            { padding: 0 1rem; }
          .navbar.light      .navbar-inner   { height: 70px; }
          .navbar.over-dark  .navbar-inner   { height: 70px; }
          .navbar.light      .logo-icon-wrap { width: 44px; height: 44px; }
          .navbar.over-dark  .logo-icon-wrap { width: 44px; height: 44px; }
          .navbar.light      .brand-name     { font-size: 1.05rem; }
          .navbar.over-dark  .brand-name     { font-size: 1.05rem; }
          .navbar.dark       .navbar-inner   { height: 100px; }
          .navbar.dark       .logo-icon-wrap { width: 50px; height: 50px; }
          .navbar.dark       .brand-name     { font-size: 1.05rem; }
        }
      `}</style>

      {/* ── Navbar ── */}
      <nav className={`navbar ${navState}`}>
        <div className="navbar-inner">

          <Link href="/" className="logo" onClick={() => setMenuOpen(false)}>
            <div className="logo-icon-wrap">
              <Image
                src={logoSrc}
                alt="Numara icon"
                width={64}
                height={64}
                priority
              />
            </div>
            <span className="brand-name">NUMARA</span>
          </Link>

          <ul className="nav-links">
            <li><Link href="/about">About Us</Link></li>
            <li><Link href="/projects">Projects</Link></li>
            <li><Link href="/partner">Partner with Us</Link></li>
          </ul>

          <Link href="/contact" className="cta-btn">
            <Image src="/phoneicon.svg" alt="" width={35} height={35} className="cta-phone-icon" aria-hidden="true" />
            Contact Now
          </Link>

          <button
            className={`hamburger ${menuOpen ? "open" : ""}`}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span /><span /><span />
          </button>

        </div>
      </nav>

      {/* ── Mobile Drawer ── */}
      <div
        className={`mobile-menu ${menuOpen ? "open" : ""}`}
        aria-hidden={!menuOpen}
        role="dialog"
        aria-label="Navigation menu"
      >
        <div className="mobile-nav-list">
          {/* Added Home Link */}
          <div className="mobile-nav-item">
            <Link href="/" className="mobile-nav-link" onClick={() => setMenuOpen(false)}>Home</Link>
          </div>
          <div className="mobile-nav-item">
            <Link href="/about" className="mobile-nav-link" onClick={() => setMenuOpen(false)}>About Us</Link>
          </div>
          <div className="mobile-nav-item">
            <Link href="/projects" className="mobile-nav-link" onClick={() => setMenuOpen(false)}>Projects</Link>
          </div>
          <div className="mobile-nav-item">
            <Link href="/partner" className="mobile-nav-link" onClick={() => setMenuOpen(false)}>Partner with Us</Link>
          </div>
        </div>

        <div className="mobile-cta-wrap">
          <Link href="/contact" className="mobile-cta" onClick={() => setMenuOpen(false)}>
            <Image src="/phoneicon.svg" alt="" width={35} height={35} className="cta-phone-icon" aria-hidden="true" />
            Contact Now
          </Link>
        </div>
      </div>
    </>
  );
}