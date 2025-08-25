import { redirect, notFound } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { ExpenseForm } from "@/components/expenses/expense-form"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

interface EditExpensePageProps {
  params: {
    id: string
  }
}

export default async function EditExpensePage({ params }: EditExpensePageProps) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  const { data: expense } = await supabase
    .from("expenses")
    .select("*")
    .eq("id", params.id)
    .eq("user_id", user.id)
    .single()

  if (!expense) {
    notFound()
  }

  const { data: categories } = await supabase.from("categories").select("*").order("name")

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto p-6">
        <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-6 shadow-2xl mb-6">
          <div className="flex items-center gap-4">
            <Link href="/expenses">
              <Button
                variant="outline"
                size="sm"
                className="border-white/20 text-white hover:bg-white/10 bg-transparent"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Expenses
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-white">Edit Expense</h1>
              <p className="text-gray-300">Update expense details</p>
            </div>
          </div>
        </div>

        <div className="max-w-2xl mx-auto">
          <ExpenseForm categories={categories || []} expense={expense} />
        </div>
      </div>
    </div>
  )
}
