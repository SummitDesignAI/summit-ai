import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import DashboardSidebar from '@/components/DashboardSidebar'

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  return (
    <div className="flex min-h-screen bg-gray-50" style={{ color: '#0a0a0a' }}>
      <DashboardSidebar user={user} profile={profile} />
      <main className="flex-1 ml-64 p-8 min-h-screen" style={{ color: '#0a0a0a' }}>
        {children}
      </main>
    </div>
  )
}
