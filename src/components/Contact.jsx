import { useState } from "react"
import { Phone, Mail, MapPin, Send, Github, Instagram } from "lucide-react"
import { Button } from "./ui/Button"

export default function Contact() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    project: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus(null)

    // Simulate form submission
    try {
      // In a real application, you would send this data to your backend
      await new Promise((resolve) => setTimeout(resolve, 1500))
      console.log("Form submitted:", formState)
      setSubmitStatus({ type: "success", message: "Message sent successfully!" })
      
      // Reset form after successful submission
      setFormState({
        name: "",
        email: "",
        project: "",
        message: "",
      })
    } catch (error) {
      console.error("Error submitting form:", error)
      setSubmitStatus({ type: "error", message: "Something went wrong. Please try again." })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="py-16 md:py-24 bg-white dark:bg-gray-950">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">Contact Me</h2>
          <p className="text-gray-600 dark:text-gray-400">Get in touch</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16">
          <div>
            <h3 className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6">Talk to me</h3>

            <div className="space-y-6">
              <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-200 dark:border-gray-800">
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <div className="flex items-center justify-center w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-full">
                    <Mail className="w-6 h-6 text-gray-900 dark:text-gray-100" />
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-gray-900 dark:text-gray-100">Email</h4>
                    <p className="text-gray-600 dark:text-gray-400 mb-3">mdshubham3105@gmail.com</p>
                    <a 
                      href="mailto:mdshubham3105@gmail.com" 
                      className="text-sm text-gray-900 dark:text-gray-100 hover:underline inline-flex items-center gap-1"
                    >
                      Write me <ArrowIcon />
                    </a>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-200 dark:border-gray-800">
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <div className="flex items-center justify-center w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-full">
                    <MapPin className="w-6 h-6 text-gray-900 dark:text-gray-100" />
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-gray-900 dark:text-gray-100">Location</h4>
                    <p className="text-gray-600 dark:text-gray-400 mb-3">Sikkim, India</p>
                    <a 
                      href="https://maps.app.goo.gl/15NKjHxsW1j8dGCbA" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-sm text-gray-900 dark:text-gray-100 hover:underline inline-flex items-center gap-1"
                    >
                      View on map <ArrowIcon />
                    </a>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-200 dark:border-gray-800">
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <div className="flex items-center justify-center w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-full">
                    <Github className="w-6 h-6 text-gray-900 dark:text-gray-100" />
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-gray-900 dark:text-gray-100">GitHub</h4>
                    <p className="text-gray-600 dark:text-gray-400 mb-3">@shubhamiscodding</p>
                    <a 
                      href="https://github.com/shubhamiscodding" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-sm text-gray-900 dark:text-gray-100 hover:underline inline-flex items-center gap-1"
                    >
                      View profile <ArrowIcon />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6">Write to me</h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                    required
                    placeholder="Your name"
                    className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 dark:focus:ring-gray-600"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formState.email}
                    onChange={handleChange}
                    required
                    placeholder="Your email"
                    className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 dark:focus:ring-gray-600"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="project" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Project
                </label>
                <input
                  type="text"
                  id="project"
                  name="project"
                  value={formState.project}
                  onChange={handleChange}
                  placeholder="Project type"
                  className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 dark:focus:ring-gray-600"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formState.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  placeholder="Your message"
                  className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 dark:focus:ring-gray-600 resize-none"
                ></textarea>
              </div>

              <div className="mt-6">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto bg-gray-800 hover:bg-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600 text-white rounded-md px-8 py-3 font-medium transition-colors"
                >
                  {isSubmitting ? (
                    "Sending..."
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      Send message
                      <Send className="w-4 h-4" />
                    </span>
                  )}
                </Button>
              </div>

              {submitStatus && (
                <div 
                  className={`mt-4 px-4 py-3 rounded-md text-sm ${
                    submitStatus.type === "success"
                      ? "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200"
                      : "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200"
                  }`}
                >
                  {submitStatus.message}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

function ArrowIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="inline-block ml-1"
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  )
}
