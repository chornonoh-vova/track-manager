import { z } from "zod";
import { deleteTrackFile, Track, uploadTrackFile } from "../lib/api";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { DialogFooter } from "./ui/dialog";
import { LoadingButton } from "./ui/loading-button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { FileWarning } from "lucide-react";

const MAX_FILE_SIZE = 10 * 1024 * 1024;
const ALLOWED_MIME_TYPES = [
  "audio/mpeg",
  "audio/wav",
  "audio/mp3",
  "audio/x-wav",
];

const uploadTrackSchema = z.object({
  file: z
    .any()
    .refine((files) => files?.length == 1, "File is required.")
    .refine(
      (files) => files?.[0]?.size <= MAX_FILE_SIZE,
      "File is too large. Maximum size is 10MB.",
    )
    .refine(
      (files) => ALLOWED_MIME_TYPES.includes(files?.[0]?.type),
      "Invalid file type. Only MP3 and WAV files are allowed.",
    ),
});

const UploadTrackForm = ({
  track,
  onSuccess,
}: {
  track: Track;
  onSuccess: () => void;
}) => {
  const form = useForm<z.infer<typeof uploadTrackSchema>>({
    resolver: zodResolver(uploadTrackSchema),
  });

  const fileRef = form.register("file");

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (data: FormData) => {
      if (track.audioFile) {
        await deleteTrackFile(track.id);
      }
      return await uploadTrackFile(track.id, data);
    },
    onSuccess: (data) => {
      toast.success(
        <div data-testid="toast-success">
          File {data.audioFile} was successfully uploaded to track {data.title}!
        </div>,
      );
      onSuccess();
    },
    onError: (error) =>
      toast.error(<div data-testid="toast-error">{error.message}</div>),
    onSettled: () => queryClient.invalidateQueries({ queryKey: ["tracks"] }),
  });

  const onSubmit = (data: z.infer<typeof uploadTrackSchema>) => {
    const file = data.file[0];
    const formData = new FormData();
    formData.append("file", file);
    mutation.mutate(formData);
  };

  return (
    <Form {...form}>
      {track.audioFile && (
        <div className="flex items-center gap-4 border border-primary rounded-md p-2 bg-primary/5">
          <FileWarning size={48} absoluteStrokeWidth />
          <p>
            Track {track.title} already has audio file {track.audioFile}.<br />
            It will be replaced by the new file.
          </p>
        </div>
      )}
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="file"
          render={() => (
            <FormItem>
              <FormLabel>Music file</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  accept={ALLOWED_MIME_TYPES.join(", ")}
                  {...fileRef}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <DialogFooter>
          <LoadingButton
            isLoading={mutation.isPending}
            data-testid="submit-button"
            type="submit"
          >
            Save
          </LoadingButton>
        </DialogFooter>
      </form>
    </Form>
  );
};

export { UploadTrackForm };
