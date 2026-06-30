'use client'

import { useEffect, useRef, useState } from 'react'

type Stat = { display: string; label: string; numeric?: number; prefix?: string; suffix?: string; decimals?: number }

const STATS: Stat[] = [
  { display: '12',     label: 'AI Tools',       numeric: 12 },
  { display: '$9.99',  label: 'CAD / Month',     numeric: 9.99, prefix: '$', decimals: 2 },
  { display: '∞',      label: 'Generations' },
  { display: '< 2s',   label: 'Avg Response' },
]

function useCountUp(target: number, decimals = 0, active: boolean) {
  const [val, setVal] = useState(0)
  useEffect(() => {
    if (!active) return
    const duration = 1400
    const start = performance.now()
    const frame = (now: number) => {
      const p = Math.min((now - start) / duration, 1)
      const ease = 1 - Math.pow(1 - p, 3)
      setVal(parseFloat((ease * target).toFixed(decimals)))
      if (p < 1) requestAnimationFrame(frame)
    }
    requestAnimationFrame(frame)
  }, [active, target, decimals])
  return val
}

function CountStat({ stat, active }: { stat: Stat; active: boolean }) {
  const val = useCountUp(stat.numeric ?? 0, stat.decimals ?? 0, active && !!stat.numeric)
  const display = stat.numeric !== undefined
    ? `${stat.prefix ?? ''}${stat.decimals ? val.toFixed(stat.decimals) : val}`
    : stat.display

  return (
    <div style={{ textAlign: 'center' }}>
      <p style={{ fontSize: 'clamp(1.6rem,4vw,2.2rem)', fontWeight: 700, margin: 0, background: 'linear-gradient(135deg,#fff 30%,#a8a8b3)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
        {display}
      </p>
      <p style={{ fontSize: '0.7rem', marginTop: 4, textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: 500, color: '#6b6b78' }}>
        {stat.label}
      </p>
    </div>
  )
}

export default function CountUpStats() {
  const ref = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setActive(true); obs.disconnect() } }, { threshold: 0.1 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <div ref={ref} className="stats-grid" style={{ display: 'grid', gap: '1.5rem', maxWidth: 768, margin: '0 auto' }}>
      {STATS.map((s, i) => <CountStat key={i} stat={s} active={active} />)}
    </div>
  )
}
