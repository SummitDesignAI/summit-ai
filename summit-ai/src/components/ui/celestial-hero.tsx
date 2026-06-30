'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, ChevronDown } from 'lucide-react'
import { CelestialSphere } from './celestial-sphere'

const TITLE = 'SUMMIT AI'

export default function CelestialHero() {
  return (
    <section style={{ position: 'relative', width: '100%', height: '100svh', overflow: 'hidden' }}>

      {/* WebGL nebula background */}
      <CelestialSphere
        hue={270}
        speed={0.4}
        zoom={1.3}
        particleSize={4.0}
        className="absolute inset-0 w-full h-full"
      />

      {/* Dark overlay for legibility */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.15) 50%, rgba(0,0,0,0.6) 100%)',
        pointerEvents: 'none',
      }} />

      {/* Floating particles */}
      <div className="sh-particles" aria-hidden="true">
        {Array.from({ length: 20 }).map((_, i) => (
          <span key={i} className="sh-particle" style={{
            '--x': `${(i * 37 + 13) % 100}%`,
            '--d': `${(i * 1.3 + 2).toFixed(1)}s`,
            '--size': `${2 + (i % 3)}px`,
          } as React.CSSProperties} />
        ))}
      </div>

      {/* Centred content */}
      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        textAlign: 'center',
        padding: '0 clamp(20px,6vw,48px)',
        gap: 0,
      }}>

        {/* Frosted radial backdrop */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse 80% 70% at 50% 50%, rgba(0,0,0,0.38) 0%, transparent 80%)',
          backdropFilter: 'blur(2px)',
          WebkitBackdropFilter: 'blur(2px)',
          pointerEvents: 'none',
        }} />

        <p className="sh-kicker reveal-hero">AI Tools for Businesses</p>

        {/* Name + logo grouped */}
        <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

          {/* SUMMIT AI — letters drop in from above */}
          <h1 className="sh-name" aria-label="SUMMIT AI">
            {TITLE.split('').map((ch, i) => (
              <span
                key={i}
                className="sh-letter"
                style={{ '--i': i, animationDelay: `${0.3 + i * 0.07}s` } as React.CSSProperties}
              >
                {ch === ' ' ? <span style={{ display: 'inline-block', width: '0.2em' }} /> : ch}
              </span>
            ))}
            <span className="sh-glitch sh-glitch-r" aria-hidden="true">{TITLE}</span>
            <span className="sh-glitch sh-glitch-b" aria-hidden="true">{TITLE}</span>
          </h1>

          {/* Logo */}
          <div className="reveal-hero" style={{ animationDelay: '0.8s', marginTop: '-18px' }}>
            <Image
              src="/sai.png" alt="Summit AI" width={700} height={700}
              style={{
                height: 'clamp(14rem, 56vw, 29rem)', width: 'auto',
                display: 'block',
                filter: 'drop-shadow(0 6px 20px rgba(0,0,0,0.9)) drop-shadow(0 12px 40px rgba(0,0,0,0.85)) drop-shadow(0 0 24px rgba(255,255,255,0.08))',
              }}
              priority
            />
          </div>

        </div>

        <p className="sh-motto reveal-hero" style={{ animationDelay: '1.05s' }}>
          One plan · 12 tools · unlimited generations
        </p>

        <div className="reveal-hero" style={{ animationDelay: '1.2s', position: 'relative', zIndex: 2 }}>
          <Link href="/signup" className="sh-cta" style={{ color: '#000000' }}>
            <span style={{ color: '#000000', fontFamily: 'inherit', fontSize: 'inherit', letterSpacing: 'inherit' }}>Get Started Free</span>
            <ArrowRight size={16} strokeWidth={2.5} color="#000000" />
          </Link>
        </div>

      </div>

      {/* Scroll indicator */}
      <div className="sh-scroll-hint" aria-hidden="true">
        <ChevronDown size={22} color="rgba(255,255,255,0.5)" />
      </div>

      <style>{`
        .sh-kicker {
          position: relative; z-index: 2;
          font-family: var(--font-bebas), 'Arial Black', sans-serif;
          font-size: clamp(0.8rem, 3.5vw, 1.1rem);
          letter-spacing: 0.26em;
          color: rgba(255,255,255,0.82);
          margin: 0 0 6px;
          text-shadow: 0 1px 12px rgba(0,0,0,0.9);
        }

        .sh-name {
          position: relative; z-index: 2;
          font-family: var(--font-bebas), 'Arial Black', sans-serif;
          font-size: clamp(3.8rem, 17vw, 11rem);
          font-weight: 400;
          color: #ffffff;
          line-height: 0.88;
          letter-spacing: 0.07em;
          margin: 0;
          display: block;
          text-align: center;
          animation: nameShake 6s 2s infinite;
        }
        @keyframes nameShake {
          0%,89%,97%,100% { transform: none; }
          90%  { transform: translateX(-5px) skewX(-2deg); }
          91%  { transform: translateX(5px)  skewX(1deg); }
          92%  { transform: translateX(-4px) skewX(-1deg); }
          93%  { transform: translateX(4px); }
          94%  { transform: translateX(-3px) skewX(1deg); }
          95%  { transform: translateX(3px); }
          96%  { transform: translateX(-2px); }
        }

        .sh-letter {
          display: inline-block;
          opacity: 0;
          transform: translateY(-48px) scale(0.85);
          animation: letterDown 0.55s cubic-bezier(0.22,1,0.36,1) forwards;
          text-shadow:
            2px 2px 0 rgba(0,0,0,1),
            0 4px 16px rgba(0,0,0,1),
            0 8px 40px rgba(0,0,0,1),
            0 0 70px rgba(200,160,255,0.5),
            0 0 120px rgba(180,120,255,0.25);
        }
        @keyframes letterDown {
          to { opacity: 1; transform: translateY(0) scale(1); }
        }

        .sh-glitch {
          position: absolute;
          top: 0; left: 0;
          width: 100%;
          font-family: var(--font-bebas), 'Arial Black', sans-serif;
          font-size: inherit;
          letter-spacing: inherit;
          font-weight: 400;
          line-height: inherit;
          pointer-events: none;
          opacity: 0;
        }
        .sh-glitch-r {
          color: rgba(220,160,255,0.8);
          animation: glitchR 6s 2s infinite;
        }
        .sh-glitch-b {
          color: rgba(100,40,210,0.8);
          animation: glitchB 6s 2s infinite;
        }
        @keyframes glitchR {
          0%,89%,100%  { opacity: 0; transform: none; clip-path: none; }
          90%          { opacity: 1; transform: translate(-4px,0) skewX(-3deg); clip-path: polygon(0 20%,100% 20%,100% 45%,0 45%); }
          92%          { opacity: 0; }
          94%          { opacity: 1; transform: translate(4px,0) skewX(2deg);  clip-path: polygon(0 60%,100% 60%,100% 80%,0 80%); }
          96%,99%      { opacity: 0; transform: none; }
        }
        @keyframes glitchB {
          0%,89%,100%  { opacity: 0; transform: none; clip-path: none; }
          91%          { opacity: 1; transform: translate(4px,0) skewX(2deg);  clip-path: polygon(0 45%,100% 45%,100% 65%,0 65%); }
          93%          { opacity: 0; }
          95%          { opacity: 1; transform: translate(-3px,0);             clip-path: polygon(0 5%,100% 5%,100% 20%,0 20%); }
          97%,100%     { opacity: 0; transform: none; }
        }

        .sh-motto {
          position: relative; z-index: 2;
          font-family: var(--font-bebas), 'Arial Black', sans-serif;
          font-size: clamp(0.75rem, 3.2vw, 1.05rem);
          letter-spacing: 0.2em;
          color: rgba(255,255,255,0.65);
          margin: 0 0 32px;
          text-shadow: 0 1px 10px rgba(0,0,0,0.9);
        }

        .sh-cta {
          position: relative; z-index: 2;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: clamp(13px,3.5vw,17px) clamp(28px,7vw,40px);
          border-radius: 100px;
          background: #ffffff !important;
          color: #000000 !important;
          font-family: var(--font-bebas), 'Arial Black', sans-serif;
          font-size: clamp(1rem, 4vw, 1.35rem);
          letter-spacing: 0.14em;
          font-weight: 400;
          text-decoration: none !important;
          white-space: nowrap;
          box-shadow: 0 0 40px rgba(160,100,255,0.35), 0 4px 20px rgba(0,0,0,0.6);
          -webkit-text-fill-color: #000000;
          animation: ctaPulse 3s 2s ease-in-out infinite;
        }
        .sh-cta *, .sh-cta span, .sh-cta svg {
          color: #000000 !important;
          fill: #000000;
          -webkit-text-fill-color: #000000;
        }
        @keyframes ctaPulse {
          0%,100% { box-shadow: 0 0 40px rgba(160,100,255,0.35), 0 4px 20px rgba(0,0,0,0.6); }
          50%     { box-shadow: 0 0 60px rgba(160,100,255,0.6),  0 4px 28px rgba(0,0,0,0.7); }
        }

        .reveal-hero {
          position: relative; z-index: 2;
          opacity: 0;
          animation: revealFade 0.6s cubic-bezier(0.22,1,0.36,1) forwards;
        }
        @keyframes revealFade {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .sh-particles {
          position: absolute; inset: 0;
          pointer-events: none; z-index: 1;
          overflow: hidden;
        }
        .sh-particle {
          position: absolute;
          bottom: -6px;
          left: var(--x);
          width: var(--size);
          height: var(--size);
          border-radius: 50%;
          background: rgba(180,130,255,0.55);
          animation: floatUp 8s var(--d) ease-in infinite;
        }
        @keyframes floatUp {
          0%   { transform: translateY(0) scale(1);        opacity: 0; }
          10%  { opacity: 1; }
          90%  { opacity: 0.4; }
          100% { transform: translateY(-100vh) scale(0.3); opacity: 0; }
        }

        .sh-scroll-hint {
          position: absolute;
          bottom: clamp(18px,4vw,32px);
          left: 50%;
          transform: translateX(-50%);
          z-index: 3;
          animation: scrollBounce 2s 3s ease-in-out infinite both;
          opacity: 0;
        }
        @keyframes scrollBounce {
          0%,100% { transform: translateX(-50%) translateY(0);  opacity: 0.5; }
          50%     { transform: translateX(-50%) translateY(8px); opacity: 0.9; }
        }

        @media (max-width: 767px) {
          .sh-letter    { opacity: 1 !important; transform: none !important; animation: none !important; }
          .sh-glitch    { display: none; }
          .sh-name      { animation: none !important; }
          .reveal-hero  { opacity: 1 !important; transform: none !important; animation: none !important; }
          .sh-particle  { animation: none !important; opacity: 0 !important; }
          .sh-scroll-hint { animation: none !important; opacity: 0.5; }
          .sh-cta       { animation: none !important; }
        }
      `}</style>
    </section>
  )
}
