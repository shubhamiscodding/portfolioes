import { useState } from "react"
import { Instagram, Globe, Github, Send, ChevronDown, Play } from "lucide-react"
import { Button } from "./ui/Button"
import { motion } from "framer-motion"
import { useVideo } from "./VideoContext"
import VideoButton from "./VideoButton"
import { useTheme } from "./ThemeProvider"
import FadeInSection from "./FadeInSection"

export default function Home() {
  const { showVideo, toggleVideo } = useVideo();
  const { theme } = useTheme();

  return (
    <section id="home" className="pt-20 pb-16 md:pt-32 lg:pt-40 md:pb-24 min-h-screen flex flex-col justify-center relative overflow-hidden bg-white dark:bg-gray-900 evening:bg-evening-background">
      <motion.div 
        className=""
        animate={{
          width: showVideo ? "60%" : "100%",
          x: showVideo ? "-35%" : 0,
          scale: showVideo ? 0.9 : 1
        }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <FadeInSection duration={0.3}>
            <div className="flex flex-col items-center md:items-start order-2 md:order-1">
              <div className="flex flex-col items-center md:items-start mb-6">
                <div className="flex items-center mb-4">
                  <a 
                    href="https://shubhammodi.netlify.app/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center hover:text-blue-600 transition-colors"
                  >
                    <Globe className="w-5 h-5 text-gray-600 dark:text-gray-400 evening:text-evening-foreground mr-4" />
                    <div className="w-8 h-[1px] bg-gray-300 dark:bg-gray-700 evening:bg-evening-foreground"></div>
                    <span className="ml-4 text-gray-600 dark:text-gray-400 evening:text-evening-foreground"></span>
                  </a>
                </div>
                <div className="flex items-center">
                  <a 
                    href="https://github.com/shubhamiscodding" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center hover:text-blue-600 transition-colors"
                  >
                    <Github className="w-5 h-5 text-gray-600 dark:text-gray-400 evening:text-evening-foreground mr-4" />
                    <div className="w-8 h-[1px] bg-gray-300 dark:bg-gray-700 evening:bg-evening-foreground"></div>
                    <span className="ml-4 text-gray-600 dark:text-gray-400 evening:text-evening-foreground"></span>
                  </a>
                </div>
              </div>
            </div>
          </FadeInSection>

          <FadeInSection duration={0.4}>
            <div className="text-center md:text-left max-w-xl order-3 md:order-2">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 dark:text-white evening:text-evening-primary mb-4">
                Shubham Modi
              </h1>
              <div className="w-24 h-[2px] bg-gray-300 dark:bg-gray-700 evening:bg-evening-foreground mx-auto md:mx-0 mb-4"></div>
              <h2 className="text-xl text-gray-600 dark:text-gray-300 evening:text-evening-foreground mb-6">Full Stack Developer</h2>
              <p className="text-gray-600 dark:text-gray-400 evening:text-evening-foreground mb-8 max-w-md mx-auto md:mx-0">
                I'm a passionate developer specializing in MERN stack solutions. I transform ideas into code and build engaging web applications.
              </p>
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
                <a href="#contact" onClick={(e) => {
                  e.preventDefault();
                  const contactSection = document.getElementById("contact");
                  if (contactSection) {
                    contactSection.scrollIntoView({ behavior: "smooth" });
                  }
                }}>
                  <Button className="bg-gray-800 hover:bg-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600 evening:bg-evening-primary evening:hover:bg-evening-secondary text-white dark:text-white evening:text-evening-background rounded-md px-4 sm:px-6 py-3 flex items-center gap-2">
                    Say Hello <Send className="w-4 h-4" />
                  </Button>
                </a>
                
                <VideoButton 
                  videoUrl="https://res.cloudinary.com/dqhn4dq02/video/upload/v1740999850/p5ditex5ags07kvajspz.mp4"
                  videoTitle="FinCtrl Demo Video"
                  text="Demo video of latest project"
                  className="w-full sm:w-auto border-0 hover:text-blue-200"
                />
              </div>
            </div>
          </FadeInSection>

          <FadeInSection duration={0.5}>
            <div className="relative order-1 md:order-3 mb-8 md:mb-0">
              <div className="w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-8 border-gray-100 dark:border-gray-800 evening:border-evening-secondary shadow-xl mx-auto">
                <img
                  src="https://res.cloudinary.com/dqhn4dq02/image/upload/v1740113553/jm7lzaefxenoz27qzxfz.jpg"
                  alt="Shubham Modi"
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
          </FadeInSection>
        </div>
      </motion.div>
    </section>
  )
}