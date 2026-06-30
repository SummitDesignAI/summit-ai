"use client";

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

const LiquidBackground = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const { viewport } = useThree();
  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uMouse: { value: new THREE.Vector2(0, 0) },
  }), []);

  useFrame((state) => {
    if (meshRef.current) {
      (meshRef.current.material as THREE.ShaderMaterial).uniforms.uTime.value = state.clock.getElapsedTime();
      (meshRef.current.material as THREE.ShaderMaterial).uniforms.uMouse.value.lerp(state.mouse, 0.05);
    }
  });

  return (
    <mesh ref={meshRef} scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        transparent
        uniforms={uniforms}
        vertexShader={`varying vec2 vUv; void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`}
        fragmentShader={`
          uniform float uTime; uniform vec2 uMouse; varying vec2 vUv;
          void main() {
            vec2 uv = vUv; float t = uTime * 0.15;
            vec2 m = uMouse * 0.1;
            float color = smoothstep(0.0, 1.0, (sin(uv.x * 8.0 + t + m.x * 12.0) + sin(uv.y * 6.0 - t + m.y * 12.0)) * 0.5 + 0.5);
            gl_FragColor = vec4(mix(vec3(0.005), vec3(0.05), color), 1.0);
          }
        `}
      />
    </mesh>
  );
};

const Monolith = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.25;
    }
  });
  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[13, 1]} />
        <MeshDistortMaterial color="#0a0a0a" speed={4} distort={0.4} roughness={0.05} metalness={1.0} />
      </mesh>
    </Float>
  );
};

export default function ExperienceHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const revealRef = useRef<HTMLDivElement>(null);

  // no GSAP on content — CSS handles fade-in so it always shows;

  return (
    <section ref={containerRef} style={{ position: 'relative', width: '100%', height: '100svh', background: '#020202', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
      {/* Three.js canvas */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
        <Canvas camera={{ position: [0, 0, 60], fov: 35 }}>
          <ambientLight intensity={0.4} />
          <spotLight position={[50, 50, 50]} intensity={3} />
          <LiquidBackground />
          <Monolith />
        </Canvas>
      </div>

      {/* Content overlay — CSS animated, always visible */}
      <div ref={revealRef} style={{ position: 'relative', zIndex: 10, flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '80px 24px 32px', textAlign: 'center', gap: 0, animation: 'saiReveal 1.2s ease both' }}>

        {/* Status dot */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }} className="sai-cell">
          <div style={{ position: 'relative', width: '8px', height: '8px' }}>
            <div style={{ position: 'absolute', inset: 0, background: '#fff', borderRadius: '50%' }} />
            <div style={{ position: 'absolute', inset: 0, background: '#fff', borderRadius: '50%', animation: 'ping 1.5s ease-out infinite', opacity: 0.3 }} />
          </div>
          <span style={{ fontFamily: 'monospace', fontSize: '10px', color: 'rgba(255,255,255,0.5)', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
            AI for Local Business
          </span>
        </div>

        {/* Logo */}
        <div className="sai-cell">
          <Image
            src="/sai.png"
            alt="Summit AI"
            width={320} height={320}
            style={{ height: 'clamp(6rem, 26vw, 8.5rem)', width: 'auto', filter: 'drop-shadow(0 0 40px rgba(255,255,255,0.12))' }}
            priority
          />
        </div>

        {/* Name */}
        <h1 className="sai-cell" style={{
          fontFamily: 'var(--font-bebas), sans-serif',
          fontSize: 'clamp(3.5rem, 16vw, 6rem)',
          lineHeight: 0.9, letterSpacing: '0.05em',
          color: '#fff', margin: '6px 0 12px',
        }}>
          SUMMIT AI
        </h1>

        {/* Tagline */}
        <p className="sai-cell" style={{ fontFamily: 'monospace', fontSize: '11px', color: 'rgba(255,255,255,0.35)', letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: '32px' }}>
          12 AI Tools · Local Business · Unlimited
        </p>

        {/* CTA */}
        <Link href="/signup" className="sai-cell" style={{
          display: 'inline-flex', alignItems: 'center', gap: '10px',
          padding: '14px 28px', borderRadius: '100px',
          border: '1px solid rgba(255,255,255,0.15)',
          background: 'rgba(255,255,255,0.05)',
          color: '#fff', fontSize: '13px', fontWeight: 600,
          textDecoration: 'none', letterSpacing: '0.05em',
          backdropFilter: 'blur(10px)',
        }}>
          Get Started Free <ArrowUpRight size={15} />
        </Link>

        <p className="sai-cell" style={{ marginTop: '12px', fontFamily: 'monospace', fontSize: '10px', color: 'rgba(255,255,255,0.2)' }}>
          No credit card required · $9.99 CAD/mo
        </p>
      </div>

      {/* Bottom stats strip */}
      <div style={{
        position: 'relative', zIndex: 10,
        borderTop: '1px solid rgba(255,255,255,0.06)',
        background: 'rgba(2,2,2,0.8)',
        padding: '14px 24px',
        display: 'flex', justifyContent: 'space-around', backdropFilter: 'blur(10px)',
      }}>
        {[['12', 'AI Tools'], ['$9.99', 'CAD/Month'], ['∞', 'Generations']].map(([val, label]) => (
          <div key={label} style={{ textAlign: 'center' }}>
            <p style={{ fontSize: '16px', fontWeight: 700, color: '#fff', margin: 0 }}>{val}</p>
            <p style={{ fontFamily: 'monospace', fontSize: '9px', color: 'rgba(255,255,255,0.25)', letterSpacing: '0.12em', textTransform: 'uppercase', margin: 0 }}>{label}</p>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes ping { 0% { transform: scale(1); opacity: 0.3; } 100% { transform: scale(2.5); opacity: 0; } }
        @keyframes saiReveal { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </section>
  );
}
