import { createClient } from '@/lib/supabase/server'
import ToolPage from '@/components/ToolPage'
import { FileText } from 'lucide-react'

export default async function QuoteGeneratorPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  const { data: profile } = await supabase.from('profiles').select('is_subscribed, generation_count').eq('id', user!.id).single()

  return (
    <ToolPage
      tool="quote-generator"
      title="Quote Generator"
      description="Enter your service details and get a professional estimate email ready to send to your client."
      icon={<FileText className="w-6 h-6" />}
      isSubscribed={profile?.is_subscribed ?? false}
      freeUsed={profile?.generation_count ?? 0}
      freeLimit={3}
      fields={[
        { key: 'client_name', label: 'Client Name', type: 'text', placeholder: 'e.g. Bob Johnson' },
        { key: 'business_name', label: 'Your Business Name', type: 'text', placeholder: 'e.g. Smith Plumbing' },
        { key: 'service', label: 'Service / Work Description', type: 'textarea', placeholder: 'e.g. Replace hot water tank, install new 50-gallon unit', rows: 3 },
        { key: 'price', label: 'Price / Estimate', type: 'text', placeholder: 'e.g. $1,800' },
        { key: 'timeline', label: 'Estimated Timeline', type: 'text', placeholder: 'e.g. 1 day, 3-5 business days' },
        { key: 'tone', label: 'Tone', type: 'select', options: ['Professional', 'Friendly & Professional', 'Formal'] },
      ]}
    />
  )
}
