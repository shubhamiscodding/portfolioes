import { createContext, useState, useContext } from 'react';
import VideoPanel from './VideoPanel';

const VideoContext = createContext();

export function VideoProvider({ children }) {
  const [showVideo, setShowVideo] = useState(false);
  const [videoDetails, setVideoDetails] = useState({
    url: "https://res.cloudinary.com/dqhn4dq02/video/upload/v1740999850/p5ditex5ags07kvajspz.mp4",
    title: "Demo Video"
  });

  const toggleVideo = (customUrl, customTitle) => {
    if (customUrl && customTitle) {
      setVideoDetails({
        url: customUrl,
        title: customTitle
      });
    }
    
    setShowVideo(!showVideo);
  };

  return (
    <VideoContext.Provider value={{ showVideo, toggleVideo, videoDetails, setVideoDetails }}>
      {children}
      <VideoPanel 
        showVideo={showVideo} 
        toggleVideo={toggleVideo} 
        url={videoDetails.url}
        title={videoDetails.title}
      />
    </VideoContext.Provider>
  );
}

export function useVideo() {
  return useContext(VideoContext);
} 