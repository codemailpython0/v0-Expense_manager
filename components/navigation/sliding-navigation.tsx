"use client"

import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Home, CreditCard, MessageCircle, LogOut, ChevronLeft, ChevronRight } from "lucide-react"

// Import page components
import { DashboardContent } from "@/components/pages/dashboard-content"
import { ExpenseManagerContent } from "@/components/pages/expense-manager-content"
import { ContactContent } from "@/components/pages/contact-content"

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

interface Category {
  id: string
  name: string
  icon: string
  color: string
}

interface SlidingNavigationProps {
  user: User
  expenses: Expense[]
  categories: Category[]
}

const pages = [
  { id: "dashboard", title: "Dashboard", icon: Home },
  { id: "expenses", title: "Expense Manager", icon: CreditCard },
  { id: "contact", title: "Contact", icon: MessageCircle },
]

export function SlidingNavigation({ user, expenses, categories }: SlidingNavigationProps) {
  const [currentPage, setCurrentPage] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push("/auth/login")
  }

  const navigateToPage = (pageIndex: number) => {
    if (pageIndex === currentPage || isTransitioning) return

    setIsTransitioning(true)
    setCurrentPage(pageIndex)

    // Reset transition state after animation completes
    setTimeout(() => setIsTransitioning(false), 500)
  }

  const nextPage = () => {
    const nextIndex = (currentPage + 1) % pages.length
    navigateToPage(nextIndex)
  }

  const prevPage = () => {
    const prevIndex = currentPage === 0 ? pages.length - 1 : currentPage - 1
    navigateToPage(prevIndex)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden">
      {/* Navigation Header */}
      <div className="relative z-10 backdrop-blur-xl bg-white/10 border-b border-white/20 shadow-2xl">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <h1 className="text-2xl font-bold text-white">ExpenseManager</h1>

              {/* Page Navigation Tabs */}
              <div className="flex items-center gap-2 bg-white/10 rounded-full p-1 border border-white/20">
                {pages.map((page, index) => {
                  const Icon = page.icon
                  return (
                    <button
                      key={page.id}
                      onClick={() => navigateToPage(index)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ${
                        currentPage === index
                          ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg"
                          : "text-gray-300 hover:text-white hover:bg-white/10"
                      }`}
                      disabled={isTransitioning}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="hidden md:inline">{page.title}</span>
                    </button>
                  )
                })}
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* Navigation Arrows */}
              <div className="flex items-center gap-1">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={prevPage}
                  disabled={isTransitioning}
                  className="border-white/20 text-white hover:bg-white/10 bg-transparent"
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={nextPage}
                  disabled={isTransitioning}
                  className="border-white/20 text-white hover:bg-white/10 bg-transparent"
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>

              <div className="text-right">
                <p className="text-white font-medium">{user.full_name || user.email}</p>
                <p className="text-gray-300 text-sm">{pages[currentPage].title}</p>
              </div>

              <Button
                variant="outline"
                onClick={handleSignOut}
                className="border-white/20 text-white hover:bg-white/10 bg-transparent"
              >
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Sliding Content Container */}
      <div className="relative h-[calc(100vh-80px)] overflow-hidden">
        <div
          className="flex h-full transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentPage * 100}%)` }}
        >
          {/* Dashboard Page */}
          <div className="w-full h-full flex-shrink-0">
            <DashboardContent user={user} expenses={expenses} />
          </div>

          {/* Expense Manager Page */}
          <div className="w-full h-full flex-shrink-0">
            <ExpenseManagerContent expenses={expenses} categories={categories} />
          </div>

          {/* Contact Page */}
          <div className="w-full h-full flex-shrink-0">
            <ContactContent />
          </div>
        </div>
      </div>

      {/* Page Indicators */}
      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-10">
        <div className="flex items-center gap-2 bg-white/10 backdrop-blur-xl rounded-full px-4 py-2 border border-white/20">
          {pages.map((_, index) => (
            <button
              key={index}
              onClick={() => navigateToPage(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                currentPage === index
                  ? "bg-gradient-to-r from-purple-400 to-blue-400 w-6"
                  : "bg-white/30 hover:bg-white/50"
              }`}
              disabled={isTransitioning}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
