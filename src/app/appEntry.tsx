import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import router from "./routerConfig.tsx";
import { CssBaseline } from "@mui/material";
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "../shared/api/queryClient.ts";
import { Toaster } from "react-hot-toast";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <CssBaseline />
      <RouterProvider router={router} />
      <Toaster />
    </LocalizationProvider>
  </QueryClientProvider>,
);
