import { createClient } from '@/lib/supabase/server'
import ToolPage from '@/components/ToolPage'
import { Star } from 'lucide-react'

export default async function ReviewReplyPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  const { data: profile } = await supabase.from('profiles').select('is_subscribed, generation_count').eq('id', user!.id).single()

  return (
    <ToolPage
      tool="review-reply"
      title="Google Review Reply Generator"
      description="Paste in any Google review and get a professional, personalized response instantly."
      icon={<Star className="w-6 h-6" />}
      isSubscribed={profile?.is_subscribed ?? false}
      freeUsed={profile?.generation_count ?? 0}
      freeLimit={3}
      fields={[
        {
          key: 'review',
          label: 'Customer Review',
          type: 'textarea',
          placeholder: 'Paste the customer review here...',
          rows: 4,
        },
        {
          key: 'business_type',
          label: 'Business Type',
          type: 'text',
          placeholder: 'e.g. Restaurant, Plumber, Hair Salon',
        },
        {
          key: 'tone',
          label: 'Response Tone',
          type: 'select',
          options: ['Professional & Warm', 'Formal', 'Friendly & Casual', 'Apologetic'],
        },
      ]}
    />
  )
}
