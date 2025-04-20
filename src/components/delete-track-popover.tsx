import { Loader2, Trash2 } from "lucide-react";
import { deleteTrack, type Track } from "../lib/api";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const DeleteTrackPopover = ({ track }: { track: Track }) => {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: deleteTrack,
    onSuccess: () => {
      toast.info(`Track ${track.title} was successfully deleted!`);
      setOpen(false);
    },
    onError: (error) => {
      toast.error(error.message);
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: ["tracks"] }),
  });

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          data-testid={`delete-track-${track.id}`}
          variant="ghost"
          size="icon"
        >
          <Trash2 />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="space-y-2">
        <p className="text-lg">
          Are you sure that you want to delete {track.title}?
        </p>
        <p className="font-bold">This action is irreversible.</p>

        <div className="flex justify-end gap-2">
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            disabled={mutation.isPending}
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={() => mutation.mutate(track.id)}
            disabled={mutation.isPending}
          >
            {mutation.isPending && <Loader2 className="animate-spin" />}
            Yes, delete
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export { DeleteTrackPopover };
