'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import {
  Zap, Star, Share2, Mail, FileText, FileCheck,
  Megaphone, BookOpen, HelpCircle, MapPin, Clock, Settings, LogOut, Crown,
  Globe, Bot, Sparkles, Menu, X
} from 'lucide-react'

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: Zap, exact: true },
  { href: '/dashboard/marketing-assistant', label: 'Marketing Assistant', icon: Sparkles, featured: true },
  { href: '/dashboard/review-reply', label: 'Review Reply', icon: Star },
  { href: '/dashboard/social-media', label: 'Social Media', icon: Share2 },
  { href: '/dashboard/email-writer', label: 'Email Writer', icon: Mail },
  { href: '/dashboard/quote-generator', label: 'Quote Generator', icon: FileText },
  { href: '/dashboard/proposal-generator', label: 'Proposal Generator', icon: FileCheck },
  { href: '/dashboard/slogan-generator', label: 'Slogan Generator', icon: Megaphone },
  { href: '/dashboard/seo-blog', label: 'SEO Blog Writer', icon: BookOpen },
  { href: '/dashboard/faq-generator', label: 'FAQ Generator', icon: HelpCircle },
  { href: '/dashboard/gbp-post', label: 'GBP Post', icon: MapPin },
  { href: '/dashboard/website-copy', label: 'Website Copy', icon: Globe },
  { href: '/dashboard/chat-assistant', label: 'Chat Assistant', icon: Bot },
  { href: '/dashboard/history', label: 'History', icon: Clock },
  { href: '/dashboard/settings', label: 'Settings', icon: Settings },
]

const bottomTabs = [
  { href: '/dashboard', label: 'Home', icon: Zap, exact: true },
  { href: '/dashboard/marketing-assistant', label: 'Create', icon: Sparkles },
  { href: '/dashboard/history', label: 'History', icon: Clock },
  { href: '/dashboard/settings', label: 'Settings', icon: Settings },
]

interface NavItem {
  href: string
  label: string
  icon: React.ComponentType<{ className?: string }>
  exact?: boolean
  featured?: boolean
}

interface Props {
  user: { email?: string }
  profile: { is_subscribed?: boolean; full_name?: string } | null
}

export default function DashboardSidebar({ user, profile }: Props) {
  const pathname = usePathname()
  const router = useRouter()
  const [open, setOpen] = useState(false)

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/')
    router.refresh()
  }

  return (
    <>
      {/* Mobile top bar */}
      <div
        className="md:hidden fixed top-0 left-0 right-0 h-14 bg-white/95 backdrop-blur-md border-b border-black/8 flex items-center justify-between px-4 z-30"
        style={{ paddingTop: 'env(safe-area-inset-top)', height: 'calc(3.5rem + env(safe-area-inset-top))' }}
      >
        <Image src="/sai.png" alt="Summit AI" width={110} height={30} className="h-6 w-auto" style={{ filter: 'invert(1)' }} />
        <button
          onClick={() => setOpen(true)}
          aria-label="Open menu"
          className="w-8 h-8 bg-black rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0"
        >
          {(profile?.full_name || user.email || 'U')[0].toUpperCase()}
        </button>
      </div>

      {/* Mobile overlay */}
      {open && (
        <div
          className="md:hidden fixed inset-0 bg-black/40 z-40"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}

      <aside
        className={`fixed left-0 top-0 bottom-0 w-72 max-w-[85vw] bg-white border-r border-black/8 flex flex-col z-50 overflow-y-auto transform transition-transform duration-300 ease-in-out md:w-64 md:max-w-none md:translate-x-0 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
      {/* Logo */}
      <div className="p-5 border-b border-black/8 flex items-center justify-between">
        <Link href="/">
          <Image src="/sai.png" alt="Summit AI" width={130} height={36} className="h-8 w-auto" style={{ filter: 'invert(1)' }} />
        </Link>
        <button
          onClick={() => setOpen(false)}
          aria-label="Close menu"
          className="md:hidden flex items-center justify-center w-8 h-8 rounded-lg text-gray-500 active:bg-gray-100"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Subscription badge */}
      <div className="px-4 py-3 border-b border-black/8">
        {profile?.is_subscribed ? (
          <div className="flex items-center gap-2 bg-black text-white rounded-lg px-3 py-2 text-xs font-medium">
            <Crown className="w-3.5 h-3.5" />
            Summit Pro — Unlimited
          </div>
        ) : (
          <Link
            href="/dashboard/settings"
            className="flex items-center gap-2 bg-gray-100 text-gray-700 rounded-lg px-3 py-2 text-xs font-medium hover:bg-gray-200 transition-colors"
          >
            <Crown className="w-3.5 h-3.5" />
            Free Plan — Upgrade
          </Link>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 p-3 space-y-0.5">
        {(navItems as NavItem[]).map(item => {
          const active = item.exact ? pathname === item.href : pathname.startsWith(item.href)
          if (item.featured) {
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold transition-all mb-1"
                style={active
                  ? { background: '#2e1065', color: '#fff', border: '1px solid rgba(124,58,237,0.5)' }
                  : { background: 'rgba(124,58,237,0.08)', color: '#a78bfa', border: '1px solid rgba(124,58,237,0.2)' }
                }
              >
                <item.icon className="w-4 h-4 shrink-0" />
                {item.label}
                <span className="ml-auto text-[9px] font-bold px-1.5 py-0.5 rounded-full" style={{ background: 'rgba(124,58,237,0.2)', color: '#a78bfa' }}>ALL-IN-ONE</span>
              </Link>
            )
          }
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                active ? 'bg-black' : 'text-gray-600 hover:bg-gray-100 hover:text-black'
              }`}
              style={active ? { color: '#ffffff' } : undefined}
            >
              <item.icon className="w-4 h-4 shrink-0" />
              {item.label}
            </Link>
          )
        })}
      </nav>

      {/* User */}
      <div className="p-4 border-t border-black/8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0">
            {(profile?.full_name || user.email || 'U')[0].toUpperCase()}
          </div>
          <div className="min-w-0">
            <p className="text-xs font-semibold truncate">{profile?.full_name || 'User'}</p>
            <p className="text-xs text-gray-400 truncate">{user.email}</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-xs text-gray-500 hover:text-black transition-colors w-full py-1"
        >
          <LogOut className="w-3.5 h-3.5" />
          Sign out
        </button>
      </div>
      </aside>

      {/* Mobile bottom tab bar */}
      <nav
        className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-black/8 flex items-stretch z-30"
        style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
      >
        {bottomTabs.map(tab => {
          const active = tab.exact ? pathname === tab.href : pathname.startsWith(tab.href)
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className="flex-1 flex flex-col items-center justify-center gap-1 py-2"
              style={{ color: active ? '#7c3aed' : '#9ca3af' }}
            >
              <tab.icon className="w-5 h-5" strokeWidth={active ? 2.4 : 2} />
              <span className="text-[10px] font-medium">{tab.label}</span>
            </Link>
          )
        })}
        <button
          onClick={() => setOpen(true)}
          className="flex-1 flex flex-col items-center justify-center gap-1 py-2 text-gray-400"
        >
          <Menu className="w-5 h-5" />
          <span className="text-[10px] font-medium">More</span>
        </button>
      </nav>
    </>
  )
}
