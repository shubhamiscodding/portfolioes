import { Play } from "lucide-react";
import { Button } from "./ui/Button";
import { useVideo } from "./VideoContext";

export default function VideoButton({ 
  videoUrl, 
  videoTitle, 
  text = "Watch Demo", 
  iconSize = "w-5 h-5",
  className = "" 
}) {
  const { toggleVideo, setVideoUrl, setVideoTitle } = useVideo();

  const handleClick = () => {
    setVideoUrl(videoUrl);
    setVideoTitle(videoTitle);
    toggleVideo();
  };

  return (
    <Button
      onClick={handleClick}
      className={`bg-transparent border border-gray-800 dark:border-gray-400 text-gray-800 dark:text-gray-300 rounded-md px-3 sm:px-5 py-2.5 flex items-center gap-2 transition-colors ${className}`}
    >
      <span className="flex-shrink-0">
        <Play className={`${iconSize} text-current`} />
      </span>
      <span className="text-sm whitespace-nowrap">{text}</span>
    </Button>
  );
} 