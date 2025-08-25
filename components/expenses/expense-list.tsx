"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Edit, Trash2, Search, Filter } from "lucide-react"
import { formatDistanceToNow } from "date-fns"

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

interface ExpenseListProps {
  expenses: Expense[]
  categories: Category[]
}

export function ExpenseList({ expenses, categories }: ExpenseListProps) {
  const router = useRouter()
  const supabase = createClient()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [isDeleting, setIsDeleting] = useState<string | null>(null)

  const filteredExpenses = expenses.filter((expense) => {
    const matchesSearch =
      expense.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      expense.description?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || expense.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const handleDelete = async (expenseId: string) => {
    if (!confirm("Are you sure you want to delete this expense?")) return

    setIsDeleting(expenseId)
    try {
      const { error } = await supabase.from("expenses").delete().eq("id", expenseId)

      if (error) throw error

      // Refresh the page to show updated data
      router.refresh()
    } catch (error) {
      console.error("Error deleting expense:", error)
      alert("Failed to delete expense")
    } finally {
      setIsDeleting(null)
    }
  }

  const getCategoryIcon = (categoryName: string) => {
    const category = categories.find((cat) => cat.name === categoryName)
    return category?.icon || "📦"
  }

  const totalAmount = filteredExpenses.reduce((sum, expense) => sum + Number(expense.amount), 0)

  return (
    <div className="space-y-6">
      {/* Filters */}
      <Card className="backdrop-blur-xl bg-white/10 border-white/20 shadow-xl">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Filter className="w-5 h-5" />
            Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search expenses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-gray-400"
              />
            </div>

            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="bg-white/10 border-white/20 text-white">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-white/20">
                <SelectItem value="all" className="text-white hover:bg-white/10">
                  All Categories
                </SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.name} className="text-white hover:bg-white/10">
                    <span className="flex items-center gap-2">
                      <span>{category.icon}</span>
                      {category.name}
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <p className="text-gray-300">
              Showing {filteredExpenses.length} of {expenses.length} expenses
            </p>
            <p className="text-white font-bold">Total: ₹{totalAmount.toFixed(2)}</p>
          </div>
        </CardContent>
      </Card>

      {/* Expense List */}
      <div className="grid gap-4">
        {filteredExpenses.length === 0 ? (
          <Card className="backdrop-blur-xl bg-white/10 border-white/20 shadow-xl">
            <CardContent className="text-center py-12">
              <p className="text-gray-400 text-lg">No expenses found</p>
              <p className="text-gray-500 mt-2">Try adjusting your search or filters</p>
            </CardContent>
          </Card>
        ) : (
          filteredExpenses.map((expense) => (
            <Card
              key={expense.id}
              className="backdrop-blur-xl bg-white/10 border-white/20 shadow-xl hover:bg-white/15 transition-all"
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-2xl">{getCategoryIcon(expense.category)}</span>
                      <div>
                        <h3 className="font-semibold text-white text-lg">{expense.title}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline" className="border-white/20 text-gray-300">
                            {expense.category}
                          </Badge>
                          <span className="text-sm text-gray-400">{new Date(expense.date).toLocaleDateString()}</span>
                          <span className="text-xs text-gray-500">
                            {formatDistanceToNow(new Date(expense.created_at), { addSuffix: true })}
                          </span>
                        </div>
                      </div>
                    </div>
                    {expense.description && <p className="text-gray-300 text-sm mt-2">{expense.description}</p>}
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-2xl font-bold text-white">₹{Number(expense.amount).toFixed(2)}</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => router.push(`/expenses/edit/${expense.id}`)}
                        className="border-white/20 text-white hover:bg-white/10"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(expense.id)}
                        disabled={isDeleting === expense.id}
                        className="border-red-400/20 text-red-400 hover:bg-red-400/10"
                      >
                        {isDeleting === expense.id ? (
                          <div className="w-4 h-4 animate-spin rounded-full border-2 border-red-400 border-t-transparent" />
                        ) : (
                          <Trash2 className="w-4 h-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
