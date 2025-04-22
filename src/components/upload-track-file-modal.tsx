import { Upload } from "lucide-react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { UploadTrackFileForm } from "./upload-track-file-form";
import { useState } from "react";
import { Track } from "../lib/api";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

const UploadTrackFileButton = ({
  trackId,
  title,
}: {
  trackId: string;
  title: string;
}) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <DialogTrigger asChild>
            <Button
              data-testid={`upload-track-${trackId}`}
              variant="ghost"
              size="icon"
            >
              <Upload />
            </Button>
          </DialogTrigger>
        </TooltipTrigger>
        <TooltipContent>
          <p>Upload Track File for {title}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

const UploadTrackFileModal = ({ track }: { track: Track }) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <UploadTrackFileButton trackId={track.id} title={track.title} />

      <DialogContent className="sm:max-w-450px">
        <DialogHeader>
          <DialogTitle>Upload a file for {track.title}</DialogTitle>
          <DialogDescription>
            Upload a music file (MP3, WAV, etc.) to an existing track.
          </DialogDescription>
        </DialogHeader>

        <UploadTrackFileForm track={track} onSuccess={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
};

export { UploadTrackFileModal };
