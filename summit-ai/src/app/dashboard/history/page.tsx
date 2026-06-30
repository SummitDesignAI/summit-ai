'use client'

import { useEffect, useState } from 'react'
import { Clock, Trash2, Copy, Check, Lock } from 'lucide-react'
import Link from 'next/link'

const TOOL_LABELS: Record<string, string> = {
  'review-reply': 'Review Reply',
  'social-media': 'Social Media',
  'email-writer': 'Email Writer',
  'quote-generator': 'Quote Generator',
  'proposal-generator': 'Proposal Generator',
  'slogan-generator': 'Slogan Generator',
  'seo-blog': 'SEO Blog',
  'faq-generator': 'FAQ Generator',
  'gbp-post': 'GBP Post',
}

interface Generation {
  id: string
  tool: string
  input: string
  output: string
  created_at: string
}

export default function HistoryPage() {
  const [generations, setGenerations] = useState<Generation[]>([])
  const [loading, setLoading] = useState(true)
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [expandedId, setExpandedId] = useState<string | null>(null)

  useEffect(() => {
    fetch('/api/history')
      .then(r => r.json())
      .then(d => {
        if (d.generations) setGenerations(d.generations)
        setLoading(false)
      })
  }, [])

  const handleDelete = async (id: string) => {
    await fetch('/api/history', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    })
    setGenerations(prev => prev.filter(g => g.id !== id))
  }

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-400 text-sm">Loading history...</div>
      </div>
    )
  }

  return (
    <div className="max-w-3xl">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center">
          <Clock className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">Generation History</h1>
          <p className="text-gray-500 text-sm mt-0.5">All your saved AI generations</p>
        </div>
      </div>

      {generations.length === 0 ? (
        <div className="bg-white border border-black/8 rounded-2xl p-12 text-center">
          <Clock className="w-10 h-10 text-gray-200 mx-auto mb-3" />
          <h3 className="font-semibold text-gray-700 mb-1">No generations yet</h3>
          <p className="text-gray-400 text-sm mb-4">
            Your generations will appear here after you use any tool. History requires a Pro subscription.
          </p>
          <Link
            href="/dashboard"
            className="inline-block bg-black px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-gray-800 transition-colors"
            style={{ color: '#fff' }}
          >
            Try a Tool
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {generations.map(gen => (
            <div key={gen.id} className="bg-white border border-black/8 rounded-xl overflow-hidden">
              <div className="flex items-center justify-between px-5 py-3 border-b border-black/8">
                <div className="flex items-center gap-3">
                  <span className="bg-black text-white text-xs px-2.5 py-1 rounded-full font-medium">
                    {TOOL_LABELS[gen.tool] || gen.tool}
                  </span>
                  <span className="text-xs text-gray-400">
                    {new Date(gen.created_at).toLocaleDateString('en-CA', {
                      month: 'short', day: 'numeric', year: 'numeric',
                      hour: '2-digit', minute: '2-digit'
                    })}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleCopy(gen.output, gen.id)}
                    className="text-gray-400 hover:text-black transition-colors"
                  >
                    {copiedId === gen.id ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
                  </button>
                  <button
                    onClick={() => handleDelete(gen.id)}
                    className="text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div
                className="p-5 cursor-pointer"
                onClick={() => setExpandedId(expandedId === gen.id ? null : gen.id)}
              >
                <p className="text-xs text-gray-400 mb-2 font-medium uppercase tracking-wider">Input</p>
                <p className="text-xs text-gray-600 mb-3 line-clamp-2">{gen.input}</p>
                <p className="text-xs text-gray-400 mb-2 font-medium uppercase tracking-wider">Output</p>
                <p className={`text-sm leading-relaxed text-gray-800 ${expandedId === gen.id ? '' : 'line-clamp-3'}`}>
                  {gen.output}
                </p>
                <button className="text-xs text-gray-400 hover:text-black mt-2 transition-colors">
                  {expandedId === gen.id ? 'Show less' : 'Show more'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
