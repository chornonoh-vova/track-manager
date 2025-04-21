import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTrack, CreateTrackDto } from "../lib/api";
import { toast } from "sonner";
import { TrackForm, type TrackFormValues } from "./track-form";

const CreateTrackForm = ({ onSuccess }: { onSuccess: () => void }) => {
  const defaultValues: TrackFormValues = {
    title: "",
    artist: "",
    album: "",
    genres: [],
    coverImage: "",
  };

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createTrack,
    onSuccess: (data) => {
      toast.success(
        <div data-testid="toast-success">
          Track {data.title} by {data.artist} was successfully created!
        </div>,
      );
      onSuccess();
    },
    onError: (error) =>
      toast.error(<div data-testid="toast-error">{error.message}</div>),
    onSettled: () => queryClient.invalidateQueries({ queryKey: ["tracks"] }),
  });

  const onSubmit = (values: TrackFormValues) => {
    const newTrack: Record<string, unknown> = Object.fromEntries(
      Object.entries(values).filter(([, value]) => !!value),
    );

    if ("genres" in newTrack && Array.isArray(newTrack.genres)) {
      newTrack.genres = newTrack.genres.map(({ value }) => value);
    }

    mutation.mutate(newTrack as unknown as CreateTrackDto);
  };

  return (
    <TrackForm
      defaultValues={defaultValues}
      isPending={mutation.isPending}
      onSubmit={onSubmit}
    />
  );
};

export { CreateTrackForm };
