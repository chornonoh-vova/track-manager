import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTrack, CreateTrackDto } from "../lib/api";
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
import { Button } from "./ui/button";
import { Loader2, Plus, XIcon } from "lucide-react";
import { toast } from "sonner";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { useGenres } from "../lib/queries";

const formSchema = z.object({
  title: z.string().trim().min(1, "Track title is required"),
  artist: z.string().trim().min(1, "Track artist is required"),
  album: z.string().optional(),
  genres: z.array(
    z.object({
      value: z.string().trim(),
    }),
  ),
  coverImage: z
    .string()
    .trim()
    .url("Cover image URL is invalid")
    .or(z.literal("")),
});

const CreateTrackForm = ({ onSuccess }: { onSuccess: () => void }) => {
  const { data: genres } = useGenres();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      artist: "",
      album: "",
      genres: [],
      coverImage: "",
    },
  });

  const {
    fields: genreFields,
    append,
    remove,
  } = useFieldArray({
    name: "genres",
    control: form.control,
  });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createTrack,
    onSuccess: (data) => {
      toast.success(
        `Track ${data.title} by ${data.artist} was successfully created!`,
      );
      onSuccess();
    },
    onError: (error) => {
      toast.error(error.message);
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: ["tracks"] }),
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const newTrack: Record<string, unknown> = Object.fromEntries(
      Object.entries(values).filter(([, value]) => !!value),
    );

    if ("genres" in newTrack && Array.isArray(newTrack.genres)) {
      newTrack.genres = newTrack.genres.map(({ value }) => value);
    }

    mutation.mutate(newTrack as unknown as CreateTrackDto);
  };

  return (
    <Form {...form}>
      <form
        data-testid="track-form"
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input
                  data-testid="input-title"
                  placeholder="eg. Hells Bells"
                  {...field}
                />
              </FormControl>
              <FormMessage data-testid="error-title" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="artist"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Artist</FormLabel>
              <FormControl>
                <Input
                  data-testid="input-artist"
                  placeholder="eg. AC/DC"
                  {...field}
                />
              </FormControl>
              <FormMessage data-testid="error-artist" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="album"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Album</FormLabel>
              <FormControl>
                <Input
                  data-testid="input-album"
                  placeholder="eg. Back in Black"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormItem>
          <FormLabel>Genres</FormLabel>
          <ul className="flex flex-wrap gap-1">
            {genreFields.map((field, index) => (
              <li key={field.id}>
                <Button
                  variant="ghost"
                  onClick={() => remove(index)}
                  {...form.register(`genres.${index}`)}
                >
                  {field.value}
                  <XIcon />
                </Button>
              </li>
            ))}
          </ul>

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" data-testid="genre-selector">
                Add Genre <Plus />
              </Button>
            </PopoverTrigger>

            <PopoverContent>
              {(genres ?? []).map((genre) => (
                <Button
                  key={genre}
                  variant="ghost"
                  className="w-full"
                  onClick={() => {
                    if (!genreFields.find(({ value }) => value === genre)) {
                      append({ value: genre });
                    }
                  }}
                >
                  {genre}
                </Button>
              ))}
            </PopoverContent>
          </Popover>
        </FormItem>

        <FormField
          control={form.control}
          name="coverImage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cover Image</FormLabel>
              <FormControl>
                <Input
                  data-testid="input-cover-image"
                  placeholder="Cover Image URL"
                  type="url"
                  {...field}
                />
              </FormControl>
              <FormMessage data-testid="error-cover-image" />
            </FormItem>
          )}
        />

        <DialogFooter>
          <Button
            data-testid="submit-button"
            type="submit"
            disabled={mutation.isPending}
          >
            {mutation.isPending && <Loader2 className="animate-spin" />}
            Save
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
};

export { CreateTrackForm };
