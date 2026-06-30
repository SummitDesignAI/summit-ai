'use client'

import { useState, useEffect } from 'react'
import { Star, Share2, FileText, Mail, MapPin } from 'lucide-react'

const examples = [
  {
    icon: Star,
    tool: 'Google Review Reply',
    business: 'The Maple Grill',
    review: '"Great food but the service was a little slow tonight."',
    reply: 'Thank you so much for your kind words about our food! We sincerely apologize for the wait — we are working hard to improve our service speed. We hope to welcome you back very soon for an even better experience!',
  },
  {
    icon: FileText,
    tool: 'Quote Generator',
    business: 'Summit Plumbing Co.',
    review: 'Service: Replace hot water tank · Price: $1,800 · Client: Bob Johnson',
    reply: 'Hi Bob, thank you for reaching out to Summit Plumbing. We are pleased to provide an estimate of $1,800 for a full hot water tank replacement, including parts, labour, and disposal. We can complete this within 1 business day. Please don\'t hesitate to call us to schedule.',
  },
  {
    icon: Mail,
    tool: 'Customer Email Writer',
    business: 'Clean Cut Barbershop',
    review: 'Follow-up email after a haircut appointment with client Marcus.',
    reply: 'Hi Marcus, it was great having you in today! We hope you are loving your new look. As a valued client, your next appointment is on us — use code THANKYOU at booking. We look forward to seeing you again soon!',
  },
  {
    icon: Share2,
    tool: 'Social Media Post',
    business: 'Peak Roofing Ltd.',
    review: 'Just completed a full roof replacement in Calgary — before & after.',
    reply: 'Another roof, another family protected. ✅ We just wrapped a full replacement for a home in Calgary — new shingles, flashing, and peace of mind included. Ready for whatever winter brings. Call us for your free estimate today! #CalgaryRoofing #PeakRoofing #HomeImprovement',
  },
  {
    icon: MapPin,
    tool: 'Google Business Post',
    business: 'Horizon HVAC',
    review: 'Seasonal promotion: 20% off furnace tune-ups this October.',
    reply: 'Fall is here — is your furnace ready? ❄️ This October, Horizon HVAC is offering 20% off all furnace tune-ups. Don\'t wait for the cold snap to find out your heat isn\'t working. Book your tune-up today and stay warm all season long. Limited spots available!',
  },
]

export default function AnimatedPreview() {
  const [index, setIndex] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false)
      setTimeout(() => {
        setIndex(i => (i + 1) % examples.length)
        setVisible(true)
      }, 500)
    }, 14000)
    return () => clearInterval(interval)
  }, [])

  const ex = examples[index]
  const Icon = ex.icon

  return (
    <div className="w-full max-w-xl mx-auto">
      {/* Progress dots */}
      <div className="flex items-center justify-center gap-2 mb-6">
        {examples.map((_, i) => (
          <button
            key={i}
            onClick={() => { setVisible(false); setTimeout(() => { setIndex(i); setVisible(true) }, 300) }}
            className={`h-1.5 rounded-full transition-all duration-300 ${i === index ? 'w-6' : 'w-1.5'}`}
            style={{ background: i === index ? '#c8c8d4' : 'rgba(168,168,179,0.2)' }}
          />
        ))}
      </div>

      <div
        className={`rounded-3xl overflow-hidden ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}
        style={{ background: '#0d0d0d', border: '1px solid rgba(168,168,179,0.15)', transition: 'opacity 0.45s ease, transform 0.45s ease' }}
      >
        {/* Header */}
        <div className="flex items-center gap-3 px-6 py-4" style={{ borderBottom: '1px solid rgba(168,168,179,0.1)' }}>
          <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ background: 'rgba(168,168,179,0.12)', border: '1px solid rgba(168,168,179,0.2)' }}>
            <Icon className="w-4 h-4 text-white" />
          </div>
          <div>
            <p className="text-sm font-semibold text-white">{ex.tool}</p>
            <p className="text-xs" style={{ color: '#6b6b78' }}>{ex.business}</p>
          </div>
          <div className="ml-auto flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full" style={{ color: '#c8c8d4', background: 'rgba(168,168,179,0.08)', border: '1px solid rgba(168,168,179,0.15)' }}>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Live
          </div>
        </div>

        <div className="p-6 space-y-4">
          {/* Input */}
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-widest mb-2" style={{ color: '#6b6b78' }}>Input</p>
            <div className="rounded-xl px-4 py-3 text-sm leading-relaxed" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(168,168,179,0.1)', color: '#a8a8b3' }}>
              {ex.review}
            </div>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px" style={{ background: 'rgba(168,168,179,0.1)' }} />
            <div className="text-xs font-medium" style={{ color: '#6b6b78' }}>AI Generated</div>
            <div className="flex-1 h-px" style={{ background: 'rgba(168,168,179,0.1)' }} />
          </div>

          {/* Output */}
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-widest mb-2" style={{ color: '#6b6b78' }}>Response</p>
            <div className="bg-white rounded-xl px-4 py-3 text-sm text-gray-900 leading-relaxed font-medium">
              {ex.reply}
            </div>
          </div>

          <div className="flex items-center justify-between pt-1">
            <p className="text-xs" style={{ color: '#6b6b78' }}>Generated in 1.4s</p>
            <p className="text-xs" style={{ color: '#6b6b78' }}>Powered by Claude AI</p>
          </div>
        </div>
      </div>
    </div>
  )
}
