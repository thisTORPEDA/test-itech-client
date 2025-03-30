import { FC, ReactElement } from "react";
import { Box, CircularProgress } from "@mui/material";

export const PageLoader: FC = (): ReactElement => {
  return (
    <Box
      sx={{
        height: "100%",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <CircularProgress size={40} />
    </Box>
  );
};
