import { ExpenseOverview } from "@/components/dashboard/expense-overview"
import { RecentTransactions } from "@/components/dashboard/recent-transactions"
import { QuickStats } from "@/components/dashboard/quick-stats"
import { ExpenseChart } from "@/components/dashboard/expense-chart"

interface User {
  full_name?: string
  email?: string
}

interface Expense {
  id: string
  title: string
  amount: number
  category: string
  description: string
  date: string
  created_at: string
}

interface DashboardContentProps {
  user: User
  expenses: Expense[]
}

export function DashboardContent({ user, expenses }: DashboardContentProps) {
  return (
    <div className="h-full overflow-y-auto">
      <div className="container mx-auto p-6 space-y-6">
        {/* Welcome Section */}
        <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-6 shadow-2xl">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Welcome back, {user.full_name || user.email}</h1>
            <p className="text-gray-300">Here's your expense overview for today</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <ExpenseOverview expenses={expenses} />
            <ExpenseChart expenses={expenses} />
          </div>

          <div className="space-y-6">
            <QuickStats expenses={expenses} />
            <RecentTransactions expenses={expenses} />
          </div>
        </div>
      </div>
    </div>
  )
}
