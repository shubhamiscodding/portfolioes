"use client"

import { useState, useEffect, useRef } from "react"
import { Menu, X, Moon, Sun, Move, Home, Briefcase, Code2, Phone, Lightbulb, Layers } from "lucide-react"
import { cn } from "../utils"
import { motion, AnimatePresence } from "framer-motion"
import Draggable from "react-draggable"
import { useTheme } from "./ThemeProvider"

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
  const [activeSection, setActiveSection] = useState("")
  const [isDragging, setIsDragging] = useState(false)
  const [position, setPosition] = useState({ x: 20, y: 20 })
  const [mounted, setMounted] = useState(false)
  const [showFloatingNav, setShowFloatingNav] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const nodeRef = useRef(null)
  const { theme, toggleTheme } = useTheme()
  const [hasScrolled, setHasScrolled] = useState(false)
  const [visibleSections, setVisibleSections] = useState({})
  const observers = useRef({})
  const [isMobile, setIsMobile] = useState(false)

  // Check if mobile on mount
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    // Check initially
    checkIfMobile()
    
    // Add event listener for window resize
    window.addEventListener('resize', checkIfMobile)
    
    return () => {
      window.removeEventListener('resize', checkIfMobile)
    }
  }, [])

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

  // Set initial active section from URL hash
  useEffect(() => {
    const hash = window.location.hash.substring(1)
    if (hash) {
      setActiveSection(hash)
    } else {
      setActiveSection("home") // Default to home if no hash
    }
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      if (!hasScrolled && window.scrollY > 100) {
        setHasScrolled(true)
      }
      
      setScrolled(window.scrollY > 50)

      // We now primarily rely on Intersection Observer for section detection
      // This scroll handler serves as a fallback when scrolling quickly
      if (!Object.values(visibleSections).some(isVisible => isVisible)) {
        // Only run this if no section is detected as visible by observers
        const sections = navLinks.map((link) => link.href.substring(1))
        
        // Find the section that is currently in view
        const currentSection = sections.find((section) => {
          const element = document.getElementById(section)
          if (element) {
            const rect = element.getBoundingClientRect()
            return rect.top <= 150 && rect.bottom >= 100
          }
          return false
        })

        if (currentSection && currentSection !== activeSection) {
          setActiveSection(currentSection)
          
          // Update URL hash without triggering scroll (only after user has scrolled manually)
          if (hasScrolled) {
            history.replaceState(null, null, `#${currentSection}`)
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [activeSection, hasScrolled, visibleSections])

  // Set up intersection observers for each section
  useEffect(() => {
    // Create observers for each section
    const sections = navLinks.map(link => link.href.substring(1))
    
    // Clean up old observers
    Object.values(observers.current).forEach(observer => observer.disconnect())
    observers.current = {}
    
    sections.forEach(sectionId => {
      const section = document.getElementById(sectionId)
      if (!section) {
        console.warn(`Section with id "${sectionId}" not found in the DOM`)
        return
      }
      
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            // Debug log to identify if we're detecting the portfolio section
            if (sectionId === 'portfolio') {
              console.log(`Portfolio section intersection: ${entry.isIntersecting}, ratio: ${entry.intersectionRatio}`)
            }
            
            setVisibleSections(prev => ({
              ...prev,
              [sectionId]: entry.isIntersecting
            }))
            
            // If section is visible and significantly in view, update active section
            // Lowering the threshold specifically for portfolio section which might have different dimensions
            const threshold = sectionId === 'portfolio' ? 0.2 : 0.5
            if (entry.isIntersecting && entry.intersectionRatio > threshold) {
              setActiveSection(sectionId)
              
              // Only update URL if the user has scrolled manually
              if (hasScrolled) {
                history.replaceState(null, null, `#${sectionId}`)
              }
            }
          })
        },
        { 
          // Adjust thresholds to be more sensitive for detection, especially for portfolio
          threshold: [0.1, 0.2, 0.5], 
          // Adjust rootMargin to account for fixed header height and improve detection
          rootMargin: '-80px 0px -10% 0px' 
        }
      )
      
      observer.observe(section)
      observers.current[sectionId] = observer
    })
    
    return () => {
      // Clean up observers
      Object.values(observers.current).forEach(observer => observer.disconnect())
    }
  }, [hasScrolled])

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
    const sectionId = href.substring(1)
    const element = document.getElementById(sectionId)
    
    if (element) {
      setActiveSection(sectionId)
      // Update the URL
      history.pushState(null, null, href)
      
      // Smooth scroll to section
      element.scrollIntoView({ 
        behavior: "smooth",
        block: "start" 
      })
      
      // After scrolling, assume user has manually scrolled
      setHasScrolled(true)
    }
  }

  const handleThemeToggle = () => {
    toggleTheme()
  }

  // Don't render anything during loading or if not mounted
  if (isLoading || !mounted) {
    return null
  }

  // Floating navigation component
  const floatingNav = (
    <Draggable
      nodeRef={nodeRef}
      handle=".drag-handle"
      position={position}
      onStart={handleDragStart}
      onStop={handleDragStop}
      bounds="body"
    >
      <div
        ref={nodeRef}
        className={cn(
          "fixed z-50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md p-2 rounded-2xl shadow-lg transition-all duration-300",
          isDragging ? "cursor-grabbing" : "cursor-grab",
          "transform sm:scale-100 scale-90"
        )}
        style={{ 
          touchAction: "none",
          opacity: isMobile ? 0.85 : 1, // More transparent on mobile
          boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1)"
        }}
      >
        <div className="drag-handle p-2 flex flex-col justify-center items-center rounded-xl bg-gray-100/80 dark:bg-gray-800/80 mb-2 cursor-move">
          <div className="w-12 h-1 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
        </div>
        
        {navLinks.map((link) => (
          <button 
            key={link.name}
            className={cn(
              "relative w-12 h-12 flex items-center justify-center rounded-xl mb-2 transition-all hover:bg-gray-100 dark:hover:bg-gray-800",
              activeSection === link.href.substring(1) ? "bg-gray-100 dark:bg-gray-800" : "bg-transparent"
            )}
            onClick={(e) => {
              if (!isDragging) {
                scrollToSection(link.href)
              }
            }}
            title={link.name}
          >
            <span className="text-gray-900 dark:text-gray-100 inline-block">{link.icon}</span>
            <AnimatePresence>
              {activeSection === link.href.substring(1) && (
                <motion.span
                  layoutId="floating-indicator"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-800 dark:bg-white mx-1"
                  initial={{ opacity: 0, width: "0%" }}
                  animate={{ opacity: 1, width: "calc(100% - 0.5rem)" }}
                  exit={{ opacity: 0, width: "0%" }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 500, 
                    damping: 30,
                    duration: 0.3 
                  }}
                />
              )}
            </AnimatePresence>
          </button>
        ))}
        <div className="flex items-center gap-2 ml-2">
          <button
            onClick={handleThemeToggle}
            className="p-3 bg-gray-100 dark:bg-gray-900 rounded-xl shadow-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-all hover:scale-[1.3]"
            aria-label="Toggle theme"
          >
            {mounted &&
              (theme === "dark" ? (
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
          "transition-all duration-300 backdrop-blur-md",
          scrolled ? "bg-white/90 dark:bg-gray-900/90 shadow-lg" : "bg-white/80 dark:bg-gray-900/80",
          "py-2 sm:py-3",
        )}
      >
        <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
          <a
            href="#home"
            className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            onClick={(e) => {
              e.preventDefault()
              scrollToSection("#home")
            }}
          >
            Shubham Modi
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
                onClick={(e) => {
                  e.preventDefault()
                  scrollToSection(link.href)
                }}
              >
                {link.name}
                <AnimatePresence>
                  {activeSection === link.href.substring(1) && (
                    <motion.span
                      layoutId="navbar-indicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900 dark:bg-white mx-2"
                      initial={{ opacity: 0, width: "0%" }}
                      animate={{ opacity: 1, width: "calc(100% - 1rem)" }}
                      exit={{ opacity: 0, width: "0%" }}
                      transition={{ 
                        type: "spring", 
                        stiffness: 500, 
                        damping: 30,
                        duration: 0.3 
                      }}
                    />
                  )}
                </AnimatePresence>
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            {/* Theme Toggle */}
            <button
              onClick={handleThemeToggle}
              className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100/50 dark:hover:bg-gray-800/50 transition-colors hover:scale-[1.3]"
              aria-label="Toggle theme"
            >
              {mounted && (theme === "dark" ? <Sun size={20} className="inline-block" /> : <Moon size={20} className="inline-block" />)}
            </button>

            {/* Float Toggle - Only visible on desktop */}
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
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? <X size={24} className="inline-block" /> : <Menu size={24} className="inline-block" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.div
            className="md:hidden bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <nav className="flex flex-col py-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className={cn(
                    "px-4 py-3 mx-2 my-1 rounded-md transition-all duration-200 flex items-center gap-3",
                    activeSection === link.href.substring(1)
                      ? "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white font-medium"
                      : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800/50",
                  )}
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToSection(link.href)
                    setIsMenuOpen(false)
                  }}
                >
                  {link.icon && (
                    <span className="inline-block">
                      {link.icon}
                      {activeSection === link.href.substring(1) && (
                        <motion.span
                          className="absolute left-0 w-1 h-full bg-gray-900 dark:bg-white rounded-full"
                          layoutId="mobile-indicator"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.3 }}
                        />
                      )}
                    </span>
                  )}
                  {link.name}
                </a>
              ))}
              {/* Hide floating nav toggle on mobile for simplicity */}
              {!isMobile && (
                <div className="px-4 py-3 mx-2 my-1">
                  <button
                    onClick={() => {
                      toggleFloatingNav()
                      setIsMenuOpen(false)
                    }}
                    className="w-full px-3 py-2 mt-2 flex items-center justify-center gap-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md text-gray-900 dark:text-white transition-colors"
                  >
                    <Move size={18} className="inline-block" />
                    <span>Switch to floating navbar</span>
                  </button>
                </div>
              )}
            </nav>
          </motion.div>
        )}
      </div>
    </header>
  )
}
