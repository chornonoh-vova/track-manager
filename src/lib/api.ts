/**
 * Track entity representing a music track in the system
 */
export interface Track {
  /** Unique identifier for the track */
  id: string;
  /** Title of the track */
  title: string;
  /** Artist who created the track */
  artist: string;
  /** Optional album the track belongs to */
  album?: string;
  /** List of genres associated with the track */
  genres: string[];
  /** URL-friendly version of the title (kebab-case) */
  slug: string;
  /** Optional URL to the track's cover image */
  coverImage?: string;
  /** Optional filename of the uploaded audio file */
  audioFile?: string;
  /** ISO timestamp of when the track was created */
  createdAt: string;
  /** ISO timestamp of when the track was last updated */
  updatedAt: string;
}

/**
 * Response format for paginated data
 */
export interface PaginatedResponse<T> {
  /** Array of items for the current page */
  data: T[];
  /** Metadata about the pagination */
  meta: {
    /** Total number of items across all pages */
    total: number;
    /** Current page number */
    page: number;
    /** Number of items per page */
    limit: number;
    /** Total number of pages */
    totalPages: number;
  };
}

/**
 * Query parameters for listing and filtering tracks
 */
export interface QueryParams {
  /** Page number for pagination (1-based) */
  page?: number;
  /** Number of items per page */
  limit?: number;
  /** Field to sort results by */
  sort?: "title" | "artist" | "album" | "createdAt";
  /** Sort direction */
  order?: "asc" | "desc";
  /** Search term to filter tracks by title, artist, or album */
  search?: string;
  /** Filter tracks by specific genre */
  genre?: string;
  /** Filter tracks by specific artist */
  artist?: string;
}

export type Sort = "title" | "artist" | "album" | "createdAt";
export type Order = "asc" | "desc";

/**
 * Data required to create a new track
 */
export interface CreateTrackDto {
  /** Title of the track */
  title: string;
  /** Artist who created the track */
  artist: string;
  /** Optional album the track belongs to */
  album?: string;
  /** List of genres associated with the track */
  genres: string[];
  /** Optional URL to the track's cover image */
  coverImage?: string;
}

/**
 * Data for updating an existing track (all fields optional)
 */
export interface UpdateTrackDto {
  /** New title for the track */
  title?: string;
  /** New artist for the track */
  artist?: string;
  /** New album for the track */
  album?: string;
  /** New genres for the track */
  genres?: string[];
  /** New cover image URL for the track */
  coverImage?: string;
  /** New audio file for the track */
  audioFile?: string;
}

export async function fetchTracks(
  params: QueryParams = {},
): Promise<PaginatedResponse<Track>> {
  const queryParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value) {
      queryParams.set(key, value.toString());
    }
  });

  const requestUrl =
    `${import.meta.env.VITE_API_HOST}/api/tracks` +
    (queryParams.size !== 0 ? `?${queryParams}` : "");

  const response = await fetch(requestUrl);
  return await response.json();
}

export async function fetchGenres(): Promise<string[]> {
  const requestUrl = `${import.meta.env.VITE_API_HOST}/api/genres`;
  const response = await fetch(requestUrl);
  return await response.json();
}

export async function createTrack(newTrack: CreateTrackDto): Promise<Track> {
  const requestUrl = `${import.meta.env.VITE_API_HOST}/api/tracks`;
  const response = await fetch(requestUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newTrack),
  });
  if (!response.ok) {
    const { error } = await response.json();
    throw new Error(error);
  }
  return await response.json();
}

export async function updateTrack(
  id: string,
  updatedTrack: UpdateTrackDto,
): Promise<Track> {
  const requestUrl = `${import.meta.env.VITE_API_HOST}/api/tracks/${id}`;
  const response = await fetch(requestUrl, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedTrack),
  });
  if (!response.ok) {
    const { error } = await response.json();
    throw new Error(error);
  }
  return await response.json();
}

export async function deleteTrack(id: string): Promise<void> {
  const requestUrl = `${import.meta.env.VITE_API_HOST}/api/tracks/${id}`;
  const response = await fetch(requestUrl, {
    method: "DELETE",
  });
  if (!response.ok) {
    const { error } = await response.json();
    throw new Error(error);
  }
  return;
}

export function getAudioFileUrl(audioFile: string): string {
  return `${import.meta.env.VITE_API_HOST}/api/files/${audioFile}`;
}
