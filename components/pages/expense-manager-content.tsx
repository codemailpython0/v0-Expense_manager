"use client"

import { useState } from "react"
import { ExpenseList } from "@/components/expenses/expense-list"
import { ExpenseForm } from "@/components/expenses/expense-form"
import { Button } from "@/components/ui/button"
import { Plus, List } from "lucide-react"

interface Expense {
  id: string
  title: string
  amount: number
  category: string
  description: string
  date: string
  created_at: string
}

interface Category {
  id: string
  name: string
  icon: string
  color: string
}

interface ExpenseManagerContentProps {
  expenses: Expense[]
  categories: Category[]
}

export function ExpenseManagerContent({ expenses, categories }: ExpenseManagerContentProps) {
  const [showAddForm, setShowAddForm] = useState(false)

  return (
    <div className="h-full overflow-y-auto">
      <div className="container mx-auto p-6">
        <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-6 shadow-2xl mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white">Expense Manager</h1>
              <p className="text-gray-300">Manage all your expenses</p>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                onClick={() => setShowAddForm(!showAddForm)}
                className={`border-white/20 text-white hover:bg-white/10 ${
                  showAddForm ? "bg-white/10" : "bg-transparent"
                }`}
              >
                <List className="w-4 h-4 mr-2" />
                {showAddForm ? "View List" : "View List"}
              </Button>

              <Button
                onClick={() => setShowAddForm(!showAddForm)}
                className={`${
                  showAddForm
                    ? "bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                    : "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                }`}
              >
                <Plus className="w-4 h-4 mr-2" />
                {showAddForm ? "Cancel" : "Add Expense"}
              </Button>
            </div>
          </div>
        </div>

        {showAddForm ? (
          <div className="max-w-2xl mx-auto">
            <ExpenseForm categories={categories} />
          </div>
        ) : (
          <ExpenseList expenses={expenses} categories={categories} />
        )}
      </div>
    </div>
  )
}
