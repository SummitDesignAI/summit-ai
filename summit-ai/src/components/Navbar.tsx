'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Menu, X, Home, Wrench, DollarSign, HelpCircle, LogIn } from 'lucide-react'
import GooeyDock from '@/components/ui/gooey-dock'

const navItems = [
  { icon: Home,       label: 'Home',    href: '/' },
  { icon: Wrench,     label: 'Tools',   href: '/#tools' },
  { icon: DollarSign, label: 'Pricing', href: '/#pricing' },
  { icon: HelpCircle, label: 'Why Us',  href: '/#why' },
  { icon: LogIn,      label: 'Log In',  href: '/login' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const router = useRouter()

  const dockItems = navItems.map((item) => ({
    icon: item.icon,
    label: item.label,
    onClick: () => router.push(item.href),
  }))

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-md" style={{ borderBottom: '1px solid rgba(168,168,179,0.12)' }}>
      <div className="w-full px-8 h-16 flex items-center">
        {/* Logo — far left */}
        <Link href="/" className="flex items-center shrink-0">
          <Image src="/sai.png" alt="Summit AI" width={220} height={70} className="h-16 w-auto" priority />
        </Link>

        {/* Gooey dock — centred, desktop only */}
        <div className="flex-1 hidden md:flex items-center justify-center">
          <GooeyDock items={dockItems} />
        </div>
        <div className="flex-1 md:hidden" />

        {/* Get Started — far right */}
        <div className="hidden md:flex shrink-0">
          <Link
            href="/signup"
            className="bg-white text-sm px-5 py-2.5 rounded-xl font-semibold hover:bg-gray-100 transition-colors"
            style={{ color: '#000', textDecoration: 'none' }}
          >
            Get Started
          </Link>
        </div>

        <button className="md:hidden text-white ml-auto" onClick={() => setOpen(!open)}>
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-black border-t border-white/8 px-6 py-4 flex flex-col gap-4">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="text-sm text-gray-400 font-medium" onClick={() => setOpen(false)}>
              {item.label}
            </Link>
          ))}
          <Link
            href="/signup"
            className="bg-white text-sm px-5 py-2.5 rounded-xl font-semibold text-center"
            style={{ color: '#000', textDecoration: 'none' }}
            onClick={() => setOpen(false)}
          >
            Get Started
          </Link>
        </div>
      )}
    </nav>
  )
}
