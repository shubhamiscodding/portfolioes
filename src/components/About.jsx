import { Button } from "./ui/Button"
import { Download, Trophy, Briefcase, Headphones, Github, Code } from "lucide-react"

export default function About() {
  return (
    <section id="about" className="py-12 md:py-16 lg:py-24 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">About Me</h2>
          <p className="text-gray-600 dark:text-gray-400">My introduction</p>
        </div>

        <div className="flex flex-col md:flex-row items-center md:items-start justify-center gap-8 md:gap-12">
          <div className="w-full md:w-2/5 mb-8 md:mb-0 flex justify-center">
            <div className="relative rounded-lg overflow-hidden shadow-xl w-64 h-64 sm:w-80 sm:h-80">
              <img 
                src="https://res.cloudinary.com/dqhn4dq02/image/upload/v1740113553/jm7lzaefxenoz27qzxfz.jpg" 
                alt="Shubham Modi" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          
          <div className="w-full md:w-3/5">
            <p className="text-gray-600 dark:text-gray-400 mb-6 text-base md:text-lg">
              Full-stack developer specializing in JavaScript and React. I create responsive web applications with clean UI/UX interfaces. 
              With years of experience in both frontend and backend development, I've delivered numerous successful projects including website clones, 
              games, and custom business applications.
            </p>

            <div className="bg-white dark:bg-gray-800 p-4 md:p-5 rounded-lg shadow-md mb-6 md:mb-8">
              <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-3 flex items-center">
                <Github className="w-5 h-5 mr-2" /> GitHub Portfolio Highlights
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-start">
                  <Code className="w-4 h-4 mt-1 mr-2 text-gray-700 dark:text-gray-300 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">Full Stack Development</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Multiple JavaScript projects including FinCtrl</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Code className="w-4 h-4 mt-1 mr-2 text-gray-700 dark:text-gray-300 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">Website Clones</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Apollo, Podbean, Nintendo, Spotify with React</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Code className="w-4 h-4 mt-1 mr-2 text-gray-700 dark:text-gray-300 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">Games Development</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">TypeScript multiplayer game & JavaScript games</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Code className="w-4 h-4 mt-1 mr-2 text-gray-700 dark:text-gray-300 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">Backend Practice</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">MongoDB, Node.js & API development</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-center md:justify-start">
              <a href="/resume" target="_self" rel="noopener noreferrer" className="w-full sm:w-auto">
                <Button className="bg-gray-800 hover:bg-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600 text-white rounded-md px-6 py-3 flex items-center gap-2 w-full sm:w-auto justify-center">
                  Resume <Download className="w-4 h-4" />
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}