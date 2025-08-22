"use client"

import { useState, useEffect, useRef } from "react"
import { Menu, X, Moon, Sun, Sunset, Move, Home, Briefcase, Code2, Phone, Lightbulb, Layers } from "lucide-react"
import { cn } from "../utils"
import { motion, AnimatePresence } from "framer-motion"
import Draggable from "react-draggable"
import { useTheme } from "./ThemeProvider"

const navLinks = [
  { name: "Home", href: "#home", icon: <Home className="w-[1.15rem] h-[1.15rem] sm:w-5 sm:h-5" /> },
  { name: "About", href: "#about", icon: <Briefcase className="w-[1.15rem] h-[1.15rem] sm:w-5 sm:h-5" /> },
  { name: "Skills", href: "#skills", icon: <Lightbulb className="w-[1.15rem] h-[1.15rem] sm:w-5 sm:h-5" /> },
  { name: "Services", href: "#services", icon: <Layers className="w-[1.15rem] h-[1.15rem] sm:w-5 sm:h-5" /> },
  { name: "Portfolio", href: "#portfolio", icon: <Code2 className="w-[1.15rem] h-[1.15rem] sm:w-5 sm:h-5" /> },
  { name: "Contact", href: "#contact", icon: <Phone className="w-[1.15rem] h-[1.15rem] sm:w-5 sm:h-5" /> },
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
  const [touchMoved, setTouchMoved] = useState(false)
  const [dragThreshold] = useState(5) // pixels of movement to be considered a drag
  const [touchStartPos, setTouchStartPos] = useState({ x: 0, y: 0 })
  const [isMobile, setIsMobile] = useState(false)
  const nodeRef = useRef(null)
  const { theme, toggleTheme } = useTheme()
  const [hasScrolled, setHasScrolled] = useState(false)
  const [visibleSections, setVisibleSections] = useState({})
  const observers = useRef({})

  // Set mounted to true on client side
  useEffect(() => {
    setMounted(true)
  }, [])

  // Check if device is mobile and set appropriate default header type
  useEffect(() => {
    const checkMobile = () => {
      const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      const isMobileWidth = window.innerWidth <= 768;
      const isMobileDevice = isTouchDevice || isMobileWidth;
      
      setIsMobile(isMobileDevice);
      
      // Only set default behavior on initial load, don't force it
      if (!mounted) {
        setShowFloatingNav(!isMobileDevice);
      }
    };

    // Check on mount and when window resizes
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, [mounted]);

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
    // Set isDragging immediately, no delay needed
    setIsDragging(true)
  }

  const handleDragStop = (e, data) => {
    setPosition({ x: data.x, y: data.y })
    
    // Reset drag state immediately
    setIsDragging(false)
  }

  // Touch event handlers with improved precision
  const handleTouchStart = (e) => {
    const touch = e.touches[0];
    setTouchStartPos({ x: touch.clientX, y: touch.clientY });
    setTouchMoved(false);
  };

  const handleTouchMove = (e) => {
    if (!touchMoved) {
      const touch = e.touches[0];
      const dx = Math.abs(touch.clientX - touchStartPos.x);
      const dy = Math.abs(touch.clientY - touchStartPos.y);
      
      // Only set touchMoved to true if movement exceeds threshold
      if (dx > dragThreshold || dy > dragThreshold) {
        setTouchMoved(true);
      }
    }
  };

  // Direct handler for buttons without wrapping function
  const navButtonClick = (action) => (e) => {
    e.stopPropagation(); // Prevent event bubbling
    
    // Only perform action if not dragging
    if (!isDragging && !touchMoved) {
      action();
    }
  };

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
  
  // Enhanced theme toggle handler for mobile
  const handleThemeToggle = () => {
    // Call the context's toggle function only
    toggleTheme()
  }
  
  // Floating navigation bar
  const floatingNav = (
    <Draggable 
      nodeRef={nodeRef} 
      position={position} 
      onStart={handleDragStart} 
      onStop={handleDragStop} 
      bounds="parent"
      cancel=".nav-btn" // Cancel dragging on elements with this class
    >
      <div
        ref={nodeRef}
        className="fixed z-50 flex items-center gap-1 sm:gap-2 p-2 sm:p-3 bg-gray-900 dark:bg-white evening:bg-[#2F4F4F] rounded-xl shadow-lg cursor-move"
        style={{ touchAction: "none" }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
      >
        {navLinks.map((link) => (
          <button
            key={link.name}
            onClick={navButtonClick(() => scrollToSection(link.href))}
            className={cn(
              "nav-btn p-2 sm:p-3 rounded-xl shadow-lg transition-all hover:scale-[1.3] h-10 sm:h-12 relative",
              activeSection === link.href.substring(1) 
                ? "bg-gray-200 dark:bg-gray-700 evening:bg-[#B0BEC5]" 
                : "bg-gray-100 dark:bg-gray-900 evening:bg-[#B0BEC5] hover:bg-gray-200 dark:hover:bg-gray-700 evening:hover:bg-[#B0BEC5]",
            )}
            aria-label={link.name}
            onTouchStart={(e) => {
              e.stopPropagation();
              handleTouchStart(e);
            }}
            onTouchMove={(e) => {
              e.stopPropagation();
              handleTouchMove(e);
            }}
            onTouchEnd={(e) => {
              e.stopPropagation();
              if (!touchMoved) {
                scrollToSection(link.href);
              }
            }}
          >
            <span className="text-gray-900 dark:text-gray-100 evening:text-evening-primary inline-block pointer-events-none">{link.icon}</span>
            <AnimatePresence>
              {activeSection === link.href.substring(1) && (
                <motion.span
                  layoutId="floating-indicator"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-800 dark:bg-white evening:bg-evening-primary mx-1 pointer-events-none"
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
        <div className="flex items-center gap-1 sm:gap-2 ml-1 sm:ml-2">
          <button
            onClick={navButtonClick(handleThemeToggle)}
            className="nav-btn p-2 sm:p-3 bg-gray-100 dark:bg-gray-900 evening:bg-[#B0BEC5] rounded-xl shadow-lg hover:bg-gray-200 dark:hover:bg-gray-700 evening:hover:bg-[#B0BEC5] transition-all hover:scale-[1.3]"
            aria-label="Toggle theme"
            onTouchStart={(e) => {
              e.stopPropagation();
              handleTouchStart(e);
            }}
            onTouchMove={(e) => {
              e.stopPropagation();
              handleTouchMove(e);
            }}
            onTouchEnd={(e) => {
              e.stopPropagation();
              if (!touchMoved) {
                handleThemeToggle();
              }
            }}
          >
            {mounted &&
              (theme === "dark" ? (
                <Sun size={18} className="sm:size-5 text-gray-900 dark:text-gray-100 evening:text-evening-primary inline-block pointer-events-none" />
              ) : theme === "evening" ? (
                <Sunset size={18} className="sm:size-5 text-gray-900 dark:text-gray-100 evening:text-evening-primary inline-block pointer-events-none" />
              ) : (
                <Moon size={18} className="sm:size-5 text-gray-900 dark:text-gray-100 evening:text-evening-primary inline-block pointer-events-none" />
              ))}
          </button>
          <button
            onClick={navButtonClick(toggleFloatingNav)}
            className="nav-btn p-2 sm:p-3 bg-gray-100 dark:bg-gray-900 evening:bg-evening-background rounded-xl shadow-lg hover:bg-gray-200 dark:hover:bg-gray-700 evening:hover:bg-[#B0BEC5] transition-all hover:scale-[1.3]"
            onTouchStart={(e) => {
              e.stopPropagation();
              handleTouchStart(e);
            }}
            onTouchMove={(e) => {
              e.stopPropagation();
              handleTouchMove(e);
            }}
            onTouchEnd={(e) => {
              e.stopPropagation();
              if (!touchMoved) {
                toggleFloatingNav();
              }
            }}
          >
            <X className="w-[1.15rem] h-[1.15rem] sm:w-5 sm:h-5 text-gray-900 dark:text-gray-100 evening:text-evening-primary inline-block pointer-events-none" />
          </button>
        </div>
      </div>
    </Draggable>
  )

  // Modified static header with mobile-specific toggle button text
  const staticHeader = (
    <header className="fixed top-0 left-0 w-full z-40">
      <div
        className={cn(
          "transition-all duration-300 rounded-xl backdrop-blur-md",
          scrolled ? "bg-white/90 dark:bg-gray-900/90 evening:bg-evening-background/90 shadow-lg" : "bg-white/80 dark:bg-gray-900/80 evening:bg-evening-background/80",
          "py-2 sm:py-3",
        )}
      >
        <div className="container mx-auto px-3 sm:px-4 md:px-6 flex items-center justify-between">
          <a
            href="#home"
            className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-gray-200 evening:text-evening-primary hover:text-gray-600 dark:hover:text-gray-300 evening:hover:text-evening-secondary transition-colors"
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
                  "relative px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-gray-600 dark:text-gray-300 evening:text-evening-foreground transition-all duration-300 text-sm sm:text-base",
                  activeSection === link.href.substring(1)
                    ? "text-gray-900 dark:text-white evening:text-evening-primary font-medium"
                    : "hover:text-gray-900 dark:hover:text-white evening:hover:text-evening-primary hover:bg-gray-100/50 dark:hover:bg-gray-800/50 evening:hover:bg-[#B0BEC5]/50",
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
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900 dark:bg-white evening:bg-evening-primary mx-2"
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

          <div className="flex items-center gap-1 sm:gap-2">
            {/* Theme Toggle */}
            <button
              onClick={handleThemeToggle}
              className="p-1.5 sm:p-2 rounded-full text-gray-600 dark:text-gray-300 evening:text-evening-foreground hover:text-gray-900 dark:hover:text-white evening:hover:text-evening-primary hover:bg-gray-100/50 dark:hover:bg-gray-800/50 evening:hover:bg-[#B0BEC5]/50 transition-colors hover:scale-[1.3]"
              aria-label="Toggle theme"
            >
              {mounted && (theme === "dark" ? <Sun size={18} className="sm:size-5 inline-block" /> : theme === "evening" ? <Sunset size={18} className="sm:size-5 inline-block" /> : <Moon size={18} className="sm:size-5 inline-block" />)}
            </button>

            {/* Float Toggle - Only visible on desktop */}
            <button
              onClick={toggleFloatingNav}
              className="p-1.5 sm:p-2 rounded-full text-gray-600 dark:text-gray-300 evening:text-evening-foreground hover:text-gray-900 dark:hover:text-white evening:hover:text-evening-primary hover:bg-gray-100/50 dark:hover:bg-gray-800/50 evening:hover:bg-[#B0BEC5]/50 transition-colors hidden md:flex hover:scale-[1.3]"
              aria-label="Show floating navigation"
            >
              <Move size={18} className="sm:size-5 inline-block" />
            </button>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-gray-600 dark:text-gray-300 evening:text-evening-foreground hover:text-gray-900 dark:hover:text-white evening:hover:text-evening-primary hover:bg-gray-100 dark:hover:bg-gray-800 evening:hover:bg-[#B0BEC5] p-1.5 sm:p-2 rounded-full transition-colors hover:scale-[1.3]"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={20} className="sm:size-6 inline-block" /> : <Menu size={20} className="sm:size-6 inline-block" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.div
            className="md:hidden bg-white/95 dark:bg-gray-900/95 evening:bg-evening-background/95 backdrop-blur-md shadow-lg"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <nav className="flex flex-col py-3 sm:py-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className={cn(
                    "px-3 sm:px-4 py-2.5 sm:py-3 mx-2 my-0.5 sm:my-1 rounded-md transition-all duration-200 flex items-center gap-2 text-sm sm:text-base",
                    activeSection === link.href.substring(1)
                      ? "bg-gray-100 dark:bg-gray-800 evening:bg-[#B0BEC5] text-gray-900 dark:text-white evening:text-evening-background font-medium"
                      : "text-gray-600 dark:text-gray-300 evening:text-evening-foreground hover:text-gray-900 dark:hover:text-white evening:hover:text-evening-primary hover:bg-gray-50 dark:hover:bg-gray-800/50 evening:hover:bg-[#B0BEC5]/50",
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
                          className="absolute left-0 w-1 h-full bg-gray-900 dark:bg-white evening:bg-evening-primary rounded-full"
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
              {/* Always show floating navbar toggle option */}
              <div className="px-3 sm:px-4 py-2.5 sm:py-3 mx-2 my-0.5 sm:my-1">
                <button
                  onClick={() => {
                    toggleFloatingNav()
                    setIsMenuOpen(false)
                  }}
                  className="w-full px-3 py-2 mt-1 sm:mt-2 flex items-center justify-center gap-2 bg-gray-100 dark:bg-gray-800 evening:bg-evening-primary hover:bg-gray-200 dark:hover:bg-gray-700 evening:hover:bg-[#B0BEC5] rounded-md text-gray-900 dark:text-white evening:text-evening-background transition-colors text-sm sm:text-base"
                >
                  <Move size={16} className="sm:size-[18px] inline-block" />
                  <span>Switch to {showFloatingNav ? 'static' : 'floating'} navbar</span>
                </button>
              </div>
            </nav>
          </motion.div>
        )}
      </div>
    </header>
  )

  // If the page is still loading, don't show the navigation
  if (isLoading) {
    return null
  }

  // Return the appropriate navigation based on the showFloatingNav state
  return showFloatingNav ? floatingNav : staticHeader
}
