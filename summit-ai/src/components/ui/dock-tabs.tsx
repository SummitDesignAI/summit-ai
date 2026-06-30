"use client"

import { useRef } from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import Link from "next/link"

interface NavDockItem {
  id: string
  label: string
  href: string
}

function DockNavIcon({ item, mouseX }: { item: NavDockItem; mouseX: ReturnType<typeof useMotionValue<number>> }) {
  const ref = useRef<HTMLDivElement>(null)

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 }
    return val - bounds.x - bounds.width / 2
  })

  const scaleSync = useTransform(distance, [-120, 0, 120], [1, 1.35, 1])
  const scale = useSpring(scaleSync, { mass: 0.1, stiffness: 180, damping: 14 })

  return (
    <motion.div ref={ref} style={{ scale }} className="origin-bottom">
      <Link
        href={item.href}
        className="block text-sm font-medium px-4 py-2 rounded-xl transition-colors whitespace-nowrap"
        style={{ color: '#a8a8b3' }}
        onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
        onMouseLeave={e => (e.currentTarget.style.color = '#a8a8b3')}
      >
        {item.label}
      </Link>
    </motion.div>
  )
}

const navItems: NavDockItem[] = [
  { id: "tools",   label: "Tools",   href: "/#tools" },
  { id: "pricing", label: "Pricing", href: "/#pricing" },
  { id: "why",     label: "Why Us",  href: "/#why" },
  { id: "login",   label: "Log In",  href: "/login" },
]

export function NavDock() {
  const mouseX = useMotionValue(Infinity)

  return (
    <motion.div
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className="hidden md:flex items-center gap-1 px-3 py-1.5 rounded-2xl"
      style={{ background: 'rgba(168,168,179,0.06)', border: '1px solid rgba(168,168,179,0.1)' }}
    >
      {navItems.map((item) => (
        <DockNavIcon key={item.id} item={item} mouseX={mouseX} />
      ))}
    </motion.div>
  )
}
