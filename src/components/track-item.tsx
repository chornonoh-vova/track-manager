import { Disc3, ImageOff, User } from "lucide-react";
import { type Track } from "../lib/api";
import { cn } from "../lib/utils";
import { DeleteTrackPopover } from "./delete-track-popover";
import { EditTrackModal } from "./edit-track-modal";
import { TrackAudioPlayer } from "./track-audio-player";
import { UploadTrackFileModal } from "./upload-track-file-modal";
import { DeleteTrackFilePopover } from "./delete-track-file-popover";

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

const TrackActions = ({ track }: { track: Track }) => {
  return (
    <div className="row-start-3 col-span-3 sm:col-start-3 sm:row-span-2 flex flex-wrap items-center justify-end gap-1">
      {track.audioFile && (
        <>
          <TrackAudioPlayer
            trackId={track.id}
            title={track.title}
            audioFile={track.audioFile}
          />
          <DeleteTrackFilePopover track={track} />
        </>
      )}
      <UploadTrackFileModal track={track} />
      <EditTrackModal track={track} />
      <DeleteTrackPopover track={track} />
    </div>
  );
};

const TrackItem = ({ track }: TrackItemProps) => {
  return (
    <div
      key={track.id}
      data-testid={`track-item-${track.id}`}
      className="grid grid-cols-[112px_repeat(2,_1fr)] gap-2 p-2 border border-border rounded-md"
    >
      <TrackCover coverImage={track.coverImage} />

      <div className="col-start-2 col-span-2 sm:row-span-2 sm:col-span-1 flex flex-col gap-1">
        <p data-testid={`track-item-${track.id}-title`} className="text-lg">
          {track.title}
        </p>
        <p
          data-testid={`track-item-${track.id}-artist`}
          className="text-sm inline-flex items-center gap-1"
        >
          <User size="14px" />
          {track.artist}
        </p>
        <TrackAlbum album={track.album} />
        <TrackGenres genres={track.genres} />
      </div>

      <TrackActions track={track} />
    </div>
  );
};

export { TrackItem };
