import { FC, PropsWithChildren, ReactElement } from "react";
import { Container } from "@mui/material";

export const Page: FC<PropsWithChildren> = ({ children }): ReactElement => {
  return (
    <Container
      sx={{
        height: "100%",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      {children}
    </Container>
  );
};
