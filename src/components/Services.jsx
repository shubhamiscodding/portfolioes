import { ArrowRight, LayoutGrid, Code, Palette } from "lucide-react"

export default function Services() {
  return (
    <section id="services" className="py-16 md:py-24 dark:bg-gray-900">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">Services</h2>
          <p className="text-gray-600 dark:text-gray-400">What I offer</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="flex justify-center mb-6">
              <LayoutGrid className="w-12 h-12 text-gray-800 dark:text-gray-200" />
            </div>
            <h3 className="text-xl font-semibold text-center mb-4 text-gray-900 dark:text-gray-100">Web Designer</h3>
            <a href="#" className="flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 mt-6 group">
              <span className="mr-2">View More</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>

          <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="flex justify-center mb-6">
              <Code className="w-12 h-12 text-gray-800 dark:text-gray-200" />
            </div>
            <h3 className="text-xl font-semibold text-center mb-4 text-gray-900 dark:text-gray-100">UI/UX Designer</h3>
            <a href="#" className="flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 mt-6 group">
              <span className="mr-2">View More</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>

          <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="flex justify-center mb-6">
              <Palette className="w-12 h-12 text-gray-800 dark:text-gray-200" />
            </div>
            <h3 className="text-xl font-semibold text-center mb-4 text-gray-900 dark:text-gray-100">Branding Designer</h3>
            <a href="#" className="flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 mt-6 group">
              <span className="mr-2">View More</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
