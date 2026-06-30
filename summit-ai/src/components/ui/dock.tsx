'use client'

import React from 'react'
import Link from 'next/link'
import { Home, Wrench, DollarSign, HelpCircle, LogIn } from 'lucide-react'

const navItems = [
  { icon: Home,        label: 'Home',    href: '/' },
  { icon: Wrench,      label: 'Tools',   href: '/#tools' },
  { icon: DollarSign,  label: 'Pricing', href: '/#pricing' },
  { icon: HelpCircle,  label: 'Why Us',  href: '/#why' },
  { icon: LogIn,       label: 'Log In',  href: '/login' },
]

function DockIcon({ icon: Icon, label, href }: { icon: React.FC<{ className?: string; style?: React.CSSProperties; strokeWidth?: number }>; label: string; href: string }) {
  return (
    <Link
      href={href}
      className="hover-halo group relative grid h-11 w-11 place-items-center rounded-xl ring-1 ring-white/10 bg-gradient-to-b from-neutral-800/60 to-neutral-900/70 backdrop-blur-xl shadow-lg transition-transform duration-200 hover:-translate-y-1 hover:scale-[1.05] sm:h-12 sm:w-12"
      aria-label={label}
      style={{ textDecoration: 'none', color: 'inherit' }}
    >
      <Icon className="h-4 w-4 transition-transform duration-200 group-hover:scale-110 sm:h-5 sm:w-5" style={{ color: 'rgba(255,255,255,0.85)' }} strokeWidth={2.1} />
      <span className="tooltip pointer-events-none absolute -bottom-5 text-[9px] tracking-wide text-white/60 whitespace-nowrap sm:text-[10px]">
        {label}
      </span>
    </Link>
  )
}

export function SiteNavDock() {
  return (
    <>
      <style>{`
        .hover-halo { position: relative; }
        .hover-halo::after {
          content: "";
          position: absolute;
          inset: -2px;
          border-radius: inherit;
          opacity: 0;
          transition: opacity .25s, transform .25s;
          box-shadow: 0 0 0 0 rgba(255,255,255,.18), 0 12px 30px -10px rgba(0,0,0,.7);
        }
        .hover-halo:hover::after { opacity: 1; }
        .tooltip { opacity: 0; transform: translateY(6px); transition: opacity .2s, transform .2s; }
        .group:hover .tooltip { opacity: 1; transform: translateY(0); }
      `}</style>

      <div className="flex items-center gap-2 sm:gap-3 rounded-[28px] bg-neutral-900/80 px-3 py-2 shadow-2xl ring-1 ring-white/10 backdrop-blur-lg sm:rounded-[40px] sm:px-5 sm:py-2.5">
        {navItems.map((item) => (
          <DockIcon key={item.href} icon={item.icon} label={item.label} href={item.href} />
        ))}
      </div>
    </>
  )
}

export default SiteNavDock
