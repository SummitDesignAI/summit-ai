'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Eye, EyeOff, Check } from 'lucide-react'

const GoogleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 48 48">
    <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-2.641-.21-5.236-.611-7.743z" />
    <path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z" />
    <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.211 35.091 26.715 36 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z" />
    <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303c-.792 2.237-2.231 4.166-4.087 5.571l6.19 5.238C42.022 35.026 44 30.038 44 24c0-2.641-.21-5.236-.611-7.743z" />
  </svg>
)

export default function SignupPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)

  const handleGoogleSignIn = async () => {
    setGoogleLoading(true)
    setError('')
    const supabase = createClient()
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    })
    if (error) {
      setError(error.message)
      setGoogleLoading(false)
    }
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    const supabase = createClient()
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: name },
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    })
    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      setSuccess(true)
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center px-4">
        <div className="w-full max-w-md text-center">
          <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6" style={{ background: 'rgba(200,200,212,0.1)', border: '1px solid rgba(200,200,212,0.2)' }}>
            <Check className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Check your email</h1>
          <p className="text-sm mb-6" style={{ color: '#6b6b78' }}>
            We sent a confirmation link to <strong className="text-white">{email}</strong>. Click it to activate your account.
          </p>
          <Link href="/login" className="text-sm font-semibold hover:text-white transition-colors" style={{ color: '#c8c8d4' }}>
            Back to login
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex flex-col items-center mb-10">
          <Link href="/">
            <Image src="/sai.png" alt="Summit AI" width={160} height={60} className="h-16 w-auto mb-1" />
          </Link>
          <p className="text-2xl font-bold tracking-widest silver-text">Summit AI</p>
        </div>

        <h1 className="text-4xl font-bold text-white mb-2">Create your account</h1>
        <p className="text-sm mb-8" style={{ color: '#6b6b78' }}>Start free — upgrade to Pro anytime</p>

        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: '#a8a8b3' }}>Full Name</label>
            <div className="rounded-2xl" style={{ border: '1px solid rgba(168,168,179,0.2)', background: 'rgba(255,255,255,0.03)' }}>
              <input type="text" value={name} onChange={e => setName(e.target.value)} required placeholder="Jane Smith"
                className="w-full bg-transparent text-sm px-4 py-3.5 rounded-2xl focus:outline-none text-white placeholder:text-[#3a3a44]" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: '#a8a8b3' }}>Email Address</label>
            <div className="rounded-2xl" style={{ border: '1px solid rgba(168,168,179,0.2)', background: 'rgba(255,255,255,0.03)' }}>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="you@company.com"
                className="w-full bg-transparent text-sm px-4 py-3.5 rounded-2xl focus:outline-none text-white placeholder:text-[#3a3a44]" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: '#a8a8b3' }}>Password</label>
            <div className="rounded-2xl relative" style={{ border: '1px solid rgba(168,168,179,0.2)', background: 'rgba(255,255,255,0.03)' }}>
              <input type={showPass ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} required minLength={6} placeholder="Min 6 characters"
                className="w-full bg-transparent text-sm px-4 py-3.5 pr-12 rounded-2xl focus:outline-none text-white placeholder:text-[#3a3a44]" />
              <button type="button" onClick={() => setShowPass(!showPass)} className="absolute inset-y-0 right-4 flex items-center" style={{ color: '#6b6b78' }}>
                {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {error && (
            <div className="rounded-xl px-4 py-3 text-sm" style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.25)', color: '#fca5a5' }}>
              {error}
            </div>
          )}

          <button type="submit" disabled={loading}
            className="w-full py-4 rounded-2xl font-bold text-sm bg-white hover:bg-gray-100 transition-all disabled:opacity-50 mt-2"
            style={{ color: '#000' }}>
            {loading ? 'Creating account…' : 'Create Free Account'}
          </button>
        </form>

        <div className="relative flex items-center justify-center my-6">
          <span className="w-full border-t" style={{ borderColor: 'rgba(168,168,179,0.15)' }} />
          <span className="px-4 text-xs bg-black absolute" style={{ color: '#6b6b78' }}>Or continue with</span>
        </div>

        <button
          type="button"
          onClick={handleGoogleSignIn}
          disabled={googleLoading}
          className="w-full flex items-center justify-center gap-3 py-3.5 rounded-2xl font-semibold text-sm transition-all text-white disabled:opacity-50"
          style={{ border: '1px solid rgba(168,168,179,0.18)', background: 'rgba(255,255,255,0.03)' }}>
          <GoogleIcon />
          {googleLoading ? 'Redirecting…' : 'Continue with Google'}
        </button>

        <div className="mt-5 flex items-center gap-2 text-xs" style={{ color: '#6b6b78' }}>
          <Check className="w-3.5 h-3.5 flex-shrink-0" style={{ color: '#c8c8d4' }} />
          Free plan — no credit card required
        </div>

        <p className="text-center text-sm mt-6" style={{ color: '#6b6b78' }}>
          Already have an account?{' '}
          <Link href="/login" className="font-semibold hover:text-white transition-colors" style={{ color: '#c8c8d4' }}>
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}
