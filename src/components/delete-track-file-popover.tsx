import { Shredder } from "lucide-react";
import { deleteTrackFile, type Track } from "../lib/api";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { LoadingButton } from "./ui/loading-button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

const DeleteTrackFileButton = ({
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
          <PopoverTrigger asChild>
            <Button
              data-testid={`delete-track-file-${trackId}`}
              variant="ghost"
              size="icon"
            >
              <Shredder />
            </Button>
          </PopoverTrigger>
        </TooltipTrigger>
        <TooltipContent>
          <p>Delete Track File from {title}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

const DeleteTrackFilePopover = ({ track }: { track: Track }) => {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: deleteTrackFile,
    onSuccess: () => {
      toast.info(
        <div data-testid="toast-info">
          File {track.audioFile} from was successfully deleted {track.title}!
        </div>,
      );
      setOpen(false);
    },
    onError: (error) =>
      toast.error(<div data-testid="toast-error">{error.message}</div>),
    onSettled: () => queryClient.invalidateQueries({ queryKey: ["tracks"] }),
  });

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <DeleteTrackFileButton trackId={track.id} title={track.title} />
      <PopoverContent className="space-y-2" data-testid="confirm-dialog">
        <p className="text-lg">
          Are you sure that you want to delete file {track.audioFile} from{" "}
          {track.title}?
        </p>
        <p className="font-bold">This action is irreversible.</p>

        <div className="flex justify-end gap-2">
          <Button
            variant="outline"
            data-testid="cancel-delete"
            onClick={() => setOpen(false)}
            disabled={mutation.isPending}
          >
            Cancel
          </Button>
          <LoadingButton
            variant="destructive"
            data-testid="confirm-delete"
            onClick={() => mutation.mutate(track.id)}
            isLoading={mutation.isPending}
          >
            Yes, delete
          </LoadingButton>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export { DeleteTrackFilePopover };
