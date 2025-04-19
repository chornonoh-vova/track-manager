import type { PaginatedResponse, Track } from "../lib/api";
import { TrackItem } from "./track-item";

const TracksList = ({ tracks }: { tracks: PaginatedResponse<Track> }) => {
  if (tracks.data.length === 0) {
    return (
      <div className="grid place-items-center rounded-md border border-border py-8">
        <p className="text-secondary-foreground">No results</p>
      </div>
    );
  }

  return (
    <>
      {tracks.data.map((track) => (
        <TrackItem key={track.id} track={track} />
      ))}
    </>
  );
};

export { TracksList };
