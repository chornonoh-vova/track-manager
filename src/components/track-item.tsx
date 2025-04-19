import {
  Disc3,
  ImageOff,
  Pencil,
  Play,
  Trash2,
  Upload,
  User,
} from "lucide-react";
import { type Track } from "../lib/api";
import { Button } from "./ui/button";
import { cn } from "../lib/utils";

type TrackItemProps = {
  track: Track;
};

const TrackCover = ({ coverImage }: { coverImage?: string }) => {
  const common = "col-start-1 row-span-2 rounded-sm";
  if (coverImage) {
    return <img className={cn(common, "w-28 h-28")} src={coverImage} />;
  }

  return (
    <ImageOff
      className={cn(common, "border border-border p-4")}
      size={112}
      absoluteStrokeWidth
    />
  );
};

const TrackAlbum = ({ album }: { album?: string }) => {
  if (!album) {
    return null;
  }

  return (
    <p className="text-sm text-secondary-foreground inline-flex items-center gap-1">
      <Disc3 size={14} />
      {album}
    </p>
  );
};

const TrackGenres = ({ genres }: { genres: string[] }) => {
  if (genres.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-1">
      {genres.map((genre) => (
        <span
          key={genre}
          className="text-xs border border-border py-1 px-2 rounded-full"
        >
          {genre}
        </span>
      ))}
    </div>
  );
};

const TrackActions = ({ audioFile }: { audioFile?: string }) => {
  return (
    <div className="col-start-3 row-span-2 flex items-center justify-end">
      {audioFile && (
        <Button variant="ghost" size="icon">
          <Play />
        </Button>
      )}
      <Button variant="ghost" size="icon">
        <Upload />
      </Button>
      <Button variant="ghost" size="icon">
        <Pencil />
      </Button>
      <Button variant="ghost" size="icon">
        <Trash2 />
      </Button>
    </div>
  );
};

const TrackItem = ({ track }: TrackItemProps) => {
  return (
    <div
      key={track.id}
      className="grid grid-cols-[112px_repeat(2,_1fr)] gap-2 p-2 border border-border rounded-md"
    >
      <TrackCover coverImage={track.coverImage} />

      <div className="col-start-2 row-span-2 flex flex-col gap-1">
        <p className="text-lg">{track.title}</p>
        <p className="text-sm inline-flex items-center gap-1">
          <User size="14px" />
          {track.artist}
        </p>
        <TrackAlbum album={track.album} />
        <TrackGenres genres={track.genres} />
      </div>

      <TrackActions audioFile={track.audioFile} />
    </div>
  );
};

export { TrackItem };
