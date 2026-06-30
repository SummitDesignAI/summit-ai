import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import {
  Star, Share2, Mail, FileText, FileCheck,
  Megaphone, BookOpen, HelpCircle, MapPin, Crown, ArrowRight, Zap,
  Globe, Bot, Sparkles
} from 'lucide-react'

const featuredTool = {
  href: '/dashboard/marketing-assistant',
  label: 'AI Marketing Assistant',
  icon: Sparkles,
  desc: 'One prompt → Facebook post, Instagram caption, GBP post, email, SMS, blog outline, banner copy & CTA. All at once.',
  badge: 'ALL-IN-ONE',
}

const tools = [
  { href: '/dashboard/website-copy',        label: 'Website Copy Generator', icon: Globe,     desc: 'Home, About, Services, Contact, FAQs & CTAs', badge: 'NEW' },
  { href: '/dashboard/chat-assistant',       label: 'Chat Assistant Builder', icon: Bot,       desc: 'AI chatbot script trained on your business', badge: 'NEW' },
  { href: '/dashboard/review-reply',         label: 'Review Reply',           icon: Star,      desc: 'Respond to Google reviews professionally' },
  { href: '/dashboard/social-media',         label: 'Social Media',           icon: Share2,    desc: 'Instagram, Facebook posts & hashtags', badge: 'Popular' },
  { href: '/dashboard/email-writer',         label: 'Email Writer',           icon: Mail,      desc: 'Professional customer emails' },
  { href: '/dashboard/quote-generator',      label: 'Quote Generator',        icon: FileText,  desc: 'Professional estimate emails' },
  { href: '/dashboard/proposal-generator',   label: 'Proposal Generator',     icon: FileCheck, desc: 'Compelling client proposals' },
  { href: '/dashboard/slogan-generator',     label: 'Slogan Generator',       icon: Megaphone, desc: 'Catchy business slogans' },
  { href: '/dashboard/seo-blog',             label: 'SEO Blog Writer',        icon: BookOpen,  desc: 'Keyword-rich blog posts' },
  { href: '/dashboard/faq-generator',        label: 'FAQ Generator',          icon: HelpCircle,desc: 'Complete FAQ pages' },
  { href: '/dashboard/gbp-post',             label: 'GBP Post',               icon: MapPin,    desc: 'Google Business Profile posts' },
]

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user!.id)
    .single()

  const isSubscribed = profile?.is_subscribed ?? false
  const genCount = profile?.generation_count ?? 0
  const name = profile?.full_name || user?.email?.split('@')[0] || 'there'

  const { count: historyCount } = await supabase
    .from('generations')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', user!.id)

  return (
    <div>
      {/* Welcome */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-6 sm:mb-8">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold mb-1">Welcome back, {name} 👋</h1>
          <p className="text-gray-500 text-sm">What would you like to create today?</p>
        </div>
        {!isSubscribed && (
          <Link
            href="/dashboard/settings"
            className="upgrade-pro-btn px-4 py-2 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 w-full sm:w-auto"
          >
            <Crown className="w-4 h-4" />
            Upgrade to Pro
          </Link>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8">
        <div className="bg-white border border-black/8 rounded-xl p-4 sm:p-5 col-span-2 sm:col-span-1">
          <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-1">Plan</p>
          <p className="text-lg sm:text-xl font-bold flex items-center gap-2">
            {isSubscribed ? <><Crown className="w-5 h-5" /> Summit Pro</> : 'Free Plan'}
          </p>
        </div>
        <div className="bg-white border border-black/8 rounded-xl p-4 sm:p-5">
          <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-1">Generations</p>
          <p className="text-lg sm:text-xl font-bold">
            {isSubscribed ? (historyCount || 0) : `${genCount} / 3`}
            {!isSubscribed && <span className="text-xs sm:text-sm font-normal text-gray-400 ml-1 block sm:inline">free used</span>}
          </p>
        </div>
        <div className="bg-white border border-black/8 rounded-xl p-4 sm:p-5">
          <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-1">Tools</p>
          <p className="text-lg sm:text-xl font-bold">12</p>
        </div>
      </div>

      {/* Upgrade banner for free users */}
      {!isSubscribed && (
        <div className="bg-black text-white rounded-2xl p-5 sm:p-6 mb-6 sm:mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Zap className="w-4 h-4" fill="white" />
              <span className="font-bold">Unlock unlimited access</span>
            </div>
            <p className="text-gray-400 text-sm">You have {Math.max(0, 3 - genCount)} free generations left. Upgrade for $9.99 CAD/month.</p>
          </div>
          <Link
            href="/dashboard/settings"
            className="bg-white px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-gray-100 transition-colors whitespace-nowrap flex items-center justify-center gap-2 w-full sm:w-auto"
            style={{ color: '#000' }}
          >
            Upgrade Now <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      )}

      {/* Featured: AI Marketing Assistant */}
      <div className="mb-6">
        <Link
          href={featuredTool.href}
          className="block rounded-2xl p-4 sm:p-6 transition-all hover:scale-[1.01]"
          style={{
            background: 'linear-gradient(135deg, #1a0a3a 0%, #0a0a0a 60%)',
            border: '1px solid rgba(124,58,237,0.35)',
            boxShadow: '0 0 30px rgba(124,58,237,0.08)',
          }}
        >
          <div className="flex items-start gap-3 sm:gap-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center shrink-0" style={{ background: 'rgba(124,58,237,0.15)', border: '1px solid rgba(124,58,237,0.3)' }}>
              <featuredTool.icon className="w-5 h-5 sm:w-6 sm:h-6" style={{ color: '#a78bfa' }} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <p className="font-bold text-white text-sm sm:text-base">{featuredTool.label}</p>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: 'rgba(124,58,237,0.25)', color: '#a78bfa', border: '1px solid rgba(124,58,237,0.3)' }}>
                  {featuredTool.badge}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-gray-400">{featuredTool.desc}</p>
            </div>
            <ArrowRight className="w-5 h-5 text-gray-600 shrink-0 mt-0.5 hidden sm:block" />
          </div>
        </Link>
      </div>

      {/* Tools grid */}
      <h2 className="text-lg font-bold mb-4">All Tools</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        {tools.map(tool => (
          <Link
            key={tool.href}
            href={tool.href}
            className="tool-card bg-white border border-black/8 rounded-xl p-4 sm:p-5 flex items-start gap-3 sm:gap-4 hover:border-gray-300 transition-all"
          >
            <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center shrink-0">
              <tool.icon className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                <p className="font-semibold text-sm text-gray-900">{tool.label}</p>
                {tool.badge && (
                  <span
                    className="text-[9px] font-bold px-1.5 py-0.5 rounded-full"
                    style={tool.badge === 'NEW'
                      ? { background: 'rgba(124,58,237,0.1)', color: '#a78bfa', border: '1px solid rgba(124,58,237,0.2)' }
                      : { background: '#f3f4f6', color: '#6b7280' }
                    }
                  >
                    {tool.badge}
                  </span>
                )}
              </div>
              <p className="text-xs text-gray-400 mt-0.5">{tool.desc}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
