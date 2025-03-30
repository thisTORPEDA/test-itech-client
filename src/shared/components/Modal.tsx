import { FC, PropsWithChildren, ReactElement } from "react";
import { Box, Modal as MUIModal, Paper } from "@mui/material";

export type TBaseModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

interface IModalProps extends TBaseModalProps {
  name: string;
}

const Modal: FC<PropsWithChildren<IModalProps>> = ({
  name,
  isOpen,
  onClose,
  children,
}): ReactElement => {
  return (
    <MUIModal
      open={isOpen}
      onClose={onClose}
      aria-labelledby={`modal-${name}-title`}
      aria-describedby={`modal-${name}-desc`}
    >
      <Paper>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            height: "fit-content",
            width: "fit-content",
            background: "#fff",
            p: 4,
          }}
          width={400}
          height={400}
        >
          {children}
        </Box>
      </Paper>
    </MUIModal>
  );
};

export default Modal;
