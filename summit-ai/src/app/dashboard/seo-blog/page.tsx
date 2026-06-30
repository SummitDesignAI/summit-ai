import { createClient } from '@/lib/supabase/server'
import ToolPage from '@/components/ToolPage'
import { BookOpen } from 'lucide-react'

export default async function SeoBlogPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  const { data: profile } = await supabase.from('profiles').select('is_subscribed, generation_count').eq('id', user!.id).single()

  return (
    <ToolPage
      tool="seo-blog"
      title="SEO Blog Writer"
      description="Generate keyword-rich blog posts that help your local business get found on Google."
      icon={<BookOpen className="w-6 h-6" />}
      isSubscribed={profile?.is_subscribed ?? false}
      freeUsed={profile?.generation_count ?? 0}
      freeLimit={3}
      fields={[
        { key: 'business_type', label: 'Business Type', type: 'text', placeholder: 'e.g. HVAC Company, Dentist, Bakery' },
        { key: 'location', label: 'Location / City', type: 'text', placeholder: 'e.g. Calgary, AB' },
        { key: 'topic', label: 'Blog Topic / Keyword', type: 'text', placeholder: 'e.g. "When to replace your furnace", "Best roofing materials for Calgary winters"' },
        { key: 'target_audience', label: 'Target Audience', type: 'text', placeholder: 'e.g. Homeowners in Calgary, restaurant owners' },
      ]}
    />
  )
}
