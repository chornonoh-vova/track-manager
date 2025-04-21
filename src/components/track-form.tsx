import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { useGenres } from "../lib/queries";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Plus, XIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { DialogFooter } from "./ui/dialog";
import { LoadingButton } from "./ui/loading-button";

const trackFormSchema = z.object({
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

export type TrackFormValues = z.infer<typeof trackFormSchema>;

type TrackFormProps = {
  defaultValues: TrackFormValues;
  isPending: boolean;
  onSubmit: (values: TrackFormValues) => void;
};

const TrackForm = ({ defaultValues, isPending, onSubmit }: TrackFormProps) => {
  const { data: genres } = useGenres();
  const form = useForm<TrackFormValues>({
    resolver: zodResolver(trackFormSchema),
    defaultValues,
  });

  const {
    fields: genreFields,
    append: appendGenre,
    remove: removeGenre,
  } = useFieldArray({
    name: "genres",
    control: form.control,
  });

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
                  variant="outline"
                  className="rounded-full"
                  onClick={() => removeGenre(index)}
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
                      appendGenre({ value: genre });
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
          <LoadingButton
            isLoading={isPending}
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

export { TrackForm };
