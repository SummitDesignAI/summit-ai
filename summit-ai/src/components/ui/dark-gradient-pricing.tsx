"use client"

import { motion } from "framer-motion"
import { Check, X } from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"

interface BenefitProps {
  text: string
  checked: boolean
}

const Benefit = ({ text, checked }: BenefitProps) => (
  <div className="flex items-center gap-3">
    {checked ? (
      <span className="grid size-4 place-content-center rounded-full bg-white text-black text-sm flex-shrink-0">
        <Check className="size-2.5" />
      </span>
    ) : (
      <span className="grid size-4 place-content-center rounded-full text-sm flex-shrink-0" style={{ background: 'rgba(168,168,179,0.12)' }}>
        <X className="size-2.5" style={{ color: '#6b6b78' }} />
      </span>
    )}
    <span className="text-sm" style={{ color: checked ? '#c8c8d4' : '#6b6b78' }}>{text}</span>
  </div>
)

interface PricingCardProps {
  tier: string
  price: string
  period?: string
  bestFor: string
  CTA: string
  href: string
  benefits: Array<{ text: string; checked: boolean }>
  highlight?: boolean
}

export const PricingCard = ({ tier, price, period, bestFor, CTA, href, benefits, highlight }: PricingCardProps) => (
  <div className="flex-1" style={{ paddingTop: highlight ? '14px' : undefined, position: 'relative' }}>
    {highlight && (
      <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', zIndex: 10, background: '#000', color: '#fff', fontSize: 10, fontWeight: 700, padding: '6px 16px', borderRadius: 999, letterSpacing: '0.12em', border: '1px solid rgba(255,255,255,0.2)', whiteSpace: 'nowrap' }}>
        MOST POPULAR
      </div>
    )}
    <div
      className={cn(
        "tool-card relative h-full rounded-3xl p-8 flex flex-col",
        highlight ? "border-2 border-white" : "border"
      )}
      style={{
        background: highlight ? '#fff' : '#0d0d0d',
        borderColor: highlight ? '#fff' : 'rgba(168,168,179,0.15)',
      }}
    >

      <div className="mb-6 pb-6" style={{ borderBottom: `1px solid ${highlight ? 'rgba(0,0,0,0.1)' : 'rgba(168,168,179,0.1)'}` }}>
        <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: highlight ? '#6b6b78' : '#a8a8b3' }}>{tier}</p>
        <div className="flex items-end gap-1 mb-2">
          <span className="text-5xl font-bold" style={{ color: highlight ? '#000' : '#fff' }}>{price}</span>
          {period && <span className="text-base mb-1.5" style={{ color: highlight ? '#9ca3af' : '#6b6b78' }}>{period}</span>}
        </div>
        <p className="text-sm" style={{ color: highlight ? '#6b6b78' : '#6b6b78' }}>{bestFor}</p>
      </div>

      <div className="space-y-3.5 flex-1 mb-8">
        {benefits.map((b, i) => (
          highlight
            ? (
              <div key={i} className="flex items-center gap-3">
                <span className="grid size-4 place-content-center rounded-full bg-black text-white text-sm flex-shrink-0">
                  <Check className="size-2.5" />
                </span>
                <span className="text-sm text-gray-700">{b.text}</span>
              </div>
            )
            : <Benefit key={i} {...b} />
        ))}
      </div>

      <Link
        href={href}
        className={cn(
          "block text-center py-3.5 rounded-2xl font-bold text-sm transition-all duration-200",
          highlight ? "bg-black" : ""
        )}
        style={
          highlight
            ? { textDecoration: 'none', color: '#ffffff', border: '2px solid transparent' }
            : { border: '1px solid rgba(168,168,179,0.2)', textDecoration: 'none', color: '#ffffff' }
        }
        onMouseEnter={e => {
          const el = e.currentTarget
          el.style.background = 'rgba(124,58,237,1)'
          el.style.borderColor = 'rgba(124,58,237,1)'
          el.style.color = '#ffffff'
          el.style.boxShadow = '0 0 24px rgba(124,58,237,0.45)'
        }}
        onMouseLeave={e => {
          const el = e.currentTarget
          el.style.background = highlight ? '#000' : ''
          el.style.borderColor = highlight ? 'transparent' : 'rgba(168,168,179,0.2)'
          el.style.color = '#ffffff'
          el.style.boxShadow = ''
        }}
      >
        {CTA}
      </Link>
    </div>
  </div>
)
