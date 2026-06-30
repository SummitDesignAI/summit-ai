'use client'

import { useState, useEffect } from 'react'
import { Copy, Check, Lock, Zap, Crown } from 'lucide-react'
import Link from 'next/link'

interface Field {
  key: string
  label: string
  type: 'text' | 'textarea' | 'select'
  placeholder?: string
  options?: string[]
  rows?: number
}

interface Props {
  tool: string
  title: string
  description: string
  icon: React.ReactNode
  fields: Field[]
  isSubscribed: boolean
  freeUsed: number
  freeLimit: number
}

const LOADING_MESSAGES = [
  'Thinking...',
  'Crafting your content...',
  'Almost there...',
  'Polishing the result...',
]

function LoadingDots() {
  return (
    <span className="inline-flex gap-1 items-center">
      {[0, 1, 2].map(i => (
        <span
          key={i}
          className="w-1.5 h-1.5 rounded-full bg-white"
          style={{
            animation: `loadingBounce 1.2s ease-in-out ${i * 0.2}s infinite`,
          }}
        />
      ))}
    </span>
  )
}

function LoadingCard() {
  const [msgIndex, setMsgIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setMsgIndex(i => (i + 1) % LOADING_MESSAGES.length)
    }, 1800)
    return () => clearInterval(interval)
  }, [])

  return (
    <div
      className="rounded-2xl p-8 flex flex-col items-center justify-center gap-5 text-center"
      style={{ background: '#0a0a0a', border: '1px solid rgba(255,255,255,0.08)', minHeight: '180px' }}
    >
      {/* Pulsing ring */}
      <div className="relative flex items-center justify-center">
        <div
          className="w-14 h-14 rounded-full flex items-center justify-center"
          style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)' }}
        >
          <Zap className="w-6 h-6 text-white" style={{ animation: 'zapPulse 1.5s ease-in-out infinite' }} />
        </div>
        <div
          className="absolute inset-0 rounded-full"
          style={{
            border: '2px solid rgba(200,200,212,0.3)',
            animation: 'ringPulse 1.5s ease-out infinite',
          }}
        />
      </div>

      {/* Cycling message */}
      <p
        className="text-sm font-medium"
        style={{
          color: '#c8c8d4',
          transition: 'opacity 0.4s ease',
          minHeight: '20px',
        }}
      >
        {LOADING_MESSAGES[msgIndex]}
      </p>

      {/* Progress bar */}
      <div className="w-48 h-0.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.08)' }}>
        <div
          className="h-full rounded-full"
          style={{
            background: 'linear-gradient(90deg, #fff, #a8a8b3)',
            animation: 'progressSlide 2s ease-in-out infinite',
          }}
        />
      </div>

      <style>{`
        @keyframes loadingBounce {
          0%, 80%, 100% { transform: scale(0.6); opacity: 0.4; }
          40% { transform: scale(1); opacity: 1; }
        }
        @keyframes zapPulse {
          0%, 100% { opacity: 0.6; transform: scale(0.9); }
          50% { opacity: 1; transform: scale(1.1); }
        }
        @keyframes ringPulse {
          0% { transform: scale(1); opacity: 0.6; }
          100% { transform: scale(1.6); opacity: 0; }
        }
        @keyframes progressSlide {
          0% { width: 0%; margin-left: 0%; }
          50% { width: 60%; margin-left: 20%; }
          100% { width: 0%; margin-left: 100%; }
        }
      `}</style>
    </div>
  )
}

export default function ToolPage({ tool, title, description, icon, fields, isSubscribed, freeUsed, freeLimit }: Props) {
  const [values, setValues] = useState<Record<string, string>>({})
  const [output, setOutput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)
  const [showOutput, setShowOutput] = useState(false)

  const freeRemaining = Math.max(0, freeLimit - freeUsed)
  const canGenerate = isSubscribed || freeRemaining > 0

  const handleGenerate = async () => {
    if (!canGenerate) return
    setLoading(true)
    setError('')
    setOutput('')
    setShowOutput(false)

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tool, fields: values }),
      })

      const data = await res.json()

      if (!res.ok) {
        if (data.error === 'free_limit_reached') {
          setError('upgrade_needed')
        } else {
          setError(data.error || 'Something went wrong. Please try again.')
        }
      } else {
        setOutput(data.output)
        // Small delay so the loading animation finishes cleanly
        setTimeout(() => setShowOutput(true), 300)
      }
    } catch {
      setError('Network error — check your connection and try again.')
    }
    setLoading(false)
  }

  const handleCopy = () => {
    if (!isSubscribed) return
    navigator.clipboard.writeText(output)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const allFilled = fields.every(f => values[f.key]?.trim())

  return (
    <div className="max-w-3xl w-full">
      {/* Header */}
      <div className="flex items-start gap-3 sm:gap-4 mb-6 sm:mb-8">
        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-black rounded-xl flex items-center justify-center shrink-0 text-white">
          {icon}
        </div>
        <div className="min-w-0">
          <h1 className="text-xl sm:text-2xl font-bold">{title}</h1>
          <p className="text-gray-500 text-sm mt-1">{description}</p>
        </div>
      </div>

      {/* Free plan notice */}
      {!isSubscribed && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-3.5 sm:p-4 mb-5 sm:mb-6 flex items-start gap-2.5 sm:gap-3">
          <Crown className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <div className="text-sm">
            <span className="font-semibold text-amber-800">Free plan: </span>
            <span className="text-amber-700">{freeRemaining} of {freeLimit} free generations remaining. Results cannot be copied or saved.</span>
            {' '}
            <Link href="/dashboard/settings" className="font-bold text-amber-900 underline">Upgrade to Pro →</Link>
          </div>
        </div>
      )}

      {/* Form */}
      <div className="bg-white border border-black/8 rounded-2xl p-4 sm:p-6 mb-4">
        <div className="space-y-4 mb-6">
          {fields.map(field => (
            <div key={field.key}>
              <label className="block text-sm font-medium mb-1.5 text-gray-800">{field.label}</label>
              {field.type === 'textarea' ? (
                <textarea
                  rows={field.rows || 4}
                  value={values[field.key] || ''}
                  onChange={e => setValues(p => ({ ...p, [field.key]: e.target.value }))}
                  placeholder={field.placeholder}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent resize-none text-gray-900 bg-white placeholder:text-gray-400"
                />
              ) : field.type === 'select' ? (
                <select
                  value={values[field.key] || ''}
                  onChange={e => setValues(p => ({ ...p, [field.key]: e.target.value }))}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent bg-white text-gray-900"
                >
                  <option value="">Select {field.label.toLowerCase()}</option>
                  {field.options?.map(opt => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              ) : (
                <input
                  type="text"
                  value={values[field.key] || ''}
                  onChange={e => setValues(p => ({ ...p, [field.key]: e.target.value }))}
                  placeholder={field.placeholder}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-gray-900 bg-white placeholder:text-gray-400"
                />
              )}
            </div>
          ))}
        </div>

        <button
          onClick={handleGenerate}
          disabled={loading || !allFilled || !canGenerate}
          className="w-full py-3 rounded-xl font-semibold text-sm disabled:opacity-40 flex items-center justify-center gap-2 transition-all"
          style={{
            background: allFilled && !loading && canGenerate ? '#0a0a0a' : '#0a0a0a',
            color: '#ffffff',
          }}
          onMouseEnter={e => { if (!loading) (e.currentTarget as HTMLButtonElement).style.background = '#333' }}
          onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = '#0a0a0a' }}
        >
          {loading ? (
            <>
              <LoadingDots />
              <span className="ml-1">Generating</span>
            </>
          ) : (
            <>
              <Zap className="w-4 h-4" />
              Generate
            </>
          )}
        </button>
      </div>

      {/* Loading animation card */}
      {loading && <LoadingCard />}

      {/* Error */}
      {!loading && error === 'upgrade_needed' && (
        <div className="bg-gray-900 text-white rounded-xl p-6 text-center">
          <Lock className="w-8 h-8 mx-auto mb-3 text-gray-400" />
          <h3 className="font-bold mb-2">You&apos;ve used all 3 free generations</h3>
          <p className="text-gray-400 text-sm mb-4">Upgrade to Summit Pro for unlimited generations, copy access, and history.</p>
          <Link
            href="/dashboard/settings"
            className="inline-block bg-white px-6 py-2.5 rounded-lg font-bold text-sm hover:bg-gray-100 transition-colors"
            style={{ color: '#000' }}
          >
            Upgrade for $9.99/mo CAD
          </Link>
        </div>
      )}
      {!loading && error && error !== 'upgrade_needed' && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-sm text-red-700">{error}</div>
      )}

      {/* Output — fades in after loading */}
      {!loading && output && showOutput && (
        <div
          className="bg-white border border-black/8 rounded-2xl overflow-hidden"
          style={{ animation: 'fadeInUp 0.4s ease forwards' }}
        >
          <div className="flex items-center justify-between px-5 py-3 border-b border-black/8">
            <span className="text-sm font-semibold text-gray-800">Generated Result</span>
            {isSubscribed ? (
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-black transition-colors"
              >
                {copied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
                {copied ? 'Copied!' : 'Copy'}
              </button>
            ) : (
              <div className="flex items-center gap-1.5 text-sm text-gray-400">
                <Lock className="w-3.5 h-3.5" />
                <Link href="/dashboard/settings" className="hover:text-black transition-colors" style={{ color: 'inherit' }}>Upgrade to copy</Link>
              </div>
            )}
          </div>
          <div className={`p-5 text-sm leading-relaxed whitespace-pre-wrap relative text-gray-800 ${!isSubscribed ? 'select-none' : ''}`}>
            {!isSubscribed && (
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/20 to-white/80 pointer-events-none z-10 rounded-b-2xl" />
            )}
            {output}
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}
