import { Github, Instagram, Linkedin } from "lucide-react"
import { useTheme } from "./ThemeProvider"

export default function Footer() {
  const { theme } = useTheme()
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-100 dark:bg-gray-900 pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="text-center md:text-left">
            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3">Shubham Modi</h3>
            <p className="text-gray-600 dark:text-gray-400 max-w-xs mx-auto md:mx-0">
              Full Stack Developer specializing in MERN stack applications with a passion for clean code and elegant solutions.
            </p>
          </div>

          <div className="text-center">
            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3">Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#skills" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors">Skills</a>
              </li>
              <li>
                <a href="#portfolio" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors">Portfolio</a>
              </li>
              <li>
                <a href="#contact" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors">Contact Me</a>
              </li>
            </ul>
          </div>

          <div className="text-center md:text-right">
            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3">Social</h3>
            <div className="flex justify-center md:justify-end space-x-4">
              <a 
                href="https://github.com/shubhamiscodding" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors p-2"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a 
                href="https://instagram.com/shubham_modi_3105" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors p-2"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href="https://linkedin.com/in/shubham-modi-53b883285" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors p-2"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mt-4">
              mdshubham3105@gmail.com
            </p>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-800 pt-8">
          <div className="flex flex-col sm:flex-row justify-center sm:justify-between items-center">
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 sm:mb-0">
              © {currentYear} Shubham Modi. All rights reserved.
            </p>
            <div className="text-sm text-gray-500 dark:text-gray-500">
              <button 
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: 'smooth' })
                }}
                className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors"
              >
                Back to top ↑
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
