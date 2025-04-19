import { useQuery } from "@tanstack/react-query";
import { fetchGenres, fetchTracks, type QueryParams } from "./api";

function tracksKey(params: QueryParams) {
  return ["tracks", params] as const;
}

function genresKey() {
  return ["genres"] as const;
}

export function useTracks(params: QueryParams) {
  return useQuery({
    queryKey: tracksKey(params),
    queryFn: () => fetchTracks(params),
  });
}

export function useGenres() {
  return useQuery({
    queryKey: genresKey(),
    queryFn: fetchGenres,
  });
}
