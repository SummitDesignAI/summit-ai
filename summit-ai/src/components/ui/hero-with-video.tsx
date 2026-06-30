'use client'

import React, { useState, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Play, Pause, ArrowRight } from 'lucide-react'

export default function HeroWithVideo() {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
  const [isVideoPaused, setIsVideoPaused] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  const handlePlay = () => {
    videoRef.current?.play()
    setIsVideoPlaying(true)
    setIsVideoPaused(false)
  }
  const handlePause = () => {
    videoRef.current?.pause()
    setIsVideoPaused(true)
  }
  const handleResume = () => {
    videoRef.current?.play()
    setIsVideoPaused(false)
  }
  const handleEnded = () => {
    setIsVideoPlaying(false)
    setIsVideoPaused(false)
  }

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">

      {/* ── Hero text ── */}
      <div className="pt-6 pb-10 text-center">
        <div className="max-w-3xl mx-auto">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 border text-xs font-medium px-4 py-2 rounded-full mb-6"
            style={{ borderColor: 'rgba(124,58,237,0.3)', color: '#a78bfa', background: 'rgba(124,58,237,0.08)' }}>
            <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
            12 AI tools · $9.99 CAD/month · Unlimited use
          </div>

          {/* Logo */}
          <div className="flex justify-center mb-2">
            <Image
              src="/sai.png" alt="Summit AI" width={500} height={500}
              style={{ height: 'clamp(8rem, 28vw, 14rem)', width: 'auto',
                filter: 'drop-shadow(0 0 30px rgba(124,58,237,0.3))' }}
              priority
            />
          </div>

          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-white mb-4"
            style={{ fontFamily: 'var(--font-bebas), sans-serif', letterSpacing: '0.05em', lineHeight: 0.9,
              textShadow: '0 0 60px rgba(124,58,237,0.4)' }}>
            SUMMIT AI
          </h1>

          <p className="text-lg text-white/60 mb-2"
            style={{ fontFamily: 'var(--font-bebas), sans-serif', letterSpacing: '0.2em', fontSize: 'clamp(0.9rem,3vw,1.2rem)' }}>
            AI TOOLS FOR BUSINESSES
          </p>

          <p className="text-base text-white/45 max-w-xl mx-auto mb-8 leading-relaxed">
            One subscription. Unlimited generations. Twelve tools that save hours every week —
            from review replies to full proposals.
          </p>

          {/* CTAs */}
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <Link href="/signup"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-full text-sm font-semibold transition-all"
              style={{ background: '#fff', color: '#000' }}>
              Get Started Free <ArrowRight className="w-4 h-4" style={{ color: '#000' }} />
            </Link>
            <Link href="/#tools"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-full text-sm font-semibold border transition-all hover:bg-white/5"
              style={{ borderColor: 'rgba(255,255,255,0.15)', color: '#fff' }}>
              See All 12 Tools
            </Link>
          </div>
        </div>
      </div>

      {/* ── Media panel ── */}
      <div className="relative w-full aspect-video rounded-3xl overflow-hidden"
        style={{ border: '1px solid rgba(124,58,237,0.2)', boxShadow: '0 0 60px rgba(124,58,237,0.12)' }}>

        {/* Poster image */}
        <img
          src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=2072&q=80"
          alt="Summit AI preview"
          className={`w-full h-full absolute inset-0 object-cover transition-opacity duration-500 ${isVideoPlaying ? 'opacity-0' : 'opacity-100'}`}
        />

        {/* Dark overlay on poster */}
        {!isVideoPlaying && (
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        )}

        {/* Overlay label */}
        {!isVideoPlaying && (
          <div className="absolute bottom-6 left-6 text-left pointer-events-none">
            <p className="text-white/50 text-xs tracking-widest uppercase mb-1"
              style={{ fontFamily: 'monospace' }}>Summit AI</p>
            <p className="text-white font-semibold text-lg">See it in action</p>
          </div>
        )}

        {/* Video */}
        <video
          ref={videoRef}
          src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"
          className={`w-full h-full absolute inset-0 object-cover transition-opacity duration-500 ${isVideoPlaying ? 'opacity-100' : 'opacity-0'}`}
          onEnded={handleEnded}
          playsInline
          muted
        />

        {/* Play/Pause button */}
        <div className="absolute bottom-5 right-5 z-10">
          {!isVideoPlaying ? (
            <button onClick={handlePlay}
              className="w-14 h-14 rounded-full flex items-center justify-center transition-all duration-200"
              style={{ background: 'rgba(255,255,255,0.18)', backdropFilter: 'blur(12px)',
                border: '1px solid rgba(255,255,255,0.25)', boxShadow: '0 4px 20px rgba(0,0,0,0.3)' }}>
              <Play className="h-6 w-6 text-white fill-white ml-0.5" />
            </button>
          ) : (
            <button onClick={isVideoPaused ? handleResume : handlePause}
              className="w-14 h-14 rounded-full flex items-center justify-center transition-all duration-200"
              style={{ background: 'rgba(255,255,255,0.18)', backdropFilter: 'blur(12px)',
                border: '1px solid rgba(255,255,255,0.25)', boxShadow: '0 4px 20px rgba(0,0,0,0.3)' }}>
              {isVideoPaused
                ? <Play className="h-6 w-6 text-white fill-white ml-0.5" />
                : <Pause className="h-6 w-6 text-white fill-white" />}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
