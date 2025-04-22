import { deleteTracks } from "../lib/api";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { LoadingButton } from "./ui/loading-button";
import { Trash } from "lucide-react";

const DeleteBulkPopover = ({
  selected,
  selectedCount,
}: {
  selected: Set<string>;
  selectedCount: number;
}) => {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: () => deleteTracks(Array.from(selected)),
    onSuccess: (data) => {
      toast.info(
        <div data-testid="toast-info">
          {data.success.length !== 0 && (
            <span>{data.success.length} tracks were successfully deleted</span>
          )}
          {data.failed.length !== 0 && (
            <>
              <br />{" "}
              <span>{data.failed.length} tracks failed during deletion</span>
            </>
          )}
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
      <PopoverTrigger asChild>
        <Button
          data-testid="bulk-delete-button"
          variant="destructive"
          disabled={selectedCount === 0}
          aria-disabled={selectedCount === 0 ? true : undefined}
        >
          <Trash /> Delete selected{" "}
          {selectedCount !== 0 ? `(${selectedCount})` : null}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="space-y-2" data-testid="confirm-dialog">
        <p className="text-lg">
          Are you sure that you want to delete {selectedCount} tracks?
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
            onClick={() => mutation.mutate()}
            isLoading={mutation.isPending}
          >
            Yes, delete
          </LoadingButton>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export { DeleteBulkPopover };
