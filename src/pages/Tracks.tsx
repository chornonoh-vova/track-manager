import { Loader2, Plus } from "lucide-react";
import { Button } from "../components/button";
import { DataPagination } from "../components/data-pagination";
import { useTracks } from "../lib/queries";
import { TrackItem } from "../components/track-item";

const Tracks = () => {
  const { status, error, data } = useTracks({});

  if (status === "error") {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div className="container mx-auto py-4">
      <h1 className="text-3xl" data-testid="tracks-header">
        Track Manager
      </h1>

      <Button data-testid="create-track-button">
        <Plus />
        Create Track
      </Button>

      <div className="flex flex-col gap-2 py-4">
        {status === "pending" ? (
          <div className="inline-flex gap-2 place-self-center">
            <Loader2 className="animate-spin" /> <span>Loading...</span>
          </div>
        ) : (
          <>
            {data.data.map((track) => (
              <TrackItem key={track.id} track={track} />
            ))}
            <DataPagination meta={data.meta} />
          </>
        )}
      </div>
    </div>
  );
};

export { Tracks };
