'use client'

import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'

const ExperienceHero = dynamic(() => import('@/components/ui/experience-hero'), { ssr: false })

export default function MobileHeroWrapper() {
  const [isMobile, setIsMobile] = useState<boolean | null>(null)

  useEffect(() => {
    setIsMobile(window.innerWidth < 768)
  }, [])

  if (isMobile === null) return null // avoid flash
  if (!isMobile) return null         // desktop: don't render

  return <ExperienceHero />
}
