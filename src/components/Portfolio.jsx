"use client"

import { useState } from "react"
import { ArrowRight, Github } from "lucide-react"
import { cn } from "../utils"
import VideoButton from "./VideoButton"
import { useTheme } from "./ThemeProvider"

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
    demoVideo: "https://res.cloudinary.com/dqhn4dq02/video/upload/v1740999850/p5ditex5ags07kvajspz.mp4",
    size: "large", // large card
    bgColor: "bg-zinc-900", // changed from orange to dark gray
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
    size: "small",
    bgColor: "bg-black",
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
    size: "small",
    bgColor: "bg-zinc-800",
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
    size: "medium",
    bgColor: "bg-black",
  },
  {
    id: 5,
    title: "Finctrl Prototype",
    category: "Figma",
    image: "https://res.cloudinary.com/dqhn4dq02/image/upload/v1741248835/hudrwpm8ah1hnlfo0ahm.png",
    link: "https://www.figma.com/proto/DNBtQzukvRqvlJOR15WNiD/FINAL-PROJECT?node-id=165-316&t=IJSgkeDiJ1yPqsuJ-1",
    description: "A sleek Figma prototype for a financial management tool with a simple and intuitive UI.",
    technologies: ["Figma", "Simple UI"],
    size: "small",
    bgColor: "bg-zinc-800",
  },
  {
    id: 6,
    title: "Smellwell",
    category: "Figma",
    image: "https://imgs.search.brave.com/ELfHBTs87TF2P24kqZI3_46dZHTAEFr2ute2byxK3Zw/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/bmFtZWJyYW5kc3Bl/cmZ1bWUuY29tL2lt/YWdlcy93ZWxjb21l/LmpwZw",
    link: "https://www.figma.com/proto/9tFxecNpUhwc9yXIunCS2P/something-like-cloning?page-id=218%3A73&node-id=227-440&viewport=588%2C159%2C0.11&t=IH2rnykLPCUofh1R-1&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=227%3A440",
    description: "A Figma design for a fragrance brand landing page, featuring prototyping and a clean UI.",
    technologies: ["Figma", "Simple UI", "Prototyping"],
    size: "medium",
    bgColor: "bg-zinc-900",
  },
  {
    id: 7,
    title: "Cricknews",
    category: "Figma",
    image: "https://imgs.search.brave.com/hvUAlclO2Pq5ixG3UC93dXKraejWOu-SLSrSbuk9MzE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9sb2dv/LmNvbS9pbWFnZS1j/ZG4vaW1hZ2VzL2t0/czkyOHBkL3Byb2R1/Y3Rpb24vNzI5ZWYy/OTliNjI4ZTZmNDBk/ODViMmI2YWM2OWEy/ZWMyNTE2MmYwZi03/MzF4NzMxLnBuZz93/PTEwODAmcT03MiZm/bT13ZWJw",
    link: "https://www.figma.com/proto/9tFxecNpUhwc9yXIunCS2P/something-like-cloning?node-id=90-400&t=uwCXGdlQ3AxLspQy-1",
    description: "A Figma prototype for a cricket news platform with interactive elements.",
    technologies: ["Figma", "Prototyping"],
    size: "large",
    bgColor: "bg-zinc-800",
  },
  {
    id: 8,
    title: "Instagram Prototype",
    category: "Figma",
    image: "https://imgs.search.brave.com/gPZT1daGnqAjIB8yW5fG0cUuGqNhb3ZbYQqVY8Gy6S8/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy90/aHVtYi85Lzk1L0lu/c3RhZ3JhbV9sb2dv/XzIwMjIuc3ZnLzIy/MHB4LUluc3RhZ3Jh/bV9sb2dvXzIwMjIu/c3ZnLnBuZw",
    link: "https://www.figma.com/proto/9tFxecNpUhwc9yXIunCS2P/something-like-cloning?node-id=43-87&t=uwCXGdlQ3AxLspQy-1",
    description: "A Figma recreation of Instagram's interface with prototyping features.",
    technologies: ["Figma", "Prototyping"],
    size: "small",
    bgColor: "bg-black",
  },
  {
    id: 9,
    title: "One Page Social Media Design",
    category: "Figma",
    image: "https://res.cloudinary.com/dqhn4dq02/image/upload/v1740113499/hinsjwtehr2aoxyj0f0s.png",
    link: "https://www.figma.com/proto/1rN6JDvA6MVeTwyABaoaHO/EXAM-BUT-UNIQE-IDEA?page-id=0%3A1&node-id=2-2&p=f&viewport=500%2C484%2C0.63&t=YXlQOTdePAZgLyKv-1&scaling=min-zoom&content-scaling=fixed",
    description: "A unique one-page social media design created in Figma with a creative layout.",
    technologies: ["Figma"],
    size: "medium",
    bgColor: "bg-black",
  },
]

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState("All")
  const { theme } = useTheme()
  
  const filteredProjects =
    activeCategory === "All" ? projects : projects.filter((project) => project.category === activeCategory)

  // Define size classes for different card sizes with asymmetric layout
  const getSizeClasses = (size, index) => {
    // Base size classes
    let sizeClass = '';
    
    switch (size) {
      case 'large':
        sizeClass = 'lg:col-span-2 lg:row-span-2';
        break;
      case 'medium':
        sizeClass = 'lg:col-span-1 lg:row-span-2';
        break;
      case 'small':
      default:
        sizeClass = 'lg:col-span-1 lg:row-span-1';
    }
    
    // Add randomized asymmetric layout for certain indexes
    if (index % 5 === 0) {
      return `${sizeClass} md:col-span-2`; 
    } else if (index % 7 === 0) {
      return `${sizeClass} md:col-start-2`; 
    } else {
      return sizeClass;
    }
  }

  const getImageHeight = (size) => {
    switch (size) {
      case 'large':
        return 'h-[65%]';
      case 'medium':
        return 'h-[58%]';
      case 'small':
      default:
        return 'h-48';
    }
  }

  // Get variable padding for cards to create asymmetry
  const getCardPadding = (index) => {
    const paddingOptions = ['p-4', 'p-5', 'p-6', 'p-7', 'p-8'];
    return paddingOptions[index % paddingOptions.length];
  }

  return (
    <section id="portfolio" className="py-16 bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
      <div className="container mx-auto px-4">
        <div className="text-left mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">PROJECTS</h2>
        </div>

        <div className="flex gap-4 mb-8 overflow-x-auto pb-2 border-b border-gray-800 dark:border-gray-200">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={cn(
                "px-6 py-2 border border-gray-800 dark:border-white rounded-full text-sm transition-colors whitespace-nowrap",
                activeCategory === category
                  ? "bg-gray-800 dark:bg-white text-white dark:text-gray-900"
                  : "bg-transparent text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-white/10"
              )}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 auto-rows-auto gap-3 md:gap-4 lg:gap-6">
          {filteredProjects.map((project, index) => (
            <div 
              key={project.id} 
              className={cn(
                "relative rounded-lg overflow-hidden transition-all duration-300",
                "before:absolute before:inset-0 before:border-2 before:border-gray-200 dark:before:border-gray-700 before:rounded-lg",
                "hover:before:border-gray-400 dark:hover:before:border-gray-500",
                "after:absolute after:inset-0 after:border after:border-gray-100 dark:after:border-gray-800 after:rounded-lg",
                "hover:shadow-xl hover:shadow-gray-100/20 dark:hover:shadow-gray-900/30",
                "flex flex-col group",
                getSizeClasses(project.size, index),
                project.bgColor,
                index % 3 === 0 ? 'mt-2' : '',
                index % 4 === 0 ? 'md:mt-4' : '',
              )}
            >
              <div className={cn("relative overflow-hidden group", getImageHeight(project.size))}>
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  className="w-full h-full object-fill transform transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gray-800 dark:bg-grey-200 bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-10">
                  <div className="space-x-4 relative z-20">
                    {project.github && (
                      <a 
                        href={project.github} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center p-2 bg-white dark:bg-gray-200 rounded-full text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-300 transition-colors duration-300 cursor-pointer"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Github className="w-5 h-5" />
                      </a>
                    )}
                    <a 
                      href={project.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center p-2 bg-white dark:bg-gray-200 rounded-full text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-300 transition-colors duration-300 cursor-pointer"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <ArrowRight className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </div>
              <div className={cn(getCardPadding(index), "flex-1 flex flex-col")}>
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">{project.title}</h3>
                </div>
                
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 line-clamp-2">{project.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-auto">
                  {project.technologies && project.technologies.slice(0, 3).map((tech, index) => (
                    <span key={index} className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-300 px-2 py-1 rounded-full">
                      {tech}
                    </span>
                  ))}
                </div>
                
                {project.demoVideo && (
                  <div className="mt-3">
                    <VideoButton 
                      videoUrl={project.demoVideo}
                      videoTitle={`${project.title} Demo`}
                      text="Browse product"
                      iconSize="w-4 h-4"
                      className="text-sm border border-gray-800 dark:border-white text-gray-800 dark:text-white hover:bg-gray-800 hover:text-white dark:hover:bg-white dark:hover:text-gray-900 rounded-full px-4 py-2"
                    />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}