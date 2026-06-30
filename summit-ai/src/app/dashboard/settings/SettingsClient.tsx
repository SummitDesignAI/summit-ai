'use client'

import { useState } from 'react'
import { Settings, Crown, Check, ExternalLink, CreditCard } from 'lucide-react'
import type { User } from '@supabase/supabase-js'

interface Props {
  user: User
  profile: {
    full_name?: string
    is_subscribed?: boolean
    stripe_customer_id?: string
    generation_count?: number
  } | null
}

export default function SettingsClient({ user, profile }: Props) {
  const [checkoutLoading, setCheckoutLoading] = useState(false)
  const [portalLoading, setPortalLoading] = useState(false)
  const [successParam] = useState(() => {
    if (typeof window !== 'undefined') {
      return new URLSearchParams(window.location.search).get('success')
    }
    return null
  })

  const isSubscribed = profile?.is_subscribed ?? false

  const handleUpgrade = async () => {
    setCheckoutLoading(true)
    const res = await fetch('/api/stripe/checkout', { method: 'POST' })
    const { url } = await res.json()
    if (url) window.location.href = url
    setCheckoutLoading(false)
  }

  const handlePortal = async () => {
    setPortalLoading(true)
    const res = await fetch('/api/stripe/portal', { method: 'POST' })
    const { url } = await res.json()
    if (url) window.location.href = url
    setPortalLoading(false)
  }

  return (
    <div className="max-w-2xl w-full">
      <div className="flex items-center gap-3 mb-6 sm:mb-8">
        <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center shrink-0">
          <Settings className="w-5 h-5 text-white" />
        </div>
        <div className="min-w-0">
          <h1 className="text-xl sm:text-2xl font-bold">Settings</h1>
          <p className="text-gray-500 text-sm mt-0.5">Manage your account and subscription</p>
        </div>
      </div>

      {successParam && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6 flex items-center gap-3">
          <Check className="w-5 h-5 text-green-600 shrink-0" />
          <div>
            <p className="font-semibold text-green-800 text-sm">Subscription activated!</p>
            <p className="text-green-700 text-xs mt-0.5">Welcome to Summit Pro. You now have unlimited access to all tools.</p>
          </div>
        </div>
      )}

      {/* Account info */}
      <div className="bg-white border border-black/8 rounded-2xl p-4 sm:p-6 mb-4">
        <h2 className="font-bold text-lg mb-4">Account Information</h2>
        <div className="space-y-3">
          <div className="flex items-center justify-between gap-3 py-2 border-b border-gray-100">
            <span className="text-sm text-gray-500 shrink-0">Name</span>
            <span className="text-sm font-medium truncate">{profile?.full_name || 'Not set'}</span>
          </div>
          <div className="flex items-center justify-between gap-3 py-2 border-b border-gray-100">
            <span className="text-sm text-gray-500 shrink-0">Email</span>
            <span className="text-sm font-medium truncate">{user.email}</span>
          </div>
          <div className="flex items-center justify-between gap-3 py-2">
            <span className="text-sm text-gray-500 shrink-0">Account ID</span>
            <span className="text-xs font-mono text-gray-400 truncate">{user.id.slice(0, 8)}...</span>
          </div>
        </div>
      </div>

      {/* Subscription */}
      <div className="bg-white border border-black/8 rounded-2xl p-4 sm:p-6 mb-4">
        <h2 className="font-bold text-lg mb-4">Subscription</h2>

        {isSubscribed ? (
          <div>
            <div className="flex items-center gap-3 bg-black text-white rounded-xl px-4 py-3 mb-4">
              <Crown className="w-5 h-5" />
              <div>
                <p className="font-bold text-sm">Summit Pro — Active</p>
                <p className="text-gray-400 text-xs">$9.99 CAD/month · Unlimited generations</p>
              </div>
            </div>
            <div className="space-y-2 mb-4">
              {['All 9 AI tools', 'Unlimited generations', 'Save & copy results', 'Generation history'].map(item => (
                <div key={item} className="flex items-center gap-2 text-sm text-gray-600">
                  <Check className="w-4 h-4 text-black shrink-0" />
                  {item}
                </div>
              ))}
            </div>
            <button
              onClick={handlePortal}
              disabled={portalLoading}
              className="flex items-center gap-2 text-sm text-gray-600 border border-gray-200 px-4 py-2.5 rounded-lg hover:border-black hover:text-black transition-colors disabled:opacity-50"
            >
              <CreditCard className="w-4 h-4" />
              {portalLoading ? 'Opening...' : 'Manage Billing'}
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>
        ) : (
          <div>
            <div className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 mb-5">
              <p className="font-semibold text-sm mb-1">Free Plan</p>
              <p className="text-gray-500 text-xs">
                {profile?.generation_count ?? 0} of 3 free generations used · Results cannot be copied or saved
              </p>
            </div>

            <div className="border-2 border-black rounded-2xl p-4 sm:p-6">
              <div className="flex items-start justify-between gap-3 mb-4">
                <div className="min-w-0">
                  <h3 className="font-bold text-lg">Summit Pro</h3>
                  <div className="text-2xl sm:text-3xl font-bold mt-1">$9.99 <span className="text-sm font-normal text-gray-400">CAD/month</span></div>
                  <p className="text-xs text-gray-400 mt-0.5">Less than a coffee per day · Cancel anytime</p>
                </div>
                <Crown className="w-6 h-6 text-black shrink-0" />
              </div>
              <ul className="space-y-2 mb-5">
                {[
                  'All 9 AI tools',
                  'Unlimited generations — no caps ever',
                  'Copy and save all results',
                  'Full generation history',
                  'New tools as they launch',
                  'Priority support',
                ].map(item => (
                  <li key={item} className="flex items-center gap-2 text-sm text-gray-700">
                    <Check className="w-4 h-4 text-black shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <button
                onClick={handleUpgrade}
                disabled={checkoutLoading}
                className="w-full bg-black text-white py-3 rounded-xl font-bold text-sm transition-colors disabled:opacity-50"
                style={{ transition: 'background 0.2s, color 0.2s' }}
                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(124,58,237,1)'; (e.currentTarget as HTMLButtonElement).style.color = '#000'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = ''; (e.currentTarget as HTMLButtonElement).style.color = ''; }}
              >
                {checkoutLoading ? 'Redirecting to checkout...' : 'Upgrade to Summit Pro — $9.99 CAD/mo'}
              </button>
              <p className="text-center text-xs text-gray-400 mt-3">Secure payment via Stripe · Cancel anytime · Prices in CAD</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
