import { Github, Linkedin, Twitter } from "lucide-react"

export default function Footer() {
  return (
    <footer 
      className="py-12 relative"
      style={{
        backgroundImage: `url('https://images.pexels.com/photos/963278/pexels-photo-963278.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Add overlay for better readability */}
      <div className="absolute inset-0 bg-white/95 dark:bg-gray-900/95"></div>
      
      <div className="container mx-auto px-4 md:px-6 text-center relative z-10">
        <a href="#home" className="text-2xl font-bold text-gray-900 dark:text-white mb-8 inline-block">
          Shubham Modi
        </a>

        <div className="flex justify-center space-x-8 my-8">
          <a
            href="#about"
            className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            About
          </a>
          <a
            href="#portfolio"
            className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            Projects
          </a>
          <a
            href="#services"
            className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            Services
          </a>
        </div>

        <div className="flex justify-center space-x-4 mb-8">
          <a
            href="https://github.com/shubhamiscodding"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gray-800 dark:bg-gray-700 text-white p-2 rounded-md hover:bg-gray-700 dark:hover:bg-gray-600 transition-colors hover:scale-110 duration-300"
          >
            <Github className="w-5 h-5" />
          </a>
          <a
            href="https://www.linkedin.com/in/shubham-modi-cg/"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gray-800 dark:bg-gray-700 text-white p-2 rounded-md hover:bg-blue-600 dark:hover:bg-blue-600 transition-colors hover:scale-110 duration-300"
          >
            <Linkedin className="w-5 h-5" />
          </a>
          <a
            href="https://x.com/shubham_modi_cg"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gray-800 dark:bg-gray-700 text-white p-2 rounded-md hover:bg-blue-400 dark:hover:bg-blue-400 transition-colors hover:scale-110 duration-300"
          >
            <Twitter className="w-5 h-5" />
          </a>
        </div>

        <p className="text-gray-600 dark:text-gray-400 text-sm">© Shubham Modi. All rights reserved</p>
      </div>
    </footer>
  )
}
