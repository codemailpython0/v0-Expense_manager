"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Save, Loader2 } from "lucide-react"

interface Category {
  id: string
  name: string
  icon: string
  color: string
}

interface Expense {
  id: string
  title: string
  amount: number
  category: string
  description: string
  date: string
}

interface ExpenseFormProps {
  categories: Category[]
  expense?: Expense
}

export function ExpenseForm({ categories, expense }: ExpenseFormProps) {
  const router = useRouter()
  const supabase = createClient()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [formData, setFormData] = useState({
    title: expense?.title || "",
    amount: expense?.amount?.toString() || "",
    category: expense?.category || "",
    description: expense?.description || "",
    date: expense?.date || new Date().toISOString().split("T")[0],
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) throw new Error("Not authenticated")

      const expenseData = {
        title: formData.title,
        amount: Number.parseFloat(formData.amount),
        category: formData.category,
        description: formData.description,
        date: formData.date,
        user_id: user.id,
      }

      if (expense) {
        // Update existing expense
        const { error } = await supabase
          .from("expenses")
          .update(expenseData)
          .eq("id", expense.id)
          .eq("user_id", user.id)

        if (error) throw error
      } else {
        // Create new expense
        const { error } = await supabase.from("expenses").insert([expenseData])

        if (error) throw error
      }

      router.push("/expenses")
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="backdrop-blur-xl bg-white/10 border-white/20 shadow-2xl">
      <CardHeader>
        <CardTitle className="text-white">{expense ? "Edit Expense" : "Add New Expense"}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title" className="text-white">
                Title
              </Label>
              <Input
                id="title"
                type="text"
                placeholder="Enter expense title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="amount" className="text-white">
                Amount
              </Label>
              <Input
                id="amount"
                type="number"
                step="0.01"
                placeholder="0.00"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category" className="text-white">
                Category
              </Label>
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData({ ...formData, category: value })}
              >
                <SelectTrigger className="bg-white/10 border-white/20 text-white">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-white/20">
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

            <div className="space-y-2">
              <Label htmlFor="date" className="text-white">
                Date
              </Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="bg-white/10 border-white/20 text-white"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-white">
              Description (Optional)
            </Label>
            <Textarea
              id="description"
              placeholder="Add a description..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 min-h-[100px]"
            />
          </div>

          {error && <div className="text-red-400 text-sm text-center">{error}</div>}

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                {expense ? "Updating..." : "Adding..."}
              </>
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                {expense ? "Update Expense" : "Add Expense"}
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
