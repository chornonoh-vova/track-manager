import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router";
import "./index.css";
import { Tracks } from "./pages/Tracks";
import { Toaster } from "./components/ui/sonner";

const queryClient = new QueryClient();
const router = createBrowserRouter([
  {
    path: "/",
    Component: () => <Navigate to="/tracks" />,
  },
  {
    path: "/tracks",
    Component: Tracks,
  },
]);

document.documentElement.classList.toggle(
  "dark",
  window.matchMedia("(prefers-color-scheme: dark)").matches,
);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>

    <Toaster position="bottom-center" />
  </StrictMode>,
);
