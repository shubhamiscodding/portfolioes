import { useState } from "react"
import { Instagram, Globe, Github, Send, ChevronDown, Play } from "lucide-react"
import { Button } from "./ui/Button"
import { motion } from "framer-motion"
import { useVideo } from "./VideoContext"
import VideoButton from "./VideoButton"

export default function Home() {
  const { showVideo, toggleVideo } = useVideo();

  return (
    <section id="home" className="pt-32 pb-16 md:pt-40 md:pb-24 min-h-screen flex flex-col justify-center relative overflow-hidden">
      <motion.div 
        className="container mx-auto px-4 md:px-6"
        animate={{
          width: showVideo ? "60%" : "100%",
          x: showVideo ? "-35%" : 0,
          scale: showVideo ? 0.9 : 1
        }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex flex-col items-center md:items-start">
            <div className="flex flex-col items-center md:items-start mb-6">
              <div className="flex items-center mb-4">
                <a 
                  href="https://shubhammodi.netlify.app/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center hover:text-blue-600 transition-colors"
                >
                  <Globe className="w-5 h-5 text-gray-600 dark:text-gray-400 mr-4" />
                  <div className="w-8 h-[1px] bg-gray-300 dark:bg-gray-700"></div>
                  <span className="ml-4 text-gray-600 dark:text-gray-400"></span>
                </a>
              </div>
              <div className="flex items-center">
                <a 
                  href="https://github.com/shubhamiscodding" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center hover:text-blue-600 transition-colors"
                >
                  <Github className="w-5 h-5 text-gray-600 dark:text-gray-400 mr-4" />
                  <div className="w-8 h-[1px] bg-gray-300 dark:bg-gray-700"></div>
                  <span className="ml-4 text-gray-600 dark:text-gray-400"></span>
                </a>
              </div>
            </div>
          </div>

          <div className="text-center md:text-left max-w-xl">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4">
              Shubham Modi
            </h1>
            <div className="w-24 h-[2px] bg-gray-300 dark:bg-gray-700 mx-auto md:mx-0 mb-4"></div>
            <h2 className="text-xl text-gray-600 dark:text-gray-300 mb-6">Full Stack Developer</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto md:mx-0">
              I'm a passionate developer specializing in MERN stack solutions. I transform ideas into code and build engaging web applications.
            </p>
            <div className="flex items-center gap-4">
              <a href="#contact" onClick={(e) => {
                e.preventDefault();
                const contactSection = document.getElementById("contact");
                if (contactSection) {
                  contactSection.scrollIntoView({ behavior: "smooth" });
                }
              }}>
                <Button className="bg-gray-800 hover:bg-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600 text-white rounded-md px-6 py-3 flex items-center gap-2">
                  Say Hello <Send className="w-4 h-4" />
                </Button>
              </a>
              
              <VideoButton 
                videoUrl="https://res.cloudinary.com/dqhn4dq02/video/upload/v1740999850/p5ditex5ags07kvajspz.mp4"
                videoTitle="FinCtrl Demo Video"
                text="Demo video of latest project"
              />
            </div>
          </div>

          <div className="relative">
            <div className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-8 border-gray-100 dark:border-gray-800 shadow-xl">
              <img
                src="https://res.cloudinary.com/dqhn4dq02/image/upload/v1740113553/jm7lzaefxenoz27qzxfz.jpg"
                alt="Shubham Modi"
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}