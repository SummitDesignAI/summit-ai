import { createClient } from '@/lib/supabase/server'
import ToolPage from '@/components/ToolPage'
import { MapPin } from 'lucide-react'

export default async function GbpPostPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  const { data: profile } = await supabase.from('profiles').select('is_subscribed, generation_count').eq('id', user!.id).single()

  return (
    <ToolPage
      tool="gbp-post"
      title="Google Business Profile Post Generator"
      description="Keep your Google Business Profile active with fresh, keyword-optimized posts that attract local customers."
      icon={<MapPin className="w-6 h-6" />}
      isSubscribed={profile?.is_subscribed ?? false}
      freeUsed={profile?.generation_count ?? 0}
      freeLimit={3}
      fields={[
        { key: 'business_name', label: 'Business Name', type: 'text', placeholder: 'e.g. Summit Roofing' },
        { key: 'business_type', label: 'Business Type', type: 'text', placeholder: 'e.g. Roofing Contractor' },
        { key: 'location', label: 'City / Area', type: 'text', placeholder: 'e.g. Calgary, AB' },
        { key: 'post_topic', label: 'Post Topic', type: 'select', options: ['New Service Offering', 'Seasonal Promotion', 'Recent Project Highlight', 'Tips & Advice', 'Business Update', 'Special Offer'] },
        { key: 'details', label: 'Details / Offer Info', type: 'textarea', placeholder: 'Any specific details, offers, or content to include...', rows: 3 },
      ]}
    />
  )
}
