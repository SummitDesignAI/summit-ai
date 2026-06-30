'use client'

import React, { useEffect, useRef } from 'react'
import { Star, Share2, Mail, FileText, FileCheck, Megaphone, BookOpen, HelpCircle, MapPin } from 'lucide-react'

interface BentoItemProps {
  className?: string
  children: React.ReactNode
}

const BentoItem = ({ className = '', children }: BentoItemProps) => {
  const itemRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const item = itemRef.current
    if (!item) return
    const onMove = (e: MouseEvent) => {
      const rect = item.getBoundingClientRect()
      item.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`)
      item.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`)
    }
    item.addEventListener('mousemove', onMove)
    return () => item.removeEventListener('mousemove', onMove)
  }, [])

  return (
    <div ref={itemRef} className={`bento-item ${className}`}>
      {children}
    </div>
  )
}

const items = [
  {
    icon: Star,
    title: 'Review Reply Generator',
    desc: 'Turn every Google review into a trust-building moment. Respond professionally in seconds — positive or negative.',
    span: 'col-span-2 row-span-2',
    large: true,
    badge: 'Most Popular',
  },
  {
    icon: Share2,
    title: 'Social Media Generator',
    desc: 'Instagram captions, Facebook posts, and hashtags — ready to paste.',
  },
  {
    icon: Mail,
    title: 'Customer Email Writer',
    desc: 'Polished follow-ups, apologies, and confirmations in seconds.',
  },
  {
    icon: FileCheck,
    title: 'Proposal Generator',
    desc: 'Win more clients with compelling, professional proposals.',
    span: 'row-span-2',
  },
  {
    icon: FileText,
    title: 'Quote Generator',
    desc: 'Turn a service and a price into a professional estimate clients trust.',
    span: 'col-span-2',
  },
  {
    icon: Megaphone,
    title: 'Slogan Generator',
    desc: 'Catchy, memorable slogans for your brand.',
  },
  {
    icon: BookOpen,
    title: 'SEO Blog Writer',
    desc: 'Keyword-rich posts that help customers find you on Google.',
  },
  {
    icon: HelpCircle,
    title: 'FAQ Generator',
    desc: 'Build a complete FAQ page from your business details.',
  },
  {
    icon: MapPin,
    title: 'GBP Post Generator',
    desc: 'Keep your Google Business Profile fresh and ranking.',
  },
]

export function CyberneticBentoGrid() {
  return (
    <div className="bento-grid">
      {items.map((item, i) => {
        const Icon = item.icon
        return (
          <BentoItem key={i} className={item.span ?? ''}>
            <div className="flex flex-col h-full gap-3">
              <div className="flex items-start justify-between gap-2">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: 'rgba(168,168,179,0.1)', border: '1px solid rgba(168,168,179,0.18)' }}
                >
                  <Icon className="w-5 h-5" style={{ color: '#c8c8d4' }} />
                </div>
                {item.badge && (
                  <span
                    className="text-[10px] font-bold px-2.5 py-1 rounded-full tracking-widest flex-shrink-0"
                    style={{ background: 'linear-gradient(135deg,#fff 0%,#c0c0c8 100%)', color: '#000' }}
                  >
                    {item.badge}
                  </span>
                )}
              </div>
              <div>
                <h3
                  className="font-bold text-white mb-1"
                  style={{ fontSize: item.large ? '1.35rem' : '1rem' }}
                >
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: '#6b6b78' }}>
                  {item.desc}
                </p>
              </div>
              {item.large && (
                <div
                  className="mt-auto rounded-2xl flex items-center justify-center"
                  style={{
                    height: '8rem',
                    background: 'rgba(168,168,179,0.04)',
                    border: '1px solid rgba(168,168,179,0.1)',
                    color: '#3a3a44',
                    fontSize: '0.75rem',
                    letterSpacing: '0.1em',
                  }}
                >
                  LIVE PREVIEW
                </div>
              )}
            </div>
          </BentoItem>
        )
      })}
    </div>
  )
}
