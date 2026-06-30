'use client'

import { Star, Share2, Mail, FileText, FileCheck, Megaphone, BookOpen, HelpCircle, MapPin, Globe, Bot, Sparkles } from 'lucide-react'

const TOOLS = [
  { icon: Sparkles,   label: 'AI Marketing Assistant' },
  { icon: Star,       label: 'Review Reply' },
  { icon: Share2,     label: 'Social Media Generator' },
  { icon: Mail,       label: 'Email Writer' },
  { icon: FileText,   label: 'Quote Generator' },
  { icon: FileCheck,  label: 'Proposal Generator' },
  { icon: Megaphone,  label: 'Slogan Generator' },
  { icon: BookOpen,   label: 'SEO Blog Writer' },
  { icon: HelpCircle, label: 'FAQ Generator' },
  { icon: MapPin,     label: 'GBP Post Generator' },
  { icon: Globe,      label: 'Website Copy Generator' },
  { icon: Bot,        label: 'Chat Assistant Builder' },
]

const ITEMS = [...TOOLS, ...TOOLS]

export default function MarqueeTicker() {
  return (
    <div style={{ width: '100%', overflow: 'hidden', position: 'relative', padding: '20px 0', background: '#000' }}>

      {/* Edge fades */}
      <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 120, background: 'linear-gradient(90deg,#000,transparent)', zIndex: 2, pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: 120, background: 'linear-gradient(270deg,#000,transparent)', zIndex: 2, pointerEvents: 'none' }} />

      <div style={{ display: 'flex', animation: 'marqueeScroll 30s linear infinite', width: 'max-content' }}>
        {ITEMS.map((tool, i) => {
          const Icon = tool.icon
          return (
            <div key={i} style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '7px 18px', marginRight: 10, borderRadius: 999,
              border: '1px solid rgba(124,58,237,0.18)',
              background: 'rgba(124,58,237,0.05)',
              whiteSpace: 'nowrap', flexShrink: 0,
            }}>
              <Icon size={13} color="#a78bfa" strokeWidth={1.8} />
              <span style={{ fontFamily: 'var(--font-bebas)', fontSize: 12, letterSpacing: '0.14em', color: 'rgba(255,255,255,0.55)' }}>
                {tool.label}
              </span>
            </div>
          )
        })}
      </div>

      <style>{`
        @keyframes marqueeScroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  )
}
