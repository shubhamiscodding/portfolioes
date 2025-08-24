import { useState, useRef } from "react"
import { Mail, MessageSquare, Send, ArrowRight } from "lucide-react"
import { Button } from "./ui/Button"
import { Input } from "./ui/Input"
import { Textarea } from "./ui/Textarea"
import emailjs from '@emailjs/browser'
import { useTheme } from "./ThemeProvider"

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(false)
  const formRef = useRef()
  const { theme } = useTheme();

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    setSuccess(false)
    setError(false)

    // Using EmailJS to send the email directly
    // You need to sign up at emailjs.com and get your service ID, template ID and user ID
    emailjs.sendForm(
      'YOUR_SERVICE_ID', // Replace with your EmailJS service ID
      'YOUR_TEMPLATE_ID', // Replace with your EmailJS template ID
      formRef.current,
      'YOUR_USER_ID' // Replace with your EmailJS user ID
    )
      .then((result) => {
        setLoading(false)
        setSuccess(true)
        setFormData({ name: "", email: "", message: "" })
      }, (error) => {
        setLoading(false)
        setError(true)
      })
  }

  return (
    <section id="contact" className="py-16 md:py-24 dark:bg-gray-900 evening:bg-evening-background w-screen -ml-[13%] -mr-[10%]">
      <div className="px-[10%]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          <div className="border-2 border-[#030712] dark:border-gray-700 evening:border-evening-primary rounded-lg p-8 bg-[#E5E0D8] dark:bg-gray-800 evening:bg-[#E5E0D8]">
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 evening:text-evening-primary mb-8">Talk to me</h3>
            <div className="space-y-6">
              <div className="bg-white dark:bg-[#030712] evening:bg-white p-6 rounded-lg shadow-sm flex flex-col items-center text-center">
                <Mail className="w-8 h-8 text-gray-800 dark:text-gray-200 evening:text-evening-primary mb-4" />
                <h4 className="text-lg font-medium text-gray-900 dark:text-gray-100 evening:text-evening-primary mb-1">Email</h4>
                <p className="text-gray-600 dark:text-gray-400 evening:text-evening-foreground mb-4">shubham.modi.cg@gmail.com</p>
                <a
                  href="mailto:shubham.modi.cg@gmail.com"
                  className="inline-flex items-center text-gray-600 dark:text-gray-400 evening:text-evening-foreground hover:text-gray-900 dark:hover:text-gray-200 evening:hover:text-evening-primary group"
                >
                  <span className="mr-2">Write me</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </a>
              </div>

              <div className="bg-white dark:bg-[#030712] evening:bg-white p-6 rounded-lg shadow-sm flex flex-col items-center text-center">
                <MessageSquare className="w-8 h-8 text-gray-800 dark:text-gray-200 evening:text-evening-primary mb-4" />
                <h4 className="text-lg font-medium text-gray-900 dark:text-gray-100 evening:text-evening-primary mb-1">GitHub</h4>
                <p className="text-gray-600 dark:text-gray-400 evening:text-evening-foreground mb-4">shubhamiscodding</p>
                <a
                  href="https://github.com/shubhamiscodding"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-gray-600 dark:text-gray-400 evening:text-evening-foreground hover:text-gray-900 dark:hover:text-gray-200 evening:hover:text-evening-primary group"
                >
                  <span className="mr-2">Visit profile</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </a>
              </div>

              <div className="bg-white dark:bg-[#030712] evening:bg-white p-6 rounded-lg shadow-sm flex flex-col items-center text-center">
                <MessageSquare className="w-8 h-8 text-gray-800 dark:text-gray-200 evening:text-evening-primary mb-4" />
                <h4 className="text-lg font-medium text-gray-900 dark:text-gray-100 evening:text-evening-primary mb-1">LinkedIn</h4>
                <p className="text-gray-600 dark:text-gray-400 evening:text-evening-foreground mb-4">shubham-modi-cg</p>
                <a
                  href="https://www.linkedin.com/in/shubham-modi-cg/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-gray-600 dark:text-gray-400 evening:text-evening-foreground hover:text-gray-900 dark:hover:text-gray-200 evening:hover:text-evening-primary group"
                >
                  <span className="mr-2">Connect</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            </div>
          </div>

          <div className="border-2 border-[#030712] dark:border-gray-700 evening:border-evening-primary rounded-lg p-8 bg-[#E5E0D8] dark:bg-gray-800 evening:bg-[#E5E0D8]">
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 evening:text-evening-primary mb-8">Write me your project</h3>
            
            {success && (
              <div className="mb-6 p-4 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 rounded-lg">
                Thank you! Your message has been sent successfully.
              </div>
            )}
            
            {error && (
              <div className="mb-6 p-4 bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200 rounded-lg">
                Something went wrong. Please try again or contact directly via email.
              </div>
            )}
            
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="text-gray-600 dark:text-gray-400 evening:text-evening-foreground mb-2 block">Name</label>
                <Input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Insert your name"
                  required
                  className="w-full p-4 rounded-lg border border-gray-300 dark:border-gray-700 evening:border-evening-foreground focus:ring-2 focus:ring-gray-400 dark:focus:ring-gray-600 evening:focus:ring-evening-primary focus:border-transparent bg-white text-gray-900 dark:bg-[#030712] dark:text-gray-100 evening:bg-white evening:text-gray-900"
                />
              </div>
              <div>
                <label className="text-gray-600 dark:text-gray-400 evening:text-evening-foreground mb-2 block">Mail</label>
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Insert your email"
                  required
                  className="w-full p-4 rounded-lg border border-gray-300 dark:border-gray-700 evening:border-evening-foreground focus:ring-2 focus:ring-gray-400 dark:focus:ring-gray-600 evening:focus:ring-evening-primary focus:border-transparent bg-white text-gray-900 dark:bg-[#030712] dark:text-gray-100 evening:bg-white evening:text-gray-900"
                />
              </div>
              <div>
                <label className="text-gray-600 dark:text-gray-400 evening:text-evening-foreground mb-2 block">Project</label>
                <Textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Write your project"
                  required
                  className="w-full p-4 rounded-lg border border-gray-300 dark:border-gray-700 evening:border-evening-foreground focus:ring-2 focus:ring-gray-400 dark:focus:ring-gray-600 evening:focus:ring-evening-primary focus:border-transparent min-h-[150px] bg-white text-gray-900 dark:bg-[#030712] dark:text-gray-100 evening:bg-white evening:text-gray-900"
                />
              </div>
              
              {/* Add a hidden field for the recipient email */}
              <input type="hidden" name="to_email" value="shubham.modi.cg@gmail.com" />

              <Button 
                type="submit" 
                disabled={loading}
                                  className={`bg-gray-800 hover:bg-gray-700 dark:bg-[#030712] dark:hover:bg-gray-600 evening:bg-gray-800 evening:hover:bg-gray-700 text-white dark:text-white evening:text-white rounded-md px-6 py-6 flex items-center gap-2 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {loading ? 'Sending...' : 'Send Message'} <Send className="w-4 h-4" />
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
