import { createClient } from '@/lib/supabase/server'
import ToolPage from '@/components/ToolPage'
import { FileCheck } from 'lucide-react'

export default async function ProposalGeneratorPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  const { data: profile } = await supabase.from('profiles').select('is_subscribed, generation_count').eq('id', user!.id).single()

  return (
    <ToolPage
      tool="proposal-generator"
      title="Proposal Generator"
      description="Turn your service details into a compelling, professional client proposal that wins business."
      icon={<FileCheck className="w-6 h-6" />}
      isSubscribed={profile?.is_subscribed ?? false}
      freeUsed={profile?.generation_count ?? 0}
      freeLimit={3}
      fields={[
        { key: 'client_name', label: 'Client / Company Name', type: 'text', placeholder: 'e.g. Johnson Enterprises' },
        { key: 'business_name', label: 'Your Business Name', type: 'text', placeholder: 'e.g. Smith Roofing Ltd.' },
        { key: 'service_scope', label: 'Scope of Work', type: 'textarea', placeholder: 'Describe exactly what services you will provide...', rows: 4 },
        { key: 'investment', label: 'Total Investment', type: 'text', placeholder: 'e.g. $12,500' },
        { key: 'timeline', label: 'Project Timeline', type: 'text', placeholder: 'e.g. 2 weeks, starting July 15' },
        { key: 'differentiator', label: 'Why Choose You?', type: 'textarea', placeholder: 'e.g. 15 years experience, licensed, insured, 5-year warranty', rows: 2 },
      ]}
    />
  )
}
