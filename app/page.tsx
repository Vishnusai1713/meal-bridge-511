import FoodwiseDashboard from '@/components/foodwise-dashboard'
import AuthScreen from '@/components/auth-screen'
import { createClient } from '@/lib/supabase/server'

export default async function Page() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return <AuthScreen />

  const { data: items } = await supabase
    .from('surplus_items')
    .select('id, item, source, quantity, unit, status, expires_at')
    .order('created_at', { ascending: false })
    .limit(8)

  return <FoodwiseDashboard user={user} items={items ?? []} />
}
