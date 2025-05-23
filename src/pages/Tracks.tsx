import { Loader2 } from "lucide-react";
import { useGenres, useTracks } from "../lib/queries";
import { TracksList } from "../components/tracks-list";
import { FilterGenre } from "../components/filter-genre";
import { useState } from "react";
import { useDebounce } from "../hooks/use-debounce";
import { Input } from "../components/ui/input";
import { SortSelect } from "../components/sort-select";
import { Order, Sort } from "../lib/api";
import { DataPagination } from "../components/data-pagination";
import { CreateTrackModal } from "../components/create-track-modal";
import { Checkbox } from "../components/ui/checkbox";
import { useSelectedTracks } from "../hooks/use-selected-tracks";
import { SelectedContext } from "../context/selected";
import { DeleteBulkPopover } from "../components/delete-bulk-popover";

const Tracks = () => {
  const [searchValue, setSearchValue] = useState("");
  const debouncedSearch = useDebounce(searchValue, 500);
  const [selectedSort, setSelectedSort] = useState<Sort>("createdAt");
  const [selectedOrder, setSelectedOrder] = useState<Order>("desc");
  const [selectedGenre, setSelectedGenre] = useState("None");
  const { data: genres } = useGenres();
  const [artistValue, setArtistValue] = useState("");
  const debouncedArtist = useDebounce(artistValue, 500);
  const [page, setPage] = useState(1);

  const {
    selected,
    selectedCount,
    isSelectedAll,
    selectAll,
    deselectAll,
    select,
    deselect,
    isSelected,
  } = useSelectedTracks();

  const {
    status,
    error,
    data: tracks,
  } = useTracks({
    page: page,
    search: debouncedSearch ? debouncedSearch : undefined,
    sort: selectedSort,
    order: selectedOrder,
    genre: selectedGenre !== "None" ? selectedGenre : undefined,
    artist: debouncedArtist ? debouncedArtist : undefined,
  });

  const onPrev = () => {
    setPage((currPage) => currPage - 1);
  };

  const onNext = () => {
    setPage((currPage) => currPage + 1);
  };

  const onPage = (p: number) => {
    setPage(p);
  };

  if (status === "error") {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div className="container mx-auto py-4 px-2">
      <h1 className="text-3xl pb-4" data-testid="tracks-header">
        Track Manager
      </h1>

      <div className="flex flex-wrap items-center justify-between gap-2 pb-4">
        <div className="flex flex-wrap items-center gap-2">
          <Input
            type="search"
            placeholder="Search"
            data-testid="search-input"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />

          <Input
            type="text"
            placeholder="Artist"
            data-testid="filter-artist"
            value={artistValue}
            onChange={(e) => setArtistValue(e.target.value)}
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <SortSelect
            selectedSort={selectedSort}
            selectedOrder={selectedOrder}
            onSelectedSortChange={setSelectedSort}
            onSelectedOrderChange={setSelectedOrder}
          />

          <FilterGenre
            genres={genres ?? []}
            selectedGenre={selectedGenre}
            onSelectedGenreChange={setSelectedGenre}
          />
        </div>

        <CreateTrackModal />
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Checkbox
            id="select-all"
            data-testid="select-all"
            checked={isSelectedAll()}
            onCheckedChange={(checked) => {
              if (typeof checked === "boolean") {
                (checked ? selectAll : deselectAll)();
              }
            }}
          />
          <label
            htmlFor="select-all"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Select all tracks
          </label>
        </div>

        <DeleteBulkPopover selected={selected} selectedCount={selectedCount} />
      </div>

      <div className="flex flex-col gap-2 py-4">
        {status === "pending" ? (
          <div
            className="grid place-items-center rounded-md border border-border py-8"
            data-testid="loading-tracks"
          >
            <div className="flex gap-2">
              <Loader2 className="animate-spin" /> <span>Loading...</span>
            </div>
          </div>
        ) : (
          <SelectedContext.Provider
            value={{
              select,
              deselect,
              isSelected,
            }}
          >
            <TracksList tracks={tracks} />
            {tracks.meta.totalPages !== 0 && (
              <DataPagination
                meta={tracks.meta}
                onPrev={onPrev}
                onNext={onNext}
                onPage={onPage}
              />
            )}
          </SelectedContext.Provider>
        )}
      </div>
    </div>
  );
};

export { Tracks };
