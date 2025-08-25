"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, TrendingDown, IndianRupeeIcon, Calendar } from "lucide-react"

interface Expense {
  id: string
  amount: number
  category: string
  date: string
  created_at: string
}

interface ExpenseOverviewProps {
  expenses: Expense[]
}

export function ExpenseOverview({ expenses }: ExpenseOverviewProps) {
  const currentMonth = new Date().getMonth()
  const currentYear = new Date().getFullYear()

  const thisMonthExpenses = expenses.filter((expense) => {
    const expenseDate = new Date(expense.date)
    return expenseDate.getMonth() === currentMonth && expenseDate.getFullYear() === currentYear
  })

  const lastMonthExpenses = expenses.filter((expense) => {
    const expenseDate = new Date(expense.date)
    const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1
    const lastMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear
    return expenseDate.getMonth() === lastMonth && expenseDate.getFullYear() === lastMonthYear
  })

  const thisMonthTotal = thisMonthExpenses.reduce((sum, expense) => sum + Number(expense.amount), 0)
  const lastMonthTotal = lastMonthExpenses.reduce((sum, expense) => sum + Number(expense.amount), 0)
  const totalExpenses = expenses.reduce((sum, expense) => sum + Number(expense.amount), 0)

  const monthlyChange = lastMonthTotal > 0 ? ((thisMonthTotal - lastMonthTotal) / lastMonthTotal) * 100 : 0
  const isIncreasing = monthlyChange > 0

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card className="backdrop-blur-xl bg-white/10 border-white/20 shadow-xl">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-gray-300">This Month</CardTitle>
          <IndianRupeeIcon className="h-4 w-4 text-purple-400" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-white">₹{thisMonthTotal.toFixed(2)}</div>
          <p className="text-xs text-gray-400">{thisMonthExpenses.length} transactions</p>
        </CardContent>
      </Card>

      <Card className="backdrop-blur-xl bg-white/10 border-white/20 shadow-xl">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-gray-300">Monthly Change</CardTitle>
          {isIncreasing ? (
            <TrendingUp className="h-4 w-4 text-red-400" />
          ) : (
            <TrendingDown className="h-4 w-4 text-green-400" />
          )}
        </CardHeader>
        <CardContent>
          <div className={`text-2xl font-bold ${isIncreasing ? "text-red-400" : "text-green-400"}`}>
            {monthlyChange > 0 ? "+" : ""}
            {monthlyChange.toFixed(1)}%
          </div>
          <p className="text-xs text-gray-400">vs last month</p>
        </CardContent>
      </Card>

      <Card className="backdrop-blur-xl bg-white/10 border-white/20 shadow-xl">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-gray-300">Total Expenses</CardTitle>
          <Calendar className="h-4 w-4 text-blue-400" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-white">₹{totalExpenses.toFixed(2)}</div>
          <p className="text-xs text-gray-400">All time</p>
        </CardContent>
      </Card>
    </div>
  )
}
