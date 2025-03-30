import { FC, ReactElement } from "react";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

export const MainContent: FC = (): ReactElement => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100svh",
        background: "#fff",
      }}
    >
      <Outlet />
    </Box>
  );
};
