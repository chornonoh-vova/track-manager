import { Plus } from "lucide-react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { CreateTrackForm } from "./create-track-form";
import { useState } from "react";

const CreateTrackModal = () => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button data-testid="create-track-button">
          <Plus />
          Create Track
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-450px">
        <DialogHeader>
          <DialogTitle>Create a Track</DialogTitle>
          <DialogDescription>
            Create a track without uploading a file. Input track metadata here.
          </DialogDescription>
        </DialogHeader>

        <CreateTrackForm onSuccess={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
};

export { CreateTrackModal };
