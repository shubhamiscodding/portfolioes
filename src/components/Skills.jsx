"use client"
import { Code, Database, Wrench, FileCode, Palette, Globe, Server, Terminal, GitBranch, Cpu, Layout, Braces, FigmaIcon } from "lucide-react"
import { motion } from "framer-motion"

// Skill component
const SkillItem = ({ name, icon, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: delay * 0.1 }}
                  className="flex items-center gap-2 bg-white dark:bg-gray-800 evening:bg-[#D1D9CF] rounded-full px-4 py-2 shadow-sm border border-gray-100 dark:border-gray-700 evening:border-evening-foreground hover:shadow-md hover:border-gray-200 dark:hover:border-gray-600 evening:hover:border-evening-secondary hover:translate-y-[-2px] transition-all cursor-pointer"
    >
      <span className="text-lg">{icon}</span>
      <span className="font-medium text-gray-900 dark:text-gray-100 evening:text-evening-primary">{name}</span>
    </motion.div>
  )
}

// Frontend skills
const frontendSkills = [
  { name: "JavaScript", icon: <Braces className="text-yellow-500" /> },
  { name: "React", icon: <Code className="text-cyan-500" /> },
  { name: "Tailwind CSS", icon: <Palette className="text-teal-500" /> },
  { name: "Angular", icon: <Code className="text-red-500" /> },
          { name: "Shadcn UI", icon: <Code className="text-white" /> },
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
  { name: "Vercel", icon: <Globe className="text-gray-900 dark:text-gray-100 evening:text-evening-primary" /> },
  { name: "Netlify", icon: <Globe className="text-teal-600" /> },
  { name: "Postman", icon: <Server className="text-orange-500" /> },
  { name: "Deployment", icon: <Server className="text-indigo-500" /> },
]

// SkillBox component
const SkillBox = ({ title, skills }) => {
  return (
            <div className="border-2 border-black dark:border-gray-700 evening:border-evening-primary p-6 h-full rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl hover:translate-y-[-5px] hover:border-gray-700 dark:hover:border-gray-500 evening:hover:border-evening-secondary bg-white dark:bg-gray-800 evening:bg-[#E9F0E6] relative overflow-hidden group">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent to-gray-100 dark:to-gray-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <div className="relative z-10">
        <h3 className="text-2xl font-semibold mb-4 flex items-center gap-2 text-gray-900 dark:text-gray-100 evening:text-evening-primary group-hover:text-gray-800 dark:group-hover:text-gray-200 evening:group-hover:text-evening-secondary">
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
  return (
    <section 
      id="skills" 
      className="py-16 md:py-24 relative w-screen -ml-[13%] -mr-[10%]"
      style={{
        backgroundImage: `url('https://images.pexels.com/photos/963278/pexels-photo-963278.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Add an overlay div for better readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/90 to-gray-50/90 dark:from-gray-900/95 dark:to-gray-800/95 evening:from-white/90 evening:to-gray-50/90"></div>
      
      <div className="relative z-10 px-[10%]">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 evening:text-evening-primary mb-2">Skills</h2>
          <p className="text-gray-600 dark:text-gray-400 evening:text-evening-foreground">What I Bring to the Table</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Large box on the left */}
          <div className="h-full">
            <SkillBox title="Frontend" skills={frontendSkills} />
          </div>
          
          {/* Two stacked boxes on the right */}
          <div className="flex flex-col gap-8">
            <div>
              <SkillBox title="Backend" skills={backendSkills} />
            </div>
            <div>
              <SkillBox title="Tools" skills={toolsSkills} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
