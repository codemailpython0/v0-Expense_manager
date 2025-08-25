import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default function CheckEmailPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
      <div className="w-full max-w-md">
        <Card className="backdrop-blur-xl bg-white/10 border-white/20 shadow-2xl">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold text-white">Check Your Email</CardTitle>
            <CardDescription className="text-gray-300">We've sent you a confirmation link</CardDescription>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-gray-300">
              Please check your email and click the confirmation link to activate your account.
            </p>
            <Link href="/auth/login" className="inline-block text-purple-400 hover:text-purple-300 underline">
              Back to Sign In
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
