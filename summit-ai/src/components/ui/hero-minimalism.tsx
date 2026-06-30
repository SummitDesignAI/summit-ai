"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

export default function MinimalHero() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const setSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setSize();

    type Particle = {
      x: number;
      y: number;
      speed: number;
      opacity: number;
      fadeDelay: number;
      fadeStart: number;
      fadingOut: boolean;
    };

    let particles: Particle[] = [];
    let raf = 0;

    const count = () => Math.floor((canvas.width * canvas.height) / 5000);

    const make = (): Particle => {
      const fadeDelay = Math.random() * 600 + 100;
      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        speed: Math.random() / 3 + 0.2,
        opacity: Math.random() * 0.5 + 0.3,
        fadeDelay,
        fadeStart: Date.now() + fadeDelay,
        fadingOut: false,
      };
    };

    const reset = (p: Particle) => {
      p.x = Math.random() * canvas.width;
      p.y = canvas.height + 2;
      p.speed = Math.random() / 3 + 0.2;
      p.opacity = Math.random() * 0.5 + 0.3;
      p.fadeDelay = Math.random() * 600 + 100;
      p.fadeStart = Date.now() + p.fadeDelay;
      p.fadingOut = false;
    };

    const init = () => {
      particles = [];
      for (let i = 0; i < count(); i++) particles.push(make());
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.y -= p.speed;
        if (p.y < 0) reset(p);
        if (!p.fadingOut && Date.now() > p.fadeStart) p.fadingOut = true;
        if (p.fadingOut) {
          p.opacity -= 0.006;
          if (p.opacity <= 0) reset(p);
        }
        ctx.fillStyle = `rgba(250, 250, 250, ${p.opacity})`;
        ctx.fillRect(p.x, p.y, 1, Math.random() * 3 + 1);
      });
      raf = requestAnimationFrame(draw);
    };

    const onResize = () => { setSize(); init(); };
    window.addEventListener("resize", onResize);
    init();
    raf = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section className="mh-root">
      <style>{`
.mh-root {
  position: relative;
  width: 100%;
  height: 100svh;
  overflow: hidden;
  background: #0a0a0a;
  color: #fafafa;
  --border: #27272a;
  --muted: #a1a1aa;
}

/* canvas — no blend mode so it works on all mobile browsers */
.mh-canvas {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 2;
}

/* accent lines */
.mh-lines {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 1;
}
.mh-hline, .mh-vline {
  position: absolute;
  background: var(--border);
  opacity: 0;
}
.mh-hline {
  height: 1px; left: 0; right: 0;
  transform: scaleX(0);
  transform-origin: 50% 50%;
  animation: mhDrawX 900ms cubic-bezier(.22,.61,.36,1) forwards;
}
.mh-hline:nth-child(1){ top: 25%; animation-delay: 100ms; }
.mh-hline:nth-child(2){ top: 50%; animation-delay: 230ms; }
.mh-hline:nth-child(3){ top: 75%; animation-delay: 360ms; }
.mh-vline {
  width: 1px; top: 0; bottom: 0;
  transform: scaleY(0);
  transform-origin: 50% 0%;
  animation: mhDrawY 1000ms cubic-bezier(.22,.61,.36,1) forwards;
}
.mh-vline:nth-child(4){ left: 25%; animation-delay: 460ms; }
.mh-vline:nth-child(5){ left: 50%; animation-delay: 560ms; }
.mh-vline:nth-child(6){ left: 75%; animation-delay: 660ms; }
@keyframes mhDrawX {
  0%   { transform: scaleX(0); opacity: 0; }
  60%  { opacity: .7; }
  100% { transform: scaleX(1); opacity: .45; }
}
@keyframes mhDrawY {
  0%   { transform: scaleY(0); opacity: 0; }
  60%  { opacity: .7; }
  100% { transform: scaleY(1); opacity: .45; }
}

/* hero center — push down so it clears the site Navbar (~64px) */
.mh-hero {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  pointer-events: none;
  z-index: 5;
  padding: 80px 24px 90px;
}
.mh-kicker {
  font-size: 10px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--muted);
  margin-bottom: 14px;
  font-family: monospace;
}
.mh-logo {
  height: clamp(5.5rem, 24vw, 7.5rem);
  width: auto;
  margin-bottom: 4px;
  filter: drop-shadow(0 0 20px rgba(255,255,255,0.12));
}
.mh-title {
  font-family: var(--font-bebas), ui-sans-serif, sans-serif;
  font-size: clamp(3.2rem, 14vw, 5rem);
  font-weight: 400;
  line-height: 0.92;
  margin: 0 0 10px;
  letter-spacing: 0.05em;
}
.mh-subtitle {
  font-size: 11px;
  color: var(--muted);
  font-family: monospace;
  letter-spacing: 0.08em;
  margin-bottom: 28px;
}
.mh-cta {
  pointer-events: all;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  height: 42px;
  padding: 0 24px;
  border-radius: 100px;
  background: #fafafa;
  color: #0a0a0a;
  font-size: 13px;
  font-weight: 700;
  text-decoration: none;
  letter-spacing: 0.03em;
}

/* bottom stats strip */
.mh-footer {
  position: absolute;
  left: 0; right: 0; bottom: 0;
  padding: 16px 24px;
  border-top: 1px solid var(--border);
  display: flex;
  align-items: center;
  justify-content: space-around;
  z-index: 10;
  background: rgba(10,10,10,0.85);
}
.mh-stat { text-align: center; }
.mh-stat-val { font-size: 15px; font-weight: 700; color: #fafafa; margin: 0; }
.mh-stat-lbl { font-family: monospace; font-size: 9px; color: var(--muted); letter-spacing: 0.12em; text-transform: uppercase; margin: 0; }
      `}</style>

      {/* Particles */}
      <canvas ref={canvasRef} className="mh-canvas" />

      {/* Accent Lines */}
      <div className="mh-lines">
        <div className="mh-hline" />
        <div className="mh-hline" />
        <div className="mh-hline" />
        <div className="mh-vline" />
        <div className="mh-vline" />
        <div className="mh-vline" />
      </div>

      {/* Hero content */}
      <main className="mh-hero">
        <div className="mh-kicker">AI Tools for Local Business</div>
        <Image src="/sai.png" alt="Summit AI" width={300} height={300} className="mh-logo" priority />
        <h1 className="mh-title">SUMMIT AI</h1>
        <p className="mh-subtitle">12 tools · one subscription · unlimited</p>
        <Link href="/signup" className="mh-cta">Get Started Free</Link>
      </main>

      {/* Bottom stats */}
      <footer className="mh-footer">
        {[['12', 'AI Tools'], ['$9.99', 'CAD/mo'], ['∞', 'Generations']].map(([val, label]) => (
          <div key={label} className="mh-stat">
            <p className="mh-stat-val">{val}</p>
            <p className="mh-stat-lbl">{label}</p>
          </div>
        ))}
      </footer>
    </section>
  );
}
