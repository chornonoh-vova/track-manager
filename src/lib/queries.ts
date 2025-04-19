import { useQuery } from "@tanstack/react-query";
import { fetchTracks, type QueryParams } from "./api";

function tracksKey(params: QueryParams) {
  return ["tracks", params] as const;
}

export function useTracks(params: QueryParams) {
  return useQuery({
    queryKey: tracksKey(params),
    queryFn: () => fetchTracks(params),
  });
}
