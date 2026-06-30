'use client'

import { useEffect, useRef, useState } from 'react'

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const [hovered, setHovered] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    let mx = 0, my = 0
    let cx = 0, cy = 0
    let raf: number

    if (window.matchMedia('(pointer: coarse)').matches) return

    const onMove  = (e: MouseEvent) => { mx = e.clientX; my = e.clientY; if (!visible) setVisible(true) }
    const onLeave = () => setVisible(false)
    const onEnter = () => setVisible(true)

    window.addEventListener('mousemove', onMove)
    document.addEventListener('mouseleave', onLeave)
    document.addEventListener('mouseenter', onEnter)

    const onHoverIn  = () => setHovered(true)
    const onHoverOut = () => setHovered(false)
    const attach = () => {
      document.querySelectorAll('a, button, [role="button"]').forEach(el => {
        el.addEventListener('mouseenter', onHoverIn)
        el.addEventListener('mouseleave', onHoverOut)
      })
    }
    attach()

    const animate = () => {
      cx += (mx - cx) * 0.28
      cy += (my - cy) * 0.28
      if (cursorRef.current)
        cursorRef.current.style.transform = `translate(${cx}px,${cy}px) translate(-50%,-50%)`
      raf = requestAnimationFrame(animate)
    }
    raf = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseleave', onLeave)
      document.removeEventListener('mouseenter', onEnter)
      cancelAnimationFrame(raf)
    }
  }, [visible])

  return (
    <>
      {/* Sharp crosshair cursor */}
      <div
        ref={cursorRef}
        className="pointer-events-none fixed top-0 left-0 z-[9999]"
        style={{
          opacity: visible ? 1 : 0,
          transition: 'opacity 0.15s',
          willChange: 'transform',
          mixBlendMode: 'difference',
        }}
      >
        <div style={{ position: 'absolute', width: hovered ? 8 : 5, height: hovered ? 8 : 5, background: '#fff', borderRadius: '50%', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', transition: 'width 0.15s, height 0.15s' }} />
        <div style={{ position: 'absolute', width: 1.5, background: '#fff', left: '50%', transform: 'translateX(-50%)', bottom: 'calc(50% + 5px)', height: hovered ? 20 : 11, transition: 'height 0.15s', opacity: hovered ? 1 : 0.7 }} />
        <div style={{ position: 'absolute', width: 1.5, background: '#fff', left: '50%', transform: 'translateX(-50%)', top: 'calc(50% + 5px)', height: hovered ? 20 : 11, transition: 'height 0.15s', opacity: hovered ? 1 : 0.7 }} />
        <div style={{ position: 'absolute', height: 1.5, background: '#fff', top: '50%', transform: 'translateY(-50%)', right: 'calc(50% + 5px)', width: hovered ? 20 : 11, transition: 'width 0.15s', opacity: hovered ? 1 : 0.7 }} />
        <div style={{ position: 'absolute', height: 1.5, background: '#fff', top: '50%', transform: 'translateY(-50%)', left: 'calc(50% + 5px)', width: hovered ? 20 : 11, transition: 'width 0.15s', opacity: hovered ? 1 : 0.7 }} />
        <div style={{ position: 'absolute', top: '50%', left: '50%', width: hovered ? 48 : 0, height: hovered ? 48 : 0, border: '1.5px solid rgba(167,139,250,0.8)', borderRadius: '50%', transform: 'translate(-50%,-50%)', transition: 'width 0.18s, height 0.18s, opacity 0.18s', opacity: hovered ? 1 : 0 }} />
      </div>
    </>
  )
}
