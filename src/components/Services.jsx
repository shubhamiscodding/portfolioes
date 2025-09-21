import { LayoutGrid, Code, Server } from "lucide-react"
import { useTheme } from "./ThemeProvider"
import { motion, useInView } from "framer-motion"
import { useRef, useEffect, useState } from "react"
import FadeInSection from "./FadeInSection"

const AnimatedCounter = ({ end, duration = 2, suffix = "" }) => {
  const [count, setCount] = useState(0)
  const countRef = useRef(null)
  const isInView = useInView(countRef, { once: true })

  useEffect(() => {
    if (isInView) {
      let startTime
      let animationFrame

      const animate = (currentTime) => {
        if (!startTime) startTime = currentTime
        const progress = Math.min((currentTime - startTime) / (duration * 1000), 1)
        
        const easeOutQuart = 1 - Math.pow(1 - progress, 4)
        setCount(Math.floor(easeOutQuart * end))

        if (progress < 1) {
          animationFrame = requestAnimationFrame(animate)
        }
      }

      animationFrame = requestAnimationFrame(animate)
      return () => cancelAnimationFrame(animationFrame)
    }
  }, [isInView, end, duration])

  return <span ref={countRef}>{count}{suffix}</span>
}

const gridItems = [
  {
    icon: <LayoutGrid className="w-12 h-12" />,
    label: "Web Designer",
    description: "Web Designer",
    type: "stat",
    bgColor: "bg-[#E9F0E6] dark:bg-gray-800 evening:bg-[#D1D9CF]",
    iconColor: "text-gray-800 dark:text-gray-300 evening:text-evening-primary",
    borderColor: "border-[#030712] dark:border-gray-700 evening:border-evening-primary"
  },
  {
    icon: <Code className="w-12 h-12" />,
    label: "UI/UX Designer", 
    description: "UI/UX Designer",
    type: "stat",
    bgColor: "bg-[#E9F0E6] dark:bg-gray-800 evening:bg-[#D1D9CF]",
    iconColor: "text-gray-800 dark:text-gray-300 evening:text-evening-primary",
    borderColor: "border-[#030712] dark:border-gray-700 evening:border-evening-primary"
  },
  {
    icon: <Server className="w-12 h-12" />,
    label: "Backend Developer",
    description: "Backend Developer", 
    type: "stat",
    bgColor: "bg-[#E9F0E6] dark:bg-gray-800 evening:bg-[#D1D9CF]",
    iconColor: "text-gray-800 dark:text-gray-300 evening:text-evening-primary",
    borderColor: "border-[#030712] dark:border-gray-700 evening:border-evening-primary"
  }
]

export default function Services() {
  const { theme } = useTheme();
  
  // Define theme-specific styles
  const getBoxStyles = () => {
    switch(theme) {
      case 'dark':
        return {
          background: 'bg-gray-800',
          border: 'border-gray-700',
          hoverBg: 'hover:bg-[#030712]'
        };
      case 'evening':
        return {
          background: 'bg-[#D1D9CF]',
          border: 'border-evening-primary',
          hoverBg: 'hover:bg-[#B0BEC5]'
        };
      default: // light theme
        return {
          background: 'bg-[#E9F0E6]',
          border: 'border-[#030712]',
          hoverBg: 'hover:bg-[#C9C7BA]'
        };
    }
  };

  const boxStyles = getBoxStyles();
  
  return (
    <section id="services" className="py-16 md:py-24 dark:bg-gray-900 evening:bg-evening-background">
      <div className="">
        <FadeInSection duration={0.3}>
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 evening:text-evening-primary mb-2">Services</h2>
            <p className="text-gray-600 dark:text-gray-400 evening:text-evening-foreground">What I offer</p>
          </div>
        </FadeInSection>

        {/* Connected Horizontal Grid Layout */}
        <FadeInSection duration={0.4}>
          <div className="max-w-6xl mx-auto">
            <div className="border-2 border-gray-800 dark:border-gray-300 evening:border-evening-primary flex flex-col md:flex-row">
              {gridItems.map((item, index) => (
                <motion.div
                  key={index}
                  className={`${boxStyles.background} ${boxStyles.hoverBg} p-6 md:p-8 text-center relative flex-1 transition-colors duration-200 ${
                    index !== gridItems.length - 1 ? `border-b-2 md:border-b-0 md:border-r-2 ${boxStyles.border}` : ''
                  }`}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >

                  {/* Content */}
                  <div className="flex flex-col items-center justify-center h-full">
                    {/* Icon */}
                    <motion.div 
                      className={`${item.iconColor} mb-4 md:mb-6`}
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <div className="w-8 h-8 md:w-12 md:h-12">
                        {item.icon}
                      </div>
                    </motion.div>
                    
                    {/* Label */}
                    <h3 className="text-xs sm:text-sm font-medium text-gray-900 dark:text-gray-100 evening:text-evening-primary whitespace-normal md:whitespace-nowrap">
                      {item.label.toUpperCase()}
                    </h3>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </FadeInSection>
      </div>
    </section>
  )
}
