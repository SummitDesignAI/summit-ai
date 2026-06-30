import { createClient } from '@/lib/supabase/server'
import ToolPage from '@/components/ToolPage'
import { Globe } from 'lucide-react'

export default async function WebsiteCopyPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  const { data: profile } = await supabase.from('profiles').select('is_subscribed, generation_count').eq('id', user!.id).single()

  return (
    <ToolPage
      tool="website-copy"
      title="Website Copy Generator"
      description="Generate professional copy for every page of your website — home, about, services, contact, FAQs, and CTAs."
      icon={<Globe className="w-6 h-6" />}
      isSubscribed={profile?.is_subscribed ?? false}
      freeUsed={profile?.generation_count ?? 0}
      freeLimit={3}
      fields={[
        { key: 'business_name', label: 'Business Name', type: 'text', placeholder: 'e.g. Peak Roofing Co.' },
        { key: 'business_type', label: 'Business Type & Services', type: 'textarea', placeholder: 'e.g. Residential roofing company — we do replacements, repairs, inspections, and eavestrough cleaning in Calgary, AB', rows: 3 },
        { key: 'target_audience', label: 'Target Audience', type: 'text', placeholder: 'e.g. Homeowners in Calgary aged 35-65' },
        { key: 'unique_selling_points', label: 'What Makes You Different', type: 'textarea', placeholder: 'e.g. 20 years experience, lifetime workmanship warranty, same-day quotes, family owned', rows: 3 },
        { key: 'tone', label: 'Brand Tone', type: 'select', options: ['Professional & Trustworthy', 'Friendly & Approachable', 'Bold & Confident', 'Local & Community-Focused'] },
      ]}
    />
  )
}
