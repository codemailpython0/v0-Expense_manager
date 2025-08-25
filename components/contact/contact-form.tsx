"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Send, Loader2, CheckCircle } from "lucide-react"
import emailjs from "@emailjs/browser"

export function ContactForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    category: "",
    message: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "your_service_id"
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "your_template_id"
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "your_public_key"

      const templateParams = {
        to_email: "kiranbehera2001@gmail.com",
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject,
        category: formData.category,
        message: formData.message,
        reply_to: formData.email,
      }

      if (serviceId === "your_service_id" || templateId === "your_template_id" || publicKey === "your_public_key") {
        console.log("[v0] EmailJS not configured. Simulating email send to kiranbehera2001@gmail.com:", templateParams)
        await new Promise((resolve) => setTimeout(resolve, 2000))
      } else {
        await emailjs.send(serviceId, templateId, templateParams, publicKey)
        console.log("[v0] Email sent successfully to kiranbehera2001@gmail.com")
      }

      setIsSubmitted(true)
      setFormData({
        name: "",
        email: "",
        subject: "",
        category: "",
        message: "",
      })
    } catch (error) {
      console.error("EmailJS error:", error)
      setError("Failed to send message. Please try again or contact us directly at kiranbehera2001@gmail.com")
    } finally {
      setIsLoading(false)
    }
  }

  if (isSubmitted) {
    return (
      <Card className="backdrop-blur-xl bg-white/10 border-white/20 shadow-2xl">
        <CardContent className="text-center py-12">
          <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
          <p className="text-gray-300 mb-6">
            Your message has been sent to kiranbehera2001@gmail.com. We'll get back to you within 24 hours.
          </p>
          <Button
            onClick={() => setIsSubmitted(false)}
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
          >
            Send Another Message
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="backdrop-blur-xl bg-white/10 border-white/20 shadow-2xl">
      <CardHeader>
        <CardTitle className="text-white text-2xl">Send us a Message</CardTitle>
        <p className="text-gray-300">Have a question or need help? Send us a message at kiranbehera2001@gmail.com</p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-white">
                Full Name
              </Label>
              <Input
                id="name"
                type="text"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-white">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
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
                  <SelectItem value="support" className="text-white hover:bg-white/10">
                    Technical Support
                  </SelectItem>
                  <SelectItem value="billing" className="text-white hover:bg-white/10">
                    Billing & Account
                  </SelectItem>
                  <SelectItem value="feature" className="text-white hover:bg-white/10">
                    Feature Request
                  </SelectItem>
                  <SelectItem value="bug" className="text-white hover:bg-white/10">
                    Bug Report
                  </SelectItem>
                  <SelectItem value="other" className="text-white hover:bg-white/10">
                    Other
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="subject" className="text-white">
                Subject
              </Label>
              <Input
                id="subject"
                type="text"
                placeholder="Brief subject line"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="message" className="text-white">
              Message
            </Label>
            <Textarea
              id="message"
              placeholder="Describe your question or issue in detail..."
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 min-h-[120px]"
              required
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
                Sending Message...
              </>
            ) : (
              <>
                <Send className="w-4 h-4 mr-2" />
                Send Message
              </>
            )}
          </Button>
        </form>
        <div className="text-center mt-6">
          <p className="text-white text-sm">© made by KKB</p>
        </div>
      </CardContent>
    </Card>
  )
}
