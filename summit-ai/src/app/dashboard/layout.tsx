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
    <div className="flex min-h-screen bg-gray-50 overflow-x-hidden" style={{ color: '#0a0a0a' }}>
      <DashboardSidebar user={user} profile={profile} />
      <main
        className="dashboard-main flex-1 w-full max-w-full md:ml-64 px-4 sm:px-6 md:p-8 min-h-screen overflow-x-hidden"
        style={{ color: '#0a0a0a' }}
      >
        {children}
      </main>
    </div>
  )
}
