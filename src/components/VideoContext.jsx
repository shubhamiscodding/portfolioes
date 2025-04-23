import { createContext, useState, useContext } from 'react';
import VideoPanel from './VideoPanel';

const VideoContext = createContext();

export function VideoProvider({ children }) {
  const [showVideo, setShowVideo] = useState(false);
  const [videoUrl, setVideoUrl] = useState("https://res.cloudinary.com/dqhn4dq02/video/upload/v1740999850/p5ditex5ags07kvajspz.mp4");
  const [videoTitle, setVideoTitle] = useState("Demo Video");

  const toggleVideo = (customUrl, customTitle) => {
    // Support for the legacy way of calling toggleVideo with parameters
    if (customUrl && customTitle) {
      setVideoUrl(customUrl);
      setVideoTitle(customTitle);
    }
    
    setShowVideo(!showVideo);
  };

  return (
    <VideoContext.Provider value={{ 
      showVideo, 
      toggleVideo, 
      videoUrl, 
      setVideoUrl,
      videoTitle,
      setVideoTitle
    }}>
      {children}
      <VideoPanel 
        showVideo={showVideo} 
        toggleVideo={toggleVideo} 
        url={videoUrl}
        title={videoTitle}
      />
    </VideoContext.Provider>
  );
}

export function useVideo() {
  return useContext(VideoContext);
} 