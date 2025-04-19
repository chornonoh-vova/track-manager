import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

type FilterGenreProps = {
  genres: string[];
  selectedGenre: string;
  onSelectedGenreChange: (genre: string) => void;
};

const FilterGenre = ({
  genres,
  selectedGenre,
  onSelectedGenreChange,
}: FilterGenreProps) => {
  return (
    <Select
      data-testid="filter-genre"
      value={selectedGenre}
      onValueChange={onSelectedGenreChange}
    >
      <SelectTrigger>
        <SelectValue aria-label={selectedGenre}>
          Genre: {selectedGenre}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Genres</SelectLabel>
          <SelectItem value="None">None</SelectItem>
          {(genres ?? []).map((genre) => (
            <SelectItem key={genre} value={genre}>
              {genre}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export { FilterGenre };
