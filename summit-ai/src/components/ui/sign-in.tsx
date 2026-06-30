'use client'

import React, { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'

const GoogleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 48 48">
    <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-2.641-.21-5.236-.611-7.743z" />
    <path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z" />
    <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.211 35.091 26.715 36 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z" />
    <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303c-.792 2.237-2.231 4.166-4.087 5.571l6.19 5.238C42.022 35.026 44 30.038 44 24c0-2.641-.21-5.236-.611-7.743z" />
  </svg>
)

export interface Testimonial {
  avatarSrc: string
  name: string
  handle: string
  text: string
}

interface SignInUIProps {
  logoSrc?: string
  companyName?: string
  heroImageSrc?: string
  testimonials?: Testimonial[]
  error?: string
  loading?: boolean
  googleLoading?: boolean
  onSignIn?: (e: React.FormEvent<HTMLFormElement>) => void
  onGoogleSignIn?: () => void
  onResetPassword?: () => void
  onCreateAccount?: () => void
}

const TestimonialCard = ({ t }: { t: Testimonial }) => (
  <div className="flex items-start gap-3 rounded-3xl p-5 w-64 flex-shrink-0"
    style={{ background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.1)' }}>
    <img src={t.avatarSrc} className="h-10 w-10 object-cover rounded-2xl flex-shrink-0" alt={t.name} />
    <div className="text-sm leading-snug">
      <p className="font-semibold text-white">{t.name}</p>
      <p className="text-xs mb-1" style={{ color: '#6b6b78' }}>{t.handle}</p>
      <p className="text-xs leading-relaxed" style={{ color: '#a8a8b3' }}>{t.text}</p>
    </div>
  </div>
)

export function SignInUI({
  logoSrc,
  companyName = 'Summit AI',
  heroImageSrc,
  testimonials = [],
  error,
  loading,
  googleLoading,
  onSignIn,
  onGoogleSignIn,
  onResetPassword,
  onCreateAccount,
}: SignInUIProps) {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="min-h-screen flex bg-black text-white">
      {/* Left — form */}
      <section className="flex-1 flex items-center justify-center p-8 min-h-screen">
        <div className="w-full max-w-md">
          {/* Logo + name */}
          <div className="flex flex-col items-center mb-10">
            {logoSrc && (
              <img src={logoSrc} alt={companyName} className="h-20 w-auto mb-1" />
            )}
            <p className="text-3xl font-bold tracking-widest silver-text">{companyName}</p>
          </div>

          <h1 className="text-4xl font-bold text-white mb-2">Welcome back</h1>
          <p className="text-sm mb-8" style={{ color: '#6b6b78' }}>Sign in to access your AI tools</p>

          <form className="space-y-4" onSubmit={onSignIn}>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: '#a8a8b3' }}>Email Address</label>
              <div className="rounded-2xl" style={{ border: '1px solid rgba(168,168,179,0.2)', background: 'rgba(255,255,255,0.03)' }}>
                <input name="email" type="email" placeholder="you@company.com" required
                  className="w-full bg-transparent text-sm px-4 py-3.5 rounded-2xl focus:outline-none text-white placeholder:text-[#3a3a44]" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: '#a8a8b3' }}>Password</label>
              <div className="rounded-2xl relative" style={{ border: '1px solid rgba(168,168,179,0.2)', background: 'rgba(255,255,255,0.03)' }}>
                <input name="password" type={showPassword ? 'text' : 'password'} placeholder="••••••••" required
                  className="w-full bg-transparent text-sm px-4 py-3.5 pr-12 rounded-2xl focus:outline-none text-white placeholder:text-[#3a3a44]" />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-4 flex items-center" style={{ color: '#6b6b78' }}>
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center gap-2" style={{ color: '#a8a8b3' }}>
                <input type="checkbox" name="rememberMe" className="rounded" />
                Keep me signed in
              </label>
              <button type="button" onClick={onResetPassword} className="hover:text-white transition-colors" style={{ color: '#c8c8d4' }}>
                Reset password
              </button>
            </div>

            {error && (
              <div className="rounded-xl px-4 py-3 text-sm" style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.25)', color: '#fca5a5' }}>
                {error}
              </div>
            )}

            <button type="submit" disabled={loading}
              className="w-full py-4 rounded-2xl font-bold text-sm bg-white text-black hover:bg-gray-100 transition-all disabled:opacity-50">
              {loading ? 'Signing in…' : 'Sign In'}
            </button>
          </form>

          <div className="relative flex items-center justify-center my-6">
            <span className="w-full border-t" style={{ borderColor: 'rgba(168,168,179,0.15)' }} />
            <span className="px-4 text-xs bg-black absolute" style={{ color: '#6b6b78' }}>Or continue with</span>
          </div>

          <button
            type="button"
            onClick={onGoogleSignIn}
            disabled={googleLoading}
            className="w-full flex items-center justify-center gap-3 py-3.5 rounded-2xl font-semibold text-sm transition-all text-white disabled:opacity-50"
            style={{ border: '1px solid rgba(168,168,179,0.18)', background: 'rgba(255,255,255,0.03)' }}>
            <GoogleIcon />
            {googleLoading ? 'Redirecting…' : 'Continue with Google'}
          </button>

          <p className="text-center text-sm mt-6" style={{ color: '#6b6b78' }}>
            New here?{' '}
            <button onClick={onCreateAccount} className="font-semibold hover:text-white transition-colors" style={{ color: '#c8c8d4' }}>
              Create account
            </button>
          </p>
        </div>
      </section>

      {/* Right — hero */}
      {heroImageSrc && (
        <section className="hidden lg:block flex-1 relative p-4">
          <div className="absolute inset-4 rounded-3xl bg-cover bg-center"
            style={{ backgroundImage: `url(${heroImageSrc})` }} />
          {testimonials.length > 0 && (
            <div className="absolute bottom-8 left-4 right-4 flex gap-4 justify-center">
              {testimonials.slice(0, 2).map((t, i) => (
                <TestimonialCard key={i} t={t} />
              ))}
            </div>
          )}
        </section>
      )}
    </div>
  )
}
