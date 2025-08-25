"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface Expense {
  id: string
  amount: number
  category: string
  date: string
}

interface QuickStatsProps {
  expenses: Expense[]
}

export function QuickStats({ expenses }: QuickStatsProps) {
  // Calculate category spending
  const categoryTotals = expenses.reduce(
    (acc, expense) => {
      acc[expense.category] = (acc[expense.category] || 0) + Number(expense.amount)
      return acc
    },
    {} as Record<string, number>,
  )

  const topCategories = Object.entries(categoryTotals)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)

  const avgExpense =
    expenses.length > 0 ? expenses.reduce((sum, expense) => sum + Number(expense.amount), 0) / expenses.length : 0

  return (
    <Card className="backdrop-blur-xl bg-white/10 border-white/20 shadow-xl">
      <CardHeader>
        <CardTitle className="text-white">Quick Stats</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="text-sm text-gray-300 mb-2">Average Expense</p>
          <p className="text-2xl font-bold text-white">₹{avgExpense.toFixed(2)}</p>
        </div>

        <div>
          <p className="text-sm text-gray-300 mb-3">Top Categories</p>
          <div className="space-y-2">
            {topCategories.map(([category, amount]) => (
              <div key={category} className="flex items-center justify-between">
                <Badge variant="secondary" className="bg-white/10 text-white border-white/20">
                  {category}
                </Badge>
                <span className="text-sm text-gray-300">₹{amount.toFixed(2)}</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
