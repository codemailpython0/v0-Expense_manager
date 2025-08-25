"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

interface Expense {
  id: string
  amount: number
  category: string
  date: string
}

interface ExpenseChartProps {
  expenses: Expense[]
}

const COLORS = ["#8b5cf6", "#3b82f6", "#ef4444", "#f59e0b", "#10b981", "#ec4899"]

export function ExpenseChart({ expenses }: ExpenseChartProps) {
  if (!expenses || expenses.length === 0) {
    return (
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <Card className="backdrop-blur-xl bg-white/10 border-white/20 shadow-xl">
          <CardHeader>
            <CardTitle className="text-white">Expenses by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[350px] flex items-center justify-center">
              <p className="text-gray-400">No expense data available</p>
            </div>
          </CardContent>
        </Card>

        <Card className="backdrop-blur-xl bg-white/10 border-white/20 shadow-xl">
          <CardHeader>
            <CardTitle className="text-white">Monthly Spending</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[350px] flex items-center justify-center">
              <p className="text-gray-400">No expense data available</p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Prepare data for category pie chart
  const categoryData = expenses.reduce(
    (acc, expense) => {
      acc[expense.category] = (acc[expense.category] || 0) + Number(expense.amount)
      return acc
    },
    {} as Record<string, number>,
  )

  const pieData = Object.entries(categoryData).map(([category, amount]) => ({
    name: category,
    value: amount,
  }))

  // Prepare data for monthly bar chart
  const monthlyData = expenses.reduce(
    (acc, expense) => {
      const month = new Date(expense.date).toLocaleDateString("en-US", { month: "short" })
      acc[month] = (acc[month] || 0) + Number(expense.amount)
      return acc
    },
    {} as Record<string, number>,
  )

  const barData = Object.entries(monthlyData).map(([month, amount]) => ({
    month,
    amount,
  }))

  const formatTooltipValue = (value: number) => `₹${value.toFixed(2)}`

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
      <Card className="backdrop-blur-xl bg-white/10 border-white/20 shadow-xl">
        <CardHeader>
          <CardTitle className="text-white">Expenses by Category</CardTitle>
        </CardHeader>
        <CardContent>
          {pieData.length > 0 ? (
            <ChartContainer
              config={{
                value: {
                  label: "Amount",
                  color: "hsl(var(--chart-1))",
                },
              }}
              className="h-[350px] w-full"
            >
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <ChartTooltip
                    content={<ChartTooltipContent formatter={(value) => formatTooltipValue(Number(value))} />}
                  />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          ) : (
            <div className="h-[350px] flex items-center justify-center">
              <p className="text-gray-400">No category data available</p>
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="backdrop-blur-xl bg-white/10 border-white/20 shadow-xl">
        <CardHeader>
          <CardTitle className="text-white">Monthly Spending</CardTitle>
        </CardHeader>
        <CardContent>
          {barData.length > 0 ? (
            <ChartContainer
              config={{
                amount: {
                  label: "Amount",
                  color: "hsl(var(--chart-2))",
                },
              }}
              className="h-[350px] w-full"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="month" stroke="rgba(255,255,255,0.7)" />
                  <YAxis stroke="rgba(255,255,255,0.7)" />
                  <ChartTooltip
                    content={<ChartTooltipContent formatter={(value) => formatTooltipValue(Number(value))} />}
                  />
                  <Bar dataKey="amount" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          ) : (
            <div className="h-[350px] flex items-center justify-center">
              <p className="text-gray-400">No monthly data available</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
