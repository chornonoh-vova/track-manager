import { updateTrack, UpdateTrackDto, type Track } from "../lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { TrackForm, TrackFormValues } from "./track-form";

const EditTrackForm = ({
  track,
  onSuccess,
}: {
  track: Track;
  onSuccess: () => void;
}) => {
  const defaultValues = Object.fromEntries(
    Object.entries(track).map(([key, value]) => {
      if (key === "genres") {
        return [key, value.map((genre: string) => ({ value: genre }))];
      }
      return [key, value];
    }),
  ) as TrackFormValues;

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (variables: UpdateTrackDto) => updateTrack(track.id, variables),
    onSuccess: (data) => {
      toast.success(
        <div data-testid="toast-success">
          Track {data.title} by {data.artist} was successfully updated!
        </div>,
      );
      onSuccess();
    },
    onError: (error) =>
      toast.error(<div data-testid="toast-error">{error.message}</div>),
    onSettled: () => queryClient.invalidateQueries({ queryKey: ["tracks"] }),
  });

  const onSubmit = (values: TrackFormValues) => {
    const updatedTrack: Record<string, unknown> = Object.fromEntries(
      Object.entries(values).filter(([, value]) => !!value),
    );

    if ("genres" in updatedTrack && Array.isArray(updatedTrack.genres)) {
      updatedTrack.genres = updatedTrack.genres.map(({ value }) => value);
    }

    mutation.mutate(updatedTrack as unknown as UpdateTrackDto);
  };

  return (
    <TrackForm
      defaultValues={defaultValues}
      isPending={mutation.isPending}
      onSubmit={onSubmit}
    />
  );
};

export { EditTrackForm };
