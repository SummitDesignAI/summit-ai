import { createClient } from '@/lib/supabase/server'
import ToolPage from '@/components/ToolPage'
import { Mail } from 'lucide-react'

export default async function EmailWriterPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  const { data: profile } = await supabase.from('profiles').select('is_subscribed, generation_count').eq('id', user!.id).single()

  return (
    <ToolPage
      tool="email-writer"
      title="Customer Email Writer"
      description="Write professional, polished customer emails in seconds. Follow-ups, apologies, thank-yous, and more."
      icon={<Mail className="w-6 h-6" />}
      isSubscribed={profile?.is_subscribed ?? false}
      freeUsed={profile?.generation_count ?? 0}
      freeLimit={3}
      fields={[
        { key: 'email_type', label: 'Email Type', type: 'select', options: ['Follow-up', 'Thank You', 'Appointment Confirmation', 'Apology', 'Invoice/Payment', 'Promotional', 'Check-in'] },
        { key: 'customer_name', label: 'Customer Name', type: 'text', placeholder: 'e.g. Bob Johnson' },
        { key: 'business_name', label: 'Your Business Name', type: 'text', placeholder: 'e.g. Smith Plumbing' },
        { key: 'context', label: 'Context / Details', type: 'textarea', placeholder: 'What is this email about? Include any relevant details...', rows: 3 },
        { key: 'tone', label: 'Tone', type: 'select', options: ['Professional', 'Friendly', 'Formal', 'Apologetic'] },
      ]}
    />
  )
}
