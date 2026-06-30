import { notFound } from 'next/navigation'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { blogPosts, getBlogPost } from '@/lib/blog'
import { ArrowLeft, Clock, Tag } from 'lucide-react'

export async function generateStaticParams() {
  return blogPosts.map(post => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getBlogPost(slug)
  if (!post) return {}
  return {
    title: `${post.title} — Summit AI Blog`,
    description: post.excerpt,
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getBlogPost(slug)
  if (!post) notFound()

  const paragraphs = post.content.split('\n\n')

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <Navbar />

      <main className="flex-1 pt-28 pb-24 px-6">
        <div className="max-w-2xl mx-auto">

          <Link href="/blog" className="inline-flex items-center gap-2 text-sm mb-10 transition-colors hover:text-white" style={{ color: '#a8a8b3' }}>
            <ArrowLeft className="w-4 h-4" /> Back to Blog
          </Link>

          <div className="flex items-center gap-3 mb-6">
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full" style={{ background: 'rgba(168,168,179,0.08)', color: '#a8a8b3', border: '1px solid rgba(168,168,179,0.15)' }}>
              <Tag className="w-3 h-3 inline mr-1" />{post.category}
            </span>
            <span className="flex items-center gap-1 text-xs" style={{ color: '#6b6b78' }}>
              <Clock className="w-3 h-3" />{post.readTime}
            </span>
            <span className="text-xs" style={{ color: '#6b6b78' }}>
              {new Date(post.date).toLocaleDateString('en-CA', { year: 'numeric', month: 'long', day: 'numeric' })}
            </span>
          </div>

          <h1 className="text-5xl font-bold tracking-wide leading-tight text-white mb-10">{post.title}</h1>

          <div className="prose-custom space-y-5">
            {paragraphs.map((block, i) => {
              if (block.startsWith('## ')) {
                return (
                  <h2 key={i} className="text-3xl font-bold text-white mt-10 mb-2">
                    {block.replace('## ', '')}
                  </h2>
                )
              }
              if (block.startsWith('**') && block.endsWith('**')) {
                return (
                  <p key={i} className="font-semibold text-white">
                    {block.replace(/\*\*/g, '')}
                  </p>
                )
              }
              if (block.startsWith('> ')) {
                return (
                  <blockquote key={i} className="border-l-2 pl-5 italic text-sm leading-relaxed" style={{ borderColor: 'rgba(168,168,179,0.3)', color: '#a8a8b3' }}>
                    {block.replace('> ', '')}
                  </blockquote>
                )
              }
              if (block.startsWith('- ')) {
                const items = block.split('\n').map(l => l.replace('- ', ''))
                return (
                  <ul key={i} className="space-y-2 pl-4">
                    {items.map((item, j) => (
                      <li key={j} className="text-sm leading-relaxed flex gap-2" style={{ color: '#a8a8b3' }}>
                        <span style={{ color: '#c8c8d4' }}>—</span>{item}
                      </li>
                    ))}
                  </ul>
                )
              }
              return (
                <p key={i} className="text-sm leading-relaxed" style={{ color: '#a8a8b3' }}>
                  {block}
                </p>
              )
            })}
          </div>

          <div className="mt-16 rounded-2xl p-7 text-center" style={{ background: '#0d0d0d', border: '1px solid rgba(168,168,179,0.12)' }}>
            <h3 className="text-2xl font-bold text-white mb-2">Try Summit AI free</h3>
            <p className="text-sm mb-5" style={{ color: '#6b6b78' }}>Nine AI tools for local businesses — $9.99 CAD/month, unlimited use.</p>
            <Link href="/signup" className="blog-cta-btn inline-flex items-center gap-2 px-7 py-3 rounded-xl font-bold text-sm">
              Get Started Free
            </Link>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  )
}
