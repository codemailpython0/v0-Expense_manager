import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Mail, MessageCircle, Clock, MapPin, Phone, Globe } from "lucide-react"

export function ContactInfo() {
  return (
    <div className="space-y-6">
      <Card className="backdrop-blur-xl bg-white/10 border-white/20 shadow-2xl">
        <CardHeader>
          <CardTitle className="text-white text-2xl">Get in Touch</CardTitle>
          <p className="text-gray-300">We're here to help you manage your expenses better.</p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-full bg-purple-600/20 border border-purple-400/30">
              <Mail className="w-6 h-6 text-purple-400" />
            </div>
            <div>
              <h3 className="font-semibold text-white">Email Support</h3>
              <p className="text-gray-300">kiranbehera2001.com</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="p-3 rounded-full bg-blue-600/20 border border-blue-400/30">
              <Phone className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <h3 className="font-semibold text-white">Phone Support</h3>
              <p className="text-gray-300">+91 78737 09837</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="p-3 rounded-full bg-green-600/20 border border-green-400/30">
              <MessageCircle className="w-6 h-6 text-green-400" />
            </div>
            <div>
              <h3 className="font-semibold text-white">Live Chat</h3>
              <p className="text-gray-300">Available 24/7</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="p-3 rounded-full bg-orange-600/20 border border-orange-400/30">
              <Globe className="w-6 h-6 text-orange-400" />
            </div>
            <div>
              <h3 className="font-semibold text-white">Website</h3>
              <p className="text-gray-300">https://kkbportfolio.vercel.app</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="backdrop-blur-xl bg-white/10 border-white/20 shadow-2xl">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Support Hours
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-gray-300">Monday - Friday</span>
            <Badge variant="outline" className="border-green-400/30 text-green-400">
              9:00 AM - 6:00 PM EST
            </Badge>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-300">Saturday</span>
            <Badge variant="outline" className="border-yellow-400/30 text-yellow-400">
              10:00 AM - 4:00 PM EST
            </Badge>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-300">Sunday</span>
            <Badge variant="outline" className="border-red-400/30 text-red-400">
              Closed
            </Badge>
          </div>
        </CardContent>
      </Card>

      <Card className="backdrop-blur-xl bg-white/10 border-white/20 shadow-2xl">
        <CardHeader>
          <CardTitle className="text-white">Office Location</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-full bg-purple-600/20 border border-purple-400/30">
              <MapPin className="w-6 h-6 text-purple-400" />
            </div>
            <div>
              <h3 className="font-semibold text-white mb-2">Headquarters</h3>
              <p className="text-gray-300 leading-relaxed">
              
                <br />
                Sambalpur
                <br />
                Odisha,768107
                <br />
                India
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="backdrop-blur-xl bg-white/10 border-white/20 shadow-2xl">
        <CardContent className="pt-6">
          <h3 className="font-semibold text-white mb-3">Frequently Asked Questions</h3>
          <div className="space-y-2 text-sm">
            <p className="text-gray-300">• How do I reset my password?</p>
            <p className="text-gray-300">• Can I export my expense data?</p>
            <p className="text-gray-300">• How do I delete my account?</p>
            <p className="text-gray-300">• Is my financial data secure?</p>
          </div>
          <p className="text-purple-400 text-sm mt-3 cursor-pointer hover:text-purple-300">View all FAQs →</p>
        </CardContent>
      </Card>
    </div>
  )
}
