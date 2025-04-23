import { motion, AnimatePresence } from "framer-motion"
import { X, Moon, Sun } from "lucide-react"
import { useState, useEffect } from "react"

export default function VideoPanel({ showVideo, toggleVideo, url = "https://res.cloudinary.com/dqhn4dq02/video/upload/v1740999850/p5ditex5ags07kvajspz.mp4", title = "Demo Video" }) {
  const [darkMode, setDarkMode] = useState(false)

  const toggleTheme = () => {
    setDarkMode(!darkMode)
    // Apply theme to video section
    document.getElementById('videoSection')?.classList.toggle('dark-theme')
  }
  
  // Dispatch custom event when showVideo changes
  useEffect(() => {
    const event = new CustomEvent('videoToggle', { 
      detail: { showVideo } 
    });
    window.dispatchEvent(event);
    
    // When video panel opens, add a class to body to fix cursor issues
    if (showVideo) {
      document.body.classList.add('video-panel-open');
      
      // Ensure video section stays visible when scrolling
      const handleScroll = () => {
        const videoSection = document.getElementById('videoSection');
        if (videoSection) {
          const scrollTop = window.scrollY || document.documentElement.scrollTop;
          videoSection.style.top = scrollTop + 'px';
        }
      };
      
      window.addEventListener('scroll', handleScroll);
      return () => {
        window.removeEventListener('scroll', handleScroll);
        document.body.classList.remove('video-panel-open');
      };
    } else {
      document.body.classList.remove('video-panel-open');
    }
    
    return () => {
      document.body.classList.remove('video-panel-open');
    };
  }, [showVideo]);

  return (
    <AnimatePresence>
      {showVideo && (
        <motion.div 
          id="videoSection"
          className={`fixed top-0 right-0 w-[35%] h-full ${darkMode ? 'dark-theme bg-gray-900' : 'bg-gray-100'} z-20 flex flex-col video-section`}
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          style={{ 
            pointerEvents: "auto",
            width: "35%"
          }}
        >
          <div className={`sticky top-0 p-4 flex justify-between items-center border-b ${darkMode ? 'border-gray-700' : 'border-gray-300'} z-10 bg-inherit`}>
            <h3 className={`text-lg font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>{title}</h3>
            <div className="flex items-center gap-3">
              <button
                onClick={toggleTheme}
                className={`use-default-cursor rounded-full p-2 transition-colors duration-300 ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'}`}
                aria-label="Toggle theme"
              >
                {darkMode ? <Sun className="w-4 h-4 text-yellow-200" /> : <Moon className="w-4 h-4 text-gray-700" />}
              </button>
              <button 
                onClick={toggleVideo} 
                className="use-default-cursor rounded-full bg-red-600 hover:bg-red-700 p-2 transition-colors duration-300 shadow-lg transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-red-400"
                aria-label="Close video"
              >
                <X className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>
          <div className="flex-1 p-4 flex items-center justify-center">
            <div className="w-full h-auto max-h-[80vh] rounded-lg overflow-hidden shadow-xl relative">
              <video 
                src={url}
                className="w-full h-full object-cover use-default-cursor"
                controls
                autoPlay
                muted
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
} 