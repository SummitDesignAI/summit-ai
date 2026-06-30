'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, Share2, Mail, FileText, FileCheck, Megaphone, BookOpen, HelpCircle, MapPin, Globe, Bot, Sparkles } from 'lucide-react'

const INTERVAL = 10000

const tools = [
  {
    icon: Sparkles, label: 'Marketing Assistant',
    fields: [
      { label: 'Business', value: 'Peak Plumbing Co.' },
      { label: 'Promotion', value: 'Summer drain cleaning — $79 flat rate' },
      { label: 'Tone', value: 'Friendly & urgent' },
    ],
    output: [
      { channel: 'Facebook', text: 'Summer drain problems? $79 flat-rate drain cleaning all summer long at Peak Plumbing Co. Book before spots fill up!' },
      { channel: 'SMS', text: 'Hi! Peak Plumbing here — $79 drain cleaning this summer only. Reply BOOK to schedule.' },
    ],
  },
  {
    icon: Star, label: 'Review Reply',
    fields: [
      { label: 'Business', value: 'Bella Nails & Spa' },
      { label: 'Review', value: '"Waited 40 mins past my appointment."' },
      { label: 'Rating', value: '2 stars' },
    ],
    output: [
      { channel: 'Reply', text: 'Hi — we\'re truly sorry to hear about the long wait. That\'s not the experience we want for any of our guests.' },
      { channel: 'Follow-up', text: 'Please reach out at bella@bellaspa.com and we\'ll take care of you personally.' },
    ],
  },
  {
    icon: Share2, label: 'Social Media',
    fields: [
      { label: 'Business', value: 'Sunrise Bakery' },
      { label: 'Post about', value: 'New matcha croissant launch' },
      { label: 'Platform', value: 'Instagram + Facebook' },
    ],
    output: [
      { channel: 'Caption', text: 'Introducing the Matcha Croissant — our most-requested flavour is finally here. Flaky, buttery, ceremonial-grade matcha.' },
      { channel: 'Hashtags', text: '#SunriseBakery #MatchaCroissant #FreshBaked #LocalBakery' },
    ],
  },
  {
    icon: Mail, label: 'Email Writer',
    fields: [
      { label: 'Business', value: 'Apex Roofing' },
      { label: 'Email type', value: 'Follow-up after quote' },
      { label: 'Client', value: 'James Holloway' },
    ],
    output: [
      { channel: 'Subject', text: 'Following up on your roofing quote, James' },
      { channel: 'Body', text: 'Hi James, just following up on the quote this week. Happy to answer any questions — we have openings in the next two weeks.' },
    ],
  },
  {
    icon: FileText, label: 'Quote Generator',
    fields: [
      { label: 'Business', value: 'ClearView Window Cleaning' },
      { label: 'Service', value: 'Exterior clean, 18 windows' },
      { label: 'Price', value: '$220' },
    ],
    output: [
      { channel: 'Quote', text: 'Full exterior clean — 18 windows, 2 storeys · Est. 2.5 hrs · Total: $220 (tax included)' },
      { channel: 'Note', text: 'Includes streak-free guarantee + free touch-up within 7 days.' },
    ],
  },
  {
    icon: FileCheck, label: 'Proposal Generator',
    fields: [
      { label: 'Business', value: 'GreenScape Landscaping' },
      { label: 'Client', value: 'Oakwood Office Park' },
      { label: 'Service', value: 'Full-season maintenance' },
    ],
    output: [
      { channel: 'Scope', text: 'Weekly mowing · Spring/fall cleanup · Monthly mulch · Snow removal on-call · Dedicated account manager' },
      { channel: 'Investment', text: '$1,850/month · 12-month contract · 30-day cancellation clause' },
    ],
  },
  {
    icon: Megaphone, label: 'Slogan Generator',
    fields: [
      { label: 'Business', value: 'Iron & Oak Fitness' },
      { label: 'Values', value: 'Strength, community, no judgment' },
      { label: 'Audience', value: 'Adults 25–50, all levels' },
    ],
    output: [
      { channel: 'Top Pick', text: '"Strong starts here." — short, powerful, works everywhere.' },
      { channel: 'Alternates', text: '"Lift together. Grow together." · "No judgment. Just progress." · "Built for every body."' },
    ],
  },
  {
    icon: BookOpen, label: 'SEO Blog Writer',
    fields: [
      { label: 'Business', value: 'Pure Air HVAC' },
      { label: 'Topic', value: '5 signs your AC needs service' },
      { label: 'Keyword', value: 'AC repair near me' },
    ],
    output: [
      { channel: 'Intro', text: 'Don\'t wait until a sweltering July afternoon to find out your AC isn\'t working. Here are 5 signs to watch for.' },
      { channel: 'Key Points', text: 'Weak airflow · Blowing warm air · Grinding noises · High humidity · Spiking energy bills' },
    ],
  },
  {
    icon: HelpCircle, label: 'FAQ Generator',
    fields: [
      { label: 'Business', value: 'Bright Smile Dental' },
      { label: 'Service', value: 'Teeth whitening' },
      { label: 'Audience', value: 'First-time patients' },
    ],
    output: [
      { channel: 'Q: How long does it take?', text: 'In-office whitening takes 60–90 minutes. Take-home kits show results in 1–2 weeks.' },
      { channel: 'Q: Safe for sensitive teeth?', text: 'Yes — we offer a sensitivity formula and recommend a pre-treatment fluoride application.' },
    ],
  },
  {
    icon: MapPin, label: 'GBP Post',
    fields: [
      { label: 'Business', value: 'The Burger Lab' },
      { label: 'Post about', value: 'Weekend brunch menu' },
      { label: 'CTA', value: 'Come visit this weekend' },
    ],
    output: [
      { channel: 'Post', text: 'Weekend brunch just landed. Smash burgers, loaded hash browns, brunch cocktails — Sat & Sun 10am–2pm.' },
      { channel: 'Details', text: 'No reservations under 6 · Kids eat free Sundays · New menu items every week' },
    ],
  },
  {
    icon: Globe, label: 'Website Copy',
    fields: [
      { label: 'Business', value: 'Summit Law Group' },
      { label: 'Page', value: 'Homepage — About Us' },
      { label: 'Focus', value: 'Trust, experience, results' },
    ],
    output: [
      { channel: 'Headline', text: 'We fight for what matters most — your future.' },
      { channel: 'Body', text: '20 years. 1,400+ cases resolved. 96% client satisfaction. Your first consultation is free.' },
    ],
  },
  {
    icon: Bot, label: 'Chat Assistant',
    fields: [
      { label: 'Business', value: 'Swift Auto Repair' },
      { label: 'Handle', value: 'Hours, booking, pricing' },
      { label: 'Tone', value: 'Helpful & professional' },
    ],
    output: [
      { channel: 'On hours', text: '"We\'re open Mon–Fri 8am–6pm and Sat 9am–4pm. Closed Sundays."' },
      { channel: 'On booking', text: '"Book online at swiftauto.com/book or call us — same-day appointments often available!"' },
    ],
  },
]

export default function ServicesShowcase() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setIndex(i => (i + 1) % tools.length), INTERVAL)
    return () => clearInterval(id)
  }, [])

  const tool = tools[index]
  const Icon = tool.icon

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', gap: 8 }}>

      {/* Tab pills */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
        {tools.map((t, i) => {
          const T = t.icon
          return (
            <button key={i} onClick={() => setIndex(i)} style={{
              display: 'inline-flex', alignItems: 'center', gap: 3,
              padding: '2px 8px', borderRadius: 999,
              fontFamily: 'var(--font-bebas)', letterSpacing: '0.1em', fontSize: 9.5,
              border: `1px solid ${i === index ? 'rgba(167,139,250,0.45)' : 'rgba(255,255,255,0.07)'}`,
              background: i === index ? 'rgba(124,58,237,0.18)' : 'transparent',
              color: i === index ? '#a78bfa' : 'rgba(255,255,255,0.28)',
              cursor: 'pointer', transition: 'all 0.2s',
            }}>
              <T size={8} />
              {t.label}
            </button>
          )
        })}
      </div>

      {/* Card */}
      <AnimatePresence mode="wait">
        <motion.div key={index}
          initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.22 }}
          style={{
            flex: 1, borderRadius: 12, overflow: 'hidden',
            border: '1px solid rgba(124,58,237,0.2)',
            background: 'rgba(3,3,7,0.85)',
            backdropFilter: 'blur(24px)',
            display: 'flex', flexDirection: 'column',
            boxShadow: '0 0 40px rgba(124,58,237,0.08), inset 0 1px 0 rgba(255,255,255,0.03)',
          }}
        >
          {/* Header */}
          <div style={{
            padding: '8px 12px', borderBottom: '1px solid rgba(124,58,237,0.1)',
            display: 'flex', alignItems: 'center', gap: 7,
            background: 'rgba(124,58,237,0.04)',
          }}>
            <div style={{ width: 22, height: 22, borderRadius: 5, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(124,58,237,0.15)', border: '1px solid rgba(124,58,237,0.25)' }}>
              <Icon size={11} color="#a78bfa" />
            </div>
            <span style={{ fontFamily: 'var(--font-bebas)', letterSpacing: '0.16em', fontSize: 12, color: '#a78bfa' }}>
              {tool.label}
            </span>
            <div style={{ marginLeft: 'auto', display: 'flex', gap: 4 }}>
              {['#ff5f57', '#febc2e', '#28c840'].map((c, i) => <span key={i} style={{ width: 6, height: 6, borderRadius: '50%', background: c }} />)}
            </div>
          </div>

          {/* Body */}
          <div style={{ flex: 1, display: 'flex', minHeight: 0 }}>

            {/* Input panel */}
            <div style={{ width: '36%', borderRight: '1px solid rgba(255,255,255,0.04)', padding: '10px 11px', display: 'flex', flexDirection: 'column', gap: 7 }}>
              <span style={{ fontFamily: 'var(--font-bebas)', fontSize: 8.5, color: 'rgba(255,255,255,0.2)', letterSpacing: '0.18em' }}>YOUR INPUTS</span>
              {tool.fields.map((f, i) => (
                <div key={i}>
                  <span style={{ fontFamily: 'var(--font-bebas)', fontSize: 8.5, color: 'rgba(167,139,250,0.5)', letterSpacing: '0.14em', display: 'block', marginBottom: 2 }}>{f.label}</span>
                  <div style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 5, padding: '5px 7px' }}>
                    <span style={{ fontFamily: 'var(--font-bebas)', fontSize: 10.5, color: 'rgba(255,255,255,0.65)', letterSpacing: '0.06em', lineHeight: 1.4, display: 'block' }}>{f.value}</span>
                  </div>
                </div>
              ))}
              <div style={{ marginTop: 'auto' }}>
                <div style={{ background: 'linear-gradient(135deg, rgba(124,58,237,0.9), rgba(167,139,250,0.75))', borderRadius: 5, padding: '5px 8px', textAlign: 'center', boxShadow: '0 0 14px rgba(124,58,237,0.3)' }}>
                  <span style={{ fontFamily: 'var(--font-bebas)', fontSize: 11, letterSpacing: '0.16em', color: '#fff' }}>GENERATE ▶</span>
                </div>
              </div>
            </div>

            {/* Output panel */}
            <div style={{ flex: 1, padding: '10px 11px', display: 'flex', flexDirection: 'column', gap: 7 }}>
              <span style={{ fontFamily: 'var(--font-bebas)', fontSize: 8.5, color: 'rgba(255,255,255,0.2)', letterSpacing: '0.18em' }}>AI OUTPUT</span>
              {tool.output.map((item, i) => (
                <motion.div key={`${index}-${i}`}
                  initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08, duration: 0.25 }}
                >
                  <span style={{ fontFamily: 'var(--font-bebas)', fontSize: 8.5, color: 'rgba(167,139,250,0.5)', letterSpacing: '0.14em', display: 'block', marginBottom: 2 }}>{item.channel}</span>
                  <div style={{ background: 'rgba(124,58,237,0.05)', border: '1px solid rgba(124,58,237,0.12)', borderRadius: 5, padding: '6px 8px' }}>
                    <span style={{ fontFamily: 'var(--font-bebas)', fontSize: 10.5, color: 'rgba(255,255,255,0.72)', letterSpacing: '0.04em', lineHeight: 1.5, display: 'block' }}>{item.text}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Progress bar */}
          <div style={{ height: 2, background: 'rgba(255,255,255,0.04)' }}>
            <motion.div key={`bar-${index}`}
              initial={{ width: '0%' }} animate={{ width: '100%' }}
              transition={{ duration: INTERVAL / 1000, ease: 'linear' }}
              style={{ height: '100%', background: 'linear-gradient(90deg, rgba(124,58,237,0.9), rgba(167,139,250,0.4))' }}
            />
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
