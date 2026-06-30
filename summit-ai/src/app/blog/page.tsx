import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { blogPosts } from '@/lib/blog'
import { ArrowRight, Clock, Tag } from 'lucide-react'

export const metadata = {
  title: 'Blog — Summit AI',
  description: 'Tips, guides, and insights to help local businesses grow with AI.',
}

export default function BlogPage() {
  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <Navbar />

      <main className="flex-1 pt-28 pb-24 px-6">
        <div className="max-w-4xl mx-auto">

          <div className="text-center mb-16">
            <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: '#a8a8b3' }}>Resources</p>
            <h1 className="text-6xl font-bold tracking-wide mb-4 text-white">Summit AI Blog</h1>
            <p className="text-lg" style={{ color: '#a8a8b3' }}>Tips and guides to help local businesses grow smarter.</p>
          </div>

          <div className="space-y-5">
            {blogPosts.map(post => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group block rounded-2xl p-7 transition-all"
                style={{ background: '#0d0d0d', border: '1px solid rgba(168,168,179,0.12)' }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full" style={{ background: 'rgba(168,168,179,0.08)', color: '#a8a8b3', border: '1px solid rgba(168,168,179,0.15)' }}>
                    <Tag className="w-3 h-3 inline mr-1" />{post.category}
                  </span>
                  <span className="flex items-center gap-1 text-xs" style={{ color: '#6b6b78' }}>
                    <Clock className="w-3 h-3" />{post.readTime}
                  </span>
                  <span className="text-xs" style={{ color: '#6b6b78' }}>{new Date(post.date).toLocaleDateString('en-CA', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                </div>
                <h2 className="text-2xl font-bold text-white mb-2 group-hover:text-gray-200 transition-colors">{post.title}</h2>
                <p className="text-sm leading-relaxed mb-4" style={{ color: '#6b6b78' }}>{post.excerpt}</p>
                <span className="inline-flex items-center gap-1.5 text-sm font-medium" style={{ color: '#c8c8d4' }}>
                  Read article <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            ))}
          </div>

        </div>
      </main>

      <Footer />
    </div>
  )
}
