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

export function useTrackIds() {
  return useQuery({
    queryKey: ["tracks", "ids"],
    queryFn: async () => {
      const limit = 100;
      const ids = new Set<string>();

      const firstPage = await fetchTracks({ page: 1, limit });

      firstPage.data.forEach(({ id }) => ids.add(id));

      const totalPages = firstPage.meta.totalPages;

      if (totalPages > 1) {
        const nextPages = await Promise.all(
          Array.from({ length: totalPages - 1 }, (_, i) => i + 2).map((page) =>
            fetchTracks({ page, limit }),
          ),
        );
        for (const page of nextPages) {
          page.data.forEach(({ id }) => ids.add(id));
        }
      }

      return ids;
    },
  });
}
