import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router";
import { StrictMode } from "react";
import { Toaster } from "sonner";
import { Tracks } from "./pages/Tracks";

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

const App = () => {
  return (
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>

      <Toaster position="bottom-center" />
    </StrictMode>
  );
};

export { App };
