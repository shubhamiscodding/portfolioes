"use client"
import { useState } from "react"
import { ChevronDown, Code, Database, Wrench, FileCode, Palette, Globe, Server, Terminal, GitBranch, Cpu, Layout, Braces, FigmaIcon, Monitor } from "lucide-react"
import { motion } from "framer-motion"

// Skill component
const SkillItem = ({ name, icon, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: delay * 0.1 }}
      className="flex items-center gap-2 bg-white dark:bg-gray-800 rounded-full px-4 py-2 shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md hover:border-gray-200 dark:hover:border-gray-600 hover:translate-y-[-2px] transition-all cursor-pointer"
    >
      <span className="text-lg">{icon}</span>
      <span className="font-medium text-gray-900 dark:text-gray-100">{name}</span>
    </motion.div>
  )
}

// Frontend skills
const frontendSkills = [
  { name: "JavaScript", icon: <Braces className="text-yellow-500" /> },
  { name: "React", icon: <Code className="text-cyan-500" /> },
  { name: "Tailwind CSS", icon: <Palette className="text-teal-500" /> },
  { name: "Angular", icon: <Code className="text-red-500" /> },
  { name: "Shadcn UI", icon: <Code className="text-white-500" /> },
  { name: "HTML5", icon: <Layout className="text-orange-500" /> },
  { name: "CSS3", icon: <Palette className="text-blue-500" /> },
  { name: "Figma", icon: <FigmaIcon className="text-pink-500" /> },
]

// Backend skills
const backendSkills = [
  { name: "Node.js", icon: <Server className="text-green-500" /> },
  { name: "Express.js", icon: <Terminal className="text-red-500" /> },
  { name: "MongoDB", icon: <Database className="text-green-600" /> },
  { name: "Redis", icon: <Database className="text-red-600" /> },
  { name: "Rest API", icon: <Server className="text-orange-500" /> },
  { name: "Jwt Authentication", icon: <Server className="text-red-900" /> },
  { name: "SQL", icon: <Database className="text-blue-400" /> },
  { name: "C++", icon: <Cpu className="text-purple-500" /> },
]

// Tools skills
const toolsSkills = [
  { name: "Git & Github", icon: <GitBranch className="text-red-500" /> },
  { name: "Docker", icon: <Globe className="text-blue-600" /> },
  { name: "Vercel", icon: <Globe className="text-gray-900 dark:text-gray-100" /> },
  { name: "Netlify", icon: <Globe className="text-teal-600" /> },
  { name: "Postman", icon: <Server className="text-orange-500" /> },
  { name: "Deployment", icon: <Server className="text-indigo-500" /> },
]

// SkillBox component
const SkillBox = ({ title, skills }) => {
  return (
    <div className="border-2 border-black dark:border-gray-700 p-6 h-full rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl hover:translate-y-[-5px] hover:border-gray-700 dark:hover:border-gray-500 bg-white dark:bg-gray-800 relative overflow-hidden group">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent to-gray-100 dark:to-gray-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <div className="relative z-10">
        <h3 className="text-2xl font-semibold mb-4 flex items-center gap-2 text-gray-900 dark:text-gray-100 group-hover:text-gray-800 dark:group-hover:text-gray-200">
          {title === "Frontend" && <Code className="w-6 h-6 text-blue-500" />}
          {title === "Backend" && <Database className="w-6 h-6 text-green-500" />}
          {title === "Tools" && <Wrench className="w-6 h-6 text-purple-500" />}
          {title}
        </h3>
        <div className="flex flex-wrap gap-3">
          {skills.map((skill, index) => (
            <SkillItem key={index} name={skill.name} icon={skill.icon} delay={index} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default function Skills() {
  const [openCategory, setOpenCategory] = useState("frontend")

  const toggleCategory = (category) => {
    setOpenCategory(openCategory === category ? null : category)
  }

  return (
    <section id="skills" className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">Skills</h2>
          <p className="text-gray-600 dark:text-gray-400">My technical level</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 lg:gap-8 max-w-5xl mx-auto">
          
          {/* Frontend Development */}
          <div className="bg-white dark:bg-gray-800 p-5 md:p-6 rounded-lg shadow-md hover:shadow-lg transition-all">
            <button
              className="w-full flex items-center justify-between"
              onClick={() => toggleCategory("frontend")}
              aria-expanded={openCategory === "frontend"}
            >
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-700">
                  <Code className="w-6 h-6 text-gray-900 dark:text-gray-100" />
                </div>
                <div className="text-left">
                  <h3 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-gray-100">Frontend</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">More than 3 years</p>
                </div>
              </div>
              <ChevronDown 
                className={`w-5 h-5 text-gray-600 dark:text-gray-400 transition-transform duration-300 ${openCategory === "frontend" ? "rotate-180" : ""}`} 
              />
            </button>

            <div className={`mt-4 transition-all duration-300 overflow-hidden ${openCategory === "frontend" ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}>
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-gray-800 dark:text-gray-200">HTML</span>
                    <span className="text-xs text-gray-600 dark:text-gray-400">90%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div className="bg-gray-800 dark:bg-gray-300 h-2 rounded-full" style={{ width: "90%" }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-gray-800 dark:text-gray-200">CSS</span>
                    <span className="text-xs text-gray-600 dark:text-gray-400">85%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div className="bg-gray-800 dark:bg-gray-300 h-2 rounded-full" style={{ width: "85%" }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-gray-800 dark:text-gray-200">JavaScript</span>
                    <span className="text-xs text-gray-600 dark:text-gray-400">80%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div className="bg-gray-800 dark:bg-gray-300 h-2 rounded-full" style={{ width: "80%" }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-gray-800 dark:text-gray-200">React</span>
                    <span className="text-xs text-gray-600 dark:text-gray-400">85%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div className="bg-gray-800 dark:bg-gray-300 h-2 rounded-full" style={{ width: "85%" }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Backend Development */}
          <div className="bg-white dark:bg-gray-800 p-5 md:p-6 rounded-lg shadow-md hover:shadow-lg transition-all">
            <button
              className="w-full flex items-center justify-between"
              onClick={() => toggleCategory("backend")}
              aria-expanded={openCategory === "backend"}
            >
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-700">
                  <Database className="w-6 h-6 text-gray-900 dark:text-gray-100" />
                </div>
                <div className="text-left">
                  <h3 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-gray-100">Backend</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">More than 2 years</p>
                </div>
              </div>
              <ChevronDown 
                className={`w-5 h-5 text-gray-600 dark:text-gray-400 transition-transform duration-300 ${openCategory === "backend" ? "rotate-180" : ""}`} 
              />
            </button>

            <div className={`mt-4 transition-all duration-300 overflow-hidden ${openCategory === "backend" ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}>
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-gray-800 dark:text-gray-200">Node.js</span>
                    <span className="text-xs text-gray-600 dark:text-gray-400">75%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div className="bg-gray-800 dark:bg-gray-300 h-2 rounded-full" style={{ width: "75%" }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-gray-800 dark:text-gray-200">Express</span>
                    <span className="text-xs text-gray-600 dark:text-gray-400">80%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div className="bg-gray-800 dark:bg-gray-300 h-2 rounded-full" style={{ width: "80%" }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-gray-800 dark:text-gray-200">MongoDB</span>
                    <span className="text-xs text-gray-600 dark:text-gray-400">70%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div className="bg-gray-800 dark:bg-gray-300 h-2 rounded-full" style={{ width: "70%" }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-gray-800 dark:text-gray-200">Firebase</span>
                    <span className="text-xs text-gray-600 dark:text-gray-400">65%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div className="bg-gray-800 dark:bg-gray-300 h-2 rounded-full" style={{ width: "65%" }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* UI/UX Design */}
          <div className="bg-white dark:bg-gray-800 p-5 md:p-6 rounded-lg shadow-md hover:shadow-lg transition-all">
            <button
              className="w-full flex items-center justify-between"
              onClick={() => toggleCategory("design")}
              aria-expanded={openCategory === "design"}
            >
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-700">
                  <Monitor className="w-6 h-6 text-gray-900 dark:text-gray-100" />
                </div>
                <div className="text-left">
                  <h3 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-gray-100">UI/UX Design</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">More than 1 year</p>
                </div>
              </div>
              <ChevronDown 
                className={`w-5 h-5 text-gray-600 dark:text-gray-400 transition-transform duration-300 ${openCategory === "design" ? "rotate-180" : ""}`} 
              />
            </button>

            <div className={`mt-4 transition-all duration-300 overflow-hidden ${openCategory === "design" ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}>
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-gray-800 dark:text-gray-200">Figma</span>
                    <span className="text-xs text-gray-600 dark:text-gray-400">85%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div className="bg-gray-800 dark:bg-gray-300 h-2 rounded-full" style={{ width: "85%" }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-gray-800 dark:text-gray-200">Adobe XD</span>
                    <span className="text-xs text-gray-600 dark:text-gray-400">60%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div className="bg-gray-800 dark:bg-gray-300 h-2 rounded-full" style={{ width: "60%" }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-gray-800 dark:text-gray-200">Prototyping</span>
                    <span className="text-xs text-gray-600 dark:text-gray-400">75%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div className="bg-gray-800 dark:bg-gray-300 h-2 rounded-full" style={{ width: "75%" }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-gray-800 dark:text-gray-200">UI Design</span>
                    <span className="text-xs text-gray-600 dark:text-gray-400">80%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div className="bg-gray-800 dark:bg-gray-300 h-2 rounded-full" style={{ width: "80%" }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
