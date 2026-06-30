"use client"

import React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { Card, CardContent } from "./card"
import { CheckCircle, Clock, Circle } from "lucide-react"

export interface TimelineItem {
  title: string
  description: string
  date?: string
  image?: string
  status?: "completed" | "current" | "upcoming"
  category?: string
}

export interface TimelineProps {
  items: TimelineItem[]
  className?: string
}

const getStatusConfig = (status: TimelineItem["status"]) => {
  const configs = {
    completed: {
      progressColor: "bg-white",
      borderColor: "border-white/10",
      badgeBg: "rgba(255,255,255,0.08)",
      badgeText: "#e8e8f0",
      label: "Done",
    },
    current: {
      progressColor: "bg-[#c8c8d4]",
      borderColor: "border-[#c8c8d4]/20",
      badgeBg: "rgba(200,200,212,0.12)",
      badgeText: "#c8c8d4",
      label: "Active",
    },
    upcoming: {
      progressColor: "bg-[#6b6b78]",
      borderColor: "border-white/5",
      badgeBg: "rgba(168,168,179,0.06)",
      badgeText: "#6b6b78",
      label: "Soon",
    },
  }
  return configs[status ?? "upcoming"]
}

const getStatusIcon = (status: TimelineItem["status"]) => {
  if (status === "completed") return CheckCircle
  if (status === "current") return Clock
  return Circle
}

export function Timeline({ items, className }: TimelineProps) {
  if (!items?.length) return null

  return (
    <section className={cn("w-full max-w-3xl mx-auto px-4 sm:px-6 py-8", className)}>
      <div className="relative">
        {/* Track line */}
        <div className="absolute left-6 sm:left-8 top-0 bottom-0 w-px" style={{ background: 'rgba(168,168,179,0.12)' }} />
        {/* Animated fill */}
        <motion.div
          className="absolute left-6 sm:left-8 top-0 w-px origin-top"
          style={{ background: 'linear-gradient(to bottom, rgba(200,200,212,0.6), rgba(168,168,179,0.2))' }}
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1, transition: { duration: 1.4, ease: "easeOut", delay: 0.2 } }}
          viewport={{ once: true }}
        />

        <div className="space-y-10 relative">
          {items.map((item, index) => {
            const config = getStatusConfig(item.status)
            const Icon = getStatusIcon(item.status)
            const progress = item.status === "completed" ? "100%" : item.status === "current" ? "60%" : "20%"

            return (
              <motion.div
                key={index}
                className="relative flex items-start gap-5 sm:gap-7"
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0, transition: { duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] } }}
                viewport={{ once: true, margin: "-20px" }}
              >
                {/* Icon bubble */}
                <div className="relative z-10 flex-shrink-0 w-12 h-12 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center"
                  style={{ background: '#0d0d0d', border: '1px solid rgba(168,168,179,0.15)' }}>
                  {item.image ? (
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover rounded-2xl" loading="lazy" />
                  ) : (
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6" style={{ color: config.badgeText }} />
                  )}
                </div>

                {/* Card */}
                <motion.div className="flex-1 min-w-0" whileHover={{ y: -2 }} transition={{ duration: 0.18 }}>
                  <Card className={cn("border transition-all duration-300 hover:shadow-xl", config.borderColor)}
                    style={{ background: '#0a0a0a' }}>
                    <CardContent className="p-5 sm:p-6">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg sm:text-xl font-bold text-white mb-1">{item.title}</h3>
                          <div className="flex flex-wrap items-center gap-2 text-xs" style={{ color: '#6b6b78' }}>
                            {item.category && <span className="font-medium">{item.category}</span>}
                            {item.category && item.date && <span>·</span>}
                            {item.date && <time dateTime={item.date}>{item.date}</time>}
                          </div>
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full w-fit flex-shrink-0"
                          style={{ background: config.badgeBg, color: config.badgeText, border: `1px solid ${config.badgeText}22` }}>
                          {config.label}
                        </span>
                      </div>

                      <p className="text-sm leading-relaxed mb-4" style={{ color: '#a8a8b3' }}>{item.description}</p>

                      {/* Progress bar */}
                      <div className="h-0.5 rounded-full overflow-hidden" style={{ background: 'rgba(168,168,179,0.1)' }}>
                        <motion.div
                          className={cn("h-full rounded-full", config.progressColor)}
                          initial={{ width: 0 }}
                          whileInView={{ width: progress, transition: { duration: 1, delay: index * 0.15 + 0.5, ease: "easeOut" } }}
                          viewport={{ once: true }}
                        />
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>
            )
          })}
        </div>

        {/* End dot */}
        <motion.div
          className="absolute left-6 sm:left-8 -bottom-4 -translate-x-1/2 w-2.5 h-2.5 rounded-full"
          style={{ background: 'rgba(168,168,179,0.4)' }}
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1, transition: { duration: 0.3, delay: items.length * 0.08 + 0.4, type: "spring" } }}
          viewport={{ once: true }}
        />
      </div>
    </section>
  )
}
