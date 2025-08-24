import { ArrowRight, LayoutGrid, Code, Palette } from "lucide-react"
import { useTheme } from "./ThemeProvider"

export default function Services() {
  const { theme } = useTheme();
  
  return (
    <section id="services" className="py-16 md:py-24 dark:bg-gray-900 evening:bg-evening-background">
      <div className="">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 evening:text-evening-primary mb-2">Services</h2>
          <p className="text-gray-600 dark:text-gray-400 evening:text-evening-foreground">What I offer</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="bg-white dark:bg-gray-800 evening:bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="flex justify-center mb-6">
              <LayoutGrid className="w-12 h-12 text-gray-800 dark:text-gray-200 evening:text-evening-primary" />
            </div>
            <h3 className="text-xl font-semibold text-center mb-4 text-gray-900 dark:text-gray-100 evening:text-evening-primary">Web Designer</h3>
            <a href="#" className="flex items-center justify-center text-gray-600 dark:text-gray-400 evening:text-evening-foreground hover:text-gray-900 dark:hover:text-gray-200 evening:hover:text-evening-primary mt-6 group">
              <span className="mr-2">View More</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>

          <div className="bg-white dark:bg-gray-800 evening:bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="flex justify-center mb-6">
              <Code className="w-12 h-12 text-gray-800 dark:text-gray-200 evening:text-evening-primary" />
            </div>
            <h3 className="text-xl font-semibold text-center mb-4 text-gray-900 dark:text-gray-100 evening:text-evening-primary">UI/UX Designer</h3>
            <a href="#" className="flex items-center justify-center text-gray-600 dark:text-gray-400 evening:text-evening-foreground hover:text-gray-900 dark:hover:text-gray-200 evening:hover:text-evening-primary mt-6 group">
              <span className="mr-2">View More</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>

          <div className="bg-white dark:bg-gray-800 evening:bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="flex justify-center mb-6">
              <Palette className="w-12 h-12 text-gray-800 dark:text-gray-200 evening:text-evening-primary" />
            </div>
            <h3 className="text-xl font-semibold text-center mb-4 text-gray-900 dark:text-gray-100 evening:text-evening-primary">Branding Designer</h3>
            <a href="#" className="flex items-center justify-center text-gray-600 dark:text-gray-400 evening:text-evening-foreground hover:text-gray-900 dark:hover:text-gray-200 evening:hover:text-evening-primary mt-6 group">
              <span className="mr-2">View More</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
