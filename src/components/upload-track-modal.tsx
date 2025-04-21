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
import { UploadTrackForm } from "./upload-track-form";
import { useState } from "react";
import { Track } from "../lib/api";

const UploadTrackModal = ({ track }: { track: Track }) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          data-testid={`upload-track-${track.id}`}
          variant="ghost"
          size="icon"
        >
          <Upload />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-450px">
        <DialogHeader>
          <DialogTitle>Upload a file for {track.title}</DialogTitle>
          <DialogDescription>
            Upload a music file (MP3, WAV, etc.) to an existing track.
          </DialogDescription>
        </DialogHeader>

        <UploadTrackForm track={track} onSuccess={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
};

export { UploadTrackModal };
