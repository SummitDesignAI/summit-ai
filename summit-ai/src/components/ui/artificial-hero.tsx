'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function ArtificialHero() {
  return (
    <div style={{ position: 'relative', width: '100%', height: '100svh', background: '#000', overflow: 'hidden' }}>

      {/* Orb — centred */}
      <div className="orb-bg" />
      <div className="orb-bg orb-bg-2" />
      <div className="orb-core" />
      <div className="orb-ring" />
      <div className="orb-ring orb-ring-2" />
      <div className="scanlines" />

      {/* Full-screen flex layout — everything centred */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 10,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        textAlign: 'center',
        padding: 'clamp(72px,16vw,88px) 20px clamp(80px,16vw,96px)',
        gap: 0,
      }}>

        {/* Frosted backdrop behind all text so orb never bleeds through */}
        <div className="sai-backdrop" />

        <p className="sai-kicker">AI Tools for Businesses</p>

        <Image
          src="/sai.png" alt="Summit AI" width={400} height={400}
          style={{
            position: 'relative', zIndex: 2,
            height: 'clamp(7rem, 30vw, 11rem)', width: 'auto',
            filter: 'drop-shadow(0 0 18px rgba(255,255,255,0.1)) drop-shadow(0 2px 10px rgba(0,0,0,0.95))',
            marginBottom: '2px',
          }}
          priority
        />

        <h1 className="sai-name">SUMMIT AI</h1>

        <p className="sai-motto">One plan · 12 tools · unlimited</p>

        <Link href="/signup" className="sai-cta">
          Get Started Free <ArrowRight size={15} />
        </Link>

        <p className="sai-fine">No credit card required · $9.99 CAD/mo</p>
      </div>

      <style>{`
        /* Dark frosted panel behind the text block */
        .sai-backdrop {
          position: absolute;
          inset: -12px -20px;
          background: radial-gradient(ellipse 100% 100% at 50% 50%,
            rgba(0,0,0,0.55) 0%,
            rgba(0,0,0,0.35) 60%,
            transparent 100%);
          backdrop-filter: blur(6px);
          -webkit-backdrop-filter: blur(6px);
          border-radius: 24px;
          z-index: 1;
          pointer-events: none;
        }

        .sai-kicker {
          position: relative; z-index: 2;
          font-family: var(--font-bebas), 'Arial Black', sans-serif;
          font-size: clamp(0.8rem, 3.8vw, 1.1rem);
          letter-spacing: 0.24em;
          color: rgba(255,255,255,0.8);
          margin: 0 0 12px;
        }
        .sai-name {
          position: relative; z-index: 2;
          font-family: var(--font-bebas), 'Arial Black', sans-serif;
          font-size: clamp(3rem, 14vw, 8rem);
          font-weight: 400;
          color: #fff;
          line-height: 0.88;
          letter-spacing: 0.06em;
          margin: 0 0 6px;
          text-shadow: 0 2px 20px rgba(0,0,0,0.8), 0 0 50px rgba(150,210,255,0.35);
          animation: titleGlitch 8s ease-in-out infinite;
        }
        .sai-motto {
          position: relative; z-index: 2;
          font-family: var(--font-bebas), 'Arial Black', sans-serif;
          font-size: clamp(0.75rem, 3.4vw, 1rem);
          letter-spacing: 0.18em;
          color: rgba(255,255,255,0.6);
          margin: 0 0 28px;
        }
        .sai-cta {
          position: relative; z-index: 2;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: clamp(12px,3.2vw,15px) clamp(26px,7vw,36px);
          border-radius: 100px;
          background: #fff;
          color: #000;
          font-family: var(--font-bebas), 'Arial Black', sans-serif;
          font-size: clamp(1rem, 4.5vw, 1.4rem);
          letter-spacing: 0.12em;
          text-decoration: none;
          white-space: nowrap;
          box-shadow: 0 0 30px rgba(150,210,255,0.2), 0 4px 16px rgba(0,0,0,0.5);
          margin-bottom: 10px;
        }
        .sai-fine {
          position: relative; z-index: 2;
          font-family: var(--font-bebas), 'Arial Black', sans-serif;
          font-size: clamp(0.65rem, 2.8vw, 0.85rem);
          letter-spacing: 0.14em;
          color: rgba(255,255,255,0.35);
          margin: 0;
        }

        /* Orb — centred, pulled back in opacity so text wins */
        .orb-bg {
          position: absolute; inset: 0;
          background: radial-gradient(ellipse 75% 65% at 50% 50%,
            hsla(200,80%,55%,0.28) 0%,
            hsla(200,60%,35%,0.14) 45%,
            transparent 75%);
          animation: orbHueShift 6s ease-in-out infinite alternate;
        }
        .orb-bg-2 {
          position: absolute; inset: 0;
          background: radial-gradient(ellipse 50% 45% at 50% 50%,
            hsla(240,70%,60%,0.16) 0%, transparent 70%);
          animation: orbHueShift2 8s ease-in-out infinite alternate;
        }
        .orb-core {
          position: absolute; left: 50%; top: 50%;
          transform: translate(-50%,-50%);
          width: clamp(90px,26vw,180px); height: clamp(90px,26vw,180px);
          border-radius: 50%;
          background: radial-gradient(circle,
            rgba(255,255,255,0.75) 0%,
            rgba(200,230,255,0.5) 35%,
            rgba(100,180,255,0.18) 65%,
            transparent 100%);
          filter: blur(4px);
          animation: orbPulse 3s ease-in-out infinite alternate;
        }
        .orb-ring {
          position: absolute; left: 50%; top: 50%;
          transform: translate(-50%,-50%);
          width: clamp(130px,36vw,260px); height: clamp(130px,36vw,260px);
          border-radius: 50%;
          border: 1px solid rgba(150,210,255,0.25);
          animation: orbRingPulse 4s ease-in-out infinite alternate;
        }
        .orb-ring-2 {
          width: clamp(170px,48vw,340px); height: clamp(170px,48vw,340px);
          border-color: rgba(120,180,255,0.13);
          animation: orbRingPulse 5s ease-in-out infinite alternate-reverse;
          animation-delay: -2s;
        }
        .scanlines {
          position: absolute; inset: 0; z-index: 20; pointer-events: none;
          background: repeating-linear-gradient(
            0deg, transparent, transparent 2px,
            rgba(0,0,0,0.04) 2px, rgba(0,0,0,0.04) 4px);
        }

        @keyframes orbHueShift {
          0%   { filter: hue-rotate(0deg) brightness(1); }
          50%  { filter: hue-rotate(40deg) brightness(1.1); }
          100% { filter: hue-rotate(-20deg) brightness(0.88); }
        }
        @keyframes orbHueShift2 {
          0%   { filter: hue-rotate(0deg); opacity: 0.6; }
          100% { filter: hue-rotate(60deg); opacity: 1; }
        }
        @keyframes orbPulse {
          0%   { transform: translate(-50%,-50%) scale(0.88); opacity: 0.6; }
          100% { transform: translate(-50%,-50%) scale(1.1);  opacity: 0.85; }
        }
        @keyframes orbRingPulse {
          0%   { transform: translate(-50%,-50%) scale(0.93); opacity: 0.18; }
          100% { transform: translate(-50%,-50%) scale(1.08); opacity: 0.5; }
        }
        @keyframes titleGlitch {
          0%, 88%, 100% { opacity: 1; transform: none; }
          90%  { opacity: 0.82; transform: translateX(-3px) skewX(-1.5deg); }
          91%  { opacity: 1;    transform: translateX(3px); }
          92%  { opacity: 0.9;  transform: none; }
          94%  { opacity: 0.78; transform: translateX(1px) skewX(0.5deg); }
          95%  { opacity: 1;    transform: none; }
        }
      `}</style>
    </div>
  )
}
