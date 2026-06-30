"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { Calendar, CreditCard, Lock } from "lucide-react"
import { useState } from "react"

interface GlassCheckoutCardProps {
  amount?: number
  className?: string
  onPay?: () => void
}

export function GlassCheckoutCard({ amount = 9.99, className, onPay }: GlassCheckoutCardProps) {
  const [paymentMethod, setPaymentMethod] = useState("card")

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={cn("w-full max-w-[420px]", className)}
    >
      <div
        className="relative overflow-hidden rounded-3xl p-7"
        style={{
          background: 'rgba(13,13,13,0.7)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(168,168,179,0.18)',
        }}
      >
        <div className="mb-6">
          <h3 className="text-xl font-bold text-white">Payment Details</h3>
          <p className="text-sm mt-1" style={{ color: '#6b6b78' }}>Summit Pro — $9.99 CAD/month</p>
        </div>

        {/* Payment method tabs */}
        <div className="grid grid-cols-3 gap-2 mb-6">
          {["card", "paypal", "apple"].map((method) => (
            <button
              key={method}
              onClick={() => setPaymentMethod(method)}
              className={cn(
                "flex h-11 items-center justify-center rounded-xl border transition-all text-sm font-medium",
              )}
              style={{
                borderColor: paymentMethod === method ? 'rgba(200,200,212,0.5)' : 'rgba(168,168,179,0.15)',
                background: paymentMethod === method ? 'rgba(200,200,212,0.1)' : 'rgba(255,255,255,0.02)',
                color: paymentMethod === method ? '#c8c8d4' : '#6b6b78',
              }}
            >
              {method === "card" && <CreditCard className="h-4 w-4" />}
              {method === "paypal" && <span className="font-bold italic text-xs">Pay</span>}
              {method === "apple" && <span className="font-semibold text-xs"> Pay</span>}
            </button>
          ))}
        </div>

        <div className="space-y-4">
          <div className="space-y-1.5">
            <Label className="text-xs font-medium" style={{ color: '#a8a8b3' }}>Card Number</Label>
            <div className="relative">
              <Input
                placeholder="0000 0000 0000 0000"
                className="pl-10 text-sm text-white"
                style={{ background: 'rgba(255,255,255,0.04)', borderColor: 'rgba(168,168,179,0.15)', color: '#fff' }}
              />
              <CreditCard className="absolute left-3 top-2.5 h-4 w-4" style={{ color: '#6b6b78' }} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label className="text-xs font-medium" style={{ color: '#a8a8b3' }}>Expiry</Label>
              <div className="relative">
                <Input placeholder="MM/YY" className="pl-10 text-sm"
                  style={{ background: 'rgba(255,255,255,0.04)', borderColor: 'rgba(168,168,179,0.15)', color: '#fff' }} />
                <Calendar className="absolute left-3 top-2.5 h-4 w-4" style={{ color: '#6b6b78' }} />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs font-medium" style={{ color: '#a8a8b3' }}>CVC</Label>
              <div className="relative">
                <Input placeholder="123" className="pl-10 text-sm"
                  style={{ background: 'rgba(255,255,255,0.04)', borderColor: 'rgba(168,168,179,0.15)', color: '#fff' }} />
                <Lock className="absolute left-3 top-2.5 h-4 w-4" style={{ color: '#6b6b78' }} />
              </div>
            </div>
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs font-medium" style={{ color: '#a8a8b3' }}>Cardholder Name</Label>
            <Input placeholder="Jane Smith" className="text-sm"
              style={{ background: 'rgba(255,255,255,0.04)', borderColor: 'rgba(168,168,179,0.15)', color: '#fff' }} />
          </div>
        </div>

        <button
          onClick={onPay}
          className="mt-6 w-full py-3.5 rounded-2xl font-bold text-sm bg-white text-black hover:bg-gray-100 transition-all"
        >
          Pay ${amount.toFixed(2)} CAD
        </button>

        <p className="mt-4 text-center text-xs" style={{ color: '#6b6b78' }}>
          <Lock className="inline-block h-3 w-3 mr-1" />
          Payments processed securely via Stripe
        </p>
      </div>
    </motion.div>
  )
}
