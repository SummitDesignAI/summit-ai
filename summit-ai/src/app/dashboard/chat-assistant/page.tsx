import { createClient } from '@/lib/supabase/server'
import ToolPage from '@/components/ToolPage'
import { Bot } from 'lucide-react'

export default async function ChatAssistantPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  const { data: profile } = await supabase.from('profiles').select('is_subscribed, generation_count').eq('id', user!.id).single()

  return (
    <ToolPage
      tool="chat-assistant"
      title="AI Chat Assistant Builder"
      description="Generate a complete chatbot script trained on your business — ready to embed on your website and answer visitor questions instantly."
      icon={<Bot className="w-6 h-6" />}
      isSubscribed={profile?.is_subscribed ?? false}
      freeUsed={profile?.generation_count ?? 0}
      freeLimit={3}
      fields={[
        { key: 'business_name', label: 'Business Name', type: 'text', placeholder: 'e.g. Peak Roofing Co.' },
        { key: 'business_type', label: 'Business Type & Services', type: 'textarea', placeholder: 'e.g. Residential roofing — replacements, repairs, inspections, eavestrough cleaning in Calgary', rows: 3 },
        { key: 'faqs', label: 'Common Customer Questions', type: 'textarea', placeholder: 'e.g. Do you offer free estimates? How long does a roof replacement take? Do you work in winter?', rows: 4 },
        { key: 'hours_location', label: 'Hours & Service Area', type: 'text', placeholder: 'e.g. Mon–Fri 7am–6pm, Calgary & surrounding areas' },
        { key: 'lead_goal', label: 'Main Goal of the Chatbot', type: 'select', options: ['Book a Free Estimate', 'Get a Phone Call', 'Collect Email Leads', 'Answer Questions & Build Trust'] },
      ]}
    />
  )
}
