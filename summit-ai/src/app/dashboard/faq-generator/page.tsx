import { createClient } from '@/lib/supabase/server'
import ToolPage from '@/components/ToolPage'
import { HelpCircle } from 'lucide-react'

export default async function FaqGeneratorPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  const { data: profile } = await supabase.from('profiles').select('is_subscribed, generation_count').eq('id', user!.id).single()

  return (
    <ToolPage
      tool="faq-generator"
      title="FAQ Generator"
      description="Build a complete FAQ page for your business website from just a few details."
      icon={<HelpCircle className="w-6 h-6" />}
      isSubscribed={profile?.is_subscribed ?? false}
      freeUsed={profile?.generation_count ?? 0}
      freeLimit={3}
      fields={[
        { key: 'business_name', label: 'Business Name', type: 'text', placeholder: 'e.g. Summit Plumbing' },
        { key: 'business_type', label: 'Industry / Service', type: 'text', placeholder: 'e.g. Residential Plumbing, Roofing, Auto Repair' },
        { key: 'location', label: 'Location', type: 'text', placeholder: 'e.g. Calgary, AB' },
        { key: 'key_services', label: 'Key Services', type: 'textarea', placeholder: 'List your main services (e.g. pipe repair, drain cleaning, water heater installation)', rows: 3 },
      ]}
    />
  )
}
