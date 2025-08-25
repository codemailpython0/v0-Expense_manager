"use client"

import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { LogOut, Plus } from "lucide-react"

interface DashboardHeaderProps {
  user: {
    full_name?: string
    email?: string
  }
}

export function DashboardHeader({ user }: DashboardHeaderProps) {
  const router = useRouter()
  const supabase = createClient()

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push("/auth/login")
  }

  return (
    <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-6 shadow-2xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Welcome back, {user.full_name || user.email}</h1>
          <p className="text-gray-300">Here's your expense overview for today</p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            onClick={() => router.push("/expenses/add")}
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Expense
          </Button>

          <Button
            variant="outline"
            onClick={handleSignOut}
            className="border-white/20 text-white hover:bg-white/10 bg-transparent"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </div>
    </div>
  )
}
