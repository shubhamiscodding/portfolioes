"use client"

import { useState, useEffect, useRef } from "react"
import { Menu, X, Moon, Sun, Move, Home, Briefcase, Code2, Phone, Lightbulb, Layers } from "lucide-react"
import { cn } from "../utils"
import { motion } from "framer-motion"
import { useTheme } from "./ThemeProvider"
import Draggable from "react-draggable"

const navLinks = [
  { name: "Home", href: "#home", icon: <Home className="w-5 h-5" /> },
  { name: "About", href: "#about", icon: <Briefcase className="w-5 h-5" /> },
  { name: "Skills", href: "#skills", icon: <Lightbulb className="w-5 h-5" /> },
  { name: "Services", href: "#services", icon: <Layers className="w-5 h-5" /> },
  { name: "Portfolio", href: "#portfolio", icon: <Code2 className="w-5 h-5" /> },
  { name: "Contact", href: "#contact", icon: <Phone className="w-5 h-5" /> },
]

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const [isDragging, setIsDragging] = useState(false)
  const [position, setPosition] = useState({ x: 20, y: 20 })
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [showFloatingNav, setShowFloatingNav] = useState(true)
  const [isLoading, setIsLoading] = useState(true)
  const nodeRef = useRef(null)

  // Set mounted to true on client side
  useEffect(() => {
    setMounted(true)
  }, [])

  // Simulate loading time similar to LoadingScreen component
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)

      // Determine active section based on scroll position
      const sections = navLinks.map((link) => link.href.substring(1))
      const currentSection = sections.find((section) => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          return rect.top <= 100 && rect.bottom >= 100
        }
        return false
      })

      if (currentSection) {
        setActiveSection(currentSection)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleFloatingNav = () => {
    setShowFloatingNav(!showFloatingNav)
    if (showFloatingNav) {
      // When switching to the fixed header, reset position for when we come back to floating
      setPosition({ x: 20, y: 20 })
    }
  }

  const handleDragStart = () => {
    setIsDragging(true)
  }

  const handleDragStop = (e, data) => {
    setPosition({ x: data.x, y: data.y })
    setTimeout(() => {
      setIsDragging(false)
    }, 100)
  }

  // Handle link clicks without triggering drag events
  const handleLinkClick = (e) => {
    if (isDragging) {
      e.preventDefault()
    }
  }

  const scrollToSection = (href) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  // Determine current theme for icon display
  const currentTheme = mounted && theme ? theme : "light"
  
  // If the page is still loading, don't show the navigation
  if (isLoading) {
    return null
  }

  // Floating navigation bar
  const floatingNav = (
    <Draggable nodeRef={nodeRef} position={position} onStart={handleDragStart} onStop={handleDragStop} bounds="parent">
      <div
        ref={nodeRef}
        className="fixed z-50 flex items-center gap-2 p-3 bg-white dark:bg-gray-800 rounded-xl shadow-lg cursor-move"
        style={{ touchAction: "none" }}
      >
        {navLinks.map((link) => (
          <button
            key={link.name}
            onClick={() => scrollToSection(link.href)}
            className={cn(
              "p-3 rounded-xl shadow-lg transition-all hover:scale-[1.3]",
              activeSection === link.href.substring(1) 
                ? "bg-gray-200 dark:bg-gray-700" 
                : "bg-gray-100 dark:bg-gray-900 hover:bg-gray-200 dark:hover:bg-gray-700",
            )}
            aria-label={link.name}
          >
            <span className="text-gray-900 dark:text-gray-100 inline-block">{link.icon}</span>
          </button>
        ))}
        <div className="flex items-center gap-2 ml-2">
          <button
            onClick={() => setTheme(currentTheme === "dark" ? "light" : "dark")}
            className="p-3 bg-gray-100 dark:bg-gray-900 rounded-xl shadow-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-all hover:scale-[1.3]"
            aria-label="Toggle theme"
          >
            {mounted &&
              (currentTheme === "dark" ? (
                <Sun size={20} className="text-gray-900 dark:text-gray-100 inline-block" />
              ) : (
                <Moon size={20} className="text-gray-900 dark:text-gray-100 inline-block" />
              ))}
          </button>
          <button
            onClick={toggleFloatingNav}
            className="p-3 bg-gray-100 dark:bg-gray-900 rounded-xl shadow-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-all hover:scale-[1.3]"
          >
            <X className="w-5 h-5 text-gray-900 dark:text-gray-100 inline-block" />
          </button>
        </div>
      </div>
    </Draggable>
  )

  // Only show the static header if floating nav is not active
  if (showFloatingNav) {
    return floatingNav
  }

  return (
    <header className="fixed top-0 left-0 w-full z-40">
      <div
        className={cn(
          "transition-all duration-300 rounded-xl backdrop-blur-md",
          scrolled ? "bg-white/90 dark:bg-gray-900/90 shadow-lg" : "bg-white/80 dark:bg-gray-900/80",
          "py-3",
        )}
      >
        <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
          <a
            href="#home"
            className="text-xl font-semibold text-gray-800 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            onClick={handleLinkClick}
          >
            Smith
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={cn(
                  "relative px-4 py-2 rounded-full text-gray-600 dark:text-gray-300 transition-all duration-300",
                  activeSection === link.href.substring(1)
                    ? "text-gray-900 dark:text-white font-medium"
                    : "hover:text-gray-900 dark:hover:text-white hover:bg-gray-100/50 dark:hover:bg-gray-800/50",
                )}
                onClick={handleLinkClick}
              >
                {link.name}
                {activeSection === link.href.substring(1) && (
                  <motion.span
                    layoutId="navbar-indicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900 dark:bg-white mx-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            {/* Theme Toggle */}
            <button
              onClick={() => setTheme(currentTheme === "dark" ? "light" : "dark")}
              className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100/50 dark:hover:bg-gray-800/50 transition-colors hover:scale-[1.3]"
              aria-label="Toggle theme"
            >
              {mounted && (currentTheme === "dark" ? <Sun size={20} className="inline-block" /> : <Moon size={20} className="inline-block" />)}
            </button>

            {/* Float Toggle */}
            <button
              onClick={toggleFloatingNav}
              className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100/50 dark:hover:bg-gray-800/50 transition-colors hidden md:flex hover:scale-[1.3]"
              aria-label="Show floating navigation"
            >
              <Move size={20} className="inline-block" />
            </button>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 p-2 rounded-full transition-colors hover:scale-[1.3]"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} className="inline-block" /> : <Menu size={24} className="inline-block" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.div
            className="md:hidden bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <nav className="flex flex-col py-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className={cn(
                    "px-4 py-3 mx-2 my-1 rounded-md transition-all duration-200 flex items-center gap-2",
                    activeSection === link.href.substring(1)
                      ? "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white font-medium"
                      : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800/50",
                  )}
                  onClick={() => {
                    setIsMenuOpen(false)
                    handleLinkClick()
                  }}
                >
                  {link.icon && <span className="inline-block">{link.icon}</span>}
                  {link.name}
                </a>
              ))}
              <div className="px-4 py-3 mx-2 my-1">
                <button
                  onClick={() => {
                    toggleFloatingNav()
                    setIsMenuOpen(false)
                  }}
                  className="w-full px-3 py-2 mt-2 flex items-center justify-center gap-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md text-gray-900 dark:text-white transition-colors"
                >
                  <Move size={18} className="inline-block" />
                  <span>Switch to fixed navbar</span>
                </button>
              </div>
            </nav>
          </motion.div>
        )}
      </div>
    </header>
  )
}
