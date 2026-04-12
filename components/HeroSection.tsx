"use client";

import { useEffect, useRef, useState } from "react";

export default function HeroSection() {
  const [scrollY, setScrollY] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  
  // 1. Create a reference for the video element
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // 2. Set the playback speed (0.5 = slow motion, 1.0 = normal, 2.0 = fast)
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.75; 
    }

    const handleScroll = () => setScrollY(window.scrollY);
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      setMousePos({ x, y });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600&family=Lato:wght@300;400;700&display=swap');

        .hero-title-main {
          font-family: 'Playfair Display', serif;
          font-size: clamp(2.8rem, 8vw, 6.5rem);
          font-weight: 500;
          color: #ffffff;
          line-height: 1.1;
          margin: 0;
          letter-spacing: -0.01em;
          text-shadow: 
            0 2px 4px rgba(0,0,0,0.5),
            0 10px 30px rgba(0,0,0,0.4);
        }

        .hero-title-sub {
          font-family: 'Playfair Display', serif;
          font-size: clamp(0.9rem, 1.8vw, 1.6rem);
          font-weight: 500;
          color: #ffffff;
          line-height: 1.2;
          margin-top: 1.2rem;
          letter-spacing: 0.4em;
          text-transform: uppercase;
          opacity: 1;
          text-shadow: 0 4px 10px rgba(0,0,0,0.9);
        }

        .clarity-mask {
          position: absolute;
          inset: 0;
          background: radial-gradient(
            circle at center, 
            rgba(0,0,0,0.3) 0%, 
            rgba(0,0,0,0) 70%
          );
          z-index: 1;
          pointer-events: none;
        }

        .hero-scroll-line {
          width: 1px;
          height: 80px;
          background: linear-gradient(to bottom, rgba(255,255,255,0), rgba(255,255,255,0.9), rgba(255,255,255,0));
          animation: scrollDown 2.5s cubic-bezier(0.15, 1, 0.3, 1) infinite;
        }

        @keyframes scrollDown {
          0% { transform: translateY(-100%); opacity: 0; }
          40% { opacity: 1; }
          100% { transform: translateY(100%); opacity: 0; }
        }

        @keyframes fadeInRise {
          from { opacity: 0; transform: translateY(15px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .animated-text-container {
          animation: fadeInRise 1.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          will-change: transform, opacity;
        }
      `}</style>

      <section
        style={{
          position: "relative",
          height: "100vh",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#060402",
        }}
      >
        {/* Background Video with Parallax */}
        <div
          style={{
            position: "absolute",
            inset: -40,
            zIndex: 0,
            transform: `translateY(${scrollY * 0.3}px)`,
            willChange: "transform",
            filter: "contrast(1.05) brightness(0.9)",
          }}
        >
          <video
            ref={videoRef} // 3. Attach the ref
            autoPlay 
            loop 
            muted 
            playsInline 
            preload="auto"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          >
            <source src="/skylinevid.mp4" type="video/mp4" />
          </video>
        </div>

        {/* 1. Subtle Center Clarity Mask */}
        <div className="clarity-mask" />

        {/* 2. Soft Edge Vignette */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 2,
            background: `
              radial-gradient(circle at center, transparent 30%, rgba(0,0,0,0.5) 100%),
              linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, transparent 15%, transparent 85%, rgba(0,0,0,0.5) 100%)
            `,
            pointerEvents: "none",
          }}
        />

        {/* 3. Floating Text */}
        <div
          className="animated-text-container"
          style={{
            position: "relative",
            zIndex: 3,
            textAlign: "center",
            padding: "0 2rem",
            transform: `translate(${mousePos.x * -10}px, ${mousePos.y * -10}px)`,
            transition: "transform 0.4s ease-out", 
          }}
        >
          <h1 className="hero-title-main">Crafting Legacies</h1>
          <h2 className="hero-title-sub">One Landmark At A Time</h2>
        </div>

        {/* 4. Minimalist Scroll Indicator */}
        <div
          style={{
            position: "absolute",
            bottom: "60px",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 3,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            opacity: Math.max(1 - scrollY / 400, 0),
            transition: "opacity 0.4s ease",
          }}
        >
          <span style={{
            fontFamily: "'Lato', sans-serif",
            fontSize: "0.6rem",
            textTransform: "uppercase",
            letterSpacing: "0.6em",
            color: "rgba(255,255,255,0.6)",
            fontWeight: 400,
            marginBottom: "20px"
          }}>
            Explore
          </span>
          <div style={{ height: "80px", overflow: "hidden", width: "1px" }}>
            <div className="hero-scroll-line" />
          </div>
        </div>
      </section>
    </>
  );
}