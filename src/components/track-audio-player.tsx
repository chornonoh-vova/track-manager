import { useRef, useState } from "react";
import { Button } from "./ui/button";
import { getAudioFileUrl } from "../lib/api";
import { Pause, Play } from "lucide-react";
import { Progress } from "./ui/progress";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

const PlayPauseButton = ({
  playing,
  trackId,
  title,
  onClick,
}: {
  playing: boolean;
  trackId: string;
  title: string;
  onClick: () => void;
}) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            data-testid={
              playing ? `pause-button-${trackId}` : `play-button-${trackId}`
            }
            onClick={onClick}
          >
            {playing ? <Pause /> : <Play />}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>
            {playing ? "Pause" : "Play"} {title}
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

const TrackAudioPlayer = ({
  trackId,
  title,
  audioFile,
}: {
  trackId: string;
  title: string;
  audioFile: string;
}) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const onPlayPauseClick = () => {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    if (audio.paused || audio.ended) {
      audio.play();
      setPlaying(true);
    } else {
      audio.pause();
      setPlaying(false);
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        preload="metadata"
        src={getAudioFileUrl(audioFile)}
        onTimeUpdate={(event) => {
          const duration = event.currentTarget.duration;
          const currentTime = event.currentTarget.currentTime;
          setProgress((currentTime / duration) * 100);
        }}
      />
      <div
        data-testid={`audio-player-${trackId}`}
        className="flex items-center grow gap-1"
      >
        <PlayPauseButton
          playing={playing}
          trackId={trackId}
          title={title}
          onClick={onPlayPauseClick}
        />
        <Progress data-testid={`audio-progress-${trackId}`} value={progress} />
      </div>
    </>
  );
};

export { TrackAudioPlayer };
