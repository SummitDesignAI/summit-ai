import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { SplineScene } from '@/components/ui/splite'
import { Spotlight } from '@/components/ui/spotlight'
import GlowyWavesHero from '@/components/ui/glowy-waves-hero'
import MarqueeTicker from '@/components/ui/marquee-ticker'
import CountUpStats from '@/components/ui/count-up-stats'
import { PricingCard } from '@/components/ui/dark-gradient-pricing'
import FadeInSection from '@/components/FadeInSection'
import { Text_03 } from '@/components/ui/wave-text'
import { ShinyButton } from '@/components/ui/shiny-button'
import {
  Zap, TrendingUp, Shield, Clock, Sparkles, ArrowRight
} from 'lucide-react'
import ToolsGrid from '@/components/ToolsGrid'

const featuredTool = {
  icon: Sparkles,
  name: 'AI Marketing Assistant',
  desc: 'One prompt → Facebook post, Instagram caption, GBP post, email, SMS, blog outline, banner copy & CTA. All at once.',
  badge: 'ALL-IN-ONE',
}


export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <Navbar />

      {/* ── Hero ── */}
      <GlowyWavesHero />

      {/* ── Marquee ticker ── */}
      <MarqueeTicker />

      {/* ── Stats strip ── */}
      <section className="border-y py-10 px-6" style={{ borderColor: 'rgba(168,168,179,0.12)', background: '#080808' }}>
        <CountUpStats />
      </section>

      {/* ── How it works ── */}
      <section className="py-24 px-6" style={{ background: '#000' }}>
        <div className="max-w-5xl mx-auto">
          <FadeInSection>
            <div className="text-center mb-16">
              <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: '#a8a8b3' }}>How It Works</p>
              <h2 className="text-4xl font-bold tracking-tight text-white">Up and running in seconds</h2>
            </div>
          </FadeInSection>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 relative">
            {/* Connector line */}
            <div className="hidden md:block absolute top-8 left-[16.66%] right-[16.66%] h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(124,58,237,0.3) 20%, rgba(124,58,237,0.3) 80%, transparent)' }} />
            {[
              {
                step: '01',
                title: 'Enter your business details',
                desc: 'Tell Summit AI your business name, industry, and what you need. Takes under 30 seconds.',
              },
              {
                step: '02',
                title: 'Pick a tool',
                desc: 'Choose from 12 purpose-built tools — email, social post, review reply, SEO blog, and more.',
              },
              {
                step: '03',
                title: 'Copy and publish',
                desc: 'Your professional content is ready instantly. Copy it and paste it wherever you need it.',
              },
            ].map((item, i) => (
              <FadeInSection key={i} delay={i * 0.12}>
                <div className="flex flex-col items-center text-center px-8">
                  <div className="relative mb-6">
                    <div style={{
                      width: 56, height: 56, borderRadius: '50%',
                      border: '1px solid rgba(124,58,237,0.35)',
                      background: 'rgba(124,58,237,0.08)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      boxShadow: '0 0 30px rgba(124,58,237,0.15)',
                    }}>
                      <span style={{ fontFamily: 'var(--font-bebas)', fontSize: '1.1rem', letterSpacing: '0.1em', color: '#a78bfa' }}>{item.step}</span>
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold mb-3 text-white">{item.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: '#6b6b78' }}>{item.desc}</p>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── Tools Grid ── */}
      <section id="tools" className="py-24 px-6" style={{ background: '#050505' }}>
        <div className="max-w-6xl mx-auto">
          <FadeInSection>
            <div className="text-center mb-14">
              <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: '#a8a8b3' }}>What&apos;s Included</p>
              <h2 className="text-4xl font-bold tracking-tight mb-3 text-white">12 tools. One subscription.</h2>
              <p className="text-lg max-w-xl mx-auto" style={{ color: '#a8a8b3' }}>Everything a local business needs to communicate like a professional.</p>
            </div>
          </FadeInSection>
          {/* Featured: AI Marketing Assistant */}
          <FadeInSection className="mb-4">
            <div
              className="tool-card rounded-2xl p-6 flex items-start gap-5"
              style={{
                background: 'linear-gradient(135deg, #0d1a3a 0%, #0a0a0a 70%)',
                border: '1px solid rgba(124,58,237,0.3)',
                boxShadow: '0 0 40px rgba(124,58,237,0.07)',
              }}
            >
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0" style={{ background: 'rgba(124,58,237,0.15)', border: '1px solid rgba(124,58,237,0.3)' }}>
                <featuredTool.icon className="w-6 h-6" style={{ color: '#a78bfa' }} />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <h3 className="font-bold text-lg text-white">{featuredTool.name}</h3>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: 'rgba(124,58,237,0.2)', color: '#a78bfa', border: '1px solid rgba(124,58,237,0.3)' }}>
                    {featuredTool.badge}
                  </span>
                </div>
                <p className="text-sm leading-relaxed" style={{ color: '#a8a8b3' }}>{featuredTool.desc}</p>
              </div>
            </div>
          </FadeInSection>

          <ToolsGrid />
        </div>
      </section>

      {/* ── Why Summit AI ── */}
      <section id="why" className="py-24 px-6" style={{ background: '#000' }}>
        <div className="max-w-6xl mx-auto">
          <FadeInSection>
            <div className="text-center mb-14">
              <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: '#a8a8b3' }}>Why Summit AI</p>
              <h2 className="text-4xl font-bold tracking-tight mb-3 text-white">More tools. Less cost.<br />Zero restrictions.</h2>
              <p className="text-lg" style={{ color: '#a8a8b3' }}>Other AI tools charge more and do less.</p>
            </div>
          </FadeInSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-14">
            {[
              { icon: TrendingUp, title: 'Unlimited Generations', desc: 'No caps, no credits, no surprise overages. Generate as much as you want every day.' },
              { icon: Shield,     title: 'Cheaper Than Anyone',   desc: 'Jasper is $49/mo. ChatGPT Plus is $25/mo. We give you 12 specialized tools for $9.99 CAD.' },
              { icon: Clock,      title: 'Save Hours Every Week', desc: 'What used to take 20 minutes now takes under 10 seconds. Reclaim your time.' },
              { icon: Zap,        title: 'Built for Local Business', desc: 'Not a generic AI tool. Every feature is purpose-built for local service businesses.' },
            ].map((item, i) => (
              <FadeInSection key={i} delay={i * 0.08}>
                <div className="tool-card rounded-2xl p-6 h-full" style={{ background: '#0d0d0d', border: '1px solid rgba(168,168,179,0.12)' }}>
                  <div className="w-11 h-11 rounded-2xl flex items-center justify-center mb-4" style={{ background: 'rgba(168,168,179,0.08)', border: '1px solid rgba(168,168,179,0.15)' }}>
                    <item.icon className="w-5 h-5" style={{ color: '#c8c8d4' }} />
                  </div>
                  <h3 className="font-semibold mb-2 text-white">{item.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: '#6b6b78' }}>{item.desc}</p>
                </div>
              </FadeInSection>
            ))}
          </div>

          {/* Comparison table */}
          <FadeInSection>
          <div className="tool-card rounded-3xl p-8 overflow-x-auto" style={{ background: '#0d0d0d', border: '1px solid rgba(168,168,179,0.12)' }}>
            <h3 className="text-lg font-bold mb-6 text-center silver-text">How we compare</h3>
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left" style={{ borderBottom: '1px solid rgba(168,168,179,0.12)' }}>
                  <th className="pb-3 pr-8 font-medium" style={{ color: '#6b6b78' }}>Tool</th>
                  <th className="pb-3 px-4 font-medium text-center" style={{ color: '#6b6b78' }}>Monthly Cost</th>
                  <th className="pb-3 px-4 font-medium text-center" style={{ color: '#6b6b78' }}>Usage Limits</th>
                  <th className="pb-3 px-4 font-medium text-center" style={{ color: '#6b6b78' }}>Tools</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: 'ChatGPT Plus', cost: '$25 USD/mo', limits: 'Rate limited',  tools: 'Generic' },
                  { name: 'Jasper AI',    cost: '$49 USD/mo', limits: 'Word caps',      tools: 'Limited' },
                  { name: 'Copy.ai',      cost: '$36 USD/mo', limits: 'Credit system',  tools: 'Generic' },
                  { name: 'Summit AI',    cost: '$9.99 CAD/mo', limits: 'None',         tools: '12 business tools', highlight: true },
                ].map((row, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid rgba(168,168,179,0.06)', background: 'transparent' }}>
                    <td className="py-3.5 pr-8 font-medium" style={{ color: row.highlight ? '#ffffff' : '#6b6b78' }}>
                      {row.highlight && <span className="mr-2" style={{ color: '#e8e8f0' }}>✓</span>}{row.name}
                    </td>
                    <td className="py-3.5 px-4 text-center font-semibold" style={{ color: row.highlight ? '#e8e8f0' : '#6b6b78' }}>{row.cost}</td>
                    <td className="py-3.5 px-4 text-center font-semibold" style={{ color: row.highlight ? '#e8e8f0' : '#6b6b78' }}>{row.limits}</td>
                    <td className="py-3.5 px-4 text-center font-semibold" style={{ color: row.highlight ? '#e8e8f0' : '#6b6b78' }}>{row.tools}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          </FadeInSection>
        </div>
      </section>

      {/* ── Pricing ── */}
      <section id="pricing" className="py-24 px-6" style={{ background: '#050505' }}>
        <div className="max-w-4xl mx-auto">
          <FadeInSection>
            <div className="text-center mb-14">
              <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: '#a8a8b3' }}>Pricing</p>
              <h2 className="text-5xl font-bold tracking-wide mb-3 text-white">Simple, honest pricing</h2>
              <p className="text-lg" style={{ color: '#a8a8b3' }}>No hidden fees. No usage caps. Cancel anytime.</p>
            </div>
          </FadeInSection>
          <div className="flex flex-col md:flex-row gap-6">
            <PricingCard
              tier="Free"
              price="$0"
              period=" forever"
              bestFor="Try before you commit"
              CTA="Get Started Free"
              href="/signup"
              benefits={[
                { text: 'Preview all 12 tools', checked: true },
                { text: '3 free generations total', checked: true },
                { text: 'Copy & save results', checked: false },
                { text: 'Unlimited generations', checked: false },
                { text: 'Full history access', checked: false },
                { text: 'Priority support', checked: false },
              ]}
            />
            <PricingCard
              tier="Summit Pro"
              price="$9.99"
              period=" CAD/mo"
              bestFor="$0.33/day — less than a coffee"
              CTA="Select Package"
              href="/signup"
              highlight
              benefits={[
                { text: 'All 12 AI tools', checked: true },
                { text: 'Unlimited generations — no caps', checked: true },
                { text: 'Copy & save all results', checked: true },
                { text: 'Full generation history', checked: true },
                { text: 'Priority support', checked: true },
                { text: 'New tools as they launch', checked: true },
              ]}
            />
          </div>
          <p className="text-center text-xs mt-6" style={{ color: '#6b6b78' }}>Secure checkout via Stripe · Cancel anytime · Prices in CAD</p>
        </div>
      </section>

      {/* ── 3D Interactive Scene ── */}
      <section className="py-24 px-6" style={{ background: '#050505' }}>
        <div className="max-w-6xl mx-auto">
          <FadeInSection>
            <div className="text-center mb-10">
              <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: '#a8a8b3' }}>Experience</p>
              <h2 className="text-4xl font-bold tracking-tight text-white">Built for the future</h2>
            </div>
          </FadeInSection>
          <FadeInSection delay={0.1}>
          <div
            className="tool-card w-full rounded-3xl overflow-hidden relative"
            style={{ minHeight: '320px', background: 'rgba(0,0,0,0.96)', border: '1px solid rgba(168,168,179,0.15)' }}
          >
            <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="white" />
            <div className="flex h-full" style={{ minHeight: '320px' }}>
              <div className="flex-1 p-8 md:p-10 relative z-10 flex flex-col justify-center">
                <h3 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400">
                  AI that works<br />for you
                </h3>
                <p className="mt-4 max-w-sm text-sm md:text-base leading-relaxed" style={{ color: '#a8a8b3' }}>
                  Twelve purpose-built tools powered by Claude AI — the most capable model available. Generate professional content in seconds, not hours.
                </p>
                <Link href="/blog" className="blogs-btn mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-2xl font-bold text-sm w-fit">
                  Blogs <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="hidden md:flex flex-1 relative">
                <SplineScene
                  scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                  className="w-full h-full"
                />
              </div>
            </div>
          </div>
          </FadeInSection>
        </div>
      </section>

      <Footer />
    </div>
  )
}
