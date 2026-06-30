'use client';

import { useEffect, useRef } from 'react';
import { motion, type Variants } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { MagneticButton } from './magnetic-button';


const TITLE = 'SUMMIT AI';

type Point = { x: number; y: number };
interface WaveConfig {
  offset: number; amplitude: number; frequency: number;
  color: string; opacity: number;
}

const WAVES: WaveConfig[] = [
  { offset: 0,              amplitude: 70, frequency: 0.003,  color: 'rgba(124,58,237,1)',  opacity: 0.5  },
  { offset: Math.PI / 2,   amplitude: 90, frequency: 0.0026, color: 'rgba(167,139,250,1)', opacity: 0.4  },
  { offset: Math.PI,       amplitude: 60, frequency: 0.0034, color: 'rgba(76,29,149,1)',   opacity: 0.35 },
  { offset: Math.PI * 1.5, amplitude: 80, frequency: 0.0022, color: 'rgba(196,181,253,1)', opacity: 0.25 },
  { offset: Math.PI * 2,   amplitude: 55, frequency: 0.004,  color: 'rgba(255,255,255,1)', opacity: 0.15 },
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (d = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: d, ease: 'easeOut' } }),
};

export default function GlowyWavesHero() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef<Point>({ x: 0, y: 0 });
  const targetMouseRef = useRef<Point>({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let time = 0;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const mouseInfluence = prefersReduced ? 10 : 70;
    const influenceRadius = prefersReduced ? 160 : 320;
    const smoothing = prefersReduced ? 0.04 : 0.1;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      const c = { x: canvas.width / 2, y: canvas.height / 2 };
      mouseRef.current = c; targetMouseRef.current = c;
    };

    const drawWave = (wave: WaveConfig) => {
      ctx.save();
      ctx.beginPath();
      for (let x = 0; x <= canvas.width; x += 4) {
        const dx = x - mouseRef.current.x;
        const dy = canvas.height / 2 - mouseRef.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const influence = Math.max(0, 1 - dist / influenceRadius);
        const mouseEffect = influence * mouseInfluence * Math.sin(time * 0.001 + x * 0.01 + wave.offset);
        const y = canvas.height / 2
          + Math.sin(x * wave.frequency + time * 0.002 + wave.offset) * wave.amplitude
          + Math.sin(x * wave.frequency * 0.4 + time * 0.003) * (wave.amplitude * 0.45)
          + mouseEffect;
        x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.lineWidth = 2.5;
      ctx.strokeStyle = wave.color;
      ctx.globalAlpha = wave.opacity;
      ctx.shadowBlur = 40;
      ctx.shadowColor = wave.color;
      ctx.stroke();
      ctx.restore();
    };

    const animate = () => {
      time += 1;
      mouseRef.current.x += (targetMouseRef.current.x - mouseRef.current.x) * smoothing;
      mouseRef.current.y += (targetMouseRef.current.y - mouseRef.current.y) * smoothing;
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.globalAlpha = 1; ctx.shadowBlur = 0;
      WAVES.forEach(drawWave);
      animId = requestAnimationFrame(animate);
    };

    resize();
    const onMove = (e: MouseEvent) => { targetMouseRef.current = { x: e.clientX, y: e.clientY }; };
    const onLeave = () => { const c = { x: canvas.width / 2, y: canvas.height / 2 }; mouseRef.current = c; targetMouseRef.current = c; };
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseleave', onLeave);
    animId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseleave', onLeave);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <section className="gw-canvas-bg" style={{ position: 'relative', width: '100%', minHeight: '100svh', overflow: 'hidden', background: '#000' }}>

      {/* Wave canvas */}
      <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} aria-hidden="true" />

      {/* Subtle glow behind branding */}
      <div style={{ position: 'absolute', top: '10%', left: '50%', transform: 'translateX(-50%)', width: 600, height: 300, borderRadius: '50%', background: 'rgba(124,58,237,0.06)', filter: 'blur(100px)', pointerEvents: 'none', zIndex: 1 }} />

      {/* Content — centred branding */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 3,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        textAlign: 'center',
        padding: '0 clamp(16px,5vw,48px)',
      }}>

        {/* Kicker badge */}
        <motion.div variants={fadeUp} custom={0.1} initial="hidden" animate="visible"
          style={{ display: 'inline-flex', alignItems: 'center', gap: 7, border: '1px solid rgba(124,58,237,0.28)', background: 'rgba(124,58,237,0.07)', borderRadius: 999, padding: '6px 16px', marginBottom: 16 }}>
          <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#a78bfa', display: 'inline-block', animation: 'gwPulse 2s infinite' }} />
          <span style={{ fontFamily: 'var(--font-bebas)', letterSpacing: '0.22em', fontSize: 'clamp(0.65rem,1.8vw,0.85rem)', color: '#a78bfa' }}>
            AI TOOLS FOR BUSINESSES
          </span>
        </motion.div>

        {/* Logo */}
        <motion.div variants={fadeUp} custom={0.2} initial="hidden" animate="visible" style={{ marginBottom: '-12px' }}>
          <Image src="/sai.png" alt="Summit AI" width={600} height={600}
            style={{
              height: 'clamp(7rem,16vw,12rem)', width: 'auto', display: 'block',
              filter: 'drop-shadow(0 4px 24px rgba(0,0,0,0.95)) drop-shadow(0 0 50px rgba(124,58,237,0.2))',
            }}
            priority
          />
        </motion.div>

        {/* SUMMIT AI */}
        <motion.h1 variants={fadeUp} custom={0.3} initial="hidden" animate="visible" className="gw-name" aria-label="SUMMIT AI">
          {TITLE.split('').map((ch, i) => (
            <span key={i} className="gw-letter"
              style={{ '--i': i, animationDelay: `${0.3 + i * 0.07}s` } as React.CSSProperties}>
              {ch === ' ' ? <span style={{ display: 'inline-block', width: '0.22em' }} /> : ch}
            </span>
          ))}
          <span className="gw-glitch gw-glitch-r" aria-hidden="true">{TITLE}</span>
          <span className="gw-glitch gw-glitch-b" aria-hidden="true">{TITLE}</span>
        </motion.h1>

        {/* Motto */}
        <motion.p variants={fadeUp} custom={0.42} initial="hidden" animate="visible" style={{
          fontFamily: 'var(--font-bebas)', letterSpacing: '0.2em',
          fontSize: 'clamp(0.7rem,2vw,1rem)', color: 'rgba(255,255,255,0.42)',
          margin: '10px 0 32px', textShadow: '0 1px 10px rgba(0,0,0,0.9)',
        }}>
          One plan · 12 tools · unlimited generations
        </motion.p>

        {/* CTA */}
        <motion.div variants={fadeUp} custom={0.52} initial="hidden" animate="visible">
          <MagneticButton distance={0.5}>
            <Link href="/signup" className="gw-cta">
              <span>Get Started Free</span>
              <ArrowRight size={16} strokeWidth={2.5} />
            </Link>
          </MagneticButton>
        </motion.div>

      </div>

      {/* Scroll hint */}
      <div className="gw-scroll-hint" aria-hidden="true">
        <ChevronDown size={22} color="rgba(255,255,255,0.5)" />
      </div>

      <style>{`
        .gw-name {
          position: relative; z-index: 2;
          font-family: var(--font-bebas), 'Arial Black', sans-serif;
          font-size: clamp(3.8rem, 14vw, 9rem);
          font-weight: 400; color: #fff;
          line-height: 0.88; letter-spacing: 0.07em;
          margin: 0; display: block; text-align: center;
          animation: gwShake 6s 2s infinite;
        }
        @keyframes gwShake {
          0%,89%,97%,100% { transform: none; }
          90% { transform: translateX(-5px) skewX(-2deg); }
          91% { transform: translateX(5px) skewX(1deg); }
          92% { transform: translateX(-4px) skewX(-1deg); }
          93% { transform: translateX(4px); }
          94% { transform: translateX(-3px) skewX(1deg); }
          95% { transform: translateX(3px); }
          96% { transform: translateX(-2px); }
        }

        .gw-letter {
          display: inline-block; opacity: 0;
          transform: translateY(-48px) scale(0.85);
          animation: gwLetterDown 0.55s cubic-bezier(0.22,1,0.36,1) forwards;
          text-shadow:
            2px 2px 0 rgba(0,0,0,1),
            0 4px 16px rgba(0,0,0,1),
            0 0 60px rgba(200,160,255,0.5);
        }
        @keyframes gwLetterDown { to { opacity:1; transform:translateY(0) scale(1); } }

        .gw-glitch {
          position: absolute; top: 0; left: 0; width: 100%;
          font-family: var(--font-bebas), 'Arial Black', sans-serif;
          font-size: inherit; letter-spacing: inherit;
          font-weight: 400; line-height: inherit;
          pointer-events: none; opacity: 0;
        }
        .gw-glitch-r { color: rgba(220,160,255,0.8); animation: gwGlitchR 6s 2s infinite; }
        .gw-glitch-b { color: rgba(100,40,210,0.8);  animation: gwGlitchB 6s 2s infinite; }
        @keyframes gwGlitchR {
          0%,89%,100% { opacity:0; transform:none; clip-path:none; }
          90% { opacity:1; transform:translate(-4px,0) skewX(-3deg); clip-path:polygon(0 20%,100% 20%,100% 45%,0 45%); }
          92% { opacity:0; }
          94% { opacity:1; transform:translate(4px,0) skewX(2deg); clip-path:polygon(0 60%,100% 60%,100% 80%,0 80%); }
          96%,99% { opacity:0; transform:none; }
        }
        @keyframes gwGlitchB {
          0%,89%,100% { opacity:0; transform:none; clip-path:none; }
          91% { opacity:1; transform:translate(4px,0) skewX(2deg); clip-path:polygon(0 45%,100% 45%,100% 65%,0 65%); }
          93% { opacity:0; }
          95% { opacity:1; transform:translate(-3px,0); clip-path:polygon(0 5%,100% 5%,100% 20%,0 20%); }
          97%,100% { opacity:0; transform:none; }
        }

        .gw-cta {
          display: inline-flex; align-items: center; gap: 8px;
          padding: clamp(12px,2.5vw,16px) clamp(28px,5vw,40px);
          border-radius: 100px;
          background: #fff !important; color: #000 !important;
          font-family: var(--font-bebas), 'Arial Black', sans-serif;
          font-size: clamp(1rem,2.5vw,1.3rem); letter-spacing: 0.14em;
          font-weight: 400; text-decoration: none !important; white-space: nowrap;
          box-shadow: 0 0 40px rgba(124,58,237,0.35), 0 4px 20px rgba(0,0,0,0.6);
          -webkit-text-fill-color: #000;
          animation: gwCtaPulse 3s 2s ease-in-out infinite;
          transition: background 0.2s, box-shadow 0.2s;
        }
        .gw-cta:hover {
          background: rgba(124,58,237,1) !important;
          -webkit-text-fill-color: #fff !important;
          box-shadow: 0 0 50px rgba(124,58,237,0.6), 0 4px 24px rgba(0,0,0,0.7) !important;
        }
        .gw-cta span, .gw-cta svg { color: #000 !important; -webkit-text-fill-color: #000; transition: color 0.2s, -webkit-text-fill-color 0.2s; }
        .gw-cta:hover span, .gw-cta:hover svg { color: #fff !important; -webkit-text-fill-color: #fff !important; }
        @keyframes gwCtaPulse {
          0%,100% { box-shadow: 0 0 40px rgba(124,58,237,0.35), 0 4px 20px rgba(0,0,0,0.6); }
          50%     { box-shadow: 0 0 60px rgba(124,58,237,0.6), 0 4px 28px rgba(0,0,0,0.7); }
        }

        .gw-scroll-hint {
          position: absolute; bottom: clamp(14px,3vw,24px);
          left: 50%; transform: translateX(-50%); z-index: 10;
          animation: gwBounce 2s 3s ease-in-out infinite both; opacity: 0;
        }
        @keyframes gwBounce {
          0%,100% { transform:translateX(-50%) translateY(0);  opacity:0.5; }
          50%     { transform:translateX(-50%) translateY(8px); opacity:0.9; }
        }
        @keyframes gwPulse { 0%,100% { opacity:1; } 50% { opacity:0.4; } }

        @media (max-width: 767px) {
          .gw-letter    { opacity:1 !important; transform:none !important; animation:none !important; }
          .gw-glitch    { display:none; }
          .gw-name      { animation:none !important; }
          .gw-scroll-hint { animation:none !important; opacity:0.5; }
          .gw-cta       { animation:none !important; }
        }
      `}</style>
    </section>
  );
}
