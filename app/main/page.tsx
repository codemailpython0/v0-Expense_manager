import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { SlidingNavigation } from "@/components/navigation/sliding-navigation"

export default async function MainPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  // Fetch user data for the sliding navigation
  const { data: expenses } = await supabase
    .from("expenses")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })

  const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single()

  const { data: categories } = await supabase.from("categories").select("*").order("name")

  return (
    <SlidingNavigation
      user={profile || { full_name: user.email, email: user.email }}
      expenses={expenses || []}
      categories={categories || []}
    />
  )
}
