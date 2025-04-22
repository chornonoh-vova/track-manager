import { Pencil } from "lucide-react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { EditTrackForm } from "./edit-track-form";
import { useState } from "react";
import { type Track } from "../lib/api";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

const EditTrackButton = ({
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
              data-testid={`edit-track-${trackId}`}
              variant="ghost"
              size="icon"
            >
              <Pencil />
            </Button>
          </DialogTrigger>
        </TooltipTrigger>
        <TooltipContent>
          <p>Edit Track {title} metadata</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

const EditTrackModal = ({ track }: { track: Track }) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <EditTrackButton trackId={track.id} title={track.title} />

      <DialogContent className="sm:max-w-450px">
        <DialogHeader>
          <DialogTitle>Edit a Track</DialogTitle>
          <DialogDescription>
            Edit a track without uploading a file. Input track metadata here.
          </DialogDescription>
        </DialogHeader>

        <EditTrackForm track={track} onSuccess={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
};

export { EditTrackModal };
