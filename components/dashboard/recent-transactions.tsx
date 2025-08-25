"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { formatDistanceToNow } from "date-fns"

interface Expense {
  id: string
  title: string
  amount: number
  category: string
  date: string
  created_at: string
}

interface RecentTransactionsProps {
  expenses: Expense[]
}

export function RecentTransactions({ expenses }: RecentTransactionsProps) {
  const recentExpenses = expenses.slice(0, 5)

  return (
    <Card className="backdrop-blur-xl bg-white/10 border-white/20 shadow-xl">
      <CardHeader>
        <CardTitle className="text-white">Recent Transactions</CardTitle>
      </CardHeader>
      <CardContent>
        {recentExpenses.length === 0 ? (
          <p className="text-gray-400 text-center py-4">No transactions yet</p>
        ) : (
          <div className="space-y-3">
            {recentExpenses.map((expense) => (
              <div
                key={expense.id}
                className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10"
              >
                <div className="flex-1">
                  <p className="font-medium text-white">{expense.title}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="outline" className="text-xs border-white/20 text-gray-300">
                      {expense.category}
                    </Badge>
                    <span className="text-xs text-gray-400">
                      {formatDistanceToNow(new Date(expense.created_at), { addSuffix: true })}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-white">₹{Number(expense.amount).toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
