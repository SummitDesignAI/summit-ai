"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";

const TITLE = "SUMMIT AI";

export default function MinimalHero() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const setSize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    setSize();

    type Particle = {
      x: number; y: number; speed: number;
      opacity: number; fadeDelay: number; fadeStart: number; fadingOut: boolean;
    };

    let particles: Particle[] = [];
    let raf = 0;

    const count = () => Math.floor((canvas.width * canvas.height) / 7000);

    const make = (): Particle => {
      const fadeDelay = Math.random() * 600 + 100;
      return { x: Math.random() * canvas.width, y: Math.random() * canvas.height,
        speed: Math.random() / 5 + 0.1, opacity: 0.7, fadeDelay,
        fadeStart: Date.now() + fadeDelay, fadingOut: false };
    };

    const reset = (p: Particle) => {
      p.x = Math.random() * canvas.width; p.y = Math.random() * canvas.height;
      p.speed = Math.random() / 5 + 0.1; p.opacity = 0.7;
      p.fadeDelay = Math.random() * 600 + 100;
      p.fadeStart = Date.now() + p.fadeDelay; p.fadingOut = false;
    };

    const init = () => { particles = []; for (let i = 0; i < count(); i++) particles.push(make()); };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.y -= p.speed;
        if (p.y < 0) reset(p);
        if (!p.fadingOut && Date.now() > p.fadeStart) p.fadingOut = true;
        if (p.fadingOut) { p.opacity -= 0.008; if (p.opacity <= 0) reset(p); }
        ctx.fillStyle = `rgba(180,130,255,${p.opacity})`;
        ctx.fillRect(p.x, p.y, 0.6, Math.random() * 2 + 1);
      });
      raf = requestAnimationFrame(draw);
    };

    const onResize = () => { setSize(); init(); };
    window.addEventListener("resize", onResize);
    init();
    raf = requestAnimationFrame(draw);

    return () => { window.removeEventListener("resize", onResize); cancelAnimationFrame(raf); };
  }, []);

  return (
    <section style={{ position: 'relative', width: '100%', height: '100svh', overflow: 'hidden', background: '#0a0a0a' }}>

      {/* Particle canvas */}
      <canvas ref={canvasRef} style={{
        position: 'absolute', inset: 0, width: '100%', height: '100%',
        pointerEvents: 'none', mixBlendMode: 'screen', opacity: 0.7,
      }} />

      {/* Animated grid lines */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        {/* horizontal */}
        <div className="mh-hline" style={{ top: '22%' }} />
        <div className="mh-hline" style={{ top: '50%', animationDelay: '130ms' }} />
        <div className="mh-hline" style={{ top: '78%', animationDelay: '260ms' }} />
        {/* vertical */}
        <div className="mh-vline" style={{ left: '20%', animationDelay: '390ms' }} />
        <div className="mh-vline" style={{ left: '50%', animationDelay: '510ms' }} />
        <div className="mh-vline" style={{ left: '80%', animationDelay: '630ms' }} />
      </div>

      {/* Radial backdrop so text pops */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 75% 65% at 50% 50%, rgba(0,0,0,0.55) 0%, transparent 80%)',
      }} />

      {/* Centred branding */}
      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        textAlign: 'center', padding: '0 clamp(20px,6vw,48px)',
      }}>

        <p className="mh-kicker reveal-hero">AI Tools for Businesses</p>

        <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

          {/* SUMMIT AI letters drop in */}
          <h1 className="mh-name" aria-label="SUMMIT AI">
            {TITLE.split('').map((ch, i) => (
              <span key={i} className="mh-letter"
                style={{ '--i': i, animationDelay: `${0.3 + i * 0.07}s` } as React.CSSProperties}>
                {ch === ' ' ? <span style={{ display: 'inline-block', width: '0.2em' }} /> : ch}
              </span>
            ))}
            <span className="mh-glitch mh-glitch-r" aria-hidden="true">{TITLE}</span>
            <span className="mh-glitch mh-glitch-b" aria-hidden="true">{TITLE}</span>
          </h1>

          {/* Logo */}
          <div className="reveal-hero" style={{ animationDelay: '0.8s', marginTop: '-18px' }}>
            <Image src="/sai.png" alt="Summit AI" width={700} height={700}
              style={{
                height: 'clamp(14rem, 56vw, 29rem)', width: 'auto', display: 'block',
                filter: 'drop-shadow(0 6px 20px rgba(0,0,0,0.9)) drop-shadow(0 0 40px rgba(124,58,237,0.2))',
              }}
              priority
            />
          </div>

        </div>

        <p className="mh-motto reveal-hero" style={{ animationDelay: '1.05s' }}>
          One plan · 12 tools · unlimited generations
        </p>

        <div className="reveal-hero" style={{ animationDelay: '1.2s', position: 'relative', zIndex: 2 }}>
          <Link href="/signup" className="mh-cta">
            <span>Get Started Free</span>
            <ArrowRight size={16} strokeWidth={2.5} color="#000000" />
          </Link>
        </div>

      </div>

      {/* Scroll hint */}
      <div className="mh-scroll-hint" aria-hidden="true">
        <ChevronDown size={22} color="rgba(255,255,255,0.5)" />
      </div>

      <style>{`
        .mh-hline, .mh-vline {
          position: absolute;
          background: rgba(124,58,237,0.18);
          will-change: transform, opacity;
        }
        .mh-hline {
          height: 1px; left: 0; right: 0;
          transform: scaleX(0); transform-origin: 50% 50%;
          animation: mhDrawX 900ms cubic-bezier(.22,.61,.36,1) forwards;
        }
        .mh-vline {
          width: 1px; top: 0; bottom: 0;
          transform: scaleY(0); transform-origin: 50% 0%;
          animation: mhDrawY 1000ms cubic-bezier(.22,.61,.36,1) forwards;
        }
        @keyframes mhDrawX {
          0%   { transform: scaleX(0); opacity: 0; }
          60%  { opacity: .9; }
          100% { transform: scaleX(1); opacity: .6; }
        }
        @keyframes mhDrawY {
          0%   { transform: scaleY(0); opacity: 0; }
          60%  { opacity: .9; }
          100% { transform: scaleY(1); opacity: .6; }
        }

        .mh-kicker {
          position: relative; z-index: 2;
          font-family: var(--font-bebas), 'Arial Black', sans-serif;
          font-size: clamp(0.8rem, 3.5vw, 1.1rem);
          letter-spacing: 0.26em;
          color: rgba(255,255,255,0.75);
          margin: 0 0 6px;
          text-shadow: 0 1px 12px rgba(0,0,0,0.9);
        }

        .mh-name {
          position: relative; z-index: 2;
          font-family: var(--font-bebas), 'Arial Black', sans-serif;
          font-size: clamp(3.8rem, 17vw, 11rem);
          font-weight: 400; color: #fff;
          line-height: 0.88; letter-spacing: 0.07em;
          margin: 0; display: block; text-align: center;
          animation: mhShake 6s 2s infinite;
        }
        @keyframes mhShake {
          0%,89%,97%,100% { transform: none; }
          90% { transform: translateX(-5px) skewX(-2deg); }
          91% { transform: translateX(5px)  skewX(1deg); }
          92% { transform: translateX(-4px) skewX(-1deg); }
          93% { transform: translateX(4px); }
          94% { transform: translateX(-3px) skewX(1deg); }
          95% { transform: translateX(3px); }
          96% { transform: translateX(-2px); }
        }

        .mh-letter {
          display: inline-block; opacity: 0;
          transform: translateY(-48px) scale(0.85);
          animation: mhLetterDown 0.55s cubic-bezier(0.22,1,0.36,1) forwards;
          text-shadow:
            2px 2px 0 rgba(0,0,0,1),
            0 4px 16px rgba(0,0,0,1),
            0 8px 40px rgba(0,0,0,1),
            0 0 70px rgba(200,160,255,0.5);
        }
        @keyframes mhLetterDown { to { opacity: 1; transform: translateY(0) scale(1); } }

        .mh-glitch {
          position: absolute; top: 0; left: 0; width: 100%;
          font-family: var(--font-bebas), 'Arial Black', sans-serif;
          font-size: inherit; letter-spacing: inherit;
          font-weight: 400; line-height: inherit;
          pointer-events: none; opacity: 0;
        }
        .mh-glitch-r { color: rgba(220,160,255,0.8); animation: mhGlitchR 6s 2s infinite; }
        .mh-glitch-b { color: rgba(100,40,210,0.8);  animation: mhGlitchB 6s 2s infinite; }
        @keyframes mhGlitchR {
          0%,89%,100% { opacity:0; transform:none; clip-path:none; }
          90% { opacity:1; transform:translate(-4px,0) skewX(-3deg); clip-path:polygon(0 20%,100% 20%,100% 45%,0 45%); }
          92% { opacity:0; }
          94% { opacity:1; transform:translate(4px,0) skewX(2deg); clip-path:polygon(0 60%,100% 60%,100% 80%,0 80%); }
          96%,99% { opacity:0; transform:none; }
        }
        @keyframes mhGlitchB {
          0%,89%,100% { opacity:0; transform:none; clip-path:none; }
          91% { opacity:1; transform:translate(4px,0) skewX(2deg); clip-path:polygon(0 45%,100% 45%,100% 65%,0 65%); }
          93% { opacity:0; }
          95% { opacity:1; transform:translate(-3px,0); clip-path:polygon(0 5%,100% 5%,100% 20%,0 20%); }
          97%,100% { opacity:0; transform:none; }
        }

        .mh-motto {
          position: relative; z-index: 2;
          font-family: var(--font-bebas), 'Arial Black', sans-serif;
          font-size: clamp(0.75rem, 3.2vw, 1.05rem);
          letter-spacing: 0.2em;
          color: rgba(255,255,255,0.55);
          margin: 0 0 32px;
          text-shadow: 0 1px 10px rgba(0,0,0,0.9);
        }

        .mh-cta {
          position: relative; z-index: 2;
          display: inline-flex; align-items: center; gap: 8px;
          padding: clamp(13px,3.5vw,17px) clamp(28px,7vw,40px);
          border-radius: 100px;
          background: #fff !important;
          color: #000 !important;
          font-family: var(--font-bebas), 'Arial Black', sans-serif;
          font-size: clamp(1rem, 4vw, 1.35rem);
          letter-spacing: 0.14em; font-weight: 400;
          text-decoration: none !important; white-space: nowrap;
          box-shadow: 0 0 40px rgba(124,58,237,0.3), 0 4px 20px rgba(0,0,0,0.6);
          -webkit-text-fill-color: #000;
          animation: mhCtaPulse 3s 2s ease-in-out infinite;
        }
        .mh-cta *, .mh-cta span { color: #000 !important; -webkit-text-fill-color: #000; }
        @keyframes mhCtaPulse {
          0%,100% { box-shadow: 0 0 40px rgba(124,58,237,0.3), 0 4px 20px rgba(0,0,0,0.6); }
          50%     { box-shadow: 0 0 60px rgba(124,58,237,0.55), 0 4px 28px rgba(0,0,0,0.7); }
        }

        .reveal-hero {
          position: relative; z-index: 2;
          opacity: 0;
          animation: mhReveal 0.6s cubic-bezier(0.22,1,0.36,1) forwards;
        }
        @keyframes mhReveal {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .mh-scroll-hint {
          position: absolute; bottom: clamp(18px,4vw,32px);
          left: 50%; transform: translateX(-50%); z-index: 3;
          animation: mhBounce 2s 3s ease-in-out infinite both; opacity: 0;
        }
        @keyframes mhBounce {
          0%,100% { transform: translateX(-50%) translateY(0);  opacity: 0.5; }
          50%     { transform: translateX(-50%) translateY(8px); opacity: 0.9; }
        }

        @media (max-width: 767px) {
          .mh-letter   { opacity:1 !important; transform:none !important; animation:none !important; }
          .mh-glitch   { display:none; }
          .mh-name     { animation:none !important; }
          .reveal-hero { opacity:1 !important; transform:none !important; animation:none !important; }
          .mh-scroll-hint { animation:none !important; opacity:0.5; }
          .mh-cta      { animation:none !important; }
        }
      `}</style>
    </section>
  );
}
