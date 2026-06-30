'use client'

import { useEffect } from 'react'

export default function ClickSound() {
  useEffect(() => {
    const play = (e: Event) => {
      const target = e.target as HTMLElement
      if (!target.closest('button, a, [role="button"]')) return
      try {
        const ctx = new (window.AudioContext || (window as any).webkitAudioContext)()
        const osc = ctx.createOscillator()
        const gain = ctx.createGain()
        const filter = ctx.createBiquadFilter()

        osc.connect(filter)
        filter.connect(gain)
        gain.connect(ctx.destination)

        filter.type = 'highpass'
        filter.frequency.value = 400

        osc.type = 'sine'
        osc.frequency.setValueAtTime(1100, ctx.currentTime)
        osc.frequency.exponentialRampToValueAtTime(550, ctx.currentTime + 0.07)

        gain.gain.setValueAtTime(0.07, ctx.currentTime)
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.09)

        osc.start(ctx.currentTime)
        osc.stop(ctx.currentTime + 0.09)
      } catch (_) {
        // AudioContext not available
      }
    }

    window.addEventListener('click', play)
    return () => window.removeEventListener('click', play)
  }, [])

  return null
}
