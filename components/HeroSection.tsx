"use client";

import { useEffect, useState } from "react";

export default function HeroSection() {
  const [loaded, setLoaded] = useState(false);
  const [visible, setVisible] = useState(false);
  const [time, setTime] = useState(0);

  useEffect(() => {
    const video = document.querySelector(".h-video-wrap video") as HTMLVideoElement;
    if (!video) return;
    const updateTime = () => setTime(video.currentTime);
    video.addEventListener("timeupdate", updateTime);
    return () => video.removeEventListener("timeupdate", updateTime);
  }, [loaded]);

  // Delay the fade-in to sync with loader circle shrink at 4.2s
  // Fade duration is 1.2s, so start at 3.0s → fully visible at 4.2s
  useEffect(() => {
    if (!loaded) return;
    const timer = setTimeout(() => setVisible(true), 4200);
    return () => clearTimeout(timer);
  }, [loaded]);

  const showFirstText = time > 0.7 && time < 5.5;
  const firstTextPhase = time < 1.3 ? "enter" : time > 4.9 ? "exit" : "stable";
  const showSecondText = time >= 6.5 && time < 10.5;
  const secondTextPhase = time < 7.1 ? "enter" : time > 9.9 ? "exit" : "stable";

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Anton&display=swap');

        .h-root {
          position: relative;
          height: 100vh;
          width: 100%;
          overflow: hidden;
          background: #060402;
        }

        .h-video-wrap {
          position: absolute;
          inset: 0;
          opacity: 0;
          transition: opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .h-video-wrap.loaded {
          opacity: 1;
        }

        .h-video-wrap video {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        /* Luxury Cinematic Overlay - Refined for elegance */
        .h-video-overlay {
          position: absolute;
          inset: 0;
          z-index: 2;
          pointer-events: none;
          /* Weaker, more delicate blur */
       
          /* Deeper edge contrast, clearer center */
          background: radial-gradient(
            circle at center,
            rgba(255, 255, 255, 0.1) 0%,
            rgba(0, 0, 0, 0.3) 100%
          );
        }

        .h-text-container {
          position: absolute;
          inset: 0;
          z-index: 5;
          pointer-events: none;
          display: flex;
          align-items: center;
          width: 100%;
          padding: 0 clamp(1rem, 5vw, 8rem);
        }

        .h-overlay-text {
          font-family: 'Anton', sans-serif;
          color: #ffffff;
          display: flex;
          flex-direction: column;
          margin: 0;
        }

        .h-line-wrapper {
          overflow: hidden;
          display: block;
          position: relative;
          padding: 0.12em 0;
          margin-top: -0.1em;
        }

        .h-line-content {
          display: block;
          will-change: transform, filter, letter-spacing;
          transition:
            transform 0.9s cubic-bezier(0.2, 1, 0.2, 1),
            filter 0.8s cubic-bezier(0.2, 1, 0.2, 1),
            letter-spacing 1.2s cubic-bezier(0.1, 0.8, 0.2, 1);
        }

        .h-text-left {
          margin-right: auto;
          font-size: clamp(2.8rem, 8vw, 6.5rem);
          line-height: 0.95;
        }

        .h-text-right {
          margin-left: auto;
          font-size: clamp(2rem, 5.2vw, 4.2rem);
          line-height: 1.05;
          opacity: 0.92;
        }

        /* Reduced the text blur for a crisper, high-end feel */
        .phase-enter .h-line-content {
          transform: translateY(125%) rotateZ(2deg);
          filter: blur(4px); 
          letter-spacing: -0.03em;
        }

        .phase-stable .h-line-content {
          transform: translateY(0%) rotateZ(0deg);
          filter: blur(0px);
          letter-spacing: 0.02em;
        }

        .phase-exit .h-line-content {
          transform: translateY(-125%) rotateZ(-1deg);
          filter: blur(2px);
          letter-spacing: 0.04em;
        }

        .h-line-2 { transition-delay: 0.075s !important; }
        .h-line-3 { transition-delay: 0.15s !important; }
      `}</style>

      <section className="h-root">
        <div className={`h-video-wrap${visible ? " loaded" : ""}`}>
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            poster="/anzarelegance.png"
            onCanPlay={() => setLoaded(true)}
          >
            <source src="/anzarelegancevid2.mp4" type="video/mp4" />
          </video>
          
          <div className="h-video-overlay" />
        </div>

        <div className="h-text-container">
          {showFirstText && (
            <h1 className={`h-overlay-text h-text-left phase-${firstTextPhase}`}>
              <span className="h-line-wrapper">
                <span className="h-line-content h-line-1">Crafting</span>
              </span>
              <span className="h-line-wrapper">
                <span className="h-line-content h-line-2">Legacies</span>
              </span>
            </h1>
          )}

          {showSecondText && (
            <h1 className={`h-overlay-text h-text-right phase-${secondTextPhase}`}>
              <span className="h-line-wrapper">
                <span className="h-line-content h-line-1">One</span>
              </span>
              <span className="h-line-wrapper">
                <span className="h-line-content h-line-2">Landmark At</span>
              </span>
              <span className="h-line-wrapper">
                <span className="h-line-content h-line-3">A Time</span>
              </span>
            </h1>
          )}
        </div>
      </section>
    </>
  );
}