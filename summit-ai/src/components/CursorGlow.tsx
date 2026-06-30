'use client'

import { useEffect, useRef } from 'react'

export default function CursorGlow() {
  const dotRef  = useRef<HTMLDivElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const dot  = dotRef.current
    const glow = glowRef.current
    if (!dot || !glow) return

    let x = 0, y = 0
    let glowX = 0, glowY = 0
    let raf: number

    const onMove = (e: MouseEvent) => { x = e.clientX; y = e.clientY }
    window.addEventListener('mousemove', onMove)

    const tick = () => {
      dot.style.transform  = `translate(${x}px,${y}px)`
      glowX += (x - glowX) * 0.1
      glowY += (y - glowY) * 0.1
      glow.style.transform = `translate(${glowX}px,${glowY}px)`
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <>
      {/* Sharp dot */}
      <div ref={dotRef} style={{
        position: 'fixed', top: 0, left: 0,
        width: 8, height: 8,
        borderRadius: '50%',
        background: '#a78bfa',
        pointerEvents: 'none',
        zIndex: 99999,
        translate: '-50% -50%',
        mixBlendMode: 'screen',
      }} />
      {/* Soft trailing glow */}
      <div ref={glowRef} style={{
        position: 'fixed', top: 0, left: 0,
        width: 320, height: 320,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(124,58,237,0.12) 0%, transparent 70%)',
        pointerEvents: 'none',
        zIndex: 99998,
        translate: '-50% -50%',
        filter: 'blur(8px)',
      }} />
    </>
  )
}
