import { Button } from "./ui/Button"
import { Download, Trophy, Briefcase, Headphones, Github, Code } from "lucide-react"

export default function About() {
  return (
    <section id="about" className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">About Me</h2>
          <p className="text-gray-600 dark:text-gray-400">My introduction</p>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center">
          <div className="w-full md:w-1/2">
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Full-stack developer specializing in JavaScript and React. I create responsive web applications with clean UI/UX interfaces. 
              With years of experience in both frontend and backend development, I've delivered numerous successful projects including website clones, 
              games, and custom business applications.
            </p>

            <div className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow-md mb-8">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 flex items-center">
                <Github className="w-5 h-5 mr-2" /> GitHub Portfolio Highlights
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start">
                  <Code className="w-4 h-4 mt-1 mr-2 text-gray-700 dark:text-gray-300" />
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">Full Stack Development</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Multiple JavaScript projects including FinCtrl</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Code className="w-4 h-4 mt-1 mr-2 text-gray-700 dark:text-gray-300" />
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">Website Clones</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Apollo, Podbean, Nintendo, Spotify with React</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Code className="w-4 h-4 mt-1 mr-2 text-gray-700 dark:text-gray-300" />
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">Games Development</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">TypeScript multiplayer game & JavaScript games</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Code className="w-4 h-4 mt-1 mr-2 text-gray-700 dark:text-gray-300" />
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">Backend Practice</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">MongoDB, Node.js & API development</p>
                  </div>
                </div>
              </div>
            </div>

            <a href="/resume" target="_self" rel="noopener noreferrer">
              <Button className="bg-gray-800 hover:bg-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600 text-white rounded-md px-6 py-3 flex items-center gap-2">
                Resume <Download className="w-4 h-4" />
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}