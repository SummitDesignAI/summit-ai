'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

export default function IntroScreen() {
  const [gone, setGone] = useState(false)

  useEffect(() => {
    // Only show once per session
    if (sessionStorage.getItem('introSeen')) { setGone(true); return }
    sessionStorage.setItem('introSeen', '1')
    const t = setTimeout(() => setGone(true), 3800)
    return () => clearTimeout(t)
  }, [])

  if (gone) return null

  return (
    <div
      onClick={() => setGone(true)}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        background: '#000',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        // Fade the whole overlay out at 3s
        animation: 'introOverlayOut 0.9s ease 3s forwards',
      }}
    >
      {/* Logo fades + rises in */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        animation: 'introContentIn 0.9s cubic-bezier(0.22,1,0.36,1) 0.15s both',
      }}>
        <Image
          src="/sai.png"
          alt="Summit AI"
          width={600}
          height={600}
          className="w-auto"
          style={{ height: 'clamp(8rem, 40vw, 16rem)' }}
          priority
        />
        {/* "AI" fades in slightly after logo */}
        <div
          className="intro-glitch"
          data-text="AI"
          style={{
            fontFamily: 'var(--font-bebas), sans-serif',
            fontSize: '3.5rem',
            letterSpacing: '0.15em',
            color: '#fff',
            textAlign: 'center',
            width: '100%',
            paddingLeft: '0.15em',
            marginTop: '-1.75rem',
            animation: 'introAIIn 0.5s ease 0.85s both',
          }}
        >
          AI
        </div>
      </div>

      <div className="intro-scanlines pointer-events-none" />
    </div>
  )
}
