// "use client"

// import { useEffect, useState, useRef } from "react"
// import { motion } from "framer-motion"
// import { useVideo } from "./VideoContext"
// import { useTheme } from "./ThemeProvider"

// export default function CustomCursor() {
//   const { showVideo } = useVideo()
//   const { theme } = useTheme()
//   const [position, setPosition] = useState({ x: 0, y: 0 })
//   const [clicked, setClicked] = useState(false)
//   const [linkHovered, setLinkHovered] = useState(false)
//   const [hidden, setHidden] = useState(false)
//   const [isOverVideo, setIsOverVideo] = useState(false)
//   const [isMobile, setIsMobile] = useState(false)
//   const cursorRef = useRef(null)
  
//   // Determine cursor color based on theme
//   const isDarkTheme = theme === "dark"
//   const cursorColor = isDarkTheme ? "white" : "black"
//   const cursorBorderColor = isDarkTheme ? "border-white" : "border-black"
//   const cursorBgColor = isDarkTheme ? "bg-white" : "bg-black"

//   // Check if device is mobile
//   useEffect(() => {
//     const checkMobile = () => {
//       const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
//       const isMobileWidth = window.innerWidth <= 768;
//       setIsMobile(isTouchDevice || isMobileWidth);
//     };

//     // Check on mount and when window resizes
//     checkMobile();
//     window.addEventListener('resize', checkMobile);
    
//     return () => {
//       window.removeEventListener('resize', checkMobile);
//     };
//   }, []);

//   useEffect(() => {
//     // Don't add event listeners on mobile devices
//     if (isMobile) return;
    
//     const addEventListeners = () => {
//       document.addEventListener("mousemove", onMouseMove)
//       document.addEventListener("mouseenter", onMouseEnter)
//       document.addEventListener("mouseleave", onMouseLeave)
//       document.addEventListener("mousedown", onMouseDown)
//       document.addEventListener("mouseup", onMouseUp)
//       window.addEventListener("scroll", onScroll, { passive: true })
//       window.addEventListener("resize", onResize)
//     }

//     const removeEventListeners = () => {
//       document.removeEventListener("mousemove", onMouseMove)
//       document.removeEventListener("mouseenter", onMouseEnter)
//       document.removeEventListener("mouseleave", onMouseLeave)
//       document.removeEventListener("mousedown", onMouseDown)
//       document.removeEventListener("mouseup", onMouseUp)
//       window.removeEventListener("scroll", onScroll)
//       window.removeEventListener("resize", onResize)
//     }

//     // Check if the current cursor position is over the video section
//     const checkVideoOverlap = (x, y) => {
//       if (!showVideo) return false
      
//       const videoSection = document.getElementById('videoSection')
//       if (!videoSection) return false
      
//       const videoRect = videoSection.getBoundingClientRect()
//       return (
//         x >= videoRect.left &&
//         x <= videoRect.right &&
//         y >= videoRect.top &&
//         y <= videoRect.bottom
//       )
//     }

//     const onScroll = () => {
//       // Keep cursor in sync with current mouse position on scroll
//       // No need to update cursor position as it's now using fixed positioning
//       if (position.x && position.y) {
//         setIsOverVideo(checkVideoOverlap(position.x, position.y))
//       }
//     }

//     const onResize = () => {
//       if (position.x && position.y) {
//         setIsOverVideo(checkVideoOverlap(position.x, position.y))
//       }
//     }

//     const onMouseMove = (e) => {
//       // Always update cursor position on mouse move
//       const newX = e.clientX
//       const newY = e.clientY
//       setPosition({ x: newX, y: newY })
      
//       // Check for video section overlap
//       const isOver = checkVideoOverlap(newX, newY)
//       if (isOver !== isOverVideo) {
//         setIsOverVideo(isOver)
//       }
//     }

//     const onMouseDown = () => {
//       setClicked(true)
//     }

//     const onMouseUp = () => {
//       setClicked(false)
//     }

//     const onMouseLeave = () => {
//       setHidden(true)
//     }

//     const onMouseEnter = () => {
//       setHidden(false)
//     }

//     const handleLinkHoverEvents = () => {
//       document.querySelectorAll("a, button, video, input").forEach((el) => {
//         el.addEventListener("mouseenter", () => setLinkHovered(true))
//         el.addEventListener("mouseleave", () => setLinkHovered(false))
//       })
//     }

//     addEventListeners()
//     handleLinkHoverEvents()

//     return () => {
//       removeEventListeners()
//     }
//   }, [showVideo, isOverVideo, position.x, position.y, isMobile])

//   // If on mobile, don't render the custom cursor
//   if (isMobile) {
//     return (
//       <style dangerouslySetInnerHTML={{ __html: `
//         body, html, a, button, input, textarea, select, [role="button"] {
//           cursor: auto !important;
//         }
//       `}} />
//     );
//   }

//   return (
//     <div className="cursor-container fixed inset-0 pointer-events-none overflow-visible z-[9999]" ref={cursorRef}>
//       <motion.div
//         className={`cursor-outer pointer-events-none fixed top-0 left-0 z-[9999] mix-blend-difference ${isOverVideo ? 'cursor-over-video' : ''}`}
//         style={{
//           position: 'fixed',
//           willChange: 'transform'
//         }}
//         animate={{
//           x: position.x - 16,
//           y: position.y - 16,
//           scale: clicked ? 0.8 : linkHovered ? 1.5 : 1,
//           opacity: hidden || isOverVideo ? 0 : 1,
//         }}
//         transition={{
//           type: "spring",
//           mass: 0.6,
//         }}
//       >
//         <div className={`h-8 w-8 rounded-full border-2 ${cursorBorderColor}`} />
//       </motion.div>

//       <motion.div
//         className={`cursor-dot pointer-events-none fixed top-0 left-0 z-[9999] mix-blend-difference ${isOverVideo ? 'cursor-over-video' : ''}`}
//         style={{
//           position: 'fixed',
//           willChange: 'transform'
//         }}
//         animate={{
//           x: position.x - 4,
//           y: position.y - 4,
//           scale: clicked ? 1.2 : linkHovered ? 0 : 1,
//           opacity: hidden || isOverVideo ? 0 : 1,
//         }}
//         transition={{
//           type: "spring",
//           mass: 0.2,
//         }}
//       >
//         <div className={`h-2 w-2 rounded-full ${cursorBgColor}`} />
//       </motion.div>

//       <style dangerouslySetInnerHTML={{ __html: `
//         body {
//           cursor: ${isOverVideo ? 'default' : 'none'} !important;
//         }
        
//         #videoSection {
//           cursor: default !important;
//         }
        
//         #videoSection * {
//           cursor: default !important;
//         }
        
//         #videoSection video,
//         #videoSection button {
//           cursor: pointer !important;
//         }
//       `}} />
//     </div>
//   )
// }
