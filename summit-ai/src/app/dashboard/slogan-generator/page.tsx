import { createClient } from '@/lib/supabase/server'
import ToolPage from '@/components/ToolPage'
import { Megaphone } from 'lucide-react'

export default async function SloganGeneratorPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  const { data: profile } = await supabase.from('profiles').select('is_subscribed, generation_count').eq('id', user!.id).single()

  return (
    <ToolPage
      tool="slogan-generator"
      title="Business Slogan Generator"
      description="Generate 5 catchy, memorable slogans tailored to your business and brand personality."
      icon={<Megaphone className="w-6 h-6" />}
      isSubscribed={profile?.is_subscribed ?? false}
      freeUsed={profile?.generation_count ?? 0}
      freeLimit={3}
      fields={[
        { key: 'business_name', label: 'Business Name', type: 'text', placeholder: 'e.g. Summit Plumbing' },
        { key: 'business_type', label: 'Industry / Business Type', type: 'text', placeholder: 'e.g. Plumbing, Roofing, Landscaping, Restaurant' },
        { key: 'unique_value', label: 'What Makes You Different?', type: 'textarea', placeholder: 'e.g. 24/7 service, family-owned, lowest prices, fastest response time', rows: 2 },
        { key: 'vibe', label: 'Brand Vibe', type: 'select', options: ['Professional & Trustworthy', 'Bold & Energetic', 'Friendly & Local', 'Premium & Upscale', 'Fun & Approachable'] },
      ]}
    />
  )
}
