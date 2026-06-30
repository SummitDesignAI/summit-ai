import Link from 'next/link'
import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="py-14 text-white" style={{ background: '#000', borderTop: '1px solid rgba(168,168,179,0.12)' }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
          <div className="col-span-1 md:col-span-2">
            <Image src="/sai.png" alt="Summit AI" width={200} height={56} className="h-14 w-auto mb-2" />
            <p className="font-semibold tracking-widest silver-text text-base mb-3">Summit AI</p>
            <p className="text-sm leading-relaxed max-w-xs" style={{ color: '#6b6b78' }}>
              AI-powered tools built for local businesses. One subscription, unlimited possibilities.
            </p>
          </div>
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: '#6b6b78' }}>Product</h4>
            <ul className="space-y-2.5 text-sm" style={{ color: '#a8a8b3' }}>
              <li><Link href="/#tools"   className="hover:text-white transition-colors">Tools</Link></li>
              <li><Link href="/#pricing" className="hover:text-white transition-colors">Pricing</Link></li>
              <li><Link href="/#why"     className="hover:text-white transition-colors">Why Summit AI</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: '#6b6b78' }}>Account</h4>
            <ul className="space-y-2.5 text-sm" style={{ color: '#a8a8b3' }}>
              <li><Link href="/login"     className="hover:text-white transition-colors">Log In</Link></li>
              <li><Link href="/signup"    className="hover:text-white transition-colors">Sign Up</Link></li>
              <li><Link href="/dashboard" className="hover:text-white transition-colors">Dashboard</Link></li>
            </ul>
          </div>
        </div>
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-3" style={{ borderTop: '1px solid rgba(168,168,179,0.1)' }}>
          <p className="text-xs" style={{ color: '#6b6b78' }}>© 2025 Summit AI. All rights reserved.</p>
          <p className="text-xs" style={{ color: '#6b6b78' }}>Prices in CAD · Cancel anytime · Powered by Claude AI</p>
        </div>
      </div>
    </footer>
  )
}
