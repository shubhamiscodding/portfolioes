"use client"

import { useState } from "react"
import { ArrowRight, Github } from "lucide-react"
import { cn } from "../utils"
import VideoButton from "./VideoButton"

const categories = ["All", "Web", "Figma"]

const projects = [
  {
    id: 1,
    title: "FinCtrl",
    category: "Web",
    image: "https://res.cloudinary.com/dqhn4dq02/image/upload/v1741248835/hudrwpm8ah1hnlfo0ahm.png",
    link: "https://fin-ctrl-frontend-1.onrender.com",
    github: "https://github.com/shubhamiscodding/Fin_Ctrl",
    description: "A comprehensive financial management system that helps you track expenses, manage budgets, and analyze spending patterns effectively.",
    technologies: ["MongoDB", "Express", "React", "Node.js", "Tailwindcss", "JavaScript"],
    demoVideo: "https://res.cloudinary.com/dqhn4dq02/video/upload/v1740999850/p5ditex5ags07kvajspz.mp4"
  },
  {
    id: 2,
    title: "Progcap Clone",
    category: "Web",
    image: "https://cdn.prod.website-files.com/6193782af8f15b5c5763d1de/619b51335bf284cd78d1b5e1_Progcap_Logo.svg",
    link: "https://progcap-clone.onrender.com",
    github: "https://github.com/shubhamiscodding/progcap-clone",
    description: "A pixel-perfect clone of the Progcap platform, showcasing advanced React implementation and responsive design techniques.",
    technologies: ["React", "CSS", "JavaScript"],
    // demoVideo: "https://res.cloudinary.com/dqhn4dq02/video/upload/v1740999850/p5ditex5ags07kvajspz.mp4"
  },
  {
    id: 3,
    title: "Apollo Clone",
    category: "Web",
    image: "https://images.apollo247.in/images/pharmacy_logo.svg?tr=q-70,w-100,dpr-2,c-at_max",
    link: "https://apolloclone.onrender.com",
    github: "https://github.com/shubhamiscodding/apolloclone",
    description: "A faithful recreation of the Apollo healthcare platform interface, demonstrating attention to detail in UI/UX design.",
    technologies: ["HTML", "CSS"],
  },
  {
    id: 4,
    title: "Youtube Clone",
    category: "Web",
    image: "https://media2.salon.com/2025/02/youtube_logo_is_displayed_on_a_mobile_phone_1246972841.jpg",
    link: "https://youtube-frontend-ch16.onrender.com",
    github: "https://github.com/shubhamiscodding/spotify-with-react/tree/main/you-vite-react",
    description: "A feature-rich YouTube clone that implements core functionalities using React and external APIs.",
    technologies: ["React", "API Integration"],
  },
  {
    id: 5,
    title: "Finctrl Prototype",
    category: "Figma",
    image: "https://res.cloudinary.com/dqhn4dq02/image/upload/v1741248835/hudrwpm8ah1hnlfo0ahm.png",
    link: "https://www.figma.com/proto/DNBtQzukvRqvlJOR15WNiD/FINAL-PROJECT?node-id=165-316&t=IJSgkeDiJ1yPqsuJ-1",
    description: "A sleek Figma prototype for a financial management tool with a simple and intuitive UI.",
    technologies: ["Figma", "Simple UI"],
  },
  {
    id: 6,
    title: "Smellwell",
    category: "Figma",
    image: "https://imgs.search.brave.com/ELfHBTs87TF2P24kqZI3_46dZHTAEFr2ute2byxK3Zw/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/bmFtZWJyYW5kc3Bl/cmZ1bWUuY29tL2lt/YWdlcy93ZWxjb21l/LmpwZw",
    link: "https://www.figma.com/proto/9tFxecNpUhwc9yXIunCS2P/something-like-cloning?page-id=218%3A73&node-id=227-440&viewport=588%2C159%2C0.11&t=IH2rnykLPCUofh1R-1&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=227%3A440",
    description: "A Figma design for a fragrance brand landing page, featuring prototyping and a clean UI.",
    technologies: ["Figma", "Simple UI", "Prototyping"],
  },
  {
    id: 7,
    title: "Cricknews",
    category: "Figma",
    image: "https://imgs.search.brave.com/hvUAlclO2Pq5ixG3UC93dXKraejWOu-SLSrSbuk9MzE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9sb2dv/LmNvbS9pbWFnZS1j/ZG4vaW1hZ2VzL2t0/czkyOHBkL3Byb2R1/Y3Rpb24vNzI5ZWYy/OTliNjI4ZTZmNDBk/ODViMmI2YWM2OWEy/ZWMyNTE2MmYwZi03/MzF4NzMxLnBuZz93/PTEwODAmcT03MiZm/bT13ZWJw",
    link: "https://www.figma.com/proto/9tFxecNpUhwc9yXIunCS2P/something-like-cloning?node-id=90-400&t=uwCXGdlQ3AxLspQy-1",
    description: "A Figma prototype for a cricket news platform with interactive elements.",
    technologies: ["Figma", "Prototyping"],
  },
  {
    id: 8,
    title: "Instagram Prototype",
    category: "Figma",
    image: "https://imgs.search.brave.com/gPZT1daGnqAjIB8yW5fG0cUuGqNhb3ZbYQqVY8Gy6S8/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy90/aHVtYi85Lzk1L0lu/c3RhZ3JhbV9sb2dv/XzIwMjIuc3ZnLzIy/MHB4LUluc3RhZ3Jh/bV9sb2dvXzIwMjIu/c3ZnLnBuZw",
    link: "https://www.figma.com/proto/9tFxecNpUhwc9yXIunCS2P/something-like-cloning?node-id=43-87&t=uwCXGdlQ3AxLspQy-1",
    description: "A Figma recreation of Instagram's interface with prototyping features.",
    technologies: ["Figma", "Prototyping"],
  },
  {
    id: 9,
    title: "One Page Social Media Design",
    category: "Figma",
    image: "https://res.cloudinary.com/dqhn4dq02/image/upload/v1740113499/hinsjwtehr2aoxyj0f0s.png",
    link: "https://www.figma.com/proto/1rN6JDvA6MVeTwyABaoaHO/EXAM-BUT-UNIQE-IDEA?page-id=0%3A1&node-id=2-2&p=f&viewport=500%2C484%2C0.63&t=YXlQOTdePAZgLyKv-1&scaling=min-zoom&content-scaling=fixed",
    description: "A unique one-page social media design created in Figma with a creative layout.",
    technologies: ["Figma"],
  },
]

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState("All")

  const filteredProjects =
    activeCategory === "All" ? projects : projects.filter((project) => project.category === activeCategory)

  return (
    <section id="portfolio" className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">Portfolio</h2>
          <p className="text-gray-600 dark:text-gray-400">Most recent work</p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={cn(
                "px-6 py-2 rounded-full transition-colors",
                activeCategory === category
                  ? "bg-gray-800 text-white dark:bg-gray-700 dark:text-white"
                  : "bg-transparent text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800",
              )}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div key={project.id} className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="relative overflow-hidden group">
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  className="w-full h-64 object-fit transform transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="space-x-4">
                    {project.github && (
                      <a 
                        href={project.github} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center p-2 bg-white rounded-full text-gray-800 hover:bg-gray-200 transition-colors duration-300"
                      >
                        <Github className="w-5 h-5" />
                      </a>
                    )}
                    <a 
                      href={project.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center p-2 bg-white rounded-full text-gray-800 hover:bg-gray-200 transition-colors duration-300"
                    >
                      <ArrowRight className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">{project.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies && project.technologies.slice(0, 3).map((tech, index) => (
                    <span key={index} className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300 px-2 py-1 rounded">
                      {tech}
                    </span>
                  ))}
                </div>
                {project.demoVideo && (
                  <VideoButton 
                    videoUrl={project.demoVideo}
                    videoTitle={`${project.title} Demo`}
                    text="Watch Demo"
                    iconSize="w-4 h-4"
                    className="text-sm"
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
