"use client"

import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Home, CreditCard, MessageCircle, LogOut, ChevronLeft, ChevronRight, Menu } from "lucide-react"

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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
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
        <div className="container mx-auto px-3 sm:px-4 md:px-6 py-3 md:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 sm:gap-4 md:gap-6">
              <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-white">ExpenseManager</h1>

              <div className="hidden md:flex items-center gap-2 bg-white/10 rounded-full p-1 border border-white/20">
                {pages.map((page, index) => {
                  const Icon = page.icon
                  return (
                    <button
                      key={page.id}
                      onClick={() => navigateToPage(index)}
                      className={`flex items-center gap-2 px-3 lg:px-4 py-2 rounded-full transition-all duration-300 ${
                        currentPage === index
                          ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg"
                          : "text-gray-300 hover:text-white hover:bg-white/10"
                      }`}
                      disabled={isTransitioning}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="hidden lg:inline">{page.title}</span>
                    </button>
                  )
                })}
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden border-white/20 text-white hover:bg-white/10 bg-transparent"
              >
                <Menu className="w-4 h-4" />
              </Button>
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              <div className="flex items-center gap-1">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={prevPage}
                  disabled={isTransitioning}
                  className="border-white/20 text-white hover:bg-white/10 bg-transparent p-2"
                >
                  <ChevronLeft className="w-3 h-3 sm:w-4 sm:h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={nextPage}
                  disabled={isTransitioning}
                  className="border-white/20 text-white hover:bg-white/10 bg-transparent p-2"
                >
                  <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
                </Button>
              </div>

              <div className="hidden sm:block text-right">
                <p className="text-white font-medium text-sm md:text-base truncate max-w-32 md:max-w-none">
                  {user.full_name || user.email}
                </p>
                <p className="text-gray-300 text-xs md:text-sm">{pages[currentPage].title}</p>
              </div>

              <Button
                variant="outline"
                onClick={handleSignOut}
                className="border-white/20 text-white hover:bg-white/10 bg-transparent p-2"
              >
                <LogOut className="w-3 h-3 sm:w-4 sm:h-4" />
              </Button>
            </div>
          </div>

          {isMobileMenuOpen && (
            <div className="md:hidden mt-4 bg-white/10 rounded-xl p-3 border border-white/20">
              <div className="grid grid-cols-3 gap-2">
                {pages.map((page, index) => {
                  const Icon = page.icon
                  return (
                    <button
                      key={page.id}
                      onClick={() => {
                        navigateToPage(index)
                        setIsMobileMenuOpen(false)
                      }}
                      className={`flex flex-col items-center gap-1 p-3 rounded-lg transition-all duration-300 ${
                        currentPage === index
                          ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg"
                          : "text-gray-300 hover:text-white hover:bg-white/10"
                      }`}
                      disabled={isTransitioning}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="text-xs font-medium">{page.title}</span>
                    </button>
                  )
                })}
              </div>
              <div className="mt-3 pt-3 border-t border-white/20 text-center">
                <p className="text-white font-medium text-sm">{user.full_name || user.email}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="relative h-[calc(100vh-60px)] sm:h-[calc(100vh-70px)] md:h-[calc(100vh-80px)] overflow-hidden">
        <div
          className="flex h-full transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentPage * 100}%)` }}
        >
          <div className="w-full h-full flex-shrink-0">
            <DashboardContent user={user} expenses={expenses} />
          </div>

          <div className="w-full h-full flex-shrink-0">
            <ExpenseManagerContent expenses={expenses} categories={categories} />
          </div>

          <div className="w-full h-full flex-shrink-0">
            <ContactContent />
          </div>
        </div>
      </div>

      <div className="fixed bottom-4 sm:bottom-6 left-1/2 transform -translate-x-1/2 z-10">
        <div className="flex items-center gap-1.5 sm:gap-2 bg-white/10 backdrop-blur-xl rounded-full px-3 sm:px-4 py-2 border border-white/20">
          {pages.map((_, index) => (
            <button
              key={index}
              onClick={() => navigateToPage(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                currentPage === index
                  ? "bg-gradient-to-r from-purple-400 to-blue-400 w-4 sm:w-6"
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
