import Header from "./components/Header"
import Home from "./components/Home"
import About from "./components/About"
import Skills from "./components/Skills"
import Services from "./components/Services"
import Portfolio from "./components/Portfolio"
import Contact from "./components/Contact"
import Footer from "./components/Footer"
import ScrollToTop from "./components/ScrollToTop"
import LoadingScreen from "./components/LoadingScreen"
// import CustomCursor from "./components/CustomCursor"
import Resume from "./components/Resume"
import { ThemeProvider } from "./components/ThemeProvider"
import { VideoProvider } from "./components/VideoContext"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { useState, useEffect } from "react"
import "./index.css"
import "./App.css"

// Script to enforce theme at page load
if (typeof window !== 'undefined') {
  const savedTheme = localStorage.getItem('theme') || 
    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  
  document.documentElement.classList.remove('light', 'dark');
  document.documentElement.classList.add(savedTheme);
}

function App() {
  const [isCompact, setIsCompact] = useState(false);
  
  useEffect(() => {
    // Function to check if video is showing (we'll use a custom event)
    const handleVideoToggle = (e) => {
      setIsCompact(e.detail.showVideo);
    };
    
    // Listen for custom event
    window.addEventListener('videoToggle', handleVideoToggle);
    
    return () => {
      window.removeEventListener('videoToggle', handleVideoToggle);
    };
  }, []);

  return (
    <ThemeProvider>
      <VideoProvider>
        <Router>
          <div className={`min-h-screen bg-white dark:bg-gray-950 evening:bg-evening-background text-gray-900 dark:text-gray-100 evening:text-evening-primary ${isCompact ? 'compact-mode' : ''}`}>
            {/* <CustomCursor /> */}
            <LoadingScreen />
            <Routes>
              <Route path="/resume" element={<Resume />} />
              <Route path="/" element={
                <>
                  <Header />
                  <main className="mx-auto px-[10%]">
                    <Home />
                    <About />
                    <Skills />
                    <Services />
                    <Portfolio />
                    <Contact />
                  </main>
                  <Footer />
                  <ScrollToTop />
                </>
              } />
            </Routes>
          </div>
        </Router>
      </VideoProvider>
    </ThemeProvider>
  )
}

export default App
