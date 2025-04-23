"use client"

import { useEffect, useState, useRef } from "react"
import { motion } from "framer-motion"
import { useVideo } from "./VideoContext"

export default function CustomCursor() {
  const { showVideo } = useVideo()
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [clicked, setClicked] = useState(false)
  const [linkHovered, setLinkHovered] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [isOverVideo, setIsOverVideo] = useState(false)
  const cursorRef = useRef(null)

  useEffect(() => {
    const addEventListeners = () => {
      document.addEventListener("mousemove", onMouseMove)
      document.addEventListener("mouseenter", onMouseEnter)
      document.addEventListener("mouseleave", onMouseLeave)
      document.addEventListener("mousedown", onMouseDown)
      document.addEventListener("mouseup", onMouseUp)
      window.addEventListener("scroll", onScroll, { passive: true })
      window.addEventListener("resize", onResize)
    }

    const removeEventListeners = () => {
      document.removeEventListener("mousemove", onMouseMove)
      document.removeEventListener("mouseenter", onMouseEnter)
      document.removeEventListener("mouseleave", onMouseLeave)
      document.removeEventListener("mousedown", onMouseDown)
      document.removeEventListener("mouseup", onMouseUp)
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onResize)
    }

    // Check if the current cursor position is over the video section
    const checkVideoOverlap = (x, y) => {
      if (!showVideo) return false
      
      const videoSection = document.getElementById('videoSection')
      if (!videoSection) return false
      
      const videoRect = videoSection.getBoundingClientRect()
      return (
        x >= videoRect.left &&
        x <= videoRect.right &&
        y >= videoRect.top &&
        y <= videoRect.bottom
      )
    }

    const onScroll = () => {
      // Keep cursor in sync with scroll position
      if (position.x && position.y) {
        setIsOverVideo(checkVideoOverlap(position.x, position.y))
      }
    }

    const onResize = () => {
      if (position.x && position.y) {
        setIsOverVideo(checkVideoOverlap(position.x, position.y))
      }
    }

    const onMouseMove = (e) => {
      // Always update cursor position on mouse move
      const newX = e.clientX
      const newY = e.clientY
      setPosition({ x: newX, y: newY })
      
      // Check for video section overlap
      const isOver = checkVideoOverlap(newX, newY)
      if (isOver !== isOverVideo) {
        setIsOverVideo(isOver)
      }
    }

    const onMouseDown = () => {
      setClicked(true)
    }

    const onMouseUp = () => {
      setClicked(false)
    }

    const onMouseLeave = () => {
      setHidden(true)
    }

    const onMouseEnter = () => {
      setHidden(false)
    }

    const handleLinkHoverEvents = () => {
      document.querySelectorAll("a, button, video, input").forEach((el) => {
        el.addEventListener("mouseenter", () => setLinkHovered(true))
        el.addEventListener("mouseleave", () => setLinkHovered(false))
      })
    }

    addEventListeners()
    handleLinkHoverEvents()

    return () => {
      removeEventListeners()
    }
  }, [showVideo, isOverVideo])

  return (
    <div className="cursor-container" ref={cursorRef}>
      <motion.div
        className={`cursor-outer pointer-events-none fixed top-0 left-0 z-[9999] mix-blend-difference ${isOverVideo ? 'cursor-over-video' : ''}`}
        animate={{
          x: position.x - 16,
          y: position.y - 16,
          scale: clicked ? 0.8 : linkHovered ? 1.5 : 1,
          opacity: hidden || isOverVideo ? 0 : 1,
        }}
        transition={{
          type: "spring",
          mass: 0.6,
        }}
      >
        <div className="h-8 w-8 rounded-full border-2 border-white" />
      </motion.div>

      <motion.div
        className={`cursor-dot pointer-events-none fixed top-0 left-0 z-[9999] mix-blend-difference ${isOverVideo ? 'cursor-over-video' : ''}`}
        animate={{
          x: position.x - 4,
          y: position.y - 4,
          scale: clicked ? 1.2 : linkHovered ? 0 : 1,
          opacity: hidden || isOverVideo ? 0 : 1,
        }}
        transition={{
          type: "spring",
          mass: 0.2,
        }}
      >
        <div className="h-2 w-2 rounded-full bg-white" />
      </motion.div>

      <style dangerouslySetInnerHTML={{ __html: `
        body {
          cursor: ${isOverVideo ? 'default' : 'none'};
        }
        
        #videoSection {
          cursor: default !important;
        }
        
        #videoSection * {
          cursor: default !important;
        }
        
        #videoSection video,
        #videoSection button {
          cursor: pointer !important;
        }
      `}} />
    </div>
  )
}
