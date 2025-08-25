import { ContactForm } from "@/components/contact/contact-form"
import { ContactInfo } from "@/components/contact/contact-info"

export function ContactContent() {
  return (
    <div className="h-full overflow-y-auto">
      <div className="container mx-auto p-6">
        <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-6 shadow-2xl mb-6">
          <div>
            <h1 className="text-3xl font-bold text-white">Contact Us</h1>
            <p className="text-gray-300">Get in touch with our support team</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <ContactForm />
          <ContactInfo />
        </div>
      </div>
    </div>
  )
}
