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
  const bgColor = isDark ? "bg-gray-900" : "bg-white"
  const blobColor = isDark ? "bg-gray-200" : "bg-gray-800"
  const strokeColor = isDark ? "stroke-gray-300" : "stroke-gray-700"
  
  return (
    <div className={`fixed inset-0 ${bgColor} z-50 flex items-center justify-center`}>
      <div className="relative w-full h-full">
        {/* Blob 1 */}
        <motion.div
          className={`absolute w-16 h-16 ${blobColor} rounded-full opacity-80`}
          style={{ top: "40%", left: "30%" }}
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 20, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 3,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        />

        <motion.div
          className={`absolute w-16 h-16 ${blobColor} rounded-full opacity-80`}
          style={{ top: "50%", left: "40%" }}
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 20, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 3,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        />

        {/* Blob 2 */}
        <motion.div
          className={`absolute w-24 h-24 ${blobColor} rounded-full opacity-80`}
          style={{ top: "50%", left: "50%" }}
          animate={{
            scale: [1, 1.5, 1],
            x: [0, -30, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 4,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        />

        {/* Blob 3 */}
        <motion.div
          className={`absolute w-20 h-20 ${blobColor} rounded-full opacity-80`}
          style={{ top: "40%", right: "30%" }}
          animate={{
            scale: [1, 1.3, 1],
            x: [0, 40, 0],
            y: [0, 10, 0],
          }}
          transition={{
            duration: 3.5,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        />

        {/* Blob 4 */}
        <motion.div
          className={`absolute w-12 h-12 ${blobColor} rounded-full opacity-80`}
          style={{ bottom: "35%", right: "25%" }}
          animate={{
            scale: [1, 1.2, 1],
            x: [0, -15, 0],
            y: [0, -25, 0],
          }}
          transition={{
            duration: 2.5,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        />

        {/* Blob 5 */}
        <motion.div
          className={`absolute w-8 h-8 ${blobColor} rounded-full opacity-80`}
          style={{ bottom: "40%", left: "35%" }}
          animate={{
            scale: [1, 1.4, 1],
            x: [0, 10, 0],
            y: [0, 15, 0],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        />

        {/* Connecting lines using SVG paths */}
        <svg className="absolute inset-0 w-full h-full">
          <motion.path
            d="M 250,250 C 300,200 350,300 400,250"
            className={strokeColor}
            strokeWidth="2"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.5 }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
          />
          <motion.path
            d="M 400,250 C 450,200 500,300 550,250"
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
