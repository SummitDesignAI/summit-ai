import { createClient } from '@/lib/supabase/server'
import ToolPage from '@/components/ToolPage'
import { Share2 } from 'lucide-react'

export default async function SocialMediaPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  const { data: profile } = await supabase.from('profiles').select('is_subscribed, generation_count').eq('id', user!.id).single()

  return (
    <ToolPage
      tool="social-media"
      title="Social Media Post Generator"
      description="Describe your project or upload details and get Instagram captions, Facebook posts, and hashtags ready to post."
      icon={<Share2 className="w-6 h-6" />}
      isSubscribed={profile?.is_subscribed ?? false}
      freeUsed={profile?.generation_count ?? 0}
      freeLimit={3}
      fields={[
        { key: 'business_type', label: 'Business Type', type: 'text', placeholder: 'e.g. Roofing Company, Landscaper' },
        { key: 'project_description', label: 'Project or Post Description', type: 'textarea', placeholder: 'Describe what you want to post about (e.g. just completed a full roof replacement for a client in Calgary, before/after transformation)', rows: 4 },
        { key: 'tone', label: 'Tone', type: 'select', options: ['Professional', 'Friendly & Fun', 'Inspiring', 'Local & Community-Focused'] },
        { key: 'call_to_action', label: 'Call to Action', type: 'text', placeholder: 'e.g. Call us for a free estimate!' },
      ]}
    />
  )
}
