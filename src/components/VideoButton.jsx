import { Play } from "lucide-react";
import { useVideo } from "./VideoContext";

export default function VideoButton({ 
  videoUrl, 
  videoTitle, 
  className = "", 
  iconSize = "w-5 h-5",
  text = "Watch Demo Video" 
}) {
  const { toggleVideo } = useVideo();

  return (
    <button 
      onClick={() => toggleVideo(videoUrl, videoTitle)}
      className={`flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-300 ${className}`}
    >
      <div className="bg-gray-800 dark:bg-gray-700 hover:bg-blue-600 dark:hover:bg-blue-600 rounded-full p-2 transition-colors duration-300">
        <Play className={iconSize + " text-white"} />
      </div>
      <span className="font-medium">{text}</span>
    </button>
  );
} 