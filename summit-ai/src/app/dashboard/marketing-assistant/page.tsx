import { createClient } from '@/lib/supabase/server'
import ToolPage from '@/components/ToolPage'
import { Sparkles } from 'lucide-react'

export default async function MarketingAssistantPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  const { data: profile } = await supabase.from('profiles').select('is_subscribed, generation_count').eq('id', user!.id).single()

  return (
    <ToolPage
      tool="marketing-assistant"
      title="AI Marketing Assistant"
      description="One prompt. Eight pieces of marketing content — Facebook, Instagram, Google, Email, SMS, Blog, Banner copy, and a CTA. All at once."
      icon={<Sparkles className="w-6 h-6" />}
      isSubscribed={profile?.is_subscribed ?? false}
      freeUsed={profile?.generation_count ?? 0}
      freeLimit={3}
      fields={[
        { key: 'business_type', label: 'Business Type', type: 'text', placeholder: 'e.g. HVAC Company, Landscaper, Hair Salon' },
        { key: 'campaign', label: 'Campaign / Promotion', type: 'textarea', placeholder: "Describe what you're promoting — e.g. We're running a Father's Day sale on heat pump installs, 10% off until June 22nd", rows: 4 },
        { key: 'target_audience', label: 'Target Audience', type: 'text', placeholder: 'e.g. Homeowners in Calgary aged 30-60' },
        { key: 'tone', label: 'Tone', type: 'select', options: ['Professional', 'Friendly & Exciting', 'Urgent & Sales-Focused', 'Local & Community-Focused'] },
      ]}
    />
  )
}
