"use client"

import { useState, useEffect } from "react"
import { ArrowUp } from "lucide-react"
import { cn } from "../utils"

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false)

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true)
    } else {
      setIsVisible(false)
    }
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility)
    return () => window.removeEventListener("scroll", toggleVisibility)
  }, [])

  return (
    <button
      onClick={scrollToTop}
      className={cn(
        "fixed bottom-6 right-6 p-3 rounded-full bg-gray-800 dark:bg-gray-700 text-white shadow-lg transition-opacity duration-300 z-50 hover:bg-gray-700 dark:hover:bg-gray-600",
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none",
      )}
    >
      <ArrowUp className="w-5 h-5" />
    </button>
  )
}
