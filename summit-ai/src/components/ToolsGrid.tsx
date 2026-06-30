'use client'

import { useState } from 'react'
import { Star, Share2, Mail, FileText, FileCheck, Megaphone, BookOpen, HelpCircle, MapPin, Globe, Bot, ArrowRight } from 'lucide-react'
import FadeInSection from '@/components/FadeInSection'
import Link from 'next/link'

const tools = [
  { icon: Globe,      name: 'Website Copy Generator', desc: 'Home, About, Services, Contact, FAQs & CTAs — all generated.', badge: 'NEW' },
  { icon: Bot,        name: 'Chat Assistant Builder',  desc: 'AI chatbot script trained on your business, ready to embed.', badge: 'NEW' },
  { icon: Star,       name: 'Review Reply Generator',  desc: 'Respond to any Google review professionally in seconds.' },
  { icon: Share2,     name: 'Social Media Generator',  desc: 'Instagram captions, Facebook posts, and hashtags.', badge: 'Most Popular' },
  { icon: Mail,       name: 'Customer Email Writer',   desc: 'Polished follow-ups, apologies, and confirmations.' },
  { icon: FileText,   name: 'Quote Generator',         desc: 'Turn a service and price into a professional estimate.' },
  { icon: FileCheck,  name: 'Proposal Generator',      desc: 'Win more clients with compelling proposals.' },
  { icon: Megaphone,  name: 'Slogan Generator',        desc: 'Catchy, memorable slogans for your brand.' },
  { icon: BookOpen,   name: 'SEO Blog Writer',         desc: 'Keyword-rich posts that help customers find you.' },
  { icon: HelpCircle, name: 'FAQ Generator',           desc: 'Build a complete FAQ page from your business details.' },
  { icon: MapPin,     name: 'GBP Post Generator',      desc: 'Keep your Google Business Profile fresh and active.' },
]

export default function ToolsGrid() {
  const [expanded, setExpanded] = useState(false)
  const visible = expanded ? tools : tools.slice(0, 3)

  return (
    <>
      <div className="flex flex-wrap justify-center gap-4">
        {visible.map((tool, i) => (
          <FadeInSection key={i} delay={i * 0.05} className="w-full sm:w-[calc(50%-8px)] lg:w-[calc(33.333%-11px)]">
            <div
              className="tool-card rounded-2xl p-6 relative h-full"
              style={{
                background: '#0d0d0d',
                border: tool.badge === 'NEW' ? '1px solid rgba(124,58,237,0.2)' : '1px solid rgba(168,168,179,0.12)',
                boxShadow: tool.badge === 'NEW' ? '0 0 20px rgba(124,58,237,0.04)' : undefined,
              }}
            >
              {tool.badge && (
                <span
                  className="absolute top-5 right-5 text-[10px] px-2.5 py-1 rounded-full font-bold tracking-wide"
                  style={tool.badge === 'NEW'
                    ? { background: 'rgba(124,58,237,0.15)', color: '#a78bfa', border: '1px solid rgba(124,58,237,0.25)' }
                    : { background: 'linear-gradient(135deg,#fff 0%,#c0c0c8 100%)', color: '#000' }
                  }
                >
                  {tool.badge}
                </span>
              )}
              <div
                className="w-11 h-11 rounded-2xl flex items-center justify-center mb-4"
                style={tool.badge === 'NEW'
                  ? { background: 'rgba(124,58,237,0.1)', border: '1px solid rgba(124,58,237,0.2)' }
                  : { background: 'rgba(168,168,179,0.1)', border: '1px solid rgba(168,168,179,0.15)' }
                }
              >
                <tool.icon className="w-5 h-5" style={{ color: tool.badge === 'NEW' ? '#a78bfa' : '#fff' }} />
              </div>
              <h3 className="font-semibold text-base mb-1.5 text-white">{tool.name}</h3>
              <p className="text-sm leading-relaxed" style={{ color: '#6b6b78' }}>{tool.desc}</p>
            </div>
          </FadeInSection>
        ))}
      </div>

      {!expanded && (
        <div className="text-center mt-10">
          <button
            onClick={() => setExpanded(true)}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-semibold text-sm transition-all duration-200"
            style={{ border: '1px solid rgba(124,58,237,0.35)', background: 'rgba(124,58,237,0.08)', color: '#a78bfa' }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(124,58,237,1)'; e.currentTarget.style.color = '#fff'; e.currentTarget.style.boxShadow = '0 0 24px rgba(124,58,237,0.4)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(124,58,237,0.08)'; e.currentTarget.style.color = '#a78bfa'; e.currentTarget.style.boxShadow = ''; }}
          >
            Explore All 12 Tools <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </>
  )
}
