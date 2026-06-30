'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { Home, Wrench, DollarSign, HelpCircle, LogIn } from 'lucide-react'

interface DockItem {
  id: string
  icon: React.ReactNode
  label: string
  href: string
}

const dockItems: DockItem[] = [
  { id: 'home',    icon: <Home size={18} />,        label: 'Home',    href: '/' },
  { id: 'tools',   icon: <Wrench size={18} />,      label: 'Tools',   href: '/#tools' },
  { id: 'pricing', icon: <DollarSign size={18} />,  label: 'Pricing', href: '/#pricing' },
  { id: 'why',     icon: <HelpCircle size={18} />,  label: 'Why Us',  href: '/#why' },
  { id: 'login',   icon: <LogIn size={18} />,       label: 'Log In',  href: '/login' },
]

interface DockItemProps {
  item: DockItem
  isHovered: boolean
  onHover: (id: string | null) => void
}

const DockItemComponent: React.FC<DockItemProps> = ({ item, isHovered, onHover }) => (
  <div
    className="relative group"
    onMouseEnter={() => onHover(item.id)}
    onMouseLeave={() => onHover(null)}
  >
    <Link
      href={item.href}
      className={`
        relative flex items-center justify-center
        w-10 h-10 rounded-xl
        border transition-all duration-300 ease-out
        ${isHovered
          ? 'scale-110 -translate-y-1 bg-white/10 border-white/20'
          : 'bg-white/5 border-white/10 hover:bg-white/7 hover:-translate-y-0.5'
        }
      `}
      style={{
        boxShadow: isHovered ? '0 4px 24px 0 rgba(255,255,255,0.08)' : undefined,
      }}
    >
      <div className={`text-white transition-all duration-300 ${isHovered ? 'scale-105' : ''}`}>
        {item.icon}
      </div>
    </Link>

    {/* Tooltip */}
    <div className={`
      absolute -top-9 left-1/2 -translate-x-1/2
      px-2.5 py-1 rounded-md
      bg-black/80 backdrop-blur
      text-white text-xs font-normal
      border border-white/5
      transition-all duration-200
      pointer-events-none whitespace-nowrap
      ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1'}
    `}>
      {item.label}
      <div className="absolute top-full left-1/2 -translate-x-1/2">
        <div className="w-2 h-2 bg-black/80 rotate-45 border-r border-b border-white/5" />
      </div>
    </div>
  </div>
)

export const MinimalistDock: React.FC = () => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)

  return (
    <div
      className={`flex items-end gap-2.5 px-5 py-3 rounded-2xl border transition-all duration-500 ease-out ${hoveredItem ? 'scale-[1.03]' : ''}`}
      style={{
        background: 'rgba(0,0,0,0.4)',
        backdropFilter: 'blur(20px)',
        borderColor: 'rgba(255,255,255,0.1)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
      }}
    >
      {dockItems.map((item) => (
        <DockItemComponent
          key={item.id}
          item={item}
          isHovered={hoveredItem === item.id}
          onHover={setHoveredItem}
        />
      ))}
    </div>
  )
}

export default MinimalistDock
