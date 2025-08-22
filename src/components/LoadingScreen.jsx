"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { useTheme } from "./ThemeProvider"

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true)
  const [mounted, setMounted] = useState(false)
  const { theme } = useTheme()

  useEffect(() => {
    setMounted(true)
    
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  if (!isLoading) return null

  // Determine colors based on theme
  const isDark = mounted && theme === "dark"
  const isEvening = mounted && theme === "evening"
  const bgColor = isDark ? "bg-gray-900" : isEvening ? "bg-evening-background" : "bg-white"
  const blobColor = isDark ? "bg-gray-200" : isEvening ? "bg-evening-secondary" : "bg-gray-800"
  const strokeColor = isDark ? "stroke-gray-300" : isEvening ? "stroke-evening-foreground" : "stroke-gray-700"
  
  return (
    <div className={`fixed inset-0 ${bgColor} z-50 flex items-center justify-center`}>
      <div className="relative w-full h-full">
        {/* Blob 1 */}
        <motion.div
          className={`absolute w-[5vmin] h-[5vmin] ${blobColor} rounded-full opacity-80`}
          style={{ top: "40%", left: "30%" }}
          animate={{
            scale: [1, 1.2, 1],
            x: [0, "5vmin", 0],
            y: [0, "-5vmin", 0],
          }}
          transition={{
            duration: 3,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        />

        <motion.div
          className={`absolute w-[5vmin] h-[5vmin] ${blobColor} rounded-full opacity-80`}
          style={{ top: "50%", left: "40%" }}
          animate={{
            scale: [1, 1.2, 1],
            x: [0, "5vmin", 0],
            y: [0, "-5vmin", 0],
          }}
          transition={{
            duration: 3,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        />

        {/* Blob 2 */}
        <motion.div
          className={`absolute w-[7vmin] h-[7vmin] ${blobColor} rounded-full opacity-80`}
          style={{ top: "50%", left: "50%" }}
          animate={{
            scale: [1, 1.5, 1],
            x: [0, "-8vmin", 0],
            y: [0, "8vmin", 0],
          }}
          transition={{
            duration: 4,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        />

        {/* Blob 3 */}
        <motion.div
          className={`absolute w-[6vmin] h-[6vmin] ${blobColor} rounded-full opacity-80`}
          style={{ top: "40%", right: "30%" }}
          animate={{
            scale: [1, 1.3, 1],
            x: [0, "9vmin", 0],
            y: [0, "3vmin", 0],
          }}
          transition={{
            duration: 3.5,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        />

        {/* Blob 4 */}
        <motion.div
          className={`absolute w-[4vmin] h-[4vmin] ${blobColor} rounded-full opacity-80`}
          style={{ bottom: "35%", right: "25%" }}
          animate={{
            scale: [1, 1.2, 1],
            x: [0, "-4vmin", 0],
            y: [0, "-6vmin", 0],
          }}
          transition={{
            duration: 2.5,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        />

        {/* Blob 5 */}
        <motion.div
          className={`absolute w-[3vmin] h-[3vmin] ${blobColor} rounded-full opacity-80`}
          style={{ bottom: "40%", left: "35%" }}
          animate={{
            scale: [1, 1.4, 1],
            x: [0, "3vmin", 0],
            y: [0, "4vmin", 0],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        />

        {/* Responsive SVG container */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1000 1000" preserveAspectRatio="xMidYMid meet">
          <motion.path
            d="M 250,500 C 350,400 450,600 550,500"
            className={strokeColor}
            strokeWidth="2"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.5 }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
          />
          <motion.path
            d="M 550,500 C 650,400 750,600 850,500"
            className={strokeColor}
            strokeWidth="2"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.5 }}
            transition={{ duration: 2.5, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse", delay: 0.3 }}
          />
        </svg>
      </div>
    </div>
  )
}
