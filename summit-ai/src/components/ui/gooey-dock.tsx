"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { motion } from "framer-motion"

interface GooeyDockProps {
  className?: string
  items: {
    icon: React.ComponentType<{ className?: string }>
    label: string
    onClick?: () => void
  }[]
}

export default function GooeyDock({ items, className }: GooeyDockProps) {
  const [hovered, setHovered] = React.useState<number | null>(null)

  return (
    <div className={cn("flex items-center justify-center", className)}>
      {/* SVG goo filter */}
      <svg className="absolute h-0 w-0" aria-hidden>
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -5"
              result="goo"
            />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>

      <TooltipProvider delayDuration={100}>
        <div
          className="relative flex gap-3 px-5 py-3 rounded-2xl"
          style={{ background: 'transparent' }}
        >
          {items.map((item, i) => {
            const isHovered = hovered === i

            return (
              <Tooltip key={item.label}>
                <TooltipTrigger asChild>
                  <motion.div
                    onMouseEnter={() => setHovered(i)}
                    onMouseLeave={() => setHovered(null)}
                    animate={{ scale: isHovered ? 1.2 : 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="relative"
                  >
                    {/* Liquid blob */}
                    <motion.div
                      className="absolute inset-0 rounded-full"
                      style={{
                        filter: "url(#goo)",
                        background: 'rgba(200,200,212,0.3)',
                      }}
                      animate={{
                        scale: isHovered ? 1.8 : 1,
                        opacity: isHovered ? 1 : 0.5,
                      }}
                      transition={{ type: "spring", stiffness: 200, damping: 25 }}
                    />

                    {/* Icon button */}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="relative rounded-full h-10 w-10 text-white hover:bg-white/10 hover:text-white"
                      onClick={item.onClick}
                      style={{ color: '#fff' }}
                    >
                      <item.icon className="h-5 w-5" />
                    </Button>
                  </motion.div>
                </TooltipTrigger>
                <TooltipContent
                  side="top"
                  className="text-xs border-white/10"
                  style={{ background: 'rgba(0,0,0,0.85)', color: '#fff', backdropFilter: 'blur(8px)' }}
                >
                  {item.label}
                </TooltipContent>
              </Tooltip>
            )
          })}
        </div>
      </TooltipProvider>
    </div>
  )
}
