"use client"

import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

interface AnimatedTextProps {
  text?: string
  className?: string
}

export function Text_03({ text = "Hover me", className = "" }: AnimatedTextProps) {
  return (
    <motion.span
      className={cn("w-full text-center inline-block cursor-pointer transition-all", className)}
      whileHover="hover"
      initial="initial"
    >
      {text.split("").map((char, index) => (
        <motion.span
          key={index}
          className="inline-block"
          variants={{
            initial: { y: 0, scale: 1 },
            hover: {
              y: -6,
              scale: 1.15,
              transition: { type: "spring", stiffness: 300, damping: 15, delay: index * 0.025 },
            },
          }}
        >
          {char === " " ? " " : char}
        </motion.span>
      ))}
    </motion.span>
  )
}
