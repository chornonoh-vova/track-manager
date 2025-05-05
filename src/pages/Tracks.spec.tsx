import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { page } from "@vitest/browser/context";
import { render } from "vitest-browser-react";
import { Tracks } from "./Tracks";
import { fetchGenres, fetchTracks } from "../lib/api";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

vi.mock("../lib/api");

function renderPage() {
  const queryClient = new QueryClient();
  return render(
    <QueryClientProvider client={queryClient}>
      <Tracks />
    </QueryClientProvider>,
  );
}

describe("Tracks page", () => {
  beforeEach(() => {
    vi.mocked(fetchGenres).mockResolvedValue(["Test 1", "Test 2"]);
    vi.mocked(fetchTracks).mockResolvedValue({
      data: [
        {
          id: "1741096482745",
          title: "Bohemian Rhapsody",
          artist: "Justin Bieber",
          album: "SOS",
          genres: ["Rock", "Country"],
          slug: "bohemian-rhapsody",
          coverImage: "https://picsum.photos/seed/Bohemian%20Rhapsody/300/300",
          audioFile: "test.mp3",
          createdAt: "2025-03-04T13:54:42.745Z",
          updatedAt: "2025-04-08T11:40:49.284Z",
        },
      ],
      meta: {
        total: 1,
        page: 1,
        limit: 100,
        totalPages: 1,
      },
    });
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  describe("initial", () => {
    it("opens a create track modal", async () => {
      renderPage();

      await expect
        .element(page.getByRole("button", { name: "Create Track" }))
        .toBeInTheDocument();

      await page.getByRole("button", { name: "Create Track" }).click();

      await expect
        .element(page.getByRole("dialog", { name: "Create a Track" }))
        .toBeInTheDocument();
    });

    it("should show errors when required fields are not filled", async () => {
      renderPage();

      await page.getByRole("button", { name: "Create Track" }).click();

      await page.getByRole("button", { name: "Save" }).click();

      await expect
        .element(page.getByText("Track title is required"))
        .toBeInTheDocument();

      await expect
        .element(page.getByText("Track artist is required"))
        .toBeInTheDocument();
    });
  });

  describe("testids", () => {
    it("opens a create track modal", async () => {
      renderPage();

      await expect
        .element(page.getByTestId("create-track-button"))
        .toBeInTheDocument();

      await page.getByTestId("create-track-button").click();

      await expect.element(page.getByTestId("track-form")).toBeInTheDocument();
    });

    it("should show errors when required fields are not filled", async () => {
      renderPage();

      await page.getByTestId("create-track-button").click();

      await page.getByTestId("submit-button").click();

      await expect.element(page.getByTestId("error-title")).toBeInTheDocument();

      await expect
        .element(page.getByTestId("error-artist"))
        .toBeInTheDocument();
    });
  });
});
