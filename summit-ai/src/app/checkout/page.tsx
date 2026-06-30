'use client'

import Link from 'next/link'
import Image from 'next/image'
import { GlassCheckoutCard } from '@/components/ui/glass-checkout-card-shadcnui'
import { ArrowLeft, Check } from 'lucide-react'

export default function CheckoutPage() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Top bar */}
      <div className="px-8 py-5 flex items-center gap-4" style={{ borderBottom: '1px solid rgba(168,168,179,0.1)' }}>
        <Link href="/#pricing" className="flex items-center gap-2 text-sm transition-colors hover:text-white" style={{ color: '#6b6b78' }}>
          <ArrowLeft className="w-4 h-4" /> Back
        </Link>
        <div className="flex items-center gap-2 ml-auto">
          <Image src="/sai.png" alt="Summit AI" width={80} height={30} className="h-8 w-auto" />
          <span className="text-sm font-bold tracking-widest silver-text">Summit AI</span>
        </div>
      </div>

      <div className="flex-1 flex flex-col lg:flex-row items-center justify-center gap-16 px-6 py-16">
        {/* Order summary */}
        <div className="max-w-sm w-full">
          <p className="text-xs font-bold uppercase tracking-widest mb-6" style={{ color: '#a8a8b3' }}>Order Summary</p>
          <div className="rounded-3xl p-7 mb-6" style={{ background: '#0d0d0d', border: '1px solid rgba(168,168,179,0.15)' }}>
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="font-bold text-white text-lg">Summit Pro</p>
                <p className="text-sm" style={{ color: '#6b6b78' }}>Monthly subscription</p>
              </div>
              <p className="font-bold text-white">$9.99 CAD</p>
            </div>
            <div className="space-y-2 pt-4" style={{ borderTop: '1px solid rgba(168,168,179,0.1)' }}>
              {['All 9 AI tools', 'Unlimited generations', 'Copy & save results', 'Full history', 'Priority support'].map((f, i) => (
                <div key={i} className="flex items-center gap-2 text-sm" style={{ color: '#a8a8b3' }}>
                  <Check className="w-3.5 h-3.5 flex-shrink-0" style={{ color: '#c8c8d4' }} />
                  {f}
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-between text-sm mb-2" style={{ color: '#6b6b78' }}>
            <span>Subtotal</span><span>$9.99 CAD</span>
          </div>
          <div className="flex justify-between font-bold text-white text-base pt-3" style={{ borderTop: '1px solid rgba(168,168,179,0.1)' }}>
            <span>Total today</span><span>$9.99 CAD</span>
          </div>
          <p className="text-xs mt-4" style={{ color: '#6b6b78' }}>Cancel anytime · Renews monthly · Prices in CAD</p>
        </div>

        {/* Checkout card */}
        <GlassCheckoutCard
          amount={9.99}
          onPay={() => window.location.href = '/api/stripe/checkout'}
        />
      </div>
    </div>
  )
}
